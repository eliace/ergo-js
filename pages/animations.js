import {Html, Layouts, Tabs, IconBox, Text, Box, Button} from '../src'

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
              if (event == 'showContentAnimation:done') {
                this.vnode.domNode.focus()
              }
            }
          }]
        },
        onUpdateAnimation: function (el) {
          this.sources.modal.emit('updateAnimation', el)
        },
      },
      $closeBtn: {
        as: 'modal-close is-large',
        onClick: function () {
          this.sources.modal.set('modal', false)
        }
      },
      modalChanged: function (v, key) {
        console.log('add classes')
//        this.$content.opt('classes', {'animated': v.modal, 'fadeIn': v.modal})
      },
      modalEffects: function (event, data, key) {
        console.log('event', event)
        if (event == 'showOverlayAnimation:done') {
//          this.$overlay.opt('classes', {'animated': false, 'fadeIn': false})
          this.$content.opt('classes', {'animated': true, 'tada': true, 'is-hidden': false})
//          projector.renderNow()
          projector.scheduleRender()
        }
        else if (event == 'showOverlayAnimation:wait') {
//          debugger
          this.$overlay.opt('classes', {'animated': true, 'fadeIn': true})
//          projector.scheduleRender()
        }
        else if (event == 'showContentAnimation:done') {
          this.$content.opt('classes', {'animated': false, 'tada': false, 'is-hidden': false})
//          projector.renderNow()
          projector.scheduleRender()
        }
      },
      onEnterAnimation: function (el) {
//        requestAnimationFrame(() => {
        this.sources.modal.emit('enterAnimation', el)
//        });
      }
    },
    $openModalBtn: {
      type: Button,
      text: 'Open Modal',
      onClick: function () {
        const effects = [{
          waitFor: ['showOverlayAnimation:done'],
          use: doTransition,
          name: 'showContentAnimation'
        }, {
          name: 'showOverlayAnimation',
          waitFor: ['enterAnimation'],
          use: doTransition
        }]

        this.sources.modal.emit('mergeWith', {modal: true}, null, effects)

//        this.sources.modal.set('modal', true)
      }
    }
  }
}
