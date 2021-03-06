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

const removeProblem = problemId => {
  return{
    type: 'DELETE_PROBLEM_SUCCESS',
    problemId: problemId
  }
}

const updateLikes = problem => {
  return{
    type: 'UPVOTE',
    problem: problem
  }
}


// ** Async Actions **
export const getProblems = () => {
  return (dispatch) => {
    return fetch(`${API_URL}/problems`)
      .then(response => response.json())
      .then(problems => dispatch(setProblems(problems)))
      .catch(error => console.log(error))
  }
}


export const deleteProblem = (id) => {
  return dispatch => {
    return fetch(`${API_URL}/problems/${id}`, {method: 'delete'})
      .then(dispatch(removeProblem({id})))
      .catch(error => console.log(error))
  }
}

export const addLike = (problem) => {
  problem.likes += 1
  return dispatch => {
    return fetch(`${API_URL}/problems/${problem.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({problem:problem})
    })
      .then(response => response.json())
      .then(problem => dispatch(updateLikes(problem)))
      .catch(error => console.log(error))
  }
}


export const createProblem = (problem) => {
  problem["loops_attributes"] = problem["loops"]
  delete problem["loops"]
  for (var i = 0; i < problem["loops_attributes"].length; i++) {
    problem["loops_attributes"][i]["resistors_attributes"] = problem["loops_attributes"][i]["resistors"]
    delete problem["loops_attributes"][i]["resistors"]
  }

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


