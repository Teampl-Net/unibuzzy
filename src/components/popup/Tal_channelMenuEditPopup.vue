<template>
<div style="width: 100vw; height: 100vh; position: fixed;z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>

  <div class="channelMenuEditWrap" >
      <div class="menuHeader">
        <img v-on:click="this.$emit('closePop')" class="mtop-05 mleft-1 fl" style="width: 0.8rem; " src="../../assets/images/main/icon_back_white.png"/>
        <p>{{menuHeaderTitle}}<l class="fr" style="font-size:3rem; margin-right:1rem" @click="addBoardClick"> + </l></p>
      </div>
    <div style="margin-top:6rem; overflow: auto; height:calc(100vh - 55%);">
      <div v-for="(data, index) in editList" :key='index' class="receiverTeamListCard fl" @click="clickList(data)" style="width:100%; height:60px; margin-bottom:1rem;"  >
    <!-- <div v-for="(data, index) in listData" :key='index' class="receiverTeamListCard fl" @click="clickList(data)" style="width:100%; height:4rem; margin-bottom:10px; "  > -->
        <div class="fl">
            <div class="fl movePointerArea" style="width:30px; background-color:#ddd" ><p class="tB trans90 cBlack " >{{upTxt}}</p><p class="tB trans90 cBlack">{{downTxt}}</p> </div>
            <p v-if='editNameYn !== index' @click="editClick(data,index)" class="fl font15 cBlack boardNameText">{{data.boardName}}</p>
            <input v-show='editNameYn === index' :id="index" style="border:none; border-bottom: 0.5px solid #ccc;" class="boardNameText"/>
        </div>
        <div class="fr mtop-05" style="position: relative; ">
            <div @click="editClick(data,index)" class="fl" style="background-color:#ddd;  width:55px; height: 60px; line-height:60px; position:absolute; top:-1.2rem; right: 55px;">
                <img v-if="clickIndex !== index" src="../../assets/images/common/editbtn.svg" >
                <div v-if="clickIndex === index" style="diplay:block">
                  <img src="../../assets/images/common/icon_setting.png" >
                  <!-- <a style='font-size:10px'>게시판 설정</a> -->
                </div>

            </div>
            <div v-if="clickIndex !== index" @click="deleteTeamClick(data)" class="fl " style="background-color:#a9aacd;  width:55px; height: 60px; line-height:60px; position:absolute; top:-1.2rem; right: 0; ">
                <p class="cBlack tB">삭제</p>
            </div>
            <div v-if="clickIndex === index" class="fl " style="background-color:white;  width:55px; height: 60px; line-height:60px; position:absolute; top:-1.2rem; right: 0; ">
              <img src="../../assets/images/common/people.svg" alt="">

            </div>
        </div>

      </div>
    </div>

    <!-- <div style="position:absolute; bottom:2rem; left:50%; transform:translateX(-50%)"> -->
    <div style="position:absolute; bottom:1.5rem; right:2rem; ">
      <gBtnSmall class="btnBig" v-on:click="this.$emit('closePop')" btnTitle="닫기" style="margin-left:10px"/>
      <gBtnSmall class="btnBig" v-on:click="editYn = false" btnTitle="적용" style="margin-right:10px"/>
    </div>

  </div>
  <addNewBoard v-if="addNewBoardYn" @closePop='addNewBoardYn =false' />

</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import addChanMenu from './Tal_addChannelMenu.vue'
import addNewBoard from './Tal_addNewBoardPopup.vue'
export default {
  props:{
    editList: {},
    addChanList: {}
  },
  mounted () {
  },
  data () {
    return {
      menuHeaderTitle:'게시판 편집',

      upTxt: '>',
      downTxt: '<',
      editNameYn: null,
      editTeamName:'',
      editBtnYn: false,
      clickIndex: null,

      addNewBoardYn: false,
    }
  },
  components: {addChanMenu,addNewBoard
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
    addChanClick(){
      this.openAddChanMenuYn = true
    },
    addChanMenuFinish(obj){
      this.myChanMenuList.push(obj)

      this.openAddChanMenuYn = false
      //   this.addChanMenuList = data
    },
    chanMenuClick (chanMenuTitle) {
      // alert(chanMenuTitle)
      this.$emit('openItem',chanMenuTitle)
    },
    receiverClick () {
      this.$emit('receiverManagerClick');
      // alert('s')
    },

    addBoardClick () {
      // alert('s')
      this.addNewBoardYn = true
    },

    editClick(data, index){
      var editTeamName = document.getElementById(index)
      this.clickIndex = index
      // alert(this.editNameYn)
      // alert(data.boardName + '\n' + editTeamName.innerText)

      // data.boardName = '바보'

      if(this.editNameYn === index){
          this.editNameYn = null
          data.boardName = editTeamName.value
          this.clickIndex = null
      }else{
        this.editBtnYn = true
          this.editNameYn = index
          editTeamName.value = data.boardName
      }
    }

  }

}
</script>

<style scoped>
.menuHeader {padding:0.5rem 0;position: absolute; top: 0rem; left: 0; width: 100%; height: 50px; border-bottom: 1px solid #fff; background-color:#6768a7 ;}
.menuHeader p{color: #FFFFFF; font-size: 20px; text-align: center;}
.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%); color: #FFFFFF; }

.channelMenuEditWrap{
  /* width:100% ;
  position: fixed; z-index: 999;
  height: 100vh;
  top: 0;
  right: 0; */

  width:90% ;
  position: fixed; z-index: 999;
  height: calc(100vh - 20%);
  top: 10%;
  right: 5%;

  box-shadow: 0 0 9px 2px #b8b8b8;

  padding: 0 1rem;
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
.boardNameText{
  /* font-size: ; */
  font-weight: bold;
  line-height: 2.5rem;
  margin-left: 2rem;
}
.boardPlusBtn{
  color:white;
  font-size:20px;
  font-weight:bold;
}
</style>
