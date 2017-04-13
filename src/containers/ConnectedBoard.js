// Connected Board container

import { connect } from 'react-redux';
import Board from '../components/Board'
import {
  playerBets,
} from '../redux/modules/test';

function mapStateToProps(state) {

}

function mapDispatchToProps(dispatch) {
  return {
    playerBets: (value) => dispatch(playerBets(value)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
