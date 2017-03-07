import React, { Component } from 'react'
import classNames from 'classnames'
import { stripSpaces } from '../../utils'
import Card from '../Card'

class Bot extends Component {

  render() {
    const { cards, name } = this.props

    return (
      <div className={classNames('Player', stripSpaces(name), 'Board-holeCards')}>
        {cards.map((card, i) => (
          <Card
            visibility="hidden"
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
