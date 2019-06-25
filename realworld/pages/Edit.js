import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import PassThroughLayout from '../layouts/PassThrough'
import Field from '../elements/Field'


export default () => {
  return {
    as: 'editor-page',
    $content: {
      as: 'container page',
      layout: ColumnsLayout,
      $form: {
        col: 'col-md-10 offset-md-1 col-xs-12',
        html: 'form',
        $fieldset: {
          html: 'fieldset',
          defaultItem: {
            type: Field.Input
          },
          items: [{
            placeholder: 'Article Title'
          }, {
            placeholder: 'What\'s this article about?'
          }, {
            type: Field.TextArea,
            placeholder: 'Write your article (in markdown)',
            rows: 8
          }, {
            placeholder: 'Enter tags',
            $tags: {
              as: 'tag-list'
            }
          }],
          $publishBtn: {
            html: 'button',
            as: 'btn btn-lg pull-xs-right btn-primary',
            text: 'Publish Article',
            weight: 10
          }
        }
      }
    }
  }
}
