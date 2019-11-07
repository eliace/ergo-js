import { Domain } from 'chorda-core'



export default function withDialogs (mixer) {
    mixer.mix({
        sources: {
            dialogs: () => new Domain({components: []}, {
                properties: {
                    components: {
                        type: Domain
                    }
                },
                actions: {
                    open: function (c) {
                        this.components.$add(c)
                    }
                }
            })    
        },
        $dialogs: {
            defaultItem: {
                join: {
                    all: {Dialogs: function ({dialogs, view}) {
                        view.$on('close', () => {
                            // FIXME
                            const v = dialogs.components.$get()
                            v.splice(this.index, 1)
                            dialogs.components.$set(v)
                        }, this)    
                    }}
                }
            },
            dialogsChanged: function (v, s) {
                this.opt('items', v.components)
            }        
        }
    })
}