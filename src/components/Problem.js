import React from 'react';
import { Link } from 'react-router-dom'

const Problem = ({problem}) => (
      <Link to={`/problems/${problem.id}`}>
        <div className="ProblemCard">
          <p>Difficulty: {problem.difficulty}</p>
          <p>Category: {problem.category}</p>
          <p># of Loops: {problem.loops.length}</p>
        </div>
      </Link>
)


export default Problem;