import { Html } from "chorda-core";
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
    properties () {
        return {
            label: {
                set: function (v) {
                    this.opt('components', {label: v})
                }
            },
            fields: {
                set: function (v) {
                    this.$body.opt('items', v)
                }
            }
        }
    }
}