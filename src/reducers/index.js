const initialState = {
  started: false,
  totalPlayers: 0,
  pot: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        started: true
      }
    case 'STOP':
      return {
        ...state,
        started: false
      }
    default:
      return state
  }
}
