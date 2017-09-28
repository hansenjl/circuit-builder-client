import React from 'react';
import './Problems.css';
import Problem from '../components/Problem';

const Problems = (props) => (
  <div className="ProblemsContainer">
    <h3>Choose from existing problems:</h3>
      {props.problems.map(problem =>
        <Problem problem={problem}/>
    )}
  </div>
)

export default Problems;