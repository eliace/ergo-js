import {Html, Layout} from 'chorda-core'
import {IconBox} from '../elements'


class Control extends Html {
    config () {
        return {
            css: 'control',
            components: {
                leftIcon: false,
                rightIcon: false
            },
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
        }
    }
}

// function withControl (mixer) {
//     mixer.merge({
//         layout: Layout.wrapped,
//         $wrapper: {
//             as: Control
//         }
//     })
// }

class Field extends Html {
    config () {
        return {
            sources: {
                // state: () => {
                //     return {
                //         label: false,
                //         help: false
                //     }
                // }
            },
            css: 'field',
            components: {
                label: false,
                help: false,
                control: false
            },
            $label: {
                html: 'label',
                css: 'label',
                weight: -100
            },
            $control: {
                layout: Layout.wrapped,
                $wrapper: {
                    as: Control
                }
            },
            $addons: {
                layout: Layout.passthru,
                defaultItem: {
                    layout: Layout.wrapped,
                    $wrapper: {
                        as: Control
                    }
                }
            },
            $group: {
                layout: Layout.passthru,
                defaultItem: {
                    layout: Layout.wrapped,
                    $wrapper: {
                        as: Control
                    }
                }
            },
            $help: {
                html: 'p',
                css: 'help',
                weight: 100
            },
            // defaultItem: {
            //     css: 'control'
            // }
        }
    }
    options () {
        return {
            defaultAddon: {
                mix: function (v, mixer) {
                    mixer.merge({
                        $addons: {
                            defaultItem: v
                        }
                    })
                }
            },
            defaultGroupItem: {
                mix: function (v, mixer) {
                    mixer.merge({
                        $group: {
                            defaultItem: v
                        }
                    })
                }
            }
        }
    }
    properties () {
        return {
            control: {
                set: function (v) {
                    this.opt('components', {control: v})
                }
            },
            help: {
                set: function (v) {
                    this.opt('components', {help: v})
                }
            },
            label: {
                set: function (v) {
                    this.opt('components', {label: v})
//                    this.$label.opt('text', v)
                }
            },
            leftIcon: {
                set: function (v) {
                    this.$control.$wrapper.opt('classes', {'has-icons-left': true})
                    this.$control.$wrapper.opt('components', {leftIcon: v})
                }
            },
            rightIcon: {
                set: function (v) {
                    this.$control.$wrapper.opt('classes', {'has-icons-right': true})
                    this.$control.$wrapper.opt('components', {rightIcon: v})
                }
            },
            addons: {
                set: function (v) {
                    this.opt('classes', {'has-addons': true})
                    this.opt('components', {control: false, addons: true})
                    this.$addons.opt('items', v)
                }
            },
            group: {
                set: function (v) {
                    this.opt('classes', {'is-grouped': true})
                    this.opt('components', {control: false, group: true})
                    this.$group.opt('items', v)
                }
            }
        }
    }
}

export default Field