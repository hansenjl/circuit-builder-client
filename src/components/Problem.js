import React from 'react';

const Problem = ({problem}) => (
      <div className="ProblemCard">
        <p>Difficulty: {problem.difficulty}</p>
        <p>Category: {problem.category}</p>
        <p># of Loops: {problem.loops.length}</p>
      </div>
)


export default Problem;