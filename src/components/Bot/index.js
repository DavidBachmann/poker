// Unused until I figure out how I want to use it.

import React, {Component} from 'react'
import Player from '../Player'

class Bot extends Component {
  render() {
    const {
      cards,
      chips,
      isBB,
      isDealer,
      isLoser,
      isNextToAct,
      isSB,
      isWinner,
      name,
      visibleCards,
    } = this.props

    return (
      <Player
        cards={cards}
        chips={chips}
        isNextToAct={isNextToAct}
        isBB={isBB}
        isDealer={isDealer}
        isSB={isSB}
        isWinner={isWinner}
        isLoser={isLoser}
        name={name}
        visibleCards={visibleCards}
      />
    )
  }
}

export default Bot
