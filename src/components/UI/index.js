import React from 'react';
import { connect } from 'react-redux'
import { startGame, stopGame, nextPlayerToAct, determineWinner } from '../../actions/game'

export class UI extends React.Component {
  render() {
    const { onClickStart, onClickStop, onClickPlayerNextToAct, onClickDetermine } = this.props

    return (
      <div>
        <button onClick={onClickStart}>Start Game</button>
        <button onClick={onClickStop}>Stop Game</button>
        <button onClick={onClickDetermine}>Determine Winner</button>
        <button onClick={onClickPlayerNextToAct}>Next Player To Act</button>
        <button onClick={() => console.log(this.props)}>Get State</button>
      </div>
    )
  }
}

export default connect(null, dispatch => ({
  onClickStart: () => dispatch(startGame(9)),
  onClickStop: () => dispatch(stopGame()),
  onClickPlayerNextToAct: () => dispatch(nextPlayerToAct()),
  onClickDetermine: () => dispatch(determineWinner()),
}))(UI)
