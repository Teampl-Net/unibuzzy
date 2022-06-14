<template>
<div style="height: 100vh; background-color:white; width:100vw; z-index:9999; position:absolute; top:0; left:0">
    <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle" />
    <!--  <gBtnSmall :btnTitle="memberBtnText" @click="memberEditClick" class="fl" style="right:0; top:25px; transform: translate(-50%, -50%);position:absolute;"  v-if="detailOpenYn && selectPopYn !== true " /> -->

    <div class="pagePaddingWrap" style="height:calc(100% - 300px); overflow: auto;" :class="{longHeight : selectPopYn !== true}" >
    <!-- <div style="margin:3rem 2rem; height:100%; overflow: auto;" > -->
        <div style=" border-bottom:1px solid #ccc; padding: 5px 0; height:40px; margin-top:10px; overflow: hidden; " >
            <p class="fl mright-05 font16 h-100P fontBold colorBlack">{{titleText}}</p>
            <div class="mleft-01 fl" style="height: 100%; ">
                <img class="fl" style="margin-top: 4px; width: 15px;" src="../../../assets/images/main/main_subscriber.png" />
                <p class="fl font14" style="margin-top: 2px;">{{teamLength}}</p>
            </div>
            <gBtnSmall btnTitle="전체 추가" @click="addAllClick" />

        </div>

        <div style="width: 100%; height: calc(100% - 100px); position: relative;">
                <!-- <selectedListCompo v-if='selectedYn' style="position: absolute; top: 0; background: #fff; width:100%; height:100%;" transition="showGroup" :listData='setSelectedList' /> -->
                <bookList :propData="selectBookDetail" style="position: absolute; top: 0; background: #fff;" ref="bookListRef"  @openMCabUserList='openMCabUserList' v-if="!detailOpenYn" :selectPopYn="selectPopYn"  @selectTeam='addTeamList' />
            <transition name="showGroup">
                <memberList :propData="this.selectBookDetail" style="position: absolute; top: 0; background: #fff;" transition="showGroup" ref="memberListRef" v-if="detailOpenYn"  :selectPopYn="selectPopYn"  @selectMember='addMemberList' :addPopOpenYn='addPopOpenYn' />
            </transition>
            <!-- <transition name="showGroup">
                <selectedListCompo style="position: absolute; top: 0; background: #fff" transition="showGroup" :listData='s' />
            </transition> -->
        </div>
    </div>

    <div style="width: 100vw; height:250px; background-color:#F0F0F6; position: absolute; left:0; bottom:0; padding: 20px; box-shadow: rgb(0 0 0 / 21%) 0px -9px 9px -9px">
        <!--  장바구니  -->
        <p class="" style="font-size: 16px; text-align: left; ">선택된 대상</p>

        <div class="selectedReceiverBox" style="" >
            <div v-for="(data, index) in selectReceivers " :key="index" class="fl" style="margin-right:10px; height: 25px; padding: 0 10px; border-radius: 5px; position: relative; margin-bottom:10px;  border: 1px solid #6768A7; " >
                <p class="fl" style="font-size:16px; color:black;" v-if="data.cabinetNameMtext">{{ '그룹: ' + data.cabinetNameMtext + ' (' + data.mCabUserList.length + ')'}} </p>
                <p class="fl" style="font-size:16px; color:black;" v-else >{{this.$changeText(data.userDispMtext)}} </p>
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
import bookList from './Tal_commonBookList.vue'
import memberList from './Tal_commonBookMemberList.vue'
import selectedListCompo from './Tal_selectedReceiverList.vue'
export default {
    props: {
        selectPopYn: {},
        chanInfo: {},
        selectedList: {},
        detailSelectedYn:{},
        selectedListYn:{},
        propData: {}
    },
    created (){
        // alert(JSON.stringify(chanInfo))
        // this.dummyList = this.$groupDummyList()
        alert(JSON.stringify(this.propData))
        if(this.selectPopYn) {
            this.receiverTitle = '대상 선택'
            this.titleText = '대상선택 > ' + this.$changeText(this.chanInfo.value.nameMtext)
        }
        if(this.selectedList !== '' && this.selectedList !== null &&  this.selectedList !== undefined ){
            this.selectedYn = true
            this.setSelectedList = this.selectedList
            // alert(this.setSelectedList.data.reveiverTeamName)
        }

        if(this.selectedListYn){
            alert(JSON.stringify(this.selectedList))
            this.selectedTeamList = selectedList.selectedTeamList
            this.selectedMemberList = selectedList.selectedMemberList

        }

    },
    components: { bookList,memberList,selectedListCompo },
    data () {
        return{
            selectedYn:false,
            setSelectedList:[],
            detailOpenYn: false,


            titleText: '팀플',
            receiverTitle: '그룹 관리',
            selectReceivers : [],
            teamLength: 100,
            addPopOpenYn:null,
            addPopOpen:'',
            selectedTeamList : [],
            selectedMemberList : [],

            selectBookDetail: null
        }
    },
    methods : {
        setResult(){
            // alert(JSON.stringify(this.selectReceivers))
            var obj = new Object();
            obj.data = this.selectReceivers
            obj.selectedTeamList = this.selectedTeamList
            obj.selectedMemberList = this.selectedMemberList
            // this.$emit('selectedReceiver', this.selectReceivers)
            this.$emit('selectedReceiver', obj)
            // this.$emit('selectedReceiver', this.selectReceivers)
        },
        delectClick(data, index){
            if(data.reveiverTeamName){
                // this.dummyList.unshift(data.data)
            }else if(data.name){
                // var record = this.dummyList.findIndex(function(item, index, arr){return item.reveiverTeamName === data.group});
                // this.dummyList[record].team.unshift(data.data)
            }
            this.selectReceivers.splice(index, 1)
        },
        addTeamList(obj){
            // this.selectedTeamList.unshift(obj)
            this.selectReceivers.unshift(obj)
            alert(JSON.stringify(this.selectReceivers))
        },
        addMemberList(obj){
            // this.selectedMemberList.unshift(obj)

            this.selectReceivers.unshift(obj)
            alert(JSON.stringify(this.selectReceivers))
            // alert(JSON.stringify(this.selectReceivers))
            // alert(JSON.stringify(this.selectReceivers.userDispMtext))
        },

        backClick(){
            if(this.addPopOpenYn){
                // MemberList에 구성원추가 팝업
                this.addPopOpenYn = false
            }else if(this.detailOpenYn){
                this.detailOpenYn = false
                this.receiverTitle = '그룹 관리'
                if(this.selectPopYn) {
                    this.receiverTitle = '대상 선택'
                }

                if(this.selectPopYn){

                    this.titleText = '대상선택 > ' + this.$changeText(this.chanInfo.value.nameMtext)
                }else{
                    this.titleText = '팀플'
                }

                this.teamLength = 100
                this.memberEditYn = false

            }else{
                this.$emit('closeXPop')
            }
        },
        openMCabUserList(data){
            if(!this.teamEditYn){
                this.selectBookDetail = data
                this.detailOpenYn = true
                this.receiverTitle = '구성원 관리'
                // alert(JSON.stringify(this.propData))
                if (this.chanInfo.value.nameMtext !== undefined && this.chanInfo.value.nameMtext !== null && this.chanInfo.value.nameMtext !== '' ) {
                    this.titleText = this.$changeText(this.chanInfo.value.nameMtext) + ' > ' + this.selectBookDetail.cabinetNameMtext
                } else {
                    this.titleText = this.propData.teamNameMtext + ' > ' + this.selectBookDetail.cabinetNameMtext
                }
                if(this.selectPopYn) {
                    this.receiverTitle = '대상 선택'
                    // this.titleText = "대상선택 > 팀플 > " + data.reveiverTeamName
                }
            }

        },
        addAllClick () {
            var i = 0
            var obj = new Object()
            if(this.detailOpenYn){
                // 멤버 리스트에서 전체 추가 클릭

                obj.data = this.clickList
                this.selectReceivers.unshift(obj)
                //  arr3.findIndex(i => i.name == "강호동"); 
                const addAllMemTeamIdx = this.selectBookDetail.findIndex(i => i.reveiverTeamName === this.clickList.reveiverTeamName)
                this.selectBookDetail.splice(addAllMemTeamIdx, 1) // 전체 리스트에서 해당 인덱스 삭제
                this.detailOpenYn = false  // 삭제 되었으면 디테일 끄기
                this.titleText = '대상선택 > ' + this.$changeText(this.chanInfo.value.nameMtext)

            }else{
                // 팀 리스트에서 전체 추가 클릭
                for(i=0; i < this.selectBookDetail.length; i++){
                    obj = new Object()
                    obj.data = this.selectBookDetail[i]
                    this.selectReceivers.unshift(obj)
                }
                this.selectBookDetail.splice(0, this.selectBookDetail.length) // 전체 리스트에서 제거
            }
        },

    }
}
</script>

<style >
.btnPlus{
    width:4rem; height:4rem; display: flex;
    padding-top: 5px;
    justify-content: center; align-items: center;
    color:#6768a7; border:3px solid #6768a7; background-color:white ;

    border-radius:4rem; position:fixed; bottom: 80px; right: 10%;
    box-shadow: 2px 2px 7px 3px #ccc;

}

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
