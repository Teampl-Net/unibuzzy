<template>
  <addMemberPop v-if="addExpertYn" :pAppInfoWrap="appInfoWrap" :pExpertYn="true" :pSelectedBranch="mSelectedBranch" :pMOrgExpertList="mMOrgExpertList" :pClosePop="closeAddPop"/>
  <confirmPop v-if="confirmPopYn" @confirmOk="deleteExpert" :pClosePop="closeConfirmPop" :pConfirmPopHeader="'전문가 삭제'" :pConfirmPopText="'해당 전문가를 삭제하시겠습니까?'"/>
  <okPop v-if="okPopYn" />
  <!-- <addExpertPop v-if="addExpertPopYn" :pClosePop="closeAddExpertPop" @addExpertOK="undefined"/> -->
  <!-- <header class="w100P">
    <div class="w100P">
      <img :src="require(`@/assets/images/common/icon_back.png`)" :alt="뒤로가기" class="cursorP" @click.stop="closePop"/>
    </div>
  </header> -->
  <div class="w100P experListWrap" id="admLayout">
    <div>
      <p class="orgName fontBold">{{ mSelectedBranch ? mSelectedBranch.orgName : '채널명' }}</p>
    </div>

    <ul class="expertWrap w100P">
      <li @click="openAddExpertPop" class="eachExpert cursorP fontBold addNew">➕ 추가하기</li>
      <li v-for="(user, index) in mMOrgExpertList" :key="index" class="eachExpert">
        <div class="alignCenter" style="gap:0.5rem;">
          <img :src="user.profileImgPath ? user.profileImgPath : require(`@/assets/images/todo/defaultImg.png`)" class="profileImg"/>
          <p class="font14 fontBold">{{ $changeText(user.userNameMtext) }}
            <span v-if="GE_USER.userKey === user.userKey" class="userMe">{{ '(나)' }}</span>
            <span v-else class="userOrNot">{{ '(미가입)' }}</span>
            <span v-if="GE_USER.userKey !== user.userKey" class="cursorP sendMsgBtn">✉️</span>
          </p>
        </div>
        <div class="infos">
          <p class="number font14">연락처: {{ user.phoneNoEnc ? user.phoneNoEnc : '없음' }}</p>
          <p class="email font14">메일: {{ user.userEmail ? user.userEmail : '없음' }}</p>
        </div>
        <span class="cursorP delExpert font13" @click.stop="confirmPopYn = true">✖️</span>
      </li>
    </ul>
  </div>
</template>

<script>
// import addExpertPop from '@/components/admPages/popUP/Adm_addExpertPop.vue'
import confirmPop from '@/components/admPages/popUP/Adm_confirmPop.vue'
import okPop from '@/components/admPages/popUP/Adm_confirmOkPop.vue'
import addMemberPop from '@/components/admPages/popUP/Adm_addMemberPop.vue'
export default ({
  components: {
    // addExpertPop
    confirmPop,
    okPop,
    addMemberPop
  },
  props: {
    orgKey: Number,
    pMyOrgList: []
  },
  created () {
    window.addEventListener('message', (e) => this.receiveMessage(e), false)
    console.log('orgKey', this.orgKey)
    // console.log('pMyOrgList', this.pMyOrgList)
    if (this.mOtherAppUserInfo !== null && this.mOtherAppUserInfo.userKey !== null) {
    } else {
      this.getMOrgMemberList(this.orgKey)
    }
    if (this.orgKey && this.pMyOrgList) {
      this.mAppDetail = this.pMyOrgList.filter(org => org.orgKey === Number(this.orgKey))
      // console.log('this.mAppDetail', this.mAppDetail)
      this.mSelectedBranch = this.mAppDetail[0]
      // console.log('this.mSelectedBranch', this.mSelectedBranch)
    }
  },
  data () {
    return {
      mMOrgExpertList: [],
      mOtherAppUserInfo: null,
      mAppDetail: {},
      mSelectedBranch: null,
      addExpertPopYn: false,
      expertYn: 'true',
      confirmPopYn: false,
      okPopYn: false,
      addExpertYn: false,
      appInfoWrap: []
    }
  },
  methods: {
    closePop () {
      this.$router.go(-1)
    },
    openConfirmPop () {
      this.confirmPopYn = true
    },
    closeConfirmPop () {
      this.confirmPopYn = false
    },
    openOkPop () {
      this.okPopYn = true
    },
    closeOkPop () {
      this.okPopYn = false
    },
    openAddExpertPop () {
      this.addExpertYn = true
      // if (window.self !== window.top) {
      //   window.parent.postMessage(JSON.stringify({ sender: 'Hb', type: 'openPop' }), this.mOtherParents)
      // } else {
      //   this.$router.push({
      //     path: `/addMember/${this.orgKey}/0`,
      //     query: { expertYn: true }
      //   })
      // }
    },
    closeAddPop () {
      this.addExpertYn = false
    },
    closeAddExpertPop () {
      this.addExpertPopYn = false
    },
    deleteExpert () {
    },
    async getOrgList (orgKey) {
      var paramSet = { orgKey: orgKey }
      var result = await this.$axios.post('https://www.hybric.net:9443/service/tp.getOrgList', paramSet, { withCredentials: true, headers: { UserAuthorization: this.GE_USER.userToken, Authorization: this.$APP_CONFIG.appToken } })
      if (result && result.data) {
        this.mSelectedBranch = result.data.org[0]
        console.log('this.mSelectedBranch', this.mSelectedBranch)
      }
    },
    async getMOrgMemberList (orgKey) {
      var paramSet = {}
      // paramSet.creUserKey = this.GE_USER.userKey
      paramSet.orgKey = orgKey
      paramSet.sSub = 'E'
      // paramSet.appToken = 'eyJhbGciOiJIUzI1NiJ9.eyJjcmVVc2VyS2V5IjoxOTIsImNyZURhdGUiOjE3MDUyODQzODUwMDAsImFwcE5hbWUiOiLrjZTslYzrprwiLCJhcHBUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmpjbVZWYzJWeVMyVjVJam94T1RJc0ltTnlaVVJoZEdVaU9qRTNNRFV5T0RRek9EVXdNREFzSW1Gd2NFNWhiV1VpT2lMcmpaVHNsWXpycHJ3aUxDSmhjSEJVYjJ0bGJpSTZJbVY1U21oaVIyTnBUMmxLU1ZWNlNURk9hVW81TG1WNVNtcGpiVlpXWXpKV2VWTXlWalZKYW05NFQxUkpjMGx0VG5sYVZWSm9aRWRWYVU5cVJUTk5SRlY1VDBSUmVrOUVWWGROUkVGelNXMUdkMk5GTldoaVYxVnBUMmxNY21wYVZITnNXWHB5Y0hKM2FVeERTbXBhV0Vvd1lWWkNiMkl5Tld4WFZ6UnBUMnBGYzBsdFJuZGpSWFJzWlZOSk5rMVRkMmxaTWxaNVpFZHNSbUpYUm5CaVJteDFTV3B2ZUV4RFNtdGFWM2hzWkVkV1dtSnBTVFpOUTNkcFdsaG9kMGxxYjNsTlJFbDNUbXBWTlU1cVZUVk1RMHAxWWpJMWFscFRTVFpKYlVrMVdXMVZNVnBFYkd0TVZFRXpXa1JaZEU1RVpHMU5VekExVDBSSk1VeFVhM2xPYW1NMFRsZFJkMDFVVlhoYVEwbHpTVzFHZFZwSVNuWmhWMUpLV2tOSk5rbHRUblppVXpVd1dWZDRabU5JU25aaGJWWnFaRU5LT1M1UVdIbFdYMUIwZFVkUlowSmZjMHRNVDNadE9XeDNPV2hvYmxoblJsQXhla2M1V0dGdFIxaFVVVGhWSWl3aVkyVnlkR2xRYUc5dVpWbHVJam94TENKaGNIQkxaWGtpT2pFc0ltTmxjblJwUlcxaGFXeFpiaUk2TVN3aVpHVnNaWFJsV1c0aU9qQXNJbVY0Y0NJNk1qQXlNRGt3TWpZM01Dd2libTl1WTJVaU9pSTVNVEprTTJabE1DMHhabVZrTFRRMllqa3RPREV3WkMwMU5qYzROVGN3TWpjMVpETWlMQ0poYm1SeWIybGtTV1FpT2lKamIyMHVkR0ZzWDNCeWIycGxZM1FpZlEuMUFGMkpoQzd6VG1wVTV2aHdvN0wxN2RSVlVSRzl0MFBzQ09rVFNGR1dHMCIsImNlcnRpUGhvbmVZbiI6MSwiYXBwS2V5IjoxLCJjZXJ0aUVtYWlsWW4iOjEsImRlbGV0ZVluIjowLCJleHAiOjIwMjA5MDI3NzQsIm5vbmNlIjoiNTlmMDYxMDItY2VhMS00NmE2LWEwMmYtNGUwODRhZWFlZjI1IiwiYW5kcm9pZElkIjoiY29tLnRhbF9wcm9qZWN0In0.irKKhHVeVbE5pvXAM69ytw0SCxYA6SMgXRPEDA_eCU8'
      var result = await this.$axios.post('https://www.hybric.net:9443/service/tp.getMOrgUserList', paramSet, { withCredentials: true, headers: { UserAuthorization: this.GE_USER.userToken, Authorization: this.$APP_CONFIG.appToken } })
      if (result) {
        console.log('result?', result)
        this.mMOrgExpertList = result.data.org
        console.log('this.mMOrgExpertList', this.mMOrgExpertList)
      }
    },
    receiveMessage (event, callback) {
      console.log('==receiveMessage==')
      const basedUrl = 'https://www.hybric.net:9443'
      if (event.origin.includes('mankik') || event.origin.includes('localhost') || event.origin.includes('192.168') || event.origin.includes('hybric') || event.origin.includes(basedUrl)) {
        try {
          if (event.data && !event.data.type) {
            const result = JSON.parse(event.data)
            if (result.data) {
              this.appInfoWrap = result.data
              this.mOtherAppUserInfo = result.data
              this.$APP_CONFIG.appToken = result.data.appToken
              this.getOrgList(Number(this.$route.params.orgKey))
              this.getMOrgMemberList(Number(this.$route.params.orgKey))
            }
            if (callback) {
              callback(result)
            }
          }
          console.log(event)
        } catch (error) {
          console.log(error)
        }
      }
    },
    getParamMap (urlString) {
      const splited = urlString.replace('?', '').split(/[=?&]/)
      const param = {}
      for (let i = 0; i < splited.length; i++) {
        param[splited[i]] = splited[++i]
      }
      return param
    }
  },
  computed: {
    GE_USER () {
      if (this.mOtherAppUserInfo !== null && this.mOtherAppUserInfo.userKey !== null) {
        return this.mOtherAppUserInfo
      } else {
        return this.$store.getters['D_USER/GE_USER']
      }
    }
  }
})
</script>

<style scoped>
.experListWrap{
  overflow:hidden auto;
}
header{
  padding:0.5rem 1rem;
  text-align:left;
}
.orgName{
  padding:10px 15px;
  border-bottom:2px solid #fff;
  color:#222;
}
.expertWrap{
  margin-bottom:0;
  padding:0;
  display:flex;
  align-items:center;
  flex-wrap:wrap;
  gap:1rem;
  padding:10px;
}
.addNew{
  height:40px !important;
  line-height:40px !important;
  padding:0 15px !important;
  background-color:#fff !important;
}
.eachExpert{
  text-align:left;
  width:100%;
  border-radius:10px;
  list-style-type:none;
  height:auto;
  font-size:14px;
  line-height:40px;
  background-color:#fff;
  box-shadow:0 1px 3px rgba(0,0,0,0.1);
  position:relative;
  padding:15px;
}
.sendMsgBtn{
  display:inline-block;
  padding:0 10px;
  border-radius:15px;
  box-shadow:0 1px 3px rgba(0,0,0,0.1);
  background-color:#fbfbfd;
  height:20px;
  line-height:20px;
}
.infos{
  text-align:left;
  line-height:20px;
}
.profileImg{
  width:30px;
  height:30px;
  border-radius:50%;
  background-size:100%;
  box-shadow:0 2px 5px rgba(0,0,0,0.2);
}
.userOrNot{
  margin:0 3px;
  color:red;
}
.userMe{
  margin:0 3px;
}
.delExpert{
  position:absolute;
  right:5px;
  top:-7px;
}

</style>
