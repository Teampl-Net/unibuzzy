<template>
    <div>

        <a class="kakao" @click="sendkakao">
        카카오톡
        </a>

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
      const apiServer = 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=ad73ad189dfce70f1a9c3b77c9924c45'
      // const headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://192.168.0.22:8080', withCredentials: true })
      const options = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', withCredentials: true } }
      const data = {
        dynamicLinkInfo: {
          domainUriPrefix: 'https://dalim.page.link',
          link: 'https://mo.d-alim.com?chanDetail=12345',
          androidInfo: {
            androidPackageName: 'com.tal_project',
            /*             androidFallbackLink: string, */
            androidMinPackageVersionCode: '1.1.0'
          },
          iosInfo: {
            iosBundleId: 'com.pushmsg.project',
            /* iosFallbackLink: string, */
            /* iosCustomScheme: string, */
            /* iosIpadFallbackLink: string,
            iosIpadBundleId: string, */
            iosAppStoreId: '1620854215'
          },
          navigationInfo: {
            enableForcedRedirect: 1
          },
          socialMetaTagInfo: {
            socialTitle: '더알림',
            socialDescription: '더 편한 구독알림',
            socialImageLink: 'http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'
          }
        },
        suffix: {
          option: 'UNGUESSABLE'
        }
      }

      // eslint-disable-next-line no-unused-vars
      var result = await this.$axios.post(apiServer, data, options)
    }
  }
}
</script>
