import {Layouts, Button, Field} from 'ergo-js-bulma'

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
            dataChanged: function (v, s) {
                this.opt('addons', s)
            }
        }]
    }
}