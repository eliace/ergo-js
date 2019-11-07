import {Layouts} from 'chorda-bulma'
import {ExampleBox} from '../../extensions'

import image1 from './image1'
import image1_code from '!raw-loader!./image1'
import image2 from './image2'
import image2_code from '!raw-loader!./image2'

export default () => {
    return {
        layout: Layouts.Rows,
        defaultItem: {
            as: ExampleBox,
        },
        items: [{
            title: 'Size',
            example: image1,
            code: image1_code
        }, {
            title: 'Basic',
            example: image2,
            code: image2_code
        }]        
    }
}