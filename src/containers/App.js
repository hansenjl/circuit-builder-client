import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Problems from './Problems';
import ProblemForm from './ProblemForm';
import NavBar from '../components/NavBar';
import ProblemShow from './ProblemShow'


class App extends Component {

  render() {
    return (
      <Router>
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Welcome to Circuit Builder</h1>
            </header>
            <NavBar/>
            <Switch>
              <Route exact path='/' component={Problems} />
              <Route exact path='/problems/new' component={ProblemForm} />
              <Route exact path='/problems/:id' component={ProblemShow} />
            </Switch>
          </div>

      </Router>
    );
  }
}

export default App;
