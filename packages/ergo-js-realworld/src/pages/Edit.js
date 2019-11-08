import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import Field from '../elements/Field'


export default () => {
  return {
    sources: {
      data: {}
    },
    css: 'editor-page',
    $content: {
      css: 'container page',
      layout: ColumnsLayout,
      $form: {
        col: 'col-md-10 offset-md-1 col-xs-12',
        html: 'form',
        $fieldset: {
          html: 'fieldset',
          defaultItem: {
            as: Field.Input
          },
          items: [{
            placeholder: 'Article Title',
            dataId: 'title'
          }, {
            placeholder: 'What\'s this article about?',
            dataId: 'description'
          }, {
            as: Field.TextArea,
            placeholder: 'Write your article (in markdown)',
            rows: 8,
            dataId: 'body'
          }, {
            placeholder: 'Enter tags',
            $tags: {
              css: 'tag-list'
            },
            dataId: 'tags'
          }],
          $publishBtn: {
            html: 'button',
            css: 'btn btn-lg pull-xs-right btn-primary',
            text: 'Publish Article',
            weight: 10
          }
        }
      }
    }
  }
}
