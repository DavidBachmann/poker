import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Card from '../Card'
import { stripSpaces } from '../../utils'

import './styles.css'

export class Board extends Component {
  render() {
    const { started, players, communityCards, winner, pot } = this.props

    if (!started) {
      return null
    }

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
          <p className="Board-potInfo">
            Pot: <strong>${pot}</strong>
          </p>
        </div>
        {winner && (
          <p className="Board-winnerInfo">
            <strong>{winner.name}</strong> wins the hand with <strong>{winner.handDetails.descr}</strong>
          </p>
        )}
      </div>
    )
  }

}

export default connect(state => state)(Board)
