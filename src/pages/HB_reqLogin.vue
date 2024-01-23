<template>
    <div>test</div>
</template>

<script>
export default {
  created () {
    // eslint-disable-next-line no-undef
    HB_SSO.reqLoginPage({ appInfo: {}, userInfo: null }, { popYn: false, redirectUrl: window.location.protocol + '//' + 'localhost:8081' })
  },
  method: {
    callback () {

    }
  }
}
</script>

<style scoped>

</style>
