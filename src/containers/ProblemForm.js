import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProblemFormData } from '../actions/problemForm';
import { createProblem } from '../actions/problems';

class ProblemForm extends Component {

  handleOnChange = event => {
    const {name, value} = event.target;
    const currentProblemFormData = Object.assign({}, this.props.problemFormData, {
      [name]: value
    })
    this.props.updateProblemFormData(currentProblemFormData)
  }

  handleNestedChange = event => {
    const nestedProblemFormData = Object.assign({}, this.props.problemFormData, {
      loops: [{
        resistors:[
          {resistance: event.target.value}
        ]
      }]
    })
    this.props.updateProblemFormData(nestedProblemFormData)
  }

  handleOnSubmit = event => {
    event.preventDefault()
    this.props.createProblem(this.props.problemFormData)
      .then(this.props.resetProblemForm)
  }

  handleAddResistor = event => {
    //add another row to the table form for the second resistor
  }

  render() {
    const { difficulty, category, tot_voltage, tot_resistance, loops } = this.props.problemFormData;


    return(
      <div className="FormContainer">
        <form onSubmit={this.handleOnSubmit} >
         <div>
            <select name="category" value={category} onChange={this.handleOnChange}>
              <option value="series">Series</option>
              <option value="parallel">Parallel</option>
              <option value="combo">Combo</option>
            </select>
          </div>
          <div>
              <label>Difficulty:</label>
              <input
                type="number"
                name="difficulty"
                onChange={this.handleOnChange}
                value={difficulty}/>
            </div>
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
              <td>
                <input
                  type="number"
                  name="tot_voltage"
                  onChange={this.handleOnChange}
                  value={tot_voltage}/>
              </td>
              <td>
                {(tot_voltage / tot_resistance).toFixed(2)}
              </td>
              <td>
                <input
                type="number"
                name="tot_resistance"
                onChange={this.handleOnChange}
                value={tot_resistance}/>
              </td>
            </tr>
            <tr>
              <td>Resistor 1</td>
              <td></td>
              <td></td>
              <td>
                <input
                type="number"
                name="resistance"
                onChange={this.handleNestedChange}
                value={loops[0].resistors[0].resistance}/>
              </td>
            </tr>
            </tbody>
          </table>
          <button onClick={this.handleAddResistor}>Add a Resistor</button>
          <input type="submit" value="Save"/>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    problemFormData: state.problemFormData
  }
}

export default connect(mapStateToProps, {updateProblemFormData, createProblem})(ProblemForm);