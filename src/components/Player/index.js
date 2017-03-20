import React, { Component } from 'react'
import classNames from 'classnames'
import { round } from 'lodash'
import Card from '../Card'
import './styles.css'

class Player extends Component {
  state = {
    value: 0,
  }

  componentDidMount() {
    this.setState(() => ({
      betValue: this.props.pot * 2
    }))
  }

  componentWillReceiveProps() {
    // Reset input field after any action
    this.setState({
      betValue: 0
    })
  }

  handleInput = (event) => {
    this.setState({
      betValue: Number(event.target.value)
    })
  }

  render() {
    const {
      holeCards,
      name,
      index,
      chips,
      isLoser,
      isNextToAct,
      isWinner,
      canAct,
      hasFolded,
      chipsCurrentlyInvested,
      positions
     } = this.props

    const isButton = positions.button === index
    const isSB = positions.sb === index
    const isBB = positions.bb === index
    const isUTG = positions.utg === index
    const isUTG1 = positions.utg1 === index
    const isMP = positions.mp === index
    const isMP1 = positions.mp1 === index
    const isHijack = positions.hijack === index
    const isCutOff = positions.cutoff === index

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
            <p className="Player-chipCount">${round(chips, 2)}</p>
          </div>
        </div>
        {holeCards && !isLoser && (
          <div className="Player-cards">
            {holeCards.map((card, i) => (
              <Card
                visible={false}
                suit={card.suit}
                rank={card.rank}
                key={i}
              />
            ))}
          </div>
        )}
        <div className="Player-chipsInvested">
          {chipsCurrentlyInvested}
        </div>
      {/* Debug */}
        <div className="Player-debugger">
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
      {/* /Debug */}
      <div className="Player-actionButtons">
        <button
          disabled={!canAct}
          onClick={() => {}}>
            Bet
        </button>
        <button
          disabled={!canAct}
          onClick={() => {}}>
            Call
        </button>
        <button
          disabled={!canAct}
          onClick={() => {}}>
            Check
        </button>
        <button
          disabled={!canAct}
          onClick={() => {}}>
          Fold
        </button>
        <input
          disabled={!canAct}
          type="number"
          value={this.state.value}
          onChange={this.handleInput}/>
      </div>
      </div>
    )
  }

}

export default Player
