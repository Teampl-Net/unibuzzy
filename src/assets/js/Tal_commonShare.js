import { onMessage } from './webviewInterface'
const methods = {
  sendSms (num, message) {
    if (!num) num = ''
    if (message) {
      message = '?body=' + message
    } else {
      message = ''
    }
    if (num !== undefined && num !== null && num !== '') {
      if (this.systemName !== 'Android' && this.systemName !== 'android') {
        document.location.href = 'sms:' + num
      } else {
        onMessage('REQ', 'callphone', num)
      }
    } else {
      // alert('전화번호 정보가 없습니다')
    }
  }
}

export default {
  install (Vue) {
    Vue.config.globalProperties.$sendSms = methods.sendSms
  }
}
