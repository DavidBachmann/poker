import React from 'react'
import Card from '../Card'
import './styles.css'

const Community = ({communityCards}) => (
  <div>
    {communityCards &&
      <div className="CommunityCards">
        {communityCards.flop &&
          communityCards.flop.length === 3 &&
          communityCards.flop.map((card, index) => (
            <Card
              visible={true}
              suit={card.suit}
              rank={card.rank}
              key={index}
            />
          ))}
        {communityCards.turn &&
          communityCards.turn.length === 1 &&
          communityCards.turn.map((card, index) => (
            <Card
              visible={true}
              suit={card.suit}
              rank={card.rank}
              key={index}
            />
          ))}
        {communityCards.river &&
          communityCards.river.length === 1 &&
          communityCards.river.map((card, index) => (
            <Card
              visible={true}
              suit={card.suit}
              rank={card.rank}
              key={index}
            />
          ))}
      </div>}
  </div>
)

export default Community
