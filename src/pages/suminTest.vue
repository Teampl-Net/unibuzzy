<template>
    <div style="width: 100vw; height: 100vh;">

        <img @click="sendkakao" src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"  class="plusMarginBtn" style="margin: 0 auto; margin-top: 20%; width: 27px;" alt="카카오톡 공유하기">

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
    async sendkakao () {
      try {
        // eslint-disable-next-line no-undef
        if (Kakao) {
          // eslint-disable-next-line no-undef
          Kakao.init('ad73ad189dfce70f1a9c3b77c9924c45')
        };
      } catch (e) {};
      var kakaoLinkUrl = await this.kakaoLink()

      // eslint-disable-next-line no-undef
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '"더알림" 채널에 함께해요~!',
          description: '지금 구독신청하고, 다양한 정보를 공유해봐요!',
          imageUrl: 'http://pushmsg.net/img/homepage03_1_1.427f4b7c.png',
          imageWidth: 1200,
          imageHeight: 630,
          link: {
            mobileWebUrl: kakaoLinkUrl
          }
        },
        buttons: [
          {
            title: '구독하러 가기',
            link: {
              mobileWebUrl: kakaoLinkUrl
            }
          }
        ]
      })
    },
    async kakaoLink () {
      var result = null
      var params = {
        dynamicLinkInfo: {
          dynamicLinkDomain: 'thealim.page.link',
          link: 'http://mo.d-alim.com:18080?chanDetail=10&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더 편한 구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'
        },
        suffix: { option: 'SHORT' }
      }
      await this.$axios.post('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyCW-L18zOf2g5yR-iAey1U9AAE0uxxcQaE',
        params, { withCredentials: true })
        .then(function (response) {
          result = response.data.shortLink
          // alert(result)
        })
      return result
    }
  }
}
</script>
