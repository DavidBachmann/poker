function startGame() {
  return {
    type: 'START',
  }
}

function showAll() {
  return {
    type: 'SHOW_ALL'
  }
}

export const throwAwayCards = () => {
  return {
    type: 'THROW_AWAY_CARDS'
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

export const payOutChips = () => {
  return {
    type: 'PAY_OUT_CHIPS'
  }
}

export const start = () => dispatch => {
  dispatch(startGame())
  dispatch(postBlinds())
}

export const dealNext = () => dispatch => {
  dispatch(deal())
}

export const determineWinner = () => {
  return {
    type: 'DETERMINE_WINNER'
  }
}
