import React, { Component } from 'react';
import './App.css';
import Problems from './Problems';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      problems: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:3001/api/problems')
      .then(response => response.json())
      .then(problems => this.setState({ problems }))
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Circuit Builder</h1>
        </header>
        <p className="App-intro">
          To get started, login or signup.
        </p>
        <Problems problems={this.state.problems} />
      </div>
    );
  }
}

export default App;
