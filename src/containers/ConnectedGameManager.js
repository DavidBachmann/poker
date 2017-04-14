// Connected GameManager container

import { connect } from 'react-redux'
import GameManager from '../components/GameManager'
import {
  startNewRound,
  generateNewDeck,
  playerBets,
  playerFolds,
  dealNextStreet,
  dealCardsToPlayers,
  getNextPlayerToAct,
} from '../redux/modules/gameManager'

function mapStateToProps(state) {
  return {
    state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startNewRound: () => dispatch(startNewRound()),
    generateNewDeck: () => dispatch(generateNewDeck()),
    dealCardsToPlayers: () => dispatch(dealCardsToPlayers()),
    playerBets: value => dispatch(playerBets(value)),
    playerFolds: () => dispatch(playerFolds()),
    getNextPlayerToAct: () => dispatch(getNextPlayerToAct()),
    dealNextStreet: currentStreet => dispatch(dealNextStreet(currentStreet)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameManager)
