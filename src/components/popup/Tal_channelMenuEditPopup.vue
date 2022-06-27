<template>
<div style="width: 100vw; height: 100vh; position: fixed; z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>
  <div class="channelMenuEditWrap pagePaddingWrap" style="padding-top:0; ">
    <popHeader @closeXPop="goNo" style="" class="menuHeader" headerTitle="게시판 편집" />
    <div class="" style="overflow: auto; height:calc(100% - 50px); margin-top: 50px; padding-top: 10px; ">
      <div style="width: 100%; min-height: 30px; margin-bottom: 10px;">
        <p class="font16 fl textLeft" style="line-height: 40px;">게시판 목록</p>
        <!-- <gBtnSmall @click="addBoardRow" class="fr" btnTitle="추가" /> -->

      </div>

      <draggable  ref="editableArea" :move="changePosTeamMenu" @end="changePosTeamMenu" @change="changePosTeamMenu" class="ghostClass" :v-model="boardList" ghost-class="ghost" style="padding-top: 10px; --webkit-tap-highlight-color: rgba(0,0,0,0);" :disabled='enabled' delay="200"  >
        <transition-group>
          <div  v-for="(data, index) in boardList" :id="'board' + data.cabinetKey" :key='index' :index="index" :class="{addNewEffect: index === 0}" class="receiverTeamListCard fl" style=" width: calc(100% - 3px); overflow: hidden; height:50px; margin-bottom:1rem; position: relative;"  >
        <!-- <div v-for="(data, index) in listData" :key='index' class="receiverunistCard fl" @click="clickList(data)" style="width:100%; height:4rem; margin-bottom:10px; "  > -->
            <div class="fl movePointerArea" style="width: 30px; background: rgb(242 242 242); display: flex; align-items: center; justify-content: center; height: 100%; position: absolute; left: 0; top: 0;" >
              <img src="../../assets/images/formEditor/scroll.svg" style="width: 100%;" alt="" >
            </div>
            <div @click="openModiBoardPop(data)" class="textLeft" style="width: calc(100% - 30px); margin-left: 30px; padding: 3px 0; float: left; height: 100%;">
                <div v-html="data.cabinetNameMtext" :id="'boardName' + data.cabinetKey" style="" class="boardNameText" />
            </div>
            <div  @click="deleteCabinet(data, index)" style="position: absolute; top: 0; right: 0; width: 55px; height: 100%; background: rgb(242 242 242); display: flex; justify-content: center; align-items: center; ">
              <img src="../../assets/images/formEditor/trashIcon_gray.svg" style=" width: 22px; cursor: pointer; z-index: 999" alt="">
            </div>
          </div>
        </transition-group>
      </draggable>
      <div class="btnPlus" btnTitle="추가" @click="addBoardRow"><p style="font-size:40px;">+</p></div>
    </div>

    <!-- <div style="position:absolute; bottom:2rem; left:50%; transform:translateX(-50%)"> -->
    <!-- <div style="position:absolute; bottom:1.5rem; right:2rem; ">
      <gBtnSmall class="btnBig" v-on:click="this.$emit('closePop')" btnTitle="닫기" style="margin-left:10px"/>
      <gBtnSmall class="btnBig" v-on:click="editYn = false" btnTitle="적용" style="margin-right:10px"/>
    </div> -->

</div>
  <modiBoardPop :chanInfo="this.chanInfo" :modiBoardDetailProps="modiBoardDetailProps" v-if="modiBoardPopShowYn" @closePop='closeNrefresh' />

</template>

<script>
/* eslint-disable */
// import { VueDirectiveLongPress } from 'vue-directive-long-press'
import { VueDraggableNext } from 'vue-draggable-next'
// eslint-disable-next-line
import addChanMenu from './Tal_addChannelMenu.vue'
import modiBoardPop from './Tal_modiBoardPopup.vue'
export default {
  props:{
    // editList: {},
    addChanList: {},
    currentTeamKey: {},
    editYn: {},
    chanInfo: {},
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
  created() {
    var history = this.$store.getters.hStack
    this.popId = 'manageBoardPop' + this.currentTeamKey
    history.push(this.popId)
    this.$store.commit('updateStack', history)

    this.getTeamMenuList()
    /* if (this.editList) {
      this.boardList = this.editList
      for (var i = 0; i < this.boardList.length; i ++) {
        this.boardList[i].num = i
        this.lastBoardKey = i
      }
    } */
  },
  data () {
    return {
      popId: null,
      boardList: [],
      modiBoardDetailProps: null,
      editTeamName:'',
      editBtnYn: false,
      clickIndex: null,
      lastBoardKey: null,
      dragging: false,
      modiBoardPopShowYn: false,
      enabled:false
    }
  },
  components: {
    addChanMenu,
    modiBoardPop,
    draggable: VueDraggableNext,
    // longPress: VueDirectiveLongPress
  },
  // emits: ['openPop', 'goPage'],
  methods: {
    closeNrefresh(){
      this.modiBoardPopShowYn =false
      this.getTeamMenuList()
    },
    async getTeamMenuList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.currentTeamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      paramMap.set('adminYn', true)
      var result = await this.$getTeamMenuList(paramMap)
      this.boardList = result

      // console.log(this.boardList)
      for (var i = 0; i < this.boardList.length; i ++) {
        var changeText = this.boardList[i].cabinetNameMtext
        this.boardList[i].cabinetNameMtext = this.$changeText(changeText)
      }

    },
    goPage (link) {
      this.$emit('goPage', link)
    },
    openPop (link) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = link
      this.$emit('openPop', params)
    },
    goNo (){
      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      // alert(removePage)
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)
      this.$emit('closeXPop')
    },
    async deleteCabinet(data,index){
        var param = new Object()
        param.currentTeamKey = this.currentTeamKey
        param.cabinetKey = data.cabinetKey
        param.menuType = data.menuType
        var result = await this.$deleteCabinet(param)
        if(result === true || result ==='true') {
          this.boardList.splice(index, 1)
        }

    },
    /* addChanClick(){
      this.openAddChanMenuYn = true
    }, */
    /* addChanMenuFinish(obj){
      this.myChanMenuList.push(obj)

      this.openAddChanMenuYn = false
      //   this.addChanMenuList = data
    }, */
    /* chanMenuClick (chanMenuTitle) {
      this.$emit('openItem',chanMenuTitle)
    }, */
   /*  receiverClick () {
      this.$emit('receiverManagerClick');
    }, */

    openModiBoardPop (data) {
      this.modiBoardDetailProps = data
      this.modiBoardDetailProps.teamNameMtext = this.$changeText(this.chanInfo.value.nameMtext)
      this.modiBoardPopShowYn = true
    },

    async addBoardRow () {
      var param = new Object()
      param.creMenuYn = true
      var cabinet = new Object()
      var defaultAddBoardName = this.$checkSameName(this.boardList, '게시판')
      cabinet.cabinetNameMtext = 'KO$^$' + defaultAddBoardName
      cabinet.currentTeamKey = this.currentTeamKey
      cabinet.sysCabinetCode = 'BOAR'
      cabinet.menuType = 'C'
      cabinet.blindYn = false
      cabinet.fileYn = true
      cabinet.replyYn = true // 기본설정 익명x, 파일o, 댓글o
      param.cabinet = cabinet
      var result = await this.$saveCabinet(param)
      if (result.result === true && result.cabinetKey !== undefined && result.cabinetKey !== null && result.cabinetKey !== 0) {
        var addBoard = {'cabinetNameMtext': defaultAddBoardName, 'idNum':2, 'cabinetKey': result.cabinetKey}
        this.boardList = []
        await this.getTeamMenuList()
      }
      // this.boardList.unshift(addBoard)
      document.getElementsByClassName('addNewEffect')[0].style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
      setTimeout(() => {
        document.getElementsByClassName('addNewEffect')[0].style.backgroundColor = ''
      }, 800);
    },
    async changePosTeamMenu () {
      var paramSet = new Object()
      var teamMenuList = new Array()
      var menu = new Object()
      var cardList = document.getElementsByClassName('receiverTeamListCard')
      var index = null
      // debugger
      console.log(this.boardList)
      for (var s = cardList.length - 1 ; s >=0; s--) {
        index = Number(cardList[s].getAttribute('index'))
        for (var i = 0; i < this.boardList.length; i ++) {
          if(index === i) {
            menu = {}
            if(this.boardList[i].menuType)
              menu.MenuType = this.boardList[i].menuType
            if(this.boardList[i].teamKey)
              menu.teamKey = this.boardList[i].teamKey
            if(this.boardList[i].parentMenuKey)
              menu.parentMenuKey = this.boardList[i].parentMenuKey
            if(this.boardList[i].cabinetKey)
              menu.cabinetKey = this.boardList[i].cabinetKey
            if(this.boardList[i].cabinetNameMtext)
              menu.cabinetNameMtext = this.boardList[i].cabinetNameMtext
            teamMenuList.push(menu)
            break
          }
        }
      }
      paramSet.teamMenuList = teamMenuList
      var result = await this.$commonAxiosFunction(
        {
          url: 'tp.changePosTeamMenu',
          param: paramSet
        }
      )
      this.boardList = []
      this.getTeamMenuList()
      // debugger
    }
      // this.boardList.push()
  }
}

</script>

<style scoped>
.btnPlus{
  width:4rem; height:4rem; display: flex;
  padding-top: 5px;
  justify-content: center; align-items: center;
  color:#6768a7; border:3px solid #6768a7; background-color:white ;
  z-index: 9999;
  border-radius:4rem; position:fixed; bottom: 80px; right: 10%;
  box-shadow: 2px 2px 7px 3px #ccc;

}

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
