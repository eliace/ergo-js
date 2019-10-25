import createReactClass from 'create-react-class'
import { Config } from 'ergo-js-core'
import React from 'react'


Config.Renderer.h = function (type, props, children) {
//    console.log(type, props)
    return React.createElement(type, props, children)
}

Config.Renderer.schedule = function () {
    console.log('schedule')
    this.scheduled = true
}

Config.Renderer.render = function () {
    console.log('render')
    this.scheduled = false
}

Config.Renderer.effect = function (callback) {
    console.count('schedule_effect')
    if (!this.effects) {
      this.effects = []
    }
    this.effects.push(callback)
    if (!this.scheduled) {
      this.schedule()
    }
  }

Config.HTML_EVENTS = {
    onChange: 'onChange'
}

Config.HTML_OPTIONS = {
    value: true,
    id: true,
    htmlFor: true,
    type: true,
    className: true,
}



export const asReactClass = (_ErgoClass) => createReactClass({
    render: function () {
        const {props} = this
        this.updating = true
        if (!this._ergo) {
//            console.log(Config.getClassDescriptor(_ErgoClass))
            this._ergo = new _ErgoClass({
                ...props,
                onDirty: () => {
//                    console.log('dirty')
                    if (!this.updating) {
                        this.setState({update: !this.state.update})
                    }
                }    
                // update: () => {
                //     console.log('update state', this.updating)
                // }
            })
        }
        else {
//            console.log('update props', props.value)
            this._ergo.opt(props)
//            Config.Renderer.render()
//            console.log('done props')
        }
        this.updating = false
        return this._ergo.render()
    },
    getInitialState: function () {
        return {update: false}
    }
})
