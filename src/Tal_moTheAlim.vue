<template>
  <pushModal id="pushPopWrap" ref="pushPopWrap" :headerTitle="this.headerTitle" @closeXPushPop="closeXPushPop" v-if="this.pushPopShowYn"/>
  <fullModal id="commonWrap" ref="commonWrap" :headerTitle="this.headerTitle" @closePop="closePop" v-if="this.popShowYn" :parentPopN="this.parentPopN" />
  <div id="FullModalWrap" ref="FullModalWrap1" style="position: absolute; top: 0; left: 0;"></div>
  <router-view @openPop="openPop" />
</template>
<script>
export default {
  data () {
    return {
      headerTitle: '아이디어스',
      popShowYn: false,
      pushPopShowYn: false,
      parentPopN: 0
    }
  },
  methods: {
    openPop () {
      alert('come')
      this.popShowYn = true

      setTimeout(() => {
      // eslint-disable-next-line indent
      // eslint-disable-next-line no-debugger
        debugger
        document.getElementById('FullModalWrap').appendChild(document.getElementById('commonWrap'))
        this.popShowYn = false
      }, 1000)
    },
    closePop () {
      this.popShowYn = false
    },
    closeXPushPop () {
      this.pushPopShowYn = false
    }
  },
  mounted () {
    this.changeDateFormat()
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
