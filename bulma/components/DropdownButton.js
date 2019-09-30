import { Html, Domain } from '../../src'
import { withDropdown } from '../mixins'
import { ButtonWithIcon } from '../extensions'

import DropdownItem from './DropdownItem'


export default class DropdownButton extends Html {
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
                list: () => [],
                modals: (o, ctx) => ctx.modals
            },
            mix: { withDropdown },
            styles: {
                display: 'inline-flex'
            },
            text: 'Button',
            dropdownChanged: function (v) {
                this.opt('components', {dropdown: v})
            },
            $content: {
                as: ButtonWithIcon,
                icon: 'fas fa-caret-down',
                $icon: {
                    weight: 10
                },
                onClick: function (e, {modals, dropdown}) {
                    if (dropdown.get()) {
                        modals.close(dropdown)
                    }
                    else {
                        modals.open(dropdown)
                    }
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
                    onClick: function (e, {modals, dropdown}) {
                        modals.close(dropdown)
                    }
                }  
            }
              
        }
    }
}