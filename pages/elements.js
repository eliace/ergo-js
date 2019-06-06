import {Html, Layouts, Tabs, IconBox, Text, Box, Button, Buttons, List, Content, Delete, Notification} from '../src'

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.'

const Mutate = {
  TextAndKey: function (v) {return {key: v, text: v}},
  Text: function (v) {return {text: v}},
  Icon: function (v) {return {icon: v}}
}

const Mixins = {
  Fas: function () {
    return  {
      components: {
        content: {
          classes: {'fas': true}
        }
      }
    }
  },
  WithIcon: function () {
    return {
      components: {
        content: {
          components: {
            icon: {
              type: IconBox,
              mixins: [Mixins.Fas],
            },
            content: {
              html: 'span'
            }
          }
        }
      }
    }
  },
  Selectable: function () {
    return {
      selectionChanged: function (v) {
        const isSelected = v == (this.opt('key') || this.opt('text'))
        this.opt('selected', isSelected) //{selected: v == (this.opt('key') || this.opt('text'))}
        // if (this.options.onSelected) {
        //   this.options.onSelected.call(this, isSelected)
        // }
      },
      onMouseDown: function() {
//        this.sources.selection.set()
//        this.sources.selection.emit('set', this.options.key || this.options.text, this.options.onSelected)
        this.sources.selection.wait([{name: 'selected'}]).emit('set', {data: this.options.key || this.options.text})
//        console.log(this.sources.selection.ns())
      },
      selectionEffects: function (event) {
//        console.log('selection', event)
        if (event.name == 'selected' || event.name == 'init') {
          this.options.onSelected && this.options.onSelected.call(this, this.sources.selection.get() == (this.opt('key') || this.opt('text')))
        }
        // if (effect.status == 'done') {
        //   this.options.onSelected && this.options.onSelected.call(this, effect.data == (this.opt('key') || this.opt('text')))
        // }
      }
      // selectionEffects: {
      //   'changed'
      // }
    }
  }
}

export default () => {
  return {
    layout: Layouts.Rows,
    $box: {
      layout: Layouts.Columns,
      defaultItem: {
        type: Box,
        text: "I'm the Box"
      },
      items: [{
      }, {
        as: 'has-text-primary',
      }, {
        as: 'has-background-info has-text-light',
      }, {
        as: 'is-warning'
      }]
    },
    $button: {
      layout: Layouts.Rows,
      items: [{
        type: Button,
        text: 'Button'
      }, {
        type: Buttons,
        items: [{
          html: 'a',
          text: 'Link'
        }, {
          html: 'button',
          text: 'Button'
        }, {
          html: 'input',
          _type: 'submit',
          value: 'Submit'
        }, {
          html: 'input',
          _type: 'reset',
          value: 'Reset'
        }]
      }, {
        sources: {
          selection: 'Bob'
        },
        type: Buttons,
        as: 'has-addons',
        defaultItem: {
          mixins: [Mixins.Selectable],
          onSelected: function (v) {
            // в качестве стороннего эффекта устанавливаем класс is-info
            this.opt('classes', {'is-info': v})
          }
        },
        items: ['Alice', 'Bob', 'Charlie']
      }]
    },
    $list: {
      layout: Layouts.Content,
      defaultItem: {
        type: List,
      },
      items: [{
        type: List,
        html: 'ul',
        items: ['Alice', 'Bob', 'Charlie']
      }, {
        layout: Layouts.Columns,
        defaultItem: {
          type: List,
          html: 'ol'
        },
        items: [{
          _type: '1',
          items: ['Alice', 'Bob', 'Charlie']
        }, {
          _type: 'A',
          items: ['Alice', 'Bob', 'Charlie']
        }, {
          _type: 'a',
          items: ['Alice', 'Bob', 'Charlie']
        }, {
          _type: 'I',
          items: ['Alice', 'Bob', 'Charlie']
        }, {
          _type: 'i',
          items: ['Alice', 'Bob', 'Charlie']
        }]
      }, {
        html: 'dl',
        items: [{
          html: 'dt',
          text: 'Users'
        }, {
          html: 'dd',
          text: 'Alice'
        }, {
          html: 'dd',
          text: 'Bob'
        }, {
          html: 'dt',
          text: 'Administrators'
        }, {
          html: 'dd',
          text: 'Charlie'
        }]
      }]
    },
    $typo: {
      layout: Layouts.Content,
      items: [{
        items: [1,2,3,4,5,6].map((itm, i) => {return {html: 'h'+(i+1), text: 'Heading '+(i+1)}})
      }, {
        html: 'blockquote',
        text: LOREM_IPSUM
      }]
    },
    $del: {
      items: [{
        type: Delete
      }]
    },
    $notification: {
      items: [{
        type: Notification,
        text: LOREM_IPSUM
      }]
    }
  }
}
