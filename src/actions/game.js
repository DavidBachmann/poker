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
