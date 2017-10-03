import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProblemFormData } from '../actions/problemForm';
import { createProblem } from '../actions/problems';


//This
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

    let calculatedResistance = parseInt(nestedProblemFormData.loops[0].resistors.reduce((tot,resistor)=>{return tot += resistor.resistance},0),10)

    const finalFormData = Object.assign({},nestedProblemFormData,{
        tot_resistance: calculatedResistance
    } )

    this.props.updateProblemFormData(finalFormData)
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
          <span>
            <label> Circuit Type: </label>
            <select name="category" value={category} onChange={this.handleOnChange}>
              <option value="series">Series</option>
              <option value="parallel">Parallel</option>
              <option value="combo">Combo</option>
            </select>
          </span>
          <span>
              <label> Difficulty: </label>
              <input
                type="number"
                name="difficulty"
                onChange={this.handleOnChange}
                value={difficulty}
                min="0"
                max="5"/>
          </span>
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
                  value={tot_voltage}
                  min="0"
                  />
              </td>
              <td>
                {(tot_voltage / tot_resistance).toFixed(2)}
              </td>
              <td>
                {tot_resistance}
              </td>
            </tr>
            <tr>
              <td>Resistor 1</td>
              <td></td>
              <td></td>
              <td>
                <input
                type="number"
                name="R1"
                onChange={this.handleNestedChange}
                value={loops[0].resistors[0].resistance}
                min="0"/>
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