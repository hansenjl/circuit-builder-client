import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Problems from './Problems';
import ProblemForm from './ProblemForm';
import ProblemShow from './ProblemShow';
import WelcomeHeader from '../components/WelcomeHeader';


class App extends Component {

  render() {
    return (
      <Router>
          <div className="App">
            <Switch>
              <Route exact path='/' component={WelcomeHeader} />
              <Route exact path='/problems' component={Problems} />
              <Route exact path='/problems/new' component={ProblemForm} />
              <Route exact path='/problems/:id' component={ProblemShow} />
            </Switch>
          </div>
      </Router>
    );
  }
}

export default App;
