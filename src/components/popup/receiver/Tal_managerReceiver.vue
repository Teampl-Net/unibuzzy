<template>
<div style="height: 100vh; background-color:white; width:100vw; z-index:9999; position:absolute; top:0; left:0">

    <div class="menuHeader" style="box-shadow: 0px 7px 9px -9px #00000036; position: relative; box-sizing: border-box; white-space: nowrap;" >
        <img v-on:click="backClick" class="mtop-05 mleft-1 fl" src="../../../assets/images/common/icon_back.png"/>
        <p style="text-align:center; margin-left:3rem; font-weight:bold; font-size:20px">{{receiverTitle}}</p>
        <gBtnSmall :btnTitle="memberBtnText" @click="memberEditClick" class="fl" style="right:0; top:25px; transform: translate(-50%, -50%);position:absolute;"  v-if="detailOpenYn" />
    </div>

    <div style="margin:3rem 2rem; height:calc(50% - 50px); overflow: auto;" :class="{longHeight : selectPopYn !== true}" >
    <!-- <div style="margin:3rem 2rem; height:100%; overflow: auto;" > -->
        <div style=" border-bottom:1px solid #ccc; height:2.5rem; margin-top:20px; " v-if="!detailOpenYn" >
            <p class="fl mright-05" style="color:black; font-weight:bold; font-size:17px">팀플</p> <img class="fl mright-05" src="../../../assets/images/main/main_subscriber.png" /> <p class="fl mright-05" style="font-size:17px">{{100}}</p>
            <gBtnSmall :btnTitle="teamBtnText"  @click="teamEditClick" />
        </div>

        <div style="margin: 1rem 0rem;">
            <gSearchBox @changeSearchList="changeSearchList" @openFindPop="test" :resultSearchKeyList="this.resultSearchKeyList" />
            <transition name="showModal">
                <findContentsList @addSubHistory="addSubHistory" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
            </transition>
        </div>
        <teamList :listData="dummyList" @openDetail='openTeamDetailPop' v-if="!detailOpenYn" :editYn='teamEditYn' />
        <memberList :listData="clickList" v-if="detailOpenYn" style="margin-top:30px;" :editYn='memberEditYn' />

    </div>

    <div v-if="selectPopYn" style="width: 100vw; height:calc(50% - 50px); background-color:white; position: absolute; left:0; bottom:0; box-shadow: 0px -7px 9px -9px #00000036;">
        <!-- 설명 -->
        <p class="channelMenuTitle" style="margin-top:1.6rem; margin-left: calc(1rem + 20px)">설명</p>

        <div class="channelItemExplain" style="" v-html="explainText"></div>

        <div style="position: absolute; right: 2rem; bottom: 2rem;">
            <gBtnSmall class="btnBig  " v-on:click="this.$emit('closePop')" btnTitle="닫기" style="margin-left:10px"/>
            <gBtnSmall class="btnBig" v-on:click="setResult" btnTitle="적용" style="margin-right:10px"/>
        </div>
    </div>
 </div>

</template>

<script>
import findContentsList from '../Tal_findContentsList.vue'
import teamList from './Tal_receiverTeamList.vue'
import memberList from './Tal_receiverTeamMemberList.vue'
export default {
    props:{selectPopYn:{}},
    mounted(){
        // if(selectPopYn = )
    },
    components:{ findContentsList,teamList,memberList},
    data(){
        return{
            teamEditYn:false,
            teamBtnText:'편집',
            memberEditYn:false,
            memberBtnText:'편집',
            detailOpenYn:false,
            changeSearchList:[],
            findPopShowYn : false,
            findKeyList: {},
            resultSearchKeyList: [] ,
            dummyList : [
                {receiverTeamColor:'#ff9999', reveiverTeamName: '관리자', subscrib:'4',team:[
                    {name: '최병진', grade : '매니저',creDate:'2021.12.01 09:55:32', email:'choi123@susoft.co.kr', phone :'010-0000-1111'},
                    {name: '황수민', grade : '구성원',creDate:'2021.12.11 09:55:32', email:'sumango@susoft.co.kr', phone :'010-1111-1111'},
                    {name: '정재준', grade : '구성원',creDate:'2022.01.04 09:55:32', email:'jeong@susoft.co.kr', phone :'010-2222-1111'},
                    {name: '최유민', grade : '구성원',creDate:'2022.02.20 09:55:32', email:'umin@susoft.co.kr', phone :'010-3333-1111'}]
                },
                {receiverTeamColor:'#99ff99', reveiverTeamName: '더알림 프로젝트', subscrib:'4',team:[
                    {name: '최병진', grade : '매니저',creDate:'2021.12.01 09:55:32', email:'choi123@susoft.co.kr', phone :'010-1234-5551'},
                    {name: '황수민', grade : '구성원',creDate:'2021.12.11 09:55:32', email:'sumango@susoft.co.kr', phone :'010-5555-1235'},
                    {name: '정재준', grade : '구성원',creDate:'2022.01.04 09:55:32', email:'jeong@susoft.co.kr', phone :'010-4567-1111'},
                    {name: '최유민', grade : '구성원',creDate:'2022.02.20 09:55:32', email:'umin@susoft.co.kr', phone :'010-8764-1235'}]
                },
                {receiverTeamColor:'#9999ff', reveiverTeamName: '런하이 프로젝트', subscrib:'4',team:[
                    {name: '이충원', grade : '매니저',creDate:'2021.12.01 09:55:32', email:'lee@susoft.co.kr', phone :'010-6764-1357'},
                    {name: '최영환', grade : '매니저',creDate:'2021.12.11 09:55:32', email:'hanw@susoft.co.kr', phone :'010-3782-5786'},
                    {name: '김정호', grade : '매니저',creDate:'2022.01.04 09:55:32', email:'Kim123@susoft.co.kr', phone :'010-1365-5683'},
                    {name: '안영준', grade : '구성원',creDate:'2022.02.20 09:55:32', email:'an0@susoft.co.kr', phone :'010-1257-3225'},
                    {name: '박지현', grade : '구성원',creDate:'2022.03.13 09:55:32', email:'jihyun@susoft.co.kr', phone :'010-8742-4567'},
                    {name: '공유택', grade : '구성원',creDate:'2022.04.22 09:55:32', email:'share@susoft.co.kr', phone :'010-1578-8854'}]
                }],
            clickList:{},

            receiverTitle:'수신자 그룹 관리',
        }
    },
    methods : {
        teamEditClick(){
            if(this.teamEditYn){
                this.teamEditYn = false
                this.teamBtnText = '편집'
            }else{
                this.teamEditYn = true
                this.teamBtnText = '저장'
            }
        },
        memberEditClick(){
            // alert('팀원 수정')
             if(this.memberEditYn){

                this.memberBtnText = '편집'
                this.memberEditYn = false
            }else{
                this.memberBtnText = '저장'
                this.memberEditYn = true
            }

        },
        backClick(){
            if(this.detailOpenYn){
                this.detailOpenYn = false
                this.receiverTitle = '수신자 그룹 관리'
            }else{
                this.$emit('closePop')
            }

        },
        openTeamDetailPop(data){
            if(!this.teamEditYn){
                this.detailOpenYn = true
                this.receiverTitle = data.reveiverTeamName
                this.clickList = data
            }
            // alert(this.clickList)

        },
        test(){
            this.findPopShowYn = true
        },

        closeSearchPop(){
            this.findPopShowYn = false
        },

        async requestSearchList (param) {
            if (param) {
                if (param.searchKey !== undefined && param.searchKey !== null && param.searchKey !== '') {
                this.findKeyList.searchKey = param.searchKey
                } if (param.creTeamNameMtext !== undefined && param.creTeamNameMtext !== null && param.creTeamNameMtext !== '') {
                this.findKeyList.creTeamNameMtext = param.creTeamNameMtext
                } if (param.toCreDateStr !== undefined && param.toCreDateStr !== null && param.toCreDateStr !== '') {
                this.findKeyList.toCreDateStr = param.toCreDateStr
                } if (param.fromCreDateStr !== undefined && param.fromCreDateStr !== null && param.fromCreDateStr !== '') {
                this.findKeyList.fromCreDateStr = param.fromCreDateStr
                }
            }
            this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
            await this.getPushContentsList()
        },
        async changeSearchList (type) {
            if (type === 'searchKey') {
                delete this.findKeyList.searchKey
            } else if (type === 'creTeamNameMtext') { delete this.findKeyList.creTeamNameMtext } else if (type === 'creDate') {
                delete this.findKeyList.toCreDateStr
                delete this.findKeyList.fromCreDateStr
            }
            this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
            await this.getPushContentsList()
        },

        addSubHistory (pageName) {
            // eslint-disable-next-line no-array-constructor
            var sHistory = new Array()
            if (this.subHistoryList) {
                sHistory = this.subHistoryList
            }
            sHistory.push(pageName)
            this.subHistoryList = sHistory
        },


    }
}
</script>

<style >
.menuHeader {padding-top:0.5rem; width: 100%; height: 50px; border-bottom: 1px solid #fff;}
.menuHeader p{font-size: 16px; text-align: center; line-height: 2.5rem;}
.menuHeader img{ width: 0.8rem; line-height: 50px;}

.longHeight{
height:100% !important;
}
</style>
