import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import Field from '../elements/Field'
import Auth from '../components/Auth'

export default () => {
  return {
    type: Auth,
    body: {
      $title: {
        text: 'Sign up'
      },
      $subtitle: {
        text: 'Have an account?'
      },
      $form: {
        items: [{
          placeholder: 'Your Name'
        }, {
          placeholder: 'Email'
        }, {
          placeholder: 'Password',
          _type: 'password'
        }],
        $submit: {
          text: 'Sign up'
        }
      }
    }
  }
}