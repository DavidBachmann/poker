import React, { Component } from 'react'
import Player from '../Player'
import Community from '../Community'
import './styles.css'

class Board extends Component {

  state = {
    winnersHaveBeenDetermined: false,
    positions: {},
  }

  calculatePositions = () => {
    const { players } = this.props
    const totalPlayers = players.length

    this.setState((state) => {
      return {
        positions: {
          bb: (totalPlayers - 1) % totalPlayers,
          sb: (totalPlayers - 2) % totalPlayers,
          button: (totalPlayers - 3) % totalPlayers,
          cutoff: (totalPlayers - 4) % totalPlayers,
          hijack: (totalPlayers - 5) % totalPlayers,
          mp1: (totalPlayers - 6) % totalPlayers,
          mp: (totalPlayers - 7) % totalPlayers,
          utg1: (totalPlayers - 8) % totalPlayers,
          utg: (totalPlayers - 9) % totalPlayers,
        }
      }
    })
  }

  componentWillReceiveProps(props) {
    this.calculatePositions()

    const { handWinners } = props

    if (handWinners == null || handWinners.length === 0 || !Array.isArray(handWinners)) {
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
      players,
      pot,
      currentStreet,
      nextPlayerToAct,
      highestCurrentBet,
      highestCurrentBettor,

      // Passed down functions:
      handleDealing,
      handlePostBlinds,
      handlePlayerBets,
      handlePlayerFolds,
    } = this.props

    const { winnersHaveBeenDetermined, positions } = this.state

    return (
      <div className="Board">
        {players && players.map((player, index) => {
          return (
            <Player
              key={player.id}
              name={player.name}
              chips={player.chips}
              index={index}
              canAct={nextPlayerToAct === index}
              isWinner={this.cachedWinners && this.cachedWinners.includes(player.id)}
              holeCards={player.holeCards}
              positions={positions}
              showCards={winnersHaveBeenDetermined}
              betHandler={handlePlayerBets}
              foldHandler={handlePlayerFolds}
              highestCurrentBet={highestCurrentBet}
              highestCurrentBettor={highestCurrentBettor}
              chipsCurrentlyInvested={player.chipsCurrentlyInvested}
            />
          )
        })}

        <div className="Board-communityCards">
          <Community
            communityCards={communityCards}
            street={currentStreet}
          />
        </div>
        <p className="Board-potInfo">
          Pot: ${pot} (<strong>${players.reduce((acc, player) => player.chipsCurrentlyInvested + acc, 0)}</strong>)
        </p>
        {/* {handWinners && handWinners.length > 0 && (
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
        )} */}
        {dealerMessage && (
          <p className="Board-dealerMessage">
            <strong>{dealerMessage}</strong>
          </p>
        )}
        <div className="DEBUG" style={{position: "absolute", left: -150, bottom: 0, maxWidth: 200}}>
          <button onClick={() => handleDealing()}>Deal</button>
          <button onClick={() => handlePostBlinds()}>Post blinds</button>
        </div>
      </div>
    )
  }

}


export default Board
