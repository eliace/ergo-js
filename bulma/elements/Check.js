import { Html, Layout } from '../../src'
import {uuid} from '../utils'

function generateIdFor (mixer) {
  const uid = 'check_' + uuid()
  mixer.merge({
    $input: {
      id: uid
    },
    $content: {
      htmlFor: uid
    }
  })
}

export default class Check extends Html {
    config () {
      return {
        layout: Layout.passthru,
        $input: {
          html: 'input',
          css: 'is-checkradio',
          type: 'checkbox',
          onChange: function (v, {value}) {
            value.$toggle()
          },
          valueChanged: function (v) {
            this.opt('checked', v)
          }
        },
        $content: {
          html: 'label'
        },
        mix: { generateIdFor },
        sources: {
          value: false
        }
      }
    }
  
    options () {
      return {
        checked: {
          initOrSet: function (v) {
            this.sources.value.set(v)
//            this.$input.opt('checked', v)
          }
        },
        value: {
          initOrSet: function (v) {
            this.sources.value.set(v)
//            this.$input.opt('checked', v)
          }
        },
        block: {
          initOrSet: function (v) {
            this.$input.opt('classes', {'is-block': v})
          }
        }
      }
    }
  }
  