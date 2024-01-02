<i18n>
  {
    "ko": {
      "COMM_DEL_MEMO": "메모를 삭제하시겠습니까?",
    },
    "en": {
      "COMM_DEL_MEMO": "Do you want to delete this memo?",
    }
  }
  </i18n>
<template>
  <div id="layout">
    <header>
      <!-- Popup Title -->
      <button @click="saveMemo(false)" type="button" class="closeBtn">
          <img
            src="../../assets/images/common/popup_close.png"
            alt="close button"
            style="width:20px;"
          />
        </button>
      <p class="commonColor fontBold" style="font-size:20px; line-height: 30px;">메모 관리</p>
      <div class="HeaderbtnWrap cursorP" style="width:30px; height:100%;">
        <!-- <p>h</p> -->
        <!-- <div @click="postContents" class="saveBtn fontBold">
          {{ pContentsData ? $t('COMM_BTN_EDIT2') : $t('COMMON_BTN_SAVE') }}
        </div> -->
      </div>
    </header>

    <div class="w100P" style="padding:10px 20px;">
      <div class="w100P" style="min-height: 30px;">
        <div class="memoTabWrap w100P" style="display:flex; align-items:center;">
          <div style="width:100%; overflow-x:scroll; white-space:nowrap; text-align:left;">
            <div v-for="(memo, mIndex) in pMemoList.content" :key="mIndex" class="memoTab crusorP" @click="selectMemo(mIndex)" :class="{mSelectedMemo : mSelectedMemoIdx === mIndex}">
              <div class="w100P" style="display:flex; align-items:center; justify-content:space-between;">
                <span class="memoTitle" style="width:clac(100% - 22px);">{{memo.title}}</span>
                <span style="font-size:10px; width:22px;" class="cursorP" @click="mConfirmPopShowYn = true" >삭제</span>
              </div>
              <!-- <span @click="goDetail(memo)" >z</span> -->
            </div>
            <div @click="newMemo " :class="{mSelectedMemo : mSelectedMemoIdx === null}" id="newMemoTab" class="memoTab">+</div>
          </div>
        </div>
      </div>

      <div class="w100P mtop-1" style="">
        <textarea
          id="title"
          type="text"
          :placeholder="this.$t('COMM_MSG_PUT_TITLE')"
          v-model="memoTitle"
          class="titleInput w100P"
          :style="{}"
        />
      </div>
      <div class="w100P mtop-05" style="border-bottom:1px solid #EBEBEB;"></div>

      <div class="w100P0">
        <textarea class="w100P memoBodyArea mtop-1" v-model="memoBody" style="padding:20px; min-height:300px;">
        </textarea>

      </div>
    </div>
  </div>
  <gConfirmPop
      :confirmText="$t('COMM_DEL_MEMO')"
      confirmType="two"
      @no="mConfirmPopShowYn = false"
      v-if="mConfirmPopShowYn"
      @ok="deleteMemo(pMemoList.content[mSelectedMemoIdx])"
    />

</template>
<script>

export default {
  props: {
    pClosePop: Function,
    pMemoIdx: Number,
    pMemoList: []
  },
  created () {
    console.log('pMemoList', this.pMemoList)
    console.log('pMemoIdx', this.pMemoIdx)
    var history = this.$store.getters['D_HISTORY/hStack']
    // console.log(history)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
    if (this.pMemoIdx !== undefined) {
      this.selectMemo(this.pMemoIdx, true)
    }
  },
  data () {
    return {
      memoTitle: '새 메모',
      memoBody: null,
      mSelectedMemoIdx: null,
      extractedOuterHtml: '',
      extractedInnerHtml: '',
      formData: {},
      selectedMemo: [],
      popId: 'addMemoPop',
      mIsEditing: false,
      mConfirmPopShowYn: false
    }
  },
  methods: {
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    },
    selectMemo (index, initYn) {
      if (index === undefined || index === null) return
      if (!initYn) { this.saveMemo(true) }
      console.log(index)
      this.mSelectedMemoIdx = index
      this.memoTitle = this.pMemoList.content[this.mSelectedMemoIdx].title
      this.selectedMemo = this.pMemoList.content[index]
      this.memoBody = this.decodeContents(this.pMemoList.content[index].bodyFullStr)
    },
    newMemo () {
      this.memoTitle = null
      this.memoBody = null
      this.mSelectedMemoIdx = null
      // console.log('element', document.getElementsById('newMemoTab'))
      // document.getElementsById('newMemoTab').classList.add('newMemo')
    },
    async saveMemo (tabYn) {
      if (this.memoTitle === '새 메모' && this.memoBody === null && this.mIsEditing === false) {
        console.log('여기여기여김')
        this.backClick()
      } else {
        var params = {}
        params.actorList = null
        params.attachFileList = null
        params.workToDateStr = null
        params.workFromDateStr = null
        params.stickerList = null
        if (this.selectedMemo.contentsKey) {
          params.contentsKey = this.selectedMemo.contentsKey
        }
        params.jobkindId = 'MEMO'
        params.workStatCreUserName = this.GE_USER.userDispMtext
        params.title = this.memoTitle
        params.bodyFullStr = this.memoBody
        console.log('params,', params)
        this.$emit('saveMemos', params)
        if (!tabYn || tabYn === false) this.backClick()
      }
    },
    deleteMemo (data) {
      this.mConfirmPopShowYn = false
      this.memoTitle = '새 메모'
      this.memoBody = null
      this.$emit('deleteMemo', data)
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        if (this.pClosePop) {
          this.pClosePop()
        }
      }
    }
  },
  watch: {
    pMemoList: {
      immediate: true,
      handler (value, old) {
        if (value && value.length > 0) {
          if (value[0].content && value[0].content.length > 0 && value[0].content[this.mSelectedMemoIdx] && value[0].content[this.mSelectedMemoIdx].bodyFullStr) {
            this.memoBody = value[0].content[this.mSelectedMemoIdx].bodyFullStr
          }
          console.log('this.memoBody', this.memoBody)
        }
      },
      deep: true
    },
    memoBody: {
      handler (value, old) {
        if (value !== old) {
          this.mIsEditing = true
          console.log('this.mIsEditing', this.mIsEditing)
        }
      },
      deep: true
    },
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  },
  computed: {

    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  }
}
</script>

<style scoped>
#layout {
  width: 90%;
  height: calc(100% - 120px);
  overflow: hidden;
  min-height:500px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: 15;
  background-color:#fff;
  border-radius: 0.8rem;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:1rem 1.5rem 1rem;
  border-bottom:1px solid #EBEBEB;
}

button {
  min-width: 40px;
  height: 25px;
  padding: 0px 10px;
  float: left;
  color: #7a7a7a;
  word-wrap: normal;
  border: none;
  background-color:#fff;
  border-radius: 5px;
  line-height: 22px;
  }
  .activeBtn {
    font-weight:bold !important;
    height:25px;
    line-height:20px;
  }
  .closeBtn {
    border: none;
    background-color: none;
  }
.memoTab{
  width:33%;
  height:35px;
  line-height:33px;
  border-radius:20px 20px 0 0;
  background-color:#F1F1FF;
  border:2px solid #F1F1FF;
  color:#5f61bd !important;
  font-weight:bold;
  display:inline-block;
  text-align:center;
  white-space:nowrap;

  padding:0 10px;
}
.memoTitle{
  width:calc(100% - 10px);
  overflow:hidden;
  text-overflow:ellipsis;
  overflow:hidden;
}
.mSelectedMemo{
  background-color:#fff !important;
  border:2px solid #fff !important;
  border-top:2px solid #5f61bd !important;
  border-left:2px solid #5f61bd !important;
  border-right:2px solid #5f61bd !important;
}
.titleInput{
  overflow-y:scroll; white-space:wrap;
  padding:10px 15px 15px;
  border:none;
  outline:none;
  background-color:#F1F1FF;
  outline:none;
  font-size:19px;
  height:45px;
  border-radius:10px;
}
.memoBodyArea{
  width: 99%;
  min-height: 70px; background: #fff;
  cursor: pointer;
  text-align: left;
  box-shadow: 0px 0px 3px 0px #ccc;
  border:1px solid rgb(192, 191, 249) !important;
  border-radius:10px;
  outline:none;
}
</style>
