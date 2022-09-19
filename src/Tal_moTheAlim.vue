<template>
  <div id="moTheAlimWrap" style="height: 100%; width: 100%;">
    <transition name="showModal">
      <fullModal transition="showModal"  @successWrite="successWriteBoard" id="commonWrap" :params="modalParam" ref="commonWrap" :headerTitle="this.headerTitle" @closePop="closePop" v-if="this.popShowYn" :parentPopN="this.parentPopN" />
    </transition>
    <!-- <div id="FullModalWrap" ref="FullModalWrap1" style="position: absolute; top: 0; left: 0;"></div> -->
    <router-view @openPop="openPop" />
  </div>
</template>
<script>

export default {
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  data () {
    return {
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
      toastDiv.style.cssText = 'position: fixed; /* left: calc(50% + 520px); */ right:1%; bottom:10px; cursor: pointer; width: fit-content; line-height: 30px; border-radius: 5px; min-width: 3rem; float: right; height: 30px; padding: 0 20px; text-align: center; background-color: #6768a7; color: #FFFFFF; white-space: nowrap;'
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
      // app.append(toastDiv)
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
  },
  beforeUnmount () {
    document.getElementById('FullScreenToggle').remove()
    // PullToRefresh.destroyAll()
  },
  mounted () {
    this.createToggle()
    window.addEventListener('beforeunload', (event) => {
      // 표준에 따라 기본 동작 방지
      event.preventDefault()
      // Chrome에서는 returnValue 설정이 필요함
      event.returnValue = ''
    })
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    // PullToRefresh.init({
    //   mainElement: 'listRefresh',
    //   distThreshold: '80', // 최소 새로고침 길이( 이 길이가 되면 새로고침 시작)
    //   distMax: '100', // 최대 거리 (영역이 길어질 수 있는 최대 거리)
    //   distReload: '80', // 새로고침 후 갖고있는 영역의 크기
    //   instructionsReleaseToRefresh: ' ', // 최소 새로고침에 도달 했을 때 문구
    //   instructionsPullToRefresh: ' ', // 끌고 있을 때 문구
    //   instructionsRefreshing: ' ', // 새로고침 중 문구
    //   onRefresh () {
    //     window.location.reload()
    //   }
    // })
  },
  unmounted () {
    window.removeEventListener('resize', this.handleResize)
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
