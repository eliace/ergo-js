import { Html, Layout } from '../../src'


export default class Switch extends Html {
    config () {
      return {
        layout: Layout.passthru,
        $input: {
          html: 'input',
          css: 'switch',
          type: 'checkbox'
        },
        $content: {
          html: 'label'
        }
      }
    }
  
    options () {
      return {
        checked: {
          initOrSet: function (v) {
            this.$input.opt('checked', v)
          }
        },
        block: {
          initOrSet: function (v) {
            this.$input.opt('classes', {'is-block': v})
          }
        },
        value: {
            initOrSet: function (v) {
                this.$input.opt('checked', !!v)
            }
        }
      }
    }
  }
  