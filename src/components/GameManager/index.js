import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  start,
  waitingForPlayerToAct,
  dealNext,
  // determineWinner,
  // payOutChips,
 } from '../../actions/game'

export class GameManager extends Component {
  // COUNT = 0

  componentDidMount() {
    const { dispatch, waitingForPlayer } = this.props
    dispatch(start())
    dispatch(dealNext())
    dispatch(waitingForPlayerToAct())

    if (!waitingForPlayer) {
      dispatch(waitingForPlayerToAct())
    }


    // this.timer = setInterval(() => {
    //   if (this.COUNT < 4) {
    //     dispatch(dealNext())
    //     this.COUNT += 1
    //   } else if (this.COUNT === 4) {
    //     dispatch(determineWinner())
    //     this.COUNT += 1
    //   } else if (this.COUNT === 5) {
    //     dispatch(payOutChips())
    //     this.COUNT += 1
    //   } else if (this.COUNT === 6) {
    //     this.COUNT = 0
    //     dispatch(start())
    //   }
    // }, 1000)
  }

  componentWillReceiveProps() {
    const { tournamentWinner } = this.props
    if (tournamentWinner) {
      clearInterval(this.timer)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const {
      children,
      tournamentWinner,
    } = this.props

    const whatToReturn = tournamentWinner ? <p>AND THE WINNER IS {tournamentWinner}</p> : children

    return (
      <div>
          {whatToReturn}
      </div>
    )
  }
}

export default connect(state => state)(GameManager)
