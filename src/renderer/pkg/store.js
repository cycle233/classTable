const Store = require('electron-store')
const cacheStore = new Store({name: 'cache'})
const historyStore = new Store({name: 'history'})

const classTable = 'class.table.'
const classQueryLast = 'class.query.last'
const historyQuery = 'history.query'

export default {
  // 获取缓存中最后一次查询记录 return [{ xgh: xgh, zc: zc }]
  getClassQueryLast () {
    return cacheStore.get(classQueryLast)
  },
  // 获取历史中查询记录 return [{ xgh: xgh, zc: zc, date: date },{ xgh: xgh, zc: zc, date: date }]
  getHistoryQuery () {
    return historyStore.get(historyQuery)
  },
  // 获取缓存中 sgh.zc 的课表值
  getCacheClass (xgh, zc) {
    return cacheStore.get(classTable + xgh + '.' + zc)
  },
  // 设置缓存中xgh.zc的课表值
  setCacheClass (xgh, zc, classData) {
    cacheStore.set(classTable + xgh, {
      zc: classData
    })
  },
  // 设置历史末尾记录中的 state 状态[ success, error ]
  setHistoryQueryState (timeStamp, state) {
    // 未知错误 并没有按预期运行 也没有出现明显错误 暂时封存
    // let historyData = historyStore.get(historyQuery)
    // for (let i = 0; i < (historyData.length / 2); i++) {
    //   let historyQueryData = historyData.pop()
    //   if (historyQueryData.date === timeStamp) {
    //     this.deleteHistoryQuery()
    //     this.pushHistoryQuery(historyQueryData.xgh, historyQueryData.zc, state)
    //     break
    //   }
    // }
  },
  // 增加一条查询记录在历史末尾 && 设置缓存中最后一次查询记录
  pushHistoryQuery (xgh, zc, state = 'unknown') {
    let historyData = historyStore.get(historyQuery)
    const timeStamp = (new Date()).valueOf()
    if (historyData === undefined) {
      historyData = []
    }
    historyData.push({
      xgh: xgh,
      zc: zc,
      state: state,
      date: timeStamp
    })
    historyStore.set(historyQuery, historyData)
    cacheStore.set(classQueryLast, {
      xgh: xgh,
      zc: zc
    })
    return timeStamp
  },
  // 删除最后一条记录
  deleteHistoryQuery () {
    let historyData = historyStore.get(historyQuery)
    historyData.pop()
    historyStore.set(historyQuery, historyData)
  },
  // 清除所有缓存
  clearCacheStore () {
    cacheStore.clear()
  },
  // 清除所有记录
  clearHistoryStore () {
    historyStore.clear()
  },
  // 清除缓存中 xgh.zc 课表值
  deleteCacheClass (xgh, zc = 0) {
    if (zc === 0) {
      cacheStore.delete(classTable + xgh)
    } else {
      cacheStore.delete(classTable + xgh + '.' + zc)
    }
  },
  // 清除缓存中 最后一次查询记录
  deleteClassQueryLast () {
    cacheStore.delete(classQueryLast)
  }
}
