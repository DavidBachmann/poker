// Connected GameManager container

import { connect } from 'react-redux'
import GameManager from '../components/GameManager'
import { startNewRound, playerBets } from '../redux/modules/gameManager'

function mapStateToProps(state) {
  return {
    state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startNewRound: () => dispatch(startNewRound()),
    playerBets: value => dispatch(playerBets(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameManager)
