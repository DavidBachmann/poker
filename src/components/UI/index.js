import React from 'react';
import { connect } from 'react-redux'
import { startGame, stopGame, determineWinner } from '../../actions/game'

export class UI extends React.Component {
  render() {
    const { onClickStart, onClickStop, onClickDetermine } = this.props

    return (
      <div>
        <button onClick={onClickStart}>Start Game</button>
        <button onClick={onClickStop}>Stop Game</button>
        <button onClick={onClickDetermine}>Determine Winner</button>
        <button onClick={() => console.log(this.props)}>Get State</button>
      </div>
    )
  }

}

export default connect(null, dispatch => ({
  onClickStart: () => dispatch(startGame(9)),
  onClickStop: () => dispatch(stopGame()),
  onClickDetermine: () => dispatch(determineWinner()),
}))(UI)
