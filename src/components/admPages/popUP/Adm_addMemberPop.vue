<template>
  <userImgSelectCompo v-if="changeImageYn" :pSelectedIconPath="mDomainPath + mUserProfileImg" :parentSelectedIconFileKey="this.GE_USER.picMfilekey" :isAdmTrue="true" @no="closeChangeImg"/>
  <confirmPop v-if="confirmPopYn" :pClosePop="closeConfirmPop" :pConfirmPopHeader="popHeader" :pConfirmPopText="confirmPopText" @confirmOk="saveMember"/>
  <okPop v-if="okPopYn" :pMovePage="movePage" @closeOkPopError="closeOkPopError" :pClosePop="closeOkPop" :pOkPopHeader="popHeader" :pOkPopText="okPopText"/>
  <div id="admLayout" class="w100P alignCenter" style="flex-direction:column; gap:1rem;">
    <!-- <header class="w100P">
    <div class="w100P" style="text-align:left;">
      <img :src="require(`@/assets/images/common/icon_back.png`)" :alt="뒤로가기" class="cursorP" @click.stop="closeXPop"/>
    </div>
  </header> -->
  <div class="alignCenter w100P" style="flex-direction:column; justify-content:space-between; height:calc(100% - 60px);">
    <div class="w100P alignCenter" style="flex-direction:column;">
      <div @click="openChangImg" class="profileImg cursorP" :style="'background-image: url(' + mUserProfileImg + ');'"></div>
      <!-- <div v-else @click="openChangImg" class="profileImg cursorP"  :style="'background-image: url('+ (GE_USER.domainPath ? GE_USER.domainPath + this.$changeUrlBackslash(GE_USER.userProfileImg) : GE_USER.userProfileImg) +');'"> </div>-->

      <div class="w100P infoFillArea">
        <div class="w100P alignCenter" style="justify-content:space-between; gap:1rem;">
          <div class="infoName" style="width:65%;">
            <p>{{ fromExpertYn ?  '전문가명' : '구성원명' }}</p>
            <input type="text" class="inputs nameInput" v-model="newDispMText" :placeholder=mNamePlaceHolder />
          </div>
          <div class="infoType" style="width:25%;">
            <p>권한</p>
            <select v-model="selectedAuth" @change="changeTypeOption">
              <option value="default">선택하세요.</option>
              <!-- <option v-for="(auth, index) in mAppDetail[0].authList" :key="index" :value="auth.authKey">{{auth.authName}}</option> -->
            </select>
          </div>
        </div>
        <div class="infoNumber w100P">
            <p>연락처</p>
            <input type="text" class="inputs numberInput" v-model="newPhoneNoEnc" :placeholder=mNumberPlaceHolder />
          </div>
          <div class="infoMail w100P">
            <p>이메일</p>
            <input type="text" class="inputs mailInput" v-model="newEmail" :placeholder=mMailPlaceHolder />
          </div>
        <!-- <div class="w100P infoDesc">
          <p>조직설명</p>
          <textarea class="inputs descInput" v-model="infoGroupDesc" :placeholder=mDescPlaceHolder ></textarea>
        </div> -->
      </div>
    </div>

      <div class="w100P">
        <button type="button" @click="checkInputs" class="admBtn saveBtn">{{ mouKey && mouKey > 0 ? '수정' : '저장' }}</button>
          <button type="button" @click.stop="closeXPop" class="admBtn">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import userImgSelectCompo from '@/components/pageComponents/myPage/Tal_changeUserIcon.vue'
import confirmPop from '@/components/admPages/popUP/Adm_confirmPop.vue'
import okPop from '@/components/admPages/popUP/Adm_confirmOkPop.vue'
export default {
  components: {
    userImgSelectCompo,
    confirmPop,
    okPop
  },
  props: {
    pClosePop: Function,
    pOrgList: [],
    pPropParams: [],
    pSelectedOrgUser: {},
    orgKey: Number,
    pMyOrgList: [],
    pMOrgExpertList: [],
    mouKey: Number
  },
  created () {
    window.addEventListener('message', (e) => this.receiveMessage(e), false)
    console.log('pMOrgExpertList', this.pMOrgExpertList)
    // if (this.mouKey && this.mouKey > 0) { // 유저 수정일 경우
    //   this.popHeader = '유저 수정하기'
    //   this.confirmPopText = '유저를 수정하시겠습니까?'
    //   this.fetchData()
    // }
    console.log('this.$route.query.expertYn ??', this.$route.query.expertYn)
    if (this.$route.query && this.$route.query.expertYn === 'true') { // 전문가 추가일 경우
      this.fromExpertYn = true
      this.confirmPopText = '전문가를 추가하시겠습니까?'
    } else { this.fromExpertYn = false }

    if (location.search) {
      const urlParam = this.getParamMap(location.search)
      console.log(urlParam)
      if (urlParam.appToken) {
        this.$APP_CONFIG.appToken = urlParam.appToken
      }
    }
    if (this.orgKey && this.pMyOrgList) { // 넘겨받은 orgKey로 org찾기
      this.mAppDetail = this.pMyOrgList.filter(org => org.orgKey === Number(this.orgKey))
      console.log('this.mAppDetail', this.mAppDetail)
    }
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'addMember' + history.length
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  data () {
    return {
      isAdmTrue: true,
      mOtherParents: null,
      popHeader: '유저 추가하기',
      mAppDetail: {},
      mNamePlaceHolder: '이름을 입력하세요.',
      mNumberPlaceHolder: '01000000000 형식으로 입력해주세요.',
      mMailPlaceHolder: '메일을 입력하세요.',
      selectedOption: 'none',
      changeImageYn: false,
      mDomainPath: '',
      mUserProfileImg: '/resource/channeliconbg/CHAR01.png',
      newAuthKey: '',
      newEmail: '',
      newDispMText: '',
      newPhoneNoEnc: '',
      selectedAuth: 'default',
      confirmPopYn: false,
      okPopYn: false,
      movePage: false,
      confirmPopText: '새로운 유저를 추가하시겠습니까?',
      okPopText: '저장되었습니다.',
      fromExpertYn: false,
      mUserList: [],
      mSelectedUser: {}
    }
  },
  methods: {
    closeXPop () {
      if (window.self !== window.top) {
        window.parent.postMessage(JSON.stringify({ sender: 'Hb', type: 'close' }), this.mOtherParents)
      } else {
        this.$router.push('/admMain')
      }
    },
    showConfirmPop () {
      this.confirmPopYn = true
    },
    closeConfirmPop () {
      this.confirmPopYn = false
    },
    showOkPop () {
      this.okPopYn = true
    },
    closeOkPop () {
      console.log('꺼짐')
      this.okPopYn = false
      this.$router.go(-1)
    },
    closeOkPopError () {
      console.log('안꺼짐')
      this.okPopYn = false
    },
    openChangImg () {
      this.changeImageYn = true
    },
    closeChangeImg () {
      this.changeImageYn = false
    },
    changeTypeOption (value) {
      this.newAuthKey = this.selectedAuth
      console.log('this.newAuthKey', this.newAuthKey)
    },
    checkInputs () {
      if (this.newDispMText === '' || this.newPhoneNoEnc === '' || this.newEmail === '') {
        if (this.newDispMText === '') {
          this.okPopText = '구성원명을 입력하세요.'
        } else if (this.selectedAuth === 'default') {
          this.okPopText = '권한을 선택하세요.'
        } else if (this.newPhoneNoEnc === '') {
          this.okPopText = '연락처를 입력하세요.'
        } else if (this.newEmail === '') {
          this.okPopText = '이메일을 입력하세요.'
        }
        this.movePage = false // 꺼질 때 화면이동 없이 꺼짐
        this.showOkPop()
      } else {
        this.showConfirmPop()
      }
    },
    getParamMap (urlString) {
      const splited = urlString.replace('?', '').split(/[=?&]/)
      const param = {}
      for (let i = 0; i < splited.length; i++) {
        param[splited[i]] = splited[++i]
      }
      return param
    },
    async saveMember () {
      var paramSet = {}
      paramSet = {
        // authKey: this.newAuthKey,
        authKey: 469,
        userName: this.newDispMText,
        userEmail: this.newEmail,
        userDispMtext: this.newDispMText,
        phoneNoEnc: this.newPhoneNoEnc,
        creUserKey: this.GE_USER.userKey,
        userNameMtext: this.newDispMText,
        orgKey: Number(this.orgKey)
      }
      if (this.fromExpertYn === true) {
        paramSet.sSub = 'E'
      }
      console.log('paramSet', paramSet)
      var result = await this.$axios.post('https://www.hybric.net:9443/service/tp.saveMOrgUser', { mOrgUser: paramSet }, { withCredentials: true, headers: { DemoYn: true } })
      if (result && result.data) {
        this.closeConfirmPop()
        this.okPopText = '저장되었습니다.'
        this.movePage = true
        this.showOkPop()
      } else {
        this.okPopText = '실패했습니다. 다시 시도해주세요.'
        this.movePage = false
        this.showOkPop()
      }
    },
    receiveMessage (event, callback) {
      const basedUrl = 'https://www.hybric.net:9443'
      if (event.origin.includes('mankik') || event.origin.includes('localhost') || event.origin.includes('192.168') || event.origin.includes('hybric') || event.origin.includes(basedUrl)) {
        try {
          if (event.data) {
            const result = JSON.parse(event.data)
            if (result.data) {
              console.log(result.data)
              this.mOtherAppUserInfo = result.data
              this.$APP_CONFIG.appToken = result.data.appToken
              this.mOtherParents = event.origin
              console.log(this.mOtherParents)
              console.log('durl')
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
    async getMOrgMemberList () {
      var paramSet = {}
      paramSet.orgKey = this.orgKey
      var result = await this.$axios.post('/sUniB/tp.getMOrgUserList', paramSet, { withCredentials: true, headers: { UserAuthorization: this.$store.getters['D_USER/GE_USER'].userToken, Authorization: this.$APP_CONFIG.appToken } })
      if (result) {
        this.mUserList = result.data.org
      }
    },
    async fetchData () {
      console.log('fetchData 실행됨.')
      try {
        await this.getMOrgMemberList()
        this.mSelectedUser = this.mUserList.filter(user => user.mouKey === Number(this.mouKey))
        console.log('mSelectedUser ...', this.mSelectedUser)
        this.newDispMText = this.$changeText(this.mSelectedUser[0].userDispMtext)
        this.selectedAuth = this.mSelectedUser[0].authKey
        this.newPhoneNoEnc = this.mSelectedUser[0].phoneNoEnc
        this.newEmail = this.mSelectedUser[0].userEmail
      } catch (error) {
        console.log('error', error)
      }
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.closeXPop()
    },
    historyStack (value, old) {
    }
  }
}
</script>

<style scoped>

.profileImg{
  width: 6rem; height: 6rem; position: relative;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 0 3px 1px rgba(0,0,0,0.1);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color:#fff;
}
.infoFillArea{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;
  gap:1rem;
  margin-top:30px;
}
.infoFillArea p {
  text-align:left;
  font-size:14px;
  width:60px;
}
.infoName, .infoDesc, .infoType, .infoNumber, .infoMail{
  display:flex;
  align-items:center;
}
.infoType select{
  min-width:120px;
}
.inputs, select {
  width:calc(100% - 60px);
  padding:10px 10px !important;
  border-radius:10px !important;
  border:none !important;
  box-shadow:0 0 3px 1px rgba(0,0,0,0.1);
}
.inputs:focus{
  outline:none !important;
}
.saveBtn{
  background-color:#5F61BD;
  color:#fff;
  margin-right:1rem;
}

@media screen and (max-width:730px){
  .infoFillArea > div:first-child{
    flex-direction:column;
    justify-content:start;
    align-items:start;
  }
  .infoFillArea > div:first-child .infoName{
    width:100% !important;
  }
  .infoFillArea > div:first-child .infoType{
    width:auto !important;
  }
  .inputs, select{
    width:calc(100% - 60px) !important;
  }
}
</style>
