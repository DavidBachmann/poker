import React, { PureComponent } from 'react'
import classNames from 'classnames'
import Card from '../Card'
import { stripSpaces } from '../../utils'
import './styles.css'

class Player extends PureComponent {

  render() {
    const { cards, chips, name, isHero, isNextToAct, isWinner, isLoser, visibleCards } = this.props

    return (
      <div className={classNames(isHero ? 'Hero' : 'Bot', name && stripSpaces(name), 'Player', isNextToAct && 'is-next-to-act', isWinner && 'is-winner', isLoser && 'is-loser')}>
        <div className="Player-panel">
          <div className="Player-avatar"></div>
          <div className="Player-details">
            <p className="Player-name">{name}</p>
            <p className="Player-chipCount">{chips}</p>
          </div>
        </div>
        {cards && (
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
        <button disabled={!isNextToAct}>Bet/Raise</button>
        <button disabled={!isNextToAct}>Call</button>
        <button disabled={!isNextToAct}>Fold</button>
      </div>
      </div>
    )
  }

}

export default Player
