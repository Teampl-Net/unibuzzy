<i18n>
{
  "ko": {
    "EDIT_BOOK_TITLE_FILTER": "세부필터",
    "EDIT_BOOK_MSG_NAME": "이름을 입력해주세요",
    "EDIT_BOOK_MSG_BOOK": "주소록명을 입력해주세요",
    "EDIT_BOOK_BTN_CRE": "등록순",
    "EDIT_BOOK_BTN_NAME": "이름순",
    "EDIT_BOOK_BTN_EXCEL": "엑셀<br>업로드",
    "EDIT_BOOK_BTN_ME": "나를<br>추가",
    "EDIT_BOOK_BTN_DIRECT": "직접<br>추가",
    "EDIT_BOOK_BTN_USER": "유저<br>선택",
    "EDIT_BOOK_BTN_CREATE": "주소록 생성",
    "EDIT_BOOK_NAME_ID": "학번",
    "EDIT_BOOK_NAME_MAJOR": "학과",
    "EDIT_BOOK_NAME_DUTY": "직책",
    "EDIT_BOOK_NAME_JOB": "직무",
    "EDIT_BOOK_NAME_POSITION": "직급",
    "EDIT_BOOK_NAME_ADDUSER": "유저 추가",
    "EDIT_BOOK_MSG_EXCEL": "엑셀업로드 기능은<br>더알림 PC버전에서만 가능합니다."
  },
  "en": {
    "EDIT_BOOK_TITLE_FILTER": "More Filters",
    "EDIT_BOOK_MSG_NAME": "Write down a name",
    "EDIT_BOOK_MSG_BOOK": "Write down a name of the team",
    "EDIT_BOOK_BTN_CRE": "Created",
    "EDIT_BOOK_BTN_NAME": "Name",
    "EDIT_BOOK_BTN_EXCEL": "Upload<br>Excel File",
    "EDIT_BOOK_BTN_ME": "Add<br>Me",
    "EDIT_BOOK_BTN_DIRECT": "Add<br>Manually",
    "EDIT_BOOK_BTN_USER": "Select<br>User",
    "EDIT_BOOK_BTN_CREATE": "Create team",
    "EDIT_BOOK_NAME_ID": "ID #",
    "EDIT_BOOK_NAME_MAJOR": "Major",
    "EDIT_BOOK_NAME_DUTY": "Duty",
    "EDIT_BOOK_NAME_JOB": "Job",
    "EDIT_BOOK_NAME_POSITION": "Position",
    "EDIT_BOOK_NAME_ADDUSER": "Add User",
    "EDIT_BOOK_MSG_EXCEL": "The Excel upload function is<br>only available in the PC version."
  }
}
</i18n>
<template>
  <div v-if="CHANNEL_DETAIL"  class="editBookListWrap">
    <transition name="show_left">
      <creAddressBook v-if="mPopType === 'creAddressBook' || mPopType === 'editAddressBook'" :propData="mPropData" @closeXPop="closePop" :pClosePop="backClick" />
    </transition>
    <onlyMemberSelectPop v-if="mPopType === 'selectMemberPop'" :pSelectedList="memberList" :propData="mPropData" :pClosePop="backClick" />
    <bookMemberDetail v-if="mPopType === 'bookMemberDetail'" @addDirectAddMemList="saveMemberDirectly" :propData="mPropData" :pClosePop="backClick" />
    <gPopHeader :headerTitle="mDetailOpenYn? `Manage ${$changeText(selectBookDetail.cabinetNameMtext)}`:'Manage Team'" :pClosePop="closeXPop" />
    <gConfirmPop :confirmText='mConfirmText' :confirmType="mConfirmType" v-if="mConfirmPopShowYn" @no='mConfirmPopShowYn=false' @ok='confirmOk' />
    <div class="pagePaddingWrap longHeight bookListBox"  :style="'padding-top:' + ($STATUS_HEIGHT + 60)+ 'px'">
      <div class="w100P filterArea" v-if="mCabinetName !== ''" >
        <div class="searchBox" v-if="mSearchFilterList.length > 0">
          <p class="font14 commonBlack fontBold fl lineHeight30">{{ $t('EDIT_BOOK_TITLE_FILTER') }}</p>
          <div class="selectBox">
            <div class="selectList" v-for="(value, index) in mSearchFilterList" :key="index">
              <select  v-model="value.selectGroup" @change="searchFilter()"  name="" class="font14" id="">
                <option value="all" @click="changeValue('all')">{{value.text + $t('COMMON_TAB_ALL')}}</option>
                <option :value="option" @click="changeValue(option)" v-for="(option, oIdx) in value.groupList" :key="oIdx">{{option}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="w100P fl searchWrap">
          <div class="fl searchInput">
            <img @click="mCabinetName !== ''? getBookMemberList():getBookList()" class="cursorP" src="@/assets/images/common/iocn_search.png" alt="검색버튼">
            <input @click="mSearchKeyword = ''" v-model="mSearchKeyword" type="text"  @keyup.enter="mCabinetName !== ''? getBookMemberList():getBookList()" :placeholder="mCabinetName !== ''? $t('EDIT_BOOK_MSG_NAME'):$t('EDIT_BOOK_MSG_BOOK')">
          </div>
          <div class="CDeepBorderColor fr orderBox">
            <p class="font12 fl" @click="mOrderByText = 'creDate', changeOrderBy()" :class="{'CDeepBgColor whiteColor':mOrderByText === 'creDate'}">{{ $t('EDIT_BOOK_BTN_CRE') }}</p>
            <p class="font12 fl" @click="mOrderByText = 'userDispMtext', changeOrderBy()" :class="{'CDeepBgColor whiteColor':mOrderByText === 'userDispMtext'}">{{ $t('EDIT_BOOK_BTN_NAME') }}</p>
          </div>
        </div>
      </div>
      <div class="bookAndMemListWrap" :style="mDetailOpenYn ? 'height: calc(100% - 80px);' : '' ">
        <gBookList class="editBookContentListCompo" ref="bookListCompoRef" v-if="!mDetailOpenYn" :propBookList="mEditBookList" :propData="propData" :selectBookDetail="selectBookDetail" @getTeamCabList="getBookList" @refreshList="getBookList" @openMCabUserList='openMCabUserList' @openPop="openPop" @delAddress="delAddress" />
        <transition name="showGroup">
          <gBookMemberList  class="editBookContentListCompo" ref="memberListRef" v-if="mDetailOpenYn" @memberInfo="memberInfo" :pFollowerMemList="mFollowerMemList" :propMemberList="memberList" :propData="selectBookDetail"  :pSearchFilterList="mSearchFilterList" @searchFilter="searchFilter" :bookType="selectBookDetail.sSub" @refreshList="getBookMemberList" :selectPopYn="false" :parentSelectList="[]" :teamInfo="CHANNEL_DETAIL" transition="showGroup" @openPop="openPop" @delAddress="delAddress" />
        </transition>
        <div class="btnPlus btn1" @click="openExcelUploadPop" v-if="mDetailOpenYn && mPlusMenuShowYn" >
          <p class="font12" v-html="$t('EDIT_BOOK_BTN_EXCEL')"></p>
        </div>
        <div class="btnPlus btn2" @click="addMe" v-if="!mImInYn && mDetailOpenYn && mPlusMenuShowYn" >
          <p class="font12" v-html="$t('EDIT_BOOK_BTN_ME')"></p>
        </div>
        <div class="btnPlus btn3" @click="newAddMember" v-if=" mDetailOpenYn && mPlusMenuShowYn" >
          <p class="font12" v-html="$t('EDIT_BOOK_BTN_DIRECT')"></p>
        </div>
        <div class="btnPlus btn4" @click="openSelectMemberPop()" v-if="mDetailOpenYn && mPlusMenuShowYn" >
          <p class="font12" v-html="$t('EDIT_BOOK_BTN_USER')"></p>
        </div>

        <img src="@/assets/images/button/Icon_AddressBookBtn.png" @click="creAddressPop()" v-if="!mPlusMenuShowYn && !mDetailOpenYn" alt="button of create team" class="img-78 img-w66 createTeamBtn">
        <img src="@/assets/images/button/Icon_AddMemberBtn.png" @click="mPlusMenuShowYn = !mPlusMenuShowYn" v-if="!mPlusMenuShowYn && mDetailOpenYn" alt="button of add member" class="img-78 img-w66 createTeamBtn">

        <div class="btnPlus closeBtn" @click="mPlusMenuShowYn = !mPlusMenuShowYn" v-if="mPlusMenuShowYn && (CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1 || CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1)" >
          <img src="@/assets/images/common/popup_close.png" alt="">
        </div>
      </div>
    </div>
    <excelUploadPop @success="successExcelUpload" :cabinetKey="selectBookDetail.cabinetKey" :targetKey="selectBookDetail.teamKey" v-if="mExcelUploadShowYn" @closePop="backClick"/>
    <div class="popShadow" @click="backClick()" v-if="mExcelUploadShowYn"></div>
  </div>
</template>

<script>
import creAddressBook from './CreAddressBook.vue'
import excelUploadPop from '@/components/pageComponents/channel/popup/ExcelUpload.vue'
import onlyMemberSelectPop from './OnlyMemberSelectPop.vue'
import bookMemberDetail from './BookMemberDetail.vue'
export default {
  props: {
    propData: {},
    pPopId: {},
    pClosePop: Function,
    propBookDetailPopYn: {}
  },
  mounted () {
    if (!this.propData.initData) {
      this.getBookList()
    } else {
      this.mEditBookList = this.propData.initData
    }

    if (this.propData.value && this.propData.value.clickData) {
      this.openMCabUserList(this.propData.value.clickData)
    }
  },
  components: { excelUploadPop, creAddressBook, onlyMemberSelectPop, bookMemberDetail },
  data () {
    return {
      mEditBookList: [],
      mSelectPopId: null,
      mDetailOpenYn: false,
      mCabinetName: '',

      mExcelUploadShowYn: false,
      mExcelPopId: null,

      mMobileYn: this.$getMobileYn(),
      mOrderByText: 'creDate',
      mSearchKeyword: '',

      mConfirmPopShowYn: false,
      mConfirmType: 'timeout',
      mConfirmText: '',
      mPlusMenuShowYn: false,

      mImInYn: false,
      mSearchFilterList: [],
      mTempData: {},
      mCurrentConfirmType: '',
      mPopType: '',
      mPropData: {},
      mCreAddrId: '',
      mFollowerMemList: []
    }
  },
  methods: {
    memberInfo (member) {
      this.$emit('memberInfo', member)
    },
    closeXPop () {
      if (this.pClosePop) {
        this.pClosePop()
      } else {
        this.$emit('closeXPop')
      }
    },
    async closePop () {
      if (this.mPopType === 'creAddressBook') {
        var hStack = this.$store.getters['UB_HISTORY/hStack']
        var removePage = hStack[hStack.length - 1]
        if (this.mCreAddrId === hStack[hStack.length - 1]) {
          hStack = hStack.filter((element, index) => index < hStack.length - 1)
          this.$store.commit('UB_HISTORY/setRemovePage', removePage)
          this.$store.commit('UB_HISTORY/updateStack', hStack)
        }
        await this.getBookList()
      } else if (this.mPopType === 'selectMemberPop') {
        await this.getBookMemberList()
      }
      this.mPopType = ''
    },
    async creAddressPop () {
      var cabinet = {}
      var param = {}
      param.targetType = 'creAddressBook'
      param.popHeaderText = this.$t('EDIT_BOOK_BTN_CREATE')
      param.newAddressYn = true
      cabinet.cabinetNameMtext = await this.$checkSameName(this.mEditBookList, this.$t('COMMON_NAME_ADDRBOOK'))
      cabinet.currentTeamKey = this.propData.teamKey
      cabinet.sysCabinetCode = 'USER'
      cabinet.creTeamKey = this.propData.teamKey
      cabinet.menuType = 'G'
      param.cabinet = cabinet
      this.mPropData = param
      var history = this.$store.getters['UB_HISTORY/hStack']
      this.mCreAddrId = 'creAddressBook' + history.length
      history.push(this.mCreAddrId)
      this.$store.commit('UB_HISTORY/updateStack', history)
      this.mPopType = 'creAddressBook'
    },
    confirmOk () {
      if (this.mCurrentConfirmType === 'cabinet') {
        this.$refs.bookListCompoRef.deleteCabinet(this.mTempData.data, this.mTempData.index)
      } else if (this.mCurrentConfirmType === 'member') {
        this.$refs.memberListRef.deleteMember(this.mTempData.data, this.mTempData.index)
      }
      this.mConfirmPopShowYn = false
    },
    delAddress (params) {
      this.mCurrentConfirmType = params.targetType
      this.mTempData = params
      if (this.GE_LOCALE === 'ko') {
        this.mConfirmText = (params.targetType === 'cabinet' ? '주소록을' : '주소를') + ' 삭제하시겠습니까?'
      } else {
        this.mConfirmText = `Are you sure you want to delete the ${(params.targetType === 'cabinet' ? 'team' : 'address')}?`
      }
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
    },
    setBookSearchFilter () {
      if (this.selectBookDetail.sSub) {
        if (this.selectBookDetail.sSub === 'STUD') {
          this.mSearchFilterList = [{ text: this.$t('EDIT_BOOK_NAME_ID'), groupList: [], selectGroup: 'all' }, { text: this.$t('EDIT_BOOK_NAME_MAJOR'), groupList: [], selectGroup: 'all' }, { text: this.$t('EDIT_BOOK_NAME_DUTY'), groupList: [], selectGroup: 'all' }]
          this.mSearchFilterList = this.mSearchFilterList.reverse()
        } else if (this.selectBookDetail.sSub === 'EMPL') {
          this.mSearchFilterList = [{ text: this.$t('EDIT_BOOK_NAME_JOB'), groupList: [], selectGroup: 'all' }, { text: this.$t('EDIT_BOOK_NAME_POSITION'), groupList: [], selectGroup: 'all' }, { text: this.$t('EDIT_BOOK_NAME_ADDUSER'), groupList: [], selectGroup: 'all' }]
          this.mSearchFilterList = this.mSearchFilterList.reverse()
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
        url: '/sUniB/tp.getMCabUserGroupList',
        param: Object.fromEntries(paramMap)
      })
      if (result.data.length > 0) {
        this.mSearchFilterList = this.mSearchFilterList.reverse()
        this.mSearchFilterList[index].groupList = result.data
        this.mSearchFilterList = this.mSearchFilterList.reverse()
      }
    },
    changeOrderBy () {
      if (this.mCabinetName !== '') {
        this.getBookMemberList()
      } else {
        this.getBookList()
      }
    },
    async getBookList () {
      this.mEditBookList = []
      var paramMap = new Map()
      paramMap.set('cabinetNameMtext', this.mSearchKeyword)
      paramMap.set('teamKey', this.propData.teamKey)
      paramMap.set('sysCabinetCode', 'USER')
      paramMap.set('adminYn', true)
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getTeamMenuList',
        param: Object.fromEntries(paramMap)
      })
      this.mEditBookList = result.data
      for (var i = 0; i < this.mEditBookList.length; i++) {
        var changeT = this.mEditBookList[i].cabinetNameMtext
        this.mEditBookList[i].cabinetNameMtext = this.$changeText(changeT)
      }
    },
    openPop (params) {
      if (params.targetType === 'creAddressBook') {
        this.mPropData = params
        this.mPopType = 'editAddressBook'
      }
    },
    newAddMember () {
      this.mPlusMenuShowYn = false
      var data = {}
      data.targetType = 'bookMemberDetail'
      data.popHeaderText = this.$t('EDIT_BOOK_NAME_ADDUSER')
      data.currentCabinetKey = this.selectBookDetail.cabinetKey
      data.currentTeamKey = this.CHANNEL_DETAIL.teamKey
      this.mPropData = data
      this.mPopType = 'bookMemberDetail'
    },
    async addMe () {
      var myData = {}
      myData.userEmail = this.GE_USER.userEmail
      if (this.GE_USER.phoneEnc) {
        myData.userPhone = this.GE_USER.phoneEnc
      }
      if (this.GE_USER.userDispMtext) {
        myData.userDispMtext = this.GE_USER.userDispMtext
      }
      await this.saveMemberDirectly(myData)
      this.mPlusMenuShowYn = false
    },
    async saveMemberDirectly (selectMem) {
      var param = {}
      var result = null
      if (selectMem !== undefined && selectMem !== null && selectMem !== '') {
        var mCabContents = {}
        param = {}
        mCabContents.jobkindId = 'USER'
        mCabContents.cabinetKey = this.selectBookDetail.cabinetKey
        mCabContents.targetKey = this.CHANNEL_DETAIL.teamKey

        mCabContents.inEmail = selectMem.userEmail
        mCabContents.inPhone = selectMem.userPhone
        mCabContents.inUserName = this.$changeText(selectMem.userDispMtext || selectMem.userNameMtext)
        param.mCabContents = mCabContents
        result = await this.$saveMCabContents(param)
        if (result && result.data && result.data.result) {
          this.closePop()
          await this.getBookMemberList()
        }
      }
    },
    async getBookMemberList () {
      this.mImInYn = false
      this.mDetailOpenYn = false
      var paramMap = new Map()
      var orderText = 'mcc.creDate DESC'
      if (this.mOrderByText === 'userDispMtext') {
        orderText = 'u.userDispMtext'
      }
      this.mSearchFilterList = this.mSearchFilterList.reverse()
      if (this.mSearchFilterList.length > 0) {
        for (var s = 0; s < this.mSearchFilterList.length; s++) {
          if (this.mSearchFilterList[s].selectGroup !== 'all') {
            paramMap.set('sSub' + (s + 1), this.mSearchFilterList[s].selectGroup)
          }
        }
      }
      this.mSearchFilterList = this.mSearchFilterList.reverse()
      paramMap.set('orderbyStr', orderText)
      paramMap.set('userDispMtext', this.mSearchKeyword)
      paramMap.set('cabinetKey', this.selectBookDetail.cabinetKey)
      paramMap.set('jobkindId', 'USER')
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMCabContentsList',
        param: Object.fromEntries(paramMap)
      })
      this.memberList = result.data
      this.mFollowerMemList = result.data
      if (this.memberList) { // dispName이 없을시 userName으로 대체
        for (var i = 0; i < this.memberList.length; i++) {
          if (this.memberList[i].userDispMtext !== undefined && this.memberList[i].userDispMtext !== null && this.memberList[i].userDispMtext !== '') {

          } else {
            this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
          }
          if (this.memberList[i].userKey === this.GE_USER.userKey) {
            this.mImInYn = true
          }
        }
        this.mCabinetName = this.$changeText(this.selectBookDetail.cabinetNameMtext)
        this.mDetailOpenYn = true
        this.$emit('openBookDetailPop')
      }
    },
    backClick (backYn) {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.propData.value && this.propData.value.clickData) {
        if (this.mExcelPopId === hStack[hStack.length - 1]) {
          hStack = hStack.filter((element, index) => index < hStack.length - 1)
          this.$store.commit('UB_HISTORY/setRemovePage', removePage)
          this.$store.commit('UB_HISTORY/updateStack', hStack)
          this.mExcelUploadShowYn = false
        } else {
          this.mSearchKeyword = ''
          hStack = hStack.filter((element, index) => index < hStack.length - 1)
          this.$store.commit('UB_HISTORY/setRemovePage', removePage)
          this.$store.commit('UB_HISTORY/updateStack', hStack)
          this.getBookList()
          this.mDetailOpenYn = false
          this.mCabinetName = ''
          this.$emit('closeXPop')
        }
      } else {
        if (this.mSelectPopId === hStack[hStack.length - 1]) {
          this.mSearchKeyword = ''
          hStack = hStack.filter((element, index) => index < hStack.length - 1)
          this.$store.commit('UB_HISTORY/setRemovePage', removePage)
          this.$store.commit('UB_HISTORY/updateStack', hStack)
          // this.getBookList()
          if (this.mSelectPopId === 'selectMemberPop') {
            this.getBookMemberList()
            this.this.mSelectPopId = ''
          } else {
            this.mDetailOpenYn = false
            this.mCabinetName = ''
            this.closePop()
          }
        } else if (this.mExcelPopId === hStack[hStack.length - 1]) {
          hStack = hStack.filter((element, index) => index < hStack.length - 1)
          this.$store.commit('UB_HISTORY/setRemovePage', removePage)
          this.$store.commit('UB_HISTORY/updateStack', hStack)
          this.mExcelUploadShowYn = false
        } else {
          if (backYn) {

          } else {
            this.getBookMemberList()
            this.mPopType = ''
            this.$emit('closeXPop')
          }
        }
      }
    },
    async openMCabUserList (data) {
      this.mSearchKeyword = ''
      this.selectBookDetail = data
      this.setBookSearchFilter()
      var history = this.$store.getters['UB_HISTORY/hStack']
      this.mSelectPopId = 'selectMemeberPopup' + history.length
      history.push(this.mSelectPopId)
      this.$store.commit('UB_HISTORY/updateStack', history)

      await this.getBookMemberList()
    },
    searchFilter () {
      this.getBookMemberList()
    },
    openExcelUploadPop () {
      this.mPlusMenuShowYn = false
      if (!this.mMobileYn) {
        var history = this.$store.getters['UB_HISTORY/hStack']
        this.mExcelPopId = 'excelUploadPop' + history.length
        this.mExcelPopId = this.$setParentsId(this.pPopId, this.mExcelPopId)
        history.push(this.mExcelPopId)
        this.$store.commit('UB_HISTORY/updateStack', history)

        this.mExcelUploadShowYn = true
      } else {
        this.mConfirmText = this.$t('EDIT_BOOK_MSG_EXCEL')
        this.mConfirmType = 'timeout'
        this.mConfirmPopShowYn = true
      }
    },
    async openSelectMemberPop () {
      // eslint-disable-next-line vue/no-mutating-props
      this.propData.currentCabinetKey = this.selectBookDetail.cabinetKey
      var param = {}
      param.targetType = 'selectMemberPop'
      param.cabinetNameMtext = this.selectBookDetail.cabinetNameMtext
      if (this.GE_LOCALE === 'ko') {
        param.popHeaderText = this.selectBookDetail.cabinetNameMtext + '에 추가할 유저'
      } else {
        param.popHeaderText = `Who to add to ${this.selectBookDetail.cabinetNameMtext}`
      }
      param.pSelectedList = this.memberList
      param.cabinetKey = this.propData.currentCabinetKey
      param.selectMemberType = 'member'
      param.currentTeamKey = this.CHANNEL_DETAIL.teamKey
      param.editBookOpend = true
      this.mSelectPopId = 'selectMemberPop'
      var history = this.$store.getters['UB_HISTORY/hStack']
      history.push(this.mCreAddrId)
      this.$store.commit('UB_HISTORY/updateStack', history)

      this.mPropData = param
      this.mPopType = 'selectMemberPop'
    },
    successExcelUpload () {
      this.backClick()
      this.refresh()
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    },
    historyStack () {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    },
    CHANNEL_DETAIL () {
      return this.$getDetail('TEAM', this.propData.teamKey)[0]
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.backClick(true)
    },
    propBookDetailPopYn () {
      if (this.propBookDetailPopYn === false) this.backClick()
    }
  }
}
</script>

<style scoped>
/* btnPlus common.css로 옮김 */
.btn1, .btn2, .btn3, .btn4 {
  z-index: 999 !important;
  width: 3.5rem !important;
  right: 10.5% !important;
  height: 3.5rem !important;
}
.btn1 {
  bottom: 10.5rem;
}
.btn2 {
  bottom: 18.5rem;
}
.btn3 {
  bottom: 14.5rem;
}
.btn4 {
  bottom: 6.5rem;
}
.bookAndMemListWrap {
  width: 100%;
  height: calc(100% - 1rem);
  position: relative;
  overflow: hidden auto;
}
.editBookListWrap {
  height: 100vh;
  background-color: white;
  width:100%;
  z-index: 99999;
  position: absolute;
  top: 0;
  left: 0;
}

.longHeight {
  height: 100% !important;
}
.selectedReceiverBox {
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
input:focus {
  outline: none;
}
.editBookContentListCompo {
  width:100%;
  position: absolute;
  height: 100%;
  overFlow: hidden scroll;
  top: 0;
  background: #fff;
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
.bookListBox {
  height:calc(100% - 300px);
  overflow: hidden;
}
.filterArea {
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
  min-height: 40px;
  margin: 5px 0;
  overflow: hidden;
}
.searchBox {
  width: calc(100%);
  min-height: 30px;
  float: right;
  margin-bottom: 5px;
}
.selectBox {
  height: 100%;
  float: right;
  width: calc(100% - 60px);
  max-width: calc(100% - 60px);
}
.selectList {
  width: 20%;
  min-width: 90px;
  padding: 0 3px;
  height: 30px;
  float: right;
}
.selectList > select {
  background: #fff !important;
  border: none!important;
  border-right: #6768a745!important;
  width: calc(100% );
  height: 30px;
  float: left;
  text-align:center;
}
.searchWrap {
  min-width: 120px;
}
.searchInput {
  position: relative;
  width: calc(100% - 120px);
}
.searchInput > img {
  float: right;
  position: absolute;
  left: 10px;
  width: 20px;
  margin-top: 5px;
  margin-right: 5px;
}
.searchInput > input {
  float: right;
  width: 100%;
  min-height: 30px;
  min-width: 100%;
  padding-left: 40px!important;
}
.orderBox {
  border-radius: 20px;
  width:110px;
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.orderBox > p {
  padding: 2px 7px;
  border-radius: 20px
}
.createTeamBtn {
  position: absolute;
  bottom: 2rem;
  right: 10%;
}
.closeBtn {
  z-index: 999;
  background:rgb(144 144 189);
}
.closeBtn > img {
  width: 20px;
  margin-bottom: 5px;
}
.popShadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #00000030;
  z-index: 99999;
}
</style>
