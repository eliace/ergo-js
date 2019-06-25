import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'

export default () => {
  return {
    as: 'auth-page',
    $content: {
      as: 'container page',
      layout: ColumnsLayout,
      $content: {
        col: 'col-md-6 offset-md-3 col-xs-12',
        $title: {
          html: 'h1',
          as: 'text-xs-center',
          text: 'Sign up'
        },
        $subtitle: {
          html: 'p',
          as: 'text-xs-center',
          $content: {
            html: 'a',
            href: ''
          },
          text: 'Have an account?'
        },
        $errorMessages: {
          html: 'ul',
          as: 'error-messages',
          defaultItem: {
            html: 'li'
          },
          items: ['That email is already taken']
        },
        $form: {
          html: 'form',
          defaultItem: {
            html: 'fieldset',
            as: 'form-group',
            _type: 'text',
            $input: {
              html: 'input',
              as: 'form-control form-control-lg',
            },
            dynamicOptions: {
              placeholder: {
                initOrSet: function (v) {
                  this.$input.opt('placeholder', v)
                }
              },
              _type: {
                initOrSet: function (v) {
                  this.$input.opt('_type', v)
                }
              }
            }
          },
          items: [{
            placeholder: 'Your Name'
          }, {
            placeholder: 'Email'
          }, {
            placeholder: 'Password',
            _type: 'password'
          }],
          $submit: {
            html: 'button',
            as: 'btn btn-lg btn-primary pull-xs-right',
            text: 'Sign up',
            weight: 10
          }
        }
      }
    }
  }
}
