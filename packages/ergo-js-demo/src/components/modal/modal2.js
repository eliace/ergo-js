import { ImageModal, ModalModel } from './common'
import { Button } from 'ergo-js-bulma'
import imgUrl from '../../img/Yosemite 3.jpg'

export default () => {
    return {
        // внешнее управление, внутренний контекст
        scope: {
            view: () => {
              return new ModalModel({}) // взаимодействовать с компонентом, которого еще нет мы можем только через канал
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
            sources: {
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