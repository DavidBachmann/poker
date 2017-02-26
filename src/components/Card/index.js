import React from 'react'
import { availableRanks, availableSuits } from '../../variables'
import { shuffle } from '../../utils'

import './styles.css'

class Card extends React.Component {
  state = {
    holeCards: [],
    boardCards: [],
  }

  constructor() {
    super()
    this.shuffledDeck = shuffle(this.generateDeck())
  }

  componentDidMount() {

  }

  generateDeck() {
    this.deck = []

    for (let i = 0; i < availableSuits.length; i++) {
      for (let j = 0; j < availableRanks.length; j++) {
        const card = {
          rank: availableRanks[j],
          suit: availableSuits[i]
        }

        this.deck.push(card)
      }
    }

    return this.deck
  }

  render() {
    return (
      <div>
        {this.shuffledDeck.map((card, index) => (
          <div className="Card" key={index}>
            <p className="Card-value">{card.rank.value}</p>
            <p className="Card-value" style={{color: card.suit.color}}>
              {card.suit.symbol}
            </p>
          </div>
        ))}
      </div>
    )
  }

}

export default Card
