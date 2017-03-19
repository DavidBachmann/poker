const _startGame = () => {
  return {
    type: 'START',
  }
}


const _deal = (street) => {
  return {
    type: 'DEAL',
    street
  }
}

const _postBlinds = () => {
  return {
    type: 'POST_BLINDS'
  }
}

export const _payOutChips = () => {
  return {
    type: 'PAY_OUT_CHIPS'
  }
}

export const determineWinner = () => {
  return {
    type: 'DETERMINE_WINNER'
  }
}

const _playerBets = (amountRequested) => {
  return {
    type: 'PLAYER_ACTION_BET',
    amountRequested
  }
}

const _playerCalls = () => {
  return {
    type: 'PLAYER_ACTION_CALL'
  }
}


const _playerFolds = () => {
  return {
    type: 'PLAYER_ACTION_FOLD',
  }
}


export const start = () => dispatch => {
  dispatch(_startGame())
  dispatch(_postBlinds())
}

export const playerBets = (amount) => dispatch => {
  dispatch(_playerBets(amount))
}

export const playerCalls = () => dispatch => {
  dispatch(_playerCalls())
}

export const playerFolds = () => dispatch => {
  dispatch(_playerFolds())
}

export const dealNext = () => dispatch => {
  dispatch(_deal())
}
