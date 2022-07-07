<template>
<div class="addTeamMemberArea" style="margin-top:50px">

    <!-- <div class="menuHeader" style="box-shadow: 0px 7px 9px -9px #00000036; position: relative; box-sizing: border-box; white-space: nowrap;" >
        <img v-on:click="backClick" class="mtop-05 mleft-1 fl" src="../../../assets/images/common/icon_back.png"/>
        <p style="text-align:left; margin-left:3rem; font-weight:bold;">{{receiverTitle}}</p>
    </div> -->

    <div class="addMemberTextArea">
        <div style="width:100%; height: 30px;" class="mtop-2 fl">
            <p class="textLeft font16 fl cBlack tB" style="line-height: 30px;" @click="testInput">이름</p>
            <input type="text" placeholder="이름을 입력하세요" class="creChanInput fr"  v-model="memName" >
        </div>

        <div style="width:100%; height: 30px;" class="mtop-2 fl">
            <p class="textLeft font16 fl cBlack tB" style="line-height: 30px;">이메일</p>
            <input type="text" placeholder="이메일을 입력하세요" class="creChanInput fr"  v-model="memEmail" >
        </div>

        <div style="width:100%; height: 30px; " class="mtop-2 fl">
            <p class="textLeft font16 fl cBlack tB" style="line-height: 30px;">전화번호</p>
            <input type="text" placeholder="전화번호를 입력하세요" class="creChanInput fr" @keyup.enter="addDirectAddMemList" v-model="memPhone" >
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
    <gBtnSmall btnTitle="적용" style="position:absolute; bottom:2rem; right: 3rem;" @click="addDirectAddMemList" />
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
        // console.log('##memberDetail##')
        // console.log(this.propData)
        if(this.propData !== null && this.propData !== undefined && this.propData !== ''){
            this.memName = this.$changeText(this.propData.userDispMtext)
            this.memEmail= this.propData.userEmail
            this.memPhone = this.propData.phoneEnc
        } else {

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
        confirmText: ''
        }
    },
    methods:{
        testInput(){
            this.memName = '정재준'
            this.memEmail = 'wowns4963@naver.com'
            this.memPhone = '01050044963'
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
                    param.userDispMtext = 'KO$^$' + this.memName
                    param.userEmail = this.memEmail
                    param.userPhone = this.memPhone
                    this.$emit('addDirectAddMemList', param)
                }

            }
        },
        async saveBookMember(){
                if(this.propData.currentCabinetKey){
                    var param = new Object()
                    var mCabContents = new Object()
                    mCabContents.jobkindId = 'USER'
                    mCabContents.cabinetKey = this.propData.currentCabinetKey
                    if (this.propData.mccKey) {
                        mCabContents.mccKey = this.propData.mccKey
                        mCabContents.ownUserKey = this.propData.ownUserKey //update
                    }
                    mCabContents.inEmail = this.memEmail
                    mCabContents.inPhone = this.memPhone
                    mCabContents.inUserName = this.memName
                    param.mCabContents = mCabContents
                    console.log(param)
                    var result = await this.$saveMCabContents(param)
                    console.log(result)
                    if (result.data.result === true) {
                        if (result.data.message === 'OK') {
                            this.$emit('closeXPop', true)
                        } else {
                            this.confirmPopShowYn = true
                            this.confirmText = result.data.message
                        }
                    }
                }else{
                    await this.saveFollower()
                }
        },
        async saveFollower(){
            var param = {}
            var mCabContents = new Object()
            console.log(this.propData)
            param.teamKey = this.propData.currentTeamKey
            /* if (this.propData.followerKey) {
                mCabContents.followerKey = this.propData.followerKey
                // mCabContents.followerType = this.propData.followerType //update
            } */
            param.inEmail = this.memEmail
            param.inPhone = this.memPhone
            param.inUserName = this.memName

             var result = await this.$commonAxiosFunction({
                url: '/api/tp.saveManager',
                param: param
            })
            if (result.data.result === true) {
                if(result.data.message === 'OK') {
                    this.$emit('closeXPop', true)
                } else {
                    this.confirmText = result.data.message
                    this.confirmPopShowYn = true
                }
            }
            console.log(result)

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

    font-size:14px; width: 100%; height: 35%; background: #FFF; padding: 0 3rem; opacity:0.9;
    position: relative;
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
    min-width: 170px;
    border: 1px solid #ccc;
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
</style>
