import React, { Component } from 'react'
import classNames from 'classnames'
import { stripSpaces } from '../../utils'
import Card from '../Card'

class Bot extends Component {
  render() {
    const { cards, isWinner, name, nextToAct, visibleCards } = this.props

    return (
      <div className={classNames('Bot', 'Player', stripSpaces(name), nextToAct && 'is-next-to-act', isWinner && 'is-winner', isWinner === false && 'is-loser', 'Board-holeCards')}>
        {cards.map((card, i) => (
          <Card
            visible={visibleCards}
            suit={card.suit}
            rank={card.rank}
            key={i}
          />
        ))}
      </div>
    )
  }
}

export default Bot
