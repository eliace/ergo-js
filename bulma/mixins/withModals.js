import {Domain} from "../../src"



export default function withModals (mixer) {
    mixer.merge({
        sources: {
            modals: () => {
                return new Domain({
                    opened: [],
                    all: []
                }, {
                    actions: {
                        open: function (v) {
                            this.actions.closeLast() // для эксклюзивного открытия                            
                            this.$entry('opened').$add(v)
                            v.actions.open()
                        },
                        closeLast: function () {
                            const opened = this.$entry('opened')
                            if (!opened.$isEmpty()) {
                                const last = opened.$entry(opened.$size()-1)
                                opened.$remove(opened.$size()-1)
                                last.actions.close()
                            }
                        },
                        close: function (v) {
                            this.$entry('opened').$remove(v.id)
                            v.actions.close()
                        }
                    }
                })
            }
        },
        dom: { onGlobalMouseDown },
        onGlobalMouseDown: function (e, {modals}) {
            modals.actions.closeLast()
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

