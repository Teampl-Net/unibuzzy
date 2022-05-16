<template>
  <div id="moTheAlimWrap">
   <!--  <div id="pushBox" style="max-width: 500px; width: 80%; height: 300px; position: fixed; z-index: 99999; top: 40%; left:25%;">
      test
    </div> -->
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
  mounted () {
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
