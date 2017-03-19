import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  start,
  dealNext,
 } from '../../actions/game'

export class GameManager extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(start())
    dispatch(dealNext())
  }

  componentWillReceiveProps() {
    const { players, dispatch } = this.props

    // if we can't find a player that hasn't acted this turn
    // it means that everyone has acted and we can continue dealing
    if (!players.find(player => player.hasActedThisTurn === false)) {
      dispatch(dealNext())
    }
  }

  render() {
    const {
      children,
      tournamentWinner,

    } = this.props

    const temporaryRenderLogic = tournamentWinner ? <p>AND THE WINNER IS {tournamentWinner}</p> : children

    return (
      <div>
        {temporaryRenderLogic}
      </div>
    )
  }
}

export default connect(state => state)(GameManager)
