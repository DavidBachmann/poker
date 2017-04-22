import { Component, cloneElement } from 'react'
import __DEBUG__ from '../../utils'

class GameManager extends Component {
  componentDidMount() {
    const { startGameThunk } = this.props
    startGameThunk()
  }

  render() {
    const { children } = this.props

    return cloneElement(children, {
      ...this.props,
    })
  }
}

export default GameManager
