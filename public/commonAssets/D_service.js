/* eslint-disable no-unused-vars */
const dService = {
  goDirectBoard (paramObj) {
    let paramStr = ''
    const uri = 'http://localhost:8082/boardDetail?'
    if (!paramObj.cabinetKey || !paramObj.legacyUserKey || !paramObj.partnerId) return '필수정보 누락됨'
    if (paramObj) {
      Object.keys(paramObj).map(function (objectKey, index) {
        paramStr += '&' + objectKey + '=' + encodeURIComponent(paramObj[objectKey])
      })
    }
    console.log(paramStr)
    console.log(btoa(paramStr))
    const windowRef = window.open('', '_blank', 'width=500, height=800, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no')
    windowRef.location.href = uri + btoa(paramStr)

    return windowRef
  },
  testAlert () {
    alert(true)
  }
}
