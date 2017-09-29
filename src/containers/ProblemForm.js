import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProblemFormData } from '../actions/problemForm';

class ProblemForm extends Component {

  handleOnChange = event => {
    const {name, value} = event.target;
    const currentProblemFormData = Object.assign({}, this.props.problemFormData, {
      [name]: value
    })
    this.props.updateProblemFormData(currentProblemFormData)
  }

  render() {
    const { difficulty, category, tot_voltage, tot_resistance } = this.props.problemFormData;


    return(
      <div>
        <form>
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
          <div>
            <label>Voltage:</label>
            <input
              type="number"
              name="tot_voltage"
              onChange={this.handleOnChange}
              value={tot_voltage}/>
          </div>
          <div>
            <label>Total Resistance:</label>
            <input
              type="number"
              name="tot_resistance"
              onChange={this.handleOnChange}
              value={tot_resistance}/>
          </div>
          <div>
            <label>Current: {(tot_voltage / tot_resistance).toFixed(2)}</label>
          </div>
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

export default connect(mapStateToProps, {updateProblemFormData})(ProblemForm);