import createReactClass from 'create-react-class'



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
