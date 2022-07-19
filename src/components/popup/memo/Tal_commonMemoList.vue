<template>
    <div class="memoCard" v-for="(memo, index) in memoList" :key="index" :id="memo.memoKey" @click="infoMemo(memo)" >
      <!-- <div class="fl" v-if="memo.parentMemoKey" @click="scrollMove(memo.parentMemoKey)" style="width:calc(100% - 20px); margin-left: 20px; border-radius: 5px; background-color: #eee;" > -->
      <div class="fl" v-if="memo.parentMemoKey" @click="scrollMove(memo.parentMemoKey)" style="width:calc(100% + 1rem); border-radius: 5px; background-color: #eee; margin-bottom:0.5rem; margin-left: -1rem;" >
          <!-- <div class="fl w-100P" > -->
            <p class="fl commonBlack mleft-1 mtop-05 font13" >{{memo.meMemoUserDispMtext}}</p>
            <div  class="fl commonBlack  font12" style="margin: 0.5rem" v-html="memo.meMemoBodyMinStr"></div>
          <!-- </div> -->
          <!-- <img v-if="memo.parentMemoKey" src="../../../assets/images/common/icon-turn-right.svg" style="width:20px" class="fl mleft-1 mbottom-05 mtop-02" alt=""> -->
          <p class="fl mleft-05 font14" v-if="!memo.meMemoUserDispMtext">삭제된 댓글입니다.</p>
      </div>

      <div class="fl w-100P" style="position: relative;"  :class="{mememoMTop : memo.parentMemoKey}" >
        <!-- <div v-if="memo.parentMemoKey" style="width:20px;position: absolute; left: 0; top: 50%; transform: translateY(-50%);" class="fl"> -->
        <div v-if="memo.parentMemoKey" style="max-width:20px;" class="fl">
          <img  src="../../../assets/images/common/icon-turn-right.svg" style="max-width:20px;" class=" " alt="">
        </div>
        <div class="commentTop" :class="{mememoLeftIconArea : memo.parentMemoKey}" style="min-height: 35px; float: left; width: 100%; margin-bottom: 5px;">
          <!-- <img v-if="memo.parentMemoKey" src="../../../assets/images/common/icon-turn-right.svg" style="width:20px" class="fl mtop-05" alt=""> -->
          <img src="../../../assets/images/main/main_profile.png" style="min-height: 30px; width: 30px; float: left;  margin-right: 10px;" />
          <p class="grayBlack fl font14" style="min-height: 30px; line-height: 30px; ">{{ this.$changeText(memo.userDispMtext || memo.userNameMtext) }}</p>
          <p class="font14" style="float: right; margin-right: 10px; color: darkgray; line-height: 30px;">{{this.$changeDateFormat(memo.creDate)}}</p>
        </div>
        <div class="commentMiddle" :class="{mememoLeftIconArea : memo.parentMemoKey}"  style="display: flex; min-height: 30px; float: left; width: 100%; ">
          <div id="editCommentBox" class="editableContent font14" contenteditable=true style="margin-left: 5px; width: 70%;float: left; height: 100%; border: 1px solid #ccc;" v-if="editIndex === index" v-html="inputText"></div>
          <div v-else style="margin-left: 5px; width: calc(100% - 40px);float: left; height: 100%;" class="commonBlack font14" v-html="memo.bodyFullStr" ></div>
        </div>
        <div class="commentBottom" :class="{mememoLeftIconArea : memo.parentMemoKey}" style="height: 20px; line-height: 20px;  width: 100%; float: left; color: #666; margin-top: 10px;" >
          <div v-if="editIndex === index">
              <div class="memoActionArea borderLeft font13"  @click="editEnd(memo, index)" >완료</div>
              <div class="memoActionArea font13"  @click="cancelEdit(memo, index)" >취소</div>
          </div>
          <div >
            <div class="memoActionArea borderLeft font13" v-if="!nonMemYn && (creUser || (editIndex !== index && memo.creUserKey == this.userKey))" @click="memoDeleteClick(memo, index)">삭제</div>
            <div class="memoActionArea borderLeft font13" v-if="!nonMemYn && (editIndex !== index && memo.creUserKey == this.userKey)"  @click="editMemoClick(memo, index)">수정</div>
          </div>
          <div class="memoActionArea font13" @click="memoMemoClick(memo)" v-if="replyYn === true && editIndex !== index">댓글</div>
          <p v-if="memo.mememoCount !== 0" class="fr font13" style="color: darkgray; margin-right:0.5rem">댓글 {{memo.mememoCount}}개</p>
        </div>
        <!-- <div v-if="memo.creUserKey === userKey" class="fr" style="width:20px"> -->
          <!-- <img src="../../../assets/images/push/noticebox_keep.png" style="width:20px" class="fr" /> -->
        <!-- </div> -->
      </div>
    </div>
    <myObserver @triggerIntersected="loadMore" class="fl w-100P"></myObserver>
    <div class="w-100P fl mtop-1" style="position: relative; width:100%; height:30px;">
      <gLoadingS ref="sLoadingMemoList" class="fl"/>
    </div>
</template>

<script>
// eslint-disable-next-line
export default {
  props: {
    memoList: {},
    replyYn: {},
    creUser: {},
    endList: {},
    nonMemYn: {}
  },
  mounted () {
    this.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
  },
  data () {
    return {
      userKey: '',
      editIndex: ''
    }
  },
  watch: {
    memoList () {
      this.memoLoadingHide()
    }
  },
  methods: {
    infoMemo (memo) {
      console.log(memo)
    },
    loadMore () {
      // this.memoLoadingShow()
      this.$emit('loadMore', 10)
    },
    memoLoadingShow () {
      console.log('MemoLoadingshow')
      this.$refs.sLoadingMemoList.show()
    },
    memoLoadingHide () {
      console.log('MemoLoadinghide')
      this.$refs.sLoadingMemoList.hide()
    },
    memoDeleteClick (data, index) {
      var param = {}
      param = data
      param.clickIndex = index
      this.$emit('deleteMemo', param)
    },
    editMemoClick (data, index) {
      this.editIndex = index
      this.inputText = this.$decodeHTML(data.bodyFullStr)
    },
    cancelEdit () {
      this.editIndex = ''
    },
    async editEnd (data) {
      // eslint-disable-next-line no-new-object
      var memo = new Object()
      memo = data
      memo.bodyFullStr = document.getElementById('editCommentBox').innerHTML
      // memo.bodyMinStr = document.getElementById('editCommentBox').innerHTML
      // memo.targetKey = data.targetKey
      // memo.targetKind = data.targetKind
      /* memo.bodyFilekey  */
      // alert(JSON.stringify(data))
      // memo.memoKey = data.memoKey
      // memo.creUserKey = data.creUserKey
      // memo.deleteYn = false

      console.log('memoParam')
      console.log(memo)
      var result = await this.$commonAxiosFunction({
        url: '/tp.saveMemo',
        param: { memo: memo }
      })
      console.log(result)
      if (result.data.result === true || result.data.result === 'true') {
        this.editIndex = ''
        this.$emit('editTrue')
      }
    },
    memoMemoClick (memo) {
      this.$emit('mememo', memo)
      // this.hoverAnima(memo.memoKey)
    },
    scrollMove (key) {
      var location = document.getElementById(key).offsetTop
      this.$emit('scrollMove', location)
      this.anima(key)
    },
    anima (key) {
      document.getElementById(key).style.backgroundColor = 'rgba(186, 187, 215, 0.6)'
      setTimeout(() => {
        document.getElementById(key).style.backgroundColor = ''
      }, 700)
    }
    // decodeContents (data) {
    //   // eslint-disable-next-line no-undef
    //   var changeText = Base64.decode(data)
    //   return changeText
    // }

  }
}
</script>

<style scoped>
.memoCard{
  width: 100%; min-height: 100px; padding: 10px; padding-right: 0; border-bottom: 0.8px solid #ccc; float: left; margin: 5px 0;
  background-color: white;
  transition : background-color 0.5s ease-in;
  position: relative;
}
.memoActionArea{
float: right; width: 40px; height: 100%; text-align: center;
}
.borderLeft{
  border-left: 1px solid #aaa;
}
.commentBottom{
  height: 20px; line-height: 20px; fwidth: 100%; float: left; color: #666;
}
.mememoLeftIconArea{
  width: calc(100% - 30px) !important;
  float: right !important;
}
.mememoMTop{
  /* margin-top: 50px; */
}
</style>
