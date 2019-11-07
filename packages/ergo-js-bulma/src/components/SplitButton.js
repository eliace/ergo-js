import {Html, Domain} from 'chorda-core'
import {Button} from '../elements'
import {ButtonWithIcon} from '../extensions'
import {withDropdown} from '../mixins'
import ListDropdown from './ListDropdown'
import DropdownItem from './DropdownItem'


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


export default class SplitButton extends Html {
    config () {
        return {
            sources: {
                dropdown: () => new DropdownModel(),
                view: function () {
                    return new Domain('', {
                        properties: {
                            placeholder: (v) => !v
                        }
                    })
                }
            },
            mix: { withDropdown },
            styles: {
                display: 'inline-flex'
            },
            dropdownChanged: function (v) {
                this.opt('components', {dropdown: !!v})
            },
            viewChanged: function (v) {
                this.opt('text', v)
            },
            css: 'buttons has-addons',
            $content: {
                as: Button,
                $placeholder: {
                    css: 'button-placeholder'
                },
                components: {
                    placeholder: false
                },
                viewChanged: function (v, s) {
                    this.opt('components', {placeholder: s.placeholder})
                }
            },
            $toggler: {
                as: ButtonWithIcon,
                icon: 'fas fa-caret-down',
                onClick: function (e, {dropdown}) {
                    dropdown.$toggle()
                    e.nativeEvent.stopImmediatePropagation()
                }
            },
            $dropdown: {
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
                    onClick: function (e, {view, dropdown}) {
                        dropdown.close()
                        view.$value = this.opt('value')
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
    properties () {
        return {
            // text: {
            //     initOrSet: function (v) {
            //         this.$content.opt('text', v)
            //         this.$content.opt('components', {placeholder: !v})
            //     }
            // },
            color: {
                set: function (v) {
                    this.$content.opt('color', v)
                    this.$toggler.opt('color', v)
                }    
            },
            placeholder: {
                set: function (v) {
                    this.$content.$placeholder.opt('text', v)
                }
                // mix: function (v, mixer) {
                //     mixer.mix({
                //         $content: {
                //             $placeholder: {
                //                 text: v
                //             }
                //         }
                //     })
                // }
                // initOrSet: function (v) {
                //     this.$content.opt('components', {placeholder: v})
                // }
            }
        }
    }
}