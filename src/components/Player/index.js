import React, { PureComponent } from 'react'
import classNames from 'classnames'
import Card from '../Card'
import { stripSpaces } from '../../utils'
import './styles.css'

class Player extends PureComponent {

  render() {
    const { cards, chips, name, isHero, nextToAct, isWinner, isLoser, visibleCards } = this.props

    return (
      <div className={classNames(isHero ? 'Hero' : 'Bot', name && stripSpaces(name), 'Player', nextToAct && 'is-next-to-act', isWinner && 'is-winner', isLoser && 'is-loser')}>
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
        <button disabled={!nextToAct}>Bet/Raise</button>
        <button disabled={!nextToAct}>Call</button>
        <button disabled={!nextToAct}>Fold</button>
      </div>
      </div>
    )
  }

}

export default Player
