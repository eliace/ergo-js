import {Html, Domain} from '../../src'
import {Layouts, Image, Carousel} from '../../bulma'

import imgUrl_1 from '../img/Yosemite.jpg'
import imgUrl_2 from '../img/Yosemite 3.jpg'


export default () => {
    return {
        layout: Layouts.Rows,
        items: [{
            as: Carousel,
            images: [imgUrl_1, imgUrl_2]
        }]
    }
}