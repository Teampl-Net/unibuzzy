<template>
<div class="w-100P h-100P" style="position: absolute; top: 0; padding: 60px 1rem 0 1rem; ">
    <!-- <div style="width: 100%; float: left; height: 40px;">
        <p class="font16 fontBold fl mright-05 grayBlack">필터: </p>
        <div class="font16 filterBlock" style="">관리자<img class="cursorP" style="" src="../../../assets/images/common/searchXIcon.svg" alt=""></div>
    </div> -->
    <!-- <input type="text" name="" placeholder="이름을 입력해주세요." class="fl" id=""> -->
    <div class="pageTopAreaStyle">
        <cMainTab :activeTabList='activeTabList' style="position:absolute; left:0; bottom:-2px;" :activeTab='activeTab' @changeTab='changeTab' />
        <!-- <div class="tableTopArea">
            <p class="font14  fontBold fl" style="margin-left: 40px; width: calc((100% - 165px)*0.4);">기본정보</p>
            <p class="font14  fontBold fl" style="width: calc((100% - 165px)*0.6);"></p>
            <p class="font14  fontBold fl" style="width: 125px;">권한</p>
        </div> -->
        <div class="receptListBtnStyle fr">
          <gBtnSmall @click="openMemberTypePop" btnTitle="유형관리" style="padding: 0 10px !important;" class="cursorP fl"/>
          <gBtnSmall @click="openReceptListPop" btnTitle="신청목록" style="padding: 0 10px !important;" class="cursorP fl mright-05"/>
        </div>
    </div>
    <div class="w-100P h-100P" style="overflow:hidden auto; height: calc(100% - 5.5rem);">
      <commonMemberList :managingList='this.GE_DISP_MANAGER_LIST'  @saveManager='saveManager' :memberYn="tab==='M'? true: false" @openPop='openPop' @memberInfo='memberInfo'/>
    </div>

    <gConfirmPop v-if="errorPopYn" :confirmText="errorText" confirmType='timeout' @no="errorPopYn = false" style="z-index:9999999" />
    <smallPop v-if="smallPopYn" :confirmText='confirmMsg' :addSmallMsg='addSmallMsg' :addSmallTextYn="true" @no="smallPopYn = false" />
    <div v-if="receptListPopShowYn" class="modalBackStyle" > </div>
    <transition name="showUp">
        <div v-if="receptListPopShowYn" style="width: calc(100% - 40px); height: 90%; position: absolute; left: 20px; bottom: 0px; background: #fff; border-radius: 0.8rem 0.8rem 0 0; z-index: 99999999;">
            <div style="width: 100%; position: relative; padding: 10px 20px; min-height: 50px; float: left;" class="headerShadow">
                <p class="textLeft font20 commonColor fontBold" style="color: #6768A7!important">멤버관리</p>
                <img @click="closeRecMemberPop" class="" style="width: 25px; position: absolute; top: 15px; right: 20px;" src="../../../assets/images/common/popup_close.png" alt="">
            </div>
            <div style="width: 100%; height: calc(100% - 60px); float: left; padding: 10px 20px;">
                <receptMemberList @okMember="okMember" :managingList='this.reqMemList' @openPop='openPop'  @match='matchInfo' @memberInfo='memberInfo'/>
            </div>
        </div>
    </transition>
    <gConfirmPop @no="timerPopShowYn = false" confirmText='승인되었습니다!' confirmType='timeout' v-if="timerPopShowYn" />
</div>

</template>
<script>
/* eslint-disable */
import cMainTab from './memberUnit/D_commonMainTabCompo.vue'
import commonMemberList from './D_commonFollowerList.vue'
import receptMemberList from './D_receptMemberList.vue'
export default {
  props: {
    propData: {}
  },
  data () {
    return {
      errorPopYn : false,
      errorText: '',
      // activeTabList: [/* { display: '멤버', name: 'M' },  */{ display: '전체', name: 'F' }/* , { display: '매니저', name: 'Admin' } */],
      // activeTabList: [{ display: '공개구독', name: 'Open' }, { display: '멤버', name: 'Show' }, { display: '알림매니저', name: 'AlimAdmin' }, { display: '채널매니저', name: 'Admin' }],
      activeTabList: [{ display: '전체', name: 'A' }, { display: '멤버', name: 'M' }, { display: '구독자', name: 'F' }],
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
    this.getFollowerList()

  },
  mounted () {
    this.ownerYn = true
  },
  methods: {
    async openReceptListPop () {
      await this.getReqMemList()
      this.receptListPopShowYn = true
    },
    openMemberTypePop () {
      var param = {}
      param.targetType = 'editMemberTypePop'
      param.teamKey = this.propData.teamKey
      param.teamKey = this.propData.teamKey
      this.$emit('openPop', param)
    },
    closeRecMemberPop () {
        this.receptListPopShowYn = false
    },
    memberFormClick(){
      var param = {}
      param.targetType = 'memberForm'
      // param.teamKey = this.propData.currentTeamKey
      param.teamKey = this.$store.getters('D_CHANNEL/GE_RECENT_CHANGE_TEAM')
      this.$emit('openPop', param)
    },
    matchInfo(){
      this.smallPopYn = true
      this.confirmMsg = '상대방이 구독하기를 기다리는 중 입니다. '
      this.addSmallMsg = '구독 시 자동으로 매니저로 등록됩니다.'
    },
    memberInfo(member){
      // if(this.tab === 'Show' && member.showProfileYn){
        var param = {}
        // console.log("@@########!@#!!!!!!!!!!!@@@@@@@@@@@")
        // console.log(member)
        param = member
        param.targetType = 'bookMemberDetail'
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
        url: 'service/tp.saveFollower',
        param: params
      })
      console.log('params')
      console.log(params)
      if (result.data.result === true) {
        // eslint-disable-next-line no-debugger
        debugger
        /* this.okPopShowYn = true */
        this.$showToastPop('승인되었습니다!')
        this.getFollowerList()
      }
    },
    async getFollowerList () {
      var result= {}
      var paramMap = new Map()
       // paramMap.set('showProfileYn', true)
      paramMap.set('teamKey', this.propData.teamKey)
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
      // #재준씨 봐주세요!!!!!!
      /* if (this.tab === 'M') {
        paramMap.set('memberYn', true)
      } else {

      } */

      result = await this.$commonAxiosFunction({
          url: 'service/tp.getFollowerList',
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
          url: 'service/tp.getFollowerList',
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
        url: 'service/tp.deleteManager',
        param: param
      })

    },
    async saveManager (follower) {
      var param = {}
      debugger
      param.follower = follower
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveManager',
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
  components: { commonMemberList, receptMemberList, cMainTab},
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
    }
  },
  watch: {
    GE_NEW_SHOW_LIST: {
        handler (value, old) {
            // alert(true)
            if (value[0].teamKey !== this.CHANNEL_DETAIL.teamKey) {
                return
            }
            // alert(this.CHANNEL_DETAIL.teamKey)
            // alert(value[0])
            var newArr = [
                ...this.showUserList,
                value[0]
            ]
            this.showUserList = this.replaceArr(newArr)
            // alert(JSON.stringify(this.showUserList))
        },
        deep: true
    },
    GE_NEW_MAN_LIST: {
        handler (value, old) {
            // alert(this.CHANNEL_DETAIL.teamKey)
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
.receptListBtnStyle {position: absolute;  right: 10px; top: -5px; z-index: 9;}
</style>
