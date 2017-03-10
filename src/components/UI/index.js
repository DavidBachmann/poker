import React from 'react';
import { connect } from 'react-redux'
import { startGame, stopGame, nextPlayerToAct, determineWinner, dealPreflop, dealFlop, dealTurn, dealRiver, resetCards } from '../../actions/game'

export class UI extends React.Component {
  render() {
    const { onClickStart, onClickStop, onClickPlayerNextToAct, onClickDetermine, onClickDealPreflop, onClickDealFlop, onClickDealTurn, onClickDealRiver, onClickResetCards } = this.props

    return (
      <div>
        <div>
          <button onClick={onClickStart}>Start Game</button>
          <button onClick={onClickStop}>Stop Game</button>
          <button onClick={onClickDetermine}>Determine Winner</button>
          <button onClick={onClickPlayerNextToAct}>Next Player To Act</button>
          <button onClick={onClickResetCards}>Reset Cards</button>
        </div>
        <div>
          <button onClick={onClickDealPreflop}>Deal Preflop</button>
          <button onClick={onClickDealFlop}>Deal Flop</button>
          <button onClick={onClickDealTurn}>Deal Turn</button>
          <button onClick={onClickDealRiver}>Deal River</button>
        </div>
      </div>
    )
  }
}

export default connect(null, dispatch => ({
  onClickStart: () => dispatch(startGame()),
  onClickStop: () => dispatch(stopGame()),
  onClickPlayerNextToAct: () => dispatch(nextPlayerToAct()),
  onClickDetermine: () => dispatch(determineWinner()),
  onClickResetCards: () => dispatch(resetCards()),
  onClickDealPreflop: () => dispatch(dealPreflop()),
  onClickDealFlop: () => dispatch(dealFlop()),
  onClickDealTurn: () => dispatch(dealTurn()),
  onClickDealRiver: () => dispatch(dealRiver()),
}))(UI)
