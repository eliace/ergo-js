import {Html, Layouts, Tabs, IconBox, Text, Button, Source, Buttons} from '../../src'

import {Mutate, Mixins} from '../helpers'

import _ from 'lodash'
import Velocity from 'velocity-animate/velocity'

function isCanceled (v) {
  return v == '#canceled'
}

// const wm = new WeakMap()
//
// const arr = [
//   {a: 'Alice'},
//   {a: 'Bob'},
//   {a: 'Charlie'},
//   {a: 'Dave'},
// ]
//
// let cnt = 1
//
// arr.forEach(v => {
//   wm.set(v, cnt++)
// })
//
// const filteredArr = arr.filter(v => v.a.indexOf('b') !== -1)
//
// console.log(filteredArr.map(v => wm.get(v)))


const Animation = {
  Mixins: {
    Transitions: function () {
      this.transition = function () {
        const target = this
        return new Promise(function (resolve, reject) {
//          console.log('listen transitionend', target.vnode.domNode)

          const callback = function (e) {
//              console.log ('transitionend', target)
              target.off('transitionend', callback, 'dom')
              resolve()
          }

          target.on('transitionend', callback, 'dom')
        })
      }
      this.renderAfter = function (promise) {
        const projector = this.context.projector
        return promise
          .then(v => {
            projector.scheduleRender()
            return v
          })
          .catch(err => {
            projector.scheduleRender()
            return err
          })
      }
    }
  },
  Effectors: {
    Show: function (name, filter) {
      const eff = function () {
        return {
          resolver: () => {
            return this.renderAfter(this.transition())
          },
          init: () => {
            this.opt('classes', {[name+'-enter-active']: true, [name+'-enter']: true})
          },
          ready: () => {
            this.opt('classes', {[name+'-enter']: false, [name+'-enter-to']: true})
          },
          done: () => {
            this.opt('classes', {[name+'-enter-active']: false, [name+'-enter-to']: false})
          },
          activator: (activate) => {
            requestAnimationFrame(() => {
              activate()
              this.context.projector.scheduleRender()
            })
          }
        }
      }
      eff.watch = filter
//      eff.mode = 'pre'
      return eff
    },
    Hide: function (name, filter) {
      const eff = function () {
        return {
          resolver: () => this.renderAfter(this.transition()),
          init: () => this.opt('classes', {[name+'-leave-active']: true, [name+'-leave']: true}),
          ready: () => this.opt('classes', {[name+'-leave-to']: true, [name+'-leave']: false}),
          done: () => this.opt('classes', {[name+'-leave-active']: false, [name+'-leave-to']: false}),
          activator: (activate) => {
            requestAnimationFrame(() => {
              activate()
//              this.context.projector.scheduleRender()
            })
          }
        }
      }
      eff.watch = filter
      eff.mode = 'pre'
      return eff
    },
//     FLIP: function (name, watch) {
//       const eff = function () {
//         return {
//           resolver: () => {
//             const target = this
//             return new Promise(function (resolve, reject) {
//     //          console.log('listen transitionend', target.vnode.domNode)
//
//               const callbacks = {}
//
//               const callback = function (k) {
//                 target.off('transitionend', callbacks[k], 'dom')
//                 delete callbacks[k]
//                 if (Object.keys(callbacks).length == 0) {
//                   resolve()
// //                  console.log('resolved')
//                 }
//               }
//
//               target.items.forEach(itm => {
//                 const f = callback.bind(this, itm.options.key)
//                 callbacks[itm.options.key] = f
//                 target.on('transitionend', f, 'dom')
//               })
//
// //               const callback = function (e) {
// // //                  console.log ('transitionend', target)
// //                   target.off('transitionend', callback, 'dom')
// //                   resolve()
// //               }
// //
// //               target.on('transitionend', callback, 'dom')
//             })
//           },
//           activator: activate => requestAnimationFrame(activate),
//           init: (d) => {
//             console.log('init', this)
//
//             const bcr = {}
//             this.items.forEach(itm => !itm.vnode ? null : bcr[itm.options.key] = itm.vnode.domNode.getBoundingClientRect())
// //            console.log(bcr)
//             this.bcr = bcr
//
//             this.items.forEach(itm => {
//               itm.opt('classes', {[name]: false})
//               itm.opt('styles', {'transition': 'none'})
//               // if (itm.vnode) {
//               //   itm.vnode.domNode.style.transition = 'none'
//               // }
//             })
//
//             this.context.projector.renderNow()
//
//
//           },
//           ready: () => {
//             console.log('ready')
//
// //              this.context.projector.renderNow()
//
//               const bcr = {}
//               this.items.forEach(itm => bcr[itm.options.key] = itm.vnode.domNode.getBoundingClientRect())
//   //            console.log(bcr)
//               if (this.bcr) {
//                 const d = {}
//                 for (let i in bcr) {
//                   if (this.bcr[i] && bcr[i]) {
//                     const dy = this.bcr[i].top - bcr[i].top
//                     let dx = this.bcr[i].left - bcr[i].left
//                     d[i] = {dx, dy}
//                   }
//                   else {
//                     d[i] = {dx: 0, dy: 0}
//                   }
//                 }
//                 delete this.bcr
//                 console.log(d)
// //                this.sources[key].emit('listChanged', {params: [d]})
//
//                 this.items.forEach(itm => {
//                   const offset = d[itm.options.key]
//                   if (offset.dx != 0 || offset.dy != 0) {
//                     itm.opt('styles', {'transform': 'translate('+offset.dx+'px, '+offset.dy+'px)', 'transition': ''})
// //                    itm.vnode.domNode.style.transform = 'translate('+offset.dx+'px, '+offset.dy+'px)'
//                   }
// //                  if (offset.dx != 0 && offset.dy != 0) {
// //                  }
// //                  itm.opt('styles', {'transform': 'translateY('+d[itm.options.key]+'px)'})
//                 //              itm.opt('classes', {[name]: false})
//                 })
//
//                 this.context.projector.renderNow()
//
//                 // this.items.forEach(itm => {
//                 //   console.log(itm.vnode.domNode.style.transform)
//                 // })
//               }
//
//
//
//               requestAnimationFrame(() => {
//
//                 this.items.forEach(itm => {
//                   if (itm.options.styles && itm.options.styles.transform) {
//                     itm.vnode.domNode.style.transition = ''
//                     itm.opt('styles', {'transform': ''})
//                     itm.opt('classes', {[name]: true})
//                   }
//                 })
// //                this.context.projector.scheduleRender() // TODO по умолчанию для компонентных эффекторов
//
//               this.context.projector.renderNow()
//
//             })
//
//
//
//           },
//           done: () => {
//             console.log('done')
//             this.items.forEach(itm => {
//               itm.opt('classes', {[name]: false})
//             })
//             this.context.projector.scheduleRender() // TODO по умолчанию для компонентных эффекторов
//           },
//         }
//       }
//       eff.watch = watch
//       return eff
//     },
    'FLIP:First': function () {
      const eff = function () {
        return {
          ready: () => {
            console.log('FLIP First')
            const bcr = {}
            this.items.forEach(itm => !itm.vnode ? null : bcr[itm.props.key] = itm.vnode.domNode.getBoundingClientRect())
            this.bcr = bcr
          }
        }
      }
      eff.watch = evt => evt.name == 'beforeChanged'
      return eff
    },
    'FLIP:Last+Invert': function (name) {
      const eff = function () {
        return {
          ready: () => {

            console.log('FLIP Last')

            this.items.forEach(itm => {
              itm.opt('classes', {[name+'-move']: false})
              itm.opt('styles', {'transition': 'none'})
              // if (itm.vnode) {
              //   itm.vnode.domNode.style.transition = 'none'
              // }
            })

            this.context.projector.renderNow()

            const bcr = {}
            this.items.forEach(itm => bcr[itm.props.key] = itm.vnode.domNode.getBoundingClientRect())
//            console.log(bcr)
            if (this.bcr) {
              const d = {}
              for (let i in bcr) {
                if (this.bcr[i] && bcr[i]) {
                  const dy = this.bcr[i].top - bcr[i].top
                  let dx = this.bcr[i].left - bcr[i].left
                  d[i] = {dx, dy}
                }
                else {
                  d[i] = {dx: 0, dy: 0}
                }
              }
              delete this.bcr
              console.log(d)

              console.log('FLIP Invert')

              this.items.forEach(itm => {
                const offset = d[itm.props.key]
                if (offset.dx != 0 || offset.dy != 0) {
                  itm.opt('styles', {'transform': 'translate('+offset.dx+'px, '+offset.dy+'px)'})
//                    itm.vnode.domNode.style.transform = 'translate('+offset.dx+'px, '+offset.dy+'px)'
                }
              })

              this.context.projector.renderNow()
            }
          }
        }
      }
      eff.watch = evt => evt.name == 'afterChanged'
      return eff
    },
    'FLIP:Play': function (name) {
      const eff = function () {
        return {
          activator: (activate) => requestAnimationFrame(activate),
          ready: () => {
            console.log('FLIP Play')

            const toPlay = []

            this.items.forEach(itm => {
//                if (itm.options.styles && itm.options.styles.transform) {
                itm.opt('styles', {'transform': '', 'transition': ''})
                itm.opt('classes', {[name+'-move']: true})
//                }
                if (itm.options.styles && itm.options.styles.transform) {
                  toPlay.push(itm)
                }
            })

            console.log('to play', toPlay)
//                this.context.projector.scheduleRender() // TODO по умолчанию для компонентных эффекторов

            this.context.projector.renderNow()
          },
          resolver: () => {
            const target = this
            return new Promise(function (resolve, reject) {
    //          console.log('listen transitionend', target.vnode.domNode)

              const callbacks = {}

              const callback = function (k) {
                target.off('transitionend', callbacks[k], 'dom')
                delete callbacks[k]
                if (Object.keys(callbacks).length == 0) {
                  resolve()
//                  console.log('resolved')
                }
              }

              target.items.forEach(itm => {
                const f = callback.bind(this, itm.props.key)
                callbacks[itm.props.key] = f
                target.on('transitionend', f, 'dom')
              })

//               const callback = function (e) {
// //                  console.log ('transitionend', target)
//                   target.off('transitionend', callback, 'dom')
//                   resolve()
//               }
//
//               target.on('transitionend', callback, 'dom')
            })
          }
        }
      }
      eff.watch = evt => evt.name == 'FLIP:Last+Invert'
      return eff
    }
  }
}

const Effects = {
  Show: function (target, data, key, name='fade') {

    data.watch((e) => e.name == 'init', target, (e) => {
      show()
    })

    data.watch(e => e.name == show.cancel, target, () => {
//      console.log('cancel show', target)
      target.opt('classes', {[name+'-enter-active']: false})
    })

    const show = data.effect('show', target, async () => {
//      console.log('show', this)
      target.opt('classes', {[name+'-enter-active']: true, [name+'-enter']: true})
      await raf()
      target.opt('classes', {[name+'-enter']: false})
      const v = await transition()
      target.opt('classes', {[name+'-enter-active']: false})
    }, 'g')

    const raf = function () {
      return new Promise(function (resolve) {
        requestAnimationFrame(() => resolve())
      })
    }

    const transition = () => {
      return target.transition()
    }

  },
  Hide: function (target, data, key, name='fade') {

    data.watch((e) => e.name == 'destroy', target, (e) => {
      return hide()
    })

    data.watch(e => e.name == hide.cancel, target, () => {
      target.opt('classes', {[name+'-leave-to']: false, [name+'-leave-active']: false})
    })

    const hide = data.effect('hide', target, async () => {
      target.opt('classes', {[name+'-leave-active']: true, [name+'-leave']: true})
      await raf()
      target.opt('classes', {[name+'-leave-to']: true, [name+'-leave']: false})
      await transition()
      target.opt('classes', {[name+'-leave-to']: false, [name+'-leave-active']: false})
    }, 'g')

    const raf = function () {
      return new Promise(function (resolve) {
        requestAnimationFrame(() => resolve())
      })
    }

    const transition = () => {
      return target.transition()
    }

  },
  FLIP: function (target, data, key) {

    data.watch(e => e.name == 'changed', target, (e) => {
      flip()
    })


    const flip = data.effect('flip', target, async () => {
      first()
      await raf() //?
      invert(last())
      await raf()
      play()
      await transition()
    })


    const name = 'flip-list'

    const first = data.effect('first', target, () => {
      console.log('FLIP First')
      const bcr = {}
      target.items.forEach(itm => !itm.vnode ? null : bcr[itm.props.key] = itm.vnode.domNode.getBoundingClientRect())
      target.bcr = bcr
    })

    const last = data.effect('last', target, () => {
      console.log('FLIP Last')

      target.items.forEach(itm => {
        itm.opt('classes', {[name+'-move']: false})
        itm.opt('styles', {'transition': 'none'})
        // if (itm.vnode) {
        //   itm.vnode.domNode.classList.remove(name+'-move')
        //   itm.vnode.domNode.style.transition = 'none'
        // }
      })

      target.context.projector.renderNow()

      const bcr = {}
      target.items.forEach(itm => bcr[itm.props.key] = itm.vnode.domNode.getBoundingClientRect())
//            console.log(bcr)
      if (target.bcr) {
        const d = {}
        for (let i in bcr) {
          if (target.bcr[i] && bcr[i]) {
            const dy = target.bcr[i].top - bcr[i].top
            let dx = target.bcr[i].left - bcr[i].left
            d[i] = {dx, dy}
          }
          else {
            d[i] = {dx: 0, dy: 0}
          }
        }
        delete target.bcr
        console.log(d)

        return d
      }

    })

    const invert = data.effect('invert', target, (d) => {
      console.log('FLIP Invert')

      target.items.forEach(itm => {
        const offset = d[itm.props.key]
        if (offset.dx != 0 || offset.dy != 0) {
          itm.opt('styles', {'transform': 'translate('+offset.dx+'px, '+offset.dy+'px)'})
//                    itm.vnode.domNode.style.transform = 'translate('+offset.dx+'px, '+offset.dy+'px)'
        }
      })

      target.context.projector.renderNow()

    })

    const play = data.effect('play', target, () => {
      console.log('FLIP Play')

      const toPlay = []

      target.items.forEach(itm => {
//                if (itm.options.styles && itm.options.styles.transform) {
          itm.opt('styles', {'transform': '', 'transition': ''})
          itm.opt('classes', {[name+'-move']: true})
//                }
          if (itm.options.styles && itm.options.styles.transform) {
            toPlay.push(itm)
          }
      })

      console.log('to play', toPlay)
//                this.context.projector.scheduleRender() // TODO по умолчанию для компонентных эффекторов

      target.context.projector.renderNow()
    })

    const raf = function () {
      return new Promise(function (resolve) {
        requestAnimationFrame(() => resolve())
      })
    }

    const transition = () => {
//      return target.transition()
      return new Promise(function (resolve, reject) {
      //          console.log('listen transitionend', target.vnode.domNode)

        const callbacks = {}

        const callback = function (k) {
          target.off('transitionend', callbacks[k], 'dom')
          delete callbacks[k]
          if (Object.keys(callbacks).length == 0) {
            resolve()
      //                  console.log('resolved')
          }
        }

        target.items.forEach(itm => {
          const f = callback.bind(this, itm.props.key)
          callbacks[itm.props.key] = f
          target.on('transitionend', f, 'dom')
        })

      })

    }

  }
}

Effects.Show.Slide = (target, data, key) => Effects.Show(target, data, key, 'slide-fade')
Effects.Hide.Slide = (target, data, key) => Effects.Hide(target, data, key, 'slide-fade')
Effects.Show.Named = (name) => (target, data, key) => Effects.Show(target, data, key, name)
Effects.Hide.Named = (name) => (target, data, key) => Effects.Hide(target, data, key, name)


export default (projector) => {
  return {
    layout: Layouts.Rows,
    items: [{
      sources: {
        data: {p: false}
      },
//       sourcesBound: function ({data}) {
//
//         // data.watch((e) => (e.name == 'changed'/* || e.name == 'init'*/), this, (e, domain) => {
//         //   if (e.data.p) {
//         //     console.log('show')
//         //     data.emit('show')
//         //   }
//         //   else {
//         //     console.log('hide')
//         //   }
//         // })
//
// //         const show = data.effect('show', this, () => {
// // //          return this.transition()
// //         })
//
//       },
      layout: Layouts.Content,
      $content: {
        components: {
          p: false
        },
        dataChanged: Mutate.Components,
        $button: {
          type: Button,
          text: 'Press me',
          onClick: function (e, {data}) {
            data.toggle('p')
            // // return
            // const showEff = [{effector: 'show'}]
            // const hideEff = [{effector: 'hide'}]
            //
            // const p = this.sources.data.get('p')
            // if (p) {
            //   this.sources.data.when(hideEff).set('p', false)//.emit('set', {params: ['p', false]})
            // }
            // else {
            //   this.sources.data.set('p', true).then(showEff)//emit('set', {params: ['p', true]})
            // }
          }
        },
        $p: {
          html: 'p',
          text: 'Hello!',
          weight: 10,
          mixins: [Animation.Mixins.Transitions],
          dataEffects: [Effects.Show, Effects.Hide]
        }
      }
    }, {
      sources: {
        data: new Source({show: true}, {
          properties: {
            p: {
              project: (v) => v.show
            }
          }
//          logEvents: true,
          // computed: {
          //   p: (v) => v.show
          // }
        })
      },
      dataChanged: function (v, k) {
        const x = {}
        const props = this.sources[k]._properties
        for (let i in props) {
          x[i] = this.sources[k].entry(i).get()
        }
        console.log(x)
        this.opt('$components', new Source(x))
      },//Mutate.Components,
      components: {
        p: false
      },
      $button: {
        type: Button,
        text: 'Переключить отрисовку',
        onClick: function (e, {data}) {
          data.toggle('show')
          // const showEff = [{effector: 'show'}]
          // const hideEff = [{effector: 'hide'}]
          //
          // const p = this.sources.data.get('show')
          // if (p) {
          //   this.sources.data.when(hideEff).set('show', false)//.emit('set', {params: ['p', false]})
          // }
          // else {
          //   this.sources.data.set('show', true).then(showEff)//emit('set', {params: ['p', true]})
          // }
        }
      },
      $p: {
        html: 'p',
        text: 'Hello!',
        weight: 10,
        mixins: [Animation.Mixins.Transitions],
        dataEffects: [Effects.Show.Slide, Effects.Hide.Slide],
      }
    }, {
      sources: {
        data: new Source({
          items: [1,2,3,4,5,6,7,8,9],
          nextNum: 10
        }, {
          methods: {
            _randomIndex: function () {
              return Math.floor(Math.random() * this.entry('items').size())
            },
            _add: function () {
              const v = this.get()
              this.entry('items').insert(this._randomIndex(), v.nextNum++)
            },
            _remove: function () {
              this.entry('items').remove(this._randomIndex())
            }
          }
        })
      },
      $buttons: {
        type: Buttons,
        items: [{
          text: 'Добавить',
          onClick: function (e, {data}) {
            data._add()
          }
        }, {
          text: 'Удалить',
          onClick: function (e, {data}) {
            data._remove()
          }
        }]
      },
      $list: {
        // dataKey: function (v) {
        //   return v
        // },
        defaultItem: {
          as: 'list-item',
          dataChanged: Mutate.Text,
          mixins: [Animation.Mixins.Transitions],
          dataEffects: [Effects.Show, Effects.Hide]
          // dataEffectors: {
          //   hide: Animation.Effectors.Hide('list', evt => evt.name == 'removeItem'),
          //   show: Animation.Effectors.Show('list', evt => evt.name == 'changed')
          // }
        },
        dataId: 'items',
        dataChanged: Mutate.Items
      }
    }, {
      sources: {
        data: new Source({
          items: [1,2,3,4,5,6,7,8,9]
        }, {
          methods: {
            shuffle: function () {
              return this.set('items', _.shuffle(this.get('items')))
            }
          }
        })
      },
      clickButton: function () {

        this.sources.data.shuffle()

        return false
      },
      $buttons: {
        type: Buttons,
        items: [{
          text: 'Перемешать',
          onClick: function () {
            this.rise('clickButton')
//            this.sources.data.$shuffle()
          }
        }]
      },
      $list: {
//         dataEffectors: {
// //          flip: Animation.Effectors.FLIP('flip-list-move', evt => evt.name == 'changed')
//           'FLIP:First': Animation.Effectors['FLIP:First'](),
//           'FLIP:Last+Invert': Animation.Effectors['FLIP:Last+Invert']('flip-list'),
//           'FLIP:Play': Animation.Effectors['FLIP:Play']('flip-list'),
//         },
        defaultItem: {
          dataChanged: function (v) {
//            this.opt('key', v)
            this.opt('text', v)
          },
        },
        dataId: 'items',
        dataChanged: Mutate.Items,
        dataEffects: [Effects.FLIP]
      }
    }, {
      sources: {
        data: new Source({
          items: [1,2,3,4,5,6,7,8,9],
          nextNum: 10
        }, {
          methods: {
            _randomIndex: function () {
              return Math.floor(Math.random() * this.entry('items').size())
            },
            _add: function () {
              const v = this.get()
              this.entry('items').insert(this._randomIndex(), v.nextNum++)
            },
            _remove: function () {
              this.entry('items').remove(this._randomIndex())
            }
          }
        })
      },
      $buttons: {
        type: Buttons,
        items: [{
          text: 'Добавить',
          onClick: function () {
            this.sources.data._add()
          }
        }, {
          text: 'Удалить',
          onClick: function () {
            this.sources.data._remove()
          }
        }]
      },
      $list: {
        styles: {
          'position': 'relative'
        },
        dataEffects: [Effects.FLIP],
//         dataEffectors: {
//           'FLIP:First': Animation.Effectors['FLIP:First'](),
//           'FLIP:Last+Invert': Animation.Effectors['FLIP:Last+Invert'](),
//           'FLIP:Play': Animation.Effectors['FLIP:Play'](),
// //          flip: Animation.Effectors.FLIP('list-complete-move', evt => evt.name == 'changed')
//         },
        defaultItem: {
          as: 'list-complete-item',
          dataChanged: function (v) {
//            this.opt('key', v)
            this.opt('text', v)
          },
          mixins: [Animation.Mixins.Transitions],
          dataEffects: [Effects.Show.Named('list-complete'), Effects.Hide.Named('list-complete')]
          // dataEffectors: {
          //   hide: Animation.Effectors.Hide('list-complete', evt => evt.name == 'removeItem'),
          //   show: Animation.Effectors.Show('list-complete', evt => evt.name == 'init')
          // }
        },
        dataId: 'items',
        dataChanged: Mutate.Items
      }
    }, {
      sources: {
        data: new Source({
          query: '',
          list: [
            { msg: 'Брюс Ли' },
            { msg: 'Джеки Чан' },
            { msg: 'Чак Норрис' },
            { msg: 'Джет Ли' },
            { msg: 'Кунг Фьюри' }
          ]
        }, {
          computed: {
            filteredList: function (v) {
              return v.list.filter((item) => {
                return item.msg.toLowerCase().indexOf(v.query.toLowerCase()) !== -1
              })
            }
          }
        })
      },
      $input: {
        html: 'input',
        dataId: 'query',
        dataChanged: Mutate.Value,
        onInput: function (e) {
          this.domain.data.set(e.target.value)
        }
      },
      $list: {
        html: 'ul',
        dataId: 'filteredList',
        dataChanged: Mutate.Items,
        height: 150,
        // dataKey: function (v) {
        //   return v && v.msg
        // },
        defaultItem: {
          html: 'li',
          onEnterAnimation: function () {
            console.log('enter')
            this.sources.data.emit('enter')
          },
          dataChanged: function (v) {
            this.opts.text = v.msg
          },
          dataEffectors: {
            hide: (function () {
              const eff = function () {
                return {
                  activator: (activate, delay) => setTimeout(activate, delay),
                  init: () => {
                    const delay = this.index * 150 //this.vnode.domNode.dataset.index * 150
                    console.log('init', delay)
                    return delay
                  },
                  ready: () => {
                      console.log('ready')
                  },
                  resolver: () => {
                    return new Promise((resolve) => {
                      Velocity(
                        this.vnode.domNode,
                        { opacity: 0, height: 0 },
                        { complete: () => resolve() }
                      )
//                      console.log(v)
                    })
                  },
                  done: () => {
                    console.log('done')
                    this.context.projector.scheduleRender()
                  }
                }
              }
              eff.watch = (evt) => evt.name == 'removeItem'
              eff.mode = 'pre'
              return eff
            })(),
            show: (function () {
              const eff = function () {
                return {
                  activator: (activate, delay) => {
                    requestAnimationFrame(() => {
                      setTimeout(activate, delay)
                    })
                  },
                  init: () => {
                    const delay = this.index * 150 //this.vnode.domNode.dataset.index * 150
                    this.opt('styles', {'opacity': '0', 'height': '0'})
//                    this.context.projector.renderNow()
                    console.log('init', delay)
                    return delay
                  },
                  ready: () => {
                      console.log('ready')
                  },
                  resolver: () => {
                    return new Promise((resolve) => {
                      Velocity(
                        this.vnode.domNode,
                        { opacity: 1, height: '1.6em' },
                        { complete: () => resolve() }
                      )
                    })
                  },
                  done: () => {
                    console.log('done')
                    this.context.projector.scheduleRender()
                  }
                }
              }
              eff.watch = (evt) => evt.name == 'init'
              return eff
            })()
          }
        }
      }
    }]
  }
}
