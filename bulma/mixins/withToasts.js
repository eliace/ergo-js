import { Domain } from "../../src"
import { Notification } from '../elements'
import { delay } from '../utils'

export default function withToasts (mixer) {
    mixer.merge({
        sources: {
            toasts: () => {
                return new Domain({
                    opened: []                    
                }, {
                    actions: {
                        show: function (v) {
                            const toast = {delay: 5000, ...v}
                            this.$entry('opened').$add(toast)
                        },
                        hide: function (toast) {
                            const opened = this.$entry('opened')
                            opened.$remove(toast.id)
                        }
                    }
                })
            }
        },
        $toasts: {
            sources: {
                data: (o, ctx) => ctx.toasts.$entry('opened')
            },
            dataChanged: function (v, s) {
                this.opt('items', s)
            },
            css: 'toasts',
            defaultItem: {
                as: Notification,
                $closeBtn: {
                    onClick: function (e, {data}) {
                        data.$remove()
                    }
                },
                dataChanged: function (v) {
                    this.opt('text', v.text)
                    this.opt('color', v.color)
                },
                dataJoined: function (data) {
                    const toast = data.get()
                    const close = data.createAction('close', async () => {
                        data.$remove()
                    })
                    const waitAndClose = data.createAction('waitAndClose', async () => {
                        await delay(toast.delay)
                        data.close()
                    })
                    if (toast.delay) {
                        waitAndClose()
                    }
                }
            }
        }
    })
}