import {Html, Domain} from 'chorda-core'
import {Layouts, Tabs, Image, Carousel, Box, getEl} from 'chorda-bulma'

import axios from 'axios'

const api = {
    getBreeds: function () {
      return axios.get('https://api.thecatapi.com/v1/breeds').then(response => response.data)
    },
    getImages: function (breedId) {
      return axios.get('https://api.thecatapi.com/v1/images/search?limit=5&breed_id='+breedId).then(response => response.data)
    }
}


function DataInput (mixer) {
  mixer.mix({
    scope: {
      data: ctx => ctx.data,
    },
    dom: { getEl },
    onChange: function (e, {data}) {
      data.$value = e.target.value
    },
    dataChanged: function (v) {
      if (this.el) {
        this.el.value = v
      }
      else {
        this.opt('defaultValue', v)
      }
    }
  })
}



class HtmlSelect extends Html {
  config () {
    return {
      scope: {
        options: ctx => ctx.options || []
      },
      mix: { DataInput },
      html: 'select',
      defaultItem: {
        html: 'option',
        optionsChanged: function (v) {
          this.opt('text', v)
          this.opt('value', v)
        }
      },
      optionsChanged: function (v, s, k) {
        this.opt('items', s.$iterator(k))
      }
    }
  }
}


export default () => {
  return {
    $content: {
      layout: Layouts.Container,
      $tabs: {
        as: Tabs,
        css: 'is-centered',
        tabs: [{text: 'Breeds', active: true}, 'Images/Search', 'Random image']
      },
      $breedSelect: {
        scope: {
          options: ctx => ctx.data.$entry('breeds'),
          data: ctx => ctx.view.$entry('breedId')
        },
        as: HtmlSelect,
//        html: 'select',
        defaultItem: {
          optionsChanged: function (v) {
            this.opt('text', v.name)
            this.opt('value', v.id)
//            this.opt('key', v.id)
          }
        },
//        dataId: 'breeds',
        // dataChanged: function (v, s, k) {
        //   this.opt('items', s.$iterator(k))
        // },
        // viewChanged: function (v) {
        //   this.opt('value', v.breedId)
        // },
        onChange: function (e, {view}) {
          view.selectBreed(e.target.value)
        }
      },
      $breedGallery: {
        $content: {
//          as: Box,
          width: 600,
          height: 400,
          css: 'has-background-grey-dark',
          $content: {
            as: Carousel,
            height: '100%',
    //        height: 256,
            dataChanged: function (v, s) {
              this.opt('images', s.imageUrls)// s.source.get('imageUrls'))
            },
            $content: {
              styles: {
                // width: '512px',
                // height: '256px',
                // display: 'inline-flex',
                // alignItems: 'center',
                // height: '100%'
              },
              defaultItem: {
                // styles: {
                //   display: 'flex',
                //   justifyContent: 'center'
                // },
                 $image: {
                   onLoad: function (e) {
                     console.log('loaded', e.target.height, e.target.width)
                     const origWidth = e.target.width
                     const origHeight = e.target.height
                     const k = origWidth / origHeight
                     let width = origWidth
                     let height = origHeight
                     if (k < 1) {
                        height = 400
                        width = 400 * k
                     }
                     else {
                       width = 600
                       height = 600 / k
                     }
                     this.opt('styles', {
                       width: width+'px',
                       height: height+'px'
                     })
                   }
                 }
              }
    //               styles: {
    //                 height: '400px',
    //                 display: 'block',
    //                 margin: '0 auto'
    //               }
    //             }
    // //            width: 512,
    // //            styles
    //           }
            }    
          }
        }
        // sources: {
        //   data: (ctx, o) => ctx.data.$entry('imageUrls')
        // }

        // $image: {
        //   as: Image,
        //   dataId: 'image',
        //   dataChanged: function (v) {
        //     this.opt('src', v && v.url)
        //   },
        //   $content: {
        //     height: 256,
        //     width: 'auto'
        //   }
        // }
      }
    },
    scope: {
      view: new Domain({}, {
        properties: {
          breedId: {}
        }
      }),
      data: new Domain({}, {
        properties: {
          imageUrls: {
            calc: (v) => {
              return v.images ? v.images.map(img => img.url) : []
            }
          },
          breeds: {},
          images: {}
        }
      })
    },
    allJoined: function ({view, data}) {
      view.watch(e => e.name == 'init', async () => {
        data.breeds = await api.getBreeds()
      }, this)
      view.createAction('selectBreed', async (id) => {
        view.breedId = id
        data.images = await api.getImages(id)
        // view.set('breedId', id)
        // data.set('images', await api.cats.getImages(id))
      }, this)
    }
  }
}
