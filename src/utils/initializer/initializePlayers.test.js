import initializePlayers from './initializePlayers'

test('9 initialized players', () => {
  const nineInitializedPlayers = initializePlayers(9, 1500, false, false)
  expect(nineInitializedPlayers).toEqual([
    {"cards": [], "chips": 1500, "hand": [], "id": null, "index": 0, "name": null},
    {"cards": [], "chips": 1500, "hand": [], "id": null, "index": 1, "name": null},
    {"cards": [], "chips": 1500, "hand": [], "id": null, "index": 2, "name": null},
    {"cards": [], "chips": 1500, "hand": [], "id": null, "index": 3, "name": null},
    {"cards": [], "chips": 1500, "hand": [], "id": null, "index": 4, "name": null},
    {"cards": [], "chips": 1500, "hand": [], "id": null, "index": 5, "name": null},
    {"cards": [], "chips": 1500, "hand": [], "id": null, "index": 6, "name": null},
    {"cards": [], "chips": 1500, "hand": [], "id": null, "index": 7, "name": null},
    {"cards": [], "chips": 1500, "hand": [], "id": null, "index": 8, "name": null},
  ])
  expect(nineInitializedPlayers).toHaveLength(9)
})
