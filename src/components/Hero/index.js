import React, { Component } from 'react'
import classNames from 'classnames'
import Card from '../Card'

class Hero extends Component {

  render() {
    const { cards, nextToAct, isWinner } = this.props

    return (
      <div className={classNames('Hero', 'Player', 'Player0', nextToAct && 'is-next-to-act', isWinner && 'is-winner', isWinner === false && 'is-loser', 'Board-holeCards')}>
        {cards.map((card, i) => (
          <Card
            visible="visible"
            suit={card.suit}
            rank={card.rank}
            key={i}
          />
        ))}
      </div>
    )
  }

}

export default Hero