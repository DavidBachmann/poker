import React from 'react'
import Card from '../Card'
import './styles.css'

// Todo: Refactor
class Community extends React.Component {

  render() {
    const { communityCards } = this.props
    return (
      <div className="CommunityCards">
        {communityCards.flop.length === 3 && communityCards.flop.map((card, index) => (
          <Card
            visible={true}
            suit={card.suit}
            rank={card.rank}
            key={index}
          />
        ))}
        {communityCards.turn.length === 1 && communityCards.turn.map((card, index) => (
          <Card
            visible={true}
            suit={card.suit}
            rank={card.rank}
            key={index}
          />
        ))}
        {communityCards.river.length === 1 && communityCards.river.map((card, index) => (
          <Card
            visible={true}
            suit={card.suit}
            rank={card.rank}
            key={index}
          />
        ))}
      </div>
    )
  }

}

export default Community
