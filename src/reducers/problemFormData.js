
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

    case 'UPDATED_COMBO_DATA':
      //Calculate the total resistance by adding individual resistance of resistors on the same loop before adding them with parallel rules
      const comboResistance = 1/ (action.problemFormData.loops.reduce((tot,loop)=>{return tot += 1/(loop.resistors.reduce((total,resistor)=>{return total += parseInt(resistor.resistance,10)},0))},0))

      const comboCurrent = action.problemFormData.tot_voltage / comboResistance
      let comboLoopArray = action.problemFormData.loops

      //calculate and set resistor current and voltage values

      let rCount = 1
      for (var k = 0; k < comboLoopArray.length; k++) {
        comboLoopArray[k].l_resistance = comboLoopArray[k].resistors.reduce((total,resistor)=>{return total += resistor.resistance},0)
        comboLoopArray[k].l_voltage = action.problemFormData.tot_voltage
        comboLoopArray[k].l_current = (comboLoopArray[k].l_voltage /comboLoopArray[k].l_resistance).toFixed(2)
        for (var r = 0; r < comboLoopArray[k].resistors.length; r++ ){
          comboLoopArray[k].resistors[r].num = rCount
          comboLoopArray[k].resistors[r].current = comboLoopArray[k].l_current
          comboLoopArray[k].resistors[r].voltage = comboLoopArray[k].l_current * comboLoopArray[k].resistors[r].resistance
          rCount += 1
        }
      }

      debugger

      return Object.assign({},action.problemFormData,{
        tot_current: comboCurrent.toFixed(2) ,
        tot_resistance: comboResistance.toFixed(2) ,
        loops: comboLoopArray
      })

    case 'RESET_PROBLEM_FORM':
      return initialState

    default:
      return state
  }
}