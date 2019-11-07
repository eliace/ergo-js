import {Html, Text, Events, Domain} from 'chorda-core'
import {Layouts, Tabs, IconBox, Box, Button, Buttons, Notification} from 'chorda-bulma'
import { ShowAndHide } from '../effects'

import 'animate.css'

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.'

class MyPromise extends Promise {


//   constructor(resRejCallback, animCallback) {
//     super(resRejCallback)
//     debugger
//     console.log(arguments)
// //    animCallback(this.animate.bind(this))
//   }

  activate () {
    console.log('emit animation')
    if (this._active) {
      this._active.forEach(callback => callback())
    }
  }

  active (callback) {
    if (!this._active) {
      this._active = []
    }
    this._active.push(callback)
  }
}


let browserSpecificTransitionEndEventName = 'webkitTransitionEnd' | 'transitionend';
let browserSpecificAnimationEndEventName = 'webkitAnimationEnd' | 'animationend';

let determineBrowserSpecificStyleNames = (element) => {
  if ('WebkitTransition' in element.style) {
    browserSpecificTransitionEndEventName = 'webkitTransitionEnd';
    browserSpecificAnimationEndEventName = 'webkitAnimationEnd';
  } else if ('transition' in element.style) {
    browserSpecificTransitionEndEventName = 'transitionend';
    browserSpecificAnimationEndEventName = 'animationend';
  } else {
    throw new Error('Your browser is not supported!');
  }
};

let init = (testElement) => {
  if (!browserSpecificTransitionEndEventName) {
    determineBrowserSpecificStyleNames(testElement)
  }
};

const doTransition = function (el) {
  return new Promise(function (resolve, reject) {
//    console.log('transition')
    init(el)
    let finished = false
    let transitionEnd = (evt) => {
      if (!finished) {
        finished = true
        el.removeEventListener(browserSpecificTransitionEndEventName, transitionEnd);
        el.removeEventListener(browserSpecificAnimationEndEventName, transitionEnd);
//        console.log('transitionEnd', evt)
        resolve(el)
      }
    }
    el.addEventListener(browserSpecificTransitionEndEventName, transitionEnd);
    el.addEventListener(browserSpecificAnimationEndEventName, transitionEnd);

  })
}

const doGlobalAnimation = function (target, projector) {
//  debugger
  return new Promise(function (resolve, reject) {

    const callback = function (e) {
//      if (e.target == target.vnode.domNode) {
        console.log ('animationend', target)
        resolve()
//        projector.scheduleRender()
//        Events.off('transitionend', target)
        target.off('animationend', callback)
//      }
    }

    target.on('animationend', callback)
//     Events.on('transitionend', function (e) {
// //      if (e.target == target.vnode.domNode) {
//         console.log ('transitionend', target)
//         resolve()
// //        projector.scheduleRender()
//         Events.off('transitionend', target)
//         Events.off('animationend', target)
// //      }
//     }, target)
  })
}



const doGlobalTransition = function (target, projector) {
//  debugger
  return new Promise(function (resolve, reject) {
    console.log('listen transitionend')

    const callback = function (e) {
//      if (e.target == target.vnode.domNode) {
        console.log ('transitionend', target)
        resolve()
//        projector.scheduleRender()
        target.off('transitionend', callback)
//        Events.off('animationend', target)
//      }
    }

    target.on('transitionend', callback)
  })
}



function renderAfter(promise, projector) {
  let myPromise = new MyPromise(function (resolve, reject) {
    promise
      .then(v => {
//        console.log('render')
        resolve(v)
        projector.scheduleRender()
      })
      .catch(err => {
        reject(err)
//        console.error(err)
        projector.scheduleRender()
      })
  })

  requestAnimationFrame(() => {
    myPromise.activate()
    projector.scheduleRender()
  })

  return myPromise
}

function renderBefore(result, projector) {
  projector.scheduleRender()
  return result
}


function timer(t) {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(), t)
  })
}

const animation = doGlobalAnimation;
const transition = doGlobalTransition



const Mixins = {
  LiveEvents: function () {
    this.on = function (name, callback) {
      if (!this._domEvents) {
        this._domEvents = []
      }

      const event = {name, callback, attached: false}

      if (this.vnode && this.vnode.domNode) {
        this.vnode.domNode.addEventListener(name, callback)
        event.domNode = this.vnode.domNode
        event.attached = true
      }
      else {
        console.log('vnode', this.vnode)
        this.props.afterCreate = (el) => {
          console.log('enter animation')
          if (this._domEvents) {
            this._domEvents.forEach(event => {
              if (!event.attached) {
                el.addEventListener(event.name, event.callback)
                event.domNode = el
                event.attached = true
              }
              if (event.domNode != el) {
                console.warn('Missing dom event', event)
              }
            })
          }
          delete this.props.afterCreate
        }
      }

      this._domEvents.push(event)
    }
    this.off = function (name, callback) {
      if (this._domEvents) {
        for (let i = this._domEvents.length-1; i >= 0; i--) {
          let event = this._domEvents[i]
          if (event.name == name && (event.callback == callback || !callback)) {
            this._domEvents.splice(i, 1)
            event.domNode.removeEventListener(event.name, event.callback)
          }
        }
      }
    }
    return {
      // onAfterCreate: function (el) {
      //   console.log('after create')
      //   if (this._domEvents) {
      //     this._domEvents.forEach(event => {
      //       if (!event.attached) {
      //         el.addEventListener(event.name, event.callback)
      //         event.domNode = el
      //         event.attached = true
      //       }
      //       if (event.domNode != el) {
      //         console.warn('Missing dom event', event)
      //       }
      //     })
      //   }
      // },
      // onAfterUpdate: function (el) {
      //   console.log('after update')
      //   if (this._domEvents) {
      //     this._domEvents.forEach(event => {
      //       if (!event.attached) {
      //         console.log('attach dom event on update')
      //         el.addEventListener(event.name, event.callback)
      //         event.domNode = el
      //         event.attached = true
      //         console.warn('Missing dom event', event)
      //       }
      //     })
      //   }
      // },
      // onEnterAnimation: function () {
      //   console.log('enter animation')
      // }
    }
  }
}





export default (projector) => {
  return {
    sources: {
      modal: {modal: false, notifications: []}
    },
    dynamic: true,
    modalChanged: function (v, key, src) {
      this.opt('components', src.$stream(key))
    },
    $modal: {
      css: 'modal is-active',
      $overlay: {
        css: 'modal-background',
        mixins: [Mixins.LiveEvents],
        modalEffectors: {
          // custom: {
          //   use: (t) => renderAfter(timer(t), projector),
          //   ready: () => this.opt('classes', {hello: true}),
          //   done: () =>
          // },
          showOverlay: function () {
            // конструируем эффект
            return renderAfter(doGlobalAnimation(this), projector)
          },
          hideOverlay: function (v) {
            return renderAfter(doGlobalAnimation(this), projector)
          }
        },
        modalEffects: function (event) {
//          console.log('overlay event', event)
          if (event.name == 'showOverlay') {
            this.opt('classes', {'animated': true, 'fadeIn': true})
          }
          else if (event.name == 'showOverlay:done') {
            this.opt('classes', {'animated': false, 'fadeIn': false})
          }
          else if (event.name == 'hideOverlay') {
            this.opt('classes', {'animated': true, 'fadeOut': true})
          }
          else if (event.name == 'hideOverlay:done') {
            this.opt('classes', {'animated': false, 'fadeOut': false})
//            projector.scheduleRender()
          }
        }
      },
      $content: {
        css: 'modal-content',
        classes: {
          'is-hidden': true
        },
        $content: {
          as: Box,
          styles: {
            height: '60vh'
          },
          items: [{
            html: 'input',
            modalEffects: function (event) {
              if (event.name == 'focusInput') {
                this.vnode.domNode.focus()
              }
            }
          }]
        },
        mixins: [Mixins.LiveEvents],
        modalEffectors: {
          showContent: function () {
            return renderAfter(doGlobalAnimation(this), projector)
          },
          hideContent: function (v) {
            return renderAfter(doGlobalAnimation(this), projector)
          }
        },
        modalEffects: function (event) {
          console.log('content event', event)
          if (event.name == 'showContent') {
            this.opt('classes', {'animated': true, 'slideInDown': true, 'is-hidden': false})
//            projector.scheduleRender()
          }
          else if (event.name == 'showContent:done') {
            this.opt('classes', {'animated': false, 'slideInDown': false})
          }
          else if (event.name == 'hideContent') {
            this.opt('classes', {'animated': true, 'slideOutUp': true})
          }
          else if (event.name == 'hideContent:done') {
            this.opt('classes', {'animated': false, 'slideOutUp': false, 'is-hidden': true})
//            projector.scheduleRender()
          }
        }
        // onUpdateAnimation: function (el) {
        //   this.sources.modal.emit('updateAnimation', el)
        // },
      },
      $closeBtn: {
        css: 'modal-close is-large',
        onClick: function () {
          const effects = [{
            effector: 'hideContent',
            mode: 'pre'
          }, {
            effector: 'hideOverlay',
            mode: 'pre'
//            waitFor: ['hideContent:done']
          }]
//          this.sources.modal.set('modal', false)
          this.sources.modal.wait(effects).set('modal', false)//.emit('mergeWith', {data: {modal: false}})
        }
      },
//       modalChanged: function (v, key) {
// //        console.log('add classes')
// //        this.$content.opt('classes', {'animated': v.modal, 'fadeIn': v.modal})
//       },
//       _modalEffects: function (event, data, key) {
//         console.log('event', event)
//         if (event == 'showOverlayAnimation:done') {
// //          this.$overlay.opt('classes', {'animated': false, 'fadeIn': false})
//           this.$content.opt('classes', {'animated': true, 'tada': true, 'is-hidden': false})
// //          projector.renderNow()
//           projector.scheduleRender()
//         }
//         else if (event == 'showOverlayAnimation:wait') {
// //          debugger
//           this.$overlay.opt('classes', {'animated': true, 'fadeIn': true})
// //          projector.scheduleRender()
//         }
//         else if (event == 'showContentAnimation:done') {
//           this.$content.opt('classes', {'animated': false, 'tada': false, 'is-hidden': false})
// //          projector.renderNow()
//           projector.scheduleRender()
//         }
//       },
//       onEnterAnimation: function (el) {
// //        requestAnimationFrame(() => {
//         this.sources.modal.emit('enterAnimation', el)
// //        });
//       }
    },
    $notifications: {
      css: 'collapse-box',
      styles: {
        'position': 'fixed',
        'top': '1rem',
        'right': '1rem',
        'zIndex': '40'
      },
      dynamic: true,
      modalId: 'notifications',
      modalChanged: function (v, s, k) {
        this.opt('items', s.$iterator(k))
      },
      defaultItem: {
        css: 'collapse-item',
        $content: {
          as: Notification,
          modalChanged: function (v, key) {
            this.opt('text', v.text)
          },
          $closeBtn: {
            onClick: function () {
              const effects = [{
                effector: 'hide',
                mode: 'pre'
              }, {
                effector: 'collapse',
                mode: 'pre',
                watch: function (event) { return event.name == 'hide:done' }
              }]
              this.sources.modal.wait(effects).emit('remove')
//              this.sources.modal.remove()
            }
          }
        },
        mixins: [Mixins.LiveEvents],
        modalEffectors: {
          show: function () {
            return renderAfter(doGlobalAnimation(this), projector)
          },
          hide: function () {
            return renderAfter(doGlobalAnimation(this), projector)
          },
          collapse: function () {
            return renderAfter(doGlobalTransition(this), projector)
          }
        },
        modalEffects: function (event) {
//          console.log('collapsible event', event)
          if (event.name == 'show') {
            this.opt('classes', {animated: true, flipInX: true})
          }
          else if (event.name == 'show:done') {
            this.opt('classes', {animated: false, flipInX: false})
          }
          else if (event.name == 'hide') {
            this.opt('classes', {/*collapse: true,*/ animated: true, flipOutX: true})
          }
          else if (event.name == 'hide:done') {
            this.opt('classes', {/*collapse: true,*/ animated: false, flipOutX: false})
          }
          else if (event.name == 'collapse') {
            this.opt('classes', {collapse: true, 'is-invisible': true})
//            projector.scheduleRender()
          }
          else if (event.name == 'collapse:done') {
            this.opt('classes', {collapse: false, 'is-invisible': false})
//            projector.scheduleRender()
          }
        }
      }
    },
    $test: {
      $buttons: {
        as: Buttons,
        $openModalBtn: {
          as: Button,
          text: 'Open Modal',
          onClick: function () {
            const effects = [{
              effector: 'showOverlay',
            }, {
              effector: 'showContent',
    //          watch: function (event) {return event.name == 'showOverlay:done'}
    //          waitFor: ['showOverlay:done']
            }, {
              name: 'focusInput',
              watch: function (event) {return event.name == 'showContent:done'},
    //          waitFor: ['showContent:done']
            }]

            console.log('openModal')
            this.sources.modal.wait(effects).set('modal', true)//.emit('mergeWith', {data: {modal: true}})

    //        this.sources.modal.set('modal', true)
          }
        },
        $openNotifyBtn: {
          as: Button,
          text: 'Show notification',
          onClick: function () {

            const openNotif = [{
              effector: 'show'
            }]

            const waitAndCloseNotif = [{
              name: 'timer',
              effector: () => renderAfter(timer(5000), projector),
              mode: 'pre'
            }, {
              effector: 'hide',
              mode: 'pre',
              watch: function (event) { return event.name == 'timer:done' }
            }, {
              effector: 'collapse',
              mode: 'pre',
              watch: function (event) { return event.name == 'hide:done' }
            }]


            this.sources.modal.$entry('notifications')
              .add({text: LOREM_IPSUM + new Date().getTime()})
              .then(openNotif)
              .and()
              .when(waitAndCloseNotif)
              .emit('remove')
//              .remove()
              // .with(openNotif),
              // .and()
              // .when(waitAndCloseNotif)
              // .emit('remove')
              // .wait(openNotif)
              // .emit('_')
              // .wait(waitAndCloseNotif)
              // .emit('remove')
          }
        }
      }
    },
    $cssTransitions: {
      sources: {
        data: {}
      },
      layout: Layouts.Content,
      $title: {
        html: 'h4',
        text: 'CSS transitions'
      },
      $content: {
        components: {
          p: false
        },
        dataChanged: function (v, key, src) {
          this.opt('components', src.$stream(key))
        },
        $button: {
          as: Button,
          text: 'Press me',
          onClick: function (e, {data}) {
            data.$toggle('p')
//            this.sources.data.toggle('p')
//             const showEff = [{
//               effector: 'show',
// //              watch: event => event.name == 'afterRender'
//             }]
//             const hideEff = [{
//               effector: 'hide',
//               mode: 'pre'
//             }]
//             const p = this.sources.data.get('p')
//             if (p) {
//               this.sources.data.when(hideEff).set('p', false)//.emit('set', {params: ['p', false]})
//             }
//             else {
//               this.sources.data.set('p', true).then(showEff)//emit('set', {params: ['p', true]})
//             }
          }
        },
        $p: {
          html: 'p',
          text: 'Hello!',
//          css: 'fade-enter-active',
//          classes: {'fade-enter': true},
          weight: 10,
          join: {
            data: { ShowAndHide }
          },
          allJoined: function ({data}) {

            // const effects = () => {
            //   return new Promise((resolve) => {
            //     this.eff(() => {resolve()})
            //   })
            // }
            //
            // const transition = () => {
            //   return new Promise(resolve => {
            //     this.use((el) => {
            //       const f = () => {
            //         el.removeEventListener('transitionend', f)
            //         resolve()
            //       }
            //       el.addEventListener('transitionend', f)
            //     })
            //   })
            // }
            //
            // const name = 'fade'
            //
            // const show = data.$method('show', this, async () => {
            //   this.opt('classes', {[name+'-enter-active']: true, [name+'-enter']: true})
            //   await effects()
            //   this.opt('classes', {[name+'-enter']: false})
            //   await transition()
            //   this.opt('classes', {[name+'-enter-active']: false})
            // }, 'g')
            //
            // const hide = data.$method('hide', this, async () => {
            //   this.opt('classes', {[name+'-leave-active']: true, [name+'-leave']: true})
            //   await effects()
            //   this.opt('classes', {[name+'-leave-to']: true, [name+'-leave']: false})
            //   await transition()
            //   this.opt('classes', {[name+'-leave-to']: false, [name+'-leave-active']: false})
            // }, 'g')

            data.$watch(e => e.name == 'init', this, () => {
              return data.show()
            })
            data.$watch(e => e.name == 'destroy', this, () => {
              return data.hide()
            })
          }
          // onAfterCreate: function() {
          //   console.log('enter', this)
          //   // this.opt('classes', {'fade-enter': false})
          //   // projector.scheduleRender()
          // },
//           mixins: [Mixins.LiveEvents],
//           dataEffectors: {
//             hide: function () {
//               return {
//                 resolver: () => renderAfter(transition(this), projector),
//                 ready: () => this.opt('classes', {'fade-enter-active': true, 'fade-enter': true})
//               }
// //              return
//             },
//             // myEffect: function () {
//             //   return {
//             //     use: () => {
//             //       // промис или функция с колбэком
//             //       return (callback) => {
//             //
//             //       }
//             //     }
//             //   }
//             // },
//             show: function () {
//               return {
//                 // animation: () => {
//                 //   projector.scheduleRender()
//                 // },
//                 resolver: () => {
// //                   requestAnimationFrame(() => {
// // //                    this.source.emit(this.name+':active', {effectId: this.id, effectStage: 'active'})
// //                     projector.scheduleRender()
// //                   })
//                   return renderAfter(transition(this), projector)
//                 },
//                 active: () => {
//                   this.opt('classes', {'fade-enter': false})
//                 },
//                 ready: () => {
//                   this.opt('classes', {'fade-enter-active': true, 'fade-enter': true})
//                   // requestAnimationFrame(() => {
//                   //   this.opt('classes', {'fade-enter': false})
//                   //   projector.scheduleRender()
//                   // })
//                 },
//                 done: () => this.opt('classes', {'fade-enter-active': false})
//               }
//             }
//           },
          // dataEffects: function (event) {
          //   console.log('p', event.name)
          //   if (event.name == 'init') {
          //     // this.opt('classes', {'fade-enter': true})
          //     // requestAnimationFrame(() => {
          //     //   this.sources.data.emit('afterRender')
          //     // })
          //   }
          //   // else if (event.name == 'show') {
          //   //   this.opt('classes', {'fade-enter-active': true, 'fade-enter': true})
          //   //   requestAnimationFrame(() => {
          //   //     this.opt('classes', {'fade-enter': false})
          //   //     projector.scheduleRender()
          //   //   })
          //   // }
          //   // else if (event.name == 'show:done') {
          //   //   this.opt('classes', {'fade-enter-active': false})
          //   // }
          //   // else if (event.name == 'hide') {
          //   //   this.opt('classes', {'fade-enter-active': true, 'fade-enter': true})
          //   // }
          // },
//           dataChanged: function (v) {
// //            this.opt('classes', {'fade-enter': v.p})
//           }
        }
      }
    }
  }
}
