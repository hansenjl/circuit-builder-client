const API_URL = process.env.REACT_APP_API_URL;

// ** Action Creators **
//These actually go to the reducer
const setProblems = problems => {
  return {
    type: 'GET_PROBLEMS_SUCCESS',
    problems
  }
}

// ** Async Actions **
export const getProblems = () => {
  return dispatch => {
    return fetch(`${API_URL}/problems`)
      .then(response => response.json())
      .then(problems => dispatch(setProblems
        (problems)))
      .catch(error => console.log(error))
  }
}



