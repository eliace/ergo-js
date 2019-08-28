import {Html} from '../../src'
import {Layouts, Box, Tag, Delete} from '../../bulma'

class Tags extends Html {
  config () {
    return {
      as: 'tags',
      defaultItem: {
        base: Tag
      }
    }
  }
}


export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: 'tags',
      defaultItem: {
        base: Tag
      },
      items: ['Black', 'Dark', 'Light', 'White', 'Primary', 'Link', 'Info', 'Success', 'Warning', 'Danger'].map(k => {
        return {as: 'is-'+k.toLowerCase(), text: k}
      })
    }, {
      base: Tags,
      items: [
        {text: 'Normal', as: 'is-normal'},
        {text: 'Medium', as: 'is-medium'},
        {text: 'Large', as: 'is-large'},
      ]
    }, {
      base: Tags,
      as: 'are-medium',
      items: ['Alice', 'Bob', 'Charlie']
    }, {
      base: Tags,
      items: [
        {as: 'is-rounded', text: 'Rounded'},
        {as: 'is-delete'}
      ]
    }, {
      base: Tags,
      defaultItem: {
        $deleteBtn: {
          base: Delete,
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
      base: Tags,
      as: 'has-addons',
      items: [{text: 'Ergo', as: 'is-primary'}, {text: 'JS', as: 'is-dark'}]
    }, {
      base: Tags,
      as: 'has-addons',
      items: [{text: 'JavaScript', as: 'is-link'}, {as: 'is-delete'}]
    }]
  }
}
