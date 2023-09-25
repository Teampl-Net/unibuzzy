<template>
  <div id="addTeamMemberArea" class="addTeamMemberArea">
    <div class="w100P userDetailHeader">
      <p class="font25 fontBold">Profile</p>
      <img @click="pClosePop" class="cursorP" src="@/assets/images/common/popup_close.png" alt="">
    </div>
    <userImgSelectCompo @closeXPop="closeXPop" :pSelectedIconPath="this.mUserInfo.domainPath + mUserInfo.userProfileImg" :parentSelectedIconFileKey="mUserInfo.picMfilekey"  @no="backClick" v-if="changeUserIconShowYn"/>
      <!-- <div class="menuHeader" style="box-shadow: 0px 7px 9px -9px #00000036; position: relative; box-sizing: border-box; white-space: nowrap;" >
          <img v-on:click="backClick" class="mtop-05 mleft-1 fl" src="@/assets/images/common/icon_back.png"/>
          <p style="text-align:left; margin-left:3rem; font-weight:bold;">{{receiverTitle}}</p>
      </div> -->
    <div class="profileImgWrap w100P fl mbottom-1">
        <div class="profileImgBox" :style="'width: ' + popSize*0.3 + 'px; height: ' + popSize*0.3 + 'px;'">
            <div :style="'background-image: url(' + (this.mUserInfo.domainPath ? this.mUserInfo.domainPath + $changeUrlBackslash(this.mUserInfo.userProfileImg) : this.mUserInfo.userProfileImg) + '); width: ' + popSize*0.3 + 'px; height: ' + popSize*0.3 + 'px;'" class="userProfileImgWrap">
              <img v-if="this.GE_USER.certiDate" class="img-w38" src="@/assets/images/common/userCertiIcon.svg" alt="">
            </div>
        </div>
        <div v-if="selfYn" @click="changeUserImg()" class="font14 selfImg">Change</div>
        <!-- <img v-else src="../../../../public/resource/userCommonIcon/userImg01.png" style="  float: left; " /> -->
    </div>
    <div class="addMemberTextArea fl">
      <div class="fl w100P dispContents">
        <p class="fl commonBlack creChanInput w100P font16 fontBold" v-if="readOnlyYn && !changeYn" >{{memName}}</p>
        <p class="fl commonGray creChanInput w100P font14 " v-if="readOnlyYn && !changeYn && this.GE_USER.certiDate" >{{this.$changeText(this.mUserInfo.userDispMtext)}}</p>
        <img v-if="readOnlyYn && !changeYn && selfYn" src="@/assets/images/contents/noticebox_edit.png"  class="fr cursorP myName" @click="changeUserDispMtext()" >
        <div v-show="changeYn" class="fl creChanInput" style="">
            <input class="fl font16 nameInput" type="text" v-model="memName" @keyup.enter="setDispName" />
            <div class="fl" style="width: 100px">
                <p class="fl mleft-1 font13 lineHeight30" @click="setDispName" >Save</p>
                <p class="fl mleft-1 font13 lineHeight30" @click="changeYn = false">Cancel</p>
            </div>
        </div>
        <p class="fl whiteColor CMiddleBgColor font12 gradeBox" v-if="userGrade !== ''" >{{userGrade}}</p>
      </div>

      <div class="mtop-1 fl w100P infoBox" v-if="!readOnlyYn && !selfYn">
        <img src="/resource/footer/icon_people.svg"  class="img-w20 fl mright-05" alt="">
        <input  type="text" placeholder="이름을 입력하세요" class="creChanInput fr"  v-model="memName" >
      </div>

      <div class="mtop-1 fl w100P infoBox">
        <img src="@/assets/images/editChan/icon_letter.svg"  class="img-w20 fl mright-05" alt="">
        <p class="fl font16 commonDarkGray creChanInput" v-if="readOnlyYn" >{{memEmail ? memEmail : $t('COMMON_MSG_NO_EMAIL')}}</p>
        <input v-else type="text" placeholder="이메일을 입력하세요" class="creChanInput fr"  v-model="memEmail" >
      </div>

      <div class="mtop-1 fl w100P infoBox">
        <img src="@/assets/images/editChan/icon_phoneSolid.svg" class="img-w20 fl mright-05" alt="">
        <p class="fl font16 commonDarkGray creChanInput" v-if="readOnlyYn" >{{memPhone ? memPhone : $t('COMMON_MSG_NO_PHONE')}}</p>
        <input v-else type="text" placeholder="전화번호를 입력하세요" class="creChanInput fr" @keyup.enter="addDirectAddMemList" v-model="memPhone" >
      </div>
      <gBtnSmall v-if="excelPopYn" btnTitle="추가" class="fl" style="position:absolute; bottom:0; right: 3rem;" @click="addDirectAddMemList" />
      <div v-if="readOnlyYn" class="fl w100P mtop-3" style=" min-height: 70px; display: flex; flex-direction: row; justify-content: space-around;">
        <div v-for="(value, index) in profileFunc" :key="index" @click="profileFuncEvent(value.type)" class="funcIconWrap fl" style="display: flex; flex-direction: row; align-items: center; justify-content: center">
          <div class="flexAlignCenter flexColumn">
            <div class="nativeServiceBtnWrap">
              <img v-if="value.type === 'MAIL'" :class="{noData: memEamil === $t('COMMON_MSG_NO_EMAIL')}" src="@/assets/images/editChan/icon_letter.svg"  class="img-w20" alt="">
              <img v-if="value.type === 'PHON'" :class="{noData: memPhone === $t('COMMON_MSG_NO_PHONE')}" src="@/assets/images/editChan/icon_phoneSolid.svg" class="img-w20" alt="">
              <img v-if="value.type === 'TEXT'" :class="{noData: memPhone === $t('COMMON_MSG_NO_PHONE')}" src="@/assets/images/editChan/icon_textSolid.svg"  class="img-w20" alt="">
            </div>
            <p class="font14 fl textLeft commonBlack lineHeight30">{{value.funcTitle}}</p>
          </div>
          <!-- <div class="mleft-05 mright-05" style="color: #BDBDBD" v-if="index !== (profileFunc.length - 1)">|</div> -->
        </div>
      </div>
    </div>
    <div v-if="excelPopYn" class="excelWrap">
      <p class="font20 fontBold">Members added</p>
      <div>
        <table class="memberTable">
          <colgroup>
            <col width="20%">
            <col width="40%">
            <col width="32%">
            <col width="10px">
          </colgroup>
          <tr class="backgroundCCC">
            <th class="font15 w100P textCenter">Name</th>
            <th class="font15 w100P textCenter">Email</th>
            <th class="font15 w100P textCenter">Phone</th>
            <th class="font15 w100P textCenter"></th>
          </tr>
          <tr v-for="(data, index) in memberList" :key='index'>
            <td class="font12 memList">{{data.name}}</td>
            <td class="font12 memList">{{data.email}}</td>
            <td class="font12 memList">{{data.phoneNum}}</td>
            <td class="font16 memList fontBold" @click="deleteMem(data,index)">X</td>
          </tr>
        </table>
      </div>
    </div>
    <gBtnSmall class="saveBtn" v-if="!readOnlyYn" btnTitle="Save" @click="addDirectAddMemList" />
      <!-- <gBtnSmall v-if="propData.managerKey" btnTitle="삭제" class="fl" style="position:absolute; bottom:2rem; right: 3rem; background-color:#ff0000; font-weight:bold;" @click="deleteManager" /> -->
  </div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import { onMessage } from '@/assets/js/webviewInterface'
import userImgSelectCompo from '@/components/pageComponents/myPage/UB_changeUserIcon.vue'
export default {
    data () {
        return {
            memName: '',
            memEmail: '',
            memPhone: '',
            memberList:[],
            addMemYn: false,
            confirmPopShowYn: false,
            tempIndex: null,
            confirmText: '',
            readOnlyYn:false,
            userProfileImg : undefined,
            domainPath : '',
            systemName: 'iOS',
            // mobileYn: this.$getMobileYn(),
            popSize: 0,
            changeUserIconShowYn: false,
            changeUserIconPop: null,
            picMfilekey: null,
            selfYn: false,
            changeYn: false,
            tempUserDispName: '',
            thisUserKey: null,
            profileFunc: [
						{ funcTitle: 'Email', type: 'MAIL'},
						{ funcTitle: 'Call', type: 'PHON'},
						{ funcTitle: 'Message', type: 'TEXT'}],
            userGrade: '',
            mUserInfo: {},
            mUserDetailPopId: ''
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
            if (this.mUserInfo.userEmail)
                this.memEmail = this.mUserInfo.userEmail
            else{ this.memEmail= this.$t('COMMON_MSG_NO_EMAIL')}
            if (this.mUserInfo.userDispMtext)
                this.memName = this.$changeText(this.mUserInfo.userDispMtext)
            if (this.mUserInfo.phoneEnc)
                this.memPhone = this.mUserInfo.phoneEnc
            else{ this.memPhone=  this.$t('COMMON_MSG_NO_PHONE') }
            this.setUserGrade(this.mUserInfo)
            /*
            // debugger
            if(this.propData.userProfileImg){
                this.userProfileImg = this.propData.domainPath + this.propData.userProfileImg
            }
            if(this.propData.readOnlyYn){this.readOnlyYn = true}

                if(this.propData.userDispMtext){
                    this.memName = this.$changeText(this.propData.userDispMtext)
                }else{
                    this.memName = this.$changeText(this.propData.userNameMtext)
                }
            if(this.readOnlyYn){
                if(this.propData.userEmail){ this.memEmail= this.propData.userEmail }else{ this.memEmail= '등록된 이메일이 없습니다.'}
                if(this.propData.phoneEnc){ this.memPhone= this.propData.phoneEnc }else{ this.memPhone= '등록된 번호가 없습니다.' }
                if (this.propData.selfYn) {
                    this.selfYn = this.propData.selfYn

                    if(this.GE_USER.userProfileImg){
                        this.userProfileImg = this.GE_USER.userProfileImg
                        this.domainPath = this.GE_USER.domainPath || ''
                        this.picMfilekey = this.GE_USER.picMfilekey
                    }
                    if (this.GE_USER.userEmail)
                        this.memEmail = this.GE_USER.userEmail
                    else{ this.memEmail= '등록된 이메일이 없습니다.'}
                    if (this.GE_USER.userDispMtext)
                        this.memName = this.$changeText(this.GE_USER.userDispMtext)
                    if (this.GE_USER.phoneEnc)
                        this.memPhone = this.GE_USER.phoneEnc
                    else{ this.memPhone= '등록된 번호가 없습니다.' }
                } else if (this.propData.userKey) {
                    var userKey = this.propData.userKey
                    await this.getMemberListGetUserInfo()

                    // var param = {}
                    // param.userKey
                    // var response = await this.$commonAxiosFunction({
                    // url: '/sUniB/tp.getUserList',
                    // param: param
                    // })
                    // // console.log(response)

                    // var list = await result.data.content
                    // // console.log(list)
                }
            } */
        }
        if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) { this.systemName = localStorage.getItem('systemName') }
        // this.readOnlyYn = false
        // this.getAnotherUserTeamInfo()
        this.$emit('closeLoading')

        var history = this.$store.getters['UB_HISTORY/hStack']
        this.mUserDetailPopId = 'userDetailPop' + history.length
        history.push(this.mUserDetailPopId)
        this.$store.commit('UB_HISTORY/updateStack', history)
    },
	methods: {
    backClick () {
        var hStack = this.$store.getters['UB_HISTORY/hStack']
        var removePage = hStack[hStack.length - 1]
        if (this.mUserDetailPopId === hStack[hStack.length - 1]) {
            hStack = hStack.filter((element, index) => index < hStack.length - 1)
            this.$store.commit('UB_HISTORY/setRemovePage', removePage)
            this.$store.commit('UB_HISTORY/updateStack', hStack)
            this.pClosePop()
        } else {

        }
    },
		getUserInfoEmail() {
			if (this.memEmail) {
				if (this.memEmail === this.$t('COMMON_MSG_NO_EMAIL')) {
						return false
				} else {
						return true
					}
				}
			},
        profileFuncEvent (type) {
            if (type === 'ALIM') {
                this.sendPushAlim()
						} else if (type === 'MAIL') {
							if (this.memEmail === this.$t('COMMON_MSG_NO_EMAIL')) {
								return
							} else {
								this.sendMail(this.memEmail)
							}
						} else if (type === 'PHON') {
							if (this.memPhone === this.$t('COMMON_MSG_NO_PHONE')) {
								return false
							} else {
								this.callPhone(this.memPhone)
							}
						} else if (type === 'TEXT') {
							if (this.memPhone === this.$t('COMMON_MSG_NO_PHONE')) {
								return
							} else {
								this.sendSms(this.memPhone)
							}
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
						console.log('this.mUserInfo', this.mUserInfo)
        },
        async setUserGrade (anotherAuth) {
        if (anotherAuth) {
            console.log(anotherAuth)
            var grade = this.$getFollowerType(anotherAuth)
            console.log('##########################################')
            console.log(grade)
            this.userGrade = grade
        }
        },
        sendPushAlim () {
            var param = {}
            param.targetType = 'writeContents'
            param.contentsJobkindId = 'ALIM'
            param.teamKey =  this.propData.teamKey
            param.targetKey =  this.propData.teamKey
            param.currentTeamKey =  this.propData.teamKey
            param.userKey = this.propData.userKey
            param.userName = this.memName
            param.targetUserKey = this.thisUserKey
            if (this.propData.userDispMtext) { param.userDispMtext = this.propData.userDispMtext } else { param.userNameMtext = this.propData.userNameMtext }
            param.replyPopYn = true
            if (this.propData.userDispMtext) { param.creUserName = this.propData.userDispMtext } else { param.creUserName = this.propData.userNameMtext }
            param.creUserKey = this.propData.userKey
            this.$emit('openPop', param)
        },
        async setDispName () {
            // KO$^$수망고$#$EN$^$sumango
            var param = {}
            var user = {}
            user.userKey = this.GE_USER.userKey
            user.userDispMtext = 'EN$^$' + this.memName
            param.user = user
            param.updateYn = true
            var result = await this.$changeDispName(param)
            // console.log(result)
            if (result.data) {
                this.$store.commit('UB_USER/MU_USER', result.data.userInfo)
                localStorage.setItem('sessionUser', JSON.stringify(result.data))
                this.changeYn = false
                this.$emit('closeXPop', true)
                // this.userInfo.userDispMtext = await this.$changeText(param.user.userDispMtext)
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
                // console.log(history)
                history.push(this.changeUserIconPop)
                this.$store.commit('UB_HISTORY/updateStack', history)
                // console.log(this.$store.getters['UB_HISTORY/hStack'])
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
                alert('전화번호 정보가 없습니다')
            }
        },
        sendMail (email) {
            if (email != undefined && email != null && email != '') {
                if(this.systemName !== 'Android' && this.systemName !== 'android')
                    document.location.href='mailto:' + email
                else
                    onMessage('REQ', 'sendMail', email)
            } else {
                alert('이메일 정보가 없습니다')
            }
        },
        sendSms (num) {
            if (num != undefined && num != null && num != '') {
                if(this.systemName !== 'Android' && this.systemName !== 'android')
                    document.location.href='sms:' + num
                else
                    onMessage('REQ', 'sendSms', num)
            } else {
                alert('전화번호 정보가 없습니다')
            }
        },
        async deleteManager () {

            var result = await this.$commonAxiosFunction({
                url: '/sUniB/tp.deleteManager',
                param: this.propData
            })
            if(result.data === true){this.$emit('deleteManager')}

        },
        testInput(){
            this.memName = '11111wwww'
            this.memEmail = '11111@naver.com'
            this.memPhone = '01011111111'
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
        ok(){
            this.confirmPopShowYn = false
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
                this.confirmText = '이름을 입력하세요.'
                this.confirmPopShowYn = true
            } else if (this.memName !== '' && this.memPhone !== '' && this.memEmail !== '') {
                if(!this.regEmail(this.memEmail.trim())) {
                    this.confirmText = '이메일 형식이 유효하지 않습니다.'
                    this.confirmPopShowYn = true
                } else if(!this.regPhoneNumber(this.memPhone.trim())) {
                    this.confirmText = '전화번호 형식이 유효하지 않습니다.'
                    this.confirmPopShowYn = true
                } else {
                    result = true
                }
            }  else if (this.memEmail === '') {
                this.confirmText = '이메일을 입력하세요.'
                this.confirmPopShowYn = true
            } else {
                this.confirmText = '전화번호를 입력하세요.'
                this.confirmPopShowYn = true
            }
            return result
        },
        async getUserInform () {
            var test = await this.$getUserInform()
            debugger
            return this.userInfo
        }
    }
}
</script>

<style scoped>
.noData {
	opacity:0.3;
}
table {
  table-layout: fixed;
  word-break: break-all;
}
.memberTable {
  width:100% ;
  border-collapse: collapse;
}
.memberTable td {
  border-bottom: 1px solid #ccc !important;
}
.memberTable tr:last-child {
  height: 50px;
}
.memList {
  text-align: center;
  padding: 5px 10px;
}
.addMemberTextArea {
  /* font-size:14px; width: 100%; min-height: 100px; background: #FFF; padding: 0 3rem; opacity:0.9; */

  font-size:14px; width: 100%; background: #FFF; padding: 0 10%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start
}

.profileImgWrap {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1.5rem;
}
.creChanInput{
  /* width:calc(100% - 130px); */
  min-width: 140px;
  border : none;
  word-break: break-all;
  /* border-bottom: 1px solid #ccc; */
  /* white-space: nowrap; */
  /* overflow: scroll hidden; */
}

.addTeamMemberArea{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000001;
  width: 80%;
  height: 80%;
  background-color: white;
  border-radius: 10px;
}
.userProfileImgWrap {
  border-radius: 100%;
  border:1.5px solid #6768a7;
  background: #6768a745;
  max-width: 200px;
  max-height: 200px;
  min-width: 125px;
  min-height: 125px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}
.userProfileImgWrap img {
  width: 100%;
  position: absolute;
  bottom: 5px;
  right: 10px;
}
.nativeServiceBtnWrap {
  padding: 0 10px;
  width: 45px;
  min-height: 25px;
  float: left;
}
.userDetailHeader {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}
.userDetailHeader > img {
  width: 25px;
  position: absolute;
  right: 20px;
  top: 20px;
}
.profileImgBox {
  display: flex;
  align-items: center;
  justify-content: center;
}
.selfImg {
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
.myName {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-top: 2px;
}
.nameInput {
  width:calc(100% - 100px);
  outline: none;
  border: 1px solid #ccc;
}
.gradeBox {
  padding: 2px 6px;
  border-radius:10px;
}
.infoBox {
  display: flex;
  padding-left:5%;
}
.infoBox > p {
  line-height: 30px;
  text-align: left;
  width: calc(100% - 20px);
}
.excelWrap {
  width: 100%;
  height: calc(65%-50px);
  padding: 0 2rem;
}
.excelWrap > p {
  width: 100%;
  height: 40px;
  margin-bottom: 25px;
  text-align: left;
  color: black;
  border-bottom: 1px solid #ccc;
}
.excelWrap > div {
  width:100%;
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.backgroundCCC {
  background-color: #ccc;
}
.saveBtn {
  position: absolute !important;
  bottom: 2rem !important;
  right: 3rem !important;
}
@media screen and (max-width: 300px) {
  .creChanInput {
    width: calc(100% - 60px);
  }
}
@media (max-width: 350px) {
  .funcIconWrap div:nth-child(2) {
    margin: 0 2px !important;
  }
}
</style>
