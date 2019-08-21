import {IconBox} from '../bulma'


export const Mixins = {

  Selectable2: function () {
    return {
      // для примеси этот способ не подходит
      sourcesBound: function ({selection}) {
        selection.effect('select', this, (v) => {
          selection.set(v)
        })
      },
      onMouseDown: function (e) {
        this.sources.selection.select(this.options.key || this.options.text)
      },
      selectionEvents: function (e) {
        const {selection} = this.sources
        if (e.name == selection.select.done || e.name == 'init') {
          this.options.onSelected && this.options.onSelected.call(this, selection.get() == (this.opt('key') || this.opt('text')))
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
  },

  Button: {
    Icon: function () {
      return {
        components: {
          icon: {
            type: IconBox,
            as: 'is-small',
          },
          content: {

          }
        },
        dynamicOptions: {
          icon: {
            initOrSet: function (v) {
              this.$icon.opt('icon', v)
            }
          }
        }
      }
    }
  },

  Input: {
    LeftIcon: function () {
      return {
        classes: {'has-icons-left': true},
        components: {
          leftIcon: {
            type: IconBox,
            as: 'is-small is-left',
          }
        },
        dynamicOptions: {
          leftIcon: {
            initOrSet: function (v) {
              this.$leftIcon.opt('icon', v)
            }
          }
        }
      }
    }
  }
}

export const Mutate = {
  Text: function (v) {
    if (this.options.__raw.format) {
      v = this.options.__raw.format.call(this, v)
    }
    return {$text: v}
  },
  Src: function (v) {
    return {src: v}
  },
  DynamicItems: function (v, key) {
    return {$items: key}
  },
  Items: function (v, key) {
    return {$items: key}
  },
  DynamicComponents: function (v, key) {
    return {$components: key}
  },
  Components: function (v, key) {
    return {$components: key}
  },
  Value: function (v) {
    return {value: v}
  }
}
