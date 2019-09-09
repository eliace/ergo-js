import {Html, Domain} from '../../src'
import {Layouts, Tabs} from '../../bulma'

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

import fs from 'fs'

function previewOf (exampleCreator, code) {
  return {
    as: PreviewAndCode,
    $preview: exampleCreator(),
    $code: {
      text: code
    }
  }
}

const BoxCode = fs.readFileSync(__dirname+'/box.js', 'utf-8')
const ButtonCode = fs.readFileSync(__dirname+'/button.js', 'utf-8')
const ContentCode = fs.readFileSync(__dirname+'/content.js', 'utf-8')
const DeleteCode = fs.readFileSync(__dirname+'/delete.js', 'utf-8')
const IconCode = fs.readFileSync(__dirname+'/icon.js', 'utf-8')
const ImageCode = fs.readFileSync(__dirname+'/image.js', 'utf-8')
const NotificationCode = fs.readFileSync(__dirname+'/notification.js', 'utf-8')
const ProgressCode = fs.readFileSync(__dirname+'/progress.js', 'utf-8')
const TableCode = fs.readFileSync(__dirname+'/table.js', 'utf-8')
const TagCode = fs.readFileSync(__dirname+'/tag.js', 'utf-8')
const TitleCode = fs.readFileSync(__dirname+'/title.js', 'utf-8')


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
        as: Tabs,
        levelRight: true,
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
      components: false,
      dataChanged: Mutate.Components,
      $box: previewOf(BoxExample, BoxCode),
      $button: previewOf(ButtonExample, ButtonCode),
      $content: previewOf(ContentExample, ContentCode),
      $delete: previewOf(DeleteExample, DeleteCode),
      $icon: previewOf(IconExample, IconCode),
      $image: previewOf(ImageExample, ImageCode),
      $notification: previewOf(NotificationExample, NotificationCode),
      $progress: previewOf(ProgressExample, ProgressCode),
      $table: previewOf(TableExample, TableCode),
      $tag: previewOf(TagExample, TagCode),
      $title: previewOf(TitleExample, TitleCode),
    }
  }
}
