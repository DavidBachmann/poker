// Connected GameManager container

import { connect } from 'react-redux'
import GameManager from '../components/GameManager'
import {
  startNewRound,
  generateNewDeck,
  playerBets,
  dealCardsToPlayers,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameManager)
