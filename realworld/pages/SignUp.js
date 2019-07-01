import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import Field from '../elements/Field'
import Auth from '../components/Auth'
import {sendRegister} from '../effectors'

export default () => {
  return {
    sources: {
      data: {

      }
    },
    dataMethods: {
      signUp: sendRegister
    },
    dataEvents: function (evt) {
      if (evt.name == sendRegister.fail) {
        const errors = []
        for (let i in evt.data.errors) {
          const field = evt.data.errors[i]
          field.forEach(err => {
            errors.push(i + ' ' + err)
          })
        }
        console.log(evt.data)
        this.domain.page.set('errorMessages', errors)
      }
      else if (evt.name == sendRegister.done) {
        this.domain.router.toProfile()
      }
    },
    type: Auth,
    body: {
      $title: {
        text: 'Sign up'
      },
      $subtitle: {
        html: 'p',
        $content: {
          html: 'a',
          href: '/#/login'
        },
        text: 'Have an account?'
      },
      $errorMessages: {
        pageId: 'errorMessages',
        pageChanged: Mutate.Items,
        defaultItem: {
          pageChanged: Mutate.Text
        }
      },
      $form: {
        items: [{
          placeholder: 'Your Name',
          dataId: 'username'
        }, {
          placeholder: 'Email',
          dataId: 'email'
        }, {
          placeholder: 'Password',
          _type: 'password',
          dataId: 'password'
        }],
        $submit: {
          text: 'Sign up',
          onClick: function (e) {
            e.preventDefault()
//            console.log(this.domain.data.get())
            this.domain.data.signUp(this.domain.data.get())
          }
        }
      },
      pageChanged: Mutate.Components
    }
  }
}


// "user": {
//     "id": 59456,
//     "email": "ufhfjfhf@fhggj.hg",
//     "createdAt": "2019-06-29T17:30:34.065Z",
//     "updatedAt": "2019-06-29T17:30:34.071Z",
//     "username": "hood",
//     "bio": null,
//     "image": null,
//     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTk0NTYsInVzZXJuYW1lIjoiaG9vZCIsImV4cCI6MTU2NzAxMzQzNH0.QWJXNOEs9ayeadIbENV22Y91GMgdGk9wS6jbKgCVW9w"
// }
