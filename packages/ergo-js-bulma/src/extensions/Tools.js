import { Action } from "../components"
import ButtonWithIcon from './ButtonWithIcon'
import Tool from './Tool'
import Fields from './Fields'

class ActionTool extends Tool {
    config () {
        return {
            $control: {
                as: Action,
                css: 'is-muted'
            }
        }
    }
    options () {
        return {
            icon: {
                initOrSet: function (v) {
                    this.$control.opt('icon', v)
                }
            }
        }
    }
}

class ButtonTool extends Tool {
    config () {
        return {
            $control: {
                as: ButtonWithIcon
            }
        }
    }
    options () {
        return {
            icon: {
                initOrSet: function (v) {
                    this.$control.opt('icon', v)
                }
            },
            color: {
                initOrSet: function (v) {
                    this.$control.opt('color', v)
                }
            }
        }
    }
}



class Tools extends Fields {
    config () {
        return {
            $body: {
                defaultComponent: {
                    as: Tool
                }
            }
        }
    }
    options () {
        return {
            tools: {
                mix: function (v, mixer) {
                    mixer.merge({
                        $body: v
                    })
                }
            }
        }
    }
}

Tools.Action = ActionTool
Tools.Button = ButtonTool

export default Tools