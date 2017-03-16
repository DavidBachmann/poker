import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import Bot from '../Bot'
import Hero from '../Hero'
import Community from '../Community'
import './styles.css'

import {
  start,
  dealNext,
  determineWinner,
 } from '../../actions/game'


export class Board extends PureComponent {

  cachedWinners = []

  state = {
    winnersHaveBeenDetermined: false,
    bb: null,
    sb: null,
    dealer: null,
  }

  calculatePositions() {
    const { nextToAct, players } = this.props
    const totalPlayers = players.length

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
    const { handWinners } = props
    this.calculatePositions()

    if (handWinners == null) {
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

  shouldComponentUpdate(nextProps) {
    if (isEqual(this.props, nextProps)) {
      return false
    } else {
      return true
    }
  }

  render() {
    const {
      players,
      communityCards,
      street,
      nextToAct,
      pot,
      showdown,
      started,
      handWinners,
    } = this.props

    if (!started) {
      return null
    }

    const { winnersHaveBeenDetermined, bb, sb, dealer } = this.state

    const getListOfWinnerNames = (handWinners) => {
      if (!handWinners) {
        return
      } else if (handWinners.length === 0) {
        return null
      } else {
        handWinners.map((winner) => {
          return this.cachedWinners.push(winner.id)
        })
      }
    }

    if (winnersHaveBeenDetermined) {
      getListOfWinnerNames(handWinners)
    }

    return (
      <div className="Board" onClick={this.handlePostBlinds}>
        {players && players.map((player, index) => {
          const PlayerType = index === 0 ? Hero : Bot
          const isWinner = this.cachedWinners.includes(player.id)

          return (
            <PlayerType
              cards={player.cards && player.cards}
              chips={player.chips}
              id={player.id}
              isBB={index === bb}
              isDealer={index === dealer}
              isLoser={this.cachedWinners.length > 0 && !isWinner}
              isSB={index === sb}
              isWinner={isWinner}
              key={player.id}
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
        {handWinners && (
          <div className="Board-winnerInfo">
            {handWinners.length === 1 && handWinners.map((winner) => (
              <span key={winner.name}>
                <strong>{winner.name}</strong> wins the hand with <strong>{winner.handDetails.descr}</strong>
            </span>
            ))}
            {handWinners.length > 1 && (
              <div>
                {handWinners.map((winner) => (
                  <strong key={winner.name}>{winner.name}, </strong>
                ))}
                <p>tie for the hand with <strong>{handWinners[0].handDetails.descr}</strong></p>
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
  handWinners: state.handWinners,
})

export default connect(state => state)(Board)
