import React from 'react';
import Loop from './Loop';
import Resistor from './Resistor';

const Wire = <div className="Circuit Wire"></div>

const ComboCircuit = ({circuitData}) => (
  <div className="ComboCircuit">
    <div className="TopRow">
      <div className="Circuit Top LCorner"></div>
      {Wire}
      <div className="Circuit Battery">{circuitData.tot_voltage} V</div>
      {Wire}
      <div className="Circuit TopRCorner"></div>
    </div>
    {circuitData.loops.slice(1).map((loop,idx) =>
        <Loop resistors={loop.resistors} key={idx}/>
    )}
    <div className="BottomRow">
     <div className="Circuit LCorner"></div>
      {circuitData.loops[0].resistors.length > 1 ? <Resistor resistor={circuitData.loops[0].resistors[1]} /> : Wire}
       <Resistor resistor={circuitData.loops[0].resistors[0]} />
      {circuitData.loops[0].resistors.length > 2 ? <Resistor resistor={circuitData.loops[0].resistors[2]} /> : Wire}
      <div className="Circuit RCorner"></div>
    </div>
  </div>
)


export default ComboCircuit