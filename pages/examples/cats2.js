import {Html, Domain} from '../../src'
import {Layouts, Tabs, Image, Carousel, Box} from '../../bulma'

import axios from 'axios'

const api = {
  cats: {
    getBreeds: function () {
      return axios.get('https://api.thecatapi.com/v1/breeds').then(response => response.data)
    },
    getImages: function (breedId) {
      return axios.get('https://api.thecatapi.com/v1/images/search?limit=5&breed_id='+breedId).then(response => response.data)
    }
  },
  dogs: {
    getBreeds: function () {
      return axios.get('https://dog.ceo/api/breeds/list/all').then(response => {
        return Object.keys(response.data.message).sort().map(v => {return {id: v, name: v}})
      })
    },
    getImages: function (breedId) {
      return axios.get(`https://dog.ceo/api/breed/${breedId}/images`).then(response => {
        return response.data.message.map(v => {return {url: v}})
      })
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
        tabs: [{text: 'Breeds', selected: true}, 'Images/Search', 'Random image']
      },
      $breedSelect: {
        html: 'select',
        defaultItem: {
          html: 'option',
          dataChanged: function (v) {
            this.opt('text', v.name)
            this.opt('value', v.id)
            this.opt('key', v.id)
          }
        },
        dataId: 'breeds',
        dataChanged: function (v, k, s) {
          this.opt('items', k)
        },
        viewChanged: function (v) {
          this.opt('value', v.breedId)
        },
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
            dataChanged: function (v, $props) {
              this.opt('images', $props.imageUrls)// s.source.get('imageUrls'))
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
        //   data: (o, ctx) => ctx.data.$entry('imageUrls')
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
    sources: {
      view: new Domain({pet: 'cats'}),
      data: new Domain({}, {
        properties: {
          imageUrls: (v) => {
            return v.images ? v.images.map(img => img.url) : []
          }
        }
      })
    },
    allJoined: function ({view, data}) {
      view.watch(e => e.name == 'init', async () => {
        data.set('breeds',  await api.cats.getBreeds())
      }, this)
      view.createAction('selectBreed', async (id) => {
        view.set('breedId', id)
        data.set('images', await api.cats.getImages(id))
      })
    }
  }
}
