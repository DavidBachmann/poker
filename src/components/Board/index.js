import React, { Component } from 'react'
import Player from '../Player'
import Community from '../Community'
import './styles.css'

class Board extends Component {
  state = {
    winnersHaveBeenDetermined: false,
  }

  componentWillReceiveProps() {
    // const { handWinners } = props
    //
    // if (handWinners === null || handWinners.length === 0 || !Array.isArray(handWinners)) {
    //   this.setState({
    //     winnersHaveBeenDetermined: false
    //   })
    // } else {
    //   this.setState({
    //     winnersHaveBeenDetermined: true
    //   })
    // }
  }

  betHandler = value => {
    const { playerBetsThunk } = this.props

    playerBetsThunk(value)
  }

  foldHandler = () => {
    const { playerFoldsThunk } = this.props
    playerFoldsThunk()
  }

  render() {
    const {
      communityCards,
      dealerMessage,
      handWinners,
      showdown,
      positions,
      players,
      pot,
      currentStreet,
      nextPlayerToAct,
      highestCurrentBettor,
    } = this.props

    const { winnersHaveBeenDetermined } = this.state

    return (
      <div className="Board has-6-players">
        {players &&
          players.map((player, index) => {
            return (
              <Player
                key={player.id}
                name={player.name}
                chips={player.chips}
                index={index}
                canAct={nextPlayerToAct === index}
                isAllIn={player.isAllIn}
                isWinner={
                  this.cachedWinners && this.cachedWinners.includes(player.id)
                }
                holeCards={player.holeCards}
                positions={positions}
                showCards={true}
                betHandler={this.betHandler}
                foldHandler={this.foldHandler}
                highestCurrentBettor={highestCurrentBettor}
                chipsCurrentlyInvested={player.chipsCurrentlyInvested}
              />
            )
          })}

        <div className="Board-communityCards">
          <Community communityCards={communityCards} street={currentStreet} />
        </div>
        <p className="Board-potInfo">
          Pot: $
          {pot}
          {' '}
          (
          <strong>
            $
            {players.reduce(
              (acc, player) => player.chipsCurrentlyInvested + acc,
              0,
            )}
          </strong>
          )
        </p>
        {handWinners &&
          handWinners.length > 0 &&
          <div className="Board-winnerInfo">
            {handWinners.length === 1 &&
              handWinners.map(winner => (
                <span key={winner.id}>
                  <strong>{winner.name}</strong> wins the hand
                </span>
              ))}
            {handWinners.length > 1 &&
              <div>
                {handWinners.map(winner => (
                  <strong key={winner.id}>{winner.name}, </strong>
                ))}
                <p>
                  tie for the hand with
                  {' '}
                  <strong>{handWinners[0].handDetails.descr}</strong>
                </p>
              </div>}
          </div>}
        {dealerMessage &&
          <p className="Board-dealerMessage">
            <strong>{dealerMessage}</strong>
          </p>}
      </div>
    )
  }
}

export default Board
