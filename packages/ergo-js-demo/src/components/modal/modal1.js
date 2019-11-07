import { ImageModal } from './common'
import { Button } from 'chorda-bulma'
import imgUrl from '../../img/Yosemite 3.jpg'

export default () => {
    return {
        scope: {
            view: () => {
              return {opened: false}
            },
            data: () => {
              return {url: imgUrl}
            }
        },
        $button: {
            as: Button,
            text: 'Open Modal',
            onClick: function (e, {view}) {
              view.opened = true
            }
        },
        $modal: {
            as: ImageModal,
            active: false,
            viewChanged: function (v) {
              this.opt('active', v.opened)
            }
        }  
    }
}