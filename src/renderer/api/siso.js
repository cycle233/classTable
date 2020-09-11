const options = {
  method: 'get',
  headers: new Headers({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Host': 'wx.siso.edu.cn',
    'Connection': 'keep-alive',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'Accept-gzip, deflate, br',
    'Origin': 'http://wx.siso.edu.cn',
    'X-Requested-With': 'XMLHttpRequest'
  }),
  body: ''
}
export default {
  getCourseTable (xgh, zc) {
    let option = options
    option.method = 'post'
    option.body = 'xgh=' + xgh + '&zc=' + zc
    return fetch('http://wx.siso.edu.cn/newqyh/kbcx_user_result.php', option)
  }
}
