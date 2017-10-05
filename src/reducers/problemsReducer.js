export default (state = [], action) => {
  switch(action.type){
    case 'GET_PROBLEMS_SUCCESS':
      return action.problems;

    case 'CREATE_PROBLEM_SUCCESS':
      return state.concat(action.problem);

    case 'GET_PROBLEM_SUCCESS':
      return action.problem;

    default:
      return state;
  }
}

