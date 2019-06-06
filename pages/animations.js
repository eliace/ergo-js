import {Html, Layouts, Tabs, IconBox, Text, Box, Button, Buttons, Events, Notification} from '../src'

import 'animate.css'

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.'


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
    Events.on('animationend', function (e) {
//      if (e.target == target.vnode.domNode) {
        console.log ('animationend', target)
        resolve()
//        projector.scheduleRender()
        Events.off('transitionend', target)
        Events.off('animationend', target)
//      }
    }, target)
    Events.on('transitionend', function (e) {
//      if (e.target == target.vnode.domNode) {
        console.log ('transitionend', target)
        resolve()
//        projector.scheduleRender()
        Events.off('transitionend', target)
        Events.off('animationend', target)
//      }
    }, target)
  })
}


export default (projector) => {
  return {
    sources: {
      modal: {modal: false, notifications: []}
    },
    dynamic: true,
    modalChanged: function (v, key) {
      this.opt('$components', key)
    },
    $modal: {
      as: 'modal is-active',
      $overlay: {
        as: 'modal-background',
        modalEffectors: {
          showOverlay: function () {
            // конструируем эффект
            return doGlobalAnimation(this, projector)
          },
          hideOverlay: function (v) {
            return doGlobalAnimation(this, projector, v)
          }
        },
        modalEffects: function (event) {
          console.log('overlay event', event)
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
            projector.scheduleRender()
          }
        }
      },
      $content: {
        as: 'modal-content',
        classes: {
          'is-hidden': true
        },
        $content: {
          type: Box,
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
        modalEffectors: {
          showContent: function () {
            return doGlobalAnimation(this, projector)
          },
          hideContent: function (v) {
            return doGlobalAnimation(this, projector, v)
          }
        },
        modalEffects: function (event) {
          console.log('content event', event)
          if (event.name == 'showContent') {
            this.opt('classes', {'animated': true, 'slideInDown': true, 'is-hidden': false})
            projector.scheduleRender()
          }
          else if (event.name == 'showContent:done') {
            this.opt('classes', {'animated': false, 'slideInDown': false})
          }
          else if (event.name == 'hideContent') {
            this.opt('classes', {'animated': true, 'slideOutUp': true})
          }
          else if (event.name == 'hideContent:done') {
            this.opt('classes', {'animated': false, 'slideOutUp': false, 'is-hidden': true})
            projector.scheduleRender()
          }
          else if (event.name == 'mergeWith') {
          }
        }
        // onUpdateAnimation: function (el) {
        //   this.sources.modal.emit('updateAnimation', el)
        // },
      },
      $closeBtn: {
        as: 'modal-close is-large',
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
          this.sources.modal.wait(effects).emit('mergeWith', {data: {modal: false}})
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
      as: 'collapse-box',
      styles: {
        'position': 'fixed',
        'top': '1rem',
        'right': '1rem',
        'z-index': '40'
      },
      dynamic: true,
      modalId: 'notifications',
      modalChanged: function (v, key) {
        this.opt('$items', key)
      },
      defaultItem: {
        as: 'collapse-item',
        $content: {
          type: Notification,
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
        modalEffectors: {
          hide: function () {
            return doGlobalAnimation(this)
          },
          collapse: function () {
            return doGlobalAnimation(this)
          }
        },
        modalEffects: function (event) {
          console.log('collapsible event', event)
          if (event.name == 'hide') {
            this.opt('classes', {/*collapse: true,*/ animated: true, flipOutX: true})
          }
          else if (event.name == 'hide:done') {
            this.opt('classes', {/*collapse: true,*/ animated: false, flipOutX: false})
          }
          else if (event.name == 'collapse') {
            this.opt('classes', {collapse: true, 'is-invisible': true})
            projector.scheduleRender()
          }
          else if (event.name == 'collapse:done') {
            this.opt('classes', {collapse: false, 'is-invisible': false})
            projector.scheduleRender()
          }
        }
      }
    },
    $buttons: {
      type: Buttons,
      $openModalBtn: {
        type: Button,
        text: 'Open Modal',
        onClick: function () {
          const effects = [{
            effector: 'showOverlay'
          }, {
            effector: 'showContent',
  //          watch: function (event) {return event.name == 'showOverlay:done'}
  //          waitFor: ['showOverlay:done']
          }, {
            name: 'focusInput',
            watch: function (event) {return event.name == 'showContent:done'}
  //          waitFor: ['showContent:done']
          }]

          this.sources.modal.wait(effects).emit('mergeWith', {data: {modal: true}})

  //        this.sources.modal.set('modal', true)
        }
      },
      $openNotifyBtn: {
        type: Button,
        text: 'Show notification',
        onClick: function () {

          this.sources.modal.entry('notifications').add({text: LOREM_IPSUM + new Date().getTime()})
        }
      }
    }
  }
}
