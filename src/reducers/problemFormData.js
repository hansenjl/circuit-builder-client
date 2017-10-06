
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
      const inverseResistance = action.problemFormData.loops.reduce((tot,loop)=>{return tot += 1/parseInt(loop.resistors[0].resistance,10)},0)

      const totParallelResistance = 1/inverseResistance

      let parallelLoopArray = action.problemFormData.loops

      for (var j = 0; j < parallelLoopArray.length; j++) {
        parallelLoopArray[j].resistors[0].current = (action.problemFormData.tot_voltage / parallelLoopArray[j].resistors[0].resistance).toFixed(2)
        parallelLoopArray[j].resistors[0].voltage = action.problemFormData.tot_voltage
        parallelLoopArray[j].resistors[0].num = j + 1
      }

      const totParallelCurrent = parallelLoopArray.reduce((tot,loop)=>{return tot += parseInt(loop.resistors[0].current,10)},0)

      return Object.assign({},action.problemFormData,{
        tot_current: totParallelCurrent.toFixed(2) ,
        tot_resistance: totParallelResistance.toFixed(2) ,
        loops: parallelLoopArray
      })

    case 'RESET_PROBLEM_FORM':
      return initialState

    default:
      return state
  }
}