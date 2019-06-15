import {IconBox} from '../src'


export const Mixins = {

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
    if (this.options.format) {
      v = this.options.format.call(this, v)
    }
    return {text: v}
  },
  Src: function (v) {
    return {src: v}
  },
  DynamicItems: function (v, key) {
    return {$items: key}
  },
  DynamicComponents: function (v, key) {
    return {$components: key}
  },
  Value: function (v) {
    return {value: v}
  }
}
