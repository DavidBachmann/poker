import React from 'react'
import classNames from 'classnames'

import './styles.css'

class Card extends React.Component {

  state = {
    revealed: this.props.visibility === 'visible',
  }

  onClick = () => {
    this.setState({
      revealed: true,
    })
  }

  render() {
    const { rank, suit } = this.props
    const { revealed } = this.state

    return (
        <div className={classNames('Card', revealed && 'is-revealed')} onClick={this.onClick}>
          {[0,1].map((a, index) => (
            <div className="Card-mark" key={index}>
              <p className="Card-value">{rank.symbol}</p>
              <p className="Card-suit" style={{color: suit.color}}>
                {suit.symbol}
              </p>
            </div>
          ))}
        </div>
    )
  }

}

export default Card
