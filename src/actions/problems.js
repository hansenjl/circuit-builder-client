import {resetProblemForm} from './problemForm';

const API_URL = process.env.REACT_APP_API_URL;

// ** Action Creators **
//These actually go to the reducer
const setProblems = problems => {
  return {
    type: 'GET_PROBLEMS_SUCCESS',
    problems
  }
}

const addProblem = problem => {
  return {
    type: 'CREATE_PROBLEM_SUCCESS',
    problem
  }
}

// ** Async Actions **
export const getProblems = () => {
  return dispatch => {
    return fetch(`${API_URL}/problems`)
      .then(response => response.json())
      .then(problems => dispatch(setProblems(problems)))
      .catch(error => console.log(error))
  }
}


export const createProblem = (problem) => {
  return dispatch => {
    return fetch(`${API_URL}/problems`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({problem: problem})
    })
      .then(response => response.json())
      .then(problem => {
        dispatch(addProblem(problem))
        dispatch(resetProblemForm())
      })
      .catch(error => console.log(error))
  }
}


