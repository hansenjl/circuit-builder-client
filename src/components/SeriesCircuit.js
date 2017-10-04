import React from 'react';

const SeriesCircuit = ({circuitData}) => (
  <div className="SeriesCircuit">
    <div className="TopRow">
        <div className="Circuit Top LCorner"></div>
        <div className="Circuit Battery">{circuitData.tot_voltage} V</div>
        <div className="Circuit Top RCorner"></div>
      </div>
      <div className="BottomRow">
        <div className="Circuit LCorner"></div>
        <div className="Circuit Resistor">{circuitData.loops[0].resistors[0].resistance} Ω </div>
        <div className="Circuit RCorner"></div>
      </div>
  </div>
)


export default SeriesCircuit;



