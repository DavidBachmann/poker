// Connected GameManager container

import {connect} from 'react-redux'
import GameManager from '../components/GameManager'
import {playerBets} from '../redux/modules/test'

function mapStateToProps(state) {
  return {
    state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    playerBets: value => dispatch(playerBets(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameManager)
