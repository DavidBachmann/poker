import React, { Component } from 'react'
import Card from '../Card'
import determineWinner from '../../utils/winnerDetermination'

import './styles.css'

class Board extends Component {

  render() {
    const { players, communityCards } = this.props
    const winner = determineWinner(players, communityCards)

    return (
      <div className="Board">

        {players.map((player, index) => (
          <div className="Board-holeCards" key={index}>
            <p>Player {index + 1} Cards:</p>
            {player.map((card, index) => (
              <Card
                visibility="visible"
                suit={card.suit}
                rank={card.rank}
                key={index}
              />
            ))}
          </div>
        ))}

        <div className="Board-communityCards">
          <p>Community cards:</p>

          {communityCards.map((card, index) => (
            <Card
              visibility="visible"
              suit={card.suit}
              rank={card.rank}
              key={index}
            />
          ))}

        </div>
        <p><strong>{winner.name}</strong> wins the hand with <strong>{winner.handDetails.descr}</strong></p>
      </div>
    )
  }

}

export default Board
