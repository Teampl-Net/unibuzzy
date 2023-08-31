<i18n>
{
  "ko": {
    "CHAN_MENU_TITLE_MENU": "채널 메뉴",
    "CHAN_MENU_QUICK": "편리기능",
    "CHAN_MENU_SEND_NOTI": "알림작성",
    "CHAN_MENU_WRITE_POST": "게시글 작성",
    "MANA_NAME_CAHN": "채널 관리",
    "MANA_NAME_ADDRBOOK": "주소록 관리",
    "MANA_NAME_BOARD": "게시판 관리",
    "CHAN_MSG_NOFOLLOW": "권한이 없습니다",
    "CHAN_MENU_TITLE_ADDR": "주소록"
  },
  "en": {
    "CHAN_MENU_TITLE_MENU": "Channel Menu",
    "CHAN_MENU_QUICK": "Quick Menu",
    "CHAN_MENU_SEND_NOTI": "Send Noti",
    "CHAN_MENU_WRITE_POST": "Write a Post",
    "MANA_NAME_CAHN": "Manage Channel",
    "MANA_NAME_ADDRBOOK": "Manage Team",
    "MANA_NAME_BOARD": "Manage Board",
    "CHAN_MSG_NOFOLLOW": "No Permission",
    "CHAN_MENU_TITLE_ADDR": "Manage Team"
  }
}
</i18n>
<template>
<div v-if="mLoadYn && $appType === 'D'">
  <div class="popUpBackgroundGray" @click="goNo"></div>
  <div class="channelMenuWrap showModal-enter " :class="{'showModal-leave': mCloseEventYn === true  }" >

    <div class="menuHeader newHeaderLine" :style="'height:' + (this.$STATUS_HEIGHT + 50)+ 'px; top: 0; padding-top: ' + (this.$STATUS_HEIGHT) + 'px'" >
      <img style="width: 1rem;" @click="goNo" class="mleft-1 cursorP"  src="../../../assets/images/common/popup_close.png"/>
      <p class="fontBold font20 fl editColor" style="white-space: nowrap;" >{{ $t('CHAN_MENU_TITLE_MENU') }}</p>
      <img v-if="(this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1 && ( this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1)) || (this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1)" class="fr cursorP img-w23" style="margin-right:10px;" src="../../../assets/images/editChan/icon_setting.svg" @click="clickEditChanBtn"  />
      <div v-else />
    </div>

    <div class="fl w100P h100P" :style="'padding-top:' + (this.$STATUS_HEIGHT )+ 'px'"  style="overflow: hidden scroll;">
      <div class="fl w100P mtop-2" style="margin-top:50px; border-bottom: 2px solid #6768a730" >
        <div class="fl font14 cursorP commonColor fontBold textLeft w100P" style="white-space: nowrap; padding:10px 0; border-bottom: 2px solid #6768a730" @click="boardDropDown">
          <p class="mleft-1 fl font18" style="min-width: 150px;"><span class="font18 fl commonColor">{{ $t('COMMON_NAME_BOARD') }}</span><span class="fl mleft-05 commonColor font16" style="line-height: 26px;">({{this.BOARD_CONTENT_LIST.length}})</span></p>
          <!-- <span class="fl mLeft-1"></span> -->
          <!-- ({{this.BOARD_CONTENT_LIST.length}}) -->
          <img v-show="this.BOARD_CONTENT_LIST.length !== 0 && mBoardDropEvenYn === true" src="../../../assets/images/common/icon_dash.svg"  class="fr dropdownBtn" style=" margin-top : 0.5rem;" >
          <img v-show="this.BOARD_CONTENT_LIST.length !== 0 && mBoardDropEvenYn !== true" src="../../../assets/images/common/icon_dropdown.svg" class="fr dropdownBtn " style="margin-top : 0.5rem;" >
        </div>
        <div class="boardBox boardBoxDown mleft-2" style="overflow: hidden scroll; width: 100%; clear:left;" ref="boardRef" :class="{boardBoxUp : mBoardDropEvenYn === false, boardBoxDown: mBoardDropEvenYn === true}" >
          <menuBoardList :propBoardList="this.BOARD_CONTENT_LIST" @boardContentsClick="boardContentsClick" />
        </div>
      </div>
      <div v-if="this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn || ((this.CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext || this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 1) && (this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1))" class="fl w100P" style="border-bottom: 2px solid #6768a730" :style="(this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn || this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 1) && (this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1) ? '' : ''"  >
        <div class="fl font14 cursorP commonColor fontBold  textLeft w100P" style="white-space: nowrap; padding:10px 0; border-bottom: 2px solid #6768a730"  @click="bookDropDown">
          <p class="mleft-1 fl font18" style="min-width: 150px;"><span class="font18 fl commonColor">{{ $t('COMMON_NAME_ADDRBOOK') }}</span><span class="fl mleft-05 commonColor font16" style="line-height: 26px;">({{this.CABINET_LIST.length}})</span></p>
          <img v-show="this.CABINET_LIST.length !== 0 && mAddressDropEvenYn === true" src="../../../assets/images/common/icon_dash.svg"  class="fr dropdownBtn" style=" margin-top : 0.5rem;" >
          <img v-show="this.CABINET_LIST.length !== 0 && mAddressDropEvenYn !== true" src="../../../assets/images/common/icon_dropdown.svg" class="fr dropdownBtn " style="margin-top : 0.5rem;" >
        </div>
        <div class="boardBox boardBoxDown mleft-2" style="overflow: hidden scroll; width: 100%; clear:left " ref="addressBookGroupRef" :class="{boardBoxUp : mAddressDropEvenYn === false, boardBoxDown: mAddressDropEvenYn === true}" >
          <addressBookList :propAddressBookList="CABINET_LIST" @openBookDetail='openBookDetailPop' />
        </div>
      </div>

      <div v-if="!GE_USER.unknownYn && $appType !== 'UB'" class="fl w100P" style="">
        <div class="fl font14 cursorP commonColor fontBold  textLeft w100P" style="white-space: nowrap; padding:10px 0; border-bottom: 2px solid #6768a730"  @click="convenienceFuncDropdown">
          <p class="mleft-1 fl font18 commonColor" >{{ $t('CHAN_MENU_QUICK') }}</p>
          <img v-show="mConvDropEvenYn === true" src="../../../assets/images/common/icon_dash.svg"  class="fr dropdownBtn " style=" margin-top : 0.5rem;" >
          <img v-show="mConvDropEvenYn !== true" src="../../../assets/images/common/icon_dropdown.svg" class="fr dropdownBtn " style="margin-top : 0.5rem;" >
        </div>
        <div class="boardBox boardBoxDown mleft-2" style="overflow: hidden scroll; width: calc(100% - 100px); clear:left " ref="convenienceFunction" :class="{boardBoxUp : mConvDropEvenYn === false, boardBoxDown:mConvDropEvenYn === true}" >
          <div v-for="(data, index) in mConvenienceFuncList" :key="index" @click="convenienceFunc(data.targetType)" class=" fl cursorP mleft-05" style="width:100%; padding: 10px 0;">
            <div class="fl mleft-05 textLeft font16 textOverdot" style="width: calc(100% - 30px - 3rem); margin: 0 0 0 0; width:100% !important;" v-if="data.targetType !== 'writePush' || (data.targetType === 'writePush' && (CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === true || CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1)) " >
              <span class="grayBlack fontBold mleft-05 w100P textOverdot textLeft fl" >
                <img class="fl cursorP img-w18 mright-05" alt="작성 아이콘"  src="../../../assets/images/editChan/icon_write.svg">
                {{data.title}}
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div v-else-if="mLoadYn && $appType === 'UB' && $route.path === `/chan/${CHANNEL_DETAIL.teamKey}`">
  <div class="popUpBackgroundGray" @click="goNo"></div>
  <div class="channelMenuWrap showModal-enter " :class="{'showModal-leave': mCloseEventYn === true  }">

    <div class="menuHeader newHeaderLine" :style="'height:' + (this.$STATUS_HEIGHT + 50)+ 'px; top: 0; padding-top: ' + (this.$STATUS_HEIGHT) + 'px'" >
      <img style="width: 1rem;" @click="goNo" class="mleft-1 cursorP"  src="../../../assets/images/common/popup_close.png"/>
      <p class="fontBold font20 fl editColor" style="white-space: nowrap;" >{{ $t('CHAN_MENU_TITLE_MENU') }}</p>
      <div />
    </div>

    <div class="fl w100P" :style="'padding-top:' + (this.$STATUS_HEIGHT )+ 'px'" style="height: calc(100% - 110px); overflow: hidden scroll; display:flex; justify-content:space-between; flex-direction:Column;">
      <div>
        <div class="fl w100P mtop-2" style="margin-top:50px; border-bottom: 2px solid #6768a730" >
          <div class="fl font14 cursorP commonColor fontBold textLeft w100P" style="white-space: nowrap; padding:10px 0; border-bottom: 2px solid #6768a730" @click="boardDropDown">
            <p class="mleft-1 fl font18" style="min-width: 150px;"><span class="font18 fl commonColor">{{ $t('COMMON_NAME_BOARD') }}</span><span class="fl mleft-05 commonColor font16" style="line-height: 26px;">({{this.BOARD_CONTENT_LIST.length}})</span></p>
            <!-- <span class="fl mLeft-1"></span> -->
            <!-- ({{this.BOARD_CONTENT_LIST.length}}) -->
            <img v-show="this.BOARD_CONTENT_LIST.length !== 0 && mBoardDropEvenYn === true" src="../../../assets/images/common/icon_dash.svg"  class="fr dropdownBtn" style=" margin-top : 0.5rem;" >
            <img v-show="this.BOARD_CONTENT_LIST.length !== 0 && mBoardDropEvenYn !== true" src="../../../assets/images/common/icon_dropdown.svg" class="fr dropdownBtn " style="margin-top : 0.5rem;" >
          </div>
          <div class="boardBox boardBoxDown mleft-2" style="overflow: hidden scroll; width: 100%; clear:left;" ref="boardRef" :class="{boardBoxUp : mBoardDropEvenYn === false, boardBoxDown: mBoardDropEvenYn === true}" >
            <menuBoardList :propBoardList="this.BOARD_CONTENT_LIST" @boardContentsClick="boardContentsClick" />
          </div>
        </div>
        <div v-if="this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn || ((this.CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext || this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 1) && (this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1))" class="fl w100P" style="border-bottom: 2px solid #6768a730" :style="(this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn || this.CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 1) && (this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1) ? '' : ''"  >
          <div class="fl font14 cursorP commonColor fontBold  textLeft w100P" style="white-space: nowrap; padding:10px 0; border-bottom: 2px solid #6768a730"  @click="bookDropDown">
            <p class="mleft-1 fl font18" style="min-width: 150px;"><span class="font18 fl commonColor">{{ $t('CHAN_MENU_TITLE_ADDR') }}</span><span class="fl mleft-05 commonColor font16" style="line-height: 26px;">({{this.CABINET_LIST.length}})</span></p>
            <img v-show="this.CABINET_LIST.length !== 0 && mAddressDropEvenYn === true" src="../../../assets/images/common/icon_dash.svg"  class="fr dropdownBtn" style=" margin-top : 0.5rem;" >
            <img v-show="this.CABINET_LIST.length !== 0 && mAddressDropEvenYn !== true" src="../../../assets/images/common/icon_dropdown.svg" class="fr dropdownBtn " style="margin-top : 0.5rem;" >
          </div>
          <div class="boardBox boardBoxDown mleft-2" style="overflow: hidden scroll; width: 100%; clear:left " ref="addressBookGroupRef" :class="{boardBoxUp : mAddressDropEvenYn === false, boardBoxDown: mAddressDropEvenYn === true}" >
            <addressBookList :propAddressBookList="CABINET_LIST" @openBookDetail='openBookDetailPop' />
          </div>
        </div>
      </div>
      <div class="w100P textRight fontBold cursorP" style="overflow:hidden; height: 50px; padding: 10px; padding-bottom:60px;" v-if="(this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1 && ( this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1)) || (this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 || this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1)">
        <gBtnSmall btnTitle=" Manager Settings" class="" @click="clickEditChanBtn" />
      </div>
    </div>
  </div>
</div>
</template>
<script>
import addressBookList from './D_addressBookList.vue'
import menuBoardList from './D_boardContentsList.vue'

export default {
  props: {
    propData: {},
    pPopId: {}
  },
  created () {
    if (this.propData) {
      if (this.propData.targetKey) {
        this.mChanAlimListTeamKey = JSON.parse(JSON.stringify(this.propData.targetKey))
      }
    }
    this.readyFunction()
  },
  data () {
    return {
      mChanAlimListTeamKey: 0,
      mScreenHeight: 0,
      mOwnerYn: false,
      mAdminYn: false,
      mAddressBookList: [],
      mBoardContentsList: [],
      mBoardDropEvenYn: true,
      mAddressDropEvenYn: true,
      mConvDropEvenYn: true,
      mCloseEventYn: false,
      mConvenienceFuncList: [{ title: '알림작성', targetType: 'writeContents' }, { title: '게시글작성', targetType: 'writeBoard' }],
      mLoadYn: false,
      parentYn: '',
      pOpenChanMenuYn: Boolean
    }
  },
  components: { addressBookList, menuBoardList },
  methods: {
    readyFunction () {
      var history = this.$store.getters['D_HISTORY/hStack']
      this.writePopId = this.$setParentsId(this.pPopId, 'chanMenu' + this.mChanAlimListTeamKey)
      history.push(this.$setParentsId(this.pPopId, 'chanMenu' + this.mChanAlimListTeamKey))
      this.$store.commit('D_HISTORY/updateStack', history)
      this.mScreenHeight = window.innerHeight

      this.getTeamCabList(false).then(temp => {
        this.getTeamMenuList().then(temp => {
          this.boardListLength()
          this.bookListLength()
          this.mLoadYn = true
        })
      })
      console.log(this.CHANNEL_DETAIL)

      if (this.CHANNEL_DETAIL) {
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH) {
          if (!this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn) {
            this.mConvenienceFuncList = [{ title: this.$t('CHAN_MENU_WRITE_POST'), targetType: 'writeBoard' }]
          }
        }
      }
    },
    /** 편리기능에 있는 버튼 클릭 함수 입니다.  */
    async convenienceFunc (targetType) {
      var param = {}
      param.targetType = targetType
      if (targetType === 'writeContents') {
        if (!this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext) {
          this.$showToastPop(this.$t('COMM_MSG_MEMB_NEED'))
          // this.$checkDeleteHistory('bottomWriteSheets')
          var history = this.$store.getters['D_HISTORY/hStack']
          var removePage = history[history.length - 1]
          history = history.filter((element, index) => index < history.length - 1)
          await this.$store.commit('D_HISTORY/setRemovePage', removePage)
          await this.$store.commit('D_HISTORY/updateStack', history)

          this.$emit('openChanMsgPop')
          return
        }
        param.targetType = 'writeContents'
        param.contentsJobkindId = 'ALIM'
      } else if (targetType === 'writeBoard') {
        param.targetType = 'writeContents'
        param.contentsJobkindId = 'BOAR'
        // 게시글 작성의 경우 작성하는 게시판을 지정해야하기에 Yn을 추가하였습니다.
        param.selectBoardYn = true
      }
      param.teamKey = this.propData.teamKey || this.propData.targetKey
      param.targetKey = this.mChanAlimListTeamKey
      param.currentTeamKey = this.mChanAlimListTeamKey

      history = this.$store.getters['D_HISTORY/hStack']
      removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      await this.$store.commit('D_HISTORY/setRemovePage', removePage)
      await this.$store.commit('D_HISTORY/updateStack', history)
      this.$emit('openItem', param)
      this.mCloseEventYn = true

      this.$emit('closePop')
    },
    async clickEditChanBtn () {
      if (!this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn) {
        this.$showToastPop(this.$t('CHAN_MSG_NOFOLLOW'))
        // this.$checkDeleteHistory('bottomWriteSheets')
        var history = this.$store.getters['D_HISTORY/hStack']
        var removePage = history[history.length - 1]
        history = history.filter((element, index) => index < history.length - 1)
        await this.$store.commit('D_HISTORY/setRemovePage', removePage)
        await this.$store.commit('D_HISTORY/updateStack', history)

        this.$emit('openChanMsgPop')
        return
      }
      var param = {}
      param.targetType = 'myChanMenuEdit'
      param.popHeaderText = this.$t('MANA_NAME_CAHN')
      param.teamKey = this.propData.teamKey || this.propData.targetKey
      param.currentTeamKey = this.mChanAlimListTeamKey
      param.teamNameMtext = this.teamName()

      this.$emit('openItem', param)
    },
    refresh () {
      this.getTeamCabList()
      this.getTeamMenuList()
    },
    openBookDetailPop (clickAddressBookData) {
      var params = {}
      params.targetType = 'editBookList'
      params.chanName = this.propData.nameMtext
      params.popHeaderText = this.$t('MANA_NAME_ADDRBOOK')
      params.currentTeamKey = this.mChanAlimListTeamKey
      params.teamKey = this.mChanAlimListTeamKey
      params.value = this.propData
      params.value.clickData = clickAddressBookData

      params.teamNameMtext = this.teamName()
      this.$emit('openItem', params)
    },
    async getTeamCabList (loadingYn) {
      var paramMap = new Map()
      paramMap.set('teamKey', this.mChanAlimListTeamKey)
      paramMap.set('sysCabinetCode', 'USER')
      paramMap.set('adminYn', true)
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getTeamMenuList',
        param: Object.fromEntries(paramMap)
      }, !(loadingYn === false))
      var tempList = []
      tempList = result.data
      for (var i = 0; i < tempList.length; i++) {
        var changeT = tempList[i].cabinetNameMtext
        tempList[i].cabinetNameMtext = this.$changeText(changeT)
      }

      this.mAddressBookList = tempList
      console.log('##########  GET CABINET LIST  ##########')
      console.log(this.mAddressBookList)
    },
    async getTeamMenuList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.mChanAlimListTeamKey)
      paramMap.set('currentTeamKey', this.mChanAlimListTeamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', this.GE_USER.userKey)

      var result = await this.$getTeamMenuList(paramMap, true)
      this.mBoardContentsList = result
      console.log('##########  GET BOARD CONTENT LIST  ##########')
      console.log(this.mBoardContentsList)
    },
    /** 화면상 게시판의 높이를 myBoardList.length를 통해 구해주는 함수 */
    boardListLength () {
      if (this.mBoardContentsList) {
        var boardListLength = this.mBoardContentsList.length === 0 ? 1 : this.mBoardContentsList.length * 45 + 10
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
    mConvenienceFuncListLength () {
      if (this.mConvenienceFuncList) {
        var mConvenienceFuncListLength = this.mConvenienceFuncList.length === 0 ? 1 : this.mConvenienceFuncList.length * 45 + 10
        this.$nextTick(() => {
          if (this.$refs.convenienceFunction) {
            this.$refs.convenienceFunction.style.setProperty('--menuHeight', (mConvenienceFuncListLength + 'px'))
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
        if (this.mBoardDropEvenYn) { this.mBoardDropEvenYn = false } else { this.mBoardDropEvenYn = true }
      }
    },
    convenienceFuncDropdown () {
      if (this.mConvenienceFuncList.length !== 0) {
        this.mConvenienceFuncListLength()
        if (this.mConvDropEvenYn) { this.mConvDropEvenYn = false } else { this.mConvDropEvenYn = true }
      }
    },
    /** 화면상 주소록의 높이를 mAddressBookList.length를 통해 구해주는 함수 */
    bookListLength () {
      if (this.mAddressBookList) {
        var bookListHeight = this.mAddressBookList.length === 0 ? 1 : this.mAddressBookList.length * 45 + 10
        this.$nextTick(() => {
          if (this.$refs.addressBookGroupRef) {
            this.$refs.addressBookGroupRef.style.setProperty('--menuHeight', (bookListHeight + 'px'))
          }
        })
      } else {
        this.$nextTick(() => {
          if (this.$refs.addressBookGroupRef) {
            this.$refs.addressBookGroupRef.style.setProperty('--menuHeight', ('30px'))
          }
        })
      }
    },
    bookDropDown () {
      if (this.CABINET_LIST.length !== 0) {
        this.bookListLength()
        if (this.mAddressDropEvenYn) { this.mAddressDropEvenYn = false } else { this.mAddressDropEvenYn = true }
      }
    },
    goPage (link) {
      this.$emit('goPage', link)
    },
    openPop (link) {
      var params = {}
      params.targetType = link
      this.$emit('openPop', params)
    },
    async goNo () {
      this.mCloseEventYn = true
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      await this.$store.commit('D_HISTORY/setRemovePage', removePage)
      await this.$store.commit('D_HISTORY/updateStack', history)
      this.$emit('closePop')
    },
    editChanMenu () {
      var param = {}
      param.targetType = 'editBoard'
      param.popHeaderText = this.$t('MANA_NAME_BOARD')
      param.currentTeamKey = this.mChanAlimListTeamKey
      param.teamKey = this.mChanAlimListTeamKey

      param.teamNameMtext = this.teamName()

      this.$emit('openPop', param)
    },
    async boardContentsClick (boardListData) {
      var resultMainData = await this.$getBoardMainData(boardListData)

      if (resultMainData.contentsListPage) {
        var contentList = resultMainData.contentsListPage.content
        for (let i = 0; i < contentList.length; i++) {
          contentList[i].shareItem = resultMainData.cabinet.mShareItemList
        }
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', contentList)
        console.log('!!!!!!!!!!!!!!!!!')
      }
      var goBoardMainParam = {}
      console.log('resultMainData', resultMainData)
      goBoardMainParam.initData = resultMainData
      goBoardMainParam.targetType = 'boardMain'
      goBoardMainParam.teamKey = boardListData.teamKey
      goBoardMainParam.targetKey = boardListData.cabinetKey
      goBoardMainParam.cabinetNameMtext = boardListData.cabinetNameMtext
      // 채널에서 들어왔는지, 링크나 메인에서 바로 들어왔는지 구분
      goBoardMainParam.chanYn = true
      console.log('==goBoardMainParam==', goBoardMainParam)
      this.$emit('openItem', goBoardMainParam)
      // var boardDetail = result

      // var params = {}
      // params.targetType = 'boardMain'
      // if (this.propData.value) {
      //   params.nameMtext = this.propData.value.nameMtext
      //   params.ownerYn = this.propData.value.ownerYn
      // } else {
      //   params.nameMtext = this.propData.nameMtext
      // }
      // params.currentTeamKey = this.mChanAlimListTeamKey
      // params.targetKey = data.cabinetKey
      // params.value = data

      // this.$emit('openItem', params)
    },
    teamName () {
      var teamName
      if (this.propData) {
        if (this.propData.value) {
          teamName = this.propData.value.nameMtext || this.propData.value.teamNameMtext
        } else {
          if (this.propData.nameMtext) {
            teamName = this.propData.nameMtext
          }
        }
        return this.$changeText(teamName)
      }
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    CHANNEL_DETAIL () {
      return this.$getDetail('TEAM', this.mChanAlimListTeamKey)[0]
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    CABINET_LIST () {
      if (this.mAddressBookList.length === 0) {
        return this.mAddressBookList
      }
      return this.mAddressBookList
    },
    BOARD_CONTENT_LIST () {
      if (this.mBoardContentsList.length === 0) {
        return this.mBoardContentsList
      }
      return this.mBoardContentsList
    },
    GE_LOCALE () {
      return this.$i18n.locale
    }

  },
  watch: {
    GE_LOCALE: {
      immediate: true,
      handler (value) {
        this.mConvenienceFuncList = [{ title: this.$t('CHAN_MENU_SEND_NOTI'), targetType: 'writeContents' }, { title: this.$t('CHAN_MENU_WRITE_POST'), targetType: 'writeBoard' }]
      },
      deep: true
    },
    pageUpdate (value, old) {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      if (this.$setParentsId(this.pPopId, 'chanMenu' + this.mChanAlimListTeamKey) === hStack[hStack.length - 1]) {
        this.goNo()
      }
    },
    historyStack (value, old) {
    },
    CHANNEL_DETAIL () {
      console.log(this.CHANNEL_DETAIL)
    }
  }
}
</script>

<style scoped>
.menuHeader {
  /* padding: 0.5rem 0; */
  width: 100%;
  border-bottom: 1px solid #fff;
  border-top-left-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  background-color: white;
  max-width:500px;
  position: absolute;
  right: 0;
}
.menuHeader p{color: #FFFFFF; text-align: center;}

.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%); color: #FFFFFF; }

.channelMenuWrap{
  background-color: white ;
  width:80% ;
  max-width: 500px;
  position: absolute; z-index: 1001;
  height: 100vh;
  top: 0;
  right: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  }

.editColor{ color: #6768a7 !important; }
.editWhiteColor{ color: #fff; }
.editRow{ padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid #ccc; }

.boardBox{ width:100%; height: 0px; display: block; position: relative; }
.boardBoxDown{ animation: dropdown 300ms ease ; animation-fill-mode: both; }
.boardBoxUp{ animation: dropup 300ms ease; animation-fill-mode: both; }

.popUpBackgroundGray{ width: 100%; height: 100vh; position: absolute; z-index:1000; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; }
@keyframes dropdown { 0% {height: 0px;} 100% {height: var(--menuHeight) } }
@keyframes dropup { 0% {height: var(--menuHeight);} 100% {height: 0px;} }
.dropdownBtn{
  width:13px;
  margin:0 auto;
  margin-right:15px;
}

</style>
