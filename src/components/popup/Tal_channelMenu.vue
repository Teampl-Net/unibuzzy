<template>
<div style="width: 100vw; height: 100vh; position: fixed;z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>

<div class="channelMenuWrap" :class="{editWrap: editYn === true }">
  <div class="menuHeader" :class="{editmenuHeader: editYn === true}" >
      <img v-if="editYn === false" v-on:click="this.$emit('closePop')" class="mtop-05 mleft-1 fl" style="width: 0.8rem; " src="../../assets/images/main/icon_back_white.png"/>
      <img v-else v-on:click="this.$emit('closePop')" class="mtop-05 mleft-1 fl" style="width: 0.8rem; " src="../../assets/images/common/icon_back.png"/>
      <p :class="{editColor: editYn === true }" >{{menuHeaderTitle}}</p>
  </div>

  <!-- <div v-show="editYn" style="margin-top:calc(50px + 20px); width:100%;     box-shadow: 2px 2px 3px 0px #eee; " class="fl" > -->
  <div v-show="editYn" style="margin-top:calc(50px + 20px); width:100%;  " class="fl" >

    <div class="fl" style="width:100%">
      <img src="../../assets/images/common/icon_back.png" class="fl dropdownBtn" :class="{dropupBtn:groupDropDownYn ===true }" @click="groupDropDown">
      <p style="color:black; text-align:left; margin-left:2rem;" class="fl fontBold font16" @click="groupDropDown">그룹 </p>
      <gBtnSmall class="fr"   @click="receiverClick" btnTitle="편집" style=""/>
    </div>
    <div  class="boardBox fl" style="overflow: hidden; " ref="groupRef" :class="{boardBoxUp : groupDropDownYn === false, boardBoxDown:groupDropDownYn === true}" >
      <teamList  :listData="dummyList" @openDetail='openTeamDetailPop' />
    </div>
  </div>

  <div v-show="editYn" style="width:100%; height:1px; background:#ccc;" class="fl mtop-1"></div>

  <div style="width:100%; margin-top:calc(20px);" :class="{editmTop:editYn !== true}" class="fl">
    <div class="fl" style="width:100%">
      <img src="../../assets/images/common/icon_back.png" class="fl dropdownBtn" :class="{dropupBtn:boardDropDownYn ===true }" @click="boardDropDown">
      <p style="color:black; text-align:left; margin-left:2rem;" class="fl fontBold font16" :class="{editWhiteColor:editYn !== true}" @click="boardDropDown" >게시판</p>
      <gBtnSmall class="fr" v-on:click="editChanMenu" btnTitle="편집" style="" v-show="editYn" />
    </div>
    <div class="boardBox" style="overflow: hidden; padding-top:1rem;"  ref="boardRef" :class="{boardBoxUp : boardDropDownYn === false, boardBoxDown:boardDropDownYn === true}">
      <chanListNew  :listData="myBoardList" @chanMenuClick="chanMenuClick" />
    </div>
  </div>
</div>
<!-- <addChanMenu v-if="openAddChanMenuYn" @closePop='openAddChanMenuYn = false' @addFinish='addChanMenuFinish' /> -->
<editChanMenu :currentTeamKey="chanAlimListTeamKey" v-if='editPopYn' @closePop='editPopYn = false' :editList='myBoardList' />
</template>
<script>
/* eslint-disable */
// eslint-disable-next-line
// eslint-disable-next-line no-new-object
import editChanMenu from './Tal_channelMenuEditPopup.vue'
import teamList from './receiver/Tal_receiverTeamList.vue'
import chanListNew from './receiver/Tal_channelMenuListNew.vue'

export default {
  props:{
    addChanList:{},
    propData: {},
    chanAlimListTeamKey: {}
  },
  created () {
    this.getTeamMenuList()
    this.dummyList = this.$groupDummyList()
  },
  mounted () {
    this.groupListlength()
    this.boardListLength()
  },
  data () {
    return {
      myBoardList:[
        { boardName: '포토게시판', idNum: 5 },
        { boardName: '새소식', idNum: 6 },
        { boardName: '문의사항', idNum: 7 },
      ],
      editYn:true,
      menuHeaderTitle:'채널 메뉴',
      addChanMenuList:{},
      editPopYn : false,
      dummyList:[],
      menuHeight: null,
      boardDropDownYn:true,
      groupDropDownYn:null
    }
  },
  components: {editChanMenu,teamList,chanListNew,
  },
  emits: ['openPop', 'goPage'],
  methods: {
    async getTeamMenuList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.currentTeamKey)
      paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      var result = await this.$getTeamMenuList(paramMap)
      // debugger
    },
     groupListlength () {
       this.$refs.groupRef.style.setProperty('--menuHeight', this.dummyList.length * 70 + 20 + 'px')
       this.menuHeight = this.dummyList.length * 70 + 20 + 'px'
    },
    boardListLength () {
      this.$refs.boardRef.style.setProperty('--menuHeight', this.myBoardList.length * 50 + 20 + 'px')
       this.menuHeight = this.dummyList.length * 70 + 20 + 'px'
      return{
        '--groupListlength' : this.myBoardList.length * 50 + 20 + 'px'
      }
    },
    boardDropDown () {
      this.boardListLength()
      if(this.boardDropDownYn){
        this.boardDropDownYn = false
      }else{
        this.boardDropDownYn = true
      }
    },
    groupDropDown () {
      this.groupListlength()
      if(this.groupDropDownYn){
        this.groupDropDownYn = false
      }else{
        this.groupDropDownYn = true
      }
    },
    goPage (link) {
      this.$emit('goPage', link)
    },
    openPop (link) {
      var params = new Object()
      params.targetType = link
      this.$emit('openPop', params)
    },
    goNo (){
      this.$emit('closePop')
    },
    editChanMenu (){
      this.editPopYn = true;
    },
    chanMenuClick(boardName){
      this.$emit('openItem',boardName)
    },
    receiverClick(){
      this.$emit('receiverManagerClick');
    }
  }
}
</script>

<style scoped>
.menuHeader {padding:0.5rem 0;position: absolute; top: 0rem; left: 0; width: 100%; height: 50px; border-bottom: 1px solid #fff;}
.menuHeader p{color: #FFFFFF; font-size: 20px; text-align: center;}

.menuRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid rgb(255 255 255 / 26%); color: #FFFFFF; }

.channelMenuWrap{
  background-color:#6768a7 ;
  /* background-color: white; */
  width:80% ;
  max-width: 500px;
  position: fixed; z-index: 999;
  height: 100vh;
  top: 0;
  right: 0;
  box-shadow: 0 0 9px 2px #b8b8b8;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 0 1rem;
  z-index: 999;
  }

.btnBig{
  font-size: 16px;
  width: 5rem;
  height: 2rem;
}
.editWrap{
  background-color: #F9F9F9 !important;

}
.editmenuHeader{
  border-bottom: 1.5px solid #999;
}
.editColor{
  color: #6768a7 !important;
}
.editWhiteColor{
  color: #fff;
}
.editmTop{
  margin-top: 70px !important;
}
.editRow{padding: 1rem; box-sizing: border-box; text-align: left; height: 3.8rem; border-bottom: 0.5px solid #ccc; }
.boardBox{
  /* background-color:#aaa; */
  width:100%;
  height: 0px;
  display: block;
  position: relative;
}
.boardBoxDown{
  animation: dropdown 300ms ease ;
  animation-fill-mode: both;
}

.boardBoxUp{
  animation: dropup 300ms ease;
  animation-fill-mode: both;
}
@-webkit-keyframes dropdown { 0% {height: 0px;} 100% {height: var(--menuHeight) } }
@-webkit-keyframes dropup { 0% {height: var(--menuHeight);} 100% {height: 0px;} }
.dropdownBtn{
  width:10px;
  transform: rotate( 270deg );
  margin-right:10px;
  /* transition : .3s */
}
.dropupBtn{
  transform: rotate( 90deg );

}
</style>
