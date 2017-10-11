import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Problems.css';
import { getProblems } from '../actions/problems';
import Problem from '../components/Problem';
import NavBar from '../components/NavBar';

class Problems extends Component {

  componentDidMount(){
    this.props.getProblems()
  }


  render(){
    return(
      <div className="Wrapper">
        <NavBar/>
        <div className="ProblemsContainer">
          <h3>Choose from existing problems:</h3>
            {this.props.problems.map(problem =>
              <div key={problem.id} className="ProblemCard">
                <Problem
                  problem={problem}
                  key={problem.id}
                  />
              </div>
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    problems: state.problems
  })
}

export default connect(mapStateToProps, { getProblems })(Problems);