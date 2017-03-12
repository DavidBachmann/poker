import React, { PureComponent } from 'react'
import Player from '../Player'

class Bot extends PureComponent {
  render() {
    const { cards, chips, isWinner, isLoser, name, nextToAct, visibleCards } = this.props

    return (
      <Player
        cards={cards}
        chips={chips}
        isLoser={isLoser}
        isWinner={isWinner}
        name={name}
        nextToAct={nextToAct}
        visibleCards={visibleCards}
      />
    )

  }
}

export default Bot
