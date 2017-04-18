// Connected GameManager container

import { connect } from 'react-redux'
import GameManager from '../components/GameManager'
import {
  startGameThunk,
  playerBetsThunk,
  playerFoldsThunk,
} from '../redux/modules/gameManager'

function mapStateToProps(state) {
  return {
    ...state, //temp
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startGameThunk: () => dispatch(startGameThunk()),
    playerBetsThunk: value => dispatch(playerBetsThunk(value)),
    playerFoldsThunk: () => dispatch(playerFoldsThunk()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameManager)
