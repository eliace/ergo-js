import {Html, Domain} from '../../src'
import {Button} from '../elements'
import {ButtonWithIcon} from '../extensions'
import ListDropdown from './ListDropdown'
import { El as withEl } from '../utils'

const withUpdatePosition = function (el) {
    if (el) {
        const bcr = this.parent.el.getBoundingClientRect()
        el.style.top = bcr.bottom + 'px'
        el.style.left = bcr.left + 'px'    
    }
}

export default class SplitButton extends Html {
    config () {
        return {
            sources: {
                dropdown: function () {
                    return new Domain()
                },
                state: function () {
                    return new Domain({})
                }
            },
            dom: { withEl },
            components: {
                dropdown: false
            },
            dropdownChanged: function (v) {
                this.opt('components', {dropdown: !!v})
            },
            css: 'buttons has-addons',
            $content: {
                as: Button
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
                sources: {
                    __portal: (o, ctx) => ctx.portal
                },
                dom: { withUpdatePosition },
                renderers: {
                    '*': {
                        update: function () {
                            this._dirty = true
                            this.sources.__portal.emit('dirty')
                        },
                        render: () => {}
                    }
                },
                __portalJoined: function (s) {
                    debugger
                    s.watch(e => e.name == 'init' && e.channel == '__portal', (e) => {
                        s.$entry('components').$add(this)
                    }, this)
                    s.watch(e => e.name == 'destroy' && e.channel == '__portal', () => {
                        s.$entry('components').$remove(this)
                    }, this)
                },
                // dropdownChanged: function (v) {
                //     if (v) {
                //         this.eff((el) => {
                //             const bcr = this.parent.el.getBoundingClientRect()
                //             el.style.top = bcr.bottom + 'px'
                //             el.style.left = bcr.left + 'px'
                //         })
                //     }
                // },
                css: 'dropdown-menu',
                styles: {
                    display: 'block'
                },
                $content: {
                  as: ListDropdown,
                  css: 'dropdown-content'
                }
            }
        }
    }
    options () {
        return {
            color: {
                initOrSet: function (v) {
                    this.$content.opt('color', v)
                    this.$toggler.opt('color', v)
                }    
            }
        }
    }
}