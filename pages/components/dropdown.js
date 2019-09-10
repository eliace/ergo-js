import {Html, Source, Domain} from '../../src'
import {Layouts, Box, IconBox, Button, Input} from '../../bulma'

import {ButtonWithIcon} from '../extensions'
import {Mutate} from '../helpers'
import {COUNTRIES} from '../constants'


const StopMouseDown = function (el) {
  const f = (evt) => evt.stopPropagation()
  el.addEventListener('mousedown', f)
  return () => {
    el.removeEventListener('mousedown', f)
  }
}

const El = function (el) {
  this.el = el
}



class DropdownItem extends Html {
  config () {
    return {
      html: 'a',
      css: 'dropdown-item'
    }
  }

  options () {
    return {
      active: {
        initOrSet: function (v) {
          this.opt('classes', {'is-active': v})
        }
      }
    }
  }
}

class Dropdown extends Html {
  config () {
    return {
      css: 'dropdown-content',
      defaultItem: {
        as: DropdownItem
      }
    }
  }
}



class DropdownBox extends Html {
  config () {
    return {
      css: 'dropdown',
      // components: {
      //   dropdown: false
      // },
      $content: {
        tabIndex: -1,
        css: 'dropdown-trigger',
        styles: {
          'width': '100%'
        },
        $content: {
          as: ButtonWithIcon,
          css: 'is-fullwidth',
          $icon: {
            weight: 10,
            css: 'is-small dropdown-icon',
            icon: 'fas fa-angle-down'
          },
          $content: {
            styles: {
              'display': 'flex',
              'flex': '1'
            }
          },
          $placeholder: {
            html: 'span',
            css: 'dropdown-placeholder',
            styles: {
              'display': 'flex',
              'flex': '1'
            },
            text: 'Select me...'
          }
        },
      },
      $dropdown: {
        css: 'dropdown-menu',
        width: '100%',
        $content: {
          as: Dropdown
        }
      }
    }
  }

  options () {
    return {
      active: {
        initOrSet: function (v) {
          this.opt('classes', {'is-active': v})
        }
      }
    }
  }

}


class DropdownInput extends Html {
  config () {
    return {
      css: 'dropdown dropdown-input',
      dom: { StopMouseDown },
      $content: {
        css: 'dropdown-trigger',
        width: '100%',
        $content: {
          css: 'control has-icons-right input-box',
          $input: {
            as: Input,
          },
          $icon: {
            as: IconBox,
            css: 'is-small dropdown-icon is-right',
            icon: 'fas fa-angle-down'
          },
          $placeholder: {
            html: 'span',
            css: 'placeholder',
            weight: -10
          }
        }
      },
      $dropdown: {
        css: 'dropdown-menu',
        width: '100%',
        $content: {
          as: Dropdown
        }
      }
    }
  }
}





class CountryListDropdown extends Dropdown {
  config () {
    return {
      css: 'is-hovered',
      dataChanged: function (v, k) {
        this.opt('items', k)
//        this.items.filter(itm => itm.opts.active).forEach(itm => this.opts.scrollTop = itm.el.offsetTop - 20)
        this.eff((el) => {
//          console.log('scroll')
          this.items.filter(itm => itm.opts.active).forEach(itm => el.scrollTop = itm.el.offsetTop - 20)
        })
      }, //Mutate.Items,
      defaultItem: {
        onClick: function (e, {view}) {
          view.select(this.options.key)
        },
        valueChanged: function (v) {
          this.opt('active', v == this.options.key)
        },
        dataChanged: function (v) {
          this.opt('text', v.name)
          this.opt('key', v.name)
        },
        dom: { El }
      },
      dom: { El }
    }
  }

  // scrollToActiveItem () {
  //   console.log('scroll')
  //   this.items.filter(itm => itm.opts.active).forEach(itm => this.el.scrollTop = itm.el.offsetTop - 20)
  // }
}





export default () => {
  return {
    sources: {
      selection: '',
//      dropdown: true,
      data: COUNTRIES
    },
    layout: Layouts.Rows,
    items: [{
      sources: {
        view: function () {
          return new Domain({
            dropdown: false
          })
        }
      },
      as: DropdownBox,
      css: 'dropdown-select',
      width: 400,
      viewChanged: function (v, k, view) {
        // зависит только от props.dropdown
        this.opt('active', !!v.dropdown)
        this.opt('components', {dropdown: v.dropdown})
        // зависит только от props.value
        this.$content.$content.opt('text', v.value)
        this.$content.$content.opt('components', {placeholder: !v.value})
      },
      $content: {
        onClick: function (e, {dropdown, view}) {
          view.$toggle('dropdown')
          e.nativeEvent.stopImmediatePropagation()
        }
      },
      $dropdown: {
        $content: {
          css: 'is-hovered',
          dataChanged: function (v, k) {
            this.opt('items', k)
          },
          defaultItem: {
            onClick: function (e, {view}) {
              view.set('dropdown', false)
              view.set('value', this.options.key)
            },
            viewChanged: function (v) {
              this.opt('active', v.value == this.options.key)
            },
            dataChanged: function (v) {
              this.opt('text', v.name)
              this.opt('key', v.name)
            }
          }
        }
      }
    }, {
      sources: {
        value: function () {
          return new Domain(null)
        },
        view: function () {
          return new Domain({})
        },
        dropdown: function () {
          return new Domain(false)
        }
      },
      as: DropdownBox,
      css: 'dropdown-select',
      width: 400,
      allJoined: function ({view, dropdown, value}) {
        view.$method('toggle', this, () => {
          dropdown.$toggle()
        })
        view.$method('select', this, (k) => {
          dropdown.set(false)
          value.set(k)
        })
      },
      valueChanged: function (v) {
        this.$content.$content.opt('text', v)
        this.$content.$content.opt('components', {placeholder: !v})
      },
      dropdownChanged: function (v) {
        this.opt('active', !!v)
        this.opt('components', {dropdown: !!v})
      },
      $content: {
        onClick: function (e, {view}) {
          view.toggle()
          e.nativeEvent.stopImmediatePropagation()
        }
      },
      $dropdown: {
        $content: {
          as: CountryListDropdown
        }
      }
    }, {
      sources: {
        value: () => new Domain('Algeria'),
        view: (o, ctx) => new Domain({list: [], filter: ''}, {
          properties: {
            filter: {},
            list: {},
            filteredList: (v) => {
              return v.list.filter(country => country.name.toLowerCase().startsWith(v.filter.toLowerCase()))
            },
            placeholder: ({filter}, props) => {
              const filteredList = props.filteredList
              if (filter) {
                return filteredList.length > 0 ? filter+filteredList[0].name.substr(filter.length) : filter
              }
              else {
                return 'Search...'
              }
            }
          }
        }),
//        dropdown: () => new Domain(false)
      },
      allJoined: function ({view, dropdown, value, data}) {
        // view.$method('focus', this, () => {
        //   dropdown.set(true)
        // })
        view.$method('select', this, (k) => {
          dropdown.set(false)
          value.set(k)
        })
        view.$method('filter', this, (v) => {
          dropdown.set(true)
          view.set('filter', v)
        })
        value.$watch(e => e.name == 'changed', this, (e) => {
          view.set('filter', e.data)
        })
        data.$watch(e => e.name == 'changed', this, (e) => {
          view.set('list', e.data)
        })
        dropdown.$watch(e => e.name == 'changed', this, (e) => {
          if (!e.data) {
            view.set('filter', value.get())
          }
        })
      },
      as: DropdownInput,
      width: 400,
      dropdownChanged: function (v, k) {
        this.opt('components', {dropdown: !!v})
        this.opt('classes', {'is-active': !!v})
      },
      $content: {
        $content: {
          viewChanged: function (v, k, d) {
            // this.$placeholder.opts.text = vm.props.placeholder
            // this.$input.opts.value = vm.props.filter
            this.$placeholder.opt('text', d.get('placeholder'))
            this.$input.opt('value', d.get('filter'))
          },
          $input: {
            // onFocus: function (e, {view}) {
            //   view.focus()
            // },
            onChange: function (e, {view}) {
              view.filter(e.target.value)
            }
          }
        }
      },
      $dropdown: {
        $content: {
          sources: {
            data: (o, ctx) => ctx.view.$entry('filteredList')
          },
          as: CountryListDropdown
        }
      }
    }/*, {
      sources: {
        vm: {
          input: '',
          placeholder: '',
          dropdown: false
        },
        selection: ''
      },
      css: 'dropdown dropdown-input',
      width: 400,
      dynamic: true,
      onMouseDown: function (e) {
        e.stopImmediatePropagation()
      },
//      active: true,
      _inputFocus: function () {
        if (!this._key) {
          this._key = 'select3'
        }
        this.sources.dropdown.set(this._key)
        return false
      },
      _inputValue: function (v) {
        this.sources.selection.set(v)
      },
      _itemClicked: function (item) {
        this.sources.selection.set(item.options.key)
        this.sources.dropdown.set(false)
      },
      dropdownChanged: function (v, k) {
        this.sources.vm._updating = false
        this.sources.vm.set('dropdown', v == this._key)
        this.sources.vm._updating = true
      },
      selectionChanged: function (v, k) {

        let ph = 'Search...'

        if (v) {
          const names = this.sources.data.get()
            .map(country => country.name)
            .filter(name => name.toLowerCase().startsWith(v.toLowerCase()))
            .sort()

          if (names.length > 0) {
            ph = v+names[0].substr(v.length)
          }
          else {
            ph = v
          }
        }

        this.sources.vm._updating = true
        this.sources.vm.set('input', v)
        this.sources.vm.set('placeholder', ph)
      },
      vmChanged: function (v, k) {
        this.opt('components', k)
        this.opt('classes', {'is-active': v.dropdown})
//        console.log('vm changed')
      },
      $content: {
        css: 'dropdown-trigger',
        width: '100%',
        $content: {
          css: 'control has-icons-right input-box',
          $input: {
            as: Input,
            vmId: 'input',
            vmChanged: Mutate.Value,
            onFocus: function () {
              this.rise('_inputFocus')
            },
            onInput: function (e) {
              this.rise('_inputValue', e.target.value)
//              this.sources.viewModel.set(e.target.value)
            }
          },
          $icon: {
            as: IconBox,
            css: 'is-small dropdown-icon is-right',
            icon: 'fas fa-angle-down'
          },
          $placeholder: {
            html: 'span',
            css: 'placeholder',
            weight: -10,
            vmId: 'placeholder',
            vmChanged: Mutate.Text
          }
        }
      },
      $dropdown: {
        css: 'dropdown-menu',
        width: '100%',
        $content: {
          as: Dropdown,
          css: 'is-hovered',
//          items: ['Alice', 'Bob', 'Charlie'],
          dynamic: true,
          // dataChanged: function (v, k) {
          //   const sel = this.sources.selection.get()
          //   console.log(sel)
          //   this.opt('items', this.sources[k].asStream().filter(itm => itm.name.indexOf(sel)))
          // }, //Mutate.Items,
          binding: function (values) {
            console.log(values.selection)
            this.opt('items', this.sources.data.$stream().name('data').filter(itm => itm.name.toLowerCase().indexOf(values.selection.toLowerCase()) != -1))
          },
          defaultItem: {
            onClick: function (e) {
              this.rise('_itemClicked', this)
            },
            selectionChanged: function (v) {
              this.opt('classes', {'is-active': v == this.options.key})
            },
            dataChanged: function (v) {
              this.opt('text', v.name)
              this.opt('key', v.name)
            }
          }
        }
      }
    }*/]
  }
}
