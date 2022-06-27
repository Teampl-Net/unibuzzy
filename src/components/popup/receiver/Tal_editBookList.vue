<template>
    <div style="height: 100vh; background-color:white; width:100vw; z-index:99; position:absolute; top:0; left:0">
        <!-- <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle" :chanName="this.propData.teamNameMtext" /> -->
        <!--  <gBtnSmall :btnTitle="memberBtnText" @click="memberEditClick" class="fl" style="right:0; top:25px; transform: translate(-50%, -50%);position:absolute;"  v-if="detailOpenYn && selectPopYn !== true " /> -->

        <div class="pagePaddingWrap longHeight" style="height:calc(100% - 300px); overflow: auto;" >
        <!-- <div style="margin:3rem 2rem; height:100%; overflow: auto;" > -->

            <!-- <div style="display: none">
                <gSearchBox style="" @changeSearchList="changeSearchList" @openFindPop="test" :resultSearchKeyList="this.resultSearchKeyList" />
                <transition name="showModal">
                    <findContentsList @addSubHistory="addSubHistory" transition="showModal" @searchList="requestSearchList" v-if="findPopShowYn" @closePop="closeSearchPop"/>
                </transition>
            </div> -->
            <div style="width: 100%; height: calc(100% - 10px); position: relative;">
                <bookListCompo  :propData="propData" :selectBookDetail="selectBookDetail" style="position: absolute; height: calc(100%); overFlow: hidden scroll; top: 0; background: #fff;" ref="bookListCompoRef"  @openMCabUserList='openMCabUserList' v-if="!detailOpenYn" @editYn='editYnCheck' />
                <transition name="showGroup">
                    <memberList :parentSelectList="[]" :teamInfo="propData.value.value" :propData="selectBookDetail" style="position: absolute; top: 0; overFlow: hidden scroll; height: calc(100%);background-color:#fff " transition="showGroup" @openAddPop="openAddPop" ref="memberListRef" v-if="detailOpenYn" @editYn='editYnCheck' />
                </transition>
                <div class="btnPlus" btnTitle="추가" @click="!detailOpenYn? this.$refs.bookListCompoRef.addNewBook():this.$refs.memberListRef.newAddMember()" v-if="!editYn" ><p style="font-size:40px;">+</p></div>
            </div>
        </div>
    </div>

</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import findContentsList from '../Tal_findContentsList.vue'
import bookListCompo from './Tal_commonBookList.vue'
import memberList from './Tal_commonBookMemberList.vue'
export default {
    props: {
        chanInfo: {},
        propData: {}
    },
    created (){
        var history = this.$store.getters.hStack
        this.popId = 'editBookList' + history.length
        history.push(this.popId)
        this.$store.commit('updateStack', history)

        if(this.propData.value.clickData){
            this.selectBookDetail = this.propData.value.clickData
            this.detailOpenYn = true
        }
    },
    computed: {
        historyStack () {
        return this.$store.getters.hRPage
        }
    },
    watch: {
        historyStack (value, old) {
        if (this.popId === value) {
            if(this.detailOpenYn) {
                this.detailOpenYn = false
            } else {
                this.backClick()
            }
            }

        }
    },
    components: { findContentsList, bookListCompo,memberList },
    data () {
        return {
            editYn: false,
            popId: null,
            detailOpenYn: false,
            changeSearchList: [],
            findPopShowYn : false,
            findKeyList: {},
            resultSearchKeyList: [] ,
            clickList: {},
            titleText: '',
            receiverTitle: '주소록 관리',
            teamLength: 0
        }
    },
    methods: {
        async refresh () {
            await this.$refs.memberListRef.refresh()
        },
        editYnCheck(data) {
            this.editYn = data
        },
        backClick(){
            if(this.addPopOpenYn){
                // MemberList에 구성원추가 팝업 끄기manageBookList
                this.addPopOpenYn = false
            }else if(this.detailOpenYn){
                this.detailOpenYn = false

            }else{
                this.$emit('closeXPop')
            }
        },
        openMCabUserList(data){

            this.selectBookDetail = data
            this.detailOpenYn = true

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
        /* addSubHistory (pageName) {
            // eslint-disable-next-line no-array-constructor
            var sHistory = new Array()
            if (this.subHistoryList) {
                sHistory = this.subHistoryList
            }
            sHistory.push(pageName)
            this.subHistoryList = sHistory
        }, */
        openAddPop (data) {
            this.$emit('openPop', data)
        }
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
