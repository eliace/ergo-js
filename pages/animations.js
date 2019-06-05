import {Html, Layouts, Tabs, IconBox, Text, Box, Button, Events} from '../src'

import 'animate.css'

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

const doGlobalAnimation = function (target, projector, v) {
  return new Promise(function (resolve, reject) {
    Events.on('animationend', function (e) {
//      if (e.target == target.vnode.domNode) {
        console.log ('animationend', target)
        resolve(v)
        projector.scheduleRender()
        Events.off('animationend', target)
//      }
    }, target)
  })
}


export default (projector) => {
  return {
    sources: {
      modal: {modal: false}
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
          if (event == 'showOverlay') {
            this.opt('classes', {'animated': true, 'fadeIn': true})
          }
          else if (event == 'showOverlay:done') {
            this.opt('classes', {'animated': false, 'fadeIn': false})
          }
          else if (event == 'hideOverlay') {
            this.opt('classes', {'animated': true, 'fadeOut': true})
          }
          else if (event == 'hideOverlay:done') {
            this.opt('classes', {'animated': false, 'fadeOut': false})
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
              if (event == 'focusInput') {
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
          if (event == 'showContent') {
            this.opt('classes', {'animated': true, 'slideInDown': true, 'is-hidden': false})
          }
          else if (event == 'showContent:done') {
            this.opt('classes', {'animated': false, 'slideInDown': false})
          }
          else if (event == 'hideContent') {
            this.opt('classes', {'animated': true, 'slideOutUp': true})
          }
          else if (event == 'hideContent:done') {
            this.opt('classes', {'animated': false, 'slideOutUp': false, 'is-hidden': true})
          }
          else if (event == 'mergeWith') {
            debugger
            projector.scheduleRender()
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
            effector: 'hideContent'
          }, {
            effector: 'hideOverlay',
            waitFor: ['hideContent:done']
          }]
//          this.sources.modal.set('modal', false)
          this.sources.modal.waitAndEmit('mergeWith', {modal: false}, null, effects)
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
    $openModalBtn: {
      type: Button,
      text: 'Open Modal',
      onClick: function () {
        const effects = [{
          effector: 'showOverlay'
        }, {
          effector: 'showContent',
//          waitFor: ['showOverlay:done']
        }, {
          name: 'focusInput',
          waitFor: ['showContent:done']
        }]

        this.sources.modal.emit('mergeWith', {modal: true}, null, effects)

//        this.sources.modal.set('modal', true)
      }
    }
  }
}
