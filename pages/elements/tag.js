import {Html} from '../../src'
import {Layouts, Box, Tag, Delete} from '../../bulma'

class Tags extends Html {
  static defaultOpts = {
    as: 'tags',
    defaultItem: {
      type: Tag
    }
  }
}


export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: 'tags',
      defaultItem: {
        type: Tag
      },
      items: ['Black', 'Dark', 'Light', 'White', 'Primary', 'Link', 'Info', 'Success', 'Warning', 'Danger'].map(k => {
        return {as: 'is-'+k.toLowerCase(), text: k}
      })
    }, {
      type: Tags,
      items: [
        {text: 'Normal', as: 'is-normal'},
        {text: 'Medium', as: 'is-medium'},
        {text: 'Large', as: 'is-large'},
      ]
    }, {
      type: Tags,
      as: 'are-medium',
      items: ['Alice', 'Bob', 'Charlie']
    }, {
      type: Tags,
      items: [
        {as: 'is-rounded', text: 'Rounded'},
        {as: 'is-delete'}
      ]
    }, {
      type: Tags,
      defaultItem: {
        $deleteBtn: {
          type: Delete,
          weight: 10
        }
      },
      items: [{
        as: 'is-success',
        $deleteBtn: {as: 'is-small'},
        text: 'Success'
      }, {
        as: 'is-warning is-medium',
        $deleteBtn: {as: 'is-small'},
        text: 'Warning'
      }, {
        as: 'is-danger is-large',
        text: 'Danger'
      }]
    }, {
      type: Tags,
      as: 'has-addons',
      items: [{text: 'Ergo', as: 'is-primary'}, {text: 'JS', as: 'is-dark'}]
    }, {
      type: Tags,
      as: 'has-addons',
      items: [{text: 'JavaScript', as: 'is-link'}, {as: 'is-delete'}]
    }]
  }
}
