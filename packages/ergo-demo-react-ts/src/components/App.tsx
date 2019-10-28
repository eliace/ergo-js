import React from 'react';
import {Input} from './Input';

import '../styles/index.css';

interface IProps {
}

interface IState {
    input?: string;
}


class App extends React.PureComponent<IProps, IState> {
    constructor (props: any) {
        super(props)
        this.state = {input: 'Hello'}
        this.handleChange = this.handleChange.bind(this)
    }
	render() {
        const {input} = this.state
//        const [input, setState] = React.useState()
		return (
			<div>
				<h1>Hello World!</h1>
                <form id="demo-form">
                    <Input value={input} onChange={this.handleChange}/>
                </form>
			</div>
		);
    }
    
    handleChange (e: React.FormEvent<HTMLInputElement>) {
        this.setState({input: e.currentTarget.value})
    }
}

export default App;