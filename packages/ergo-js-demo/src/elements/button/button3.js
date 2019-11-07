import { Buttons } from 'chorda-bulma'

function optSelected (mixer) {
    mixer.mix({
        options:{
            selected: {
                set: function (v) {
                    this.classes = {'is-info': v}
                }
            }
        }
    })
}

export default () => {
    return {
        scope: {
            selection: 'Bob'
        },
        as: Buttons,
        css: 'has-addons',
        defaultItem: {
            mix: { optSelected },
            selectionChanged: function (v, selection) {
                this.opt('selected', selection.$value == this.text)
            },
            onClick: function (e, {selection}) {
                selection.$value = this.text
            }
        },
        items: ['Alice', 'Bob', 'Charlie']  
    }
}