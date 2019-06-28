import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import Auth from '../components/Auth'

export default () => {
  return {
    type: Auth,
    body: {
      $title: {
        text: 'Sign in'
      },
      $subtitle: {
        text: 'Need an account?'
      },
      $form: {
        items: [{
          placeholder: 'Email'
        }, {
          placeholder: 'Password',
          _type: 'password'
        }],
        $submit: {
          text: 'Sign in'
        }
      }
    }
  }
}
