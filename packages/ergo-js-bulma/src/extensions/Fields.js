import { Html } from "ergo-js-core";
import Field from "../components/Field";

export default class Fields extends Html {
    config () {
        return {
            css: 'field is-horizontal',
            $label: {
                css: 'field-label'
            },
            $body: {
                css: 'field-body',
                defaultItem: {
                    as: Field
                }
            },
            components: {
                label: false
            }
        }
    }
    options () {
        return {
            label: {
                initOrSet: function (v) {
                    this.opt('components', {label: v})
                }
            },
            fields: {
                initOrSet: function (v) {
                    this.$body.opt('items', v)
                }
            }
        }
    }
}