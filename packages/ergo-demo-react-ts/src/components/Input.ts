import {Html, Config, IOptions} from 'ergo-js-core'
import {asReactClass, ReactEvents, ReactOptions} from 'ergo-js-react'

Config.use(ReactEvents)
Config.use(ReactOptions)
//Config.Renderer.schedule = function () {}

class _Input extends Html {
    config () {
        return {
            css: 'form-group',
            $label: {
                html: 'label'
            },
            $input: {
                html: 'input',
                css: 'form-control'
            }
        }
    }
    options () {
        return {
            value: {
                set: function (this: Html, v: string) {
                    this.components.input.opt('value', v)
                }
            },
            onChange: {
                mix: function (v: string, mixer: IOptions) {
                    mixer.mix({
                        $input: {
                            onChange: v
                        }
                    })
                }
            }
        }
    }
}

export const Input = asReactClass(_Input)