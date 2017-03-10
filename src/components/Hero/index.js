import React, { PureComponent } from 'react'
import Player from '../Player'

class Hero extends PureComponent {

  render() {
    const { cards, nextToAct, isWinner, isLoser } = this.props

    return (
      <Player
        visibleCards={true}
        isHero={true}
        cards={cards}
        nextToAct={nextToAct}
        isWinner={isWinner}
        isLoser={isLoser}
      />
    )
  }

}

export default Hero
