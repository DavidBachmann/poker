export const startGame = () => ({
  type: 'START',
})

export const killGame = () => ({
  type: 'KILL'
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

export const dealPreflop = () => ({
  type: 'DEAL_PREFLOP'
})

export const dealFlop = () => ({
  type: 'DEAL_FLOP'
})

export const dealTurn = () => ({
  type: 'DEAL_TURN'
})

export const dealRiver = () => ({
  type: 'DEAL_RIVER'
})

export const postBlinds = () => ({
  type: 'POST_BLINDS'
})

export const payOutChips = (winners) => ({
  type: 'PAY_OUT_CHIPS',
  winners
})
