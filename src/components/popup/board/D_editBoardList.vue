<template>
<!-- <div style="width: 100%; height: 100vh; position: absolute; z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div> -->
  <div v-if="CHANNEL_DETAIL" class="channelMenuEditWrap pagePaddingWrap" style="overflow: hidden auto;">
      <draggable  ref="editableArea" @end="changePosTeamMenu" class="ghostClass" :options="{ghostClass:'sortable-ghost',animation:150}" v-model="cabinetList" ghost-class="ghost" style="padding-top: 10px; --webkit-tap-highlight-color: rgba(0,0,0,0);" :disabled='enabled' delay="200"  >
        <transition-group>
          <template v-for="(data, index) in cabinetList" :key='index'>
            <boardCard :propData='data' @cardEmit='cardEmit' :compoIdx='index' />
          </template>
        </transition-group>
      </draggable>
      <img src="../../../assets/images/button/Icon_CreBoardBtn.png" @click="addBoardRow" alt="게시판 만들기 버튼" style="position: absolute; bottom: 2rem; right: 10%;" class="img-78 img-w66">
      <gListEmpty v-if="cabinetList.length === 0" title='게시판이 없어요' subTitle='버튼을 눌러 게시판을 생성해보세요.' option='EDIT' />
  </div>
  <gConfirmPop :confirmText='errorBoxText' confirmType='two' @no='errorBoxYn = false' @ok='confirmfunc' v-if="errorBoxYn"/>
  <modiBoardPop :chanInfo="this.chanInfo" :modiBoardDetailProps="modiBoardDetailProps" v-if="modiBoardPopShowYn" @closePop='closeNrefresh' :chanName='teamNameText' @openPop='openPop'/>

</template>

<script>
/* eslint-disable */
import boardCard from './editBoardUnit/D_commonBoardCard .vue'
import { VueDraggableNext } from 'vue-draggable-next'
// eslint-disable-next-line
import modiBoardPop from './D_modiBoardPopup.vue'
export default {
  props: {
    // editList: {},
    teamNameText: {},

    propData: {}

  },
  computed: {
    CAB_DETAIL () {
        if (this.cabinetList.length === 0) {
            return []
        }
        // for (var i = 0; i <this.cabinetList.length; i++) {

            //  console.log(this.cabinetList[i])
            /* this.cabinetList[i].shareAuth = this.$checkUserAuth(this.cabinetList[i].mShareItemList) */
        // }
        return this.cabinetList
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    CHANNEL_DETAIL () {
      return this.$getDetail('TEAM', this.propData.teamKey)[0]
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      if (this.popId === hStack[hStack.length - 1]) {
        this.goNo()
      }
    },
    historyStack (value, old) {
    }
  },
  created () {
    this.$emit('openLoading')
    // console.log(this.propData)
    this.getTeamMenuList()
    this.$emit('closeLoading')
  },
  data () {
    return {
      popId: null,
      modiBoardDetailProps: null,
      dragging: false,
      modiBoardPopShowYn: false,
      enabled: false,
      errorBoxText: '',
      errorBoxYn: false,
      tempDeleteData: {},
      currentConfirmType: '',
      currentTeamKey: null,
      chanInfo: null,
      cabinetList: [],
      axiosQueue: []
    }
  },
  components: {
    boardCard,
    modiBoardPop,
    draggable: VueDraggableNext
    // longPress: VueDirectiveLongPress
  },
  methods: {
    cardEmit (param) {
      console.log(param)
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
      // console.log(data)
      param.currentTeamKey = data.creTeamKey
      param.jobKindId = 'BOAR'
      param.cabinetKey = data.cabinetKey
      param.offsetInt = 0
      param.pageSize = 1
      var totalElements
      await this.$getContentsList(param, true).then(resulte => {
        // console.log(resulte)
        totalElements = resulte.totalElements
        // console.log(totalElements)
      })
      var temp = {}
      temp.data = data
      temp.index = index
      // console.log(data)
      this.tempDeleteData = temp
      this.currentConfirmType = 'delete'
      if (totalElements === undefined){
        this.errorBoxText = '게시판을 삭제하시겠습니까?'
      } else {
        this.errorBoxText = totalElements + '개의 게시글이 있는 게시판입니다. \n 정말 삭제하시겠습니까?'
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
    closeNrefresh () {
      this.modiBoardPopShowYn = false
      this.getTeamMenuList()
    },
    async getTeamMenuList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.CHANNEL_DETAIL.teamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', this.GE_USER.userKey)
      paramMap.set('adminYn', true)
      var result = await this.$getTeamMenuList(paramMap, true)
      // var uniqueArr = []
      // if (result && result.length > 0) {
      //   var newArr = []

      //   newArr = [
      //       ...this.cabinetList,
      //       ...result
      //   ]
      //   uniqueArr = this.replaceArr(newArr)

      // }
      // this.cabinetList = uniqueArr
      this.cabinetList = result
      console.log('===== cabinetList ====')
      console.log(this.cabinetList)
      // this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', this.CHANNEL_DETAIL)
      /* this.$actionVuex('TEAM', this.CHANNEL_DETAIL, this.CHANNEL_DETAIL.teamKey, false, true) */
    },
    goPage (link) {
      this.$emit('goPage', link)
    },
    openPop (param) {
      this.$emit('openPop', param)
    },
    goNo () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$emit('closeXPop')
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
    async deleteCabinet (data, index) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
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
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.creMenuYn = true
      // eslint-disable-next-line no-new-object
      var cabinet = new Object()
      var defaultAddBoardName = this.$checkSameName(this.CAB_DETAIL, '게시판')
      cabinet.cabinetNameMtext = 'KO$^$' + defaultAddBoardName
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
        // var addBoard = {'cabinetNameMtext': defaultAddBoardName, 'idNum':2, 'cabinetKey': result.cabinetKey}
        // this.boardList = []
        await this.getTeamMenuList()
      }
      if (this.CAB_DETAIL.length > 0) {
        this.anima()
      }
    },
    anima () {
      document.getElementsByClassName('addNewEffect')[0].style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
      setTimeout(() => {
        document.getElementsByClassName('addNewEffect')[0].style.backgroundColor = ''
      //     // document.getElementsByClassName('foo')[0].classList.remove('foo')
      }, 800)
    },
    async changePosTeamMenu () {
      // // eslint-disable-next-line no-new-object
      // var paramSet = new Object()
      // // eslint-disable-next-line no-array-constructor
      // var teamMenuList = new Array()
      // // eslint-disable-next-line no-new-object
      // var menu = new Object()
      // var cardList = document.getElementsByClassName('boardListCard')
      // var index = null
      // for (var s = cardList.length - 1; s >= 0; s--) {
      //   index = Number(cardList[s].getAttribute('index'))
      //   for (var i = 0; i < this.CAB_DETAIL.length; i++) {
      //     if (index === i) {
      //       menu = {}
      //       menu.menuType = 'C'
      //       if (this.CAB_DETAIL[i].menuType) { menu.MenuType = this.CAB_DETAIL[i].menuType }
      //       if (this.CAB_DETAIL[i].teamKey) { menu.teamKey = this.CAB_DETAIL[i].teamKey }
      //       if (this.CAB_DETAIL[i].parentMenuKey) { menu.parentMenuKey = this.CAB_DETAIL[i].parentMenuKey }
      //       if (this.CAB_DETAIL[i].cabinetKey) { menu.cabinetKey = this.CAB_DETAIL[i].cabinetKey }
      //       if (this.CAB_DETAIL[i].cabinetNameMtext) { menu.cabinetNameMtext = this.CAB_DETAIL[i].cabinetNameMtext }
      //       if (this.CAB_DETAIL[i].sysCabinetCode) { menu.sysCabinetCode = this.CAB_DETAIL[i].sysCabinetCode }
      //       teamMenuList.push(menu)
      //       break
      //     }
      //   }
      // }

      console.log('----------')
      console.log(this.cabinetList)

      var paramSet = {}

      var tempList = []
      for (let index = 0; index < this.cabinetList.length; index++) {
        var temp = {}
        temp = this.cabinetList[index]
        temp.menuType = 'C'
        tempList.push(temp)
      }

      console.log(' ----- teamMenuList -----')
      console.log([...tempList])
      paramSet.teamMenuList = [...tempList]
      var result = await this.$commonAxiosFunction(
        {
          url: 'service/tp.changePosTeamMenu',
          param: paramSet
        }
      )
      console.log(' ----- changePosTeamMenu result -----')
      console.log(result)
      // this.cabinetList = []
      // await this.getTeamMenuList()

      // if (result.data.result === true) {
        // this.cabinetList = teamMenuList
        // this.boardList = []
        // await this.getTeamMenuList()
      //   this.boardList = new Array(tempList)[0]
      //   // console.log(this.boardList)
      // }
    },
    indexChange (list) {
      var tempList = []
      for (let i = 0; i < list.length; i++) {
        var a = i
        tempList.push(list[list.length - (a + 1)])
      }

      this.CAB_DETAIL = new Array(tempList)
    }
    // this.boardList.push()
  }
}

</script>

<style scoped>
.addNewEffect {transition : background-color 0.5s ease-in;}
/* btnPlus common.css로 옮김 */

.menuHeader {position: absolute; top: 0rem; left: 0;}
.menuHeader p{color: #FFFFFF; font-size: 20px; text-align: center;}
.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%); color: #FFFFFF; }

.channelMenuEditWrap{
  width:100% ;
  height: 100%;
  top: 0;
  right: 0;
  background-color: white;
  }

.btnBig{
  font-size: 16px;
  width: 5rem;
  height: 2rem;
}

.editWrap{
  background-color: #F9F9F9;

}
.editmenuHeader{
border-bottom: 1.5px solid #999;
}
.editColor{
  color: #6768a7 !important;
}

.editRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid #ccc; }
/* .boardNameText{
} */
.boardPlusBtn{
  color:white;
  font-size:20px;
  font-weight:bold;
}
.boardListCard{
  width: 100%;
  height:60px;
  border-bottom:1px solid #ddd; padding: 0.7rem 0;
  position: relative;

   /* width: calc(100%); overflow: hidden; min-height:50px; margin-bottom:1rem; position: relative; */

}

</style>
