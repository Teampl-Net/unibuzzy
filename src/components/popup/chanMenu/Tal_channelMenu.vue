<template>
<!-- <div style="width: 100%; height: 100vh; position: absolute;z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div> -->
<div style="width: 100%; height: 100vh; position: absolute;z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>

<div class="channelMenuWrap showModal-enter" :class="{editWrap: editYn === true, 'showModal-leave': closeYn === true  }" >
  <div class="menuHeader" :class="{editmenuHeader: editYn === true}" style="width:100%; display:flex;flex-direction: row; justify-content: space-between; align-items: center;">
    <img style="width: 1rem;" @click="goNo" class="mleft-1 cursorP"  src="../../../assets/images/common/popup_close.png"/>
    <p :class="{editColor: editYn === true }" class="fontBold font20 fl" >{{menuHeaderTitle}}</p>
    <img v-if="ownerYn || adminYn" class="fr cursorP" style="width:30px; margin-right:10px;" src="../../../assets/images/common/icon_setting.png" @click="myChanEdit"  />
    <div v-else />
  </div>
  <div v-if="true" style="overflow:auto">
    <div v-if="adminYn" class="fl"  style="margin-top:calc(50px); width:100%; display: flex; flex-direction: row; justify-content: space-between;" >
      <div class="fl" style="margin-top:20px; width:50%;" >
        <img class="fl cursorP" style="width:20px;" alt="주소록 이미지"  src="../../../assets/images/channel/channer_addressBook.svg">
        <p class="fl cursorP font16 mleft-05 commonBlack fontBold"  @click="bookDropDown">주소록</p>
        <p v-if="this.cabinetList.length !== 0" class="fl cursorP fontBold mleft-05 commonColor textLeft font16" @click="bookDropDown"> ({{this.cabinetList.length}})</p>
      </div>
      <div class="boardBox fr" style="overflow: hidden scroll; width:50%;" ref="groupRef" :class="{boardBoxUp : bookDropDownYn === false, boardBoxDown:bookDropDownYn === true}" >
        <addressBookList :noIcon="true" :chanAlimListTeamKey="chanAlimListTeamKey" :listData="cabinetList" @openDetail='openTeamDetailPop' />
      </div>
    </div>

    <div class="fl" :style="!adminYn ? 'margin-top:50px !important;' : 'margin-top:1rem;'" style=" width:100%; display: flex; flex-direction: row; justify-content: space-between;"  >
      <div class="fl" style="margin-top:20px; width:50%;" >
        <img class="fl cursorP" style="width:20px;" alt="주소록 이미지"  src="../../../assets/images/channel/channer_board_color.png">

          <p class="fl font16 mleft-05 cursorP commonBlack fontBold"  @click="boardDropDown">게시판</p>
        <p v-if="this.myBoardList.length !== 0" class="fl mleft-05 cursorP fontBold commonColor textLeft font16" @click="boardDropDown"> ({{this.myBoardList.length}})</p>
      </div>
      <div class="fl boardBox" style="overflow: hidden scroll; width:50%;" ref="boardRef" :class="{boardBoxUp : boardDropDownYn === false, boardBoxDown:boardDropDownYn === true}">
        <menuBoardList ref="menuBoardListRef" :noIcon="true" :listData="myBoardList" @chanMenuClick="chanMenuClick" />
      </div>
    </div>
  </div>

  <div v-else>
    <div style="margin-top:calc(70px); width:100%; " class="fl" >
      <div v-if="adminYn" class="fl" style="width:100%;">
        <div class="fl" style="width:100%; height: 30px;">
          <div class="fl" style="width:20px; height: 100%; " @click="bookDropDown" >
            <img v-show="this.cabinetList.length !== 0 && bookDropDownYn === true" src="../../../assets/images/common/icon_dash.svg"  class="fl dropdownBtn" style=" margin-top : 0.5rem;" >
            <img v-show="this.cabinetList.length !== 0 && bookDropDownYn !== true" src="../../../assets/images/common/icon_dropdown.svg" class="fl dropdownBtn " style="margin-top : 0.5rem;" >
          </div>
          <p style="color:black; text-align:left; margin-left: 2rem;" :class="{calcMarginLeft: (this.cabinetList.length !== 0 && bookDropDownYn === true) || (bookDropDownYn !== true) }" class="fl fontBold font16" @click="bookDropDown">주소록</p>
          <p v-if="this.cabinetList.length !== 0" class="fl fontBold mleft-05 commonColor textLeft font16" @click="bookDropDown"> ({{this.cabinetList.length}})</p>
          <gBtnSmall class="fr" @click="receiverClick(propData)" btnTitle="관리" style="" v-if="adminYn"/>
        </div>
        <div class="boardBox fl" style="overflow: hidden scroll;" ref="groupRef" :class="{boardBoxUp : bookDropDownYn === false, boardBoxDown:bookDropDownYn === true}" >
          <addressBookList :chanAlimListTeamKey="chanAlimListTeamKey" :listData="cabinetList" @openDetail='openTeamDetailPop' />
        </div>
      </div>
    </div>

    <div style="width:100%; margin-top:calc(20px); " :class="{'adminBoadrmtop-0':adminYn !== true}" class="fl">
      <div class="fl" style="width:100%; height: 30px;">
        <div class="fl" style="width:20px; height: 100%; " @click="boardDropDown" >
          <img v-show="this.myBoardList.length !== 0 && boardDropDownYn === true" src="../../../assets/images/common/icon_dash.svg"  class="fl dropdownBtn" style=" margin-top : 0.5rem;" >
          <img v-show="this.myBoardList.length !== 0 && boardDropDownYn !== true" src="../../../assets/images/common/icon_dropdown.svg" class="fl dropdownBtn " style="margin-top : 0.5rem;" >
        </div>
        <p class="fl fontBold font16 textLeft mleft-2" style="color:black;" :class="{calcMarginLeft: (this.myBoardList.length !== 0 && boardDropDownYn === true) || (boardDropDownYn !== true), editWhiteColor:editYn !== true }" @click="boardDropDown" >게시판</p>
        <p v-if="this.myBoardList.length !== 0" class="fl mleft-05 fontBold commonColor textLeft font16" @click="boardDropDown"> ({{this.myBoardList.length}})</p>
        <gBtnSmall class="fr" v-on:click="editChanMenu" btnTitle="관리" style="" v-if="adminYn" />
      </div>
      <div class="fl boardBox" style="overflow: hidden scroll;" ref="boardRef" :class="{boardBoxUp : boardDropDownYn === false, boardBoxDown:boardDropDownYn === true}">
        <menuBoardList :listData="myBoardList" @chanMenuClick="chanMenuClick" />
      </div>
    </div>
  </div>
</div>
<editChanMenu :chanInfo="propData" :currentTeamKey="chanAlimListTeamKey" v-if='editPopYn' @closeXPop='closeEditPop' :editList='myBoardList' :teamNameText='teamNameText'/>
<!-- <selectManagerList :propData="propData" v-if="selectManagerListYn" @closeXPop='selectManagerListYn = false'  @sendReceivers='setSelectedList' @openPop='openPopup' /> -->
</template>
<script>
/* eslint-disable */
// eslint-disable-next-line
// eslint-disable-next-line no-new-object
import editChanMenu from '../Tal_editBoardList.vue'
import addressBookList from '../chanMenu/Tal_menuBookList.vue'
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
    },
    cabinetList() {
      this.setDrop()
    }

  },
  async created() {
    var history = this.$store.getters.hStack
    history.push('chanMenu' + this.chanAlimListTeamKey)
    this.$store.commit('updateStack', history)
    this.screenHeight = window.innerHeight
    this.getFollowerList()
    // this.cabinetList = this.$groupDummyList()
    await this.getTeamCabList()
    await this.getTeamMenuList()
    this.setDrop()
    this.bookListLength()
    this.boardListLength()
    // this. myBoardList =
  },
  async mounted () {
    // this.bookListLength()
    // this.boardListLength()
  },
  data () {
    return {
      screenHeight: 0,
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
      bookDropDownYn:null,
      selectManagerListYn:false,
      selectedList : [],
      selectAdminList : [],
      book:false,
      board:false,
      teamNameText:'',
      closeYn:false
    }
  },
  components: {editChanMenu,addressBookList,menuBoardList,selectManagerList
  },
  emits: ['openPop', 'goPage'],
  methods: {
    myChanEdit(){
      var param = {}
      // param.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      param.targetType = 'myChanMenuEdit'
      param.teamKey = this.propData.teamKey || this.propData.targetKey
      param.currentTeamKey = this.chanAlimListTeamKey
      param.teamNameMtext = this.teamName()

      // param
      this.$emit('openItem', param)
    },
    refresh (){
      this.getTeamCabList()
      this.getTeamMenuList()
      this.setDrop()
      this.bookListLength()
      this.boardListLength()
    },
    setDrop () {
      if(this.cabinetList.length === 0){
        this.book = false
        this.bookDropDownYn = true
      }else {
        this.book = true
      }
      if(this.myBoardList.length === 0){
        this.board = false
        this.boardDropDownYn = true
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

      /* var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)
 */
      this.$emit('openItem', param)
    },
    closeEditPop () {
      this.refresh()
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
      console.log(this.propData);

      params.teamNameMtext = this.teamName()

      /* var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history) */


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

      var result = await this.$getTeamMenuList(paramMap)
      this.myBoardList = result
    },
    bookListLength () {
      // this.$refs.groupRef.style.setProperty('--menuHeight', (this.cabinetList.length === 0 ? 1 : this.cabinetList.length ) * 50 + 20 + 'px')
      var bookListLength = this.cabinetList.length === 0 ? 1 : this.cabinetList.length * 50 + 20
      // if (this.cabinetList.length === 0) {
      //   bookListLength = 50
      // } else if (bookListLength >= 250) {
      //   bookListLength = 250
      // } else {
      //   bookListLength = this.cabinetList.length * 50 + 20
      // }
      this.$refs.groupRef.style.setProperty('--menuHeight', (bookListLength + 'px'))
    },
    boardListLength() {
      // var boardListLength = (this.screenHeight - 300) + 'px'
      var boardListLength = this.myBoardList.length * 50 + 60
      // var boardListLength = this.$refs.menuBoardListRef.$el.clientHeight
      // console.log('게시판 리스트의 높이는 : ' + boardListLength);
      this.$refs.boardRef.style.setProperty('--menuHeight', (boardListLength + 'px'))
      // this.$refs.boardRef.style.setProperty('--menuHeight', (this.myBoardList.length === 0 ? 1 : this.myBoardList.length ) * 50 + 20 + 'px')
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
    bookDropDown () {
      if(this.book === true){
        this.bookListLength()
        if(this.bookDropDownYn){// 이미지 변경
          this.bookDropDownYn = false
        }else{
          this.bookDropDownYn = true
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
    async goNo (){
      this.closeYn = true
      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      await this.$store.commit('setRemovePage', removePage)
      await this.$store.commit('updateStack', history)
      this.$emit('closePop')
      /* setTimeout(() => {
        this.$emit('closePop')
      }, 200); */

    },
    editChanMenu (){
      var param = {}
      param.targetType = 'editBoard'
      param.currentTeamKey = this.chanAlimListTeamKey
      param.teamKey = this.chanAlimListTeamKey

      param.teamNameMtext = this.teamName()

      this.$emit('openPop', param)
      // this.teamNameText = this.teamName()
      // this.editPopYn = true;
    },
    chanMenuClick(data) {
      var params = new Object()
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
      /* var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history) */
      this.$emit('openItem', params)
    },
    receiverClick(data){
      var params = new Object()
      params.targetType = 'editBookList'
      params.currentTeamKey = this.chanAlimListTeamKey
      // params.teamNameMtext = this.$changeText(this.propData.value.nameMtext)
      this.propData.clickData = '' // 클릭한 데이터 지우기
      params.value = data

      /* var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history) */

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
.menuHeader p{color: #FFFFFF; text-align: center;}

.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%); color: #FFFFFF; }

.channelMenuWrap{
  background-color:#6768a7 ;
  /* background-color: white; */
  width:80% ;
  max-width: 500px;
  position: absolute; z-index: 999;
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
  height: 30px;
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
.adminBoadrmtop-0{
  margin-top: 0 !important;
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
@keyframes dropdown { 0% {height: 0px;} 100% {height: var(--menuHeight) } }
@keyframes dropup { 0% {height: var(--menuHeight);} 100% {height: 0px;} }
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
