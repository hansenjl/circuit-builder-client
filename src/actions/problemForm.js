//** Action Creators **
export const updateProblemFormData  = problemFormData => {
  switch (problemFormData.category){
    case 'combo':
      return {
        type: 'combo',
        problemFormData
      }
    case 'parallel':
      return {
        type: 'UPDATED_PARALLEL_DATA',
        problemFormData
      }
    default:
      return {
        type: 'UPDATED_SERIES_DATA',
        problemFormData
      }
  }
}


export const resetProblemForm = () => {
  return {
    type: 'RESET_PROBLEM_FORM'
  }
}