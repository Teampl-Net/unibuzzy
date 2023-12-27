<template>
  <div id="layout">
    <header>
      <!-- Popup Title -->
      <button @click="pClosePop" type="button" class="closeBtn">
          <img
            src="../../assets/images/common/popup_close.png"
            alt="close button"
            style="width:20px;"
          />
        </button>
      <p @click="saveMemo" class="commonColor fontBold" style="font-size:20px; line-height: 30px;">{{ $t('COMMON_TITLE_MEMODETAIL') }}</p>
      <div @click="deleteMemo(pMemoList.content[mSelectedMemoIdx])" class="HeaderbtnWrap cursorP" style="width:30px; height:100%;">
        <p>h</p>
        <!-- <div @click="postContents" class="saveBtn fontBold">
          {{ pContentsData ? $t('COMM_BTN_EDIT2') : $t('COMMON_BTN_SAVE') }}
        </div> -->
      </div>
    </header>

    <div class="w100P" style="padding:10px 20px;">
      <div class="w100P" style="min-height: 30px;">
        <div class="memoTabWrap w100P" style="display:flex; align-items:center;">
          <div style="width:100%; overflow-x:scroll; white-space:nowrap; text-align:left;">
            <div v-for="(memo, mIndex) in pMemoList.content" :key="mIndex" class="memoTab" @click="selectMemo(mIndex)" :class="{mSelectedMemo : mSelectedMemoIdx === mIndex}">
              {{memo.title}}
              <!-- <span @click="goDetail(memo)" >z</span> -->
            </div>
            <div @click="newMemo" id="newMemoTab" class="memoTab">+</div>
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
    if (this.pMemoIdx === 0) {
      this.selectMemo(0)
    }
  },
  data () {
    return {
      memoTitle: '',
      memoBody: '',
      mSelectedMemoIdx: 0,
      extractedOuterHtml: '',
      extractedInnerHtml: '',
      formData: {}
    }
  },
  methods: {
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      console.log('changeText', changeText)
      return changeText
    },
    selectMemo (index) {
      this.mSelectedMemoIdx = index
      console.log('선택된 memo???', this.mSelectedMemoIdx, this.pMemoList.content[this.mSelectedMemoIdx])
      this.memoTitle = this.pMemoList.content[this.mSelectedMemoIdx].title
      var memoList = this.pMemoList.content[index].bodyFullStr
      console.log('memoListmemoList', memoList)
      this.memoBody = this.decodeContents(memoList)
    },
    newMemo () {
      this.memoTitle = ''
      this.memoBody = ''
      // console.log('element', document.getElementsById('newMemoTab'))
      // document.getElementsById('newMemoTab').classList.add('newMemo')
    },
    saveMemo () {
      var params = {}
      params.actorList = null
      params.attachFileList = null
      params.workToDateStr = null
      params.workFromDateStr = null
      params.stickerList = null

      params.jobkindId = 'MEMO'
      params.workStatCreUserName = this.GE_USER.userDispMtext
      params.bodyFullStr = this.memoBody

      if (this.memoTitle === null || this.memoTitle === '') {
        params.title = this.memoBody
      } else {
        params.title = this.memoTitle
      }
      this.$emit('saveMemos', params)
    },
    deleteMemo (data) {
      console.log('pMemoList[mSelectedMemoIdx]', this.pMemoList.content[this.mSelectedMemoIdx])
      console.log('data', data)
      this.$emit('deleteMemo', data)
    }
  },
  watch: {
  },
  computed: {

    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
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
  /* background-color: #f5f5f5; */
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
  /* background-color: #f1f1ff; */
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
  width:25%;
  height:35px;
  line-height:33px;
  border-radius:20px 20px 0 0;
  background-color:#E7EDFF;
  border:2px solid #E7EDFF;
  color:#5f61bd !important;
  font-weight:bold;
  display:inline-block;
  text-align:center;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  padding:0 10px;
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
