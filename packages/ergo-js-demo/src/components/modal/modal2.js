import { ImageModal, ModalModel } from './common'
import { Button } from 'chorda-bulma'
import imgUrl from '../../img/Yosemite 3.jpg'

export default () => {
    return {
        // внешнее управление, внутренний контекст
        scope: {
            view: () => {
              return new ModalModel({}) // забираем управление моделью в родительский компонент
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
              view: (ctx, o) => ctx.view // указываем, что используется внешняя модель
            },
            as: ImageModal
        },
        viewChanged: function (v) {
            this.opt('components', {modal: v.opened})
        },
        components: {
            modal: false // блокируем инициализацию
        }  
    }
}