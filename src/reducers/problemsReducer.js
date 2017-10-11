export default (state = [], action) => {
  switch(action.type){
    case 'GET_PROBLEMS_SUCCESS':
      return action.problems;

    case 'CREATE_PROBLEM_SUCCESS':
      return state.concat(action.problem);

    case 'DELETE_PROBLEM_SUCCESS':

     return state.filter(problem => problem.id !== action.problemId)

    case 'UPVOTE':

      let idx = state.findIndex((problem) => {return action.problem.id === problem.id})
      let newState = [...state.slice(0,idx), action.problem, ...state.slice(idx+1,state.length+1)]

      return newState
    default:
      return state;
  }
}

