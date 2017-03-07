import React, { Component } from 'react'
import Card from '../Card'

class Hero extends Component {

  render() {
    const { cards } = this.props

    return (
      <div className="Player Player1 Hero Board-holeCards">
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
