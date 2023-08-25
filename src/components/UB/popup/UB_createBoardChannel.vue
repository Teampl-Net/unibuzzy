<template>
  <seleciconBgPopup v-if="mSelectBuildingPop" :pSelectedBuilding="mSelectedBuilding" :selectBd="this.mSelectedBuilding" @no='mSelectBuildingPop=false' @makeParam='setIconOrBGData' :opentype="mSelectBuilding" :pClosePop="closeSelectBuildingPop"/>
  <div style="overflow-y:scroll; background-color:#fff; width: 100%; height: 100vh; float: left; position: absolute; z-index: 9998; left: 0; top: 0;" @click.stop="preventDefault">
    <gPopHeader v-if="mShowBdOrChan==='C'" :headerTitle="`Create New Board`" :pClosePop="pClosePop" />
    <gPopHeader v-else-if="mShowBdOrChan==='T'" :headerTitle="`Create New Channel`" :pClosePop="pClosePop" />
    <gPopHeader v-else-if="!mShowBdOrChan && !mChannelModi" :headerTitle="`Create New...`" :pClosePop="pClosePop" />
    <gPopHeader v-else-if="!mShowBdOrChan && mChannelModi === true" :headerTitle="`Modify Channel`" :pClosePop="pClosePop" />
    <div style="height:100%; overflow-y:scroll; background-color:#fff; display:flex; flex-direction:column;" class="createChanWrap" >
      <div class="createChanContentsWrap" style="">
      <!-- 빌딩 선택-->
        <p style="font-size:20px; padding-top:10px; padding-bottom:10px; color:#6768a7; ">Select Building.</p>
        <div style="display:flex; align-items:end;">
        <div style="width:120px; height:120px; border-radius:50%; border:1px solid #ccc; display:flex; align-items:center; justify-content:center;">
          <img @click="openSelectBuildingPop" v-if="mChannelModi" :src="mSelectedBuilding.selectPath" class="cursorP" style='width:60%; height:auto;'/>
          <img @click="openSelectBuildingPop" v-else :src="mSelectedBuilding.selectPath" class="cursorP" style='width:60%; height:auto;'/>
        </div>
        <div style="background-color:#fff; margin-left:-30px; border-radius:50%; border:1px solid #ccc; width:35px; height:35px; display:flex; align-items:center; justify-content:center;">
          <img :src="require(`@/assets/images/channel/icon_camera.svg`)" class="cursorP" style="width:20px;" alt="">
        </div>
        </div>
        <ul v-if="!mShowBdOrChan && !mChannelModi" style="padding-left:0; padding-top:30px; display:flex; align-items:center; gap:10px;">
          <li v-for="(tab, index) in mTabs" :key="index" style="border-radius:10px; background-color:#fff; color:#6768A7; font-weight:normal; width:100px; padding:8px 0; border:2px solid #6768A7;" @click="selectTab(index)" :class="{selectedTab : mSelectedTab===index}" class="cursorP">
          <p>{{ tab.title }}</p>
          </li>
        </ul>
      </div>
      <!-- 게시판 생성일 때.-->
      <template v-if="(mShowBdOrChan==='C' || (!mShowBdOrChan && mSelectedTab === 0)) && !mChannelModi">
        <div style="padding:2rem 1rem;">
          <p style="font-size:20px; color:#6768A7;">My channel list</p>
            <div style="width:100%; overflow-x:scroll;">
              <p v-if="mMyTeamList.length===0" style="padding:0 0 2rem;">It's empty.</p>
              <ul v-else style="width:auto; overflow-x:scroll; display:flex; align-items:start; height:111px; gap:20px; padding-left:0;">
                <teamplate v-for="(team, index) in mMyTeamList.content" :key="index">
                  <li @click="getSelectedChanIndex(index)" class="cursorP" style="padding-top:5px;width:80px; display:flex; align-items:center; flex-direction:column;">
                    <div :class="{selectedChannel : mSelectedChanIndex===index}" style="width:80px; height:80px; border-radius:50%; border:3px solid #fff;">
                      <img :src="team.logoPathMtext" class="w100P" />
                    </div>
                    <div style="width:100%; overflow:hidden;">
                      <p style="width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; padding-top:5px;">{{ team ? $changeText(team.nameMtext) : '' }}</p>
                    </div>
                  </li>
                </teamplate>
              </ul>
          </div>

          <div style="display:flex; flex-direction:column; justify-content:start; gap:30px;">
            <div style="">
              <p style="font-size:20px; font-weight:bold;width:130px;">Board Name</p>
              <div style="display:flex; align-items:center;">
                <input type="text" v-model="mNewBoardName" style="width:100%; height:30px;" placeholder="Please enter up to 20 characters in the board name."/>
                <div class="mleft-1" @click="this.colorPickerShowYn = !this.colorPickerShowYn" style=" border: none; min-width: 30px; max-width: 30px; width:30px; height: 30px; border-radius:100%;" :style="'background:' + this.selectedColor + ';'" ></div>
              </div>
              <div v-if="colorPickerShowYn" class="fr" style="width:100%;">
                <gColorPicker :colorPick="selectedColor" @closePop="closeColorPickerPop" v-if="colorPickerShowYn" @choiceColor='choiceColor' ref="colorPicker" />
              </div>
            </div>

            <div style="">
              <p style="font-size:20px; font-weight:bold; width:130px;">Board Memo</p>
              <textarea v-model="mNewBoardMemo" class="boardMemo" placeholder="Please enter up to 40 characters in the board description."/>
            </div>
          </div>
          <div @click="checkValue" class="creBoardBigBtn fl mtop-1;" style="margin: 0 auto; cursor: pointer; position: absolute; bottom: 80px;">Create</div>

        </div>
      </template>
      <!-- 채널 생성일 때. select한 건물에 대해서도 prop으로 보내주기-->
      <createChannel style="margin-top:310px; padding-bottom:80px;" :pBdKey="mBuildingKey" :class="{margin220 : mShowBdOrChan==='T' || mChannelModi}" v-if="mShowBdOrChan==='T' || (!mShowBdOrChan && mSelectedTab === 1) || mChannelModi" :pClosePop="pClosePop" :pChannelModi="mChannelModi" :pCreateNew="mCreateNew" :chanDetail="chanDetail" @successCreChan="openPage" @openPage="openPage" :pSelectedBuilding="mSelectedBuilding" :pSelectedAreaInfo="pSelectedAreaInfo" :pBdAreaList="pBdAreaList"/>
    </div>
    <gConfirmPop :confirmText="mCreCheckPopText === null ? returnConfirmText('B') : mCreCheckPopText" @no='mCreBoardCheckPopYn=false, mDeleteYn=false, mCreCheckPopText=null' v-if="mCreBoardCheckPopYn" :pCreBoardCheckPopYn="mCreBoardCheckPopYn" @ok='newBoard' />
    <gConfirmPop :confirmText="returnConfirmText('A')" @no="this.$emit('successCreBoard', mNewBoardInfo)" confirmType="one" v-if="mCreatedSuccessPopYn" :pCloseCreatedSuccessPopYn="closeCreatedSuccessPopYn" :pNewBoard="mNewBoardInfo"/>
  </div>
</template>

<script>
import gPopHeader from '../layout/UB_gPopHeader.vue'
import createChannel from '@/components/UB/popup/UB_createChannel.vue'
import seleciconBgPopup from '@/components/popup/creChannel/Tal_selectChaniconBgPopup.vue'

export default {
  components: {
    gPopHeader,
    createChannel,
    seleciconBgPopup
  },
  props: {
    pClosePop: Function,
    chanDetail: {},
    pBdAreaList: Array,
    pSelectedAreaInfo: Object,
    pAreaInfo: Array,
    channelModiYn: Boolean
  },
  data () {
    return {
      mTabs: [
        { title: 'Board' },
        { title: 'Channel' }
      ],
      mCreateNew: true,
      mBuildingKey: null,
      mSelectedBuilding: { selectedId: '11', selectPath: '/resource/bd/new_bd1.png' },
      mSelectedTab: 0,
      mSelectBuildingPop: false,
      mSelectBuilding: 'building',
      mSelectedChanIndex: 0,
      mNewBoardName: '',
      mNewBoardMemo: '',
      mNewResult: [],
      mMyTeamNameList: [],
      colorPickerShowYn: false,
      selectedColor: '#FFCDD2',
      mShowBdOrChan: '',
      mMyTeamList: [],
      mChannelModi: false,
      mCreBoardCheckPopYn: false,
      mCreCheckPopText: null,
      mCreatedSuccessPopYn: false,
      mNewBoardInfo: []
    }
  },
  methods: {
    openPage (params) {
      if (params.deleteYn === true) {
        this.$router.push('/')
      } else {
        this.$emit('successCreChan', params)
      }
    },
    selectTab (index) {
      this.mSelectedTab = Number(index)
      console.log('mSelectedTab', this.mSelectedTab)
      // if (this.mSelectedTab === 0) {
      //   this.getMatchName()
      // }
    },
    openSelectBuildingPop () {
      this.mSelectBuildingPop = true
      this.mSelectBuilding = 'building'
    },
    closeSelectBuildingPop () {
      this.mSelectBuildingPop = false
    },
    preventDefault () {
      return false
    },
    showColorPicker () {
      this.colorPickerShowYn = true
    },
    closeColorPicker () {
      this.colorPickerShowYn = true
    },
    setIconOrBGData (param) {
      if (this.mSelectBuilding === 'building') {
        this.mSelectedBuilding = param
      }
      this.mSelectBuildingPop = false
    },
    getSelectedChanIndex (index) {
      this.mSelectedChanIndex = index
      console.log('selected mMyTeamList', this.mMyTeamList.content[this.mSelectedChanIndex])
    },
    returnConfirmText (type) {
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
    checkValue () {
      this.mCreBoardCheckPopYn = true
    },
    closeCreatedSuccessPopYn () {
      this.mCreatedSuccessPopYn = false
    },
    async newBoard () {
      var param = {
        creMenuYn: true,
        cabinet: {
          bdAreaKey: this.pAreaInfo.bdAreaKey,
          creUserKey: this.GE_USER.userKey,
          bdIconPath: this.mSelectedBuilding.selectPath,
          bdKey: this.mBuildingKey,
          cabinetNameMtext: 'EN$^$' + this.mNewBoardName,
          currentTeamKey: this.mMyTeamList.content[this.mSelectedChanIndex].teamKey,
          creTeamKey: this.mMyTeamList.content[this.mSelectedChanIndex].teamKey,
          sysCabinetCode: 'BOAR',
          menuType: 'C',
          blindYn: false,
          fileYn: true,
          replyYn: true, // 기본설정 익명x, 파일o, 댓글o
          picBgPath: this.selectedColor,
          itemList: [{ shareSeq: 0, shareType: 'V' }, { shareSeq: 0, shareType: 'W' }, { shareSeq: 0, shareType: 'R' }],
          shareList: [{ shareSeq: 0, accessKind: 'F', accessKey: this.mMyTeamList.content[this.mSelectedChanIndex].teamKey }]
        }
      }
      var response = await this.$commonAxiosFunction({
        url: '/sUniB/tp.UB_createBuildingAndCabinet',
        param: param
      })
      console.log('newBoard param', param)
      if (response) {
        // this.getTeamMenuList()
        this.mCreBoardCheckPopYn = false
        this.mCreatedSuccessPopYn = true
        this.mNewBoardInfo = param.cabinet
        console.log('newBoard response', response)
      }
    },
    choiceColor (color) {
      this.selectedColor = color
      this.$refs.colorPicker.setColor(color)
      // console.log(color)
      this.colorPickerShowYn = false
    },
    closeColorPickerPop (value) {
      if (value === '0') {
      } else {
        this.selectedColor = value
      }
      this.colorPickerShowYn = false
    },
    showBoardOrChannel () {
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
        console.log('results... ', bdCLength, bdTLength)
        if (bdCLength > bdTLength) {
          this.mShowBdOrChan = 'C'
        } else if (bdTLength > bdCLength) {
          this.mShowBdOrChan = 'T'
        }
      }
      console.log('===========mShowBdOrChan', this.mShowBdOrChan)
      return this.mShowBdOrChan
    },
    async getUserTeamList () {
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      paramMap.set('managerYn', true)
      var resultList = await this.$getTeamList(paramMap)
      this.mMyTeamList = resultList.data
      if (this.mMyTeamList) {
        console.log('mMyTeamList', this.mMyTeamList)
      }
    }
    // async getTeamMenuList () {
    //   var paramMap = new Map()
    //   paramMap.set('teamKey', this.mMyTeamNameList[this.mSelectedChanIndex].teamKey)
    //   paramMap.set('sysCabinetCode', 'BOAR')
    //   paramMap.set('userKey', this.GE_USER.userKey)
    //   paramMap.set('managerYn', true)
    //   var result = await this.$getTeamMenuList(paramMap, true)

    //   this.cabinetList = result
    //   console.log('===== cabinetList ====')
    //   console.log(this.cabinetList)
    // },
    /* 해당 area에 속한 channel들만 보이게 함 */
    // 내가 관리하고 있는 channel들 중에서 내가 클릭한 area와 이름이 같은 것들만 추출함
    // getMatchName () {
    //   if (this.mMyTeamList) {
    //     for (let i = 0; i < this.mMyTeamList.content.length; i++) {
    //       if (this.pAreaInfo) {
    //         if (this.mMyTeamList.content[i].bdAreaNameMtext === this.pAreaInfo.bdAreaNameMtext) {
    //           this.mMyTeamNameList.push(this.mMyTeamList.content[i])
    //         }
    //       }
    //     }
    //     console.log('mMyTeamNameList', this.mMyTeamNameList)
    //   }
    // },
  },
  created () {
    // this.mSelectedTab = -1
    // console.log('mMyTeamList', this.mMyTeamList)
    console.log('=====chanDetail', this.chanDetail)
    if (this.chanDetail && this.chanDetail.bdKey) {
      this.mBuildingKey = this.chanDetail.bdKey
      this.mSelectedBuilding.selectPath = this.chanDetail.bdIconPath
    }
    console.log('=====pAreaInfo', this.pAreaInfo)
    this.showBoardOrChannel()
    this.getUserTeamList()
    if (this.channelModiYn) {
      this.mChannelModi = true
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}

</script>

<style scoped>

.selectedTab{
  background-color:#6768A7 !important;
  color:#fff !important;
  font-weight:bold !important;
  border:2px solid #6768A7 !important;
}
.flexAllCenter{
  display:flex;
  justify-content:center;
  align-items:center;
}
.createChanWrap{
  width: 100%;
  display: flex;
  height: 100%;
  top:50px;
  }
.createChanContentsWrap{
  width: 100%;
  left:0;
  height: auto;
  margin: 80px 0;
  float: left;
  display: flex;
  align-items: center;
  justify-content:start;
  flex-direction:column;
  margin-bottom: 0;
}
.selectedChannel{
  border:3px solid rgba(255,255,255) !important;
  box-shadow:0 0 5px rgba(0,0,0,0.6) !important;
}
.selectedChannel + p{
  font-weight:bold !important;
}
.boardMemo{
  width: 100%; min-height: 100px; float: left; border-radius: 5px;  border: none; border: 1px solid #ccc;resize:none; padding-left: 5px;
  outline: none;
}
.creBoardBigBtn{
  height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;
  width: calc(100% - 30px);
}
.margin220{
  margin-top:220px !important;
}

</style>
