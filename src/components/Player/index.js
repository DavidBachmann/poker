import React, { PureComponent } from 'react'
import classNames from 'classnames'
import Card from '../Card'
import { stripSpaces } from '../../utils'
import './styles.css'

class Player extends PureComponent {

  render() {
    const { cards, name, isHero, nextToAct, isWinner, isLoser, visibleCards } = this.props

    return (
      <div className={classNames(isHero ? 'Hero' : 'Bot', name && stripSpaces(name), 'Player', nextToAct && 'is-next-to-act', isWinner && 'is-winner', isLoser && 'is-loser')}>
        <div className="Player-avatar"></div>
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
      </div>
    )
  }

}

export default Player
