<template>
  <div id="uniBuzzyWrap" class="w100P h100P">
    <!-- <div v-if="!loginYn" class="videoArea" style="position: relative; width: 100%; height: 100vh; overflow:hidden;;">
      <video autoplay muted loop :style="showLoginBtnYn ? 'filter: blur(2px)' : 'filter: blur(0)'">
        <source :src="introVideo" type="video/mp4" >
      </video>
      <div v-show="showLoginBtnYn" class="fade-in fontBold textLeft" style="position: absolute; text-shadow: 2px 2px 3px black; color: white; top: 25%; left: 5%;">Hi! Welcome to D-ALIM!<br>Wanna join your college community?</div>
      <transition name="showUp" style="animation-duration: 2s;">
        <div transition="showUp" class="loginBtn" v-show="showLoginBtnYn" @click="login">Login</div>
      </transition>
    </div> -->
    <gAxiosLoading />
    <!-- <gCloudLoading v-if="cloudLoadingShowYn" style="position: absolute; top: 0; left: 0" /> -->
    <!-- <transition name="showModal">
      <gPopupWrap transition="showModal"  @successWrite="successWriteBoard" :propParams="modalParam" ref="commonWrap" :headerTitle="headerTitle" @closePop="closePop" v-if="popShowYn" :parentPopN="parentPopN" />
    </transition> -->
    <router-view v-if="loginYn" ref="routerMainWrap" @openPop="openPop" />
  </div>
</template>
<script>
export default {
  name: 'uniBuzzyWrap',
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  mounted () {
    // setTimeout(() => {
    //   this.showLoginBtnYn = true
    // }, 1000)
    window.document.addEventListener('touchstart', (e) => {
      this.startPoint = e.touches[0].pageX // 터치가 시작되는 위치 저장
    })

    window.document.addEventListener('touchend', (e) => {
      this.endPoint = e.changedTouches[0].pageX // 터치가 끝나는 위치 저장
      if (this.startPoint < 20 && this.startPoint - this.endPoint < -100) {
        // 오른쪽으로 스와이프 된 경우
        // this.$gobackDev()
      } else if (this.startPoint > this.endPoint) {
        // 왼쪽으로 스와이프 된 경우
      }
    })
  },
  data () {
    return {
      mobileYn: this.$getMobileYn(),
      cloudLoadingShowYn: false,
      loginYn: true,
      showLoginBtnYn: false,
      introVideo: '/resource/new/introVideo.mp4',
      startPoint: 0,
      endPoint: 0,
      headerTitle: 'uniBuzzy',
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
    async login () {
      console.log('yay!')
      this.loginYn = true
      this.cloudLoadingShowYn = true
      await new Promise((resolve) => setTimeout(resolve, 4000))
      this.cloudLoadingShowYn = false
    },
    openPop (params) {
      this.popShowYn = true
      this.modalParam = params
    },
    successWriteBoard (inParam) {
      this.closePop()
      this.openPop(inParam)
    },
    createToggle () {
      const app = document.getElementById('app')
      const toastDiv = document.createElement('div')

      toastDiv.id = 'FullScreenToggle'
      toastDiv.style.cssText = 'position: fixed; right:1%; bottom:10px; cursor: pointer; width: fit-content; line-height: 30px; border-radius: 5px; min-width: 3rem; float: right; height: 30px; padding: 0 20px; text-align: center; background-color: #6768a7; color: #FFFFFF; white-space: nowrap;'
      toastDiv.onclick = function () {
        const toggle = false
        if (toggle) {
          app.style.maxWidth = '1000px'
        } else {
          app.style.maxWidth = '100%'
          const toggle = document.getElementById('FullScreenToggle')
          if (document.getElementById('FullScreenToggle') !== undefined) {
            toggle.remove()
          }
        }
      }
      toastDiv.innerHTML = '전체화면'
      document.body.append(toastDiv)
    },
    closePop () {
      this.popShowYn = false
    },
    handleResize () {
      setTimeout(() => {
        this.screenWidth = window.innerWidth + 'px'
      }, 500)
    }
  },
  watch: {
    screenWidth () {
      const toggle = document.getElementById('FullScreenToggle')
      if (Number(this.screenWidth) < 1250 && (toggle !== undefined && toggle !== null && toggle !== '')) {
        toggle.remove()
      }
      if (Number(this.screenWidth) > 1250 && (toggle === undefined || toggle === null || toggle === '')) {
        const app = document.getElementById('app')
        const appMax = app.style.maxWidth
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
@import './assets/css/UB_resetStyles.css';

/* @import '@/assets/css/N_common.css'; */
/* @import '@/assets/css/resetStyles.css'; */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1000px;
}

/* #moTheAlimWrap {
position: absolute;
left: 50%;
transform: translateX(-50%);
max-width: 1000px ;
} */

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
.videoArea video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: black;
}
.loginBtn {
  position: relative;
  width: 80%;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 18px;
  background: white;
  font-weight: bold;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fade-in {
  animation: fade-in 1s ease;
}
</style>
