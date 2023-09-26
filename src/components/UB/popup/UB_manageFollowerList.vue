<i18n>
{
  "ko": {
    "FOLLOW_MSG_USERINFO": "이름 또는 전화번호를 입력해주세요",
    "FOLLOW_BTN_ORDER_CRE": "등록순",
    "FOLLOW_BTN_ORDER_NAME": "이름순",
    "FOLLOW_BTN_MANA_MEM": "멤버관리",
    "FOLLOW_MSG_SUCCESS": "승인되었습니다!",
    "FOLLOW_TITLE_ADD_USER": "유저 추가"
  },
  "en": {
    "FOLLOW_MSG_USERINFO": "Write down name or phone number",
    "FOLLOW_BTN_ORDER_CRE": "Created",
    "FOLLOW_BTN_ORDER_NAME": "Name",
    "FOLLOW_BTN_MANA_MEM": "Manage Members",
    "FOLLOW_MSG_SUCCESS": "Approved!",
    "FOLLOW_TITLE_ADD_USER": "Add a User"
  }
}
</i18n>
<template>
<div class="w100P h100P mngFollowerListWrap" :style="'padding-top:' + ($STATUS_HEIGHT + 90)+ 'px'">
    <gPopHeader :headerTitle="$t('FOLLOW_BTN_MANA_MEM')" :pClosePop="pClosePop" />
    <div class="pageTopAreaStyle" :style="'padding-top:' + ($STATUS_HEIGHT + 60)+ 'px;'">
        <gMainTab :activeTabList='activeTabList' class="mainTab" :activeTab='activeTab' @changeTab='changeTab' />
    </div>
    <div class="w100P fl memberSearchArea">
      <div class="fl memberSearchBox">
        <img @click="searchMember()" class="cursorP" src="../../../assets/images/common/iocn_search.png" alt="검색버튼">
        <input @click="mSearchKeyword = ''" v-model="mSearchKeyword" type="text" @keyup.enter="searchMember()" :placeholder="$t('FOLLOW_MSG_USERINFO')">
      </div>
      <div class="CDeepBorderColor fr memberOrderBox">
        <p class="font12 fl" @click="mOrderByText = 'creDate', changeOrderBy()" :class="{'CDeepBgColor whiteColor':mOrderByText === 'creDate'}">{{ $t('FOLLOW_BTN_ORDER_CRE') }}</p>
        <p class="font12 fl" @click="mOrderByText = 'userDispMtext', changeOrderBy()" :class="{'CDeepBgColor whiteColor':mOrderByText === 'userDispMtext'}">{{ $t('FOLLOW_BTN_ORDER_NAME') }}</p>
      </div>
    </div>
    <div class="w100P memberListContentsBox">
      <followerItem :managingList='GE_DISP_MANAGER_LIST'  @saveManager='saveManager' :memberYn="tab==='M'? true: false" @openPop='openPop' @memberInfo='memberInfo'/>
    </div>
    <gConfirmPop class="confirmPop" v-if="errorPopYn" :confirmText="errorText" confirmType='timeout' @no="errorPopYn = false"/>
    <smallPop v-if="smallPopYn" :confirmText='confirmMsg' :addSmallMsg='addSmallMsg' :addSmallTextYn="true" @no="smallPopYn = false" />
    <gConfirmPop @no="timerPopShowYn = false" :confirmText="$t('FOLLOW_MSG_SUCCESS')" confirmType='timeout' v-if="timerPopShowYn" />
</div>

</template>
<script>
/* eslint-disable */
import followerItem from '@/components/popup/member/UB_followerListItem.vue'
export default {
  props: {
    propData: {},
    pClosePop: Function
  },
  data () {
    return {
      mSearchKeyword: '',
      mOrderByText: 'creDate',
      errorPopYn : false,
      errorText: '',
      activeTabList: [{ display: '전체', name: 'A' }, { display: '매니저', name: 'AD' } ],
      activeTab: 'A',
      tab: 'F',
      managerList: [],
      showUserList: [],
      smallPopYn:false,
      confirmMsg:'',
      addSmallMsg:'',
      ownerYn : false,
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
    if (this.propData.initData) {
        this.managerList = this.propData.initData.content
    }
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
          url: '/sUniB/tp.getFollowerList',
          param: Object.fromEntries(paramMap)
      })
      this.managerList = result.data.content
    },
    memberInfo(member){
        var param = {}
        param = member
        param.targetType = 'bookMemberDetail'
        param.popHeaderText = this.$t('COMMON_TITLE_PROFILE')
        param.userKey = member.userKey
        param.readOnlyYn = true
        this.$emit('memberInfo',param)
    },
    openPop (param) {
      this.$emit('openPop', param)
    },
    changeTab (typeName) {
      this.activeTab = typeName
      this.getFollowerList()
    },
    async getFollowerList () {
      var result= {}
      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.teamKey)
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

      result = await this.$commonAxiosFunction({
          url: '/sUniB/tp.getFollowerList',
          param: Object.fromEntries(paramMap)
    })
        this.managerList = result.data.content
    },
    async saveManager (follower) {
      var param = {}
      param.follower = follower
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveManager',
        param: param
      })
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
  components: {
    followerItem
  },
  computed: {
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
      return this.$store.getters['UB_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['UB_HISTORY/hStack']
    },
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  watch: {
    GE_LOCALE: {
      immediate: true,
      handler (value) {
        this.activeTabList = [{ display: this.$t('COMMON_TAB_ALL'), name: 'A' }, { display: this.$t('COMMON_NAME_MANAGER'), name: 'AD' } ]
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
  }
}
</script>
<style>
.filterBlock {
  float: left;
  margin-right: 10px;
  min-height: 25px;
  position: relative;
  border-radius: 10px;
  padding: 0 8px;
  padding-right: 20px;
  border: 1px solid #ccc;
  background: rgb(245, 245, 249);
}
.filterBlock img {
  position: absolute;
  right: 5px;
  top: 6.5px;
  width: 10px;
}
.tableTopArea {
  width: calc(100% - 30px);
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modalBackStyle {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000050;
  z-index: 999999;
}
.pageTopAreaStyle {
  width: 100%;
  float: left;
  position: relative;
  min-height: 30px;
  border-bottom: 1px solid #6768a7;
  padding-top: 40px;
}
.receptListBtnStyle {
  right: 10px;
  top: -5px;
  z-index: 9;
}
.mngFollowerListWrap {
  position: absolute;
  top: 0;
  left: 0;
  max-height: 100vh;
  padding: 0 1rem;
  background: #fff;
  z-index: 999;
}
.mainTab {
  position:static !important;
}
.memberSearchArea {
  min-width: 120px;
}
.memberSearchBox {
  position: relative;
  margin-top: 10px;
  width: calc(100% - 120px);
}
.memberSearchBox > img {
  float: right;
  position: absolute;
  left: 10px;
  width: 20px;
  margin-top: 5px;
  margin-right: 5px;
}
.memberSearchBox > input {
  float: right;
  width: 100%;
  min-height: 30px;
  min-width: 100%;
  padding-left: 40px !important;
}
.memberOrderBox {
  border-radius: 20px;
  width: 110px;
  min-height: 30px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.memberOrderBox > p {
  padding: 2px 7px;
  border-radius: 20px;
}
.memberListContentsBox {
  overflow: auto;
  max-height: calc(100vh - 197px);
}
.confirmPop {
  z-index: 9999999 !important;
}
.receptList {
  width: calc(100% - 40px);
  height: 90%;
  position: absolute;
  left: 20px;
  bottom: 0px;
  background: #fff;
  border-radius: 0.8rem 0.8rem 0 0;
  z-index: 99999999;
}
.receptListHeader {
  width: 100%;
  position: relative;
  padding: 10px 20px;
  min-height: 50px;
  float: left;
}
.receptListHeader > p {
  color: #6768A7 !important;
}
.receptListHeader > img {
  width: 25px;
  position: absolute;
  top: 15px;
  right: 20px;
}
.receptContentsBox {
  width: 100%;
  height: calc(100% - 60px);
  float: left;
  padding: 10px 20px;
}
</style>
