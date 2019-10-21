import Action from "./Action"
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
    properties () {
        return {
            icon: {
                set: function (v) {
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
    properties () {
        return {
            icon: {
                set: function (v) {
                    this.$control.opt('icon', v)
                }
            },
            color: {
                set: function (v) {
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