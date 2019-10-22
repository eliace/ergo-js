import { Buttons } from 'ergo-js-bulma'

export default () => {
    return {
        scope: {
            selection: 'Bob'
        },
        as: Buttons,
        css: 'has-addons',
        defaultItem: {
            selectionChanged: function (v, selection) {
                this.opt('classes', {'is-info': selection.$value == this.text})                
            },
            onClick: function (e, {selection}) {
                selection.$value = this.text
            }
        },
        items: ['Alice', 'Bob', 'Charlie']  
    }
}