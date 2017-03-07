import React, { Component } from 'react'
import { connect } from 'react-redux'
import Bot from '../Bot'
import Hero from '../Hero'
import Community from '../Community'
import './styles.css'

export class Board extends Component {
  render() {
    const { started, bots, communityCards, heroCards, winner, showdown, nextToAct, pot } = this.props

    if (!started) {
      return null
    }

    return (
      <div className="Board">
        <Hero
          cards={heroCards}
          nextToAct={nextToAct === 0}
        />
        {bots.map((bot, i) => (
          <Bot
            cards={bot}
            cardsVisibility={showdown ? 'visible' : 'hidden'}
            name={`Player ${i+1}`}
            nextToAct={nextToAct === i+1}
            key={i}
          />
        ))}

        <div className="Board-communityCards">
          {communityCards.map((card, i) => (
            <Community
              suit={card.suit}
              rank={card.rank}
              key={i}
            />
          ))}
        </div>
        <p className="Board-potInfo">
          Pot: <strong>${pot}</strong>
        </p>
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
