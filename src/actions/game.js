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

export const payOutChips = (winners) => {
  return {
    type: 'PAY_OUT_CHIPS',
    winners
  }
}

export const start = () => dispatch => {
  dispatch(startGame())
  dispatch(postBlinds())
}

export const dealNext = (street) => dispatch => {
  dispatch(deal(street))
}

export const determineWinner = () => {
  return {
    type: 'DETERMINE_WINNER'
  }
}
