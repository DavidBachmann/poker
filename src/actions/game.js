function startGame() {
  return {
    type: 'START',
  }
}


function deal(street) {
  return {
    type: 'DEAL',
    street
  }
}

function postBlinds() {
  return {
    type: 'POST_BLINDS'
  }
}

export const pause = () => {
  return {
    type: 'PAUSE',
  }
}

export const payOutChips = () => {
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


export const _waitingForNextPlayerToAct = () => {
  return {
    type: 'WAITING_FOR_PLAYER_TO_ACT',
  }
}

export const start = () => dispatch => {
  dispatch(startGame())
  dispatch(postBlinds())
  dispatch(_waitingForNextPlayerToAct())
}

export const playerBets = (amount) => dispatch => {
  dispatch(_playerBets(amount))
  dispatch(_waitingForNextPlayerToAct())
}

export const playerCalls = () => dispatch => {
  dispatch(_playerCalls())
  dispatch(_waitingForNextPlayerToAct())
}

export const playerFolds = () => dispatch => {
  dispatch(_playerFolds())
  dispatch(_waitingForNextPlayerToAct())
}

export const dealNext = () => dispatch => {
  dispatch(deal())
}
