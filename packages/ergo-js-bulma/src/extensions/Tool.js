import Field from '../components/Field'



class Tool extends Field {
    config () {
        return {
//            mix: {Field: Field.prototype.config},
            $control: {
            },
            components: {
                control: true
            }
        }
    }
    properties () {
        return {
            text: {
                set: function (v) {
                    this.$control.opt('text', v)
                }
            }
        }
    }
}


export default Tool