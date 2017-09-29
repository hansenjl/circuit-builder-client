export default (state={
  difficulty: 0,
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
}, action) => {

  switch(action.type){
    case 'UPDATED_DATA':
      return action.problemFormData
    default:
      return state
  }
}