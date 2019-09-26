import {Html} from '../../src'
import {IconBox} from '../elements'

class Field extends Html {
    config () {
        return {
            sources: {

            },
            css: 'field',
            $label: {
                html: 'label',
                css: 'label',
                weight: -100
            },
            $control: {
                css: 'control',
                $leftIcon: {
                    as: IconBox,
                    css: 'is-left',
                    weight: 10,
                },
                $rightIcon: {
                    as: IconBox,
                    css: 'is-right',
                    weight: 20
                }
            },
            $help: {
                html: 'p',
                css: 'help',
                weight: 100
            },
            defaultItem: {
                css: 'control'
            }
        }
    }
    options () {
        return {
            control: {
                mix: function (v, b) {
                    b.merge({
                        $control: {
                            $content: v
                        }
                    })
                }
            },
            help: {
                mix: function (v, b) {
                    b.merge({$help: v})
                }
            },
            label: {
                mix: function (v, b) {
                    b.merge({$label: v})
                }
            },
            leftIcon: {
                mix: function (v, b) {
                    b.merge({
                        $control: {
                            $leftIcon: v,
                            css: 'has-icon-left'
                        }
                    })
                }
            },
            rightIcon: {
                mix: function (v, b) {
                    b.merge({
                        $control: {
                            $rightIcon: v,
                            css: 'has-icon-right'
                        }
                    })
                }
            },
            addons: {
                initOrSet: function (v) {
                    this.opt('items', v.map(c => {return {$content: c}}))
                }
            },
            grouped: {
                initOrSet: function (v) {
                    this.opt('items', v.map(c => {return {$content: c}}))
                }
            }
        }
    }
}

export default Field