import { Html } from 'chorda-core'
import { IconBox, Image as ImageBox, Switch, Check } from '../elements'

class Item extends Html {
    config () {
        return {
            html: 'li',
            css: 'list-box-item',
            components: {
                image: false,
                icon: false,
                check: false,
                switch: false
            },
            $content: {
                css: 'list-box-item__content',
                components: {
                    subtitle: false
                },
                $subtitle: {
                    css: 'list-box-item__subtitle',
                    weight: 10
                }
            },
            $image: {
                as: ImageBox,
                weight: 10,
                css: 'list-box-item__image is-after',
                rounded: true,
            },
            $icon: {
                as: IconBox,
                weight: -10,
                $content: {
                    css: 'fas'
                },
                css: 'is-before'
            },
            $check: {
                as: Check,
                layout: null,
                css: 'check-box is-before',
                weight: -10
            },
            $switch: {
                as: Switch,
                layout: null,
                css: 'switch-box is-after',
                weight: 10
            }
        }
    }
    properties () {
        return {
            subtitle: {
                set: function (v) {
                    this.$content.opt('components', {subtitle: v})
                }
            },
            image: {
                set: function (v) {
                    this.opt('components', {image: v})
                }
            },
            icon: {
                set: function (v) {
                    this.opt('components', {icon: v})
                }
            },
            check: {
                set: function (v) {
                    this.opt('components', {check: v})
                }
            },
            switch: {
                set: function (v) {
                    this.opt('components', {switch: v})
                }
            },
            content: {
                set: function (v) {
                    this.opt('components', {content: v})
                }
            }
        }
    }
}

class List extends Html {
    config () {
        return {
            html: 'ul',
            css: 'list-box',
            defaultItem: {
                as: Item
            }
        }
    }
}

List.Item = Item

export default List