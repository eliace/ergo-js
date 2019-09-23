import {Html, Source, Domain, Layout} from '../../src'
import {Layouts, Box, IconBox, Button, Input, DropdownSelect, SplitButton} from '../../bulma'

import {ButtonWithIcon} from '../extensions'
import {Mutate} from '../helpers'
import {COUNTRIES} from '../constants'



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


class RenderDelegate extends Domain {
  config () {
    return {
      initial: function () {
        return {components: []}
      }
    }
  }
}




export default () => {
  return {
    sources: {
      selection: '',
//      dropdown: true,
      data: COUNTRIES,
      portal: () => new RenderDelegate()
    },
    layout: Layouts.Rows,
    $portal: {
      sources: {
        __portal: (o, ctx) => ctx.portal
      },
      __portalJoined: function (s) {
        s.on('dirty', () => {
          this.rerender()
        }, this)
      },
      renderers: {
        '*': {
          render: function () {
            const {html, props} = this._internal
            const components = this.sources.__portal.get('components').map(c => {
              return {
                render: () => c.render('any')
              }
            })
            debugger
            return Layout.simple(html, props, components)
          }
        }
      }
    },
    items: [{
      sources: {
        state: () => {
          return {value: 'Guatemala'}
        },
        data: (o, ctx) => ctx.data
      },
      as: DropdownSelect,
      width: 400,
      $dropdown: {
        $content: {
          dataChanged: function (v, stream) {
            this.opt('items', stream)
          },
          defaultItem: {
            dataChanged: function (v) {
              this.opt('text', v.name)
              this.opt('value', v.name)
            }
          }
        }
      }
    }, {
      as: SplitButton,
      text: 'Button',
      color: 'info',
      $dropdown: {
        $content: {
          dataChanged: function (v, stream) {
            this.opt('items', stream)
          },
          defaultItem: {
            dataChanged: function (v) {
              this.opt('text', v.name)
              this.opt('value', v.name)
            }
          }
        }
      }
    }/*, {
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
    }*/]
  }
}
