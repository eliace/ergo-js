import {Html, Layouts, Tabs, Source} from '../../src'

import {Mutate} from '../helpers'

import BoxExample from './box'
import ButtonExample from './button'
import ContentExample from './content'
import DeleteExample from './delete'
import IconExample from './icon'
import ImageExample from './image'
import NotificationExample from './notification'
import TagExample from './tag'
import TitleExample from './title'
import ProgressExample from './progress'
import TableExample from './table'

export default (projector) => {

  const Data = new Source({
    selected: 'Box'
  }, {
    computed: {
      box: (v) => v.selected == 'Box',
      button: (v) => v.selected == 'Button',
      content: (v) => v.selected == 'Content',
      delete: (v) => v.selected == 'Delete',
      icon: (v) => v.selected == 'Icon',
      image: (v) => v.selected == 'Image',
      notification: (v) => v.selected == 'Notification',
      progress: (v) => v.selected == 'Progress',
      table: (v) => v.selected == 'Table',
      tag: (v) => v.selected == 'Tag',
      title: (v) => v.selected == 'Title',
    }
  })

//  console.log('box', Data.get('box'))
//  console.log(Data instanceof Function)

  return {
    sources: {
      data: Data
    },
    layout: Layouts.Rows,
    $header: {
      $title: {
        layout: Layouts.Content,
        $content: {
          html: 'h3'
        },
        text: 'Elements'
      },
      $tabs: {
        type: Tabs,
        defaultTab: {
          dataChanged: function (v) {
            this.opt('selected', this.options.text == v.selected)
          },
          onClick: function () {
            this.sources.data.set('selected', this.options.text)
          }
        },
        tabs: [
          {text: 'Box'},
          {text: 'Button'},
          {text: 'Content'},
          {text: 'Delete'},
          {text: 'Icon'},
          {text: 'Image'},
          {text: 'Notification'},
          {text: 'Progress'},
          {text: 'Table'},
          {text: 'Tag'},
          {text: 'Title'},
        ]
      }
    },
    $content: {
      dynamic: true,
      dataChanged: Mutate.DynamicComponents,
      $box: BoxExample(projector),
      $button: ButtonExample(projector),
      $content: ContentExample(projector),
      $delete: DeleteExample(projector),
      $icon: IconExample(projector),
      $image: ImageExample(projector),
      $notification: NotificationExample(projector),
      $progress: ProgressExample(projector),
      $table: TableExample(projector),
      $tag: TagExample(projector),
      $title: TitleExample(projector),
    }
  }
}
