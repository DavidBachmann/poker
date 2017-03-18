import { find } from 'lodash'
import { payPlayer } from '../playerTransactions'

const payOutChips = (players, handWinners, pot) => {
  const totalWinners = handWinners.length
  handWinners.forEach((winner) => {
    const playerThatWon = find(players, (player) => player.name === winner.name)
    const amountWon = pot/totalWinners

    payPlayer(playerThatWon, amountWon)
  })
}

export default payOutChips
