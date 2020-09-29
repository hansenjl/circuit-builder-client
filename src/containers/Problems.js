import React, { Component } from "react";
import { connect } from "react-redux";
import "./Problems.css";
import Problem from "../components/Problem";
import NavBar from "../components/NavBar";
import { getProblems } from "../actions/problems";
import { addLike } from "../actions/problems";

class Problems extends Component {

  state = {
      filter: "all"
  }

  componentDidMount() {
    this.props.getProblems();
  }

  // componentDidMount(){
  //   this.setState({
  //     currentlyDisplayed: this.props.problems
  //   })
  // }

  onFilterChange = (event) => {
    this.setState({
      filter: event.target.value,
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    let problem = this.props.problems.find(
      (problem) => problem.id.toString() === event.target.value
    );
    this.props.addLike(problem);
  };

  diplayProblems = () => {
    let problemsToDisplay = this.props.problems;

    if (this.state.filter !== "all") {
      problemsToDisplay = this.props.problems.filter(
        (problem) => problem.category === this.state.filter
      );
    }

    return problemsToDisplay.map((problem) => (
      <div key={problem.id} className="ProblemCard">
        <Problem problem={problem} key={problem.id} />
        <button value={problem.id} onClick={this.handleClick}>
          Like
        </button>
      </div>
    ));
  };

  render() {
    return (
      <div className="Wrapper">
        <NavBar />
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
          {this.diplayProblems()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    problems: state.problems.sort((a, b) => b.likes - a.likes),
  };
};

export default connect(mapStateToProps, { getProblems, addLike })(Problems);
