import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { round } from 'lodash'
import Card from '../Card'
import './styles.css'

class Player extends PureComponent {

  render() {
    const {
      cards,
      chips,
      isDealer,
      isLoser,
      isNextToAct,
      isWinner,
      name,
      visibleCards,
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
      <div className="test-buttons">
        <button disabled={!isNextToAct} onClick={this.props.onPlayerClicksAllIn}>Bet/Raise</button>
        <button disabled={!isNextToAct}>Call</button>
        <button disabled={!isNextToAct}>Fold</button>
      </div>
      </div>
    )
  }

}

export default Player
