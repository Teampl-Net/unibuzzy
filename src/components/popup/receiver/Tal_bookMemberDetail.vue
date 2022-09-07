<template>
<div id="addTeamMemberArea" class="addTeamMemberArea" style="margin-top:50px">
<userImgSelectCompo @closeXPop="closeXPop" :pSelectedIconPath="userProfileImg" :parentSelectedIconFileKey="picMfilekey"  @no="backClick" v-if="changeUserIconShowYn"/>
    <!-- <div class="menuHeader" style="box-shadow: 0px 7px 9px -9px #00000036; position: relative; box-sizing: border-box; white-space: nowrap;" >
        <img v-on:click="backClick" class="mtop-05 mleft-1 fl" src="../../../assets/images/common/icon_back.png"/>
        <p style="text-align:left; margin-left:3rem; font-weight:bold;">{{receiverTitle}}</p>
    </div> -->
    <div class="w-100P" style="display: flex; flex-direction: row; justify-content: center; margin-top:1.5rem; position: relative;">
        <div v-if="userProfileImg" :style="'background-image: url(' + userProfileImg + '); width: ' + popSize*0.3 + 'px; height: ' + popSize*0.3 + 'px;' " style="background-size: cover; background-repeat: no-repeat; background-position: center;" class="managerPicImgWrap">
            <img :src="userProfileImg" />
        </div>
        <div v-if="selfYn" @click="changeUserImg()" class="font14" style="padding: 0 8px; float: left; position: absolute; bottom: 0; left: 60%; transform: translateX(-50%); z-index: 9999; min-height: 20px; border-radius: 5px; background: #00000070; color: #FFF;">변경</div>
        <!-- <img v-else src="../../../assets/images/main/main_profile.png" style="  float: left; " /> -->
    </div>
    <div class="addMemberTextArea">
        <div style="width:100%; height: 30px;" class="mtop-2 fl memberItemRow">
            <p class="textLeft font16 fl cBlack tB detailLabelText" >이름</p>
            <p class="fl font16 commonBlack creChanInput" style="line-height: 30px; text-align: left;" v-if="readOnlyYn && !changeYn" >{{memName}}</p>
            <input v-if="!readOnlyYn && !changeYn" type="text" placeholder="이름을 입력하세요" class="creChanInput fr"  v-model="memName" >
            <img v-if="readOnlyYn && !changeYn" src="../../../assets/images/push/noticebox_edit.png" style="width: 20px; height: 20px; margin-left: 10px; margin-top: 2px;" class="fr cursorP" @click="changeUserDispMtext()" >
            <div v-show="changeYn" class="fl creChanInput" style="">
                <input class="fl font16" type="text" v-model="memName" style="width:calc(100% - 100px); outline: none; border: 1px solid #ccc;" @keyup.enter="setDispName" />
                <div class="fl" style="width: 100px">
                    <p class="fl mleft-1 font13" style="line-height:30px" @click="setDispName" >확인</p>
                    <p class="fl mleft-1 font13" style="line-height:30px" @click="changeYn = false">취소</p>
               </div>
            </div>
        </div>
        <div style="width:100%; height: 30px; position: relative;" class="mtop-2 fl memberItemRow">
            <p class="textLeft font16 fl cBlack tB detailLabelText" >이메일</p>

            <p class="fl font16 commonBlack creChanInput" style="line-height: 30px; text-align: left;" v-if="readOnlyYn" >{{memEmail}}</p>
            <input v-else type="text" placeholder="이메일을 입력하세요" class="creChanInput fr"  v-model="memEmail" >
            <!-- <img src="../../../assets/images/common/sendMailIcon.svg" @click="sendMail(memEmail)" style="width: 30px; position: absolute; right: 0; " alt=""> -->

        </div>

        <div style="width:100%; height: 30px; position: relative; " class="mtop-2 fl memberItemRow">
            <p class="textLeft font16 fl cBlack tB detailLabelText" >전화번호</p>
            <p class="fl font16 commonBlack creChanInput"  style="line-height: 30px; text-align: left;" v-if="readOnlyYn" >{{memPhone}}</p>
            <input v-else type="text" placeholder="전화번호를 입력하세요" class="creChanInput fr" @keyup.enter="addDirectAddMemList" v-model="memPhone" >
            <!-- <img src="../../../assets/images/common/sendSmsIcon.svg" @click="sendSms(memPhone)" style="width: 30px; position: absolute; right: 0; " alt="">
            <img src="../../../assets/images/common/callPhoneIcon.svg" @click="callPhone(memPhone)" style="width: 30px; position: absolute; right: 40px; " alt=""> -->
        </div>
        <gBtnSmall v-if="excelPopYn" btnTitle="추가" class="fl" style="position:absolute; bottom:0; right: 3rem;" @click="addDirectAddMemList" />
        <div v-if="readOnlyYn && mobileYn" style="width: 100%; background: #A9AACD50; margin-top: 30px; border-radius: 10px; min-height: 70px;">
            <div class="nativeServiceBtn" style=""  @click="sendPushAlim()">
                <div class="nativeServiceBtnWrap">
                    <img src="../../../assets/images/common/icon_message_solid.svg" style="width: 75%; margin-top: 5px; " alt="">
                </div>
                <p class="font15 fl textLeft commonBlack" style="line-height: 30px;">알림작성</p>
            </div>
            <div class="nativeServiceBtn" style="border-left: 1px solid  #ccc;" @click="sendMail(memEmail)">
                <div class="nativeServiceBtnWrap">
                    <img src="../../../assets/images/common/sendMailIcon.svg"  style="width: 100%; " alt="">
                </div>
                <p class="font15 fl textLeft commonBlack" style="line-height: 30px;">메일쓰기</p>
            </div>
            <div class="nativeServiceBtn" style="border-left: 1px solid  #ccc;"  @click="callPhone(memPhone)">
                <div class="nativeServiceBtnWrap">
                    <img src="../../../assets/images/common/callPhoneIcon.svg" style="width: 100%; " alt="">
                </div>
                <p class="font15 fl textLeft commonBlack" style="line-height: 30px;">전화걸기</p>
            </div>
            <div class="nativeServiceBtn"  style="border-left: 1px solid  #ccc;" @click="sendSms(memPhone)">
                <div class="nativeServiceBtnWrap">
                    <img src="../../../assets/images/common/sendSmsIcon.svg"  style="width: 100%; " alt="">
                </div>
                <p class="font15 fl textLeft commonBlack" style="line-height: 30px;">문자쓰기</p>
            </div>
        </div>
    </div>

    <div v-if="excelPopYn" style="width: 100%; height: calc(65%-50px); padding: 0 2rem;">
        <p class="font20 fontBold" style="width: 100%; height: 40px; margin-bottom: 25px; text-align: left; color: black; border-bottom: 1px solid #ccc;">추가된 구성원</p>
        <div style="width:100%; max-height: 200px; overflow-y: scroll; overflow-x: hidden; ">
            <table class="memberTable" style="width:100% ; border-collapse: collapse;">
                <colgroup>
                    <col width="20%">
                    <col width="40%">
                    <col width="32%">
                    <col width="10px">
                </colgroup>
                <tr style = "background-color:#ccc;">
                    <th class="font15" style="height: 100%; text-align: center;">이름</th>
                    <th class="font15" style="height: 100%; text-align: center;">이메일</th>
                    <th class="font15" style="height: 100%; text-align: center;">전화번호</th>
                    <th class="font15" style="height: 100%; text-align: center;"></th>
                </tr>
                <tr v-for="(data, index) in memberList" :key='index' style="height:50px;">
                    <td class="font12 memList">{{data.name}}</td>
                    <td class="font12 memList">{{data.email}}</td>
                    <td class="font12 memList">{{data.phoneNum}}</td>
                    <td class="font16 memList fontBold" @click="deleteMem(data,index)">X</td>
                </tr>
            </table>
        </div>

    </div>
    <gBtnSmall v-if="!readOnlyYn" btnTitle="적용" style="position:absolute; bottom:2rem; right: 3rem;" @click="addDirectAddMemList" />
    <gBtnSmall v-if="propData.managerKey" btnTitle="삭제" class="fl" style="position:absolute; bottom:2rem; right: 3rem; background-color:#ff0000; font-weight:bold;" @click="deleteManager" />
</div>
<popUp v-if="confirmPopShowYn" @no='confirmPopShowYn = false' :confirmText='confirmText' confirmType='timeout' />
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import popUp from '../confirmPop/Tal_commonConfirmPop.vue'
import { onMessage } from '../../../assets/js/webviewInterface'
import userImgSelectCompo from '../../../components/pageComponents/myPage/Tal_changeUserIcon.vue'
export default {
    components: {
        popUp,
        userImgSelectCompo
    },
    props:{
        propData: {},
        setEditMember:{},
        excelPopYn:{}
    },
    mounted () {
        this.popSize = document.getElementById('addTeamMemberArea').scrollWidth
    },
    created(){
        console.log(this.propData)
        if(this.propData !== null && this.propData !== undefined && this.propData !== ''){
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
                    console.log(JSON.parse(localStorage.getItem('sessionUser')))
                    if(JSON.parse(localStorage.getItem('sessionUser')).userProfileImg){
                        console.log(JSON.parse(localStorage.getItem('sessionUser')))
                        this.userProfileImg = JSON.parse(localStorage.getItem('sessionUser')).userProfileImg
                        this.picMfilekey = JSON.parse(localStorage.getItem('sessionUser')).picMfilekey
                    }
                    if (JSON.parse(localStorage.getItem('sessionUser')).userEmail)
                        this.memEmail = JSON.parse(localStorage.getItem('sessionUser')).userEmail
                    else{ this.memEmail= '등록된 이메일이 없습니다.'}
                    if (JSON.parse(localStorage.getItem('sessionUser')).userDispMtext)
                        this.memName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext)
                    if (JSON.parse(localStorage.getItem('sessionUser')).phoneEnc)
                        this.memPhone = JSON.parse(localStorage.getItem('sessionUser')).phoneEnc
                    else{ this.memPhone= '등록된 번호가 없습니다.' }
                }
            }


        }
        if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) { this.systemName = localStorage.getItem('systemName') }
        // this.readOnlyYn = false
    },
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
            systemName: 'iOS',
            mobileYn: this.$getMobileYn(),
            popSize: 0,
            changeUserIconShowYn: false,
            changeUserIconPop: null,
            picMfilekey: null,
            selfYn: false,
            changeYn: false,
            tempUserDispName: ''

        }
    },
    methods:{
        sendPushAlim () {
            var param = {}
            param.targetType = 'writePush'
            param.teamKey =  this.propData.teamKey
            param.userKey = this.propData.userKey
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
            user.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
            user.userDispMtext = 'KO$^$' + this.memName
            param.user = user
            param.updateYn = true
            var result = await this.$changeDispName(param)
            console.log(result)
            if (result.data.message === 'OK') {
                // this.userInfo.userDispMtext =  this.$changeText(param.user.userDispMtext)
                var tempLocalStorage = JSON.parse(localStorage.getItem('sessionUser'))
                tempLocalStorage.userDispMtext = 'KO$^$' + this.memName
                localStorage.setItem('sessionUser', JSON.stringify(tempLocalStorage))
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
                var history = this.$store.getters.hStack
                this.changeUserIconPop = 'changeUserIconPop' + history.length
                console.log(history)
                history.push(this.changeUserIconPop)
                this.$store.commit('updateStack', history)
                console.log(this.$store.getters.hStack)
            }
        },
        backClick () {
            var hStack = this.$store.getters.hStack
            var removePage = hStack[hStack.length - 1]
            if (this.changeUserIconPop === hStack[hStack.length - 1]) {
                hStack = hStack.filter((element, index) => index < hStack.length - 1)
                this.$store.commit('setRemovePage', removePage)
                this.$store.commit('updateStack', hStack)
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
                url: 'https://mo.d-alim.com:10443/tp.deleteManager',
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
                    param.userDispMtext = "KO$^$"+this.memName
                    param.userNameMtext = "KO$^$"+this.memName

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
    }
}
</script>

<style >
table {
    table-layout: fixed;
    word-break: break-all;
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

    font-size:14px; width: 100%; height: 35%; background: #FFF; padding: 0 10%;
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
border:1px solid #ccc; width: 120px; height: 120px; border-radius: 120px; margin: 0 auto;  background: #ffffff66; position: relative;display:flex; flex-direction: column; justify-content: center; align-items: center;
margin-top: 3rem;
margin-bottom: 2rem;
}

.memberLogoLabel{
    color: white; padding: 0.25rem 0.5rem;background-color:black; opacity: 0.8; font-size:14px;white-space: nowrap;
}

.creChanInput{
    width:calc(100% - 130px);
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
    height: calc(100% - 50px);
    background-color: white;

}


.tB{
    font-weight: bold;
}

.creMemberBigBtn{
    height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;
  /* width: 100%;  */

  /* add Jeong */
    width: 90%;
    position: absolute;
    bottom: 10px;
    left: 5%;
}

.managerPicImgWrap { width:50%; border-radius: 100%; border:1.5px solid #6768a7; background: #6768a745; overflow: hidden; }
.managerPicImgWrap img {width: 100%;}
.nativeServiceBtnWrap{padding: 0 10px; width: 45px; min-height: 25px; float: left; }

.detailLabelText {width:10%; min-width: 130px; line-height: 30px;}
.nativeServiceBtn { float: left; width: calc(100% / 4 - 5px); height: 100%; margin-right: 5px; align-items: center; justify-content: center; padding: 5px; display: flex; flex-direction: column;}
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
