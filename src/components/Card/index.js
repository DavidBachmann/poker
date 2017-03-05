import React from 'react'
import classNames from 'classnames'

import './styles.css'

class Card extends React.Component {

  state = {
    revealed: this.props.visibility === 'visible',
    peakRevealed: false
  }

  onClick = () => {
    const { revealed } = this.state

    this.setState({
      revealed: !revealed,
    })
  }

  onMouseOver = () => {
    this.setState({
      peakRevealed: true
    })
  }

  onMouseOut = () => {
    this.setState({
      peakRevealed: false
    })
  }

  render() {
    const { rank, suit } = this.props
    const { revealed, peakRevealed } = this.state
    const classes = classNames('Card', revealed && 'is-revealed', peakRevealed && 'is-peaked')

    return (
      <div className={classes} onClick={this.onClick} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
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
