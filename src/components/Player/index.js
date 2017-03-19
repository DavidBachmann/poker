import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { round } from 'lodash'
import Card from '../Card'
import './styles.css'

class Player extends PureComponent {
  state = {
    value: 0
  }


  componentDidMount() {
    this.setState(() => ({
      value: this.props.pot * 2
    }))
  }

  componentWillReceiveProps() {
    // Reset input field after any action
    this.setState({
      value: 0
    })
  }

  handleInput = (event) => {
    this.setState({
      value: Number(event.target.value)
    })
  }

  render() {
    const {
      cards,
      chips,
      isDealer,
      isLoser,
      isNextToAct,
      isWinner,
      name,
      onPlayerClicksBet,
      onPlayerClicksCall,
      onPlayerClicksCheck,
      onPlayerClicksFold,
      playerPot,
      visibleCards,
      highestCurrentBet,
     } = this.props

    return (
      <div className={classNames(
        'Player',
        isDealer && 'is-dealer',
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
        {cards && !isLoser && (
          <div className="Player-cards">
            {cards.map((card, i) => (
              <Card
                visible={visibleCards}
                suit={card.suit}
                rank={card.rank}
                key={i}
              />
            ))}
          </div>
        )}
      <div className="Player-playerPot">Player pot debugger: <strong>{playerPot}</strong></div>
      <div className="Player-actionButtons">
        <button
          disabled={!isNextToAct}
          onClick={() => onPlayerClicksBet(this.state.value)}>
            {this.state.value > highestCurrentBet ? 'Raise' : 'Bet'}
        </button>
        <button
          disabled={!isNextToAct}
          onClick={onPlayerClicksCall}>
            Call {highestCurrentBet - playerPot > 0 ? highestCurrentBet - playerPot : 0}
        </button>
        <button
          disabled={!isNextToAct}
          onClick={onPlayerClicksCheck}>
            Check
        </button>
        <button
          disabled={!isNextToAct}
          onClick={onPlayerClicksFold}>
          Fold
        </button>
        <input
          disabled={!isNextToAct}
          type="number"
          value={this.state.value}
          onChange={this.handleInput}/>
      </div>
      </div>
    )
  }

}

export default Player
