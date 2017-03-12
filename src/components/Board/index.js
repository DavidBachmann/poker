import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Bot from '../Bot'
import Hero from '../Hero'
import Community from '../Community'
import './styles.css'



export class Board extends PureComponent {

  cachedWinners = []

  state = {
    winnersHaveBeenDetermined: false,
    bb: null,
    sb: null,
    dealer: null,
  }

  calcPositions() {
    const { nextToAct, totalPlayers } = this.props

    this.setState({
      bb: (nextToAct + totalPlayers - 1) % totalPlayers,
      sb: (nextToAct + totalPlayers - 2) % totalPlayers,
      dealer: (nextToAct + totalPlayers - 3) % totalPlayers,
    })
  }

  componentDidMount() {
    this.calcPositions()
  }

  componentWillReceiveProps(props) {
    const { winners } = props

    this.calcPositions()

    if (winners == null) {
      // Set or Reset
      this.cachedWinners = []
      this.setState({
        winnersHaveBeenDetermined: false
      })
    } else {
      this.setState({
        winnersHaveBeenDetermined: true
      })
    }
  }

  render() {
    const {
      bots,
      communityCards,
      hero,
      nextStreet,
      nextToAct,
      pot,
      showdown,
      started,
      winners,
    } = this.props

    const { winnersHaveBeenDetermined, bb, sb, dealer } = this.state

    if (!started) {
      return null
    }

    const getListOfWinnerNames = (winners) => {
      if (!winners) {
        return
      } else if (winners.length === 0) {
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

    // Todo combine Hero and Bot into one Player array to map through.
    return (
      <div className="Board">
        {hero && hero.map((hero, index) => (
          <Hero
            cards={hero && hero.cards}
            chips={hero && hero.chips}
            isBB={index === bb}
            isDealer={index === dealer}
            isLoser={this.cachedWinners.length > 0 && !this.cachedWinners.includes('Player 0')}
            isSB={index === sb}
            isWinner={this.cachedWinners.includes('Player 0')}
            key={index}
            isNextToAct={nextToAct === 0}
            position={index}
          />
        ))}
        {bots && bots.map((bot, index) => (
          <Bot
            cards={bot && bot.cards}
            chips={bot && bot.chips}
            isBB={index + 1 === bb}
            isDealer={index + 1 === dealer}
            isLoser={this.cachedWinners.length > 0 && !this.cachedWinners.includes(`Player ${index + 1}`)}
            isSB={index + 1 === sb}
            isWinner={this.cachedWinners.includes(`Player ${index + 1}`)}
            key={index + 1}
            name={`Player ${index + 1}`}
            isNextToAct={nextToAct === index + 1}
            position={index + 1}
            visibleCards={showdown ? true : false}
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
