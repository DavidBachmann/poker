import uuidV4 from 'uuid/v4'
import generateRandomName from '../generateRandomName'

const initalizePlayers = (totalPlayers, startingStack) =>
  Array.from({
    length: totalPlayers
  }, (_ ,index) => ({
      index,
      cards: [],
      hand: [],
      name: generateRandomName(),
      chips: startingStack,
      id: uuidV4(),
    })
  )

export default initalizePlayers
