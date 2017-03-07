import React, { Component } from 'react'
import classNames from 'classnames'
import Card from '../Card'

class Hero extends Component {

  render() {
    const { cards, nextToAct } = this.props

    return (
      <div className={classNames('Player', 'Player1', nextToAct && 'is-next-to-act', 'Hero', 'Board-holeCards')}>
        {cards.map((card, i) => (
          <Card
            visibility="visible"
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
