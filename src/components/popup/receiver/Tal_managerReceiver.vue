<template>
<div style="height: 100vh; background-color:white; width:100vw; z-index:9999; position:absolute; top:0; left:0">
    <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle" />
    <!--  <gBtnSmall :btnTitle="memberBtnText" @click="memberEditClick" class="fl" style="right:0; top:25px; transform: translate(-50%, -50%);position:absolute;"  v-if="detailOpenYn && selectPopYn !== true " /> -->

    <div class="pagePaddingWrap" style="height:calc(100% - 300px); overflow: auto;" :class="{longHeight : selectPopYn !== true}" >
    <!-- <div style="margin:3rem 2rem; height:100%; overflow: auto;" > -->
        <div style=" border-bottom:1px solid #ccc; padding: 5px 0; height:40px; margin-top:10px; " >
            <p class="fl mright-05 font16 h-100P fontBold colorBlack">{{titleText}}</p>
            <div class="mleft-01 fl" style="height: 100%; ">
                <img class="fl" style="margin-top: 4px; width: 15px;" src="../../../assets/images/main/main_subscriber.png" />
                <p class="fl font14" style="margin-top: 2px;">{{teamLength}}</p>
            </div>
            <gBtnSmall :btnTitle="teamBtnText"  @click="teamEditClick" v-if='selectPopYn !== true' />
            <gBtnSmall btnThema="light" btnTitle="추가" class="mright-05"  @click="!detailOpenYn? this.$refs.teamListRef.newAddTeam() : this.$refs.memberListRef.newAddMember()" v-if='teamEditYn' />
        </div>

        <!-- <div style="display: none">
            <gSearchBox style="" @changeSearchList="changeSearchList" @openFindPop="test" :resultSearchKeyList="this.resultSearchKeyList" />
            <transition name="showModal">
                <findContentsList @addSubHistory="addSubHistory" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
            </transition>
        </div> -->
        <div style="width: 100%; height: calc(100% - 100px); position: relative;">
                <teamList style="position: absolute; top: 0; background: #fff;" ref="teamListRef" :listData="dummyList" @openDetail='openTeamDetailPop' v-if="!detailOpenYn" :editYn='teamEditYn' :selectPopYn="selectPopYn"  @selectTeam='addList' />
            <transition name="showGroup">
                <memberList style="position: absolute; top: 0; background: #fff;" transition="showGroup" ref="memberListRef" :listData="clickList" v-if="detailOpenYn" :editYn='memberEditYn' :selectPopYn="selectPopYn"  @selectMember='addList'/>
            </transition>
        </div>
    </div>

<!-- <div v-if="selectPopYn" style="width: 100vw; height:calc(50% - 50px); background-color:white; position: absolute; left:0; bottom:0; box-shadow: 0px -7px 9px -9px #00000036;"> -->
    <div v-if="selectPopYn" style="width: 100vw; height:250px; background-color:#F0F0F6; position: absolute; left:0; bottom:0; padding: 20px; box-shadow: rgb(0 0 0 / 21%) 0px -9px 9px -9px">
        <!--  장바구니  -->
        <p class="" style="font-size: 16px; text-align: left; ">선택된 대상</p>

        <div class="selectedReceiverBox" style="" >
            <div v-for="(data, index) in selectReceivers " :key="index" class="fl" style="margin-right:10px; height: 25px; padding: 0 10px; border-radius: 5px; position: relative; margin-bottom:10px;  border: 1px solid #6768A7; " >

                <p class="fl" style="font-size:16px; color:black;" v-if="data.data.reveiverTeamName">{{ '그룹: ' + data.data.reveiverTeamName + ' (' + data.data.team.length + ')'}} </p>

                <p class="fl" style="font-size:16px; color:black;" v-if='data.data.name' >{{data.data.name}} </p>
                <!-- <p class="fl" style="margin-left:10px; padding:0 5px; background-color:#BABBD780; border-radius:3px; height" v-if='data.data.name' >{{data.data.grade}} </p>
 -->
                <img @click="delectClick(data,index)" src="../../../assets/images/common/close_black.svg" style=" width:15px; background: #fff; position: absolute; top:-5px; "/>

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
        if(this.selectPopYn) {
            this.receiverTitle = '대상 선택'
            this.titleText = '대상선택 > 팀플'
        }

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
            titleText: '팀플',
            receiverTitle: '그룹 관리',
            selectReceivers : [],
            teamLength: 100
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
                this.receiverTitle = '그룹 관리'
                if(this.selectPopYn) {
                    this.receiverTitle = '대상 선택'
                }
                this.titleText = '팀플'
                this.teamLength = 100
            }else{
                this.$emit('closePop')
            }
        },
        openTeamDetailPop(data){
            if(!this.teamEditYn){
                this.detailOpenYn = true
                this.receiverTitle = '구성원 관리'
                this.titleText = '팀플 > ' + data.reveiverTeamName
                if(this.selectPopYn) {
                    this.receiverTitle = '대상 선택'
                }
                this.teamLength = data.team.length
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
        /* async changeSearchList (type) {
            if (type === 'searchKey') {
                delete this.findKeyList.searchKey
            } else if (type === 'creTeamNameMtext') { delete this.findKeyList.creTeamNameMtext } else if (type === 'creDate') {
                delete this.findKeyList.toCreDateStr
                delete this.findKeyList.fromCreDateStr
            }
            this.resultSearchKeyList = await this.castingSearchMap(this.findKeyList)
            await this.getPushContentsList()
        },
 */
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
    height: calc(100% - 100px);
    width: 100%;
    margin-top: 5px;
    overflow-y: scroll;
    padding: 10px;
    background-color:white;
    text-align: left;
}
[contenteditable=true] {
  outline: none;
}
input:focus{
  outline: none;
}
</style>
