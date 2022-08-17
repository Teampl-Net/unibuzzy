<template>
    <div class="editBookListWrap">
        <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle"  :managerBtn='true' :chanName="this.chanName" @sendOk='editPop' />
        <div class="pagePaddingWrap longHeight" style="height:calc(100% - 300px); overflow: hidden; padding-top: 60px !important;" >
            <!-- <div class="w-100P" style="border-bottom: 1px solid #ccc; padding: 5px 0; min-height:40px; margin-top:10px; overflow: hidden; "> -->
                <!-- <span @click="goCabinetList" class="fl mright-05 font18 h-100P colorBlack">{{this.chanName}}</span><span v-if="cabinetName !== ''" class="fl mright-05 font18 h-100P colorBlack">{{' > ' + this.cabinetName}}</span> -->
                <!-- <img src="../../../assets/images/channel/channer_addressBook.svg" style="width: 23px; margin-right: 10px; margin-left: 5px; float: left;" /> -->
                <!-- <p class="fl mright-05 font18 h-100P colorBlack">{{this.propData.cabinetNameMtext}}</p> -->
            <!-- </div> -->
            <div class="w-100P" style="border-bottom: 1px solid #ccc; padding: 5px 0; min-height:40px; margin-top:10px; overflow: hidden; " v-if="cabinetName !== ''" >
                <span @click="goCabinetList" class="fl mright-05 font18 h-100P colorBlack">
                    <img src="../../../assets/images/channel/channer_addressBook.svg" class="fl" style="width:25px; " alt="">
                    <p class="fl mleft-05 font18 colorBlack" >{{this.cabinetName}}</p>
                </span>
            </div>

            <div class="bookAndMemListWrap" :style="detailOpenYn ? 'height: calc(100% - 3.5rem);' : '' ">
                <bookListCompo @getTeamCabList="this.getBookList" @refreshList="getBookList" :listData="bookList" :propData="propData" :selectBookDetail="selectBookDetail" style="width:100%; position: absolute; height: calc(100%); overFlow: hidden scroll; top: 0; background: #fff;" ref="bookListCompoRef"  @openMCabUserList='openMCabUserList' v-if="!detailOpenYn" @editYn='editYnCheck' />
                <transition name="showGroup">
                    <memberList @refreshList="this.getBookMemberList" :selectPopYn="false" :parentSelectList="[]" :teamInfo="propData.value.value" :listData="memberList" :propData="selectBookDetail" style="position: absolute; top: 0; overFlow: hidden scroll; height: calc(100%);background-color:#fff; " transition="showGroup" @openAddPop="openAddPop" ref="memberListRef" v-if="detailOpenYn" @editYn='editYnCheck' />
                    <!-- <memberList @refreshList="this.getBookMemberList" :selectPopYn="false" :parentSelectList="[]" :teamInfo="propData.value.value" :listData="memberList" :propData="selectBookDetail" style="position: absolute; top: 0; left:0.5rem; width:calc(100% - 1rem); overFlow: hidden scroll; height: calc(100%);background-color:#fff;  " transition="showGroup" @openAddPop="openAddPop" ref="memberListRef" v-if="detailOpenYn" @editYn='editYnCheck' /> -->
                </transition>
                <div class="btnPlus" style="bottom: 160px;" @click="openExcelUploadPop" v-if="!editYn && !mobileYn && detailOpenYn" ><p style="font-size:14px;" v-html="'엑셀<br>업로드'"></p></div>
                <div class="btnPlus" btnTitle="추가" @click="!detailOpenYn? this.$refs.bookListCompoRef.addNewBook(): this.openSelectMemberPop()" v-if="!editYn" ><p style="font-size:40px;">+</p></div>
            </div>
        </div>
        <excelUploadPop @success="successExcelUpload" :cabinetKey="this.selectBookDetail.cabinetKey" :targetKey="this.selectBookDetail.teamKey" v-if="excelUploadShowYn" @closePop="backClick"/>
        <div @click="backClick" v-if="excelUploadShowYn" style="position: absolute; top: 0; left: 0; width: 100%; height: 100vh; background: #00000030; z-index: 99999;"></div>
    </div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import findContentsList from '../common/Tal_findContentsList.vue'
import bookListCompo from './Tal_commonBookList.vue'
import memberList from './Tal_commonBookMemberList.vue'
import excelUploadPop from './Tal_exelUpload.vue'
export default {
    props: {
        chanInfo: {},
        propData: {},
    },
    created (){
        /* var history = this.$store.getters.hStack
        this.popId = 'editBookList' + history.length */
        this.getBookList()
        this.chanName = this.propData.teamNameMtext || ''

    },
    async mounted () {
        if(this.propData.value.clickData){
            this.openMCabUserList(this.propData.value.clickData)
        }
    },
    computed: {
        historyStack () {
        return this.$store.getters.hRPage
        },
        pageUpdate () {
        return this.$store.getters.hUpdate
        }
    },
    watch: {
        pageUpdate (value, old) {
        this.backClick()
        /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
        },
        historyStack (value, old) {
        }
    },
    components: { findContentsList, bookListCompo,memberList,excelUploadPop },
    data () {
        return {
            editYn: false,
            bookList: [],
            selectPopId: null,
            subPopId: null,
            popId: null,
            detailOpenYn: false,
            changeSearchList: [],
            findPopShowYn : false,
            findKeyList: {},
            resultSearchKeyList: [] ,
            clickList: {},
            titleText: '',
            receiverTitle: '주소록 관리',
            teamLength: 0,
            selMemberList: [],
            cabinetName: '',
            excelUploadShowYn: false,
            excelPopId: null,
            mobileYn: this.$getMobileYn()
        }
    },
    methods: {
        async getBookList () {
            var paramMap = new Map()
            paramMap.set('teamKey', this.propData.currentTeamKey || this.propData.teamKey || this.propData.targetKey)
            paramMap.set('sysCabinetCode', 'USER')
            paramMap.set('adminYn', true)
            var result = await this.$commonAxiosFunction({
                url: '/tp.getTeamMenuList',
                param: Object.fromEntries(paramMap)
            })
            this.bookList = result.data
            for(var i = 0; i < this.bookList.length; i ++) {
                var changeT = this.bookList[i].cabinetNameMtext
                this.bookList[i].cabinetNameMtext = this.$changeText(changeT)
            }
            //
        },
        newAddMember(){
            this.newYn = false
            var data = new Object()
            data.targetType = 'bookMemberDetail'
            data.currentCabinetKey = this.propData.cabinetKey
            data.currentTeamKey = this.propData.teamKey
            this.$emit('openAddPop',data)
        },
        async getBookMemberList () {
            this.detailOpenYn = false
            var paramMap = new Map()
            paramMap.set('cabinetKey', this.selectBookDetail.cabinetKey)
            paramMap.set('jobkindId', 'USER')
            var result = await this.$commonAxiosFunction({
                url: '/tp.getMCabContentsList',
                param: Object.fromEntries(paramMap)
            })
            this.memberList = result.data
            console.log(this.memberList);
            if (this.memberList) { // dispName이 없을시 userName으로 대체
                for (var i =0; i < this.memberList.length; i ++) {
                    if(this.memberList[i].userDispMtext !== undefined && this.memberList[i].userDispMtext !== null && this.memberList[i].userDispMtext !== '') {

                    } else {
                        this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
                    }
                }
                this.cabinetName = this.$changeText(this.selectBookDetail.cabinetNameMtext)
                this.detailOpenYn = true
            }
        },
        async refresh () {
            var hStack = this.$store.getters.hStack
            if ((this.selectPopId === hStack[hStack.length - 1]) || this.excelPopId === hStack[hStack.length - 1]) {
                await this.getBookMemberList()
            } else {
                await this.getBookList()
            }
        },
        editYnCheck(data) {
            this.editYn = data
        },
        goCabinetList () {
            var hStack = this.$store.getters.hStack
            var removePage = hStack[hStack.length - 1]
            if (this.selectPopId === hStack[hStack.length - 1]) {
                hStack = hStack.filter((element, index) => index < hStack.length - 1)
                this.$store.commit('setRemovePage', removePage)
                this.$store.commit('updateStack', hStack)
                this.detailOpenYn = false
                this.cabinetName = ''
                this.receiverTitle = '주소록 관리'
            } else {
                return
            }
        },
        backClick () {
            var hStack = this.$store.getters.hStack
            var removePage = hStack[hStack.length - 1]
            if (this.selectPopId === hStack[hStack.length - 1]) {
                hStack = hStack.filter((element, index) => index < hStack.length - 1)
                this.$store.commit('setRemovePage', removePage)
                this.$store.commit('updateStack', hStack)
                this.detailOpenYn = false
                this.cabinetName = ''
                this.receiverTitle = '주소록 관리'
            }
            else if (this.subPopId === hStack[hStack.length - 1]) {
                hStack = hStack.filter((element, index) => index < hStack.length - 1)
                this.$store.commit('setRemovePage', removePage)
                this.$store.commit('updateStack', hStack)
                this.detailOpenYn = false
                this.cabinetName = ''
                this.receiverTitle = '주소록 관리'
            } else  if (this.excelPopId === hStack[hStack.length - 1]) {
                hStack = hStack.filter((element, index) => index < hStack.length - 1)
                this.$store.commit('setRemovePage', removePage)
                this.$store.commit('updateStack', hStack)
                this.excelUploadShowYn = false
            } else {
                // this.$emit('closeXPop')
            }
        },
        async openMCabUserList(data){
            this.receiverTitle = '주소록 멤버 관리'
            this.selectBookDetail = data
            var history = this.$store.getters.hStack
            this.selectPopId = 'selectMemeberPopup' + history.length
            history.push(this.selectPopId)
            this.$store.commit('updateStack', history)

            await this.getBookMemberList()

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
        openExcelUploadPop () {
            var history = this.$store.getters.hStack
            this.excelPopId = 'excelUploadPop' + history.length
            history.push(this.excelPopId)
            this.$store.commit('updateStack', history)

            this.excelUploadShowYn = true
        },
        async openSelectMemberPop () {
        // eslint-disable-next-line no-new-object
            var params = new Object()
            params.teamKey = this.propData.currentTeamKey
            params.memberYn = true
            var result = await this.$commonAxiosFunction({
                url: '/tp.getFollowerList',
                param: params
            })

            this.selMemberList = result.data.content
            // this.list = []
            this.propData.currentCabinetKey = this.selectBookDetail.cabinetKey
            var param = new Object()
            param.targetType = 'selectMemberPop'
            param.pSelectedList = this.memberList
            param.cabinetKey = this.propData.currentCabinetKey
            param.selectMemberType = 'member'
            param.currentTeamKey = this.propData.currentTeamKey

            this.$emit('openPop', param)

            // var param = {}
            // param.targetType = 'bookMemberDetail'
            // // param.currentCabinetKey = this.propData.cabinetKey
            // param.currentTeamKey = this.propData.currentTeamKey

            // this.$emit('openPop', param)

            // this.openAddManagerPopYn = true
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
        },
        successExcelUpload() {
            this.backClick()
            this.refresh()
        }
    }
}
</script>

<style >
/* btnPlus common.css로 옮김 */
.bookAndMemListWrap{width: 100%; height: calc(100% - 1rem); position: relative; overflow: auto;}
.editBookListWrap {height: 100vh; background-color:white; width:100%; z-index:999; position:absolute; top:0; left:0}

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
