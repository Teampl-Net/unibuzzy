<i18n>
{
  "ko": {
    "MEM_DETAIL_MSG_NAME": "이름을 입력하세요",
    "MEM_DETAIL_MSG_EMAIL": "이메일을 입력하세요",
    "MEM_DETAIL_MSG_PHONE": "전화번호를 입력하세요",
    "MEM_DETAIL_MSG_NOMAIL": "등록된 이메일이 없습니다",
    "MEM_DETAIL_MSG_NOPHONE": "등록된 번호가 없습니다",
    "MEM_DETAIL_MSG_ADDMEM": "추가된 구성원",
    "MEM_DETAIL_MSG_VALI_EMAIL": "이메일 형식이 올바르지 않습니다.",
    "MEM_DETAIL_MSG_VALI_PHONE": "전화번호 형식이 올바르지 않습니다."
  },
  "en": {
    "MEM_DETAIL_MSG_NAME": "Please enter the name",
    "MEM_DETAIL_MSG_EMAIL": "Please enter the e-mail",
    "MEM_DETAIL_MSG_PHONE": "Please enter the phone number",
    "MEM_DETAIL_MSG_NOMAIL": "There are no registered e-mail",
    "MEM_DETAIL_MSG_NOPHONE": "There are no registered phone number",
    "MEM_DETAIL_MSG_ADDMEM": "Added members",
    "MEM_DETAIL_MSG_VALI_EMAIL": "E-mail format is not valid.",
    "MEM_DETAIL_MSG_VALI_PHONE": "Phone number format is not valid.",
  }
}
</i18n>
<template>
<div id="addTeamMemberArea" class="addTeamMemberArea">
    <gPopHeader headerTitle="Add Manually" :pClosePop="pClosePop" />
    <div class="w100P ptop-8"></div>
    <userImgSelectCompo  @closeXPop="closeXPop" :pSelectedIconPath="mUserInfo.domainPath + mUserInfo.userProfileImg" :parentSelectedIconFileKey="mUserInfo.picMfilekey"  @no="backClick" v-if="changeUserIconShowYn"/>
    <div class="w100P fl mbottom-1 box1" :style="`padding-top: ${$STATUS_HEIGHT + 50}px;`">
        <div class="flexCenter" :style="'width: ' + popSize*0.3 + 'px; height: ' + popSize*0.3 + 'px;'">
            <div :style="'background-image: url(' + (mUserInfo.domainPath ? mUserInfo.domainPath + $changeUrlBackslash(mUserInfo.userProfileImg) : mUserInfo.userProfileImg) + '); width: ' + popSize*0.3 + 'px; height: ' + popSize*0.3 + 'px;' " class="userProfileImgWrap certiIconBox">
                <img v-if="GE_USER.certiDate" class="img-w38" src="@/assets/images/common/userCertiIcon.svg" alt="">
            </div>
        </div>
        <div v-if="selfYn" @click="changeUserImg()" class="font14 myIconBtn">변경</div>
    </div>
    <div class="addMemberTextArea fl">

      <div class="fl w100P dispContents">
        <p class="fl commonBlack creChanInput w100P font16 fontBold" v-if="readOnlyYn && !changeYn" >{{memName}}</p>
        <p class="fl commonGray creChanInput w100P font14 " v-if="readOnlyYn && !changeYn && GE_USER.certiDate" >{{$changeText(mUserInfo.userDispMtext)}}</p>
        <img v-if="readOnlyYn && !changeYn && selfYn" src="@/assets/images/contents/noticebox_edit.png" class="fr cursorP noticeEditBtn" @click="changeUserDispMtext()" >
        <div v-show="changeYn" class="fl creChanInput">
            <input class="fl font16 nameInput" type="text" v-model="memName" @keyup.enter="setDispName" />
            <div class="fl w100P">
                <p class="fl mleft-1 font13 height30" @click="setDispName" >{{ $t('COMMON_BTN_OK') }}</p>
                <p class="fl mleft-1 font13 height30" @click="changeYn = false">{{ $t('COMM_BTN_CANCEL') }}</p>
            </div>
        </div>
      </div>
      <div class="mtop-1 fl w100P flexJustiCenter" v-if="!readOnlyYn && !selfYn">
        <img src="/resource/footer/icon_people.svg" class="img-w20 fl mright-05" alt="">

        <input  type="text" :placeholder="$t('MEM_DETAIL_MSG_NAME')" class="creChanInput fr"  v-model="memName" >
      </div>

      <div class="mtop-1 fl w100P flexJustiCenter">
        <img src="@/assets/images/editChan/icon_letter.svg" class="img-w20 fl mright-05" alt="">
        <p class="fl font16 commonDarkGray creChanInput textLeft height30" v-if="readOnlyYn" >{{memEmail ? memEmail : $t('MEM_DETAIL_MSG_NOMAIL') }}</p>
        <input v-else type="text" :placeholder="$t('MEM_DETAIL_MSG_EMAIL')" class="creChanInput fr"  v-model="memEmail" >
      </div>
      <div class="mtop-1 fl w100P flexJustiCenter">
        <img src="@/assets/images/editChan/icon_phoneSolid.svg" class="img-w20 fl mright-05" alt="">
        <p class="fl font16 commonDarkGray creChanInput textLeft height30" v-if="readOnlyYn" >{{memPhone ? memPhone : $t('MEM_DETAIL_MSG_NOPHONE') }}</p>
        <input v-else type="text" :placeholder="$t('MEM_DETAIL_MSG_PHONE')" class="creChanInput fr" @keyup.enter="addDirectAddMemList" v-model="memPhone" >
      </div>

      <gBtnSmall v-if="excelPopYn" :btnTitle="$t('COMMON_BTN_ADD')" class="fl btnStyle" @click="addDirectAddMemList" />
      <div v-if="readOnlyYn" class="fl w100P mtop-3 actBox">
        <div v-for="(value, index) in profileFunc" :key="index" @click="profileFuncEvent(value.type)" class="fl flexCenter">
          <div class="flexAlignCenter flexColumn">
            <div class="nativeServiceBtnWrap">
              <img v-if="value.type === 'MAIL'" src="@/assets/images/editChan/icon_letter.svg"  class="img-w20" alt="">
              <img v-if="value.type === 'PHON'" src="@/assets/images/editChan/icon_phoneSolid.svg" class="img-w20" alt="">
              <img v-if="value.type === 'TEXT'" src="@/assets/images/editChan/icon_textSolid.svg"  class="img-w20" alt="">
            </div>
            <p class="font14 fl textLeft commonBlack height30">{{value.funcTitle}}</p>
          </div>
          <div class="mleft-05 mright-05 whiteColor" v-if="index !== (profileFunc.length - 1)">|</div>
        </div>
      </div>
    </div>

    <div v-if="excelPopYn" class="excelPopBox">
        <p class="font20 fontBold">{{ $t('MEM_DETAIL_MSG_ADDMEM') }}</p>
        <div>
            <table class="memberTable">
                <colgroup>
                    <col width="20%">
                    <col width="40%">
                    <col width="32%">
                    <col width="10px">
                </colgroup>
                <tr style = "background-color:#ccc;">
                    <th class="font15 infoTitleBox">{{ $t('COMMON_NAME_NAME') }}</th>
                    <th class="font15 infoTitleBox">{{ $t('COMMON_NAME_EMAIL') }}</th>
                    <th class="font15 infoTitleBox">{{ $t('COMMON_NAME_PHONE') }}</th>
                    <th class="font15 infoTitleBox"></th>
                </tr>
                <tr class="height50" v-for="(data, index) in memberList" :key='index'>
                    <td class="font12 memList">{{data.name}}</td>
                    <td class="font12 memList">{{data.email}}</td>
                    <td class="font12 memList">{{data.phoneNum}}</td>
                    <td class="font16 memList fontBold" @click="deleteMem(data,index)">X</td>
                </tr>
            </table>
        </div>
    </div>
    <gBtnSmall v-if="!readOnlyYn" :btnTitle="$t('COMM_BTN_APPLY')" class="applyBtnStyle" @click="addDirectAddMemList" />
</div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import { onMessage } from '@/assets/js/webviewInterface'
import userImgSelectCompo from '../../myPage/unit/ChangeUserIcon'
export default {
    data () {
        return {
            memName: '',
            memEmail: '',
            memPhone: '',
            memberList:[],
            confirmPopShowYn: false,
            confirmText: '',
            readOnlyYn:false,
            userProfileImg : undefined,
            domainPath : '',
            systemName: 'iOS',
            popSize: 0,
            changeUserIconShowYn: false,
            changeUserIconPop: null,
            picMfilekey: null,
            selfYn: false,
            changeYn: false,
            tempUserDispName: '',
            profileFunc: [{ funcTitle: '메일쓰기', type: 'MAIL' }, { funcTitle: '전화걸기', type: 'PHON' }, { funcTitle: '문자쓰기', type: 'TEXT' }],
            mUserInfo: {}
        }
    },
    components: {
        userImgSelectCompo
    },
    props:{
        propData: {},
        setEditMember:{},
        excelPopYn:{},
        pClosePop: Function
    },
    mounted () {
        this.popSize = document.getElementById('addTeamMemberArea').scrollWidth
    },
    computed: {
        GE_USER () {
            return this.$store.getters['UB_USER/GE_USER']
        },
        CHANNEL_DETAIL () {
            return this.$getDetail('TEAM', this.propData.teamKey)[0]
        }
    },
    async created(){
        this.$emit('openLoading')
        if(this.propData.readOnlyYn){this.readOnlyYn = true}

        if(this.propData !== null && this.propData !== undefined && this.propData !== ''){
            if (this.propData.selfYn) {
                this.selfYn = this.propData.selfYn
                this.mUserInfo = this.GE_USER
            } else {
                await this.getMemberListGetUserInfo()
            }
        }
        if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) { this.systemName = localStorage.getItem('systemName') }
        this.$emit('closeLoading')
    },
    methods:{
        profileFuncEvent (type) {
            if (type === 'MAIL') {
                this.sendMail(this.memEmail)
            } else if (type === 'PHON') {
                this.callPhone(this.memPhone)
            } else if (type === 'TEXT') {
                this.sendSms(this.memPhone)
            }
        },
        async getMemberListGetUserInfo () {
            var paramMap = new Map()
            paramMap.set('teamKey', this.propData.teamKey)
            paramMap.set('userKey', this.propData.userKey)
            paramMap.set('adminYn', true)
            var result = await this.$commonAxiosFunction({
                url: '/sUniB/tp.getFollowerList',
                param: Object.fromEntries(paramMap)
            })
            if (result.data.content) this.mUserInfo = result.data.content[0]
        },
        async setDispName () {
            var param = {}
            var user = {}
            user.userKey = this.GE_USER.userKey
            user.userDispMtext = 'EN^$' + this.memName
            param.user = user
            param.updateYn = true
            var result = await this.$changeDispName(param)
            if (result.data) {
                this.$store.commit('UB_USER/MU_USER', result.data.userInfo)
                localStorage.setItem('sessionUser', JSON.stringify(result.data))
                this.changeYn = false
                this.$emit('closeXPop', true)
            }
        },
        changeUserDispMtext () {
            this.changeYn = true
            this.tempUserDispName = this.memName
        },
        closeXPop () {
            this.$emit('closeXPop', true)
        },
        changeUserImg () {
            if(this.changeUserIconShowYn) {
                ;
            } else {
                this.changeUserIconShowYn = true
                this.changeUserIconPop = 'changeUserIconPop' + history.length

                var history = this.$store.getters['UB_HISTORY/hStack']
                history.push(this.changeUserIconPop)
                this.$store.commit('UB_HISTORY/updateStack', history)
            }
        },
        backClick () {
            var hStack = this.$store.getters['UB_HISTORY/hStack']
            var removePage = hStack[hStack.length - 1]
            if (this.changeUserIconPop === hStack[hStack.length - 1]) {
                hStack = hStack.filter((element, index) => index < hStack.length - 1)
                this.$store.commit('UB_HISTORY/setRemovePage', removePage)
                this.$store.commit('UB_HISTORY/updateStack', hStack)
                this.changeUserIconShowYn = false
            } else {

            }
        },
        callPhone (num) {
            if (num != undefined && num != null && num != '') {
                if(this.systemName !== 'Android' && this.systemName !== 'android')
                    document.location.href='tel:' + num
                else
                    onMessage('REQ', 'callphone', num)
            } else {
                alert(this.$t('MEM_DETAIL_MSG_NOPHONE'))
            }
        },
        sendMail (email) {
            if (email != undefined && email != null && email != '') {
                if(this.systemName !== 'Android' && this.systemName !== 'android')
                    document.location.href='mailto:' + email
                else
                    onMessage('REQ', 'sendMail', email)
            } else {
                alert(this.$t('MEM_DETAIL_MSG_NOMAIL'))
            }
        },
        sendSms (num) {
            if (num != undefined && num != null && num != '') {
                if(this.systemName !== 'Android' && this.systemName !== 'android')
                    document.location.href='sms:' + num
                else
                    onMessage('REQ', 'sendSms', num)
            } else {
                alert(this.$t('MEM_DETAIL_MSG_NOPHONE'))
            }
        },
        regEmail(text) {
            var regemail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
            if (regemail.test(text) === true) {
                return true
            } else {
                return false
            }
        },
        regPhoneNumber(text) {
            var regPhone = /^(?:(010-\d{4})|(01[0|1|6|7|8|9]-\d{3,4}))-(\d{4})$/
            var regPhone1 = /^(?:(010\d{4})|(01[0|1|6|7|8|9]\d{3,4}))(\d{4})$/
            if (regPhone.test(text) === true || regPhone1.test(text) === true) {
                return true
            } else {
                return false
            }
        },
        deleteMem(data,index) {
            this.memberList.splice(index, 1);
        },
        async addDirectAddMemList () {
            var checkYn = await this.checkParam()
            if(checkYn) {
                if(this.propData.mccKey) {

                } else {
                    var param = new Object()


                    param.inUserName = this.memName
                    param.userName =  this.memName
                    param.userDispMtext = "EN$^$"+this.memName
                    param.userNameMtext = "EN$^$"+this.memName

                    param.userEmail = this.memEmail
                    param.userPhone = this.memPhone

                    param.cabinetKey = this.propData.currentCabinetKey
                    param.teamKey = this.propData.currentTeamKey
                    this.$emit('addDirectAddMemList', param)
                }

            }
        },
        checkParam(){
            var result = false
            if (this.memName === '' || this.memName === null || this.memName === undefined) {
                this.confirmText = this.$t('MEM_DETAIL_MSG_NAME')
                this.confirmPopShowYn = true
            } else if (this.memName !== '' && this.memPhone !== '' && this.memEmail !== '') {
                if(!this.regEmail(this.memEmail.trim())) {
                    this.confirmText = this.$t('MEM_DETAIL_MSG_VALI_EMAIL')
                    this.confirmPopShowYn = true
                } else if(!this.regPhoneNumber(this.memPhone.trim())) {
                    this.confirmText = this.$t('MEM_DETAIL_MSG_VALI_PHONE')
                    this.confirmPopShowYn = true
                } else {
                    result = true
                }
            }  else if (this.memEmail === '') {
                this.confirmText = this.$t('MEM_DETAIL_MSG_EMAIL')
                this.confirmPopShowYn = true
            } else {
                this.confirmText = this.$t('MEM_DETAIL_MSG_PHONE')
                this.confirmPopShowYn = true
            }
            return result
        }
    }
}
</script>

<style scoped>
.infoTitleBox {
  height: 100%;
  text-align: center;
}
table {
  table-layout: fixed;
  word-break: break-all;
}
.memberTable {
  width:100%;
  border-collapse: collapse;
}
.memberTable td {
  border-bottom: 1px solid #ccc !important;
}
.memList {
  text-align: center;
  padding: 5px 10px;
}
.addMemberTextArea{
  /* font-size:14px; width: 100%; min-height: 100px; background: #FFF; padding: 0 3rem; opacity:0.9; */

  font-size:14px; width: 100%; background: #FFF; padding: 0 10%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start
}
.memberItemRow{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.memberLogoArea{
  border:1px solid #ccc;
  width: 120px;
  height: 120px;
  border-radius: 120px;
  margin: 0 auto;
  background: #ffffff66;
  position: relative;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 2rem;
}
.memberLogoLabel{
  color: white;
  padding: 0.25rem 0.5rem;
  background-color:black;
  opacity: 0.8;
  font-size:14px;
  white-space: nowrap;
}
.creChanInput{
  /* width:calc(100% - 130px); */
  min-width: 140px;
  border : none;
  /* border-bottom: 1px solid #ccc; */
  white-space: nowrap;
  overflow: scroll hidden;
}
.addTeamMemberArea{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99999;
  height: calc(100% - 50px);
  background-color: white;
}
.tB {
  font-weight: bold;
}

.creMemberBigBtn {
  height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;
/* width: 100%;  */

/* add Jeong */
  width: 90%;
  position: absolute;
  bottom: 10px;
  left: 5%;
}

.userProfileImgWrap {
  border-radius: 100%;
  border:1.5px solid #6768a7;
  background: #6768a745;
  max-width: 200px;
  max-height: 200px;
  min-width: 125px;
  min-height: 125px;
}
.userProfileImgWrap img {
  width: 100%;
}
.nativeServiceBtnWrap {
  padding: 0 10px;
  width: 45px;
  min-height: 25px;
  float: left;
}

.detailLabelText {
  width:10%;
  min-width: 130px;
  line-height: 30px;
}
.nativeServiceBtn {
  float: left;
  width: calc(100% / 4 - 5px);
  height: 100%;
  margin-right: 5px;
  align-items: center;
  justify-content: center;
  padding: 5px;
  display: flex;
  flex-direction: column;
}
.box1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top:1.5rem;
}
.certiIconBox {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}
.certiIconBox > img {
  position: absolute;
  bottom: 5px;
  right: 10px;
}
.myIconBtn {
  padding: 0 8px;
  float: left;
  position: absolute;
  bottom: 0;
  left: 60%;
  transform: translateX(-50%);
  z-index: 9999;
  min-height: 20px;
  border-radius: 5px;
  background: #00000070;
  color: #FFF;
}
.noticeEditBtn {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-top: 2px;
}
.nameInput {
  width: calc(100% - 100px);
  outline: none;
  border: 1px solid #ccc;
}
.height30 {
  line-height: 30px;
}
.btnStyle {
  position:absolute !important;
  bottom:0 !important;
  right: 3rem !important;
}
.actBox {
  min-height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.whiteColor {
  color: #BDBDBD;
}
.excelPopBox {
  width: 100%;
  height: calc(65%-50px);
  padding: 0 2rem;
}
.excelPopBox > p {
  width: 100%;
  height: 40px;
  margin-bottom: 25px;
  text-align: left;
  color: black;
  border-bottom: 1px solid #ccc;
}
.excelPopBox > div {
  width:100%;
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.applyBtnStyle {
  position: absolute !important;
  bottom: 2rem !important;
  right: 3rem !important;
}
.height50 {
  height: 50px;
}
@media screen and (max-width: 300px) {
  .detailLabelText {
    width:8%!important;
    min-width: 60px!important;
  }
  .creChanInput {
    width: calc(100% - 60px);
  }
}
</style>
