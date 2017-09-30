//** Action Creators **
export const updateProblemFormData  = problemFormData => {
  return {
    type: 'UPDATED_DATA',
    problemFormData
  }
}

export const resetProblemForm = () => {
  return {
    type: 'RESET_PROBLEM_FORM'
  }
}