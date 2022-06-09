<template>
<div style="height: 100vh; background-color:white; width:100vw; z-index:9999; position:absolute; top:0; left:0">

    <div class="menuHeader" style="box-shadow: 0px 7px 9px -9px #00000036; position: relative; box-sizing: border-box; white-space: nowrap;" >
        <img v-on:click="backClick" class="mtop-05 mleft-1 fl" src="../../../assets/images/common/icon_back.png"/>
        <p style="text-align:center; margin-left:3rem; font-weight:bold; font-size:20px">{{receiverTitle}}</p>
        <gBtnSmall :btnTitle="memberBtnText" @click="memberEditClick" class="fl" style="right:0; top:25px; transform: translate(-50%, -50%);position:absolute;"  v-if="detailOpenYn && selectPopYn !== true " />
    </div>

    <div class="pagePaddingWrap" style="height:calc(50% - 50px); padding-top: 0; overflow: auto;" :class="{longHeight : selectPopYn !== true}" >
    <!-- <div style="margin:3rem 2rem; height:100%; overflow: auto;" > -->
        <div style=" border-bottom:1px solid #ccc; padding: 5px 0; height:40px; margin-top:10px; " v-if="!detailOpenYn" >
            <p class="fl mright-05 font18 h-100P colorBlack fontBold">팀플</p>
            <div class="mleft-05 fl" style="min-width: 100px; height: 100%; ">
                <img class="fl" style="margin-top: 4px;" src="../../../assets/images/main/main_subscriber.png" />
                <p class="fl font16" style="margin-top: 2px;">{{100}}</p>
            </div>
            <gBtnSmall :btnTitle="teamBtnText"  @click="teamEditClick" v-if='selectPopYn !== true' />
        </div>

        <div style="">
            <gSearchBox @changeSearchList="changeSearchList" @openFindPop="test" :resultSearchKeyList="this.resultSearchKeyList" />
            <transition name="showModal">
                <findContentsList @addSubHistory="addSubHistory" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
            </transition>
        </div>
        <teamList :listData="dummyList" @openDetail='openTeamDetailPop' v-if="!detailOpenYn" :editYn='teamEditYn' :selectPopYn="selectPopYn"  @selectTeam='addList' />
        <memberList :listData="clickList" v-if="detailOpenYn" style="margin-top:30px;" :editYn='memberEditYn' :selectPopYn="selectPopYn"  @selectMember='addList'/>

    </div>

<!-- <div v-if="selectPopYn" style="width: 100vw; height:calc(50% - 50px); background-color:white; position: absolute; left:0; bottom:0; box-shadow: 0px -7px 9px -9px #00000036;"> -->
    <div v-if="selectPopYn" style="width: 100vw; height:calc(50% - 50px); background-color:#F0F0F6; position: absolute; left:0; bottom:0; box-shadow: 0px -7px 9px -9px #00000036;">
        <!--  장바구니  -->
        <p class="channelMenuTitle" style="margin-top:1.6rem; margin-left: calc(1rem + 20px)">공유 대상</p>

        <div class="selectedReceiverBox" style="" >
            <div v-for="(data, index) in selectReceivers " :key="index" class="fl" style="margin-right:10px; padding: 5px 10px; border-radius: 10px; position: relative; margin-bottom:10px; background-color:#ddd;" >

                <p class="fl" style="font-size:16px; color:black; font-weight:bold;" v-if="data.data.reveiverTeamName">{{data.data.reveiverTeamName}} </p>
                <div  v-if="data.data.reveiverTeamName" class="fl " style="width:15px; height:20px; line-height:20px; margin: 0px 5px;">
                    <img src="../../../assets/images/main/main_subscriber.png"  class="fl " style="border:2px solid #a9aacd; border-radius:100%; width: 15px; height: 15px; margin-top:0.3rem;"  >
                </div>
                <p class="fl" style="font-size:16px; color:black; font-weight:bold;" v-if="data.data.reveiverTeamName">{{data.data.team.length}} </p>

                <p class="fl" style="font-size:16px; color:black; font-weight:bold;" v-if='data.data.name' >{{data.data.name}} </p>
                <p class="fl" style="font-weight:bold; margin-left:10px; padding:0 5px; background-color:#BABBD780; border-radius:10px; line-height:24px;" v-if='data.data.name' >{{data.data.grade}} </p>

                <img @click="delectClick(data,index)" src="../../../assets/images/common/close_black.svg" style=" width:20px; height: 20px; position: absolute; top:-5px; "/>

            </div>

        </div>

        <div style="position: absolute; right: 2rem; bottom: 2rem;">
            <gBtnSmall class="btnBig  " v-on:click="this.$emit('closePop')" btnTitle="닫기" style="margin-left:10px"/>
            <gBtnSmall class="btnBig" v-on:click="setResult" btnTitle="적용" style="margin-right:10px"/>
        </div>
    </div>
 </div>

</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import findContentsList from '../Tal_findContentsList.vue'
import teamList from './Tal_receiverTeamList.vue'
import memberList from './Tal_receiverTeamMemberList.vue'
export default {
    props: {selectPopYn: {} },
    created (){
        this.dummyList = this.$groupDummyList()

    },
    components: { findContentsList,teamList,memberList },
    data () {
        return{
            teamEditYn:false,
            teamBtnText:'편집',
            memberEditYn:false,
            memberBtnText:'편집',
            detailOpenYn: false,
            changeSearchList: [],
            findPopShowYn : false,
            findKeyList: {},
            resultSearchKeyList: [] ,
            dummyList : [],
            clickList: {},

            receiverTitle: '수신자 그룹 관리',
            selectReceivers : []
        }
    },
    methods : {
        setResult(){
            // alert(JSON.stringify(this.selectReceivers))
            this.$emit('selectedReceiver', this.selectReceivers)
        },
        delectClick(data, index){
            if(data.data.reveiverTeamName){
                this.dummyList.unshift(data.data)
            }else if(data.data.name){
                var record = this.dummyList.findIndex(function(item, index, arr){return item.reveiverTeamName === data.group});
                this.dummyList[record].team.unshift(data.data)
            }
            this.selectReceivers.splice(index, 1)
        },
        addList(obj){
            this.selectReceivers.unshift(obj)
            // if(obj.data.reveiverTeamName){
            //     this.selectReceivers.unshift(obj.data)
            // }else if(obj.data.name){
            //     this.selectReceivers.unshift(obj.data.name)
            // }
        },
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
        closeSearchPop (){
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
.selectedReceiverBox{
    height:40%;
    overflow-y: scroll;
    background-color:white;
    margin: 0 1.5rem;
    text-align: left;
    padding: 1rem;
}
</style>
