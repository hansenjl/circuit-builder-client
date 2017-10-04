const initialState = {
  difficulty: 1,
  category: "series",
  tot_voltage: 1,
  tot_resistance: 1,
  tot_current: 1,
  loops: [
    {
      l_voltage: 1,
      l_resistance: 1,
      l_current: 1,
      resistors: [
        {
          voltage: 1,
          resistance: 1,
          current: 1
        }
      ]
    }
  ]
}

export default (state=initialState, action) => {

  switch(action.type){
    case 'UPDATED_DATA':

      const totResistance = action.problemFormData.loops[0].resistors.reduce((tot,resistor)=>{return tot += parseInt(resistor.resistance,10)},0)

      const totCurrent = (action.problemFormData.tot_voltage / totResistance).toFixed(2)

      let resistorArray = action.problemFormData.loops[0].resistors

      for (var i = 0; i < resistorArray.length; i++) {
        resistorArray[i].current = totCurrent
        resistorArray[i].voltage = (totCurrent * resistorArray[i].resistance).toFixed(2)
      }

      return Object.assign({},action.problemFormData,{
        tot_current: totCurrent,
        tot_resistance: totResistance,
        loops: [{
          resistors: resistorArray
        }]
      })

    case 'RESET_PROBLEM_FORM':
      return initialState

    default:
      return state
  }
}