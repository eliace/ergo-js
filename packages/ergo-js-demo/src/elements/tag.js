import {Html} from 'chorda-core'
import {Layouts, Box, Tag, Delete, IconBox, Image as ImageBox} from 'chorda-bulma'

class Tags extends Html {
  config () {
    return {
      css: 'tags',
      defaultItem: {
        as: Tag
      }
    }
  }
}


export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      css: 'tags',
      defaultItem: {
        as: Tag
      },
      items: ['Black', 'Dark', 'Light', 'White', 'Primary', 'Link', 'Info', 'Success', 'Warning', 'Danger'].map(k => {
        return {css: 'is-'+k.toLowerCase(), text: k}
      })
    }, {
      as: Tags,
      items: [
        {text: 'Normal', css: 'is-normal'},
        {text: 'Medium', css: 'is-medium'},
        {text: 'Large', css: 'is-large'},
      ]
    }, {
      as: Tags,
      css: 'are-medium',
      items: ['Alice', 'Bob', 'Charlie']
    }, {
      as: Tags,
      items: [
        {css: 'is-rounded', text: 'Rounded'},
        {css: 'is-delete'}
      ]
    }, {
      as: Tags,
      defaultItem: {
        $deleteBtn: {
          as: Delete,
          weight: 10
        }
      },
      items: [{
        css: 'is-success',
        $deleteBtn: {css: 'is-small'},
        text: 'Success'
      }, {
        css: 'is-warning is-medium',
        $deleteBtn: {css: 'is-small'},
        text: 'Warning'
      }, {
        css: 'is-danger is-large',
        text: 'Danger'
      }]
    }, {
      as: Tags,
      css: 'has-addons',
      items: [{text: 'Ergo', css: 'is-primary'}, {text: 'JS', css: 'is-dark'}]
    }, {
      as: Tags,
      css: 'has-addons',
      items: [{text: 'JavaScript', css: 'is-link'}, {css: 'is-delete'}]
    }, {
      as: Tag,
      css: 'is-rounded is-medium',
      $image: {
        as: ImageBox,
        src: 'https://randomuser.me/api/portraits/thumb/men/28.jpg',
        styles: {
          margin: '0 0.325rem 0 -0.325rem',
          display: 'inline-flex',
          width: '1.5rem',
          height: '1.5rem'
        },
        $content: {
          css: 'is-rounded'
        }
      },
      $icon: {
        as: IconBox,
        icon: 'fas fa-user',
        css: 'is-rounded',
        styles: {
          backgroundColor: '#ddd',
          borderRadius: '50%',
          marginRight: '0.325rem'
        }
      },
      $content: {
        text: 'Alice'
      }
    }]
  }
}
