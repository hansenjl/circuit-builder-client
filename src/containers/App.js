import React, { Component } from 'react';
import './App.css';
import Problems from './Problems';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Circuit Builder</h1>
        </header>
        <p className="App-intro">
          To get started login or signup.
        </p>
        <Problems />
      </div>
    );
  }
}

export default App;
