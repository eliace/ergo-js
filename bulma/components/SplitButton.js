import {Html, Domain} from '../../src'
import {Button} from '../elements'
import {ButtonWithIcon} from '../extensions'
import ListDropdown from './ListDropdown'
import { El as withEl } from '../utils'

const calcScrollY = function (el) {
    let parent = el.parentElement
    let scrollY = window.scrollY
    while (parent) {
        scrollY += parent.scrollTop
        parent = parent.parentElement
    }
    return scrollY
}

const windowDimensions = function () {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight
    }
}

const withUpdatePosition = function (el) {
    if (el) {
        const parentBcr = this.parent.el.getBoundingClientRect()
        this.sources.state.set('top', parentBcr.bottom + calcScrollY(el))
        this.sources.state.set('left', parentBcr.left)
//        this.sources.state.set('scroll', calcScroll(el).y)

        // el.style.top = parentBcr.bottom + 'px'
        // el.style.left = parentBcr.left + 'px'

        const bcr = this.$content.el.getBoundingClientRect()

        const {width, height} = windowDimensions()

        if (parentBcr.bottom + bcr.height + 10 > height) {
            this.$content.el.style.height = (height - parentBcr.bottom - 10) + 'px'
        }
    }
}

const withScroll = function (el) {
    const f = () => {
        // let scrollTotal = 0
        // path.forEach(element => scrollTotal += element.scrollTop)
        // this.sources.state.set('scroll', scrollTotal)
        this.sources.state.set('scroll', calcScrollY(el))
    }
    const path = []
    let element = this.parent.el
    while (element) {
        path.push(element)
        element = element.parentElement
    }
    path.forEach(element => element.addEventListener('scroll', f))
    f()
    return () => {
        path.forEach(element => element.removeEventListener('scroll', f))
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
                    return new Domain({
                        scroll: 0,
                        top: 0,
                        left: 0
                    })
                }
            },
            dom: { withEl },
            components: {
                dropdown: false
            },
            dropdownChanged: function (v) {
                this.opt('components', {dropdown: !!v})
            },
            stateChanged: function (v) {
                this.opt('text', v.value)
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
                dom: { withUpdatePosition, withScroll },
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
                    s.watch(e => e.name == 'init' && e.channel == '__portal', (e) => {
                        s.$entry('components').$add(this)
                    }, this)
                    s.watch(e => e.name == 'destroy' && e.channel == '__portal', () => {
                        s.$entry('components').$remove(this)
                    }, this)
                },
                stateChanged: function (v, s, ids) {
                    this.eff((el) => {
                        if (el) {
                            el.style.top = (v.top - v.scroll) + 'px'
                            el.style.left = v.left + 'px'    
                        }
                    })
                },
                css: 'dropdown-menu',
                styles: {
                    display: 'block'
                },
                $content: {
                  as: ListDropdown,
                  css: 'dropdown-content',
                  dom: { withEl }
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