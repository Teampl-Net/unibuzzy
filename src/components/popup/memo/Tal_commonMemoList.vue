<template>
    <div style="width: 100%; float: left;">
      <div class="memoCard" v-for="(memo, index) in memoList" :key="index" :id="'rowMemoCard'+memo.memoKey" :style="index === (memoList.length - 1) ? 'border-bottom:0;': '' " @click="infoMemo(memo)" >
        <!-- <div class="fl" v-if="memo.parentMemoKey" @click="scrollMove(memo.parentMemoKey)" style="width:calc(100% - 20px); margin-left: 20px; border-radius: 5px; background-color: #eee;" > -->
        <!-- <div class="fl" v-if="memo.parentMemoKey" @click="scrollMove(memo.parentMemoKey)" style="width:calc(100% - 1rem); border-radius: 5px; background-color: #eee; margin-bottom:0.5rem;" >
            <div v-if="memo.pmemoBodyStr" >
              <p class="fl commonBlack mleft-1 mtop-05 font13" >{{this.$changeText( memo.pmemoUserNameMtext)}}</p>
              <div  class="fl commonBlack font12" style="margin: 0.5rem" v-html="memo.pmemoBodyStr"></div>
            </div>
            <p class="fl font14 " style="margin: 0.5rem" v-else >삭제된 댓글입니다.</p>
        </div> -->
        <div class="fl w100P" style="position: relative;"  :class="{mememoMTop : memo.parentMemoKey}" >
          <!-- <div v-if="memo.parentMemoKey" style="width:20px;position: absolute; left: 0; top: 50%; transform: translateY(-50%);" class="fl"> -->
          <!-- <div v-if="memo.parentMemoKey" style="max-width:20px;" class="fl">
            <img  src="../../../assets/images/common/icon-turn-right.svg" style="max-width:20px;" class=" " alt="">
          </div> -->
          <div class="commentTop" :class="{mememoLeftIconArea : memo.parentMemoKey}" style="min-height: 35px; float: left; width: 100%; margin-bottom: 5px;" >
            <!-- <img v-if="memo.parentMemoKey" src="../../../assets/images/common/icon-turn-right.svg" style="width:20px" class="fl mtop-05" alt=""> -->
            <div @click="memoUserNameClick({userKey :memo.creUserKey, contentsKey : memo.targetKey })" v-if="memo.userProfileImg"  class="memoPicImgWrap">
              <img :src="(memo.domainPath? memo.domainPath + memo.userProfileImg : memo.userProfileImg)" />
            </div>
            <img @click="memoUserNameClick({userKey :memo.creUserKey, contentsKey : memo.targetKey })" v-else src="../../../../public/resource/userCommonIcon/userImg01.png" style="min-height: 30px; width: 30px; float: left;  margin-right: 10px;" />
            <div class="grayBlack fl fontBold font15 " style=" width: calc(100% - 40px); min-height: 30px; line-height: 30px; ">
              <img class="fr mright-05 mtop-03" style="width:4.5px;" @click="contentMenuClick('memo', memo.creUserKey == this.GE_USER.userKey, memo, index)" src="../../../assets/images/common/icon_menu_round_vertical.svg"  alt="">
              <p class="font13 mleft-05 fr" style="margin-right: 10px; color: darkgray;     font-weight: normal;">{{this.$changeDateMemoFormat(memo.creDate)}}</p>
              <p  @click="memoUserNameClick({userKey :memo.creUserKey, contentsKey : memo.targetKey })">{{ this.$changeText(memo.userDispMtext || memo.userNameMtext) }}</p>
            </div>
          </div>
          <!-- <div class="commentMiddle" :class="{mememoLeftIconArea : memo.parentMemoKey}"  style="display: flex; min-height: 30px; float: left; width: 100%; "> -->
          <div class="commentMiddle fl" :class="{mememoLeftIconArea : memo.parentMemoKey}"  style="width:100%; ">
            <pre ref="editCommentBox"  @focus="focusOn" @blur="focusOut" id="memoEditBoxId" class="editableContent font14 cursorDragText" contenteditable=true style="margin-left: 5px; width: 100%;float: left; height: 100%; min-height: 30px; border-radius: 5px; padding: 0 5px; border: 1px solid #ccc; word-break: break-word;" v-if="editIndex === index && cMemoEditYn === false" v-html="inputText"></pre>
            <pre v-else :id="'memoFullStr'+memo.memoKey" style="margin-left: 5px; float: left; height: 100%; word-break: break-word; padding-right:10px;" class="commonBlack font14 cursorDragText w100P" v-html="memo.bodyFullStr" ></pre>
          </div>
          <div class="commentBottom" :class="{mememoLeftIconArea : memo.parentMemoKey}" style="height: 20px; line-height: 20px;  width: 100%; float: left; color: #666;" >
            <div v-if="editIndex === index && editCIndex === ''">
                <div class="memoActionArea borderLeft font13"  @click="editEnd(memo)" >완료</div>
                <div class="memoActionArea font13"  @click="cancelEdit(memo, index)" >취소</div>
            </div>
            <div >
              <div v-if="!nonMemYn && (creUser || (editIndex !== index && memo.creUserKey == this.GE_USER.userKey)) && cMemoEditYn === false" class="memoActionArea borderLeft font13"  @click="memoDeleteClick(memo, index)">삭제</div>
              <div v-if="!nonMemYn && (editIndex !== index && memo.creUserKey == this.GE_USER.userKey) && cMemoEditYn === false" class="memoActionArea borderLeft font13" @click="editMemoClick(memo, index)">수정</div>
            </div>
            <div  v-if="!nonMemYn &&(editIndex !== index)" class="memoActionArea font13" @click="memoMemoClick(memo)" >댓글</div>
          </div>
          <div  style="width: 100%; margin-top: 15px; min-height: 50px; float: left;" v-if="memo.cmemoList.length > 0">
              <div style="width: 100%; min-height: 20px; float: left; margin-top: 5px;" v-for="(cMemo, cIndex) in [...memo.cmemoList].reverse()" :key="cIndex" :id="'rowMemoCard'+cMemo.memoKey">
                  <img  src="../../../assets/images/common/icon-turn-right.svg" style="float: left; margin-left: 10px; margin-right: 5px; margin-top: 15px;max-width:20px;" class=" " alt="">
                  <div class="MemoBorder" style="width: calc(100% - 50px);"></div>
                  <div :id="cMemo.memoKey" style="width: calc(100% - 40px); padding: 10px; padding-right: 0; padding-bottom: 0; border-radius: 10px; min-height: 20px; float: left; margin: 10px 0;">
                      <div @click="memoUserNameClick({userKey :cMemo.creUserKey, contentsKey : cMemo.targetKey })" :style="'background-image: url(' + (cMemo.domainPath? cMemo.domainPath + cMemo.userProfileImg : cMemo.userProfileImg) + ')'" v-if="cMemo.userProfileImg"  class="" style="width: 25px; height: 25px; margin-right: 10px; border-radius: 100%; overflow: hidden; float: left;  border: 1.5px solid #6768a7;   background-size: cover; background-position: center; "></div>
                      <img v-else src="../../../../public/resource/userCommonIcon/userImg01.png" style="min-height: 30px; width: 30px; float: left;  margin-right: 10px;" />
                      <div style="width: 100%; min-height: 25px; margin-bottom: 10px; line-height: 25px;">
                          <img class="fr mright-05 mtop-03" style="width:4.5px;" @click="contentMenuClick('memo', cMemo.creUserKey == this.GE_USER.userKey, cMemo, index, cIndex)" src="../../../assets/images/common/icon_menu_round_vertical.svg"  alt="">
                          <p @click="memoUserNameClick({userKey :cMemo.creUserKey, contentsKey : cMemo.targetKey })" class="font14 grayBlack mtop-01 fl fontBold">{{this.$changeText(cMemo.userDispMtext || cMemo.userNameMtext)}}</p>
                          <p class="font13 mleft-05 fr" style="margin-right: 10px; color: darkgray;">{{this.$changeDateMemoFormat(cMemo.creDate)}}</p>
                      </div>
                      <pre id="cMemoEditBoxId" ref="cMemoEditBoxId" class="editableContent cMemoEditBoxClass font14 cursorDragText" contenteditable=true style="margin-left: 5px; width: 100%;float: left; height: 100%; min-height: 30px; border-radius: 5px; padding: 0 5px; border: 1px solid #ccc;" v-if="editIndex === index && editCIndex === cIndex" v-html="inputText"></pre>
                      <pre v-else class="font14 commonBlack" v-html="cMemo.bodyFullStr" :id="'memoFullStr' + cMemo.memoKey" ></pre>
                      <div v-if="editIndex === index && editCIndex === cIndex">
                        <div class="memoActionArea borderLeft font13"  @click="editEnd(cMemo)" >완료</div>
                        <div class="memoActionArea font13"  @click="cancelEdit(cMemo, index)" >취소</div>
                      </div>
                      <div v-else>
                        <div class="memoActionArea borderLeft font13" v-if="!nonMemYn && (creUser || (cMemo.creUserKey == this.GE_USER.userKey))" @click="memoDeleteClick(cMemo, index, cIndex)">삭제</div>
                        <div class="memoActionArea borderLeft font13" v-if="!nonMemYn && (cMemo.creUserKey == this.GE_USER.userKey)"  @click="editMemoClick(cMemo, index, cIndex)">수정</div>
                        <div class="memoActionArea font13" v-if="!nonMemYn &&(editIndex !== index)"  @click="meMemoMemoClick(cMemo)" >댓글</div>
                      </div>
                      <!-- <div class="memoActionArea font13" @click="memoMemoClick(memo)" v-if="!nonMemYn">댓글</div> -->
                  </div>
              </div>
          </div>
          <!-- <div v-if="memo.creUserKey === userKey" class="fr" style="width:20px"> -->
            <!-- <img src="../../../assets/images/push/noticebox_keep.png" style="width:20px" class="fr" /> -->
          <!-- </div> -->
        </div>
        <div class="MemoBorder" v-if="memoList.length - 1 !== index"></div>
      </div>
      <myObserver @triggerIntersected="loadMore" class="fl w100P"></myObserver>
    </div>
    <!-- <div class="w100P fl mtop-1" style="position: relative; width:100%; height:30px;">
      <gLoadingS ref="sLoadingMemoList" class="fl"/>
    </div> -->
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
    // console.log('this.memoList')
    // console.log(this.memoList)
    // if (this.memoList) {
    //   var tempData = this.memoList
    //   for (let i = 0; i < tempData.length - 1; i++) {
    //     if (!tempData[i].parentMemoKey) this.memoDataList.push(tempData[i])
    //   }
    // }
    this.memoDataList = this.memoList

    // 비회원 문의하기에서 로컬데이터에 데이터가 없으므로 에러가 나서 if처리를 해둠
    // document.querySelector('#editCommentBox').addEventListener('paste', (e) => {
    if (this.$refs.editCommentBox) {
      this.$refs.editCommentBox.addEventListener('paste', (e) => {
        e.preventDefault()
        var textData = (e.originalEvent || e).clipboardData.getData('Text')
        document.execCommand('insertHTML', false, textData)
      })
    }
    this.settingNameTagEvent()
    // for (let i = 0; i < this.memoDataList.length - 1; i++) {
    //   if (this.memoDataList[i].cmemoList.length > 0) {
    //     for (let mememoIdx = 0; mememoIdx < this.memoDataList[i].cmemoList.length; mememoIdx++) {
    //       if (this.memoDataList[i].cmemoList[mememoIdx].parentMemoKey) {
    //         this.$nextTick(() => {
    //           document.getElementById('parentKey' + this.memoDataList[i].cmemoList[mememoIdx].memoKey).addEventListener('click', (e) => {
    //             alert('Z' + this.memoDataList[i].cmemoList[mememoIdx].memoKey)
    //           // // console.log('안녕 : ' + this.memoDataList[i].cmemoList.parentMemoKey)
    //           })
    //         })
    //       }
    //     }
    //   }
    // }
  },
  data () {
    return {
      userKey: '',
      memoDataList: [],
      editIndex: '',
      editCIndex: '',
      cMemoEditYn: false
    }
  },
  computed: {
    /* CHANNEL_DETAIL () {
      return this.$getDetail('TEAM', this.propData.currentTeamKey)[0]
    },
    CAB_DETAIL () {
      return this.$getBoardCabinetDetail(this.propData.currentTeamKey, this.propData.targetKey)[0]
    }, */
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  watch: {
  },
  updated () {
  },
  methods: {
    focusOn () {
      this.$emit('cMemoEditYn', true)
    },
    focusOut () {
      this.$emit('cMemoEditYn', false)
    },
    settingNameTagEvent () {
      // eslint-disable-next-line no-debugger
      // debugger
      /* var memoNameCardList = window.document.querySelectorAll('.parentNameCard')
      if (memoNameCardList !== undefined && memoNameCardList !== null && memoNameCardList !== '' && memoNameCardList.length > 0) {
        for (let i = 0; i < memoNameCardList.length; i++) {
          memoNameCardList[i].removeEventListener('click')
        }
      }
      this.$nextTick(() => {
        memoNameCardList = window.document.querySelectorAll('.parentNameCard')
        for (let i = 0; i < memoNameCardList.length; i++) {
          memoNameCardList[i].addEventListener('click', (e) => {
            var id = memoNameCardList[i].id
            var parentKey = id.split('parentKey')[1]
            // this.$emit('findMemoAni', parentKey)
            this.findMemoAni(parentKey)
          })
        }
      }) */
    },
    findMemoAni (memoKey) {
      var findMemoCard = window.document.getElementById('rowMemoCard' + memoKey)
      if (findMemoCard) {
        // setTimeout(() => {
        findMemoCard.style.boxShadow = '0 0 15px 4px #6768a75c'
        findMemoCard.style.transition = 'box-shadow 0.7s ease-in-out'
        setTimeout(() => {
          findMemoCard.style.boxShadow = 'none'
        }, 1000)
        // }, 500)
      }
    },
    memoUserNameClick (param) {
      this.$emit('memoUserNameClick', param)
    },
    contentMenuClick (type, ownerYn, memo, index, cindex) {
      var param = {}
      param.type = type
      param.ownerYn = ownerYn
      param.tempData = memo
      param.index = index
      param.cIndex = cindex
      this.$emit('contentMenuClick', param)
    },
    infoMemo (memo) {
      // console.log(memo)
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
    memoDeleteClick (data, index, cindex) {
      var param = {}
      param = data
      param.clickIndex = index
      param.clickCIndex = cindex
      this.$emit('deleteMemo', param)
    },
    editMemoClick (data, index, cindex) {
      this.editIndex = index
      this.cMemoEditYn = false
      if (cindex !== undefined && cindex !== null && cindex !== '') {
        this.editCIndex = cindex
        this.cMemoEditYn = true
      }
      this.$emit('memoEdit', true)
      // this.focusOn()
      this.inputText = this.$decodeHTML(data.bodyFullStr)
    },
    cancelEdit () {
      this.editIndex = ''
      this.editCIndex = ''
      this.cMemoEditYn = false
      this.$emit('memoEdit', false)
      // this.focusOn()
    },

    async editEnd (data) {
      // eslint-disable-next-line no-new-object
      var memo = new Object()
      // memo = data
      // console.log(data)
      var bodyFullStr
      if (data.parentMemoKey) {
        bodyFullStr = window.document.getElementById('cMemoEditBoxId').innerHTML
      } else {
        bodyFullStr = window.document.getElementById('memoEditBoxId').innerHTML
      }
      memo.bodyFullStr = bodyFullStr
      // console.log('#################')
      // memo.bodyFullStr = this.$refs.editCommentBox.innerHTML
      // memo.bodyFullStr = this.inputText

      memo.bodyHtmlYn = true
      // memo.bodyMinStr = document.getElementById('editCommentBox').innerHTML
      memo.targetKey = data.targetKey
      memo.targetKind = data.targetKind
      /* memo.bodyFilekey  */
      memo.memoKey = data.memoKey
      memo.creUserKey = data.creUserKey
      memo.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      // memo.creTeamKey = data.creTeamKey
      memo.deleteYn = false
      // console.log(memo)
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tpsaveMemo',
        param: { memo: memo }
      })
      // console.log(result)

      if (result.data.result === true || result.data.result === 'true') {
        this.editIndex = ''
        this.editCIndex = ''
        this.cMemoEditYn = false
        // this.focusOn()
        // this.$emit('editTrue', memo)
        this.$showToastPop('댓글이 수정되었습니다.')
      }
      data.bodyFullStr = bodyFullStr
    },
    memoMemoClick (memo) {
      this.$emit('mememo', memo)
      // this.hoverAnima(memo.memoKey)
    },
    meMemoMemoClick (mememo) {
      // console.log('##cMemo##')
      // console.log(mememo)
      // console.log('#########')
      this.$emit('mememoMemo', mememo)
    },
    scrollMove (key) {
      var location = document.getElementById(key).offsetTop
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
