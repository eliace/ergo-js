import { ImageModal } from './common'
import { Button } from 'ergo-js-bulma'

import imgUrl from '../../img/Yosemite 3.jpg'

export default () => {
    return {
        scope: {
            view: () => {
              return {}
            },
            data: () => {
              return {url: imgUrl}
            }
          },
          $button: {
            as: Button,
            text: 'Open Modal',
            onClick: function (e, {view}) {
              view.open()
            }
          },
          $modal: {
            scope: {
              view: (ctx) => ctx.view // force use view channel of parent scope
            },
            as: ImageModal,
            active: false,
            viewChanged: function (v) {
              this.opt('active', v.opened)
            }
        }  
    }
}