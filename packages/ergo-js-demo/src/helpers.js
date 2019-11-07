import {IconBox} from 'chorda-bulma'


export const Mixins = {

  Selectable2: function () {
    return {
      // для примеси этот способ не подходит
      sourcesBound: function ({selection}) {
        selection.$method('select', this, (v) => {
          selection.set(v)
        })
      },
      onMouseDown: function (e) {
        this.sources.selection.select(this.key || this.text)
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
        this.sources.selection.wait([{name: 'selected'}]).emit('set', {data: this.key || this.text})
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
            as: IconBox,
            css: 'is-small',
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
            as: IconBox,
            css: 'is-small is-left',
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
    if (this.options.format) {
      v = this.options.format.call(this, v)
    }
    return {text: v}
  },
  Src: function (v) {
    return {src: v}
  },
  Items: function (v, s, k) {
    return {items: s.$iterator(k)}
  },
  Components: function (v, stream) {
    return {components: stream}
  },
  Value: function (v) {
    return {value: v}
  },
  Key: function (v) {
    return {key: v}
  },
  Tabs: function (v, s, k) {
    return {tabs: s.$iterator(k)}
  }
}

export function compose (a, b) {
  return function (v) {
    return {...a.call(this, v), ...b.call(this, v)}
  }
}




