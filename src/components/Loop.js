import React from 'react';
import Resistor from './Resistor'

const Loop = ({resistor}) => (
  <div className="Loop">
    <div className="Circuit Junction"></div>
    <div className="Circuit Wire"></div>
    <Resistor resistor={resistor} />
    <div className="Circuit Wire"></div>
    <div className="Circuit Junction"></div>
  </div>
)


export default Loop