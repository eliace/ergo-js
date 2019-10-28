//import { asReactClass } from "./utils"
import { Html } from "ergo-js-core"
import { asReactClass } from "ergo-js-react"


class Button extends Html {
    config () {
        return {
            html: 'button',
            css: 'btn'
        }
    }
}


export default asReactClass(Button)