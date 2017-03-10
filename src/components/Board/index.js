import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Bot from '../Bot'
import Hero from '../Hero'
import Community from '../Community'
import './styles.css'

export class Board extends PureComponent {

  state = {
    winnersHaveBeenDetermined: false,
  }

  cachedWinners = []

  componentWillReceiveProps(props) {
    const { winners } = props

    if (winners !== null) {
      this.setState({
        winnersHaveBeenDetermined: true
      })
    }
  }

  render() {
    const { started, nextStreet, bots, communityCards, heroCards, winners, showdown, nextToAct, pot } = this.props
    const { winnersHaveBeenDetermined } = this.state

    if (!started) {
      return null
    }

    const getListOfWinnerNames = (winners) => {
      if (winners.length === 0) {
        return null
      } else {
        winners.map((winner) => {
          return this.cachedWinners.push(winner.name)
        })
      }
    }

    if (winnersHaveBeenDetermined) {
      getListOfWinnerNames(winners)
    }

    console.log(this.cachedWinners.length)

    return (
      <div className="Board">
        <Hero
          cards={heroCards}
          nextToAct={nextToAct === 0}
          isWinner={this.cachedWinners.includes('Player 0')}
          isLoser={this.cachedWinners.length > 0 && !this.cachedWinners.includes('Player 0')}
        />
        {bots.map((bot, index) => (
          <Bot
            cards={bot}
            visibleCards={showdown ? true : false}
            name={`Player ${index + 1}`}
            nextToAct={nextToAct === index + 1}
            isWinner={this.cachedWinners.includes(`Player ${index + 1}`)}
            isLoser={this.cachedWinners.length > 0 && !this.cachedWinners.includes(`Player ${index + 1}`)}
            key={index}
          />
        ))}

        <div className="Board-communityCards">
          <Community
            communityCards={communityCards}
            nextStreet={nextStreet}
          />
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
