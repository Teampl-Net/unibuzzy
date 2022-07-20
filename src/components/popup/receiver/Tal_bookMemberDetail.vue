<template>
<div class="addTeamMemberArea" style="margin-top:50px">

    <!-- <div class="menuHeader" style="box-shadow: 0px 7px 9px -9px #00000036; position: relative; box-sizing: border-box; white-space: nowrap;" >
        <img v-on:click="backClick" class="mtop-05 mleft-1 fl" src="../../../assets/images/common/icon_back.png"/>
        <p style="text-align:left; margin-left:3rem; font-weight:bold;">{{receiverTitle}}</p>
    </div> -->

    <div class="w-100P" style="display: flex; flex-direction: row; justify-content: center; margin-top:1.5rem;">
        <div v-if="!userProfileImg"  class="managerPicImgWrap">
            <img :src="userProfileImg" />
        </div>
        <img v-else src="../../../assets/images/main/main_profile.png" style="  float: left; " />
    </div>

    <div class="addMemberTextArea">
        <div style="width:100%; height: 30px;" class="mtop-2 fl memberItemRow">
            <p class="textLeft font16 fl cBlack tB " style="width:10%; min-width:4rem; line-height: 30px;" @click="testInput">이름</p>
            <p class="fl font16 commonBlack creChanInput" style="line-height: 30px; text-align: left;" v-if="readOnlyYn" >{{memName}}</p>
            <input v-else type="text" placeholder="이름을 입력하세요" class="creChanInput fr"  v-model="memName" >

        </div>

        <div style="width:100%; height: 30px;" class="mtop-2 fl memberItemRow">
            <p class="textLeft font16 fl cBlack tB" style="width:10%; min-width:4rem; line-height: 30px;">이메일</p>

            <p class="fl font16 commonBlack creChanInput" style="line-height: 30px; text-align: left;" v-if="readOnlyYn" >{{memEmail}}</p>
            <input v-else type="text" placeholder="이메일을 입력하세요" class="creChanInput fr"  v-model="memEmail" >

        </div>

        <div style="width:100%; height: 30px; " class="mtop-2 fl memberItemRow">
            <p class="textLeft font16 fl cBlack tB" style="width:10%; min-width:4rem; line-height: 30px;">전화번호</p>
            <p class="fl font16 commonBlack creChanInput" style="line-height: 30px; text-align: left;" v-if="readOnlyYn" >{{memPhone}}</p>
            <input v-else type="text" placeholder="전화번호를 입력하세요" class="creChanInput fr" @keyup.enter="addDirectAddMemList" v-model="memPhone" >
        </div>
        <gBtnSmall v-if="excelPopYn" btnTitle="추가" class="fl" style="position:absolute; bottom:0; right: 3rem;" @click="addDirectAddMemList" />

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
export default {
    components: {
        popUp
    },
    props:{
        propData: {},
        setEditMember:{},
        excelPopYn:{}
    },
    created(){
        console.log('##memberDetail##')
        // console.log(this.propData)
        console.log(this.propData);

        if(this.propData !== null && this.propData !== undefined && this.propData !== ''){
            if(this.propData.userProfileImg){
                this.userProfileImg = this.propData.userProfileImg
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
            }


        }
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
            userProfileImg : undefined

        }
    },
    methods:{
        async deleteManager () {
            console.log('deleteManager Axios param -> result')

            var result = await this.$commonAxiosFunction({
                url: '/tp.deleteManager',
                param: this.propData
            })
            console.log(result)
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
    width:70%;
    min-width: 140px;
    border : none;
    border-bottom: 1px solid #ccc;
    white-space: nowrap;
    overflow: scroll hidden;
}

.addTeamMemberArea{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 50px);
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
    position: fixed;
    bottom: 10px;
    left: 5%;
}

.managerPicImgWrap { width:50%; max-width:200px ; border-radius: 100%; border:1.5px solid #6768a7; background: #6768a745; overflow: hidden; }
.managerPicImgWrap img {width: 100%;}

</style>
