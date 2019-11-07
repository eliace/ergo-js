import {Html, Domain} from 'chorda-core'
import {Layouts, Tabs} from 'chorda-bulma'

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

import {PreviewAndCode} from '../extensions'

//import fs from 'fs'

function previewOf (exampleCreator, code) {
  return {
    as: PreviewAndCode,
    $preview: exampleCreator(),
    $code: {
      text: code
    }
  }
}

import BoxCode from 'raw-loader!./box'// = ''//fs.readFileSync(__dirname+'/box.js', 'utf-8')
//import ButtonCode from 'raw-loader!./button'//fs.readFileSync(__dirname+'/button.js', 'utf-8')
//import ContentCode  from 'raw-loader!./content'//fs.readFileSync(__dirname+'/content.js', 'utf-8')
import DeleteCode from 'raw-loader!./delete'//fs.readFileSync(__dirname+'/delete.js', 'utf-8')
import IconCode from 'raw-loader!./icon'//fs.readFileSync(__dirname+'/icon.js', 'utf-8')
import ImageCode from 'raw-loader!./image'//fs.readFileSync(__dirname+'/image.js', 'utf-8')
import NotificationCode from 'raw-loader!./notification'//fs.readFileSync(__dirname+'/notification.js', 'utf-8')
import ProgressCode from 'raw-loader!./progress'//fs.readFileSync(__dirname+'/progress.js', 'utf-8')
import TableCode from 'raw-loader!./table'//fs.readFileSync(__dirname+'/table.js', 'utf-8')
import TagCode from 'raw-loader!./tag'//fs.readFileSync(__dirname+'/tag.js', 'utf-8')
import TitleCode from 'raw-loader!./title'//fs.readFileSync(__dirname+'/title.js', 'utf-8')


export default () => {

  const Data = new Domain({
    selected: 'Box'
  }, {
    properties: {
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
      css: 'example-header',
      layout: Layouts.Level,
      $title: {
        css: 'example-title',
        layout: Layouts.Content,
        $content: {
          html: 'h4'
        },
        text: 'Elements'
      },
      $tabs: {
        sources: {
          __state: (ctx, o) => ctx.data
        },
        as: Tabs,
        level: Layouts.Level.RIGHT,
//         defaultTab: {
// //           dataChanged: function (v) {
// //             this.opt('key', v)
// // //            this.opt('active', this.options.text == v.selected)
// //           },
//           // onClick: function (e, {data}) {
//           //   data.set('selected', this.options.text)
//           // }
//         },
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
      components: false,
      // dataChanged: function (v, k, s) {
      //   debugger
      //   this.opt('components', s.$stream(k))
      // },
      dataChanged: function (v, s, k) {
        this.opt('components', s.$iterator(k))
      },
      $box: BoxExample,// previewOf(BoxExample, BoxCode),
      $button: ButtonExample,//previewOf(ButtonExample, ButtonCode),
      $content: ContentExample,//previewOf(ContentExample, ContentCode),
      $delete: previewOf(DeleteExample, DeleteCode),
      $icon: IconExample,//previewOf(IconExample, IconCode),
      $image: ImageExample,//previewOf(ImageExample, ImageCode),
      $notification: NotificationExample,// previewOf(NotificationExample, NotificationCode),
      $progress: previewOf(ProgressExample, ProgressCode),
      $table: previewOf(TableExample, TableCode),
      $tag: previewOf(TagExample, TagCode),
      $title: previewOf(TitleExample, TitleCode),
    }
  }
}
