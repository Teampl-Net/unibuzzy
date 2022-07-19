<template>
<div style="width: 100vw; height: 100vh; position: fixed; z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>
  <div class="channelMenuEditWrap pagePaddingWrap" style="padding-top:0; ">
    <popHeader @closeXPop="goNo" style="" class="menuHeader" headerTitle="게시판 관리" :chanName='teamNameText' />
    <div class="" style="overflow: auto; height:calc(100% - 50px); margin-top: 50px; padding-top: 10px; ">
      <draggable  ref="editableArea"   @end="changePosTeamMenu" class="ghostClass" v-model="boardList" ghost-class="ghost" style="padding-top: 10px; --webkit-tap-highlight-color: rgba(0,0,0,0);" :disabled='enabled' delay="200"  >
        <transition-group>
          <div  v-for="(data, index) in boardList" :id="'board' + data.cabinetKey" :key='index' :index="index" :class="{addNewEffect: index === 0}" class="receiverTeamListCard fl" style=" width: calc(100% - 3px); overflow: hidden; min-height:50px; margin-bottom:1rem; position: relative;"  >
        <!-- <div v-for="(data, index) in listData" :key='index' class="receiverunistCard fl" @click="clickList(data)" style="width:100%; height:4rem; margin-bottom:10px; "  > -->
            <div class="fl movePointerArea" style="width: 30px; background: rgb(242 242 242); display: flex; align-items: center; justify-content: center; height: 100%; position: absolute; left: 0; top: 0;" >
              <img src="../../assets/images/formEditor/scroll.svg" style="width: 100%;" alt="" >
            </div>
            <div @click="openModiBoardPop(data)" class="textLeft" style="width: calc(100% - 85px); margin-left: 30px; padding: 3px 0; float: left; height: 100%; display: flex; flex-direction: row; align-items: center;">
                <div style="width: 25px; height: 25px; margin-right: 10px; border-radius: 100%; float: left; flex-shrink: 0; flex-grow: 0;"  :style="{ background: data.picBgPath || '#ffffff' }"></div>
                <div v-html="data.cabinetNameMtext" :id="'boardName' + data.cabinetKey" style="" class="boardNameText" />
            </div>
            <div  @click="checkDelete(data, index)" style="position: absolute; top: 0; right: 0; width: 55px; height: 100%; background: rgb(242 242 242); display: flex; justify-content: center; align-items: center; ">
              <img src="../../assets/images/formEditor/trashIcon_gray.svg" style=" width: 22px; cursor: pointer;" alt="">
            </div>
          </div>
        </transition-group>
      </draggable>
      <div class="btnPlus" @click="addBoardRow"><p style="font-size:40px;">+</p></div>
    </div>
</div>
  <gConfirmPop :confirmText='errorBoxText' confirmType='two' @no='errorBoxYn = false' @ok='confirmfunc' v-if="errorBoxYn"/>
  <modiBoardPop :chanInfo="this.chanInfo" :modiBoardDetailProps="modiBoardDetailProps" v-if="modiBoardPopShowYn" @closePop='closeNrefresh' :chanName='teamNameText' @openPop='openPop'/>

</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
// eslint-disable-next-line
import modiBoardPop from './Tal_modiBoardPopup.vue'
export default {
  props: {
    // editList: {},
    addChanList: {},
    currentTeamKey: {},
    editYn: {},
    chanInfo: {},
    teamNameText: {}

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
        this.goNo()
      }
    },
    historyStack (value, old) {
    }
  },
  created () {
    var history = this.$store.getters.hStack
    this.popId = 'manageBoardPop' + this.currentTeamKey
    history.push(this.popId)
    this.$store.commit('updateStack', history)

    this.getTeamMenuList()
  },
  data () {
    return {
      popId: null,
      boardList: [],
      modiBoardDetailProps: null,
      dragging: false,
      modiBoardPopShowYn: false,
      enabled: false,
      errorBoxText: '',
      errorBoxYn: false,
      tempDeleteData: {},
      currentConfirmType: ''
    }
  },
  components: {
    modiBoardPop,
    draggable: VueDraggableNext
    // longPress: VueDirectiveLongPress
  },
  methods: {
    checkDelete (data, index) {
      var temp = {}
      temp.data = data
      temp.index = index
      this.tempDeleteData = temp
      this.currentConfirmType = 'delete'

      this.errorBoxText = '게시판을 삭제하시겠습니까?'
      this.errorBoxYn = true
    },
    async confirmfunc () {
      if (this.currentConfirmType) {
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
      paramMap.set('teamKey', this.currentTeamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      paramMap.set('adminYn', true)
      var result = await this.$getTeamMenuList(paramMap)

      for (var i = 0; i < result.length; i++) {
        var changeText = result[i].cabinetNameMtext
        result[i].cabinetNameMtext = this.$changeText(changeText)
      }
      this.boardList = result
    },
    goPage (link) {
      this.$emit('goPage', link)
    },
    openPop (param) {
      console.log('param')
      console.log(param)
      this.$emit('openPop', param)
    },
    goNo () {
      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)
      this.$emit('closeXPop')
    },
    async deleteCabinet (data, index) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.currentTeamKey = this.currentTeamKey
      param.cabinetKey = data.cabinetKey
      param.menuType = data.menuType
      var result = await this.$deleteCabinet(param)
      if (result === true || result === 'true') {
        this.boardList.splice(index, 1)
      }
    },
    openModiBoardPop (data) {
      console.log(data)
      console.log(this.addChanList)
      console.log(this.chanInfo)
      console.log(this.teamNameText)
      this.modiBoardDetailProps = data
      if (this.chanInfo.value) {
        this.modiBoardDetailProps.teamNameMtext = this.$changeText(this.chanInfo.value.nameMtext)
      } else {
        this.modiBoardDetailProps.teamNameMtext = this.$changeText(this.chanInfo.nameMtext)
      }
      this.modiBoardPopShowYn = true
    },

    async addBoardRow () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.creMenuYn = true
      // eslint-disable-next-line no-new-object
      var cabinet = new Object()
      var defaultAddBoardName = this.$checkSameName(this.boardList, '게시판')
      cabinet.cabinetNameMtext = 'KO$^$' + defaultAddBoardName
      cabinet.currentTeamKey = this.currentTeamKey
      cabinet.creTeamKey = this.currentTeamKey
      cabinet.sysCabinetCode = 'BOAR'
      cabinet.menuType = 'C'
      cabinet.blindYn = false
      cabinet.fileYn = true
      cabinet.replyYn = true // 기본설정 익명x, 파일o, 댓글o
      param.cabinet = cabinet
      console.log(param)
      var result = await this.$saveCabinet(param)
      if (result.result === true && result.cabinetKey !== undefined && result.cabinetKey !== null && result.cabinetKey !== 0) {
        // var addBoard = {'cabinetNameMtext': defaultAddBoardName, 'idNum':2, 'cabinetKey': result.cabinetKey}
        // this.boardList = []
        await this.getTeamMenuList()
      }
      this.anima()
    },
    anima () {
      document.getElementsByClassName('addNewEffect')[0].style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
      setTimeout(() => {
        document.getElementsByClassName('addNewEffect')[0].style.backgroundColor = ''
      //     // document.getElementsByClassName('foo')[0].classList.remove('foo')
      }, 800)
    },
    async changePosTeamMenu () {
      // eslint-disable-next-line no-new-object
      var paramSet = new Object()
      // eslint-disable-next-line no-array-constructor
      var teamMenuList = new Array()
      // eslint-disable-next-line no-new-object
      var menu = new Object()
      var cardList = document.getElementsByClassName('receiverTeamListCard')
      var index = null
      console.log('this.boardList 여기를 보세요!!!')
      console.log(this.boardList)
      // var tempList = []
      // for (let index = 0; index < cardList.length; index++) {
      //   tempList.push(cardList[index].getAttribute('index'))
      // }
      // console.log(tempList)
      // eslint-disable-next-line no-array-constructor
      for (var s = cardList.length - 1; s >= 0; s--) {
        index = Number(cardList[s].getAttribute('index'))
        for (var i = 0; i < this.boardList.length; i++) {
          if (index === i) {
            menu = {}
            menu.menuType = 'C'
            if (this.boardList[i].menuType) { menu.MenuType = this.boardList[i].menuType }
            if (this.boardList[i].teamKey) { menu.teamKey = this.boardList[i].teamKey }
            if (this.boardList[i].parentMenuKey) { menu.parentMenuKey = this.boardList[i].parentMenuKey }
            if (this.boardList[i].cabinetKey) { menu.cabinetKey = this.boardList[i].cabinetKey }
            if (this.boardList[i].cabinetNameMtext) { menu.cabinetNameMtext = this.boardList[i].cabinetNameMtext }
            if (this.boardList[i].sysCabinetCode) { menu.sysCabinetCode = this.boardList[i].sysCabinetCode }
            teamMenuList.push(menu)
            break
          }
        }
      }
      paramSet.teamMenuList = teamMenuList
      var result = await this.$commonAxiosFunction(
        {
          url: '/tp.changePosTeamMenu',
          param: paramSet
        }
      )
      console.log('teamMenuList')
      console.log(teamMenuList)
      console.log(result.data.result)
      if (result.data.result === true) {
        // this.boardList = []
        // await this.getTeamMenuList()
      //   this.boardList = new Array(tempList)[0]
      //   console.log(this.boardList)
      }
      console.log(this.boardList)
    },
    indexChange (list) {
      var tempList = []
      for (let i = 0; i < list.length; i++) {
        var a = i
        tempList.push(list[list.length - (a + 1)])
      }
      console.log(tempList)
      this.boardList = new Array(tempList)
      console.log(this.boardList)
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
  /* width:100% ;
  position: fixed; z-index: 999;
  height: 100vh;
  top: 0;
  right: 0; */

  width:100% ;
  height:100vh !important;
  position: fixed;
  z-index: 999;
  height: calc(100vh - 20%);
  top: 0;
  right: 0;

  /* // box-shadow: 0 0 9px 2px #b8b8b8; */

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
</style>
