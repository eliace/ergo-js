import { IconBox } from "chorda-bulma"
import {ICONS} from '../../constants'

export default () => {
    return {
        defaultItem: {
            as: IconBox,
            css: 'is-action',
            onClick: function (e, {toasts}) {
              toasts.show({text: this.opt('tag')})
            }
        },
        items: ICONS.map(i => {
            return {icon: 'fa-'+i, tag: i}
        })  
    }
}