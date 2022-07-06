<template>
    <div class="memoCard" v-for="(memo, index) in memoList" :key="index" :id="memo.memoKey" >

      <div class="fl" v-if="memo.parentMemoKey" @click="scrollMove(memo.parentMemoKey)" style="width:calc(100% - 20px); margin-left: 20px; border-radius: 5px; background-color: #eee;" >
          <div class="fl w-100P" >
            <!-- <a :href='"#memo"+memo.parentMemoKey'> -->
            <p class="fl commonBlack mleft-1 mtop-05" >{{memo.meMemoUserDispMtext}}</p>
            <p class="fl commonColor mleft-05 mtop-05" >{{memo.meMemoBodyMinStr}}</p>
            <!-- </a> -->
          </div>
          <img src="../../../assets/images/common/icon-turn-right.svg" style="width:20px" class="fl mleft-1 mbottom-05 mtop-02" alt="">
      </div>
      <div class="commentTop" style="min-height: 35px; float: left; width: 100%; margin-bottom: 5px;" @click="memoInfo(memo)">

        <!-- <div style="min-height: 30px; width: 30px; float: left; border-radius: 100%; background-color: #aaa; margin-right: 10px;" ></div> -->
        <img src="../../../assets/images/main/main_profile.png" style="min-height: 30px; width: 30px; float: left;  margin-right: 10px;" />
        <p class="grayBlack fl font14" style="min-height: 30px; line-height: 30px; ">{{ this.$changeText(memo.userNameMtext || memo.userDispMtext) }}</p>
        <!-- <div style="float: right; font-size: 16px; font-weight: bold;">X</div> -->
        <p style="float: right; font-size: 14px; margin-right: 10px; color: darkgray; line-height: 30px;">{{this.$changeDateFormat(memo.creDate)}}</p>
      </div>
      <div class="commentMiddle" style="display: flex; min-height: 30px; float: left; width: 100%; ">
        <!-- <img src="" style="height: 30px; width: 30px; " /> -->
        <input type="text" style="margin-left: 5px; width: 70%;float: left; font-size: 15px; height: 100%; border: 1px solid #ccc;" v-if="editIndex === index" v-model="inputText"  >
        <p v-else style="margin-left: 5px; width: calc(100% - 40px);float: left; font-size: 15px; height: 100%;" class="commonBlack" >{{memo.bodyFullStr}} </p>

      </div>
      <div class="commentBottom" style="height: 20px; line-height: 20px; font-size: 14px; width: 100%; float: left; color: #666;" >
        <!-- <div class="commentBottom" style="height: 25px; line-height: 25px; font-size: 14px; width: 100%; float: left;" > -->
        <div v-if="editIndex === index">
            <div style="float: right; width: 40px; height: 100%; text-align: center;" @click="editEnd(memo, index)" >완료</div>
            <div style="float: right; width: 40px; height: 100%; text-align: center; border-right: 1px solid #aaa;" @click="cancelEdit(memo, index)" >취소</div>
        </div>
        <div v-if="editIndex !== index && memo.creUserKey == this.userKey">
          <div style="float: right; width: 40px; height: 100%; text-align: center; font-size: 13px;" @click="memoDeleteClick(memo, index)" >삭제</div>
          <div style="float: right; width: 40px; height: 100%; text-align: center; border-left: 1px solid #aaa;  border-right: 1px solid #aaa; font-size: 13px;" @click="editMemoClick(memo, index)"  >수정</div>
        </div>
        <div style="float: right; width: 40px; height: 100%; text-align: center; font-size: 13px;" @click="memoMemoClick(memo)" v-if="editIndex !== index">답글</div>
      </div>
      <!-- <div v-if="memo.creUserKey === userKey" class="fr" style="width:20px"> -->
        <!-- <img src="../../../assets/images/push/noticebox_keep.png" style="width:20px" class="fr" /> -->
      <!-- </div> -->
    </div>
</template>

<script>
// import a from '../../../assets/images/common/'
/* eslint-disable */

import { looseIndexOf } from '@vue/shared'

// eslint-disable-next-line
export default {
  props: {
    memoList: {}
  },
  mounted () {
    this.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
  },
  data () {
    return {
      userKey:'',
      editIndex:'',

    }
  },
  methods: {
    memoInfo(memo){
      console.log(memo)
      // this.pushMememoText()
    },
    memoDeleteClick(data, index){
      var param = {}
      param = data
      param.clickIndex = index
      this.$emit('deleteMemo', param)
    },
    editMemoClick(data, index){
      this.editIndex = index
      this.inputText = data.bodyFullStr
    },
    cancelEdit(){
      this.editIndex = ''
    },
    async editEnd(data){
      var memo = new Object()
      memo.bodyFullStr = this.inputText
      memo.bodyMinStr = this.inputText
      /* memo.bodyFilekey  */
      memo.memoKey = data.memoKey
      // memo.toUserKey = this.alimDetail[0].creUserKey 대댓글때 사용하는것임
      // memo.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      // memo.creUserName = JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext
      var result = await this.$commonAxiosFunction({
        url: '/tp.saveMemo',
        param: {memo: memo}
      })
      console.log(result)
      if(result.data.result === true || result.data.result === 'true') {
        this.editIndex = ''
        this.$emit('editTrue')
      }
    },
    // hoverAnima(key){
    //   var target = document.getElementById(key)
    //   target.style.position = 'absolute'
    //   target.style.top = '50%'
    //   target.style.zIndex = 99999999999
    //   target.style.backgroundColor = 'white'
    // },
    memoMemoClick (memo) {
      this.$emit('mememo', memo)
      // this.hoverAnima(memo.memoKey)
    },
    scrollMove (key) {
      var location = document.getElementById(key).offsetTop;
      this.$emit('scrollMove',location)
      this.anima(key)
    },
    anima(key){
      var a = document.getElementById(key)
      a.style.backgroundColor = 'white'
      // a.style.backgroundColor = 'rgba(186, 187, 215, 0.6)'
      // setTimeout(() => {
      //   document.getElementById(key).style.backgroundColor = 'rgba(186, 187, 215, 0.55)'
      // }, 100)
      // setTimeout(() => {
      //   document.getElementById(key).style.backgroundColor = 'rgba(186, 187, 215, 0.5)'
      // }, 200)
      // setTimeout(() => {
      //   document.getElementById(key).style.backgroundColor = 'rgba(186, 187, 215, 0.45)'
      // }, 300)
      // setTimeout(() => {
      //   document.getElementById(key).style.backgroundColor = 'rgba(186, 187, 215, 0.4)'
      // }, 400)
      // setTimeout(() => {
      //   document.getElementById(key).style.backgroundColor = 'rgba(186, 187, 215, 0.3)'
      // }, 500)
      // setTimeout(() => {
      //   document.getElementById(key).style.backgroundColor = 'rgba(186, 187, 215, 0.1)'
      // }, 600)
      setTimeout(() => {
        document.getElementById(key).style.backgroundColor = ''
      }, 700)
    }

  }
}
</script>

<style scoped>
.memoCard{
  width: 100%; min-height: 100px; padding: 10px; padding-right: 0; border-bottom: 0.8px solid #ccc; float: left;
  background-color: white;
  transition : background-color 0.5s ease-in;
}

</style>
