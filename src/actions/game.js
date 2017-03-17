function startGame() {
  return {
    type: 'START',
  }
}

export function waitingForPlayerToAct() {
  return {
    type: 'WAITING_FOR_PLAYER_TO_ACT',
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

function _playerFunction() {
  return {
    type: 'PLAYER_FUNCTION'
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

export const playerAction = (actionString) => {
  return {
    type: 'PLAYER_ACTION',
    actionString
  }
}

export const start = () => dispatch => {
  dispatch(startGame())
  dispatch(postBlinds())
}

export const dealNext = () => dispatch => {
  dispatch(deal())
}

export const dispatchPlayerFunction = () => dispatch => {
  dispatch(_playerFunction())
}
