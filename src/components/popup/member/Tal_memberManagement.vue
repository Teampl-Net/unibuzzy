<template>
<div class="w-100P h-100P" style="position: absolute; top: 50px; padding:1rem;">
    <gActiveBar :activetabProp='tab' :tabList="this.activeTabList" class="fl mbottom-1" @changeTab="changeTab"  style=" width:calc(100%);"/>
    <div class="w-100P h-100P" style="overflow:hidden auto">
      <commonMemberList :managingList='managingList' @setManager='setManager' @openPop='openPop' :currentOwner='propData.ownerYn' />
    </div>
</div>

</template>
<script>
/* eslint-disable */
import commonMemberList from './Tal_commonMemberList.vue'
export default {
  props: {
    propData:{}
  },
  data(){
    return{
      activeTabList: [{ display: '멤버', name: 'Mem' }, { display: '관리자', name: 'Admin' }],
      // tab:'Mem',
      tab:'Mem',
      managingList:[]
    }
  },
  created () {
    console.log('this console page management ');
    console.log(this.propData);
    this.getManagingList(this.tab)
  },
  mounted (){
    if(this.propData.ownerYn){
      this.activeTabList = [{ display: '멤버', name: 'Mem' }, { display: '관리자', name: 'Admin' }]
      this.tab = 'Admin'
    }else{
      this.activeTabList = [{ display: '멤버', name: 'Mem' }]
      this.tab = 'Mem'
    }
  },
  methods: {
    openPop(param){
      this.$emit('openPop',param)
    },
    changeTab(typeName){
      this.tab = typeName
      this.getManagingList(typeName,'tab')
    },
    async getManagingList(typeName,actionType){

      if(actionType === 'tab') this.managingList = []

      var paramMap = new Map()
      paramMap.set('teamKey', this.propData.currentTeamKey)
      if (typeName === 'Mem') { paramMap.set('memberYn', true) }
      if (typeName === 'Admin') { paramMap.set('managerYn', true) }
      // paramMap.set('followerType', 'M')
      var result = await this.$commonAxiosFunction({
          url: '/tp.getFollowerList',
          param: Object.fromEntries(paramMap)
      })
      console.log(result);
      this.managingList = await result.data.content
    },

    async setManager(param){
      console.log(param);
      var params = {}
      params.userKey = param.userKey
      params.teamKey = this.propData.teamKey
      if(param.manager){
        await this.saveManager(params)
      }else{
        await this.deleteManager(params)
      }

      this.getManagingList(this.tab)
    },
    async deleteManager(param) {
      console.log('deleteManager Axios param -> result')
      console.log(param)
      var result = await this.$commonAxiosFunction({
          url: '/tp.deleteManager',
          param: param
      })
      console.log(result)
    },
    async saveManager(follower){
      var param = {}
      param.follower = follower
      console.log(param)
      var result = await this.$commonAxiosFunction({
        url: '/tp.saveManager',
        param: param
      })
      console.log(result)
    }
  },
  components:{commonMemberList}
}
</script>
<style>

</style>