<template>
  <div>
    <p>Naver Login Access Pages</p>
  </div>
</template>

<script>
export default {
  mounted () {
    var self = this
    console.log(self)
    try {
      // 네이버로 로그인할때만 실행
      if (this.$route.query.code.length !== undefined) {
        var callbackFuc = async () => {

          /* const res = await fetch('https://locolhost/api/sns_login_naver', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: `${self.$route.query.code}`,
              state: `${self.$route.query.state}`,

            }),
          })
          const data = await res.json();
          console.log(`네이버 로그인 : ${data.email}`) */

          // 네이버 로그인 인증 코드 (nodejs api)

        }
        callbackFuc()
      }
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
