import React, { Component } from 'react';
import { connect } from 'react-redux';
import SeriesCircuit from '../components/SeriesCircuit';
import ParallelCircuit from '../components/ParallelCircuit';
import NavBar from '../components/NavBar';
import { deleteProblem } from '../actions/problems';
import ComboCircuit from '../components/ComboCircuit';


class ProblemShow extends Component {

  handleOnClick = event => {
    event.preventDefault()
    this.props.deleteProblem(this.props.problem.id)
      .then(this.props.history.push('/problems'))
  }


  render(){

    const { difficulty, category, tot_current, tot_voltage, tot_resistance, loops } = this.props.problem;


    let circuitDisplay = null;
    if (category === "series"){
      circuitDisplay = < SeriesCircuit circuitData={this.props.problem} />
    } else if (category === "parallel"){
      circuitDisplay = < ParallelCircuit circuitData={this.props.problem} />
    } else {
      circuitDisplay = < ComboCircuit circuitData={this.props.problem} />
    }

    return(
      <div className="ShowProblemContainer">
        <NavBar />
        <div>
          <h3> Circuit Type: <em>{category}</em> </h3>
          <h3> Difficulty: {difficulty} </h3>
          <button onClick={this.handleOnClick} value="delete">Delete Circuit</button>
          <table>
            <thead>
            <tr>
              <th></th>
              <th>Voltage</th>
              <th>Current</th>
              <th>Resistance</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>TOTAL</td>
              <td>{tot_voltage}</td>
              <td>{tot_current} </td>
              <td> {tot_resistance} </td>
            </tr>
            {loops.map( loop =>
              loop.resistors.map((resistor, idx) =>
              <tr key={idx}>
                <td>Resistor {resistor.num}</td>
                <td>{resistor.voltage}</td>
                <td>{resistor.current}</td>
                <td>{resistor.resistance}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <br></br>
        <div className="CircuitContainer">
            {circuitDisplay}
          </div>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {

  const problem = state.problems.find(problem => problem.id == ownProps.match.params.id)

  if (problem) {
    return { problem }
  } else {
    return {problem: {} }
  }
}


export default connect(mapStateToProps, {deleteProblem})(ProblemShow);