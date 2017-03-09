import React, { Component } from 'react'
import { connect } from 'react-redux'
import Bot from '../Bot'
import Hero from '../Hero'
import Community from '../Community'
import './styles.css'

export class Board extends Component {
  // getWinnerDetails(winners) {
  //   if (winners !== null && winners.length !== 0) {
  //     winners.map((winner, index) => {
  //       return {
  //         place: index + 1,
  //         name: winner.name,
  //         hand: winner.hand,
  //         handDetails: winner.handDetails,
  //       }
  //     })
  //   }
  // }

  render() {
    const { started, bots, communityCards, heroCards, winners, showdown, nextToAct, pot } = this.props

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
            visibleCards={showdown ? true : false}
            name={`Player ${i + 1}`}
            nextToAct={nextToAct === i + 1}
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
        {winners && (
          <div className="Board-winnerInfo">
            {winners.length === 1 && winners.map((winner) => (
              <span key={winner.name}>
                <strong>{winner.name}</strong> wins the hand with <strong>{winner.handDetails.descr}</strong>
            </span>
            ))}
            {winners.length > 1 && (
              <div>
                {winners.map((winner) => (
                  <strong key={winner.name}>{winner.name}, </strong>
                ))}
                <p>tie for the hand with <strong>{winners[0].handDetails.descr}</strong></p>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default connect(state => state)(Board)
