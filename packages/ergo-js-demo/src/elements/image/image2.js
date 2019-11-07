import {Image} from 'chorda-bulma'

import imgUrl_2 from '../../img/Yosemite 3.jpg'

export default () => {
    return {
        $content: {
            $image: {
              as: Image,
              src: imgUrl_2,
              width: 512
    //          height: 512
            }
        }
    }
}