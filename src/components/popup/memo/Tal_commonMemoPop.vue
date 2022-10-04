<template>
    <div style="width: calc(100% ; border-radius: 15px 15px 0 0; left: 0px; min-height: 80px; padding: 15px 10px; box-shadow: 0 0 9px 4px #00000036; position: absolute; z-index: 999; bottom: 0; background: #fff;">
      <div v-if="meMemoData !== null"  class="fl" style="width: calc(100% - 20px);min-height: 30px; margin: 0 10px 10px 10px; border-radius: 5px; background-color: #dddddd90; padding: 0.5rem 1rem; position: relative;" >
        <!-- <div class="w-100P fl"> -->
          <p class="fl commonBlack font14" >{{this.$changeText(meMemoData.memo.userDispMtext || meMemoData.memo.userNameMtext)}}</p>
          <!-- <p class="fl mleft-05 mright-05" style="text-align: left;" >{{meMemoData.memo.bodyMinStr}}</p> -->
          <div class="fl mleft-05 mright-05 font14 commonBlack" style="text-align: left;" v-html="meMemoData.memo.bodyFullStr"></div>
        <!-- </div> -->
        <div style="width:20px;  position: absolute; top:0.2rem; right:0.5rem" @click="cancel">
          <img src="../../../assets/images/common/searchXIcon.svg" style="width:50%;" alt="">
        </div>

      </div>

      <img v-if="meMemoData !== null" src="../../../assets/images/common/icon-turn-right.svg" style="width:20px; line-height: 80px; margin-top: 1rem" class="fl mright-02" alt="">
      <!-- <textarea id="memoTextTag" class="fl" :class="{width65: meMemoData !== null}" style="width: calc(100% - 45px); height: 100%; float: left; border: 1px solid #ccc; resize: none;" v-model="memoText" name="" cols="30" ></textarea> -->
      <pre id="memoTextTag" ref="memoTextTag" class="fl editableContent" :class="{width65: meMemoData !== null}" style="width: calc(100% - 45px); min-height:3rem; text-align:left; float: left; border: 1px solid #ccc; resize: none;"  contenteditable=true ></pre>
      <img @click="saveMemo" src="../../../assets/images/formEditor/addComment.svg" style="width: 40px; float: right; margin-top: 5px;" alt="" class="fl">
    </div>

</template>

<script>
// eslint-disable-next-line
export default {
  props: {
    mememo: {}
  },
  created () {

  },
  data () {
    return {
      memoText: '',
      meMemoData: null
    }
  },
  mounted () {
    document.querySelector('#memoTextTag').addEventListener('paste', (e) => {
      e.preventDefault()
      var textData = (e.originalEvent || e).clipboardData.getData('Text')
      document.execCommand('insertHTML', false, textData)
    })
    this.$refs.memoTextTag.focus()
    if (this.mememo) this.setMememo()

    document.querySelector('#memoTextTag').addEventListener('keydown', (event) => {
      var keycode = event.keyCode
      // alert(keycode)
      if (keycode === 8 || keycode === 46) {
        // console.log(keycode)
        try {
          var s = window.getSelection()
          var r = s.getRangeAt(0)
          var el = r.startContainer.parentElement
          // // console.log('#########################')
          // // console.log(el.classList)
          // // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!')
          // Check if the current element is the .label
          if (el.classList.contains('parentNameCard')) {
            // Check if we are exactly at the end of the .label element
            // // console.log('r.startOffset : ' + r.startOffset)
            // // console.log('r.endOffset : ' + r.endOffset)
            // // console.log('rel.textContent.length : ' + el.textContent.length)
            if (r.startOffset === r.endOffset && r.endOffset === el.textContent.length) {
              // prevent the default delete behavior
              event.preventDefault()
              el.remove()
            }
          }
        } catch (error) {
          // alert(error)
        }
      }
    })
  },
  methods: {
    setMememo () {
      this.meMemoData = this.mememo
      // console.log(this.meMemoData)
      var myCreHtml = null
      myCreHtml = '<span style="padding:0 5px; border-radius: 10px;" class="parentNameCard fl CLightBgColor" @click="findmememoMemo(parentKey' + this.meMemoData.memo.memoKey + ')"  id="parentKey' + this.meMemoData.memo.memoKey + '">'
      // myCreHtml += '<p class="font14 fl">'
      myCreHtml += '@' + this.$changeText(this.meMemoData.memo.userDispMtext || this.meMemoData.memo.userNameMtext)
      // myCreHtml += '</p>'
      myCreHtml += '</span> '
      this.$nextTick(() => {
        try {
          this.$refs.memoTextTag.focus()
          this.$pasteHtmlAtCaret(myCreHtml)
        } catch (error) {
          // console.log(error)
        }
      })
    },
    cancel () {
      this.meMemoData = null
      this.$emit('mememoCancel')
    },
    saveMemo () {
      // document.getElementById('memoTextTag').contentEditable = false
      var inputMemoArea = document.getElementById('memoTextTag')
      var regText = inputMemoArea.innerText
      if (regText.trim() !== '') {
        var html = inputMemoArea.innerHTML
        html = this.$findUrlChangeAtag(html)
        this.$emit('saveMemoText', html)
      } else {
        this.$showToastPop('댓글의 내용을 입력해주세요.')
      }
    }
  }
}
</script>

<style scoped>
.width65{
width: calc(100% - 65px) !important;

}
span.label.highlight {
    background: #E1ECF4;
    border: 1px dotted #39739d;
}

</style>
