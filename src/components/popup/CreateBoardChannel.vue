<template>
  <selectIconBgPopup
    v-if="mSelectBuildingPop"
    :pSelectedBuilding="mSelectedBuilding"
    :selectBd="mSelectedBuilding"
    @no="mSelectBuildingPop = false"
    @makeParam="setIconOrBGData"
    :opentype="mSelectBuilding"
    :pClosePop="closeSelectBuildingPop"
  />
  <div
    :style="!mScrollHiddenYn ? 'overflow-y: scroll;' : ''"
    class="createChanBox"
    @click.stop="preventDefault"
  >
    <gPopHeader
      v-if="mShowBdOrChan === 'C'"
      :headerTitle="`Create New Board`"
      :pClosePop="pClosePop"
    />
    <gPopHeader
      v-else-if="mShowBdOrChan === 'T'"
      :headerTitle="`Create New Channel`"
      :pClosePop="pClosePop"
    />
    <gPopHeader
      v-else-if="!mShowBdOrChan && !mChannelModi"
      :headerTitle="`Create New...`"
      :pClosePop="pClosePop"
    />
    <gPopHeader
      v-else-if="!mShowBdOrChan && mChannelModi === true"
      :headerTitle="`Modify Channel`"
      :pClosePop="pClosePop"
    />
    <div
      :style="!mScrollHiddenYn ? 'overflow-y: scroll;' : ''"
      class="createChanWrap"
    >
      <div class="createChanContentsWrap" style="">
        <!-- 빌딩 선택-->
        <p class="selectBdMsg">Select Building.</p>
        <div class="selectBdBox">
          <div class="selectBdBtn">
            <img
              @click="openSelectBuildingPop"
              v-if="mChannelModi"
              :src="mSelectedBuilding.selectPath"
              class="cursorP"
            />
            <img
              @click="openSelectBuildingPop"
              v-else
              :src="mSelectedBuilding.selectPath"
              class="cursorP"
            />
          </div>
          <div class="cameraBtn">
            <img
              :src="require(`@/assets/images/channel/icon_camera.svg`)"
              class="cursorP"
              alt=""
            />
          </div>
        </div>
        <ul class="tabList" v-if="!mShowBdOrChan && !mChannelModi">
          <li
            v-for="(tab, index) in mTabs"
            :key="index"
            @click="selectTab(index)"
            :class="{ selectedTab: mSelectedTab === index }"
            class="cursorP"
          >
            <p>{{ tab.title }}</p>
          </li>
        </ul>
      </div>
      <!-- 게시판 생성일 때.-->
      <template
        v-if="
          (mShowBdOrChan === 'C' || (!mShowBdOrChan && mSelectedTab === 0)) &&
          !mChannelModi
        "
      >
        <div class="chanList">
          <p>My channel list</p>
          <div class="chanListBox">
            <p v-if="mMyTeamList.length === 0">It's empty.</p>
            <ul
              class="chanListUl okScrollBar"
              @wheel="horizontalScroll"
              id="chanListScroll"
              v-else
            >
              <template
                v-for="(team, index) in mMyTeamList.content"
                :key="index"
              >
                <li
                  @click="getSelectedChanIndex(index)"
                  class="cursorP chanListLi"
                >
                  <div
                    :class="{ selectedChannel: mSelectedChanIndex === index }"
                    class="channelIcon"
                  >
                    <img :src="team.logoPathMtext" class="w100P" />
                  </div>
                  <div class="channelTitle">
                    <p>{{ team ? $changeText(team.nameMtext) : '' }}</p>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <div class="createBoardWrap">
            <div>
              <p class="createBoardTitle">Board Name</p>
              <div class="flexAlignCenter">
                <input
                  class="boardNameInput"
                  type="text"
                  v-model="mNewBoardName"
                  placeholder="Please enter up to 20 characters in the board name."
                />
                <div
                  class="mleft-1"
                  @click="colorPickerShowYn = !colorPickerShowYn"
                  :style="'background:' + selectedColor + ';'"
                ></div>
              </div>
              <div v-if="colorPickerShowYn" class="fr w100P">
                <gColorPicker
                  :colorPick="selectedColor"
                  @closePop="closeColorPickerPop"
                  v-if="colorPickerShowYn"
                  @choiceColor="choiceColor"
                  ref="colorPicker"
                />
              </div>
            </div>
            <div>
              <p class="boardMemoTitle">Board Memo</p>
              <textarea
                v-model="mNewBoardMemo"
                class="boardMemo"
                placeholder="Please enter up to 40 characters in the board description."
              />
            </div>
            <div @click="checkValue" class="creBoardBigBtn">Create</div>
          </div>
        </div>
      </template>
      <!-- 채널 생성일 때. select한 건물에 대해서도 prop으로 보내주기-->
      <createChannel
        class="creChanCompo"
        @changeBgPopShowYn="changeBgPopShowYn"
        :pBdKey="mBuildingKey"
        :class="{ margin220: mShowBdOrChan === 'T' || mChannelModi }"
        v-if="
          mShowBdOrChan === 'T' ||
          (!mShowBdOrChan && mSelectedTab === 1) ||
          mChannelModi
        "
        :pClosePop="pClosePop"
        :pChannelModi="mChannelModi"
        :pCreateNew="mCreateNew"
        :chanDetail="chanDetail"
        @successCreChan="openPage"
        @openPage="openPage"
        :pSelectedBuilding="mSelectedBuilding"
        :pSelectedAreaInfo="pSelectedAreaInfo"
        :pBdAreaList="pBdAreaList"
      />
    </div>
    <gConfirmPop
      :confirmText="
        mCreCheckPopText === null ? returnConfirmText('B') : mCreCheckPopText
      "
      @no="
        ;(mCreBoardCheckPopYn = false),
          (mDeleteYn = false),
          (mCreCheckPopText = null)
      "
      v-if="mCreBoardCheckPopYn"
      :pCreBoardCheckPopYn="mCreBoardCheckPopYn"
      @ok="newBoard"
    />
    <gConfirmPop
      :confirmText="returnConfirmText('A')"
      @no="$emit('successCreBoard', mNewBoardInfo)"
      confirmType="one"
      v-if="mCreatedSuccessPopYn"
      :pCloseCreatedSuccessPopYn="closeCreatedSuccessPopYn"
      :pNewBoard="mNewBoardInfo"
    />
  </div>
</template>

<script>
import createChannel from '@/components/unit/channel/CreateChannel.vue'
import selectIconBgPopup from '@/components/popup/SelectChaniconBgPopup.vue'

export default {
  components: {
    createChannel,
    selectIconBgPopup
  },
  props: {
    pClosePop: Function,
    chanDetail: {},
    pBdAreaList: Array,
    pSelectedAreaInfo: Object,
    pAreaInfo: Array,
    channelModiYn: Boolean
  },
  data() {
    return {
      mTabs: [{ title: 'Board' }, { title: 'Channel' }],
      mCreateNew: true,
      mBuildingKey: null,
      mSelectedBuilding: {
        selectedId: '11',
        selectPath: '/resource/bd/new_bd1.png'
      },
      mSelectedTab: 0,
      mSelectBuildingPop: false,
      mSelectBuilding: 'building',
      mSelectedChanIndex: 0,
      mNewBoardName: '',
      mNewBoardMemo: '',
      colorPickerShowYn: false,
      selectedColor: '#FFCDD2',
      mShowBdOrChan: '',
      mMyTeamList: [],
      mChannelModi: false,
      mCreBoardCheckPopYn: false,
      mCreCheckPopText: null,
      mCreatedSuccessPopYn: false,
      mNewBoardInfo: [],
      mScrollHiddenYn: false
    }
  },
  methods: {
    horizontalScroll(e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 10
      })
    },
    changeBgPopShowYn(showYn) {
      this.mScrollHiddenYn = showYn
    },
    openPage(params) {
      if (params.deleteYn === true) {
        this.$router.push('/')
      } else {
        this.$emit('successCreChan', params)
      }
    },
    selectTab(index) {
      this.mSelectedTab = Number(index)
    },
    openSelectBuildingPop() {
      this.mSelectBuildingPop = true
      this.mSelectBuilding = 'building'
    },
    closeSelectBuildingPop() {
      this.mSelectBuildingPop = false
    },
    preventDefault() {
      return false
    },
    closeColorPicker() {
      this.colorPickerShowYn = true
    },
    setIconOrBGData(param) {
      if (this.mSelectBuilding === 'building') {
        this.mSelectedBuilding = param
      }
      this.mSelectBuildingPop = false
    },
    getSelectedChanIndex(index) {
      this.mSelectedChanIndex = index
    },
    returnConfirmText(type) {
      if (type === 'B') {
        if (this.mShowBdOrChan === 'C' || this.mSelectedChanIndex === 0) {
          return `Create [${this.mNewBoardName}] Board.`
        }
      } else {
        if (this.mShowBdOrChan === 'C' || this.mSelectedChanIndex === 0) {
          return `[${this.mNewBoardName}] board created successfully!`
        }
      }
    },
    checkValue() {
      this.mCreBoardCheckPopYn = true
    },
    closeCreatedSuccessPopYn() {
      this.mCreatedSuccessPopYn = false
    },
    async newBoard() {
      var param = {
        creMenuYn: true,
        cabinet: {
          bdAreaKey: this.pAreaInfo.bdAreaKey,
          creUserKey: this.GE_USER.userKey,
          bdIconPath: this.mSelectedBuilding.selectPath,
          bdKey: this.mBuildingKey,
          cabinetNameMtext: 'EN$^$' + this.mNewBoardName,
          currentTeamKey:
            this.mMyTeamList.content[this.mSelectedChanIndex].teamKey,
          creTeamKey: this.mMyTeamList.content[this.mSelectedChanIndex].teamKey,
          sysCabinetCode: 'BOAR',
          menuType: 'C',
          blindYn: false,
          fileYn: true,
          replyYn: true, // 기본설정 익명x, 파일o, 댓글o
          picBgPath: this.selectedColor,
          itemList: [
            { shareSeq: 0, shareType: 'V' },
            { shareSeq: 0, shareType: 'W' },
            { shareSeq: 0, shareType: 'R' }
          ],
          shareList: [
            {
              shareSeq: 0,
              accessKind: 'F',
              accessKey:
                this.mMyTeamList.content[this.mSelectedChanIndex].teamKey
            }
          ]
        }
      }
      var response = await this.$commonAxiosFunction({
        url: '/sUniB/tp.UB_createBuildingAndCabinet',
        param: param
      })
      if (response) {
        // this.getTeamMenuList()
        this.mCreBoardCheckPopYn = false
        this.mCreatedSuccessPopYn = true
        this.mNewBoardInfo.initData = param
        this.mNewBoardInfo.teamKey = param.cabinet.creTeamKey
        this.mNewBoardInfo.targetKey = response.data.cabinetKey
      }
    },
    choiceColor(color) {
      this.selectedColor = color
      this.$refs.colorPicker.setColor(color)
      this.colorPickerShowYn = false
    },
    closeColorPickerPop(value) {
      if (value === '0') {
      } else {
        this.selectedColor = value
      }
      this.colorPickerShowYn = false
    },
    showBoardOrChannel() {
      const bdCLength = []
      const bdTLength = []

      if (this.pAreaInfo) {
        for (let i = 0; i < this.pAreaInfo.bdList.length; i++) {
          if (this.pAreaInfo.bdList[i].targetKind === 'C') {
            bdCLength.push(this.pAreaInfo.bdList[i])
          } else if (this.pAreaInfo.bdList[i].targetKind === 'T') {
            bdTLength.push(this.pAreaInfo.bdList[i])
          }
        }
        if (bdCLength > bdTLength) {
          this.mShowBdOrChan = 'C'
        } else if (bdTLength > bdCLength) {
          this.mShowBdOrChan = 'T'
        }
      }
      return this.mShowBdOrChan
    },
    async getUserTeamList() {
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      paramMap.set('managerYn', true)
      var resultList = await this.$getTeamList(paramMap)
      this.mMyTeamList = resultList.data
    }
  },
  created() {
    if (this.chanDetail && this.chanDetail.bdKey) {
      this.mBuildingKey = this.chanDetail.bdKey
      this.mSelectedBuilding.selectPath = this.chanDetail.bdIconPath
    }
    this.showBoardOrChannel()
    this.getUserTeamList()
    if (this.channelModiYn) {
      this.mChannelModi = true
    }
  },
  computed: {
    GE_USER() {
      return this.$store.getters['UB_USER/GE_USER']
    }
  }
}
</script>

<style scoped>
.selectedTab {
  background-color: #6768a7 !important;
  color: #fff !important;
  font-weight: bold !important;
  border: 2px solid #6768a7 !important;
}
.flexAllCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.createChanWrap {
  width: 100%;
  display: flex;
  height: 100%;
  top: 50px;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.createChanContentsWrap {
  width: 100%;
  left: 0;
  height: auto;
  margin: 80px 0;
  float: left;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  margin-bottom: 0;
}
.selectedChannel {
  border: 3px solid rgba(255, 255, 255) !important;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6) !important;
}
.selectedChannel + p {
  font-weight: bold !important;
}
.boardMemo {
  width: 100%;
  min-height: 100px;
  float: left;
  border-radius: 5px;
  border: none;
  border: 1px solid #ccc;
  resize: none;
  padding-left: 5px;
  outline: none;
}
.creBoardBigBtn {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  background: #6768a7;
  color: #fff;
  border-radius: 8px;
  width: calc(100% - 30px);
  margin: 0 auto;
  cursor: pointer;
}
.margin220 {
  margin-top: 220px !important;
}
.createChanBox {
  background-color: #fff;
  width: 100%;
  height: 100vh;
  float: left;
  position: absolute;
  z-index: 9998;
  left: 0;
  top: 0;
}
.selectBdMsg {
  font-size: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #6768a7;
}
.selectBdBox {
  display: flex;
  align-items: end;
}
.selectBdBtn {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.selectBdBtn > img {
  width: 60%;
  height: auto;
}
.cameraBtn {
  background-color: #fff;
  margin-left: -30px;
  border-radius: 50%;
  border: 1px solid #ccc;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cameraBtn > img {
  width: 20px;
}
.tabList {
  padding-left: 0;
  padding-top: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.tabList > li {
  border-radius: 10px;
  background-color: #fff;
  color: #6768a7;
  font-weight: normal;
  width: 100px;
  padding: 8px 0;
  border: 2px solid #6768a7;
}
.chanList {
  padding: 2rem 1rem 4rem;
}
.chanList > p {
  font-size: 20px;
  color: #6768a7;
}
.chanListBox {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
}
.chanListBox > p {
  padding: 0 0 2rem;
}
.chanListUl {
  width: auto;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  align-items: start;
  height: 120px;
  gap: 20px;
  padding-left: 10px;
}
.chanListLi {
  padding-top: 5px;
  width: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.channelIcon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #fff;
}
.channelTitle {
  width: 100%;
  overflow: hidden;
}
.channelTitle > p {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 5px;
}
.createBoardWrap {
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 30px;
}
.createBoardTitle {
  font-size: 20px;
  font-weight: bold;
  width: 130px;
}
.boardNameInput {
  width: 100%;
  height: 30px;
}
.boardNameInput + div {
  border: none;
  min-width: 30px;
  max-width: 30px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
}
.boardMemoTitle {
  font-size: 20px;
  font-weight: bold;
  width: 130px;
}
.creChanComp {
  margin-top: 310px !important;
  padding-bottom: 80px !important;
}
</style>
