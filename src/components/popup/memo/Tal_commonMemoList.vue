<template>
    <div style="width: 100%; min-height: 100px; padding: 10px; padding-right: 0; border-bottom: 0.8px solid #ccc; float: left;" v-for="(memo, index) in memoList" :key="index" >

      <div class="fl" v-if="memo.parentMemoKey" style="width:20px">

          <img src="../../../assets/images/common/icon-turn-right.svg" style="width:20px" alt="">
      </div>
      <div class="commentTop" style="min-height: 35px; float: left; width: 100%; margin-bottom: 5px;" @click="memoInfo(memo)">

        <div style="min-height: 30px; width: 30px; float: left; border-radius: 100%; background-color: #aaa; margin-right: 10px;" ></div>
        <p class="grayBlack fl font14" style="min-height: 30px; line-height: 30px; ">{{ this.$changeText(memo.userNameMtext || memo.userDispMtext) }}</p>
        <!-- <div style="float: right; font-size: 16px; font-weight: bold;">X</div> -->
        <p style="float: right; font-size: 14px; margin-right: 10px; color: darkgray; ">{{this.$changeDateFormat(memo.creDate)}}</p>
      </div>
      <div class="commentMiddle" style="display: flex; min-height: 30px; float: left; width: 100%; ">
        <!-- <img src="" style="height: 30px; width: 30px; " /> -->
        <input type="text" style="margin-left: 5px; width: 70%;float: left; font-size: 16px; height: 100%; border: 1px solid #ccc;" v-if="editIndex === index" v-model="inputText"  >
        <p v-else style="margin-left: 5px; width: calc(100% - 40px);float: left; font-size: 16px; height: 100%;" class="commonBlack" >{{memo.bodyFullStr}} </p>

      </div>
      <div class="commentBottom" style="height: 25px; line-height: 25px; font-size: 14px; width: 100%; float: left;" >
        <!-- <div class="commentBottom" style="height: 25px; line-height: 25px; font-size: 14px; width: 100%; float: left;" > -->
        <div v-if="editIndex === index">
            <div style="float: right; width: 40px; height: 100%; text-align: center;" @click="editEnd(memo, index)" >완료</div>
            <div style="float: right; width: 40px; height: 100%; text-align: center; border-right: 1px solid #aaa;" @click="cancelEdit(memo, index)" >취소</div>
        </div>
        <div v-if="editIndex !== index && memo.creUserKey == this.userKey">
          <div style="float: right; width: 40px; height: 100%; text-align: center;" @click="memoDeleteClick(memo, index)" >삭제</div>
          <div style="float: right; width: 40px; height: 100%; text-align: center; border-right: 1px solid #aaa;" @click="editMemoClick(memo, index)" >수정</div>
        </div>
        <div style="float: right; width: 40px; height: 100%; text-align: center; border-right: 1px solid #aaa;" @click="memoMemoClick(memo)">답글</div>
      </div>
      <!-- <div v-if="memo.creUserKey === userKey" class="fr" style="width:20px"> -->
        <!-- <img src="../../../assets/images/push/noticebox_keep.png" style="width:20px" class="fr" /> -->
      <!-- </div> -->
    </div>
</template>

<script>
// import a from '../../../assets/images/common/'
/* eslint-disable */
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
      editIndex:''

    }
  },
  created () {
    this.pushMememoText()
  },
  methods: {
    memoInfo(memo){
      console.log(memo)
      // this.pushMememoText()
    },
    pushMememoText() {
      for (let i = 0; i < this.memoList.length; i++) {
        // let value = {}
        if(this.memoList[i].parentMemoKey){
          for (let j = 0; j < this.memoList.length; j++) {
            if(this.memoList[j].memoKey === this.memoList[i].parentMemoKey){
              this.memoList[i].meMemoText = this.$changeText(this.memoList[j].userDispMtext) + ' : ' + this.memoList[j].bodyMinStr

            }
          }


        }
      }
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
    memoMemoClick (memo) {
      this.$emit('mememo',memo)
    }

  }
}
</script>

<style scoped>

</style>
