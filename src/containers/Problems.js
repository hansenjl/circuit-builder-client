import React from 'react';

const Problems = (props) => (
  <div>
    <h3>Choose from existing problems:</h3>
    {props.problems.map((problem,index) =>
      <div key={index}>
        <p>Difficulty: {problem.difficulty}</p>
        <p>Category: {problem.category}</p>
        <p># of Loops: {problem.loops.length}</p>
      </div>
    )}
  </div>
)

export default Problems;