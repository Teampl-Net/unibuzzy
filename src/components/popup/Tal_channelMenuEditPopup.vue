<template>
<div style="width: 100vw; height: 100vh; position: fixed; z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>
  <div class="channelMenuEditWrap pagePaddingWrap" style="padding-top:0; ">
    <popHeader @closeXPop="goNo" style="" class="menuHeader" :headerTitle="menuHeaderTitle" />
    <div class="" style="overflow: auto; height:calc(100% - 50px); margin-top: 50px; padding-top: 10px; ">
      <div style="width: 100%; min-height: 30px; margin-bottom: 10px;">
        <p class="font16 fl textLeft" style="line-height: 40px;">게시판 목록</p>
        <gBtnSmall @click="addBoardRow" class="fr" btnTitle="추가" />
      </div>
      <draggable  ref="editableArea" class="ghostClass" :v-model="boardList" ghost-class="ghost" style="padding-top: 10px; 0" :dragging="dragging">
        <transition-group>
          <div @click="openModiBoardPop"  v-for="(data, index) in boardList" :id="'board' + data.key" :key='index' class="receiverTeamListCard fl" style=" width: calc(100% - 3px); overflow: hidden; height:50px; margin-bottom:1rem; position: relative;"  >
        <!-- <div v-for="(data, index) in listData" :key='index' class="receiverTeamListCard fl" @click="clickList(data)" style="width:100%; height:4rem; margin-bottom:10px; "  > -->
            <div class="fl movePointerArea" style="width: 30px; background: rgb(242 242 242); display: flex; align-items: center; justify-content: center; height: 100%; position: absolute; left: 0; top: 0;" >
              <img src="../../assets/images/formEditor/scroll.svg" style="width: 100%;" alt="">
            </div>
            <div class="textLeft" style="width: calc(100% - 30px); margin-left: 30px; padding: 3px 0; float: left; height: 100%;">
                <div v-html="data.boardName" :id="'boardName' + data.key" style="" class="boardNameText"/>
            </div>
            <div  @click="delFormCard()" style="position: absolute; top: 0; right: 0; width: 55px; height: 100%; background: rgb(242 242 242); display: flex; justify-content: center; align-items: center; ">
              <img src="../../assets/images/formEditor/trashIcon_gray.svg" style=" width: 22px; cursor: pointer; z-index: 999" alt="">
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>

    <!-- <div style="position:absolute; bottom:2rem; left:50%; transform:translateX(-50%)"> -->
    <div style="position:absolute; bottom:1.5rem; right:2rem; ">
      <gBtnSmall class="btnBig" v-on:click="this.$emit('closePop')" btnTitle="닫기" style="margin-left:10px"/>
      <gBtnSmall class="btnBig" v-on:click="editYn = false" btnTitle="적용" style="margin-right:10px"/>
    </div>

  </div>
  <modiBoardPop :modiBoardDetailProps="modiBoardDetailProps" v-if="modiBoardPopShowYn" @closePop='modiBoardPopShowYn =false' />

</template>

<script>
/* eslint-disable */
import { VueDraggableNext } from 'vue-draggable-next'
// eslint-disable-next-line
import addChanMenu from './Tal_addChannelMenu.vue'
import modiBoardPop from './Tal_modiBoardPopup.vue'
export default {
  props:{
    editList: {},
    addChanList: {}
  },
  created () {
    if (this.editList) {
      // alert(JSON.stringify(this.editList))
      this.boardList = this.editList
      for (var i = 0; i < this.boardList.length; i ++) {
        this.boardList[i].key = i
        this.lastBoardKey = i
      }
    }
  },
  data () {
    return {
      boardList: [],
      menuHeaderTitle:'게시판 편집',
      modiBoardDetailProps: null,
      editTeamName:'',
      editBtnYn: false,
      clickIndex: null,
      lastBoardKey: null,
      dragging: false,
      modiBoardPopShowYn: false,
    }
  },
  components: {
    addChanMenu, 
    modiBoardPop,
    draggable: VueDraggableNext
  },
  // emits: ['openPop', 'goPage'],
  methods: {
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
      this.$emit('closePop')
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
      // alert(chanMenuTitle)
      this.$emit('openItem',chanMenuTitle)
    }, */
   /*  receiverClick () {
      this.$emit('receiverManagerClick');
      // alert('s')
    }, */

    openModiBoardPop (data) {
      // alert('s')
      this.modiBoardDetailProps = data
      this.modiBoardPopShowYn = true
    },
    addBoardRow () {
      var addBoard = {'boardName':'게시판' + (Number(this.lastBoardKey) + 1),'idNum':2, 'key': this.lastBoardKey + 1}
      this.boardList.unshift(addBoard)
      // this.boardList.push()
    }
  }

}
</script>

<style scoped>
.menuHeader {position: absolute; top: 0rem; left: 0;}
.menuHeader p{color: #FFFFFF; font-size: 20px; text-align: center;}
.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%); color: #FFFFFF; }

.channelMenuEditWrap{
  /* width:100% ;
  position: fixed; z-index: 999;
  height: 100vh;
  top: 0;
  right: 0; */

  width:90% ;
  position: fixed; 
  z-index: 999;
  height: calc(100vh - 20%);
  top: 10%;
  right: 5%;

  box-shadow: 0 0 9px 2px #b8b8b8;

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
