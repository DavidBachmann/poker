export const startGame = (numberOfPlayers) => ({
  type: 'START',
  numberOfPlayers,
})

export const stopGame = () => ({
  type: 'STOP'
})

export const determineWinner = () => ({
  type: 'DETERMINE_WINNER'
})

export const showAll = () => ({
  type: 'SHOW_ALL'
})

export const nextPlayerToAct = () => ({
  type: 'NEXT_TO_ACT'
})

export const dealNextStreet = () => ({
  type: 'DEAL_NEXT_STREET'
})

export const resetStreet = () => ({
  type: 'RESET_STREET'
})
