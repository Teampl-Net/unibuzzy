<template>
  <div id="moTheAlimWrap">
    <pushModal id="pushPopWrap" ref="pushPopWrap" :headerTitle="this.headerTitle" @closeXPushPop="closeXPushPop" v-if="this.pushPopShowYn"/>
    <fullModal id="commonWrap" :params="modalParam" ref="commonWrap" :headerTitle="this.headerTitle" @closePop="closePop" v-if="this.popShowYn" :parentPopN="this.parentPopN" />
    <!-- <div id="FullModalWrap" ref="FullModalWrap1" style="position: absolute; top: 0; left: 0;"></div> -->
    <router-view @openPop="openPop" />
  </div>
</template>
<script>

export default {
  data () {
    return {
      headerTitle: '아이디어스',
      popShowYn: false,
      pushPopShowYn: false,
      parentPopN: 0,
      userInfo: [],
      alimList: [],
      chanList: [],
      modalParam: {}
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
    closePop () {
      this.popShowYn = false
    },
    closeXPushPop () {
      this.pushPopShowYn = false
    }
  },
  beforeUnmount () {
    // PullToRefresh.destroyAll()
  },

  mounted () {
    window.addEventListener('beforeunload', (event) => {
      // 표준에 따라 기본 동작 방지
      event.preventDefault()
      // Chrome에서는 returnValue 설정이 필요함
      event.returnValue = ''
    }
    )

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
