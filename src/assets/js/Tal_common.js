import PullToRefresh from 'pulltorefreshjs'

// 당일: 시,분
// 당월: 일, 시, 분
// 당해: 월, 일, 시, 분
// 그 외: 년, 월, 일, 시, 분
const methods = {
  changeDateFormat (date, viewType) {
    // var compareDate = new Date(Number(date))
    var compareDate = new Date(date)
    var toDate = new Date()

    if (this.$convertDate(compareDate, 'yyyy') === this.$convertDate(toDate, 'yyyy')) {
      if (this.$convertDate(compareDate, 'MM') === this.$convertDate(toDate, 'MM')) {
        if (this.$convertDate(compareDate, 'DD') === this.$convertDate(toDate, 'DD')) {
          return this.$convertDate(compareDate, 'HHmmss')
        }
      } else {
        return this.$convertDate(compareDate, 'MMDDHHmmss')
      }
    } else {
      if (viewType === 'detail') { return this.$convertDate(compareDate, 'yyyyMMDDHHmmss') } else if (viewType === 'list') { return this.$convertDate(compareDate, 'yyyyMMDD') }
    }
  //   // alert(new Date(+toDate + 3240 * 10000).toISOString().split('-')[0])
    //   if (compareDate === toDate) {
    //     return changeDateHM(compareDate)
    //   } else {
    //   }
  //   // alert(this.$convertDate(toDate, 'yyyy') + ' :yyyy\n' + this.$convertDate(toDate, 'MM') + ' :MM\n' + this.$convertDate(toDate, 'DD') + ' :DD\n' +
  //   this.$convertDate(toDate, 'yyyyMMDD') + ' :yyyyMMDD\n' + this.$convertDate(toDate, 'MMDD') + ' :MMDD\n' + this.$convertDate(toDate, 'HHmmss') + ' :HHmmss\n' +
  //   this.$convertDate(toDate, 'yyyyMMDDHHmmss') + ' :yyyyMMDDHHmmss\n' + this.$convertDate(toDate, 'MMDDHHmmss') + ' :MMDDHHmmss\n' + this.$convertDate(toDate, 'DDHHmmss') + ' :DDHHmmss')
  },

  extractYear (date) {
    return new Date(+new Date() + 3240 * 10000).toISOString().split('T')[1]
  },

  convertDate (date, format) {
    if (format === 'yyyy') {
      return new Date(+date + 3240 * 10000).toISOString().split('-')[0]
    } else if (format === 'MM') {
      return new Date(+date + 3240 * 10000).toISOString().split('-')[1]
    } else if (format === 'DD') {
      return new Date(+date + 3240 * 10000).toISOString().split('-')[2].split('T')[0]
    } else if (format === 'yyyyMMDD') {
      return new Date(+date + 3240 * 10000).toISOString().split('T')[0]
    } else if (format === 'MMDD') {
      return new Date(+date + 3240 * 10000).toISOString().split('-')[1] + '-' +
          new Date(+date + 3240 * 10000).toISOString().split('-')[2].split('T')[0]
    } else if (format === 'HHmmss') {
      return date.toTimeString().split(' ')[0]
    } else if (format === 'yyyyMMDDHHmmss') {
      return new Date(+date + 3240 * 10000).toISOString().replace('T', ' ').replace(/\..*/, '')
    } else if (format === 'MMDDHHmmss') {
      return new Date(+date + 3240 * 10000).toISOString().split('-')[1] + '-' +
      new Date(+date + 3240 * 10000).toISOString().split('-')[2].replace('T', ' ').replace(/\..*/, '')
    } else if (format === 'DDHHmmss') {
      return new Date(+date + 3240 * 10000).toISOString().split('-')[2].replace('T', ' ').replace(/\..*/, '')
    }
  },

  numberToKorean (number) {
    const koreanNumber = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const tenThousandUnit = ['', '만', '억', '조']
    const tenUnit = ['', '0', '00', '000']
    let answer = ''
    const unit = 10000
    let index = 0
    let division = Math.pow(unit, index)

    while (Math.floor(number / division) > 0) {
      const mod = Math.floor(number % (division * unit) / division)
      if (mod) {
        const modToArray = mod.toString().split('')
        const modLength = modToArray.length - 1
        const toKorean = modToArray.reduce((a, v, i) => {
          a += `${koreanNumber[v * 1]}${tenUnit[modLength - i]}`
          return a
        }, '')
        // answer = `${toKorean}${tenThousandUnit[index]} ` + answer
        answer = `${toKorean}${tenThousandUnit[index]} `
      }
      division = Math.pow(unit, ++index)
    }
    return answer
  },

  getUserInform () {
    var resultMap = '등록된 이름이 없습니다.'
    if (localStorage.getItem('sessionUser') !== 'undefined' && localStorage.getItem('sessionUser') !== undefined && localStorage.getItem('sessionUser') !== null && localStorage.getItem('sessionUser') !== '') {
      var userInfo = (JSON.parse(localStorage.getItem('sessionUser')))

      resultMap = userInfo
      return resultMap
    } else {
      this.$router.replace('policies')
    }
  },

  // 방어루틴
  makeMtextMap (str, leng) {
    // string if
    var returnMap = new Map()
    if (str) {
      var splitMtext = str.split('$#$')
      // split if ~> $$가 없다면?
      for (var i = 0; i < splitMtext.length; i++) {
        var splitMtextDetail = splitMtext[i].split('$^$')
        // split if ~> $$가 없다면?
        returnMap.set(splitMtextDetail[0], splitMtextDetail[1])
      }
    } else {
    }
    return returnMap.get(leng)
  },

  changeText (text) {
    var changeTxt = ''
    // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
    changeTxt = this.$makeMtextMap(text, 'KO')
    if (changeTxt) { return changeTxt }
    // if (changeTxt !== undefined) { return changeTxt }
  },

  addHistoryStack (n) {
    // eslint-disable-next-line no-array-constructor
    var historyS = ''
    var history = localStorage.getItem('popHistoryStack')
    if (history) {
      historyS = history
    }
    historyS += '$#$' + n
    localStorage.setItem('popHistoryStack', historyS)
    localStorage.setItem('curentPage', n)
    return localStorage.getItem('popHistoryStack').split('$#$').length
  },

  removeHistoryStack () {
    var history = localStorage.getItem('popHistoryStack').split('$#$')
    history.splice(-1, 1)
    // eslint-disable-next-line no-array-constructor
    var historyS = ''

    for (var i = 0; i < history.length; i++) {
      if (history[i].length > 0) { historyS += '$#$' + history[i] }
    }
    localStorage.setItem('popHistoryStack', historyS)
    localStorage.setItem('curentPage', history[history.length - 1])
    localStorage.setItem('pageDeleteYn', false)
  },
  removeHistoryStackForPage (pageHistoryName) {
    if (localStorage.getItem('popHistoryStack')) {
      var history = localStorage.getItem('popHistoryStack').split('$#$')
      if (history[history.length - 1] === pageHistoryName) {
        this.$removeHistoryStack()
        this.$router.go(-1)
      }
    }
  },
  isJsonString (str) {
    try {
      var json = JSON.parse(str)
      return (typeof json === 'object')
    } catch (e) {
      return false
    }
  },

  PullToRefreshInit () {
    PullToRefresh.init({
      mainElement: 'body',

      // 최소 새로고침 길이( 이 길이가 되면 새로고침 시작)
      distThreshold: '90',

      // 최대 거리 (영역이 길어질 수 있는 최대 거리)
      distMax: '100',

      // 새로고침 후 갖고있는 영역의 크기
      distReload: '80',

      // 최소 새로고침에 도달 했을 때 문구
      instructionsReleaseToRefresh: ' ',

      // 끌고 있을 때 문구
      instructionsPullToRefresh: ' ',

      // 새로고침 중 문구
      instructionsRefreshing: ' ',

      onRefresh () {
        window.location.reload()
      }
    })
  },

  PullToRefreshDestroy () {
    PullToRefresh.destroyAll()
  },

  checkUserAuth (data) {
    //
    var authList = { R: true, W: false, V: false }
    for (var i = 0; i < data.length; i++) {
      if (data[i].accessKind === 'W' && authList.W !== false) {
        authList.W = true
      } else if (data[i].accessKind === 'R' && authList.R !== false) {
        authList.R = true
      } else if (data[i].accessKind === 'V' && authList.V !== false) {
        authList.V = true
      }
    }
    return authList
  },
  checkSameName (checkList, checkText) {
    var changedBoardName = checkText
    var addBoardNum = 0
    for (var i = 0; i < checkList.length; i++) {
      if (checkList[i].cabinetNameMtext.indexOf(checkText) !== -1) {
        if (checkList[i].cabinetNameMtext.indexOf(checkText) === 0) {
          if (addBoardNum === 0 && changedBoardName === checkList[i].cabinetNameMtext) {
            addBoardNum = 1
          } else {
            var boardExtraText = checkList[i].cabinetNameMtext.substring(checkText.length)
            if (boardExtraText.substring(0, 1) === '(') {
              if (addBoardNum > Number((boardExtraText.substring(1)).split(')')[0]) + 1) {

              } else {
                addBoardNum = Number((boardExtraText.substring(1)).split(')')[0]) + 1 // Num이 아닐 경우 고려해야!!!
                // 아마도 수정 필요
                // eslint-disable-next-line use-isnan
                if (addBoardNum === NaN) {
                  addBoardNum -= 1
                }
              }
            }
          }
        }
      }
    }
    if (addBoardNum > 0) {
      changedBoardName = changedBoardName + '(' + addBoardNum + ')'
    }
    return changedBoardName
  }

}
export default {
  install (Vue) {
    Vue.config.globalProperties.$changeDateFormat = methods.changeDateFormat
    Vue.config.globalProperties.$convertDate = methods.convertDate
    Vue.config.globalProperties.$extractYear = methods.extractYear
    Vue.config.globalProperties.$numberToKorean = methods.numberToKorean
    Vue.config.globalProperties.$getUserInform = methods.getUserInform
    Vue.config.globalProperties.$makeMtextMap = methods.makeMtextMap
    Vue.config.globalProperties.$changeText = methods.changeText
    Vue.config.globalProperties.$addHistoryStack = methods.addHistoryStack
    Vue.config.globalProperties.$removeHistoryStack = methods.removeHistoryStack
    Vue.config.globalProperties.$removeHistoryStackForPage = methods.removeHistoryStackForPage
    Vue.config.globalProperties.$isJsonString = methods.isJsonString

    Vue.config.globalProperties.$fullToInit = methods.PullToRefreshInit
    Vue.config.globalProperties.$fullToDestory = methods.PullToRefreshDestroy
    Vue.config.globalProperties.$checkUserAuth = methods.checkUserAuth
    Vue.config.globalProperties.$checkSameName = methods.checkSameName
  }
}
