import React, {Component} from 'react';
import { Link } from 'react-router-dom'


class Problem extends Component{
  constructor() {
    super()

    this.state = {
      like: 0,
    }
  }

  handleClick = event => {
    event.preventDefault()

    this.setState({
      like: this.state.like + 1
    })
  }


  render(){

    return(
      <Link to={`/problems/${this.props.problem.id}`}>
        <div>
          <p>Difficulty: {this.props.problem.difficulty}</p>
          <p>Category: {this.props.problem.category}</p>
          <p># of Loops: {this.props.problem.loops.length}</p>
          <button onClick={this.handleClick}>Like</button>
          <label>{this.state.like}</label>
        </div>
      </Link>
    )
  }
}


export default Problem;