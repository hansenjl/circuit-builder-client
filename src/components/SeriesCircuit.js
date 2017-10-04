import React from 'react';
import Resistor from './Resistor'

const Wire = <div className="Circuit Wire"></div>

const SeriesCircuit = ({circuitData}) => (
  <div className="SeriesCircuit">
    <div className="TopRow">
        <div className="Circuit Top LCorner"></div>
        {circuitData.loops[0].resistors.length > 1 ? <Resistor resistor={circuitData.loops[0].resistors[1]} /> : Wire}
        {circuitData.loops[0].resistors.length > 11 ? <Resistor resistor={circuitData.loops[0].resistors[11]} /> : Wire}
        <div className="Circuit Battery">{circuitData.tot_voltage} V</div>
        {circuitData.loops[0].resistors.length > 12 ? <Resistor resistor={circuitData.loops[0].resistors[12]} /> : Wire}
        {circuitData.loops[0].resistors.length > 2 ? <Resistor resistor={circuitData.loops[0].resistors[2]} /> : Wire}
        <div className="Circuit TopRCorner"></div>
      </div>
      <div className="MiddleRow">
        {circuitData.loops[0].resistors.length > 3 ? <Resistor resistor={circuitData.loops[0].resistors[3]} /> : Wire}
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        {circuitData.loops[0].resistors.length > 4 ? <Resistor resistor={circuitData.loops[0].resistors[4]} /> : Wire}
      </div>
      <div className="MiddleRow">
        {circuitData.loops[0].resistors.length > 9 ? <Resistor resistor={circuitData.loops[0].resistors[9]} /> : Wire}
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        {circuitData.loops[0].resistors.length > 10 ? <Resistor resistor={circuitData.loops[0].resistors[10]} /> : Wire}
      </div>
      <div className="MiddleRow">
        {circuitData.loops[0].resistors.length > 5 ? <Resistor resistor={circuitData.loops[0].resistors[5]} /> : Wire}
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        <div className="Circuit"></div>
        {circuitData.loops[0].resistors.length > 6 ? <Resistor resistor={circuitData.loops[0].resistors[6]} /> : Wire}
      </div>
      <div className="BottomRow">
        <div className="Circuit LCorner"></div>
        {circuitData.loops[0].resistors.length > 7 ? <Resistor resistor={circuitData.loops[0].resistors[7]} /> : Wire}
        {circuitData.loops[0].resistors.length > 14 ? <Resistor resistor={circuitData.loops[0].resistors[14]} /> : Wire}
        <div className="Circuit Resistor">{circuitData.loops[0].resistors[0].resistance} Ω </div>
        {circuitData.loops[0].resistors.length > 15 ? <Resistor resistor={circuitData.loops[0].resistors[15]} /> : Wire}
        {circuitData.loops[0].resistors.length > 8 ? <Resistor resistor={circuitData.loops[0].resistors[8]} /> : Wire}
        <div className="Circuit RCorner"></div>
      </div>
  </div>
)


export default SeriesCircuit;
