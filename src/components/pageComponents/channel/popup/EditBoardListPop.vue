<i18n>
{
  "ko": {
    "EDIT_BOARD_MSG_NOBOARD": "게시판이 없어요.",
    "EDIT_BOARD_MSG_CREBOARD": "버튼을 눌러 게시판을 생성해보세요.",
    "EDIT_BOARD_MSG_DELETE": "게시판을 삭제하시겠습니까?"
  },
  "en": {
    "EDIT_BOARD_MSG_NOBOARD": "There's no board",
    "EDIT_BOARD_MSG_CREBOARD": "Press the button to create a board.",
    "EDIT_BOARD_MSG_DELETE": "Are you sure you want to delete the board?"
  }
}
</i18n>
<template>
  <div class="w100P h100P channelMenuEditWrap pagePaddingWrap">
    <gPopHeader :headerTitle="propData.popHeaderText" :pClosePop="pClosePop" />
    <div v-if="CHANNEL_DETAIL" class="h100P boardListWrap">
      <draggable  ref="editableArea" @end="changePosTeamMenu" class="ghostClass dragBox" :options="{ghostClass:'sortable-ghost',animation:150}" v-model="cabinetList" ghost-class="ghost" :disabled='enabled' delay="200"  >
        <transition-group>
          <template v-for="(data, index) in cabinetList" :key="data.cabinetKey">
            <gBoardCard :propData="data" @cardEmit="cardEmit" :compoIdx="index" :style="cabinetList.length - 1 === index && index !== 0? 'padding-bottom: 100px; border-bottom: 0;':''" />
          </template>
        </transition-group>
      </draggable>
      <img src="@/assets/images/button/Icon_CreBoardBtn.png" @click="addBoardRow" alt="button of create board" class="img-78 img-w66 createBoardBtn">
      <gListEmpty v-if="cabinetList.length === 0" :title="$t('EDIT_BOARD_MSG_NOBOARD')" :subTitle="$t('EDIT_BOARD_MSG_CREBOARD')" option='EDIT' />
    </div>
  </div>
  <gConfirmPop :confirmText="errorBoxText" confirmType='two' @no="errorBoxYn = false" @ok="confirmfunc" v-if="errorBoxYn"/>
  <modiBoardPop :chanInfo="chanInfo" :pClosePop="closeNrefresh" :modiBoardDetailProps="modiBoardDetailProps" v-if="modiBoardPopShowYn" @closePop="closeNrefresh" :chanName="teamNameText" @openPop="openPop"/>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import modiBoardPop from '@/components/popup/board/UB_modiBoardPopup.vue'
export default {
  props: {
    teamNameText: {},
    propData: {},
    pPopId: {},
    pClosePop: Function

  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    },
    CAB_DETAIL () {
      if (this.cabinetList.length === 0) {
        return []
      }
      return this.cabinetList
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    },
    CHANNEL_DETAIL () {
      return this.$getDetail('TEAM', this.propData.teamKey)[0]
    },
    history () {
      return this.$store.getters['UB_HISTORY/hStack']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      if (this.popId === this.history[this.history.length - 1]) {
        this.goNo()
      }
    }
  },
  created () {
    if (this.pPopId) this.popId = JSON.parse(JSON.stringify(this.pPopId))
    this.$emit('openLoading')
    if (!this.propData.initData) {
      this.getTeamMenuList()
    } else {
      this.cabinetList = this.propData.initData
    }
    this.$emit('closeLoading')
  },
  data () {
    return {
      popId: null,
      modiBoardDetailProps: null,
      modiBoardPopShowYn: false,
      enabled: false,
      errorBoxText: '',
      errorBoxYn: false,
      tempDeleteData: {},
      currentConfirmType: '',
      currentTeamKey: null,
      chanInfo: null,
      cabinetList: []
    }
  },
  components: {
    modiBoardPop,
    draggable: VueDraggableNext
  },
  methods: {
    cardEmit (param) {
      var type = param.targetType
      var data = param.data
      var idx = param.index
      if (type === 'open') {
        this.openModiBoardPop(data)
      } else if (type === 'edit') {
        this.openModiBoardPop(data)
      } else if (type === 'delete') {
        this.checkDelete(data, idx)
      }
    },
    async checkDelete (data, index) {
      var param = {}
      param.currentTeamKey = data.creTeamKey
      param.jobkindId = 'BOAR'
      param.cabinetKey = data.cabinetKey
      param.offsetInt = 0
      param.pageSize = 1
      var totalElements
      await this.$getContentsList(param, true).then(resulte => {
        totalElements = resulte.totalElements
      })
      var temp = {}
      temp.data = data
      temp.index = index
      this.tempDeleteData = temp
      this.currentConfirmType = 'delete'
      if (totalElements === undefined) {
        this.errorBoxText = this.$t('EDIT_BOARD_MSG_DELETE')
      } else {
        if (this.GE_LOCALE === 'ko') {
          this.errorBoxText = totalElements + '개의 게시글이 있는 게시판입니다. \n 정말 삭제하시겠습니까?'
        } else {
          this.errorBoxText = `A board with ${totalElements} posts. Are you sure you want to delete it?`
        }
      }

      this.errorBoxYn = true
    },
    async confirmfunc () {
      if (this.currentConfirmType === 'delete') {
        var data = this.tempDeleteData.data
        var index = this.tempDeleteData.index
        await this.deleteCabinet(data, index)
        this.errorBoxYn = false
      }
    },
    async closeNrefresh () {
      await this.getTeamMenuList()
      this.modiBoardPopShowYn = false
    },
    async getTeamMenuList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.CHANNEL_DETAIL.teamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', this.GE_USER.userKey)
      paramMap.set('adminYn', true)
      var result = await this.$getTeamMenuList(paramMap, true)
      this.cabinetList = result
    },
    goNo () {
      var history = this.$store.getters['UB_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('UB_HISTORY/setRemovePage', removePage)
      this.$store.commit('UB_HISTORY/updateStack', history)
      this.$emit('closeXPop')
    },
    async deleteCabinet (data, index) {
      var param = {}
      param.currentTeamKey = data.creTeamKey
      param.cabinetKey = data.cabinetKey
      param.menuType = data.menuType
      var result = await this.$deleteCabinet(param)
      if (result === true || result === 'true') {
        this.cabinetList.splice(index, 1)
      }
    },
    openModiBoardPop (data) {
      this.modiBoardDetailProps = data
      this.modiBoardDetailProps.teamNameMtext = this.$changeText(this.CHANNEL_DETAIL.nameMtext)
      this.modiBoardPopShowYn = true
    },
    async addBoardRow () {
      var param = {}
      param.creMenuYn = true
      var cabinet = {}
      var defaultAddBoardName = this.$checkSameName(this.CAB_DETAIL, 'board')
      cabinet.cabinetNameMtext = 'EN$^$' + defaultAddBoardName
      cabinet.currentTeamKey = this.CHANNEL_DETAIL.teamKey
      cabinet.creTeamKey = this.CHANNEL_DETAIL.teamKey
      cabinet.sysCabinetCode = 'BOAR'
      cabinet.menuType = 'C'
      cabinet.blindYn = false
      cabinet.fileYn = true
      cabinet.replyYn = true // 기본설정 익명x, 파일o, 댓글o
      param.cabinet = cabinet
      var result = await this.$saveCabinet(param)
      if (result.result === true && result.cabinetKey !== undefined && result.cabinetKey !== null && result.cabinetKey !== 0) {
        await this.getTeamMenuList()
      }
    },
    anima () {
      document.getElementsByClassName('addNewEffect')[0].style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
      setTimeout(() => {
        document.getElementsByClassName('addNewEffect')[0].style.backgroundColor = ''
      }, 800)
    },
    async changePosTeamMenu () {
      var paramSet = {}

      var tempList = []
      for (let index = 0; index < this.cabinetList.length; index++) {
        var temp = {}
        temp = this.cabinetList[index]
        temp.menuType = 'C'
        tempList.push(temp)
      }

      paramSet.teamMenuList = [...tempList]
      await this.$commonAxiosFunction(
        {
          url: '/sUniB/tp.changePosTeamMenu',
          param: paramSet
        }
      )
    }
  }
}

</script>

<style scoped>
.addNewEffect {
  transition: background-color 0.5s ease-in;
}
.menuHeader {
  position: absolute;
  top: 0rem;
  left: 0;
}
.menuHeader p {
  color: #FFFFFF;
  font-size: 20px;
  text-align: center;
}
.menuRow {
  padding: 1rem;
  box-sizing: border-box;
  text-align: left;
  height: 3.8rem;
  border-bottom: 0.5px solid rgb(255 255 255 / 26%);
  color: #FFFFFF;
}
.channelMenuEditWrap {
  width: 100% ;
  height: 100% ;
  top: 0;
  right: 0;
  position: absolute;
  z-index: 99999;
  background-color: white;
  padding-top: 0 !important;
}
.btnBig {
  font-size: 16px;
  width: 5rem;
  height: 2rem;
}
.editWrap {
  background-color: #F9F9F9;
}
.editmenuHeader {
  border-bottom: 1.5px solid #999;
}
.editColor {
  color: #6768a7 !important;
}
.editRow {
  padding: 1rem;
  box-sizing: border-box;
  text-align: left;
  height: 3.8rem;
  border-bottom:
  0.5px solid #ccc;
}
.boardPlusBtn {
  color:white;
  font-size:20px;
  font-weight:bold;
}
.boardListCard {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ddd;
  padding: 0.7rem 0;
  position: relative;
   /* width: calc(100%); overflow: hidden; min-height:50px; margin-bottom:1rem; position: relative; */
}
.boardListWrap {
  padding-top: 60px;
  padding-bottom: 30px;
  overflow-y: auto;
}
.dragBox {
  padding-top: 10px !important;
  --webkit-tap-highlight-color: rgba(0,0,0,0) !important;
}
.createBoardBtn {
  position: absolute;
  bottom: 2rem;
  right: 10%;
  z-index: 100;
}
</style>
