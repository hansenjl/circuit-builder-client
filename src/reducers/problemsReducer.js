export default (state = [], action) => {
  switch(action.type){
    case 'GET_PROBLEMS_SUCCESS':
      return action.problems;

    case 'CREATE_PROBLEM_SUCCESS':
      return state.concat(action.problem);

    case 'DELETE_PROBLEM_SUCCESS':
      return state.problems.splice(action.problemId,1)

    default:
      return state;
  }
}

