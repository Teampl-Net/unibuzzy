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
  <div v-if="mLoadYn && $route.path === `/chan/${CHANNEL_DETAIL.teamKey}`">
    <div class="popUpBackgroundGray" @click="goNo"></div>
    <div
      class="channelMenuWrap showModal-enter"
      :class="{ 'showModal-leave': mCloseEventYn === true }"
    >
      <div
        class="menuHeader newHeaderLine"
        :style="
          'height:' +
          ($STATUS_HEIGHT + 50) +
          'px; top: 0; padding-top: ' +
          $STATUS_HEIGHT +
          'px'
        "
      >
        <img
          style="width: 1rem"
          @click="goNo"
          class="mleft-1 cursorP"
          src="@/assets/images/common/popup_close.png"
        />
        <p class="fontBold font20 fl editColor noWrap">
          {{ $t('CHAN_MENU_TITLE_MENU') }}
        </p>
        <div />
      </div>
      <div
        class="fl w100P menuContWrap"
        :style="'padding-top:' + $STATUS_HEIGHT + 'px'"
      >
        <div>
          <div class="fl w100P mtop-2 dMenuDivide">
            <div
              class="fl font14 cursorP commonColor fontBold textLeft w100P dMenuGroup"
              @click="boardDropDown"
            >
              <p class="mleft-1 fl font18 minWidth150">
                <span class="font18 fl commonColor">{{
                  $t('COMMON_NAME_BOARD')
                }}</span>
                <span class="fl mleft-05 commonColor font16 lineHeight26"
                  >({{ BOARD_CONTENT_LIST.length }})</span
                >
              </p>
              <img
                v-show="
                  BOARD_CONTENT_LIST.length !== 0 && mBoardDropEvenYn === true
                "
                src="@/assets/images/common/icon_dash.svg"
                class="fr dropdownBtn mTop05"
              />
              <img
                v-show="
                  BOARD_CONTENT_LIST.length !== 0 && mBoardDropEvenYn !== true
                "
                src="@/assets/images/common/icon_dropdown.svg"
                class="fr dropdownBtn mTop05"
              />
            </div>
            <div
              class="boardBox boardBoxDown mleft-2 scrollOn w100P fl"
              ref="boardRef"
              :class="{
                boardBoxUp: mBoardDropEvenYn === false,
                boardBoxDown: mBoardDropEvenYn === true
              }"
            >
              <menuBoardList
                :propBoardList="BOARD_CONTENT_LIST"
                @boardContentsClick="boardContentsClick"
              />
            </div>
          </div>
          <div
            v-if="
              CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn ||
              ((CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext ||
                CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 1) &&
                (CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 ||
                  CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1 ||
                  CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1))
            "
            class="fl w100P"
            style="border-bottom: 2px solid #6768a730"
            :style="
              (CHANNEL_DETAIL.D_CHAN_AUTH.memberYn ||
                CHANNEL_DETAIL.D_CHAN_AUTH.memberYn === 1) &&
              (CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 ||
                CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1 ||
                CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1)
                ? ''
                : ''
            "
          >
            <div
              class="fl font14 cursorP commonColor fontBold textLeft w100P dMenuGroup"
              @click="bookDropDown"
            >
              <p class="mleft-1 fl font18 minWidth150">
                <span class="font18 fl commonColor">{{
                  $t('CHAN_MENU_TITLE_ADDR')
                }}</span>
                <span class="fl mleft-05 commonColor font16 lineHeight26"
                  >({{ CABINET_LIST.length }})</span
                >
              </p>
              <img
                v-show="
                  CABINET_LIST.length !== 0 && mAddressDropEvenYn === true
                "
                src="@/assets/images/common/icon_dash.svg"
                class="fr dropdownBtn mTop05"
              />
              <img
                v-show="
                  CABINET_LIST.length !== 0 && mAddressDropEvenYn !== true
                "
                src="@/assets/images/common/icon_dropdown.svg"
                class="fr dropdownBtn mTop05"
              />
            </div>
            <div
              class="boardBox boardBoxDown mleft-2 scrollOn w100P fl"
              ref="addressBookGroupRef"
              :class="{
                boardBoxUp: mAddressDropEvenYn === false,
                boardBoxDown: mAddressDropEvenYn === true
              }"
            >
              <addressBookList
                :propAddressBookList="CABINET_LIST"
                @openBookDetail="openBookDetailPop"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="w100P textRight fontBold cursorP mngChanBtn"
        v-if="
          (CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn === 1 &&
            (CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 ||
              CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1)) ||
          CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn === 1 ||
          CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn === 1
        "
      >
        <gBtnSmall
          btnTitle=" Manager Settings"
          class=""
          @click="clickEditChanBtn"
        />
      </div>
    </div>
  </div>
</template>
<script>
import addressBookList from '../container/chanMenu/AddressBookList.vue'
import menuBoardList from '../container/chanMenu/BoardContentsList.vue'

export default {
  props: {
    propData: {},
    pPopId: {}
  },
  created() {
    if (this.propData) {
      if (this.propData.targetKey) {
        this.mChanAlimListTeamKey = JSON.parse(
          JSON.stringify(this.propData.targetKey)
        )
      }
    }
    this.readyFunction()
  },
  data() {
    return {
      mChanAlimListTeamKey: 0,
      mScreenHeight: 0,
      mAddressBookList: [],
      mBoardContentsList: [],
      mBoardDropEvenYn: true,
      mAddressDropEvenYn: true,
      mCloseEventYn: false,
      mLoadYn: false
    }
  },
  components: {
    addressBookList,
    menuBoardList
  },
  methods: {
    readyFunction() {
      var history = this.$store.getters['UB_HISTORY/hStack']
      this.writePopId = this.$setParentsId(
        this.pPopId,
        'chanMenu' + this.mChanAlimListTeamKey
      )
      history.push(
        this.$setParentsId(this.pPopId, 'chanMenu' + this.mChanAlimListTeamKey)
      )
      this.$store.commit('UB_HISTORY/updateStack', history)
      this.mScreenHeight = window.innerHeight

      this.getTeamCabList(false).then((temp) => {
        this.getTeamMenuList().then((temp) => {
          this.boardListLength()
          this.bookListLength()
          this.mLoadYn = true
        })
      })
    },
    async clickEditChanBtn() {
      if (
        !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn &&
        !this.CHANNEL_DETAIL.D_CHAN_AUTH.mngMemberYn &&
        !this.CHANNEL_DETAIL.D_CHAN_AUTH.mngTeamYn
      ) {
        this.$showToastPop(this.$t('CHAN_MSG_NOFOLLOW'))
        var history = this.$store.getters['UB_HISTORY/hStack']
        var removePage = history[history.length - 1]
        history = history.filter((element, index) => index < history.length - 1)
        await this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        await this.$store.commit('UB_HISTORY/updateStack', history)

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
    openBookDetailPop(clickAddressBookData) {
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
    async getTeamCabList(loadingYn) {
      var paramMap = new Map()
      paramMap.set('teamKey', this.mChanAlimListTeamKey)
      paramMap.set('sysCabinetCode', 'USER')
      paramMap.set('adminYn', true)
      var result = await this.$commonAxiosFunction(
        {
          url: '/sUniB/tp.getTeamMenuList',
          param: Object.fromEntries(paramMap)
        },
        !(loadingYn === false)
      )
      var tempList = []
      tempList = result.data
      for (var i = 0; i < tempList.length; i++) {
        var changeT = tempList[i].cabinetNameMtext
        tempList[i].cabinetNameMtext = this.$changeText(changeT)
      }

      this.mAddressBookList = tempList
    },
    async getTeamMenuList() {
      var paramMap = new Map()
      paramMap.set('teamKey', this.mChanAlimListTeamKey)
      paramMap.set('currentTeamKey', this.mChanAlimListTeamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', this.GE_USER.userKey)

      var result = await this.$getTeamMenuList(paramMap, true)
      this.mBoardContentsList = result
    },
    /** 화면상 게시판의 높이를 myBoardList.length를 통해 구해주는 함수 */
    boardListLength() {
      if (this.mBoardContentsList) {
        var boardListLength =
          this.mBoardContentsList.length === 0
            ? 1
            : this.mBoardContentsList.length * 45 + 10
        this.$nextTick(() => {
          if (this.$refs.boardRef) {
            this.$refs.boardRef.style.setProperty(
              '--menuHeight',
              boardListLength + 'px'
            )
          }
        })
      } else {
        this.$nextTick(() => {
          if (this.$refs.boardRef) {
            this.$refs.boardRef.style.setProperty('--menuHeight', '30px')
          }
        })
      }
    },
    boardDropDown() {
      if (this.BOARD_CONTENT_LIST.length !== 0) {
        this.boardListLength()
        if (this.mBoardDropEvenYn) {
          this.mBoardDropEvenYn = false
        } else {
          this.mBoardDropEvenYn = true
        }
      }
    },
    /** 화면상 주소록의 높이를 mAddressBookList.length를 통해 구해주는 함수 */
    bookListLength() {
      if (this.mAddressBookList) {
        var bookListHeight =
          this.mAddressBookList.length === 0
            ? 1
            : this.mAddressBookList.length * 45 + 10
        this.$nextTick(() => {
          if (this.$refs.addressBookGroupRef) {
            this.$refs.addressBookGroupRef.style.setProperty(
              '--menuHeight',
              bookListHeight + 'px'
            )
          }
        })
      } else {
        this.$nextTick(() => {
          if (this.$refs.addressBookGroupRef) {
            this.$refs.addressBookGroupRef.style.setProperty(
              '--menuHeight',
              '30px'
            )
          }
        })
      }
    },
    bookDropDown() {
      if (this.CABINET_LIST.length !== 0) {
        this.bookListLength()
        if (this.mAddressDropEvenYn) {
          this.mAddressDropEvenYn = false
        } else {
          this.mAddressDropEvenYn = true
        }
      }
    },
    async goNo() {
      this.mCloseEventYn = true
      var history = this.$store.getters['UB_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      await this.$store.commit('UB_HISTORY/setRemovePage', removePage)
      await this.$store.commit('UB_HISTORY/updateStack', history)
      this.$emit('closePop')
    },
    async boardContentsClick(boardListData) {
      var resultMainData = await this.$getBoardMainData(boardListData)

      if (resultMainData.contentsListPage) {
        var contentList = resultMainData.contentsListPage.content
        for (let i = 0; i < contentList.length; i++) {
          contentList[i].shareItem = resultMainData.cabinet.mShareItemList
        }
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', contentList)
      }
      var goBoardMainParam = {}
      goBoardMainParam.initData = resultMainData
      goBoardMainParam.targetType = 'boardMain'
      goBoardMainParam.teamKey = boardListData.teamKey
      goBoardMainParam.targetKey = boardListData.cabinetKey
      goBoardMainParam.cabinetNameMtext = boardListData.cabinetNameMtext
      // 채널에서 들어왔는지, 링크나 메인에서 바로 들어왔는지 구분
      goBoardMainParam.chanYn = true
      this.$emit('openItem', goBoardMainParam)
    },
    teamName() {
      var teamName
      if (this.propData) {
        if (this.propData.value) {
          teamName =
            this.propData.value.nameMtext || this.propData.value.teamNameMtext
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
    GE_USER() {
      return this.$store.getters['UB_USER/GE_USER']
    },
    CHANNEL_DETAIL() {
      return this.$getDetail('TEAM', this.mChanAlimListTeamKey)[0]
    },
    historyStack() {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    pageUpdate() {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    CABINET_LIST() {
      if (this.mAddressBookList.length === 0) {
        return this.mAddressBookList
      }
      return this.mAddressBookList
    },
    BOARD_CONTENT_LIST() {
      if (this.mBoardContentsList.length === 0) {
        return this.mBoardContentsList
      }
      return this.mBoardContentsList
    }
  },
  watch: {
    pageUpdate(value, old) {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      if (
        this.$setParentsId(
          this.pPopId,
          'chanMenu' + this.mChanAlimListTeamKey
        ) === hStack[hStack.length - 1]
      ) {
        this.goNo()
      }
    }
  }
}
</script>

<style scoped>
.menuHeader {
  width: 100%;
  border-bottom: 1px solid #fff;
  border-top-left-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  background-color: white;
  max-width: 500px;
  position: absolute;
  right: 0;
}
.menuHeader p {
  color: #ffffff;
  text-align: center;
}

.menuRow {
  padding: 1rem;
  box-sizing: border-box;
  text-align: left;
  height: 3.8rem;
  border-bottom: 0.5px solid rgb(255 255 255 / 26%);
  color: #ffffff;
}

.channelMenuWrap {
  background-color: white;
  width: 80%;
  max-width: 500px;
  position: absolute;
  z-index: 1001;
  height: 100vh;
  top: 0;
  right: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.editColor {
  color: #6768a7 !important;
}
.editWhiteColor {
  color: #fff;
}
.editRow {
  padding: 1rem;
  box-sizing: border-box;
  text-align: left;
  height: 3.8rem;
  border-bottom: 0.5px solid #ccc;
}

.boardBox {
  width: 100%;
  height: 0px;
  display: block;
  position: relative;
}
.boardBoxDown {
  animation: dropdown 300ms ease;
  animation-fill-mode: both;
}
.boardBoxUp {
  animation: dropup 300ms ease;
  animation-fill-mode: both;
}
.popUpBackgroundGray {
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  background: #00000026;
  display: flex;
  justify-content: center;
  align-items: center;
}
.noWrap {
  white-space: nowrap;
}
.dMenuDivide {
  margin-top: 50px;
  border-bottom: 2px solid #6768a730;
}
.dMenuGroup {
  white-space: nowrap;
  padding: 10px 0;
  border-bottom: 2px solid #6768a730;
}
.mTop05 {
  margin-top: 0.5rem;
}
.lineHeight26 {
  line-height: 26px;
}
.minWidth150 {
  min-width: 150px;
}
.conviFuncTitle {
  overflow: hidden scroll;
  width: calc(100% - 100px);
  clear: left;
}
.conviItemWrap {
  width: 100%;
  padding: 10px 0;
}
.conviItem {
  width: calc(100% - 30px - 3rem);
  margin: 0 0 0 0;
  width: 100% !important;
}
.menuContWrap {
  height: calc(100% - 110px);
  overflow: hidden scroll;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.mngChanBtn {
  overflow: hidden;
  height: 50px;
  padding: 10px;
  padding-bottom: 60px;
}
@keyframes dropdown {
  0% {
    height: 0px;
  }
  100% {
    height: var(--menuHeight);
  }
}
@keyframes dropup {
  0% {
    height: var(--menuHeight);
  }
  100% {
    height: 0px;
  }
}
.dropdownBtn {
  width: 13px;
  margin: 0 auto;
  margin-right: 15px;
}
</style>
