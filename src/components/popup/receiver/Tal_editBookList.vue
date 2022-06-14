<template>
<div style="height: 100vh; background-color:white; width:100vw; z-index:9999; position:absolute; top:0; left:0">
    <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle" />
    <div class="pagePaddingWrap longHeight" style="height:calc(100% - 300px); overflow: auto;" >
    <!-- <div style="margin:3rem 2rem; height:100%; overflow: auto;" > -->
        <div style=" border-bottom:1px solid #ccc; padding: 5px 0; height:40px; margin-top:10px; overflow: hidden; " >
            <p class="fl mright-05 font16 h-100P fontBold colorBlack">{{titleText}}</p>
            <div class="mleft-01 fl" style="height: 100%; ">
                <img class="fl" style="margin-top: 4px; width: 15px;" src="../../../assets/images/main/main_subscriber.png" />
                <p class="fl font14" style="margin-top: 2px;">{{teamLength}}</p>
            </div>
            <gBtnSmall :btnTitle="teamBtnText"  @click="!detailOpenYn? teamEditClick() : memberEditClick()" />
        </div>
        <div style="width: 100%; height: calc(100% - 100px); position: relative;">
            <bookList :propData="selectBookDetail" style="position: absolute; top: 0; background: #fff;" ref="bookListRef"  @openMCabUserList='openMCabUserList' v-if="!detailOpenYn" :editYn='teamEditYn'   />
            <transition name="showGroup">
                <memberList :propData="this.selectBookDetail" style="position: absolute; top: 0; background: #fff;" transition="showGroup" ref="memberListRef" v-if="detailOpenYn" :editYn='memberEditYn'  @openAddPop='checkAddPopOpend' :addPopOpenYn='addPopOpenYn' />
            </transition>
        </div>
    </div>
    <div class="btnPlus" btnTitle="추가" @click="!detailOpenYn? this.$refs.bookListRef.newAddTeam() : this.$refs.memberListRef.newAddMember()" v-if='teamEditYn || memberEditYn' ><p style="font-size:40px;">+</p></div>

</div>

</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
// import findContentsList from '../Tal_findContentsList.vue'
import bookList from './Tal_commonBookList.vue'
import memberList from './Tal_commonBookMemberList.vue'

export default {
    props: {

        chanInfo: {},
        // selectedList: {},
        detailSelectedYn:{},
        // selectedListYn:{},
        propData: {}
    },
    created (){
    },
    components: { bookList,memberList},
    data () {
        return{
            // selectedYn:false,
            // setSelectedList:[],

            teamEditYn:false,
            teamBtnText:'편집',
            memberEditYn:false,
            memberBtnText:'편집',
            detailOpenYn: false,
            changeSearchList: [],
            findPopShowYn : false,
            findKeyList: {},
            resultSearchKeyList: [] ,
            clickList: {},
            titleText: '팀플',
            receiverTitle: '그룹 관리',

            teamLength: 100,
            addPopOpenYn:null,
            addPopOpen:'',
            // selectedTeamList : [],
            // selectedMemberList : [],

            selectBookDetail: null
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
            if(this.memberEditYn){
                this.teamBtnText = '편집'
                this.memberEditYn = false
            }else{
                this.teamBtnText = '저장'
                this.memberEditYn = true
            }
        },
        checkAddPopOpend(isOpend){
            // MemberList에 구성원추가 팝업 on/off 체크
            this.addPopOpenYn = isOpend
        },
        backClick(){
            if(this.addPopOpenYn){
                // MemberList에 구성원추가 팝업
                this.addPopOpenYn = false
            }else if(this.detailOpenYn){
                this.detailOpenYn = false
                this.receiverTitle = '그룹 관리'
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

                if (this.chanInfo.value.nameMtext !== undefined && this.chanInfo.value.nameMtext !== null && this.chanInfo.value.nameMtext !== '' ) {
                    this.titleText = this.$changeText(this.chanInfo.value.nameMtext) + ' > ' + this.selectBookDetail.cabinetNameMtext
                } else {
                    this.titleText = this.propData.teamNameMtext + ' > ' + this.selectBookDetail.cabinetNameMtext
                }
            }
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
.btnPlus{
    width:4rem; height:4rem; display: flex;
    padding-top: 5px;
    justify-content: center; align-items: center;
    color:#6768a7; border:3px solid #6768a7; background-color:white ;
    border-radius:4rem; position:fixed; bottom: 80px; right: 10%;
    box-shadow: 2px 2px 7px 3px #ccc;
}

.longHeight{
height:100% !important;
}
[contenteditable=true] {
  outline: none;
}
input:focus{
  outline: none;
}
</style>
