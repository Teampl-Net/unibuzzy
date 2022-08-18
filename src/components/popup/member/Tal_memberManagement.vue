<template>
<div class="w-100P h-100P" style="position: absolute; top: 0; padding:1rem;">
    <gActiveBar :activetabProp='tab' :tabList="this.activeTabList" class="fl mbottom-1" @changeTab="changeTab"  style=" width:calc(100%);"/>
    <div class="w-100P h-100P" style="overflow:hidden auto; height: calc(100% - 5.5rem);">
      <!-- <div v-if="tab === 'Mem'" style="padding:1rem 2rem; border: 1px solid #aaa;" @click="memberFormClick">
      멤버 신청서 만들기
      </div> -->
      <!-- <gBtnSmall v-if="tab === 'Mem'" :btnThema="'light'" @click="memberFormClick" btnTitle="멤버 신청서 만들기" style="position: absolute; right: 1rem; top:1rem" /> -->
      <commonMemberList :managingList='managingList' @setManager='setManager' @openPop='openPop' :currentOwner='propData.ownerYn' @match='matchInfo' @memberInfo='memberInfo' />
      <div v-if="managingList.length === 0 && ownerYn && tab === 'Mem'" class="mtop-1" style="">
        <p class="font16 " style="">정보를 공개한 대상이 없습니다. <br> <!--채널을 조금 더 홍보해보세요! --> </p>
      </div>
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
      activeTabList: [{ display: '공개', name: 'Mem' }, { display: '매니저', name: 'Admin' }],
      // tab:'Mem',
      tab: 'Mem',
      managingList: [],
      smallPopYn:false,
      confirmMsg:'',
      addSmallMsg:'',
      // userKey : JSON.parse(localStorage.getItem('sessionUser')).userKey ,
      ownerYn : false
    }
  },
  created () {

    this.getManagingList(this.tab)
  },
  mounted () {
    if (this.propData.ownerYn) {
      this.ownerYn = true
      this.activeTabList = [{ display: '공개', name: 'Mem' }, { display: '매니저', name: 'Admin' }]
    } else {
      this.activeTabList = [{ display: '공개', name: 'Mem' }]
    }
  },
  methods: {
    memberFormClick(){
      var param = {}
      param.targetType = 'memberForm'
      param.teamKey = this.propData.currentTeamKey
      this.$emit('openPop', param)
    },
    matchInfo(){
      this.smallPopYn = true
      this.confirmMsg = '상대방이 구독하기를 기다리는 중 입니다. '
      this.addSmallMsg = '구독 시 자동으로 매니저로 등록됩니다.'
    },
    memberInfo(member){
      // if(this.tab === 'Mem' && member.memberYn){
        var param = {}
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
      if (typeName === 'Mem') {
        var paramMap = new Map()
        paramMap.set('memberYn', true)
        paramMap.set('teamKey', this.propData.currentTeamKey)
        result = await this.$commonAxiosFunction({
          url: '/tp.getFollowerList',
          param: Object.fromEntries(paramMap)
        })
        this.managingList = await result.data.content

      }else if (typeName === 'Admin') {
        var param = {}
        param.teamKey = this.propData.currentTeamKey

        result = await this.$commonAxiosFunction({
          url : '/tp.getManagerList',
          param: param
        })

        this.managingList =await result.data.managerList
      }
      // paramMap.set('followerType', 'M')




    },

    async setManager (param) {

      var params = {}
      params.userKey = param.userKey
      params.teamKey = this.propData.teamKey
      if (param.manager) {
        await this.saveManager(params)
      } else {
        await this.deleteManager(params)
      }
      this.getManagingList(this.tab)
    },
    async deleteManager (param) {
      var result = await this.$commonAxiosFunction({
        url: '/tp.deleteManager',
        param: param
      })

    },
    async saveManager (follower) {
      var param = {}
      param.follower = follower
      var result = await this.$commonAxiosFunction({
        url: '/tp.saveManager',
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
      follower.inUserName = this.$changeText(params.userDispMtext || params.userNameMtext)
      follower.userName
      param.follower = follower

      debugger

      var result = await this.$commonAxiosFunction({
          url: '/tp.saveManager',
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
      param.currentTeamKey = this.propData.currentTeamKey
      param.newMemYn = true
      this.$emit('openPop', param)
    }
  },
  components: { commonMemberList }
}
</script>
<style>


</style>
