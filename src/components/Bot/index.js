import React, { PureComponent } from 'react'
import Player from '../Player'

class Bot extends PureComponent {
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
