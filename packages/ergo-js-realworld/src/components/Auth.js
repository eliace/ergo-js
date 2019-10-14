import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import Field from '../elements/Field'
import Page from '../components/Page'

export default class Auth extends Page {
  static defaultOpts = {
    css: 'auth-page',
    body: {
      components: {
        title: {
          html: 'h1',
          css: 'text-xs-center',
          text: 'Sign up',
          weight: 10
        },
        subtitle: {
          html: 'p',
          css: 'text-xs-center',
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
          css: 'error-messages',
          defaultItem: {
            html: 'li'
          },
          weight: 30
        },
        form: {
          html: 'form',
          weight: 40,
          defaultItem: {
            as: Field.Input,
            size: 'lg'
          },
          components: {
            submit: {
              html: 'button',
              css: 'btn btn-lg btn-primary pull-xs-right',
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
