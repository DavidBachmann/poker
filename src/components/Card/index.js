import React from 'react'
import classNames from 'classnames'

import './styles.css'

class Card extends React.Component {

  render() {
    const { rank, suit, visible } = this.props
    const classes = classNames('Card', visible && 'is-revealed')

    return (
      <div className={classes} onClick={this.onClick}>
        <div className="Card-mark" >
          <p className="Card-value">{rank.symbol}</p>
          <p className="Card-suit" style={{color: suit.color}}>
            {suit.symbol}
          </p>
        </div>
        <div className="Card-mark" >
          <p className="Card-value">{rank.symbol}</p>
          <p className="Card-suit" style={{color: suit.color}}>
            {suit.symbol}
          </p>
        </div>
      </div>
    )
  }

}

export default Card
