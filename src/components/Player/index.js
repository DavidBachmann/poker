import React, { Component } from 'react'
import classNames from 'classnames'
import Card from '../Card'
import './styles.css'

class Player extends Component {
  state = {
    betValue: 0,
  }

  handleInput = (event) => {
    this.setState({
      betValue: Number(event.target.value)
    })
  }

  render() {
    const {
      canAct,
      chips,
      chipsCurrentlyInvested,
      hasFolded,
      holeCards,
      index,
      isLoser,
      isNextToAct,
      isWinner,
      name,
      showCards,
      positions,
      foldHandler,
      betHandler,
      highestCurrentBet,
      highestCurrentBettor,
     } = this.props

     const { betValue } = this.state

    const isButton = positions.button === index
    const isSB = positions.sb === index
    const isBB = positions.bb === index
    const isUTG = positions.utg === index
    const isUTG1 = positions.utg1 === index
    const isMP = positions.mp === index
    const isMP1 = positions.mp1 === index
    const isHijack = positions.hijack === index
    const isCutOff = positions.cutoff === index
    const isHighestBettor = highestCurrentBettor && highestCurrentBettor.index === index

    return (
      <div className={classNames(
        'Player',
        isButton && 'is-button',
        isSB && 'is-sb',
        isBB && 'is-bb',
        isLoser && 'is-loser',
        isNextToAct && 'is-next-to-act',
        isWinner && 'is-winner',
      )}>
        <div className="Player-panel">
          <div className="Player-avatar"></div>
          <div className="Player-details">
            <p className="Player-name">{name}</p>
            <p className="Player-chipCount">${chips}</p>
          </div>
        </div>
        {holeCards && (
          <div className="Player-cards">
            {holeCards.map((card, i) => (
              <Card
                visible={showCards}
                suit={card.suit}
                rank={card.rank}
                key={i}
              />
            ))}
          </div>
        )}
        <div className="Player-chipsInvested">
          Invested: {chipsCurrentlyInvested}
        </div>
        <div className="Player-debugger">
          Position:{' '}
          {isButton && 'button'}
          {isSB && 'sb'}
          {isBB && 'bb'}
          {isUTG && 'utg'}
          {isUTG1 && 'utg1'}
          {isMP && 'mp'}
          {isMP1 && 'mp1'}
          {isHijack && 'hijack'}
          {isCutOff && 'cutoff'} 
          {hasFolded && 'Player has folded'}
        </div>
      <div className="Player-actionButtons">
        <button
          disabled={!canAct}
          onClick={() => betHandler(this.state.betValue)}>
            Bet
        </button>
        <button
          disabled={!canAct}
          onClick={() => betHandler(highestCurrentBet - chipsCurrentlyInvested)}>
            Call
        </button>
        <button
          disabled={!canAct}
          onClick={() => {}}>
            Check
        </button>
        <button
          disabled={!canAct}
          onClick={() => foldHandler()}>
          Fold
        </button>
        <input
          disabled={!canAct}
          type="number"
          value={canAct ? betValue : 0}
          onSubmit={this.handleSubmit}
          onChange={this.handleInput} />
      </div>
      </div>
    )
  }

}

export default Player
