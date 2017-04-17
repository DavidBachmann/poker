import React, { Component } from 'react'
import classNames from 'classnames'
import Card from '../Card'
import './styles.css'

class Player extends Component {
  state = {
    betValue: 255,
  }

  handleInput = event => {
    this.setState({
      betValue: Number(event.target.value),
    })
  }

  render() {
    const {
      betHandler,
      canAct,
      chips,
      chipsCurrentlyInvested,
      foldHandler,
      hasFolded,
      highestCurrentBettor,
      holeCards,
      index,
      isAllIn,
      isLoser,
      isNextToAct,
      isWinner,
      name,
      positions,
      showCards,
    } = this.props

    const { betValue } = this.state

    const isButton = positions.button === index
    const isSB = positions.sb === index
    const isBB = positions.bb === index
    const isUTG = positions.utg === index
    const isMP = positions.mp === index
    const isCutOff = positions.cutoff === index
    const highestCurrentBet = highestCurrentBettor
      ? highestCurrentBettor.chipsCurrentlyInvested
      : 0

    return (
      <div
        className={classNames(
          'Player',
          isButton && 'is-button',
          isSB && 'is-sb',
          isBB && 'is-bb',
          isLoser && 'is-loser',
          isNextToAct && 'is-next-to-act',
          isWinner && 'is-winner',
        )}
      >
        <div className="Player-panel">
          <p className="Player-name">{name}</p>
          <p className="Player-chipCount">{isAllIn ? 'ALL-IN' : `$${chips}`}</p>
        </div>
        {holeCards &&
          <div className="Player-cards">
            {holeCards.map((card, i) => (
              <Card
                visible={showCards}
                suit={card.suit}
                rank={card.rank}
                key={i}
              />
            ))}
          </div>}
        <div className="Player-chipsInvested">
          Invested: {chipsCurrentlyInvested}
        </div>
        <div className="Player-debugger">
          Position:{' '}
          {isButton && 'button'}
          {isSB && 'sb'}
          {isBB && 'bb'}
          {isUTG && 'utg'}
          {isMP && 'mp'}
          {isCutOff && 'cutoff'}
          {hasFolded && 'Player has folded'}
        </div>
        <div className="Player-actionButtons">
          <button
            disabled={!canAct || this.state.betValue < highestCurrentBet}
            onClick={() => betHandler(this.state.betValue)}
          >
            Bet
          </button>
          <button
            disabled={!canAct}
            onClick={() =>
              betHandler(highestCurrentBet - chipsCurrentlyInvested)}
          >
            Call
          </button>
          <button disabled={!canAct} onClick={() => {}}>
            Check
          </button>
          <button disabled={!canAct} onClick={() => foldHandler()}>
            Fold
          </button>
          <input
            disabled={!canAct}
            type="number"
            value={canAct ? betValue : 0}
            onChange={this.handleInput}
          />
        </div>
      </div>
    )
  }
}

export default Player
