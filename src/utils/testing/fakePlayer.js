const initalizeFakePlayers = (totalPlayers, startingStack) =>
  Array.from(
    {
      length: totalPlayers,
    },
    (_, index) => ({
      index,
      name: `Fake_Player_${index + 1}`,
      id: `Fake_Player_${index + 1}`,
      holeCards: [],
      hand: [],
      chips: startingStack,
      chipsCurrentlyInvested: 0,
      hasFolded: false,
      hasActed: false,
      isAllIn: false,
    }),
  )

export default initalizeFakePlayers
