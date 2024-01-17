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
  <!-- <div id="layout" :style="{'background-color' : mMemoColor, 'background-image': `linear-gradient(-135deg, transparent 36px, ${mMemoColor} 0)` }"> -->
  <div id="layout" >
    <header>
      <!-- Popup Title -->
      <!-- <button @click="saveMemo(false)" type="button" class="closeBtn"> -->
      <div @click="saveMemo(false)" class="closeBtn">
        <img
          src="../../assets/images/todo/close_white.png"
          alt="close button"
          class="w100P"
        />
      </div>
      <div style="width:calc(100% -40px); display:flex; algin-items:center; gap:0.5rem;">
        <div style="width:auto; display:flex; align-items:center; gap:0.3rem;">
          <div v-for="(color, index) in mMemoColors" :key="index" @click="changeMemoColor(index)" class="cursorP" style="position:relative;">
            <img v-if="mSelectedMemoColorIdx === index" :src="require(`@/assets/images/todo/selected.png`)" alt="selected Memo Color" style="width:13px; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);"/>
            <img :src="color.image" style="width:30px;"/>
          </div>
        </div>
        <button class="delBtn" @click="mConfirmPopShowYn = true">삭제</button>
      </div>

    </header>
    <!-- <div class="devider"></div> -->

    <div class="memoPopBody" :style="{background : `linear-gradient(-135deg, transparent 36px, ${mMemoColor} 0)`}">
      <div class="foldedDeco" :style="{background : `linear-gradient(-135deg, transparent 36px, ${mMemoFolded} 0)`}"></div>
      <div class="w100P" style="height:calc(100% - 60px); display:flex; flex-direction:column; align-items:center; justify-content:space-between;">
        <div class="w100P" style="height:30px; display:flex; algin-items:center;">
          <textarea
            id="title"
            type="text"
            :placeholder="this.$t('COMM_MSG_PUT_TITLE')"
            v-model="memoTitle"
            class="titleInput w100P"
            :style="{}"
          />
        </div>
          <div class="w100P" style="height:calc(100% - 40px); padding-top:20px;">
            <p class="font13 mTop-05" style="padding:0 8px; text-align:left; color:gray;">{{ memoDate ? memoDate : getDates(new Date()) }}</p>
            <textarea class="w100P memoBodyArea mtop-05" @click="changeBtn" v-model="memoBody" style="min-height:300px;">
            </textarea>
          </div>
        <div class="HeaderbtnWrap cursorP w100P" style="text-align:center; height:50px; display:flex; align-items:center; justify-content:center;">
        </div>
      </div>
    </div>
  </div>
  <gConfirmPop
      :confirmText="$t('COMM_DEL_MEMO')"
      confirmType="two"
      @no="mConfirmPopShowYn = false"
      v-if="mConfirmPopShowYn"
      @ok="deleteMemo(pMemoList.content[pMemoIdx])"
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
    if (this.pMemoList && this.pMemoList.content.length > 0 && this.pMemoIdx !== null) { // 새 메모가 아니면
      this.memoTitle = this.pMemoList.content[this.pMemoIdx].title
      this.memoBody = this.decodeContents(this.pMemoList.content[this.pMemoIdx].bodyFullStr)
      this.memoDate = this.getDates(this.pMemoList.content[this.pMemoIdx].creDate)
    } else { this.newMemo() }
    console.log('클릭된메모내용', this.pMemoList.content[this.pMemoIdx])
    var history = this.$store.getters['D_HISTORY/hStack']
    // console.log(history)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
    // if (this.pMemoIdx !== undefined) {
    //   this.selectMemo(this.pMemoIdx, true)
    // }
  },
  data () {
    return {
      memoTitle: this.$t('COMMON_TITLE_NEWMEMO'),
      memoBody: null,
      mSelectedMemoIdx: null,
      extractedOuterHtml: '',
      extractedInnerHtml: '',
      formData: {},
      selectedMemo: [],
      popId: 'addMemoPop',
      mIsEditing: false,
      mConfirmPopShowYn: false,
      mSetMemo: {},
      memoDate: '',
      btnTextChange: this.$t('COMMON_BTN_DELETE'),
      mMemoColor: '#FCF5AD',
      mMemoFolded: '#DAD59B',
      mMemoColors: [
        { image: require('@/assets/images/todo/memo_yellow.png'), color: '#FCF5AD', folded: '#DAD59B' },
        { image: require('@/assets/images/todo/memo_pink.png'), color: '#FAD5E6', folded: '#D7B7C6' },
        { image: require('@/assets/images/todo/memo_green.png'), color: '#DEEAE0', folded: '#B3CCC0' },
        { image: require('@/assets/images/todo/memo_blue.png'), color: '#C8DAEE', folded: '#ACB8C4' }
      ],
      mSelectedMemoColorIdx: 0
    }
  },
  methods: {
    changeMemoColor (index) {
      this.mSelectedMemoColorIdx = index
      this.mMemoColor = this.mMemoColors[index].color
      this.mMemoFolded = this.mMemoColors[index].folded
    },
    getDates (value) {
      // value는 2023-12-27T10:01:37 형식의 문자열이라고 가정합니다.

      const date = new Date(value) // 문자열을 Date 객체로 변환합니다.

      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0') // 월은 0부터 시작하므로 +1을 해주고, 두 자릿수로 만듭니다.
      const day = date.getDate().toString().padStart(2, '0') // 일도 두 자릿수로 만듭니다.

      const formattedDate = `${year}/${month}/${day}`
      return formattedDate
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      return changeText
    },
    // selectMemo (index, initYn) {
    //   if (index === undefined || index === null) return
    //   if (!initYn) { this.saveMemo(true) }
    //   console.log(index)
    //   this.mSelectedMemoIdx = index
    //   this.memoTitle = this.pMemoList.content[this.mSelectedMemoIdx].title
    //   this.selectedMemo = this.pMemoList.content[index]
    //   this.memoBody = this.decodeContents(this.pMemoList.content[index].bodyFullStr)
    // },
    changeBtn () {
      if (this.pMemoList && this.pMemoList.content.length > 0 && this.pMemoIdx !== null) {
        this.btnTextChange = this.$t('COMM_BTN_EDIT2')
      }
    },
    newMemo () {
      this.memoTitle = this.$t('COMMON_TITLE_NEWMEMO')
      this.memoBody = null
      this.btnTextChange = this.$t('COMMON_BTN_SAVE')
      this.changeMemoColor(0)
      // console.log('element', document.getElementsById('newMemoTab'))
      // document.getElementsById('newMemoTab').classList.add('newMemo')
    },
    async saveMemo () {
      if (this.memoTitle === this.$t('COMMON_TITLE_NEWMEMO') && this.memoBody === null && this.mIsEditing === false) {
        console.log('새 메모 저장 안하고 끄기')
        this.backClick()
      } else {
        var params = {}
        params.actorList = null
        params.attachFileList = null
        params.workToDateStr = null
        params.workFromDateStr = null
        params.stickerList = null
        if (this.pMemoList && this.pMemoList.content.length > 0 && this.pMemoIdx !== null) { // 새 메모가 아니면
          params.contentsKey = this.pMemoList.content[this.pMemoIdx].contentsKey
        }
        params.jobkindId = 'MEMO'
        params.workStatCreUserName = this.GE_USER.userDispMtext
        params.title = this.memoTitle
        params.bodyFullStr = this.memoBody
        console.log('params,', params)
        this.$emit('saveMemos', params)
        if (this.pMemoList && this.pMemoList.content.length > 0 && this.pMemoIdx !== null) {
          this.$showToastPop(this.$t('COMMON_MSG_EDIT_MEMO'))
        } else {
          this.$showToastPop(this.$t('COMMON_MSG_SAVE_MEMO'))
        }
        this.backClick()
      }
    },
    deleteMemo (data) {
      this.mConfirmPopShowYn = false
      this.backClick()
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
    },
    handleKeyboardShow () {
      var layout = document.querySelector('#layout')
      layout.classList.add('maxHeight')
    },
    handleKeyboardHide () {
      var layout = document.querySelector('#layout')
      layout.classList.remove('maxHeight')
    }
  },
  watch: {
    pMemoList: {
      immediate: true,
      handler (value, old) {
        if (value && value.length > 0) {
          if (value[0].content && value[0].content.length > 0 && value[0].content[this.pMemoIdx] && value[0].content[this.pMemoIdx].bodyFullStr) {
            this.memoBody = value[0].content[this.pMemoIdx].bodyFullStr
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
  },
  mounted () {
    window.addEventListener('keyboardDidShow', this.handleKeyboardShow)
    window.addEventListener('keyboardDidHide', this.handleKeyboardHide)
  }
}
</script>

<style scoped>
#layout {
  width: 85%;
  height: calc(100% - 400px);
  overflow: hidden;
  min-height:500px;

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  z-index: 15;
  /* border-radius: 0.8rem; */
}
.maxHeight{
  margin-top:1rem;
  max-height:500px;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:1rem 0rem 0rem;
}
.memoPopBody{
  padding:20px;
  border-radius: 10px;
  box-shadow:-1px 12px 5px rgba(0,0,0,0.1);
  position:relative;
}
.foldedDeco{
  width:50px;
  height:50px;
  background-color:#fff;
  position:absolute;
  top:0;
  right:0;
  box-shadow:-3px 0px 3px rgba(0,0,0,0.1);
}

button {
  /* padding: 0px 10px; */
  float: left;
  color: #7a7a7a;
  word-wrap: normal;
  border: none;
  border-radius: 5px;
  line-height: 22px;
  text-align:left;
}
  .activeBtn {
    font-weight:bold !important;
    height:25px;
    line-height:20px;
  }
  .closeBtn {
    border: none;
    background-color: rgba(0,0,0,0);
    width:40px;
  }
  .delBtn {
    width:auto;
    min-width:48px;
    height:35px;
    line-height:35px;
    border-radius:10px;
    /* background-color:#5F61BD; */
    background-color:#fbfbfd;
    color:#5F61BD;
    font-weight:bold;
    text-align:center;
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
.titleInput{
  width:90%;
  background-color:transparent;
  overflow-y:scroll; white-space:wrap;
  border:none;
  outline:none;
  outline:none;
  font-size:19px;
  height:100%;
  font-weight:bold;
  /* border-radius:10px; */
}
.memoBodyArea{
  width: 100%;
  min-height: 70px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  /* box-shadow: 0px 0px 3px 0px #ccc; */
  border:none !important;
  border-radius:10px;
  outline:none;
}
.backColorBtn{
  border:1px solid #C0BFF9;
  border-radius:10px;
  padding:5px 10px;
  color:#5F61BD;
}
</style>
