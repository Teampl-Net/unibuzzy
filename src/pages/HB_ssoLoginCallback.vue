<template>
  <div v-if="mReturnData">{{mReturnData}}</div>
</template>

<script>
export default {
  created () {
    const splited = (location.search).replace('?', '').split(/[=?&]/)
    const param = {}
    for (let i = 0; i < splited.length; i++) {
      param[splited[i]] = splited[++i]
    }
    this.mReturnData = decodeURI(param.accessToken)
    const refreshToken = decodeURI(param.refreshToken)
    if (this.mReturnData) {
      this.getUserProfile(this.mReturnData, refreshToken)
      this.$USER_TOKEN = this.mReturnData
      // eslint-disable-next-line no-debugger
    }
  },
  data () {
    return {
      mReturnData: null
    }
  },
  methods: {
    async getUserProfile (token, refreshToken) {
      await this.$gGetUserProfile(token, refreshToken)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
