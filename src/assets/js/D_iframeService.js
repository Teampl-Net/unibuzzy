
export const iframeService = {
  async createTargetIframe (id, url, targetId, data, callback) {
    function receiveMessage1 (event, callback) {
      console.log(event)
      if (event.origin.includes('localhost') || !event.origin.includes('d-alim') || !event.origin.includes('mankik')) {
        try {
          if (event.data) {
            const result = JSON.parse(event.data)
            if (callback) {
              callback(result)
            }
          }
          console.log(event)
        } catch (error) {
          console.log(error)
        }
      }
    }
    window.addEventListener('message', (e) => receiveMessage1(e, callback), false)
    // appUserLoginCheck
    if (!id) {
      return '필수정보 누락(id)'
    } else if (!url) {
      return '필수정보 누락(url)'
    }
    // let innerHtml = ''
    let tcIframe = document.getElementById(id)
    let size = null
    let position = null
    if (tcIframe) {
      tcIframe.remove()
    }
    if (!window.opener) {
      tcIframe = document.createElement('iframe')
      tcIframe.id = id
      tcIframe.src = url
      let target = document.body
      if (targetId) {
        target = document.getElementById(targetId)
      }

      target.appendChild(tcIframe)
      if (data.initData) {
        tcIframe.onload = function () {
          setTimeout(() => {
            tcIframe.contentWindow.postMessage(JSON.stringify({ sender: 'D', type: 'initData', data: data.initData }), '*')
          }, 0)

          // 이제 iframe 내부의 요소에 접근 가능합니다.
        }
      }
      if (tcIframe) {
        tcIframe.style = ''
        if (data.size) {
          size = data.size
          if (size.w) {
            tcIframe.style.width = size.w
          }
          if (size.h) {
            tcIframe.style.height = size.h
          }
        } else {
          tcIframe.style.width = '100%'
          tcIframe.style.height = '100%'
        }
        if (data.position) {
          position = data.position
          tcIframe.style.position = 'fixed'
          if (position.left) {
            tcIframe.style.left = position.left
          }
          if (position.right) {
            tcIframe.style.right = position.right
          }
          if (position.top) {
            tcIframe.style.top = position.top
          }
          if (position.bottom) {
            tcIframe.style.bottom = position.bottom
          }
          if (position.zIndex) {
            tcIframe.style.zIndex = position.zIndex
          }
        } else {
          tcIframe.style.float = 'left'
        }
      }
      tcIframe.style.display = 'block'
    }
    if (callback) {
      const initFuncObj = { req: 'SET_IFRAME_DOM', content: tcIframe }
      callback(initFuncObj)
    }
  }
}

export default {
  install (Vue) {
    Vue.config.globalProperties.$gCreateTargetIframe = iframeService.createTargetIframe
  }
}
