import { Html, Domain } from 'chorda-core'
import { withDropdown } from '../mixins'
import { ButtonWithIcon } from '../extensions'

import DropdownItem from './DropdownItem'
import { Button } from '../elements'


class DropdownModel extends Domain {
    config () {
        return {
            actions: {
                open: function () {
                  this.$value = true
                },
                close: function () {
                  this.$value = false
                }
            }  
        }
    }
}


export default class DropdownButton extends Html {
    config () {
        return {
            sources: {
                view: () => '',
                dropdown: () => new DropdownModel(),
                modals: (ctx, o) => ctx.modals
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
                as: Button,//WithIcon,
                $icon: {
                    weight: 10,
                    icon: 'fas fa-caret-down', // переставлено сюда с уровня Button, т.к. addComponent игнорирует повторное добавление
                },
                components: {
                    icon: true,
                    content: true
                },
                onClick: function (e, {modals, dropdown}) {
                    dropdown.$toggle()
                    // if (dropdown.get()) {
                    //     modals.close(dropdown)
                    // }
                    // else {
                    //     modals.open(dropdown)
                    // }
                }
                // onChange: function (e, {value}) {
                //     value.set(e.target.value)
                // },
                // valueChanged: function (v) {
                //     this.opt('value', v)
                // }
            },
            $dropdown: {
                // sources: {
                //     list: (ctx, o) => ctx.list,
                // },
                css: 'dropdown-content is-hovered',
                styles: {
                    display: 'block'
                },
                // listChanged: function (v, stream) {
                //     this.opt('items', stream)
                // },
                defaultItem: {
                    as: DropdownItem,
                    // listChanged: function (v) {
                    //     this.opt('text', v)
                    // },
                    onClick: function (e, {modals, dropdown}) {
                        dropdown.close()
                        //modals.close(dropdown)
                    }
                },
                allJoined: function ({dropdown, modals}) {
                    modals.open(dropdown)
                    return () => {
                      modals.close(dropdown)
                    }
                }
            }
              
        }
    }
}