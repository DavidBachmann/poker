import React, { Component } from 'react'
import { connect } from 'react-redux'
import Bot from '../Bot'
import Hero from '../Hero'
import Community from '../Community'
import './styles.css'

import {
  start,
  dealNext,
  determineWinner,
 } from '../../actions/game'


export class Board extends Component {

  cachedWinners = []

  state = {
    winnersHaveBeenDetermined: false,
    bb: null,
    sb: null,
    dealer: null,
  }

  calculatePositions() {
    const { nextToAct, totalPlayers } = this.props

    this.setState({
      bb: (nextToAct + totalPlayers - 1) % totalPlayers,
      sb: (nextToAct + totalPlayers - 2) % totalPlayers,
      dealer: (nextToAct + totalPlayers - 3) % totalPlayers,
    })
  }

  componentDidMount() {
    this.calculatePositions()
  }

  componentWillReceiveProps(props) {
    const { winners } = props
    this.calculatePositions()

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
    console.log("Called render on board")
    const {
      players,
      communityCards,
      street,
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

    return (
      <div className="Board" onClick={this.handlePostBlinds}>
        {players && players.map((player, index) => {
          const PlayerType = index === 0 ? Hero : Bot

          return (
            <PlayerType
              cards={player && player.cards}
              chips={player && player.chips}
              isBB={index === bb}
              isDealer={index === dealer}
              isLoser={this.cachedWinners.length > 0 && !this.cachedWinners.includes(player.name)}
              isSB={index === sb}
              isWinner={this.cachedWinners.includes(player.name)}
              key={index}
              name={player && player.name}
              isNextToAct={nextToAct === index}
              position={index}
              visibleCards={showdown ? true : false}
            />
          )
        })}

        <div className="Board-communityCards">
          <Community
            communityCards={communityCards}
            street={street}
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

const mapStateToProps = (state, ownProps) => ({
  players: state.players,
  communityCards: state.communityCards,
  street: state.street,
  nextToAct: state.nextToAct,
  pot: state.pot,
  showdown: state.showdown,
  started: state.started,
  winners: state.winners,
})

export default connect(mapStateToProps)(Board)
