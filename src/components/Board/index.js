import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Player from '../Player'
import Community from '../Community'
import './styles.css'

import {
  playerBets,
  playerCalls,
  playerChecks,
  playerFolds,
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
    const { nextToActCounter, players } = this.props
    const totalPlayers = players.length
    this.setState(() => ({
      bb: (nextToActCounter + totalPlayers - 1) % totalPlayers,
      sb: (nextToActCounter + totalPlayers - 2) % totalPlayers,
      dealer: (nextToActCounter + totalPlayers - 3) % totalPlayers,
    }))
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

  render() {
    const {
      communityCards,
      dealerMessage,
      handWinners,
      nextToActCounter,
      players,
      pot,
      showdown,
      street,
    } = this.props

    const { winnersHaveBeenDetermined, sb, bb, dealer } = this.state

    const getListOfWinnerNames = () => {
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
      <div className="Board">
        {players && players.map((player, index) => {
          const isWinner = this.cachedWinners.includes(player.id)
          const isDealer = index === dealer
          const isSB = index === sb
          const isBB = index === bb
          return (
            <Player
              blindsPaid={player.blindsPaid}
              cards={player.cards && player.cards}
              chips={player.chips}
              id={player.id}
              isBB={isBB}
              chipsInvested={player.chipsInvested}
              isDealer={isDealer}
              isLoser={this.cachedWinners.length > 0 && !isWinner}
              isSB={isSB}
              isWinner={isWinner}
              hasFolded={player.cards.length === 0}
              hasActedThisTurn={player.hasActedThisTurn}
              key={player.id}
              name={player && player.name}
              isNextToAct={nextToActCounter === index}
              position={index}
              visibleCards={showdown ? true : false}
              {...this.props}
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
          Pot: ${pot} (<strong>${players.reduce((acc, player) => player.chipsInvested + player.blindsPaid + acc, 0)}</strong>)
        </p>
        {handWinners && (
          <div className="Board-winnerInfo">
            {handWinners.length === 1 && handWinners.map((winner) => (
              <span key={winner.id}>
                <strong>{winner.name}</strong> wins the hand with <strong>{winner.handDetails.descr}</strong>
              </span>
            ))}
            {handWinners.length > 1 && (
              <div>
                {handWinners.map((winner) => (
                  <strong key={winner.id}>{winner.name}, </strong>
                ))}
                <p>tie for the hand with <strong>{handWinners[0].handDetails.descr}</strong></p>
              </div>
            )}
          </div>
        )}
        {dealerMessage && (
          <p className="Board-dealerMessage">
            <strong>{dealerMessage}</strong>
          </p>
        )}
      </div>
    )
  }

}

const mapStateToProps = state => state
const mapDispatchToProps = (dispatch) => ({
  onPlayerClicksBet: (amount) => dispatch(playerBets(amount)),
  onPlayerClicksCall: () => dispatch(playerCalls()),
  onPlayerClicksCheck: () => dispatch(playerChecks()),
  onPlayerClicksFold: () => dispatch(playerFolds()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
