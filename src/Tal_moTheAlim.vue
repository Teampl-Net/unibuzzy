<template>
  <div id="moTheAlimWrap" style="height: 100%; width: 100%;">
    <gAxiosLoading />
    <transition name="showModal">
      <fullModal transition="showModal"  @successWrite="successWriteBoard" id="commonWrap" :propParams="modalParam" ref="commonWrap" :headerTitle="this.headerTitle" @closePop="closePop" v-if="this.popShowYn" :parentPopN="this.parentPopN" />
    </transition>
    <!-- <div id="FullModalWrap" ref="FullModalWrap1" style="position: absolute; top: 0; left: 0;"></div> -->
    <router-view ref="routerMainWrap" @openPop="openPop" />
  </div>
</template>
<script>

export default {
  name: 'moTheAlimWrap',
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  unmounted () {
    window.document.removeEventListener('touchstart')
    window.document.removeEventListener('touchend')
  },
  mounted () {
    window.document.addEventListener('touchstart', (e) => {
      console.log('touchstart', e.touches[0].pageX)
      this.startPoint = e.touches[0].pageX // 터치가 시작되는 위치 저장
    })

    window.document.addEventListener('touchend', (e) => {
      console.log('touchend', e.changedTouches[0].pageX)
      this.endPoint = e.changedTouches[0].pageX // 터치가 끝나는 위치 저장
      if (this.startPoint < 20 && this.startPoint - this.endPoint < -100) {
        // 오른쪽으로 스와이프 된 경우
        this.$gobackDev()
        console.log('prev move')
      } else if (this.startPoint > this.endPoint) {
        // 왼쪽으로 스와이프 된 경우
        // console.log('next move')
      }
    })
  },
  data () {
    return {
      startPoint: 0,
      endPoint: 0,
      headerTitle: '아이디어스',
      popShowYn: false,
      pushPopShowYn: false,
      parentPopN: 0,
      userInfo: [],
      alimList: [],
      chanList: [],
      modalParam: {},
      fullScreenYn: false,
      screenWidth: '1000px'

    }
  },
  methods: {
    openPop (params) {
      this.popShowYn = true
      this.modalParam = params
      // this.$refs.ttttt.openPop(params)
      /* setTimeout(() => {
        document.getElementById('FullModalWrap').appendChild(document.getElementById('commonWrap'))
        this.popShowYn = false
      }, 1000) */
    },
    createToggle () {
      var app = document.getElementById('app')
      var toastDiv = document.createElement('div')

      toastDiv.id = 'FullScreenToggle'
      toastDiv.style.cssText = 'position: fixed; right:1%; bottom:10px; cursor: pointer; width: fit-content; line-height: 30px; border-radius: 5px; min-width: 3rem; float: right; height: 30px; padding: 0 20px; text-align: center; background-color: #6768a7; color: #FFFFFF; white-space: nowrap;'
      toastDiv.onclick = function () {
        var toggle = false
        if (toggle === true) {
          app.style.maxWidth = '1000px'
        } else {
          app.style.maxWidth = '100%'
          if (document.getElementById('FullScreenToggle') !== undefined) {
            document.getElementById('FullScreenToggle').remove()
          }
        }
      }
      toastDiv.innerHTML = '전체화면'
      document.body.append(toastDiv)
    },
    /* openPushPop (params) {
      this.pushPopParams = params
      this.pushPopShowYn = true
    }, */
    async successWriteBoard (inParam) {
      await this.closePop()
      this.openPop(inParam)
    },
    closePop () {
      this.popShowYn = false
    },
    handleResize () {
      setTimeout(() => {
        this.screenWidth = window.innerWidth
      }, 500)
    }
  },
  watch: {
    screenWidth () {
      var toggle = document.getElementById('FullScreenToggle')
      if (this.screenWidth < 1250 && (toggle !== undefined && toggle !== null && toggle !== '')) {
        document.getElementById('FullScreenToggle').remove()
      }
      if (this.screenWidth > 1250 && (toggle === undefined || toggle === null || toggle === '')) {
        var appMax = document.getElementById('app').style.maxWidth
        if (appMax !== '100%') {
          this.createToggle()
        }
      }
    }
  }
}
</script>
<style>
@import './assets/css/Tal_common.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  box-sizing: border-box;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1000px ;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
