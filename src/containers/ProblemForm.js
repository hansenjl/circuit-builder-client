import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProblemFormData } from '../actions/problemForm';
import { createProblem } from '../actions/problems';
import { updateCategory } from '../actions/problemForm';
import  SeriesCircuit from '../components/SeriesCircuit';
import ParallelCircuit from '../components/ParallelCircuit';
import NavBar from '../components/NavBar';


class ProblemForm extends Component {

  handleOnChange = event => {
    const {name, value} = event.target;
    const currentProblemFormData = Object.assign({}, this.props.problemFormData, {
      [name]: value
    })
    this.props.updateProblemFormData(currentProblemFormData)
  }

  handleCategoryChange = event => {
    const newProblemFormData = Object.assign({}, this.props.problemFormData, {
      [event.target.name]: event.target.value
    })

    this.props.updateCategory(newProblemFormData)
  }


  handleNestedChange = event => {
    const idx = parseInt(event.target.name,10) - 1
    let nestedProblemFormData = {}
    if (this.props.problemFormData.category === 'parallel'){
      let newLoop = this.props.problemFormData.loops[idx]
      newLoop.resistors[0].resistance = event.target.value

      nestedProblemFormData = Object.assign({},this.props.problemFormData,{
        loops: [
          ...this.props.problemFormData.loops.slice(0,idx),
          newLoop,
          ...this.props.problemFormData.loops.slice(idx+1)
        ]
      })
    } else if (this.props.problemFormData.category === 'series'){
      nestedProblemFormData = Object.assign({},this.props.problemFormData,{
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
    } else{
      // Fix this to reflect combo - right now just parallel rules
      let newLoop = this.props.problemFormData.loops[idx]
      newLoop.resistors[0].resistance = event.target.value

      nestedProblemFormData = Object.assign({},this.props.problemFormData,{
        loops: [
          ...this.props.problemFormData.loops.slice(0,idx),
          newLoop,
          ...this.props.problemFormData.loops.slice(idx+1)
        ]
      })
    }
    this.props.updateProblemFormData(nestedProblemFormData)
  }

  handleOnSubmit = event => {
    //save data to db and reset form
    event.preventDefault()
    this.props.createProblem(this.props.problemFormData)
      .then(this.props.resetProblemForm)
  }

  handleAddLoop = event => {
    //Add a loop for combo circuits
    event.preventDefault()
    let newLoopData = Object.assign({},this.props.problemFormData, {
      loops: [
        ...this.props.problemFormData.loops,
        {resistors: [
            {
              voltage: 1,
              resistance: 1,
              current: 1
            }
          ],
          l_voltage: 1,
          l_resistance: 1,
          l_current: 1
        }
      ]
    })
    this.props.updateProblemFormData(newLoopData)
  }

  handleAddResistor = event => {
    //add another row to the table form for the second resistor
    event.preventDefault()

    let newResistorData = {}
    if (this.props.problemFormData.category === 'parallel'){
      newResistorData = Object.assign({},this.props.problemFormData, {
        loops: [
          ...this.props.problemFormData.loops,
          {resistors: [
            {
              voltage: 1,
              resistance: 1,
              current: 1
            }
          ],
          l_voltage: 1,
          l_resistance: 1,
          l_current: 1
          }
        ]
      })
    } else if (this.props.problemFormData.category === 'series') {
        newResistorData = Object.assign({},this.props.problemFormData, {
        loops: [{
          resistors:[
            ...this.props.problemFormData.loops[0].resistors,
            {
              voltage: 1,
              resistance: 1,
              current: 1
            }
          ]
        }]
      })
    } else {
      //Handle Combo Circuits
      //Add resistor to the last loop array
      newResistorData = Object.assign({},this.props.problemFormData, {
        loops: [{
          resistors:[
            ...this.props.problemFormData.loops[this.props.problemFormData.loops.length-1].resistors,
            {
              voltage: 1,
              resistance: 1,
              current: 1
            }
          ]
        }]
      })
    }
    this.props.updateProblemFormData(newResistorData)
  }

  render() {
    const { difficulty, category, tot_voltage, tot_resistance, loops } = this.props.problemFormData;

    return(
      <div>
        <NavBar/>
        <div className="FormContainer">
          <form onSubmit={this.handleOnSubmit} >
            <div>
              <span>
                <label> Circuit Type: </label>
                <select name="category" value={category} onChange={this.handleCategoryChange}>
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
                    min="1"
                    max="5"/>
              </span>
            </div>
            <br></br>
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
              {loops.map( loop =>
                loop.resistors.map((resistor, idx) =>
                  <tr key={resistor.num}>
                    <td>Resistor {resistor.num}</td>
                    <td>{resistor.voltage}</td>
                    <td>{resistor.current}</td>
                    <td>
                      <input
                      type="number"
                      name={resistor.num}
                      onChange={this.handleNestedChange}
                      value={resistor.resistance}
                      min="0"/>
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
            <br></br>
            { category === "combo" ? (
              <span>
                <button onClick={this.handleAddLoop} disabled={(loops.reduce((tot,loop)=>{return tot += loop.resistors.length},0)) >= 6}>Add a Loop</button>
                <button onClick={this.handleAddResistor} disabled={loops[loops.length-1].resistors.length >= 3}>Add a Resistor</button>
              </span>
              ) : (
              <button onClick={this.handleAddResistor} disabled={(loops.reduce((tot,loop)=>{return tot += loop.resistors.length},0)) >= 15}>Add a Resistor</button>
              )
            }

            <input type="submit" value="Save"/>
          </form>
          <br></br>
          <div className="CircuitContainer">
            {this.props.problemFormData.category === "series" ? < SeriesCircuit circuitData={this.props.problemFormData} /> : < ParallelCircuit circuitData={this.props.problemFormData} />}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    problemFormData: state.problemFormData
  }
}

export default connect(mapStateToProps, {updateProblemFormData, createProblem, updateCategory})(ProblemForm);