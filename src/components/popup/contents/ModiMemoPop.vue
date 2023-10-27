<template>
  <div class="modiMemoWrap">
    <div class="newHeaderLine modiMemoHeader">
      <p class="textLeft fl font20 fontBold commonColor">
        {{ $t('COMM_TITLE_COMMENT_EDIT2') }}
      </p>
      <img
        @click="backClick"
        src="@/assets/images/common/popup_close.png"
        alt=""
      />
    </div>
    <div class="modiMemoCont">
      <pre
        contenteditable
        autofocus
        ref="formTextArea"
        id="memoModiInput"
        class=""
      ></pre>
    </div>
    <div class="modiMemoFooter">
      <gBtnSmall
        :btnTitle="$t('COMM_BTN_EDIT2')"
        @click="updateMemo"
        class="mright-05"
      />
      <gBtnSmall
        btnThema="light"
        @click="backClick"
        :btnTitle="$t('COMM_BTN_CLOSE')"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pMemoEle: {},
    propContDetail: {},
    pSetUpdateMemo: Function,
    pClosePop: Function
  },
  data() {
    return {
      mMemoEle: this.pMemoEle ? this.pMemoEle : { bodyFullStr: '' },
      popId: null
    }
  },
  created() {
    var history = this.$store.getters['UB_HISTORY/hStack']
    this.popId = 'modiMemoPop' + history.length
    history.push(this.popId)
    this.$store.commit('UB_HISTORY/updateStack', history)

    this.$nextTick(() => {
      if (this.$refs.formTextArea && this.mMemoEle.bodyFullStr) {
        this.$refs.formTextArea.innerHTML = this.mMemoEle.bodyFullStr
        var pSticker = document.getElementById('parentNameCard')
        if (pSticker) {
          pSticker.style.display = 'none'
        }
      }
    })
  },
  methods: {
    backClick() {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', hStack)
        this.pClosePop()
      }
    },
    replaceArr(arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (
          data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1
        ) {
          data.push(current)
        }
        data = data.sort(function (a, b) {
          return b.memoKey - a.memoKey
        })
        return data
      }, [])
      return uniqueArr
    },
    async updateMemo() {
      var inputMemoArea = this.$refs.formTextArea
      if (inputMemoArea.innerText === this.pMemoEle.bodyFullStr) {
        return
      }
      if (!this.mMemoEle.memoKey) {
        return
      }
      var pSticker = document.getElementById('parentNameCard')
      if (pSticker) {
        pSticker.style.display = 'inline'
      }
      var memo = {}
      try {
        memo.targetKey = this.mMemoEle.targetKey
        memo.memoKey = this.mMemoEle.memoKey
        memo.bodyFullStr = inputMemoArea.innerHTML
        memo.bodyMinStr = inputMemoArea.innerHTML
        if (this.pSetUpdateMemo) {
          this.pSetUpdateMemo(memo)
        } else {
          var result = await this.$commonAxiosFunction({
            url: '/tp.saveMemo',
            param: { memo: memo }
          })
          if (result && result.data && result.data.result) {
            var contDetail = this.propContDetail
            var newArr = [
              ...result.data.resultList.memoList,
              ...contDetail.D_MEMO_LIST
            ]
            contDetail.D_MEMO_LIST = this.replaceArr(newArr)
            this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', [contDetail])
            this.backClick()
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  computed: {
    historyStack() {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    pageUpdate() {
      return this.$store.getters['UB_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate(value, old) {
      this.backClick()
    }
  }
}
</script>
<style scoped>
pre #parentNameCard {
  display: none;
}
.modiMemoWrap {
  border-radius: 0.8rem;
  box-shadow: 0 0 4px 4px #00000026;
  width: calc(100% - 40px);
  height: 350px;
  position: fixed;
  background: #fff;
  z-index: 100;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}
.modiMemoHeader {
  width: 100%;
  height: 50px;
  float: left;
  position: relative;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
.modiMemoHeader > img {
  position: absolute;
  right: 20px;
  top: 15px;
  width: 20px;
}
.modiMemoCont {
  width: 100%;
  height: calc(100% - 100px);
  float: left;
  padding: 10px 20px;
}
.modiMemoCont > pre {
  display: inline-block;
  outline: none;
  width: 100%;
  border-radius: 5px;
  height: 100%;
  border: 1px solid #ccc;
  word-break: break-all;
}
.modiMemoFooter {
  width: 100%;
  height: 50px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
