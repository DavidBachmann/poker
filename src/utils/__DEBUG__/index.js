import moment from 'moment'

const __DEBUG__ = (message) => {
  const time = moment().format('hh:mm:ss')
  console.log('%c' + time + '%c — ' + message, 'background: rebeccapurple; color: #F2F2F2; padding: 2px 5px;', 'background: #444; color: #F2F2F2; padding: 2px 5px; padding-left: 0;')
}

export default __DEBUG__
