import uuidV4 from 'uuid/v4'
import randomNameGenerator from './randomNameGenerator'

const initalizePlayers = (
  totalPlayers,
  startingStack,
  generateRandomName = true,
  generateRandomId = true,
) =>
  Array.from(
    {
      length: totalPlayers,
    },
    (_, index) => ({
      index,
      holeCards: [],
      hand: [],
      name: generateRandomName ? randomNameGenerator() : null,
      chips: startingStack,
      chipsCurrentlyInvested: 0,
      id: generateRandomId ? uuidV4() : null,
      hasFolded: false,
      hasActed: false,
      isAllIn: false,
    }),
  )

export default initalizePlayers
