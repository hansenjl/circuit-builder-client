import React from 'react';

const Resistor = ({resistor}) => (
  <div className="Circuit Resistor">
    {resistor.resistance} Ω
  </div>
)

export default Resistor;