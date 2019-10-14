import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import Auth from '../components/Auth'
import {sendLogin} from '../effectors'

export default () => {
  return {
    sources: {
      data: {

      }
    },
    dataMethods: {
      signIn: sendLogin
    },
    dataEvents: function (e) {
      if (e.name == sendLogin.done) {
        const user = e.data.user
//        this.domain.token.set(user.token)
        this.domain.page.login(user)
      }
    },
    as: Auth,
    body: {
      $title: {
        text: 'Sign in'
      },
      $subtitle: {
        html: 'p',
        $content: {
          html: 'a',
          href: '/#/register'
        },
        text: 'Need an account?'
      },
      $form: {
        items: [{
          placeholder: 'Email',
          dataId: 'email'
        }, {
          placeholder: 'Password',
          type: 'password',
          dataId: 'password'
        }],
        $submit: {
          text: 'Sign in',
          onClick: function (e) {
            e.preventDefault()
            this.domain.data.signIn(this.domain.data.get())
          }
        }
      }
    }
  }
}
