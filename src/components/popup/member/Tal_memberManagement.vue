<template>
<div class="w-100P h-100P" style="position: absolute; top: 0; padding: 60px 1rem 0 1rem; ">
    <div style="width: 100%; float: left; position: relative;">
        <gActiveBar :activetabProp='tab' :tabList="this.activeTabList" class="fl mbottom-1" @changeTab="changeTab"  style=" width:calc(100%);" modeType='basic'/>
        <gBtnSmall v-if="tab === 'Mem'" btnTitle="신청목록" style="position: absolute; right: 0px; top: 0px; height: 25px; line-height: 25px;"/>
    </div>
    <div class="w-100P h-100P" style="overflow:hidden auto; height: calc(100% - 5.5rem);">
      <!-- <div v-if="tab === 'Show'" style="padding:1rem 2rem; border: 1px solid #aaa;" @click="memberFormClick">
      멤버 신청서 만들기
      </div> -->
      <!-- <gBtnSmall v-if="tab === 'Show'" :btnThema="'light'" @click="memberFormClick" btnTitle="멤버 신청서 만들기" style="position: absolute; right: 1rem; top:1rem" /> -->
      <commonMemberList v-if="this.tab === 'Mem'" :managingList='this.GE_DISP_SHOW_PROFILE_USER_LIST' @setManager='setManager' @openPop='openPop' :currentOwner='propData.ownerYn' @match='matchInfo' @memberInfo='memberInfo' :currentTab="tab" />
      <commonMemberList v-else-if="this.tab === 'Show'" :managingList='this.GE_DISP_SHOW_PROFILE_USER_LIST' @setManager='setManager' @openPop='openPop' :currentOwner='propData.ownerYn' @match='matchInfo' @memberInfo='memberInfo' :currentTab="tab" />
      <commonMemberList v-else-if="this.tab === 'Admin'" :managingList='this.GE_DISP_MANAGER_LIST' @setManager='setManager' @openPop='openPop' :currentOwner='propData.ownerYn' @match='matchInfo' @memberInfo='memberInfo' :currentTab="tab" />
      <!-- <div v-if="GE_USER_LIST.length === 0 && ownerYn && tab === 'Show'" class="mtop-1" style=""> -->
        <!-- <p class="font16 " style="">정보를 공개한 대상이 없습니다. <br> 채널을 조금 더 홍보해보세요! </p> -->
      <!-- </div> -->
    </div>

    <div class="btnPlus" v-show="propData.ownerYn && tab ==='Admin'" @click="openAddManagerPop" ><p style="font-size: 40px;">+</p></div>

    <gConfirmPop v-if="errorPopYn" :confirmText="errorText" confirmType='timeout' @no="errorPopYn = false" style="z-index:9999999" />
    <smallPop v-if="smallPopYn" :confirmText='confirmMsg' :addSmallMsg='addSmallMsg' :addSmallTextYn="true" @no="smallPopYn = false" />

</div>

</template>
<script>
/* eslint-disable */
import commonMemberList from './Tal_commonMemberList.vue'
export default {
  props: {
    propData: {}
  },
  data () {
    return {
      errorPopYn : false,
      errorText: '',
      activeTabList: [{ display: '공개', name: 'Show' }, { display: '멤버', name: 'Mem' }, { display: '매니저', name: 'Admin' }],
      // activeTabList: [{ display: '공개구독', name: 'Open' }, { display: '멤버', name: 'Show' }, { display: '알림매니저', name: 'AlimAdmin' }, { display: '채널매니저', name: 'Admin' }],

      tab: 'Show',
      managerList: [],
      showUserList: [],
      smallPopYn:false,
      confirmMsg:'',
      addSmallMsg:'',
      // userKey : JSON.parse(localStorage.getItem('sessionUser')).userKey ,
      ownerYn : false,
      currentTeamKey: null
    }
  },
  created () {
    // console.log(this.propData)
    if (this.tab === 'Show') {
      if (!this.GE_DISP_SHOW_PROFILE_USER_LIST || this.GE_DISP_SHOW_PROFILE_USER_LIST.length === 0) {
        this.getManagingList(this.tab)
      }
    // } else if (this.tab === 'Mem') {
    //   if (!this.managingList || this.managingList.length === 0) {
    //     this.getManagingList(this.tab)
    //   }
    } else if (this.tab === 'Admin') {
      if (!this.GE_DISP_MANAGER_LIST || this.GE_DISP_MANAGER_LIST.length === 0) {
        this.getManagingList(this.tab)
      }
    }

  },
  mounted () {
    this.ownerYn = true
    // if (this.propData.ownerYn) {
    //   this.ownerYn = true
    //   this.activeTabList = [{ display: '공개', name: 'Show' }, { display: '매니저', name: 'Admin' }]
    //   // this.activeTabList = [{ display: '공개구독', name: 'Open' }, { display: '멤버', name: 'Show' }, { display: '알림매니저', name: 'AlimAdmin' }, { display: '채널매니저', name: 'Admin' }]
    // } else {
    //   this.activeTabList = [{ display: '공개', name: 'Show' }]
    // }
    /* this.currentTeamKey = this.$store.getters['D_CHANNEL/GE_RECENT_CHANGE_TEAM'] */
    // if (!this.GE_USER_LIST) {
    /* this.getManagingList(this.tab) */
    // }
  },
  methods: {
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
      this.tab = typeName
      this.getManagingList(typeName, 'tab')
    },
    refresh () {
      this.getManagingList(this.tab)
    },
    async getManagingList (typeName, actionType) {
      if (actionType === 'tab') this.managingList = []
      var result= {}
      if (typeName === 'Show') {
        var paramMap = new Map()
        paramMap.set('showProfileYn', true)
        paramMap.set('teamKey', this.propData.teamKey)
        paramMap.set('pageSize', 100)
        result = await this.$commonAxiosFunction({
          url: 'service/tp.getFollowerList',
          param: Object.fromEntries(paramMap)
        })
        this.showUserList = result.data.content
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_SHOW_PROFILE_USER', this.showUserList)
      // } else if (typeName === 'Mem') {
      //   var paramMap = new Map()
      //   paramMap.set('memberYn', true)
      //   paramMap.set('teamKey', this.propData.teamKey)
      //   paramMap.set('pageSize', 100)
      //   result = await this.$commonAxiosFunction({
      //     url: 'service/tp.getFollowerList',
      //     param: Object.fromEntries(paramMap)
      //   })
      //   this.managingList = result.data.content
      } else if (typeName === 'Admin') {
        var param = {}
        param.teamKey = this.propData.teamKey
        param.pageSize = 100
        result = await this.$commonAxiosFunction({
          url : 'service/tp.getManagerList',
          param: param
        })

        this.managerList = result.data.managerList
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_MANAGER', this.managerList)
      } else {
      }

      // // console.log(this.managingList)
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
      this.getManagingList(this.tab)
    },
    async deleteManager (param) {
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.deleteManager',
        param: param
      })

    },
    async saveManager (follower) {
      var param = {}
      param.follower = follower
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveManager',
        param: param
      })
    },
    async addDirectly(params){

      var follower = new Object()
      follower = params
      var param = new Object()

      follower.teamKey = this.propData.currentTeamKey


      follower.inEmail = params.userEmail
      follower.inPhone = params.userPhone
      follower.inUserName = this.$changeTex(params.userDispMtext || params.userNameMtext)
      // params.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext)
      param.follower = follower


      var result = await this.$commonAxiosFunction({
          url: 'service/tp.saveManager',
          param: param
      })

      if(result.data.result === true){
        if(result.data.message === '중복된 유저입니다.'){
          this.errorPopYn = true
          this.errorText = result.data.message
        }else{
          this.getManagingList(this.tab)
        }
      }

      this.changeTab('Admin')


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
  components: { commonMemberList },
  computed: {
    GE_NEW_MAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_MAN_LIST']
    },
    GE_NEW_SHOW_LIST () {
      return this.$store.getters['D_CHANNEL/GE_NEW_SHOW_LIST']
    },
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


</style>
