import axiosCommonFunction from 'axios'
axiosCommonFunction.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,POST,PATCH,PUT,DELETE,OPTIONS'
axiosCommonFunction.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token'
axiosCommonFunction.defaults.headers.post['Content-Type'] = 'application/json;'
axiosCommonFunction.defaults.headers.common['Content-Type'] = 'application/json;'

axiosCommonFunction.defaults.timeout = 100000
axiosCommonFunction.defaults.withCredentials = true

// 캐싱 방지
/* axios.defaults.headers.get['Cache-Control'] = 'no-cache'
axios.defaults.headers.get.Pragma = 'no-cache' */

// 당일: 시,분
// 당월: 일, 시, 분
// 당해: 월, 일, 시, 분
// 그 외: 년, 월, 일, 시, 분
const methods = {
  async commonAx (setItem) {
    var result = false
    await axiosCommonFunction.post(setItem.url, setItem.param, { withCredentials: true }
    ).then(response => {
      result = response
    }).catch((error) => {
      result = error
      console.log(error)
    })
    return result
  },
  parseHTML (html) {
    var t = document.createElement('template')
    t.innerHTML = html
    return t.content.cloneNode(true)
  },
  decodeHTML (str) {
    str = str.replace('&amp;', '&')
    str = str.replace('&lt;', '<')
    str = str.replace('&gt;', '>')
    str = str.replace('&#39;', "'")
    str = str.replace('&quot;', '"')
    return str
  },
  changeDateMemoFormat (date) {
    var compareDate = new Date(date)
    var toDate = new Date()
    var format = ''
    if (this.$dayjs(compareDate).format('YYYY') === this.$dayjs(toDate).format('YYYY')) {
      if (this.$dayjs(compareDate).format('MM') === this.$dayjs(toDate).format('MM')) {
        if (this.$dayjs(compareDate).format('DD') === this.$dayjs(toDate).format('DD')) {
          format = 'HH:mm'
        } else {
          format = 'MM/DD'
        }
      } else {
        format = 'MM/DD'
      }
    } else {
      format = 'YYYY/MM/DD'
    }
    if (format !== 'HH:mm') {
      format += ' HH:mm'
    }
    return this.$dayjs(compareDate).add(9, 'hour').format(format)
  },
  changeDateFormat (date, mustTimeShowYn) {
    // var compareDate = new Date(Number(date))
    var compareDate = new Date(date)
    var toDate = new Date()
    var format = ''
    if (this.$dayjs(compareDate).format('YYYY') === this.$dayjs(toDate).format('YYYY')) {
      if (this.$dayjs(compareDate).format('MM') === this.$dayjs(toDate).format('MM')) {
        if (this.$dayjs(compareDate).format('DD') === this.$dayjs(toDate).format('DD')) {
          // 년도 월 일 이 같으면 만든 시간, 분
          format = 'HH:mm'
          // format = 'HH시 mm분'
        } else {
          // 같은 년도, 월이 같으면
          format = 'MM/DD'
          // format = 'MM월 DD일'
        }
      } else {
        // 년도만 같으면
        format = 'MM/DD'
        // format = 'MM월 DD일'
      }
    } else {
      format = 'YYYY/MM/DD'
      // if (viewType === 'detail') {
      //   return this.$dayjs(compareDate).format('yyyyMMDDHHmmss')
      // } else if (viewType === 'list') {
      //   return this.$dayjs(compareDate).format('yyyyMMDD')
      // }
    }
    if (mustTimeShowYn && format !== 'HH:mm') format += ' HH:mm'
    return this.$dayjs(compareDate).add(9, 'hour').format(format)
    //   if (compareDate === toDate) {
    //     return changeDateHM(compareDate)
    //   } else {
    //   }
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
    if (text) {
      var changeTxt = ''
      var indexOf = text.indexOf('KO$^$')
      if (indexOf === -1) {
        return text
      } else {
        changeTxt = this.$makeMtextMap(text, 'KO')
        if (changeTxt) { return changeTxt }
      }
    }

    // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
    // if (changeTxt !== undefined) { return changeTxt }
  },

  diffInt (a, b) {
    return Math.abs(a - b)
  },

  addHistoryStack (n) {
    // eslint-disable-next-line no-array-constructor
    /* var historyS = ''
    var history = localStorage.getItem('popHistoryStack')
    if (history) {
      historyS = history
    }
    historyS += '$#$' + n
    localStorage.setItem('popHistoryStack', historyS)
    localStorage.setItem('curentPage', n)
    return localStorage.getItem('popHistoryStack').split('$#$').length */
  },

  /* removeHistoryStack () {
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
  }, */
  /* removeHistoryStackForPage (pageHistoryName) {
    if (localStorage.getItem('popHistoryStack')) {
      var history = localStorage.getItem('popHistoryStack').split('$#$')
      if (history[history.length - 1] === pageHistoryName) {
        this.$removeHistoryStack()
        this.$router.go(-1)
      }
    }
  }, */
  isJsonString (str) {
    try {
      var json = JSON.parse(str)
      return (typeof json === 'object')
    } catch (e) {
      return false
    }
  },
  // PullToRefreshInit () {
  //   PullToRefresh.init({
  //     mainElement: 'body',
  //     // 최소 새로고침 길이( 이 길이가 되면 새로고침 시작)
  //     distThreshold: '90',
  //     // 최대 거리 (영역이 길어질 수 있는 최대 거리)
  //     distMax: '100',
  //     // 새로고침 후 갖고있는 영역의 크기
  //     distReload: '80',
  //     // 최소 새로고침에 도달 했을 때 문구
  //     instructionsReleaseToRefresh: ' ',
  //     // 끌고 있을 때 문구
  //     instructionsPullToRefresh: ' ',
  //     // 새로고침 중 문구
  //     instructionsRefreshing: ' ',
  //     onRefresh () {
  //       window.location.reload()
  //     }
  //   })
  // },
  // PullToRefreshDestroy () {
  //   PullToRefresh.destroyAll()
  // },
  checkUserAuth (data) {
    //
    var authList = { R: false, W: false, V: false }
    for (var i = 0; i < data.length; i++) {
      if (data[i].shareType === 'W' && authList.W === false) {
        authList.W = true
      } else if (data[i].shareType === 'R' && authList.R === false) {
        authList.R = true
      } else if (data[i].shareType === 'V' && authList.V === false) {
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
  },
  titleToBody (inHtml) {
    // eslint-disable-next-line no-debugger
    debugger
    var childNodes = inHtml.childNodes
    var titleText = ''
    titleText = childNodes[0].textContent
    if (titleText.indexOf('\n') === -1) {
      if (titleText.length < 5) {
        for (var i = 1; i < childNodes.length; i++) {
          var node = childNodes[i]
          titleText += node.textContent
          if (titleText.length > 4) {
            break
          }
        }
      }
      if (titleText.length > 64) {
        titleText.substring(0, 64)
      }
    } else {
      // eslint-disable-next-line no-debugger
      debugger
      var titleNodeList = titleText.split('\n')
      titleText = titleNodeList[0]
      if (titleText.length < 5) {
        for (i = 1; i < titleNodeList.length; i++) {
          titleText += titleNodeList[i]
          if (titleText.length > 4) {
            break
          }
        }
      }
      if (titleText.length > 64) {
        titleText.substring(0, 64)
      }
    }

    // param.title.split('\n')

    return titleText
  },
  /**
 * byte 용량을 환산하여 반환
 * 용량의 크기에 따라 MB, KB, byte 단위로 환산함
 * @param fileSize  byte 값
 * @param fixed     환산된 용량의 소수점 자릿수
 * @returns {String}
 */
  byteConvert (size) {
    const byteUnits = ['KB', 'MB', 'GB', 'TB']

    for (let i = 0; i < byteUnits.length; i++) {
      size = Math.floor(size / 1024)

      if (size < 1024) return size.toFixed(1) + byteUnits[i]
    }
  },
  showToastPop (html) {
    var app = document.getElementById('app')
    var innerHTML = ''
    var toastDiv = document.createElement('div')
    innerHTML += '<div id="toastPop" class="font16" style="width: 80%;left: 10%;border-radius: 5px;padding: 15px 10px;text-align: left;min-height: 40px;border: 1px solid #CCC;background: #f4f4f9fa;color: #000;position: absolute;bottom: 70px;box-shadow: 0 0 16px 0px #cccccc9c;z-index: 999999999999;">'
    innerHTML += html
    innerHTML += '</div>'
    toastDiv.innerHTML = innerHTML

    app.appendChild(toastDiv)
    // var thisthis = this
    setTimeout(() => {
      document.getElementById('toastPop').remove()
    }, 2000)
  },
  getFileExt (fileName) {
    let fileExt = fileName.substring(
      fileName.lastIndexOf('.') + 1
    )
    // 소문자로 변환
    var type = null
    fileExt = fileExt.toLowerCase()
    if (
      ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'svg'].includes(fileExt)
    ) {
      type = 'img'
    } else if (['xlsx'].includes(fileExt)) {
      type = 'exel'
    } else if (['hwp', 'doc'].includes(fileExt)) {
      type = 'document'
    } else if (['ppt', 'pptx'].includes(fileExt)) {
      type = 'ppt'
    } else if (['pdf'].includes(fileExt)) {
      type = 'pdf'
    } else if (['txt'].includes(fileExt)) {
      type = 'txt'
    } else if (['vue', 'jsp', 'java', 'class', 'html', 'css', 'js', 'xml', 'ts'].includes(fileExt)) {
      type = 'programming'
    } else if (['zip'].includes(fileExt)) {
      type = 'zip'
    } else {
      type = 'else'
    }
    return type
  },
  downloadFile (fileKey, path) {
    var iframe
    iframe = document.getElementById('hiddenDownloader')
    if (iframe == null) {
      iframe = document.createElement('iframe')
      iframe.id = 'hiddenDownloader'
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
    }
    var api = path.split('/image')[0]
    // 파일서버 fileServer fileserver FileServer Fileserver
    iframe.src = api + '/tp.downloadFile?fileKey=' + fileKey
    console.log(iframe.src)
    // eslint-disable-next-line no-debugger
    debugger
    /* try {
      var pom = document.createElement('a')
      pom.setAttribute('href', 'file.downloadFile' + 'upload/2022/08/01/220B35EC-C678-469C-8C90-F7F6AE71E7C5.png')
      pom.setAttribute('download', 'test')
      if (document.createEvent) {
        var event = document.createEvent('MouseEvents')
        event.initEvent('click', true, true)
        pom.dispatchEvent(event)
      } else {
        pom.click()
      }
    } catch (error) {
      console.log(error)
    } */
  },
  /** 문자열로 되어있는 전화번호 11자리를 입력해주면 -(하이픈)을 넣어서 반환해주는 함수 */
  setPhone (string) {
    if (string !== undefined && string !== null && string !== '') { return string.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3') } else { return '등록된 전화번호가 없습니다.' }
  },
  teamTypeString (teamType) {
    var text = ''
    if (teamType === 'C') {
      text = '기업'
    } else if (teamType === 'G') {
      text = '정부'
    } else if (teamType === 'S') {
      text = '학교'
    } else if (teamType === 'H') {
      text = '종교'
    } else if (teamType === 'D') {
      text = '동호회'
    } else if (teamType === 'Q') {
      text = '병원'
    } else if (teamType === 'V') {
      text = '약국'
    } else if (teamType === 'F') {
      text = '가족'
    } else if (teamType === 'A') {
      text = '매장'
    } else if (teamType === 'P') {
      text = '식당'
    } else if (teamType === 'T') {
      text = '팀'
    } else if (teamType === 'E') {
      text = '기타'
    }
    return text
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

    // Vue.config.globalProperties.$fullToInit = methods.PullToRefreshInit
    // Vue.config.globalProperties.$fullToDestory = methods.PullToRefreshDestroy
    Vue.config.globalProperties.$checkUserAuth = methods.checkUserAuth
    Vue.config.globalProperties.$checkSameName = methods.checkSameName
    Vue.config.globalProperties.$titleToBody = methods.titleToBody
    Vue.config.globalProperties.$diffInt = methods.diffInt
    Vue.config.globalProperties.$decodeHTML = methods.decodeHTML
    Vue.config.globalProperties.$byteConvert = methods.byteConvert
    Vue.config.globalProperties.$getFileExt = methods.getFileExt
    Vue.config.globalProperties.$downloadFile = methods.downloadFile
    Vue.config.globalProperties.$commonAx = methods.commonAx
    Vue.config.globalProperties.$setPhone = methods.setPhone
    Vue.config.globalProperties.$teamTypeString = methods.teamTypeString
    Vue.config.globalProperties.$showToastPop = methods.showToastPop
    Vue.config.globalProperties.$changeDateMemoFormat = methods.changeDateMemoFormat
  }
}
