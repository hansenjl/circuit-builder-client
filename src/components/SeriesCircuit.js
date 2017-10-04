import React from 'react';
import Resistor from './Resistor'

const Wire = <div className="Circuit Wire"></div>
const VWire = <div className="Circuit Wire Vert"></div>

const SeriesCircuit = ({circuitData}) => (
  <div className="SeriesCircuit">
    <div className="TopRow">
        <div className="Circuit Top LCorner"></div>
        {circuitData.loops[0].resistors.length > 1 ? <Resistor resistor={circuitData.loops[0].resistors[1]} /> : Wire}
        {circuitData.loops[0].resistors.length > 11 ? <Resistor resistor={circuitData.loops[0].resistors[11]} /> : VWire}
        <div className="Circuit Battery">{circuitData.tot_voltage} V</div>
        {circuitData.loops[0].resistors.length > 12 ? <Resistor resistor={circuitData.loops[0].resistors[12]} /> : VWire}
        {circuitData.loops[0].resistors.length > 2 ? <Resistor resistor={circuitData.loops[0].resistors[2]} /> : Wire}
        <div className="Circuit TopRCorner"></div>
      </div>
      <div className="MiddleRow">
        {circuitData.loops[0].resistors.length > 3 ? <Resistor resistor={circuitData.loops[0].resistors[3]} /> : VWire}
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        {circuitData.loops[0].resistors.length > 4 ? <Resistor resistor={circuitData.loops[0].resistors[4]} /> : VWire}
      </div>
      <div className="MiddleRow">
        {circuitData.loops[0].resistors.length > 9 ? <Resistor resistor={circuitData.loops[0].resistors[9]} /> : VWire}
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        {circuitData.loops[0].resistors.length > 10 ? <Resistor resistor={circuitData.loops[0].resistors[10]} /> : VWire}
      </div>
      <div className="MiddleRow">
        {circuitData.loops[0].resistors.length > 5 ? <Resistor resistor={circuitData.loops[0].resistors[5]} /> : VWire}
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        {circuitData.loops[0].resistors.length > 6 ? <Resistor resistor={circuitData.loops[0].resistors[6]} /> : VWire}
      </div>
      <div className="BottomRow">
        <div className="Circuit LCorner"></div>
        {circuitData.loops[0].resistors.length > 7 ? <Resistor resistor={circuitData.loops[0].resistors[7]} /> : VWire}
        {circuitData.loops[0].resistors.length > 14 ? <Resistor resistor={circuitData.loops[0].resistors[14]} /> : VWire}
        <div className="Circuit Resistor">{circuitData.loops[0].resistors[0].resistance} Ω </div>
        {circuitData.loops[0].resistors.length > 15 ? <Resistor resistor={circuitData.loops[0].resistors[15]} /> : VWire}
        {circuitData.loops[0].resistors.length > 8 ? <Resistor resistor={circuitData.loops[0].resistors[8]} /> : VWire}
        <div className="Circuit RCorner"></div>
      </div>
  </div>
)


export default SeriesCircuit;


// {circuitData.loops[0].resistors.splice(1)map(resistor =>
//               <Resistor resistor={resistor} key={resistor.id}/>
//             )}
