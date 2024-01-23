<template>
  <div>test</div>
</template>

<script>
export default {
  created () {
    // eslint-disable-next-line no-debugger
    debugger
    // eslint-disable-next-line no-undef
    HB_SSO.reqLoginPage({ appInfo: { packageName: 'com.todo', appToken: this.$APP_CONFIG.appToken }, userInfo: null }, { popYn: false, redirectUrl: 'http://' + window.location.host + '/ssoCallback' })
  },
  method: {
  }
}
</script>

<style scoped>

</style>
