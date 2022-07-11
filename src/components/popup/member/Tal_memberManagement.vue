<template>
<div class="w-100P h-100P" style="position: absolute; top: 50px; padding:1rem;">
    <gActiveBar :activetabProp='tab' :tabList="this.activeTabList" class="fl mbottom-1" @changeTab="changeTab"  style=" width:calc(100%);"/>
    <div class="w-100P h-100P" style="overflow:hidden auto">
      <commonMemberList :managingList='managingList' @setManager='setManager' @openPop='openPop' :currentOwner='propData.ownerYn' @match='matchInfo' />
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
      activeTabList: [{ display: '멤버', name: 'Mem' }, { display: '관리자', name: 'Admin' }],
      // tab:'Mem',
      tab: 'Mem',
      managingList: [],
      smallPopYn:false,
      confirmMsg:'',
      addSmallMsg:''
    }
  },
  created () {
    console.log('this console page management ')
    console.log(this.propData)
    this.getManagingList(this.tab)
  },
  mounted () {
    if (this.propData.ownerYn) {
      this.activeTabList = [{ display: '멤버', name: 'Mem' }, { display: '관리자', name: 'Admin' }]

    } else {
      this.activeTabList = [{ display: '멤버', name: 'Mem' }]

    }
  },
  methods: {
    matchInfo(){
      this.smallPopYn = true
      this.confirmMsg = '상대방이 구독하기를 기다리는 중 입니다. '
      this.addSmallMsg = '구독 시 자동으로 관리자로 등록됩니다.'

    },
    openPop (param) {
      this.$emit('openPop', param)
    },
    changeTab (typeName) {
      this.tab = typeName
      this.getManagingList(typeName, 'tab')
    },
    async getManagingList (typeName, actionType) {
      if (actionType === 'tab') this.managingList = []

      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.currentTeamKey)
      if (typeName === 'Mem') { paramMap.set('memberYn', true) }
      if (typeName === 'Admin') { paramMap.set('managerYn', true) }
      // paramMap.set('followerType', 'M')
      var result = await this.$commonAxiosFunction({
        url: '/tp.getFollowerList',
        param: Object.fromEntries(paramMap)
      })

      console.log(result)
      this.managingList = await result.data.content
    },

    async setManager (param) {
      console.log('setManager tab!!')
      console.log(this.tab)
      console.log('setManager param!!')
      console.log(param)
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
      console.log('deleteManager Axios param -> result')
      console.log(param)
      var result = await this.$commonAxiosFunction({
        url: '/tp.deleteManager',
        param: param
      })
      console.log(result)
    },
    async saveManager (follower) {
      var param = {}
      param.follower = follower
      console.log(param)
      var result = await this.$commonAxiosFunction({
        url: '/tp.saveManager',
        param: param
      })
      console.log(result)
    },
    async addDirectly(params){
      var follower = new Object()
      var param = new Object()

      follower.teamKey = this.propData.currentTeamKey

      follower.inEmail = params.userEmail
      follower.inPhone = params.userPhone
      follower.inUserName = this.$changeText(params.userDispMtext)
      param.follower = follower
      console.log(param)

      var result = await this.$commonAxiosFunction({
          url: '/tp.saveManager',
          param: param
      })
      console.log('result')
      console.log(result.data)

      if(result.data.result === true){
        if(result.data.message === '중복된 유저입니다.'){
          this.errorPopYn = true
          this.errorText = result.data.message
        }else{
          this.getManagingList(this.tab)
        }
      }


    },
    async openAddManagerPop () {
      // eslint-disable-next-line no-new-object
      console.log('openAddManagerPop this.propData');
      console.log(this.propData);
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
.btnPlus{
  animation-name: fadein; animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

</style>
