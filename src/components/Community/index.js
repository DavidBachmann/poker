import React from 'react'
import Card from '../Card'

class Community extends React.Component {

  render() {
    const { suit, rank } = this.props

    return (
      <Card
        visibility="visible"
        suit={suit}
        rank={rank}
      />
    )
  }

}

export default Community
