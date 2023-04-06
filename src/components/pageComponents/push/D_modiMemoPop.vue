<template>
    <div style="border-radius: 0.8rem; box-shadow: 0 0 4px 4px #00000026; width: calc(100% - 40px); height: 350px; position: fixed; background: #FFF; z-index: 100; top: 10%; left: 20px;">
        <div class="newHeaderLine" style="width: 100%; height: 50px; float: left; position: relative; padding: 0 20px; display: flex; align-items: center;">
            <p class="textLeft fl font20 fontBold commonColor">댓글 수정</p>
            <img @click="backClick" src="../../../assets/images/common/popup_close.png" style="position: absolute; right: 20px; top: 15px; width: 20px;" alt="">
        </div>
        <div style="width: 100%; height: calc(100% - 100px);float: left; padding: 10px 20px;">
            <pre contenteditable style="display:inline-block; outline: none; width: calc(100%); border-radius: 5px; height: 100%; border: 1px solid #ccc; word-break: break-all; " autofocus ref="formTextArea" id="memoModiInput" class="" ></pre>
        </div>
        <div style="width: 100%; height: 50px; float: left; display: flex; justify-content: center; align-items: center">
            <gBtnSmall btnTitle="수정" @click="updateMemo" class="mright-05"/>
            <gBtnSmall btnThema="light" @click="backClick" btnTitle="닫기"/>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    pMemoEle: {},
    propContDetail: {}
  },
  data () {
    return {
      mMemoEle: this.pMemoEle ? this.pMemoEle : { bodyFullStr: '' },
      popId: null
    }
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'modiMemoPop' + history.length
    // console.log(history)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)

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
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.$emit('closeXPop')
      }
    },
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1) {
          data.push(current)
        }
        data = data.sort(function (a, b) { // num으로 오름차순 정렬
          return b.memoKey - a.memoKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    },
    async updateMemo () {
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
        var result = await this.$commonAxiosFunction({
          url: 'https://mo.d-alim.com:9443/service/tp.saveMemo',
          param: { memo: memo }
        })
        if (result.data.result) {
          var contDetail = this.propContDetail
          var newArr = [
            ...result.data.resultList.memoList,
            ...contDetail.D_MEMO_LIST
          ]
          contDetail.D_MEMO_LIST = this.replaceArr(newArr)
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [contDetail])
          this.backClick()
        }
        console.log(result)
      } catch (error) {
        console.error(error)
      }
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  }
}
</script>
<style scoped>
pre #parentNameCard {
    display: none;
}
</style>
