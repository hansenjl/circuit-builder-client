import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Problems.css';
import Problem from '../components/Problem';
import NavBar from '../components/NavBar';
import { getProblems } from '../actions/problems';
import { addLike } from '../actions/problems';

class Problems extends Component {

  componentDidMount(){
    this.props.getProblems()
  }

   handleClick = (event) => {
    event.preventDefault()
    let problem = this.props.problems.find(function(problem){return problem.id == event.target.value})
    this.props.addLike(problem)

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
                <button value={problem.id} onClick={this.handleClick}>Like</button>
              </div>
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  state.problems.sort((a,b)=>{
    return b.likes - a.likes
  })
  return ({
    problems: state.problems
  })
}

export default connect(mapStateToProps, {getProblems, addLike})(Problems);