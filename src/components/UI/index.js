import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import {
  dealFlop,
  dealPreflop,
  dealRiver,
  dealTurn,
  determineWinner,
  killGame,
  nextPlayerToAct,
  postBlinds,
  startGame,
  payOutChips,
 } from '../../actions/game'

export class UI extends PureComponent {
  render() {
    const {
      onClickStart,
      onClickKill,
      onClickPlayerNextToAct,
      onClickDetermine,
      onClickDealPreflop,
      onClickDealFlop,
      onClickDealTurn,
      onClickDealRiver,
      onClickPostBlinds,
      onClickPayOutChips,
    } = this.props
    return (
      <div>
        <div>
          <button onClick={onClickStart}>Re/Start Game</button>
          <button onClick={onClickKill}>Kill Game</button>
          <button onClick={onClickDetermine}>Determine Winner</button>
          <button onClick={onClickPlayerNextToAct}>Next Player To Act</button>
        </div>
        <div>
          <button onClick={onClickDealPreflop}>Deal Preflop</button>
          <button onClick={onClickDealFlop}>Deal Flop</button>
          <button onClick={onClickDealTurn}>Deal Turn</button>
          <button onClick={onClickDealRiver}>Deal River</button>
        </div>
        <div>
          <button onClick={onClickPostBlinds}>Post blinds</button>
          <button onClick={onClickPayOutChips}>Pay out chips</button>
        </div>
      </div>
    )
  }
}

export default connect(null, dispatch => ({
  onClickStart: () => dispatch(startGame()),
  onClickKill: () => dispatch(killGame()),
  onClickPlayerNextToAct: () => dispatch(nextPlayerToAct()),
  onClickDetermine: () => dispatch(determineWinner()),
  onClickDealPreflop: () => dispatch(dealPreflop()),
  onClickDealFlop: () => dispatch(dealFlop()),
  onClickDealTurn: () => dispatch(dealTurn()),
  onClickDealRiver: () => dispatch(dealRiver()),
  onClickPostBlinds: () => dispatch(postBlinds()),
  onClickPayOutChips: () => dispatch(payOutChips()),
}))(UI)
