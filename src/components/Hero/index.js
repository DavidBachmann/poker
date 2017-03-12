import React, { PureComponent } from 'react'
import Player from '../Player'

class Hero extends PureComponent {

  render() {
    const { cards, chips, nextToAct, isWinner, isLoser, name = 'Hero' } = this.props

    return (
      <Player
        name={name}
        chips={chips}
        cards={cards}
        visibleCards={true}
        isHero={true}
        nextToAct={nextToAct}
        isWinner={isWinner}
        isLoser={isLoser}
      />
    )
  }

}

export default Hero
