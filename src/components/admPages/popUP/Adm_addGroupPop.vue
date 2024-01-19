<template>
  <seleciconBgPopup v-if="mIconBgSelectPopYn=='iconPop' || mIconBgSelectPopYn=='bgPop'" :isAdmTrue="true" :selectIcon="this.mSelectedIcon" :selectBg="this.mSelectedBg" @no='mIconBgSelectPopYn=false' @makeParam='setIconOrBGData' :opentype="mIconBgSelectPopYn" />

  <div id="layout" class="w100P alignCenter" style="flex-direction:column; gap:1rem; justify-content:space-between;">

    <div class="w100P alignCenter" style="flex-direction:column;">

      <header class="w100P">
      <div class="w100P font30 fontBold " style="color:#5F61BD; text-align:center; padding-bottom:20px;">{{ pPropParams.popType === 'addGroup' ? '조직 추가' : '조직 수정' }}</div>
      </header>

      <div @click="mIconBgSelectPopYn='bgPop'" :style="'background: url(' + mSelectedBg.selectPath + ');'" class="w100P" style="height:230px; background-repeat: no-repeat;background-size: cover;"></div>
      <div :style="'background-image: url(' + mSelectedIcon.selectPath + ')'" class="profileImg cursorP" @click="mIconBgSelectPopYn='iconPop'" style="background-size: cover; background-position: center; background-repeat: no-repeat;">
      </div>

      <div class="w100P infoFillArea">
        <div class="w100P alignCenter" style="justify-content:space-between;">
          <div class="infoName" style="width:70%;">
            <p>조직명</p>
            <input type="text" class="inputs nameInput" v-model="infoGroupName" :placeholder=mNamePlaceHolder />
          </div>
          <div class="infoType" style="width:25%;">
            <p>조직타입</p>
            <select v-model="selectedOption" @change="changeTypeOption">
              <option v-for="(type, index) in mTypeOption" :key="index" :value="type.value">{{type.name}}</option>
            </select>
          </div>
        </div>
        <div class="w100P infoDesc">
          <p>조직설명</p>
          <textarea class="inputs descInput" v-model="infoGroupDesc" :placeholder=mDescPlaceHolder ></textarea>
        </div>
      </div>
    </div>

        <div class="w100P">
        <button type="button" @click="saveGroup" class="admBtn saveBtn">{{ pPropParams.popType === 'addGroup' ? '추가' : '수정'}}</button>
          <button type="button" @click="pClosePop" class="admBtn">닫기</button>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
import seleciconBgPopup from '@/components/popup/creChannel/Tal_selectChaniconBgPopup.vue'

export default {
  components: {
    seleciconBgPopup
  },
  props: {
    pClosePop: Function,
    pSelectedOrg: {},
    pGetOrgList: Function,
    pPropParams: {}
  },
  created () {
    console.log('addGroupPop pPropParams', this.pPropParams)
    if (this.pPropParams && this.pPropParams.popType === 'editGroup') { // 수정일 시 기본셋팅
      this.infoGroupName = this.pPropParams.orgName
      this.infoGroupDesc = this.pPropParams.orgDesc
      this.selectedOption = this.pPropParams.orgType
      this.infoGroupType = this.pPropParams.orgType
    }
    if (this.pSelectedOrg) {
      this.mSelectedIcon = this.pSelectedOrg.iconPath
    }
  },
  data () {
    return {
      isAdmTrue: true,
      mIconBgSelectPopYn: '',
      mSelectedIcon: { selectedId: '1', selectPath: '/resource/channeliconbg/CHAR01.png' },
      mSelectedBg: { selectedId: '11', selectPath: '/resource/channeliconbg/BG01.jpg' },
      infoGroupName: '',
      infoGroupDesc: '',
      infoGroupType: '',
      mNamePlaceHolder: '조직명을 입력하세요.',
      mDescPlaceHolder: '조직 설명을 입력하세요.',
      selectedOption: 'none',
      mTypeOption: [
        { idx: 0, name: '선택하세요.', value: 'none' },
        { idx: 1, name: '아파트', value: 'A' },
        { idx: 2, name: '회사', value: 'C' },
        { idx: 3, name: '학교', value: 'S' }
      ]
    }
  },
  methods: {
    changeTypeOption (value) {
      this.infoGroupType = this.selectedOption
      console.log('this.infoGroupType', this.infoGroupType)
    },
    async saveGroup () {
      var paramSet = {}
      paramSet.orgName = this.infoGroupName
      paramSet.orgDesc = this.infoGroupDesc
      paramSet.orgType = this.infoGroupType
      paramSet.creUserKey = this.GE_USER.userKey
      paramSet.orgImgFilekey = this.mSelectedIcon.selectedId
      paramSet.orgBgFilekey = this.mSelectedBg.selectedId
      paramSet.appToken = 'eyJhbGciOiJIUzI1NiJ9.eyJjcmVVc2VyS2V5IjoxOTIsImNyZURhdGUiOjE3MDUyODQzODUwMDAsImFwcE5hbWUiOiLrjZTslYzrprwiLCJhcHBUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmpjbVZWYzJWeVMyVjVJam94T1RJc0ltTnlaVVJoZEdVaU9qRTNNRFV5T0RRek9EVXdNREFzSW1Gd2NFNWhiV1VpT2lMcmpaVHNsWXpycHJ3aUxDSmhjSEJVYjJ0bGJpSTZJbVY1U21oaVIyTnBUMmxLU1ZWNlNURk9hVW81TG1WNVNtcGpiVlpXWXpKV2VWTXlWalZKYW05NFQxUkpjMGx0VG5sYVZWSm9aRWRWYVU5cVJUTk5SRlY1VDBSUmVrOUVWWGROUkVGelNXMUdkMk5GTldoaVYxVnBUMmxNY21wYVZITnNXWHB5Y0hKM2FVeERTbXBhV0Vvd1lWWkNiMkl5Tld4WFZ6UnBUMnBGYzBsdFJuZGpSWFJzWlZOSk5rMVRkMmxaTWxaNVpFZHNSbUpYUm5CaVJteDFTV3B2ZUV4RFNtdGFWM2hzWkVkV1dtSnBTVFpOUTNkcFdsaG9kMGxxYjNsTlJFbDNUbXBWTlU1cVZUVk1RMHAxWWpJMWFscFRTVFpKYlVrMVdXMVZNVnBFYkd0TVZFRXpXa1JaZEU1RVpHMU5VekExVDBSSk1VeFVhM2xPYW1NMFRsZFJkMDFVVlhoYVEwbHpTVzFHZFZwSVNuWmhWMUpLV2tOSk5rbHRUblppVXpVd1dWZDRabU5JU25aaGJWWnFaRU5LT1M1UVdIbFdYMUIwZFVkUlowSmZjMHRNVDNadE9XeDNPV2hvYmxoblJsQXhla2M1V0dGdFIxaFVVVGhWSWl3aVkyVnlkR2xRYUc5dVpWbHVJam94TENKaGNIQkxaWGtpT2pFc0ltTmxjblJwUlcxaGFXeFpiaUk2TVN3aVpHVnNaWFJsV1c0aU9qQXNJbVY0Y0NJNk1qQXlNRGt3TWpZM01Dd2libTl1WTJVaU9pSTVNVEprTTJabE1DMHhabVZrTFRRMllqa3RPREV3WkMwMU5qYzROVGN3TWpjMVpETWlMQ0poYm1SeWIybGtTV1FpT2lKamIyMHVkR0ZzWDNCeWIycGxZM1FpZlEuMUFGMkpoQzd6VG1wVTV2aHdvN0wxN2RSVlVSRzl0MFBzQ09rVFNGR1dHMCIsImNlcnRpUGhvbmVZbiI6MSwiYXBwS2V5IjoxLCJjZXJ0aUVtYWlsWW4iOjEsImRlbGV0ZVluIjowLCJleHAiOjIwMjA5MDI3NzQsIm5vbmNlIjoiNTlmMDYxMDItY2VhMS00NmE2LWEwMmYtNGUwODRhZWFlZjI1IiwiYW5kcm9pZElkIjoiY29tLnRhbF9wcm9qZWN0In0.irKKhHVeVbE5pvXAM69ytw0SCxYA6SMgXRPEDA_eCU8'

      if (this.pPropParams.popType === 'editGroup') { // 수정이면
        paramSet.orgKey = this.pPropParams.orgKey
      }
      this.$emit('saveGroup', paramSet)
    },
    async getOrgList () {
      console.log('getOrgList 실행됨 - add Group Pop')
      var paramSet = {}
      paramSet.creUserKey = this.GE_USER.userKey
      paramSet.appToken = 'eyJhbGciOiJIUzI1NiJ9.eyJjcmVVc2VyS2V5IjoxOTIsImNyZURhdGUiOjE3MDUyODQzODUwMDAsImFwcE5hbWUiOiLrjZTslYzrprwiLCJhcHBUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmpjbVZWYzJWeVMyVjVJam94T1RJc0ltTnlaVVJoZEdVaU9qRTNNRFV5T0RRek9EVXdNREFzSW1Gd2NFNWhiV1VpT2lMcmpaVHNsWXpycHJ3aUxDSmhjSEJVYjJ0bGJpSTZJbVY1U21oaVIyTnBUMmxLU1ZWNlNURk9hVW81TG1WNVNtcGpiVlpXWXpKV2VWTXlWalZKYW05NFQxUkpjMGx0VG5sYVZWSm9aRWRWYVU5cVJUTk5SRlY1VDBSUmVrOUVWWGROUkVGelNXMUdkMk5GTldoaVYxVnBUMmxNY21wYVZITnNXWHB5Y0hKM2FVeERTbXBhV0Vvd1lWWkNiMkl5Tld4WFZ6UnBUMnBGYzBsdFJuZGpSWFJzWlZOSk5rMVRkMmxaTWxaNVpFZHNSbUpYUm5CaVJteDFTV3B2ZUV4RFNtdGFWM2hzWkVkV1dtSnBTVFpOUTNkcFdsaG9kMGxxYjNsTlJFbDNUbXBWTlU1cVZUVk1RMHAxWWpJMWFscFRTVFpKYlVrMVdXMVZNVnBFYkd0TVZFRXpXa1JaZEU1RVpHMU5VekExVDBSSk1VeFVhM2xPYW1NMFRsZFJkMDFVVlhoYVEwbHpTVzFHZFZwSVNuWmhWMUpLV2tOSk5rbHRUblppVXpVd1dWZDRabU5JU25aaGJWWnFaRU5LT1M1UVdIbFdYMUIwZFVkUlowSmZjMHRNVDNadE9XeDNPV2hvYmxoblJsQXhla2M1V0dGdFIxaFVVVGhWSWl3aVkyVnlkR2xRYUc5dVpWbHVJam94TENKaGNIQkxaWGtpT2pFc0ltTmxjblJwUlcxaGFXeFpiaUk2TVN3aVpHVnNaWFJsV1c0aU9qQXNJbVY0Y0NJNk1qQXlNRGt3TWpZM01Dd2libTl1WTJVaU9pSTVNVEprTTJabE1DMHhabVZrTFRRMllqa3RPREV3WkMwMU5qYzROVGN3TWpjMVpETWlMQ0poYm1SeWIybGtTV1FpT2lKamIyMHVkR0ZzWDNCeWIycGxZM1FpZlEuMUFGMkpoQzd6VG1wVTV2aHdvN0wxN2RSVlVSRzl0MFBzQ09rVFNGR1dHMCIsImNlcnRpUGhvbmVZbiI6MSwiYXBwS2V5IjoxLCJjZXJ0aUVtYWlsWW4iOjEsImRlbGV0ZVluIjowLCJleHAiOjIwMjA5MDI3NzQsIm5vbmNlIjoiNTlmMDYxMDItY2VhMS00NmE2LWEwMmYtNGUwODRhZWFlZjI1IiwiYW5kcm9pZElkIjoiY29tLnRhbF9wcm9qZWN0In0.irKKhHVeVbE5pvXAM69ytw0SCxYA6SMgXRPEDA_eCU8'
      var result = await axios.post('/sUniB/tp.getOrgList', paramSet, { withCredentials: true, headers: { DemoYn: true } })
      console.log('result', result)
      if (result && result.data) {
        console.log('result', result.data)
      }
    },
    setIconOrBGData (param) {
      console.log('addGroupPop param', param)
      if (this.mIconBgSelectPopYn === 'iconPop') {
        this.mSelectedIcon = param
      } else if (this.mIconBgSelectPopYn === 'bgPop') {
        this.mSelectedBg = param
      }
      this.mIconBgSelectPopYn = false
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
  width:150px;
  height:150px;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  box-shadow:0 0 3px 1px rgba(0,0,0,0.1);
  margin-top:-80px;
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
  width:80px;
}
.infoName, .infoDesc, .infoType{
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
