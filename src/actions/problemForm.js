//** Action Creators **
export const updateProblemFormData  = problemFormData => {
  switch (problemFormData.category){
    case 'combo':
      return {
        type: 'UPDATED_COMBO_DATA',
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

export const updateCategory = problemFormData => {
  let resistors = []
  for (var i = 0; i < problemFormData.loops.length; i++) {
    // for (var j = 0; j < problemFormData.loops[i].resistors.length; j++) {
      resistors = [...resistors, ...problemFormData.loops[i].resistors]

  }
  switch (problemFormData.category){
    case 'combo':
      return {
        type: 'UPDATED_COMBO_DATA',
        problemFormData: Object.assign({},problemFormData, {
          loops: [
            {
              l_current: 1,
              l_voltage: 1,
              l_resistance: 1,
              resistors: [
                {
                  num: 1,
                  resistance: 1,
                  current: 1,
                  voltage: 1
                }
              ]
            }
          ]
        })
      }

    case 'parallel':
      let loopArray = []
      for (var k = 0; k < resistors.length; k++) {
        loopArray.push({
          l_current: 1,
          l_voltage: 1,
          l_resistance: resistors[k].resistance,
          resistors: [resistors[k]]
        })
      }
      return {
        type: 'UPDATED_PARALLEL_DATA',
        problemFormData: Object.assign({},problemFormData, {
          loops: loopArray
        })
      }
    default:
      // let resistorArray =
        // for (var b = 0; b < resistors.length; b++) {
        //   resistorArray.push(resistors[b])
        // }
      return {
        type: 'UPDATED_SERIES_DATA',
        problemFormData: Object.assign({},problemFormData, {
          loops: [{
            l_current: 1,
            l_voltage: 1,
            l_resistance: 1,
            resistors: [...resistors]
          }
          ]
        })
      }
  }
}


export const resetProblemForm = () => {
  return {
    type: 'RESET_PROBLEM_FORM'
  }
}