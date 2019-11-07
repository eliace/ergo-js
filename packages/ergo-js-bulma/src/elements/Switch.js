import { Html, Layout } from 'chorda-core'
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


export default class Switch extends Html {
    config () {
      return {
        // sources: {
        //   value: () => false
        // },
        layout: Layout.passthru,
        $input: {
          html: 'input',
          css: 'switch',
          type: 'checkbox',
          // onChange: function (e, {value}) {
          //   value.$toggle()
          // },
          // valueChanged: function (v) {
          //   this.opt('checked', !!v)
          // }
        },
        $content: {
          html: 'label'
        },
        mix: { generateIdFor }
      }
    }
  
    properties () {
      return {
        checked: {
          set: function (v) {
//            this.sources.value.set(v)
            this.$input.opt('checked', v)
          }
        },
        block: {
          set: function (v) {
            this.$input.opt('classes', {'is-block': v})
          }
        },
        value: {
            set: function (v) {
//              this.sources.value.set(v)
              this.$input.opt('checked', !!v)
            }
        },
        color: {
          set: function (v) {
            this.$input.opt('classes', {['is-'+v]: true})
          }
        }
      }
    }
  }
  