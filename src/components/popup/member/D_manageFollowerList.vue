<i18n>
{
  "ko": {
    "FOLLOW_MSG_USERINFO": "이름 또는 전화번호를 입력해주세요",
    "FOLLOW_BTN_ORDER_CRE": "등록순",
    "FOLLOW_BTN_ORDER_NAME": "이름순",
    "FOLLOW_BTN_MANA_MEM": "멤버관리",
    "FOLLOW_BTN_MANA_TYPE": "유형관리",
    "FOLLOW_MSG_SUCCESS": "승인되었습니다!",
    "FOLLOW_TITLE_MANA_MEMTYPE": "멤버유형관리",
    "FOLLOW_MSG_WAIT": "상대방이 구독하기를 기다리는 중 입니다.",
    "FOLLOW_MSG_AUTO": "구독 시 자동으로 매니저로 등록됩니다.",
    "FOLLOW_TITLE_ADD_USER": "유저 추가"
  },
  "en": {
    "FOLLOW_MSG_USERINFO": "Write down name or phone number",
    "FOLLOW_BTN_ORDER_CRE": "Created",
    "FOLLOW_BTN_ORDER_NAME": "Name",
    "FOLLOW_BTN_MANA_MEM": "Manage Members",
    "FOLLOW_BTN_MANA_TYPE": "Manage Types",
    "FOLLOW_MSG_SUCCESS": "Approved!",
    "FOLLOW_TITLE_MANA_MEMTYPE": "Manage Member Types",
    "FOLLOW_MSG_WAIT": "Waiting for the other person to subscribe.",
    "FOLLOW_MSG_AUTO": "Users are automatically registered as managers upon subscription.",
    "FOLLOW_TITLE_ADD_USER": "Add a User"
  }
}
</i18n>
<template>
<div class="w100P h100P"  style="position: absolute; top: 0; padding: 60px 1rem 0 1rem; " :style="'padding-top:' + (this.$STATUS_HEIGHT + 60)+ 'px'">
    <!-- <div style="width: 100%; float: left; height: 40px;">
        <p class="font16 fontBold fl mright-05 grayBlack">필터: </p>
        <div class="font16 filterBlock" style="">관리자<img class="cursorP" style="" src="../../../assets/images/common/searchXIcon.svg" alt=""></div>
    </div> -->
    <!-- <input type="text" name="" placeholder="이름을 입력해주세요." class="fl" id=""> -->
    <div class="pageTopAreaStyle">
        <div class="receptListBtnStyle fr" style="margin-bottom: 10px;">
          <gBtnSmall @click="openMemberTypePop" :btnTitle="$t('FOLLOW_BTN_MANA_TYPE')" style="padding: 0 10px !important;" class="cursorP fl"/>
          <gBtnSmall @click="openReceptListPop" :btnTitle="$t('COMMON_BTN_REQLIST')" style="padding: 0 10px !important;" class="cursorP fl mright-05"/>
        </div>
        <gMainTab :activeTabList='activeTabList' style="position:static;" :activeTab='activeTab' @changeTab='changeTab' />
        <!-- <div class="tableTopArea">
            <p class="font14  fontBold fl" style="margin-left: 40px; width: calc((100% - 165px)*0.4);">기본정보</p>
            <p class="font14  fontBold fl" style="width: calc((100% - 165px)*0.6);"></p>
            <p class="font14  fontBold fl" style="width: 125px;">권한</p>
        </div> -->
    </div>
    <div class="w100P fl" style="min-width: 120px;">
      <div class="fl" style="position: relative; margin-top: 10px; width: calc(100% - 120px)">
        <img @click="searchMember()" class="cursorP" style="float: right; position: absolute; left: 10px;width: 20px;margin-top: 5px; margin-right: 5px;" src="../../../assets/images/common/iocn_search.png" alt="검색버튼">
        <input @click="mSearchKeyword = ''" v-model="mSearchKeyword" type="text" style="float: right; width: calc(100% ); min-height: 30px; min-width: calc(100% );padding-left:40px!important; "  @keyup.enter="searchMember()" :placeholder="$t('FOLLOW_MSG_USERINFO')">
      </div>
      <div class="CDeepBorderColor fr" style="border-radius: 20px; width:100px; min-height: 30px; margin-top: 10px; display: flex; justify-content: center; align-items: center; ">
        <p class="font12 fl" style="padding: 2px 7px;  border-radius: 20px" @click="mOrderByText = 'creDate', changeOrderBy()" :class="{'CDeepBgColor whiteColor':mOrderByText === 'creDate'}">{{ $t('FOLLOW_BTN_ORDER_CRE') }}</p>
        <p class="font12 fl" style="padding: 2px 7px;  border-radius: 20px" @click="mOrderByText = 'userDispMtext', changeOrderBy()" :class="{'CDeepBgColor whiteColor':mOrderByText === 'userDispMtext'}">{{ $t('FOLLOW_BTN_ORDER_NAME') }}</p>
      </div>
    </div>
    <div class="w100P h100P" style="overflow:hidden auto; height: calc(100% - 5.5rem);">
      <commonMemberList :managingList='this.GE_DISP_MANAGER_LIST'  @saveManager='saveManager' :memberYn="tab==='M'? true: false" @openPop='openPop' @memberInfo='memberInfo'/>
    </div>

    <gConfirmPop v-if="errorPopYn" :confirmText="errorText" confirmType='timeout' @no="errorPopYn = false" style="z-index:9999999" />
    <smallPop v-if="smallPopYn" :confirmText='confirmMsg' :addSmallMsg='addSmallMsg' :addSmallTextYn="true" @no="smallPopYn = false" />
    <div v-if="receptListPopShowYn" class="modalBackStyle" > </div>
    <transition name="showUp">
        <div v-if="receptListPopShowYn" style="width: calc(100% - 40px); height: 90%; position: absolute; left: 20px; bottom: 0px; background: #fff; border-radius: 0.8rem 0.8rem 0 0; z-index: 99999999;">
            <div style="width: 100%; position: relative; padding: 10px 20px; min-height: 50px; float: left;" class="headerShadow">
                <p class="textLeft font20 commonColor fontBold" style="color: #6768A7!important">{{ $t('FOLLOW_BTN_MANA_MEM') }}</p>
                <img @click="closeRecMemberPop" class="" style="width: 25px; position: absolute; top: 15px; right: 20px;" src="../../../assets/images/common/popup_close.png" alt="">
            </div>
            <div style="width: 100%; height: calc(100% - 60px); float: left; padding: 10px 20px;">
                <receptMemberList @okMember="okMember" :managingList='this.reqMemList' @openPop='openPop'  @match='matchInfo' @memberInfo='memberInfo'/>
            </div>
        </div>
    </transition>
    <gConfirmPop @no="timerPopShowYn = false" :confirmText="$t('FOLLOW_MSG_SUCCESS')" confirmType='timeout' v-if="timerPopShowYn" />
</div>

</template>
<script>
/* eslint-disable */
// import cMainTab from '../memberInfo/memberUnit/D_commonMainTabCompo.vue'
import commonMemberList from './D_commonFollowerList.vue'
import receptMemberList from './D_receptMemberList.vue'
export default {
  props: {
    propData: {}
  },
  data () {
    return {
      mSearchKeyword: '',
      mOrderByText: 'creDate',
      errorPopYn : false,
      errorText: '',
      // activeTabList: [/* { display: '멤버', name: 'M' },  */{ display: '전체', name: 'F' }/* , { display: '매니저', name: 'Admin' } */],
      // activeTabList: [{ display: '공개구독', name: 'Open' }, { display: '멤버', name: 'Show' }, { display: '알림매니저', name: 'AlimAdmin' }, { display: '채널매니저', name: 'Admin' }],
      // activeTabList: [{ display: '전체', name: 'A' }, { display: '멤버', name: 'M' }, { display: '구독자', name: 'F' }],
      activeTabList: [{ display: '전체', name: 'A' }, { display: '멤버', name: 'M' }, { display: '매니저', name: 'AD' } ],
      activeTab: 'A',
      tab: 'F',
      managerList: [],
      showUserList: [],
      smallPopYn:false,
      confirmMsg:'',
      addSmallMsg:'',
      // userKey : JSON.parse(localStorage.getItem('sessionUser')).userKey ,
      ownerYn : false,
      currentTeamKey: null,
      receptListPopShowYn: false,
      reqMemList: [],
      timerPopShowYn: false,
      searchFilterObj: {
        memberYn: null,
        managerYn: null,
        managerType: null,
        userDispMtext: '',
        phoneEnc: '',
        userEmail: ''
      }
    }
  },
  created () {
    console.log(this.propData)
    if (this.propData.initData) {
        this.managerList = this.propData.initData.content
    }
    // this.getFollowerList()

  },
  mounted () {
    this.ownerYn = true
  },
  methods: {
    changeOrderBy () {
      if (this.mOrderByText === 'creDate') {
        this.managerList = this.managerList.sort((a,b) => {
          if(a.creDate > b.creDate) return 1
          if(a.creDate < b.creDate) return -1
          return 0
        })
      } else if (this.mOrderByText === 'userDispMtext') {
        this.managerList = this.managerList.sort((a,b) => {
          if(a.userDispMtext > b.userDispMtext) return 1
          if(a.userDispMtext < b.userDispMtext) return -1
          return 0
        })
      }
    },
    async searchMember () {
      var result= {}
      var paramMap = new Map()
       // paramMap.set('showProfileYn', true)
      paramMap.set('teamKey', this.propData.teamKey)
      if (/^[0-9]*$/g.test(this.mSearchKeyword)) {
        paramMap.set('phoneEnc', this.mSearchKeyword)
      } else {
        paramMap.set('userDispMtext', this.mSearchKeyword)
      }
      if (this.activeTab === 'AD') {
          paramMap.set('managerYn', true)
        } else if (this.activeTab === 'M') {
          paramMap.set('memberYn', true)
        }
      paramMap.set('adminYn', true)
      paramMap.set('pageSize', 1000)
      result = await this.$commonAxiosFunction({
          url: '/sUniB/tpgetFollowerList',
          param: Object.fromEntries(paramMap)
      })
      this.managerList = result.data.content
    },
    async openReceptListPop () {
      await this.getReqMemList()
      this.$addHistoryStack('receptListPop')
      this.receptListPopShowYn = true
    },
    async openMemberTypePop () {
      var param = {}
      param.targetType = 'editMemberTypePop'
      param.popHeaderText = this.$t('FOLLOW_TITLE_MANA_MEMTYPE')
      param.teamKey = this.propData.teamKey
      var resultList = null
      var memberTypeList = await this.$commonAxiosFunction({
        url: '/sUniB/tpgetMemberTypeList',
        param: param
      }, true)
      if (memberTypeList.data.result) {
        resultList = memberTypeList.data.memberTypeList
        var itemList = null
        if (resultList.length > 0) {
            // eslint-disable-next-line no-new-object
            var itemParam = new Object()
            itemParam.memberTypeKey = resultList[0].memberTypeKey
            var memberTypeItemList = await this.$commonAxiosFunction({
                url: '/sUniB/tpgetMemberTypeItemList',
                param: itemParam
            }, true)
            itemList = memberTypeItemList.data.memberTypeItemList
            resultList[0].itemList = itemList
            for (var i = 0; i < itemList.length; i ++) {
                itemList[i].addYn = false
            }
            // eslint-disable-next-line no-debugger
            debugger
        }
        console.log(resultList)
        param.initData = resultList
      }
      // eslint-disable-next-line no-debugger
      debugger


      this.$emit('openPop', param)
    },
    closeRecMemberPop () {
        this.$checkDeleteHistory('receptListPop')
        this.receptListPopShowYn = false
    },
    memberFormClick(){
      var param = {}
      param.targetType = 'memberForm'
      param.popHeaderText = '공개신청서 만들기'
      // param.teamKey = this.propData.currentTeamKey
      param.teamKey = this.$store.getters('D_CHANNEL/GE_RECENT_CHANGE_TEAM')
      this.$emit('openPop', param)
    },
    matchInfo(){
      this.smallPopYn = true
      this.confirmMsg = this.$t('FOLLOW_MSG_WAIT')
      this.addSmallMsg = this.$t('FOLLOW_MSG_AUTO')
    },
    memberInfo(member){
      // if(this.tab === 'Show' && member.showProfileYn){
        var param = {}
        // console.log("@@########!@#!!!!!!!!!!!@@@@@@@@@@@")
        // console.log(member)
        param = member
        param.targetType = 'bookMemberDetail'
        param.popHeaderText = this.$t('COMMON_TITLE_PROFILE')
        param.userKey = member.userKey
        param.readOnlyYn = true
        this.$emit('openPop',param)
      // } else {
      //   this.errorText = '멤버로 신청한 관리자가 아닙니다.'
      //   this.errorPopYn = true
      // }
    },
    openPop (param) {
      this.$emit('openPop', param)
    },
    changeTab (typeName) {
      this.activeTab = typeName
      this.getFollowerList()
      // this.tab = typeName
      // this.getFollowerList()
    },
    refresh () {
      this.getFollowerList(this.tab)
    },
    async okMember (param) {
        this.closeRecMemberPop()
        var fKeyList = []
        for (var f = 0; f < param.length; f ++) {
            fKeyList.push(param[f].followerKey)
        }
        debugger
        await this.updateFollower(fKeyList)
        this.$addChanList(this.propData.teamKey)
        /* this.timerPopShowYn = true */
        // 리스트로 등업신청 해줘야함
    },
    async updateFollower (fKeyList) {
      var param = {}
      var params = {}
      param.followerKeyList = fKeyList
      param.teamKey = this.propData.teamKey
      param.memberYn = true
      param.reqMemberStatus = '99'
      params = { follower: param, doType: 'AP' }
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tpsaveFollower',
        param: params
      })
      console.log('params')
      console.log(params)
      if (result.data.result === true) {
        // eslint-disable-next-line no-debugger
        debugger
        /* this.okPopShowYn = true */
        this.$showToastPop(this.$t('FOLLOW_MSG_SUCCESS'))
        this.getFollowerList()
      }
    },
    async getFollowerList () {
      var result= {}
      var paramMap = new Map()
       // paramMap.set('showProfileYn', true)
      paramMap.set('teamKey', this.propData.teamKey)
      // paramMap.set('adminYn', true)
      if (this.activeTab === 'AD') {
        paramMap.set('managerYn', true)
      } else if (this.activeTab === 'M') {
        paramMap.set('memberYn', true)
      }
      paramMap.set('adminYn', true)
      paramMap.set('pageSize', 1000)

      if (this.searchFilterObj.memberYn != null) {
        paramMap.set('memberYn', this.searchFilterObj.memberYn)
      }
      if (this.searchFilterObj.managerType != null) {
        paramMap.set('managerType', this.searchFilterObj.managerType)
      }
      if (this.searchFilterObj.userDispMtext != null && this.searchFilterObj.userDispMtext !== '') {
        paramMap.set('userDispMtext', this.searchFilterObj.userDispMtext)
      }
      if (this.searchFilterObj.phoneEnc != null && this.searchFilterObj.phoneEnc !== '') {
        paramMap.set('phoneEnc', this.searchFilterObj.phoneEnc)
      }
      if (this.searchFilterObj.userEmail != null && this.searchFilterObj.userEmail !== '') {
        paramMap.set('userEmail', this.searchFilterObj.userEmail)
      }
      /* if (this.tab === 'M') {
        paramMap.set('memberYn', true)
      } else {

      } */

      result = await this.$commonAxiosFunction({
          url: '/sUniB/tpgetFollowerList',
          param: Object.fromEntries(paramMap)
    })
        debugger
        this.managerList = result.data.content
      // // console.log(this.managingList)
      // paramMap.set('followerType', 'M')
    },
    async getReqMemList () {
      var result= {}
      var paramMap = new Map()
       // paramMap.set('showProfileYn', true)
      paramMap.set('teamKey', this.propData.teamKey)
      paramMap.set('reqMemberStatus', '01')
      paramMap.set('pageSize', 100)

      result = await this.$commonAxiosFunction({
          url: '/sUniB/tpgetFollowerList',
          param: Object.fromEntries(paramMap)
    })
        debugger
        this.reqMemList = result.data.content
      // console.log(this.reqMemList)
      // paramMap.set('followerType', 'M')
    },

    async setManager (param) {

      var params = {}
      params.userKey = param.userKey
      // params.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext)
      params.teamKey = this.propData.teamKey
      /* var toastText =  */
      if (param.manager) {
        await this.saveManager(params)
      } else {
        await this.deleteManager(params)
      }
      this.getFollowerList(this.tab)
    },
    async deleteManager (param) {
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tpdeleteManager',
        param: param
      })

    },
    async saveManager (follower) {
      var param = {}
      debugger
      param.follower = follower
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tpsaveManager',
        param: param
      })
      console.log(result)
      debugger
    },

    async openAddManagerPop () {
      // eslint-disable-next-line no-new-object

      var param = {}
      param.targetType = 'bookMemberDetail'
      // param.currentCabinetKey = this.propData.cabinetKey
      param.currentTeamKey = this.propData.teamKey
      param.popHeaderText = this.$t('FOLLOW_TITLE_ADD_USER')
      param.newMemYn = true
      this.$emit('openPop', param)
    },
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ userKey }) => userKey === current.userKey) === -1) {
          data.push(current)
        }
        return data
      }, [])
      return uniqueArr
    }
  },
  components: { commonMemberList, receptMemberList},
  computed: {
    /* GE_NEW_MAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_MAN_LIST']
    },
    GE_NEW_SHOW_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_SHOW_LIST']
    }, */
    CHANNEL_DETAIL () {
      var detailList = this.$getDetail('TEAM', this.propData.teamKey)
      if (detailList) {
        return detailList[0]
      } else {
        return null
      }
    },
    GE_DISP_SHOW_PROFILE_USER_LIST () {
      for (var i = 0; i < this.showUserList.length; i++) {
        var dataList = this.CHANNEL_DETAIL.ELEMENTS.showProfileUserList
        var idx1 = dataList.findIndex((item) => item.followerKey === this.showUserList[i].followerKey)
        if (idx1 !== -1) {
          this.showUserList[i] = dataList[idx1]
        }
      }
      var returnData = this.showUserList
      return returnData
    },
    GE_DISP_MANAGER_LIST () {
      for (var i = 0; i < this.managerList.length; i++) {
        var dataList = this.CHANNEL_DETAIL.ELEMENTS.managerList
        var idx1 = dataList.findIndex((item) => item.managerKey === this.managerList[i].managerKey)
        if (idx1 !== -1) {
          this.managerList[i] = dataList[idx1]
        }
      }
      var returnData = this.managerList
      return returnData
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  watch: {
    GE_LOCALE: {
      immediate: true,
      handler (value) {
        this.activeTabList = [{ display: this.$t('COMMON_TAB_ALL'), name: 'A' }, { display: this.$t('COMMON_NAME_MEMBER'), name: 'M' }, { display: this.$t('COMMON_NAME_MANAGER'), name: 'AD' } ]
      },
      deep: true
    },
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'receptListPop') {
        this.closeRecMemberPop()
      }
    },
    GE_NEW_SHOW_LIST: {
        handler (value, old) {
            if (value[0].teamKey !== this.CHANNEL_DETAIL.teamKey) {
                return
            }
            var newArr = [
                ...this.showUserList,
                value[0]
            ]
            this.showUserList = this.replaceArr(newArr)
        },
        deep: true
    },
    GE_NEW_MAN_LIST: {
        handler (value, old) {
            if (!value || value[0].teamKey !== this.CHANNEL_DETAIL.teamKey) {
                return
            }
            var newArr = [
                ...this.managerList,
                value[0]
            ]
            this.managerList = this.replaceArr(newArr)
        },
        deep: true
    }
    // GE_CHANNEL_INFO() {
    //   // console.log(this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST'])
    // }
  }
}
</script>
<style>
.filterBlock {float: left; margin-right: 10px; min-height: 25px; position: relative; border-radius: 10px; padding: 0 8px; padding-right: 20px; border: 1px solid #ccc; background: rgb(245, 245, 249);}
.filterBlock img {position: absolute; right: 5px; top: 6.5px; width: 10px;}

.tableTopArea{width: calc(100% - 30px); min-height: 30px; display: flex; justify-content: center; align-items: center;}

.modalBackStyle{width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: #00000050; z-index: 999999;}
.pageTopAreaStyle {width: 100%; float: left; position: relative; min-height: 30px; border-bottom: 1px solid #6768a7;}
/* .receptListBtnStyle {position: absolute; right: 20px; top: 0px; height: 25px; z-index: 999999; line-height: 25px;} */
.receptListBtnStyle {right: 10px; top: -5px; z-index: 9;}
</style>
