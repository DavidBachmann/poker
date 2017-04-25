import { Component, cloneElement } from 'react'
import __DEBUG__ from '../../utils'

class GameManager extends Component {
  componentDidMount() {
    const { startRoundThunk } = this.props
    startRoundThunk()
  }

  render() {
    const { children } = this.props

    return cloneElement(children, {
      ...this.props,
    })
  }
}

export default GameManager
