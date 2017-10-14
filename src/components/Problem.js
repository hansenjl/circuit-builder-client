import React from 'react';
import { Link } from 'react-router-dom'


const Problem = ({problem}) => (
  <Link to={`/problems/${problem.id}`}>
    <div>
      <p>Difficulty: {problem.difficulty}</p>
      <p>Category: {problem.category}</p>
      <p># of Loops: {problem.loops.length}</p>
      <p>Likes: {problem.likes} </p>
    </div>
  </Link>
)




export default Problem;