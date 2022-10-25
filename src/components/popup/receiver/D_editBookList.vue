<template>
  <div v-if="CHANNEL_DETAIL" class="editBookListWrap">
    <gConfirmPop :confirmText='confirmText' :confirmType="confirmType" v-if="confirmPopShowYn" @no='confirmPopShowYn=false' @ok='confirmOk' />
    <popHeader @closeXPop="backClick()" class="headerShadow" :headerTitle="receiverTitle"  :managerBtn='true' :chanName="this.chanName" @sendOk='editPop' />
    <div class="pagePaddingWrap longHeight" style="height:calc(100% - 300px); overflow: hidden; padding-top: 60px !important;" >
      <!-- <div class="w-100P" style="border-bottom: 1px solid #ccc; padding: 5px 0; min-height:40px; margin-top:10px; overflow: hidden; "> -->
        <!-- <span @click="goCabinetList" class="fl mright-05 font18 h-100P colorBlack">{{this.chanName}}</span><span v-if="cabinetName !== ''" class="fl mright-05 font18 h-100P colorBlack">{{' > ' + this.cabinetName}}</span> -->
        <!-- <img src="../../../assets/images/channel/channer_addressBook.svg" style="width: 23px; margin-right: 10px; margin-left: 5px; float: left;" /> -->
        <!-- <p class="fl mright-05 font18 h-100P colorBlack">{{this.propData.cabinetNameMtext}}</p> -->
      <!-- </div> -->
      <div class="w-100P" style="border-bottom: 1px solid #ccc; padding: 5px 0; min-height:40px; margin:5px 0; overflow: hidden; " v-if="cabinetName !== ''" >
        <!-- <span @click="goCabinetList" style="width: calc(100%); max-width: calc(100% - 350px);" class="fl mright-05 font18 h-100P colorBlack">
          <img src="../../../assets/images/channel/channer_addressBook.svg" class="fl" style="width:25px; " alt="">
          <p class="fl mleft-05 font18 textLeft colorBlack" style="width: calc(100% - 50px)" >{{this.cabinetName}}</p>
        </span> -->
        <div style="width: calc(100%); min-height: 30px; float: right; margin-bottom: 5px;" v-if="this.searchFilterList.length > 0">
          <p class="font14 commonBlack fontBold fl" style="line-height: 30px;">세부필터</p>
          <div style="height: 100%; float: right; width: calc(100% - 60px); max-width: calc(100% - 60px);">
            <div  v-for="(value, index) in this.searchFilterList" style="width: 20%; min-width: 90px; padding: 0 3px; height: 30px; float: right; " :key="index">
            <!-- @click="getMCabGroupList(index)"  -->
              <select :style="''"  v-model="value.selectGroup" @change="searchFilter()"  name="" class="font14" style="    background: #fff !important; border: none!important;border-right: #6768a745!important; width: calc(100% ); height: 30px; float: left; text-align:center;" id="">
                <option value="all" @click="changeValue('all')">{{value.text + '전체'}}</option>
                <option :value="option" @click="changeValue(option)" v-for="(option, oIdx) in value.groupList" :key="oIdx">{{option}}</option>
              </select>
            </div>
          </div>
        </div>
        <div style="width: calc(100%); min-width: 120px; float: right;">
          <div style=" margin-left: 5px; float: right; max-width: 200px; min-height: 30px; position: relative; width: 100%;">
            <img @click="cabinetName !== ''? getBookMemberList():getBookList()" class="cursorP" style="float: right; position: absolute; right: 10px;width: 20px;margin-top: 5px; margin-right: 5px;" src="../../../assets/images/common/iocn_search.png" alt="검색버튼">
            <input @click="searchKeyword = ''" v-model="searchKeyword" type="text" style="float: right; width: calc(100% ); margin-right: 5px; min-height: 30px; min-width: calc(100% );padding-right:40px!important; "  @keyup.enter="cabinetName !== ''? getBookMemberList():getBookList()" :placeholder="cabinetName !== ''? '이름을 입력해주세요' : '주소록명을 입력해주세요'">
            <!-- <div @click="orderByPopShowYn = !orderByPopShowYn"  class="commonSelectBox font14 cursorP" style="height: 30px; width: 80px; float: right; line-height: 18px; margin-right: 5px;">{{orderByText === 'creDate' ? '등록순': '이름순'}}</div>
            <div v-show="orderByPopShowYn" style="position: absolute; width: 100px; min-height: 50px; background: #fff; border-radius: 5px; right: 200px; border: 1px solid #ccc;  top: 142px; z-index: 9999999;">
              <div @click="changeOrderBy('creDate')" class="font14" style="cursor: pointer; width: 100%; border-bottom: 1px solid #ccc;  min-height: 30px; padding: 5px; float: left;">
                등록순
              </div>
              <div @click="changeOrderBy('userDispMtext')" class="font14" style="cursor: pointer; width: 100%;  min-height: 30px; padding: 5px; float: left;">
                이름순
              </div>
            </div> -->
          </div>
            <select v-model="orderByText" @change="changeOrderBy" class="commonSelectBox font14 cursorP"  style="height: 30px; width: 80px; float: right; line-height: 18px; margin-right: 5px;" name="" id="">
              <option value="creDate">등록순</option>
              <option value="userDispMtext">이름순</option>
            </select>
        </div> <!-- display: flex; justify-content: space-around; align-items: center; -->
        <!-- <img style="width: 23px; float: right; margin-top: 3px;" @click="searchBoxShowYn = !searchBoxShowYn" src="../../../assets/images/common/iocn_search.png" alt=""> -->
      </div>
      <div class="bookAndMemListWrap" :style="detailOpenYn ? 'height: calc(100% - 80px);' : '' ">
        <bookListCompo @getTeamCabList="this.getBookList" @refreshList="getBookList" :listData="bookList" :propData="propData" :selectBookDetail="selectBookDetail" style="width:100%; position: absolute; height: calc(100%); overFlow: hidden scroll; top: 0; background: #fff;" ref="bookListCompoRef"  @openMCabUserList='openMCabUserList' v-if="!detailOpenYn" @editYn='editYnCheck' @openPop="openPop" @delAddress="delAddress" />
        <transition name="showGroup">
          <memberList :pSearchFilterList="this.searchFilterList" @searchFilter="searchFilter" :bookType="this.selectBookDetail.sSub" @refreshList="this.getBookMemberList" :selectPopYn="false" :parentSelectList="[]" :teamInfo="this.CHANNEL_DETAIL" :listData="memberList" :propData="selectBookDetail" style="position: absolute; top: 0; overFlow: hidden scroll; height: calc(100%);background-color:#fff; " transition="showGroup" @openAddPop="openAddPop" ref="memberListRef" v-if="detailOpenYn" @editYn='editYnCheck' @delAddress="delAddress" />
          <!-- <memberList @refreshList="this.getBookMemberList" :selectPopYn="false" :parentSelectList="[]" :teamInfo="propData.value.value" :listData="memberList" :propData="selectBookDetail" style="position: absolute; top: 0; left:0.5rem; width:calc(100% - 1rem); overFlow: hidden scroll; height: calc(100%);background-color:#fff;  " transition="showGroup" @openAddPop="openAddPop" ref="memberListRef" v-if="detailOpenYn" @editYn='editYnCheck' /> -->
        </transition>
        <!-- <div v-if="plusMenuShowYn"  @click="plusMenuShowYn = !plusMenuShowYn" style="background: #00000026; height: 100%; width: 100%; position: fixed; left: 0; z-index: 999; top: 0;"></div> -->
        <div class="btnPlus" style="bottom: 10.5rem; z-index: 999; width: 3.5rem; right: 10.5%; height: 3.5rem;" @click="openExcelUploadPop" v-if="!editYn &&  detailOpenYn && plusMenuShowYn" ><p style="font-size:14px;" v-html="'엑셀<br>업로드'"></p></div>
        <div class="btnPlus" style="bottom: 18.5rem; z-index: 999; width: 3.5rem; right: 10.5%; height: 3.5rem;" @click="addMe" v-if="!editYn && !imInYn && detailOpenYn && plusMenuShowYn" ><p style="font-size:14px;" v-html="'나를<br>추가'"></p></div>
        <div class="btnPlus" style="bottom: 14.5rem; z-index: 999; width: 3.5rem; right: 10.5%; height: 3.5rem;" @click="newAddMember" v-if="!editYn &&  detailOpenYn && plusMenuShowYn" ><p style="font-size:14px;" v-html="'직접<br>추가'"></p></div>
        <div class="btnPlus" style="bottom: 6.5rem; z-index: 999; width: 3.5rem; right: 10.5%; height: 3.5rem;" @click="this.openSelectMemberPop()" v-if="!editYn &&  detailOpenYn && plusMenuShowYn" ><p style="font-size:14px;" v-html="'유저<br>선택'"></p></div>
        <!-- <div class="btnPlus" @click="!detailOpenYn? this.$refs.bookListCompoRef.addNewBook() : plusMenuShowYn = !plusMenuShowYn" v-if="!editYn && !plusMenuShowYn" ><p style="font-size:40px;">+</p></div> -->

        <!-- <div class="btnPlus" @click="!detailOpenYn? this.$refs.bookListCompoRef.creAddressPop() : plusMenuShowYn = !plusMenuShowYn" v-if="!editYn && !plusMenuShowYn" ><p style="font-size:40px;">+</p></div> -->
        <!-- <img src="../../../assets/images/button/Icon_AddressBookBtn.svg" @click="!detailOpenYn? this.$refs.bookListCompoRef.creAddressPop() : plusMenuShowYn = !plusMenuShowYn" v-if="!editYn && !plusMenuShowYn" alt="주소록 만들기 버튼" style="position: absolute; bottom: 2rem; right: 10%;" class="img-78"> -->
        <img src="../../../assets/images/button/Icon_AddressBookBtn.svg" @click="this.$refs.bookListCompoRef.creAddressPop()" v-if="!editYn && !plusMenuShowYn && !detailOpenYn" alt="주소록 만들기 버튼" style="position: absolute; bottom: 2rem; right: 10%;" class="img-78">
        <img src="../../../assets/images/button/Icon_AddMemberBtn.svg" @click="plusMenuShowYn = !plusMenuShowYn" v-if="!editYn && !plusMenuShowYn && detailOpenYn" alt="주소 추가 버튼" style="position: absolute; bottom: 2rem; right: 10%;" class="img-78">

        <div class="btnPlus" style="z-index: 999; background:rgb(144 144 189);" @click="plusMenuShowYn = !plusMenuShowYn" v-if="!editYn && plusMenuShowYn" >
          <img style="width: 20px; margin-bottom: 5px;" src="../../../assets/images/common/popup_close.png" alt="">
        </div>
      </div>
    </div>
    <excelUploadPop @success="successExcelUpload" :cabinetKey="this.selectBookDetail.cabinetKey" :targetKey="this.selectBookDetail.teamKey" v-if="excelUploadShowYn" @closePop="backClick"/>
    <div @click="backClick()" v-if="excelUploadShowYn" style="position: absolute; top: 0; left: 0; width: 100%; height: 100vh; background: #00000030; z-index: 99999;"></div>
  </div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import gConfirmPop from '../confirmPop/Tal_commonConfirmPop.vue'
import findContentsList from '../common/D_findContentsList.vue'
import bookListCompo from './receiverUnit/D_commonBookList.vue'
import memberList from './Tal_commonBookMemberList.vue'
import excelUploadPop from './Tal_excelUpload.vue'
export default {
    props: {
        chanInfo: {},
        propData: {},
        pPopId: {}
    },
    created (){
        this.getBookList()
        this.chanName = this.propData.teamNameMtext || ''

    },
    async mounted () {
        if(this.propData.value && this.propData.value.clickData){
            this.openMCabUserList(this.propData.value.clickData)
        }
    },
    computed: {
        historyStack () {
        return this.$store.getters['D_HISTORY/hRPage']
        },
        pageUpdate () {
        return this.$store.getters['D_HISTORY/hUpdate']
        },
        GE_USER () {
            return this.$store.getters['D_USER/GE_USER']
        },
        CHANNEL_DETAIL () {
            return this.$getDetail('TEAM', this.propData.teamKey)[0]
        }
    },
    watch: {
        pageUpdate (value, old) {
            this.backClick(true)
        },
        historyStack (value, old) {
        }
    },
    components: { findContentsList, bookListCompo,memberList,excelUploadPop, gConfirmPop },
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
            mobileYn: this.$getMobileYn(),
            orderByText: 'creDate',
            searchKeyword: '',
            confirmPopShowYn: false,
            confirmType: 'timeout',
            confirmText: '',
            plusMenuShowYn: false,
            imInYn: false,
            searchFilterList: [],
            tempData: {},
            currentConfirmType: ''
        }
    },
    methods: {
        confirmOk () {
            if (this.currentConfirmType === 'cabinet') {
                this.$refs.bookListCompoRef.deleteCabinet(this.tempData.data, this.tempData.index)
            } else if (this.currentConfirmType === 'member') {
                this.$refs.memberListRef.deleteMember(this.tempData.data, this.tempData.index)
            }
            this.confirmPopShowYn = false
        },
        delAddress (params) {
            this.currentConfirmType = params.targetType
            this.tempData = params
            this.confirmText = (params.targetType === 'cabinet' ? '주소록을' : '주소를' ) + ' 삭제하시겠습니까?'
            this.confirmType = 'two'
            this.confirmPopShowYn = true
        },
        setBookSearchFilter () {
            if (this.selectBookDetail.sSub) {
                if (this.selectBookDetail.sSub === 'STUD') {
                    this.searchFilterList = [{ text: '학번', groupList: [], selectGroup: 'all' }, { text: '학과', groupList: [], selectGroup: 'all' }, { text: '직책', groupList: [], selectGroup: 'all' }]
                    this.searchFilterList = this.searchFilterList.reverse()
                /* this.searchFilter() */
                } else if (this.selectBookDetail.sSub === 'EMPL') {
                    this.searchFilterList = [{ text: '직무', groupList: [], selectGroup: 'all' }, { text: '직책', groupList: [], selectGroup: 'all' }, { text: '직급', groupList: [], selectGroup: 'all' }]
                    this.searchFilterList = this.searchFilterList.reverse()
                }
                this.getMCabGroupList(0)
                this.getMCabGroupList(1)
                this.getMCabGroupList(2)
            }

        },
        async getMCabGroupList (index) {
            var paramMap = new Map()
            paramMap.set('cabinetKey', this.selectBookDetail.cabinetKey)
            paramMap.set('searchKeyStr', 'sSub' + (index + 1))
            var result = await this.$commonAxiosFunction({
            url: 'service//tp.getMCabUserGroupList',
            param: Object.fromEntries(paramMap)
        })
        if (result.data.length > 0) {
            this.searchFilterList = this.searchFilterList.reverse()
            this.searchFilterList[index].groupList = result.data
            this.searchFilterList = this.searchFilterList.reverse()
        }
    },
        changeOrderBy () {
            // this.orderByText = order
            // this.orderByPopShowYn = false
            if (this.cabinetName !== '') {
                this.getBookMemberList()
            } else {
                this.getBookList()
            }
        },
        /* searchNanmeMtext() {
            this.searchKeyword
        }, */
        async getBookList () {
            this.bookList = []
            this.$showAxiosLoading(true)
            var paramMap = new Map()
            paramMap.set('cabinetNameMtext', this.searchKeyword)

            paramMap.set('teamKey', this.propData.teamKey)
            paramMap.set('sysCabinetCode', 'USER')
            paramMap.set('adminYn', true)
            var result = await this.$commonAxiosFunction({
                url: 'service//tp.getTeamMenuList',
                param: Object.fromEntries(paramMap)
            })
            this.$showAxiosLoading(false)
            this.bookList = result.data
            for(var i = 0; i < this.bookList.length; i ++) {
                var changeT = this.bookList[i].cabinetNameMtext
                this.bookList[i].cabinetNameMtext = this.$changeText(changeT)
            }
            //
        },
        openPop (params) {
            this.$emit('openPop',params)
        },
        newAddMember(){
            this.plusMenuShowYn = false
            // this.newYn = false
            var data = new Object()
            data.targetType = 'bookMemberDetail'
            data.currentCabinetKey = this.selectBookDetail.cabinetKey
            data.currentTeamKey = this.CHANNEL_DETAIL.teamKey
            this.$emit('openPop',data)
        },
        async addMe () {
            var me = new Object()
            me.userEmail = this.GE_USER.userEmail
            if (this.GE_USER.phoneEnc) {
               me.userPhone = this.GE_USER.phoneEnc
            }
            if (this.GE_USER.userDispMtext) {
               me.userDispMtext = this.GE_USER.userDispMtext
            }
            await this.saveMemberDirectly(me)
            this.plusMenuShowYn = false
        },
        async saveMemberDirectly (selectMem) {
           var userKeyList = []
            // eslint-disable-next-line no-new-object
            var param = new Object()
            // eslint-disable-next-line no-unused-vars
            var result = null
            // eslint-disable-next-line no-unused-vars
            if (selectMem !== undefined && selectMem !== null && selectMem !== '') {
                // eslint-disable-next-line no-new-object
                var mCabContents = new Object()
                // eslint-disable-next-line no-new-object
                param = new Object()
                mCabContents.jobkindId = 'USER'
                mCabContents.cabinetKey = this.selectBookDetail.cabinetKey
                mCabContents.targetKey = this.CHANNEL_DETAIL.teamKey

                mCabContents.inEmail = selectMem.userEmail
                mCabContents.inPhone = selectMem.userPhone
                mCabContents.inUserName = this.$changeText(selectMem.userDispMtext || selectMem.userNameMtext)
                param.mCabContents = mCabContents
                result = await this.$saveMCabContents(param)
                if (result.data.result) {
                    await this.getBookMemberList()
                }
            }
        },
        async getBookMemberList () {
            this.imInYn = false
            this.detailOpenYn = false
            var paramMap = new Map()
            this.$showAxiosLoading(true)
            var orderText = 'mcc.creDate DESC'
            if (this.orderByText === 'userDispMtext') {
                orderText = 'u.userDispMtext'
            }
            this.searchFilterList = this.searchFilterList.reverse()
            if (this.searchFilterList.length > 0) {
                for (var s = 0; s < this.searchFilterList.length; s++) {
                    if (this.searchFilterList[s].selectGroup !== 'all') {
                        paramMap.set('sSub' + (s + 1), this.searchFilterList[s].selectGroup)
                    }
                }
            }
            this.searchFilterList = this.searchFilterList.reverse()
            paramMap.set('orderbyStr', orderText)
            paramMap.set('userDispMtext', this.searchKeyword)
            paramMap.set('cabinetKey', this.selectBookDetail.cabinetKey)
            paramMap.set('jobkindId', 'USER')
            var result = await this.$commonAxiosFunction({
                url: 'service//tp.getMCabContentsList',
                param: Object.fromEntries(paramMap)
            })
            this.$showAxiosLoading(false)
            this.memberList = result.data
            if (this.memberList) { // dispName이 없을시 userName으로 대체
                for (var i =0; i < this.memberList.length; i ++) {
                    if(this.memberList[i].userDispMtext !== undefined && this.memberList[i].userDispMtext !== null && this.memberList[i].userDispMtext !== '') {

                    } else {
                        this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
                    }
                    if (this.memberList[i].userKey === this.GE_USER.userKey) {
                        /* if (this.imInYn) this.imInYn = true */
                        this.imInYn = true
                    }
                }
                this.cabinetName = this.$changeText(this.selectBookDetail.cabinetNameMtext)
                this.detailOpenYn = true
            }
        },
        editYnCheck(data) {
            this.editYn = data
        },
        goCabinetList () {
            this.searchKeyword = ''
            var hStack = this.$store.getters['D_HISTORY/hStack']
            var removePage = hStack[hStack.length - 1]
            if (this.selectPopId === hStack[hStack.length - 1]) {
                hStack = hStack.filter((element, index) => index < hStack.length - 1)
                this.$store.commit('D_HISTORY/setRemovePage', removePage)
                this.$store.commit('D_HISTORY/updateStack', hStack)
                this.detailOpenYn = false
                this.cabinetName = ''
                this.receiverTitle = '주소록 관리'
            } else {
                return
            }
        },
        backClick (backYn) {
            var hStack = this.$store.getters['D_HISTORY/hStack']
            var removePage = hStack[hStack.length - 1]
            if (this.propData.value && this.propData.value.clickData) {
                if (this.excelPopId === hStack[hStack.length - 1]) {
                    hStack = hStack.filter((element, index) => index < hStack.length - 1)
                    this.$store.commit('D_HISTORY/setRemovePage', removePage)
                    this.$store.commit('D_HISTORY/updateStack', hStack)
                    this.excelUploadShowYn = false
                } else {
                    this.searchKeyword = ''
                    hStack = hStack.filter((element, index) => index < hStack.length - 1)
                    this.$store.commit('D_HISTORY/setRemovePage', removePage)
                    this.$store.commit('D_HISTORY/updateStack', hStack)
                    this.detailOpenYn = false
                    this.cabinetName = ''
                    this.$emit('closeXPop')
                }
            } else {
                if (this.selectPopId === hStack[hStack.length - 1]) {
                    this.searchKeyword = ''
                    hStack = hStack.filter((element, index) => index < hStack.length - 1)
                    this.$store.commit('D_HISTORY/setRemovePage', removePage)
                    this.$store.commit('D_HISTORY/updateStack', hStack)
                    this.detailOpenYn = false
                    this.cabinetName = ''
                    this.receiverTitle = '주소록 관리'
                }
                else if (this.subPopId === hStack[hStack.length - 1]) {
                    this.searchKeyword = ''
                    hStack = hStack.filter((element, index) => index < hStack.length - 1)
                    this.$store.commit('D_HISTORY/setRemovePage', removePage)
                    this.$store.commit('D_HISTORY/updateStack', hStack)
                    this.detailOpenYn = false
                    this.cabinetName = ''
                    this.receiverTitle = '주소록 관리'
                } else  if (this.excelPopId === hStack[hStack.length - 1]) {
                    hStack = hStack.filter((element, index) => index < hStack.length - 1)
                    this.$store.commit('D_HISTORY/setRemovePage', removePage)
                    this.$store.commit('D_HISTORY/updateStack', hStack)
                    this.excelUploadShowYn = false
                } else {
                    if (backYn) {

                    }   else {
                        this.$emit('closeXPop')
                    }
                }
            }
        },
        async openMCabUserList(data){
            this.searchKeyword = ''
            this.receiverTitle = data.cabinetNameMtext /* + ' 멤버 관리' */
            this.selectBookDetail = data
            this.setBookSearchFilter()
            var history = this.$store.getters['D_HISTORY/hStack']
            this.selectPopId = 'selectMemeberPopup' + history.length
            this.selectPopId = this.$setParentsId(this.pPopId, this.selectPopId)
            history.push(this.selectPopId)
            this.$store.commit('D_HISTORY/updateStack', history)

            await this.getBookMemberList()

        },
        closeSearchPop (){
            this.findPopShowYn = false
        },
        searchFilter () {
            // this.searchFilterList = param
            this.getBookMemberList()
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
            this.plusMenuShowYn = false
            if (!this.mobileYn) {
                var history = this.$store.getters['D_HISTORY/hStack']
                this.excelPopId = 'excelUploadPop' + history.length
                this.excelPopId = this.$setParentsId(this.pPopId, this.excelPopId)
                history.push(this.excelPopId)
                this.$store.commit('D_HISTORY/updateStack', history)

                this.excelUploadShowYn = true
            } else {
                this.confirmText = '엑셀업로드 기능은<br>더알림 PC버전에서만 가능합니다'
                this.confirmType = 'timeout'
                this.confirmPopShowYn = true
            }
        },
        async openSelectMemberPop () {
        // eslint-disable-next-line no-new-object
            var params = new Object()
            params.teamKey = this.CHANNEL_DETAIL.teamKey
            params.showProfileYn = true
            var result = await this.$commonAxiosFunction({
                url: 'service//tp.getFollowerList',
                param: params
            })

            this.selMemberList = result.data.content
            // this.list = []
            this.propData.currentCabinetKey = this.selectBookDetail.cabinetKey
            var param = new Object()
            param.targetType = 'selectMemberPop'
            param.cabinetNameMtext = this.selectBookDetail.cabinetNameMtext
            param.pSelectedList = this.memberList
            param.cabinetKey = this.propData.currentCabinetKey
            param.selectMemberType = 'member'
            param.currentTeamKey = this.CHANNEL_DETAIL.teamKey
            param.editBookOpend = true

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
.bookAndMemListWrap{width: 100%; height: calc(100% - 1rem); position: relative; overflow: hidden auto;}
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

.commonSelectBox {
    border-radius: 5px !important;
    border: 1px solid #ccc !important;
    white-space: nowrap !important;
    overflow: scroll hidden !important;
    padding: 5px ;
    color: #303030 !important;
    background: ghostwhite !important;
}
</style>
