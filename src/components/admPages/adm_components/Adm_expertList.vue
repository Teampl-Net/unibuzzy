<template>
  <!-- <addExpertPop v-if="addExpertPopYn" :pClosePop="closeAddExpertPop" @addExpertOK="undefined"/> -->
  <div class="w100P experListWrap" id="admLayout">
    <div>
      <p class="orgName">{{ mSelectedBranch ? mSelectedBranch.orgName : '조직명' }}</p>
    </div>

    <ul class="expertWrap w100P">
      <li @click="openAddExpertPop" class="eachExpert cursorP">+ 추가하기</li>
      <li v-for="(user, index) in mMOrgExpertList" :key="index" class="eachExpert">
        <p class="font14">{{ $changeText(user.userNameMtext) }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
// import addExpertPop from '@/components/admPages/popUP/Adm_addExpertPop.vue'
export default ({
  components: {
    // addExpertPop
  },
  props: {
    orgKey: Number,
    pMyOrgList: {}
  },
  created () {
    window.addEventListener('message', (e) => this.receiveMessage(e), false)
    console.log('orgKey', this.orgKey)
    console.log('pMyOrgList', this.pMyOrgList)
    this.getMOrgMemberList(this.orgKey)
    if (this.orgKey && this.pMyOrgList) {
      this.mAppDetail = this.pMyOrgList.filter(org => org.orgKey === Number(this.orgKey))
      console.log('this.mAppDetail', this.mAppDetail)
      this.mSelectedBranch = this.mAppDetail[0]
      console.log('this.mSelectedBranch', this.mSelectedBranch)
    }
  },
  data () {
    return {
      mMOrgExpertList: [],
      mOtherAppUserInfo: null,
      mAppDetail: {},
      mSelectedBranch: null,
      addExpertPopYn: false,
      expertYn: 'true'
    }
  },
  methods: {
    openAddExpertPop () {
      this.$router.push(`/addMember/${this.orgKey}`)
    },
    closeAddExpertPop () {
      this.addExpertPopYn = false
    },
    async getMOrgMemberList (orgKey) {
      var paramSet = {}
      // paramSet.creUserKey = this.GE_USER.userKey
      paramSet.orgKey = orgKey
      paramSet.sSub = 'E'
      var result = await this.$axios.post('/sUniB/tp.getMOrgUserList', paramSet, { withCredentials: true, headers: { UserAuthorization: this.$store.getters['D_USER/GE_USER'].userToken, Authorization: this.$APP_CONFIG.appToken } })
      if (result) {
        console.log('result?', result)
        this.mMOrgExpertList = result.data.org
        console.log('this.mMOrgExpertList', this.mMOrgExpertList)
      }
    },
    receiveMessage (event, callback) {
      const basedUrl = 'http://192.168.0.78:9443'
      if (event.origin.includes('mankik') || event.origin.includes('localhost') || event.origin.includes('192.168') || event.origin.includes('hybric') || event.origin.includes(basedUrl)) {
        try {
          if (event.data && !event.data.type) {
            const result = JSON.parse(event.data)
            if (result.data) {
              this.mOtherAppUserInfo = result.data
              this.$APP_CONFIG.appToken = result.data.appToken
              // this.getOrgList(Number(this.$route.params.orgKey))
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
.orgName{
  padding:10px 15px;
  border-bottom:2px solid #ececec;
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
.eachExpert{
  width:calc(50% - 1rem);
  border-radius:10px;
  list-style-type:none;
  height:40px;
  font-size:14px;
  line-height:40px;
  background-color:#fff;
  box-shadow:0 1px 3px rgba(0,0,0,0.1);
}

</style>
