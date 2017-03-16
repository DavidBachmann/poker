function startGame() {
  return {
    type: 'START',
  }
}


function nextPlayerToAct() {
  return {
    type: 'NEXT_TO_ACT'
  }
}

function deal(street,) {
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

export const start = () => dispatch => {
  dispatch(startGame())
  dispatch(postBlinds())
}

export const dealNext = () => dispatch => {
  dispatch(deal())
}
