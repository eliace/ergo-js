import {Html, Layout, Source, Text} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import PassThroughLayout from '../layouts/PassThrough'
import Field from '../elements/Field'



export default () => {
  return {
    sources: {
      data: {}
    },
    as: 'settings-page',
    $content: {
      as: 'container page',
      layout: ColumnsLayout,
      $content: {
        col: 'col-md-6 offset-md-3 col-xs-12',
        $title: {
          html: 'h1',
          as: 'text-xs-center',
          text: 'Your Settings'
        },
        $div: {
          html: 'br'
        },
        $form: {
          html: 'form',
          $content: {
            html: 'fieldset',
            defaultItem: {
              type: Field.Input
            },
            items: [{
              placeholder: 'URL of profile picture',
              dataId: 'imageUrl'
            }, {
              size: 'lg',
              placeholder: 'Your Name',
              dataId: 'username'
            }, {
              type: Field.TextArea,
              rows: 8,
              size: 'lg',
              placeholder: 'Short bio about you',
              dataId: 'bio'
            }, {
              size: 'lg',
              placeholder: 'Email',
              dataId: 'email'
            }, {
              _type: 'password',
              size: 'lg',
              placeholder: 'Password',
              dataId: 'password'
            }],
            $submit: {
              html: 'button',
              weight: 10,
              as: 'btn btn-lg btn-primary pull-xs-right',
              text: 'Update Settings'
            }
          }
        },
        $div: {
          html: 'hr'
        },
        $logoutBtn: {
          html: 'button',
          as: 'btn btn-outline-danger',
          text: 'Or click here to logout',
          onClick: function (e) {
            e.preventDefault()
            this.domain.page.logout()
          }
        }
      }
    }
  }
}
