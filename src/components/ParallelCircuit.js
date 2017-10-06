import React from 'react';
import Loop from './Loop';
import Resistor from './Resistor';

const Wire = <div className="Circuit Wire"></div>

const ParallelCircuit = ({circuitData}) => (
  <div className="ParallelCircuit">
    <div className="TopRow">
      <div className="Circuit Top LCorner"></div>
      {Wire}
      <div className="Circuit Battery">{circuitData.tot_voltage} V</div>
      {Wire}
      <div className="Circuit TopRCorner"></div>
    </div>
    {circuitData.loops.slice(1).map((loop,idx) =>
        <Loop resistor={loop.resistors[0]} key={idx}/>
    )}
    <div className="BottomRow">
     <div className="Circuit LCorner"></div>
      {Wire}
       <Resistor resistor={circuitData.loops[0].resistors[0]} />
      {Wire}
      <div className="Circuit RCorner"></div>
    </div>
  </div>
)


export default ParallelCircuit