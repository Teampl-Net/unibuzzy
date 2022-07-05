<template>
<!-- <div style="width: 100vw; height: 100vh; position: fixed;z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div> -->
<div style="width: 100vw; height: 100vh; position: fixed;z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>

<div class="channelMenuWrap showModal-enter" :class="{editWrap: editYn === true }" >
  <div class="menuHeader" :class="{editmenuHeader: editYn === true}" style="width:100%; display:flex;flex-direction: row; justify-content: space-between; align-items: center;">
      <!-- <img v-if="editYn === false" v-on:click="this.$emit('closePop')" class="mtop-05 mleft-1 fl" style="width: 0.8rem; " src="../../../assets/images/main/icon_back_white.png"/>
      <img v-else v-on:click="this.$emit('closePop')" class="mtop-05 mleft-1 fl" style="width: 0.8rem; " src="../../../assets/images/common/icon_back.png"/> -->
      <img v-on:click="this.$emit('closePop')" class="mtop-05 mleft-1"  src="../../../assets/images/common/icon_back.png"/>
      <p :class="{editColor: editYn === true }" class="fontBold fl" >{{menuHeaderTitle}}</p>
      <img v-on:click="this.$emit('closePop')" class="fr" style="width:30px; margin-right:10px;" src="../../../assets/images/common/icon_manager.svg"  v-if="ownerYn"  @click="adminManagingClick" />
      <div v-else />

  </div>

  <!-- <div v-show="editYn" style="margin-top:calc(50px + 20px); width:100%;     box-shadow: 2px 2px 3px 0px #eee; " class="fl" > -->
  <div style="margin-top:calc(50px + 20px); width:100%;  " class="fl" >

    <!-- <div v-if="ownerYn" class="fl w-100P mtop-05 mbottom-2"  @click="adminManagingClick">
      <p style="border:1px solid #6768A7; padding: 1rem 2rem; font-weight:bold;" class="font16"> 매니저 관리</p>
    </div> -->

    <div v-if="adminYn" class="fl" style="width:100%;">
      <div class="fl" style="width:20px; height: 100%; " @click="groupDropDown" >
        <img v-show="this.cabinetList.length !== 0 && groupDropDownYn === true" src="../../../assets/images/common/icon_dash.svg"  class="fl dropdownBtn" style=" margin-top : 0.5rem;" >
        <img v-show="groupDropDownYn !== true" src="../../../assets/images/common/icon_dropdown.svg" class="fl dropdownBtn " style="margin-top : 0.5rem;" >
      </div>
      <p style="color:black; text-align:left; margin-left: calc(2rem + 20px);" :class="{calcMarginLeft: (this.cabinetList.length !== 0 && groupDropDownYn === true) || (groupDropDownYn !== true) }" class="fl fontBold font16" @click="groupDropDown">주소록 </p>
      <gBtnSmall class="fr"   @click="receiverClick(propData)" btnTitle="관리" style="" v-if="adminYn"/>
      <div class="boardBox fl" style="overflow: hidden;" ref="groupRef" :class="{boardBoxUp : groupDropDownYn === false, boardBoxDown:groupDropDownYn === true}" >
        <teamList :chanAlimListTeamKey="chanAlimListTeamKey" :listData="cabinetList" @openDetail='openTeamDetailPop' />
      </div>
    </div>

  </div>

  <div v-if="adminYn && editYn" style="width:100%; height:1px; background:#ccc;" class="fl mtop-1"></div>

    <div style="width:100%; margin-top:calc(20px); " :class="{editmTop:editYn !== true}" class="fl">
      <div class="fl" style="width:100%; height: 2rem; margin-bottom: 1rem;">
        <div class="fl" style="width:20px; height: 100%; " @click="boardDropDown" >
          <img v-show="boardDropDownYn === true" src="../../../assets/images/common/icon_dash.svg"  class="fl dropdownBtn" style=" margin-top : 0.5rem;" >
          <img v-show="boardDropDownYn !== true" src="../../../assets/images/common/icon_dropdown.svg" class="fl dropdownBtn " style="margin-top : 0.5rem;" >
        </div>
        <p style="color:black; text-align:left; margin-left:2rem;" class="fl fontBold font16" :class="{editWhiteColor:editYn !== true}" @click="boardDropDown" >게시판</p>
        <gBtnSmall class="fr" v-on:click="editChanMenu" btnTitle="관리" style="" v-if="adminYn" />
      </div>
      <div class="boardBox" style="overflow: hidden;"  ref="boardRef" :class="{boardBoxUp : boardDropDownYn === false, boardBoxDown:boardDropDownYn === true}">
        <menuBoardList :listData="myBoardList" @chanMenuClick="chanMenuClick" />
      </div>
    </div>

</div>
<!-- <addChanMenu v-if="openAddChanMenuYn" @closePop='openAddChanMenuYn = false' @addFinish='addChanMenuFinish' /> -->
<editChanMenu :chanInfo="propData" :currentTeamKey="chanAlimListTeamKey" v-if='editPopYn' @closeXPop='closeEditPop' :editList='myBoardList' :teamNameText='teamNameText'/>
<!-- <editChanMenu :chanInfo="propData" :currentTeamKey="chanAlimListTeamKey" v-if='editPopYn' @closeXPop='editPopYn = false' :editList='myBoardList' :teamNameText='teamNameText'/> -->

<!-- <selectBookList :chanInfo="propData" :propData="propData" v-if="selectBookListYn" @closeXPop='selectBookListYn = false' :selectPopYn='true' @sendReceivers='setSelectedList' :pSelectedList="selectedList.data" /> -->
<selectManagerList :propData="propData" v-if="selectManagerListYn" @closeXPop='selectManagerListYn = false'  @sendReceivers='setSelectedList' @openPop='openPopup' />
</template>
<script>
/* eslint-disable */
// eslint-disable-next-line
// eslint-disable-next-line no-new-object
import editChanMenu from '../Tal_channelMenuEditPopup.vue'
import teamList from '../chanMenu/Tal_menuBookList.vue'
import menuBoardList from '../chanMenu/Tal_menuBoardList.vue'
import selectManagerList from '../receiver/Tal_selectManagerList.vue'

export default {
  props:{
    addChanList:{},
    propData: {},
    chanAlimListTeamKey: {}
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
      if ('chanMenu' + this.chanAlimListTeamKey === hStack[hStack.length - 1]) {
        this.goNo()
      }
    },
    historyStack (value, old) {
    }
  },
  async created() {
    console.log(this.adminYn);
    console.log('propData');
    this.getFollowerList()
    console.log(this.addChanList);
    console.log(this.propData)
    // this.cabinetList = this.$groupDummyList()
    var history = this.$store.getters.hStack
    history.push('chanMenu' + this.chanAlimListTeamKey)
    this.$store.commit('updateStack', history)

    await this.getTeamCabList()
    await this.getTeamMenuList()

    this.setDrop()

    // alert(this.cabinetList)

    // this. myBoardList =
  },
  mounted () {
    // this.groupListlength()
    // this.boardListLength()
  },
  data () {
    return {
      ownerYn: false,
      adminYn: false,
      myBoardList:{},
      editYn:true,
      menuHeaderTitle:'채널 메뉴',
      addChanMenuList:{},
      editPopYn : false,
      cabinetList:[],
      menuHeight: 0,
      boardDropDownYn:true,
      groupDropDownYn:false,
      selectManagerListYn:false,

      selectedList : [],
      selectAdminList : [],
      book:true,
      board:true,
      teamNameText:''
    }
  },
  components: {editChanMenu,teamList,menuBoardList,selectManagerList
  },
  emits: ['openPop', 'goPage'],
  methods: {
    setDrop () {
      if(this.cabinetList.length === 0){
        this.book = false
        this.groupDropDownYn = true
      }else {
        this.book = true
      }

      if(this.myBoardList.length === 0){
        this.board = false
        }else {
        this.board = true
       }

    },
    async getFollowerList () {
      var params = new Object()
      params.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      params.teamKey = this.propData.teamKey || this.propData.targetKey
      var result = await this.$commonAxiosFunction({
        url: '/tp.getFollowerList',
        param: params
      })
      if (result.data) {
        if(result.data.content.length > 0){
          if(result.data.content[0].managerKey !== undefined && result.data.content[0].managerKey !== null && result.data.content[0].managerKey !== '') {
            this.adminYn = true
          }
          if(result.data.content[0].ownerYn)
            this.ownerYn = true

        }

      }
    },
    setSelectedList(datas){
      var data = datas.data

      console.log(data);

      this.selectManagerListYn = false // 선택창 닫기

      if(data.bookList){
        for (let i = 0; i < data.bookList.length; i++) {
          var tempList ={}
          tempList.accessKey  = data.bookList[i].cabinetKey
          tempList.accessKind = 'C'
          tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          tempList.shareSeq = data.bookList[i].shareSeq
          this.selectAdminList.push(tempList)
        }
      }

      if(data.memberList){

        for (let i = 0; i < data.memberList.length; i++) {
          var tempList ={}
          tempList.accessKey  = data.memberList[i].userKey
          tempList.accessKind = 'U'
          tempList.cabinetKey = this.modiBoardDetailProps.cabinetKey
          tempList.shareSeq = data.memberList[i].shareSeq
          this.selectAdminList.push(tempList)
        }
      }

      console.log(this.selectAdminList);
    },
    adminManagingClick(){
      var param = new Object()
      param.value = this.propData.value
      param.targetType = 'editManagerList'
      var teamName
      if(this.propData) {
        if(this.propData.value) {
          teamName = this.propData.value.nameMtext || this.propData.value.teamNameMtext
        } else {
          if(this.propData.nameMtext) {
            teamName = this.propData.nameMtext
          }
        }
      }
      param.teamNameMtext = this.$changeText(teamName)
      param.currentTeamKey = this.chanAlimListTeamKey
      param.managerOpenYn = true
      param.selectMemberType = 'manager'

      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)

      this.$emit('openItem', param)
    },
    closeEditPop () {
      this.editPopYn = false
      // this.goNo()
    },
    openTeamDetailPop(data) {
      // console.log(data)
      var params = {}
      params.targetType = 'editBookList'
      params.currentTeamKey = this.chanAlimListTeamKey
      // params.teamNameMtext = this.$changeText(this.propData.value.nameMtext)
      this.propData.clickData = data
      params.value = this.propData

      params.teamNameMtext = this.teamName()

      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)


      this.$emit('openItem',params)

    },
    async getTeamCabList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.chanAlimListTeamKey)
      paramMap.set('sysCabinetCode', 'USER')
      paramMap.set('adminYn', true)
      var result = await this.$commonAxiosFunction({
          url: '/tp.getTeamMenuList',
          param: Object.fromEntries(paramMap)
      })
      this.cabinetList = result.data
      for(var i = 0; i < this.cabinetList.length; i ++) {
          var changeT = this.cabinetList[i].cabinetNameMtext
          this.cabinetList[i].cabinetNameMtext = this.$changeText(changeT)
      }
      // console.log('#####')
      // console.log(this.cabinetList)
      // albugger
    },
    async getTeamMenuList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.chanAlimListTeamKey)
      paramMap.set('currentTeamKey', this.chanAlimListTeamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      console.log(paramMap)
      var result = await this.$getTeamMenuList(paramMap)
      this.myBoardList = result
    },
    groupListlength () {
      this.$refs.groupRef.style.setProperty('--menuHeight', (this.cabinetList.length===0 ? 1 : this.cabinetList.length ) * 50 + 20 + 'px')
      return{
        '--groupListlength' : this.myBoardList.length * 50 + 20 + 'px'
      }
      //  this.menuHeight = this.cabinetList.length * 70 + 20 + 'px'

    },
    boardListLength () {
      this.$refs.boardRef.style.setProperty('--menuHeight', (this.myBoardList.length===0 ? 1 : this.myBoardList.length ) * 50 + 20 + 'px')
      // this.menuHeight = (this.cabinetList.length=== 0 ? 1 : this.cabinetList.length) * 70 + 20 + 'px'
      return{
        '--groupListlength' : this.myBoardList.length * 50 + 20 + 'px'
      }
    },
    boardDropDown () {

      if(this.board === true){
        this.boardListLength()
        if(this.boardDropDownYn){
          this.boardDropDownYn = false
        }else{
          this.boardDropDownYn = true
        }
      }
    },
    groupDropDown () {

      if(this.book === true){
        this.groupListlength()

        if(this.groupDropDownYn){// 이미지 변경
          this.groupDropDownYn = false
        }else{
          this.groupDropDownYn = true
        }

      }
    },
    goPage (link) {
      this.$emit('goPage', link)
    },
    openPop (link) {
      var params = new Object()
      params.targetType = link
      this.$emit('openPop', params)
    },
    goNo (){
      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)
      this.$emit('closePop')
    },
    editChanMenu (){
      this.teamNameText = this.teamName()
      this.editPopYn = true;
    },
    chanMenuClick(data) {
      var params = new Object()
      console.log(this.addChanList)
      console.log(this.propData)
      console.log(this.chanAlimListTeamKey)
      console.log(data)
      params.targetType = 'boardMain'
      if(this.propData.value){
        params.nameMtext = this.propData.value.nameMtext
        params.ownerYn = this.propData.value.ownerYn
      }else{
        params.nameMtext = this.propData.nameMtext
        // params.ownerYn = this.propData.value.ownerYn
      }
      params.currentTeamKey = this.chanAlimListTeamKey
      params.targetKey = data.cabinetKey
      params.value = data
      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)
      this.$emit('openItem', params)
    },
    receiverClick(data){
      var params = new Object()
      params.targetType = 'editBookList'
      params.currentTeamKey = this.chanAlimListTeamKey
      // params.teamNameMtext = this.$changeText(this.propData.value.nameMtext)
      this.propData.clickData = '' // 클릭한 데이터 지우기
      params.value = data


      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      // alert(removePage)
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)

      params.teamNameMtext = this.teamName()


      this.$emit('openItem',params)
    },
    openPopup(data){
      this.$emit('openPop',data)
    },
    teamName () {
      var teamName
      if(this.propData) {
        if(this.propData.value) {
          teamName = this.propData.value.nameMtext || this.propData.value.teamNameMtext
        } else {
          if(this.propData.nameMtext) {
            teamName = this.propData.nameMtext
          }
        }
        return this.$changeText(teamName)
      }

    }
  }
}
</script>

<style scoped>
.calcMarginLeft { margin-left: 2rem !important; }
.menuHeader {padding:0.5rem 0;position: absolute; top: 0rem; left: 0; width: 100%; height: 50px; border-bottom: 1px solid #fff;}
.menuHeader p{color: #FFFFFF; font-size: 20px; text-align: center;}

.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%); color: #FFFFFF; }

.channelMenuWrap{
  background-color:#6768a7 ;
  /* background-color: white; */
  width:80% ;
  max-width: 500px;
  position: fixed; z-index: 999;
  height: 100vh;
  top: 0;
  right: 0;
  box-shadow: 0 0 9px 2px #b8b8b8;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 0 1rem;
  }

.btnBig{
  font-size: 16px;
  width: 5rem;
  height: 2rem;
}
.editWrap{
  background-color: #F9F9F9 !important;

}
.editmenuHeader{
  /* border-bottom: 1.5px solid #aaa; */
  box-shadow: 0px 7px 9px -9px #00000036
}
.editColor{
  color: #6768a7 !important;
}
.editWhiteColor{
  color: #fff;
}
.editmTop{
  margin-top: 70px !important;
}
.editRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid #ccc; }
.boardBox{
  /* background-color:#aaa; */
  width:100%;
  height: 0px;
  display: block;
  position: relative;
}
.boardBoxDown{
  animation: dropdown 300ms ease ;
  animation-fill-mode: both;
}

.boardBoxUp{
  animation: dropup 300ms ease;
  animation-fill-mode: both;
}
@-webkit-keyframes dropdown { 0% {height: 0px;} 100% {height: var(--menuHeight) } }
@-webkit-keyframes dropup { 0% {height: var(--menuHeight);} 100% {height: 0px;} }
.dropdownBtn{
  width:16px;
  /* transform: rotate( 270deg ); */
  margin:0 auto;
  margin-right:10px;
  /* transition : .3s */
}
.dropupBtn{
  transform: rotate( 90deg );

}
</style>
