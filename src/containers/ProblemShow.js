import React, { Component } from 'react';
import { connect } from 'react-redux';
import SeriesCircuit from '../components/SeriesCircuit';
import ParallelCircuit from '../components/ParallelCircuit';

class ProblemShow extends Component {

  // componentDidMount(){
  //   this.props.getProblem(this.props.c)
  // }

  render(){

    const { difficulty, category, tot_current, tot_voltage, tot_resistance, loops } = this.props.problem;

    return(
      <div className="ShowProblemContainer">
        <div>
          <h3> Circuit Type: <em>{category}</em> </h3>
          <h3> Difficulty: {difficulty} </h3>

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
            {loops[0].resistors.map((resistor, idx) =>
              <tr key={idx}>
                <td>Resistor {idx + 1}</td>
                <td>{resistor.voltage}</td>
                <td>{resistor.current}</td>
                <td>{resistor.resistance}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
        <div className="CircuitContainer">
          {category === "series" ? < SeriesCircuit circuitData={this.props.problem} /> : < ParallelCircuit circuitData={this.props.problem} />}
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


export default connect(mapStateToProps)(ProblemShow);