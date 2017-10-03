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
    const idx = parseInt(event.target.name,10) - 1
    const nestedProblemFormData = Object.assign({},this.props.problemFormData,{
      loops: [{
        resistors:[
          ...this.props.problemFormData.loops[0].resistors.slice(0,idx),
          {
            ...this.props.problemFormData.loops[0].resistors[idx],
            resistance: parseInt(event.target.value,10)
          },
          ...this.props.problemFormData.loops[0].resistors.slice(idx+1)
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
    event.preventDefault()
    const newResistorData = Object.assign({},this.props.problemFormData, {
      loops: [{
        resistors:[
          ...this.props.problemFormData.loops[0].resistors,
          {voltage: 1,
          resistance: 1,
          current: 1}
        ]
      }]
    })

    this.props.updateProblemFormData(newResistorData )

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
            {loops[0].resistors.map((resistor, idx) =>
              <tr key={idx}>
                <td>Resistor {idx + 1}</td>
                <td></td>
                <td></td>
                <td>
                  <input
                  type="number"
                  name={idx + 1}
                  onChange={this.handleNestedChange}
                  value={resistor.resistance}
                  min="0"/>
                </td>
              </tr>
            )}
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