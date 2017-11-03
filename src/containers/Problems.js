import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Problems.css';
import Problem from '../components/Problem';
import NavBar from '../components/NavBar';
import { getProblems } from '../actions/problems';
import { addLike } from '../actions/problems';

class Problems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyDisplayed: this.props.problems
    }

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount(){
    this.props.getProblems()
  }

  componentDidMount(){
    this.setState({
      currentlyDisplayed: this.props.problems
    })
  }

  onFilterChange(event) {
    let newlyDisplayed = this.props.problems
    if (event.target.value !== "all"){
      newlyDisplayed = this.props.problems.filter( problem => problem.category === event.target.value )
    }

    this.setState({
      currentlyDisplayed: newlyDisplayed
    });
  }

   handleClick = (event) => {
    event.preventDefault()
    let problem = this.props.problems.find(function(problem){return (problem.id).toString() === event.target.value})
    this.props.addLike(problem)
  }


  render(){
    return(
      <div className="Wrapper">
        <NavBar/>
        <div className="ProblemsContainer">
          <br></br>
          <div>
            <form>
              <select onChange={this.onFilterChange}>
                <option value="all">Show All</option>
                <option value="series">Series</option>
                <option value="parallel">Parallel</option>
                <option value="combo">Combo</option>
              </select>
            </form>
          </div>
          <h3>Choose from existing problems:</h3>
            {this.state.currentlyDisplayed.sort((a,b)=>{return b.likes - a.likes}).map(problem =>
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

  return ({
    problems: state.problems
  })
}

export default connect(mapStateToProps, {getProblems, addLike})(Problems);