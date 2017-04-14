import React from 'react'
import Card from '../Card'
import './styles.css'

const Community = ({ communityCards }) => (
  <div>
    {communityCards &&
      <div className="CommunityCards">
        {communityCards[0] &&
          communityCards[0].length &&
          communityCards[0].map((card, index) => (
            <Card
              visible={true}
              suit={card.suit}
              rank={card.rank}
              key={index}
            />
          ))}
        {communityCards[1] &&
          communityCards[1].length &&
          communityCards[1].map((card, index) => (
            <Card
              visible={true}
              suit={card.suit}
              rank={card.rank}
              key={index}
            />
          ))}
        {communityCards[2] &&
          communityCards[2].length &&
          communityCards[2].map((card, index) => (
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
