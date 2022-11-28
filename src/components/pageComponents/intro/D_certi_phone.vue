<template>
  <div class="home">
    <h2 class="text-center p-3">본인인증</h2>
    <button @click="checkIdentity" class="btn btn-sm btn-primary mt-5">
      본인인증
    </button>
    <!-- nice 서버에 submit할 form -->
    <form name="form_chk" method="post">
      <input type="hidden" name="m" value="checkplusService">
      <input type="hidden" name="EncodeData" value="">
    </form>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    checkIdentity () {
      // const wl = window.location
      // 인증 후 callback URL
      const returnUrl = `${this.serverHost}/nice/decrypt/data`
      // callback 후 WAS에서 최종적으로 redirect 시킬 URL(결과 화면)
      const redirectUrl = 'https://mo.d-alim.com'

      this.$axios({
        url: `${this.serverHost}/nice/encrypt/data`,
        method: 'GET',
        params: { returnUrl, redirectUrl },
        withCredentials: true
      }).then(res => {
        // encode data;
        const encodeData = res.data
        document.form_chk.action = 'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb'
        document.form_chk.EncodeData.value = encodeData
        // submit! (본인인증 화면으로 전환)
        document.form_chk.submit()
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>
