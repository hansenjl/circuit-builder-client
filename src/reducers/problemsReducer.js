export default (state = [], action) => {
  switch(action.type){
    case 'GET_PROBLEMS_SUCCESS':
      return action.problems;
    default:
      return state;
  }
}

