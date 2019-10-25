import { asReactClass } from "./utils"
import { Html } from "ergo-js-core"


const AutoFocus = (el) => {
    requestAnimationFrame(() => {
      el.focus()
    })
  }



class Input extends Html {
    config () {
        return {
            css: 'form-group',
            $label: {
                html: 'label'
            },
            $input: {
                css: 'form-control',
                html: 'input',
//                value: '',
                // onChange: function (e) {
                //     console.log('change')
                //     this.opt('value', e.target.value)
                // },
                dom: { AutoFocus }
            },
            // renderers: {
            //     '*': function () {
            //         console.log('render')
            //     }
            // },
        }
    }
    options () {
        return {
            text: {
                set: function (v) {
                    this.$label.opt('text', v)
                }
            },
            value: {
                set: function (v) {
                    this.$input.opt('value', v)
                }
            },
            id: {
                set: function (v) {
                    this.$input.opt('id', v)
                }
            },
            type: {
                set: function (v) {
                    this.$input.opt('type', v)
                }
            },
            label: {
                set: function (v) {
                    this.$label.opt('htmlFor', v)
                }
            },
            handleChange: {
                mix: function (v, mixer) {
                    mixer.mix({
                        $input: {
                            onChange: v
                        }
                    })
//                    this.$input.opt('onChange', v)
                }
            }
        }
    }
}

export default asReactClass(Input)

// export default createReactClass({
//     render: function () {
//         const {props} = this
//         this.updating = true
//         if (!this._ergo) {
// //            console.log(Config.getClassDescriptor(_ErgoClass))
//             this._ergo = new _ErgoClass({
//                 ...props,
//                 onDirty: () => {
// //                    console.log('dirty')
//                     if (!this.updating) {
//                         this.setState({update: !this.state.update})
//                     }
//                 }    
//                 // update: () => {
//                 //     console.log('update state', this.updating)
//                 // }
//             })
//         }
//         else {
// //            console.log('update props', props.value)
//             this._ergo.opt(props)
// //            Config.Renderer.render()
// //            console.log('done props')
//         }
//         this.updating = false
//         return this._ergo.render()
//     },
//     getInitialState: function () {
//         return {update: false}
//     }
// })



