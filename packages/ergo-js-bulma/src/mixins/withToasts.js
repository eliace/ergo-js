import { Domain } from "chorda-core"
import { Notification } from '../elements'
import { delay, Collection } from '../utils'


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
                            this.opened.add(toast)
                        },
                        // ?
                        hide: function (toast) {
                            this.opened.remove(toast.id)
                            // const opened = this.$entry('opened')
                            // opened.$remove(toast.id)
                        }
                    },
                    properties: {
                        opened: {
                            type: Collection,
                            entryOfType: {
                                properties: {
                                    delay: {}
                                },
                                actions: {
                                    close: function () {
                                        this.$remove()
                                    },
                                    waitAndClose: async function () {
                                        await delay(this.delay)
                                        this.close()                
                                    }
                                }
                            }        
                        }
                    }
                })
            }
        },
        $toasts: {
            sources: {
                data: (ctx, o) => ctx.toasts.$entry('opened')
            },
            dataChanged: function (v, s, k) {
                this.opt('items', s.$iterator(k))
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
//                    const toast = data.$value
                    // const close = data.createAction('close', async () => {
                    //     data.remove()
                    // })
                    // const waitAndClose = data.createAction('waitAndClose', async () => {
                    //     await delay(data.delay)
                    //     close()
                    // })
                    if (data.delay) {
                        data.waitAndClose()
                    }
                }
            }
        }
    })
}