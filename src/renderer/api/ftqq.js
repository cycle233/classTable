const sendKey = 'SCT1725TXEnbg1dydmE9LuAwMhCrC3EJ'
const options = {
  method: 'get',
  headers: new Headers({
    'Content-Type': 'application/x-www-form-urlencoded'
  }),
  body: ''
}

export default {
  sendMsgPost (text, desp) {
    let option = options
    option.method = 'post'
    option.body = 'text=' + text + '&desp=' + desp
    return fetch('https://sctapi.ftqq.com/' + sendKey + '.send', option)
  },
  sendMsgGet (text, desp) {
    return fetch('https://sctapi.ftqq.com/' + sendKey + '.send?title=' + encodeURI(text) + '&desp=' + encodeURI(desp), options)
  },
  pushMsgGet (pushId, readKey) {
    return fetch('https://sctapi.ftqq.com/push?id=' + pushId + '&readkey=' + readKey, options)
  }
}
