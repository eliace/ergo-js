import { Html, Domain } from 'ergo-js-core'
import { withDropdown } from '../mixins'
import { Input } from '../elements'

import DropdownItem from './DropdownItem'


export default class DropdownInput extends Html {
    config () {
        return {
            sources: {
                dropdown: () => {
                  return new Domain(false, {
                    actions: {
                      open: function () {
                        this.set(true)
                      },
                      close: function () {
                        this.set(false)
                      }
                    }
                  })
                },
                value: () => '',
                list: () => [],
                modals: (o, ctx) => ctx.modals
            },
            mix: { withDropdown },
            dropdownChanged: function (v) {
                this.opt('components', {dropdown: v})
            },
            $input: {
                as: Input,
                onFocus: function (e, {modals, dropdown}) {
                    modals.actions.open(dropdown)
                },
                onChange: function (e, {value}) {
                    value.set(e.target.value)
                },
                valueChanged: function (v) {
                    this.opt('value', v)
                }
            },
            $dropdown: {
                // sources: {
                //     list: (o, ctx) => ctx.list,
                //     value: (o, ctx) => ctx.value,
                //     dropdown: (o, ctx) => ctx.dropdown,
                //     modals: (o, ctx) => ctx.modals
                // },
                css: 'dropdown-content is-hovered',
                styles: {
                    display: 'block'
                },
                listChanged: function (v, stream) {
                    this.opt('items', stream)
                },
                defaultItem: {
                    as: DropdownItem,
                    listChanged: function (v) {
                        this.opt('text', v)
                    },
                    onClick: function (e, {value, dropdown, modals}) {
                        value.set(this.opt('value'))
                        modals.close(dropdown)
                    }
                }  
            }
              
        }
    }

    options () {
        return {
            placeholder: {
                initOrSet: function (v) {
                    this.$input.opt('placeholder', v)
                }
            }
        }
    }
}