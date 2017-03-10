import React from 'react'
import Card from '../Card'
import './styles.css'

// Todo: Refactor
class Community extends React.Component {

  render() {
    const { nextStreet, communityCards } = this.props

    if (nextStreet === 2 && communityCards.flop.length === 3) {
        return (
          <div className="CommunityCards">
              <Card
                visible={true}
                suit={communityCards.flop[0].suit}
                rank={communityCards.flop[0].rank}
              />
              <Card
                visible={true}
                suit={communityCards.flop[1].suit}
                rank={communityCards.flop[1].rank}
              />
              <Card
                visible={true}
                suit={communityCards.flop[2].suit}
                rank={communityCards.flop[2].rank}
              />
          </div>
        )
    } else if (nextStreet === 3 && communityCards.turn.length === 1) {
      return (
        <div className="CommunityCards">
            <Card
              visible={true}
              suit={communityCards.flop[0].suit}
              rank={communityCards.flop[0].rank}
            />
            <Card
              visible={true}
              suit={communityCards.flop[1].suit}
              rank={communityCards.flop[1].rank}
            />
            <Card
              visible={true}
              suit={communityCards.flop[2].suit}
              rank={communityCards.flop[2].rank}
            />
            <Card
              visible={true}
              suit={communityCards.turn[0].suit}
              rank={communityCards.turn[0].rank}
            />
        </div>
      )
    } else if (nextStreet === 4 && communityCards.river.length === 1) {
      return (
        <div className="CommunityCards">
            <Card
              visible={true}
              suit={communityCards.flop[0].suit}
              rank={communityCards.flop[0].rank}
            />
            <Card
              visible={true}
              suit={communityCards.flop[1].suit}
              rank={communityCards.flop[1].rank}
            />
            <Card
              visible={true}
              suit={communityCards.flop[2].suit}
              rank={communityCards.flop[2].rank}
            />
            <Card
              visible={true}
              suit={communityCards.turn[0].suit}
              rank={communityCards.turn[0].rank}
            />
            <Card
              visible={true}
              suit={communityCards.river[0].suit}
              rank={communityCards.river[0].rank}
            />
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

}

export default Community
