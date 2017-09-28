import React from 'react';
import './Problems.css';

const Problems = (props) => (
  <div className="ProblemsContainer">
    <h3>Choose from existing problems:</h3>
    {props.problems.map((problem,index) =>
      <div className="ProblemCard" key={index}>
        <p>Difficulty: {problem.difficulty}</p>
        <p>Category: {problem.category}</p>
        <p># of Loops: {problem.loops.length}</p>
      </div>
    )}
  </div>
)

export default Problems;