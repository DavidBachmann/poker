import uuidV4 from 'uuid/v4'
import randomNameGenerator from '../randomNameGenerator'

const initalizePlayers = (totalPlayers, startingStack, generateRandomName = true, generateRandomId = true) =>
  Array.from({
    length: totalPlayers
  }, (_, index) => ({
      index,
      cards: [],
      hand: [],
      name: generateRandomName ? randomNameGenerator() : null,
      chips: startingStack,
      id: generateRandomId ? uuidV4() : null,
    })
  )

export default initalizePlayers
