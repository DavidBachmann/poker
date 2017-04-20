import handleCalculatingPositions from './handleCalculatingPositions'

export default function handleStartRound(state) {
  const positions = handleCalculatingPositions(state.players, state.handHistory, state.positions)

  return positions
}
