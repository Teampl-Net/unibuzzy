import axiosCommonFunction from 'axios'

import { commonAxiosFunction } from '../../../public/commonAssets/Tal_axiosFunction'
// eslint-disable-next-line no-unused-vars
import router from '../../router'
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
export const commonMethods = {
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
  cancelTimer (creTime) {
    // const setDate = new Date(creTime)
    // setDate.setMinutes (setDate.getMinutes()+3)
    // const now = new Date();
    // console.log(this.$dayjs(creTime).format('YYYYMMDD HH:mm:ss'))
    // console.log(this.$dayjs(now).format('YYYYMMDD HH:mm:ss'))
    var compareDate = new Date(creTime)
    var now = new Date()
    var text = ''
    if (this.$dayjs(compareDate).format('YYYY') === this.$dayjs(now).format('YYYY')) {
      if (this.$dayjs(compareDate).format('MM') === this.$dayjs(now).format('MM')) {
        if (this.$dayjs(compareDate).format('DD') === this.$dayjs(now).format('DD')) {
          compareDate.setHours(compareDate.getHours() + 9)
          compareDate.setMinutes(compareDate.getMinutes() + 3)
          // console.log(this.$dayjs(compareDate).format('MM/DD HH:mm:ss'))
          // console.log(this.$dayjs(now).format('MM/DD HH:mm:ss'))
          // this.$dayjs(compareDate).add(9, 'hour').format(format)
          const distance = compareDate.getTime() - now.getTime()
          if (distance > 0) {
            // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
            // 밀리초 값이기 때문에 1000을 곱한다.
            // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
            // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
            // text = '발송 취소 가능 시간까지 '
            // text += (minutes < 10 ? '0' + minutes : minutes) + '분'
            // text += (seconds < 10 ? '0' + seconds : seconds) + '초 남았습니다.'
            // var innerHTML = '<p class="CErrorColor font12 fr mleft-05" style="text-decoration: underline;" > 발송취소 </p> <p class="font12 fr textRight">' + text + '</p>'
            text = (minutes < 10 ? '0' + minutes : minutes) + ':'
            text += (seconds < 10 ? '0' + seconds : seconds)
            var innerHTML = '<div class="font14 fl commonColor mleft-03">'
            innerHTML += '<p class="commonColor font14 fl" style="text-decoration: underline;"> 발송취소 </p>'
            innerHTML += '<img src="/resource/common/icon_alarm_red.svg" class="fl img-w15 mleft-05 mright-03">'
            innerHTML += text
            innerHTML += '</div>'
            text = innerHTML
          } else {
            text = false
          }
        }
      }
    }
    // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
    // const distance = setDate.getTime() - now.getTime();
    // var text = ''
    // var result = {}
    // result.showYn = distance > 0 ? true : false
    // result.timer = text

    return text
  },
  checkTokenValidTime () {
    var compareDate = new Date()
    var now = new Date()
    var text = ''
    if (this.$dayjs(compareDate).format('YYYY') === this.$dayjs(now).format('YYYY')) {
      if (this.$dayjs(compareDate).format('MM') === this.$dayjs(now).format('MM')) {
        if (this.$dayjs(compareDate).format('DD') === this.$dayjs(now).format('DD')) {
          compareDate.setHours(compareDate.getHours() + 9)
          compareDate.setMinutes(compareDate.getMinutes() + 5)
          const distance = compareDate.getTime() - now.getTime()
          if (distance > 0) {
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
            text = '인증 유효시간 '
            text += (minutes < 10 ? '0' + minutes : minutes) + '분'
            text += (seconds < 10 ? '0' + seconds : seconds) + '초 남았습니다.'
            var innerHTML = ' <p class="font12 fr grayBlack textRight">' + text + '</p>'
            text = innerHTML
          } else {
            text = false
          }
        }
      }
    }
    // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
    // const distance = setDate.getTime() - now.getTime();
    // var text = ''
    // var result = {}
    // result.showYn = distance > 0 ? true : false
    // result.timer = text

    return text
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
    var userInfo = localStorage.getItem('sessionUser')
    if (userInfo !== 'undefined' && userInfo !== undefined && userInfo !== null && userInfo !== '') {
      resultMap = JSON.parse(userInfo)
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
        changeTxt = commonMethods.makeMtextMap(text, 'KO')
        if (changeTxt) { return changeTxt }
      }
    }

    // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
    // if (changeTxt !== undefined) { return changeTxt }
  },

  diffInt (a, b) {
    return Math.abs(a - b)
  },
  async makeShareLink (key, type, message, title) {
    var paramMap = new Map()
    paramMap.set('pageType', type)
    paramMap.set('targetKey', key)
    if (message) {
      paramMap.set('message', message)
    } else {
      paramMap.set('message', '더알림, 구독형 알림')
    }
    if (title) {
      paramMap.set('title', title)
    } else {
      paramMap.set('title', '더알림')
    }

    var result = await commonAxiosFunction({
      url: 'service/tp.getShortDynamicLink',
      param: Object.fromEntries(paramMap)
    })
    console.log(JSON.parse(result.data.shortLink))
    var response = JSON.parse(result.data.shortLink).shortLink

    return response
  },
  addHistoryStack (n) {
  },
  isJsonString (str) {
    try {
      var json = JSON.parse(str)
      return (typeof json === 'object')
    } catch (e) {
      return false
    }
  },
  sortListForupdDate (list) {
    var resultlist = list.sort(function (a, b) { // num으로 오름차순 정렬
      return b.updDate - a.updDate
      // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
    })
    return resultlist
  },
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
  findUrlChangeAtag (inputText) {
    const rplcdPttrn1 = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig
    var rplcdTxt = inputText.replace(rplcdPttrn1, '<a href="$1" target="_blank">$1</a>')
    console.log('rplcdTxt : ', rplcdTxt)
    // const urlRegex = /(http:|https:)?(\/\/)?(www\.)?()\/(watch|embed)?(\?v=|\/)?(\S+)?/g

    // var text = 'ref="https://example.com" targ 여기 짱이야 ! '
    // text.replace(urlRegex, "<a href='$1' target='_blank' >$1</a>")
    // console.log(text)

    // inputText.replace(urlRegex, "<a href='$1' target='_blank' >$1</a>")
    return rplcdTxt
    // inputText.replace(urlRegex, (url) => {
    //   return '<a href="' + url + '">' + url + '</a>'
    // })
  },
  findATagDelete (html) {
    return html.replace(/<(\/a|a)([^>]*)>/gi, '')
  },
  titleToBody (inHtml) {
    // // eslint-disable-next-line no-debugger
    // debugger
    var titleText = ''
    var childNodes = inHtml.childNodes
    var valueTextIdx = 0
    for (var i = 0; i < childNodes.length; i++) {
      titleText += childNodes[i].textContent + ' '
      titleText = titleText.trimLeft()
      if (titleText === '') valueTextIdx += 1
      if (titleText.length >= 6 && i === valueTextIdx) {
        titleText = titleText.length > 64 ? titleText.substring(0, 64) + '..' : titleText.substring(0, 64)
        break
      }
      // eslint-disable-next-line no-debugger
      debugger
      if (titleText.length > 64) {
        titleText = titleText.substring(0, 64) + '..'
        break
      }
    }
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
  getCanvasNewFile (image, file) {
    var previewCanvas = document.createElement('canvas')
    var width = image.width
    var height = image.height
    var fileSize = file.size
    var size = 900
    if (fileSize > 6000000) {
      size = 700
    } else if (fileSize > 3000000) {
      size = 800
    }
    if (width > height) { // 가로모드
      if (width > size) {
        height *= size / width
        width = size
      }
    } else { // 세로모드
      if (height > size) {
        width *= size / height
        height = size
      }
    }
    previewCanvas.width = width
    previewCanvas.height = height

    previewCanvas.getContext('2d').drawImage(image, 0, 0, width, height)
    const imgBase64 = previewCanvas.toDataURL('image/png', 0.8)
    const decodImg = atob(imgBase64.split(',')[1])
    const array = []
    for (let i = 0; i < decodImg.length; i++) {
      array.push(decodImg.charCodeAt(i))
    }
    const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
    var newFile = new File([Bfile], file.name)
    return { path: imgBase64, file: newFile }
  },
  async saveFileSize (image, file) {
    var result = await commonMethods.getCanvasNewFile(image, file)
    if (result.file.size > 1000000) {
      var reader = new FileReader()
      reader.onload = e => {
        var newImg = new Image()
        newImg.onload = async function () {
          result = await commonMethods.getCanvasNewFile(newImg, result.file)
        }
        newImg.onerror = function () {}
        newImg.src = e.target.result
        // this.previewImgUrl = e.target.result
      }
      reader.readAsDataURL(result.file)
    }

    return { path: result.path, file: result.file }
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
    iframe.src = api + '/tp.downloadFile?fileKey=' + fileKey
    console.log(iframe.src)
    // // eslint-disable-next-line no-debugger
    // debugger
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
  },
  async previewFile (file) {
    let fileExt = file.name.substring(
      file.name.lastIndexOf('.') + 1
    )
    // 소문자로 변환
    fileExt = fileExt.toLowerCase()
    if (
      ['jpeg', 'jpg', 'png', 'gif', 'bmp'].includes(fileExt)
    ) {
      // FileReader 를 활용하여 파일을 읽는다
      var reader = new FileReader()
      reader.onload = async e => {
        var image = new Image()
        image.onload = await function () {
          // Resize image
          var canvas = document.createElement('canvas')
          var width = image.width
          var height = image.height
          var fileSize = file.size
          var size = 900
          if (fileSize > 6000000) {
            size = 700
          } else if (fileSize > 3000000) {
            size = 800
          }
          if (width > height) { // 가로모드
            if (width > size) {
              height *= size / width
              width = size
            }
          } else { // 세로모드
            if (height > size) {
              width *= size / height
              height = size
            }
          }
          var fileUrl = null
          canvas.width = width
          canvas.height = height

          canvas.getContext('2d').drawImage(image, 0, 0, width, height)
          const imgBase64 = canvas.toDataURL('image/png', 0.8)
          fileUrl = imgBase64
          const decodImg = atob(imgBase64.split(',')[1])
          const array = []
          for (let i = 0; i < decodImg.length; i++) {
            array.push(decodImg.charCodeAt(i))
          }
          const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
          var newFile = new File([Bfile], file.name)

          var result = {}
          result.file = newFile
          result.path = fileUrl
          // return { file: newFile, path: fileUrl }
          return result
        }
        image.onerror = function () {

        }
        image.src = e.target.result
        // this.previewImgUrl = e.target.result
      }
      reader.readAsDataURL(file)
      // await this.$editorImgResize(this.selectFile)
    }
    /* if (thisthis.$refs.selectFile.files.length > 1) {
      thisthis.$emit('setMultiFile', thisthis.selectFileList)
    } */
  },
  /** 포커스 된 태그 안에 html 삽입해주는 함수 (커서 위치 맨 뒤) */
  pasteHtmlAtCaret (html) {
    var sel, range
    if (window.getSelection) {
      // IE9 and non-IE
      sel = window.getSelection()
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0)
        range.deleteContents()

        // Range.createContextualFragment() would be useful here but is
        // non-standard and not supported in all browsers (IE9, for one)
        var el = document.createElement('div')
        el.innerHTML = html
        var frag = document.createDocumentFragment()
        var node
        var lastNode
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node)
        }
        range.insertNode(frag)

        // Preserve the selection
        if (lastNode) {
          range = range.cloneRange()
          range.setStartAfter(lastNode)
          range.collapse(true)
          sel.removeAllRanges()
          sel.addRange(range)
        }
      }
    } else if (document.selection && document.selection.type !== 'Control') {
      // IE < 9
      document.selection.createRange().pasteHTML(html)
    }
  },
  checkMobile () {
    // var varUA = navigator.userAgent.toLowerCase()
    var varUA = localStorage.getItem('systemName')
    console.log(varUA)
    // alert(JSON.stringify(varUA))
    if (varUA !== undefined || varUA !== null || varUA !== '') {
      if (varUA === 'ios' || varUA === '"ios"') {
        return 'IOS'
      } else if (varUA === 'android' || varUA === '"android"') {
        return 'AOS'
      } else {
        return '그외'
      }
    }
  },
  changeUrlBackslash (url) {
    var changedUrl = url.replace(/\\/ig, '/')
    return changedUrl
  },
  makeHistoryObj (routerYn, page, targetKey, id) {
    var resultObj = null
    resultObj.routerYn = routerYn
    resultObj.pageType = page
    resultObj.targetKey = targetKey
    resultObj.id = id
    return resultObj
  },
  countingTotalMemo (list) {
    var count = 0
    for (let i = 0; i < list.length; i++) {
      if (list[i].cmemoList.length > 0) {
        count += 1
      }
    }
    console.log('counting Memo : ' + (count + list.length))
    return count + list.length
  }
}

export default {
  install (Vue) {
    Vue.config.globalProperties.$changeDateFormat = commonMethods.changeDateFormat
    Vue.config.globalProperties.$convertDate = commonMethods.convertDate
    Vue.config.globalProperties.$extractYear = commonMethods.extractYear
    Vue.config.globalProperties.$numberToKorean = commonMethods.numberToKorean
    Vue.config.globalProperties.$getUserInform = commonMethods.getUserInform
    Vue.config.globalProperties.$makeMtextMap = commonMethods.makeMtextMap
    Vue.config.globalProperties.$changeText = commonMethods.changeText
    Vue.config.globalProperties.$addHistoryStack = commonMethods.addHistoryStack
    Vue.config.globalProperties.$removeHistoryStack = commonMethods.removeHistoryStack
    Vue.config.globalProperties.$removeHistoryStackForPage = commonMethods.removeHistoryStackForPage
    Vue.config.globalProperties.$isJsonString = commonMethods.isJsonString

    // Vue.config.globalProperties.$fullToInit = commonMethods.PullToRefreshInit
    // Vue.config.globalProperties.$fullToDestory = commonMethods.PullToRefreshDestroy
    Vue.config.globalProperties.$checkUserAuth = commonMethods.checkUserAuth
    Vue.config.globalProperties.$checkSameName = commonMethods.checkSameName
    Vue.config.globalProperties.$titleToBody = commonMethods.titleToBody
    Vue.config.globalProperties.$diffInt = commonMethods.diffInt
    Vue.config.globalProperties.$decodeHTML = commonMethods.decodeHTML
    Vue.config.globalProperties.$byteConvert = commonMethods.byteConvert
    Vue.config.globalProperties.$getFileExt = commonMethods.getFileExt
    Vue.config.globalProperties.$downloadFile = commonMethods.downloadFile
    Vue.config.globalProperties.$commonAx = commonMethods.commonAx
    Vue.config.globalProperties.$setPhone = commonMethods.setPhone
    Vue.config.globalProperties.$teamTypeString = commonMethods.teamTypeString
    Vue.config.globalProperties.$showToastPop = commonMethods.showToastPop
    Vue.config.globalProperties.$changeDateMemoFormat = commonMethods.changeDateMemoFormat
    Vue.config.globalProperties.$previewFile = commonMethods.previewFile
    Vue.config.globalProperties.$makeShareLink = commonMethods.makeShareLink
    Vue.config.globalProperties.$cancelTimer = commonMethods.cancelTimer
    Vue.config.globalProperties.$checkTokenValidTime = commonMethods.checkTokenValidTime
    Vue.config.globalProperties.$saveFileSize = commonMethods.saveFileSize
    Vue.config.globalProperties.$findUrlChangeAtag = commonMethods.findUrlChangeAtag
    Vue.config.globalProperties.$pasteHtmlAtCaret = commonMethods.pasteHtmlAtCaret
    Vue.config.globalProperties.$checkMobile = commonMethods.checkMobile
    Vue.config.globalProperties.$changeUrlBackslash = commonMethods.changeUrlBackslash
    Vue.config.globalProperties.$findATagDelete = commonMethods.findATagDelete
    Vue.config.globalProperties.$makeHistoryObj = commonMethods.makeHistoryObj
    Vue.config.globalProperties.$countingTotalMemo = commonMethods.countingTotalMemo
  }
}
