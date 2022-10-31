<template>
<!-- <div style="width: 100%; height: 100vh; position: absolute;z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div> -->
<div v-if="loadYn">
  <div style="width: 100%; height: 100vh; position: absolute;z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>
  <div class="channelMenuWrap showModal-enter" :class="{editWrap: editYn === true, 'showModal-leave': closeYn === true  }" >
    <div class="menuHeader newHeaderLine">
      <img style="width: 1rem;" @click="goNo" class="mleft-1 cursorP"  src="../../../assets/images/common/popup_close.png"/>
      <p :class="{editColor: editYn === true }" class="fontBold font20 fl" style="white-space: nowrap;" >{{menuHeaderTitle}}</p>
      <img v-if="(this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn || this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 1) && (this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1)" class="fr cursorP img-w23" style="margin-right:10px;" src="../../../assets/images/editChan/icon_setting.svg" @click="myChanEdit"  />
      <div v-else />
    </div>
    <div v-if="true" class="fl w-100P h-100P" style="overflow: hidden scroll;">

      <div class="fl w-100P mtop-2" style="margin-top:50px; border-bottom: 2px solid #6768a730" >
        <p class="fl font14 cursorP commonColor fontBold textLeft w-100P" style="white-space: nowrap; padding:10px 0; border-bottom: 2px solid #6768a730" @click="boardDropDown">
          <!-- <img class="fl cursorP img-w18 mright-05 " alt="게시판 이미지"  src="../../../assets/images/channel/channer_board_color.png"> -->
          <pp class="mleft-1">게시판</pp>
          ({{this.BOARD_CONTENT_LIST.length}})
          <img v-show="this.BOARD_CONTENT_LIST.length !== 0 && boardDropDownYn === true" src="../../../assets/images/common/icon_dash.svg"  class="fr dropdownBtn" style=" margin-top : 0.5rem;" >
          <img v-show="this.BOARD_CONTENT_LIST.length !== 0 && boardDropDownYn !== true" src="../../../assets/images/common/icon_dropdown.svg" class="fr dropdownBtn " style="margin-top : 0.5rem;" >
        </p>

        <div class="boardBox boardBoxDown mleft-2" style="overflow: hidden scroll; width: 100%; clear:left;" ref="boardRef" :class="{boardBoxUp : boardDropDownYn === false, boardBoxDown:boardDropDownYn === true}" >
          <menuBoardList ref="menuBoardListRef" :noIcon="true" :listData="this.BOARD_CONTENT_LIST" @chanMenuClick="chanMenuClick" />
        </div>
      </div>

      <!-- <div v-if="CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn || CHANNEL_DETAIL.D_CHAN_AUTH.adminYn" class="fl w-100P mtop-1" style="border-bottom: 2px solid #6768a730;"></div> -->
      <div v-if="(this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn || this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 1) && (this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1)" class="fl w-100P" style="border-bottom: 2px solid #6768a730" :style="(this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn || this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 1) && (this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1) ? '' : ''"  >
        <p class="fl font14 cursorP commonColor fontBold  textLeft w-100P" style="white-space: nowrap; padding:10px 0; border-bottom: 2px solid #6768a730"  @click="bookDropDown">
          <!-- <img class="fl cursorP img-w18 mright-05" alt="주소록 이미지"  src="../../../assets/images/channel/channer_addressBook.svg">  -->
          <pp class="mleft-1">주소록</pp>
          ({{this.CABINET_LIST.length}})
          <img v-show="this.CABINET_LIST.length !== 0 && bookDropDownYn === true" src="../../../assets/images/common/icon_dash.svg"  class="fr dropdownBtn" style=" margin-top : 0.5rem;" >
          <img v-show="this.CABINET_LIST.length !== 0 && bookDropDownYn !== true" src="../../../assets/images/common/icon_dropdown.svg" class="fr dropdownBtn " style="margin-top : 0.5rem;" >
        </p>
        <!-- <div class="boardBox fr boardBoxDown" style="overflow: hidden scroll; width: calc(100% - 100px); max-height:300px; " ref="addressBookGroupRef" :class="{boardBoxUp: bookDropDownYn === false, boardBoxDown: bookDropDownYn === true}" > -->
        <div class="boardBox boardBoxDown mleft-2" style="overflow: hidden scroll; width: 100%; clear:left " ref="addressBookGroupRef" :class="{boardBoxUp: bookDropDownYn === false, boardBoxDown: bookDropDownYn === true}" >
          <addressBookList :noIcon="true" :chanAlimListTeamKey="chanAlimListTeamKey" :listData="CABINET_LIST" @openDetail='openTeamDetailPop' />
        </div>
      </div>

      <!-- <div class="fl w-100P mtop-1" style="border-bottom: 2px solid #6768a730;"></div> -->

      <div class="fl w-100P" style="">
        <p class="fl font14 cursorP commonColor fontBold  textLeft w-100P" style="white-space: nowrap; padding:10px 0; border-bottom: 2px solid #6768a730"  @click="convenienceFuncDropdown">
          <!-- <img class="fl cursorP img-w18 mright-05 " alt="이미지"  src="../../../assets/images/channel/channer_board_color.png"> -->
          <pp class="mleft-1">편리기능</pp>
          <img v-show="convenienceFuncYn === true" src="../../../assets/images/common/icon_dash.svg"  class="fr dropdownBtn " style=" margin-top : 0.5rem;" >
          <img v-show="convenienceFuncYn !== true" src="../../../assets/images/common/icon_dropdown.svg" class="fr dropdownBtn " style="margin-top : 0.5rem;" >
          <!-- ({{this.convenienceFuncList.length}}) -->
        </p>

        <div class="boardBox boardBoxDown mleft-2" style="overflow: hidden scroll; width: calc(100% - 100px); clear:left " ref="convenienceFunction" :class="{boardBoxUp : convenienceFuncYn === false, boardBoxDown:convenienceFuncYn === true}" >

          <div v-for="(data, index) in convenienceFuncList" :key="index" @click="convenienceFunc(data.targetType)" class=" fl cursorP mleft-05" style="width:100%; padding: 10px 0;">
            <!-- <gBtnSmall v-if="data.targetType !== 'writePush' || (data.targetType === 'writePush' && (CHANNEL_DETAIL.D_CHAN_AUTH.adminYn === true || CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn === true)) " :btnTitle="data.title" style="padding: 0 15px;" /> -->
            <div class="fl mleft-05 textLeft font16 textOverdot" style="width: calc(100% - 30px - 3rem); margin: 0 0 0 0; width:100% !important;" v-if="data.targetType !== 'writePush' || (data.targetType === 'writePush' && (CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === true || CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1)) " >
              <span class="grayBlack fontBold mleft-05 w-100P textOverdot textLeft fl" >
                <img class="fl cursorP img-w18 mright-05" alt="작성 아이콘"  src="../../../assets/images/editChan/icon_write.svg">
                {{data.title}}
                </span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- <div v-else>
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
          <div class="boardBox fl" style="overflow: hidden scroll;" ref="addressBookGroupRef" :class="{boardBoxUp : bookDropDownYn === false, boardBoxDown:bookDropDownYn === true}" >
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
    </div> -->
  </div>
  <editChanMenu :chanInfo="propData" :currentTeamKey="chanAlimListTeamKey" v-if='editPopYn' @closeXPop='closeEditPop' :editList='this.BOARD_CONTENT_LIST' :teamNameText='teamNameText'/>
</div>
<!-- <selectManagerList :propData="propData" v-if="selectManagerListYn" @closeXPop='selectManagerListYn = false'  @sendReceivers='setSelectedList' @openPop='openPopup' /> -->
</template>
<script>
/* eslint-disable */
// eslint-disable-next-line
// eslint-disable-next-line no-new-object
import editChanMenu from '../board/D_editBoardList.vue'
import addressBookList from '../chanMenu/Tal_menuBookList.vue'
import menuBoardList from '../chanMenu/Tal_menuBoardList.vue'
import selectManagerList from '../receiver/Tal_selectManagerList.vue'
import testList from '../chanMenu/testList.vue'

export default {
  props:{
    addChanList:{},
    propData: {},
    chanAlimListTeamKey: {},
    pPopId: {}
  },

  computed: {
    GE_USER () {
        return this.$store.getters['D_USER/GE_USER']
    },
    CHANNEL_DETAIL () {
      return this.$getDetail('TEAM', this.chanAlimListTeamKey)[0]
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    CABINET_LIST () {
      if (this.cabinetList.length === 0) {
          return this.cabinetList
      }
      return this.cabinetList
    },
    BOARD_CONTENT_LIST () {
      if (this.boardContentList.length === 0) {
          return this.boardContentList
      }
      return this.boardContentList
    }

  },
  watch: {
    pageUpdate (value, old) {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      if (this.$setParentsId(this.pPopId, 'chanMenu' + this.chanAlimListTeamKey) === hStack[hStack.length - 1]) {
        this.goNo()
      }
    },
    historyStack (value, old) {
    },
    CHANNEL_DETAIL () {
      console.log(this.CHANNEL_DETAIL)
    }
  },
  created() {
    console.log(this.pPopId)
    debugger
    // console.log('CHANNEL_DETAIL')
    // console.log(this.CHANNEL_DETAIL)
    var history = this.$store.getters['D_HISTORY/hStack']
    this.writePopId = this.$setParentsId(this.pPopId, 'chanMenu' + this.chanAlimListTeamKey)
    history.push(this.$setParentsId(this.pPopId, 'chanMenu' + this.chanAlimListTeamKey))
    this.$store.commit('D_HISTORY/updateStack', history)
    this.screenHeight = window.innerHeight
    // this. myBoardList =
  },
  mounted () {
    this.getFollowerList().then(response => {
    })
    this.getTeamCabList().then(temp => {
      this.getTeamMenuList().then(teemp => {
        this.boardListLength()
        this.bookListLength()
        this.loadYn = true
      })
    })

    // this.cabinetList = this.$groupDummyList()
    // if (this.CHANNEL_DETAIL.ELEMENTS.cabinetList.length === 0) {
    //     this.getTeamCabList().then(response => {
    //         this.getTeamMenuList()

    //         this.boardListLength()
    //         this.bookListLength()
    //     })
    // } else {
    //     this.boardListLength()
    //     this.bookListLength()
    // }

    console.log(this.CHANNEL_DETAIL);

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
      boardContentList: [],
      menuHeight: 0,
      boardDropDownYn:true,
      bookDropDownYn:true,
      convenienceFuncYn:true,
      etcDrowdownYn:true,
      selectManagerListYn:false,
      selectedList : [],
      selectAdminList : [],
      teamNameText:'',
      closeYn:false,
      // convenienceFuncList: [{ title: '알림작성', targetType: 'writePush' }, { title: '게시글작성', targetType: 'writeBoard' }, { title: '알림신청', targetType: 'requestPush' }]
      convenienceFuncList: [{ title: '알림작성', targetType: 'writePush' }, { title: '게시글작성', targetType: 'writeBoard' }],
      loadYn: false
    }
  },
  components: {editChanMenu,addressBookList,menuBoardList,selectManagerList,testList
  },
  emits: ['openPop', 'goPage'],
  methods: {
    /** 편리기능에 있는 버튼 클릭 함수 입니다.  */
    async convenienceFunc (targetType) {
      var param = {}
      param.targetType = targetType
      // 알림신청의 경우 신청 사유를 작성 해야하기에 Yn을 추가하였습니다.
      if (targetType === 'requestPush'){
        param.targetType = 'writeContents'
        param.contentsJobkindId = 'ALIM'
        param.requestPushYn = true
      // 게시글 작성의 경우 작성하는 게시판을 지정해야하기에 Yn을 추가하였습니다.
      } else if (targetType === 'writeBoard') {
        param.targetType = 'writeContents'
        param.contentsJobkindId = 'BOAR'
        param.selectBoardYn = true
      }
      param.teamKey = this.propData.teamKey || this.propData.targetKey
      param.targetKey = this.chanAlimListTeamKey
      param.currentTeamKey = this.chanAlimListTeamKey

      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      await this.$store.commit('D_HISTORY/setRemovePage', removePage)
      await this.$store.commit('D_HISTORY/updateStack', history)
      this.$emit('openItem', param)
      this.closeYn = true

      this.$emit('closePop')
    },
    myChanEdit(){
      var param = {}
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
    },
    async getFollowerList () {
      var params = new Object()
      params.userKey = this.GE_USER.userKey
      params.teamKey = this.propData.teamKey || this.propData.targetKey
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getFollowerList',
        param: params
      }, true)
      // console.log(result.data.content[0])
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

      this.$emit('openItem', param)
    },
    closeEditPop () {
      this.refresh()
      this.editPopYn = false
      // this.goNo()
    },
    openTeamDetailPop(data) {
      // // console.log(data)
      var params = {}
      params.targetType = 'editBookList'
      params.currentTeamKey = this.chanAlimListTeamKey
      params.teamKey = this.chanAlimListTeamKey
      // params.teamNameMtext = this.$changeText(this.propData.value.nameMtext)
      this.propData.clickData = data
      params.value = this.propData
      // console.log(this.propData);

      params.teamNameMtext = this.teamName()

      /* var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history) */


      this.$emit('openItem',params)

    },
    async getTeamCabList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.chanAlimListTeamKey)
      paramMap.set('sysCabinetCode', 'USER')
      paramMap.set('adminYn', true)
      var result = await this.$commonAxiosFunction({
          url: 'service/tp.getTeamMenuList',
          param: Object.fromEntries(paramMap)
      }, true)
      var tempList = []
      tempList = result.data
      // this.cabinetList = result.data
      for(var i = 0; i < tempList.length; i ++) {
          var changeT = tempList[i].cabinetNameMtext
          tempList[i].cabinetNameMtext = this.$changeText(changeT)
      }

      this.cabinetList = tempList
      console.log('##########  GET CABINET LIST  ##########')
      console.log(this.cabinetList)
      // albugger
    },
    async getTeamMenuList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.chanAlimListTeamKey)
      paramMap.set('currentTeamKey', this.chanAlimListTeamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', this.GE_USER.userKey)

      var result = await this.$getTeamMenuList(paramMap, true)
      this.boardContentList = result
      console.log('##########  GET BOARD CONTENT LIST  ##########')
      console.log(this.boardContentList)

      // var newArr = []
      // var uniqueArr = null
      // newArr = [
      //   ...this.CHANNEL_DETAIL.ELEMENTS.cabinetList,
      //   ...result
      // ]
      // uniqueArr = this.replaceArr(newArr)
      // // console.log(uniqueArr)
      // this.CHANNEL_DETAIL.ELEMENTS.cabinetList = uniqueArr
      // this.$store.dispatch('D_CHANNEL/AC_REPLACE_CHANNEL', this.CHANNEL_DETAIL)
      /* this.$actionVuex('TEAM', this.CHANNEL_DETAIL, this.CHANNEL_DETAIL.teamKey, false, true) */
    },
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ cabinetKey }) => cabinetKey === current.cabinetKey) === -1) {
          data.push(current)
        }
        return data
      }, [])
      return uniqueArr
    },
    /** 화면상 게시판의 높이를 myBoardList.length를 통해 구해주는 함수 */
    boardListLength() {
      if (this.boardContentList) {
        var boardListLength = this.boardContentList.length === 0 ? 1 : this.boardContentList.length * 45 + 10
        this.$nextTick(() => {
            if (this.$refs.boardRef) {
            this.$refs.boardRef.style.setProperty('--menuHeight', (boardListLength + 'px'))
            }
        })
      } else {
        this.$nextTick(() => {
            if (this.$refs.boardRef) {
            this.$refs.boardRef.style.setProperty('--menuHeight', ('30px'))
            }
        })
      }
    },
    convenienceFuncListLength() {
      if (this.convenienceFuncList) {
        var convenienceFuncListLength = this.convenienceFuncList.length === 0 ? 1 : this.convenienceFuncList.length * 45 + 10
        this.$nextTick(() => {
            if (this.$refs.convenienceFunction) {
            this.$refs.convenienceFunction.style.setProperty('--menuHeight', (convenienceFuncListLength + 'px'))
            }
        })
      } else {
        this.$nextTick(() => {
            if (this.$refs.convenienceFunction) {
            this.$refs.convenienceFunction.style.setProperty('--menuHeight', ('30px'))
            }
        })
      }
    },
    boardDropDown () {
      if (this.BOARD_CONTENT_LIST.length !== 0) {
        this.boardListLength()
        if (this.boardDropDownYn) { this.boardDropDownYn = false } else { this.boardDropDownYn = true }
      }
    },
    convenienceFuncDropdown () {
      if (this.convenienceFuncList.length !== 0) {
        this.convenienceFuncListLength()
        if (this.convenienceFuncYn) { this.convenienceFuncYn = false } else { this.convenienceFuncYn = true }
      }
    },
    /** 화면상 주소록의 높이를 cabinetList.length를 통해 구해주는 함수 */
    bookListLength () {
      if (this.adminYn === true) {
        if (this.cabinetList) {
            var bookListHeight = this.cabinetList.length === 0 ? 1 : this.cabinetList.length * 45 + 10
            this.$nextTick(()=> {
                if (this.$refs.addressBookGroupRef) {
                    this.$refs.addressBookGroupRef.style.setProperty('--menuHeight', (bookListHeight + 'px'))
                }
            })
        } else {
            this.$nextTick(()=> {
                if (this.$refs.addressBookGroupRef) {
                    this.$refs.addressBookGroupRef.style.setProperty('--menuHeight', ('30px'))
                }
            })
        }
      }
    },
    bookDropDown () {
      if (this.CABINET_LIST.length !== 0) {
        this.bookListLength()
        if (this.bookDropDownYn) { this.bookDropDownYn = false } else { this.bookDropDownYn = true }
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
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      await this.$store.commit('D_HISTORY/setRemovePage', removePage)
      await this.$store.commit('D_HISTORY/updateStack', history)
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
      this.$emit('openItem', params)
    },
    receiverClick(data){
      var params = new Object()
      params.targetType = 'editBookList'
      params.currentTeamKey = this.chanAlimListTeamKey
      // params.teamNameMtext = this.$changeText(this.propData.value.nameMtext)
      this.propData.clickData = '' // 클릭한 데이터 지우기
      params.value = data

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

    },
    etcDrowdown (){
        let click = document.getElementById('etc-drop')
        if(click.style.display === 'none'){
          click.style.display = 'block'
        } else{
          click.style.display = 'none'
        }
    }
  }
}
</script>

<style scoped>
.calcMarginLeft { margin-left: 2rem !important; }
.menuHeader {
  padding: 0.5rem 0;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #fff;
  /* width: 80%; */
  border-top-left-radius: 10px;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* position: fixed; */
  z-index: 99;
  background-color: white;
  /* transform: translateX(25%); */
  /* position: fixed;
  right: 0;
  width: 80%; */
  max-width:500px;
  position: absolute;
  right: 0;
  top: 0;
}
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
  /* box-shadow: 0 0 9px 2px #b8b8b8; */
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  /* padding: 0 1rem; */
  }

.btnBig{
  font-size: 16px;
  width: 5rem;
  height: 30px;
}
.editWrap{
  background-color: #F9F9F9 !important;

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
  width:13px;
  /* transform: rotate( 270deg ); */
  margin:0 auto;
  margin-right:15px;
  /* transition : .3s */
}

</style>
