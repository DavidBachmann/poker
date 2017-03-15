import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  start,
  dealNext,
 } from '../../actions/game'

export class UI extends Component {

  render() {
    const {
      onClickStart,
      onClickDeal,
    } = this.props

    return (
      <div>
        <button onClick={onClickStart}>Re/Start Game</button>
        <button onClick={onClickDeal}>Deal</button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  street: state.street,
  onClickDeal: () => dispatch => {
    dispatch(dealNext())
  }
})

export default connect(mapStateToProps)(UI)
