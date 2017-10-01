import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Problems.css';
import { getProblems } from '../actions/problems';
import Problem from '../components/Problem';

class Problems extends Component {

  componentDidMount(){
    this.props.getProblems()
  }

  render(){
    return(
      <div>
        <div className="ProblemsContainer">
          <h3>Choose from existing problems:</h3>
            {this.props.problems.map(problem =>
              <Problem problem={problem} key={problem.id}/>
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