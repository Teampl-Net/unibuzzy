<template>
<div style="width: 100vw; height: 100vh; position: fixed;z-index: 999; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; " @click="goNo"></div>

  <div class="channelMenuWrap" :class="{editWrap: editYn === true }">
      <div class="menuHeader" :class="{editmenuHeader: editYn === true}" >
          <img v-if="editYn === false" v-on:click="this.$emit('closePop')" class="mtop-05 mleft-1 fl" style="width: 0.8rem; " src="../../assets/images/main/icon_back_white.png"/>
          <img v-else v-on:click="this.$emit('closePop')" class="mtop-05 mleft-1 fl" style="width: 0.8rem; " src="../../assets/images/common/icon_back.png"/>

          <p :class="{editColor: editYn === true }" >{{menuHeaderTitle}}</p>
      </div>
      <div style="margin-top: 50px;">
        <div class="menuRow" v-for="(value, index) in myChanMenuList" :key="index" :class="{editColor: editYn === true, editRow: editYn === true }" @click="chanMenuClick(value.chanMenuTitle)">
          <!-- <img class="mr-04" :src="value.iconUrl" alt=""> -->
          <div style="display: flex; flex-direction: row; align-items: center;" v-on:click="goPage(value.link)" >
          <input type="checkbox" style="width: 20px; height: 20px; border:3px solid #707070; margin-right:1rem" v-if="editYn" />
          <img scr='' />
          {{value.chanMenuTitle}}</div>

        </div>
      </div>

      <div style="display: flex; margin-top: 30px; flex-direction: column; align-items: center;" v-if="editYn">

        <div style="">
          <gBtnSmall class="" v-on:click="" btnTitle="삭제" style="margin-left:10px"/>
          <gBtnSmall class="" v-on:click="addChanClick" btnTitle="추가" style="margin-right:10px"/>
        </div>

        <div style="position:absolute; bottom:2rem">

          <gBtnSmall class="btnBig" v-on:click="editChanMenu" btnTitle="닫기" style="margin-left:10px"/>
          <gBtnSmall class="btnBig" v-on:click="editYn = false" btnTitle="적용" style="margin-right:10px"/>
        </div>
      </div>
        <gBtnSmall v-if="!editYn" class="btnBig" v-on:click="editChanMenu" btnTitle="편집" style="position: absolute; right: 2rem;bottom:2rem; "/>

  </div>
<addChanMenu v-if="openAddChanMenuYn" @closePop='openAddChanMenuYn = false' @addFinish='addChanMenuFinish' />
</template>

<script>
import addChanMenu from '../popup/Tal_addChannelMenu.vue'
export default {
  props:{
    addChanList:{}
  },
  mounted () {
  },
  data () {
    return {
      openAddChanMenuYn:false,

      myChanMenuList:[
                { chanMenuTitle: '포토게시판', idNum: 5 },
                { chanMenuTitle: '새소식', idNum: 6 },
                { chanMenuTitle: '문의사항', idNum: 7 },
      ],

      editYn:false,
      menuHeaderTitle:'게시판',
      addChanMenuList:{}

    }
  },
  components: {addChanMenu
  },
  emits: ['openPop', 'goPage'],
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
    editChanMenu (){
      if(this.editYn){
        this.menuHeaderTitle = '게시판'
        this.editYn = false
      }else{
        this.menuHeaderTitle = '게시판 편집'
        this.editYn = true
      }
    },
    addChanClick(){

      this.openAddChanMenuYn = true
    },
    addChanMenuFinish(obj){
      this.myChanMenuList.push(obj)

      this.openAddChanMenuYn = false

      //   this.addChanMenuList = data
    },
    chanMenuClick(chanMenuTitle){
      // alert(chanMenuTitle)


      this.$emit('openItem',chanMenuTitle)


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
</style>
