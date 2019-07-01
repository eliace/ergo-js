import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import Field from '../elements/Field'
import Page from '../components/Page'

export default class Auth extends Page {
  static defaultOpts = {
    as: 'auth-page',
    body: {
      components: {
        title: {
          html: 'h1',
          as: 'text-xs-center',
          text: 'Sign up',
          weight: 10
        },
        subtitle: {
          html: 'p',
          as: 'text-xs-center',
          components: {
            content: {
              html: 'a',
              href: ''
            }
          },
          text: 'Have an account?',
          weight: 20
        },
        errorMessages: {
          html: 'ul',
          as: 'error-messages',
          defaultItem: {
            html: 'li'
          },
          weight: 30
        },
        form: {
          html: 'form',
          weight: 40,
          defaultItem: {
            type: Field.Input,
            size: 'lg'
          },
          components: {
            submit: {
              html: 'button',
              as: 'btn btn-lg btn-primary pull-xs-right',
              text: 'Sign up',
              weight: 10
            }
          }
        }
      },
      dynamic: {
        errorMessages: true
      }
    }
  }
}
