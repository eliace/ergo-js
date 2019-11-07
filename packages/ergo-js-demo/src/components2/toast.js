import {Layouts, Button, Field, Notification} from 'chorda-bulma'
import {Domain} from 'chorda-core'
import {withShowHide} from '../animations/effects'

let counter = 1
const COLORS = ['primary', 'link', 'info', 'success', 'warning', 'danger']

export default () => {
    return {
        layout: Layouts.Rows,
        items: [{
            as: Button,
            text: 'Show toast',
            onClick: function (e, {toasts}) {
                toasts.show({
                    text: 'Message #' + counter++,
                    delay: 0
                })
            }
        }, {
            sources: {
                data: () => COLORS
            },
            as: Field,
            defaultAddon: {
                as: Button,
                css: 'is-outlined',
                onClick: function (e, {toasts}) {
                    toasts.show({
                        text: 'Message #' + counter++,
                        color: this.opt('color')
                    })    
                },
                dataChanged: function (v) {
                    this.opt('text', v)
                    this.opt('color', v)
                }
            },
            dataChanged: function (v, s, k) {
                this.opt('addons', s.$iterator(k))
            }
        }, {
            scope: {
                view: () => new Domain({
                    opened: false
                })
            },
            $button: {
                as: Button,
                text: 'Open snackbar',
                onClick: function (e, {view}) {
                    view.$toggle('opened')
                }
            },
            $snackbar: {
                as: Notification,
                text: 'Message',
                css: 'snackbar is-info',
                mix: {withShowHide},
                $closeBtn: {
                    onClick: function (e, {view}) {
                        view.$set('opened', false)
                    }
                }
            },
            viewChanged: function (v) {
                this.opt('components', {snackbar: v.opened})
            },
            components: {
                snackbar: false
            }
        }]
    }
}