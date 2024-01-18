<template>
  <userImgSelectCompo v-if="changeImageYn" :pSelectedIconPath="mDomainPath + mUserProfileImg" :parentSelectedIconFileKey="this.GE_USER.picMfilekey"  @no="closeChangeImg"/>

  <div id="layout" class="w100P alignCenter" style="flex-direction:column; gap:1rem; justify-content:space-between;">
    <div class="w100P alignCenter" style="flex-direction:column;">
      <div v-if="infoMemberName === ''" @click="openChangImg" class="profileImg cursorP" style="background-color:#fff;">click to add photo</div>
      <div v-else @click="openChangImg" class="profileImg cursorP"  :style="'background-image: url('+ (GE_USER.domainPath ? GE_USER.domainPath + this.$changeUrlBackslash(GE_USER.userProfileImg) : GE_USER.userProfileImg) +');'">
      </div>

      <div class="w100P infoFillArea">
        <div class="w100P alignCenter" style="justify-content:space-between;">
          <div class="infoName" style="width:70%;">
            <p>구성원명</p>
            <input type="text" class="inputs nameInput" v-model="infoMemberName" :placeholder=mNamePlaceHolder />
          </div>
          <div class="infoType" style="width:25%;">
            <p>구성원타입</p>
            <select v-model="selectedOption" @change="changeTypeOption">
              <option v-for="(type, index) in mTypeOption" :key="index" :value="type.value">{{type.name}}</option>
            </select>
          </div>
        </div>
        <div class="infoNumber w100P">
            <p>연락처</p>
            <input type="text" class="inputs nameInput" v-model="infoMemberNumber" :placeholder=mNumberPlaceHolder />
          </div>
          <div class="infoMail w100P">
            <p>이메일</p>
            <input type="text" class="inputs nameInput" v-model="infoMemberMail" :placeholder=mMailPlaceHolder />
          </div>
        <!-- <div class="w100P infoDesc">
          <p>조직설명</p>
          <textarea class="inputs descInput" v-model="infoGroupDesc" :placeholder=mDescPlaceHolder ></textarea>
        </div> -->
      </div>
    </div>

        <div class="w100P">
        <button type="button" @click="saveMember" class="admBtn saveBtn">저장</button>
          <button type="button" @click="pClosePop" class="admBtn">닫기</button>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
import userImgSelectCompo from '@/components/pageComponents/myPage/Tal_changeUserIcon.vue'
export default {
  components: {
    userImgSelectCompo
  },
  props: {
    pClosePop: Function,
    pOrgList: [],
    pPropParams: [],
    pSelectedOrgUser: {}
  },
  created () {
    if (this.pSelectedOrgUser && this.pSelectedOrgUser.domainPath && this.pSelectedOrgUser.userProfileImg) { // 기존 유저 수정이면
      this.mDomainPath = this.pSelectedOrgUser.domainPath
      this.mUserProfileImg = this.pSelectedOrgUser.userProfileImg
    }
  },
  data () {
    return {
      infoMemberName: '',
      infoMemberNumber: '',
      infoMemberMail: '',
      infoMemberType: '',
      mNamePlaceHolder: '구성원명을 입력하세요.',
      mNumberPlaceHolder: '010-0000-0000',
      mMailPlaceHolder: '메일을 입력하세요.',
      selectedOption: 'none',
      mTypeOption: [
        { idx: 0, name: '선택하세요.', value: 'none' },
        { idx: 1, name: '대리', value: 'D' },
        { idx: 2, name: '사원', value: 'S' },
        { idx: 3, name: '인턴', value: 'I' }
      ],
      changeImageYn: false,
      mDomainPath: '',
      mUserProfileImg: ''
    }
  },
  methods: {
    openChangImg () {
      this.changeImageYn = true
    },
    closeChangeImg () {
      this.changeImageYn = false
    },
    changeTypeOption (value) {
      this.infoMemberType = this.selectedOption
      console.log('this.infoMemberType', this.infoMemberType)
    },
    async saveMember () {
      var paramSet = {}
      paramSet.extraInfo = {
        userName: this.infoMemberName,
        userNumber: this.infoMemberNumber,
        userMail: this.infoMemberMail,
        uesrType: this.infoMemberType
        // domainPath: this.GE_USER.domainPath,
        // userProfileImg: this.GE_USER.userProfileImg
      }
      paramSet.creUserKey = this.GE_USER.userKey
      paramSet.orgKey = this.pPropParams.orgKey
      paramSet.appToken = 'eyJhbGciOiJIUzI1NiJ9.eyJjcmVVc2VyS2V5IjoxOTIsImNyZURhdGUiOjE3MDUyODQzODUwMDAsImFwcE5hbWUiOiLrjZTslYzrprwiLCJhcHBUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmpjbVZWYzJWeVMyVjVJam94T1RJc0ltTnlaVVJoZEdVaU9qRTNNRFV5T0RRek9EVXdNREFzSW1Gd2NFNWhiV1VpT2lMcmpaVHNsWXpycHJ3aUxDSmhjSEJVYjJ0bGJpSTZJbVY1U21oaVIyTnBUMmxLU1ZWNlNURk9hVW81TG1WNVNtcGpiVlpXWXpKV2VWTXlWalZKYW05NFQxUkpjMGx0VG5sYVZWSm9aRWRWYVU5cVJUTk5SRlY1VDBSUmVrOUVWWGROUkVGelNXMUdkMk5GTldoaVYxVnBUMmxNY21wYVZITnNXWHB5Y0hKM2FVeERTbXBhV0Vvd1lWWkNiMkl5Tld4WFZ6UnBUMnBGYzBsdFJuZGpSWFJzWlZOSk5rMVRkMmxaTWxaNVpFZHNSbUpYUm5CaVJteDFTV3B2ZUV4RFNtdGFWM2hzWkVkV1dtSnBTVFpOUTNkcFdsaG9kMGxxYjNsTlJFbDNUbXBWTlU1cVZUVk1RMHAxWWpJMWFscFRTVFpKYlVrMVdXMVZNVnBFYkd0TVZFRXpXa1JaZEU1RVpHMU5VekExVDBSSk1VeFVhM2xPYW1NMFRsZFJkMDFVVlhoYVEwbHpTVzFHZFZwSVNuWmhWMUpLV2tOSk5rbHRUblppVXpVd1dWZDRabU5JU25aaGJWWnFaRU5LT1M1UVdIbFdYMUIwZFVkUlowSmZjMHRNVDNadE9XeDNPV2hvYmxoblJsQXhla2M1V0dGdFIxaFVVVGhWSWl3aVkyVnlkR2xRYUc5dVpWbHVJam94TENKaGNIQkxaWGtpT2pFc0ltTmxjblJwUlcxaGFXeFpiaUk2TVN3aVpHVnNaWFJsV1c0aU9qQXNJbVY0Y0NJNk1qQXlNRGt3TWpZM01Dd2libTl1WTJVaU9pSTVNVEprTTJabE1DMHhabVZrTFRRMllqa3RPREV3WkMwMU5qYzROVGN3TWpjMVpETWlMQ0poYm1SeWIybGtTV1FpT2lKamIyMHVkR0ZzWDNCeWIycGxZM1FpZlEuMUFGMkpoQzd6VG1wVTV2aHdvN0wxN2RSVlVSRzl0MFBzQ09rVFNGR1dHMCIsImNlcnRpUGhvbmVZbiI6MSwiYXBwS2V5IjoxLCJjZXJ0aUVtYWlsWW4iOjEsImRlbGV0ZVluIjowLCJleHAiOjIwMjA5MDI3NzQsIm5vbmNlIjoiNTlmMDYxMDItY2VhMS00NmE2LWEwMmYtNGUwODRhZWFlZjI1IiwiYW5kcm9pZElkIjoiY29tLnRhbF9wcm9qZWN0In0.irKKhHVeVbE5pvXAM69ytw0SCxYA6SMgXRPEDA_eCU8'
      console.log('paramSet', paramSet)

      var result = await axios.post('/sUniB/tp.saveMOrgUser', { mOrgUser: paramSet }, { withCredentials: true, headers: { DemoYn: true } })
      console.log('result', result)
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>

<style scoped>

#layout{
  width:100%;
  height:100%;
  padding:60px 30px 50px;
}
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
  width:80px;
}
.infoName, .infoDesc, .infoType, .infoNumber, .infoMail{
  display:flex;
  align-items:center;
}
.inputs, select {
  width:calc(100% - 80px);
  padding:10px 20px !important;
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
</style>
