import React, { Component } from 'react'
import classNames from 'classnames'
import Card from '../Card'
import { stripSpaces } from '../../utils'

import './styles.css'

class Board extends Component {
  render() {
    const { players, communityCards, winner } = this.props

    return (
      <div className="Board">
        {players.map((player, i) => {
          const playerName = `Player ${i+1}`
          const isWinner = winner && playerName === winner.name

          return (
            <div className={classNames('Player', stripSpaces(playerName), isWinner && 'is-winner', 'Board-holeCards')} key={i}>
              {player.map((card, i) => (
                <Card
                  visibility="visible"
                  suit={card.suit}
                  rank={card.rank}
                  key={i}
                />
              ))}
            </div>
          )
        })}

        <div className="Board-communityCards">
          {communityCards.map((card, i) => (
            <Card
              visibility="visible"
              suit={card.suit}
              rank={card.rank}
              key={i}
            />
          ))}

        </div>
        {winner && (
          <p className="Board-info"><strong>{winner.name}</strong> wins the hand with <strong>{winner.handDetails.descr}</strong></p>
        )}
      </div>
    )
  }

}

export default Board
