// Unused until I figure out how I want to use it.

import React, { Component } from 'react'
import Player from '../Player'

class Hero extends Component {

  render() {
    const { cards, chips, isNextToAct, isWinner, isLoser, isBB, isSB, isDealer, name = 'Hero' } = this.props

    return (
      <Player
        name={name}
        chips={chips}
        cards={cards}
        visibleCards={true}
        isHero={true}
        isNextToAct={isNextToAct}
        isBB={isBB}
        isDealer={isDealer}
        isSB={isSB}
        isWinner={isWinner}
        isLoser={isLoser}
      />
    )
  }

}

export default Hero
