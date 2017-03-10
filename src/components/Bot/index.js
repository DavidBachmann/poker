import React, { PureComponent } from 'react'
import Player from '../Player'

class Bot extends PureComponent {
  render() {
    const { cards, isWinner, isLoser, name, nextToAct, visibleCards } = this.props

    return (
      <Player
        name={name}
        visibleCards={visibleCards}
        cards={cards}
        nextToAct={nextToAct}
        isWinner={isWinner}
        isLoser={isLoser}
      />
    )

  }
}

export default Bot
