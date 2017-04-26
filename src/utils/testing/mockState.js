import initialState from '../../redux/initialState'
import fakePlayer from './fakePlayer'
import fakeDeck from './fakeDeck'

export default function mockState(playerCount = 6, street = 0, betLevel = 1, mockData = true) {
  return Object.assign({}, initialState, {
    players: fakePlayer(playerCount, 1500),
    deck: fakeDeck(),
  })
}
