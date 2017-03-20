import React, { PureComponent } from 'react'
import Player from '../Player'
import Community from '../Community'
import './styles.css'

class Board extends PureComponent {

  cachedWinners = []

  state = {
    winnersHaveBeenDetermined: false,
    positions: {},
  }

  calculatePositions = () => {
    const { players, nextPlayerToAct } = this.props
    const totalPlayers = players.length

    this.setState({
      positions: {
        cutoff: (nextPlayerToAct + totalPlayers - 1) % totalPlayers,
        hijack: (nextPlayerToAct + totalPlayers - 2) % totalPlayers,
        mp1: (nextPlayerToAct + totalPlayers - 3) % totalPlayers,
        mp: (nextPlayerToAct + totalPlayers - 4) % totalPlayers,
        utg1: (nextPlayerToAct + totalPlayers - 5) % totalPlayers,
        utg: (nextPlayerToAct + totalPlayers - 6) % totalPlayers,
        bb: (nextPlayerToAct + totalPlayers - 7) % totalPlayers,
        sb: (nextPlayerToAct + totalPlayers - 8) % totalPlayers,
        button: (nextPlayerToAct + totalPlayers - 9) % totalPlayers,
      }
    })
  }

  componentDidMount() {
    this.calculatePositions()
  }

  componentWillReceiveProps(props) {
    const { handWinners } = props

    if (handWinners == null) {
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
      players,
      pot,
      street,
      nextPlayerToAct
    } = this.props

    const { winnersHaveBeenDetermined, positions } = this.state

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
          return (
            <Player
              holeCards={player.holeCards}
              name={player.name}
              chips={player.chips}
              index={index}
              key={player.id}
              positions={positions}
              canAct={nextPlayerToAct === index}
              chipsCurrentlyInvested={player.chipsCurrentlyInvested}
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
          Pot: ${pot} (<strong>${players.reduce((acc, player) => player.chipsCurrentlyInvested + acc, 0)}</strong>)
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


export default Board
