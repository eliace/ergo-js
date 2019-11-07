import {Domain} from "chorda-core"
import { Collection } from "../utils"



export default function withModals (mixer) {
    mixer.merge({
        sources: {
            modals: () => {
                return new Domain({
                    opened: [],
                    all: []
                }, {
                    properties: {
                        opened: {
                            type: Collection
                        }
                    },
                    actions: {
                        open: function (v) {
                            this.closeLast() // для эксклюзивного открытия                            
                            this.opened.$add(v)
                            v.open()
                        },
                        closeLast: function () {
                            const opened = this.opened// this.$entry('opened')
                            if (!opened.$isEmpty()) {
                                const last = opened.$entry(opened.$size-1)
                                opened.$remove(opened.$size-1)
                                last.close()
                            }
                        },
                        close: function (v) {
                            this.opened.$remove(v.id)
                            v.close()
                        }
                    }
                })
            }
        },
        dom: { onGlobalMouseDown, onGlobalEsc },
        onGlobalMouseDown: function (e, {modals}) {
            if (modals.opened.$size > 0) {
                modals.closeLast()
            }
        },
        onGlobalEsc: function (e, {modals}) {
            modals.closeLast()
        }
    })
}


function onGlobalMouseDown (el) {
    const f = (evt) => this.notify('onGlobalMouseDown')
    document.addEventListener('mousedown', f)
    return () => {
        document.removeEventListener('mousedown', f)
    }
}

function onGlobalEsc (el) {
    const f = (evt) => {
        if (evt.code == 'Escape') {
            this.notify('onGlobalEsc')
        }
    }
    document.addEventListener('keydown', f)
    return () => {
        document.removeEventListener('keydown', f)
    }
}
