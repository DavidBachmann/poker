import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  start,
  dealNext,
  determineWinner,
  payOutChips,
  throwAwayCards,
 } from '../../actions/game'

export class GameManager extends Component {
COUNT = 0

  componentDidMount() {
    const { dispatch } = this.props
    console.log(this.props)

    dispatch(start())

    this.timer = setInterval(() => {
      if (this.COUNT < 4) {
        dispatch(dealNext())
        console.log(this.props.street)
        this.COUNT += 1
      } else if (this.COUNT === 4) {
        dispatch(determineWinner())
        this.COUNT += 1
      } else if (this.COUNT === 5) {
        dispatch(payOutChips())
        this.COUNT += 1
      } else if (this.COUNT === 6) {
        this.COUNT = 0
        dispatch(throwAwayCards())
        dispatch(start())
      }
    }, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const {
      children
    } = this.props

    return (
      <div>
        {children}
      </div>
    )
  }
}

export default connect(state => state)(GameManager)
