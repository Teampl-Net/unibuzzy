<template>
    <div style="width: 100%; height: 100vh;">
      <gBtnSmall btnTitle="test" @click="test" />
    </div>
</template>
<script>
/* eslint-disable no-undef */
export default {
  head () {
    return {
      script: [
        { src: '//developers.kakao.com/sdk/js/kakao.min.js' }
      ]
    }
  },
  methods: {
    test () {
      this.$commonAxiosFunction({
        url: 'tp.uploadTpUserRequireListExcelFile',
        // eslint-disable-next-line no-new-object
        param: new Object()
      })
    }
  }
}
</script>
