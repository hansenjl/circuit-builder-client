import React from 'react';
import Resistor from './Resistor'

const Wire = <div className="Circuit Wire"></div>

const Loop = ({resistors}) => (
  <div className="Loop">
    <div className="Circuit Junction"></div>
    {resistors.length > 1 ? <Resistor resistor={resistors[1]} /> : Wire}
    <Resistor resistor={resistors[0]} />
    {resistors.length > 2 ? <Resistor resistor={resistors[2]} /> : Wire}
    <div className="Circuit Junction"></div>
  </div>
)


export default Loop


