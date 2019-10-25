import React from 'react';
import './App.css';

import FormContainer from './FormContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FormContainer/>
        {/* <Input
          text="First Name"
          value="Test"
          handleChange={e => {console.log(e.target.value)}}
        /> */}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
