
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
          num: 1,
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
    case 'UPDATED_SERIES_DATA':

      const totResistance = action.problemFormData.loops[0].resistors.reduce((tot,resistor)=>{return tot += parseInt(resistor.resistance,10)},0)

      const totCurrent = (action.problemFormData.tot_voltage / totResistance).toFixed(2)

      let resistorArray = action.problemFormData.loops[0].resistors

      for (var i = 0; i < resistorArray.length; i++) {
        resistorArray[i].num = i + 1
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

    case 'UPDATED_PARALLEL_DATA':
      const inverseResistance = action.problemFormData.loops[0].resistors.reduce((tot,resistor)=>{return tot += 1/parseInt(resistor.resistance,10)},0)

      const totParallelResistance = 1/inverseResistance

      let parallelResistorArray = action.problemFormData.loops[0].resistors

      for (var j = 0; j < parallelResistorArray.length; j++) {
        parallelResistorArray[j].current = (action.problemFormData.tot_voltage / parallelResistorArray[j].resistance).toFixed(2)
        parallelResistorArray[j].voltage = action.problemFormData.tot_voltage
        parallelResistorArray[j].num = j + 1
      }

      const totParallelCurrent = parallelResistorArray.reduce((tot,resistor)=>{return tot += parseInt(resistor.current,10)},0)

      return Object.assign({},action.problemFormData,{
        tot_current: totParallelCurrent.toFixed(2) ,
        tot_resistance: totParallelResistance.toFixed(2) ,
        loops: [{
          resistors: parallelResistorArray
        }]
      })

    case 'RESET_PROBLEM_FORM':
      return initialState

    default:
      return state
  }
}