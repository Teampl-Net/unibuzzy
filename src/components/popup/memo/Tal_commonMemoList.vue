<template>
    <div class="memoCard" v-for="(memo, index) in memoList" :key="index" :id="memo.memoKey" :style="index === (memoList.length - 1) ? 'border-bottom:0;': '' " @click="infoMemo(memo)" >
      <!-- <div class="fl" v-if="memo.parentMemoKey" @click="scrollMove(memo.parentMemoKey)" style="width:calc(100% - 20px); margin-left: 20px; border-radius: 5px; background-color: #eee;" > -->
      <div class="fl" v-if="memo.parentMemoKey" @click="scrollMove(memo.parentMemoKey)" style="width:calc(100% - 1rem); border-radius: 5px; background-color: #eee; margin-bottom:0.5rem;" >

          <div v-if="memo.pmemoBodyStr" >
            <p class="fl commonBlack mleft-1 mtop-05 font13" >{{this.$changeText( memo.pmemoUserNameMtext)}}</p>
            <div  class="fl commonBlack font12" style="margin: 0.5rem" v-html="memo.pmemoBodyStr"></div>
          </div>
          <!-- </div> -->
          <!-- <img v-if="memo.parentMemoKey" src="../../../assets/images/common/icon-turn-right.svg" style="width:20px" class="fl mleft-1 mbottom-05 mtop-02" alt=""> -->

          <p class="fl font14 " style="margin: 0.5rem" v-else >삭제된 댓글입니다.</p>
      </div>

      <div class="fl w-100P" style="position: relative;"  :class="{mememoMTop : memo.parentMemoKey}" >
        <!-- <div v-if="memo.parentMemoKey" style="width:20px;position: absolute; left: 0; top: 50%; transform: translateY(-50%);" class="fl"> -->
        <!-- <div v-if="memo.parentMemoKey" style="max-width:20px;" class="fl">
          <img  src="../../../assets/images/common/icon-turn-right.svg" style="max-width:20px;" class=" " alt="">
        </div> -->
        <div class="commentTop" :class="{mememoLeftIconArea : memo.parentMemoKey}" style="min-height: 35px; float: left; width: 100%; margin-bottom: 5px;">
          <!-- <img v-if="memo.parentMemoKey" src="../../../assets/images/common/icon-turn-right.svg" style="width:20px" class="fl mtop-05" alt=""> -->
          <div @click="memoUserNameClick(memo.creUserKey)" v-if="memo.userProfileImg"  class="memoPicImgWrap">
            <img :src="(memo.domainPath? memo.domainPath + memo.userProfileImg : memo.userProfileImg)" />
          </div>
          <img v-else src="../../../assets/images/main/main_profile.png" style="min-height: 30px; width: 30px; float: left;  margin-right: 10px;" />
          <p @click="memoUserNameClick(memo.creUserKey)" class="grayBlack fl fontBold font15 " style=" width: calc(100% - 40px); min-height: 30px; line-height: 30px; ">
            <img class="fr mright-05 mtop-03" style="width:4.5px;" @click="contentMenuClick('memo', memo.creUserKey == this.userKey, memo, index)" src="../../../assets/images/common/icon_menu_round_vertical.svg"  alt="">
            <pp class="font13 mleft-05 fr" style="margin-right: 10px; color: darkgray;     font-weight: normal;">{{this.$changeDateMemoFormat(memo.creDate)}}</pp>
            {{ this.$changeText(memo.userDispMtext || memo.userNameMtext) }}
          </p>
        </div>
        <!-- <div class="commentMiddle" :class="{mememoLeftIconArea : memo.parentMemoKey}"  style="display: flex; min-height: 30px; float: left; width: 100%; "> -->
        <div class="commentMiddle fl" :class="{mememoLeftIconArea : memo.parentMemoKey}"  style="width:100%; ">
          <div id="editCommentBox" class="editableContent font14" contenteditable=true style="margin-left: 5px; width: 100%;float: left; height: 100%; min-height: 30px; border-radius: 5px; padding: 0 5px; border: 1px solid #ccc;" v-if="editIndex === index" v-html="inputText"></div>
          <div v-else style="margin-left: 5px; width: calc(100% - 40px);float: left; height: 100%;" class="commonBlack font14" v-html="memo.bodyFullStr" ></div>
        </div>
        <div class="commentBottom" :class="{mememoLeftIconArea : memo.parentMemoKey}" style="height: 20px; line-height: 20px;  width: 100%; float: left; color: #666;" >
          <div v-if="editIndex === index">
              <div class="memoActionArea borderLeft font13"  @click="editEnd(memo)" >완료</div>
              <div class="memoActionArea font13"  @click="cancelEdit(memo, index)" >취소</div>
          </div>
          <div >
            <div class="memoActionArea borderLeft font13" v-if="!nonMemYn && (creUser || (editIndex !== index && memo.creUserKey == this.userKey))" @click="memoDeleteClick(memo, index)">삭제</div>
            <div class="memoActionArea borderLeft font13" v-if="!nonMemYn && (editIndex !== index && memo.creUserKey == this.userKey)"  @click="editMemoClick(memo, index)">수정</div>
          </div>
          <div class="memoActionArea font13" @click="memoMemoClick(memo)" v-if="!nonMemYn &&(editIndex !== index)">댓글</div>
          <p v-if="memo.cmemoList.length > 0" class="fr font13" style="color: darkgray; margin-right:0.5rem">댓글 {{memo.cmemoList.length}}개</p>
        </div>
        <div  style="width: 100%; margin-top: 15px; min-height: 50px; float: left;" v-if="memo.cmemoList.length > 0">
            <div style="width: 100%; min-height: 20px; float: left; margin-top: 5px;" v-for="(cMemo, cIndex) in [...memo.cmemoList].reverse()" :key="cIndex">
                <img  src="../../../assets/images/common/icon-turn-right.svg" style="float: left; margin-left: 10px; margin-right: 5px; margin-top: 15px;max-width:20px;" class=" " alt="">
                <div class="MemoBorder" style="width: calc(100% - 50px);"></div>
                <div :id="cMemo.memoKey" style="width: calc(100% - 40px); padding: 10px; padding-right: 0; padding-bottom: 0; border-radius: 10px; min-height: 20px; float: left; margin: 10px 0;">
                    <div @click="memoUserNameClick(cMemo.creUserKey)" :style="'background-image: url(' + (cMemo.domainPath? cMemo.domainPath + cMemo.userProfileImg : cMemo.userProfileImg) + ')'" v-if="cMemo.userProfileImg"  class="" style="width: 25px; height: 25px; margin-right: 10px; border-radius: 100%; overflow: hidden; float: left;  border: 1.5px solid #6768a7;   background-size: cover; background-position: center; ">
                        </div>
                        <img v-else src="../../../assets/images/main/main_profile.png" style="min-height: 30px; width: 30px; float: left;  margin-right: 10px;" />
                        <div style="width: 100%; min-height: 25px; margin-bottom: 10px;">
                            <p class="font14 grayBlack mtop-01 fl fontBold">{{this.$changeText(cMemo.userDispMtext || cMemo.userNameMtext)}}</p>
                            <pp class="font13 mleft-05 fr" style="margin-right: 10px; color: darkgray;">{{this.$changeDateMemoFormat(cMemo.creDate)}}</pp>
                        </div>
                        <p class="font14 commonBlack" v-html="cMemo.bodyFullStr"></p>
                    <div >
                        <div class="memoActionArea borderLeft font13" v-if="!nonMemYn && (creUser || (cMemo.creUserKey == this.userKey))" @click="memoDeleteClick(cMemo, index)">삭제</div>
                        <div class="memoActionArea borderLeft font13" v-if="!nonMemYn && (cMemo.creUserKey == this.userKey)"  @click="editMemoClick(cMemo, index)">수정</div>
                    </div>
                    <!-- <div class="memoActionArea font13" @click="memoMemoClick(memo)" v-if="!nonMemYn">댓글</div> -->
                </div>
            </div>
        </div>
        <!-- <div v-if="memo.creUserKey === userKey" class="fr" style="width:20px"> -->
          <!-- <img src="../../../assets/images/push/noticebox_keep.png" style="width:20px" class="fr" /> -->
        <!-- </div> -->
      </div>
      <div class="MemoBorder"></div>
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
    memoUserNameClick (creUser) {
      this.$emit('memoUserNameClick', creUser)
    },
    contentMenuClick (type, ownerYn, memo, index) {
      var param = {}
      param.type = type
      param.ownerYn = ownerYn
      param.tempData = memo
      param.index = index
      this.$emit('contentMenuClick', param)
    },
    infoMemo (memo) {
      console.log(memo)
    },
    loadMore () {
      // this.memoLoadingShow()
      this.$emit('loadMore', 10)
    },
    memoLoadingShow () {
      this.$refs.sLoadingMemoList.show()
    },
    memoLoadingHide () {
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
      // memo = data
      memo.bodyFullStr = document.getElementById('editCommentBox').innerHTML
      memo.bodyHtmlYn = true
      // memo.bodyMinStr = document.getElementById('editCommentBox').innerHTML
      memo.targetKey = data.targetKey
      memo.targetKind = data.targetKind
      /* memo.bodyFilekey  */
      memo.memoKey = data.memoKey
      memo.creUserKey = data.creUserKey
      memo.creUserName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
      // memo.creTeamKey = data.creTeamKey
      memo.deleteYn = false
      var result = await this.$commonAxiosFunction({
        url: '/tp.saveMemo',
        param: { memo: memo }
      })
      console.log(result)

      if (result.data.result === true || result.data.result === 'true') {
        this.editIndex = ''

        this.$emit('editTrue')
      }
      data.bodyFullStr = document.getElementById('editCommentBox').innerHTML
    },
    memoMemoClick (memo) {
      this.$emit('mememo', memo)
      // this.hoverAnima(memo.memoKey)
    },
    scrollMove (key) {
      var location = document.getElementById(key)?.offsetTop
      if (location !== undefined && location !== null && location !== '') {
        this.$emit('scrollMove', location)
        this.anima(key)
      }
    },
    anima (key) {
      /* document.getElementById(key).style.backgroundColor = 'rgba(186, 187, 215, 0.6)'
      setTimeout(() => {
        document.getElementById(key).style.backgroundColor = ''
      }, 700) */
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
  width: 100%; min-height: 100px; padding: 5px 10px; padding-right: 0; float: left; margin: 5px 0;
  /* background-color: white; */
  background-color: transparent;
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
  height: 20px; line-height: 20px; width: 100%; float: left; color: #666;
}
.mememoLeftIconArea{
  width: calc(100% - 30px) !important;
  float: right !important;
}
.memoPicImgWrap {width: 30px; height: 30px; border-radius: 100%; border:1.5px solid #6768a7; float: left; background: #6768a745; overflow: hidden; display: flex; margin-right: 10px}
.memoPicImgWrap img {width: 100%;}

.MemoBorder{
    margin-top: 5px;
  width: calc(100%); height: 1px; padding-bottom: 2px;
  float: left;
  background-image: linear-gradient(to
    right, #ccc 33%, rgba(255,255,255,0) 0%);
    background-position: bottom;
    background-size: 17px 2px;
    background-repeat: repeat-x;
}
</style>
