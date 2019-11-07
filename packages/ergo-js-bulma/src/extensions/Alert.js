import { Html } from "chorda-core"


export default class Alert extends Html {
    config () {
        return {
            css: 'alert'
        }
    }
    options () {
        return {
            color: {
                set: function (next, prev) {
                    this.classes = {['is-'+v]: true, ['is-'+prev]: false}
                }
            }
        }
    }
}