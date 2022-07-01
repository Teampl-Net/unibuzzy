<template>
    <!-- <popHeader @closeXPop="backClick" class="headerShadow" :headerTitle="receiverTitle" :chanName="this.$changeText(this.propData.teamNameMtext)" /> -->
    <div class="pagePaddingWrap longHeight" style="height:calc(100% - 300px); padding-top: 50px; overflow: auto;" >
        <div style="width: 100%; height: calc(100% - 310px); position: relative; float: left;">
          <managerList @deleteManager="deleteManager" :listData="managerList" ref="managerListCompo" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="this.propData" style="position: absolute; top: 0; overFlow: hidden scroll; height: calc(100% - 50px); background: #fff;"/>
        <!-- <managerList :selectPopYn="true" @changeSelectMemberList="changeSelectMemberList" :teamInfo="propData" :propData="this.selectBookDetail" style="position: absolute; top: 0; overFlow: hidden scroll; height: calc(100% - 50px); background: #fff;"/> -->
        </div>
        <!-- <selectedListCompo @changeSelectedList="changeSelectedList" ref="selectedListCompo" style="float: left;" transition="showGroup" :listData='selectedList' @btnClick="sendReceivers" /> -->

    </div>
    <div class="btnPlus" @click="openAddManagerPop" ><p style="font-size: 40px;">+</p></div>
    <!-- <selectBookList :propData="propData" v-if="selectBookListShowYn" @closeXPop='closeSubPop'  @sendReceivers='setSelectedList'/> -->
</template>

<script>
/* eslint-disable */
import managerList from './Tal_commonBookMemberList.vue'
// import selectedListCompo from './Tal_selectedReceiverList.vue'end

export default {
  props: {
    // selectPopYn: {},
    // chanInfo: {},
    // detailSelectedYn: {},
    // selectedListYn: {},
    propData: {}
    // pSelectedList: {}
  },
  created () {
    // alert(JSON.stringify(this.propData.teamNameMtext))
    console.log("#!@#!@#");
    this.getFollowerList()

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
      var hStack = this.$store.getters.hStack
      if (this.popId === hStack[hStack.length - 1]) {
        this.closeSubPop()
      }
    },
    historyStack (value, old) {
    }
  },
  components: { managerList },
  data () {
    return {
      // openAddManagerPopYn:false
      // selectManagerListShowYn: false,
      receiverTitle: '매니저 관리',
      list:[],
      managerList: [],
      popId: null
    }
  },
  methods: {
    async getFollowerList () {
        var paramMap = new Map()

        paramMap.set('teamKey', this.propData.currentTeamKey)
        paramMap.set('managerYn', true)
        // paramMap.set('followerType', 'M')
        var result = await this.$commonAxiosFunction({
            url: '/tp.getFollowerList',
            param: Object.fromEntries(paramMap)
        })
        console.log('@@@result@@@')
        console.log(result)
        this.managerList = result.data.content
        for (var i = 0; i < this.managerList.length; i ++) {
            this.managerList[i].selectedYn = false
        }
        var test =this.managerList

        this.dispNameChangeUserName()// dispName이 없을시 userName으로 대체
    },
    closeSubPop () {
      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)
      // this.selectBookListShowYn = false
      this.getFollowerList()
    },
    dispNameChangeUserName(){
        if (this.memberList) { // dispName이 없을시 userName으로 대체
        for (var i =0; i < this.memberList.length; i ++) {
            if(this.memberList[i].userDispMtext !== undefined && this.memberList[i].userDispMtext !== null && this.memberList[i].userDispMtext !== '') {

                } else {
                    this.memberList[i].userDispMtext = this.memberList[i].userNameMtext
                }
            }
        }
    },
    async deleteManager (data) {
      var param = {}
      param.userKey = data.userKey
      param.teamKey = data.teamKey
      var result = await this.$commonAxiosFunction({
          url: '/tp.deleteManager',
          param: param
      })/*
      if (result.data) {
        this.refresh()
      } */
      this.refresh()
    },
    refresh () {
      this.getFollowerList()
    },
    backClick () {
      this.$emit('closeXPop')
    },
    async openAddManagerPop () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.teamKey = this.propData.currentTeamKey
      params.memberYn = true
      // params.managerKey = null MemberYn이 true이면서 매니저키가 없는 리스트가 필요
      var result = await this.$commonAxiosFunction({
        url: '/tp.getFollowerList',
        param: params
      })


      console.log('##############');
      // console.log(result.data.content);
      var tempList = []
      var managerofferList = []
      for (let i = 0; i < result.data.content.length; i++) {
        if(!result.data.content[i].managerKey){
          managerofferList.push(result.data.content[i])
        }

      }
      // var managerofferList = result.data.content
      // this.managerList = result.data.content
      // this.managerList = []
      console.log('managerofferList');
      console.log(managerofferList);

      this.propData.managerOpenYn=true

      var history = this.$store.getters.hStack
      this.popId = 'selectManagerListPop' + history.length
      history.push(this.popId)
      this.$store.commit('updateStack', history)

      // this.selectBookListShowYn = true
      var param = new Object()
      param.targetType = 'selectManager'
      param.pSelectedList = managerofferList
      param.managerOpenYn = true
      param.teamKey = this.propData.currentTeamKey
      console.log('@@@@@@@@@@@@@')
      console.log(param)
      this.$emit('openPop', param)

      // this.selectManagerListShowYn = true

      // var param = {}
      // param.targetType = 'bookMemberDetail'
      // // param.currentCabinetKey = this.propData.cabinetKey
      // param.currentTeamKey = this.propData.currentTeamKey

      // this.$emit('openPop', param)

      // this.openAddManagerPopYn = true
    }

  }
}
</script>

<style >

</style>
