@ -1,98 +0,0 @@

<template>
  <div>
    <p>Naver Login Access Pages</p>
  </div>
</template>

<script>
import { setUserInfo } from '../../assets/js/login/Tal_userSetting'
import { saveUser } from '../../../public/commonAssets/Tal_axiosFunction.js'
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

export default {
  data () {
    return {
      hashMap: null,
      // eslint-disable-next-line new-cap
      naverIdLogin: null
    }
  },
  mounted () {
    // eslint-disable-next-line new-cap
    this.naverIdLogin = new naver_id_login('BbUrvFqJkUbcMb6ISALy', 'https://thealim.page.link/naverCallback')
    this.initF()
    // var paramList = hashData.split('&')
    // window.close()
  },
  methods: {
    async initF () {
      var self = this
      // console.log(self)
      var hashData = this.$route.hash
      hashData = hashData.replace('#', '')
      var hashList = hashData.split('&')
      this.hashMap = new Map()
      for (var i = 0; i < hashList.length; i++) {
      /* if (hashList[i].split('=')[0] === 'accessToken') {
        jsonObj.accessToken = hashData[i].split('=')[1]
      } */
        this.hashMap.set(hashList[i].split('=')[0], hashList[i].split('=')[1])
      }

      await this.naverIdLogin.get_naver_userprofile(this.naverSignInCallback())
      await localStorage.setItem('loginData', JSON.stringify(this.hashMap))
    },
    // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
    async naverSignInCallback () {
      // eslint-disable-next-line no-new-object
      var user = new Object()
      localStorage.setItem('loginType', 'N')
      user.soType = 'N'
      user.aToken = this.hashMap.get('access_token')
      user.rToken = ''
      user.userImg = ''
      var acc_token_val = this.naverIdLogin.oauthParams.access_token
      var id_val = this.naverIdLogin.getProfileData('id')
      var name_val = this.naverIdLogin.getProfileData('name')
      var nickname_val = this.naverIdLogin.getProfileData('nickname')
      var email_val = this.naverIdLogin.getProfileData('email')
      var mobile_val = this.naverIdLogin.getProfileData('mobile')
      var age_val = this.naverIdLogin.getProfileData('age')
      // console.log(acc_token_val + id_val + name_val + nickname_val + email_val + mobile_val + age_val)
      if (this.naverIdLogin.getProfileData('name') !== undefined) {
        user.email = email_val
        user.mobile = mobile_val
        user.name = name_val
        user.nickname = nickname_val
      } else {
        setTimeout(() => {
          user.email = email_val
          user.mobile = mobile_val
          user.name = name_val
          user.nickname = nickname_val
        }, 2000)
      }
      // console.log('naverIdLogin.getProfileData(): ' + this.naverIdLogin.getProfileData('name'))

      var userProfile = await setUserInfo(user)

      /* if (userProfile.mobile === undefined || userProfile.mobile === null || userProfile.mobile === 'null' || userProfile.mobile === '') {
              // localStorage.setItem('tempUserInfo', JSON.stringify(userProfile))
              router.push({ name: 'savePhone', params: { user: JSON.stringify(userProfile) } })
            } else */
      if (this.$route.params.boardDetail && this.$route.params.boardDetail !== 'social') {
        await saveUser(userProfile, true, this.$route.params.boardDetail) // 서버에 save요청
      } else {
        await saveUser(userProfile) // 서버에 save요청
      }
      /* localStorage.setItem('loginYn', true)
      location.href = '/' */
      // window.close()
    }

  }
}
</script>
