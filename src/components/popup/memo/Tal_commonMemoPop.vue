<template>
    <div class="fl w-100P" ref='memoPopCompo' style="min-height: 50px; background: #fff; padding: 0.5rem 1.5rem; box-shadow: 0px -2px 3px 0px #eee;">
      <div v-if="meMemoData"  class="fl" style="width: calc(100% - 20px);min-height: 30px; margin: 0 10px 10px 10px; border-radius: 5px; background-color: #dddddd90; padding: 0.5rem 1rem; position: relative;" >
          <p class="fl commonBlack font14" >{{this.$changeText(meMemoData.memo.userDispMtext || meMemoData.memo.userNameMtext)}}</p>
          <div class="fl mleft-05 mright-05 font14 commonBlack textOverdot w-100P" style="text-align: left;" v-html="meMemoData.memo.bodyFullStr"></div>
        <div style="width:20px;  position: absolute; top:0.2rem; right:0.5rem" @click="cancel">
          <img src="../../../assets/images/common/searchXIcon.svg" style="width:50%;" alt="">
        </div>

      </div>

      <img v-if="meMemoData !== null" src="../../../assets/images/common/icon-turn-right.svg" style="width:20px; line-height: 80px; margin-top: 1rem" class="fl mright-02" alt="">

      <div class="fl" style="min-height:2.5rem; width: 100%; border-radius: 10px; border: 1px solid #5C5C5C; position: relative;">
        <pre id="memoTextTag" ref="memoTextTag" class="fl editableContent" :class="{width65: meMemoData !== null}" style="width:calc(100% - 50px); min-height:2.5rem; text-align:left; float: left; resize: none;"  contenteditable=true />
        <div style="position: absolute; right:1rem; width: 30px; height: 100%; display: flex;">
          <img @click="saveMemo" src="../../../assets/images/common/icon_send.svg" alt="" class="fl img-w35">
        </div>
      </div>
    </div>
</template>

<script>
// eslint-disable-next-line
export default {
  props: {
    mememo: {},
    resetMemoYn: {},
    writeMemoTempData: {}
  },

  data () {
    return {
      memoText: '',
      meMemoData: null,
      okResetYn: false
    }
  },
  updated () {
    this.settingPop()
  },
  mounted () {
    this.settingPop()
  },
  methods: {
    test () {
      if (this.$checkMobile() === 'IOS') {
        var this_ = this
        this.$nextTick(() => {
          this_.$refs.memoPopCompo.style.position = 'absolute'
        })
      }
    },
    getMemoData () {
      return this.$refs.memoTextTag.innerHTML
    },
    setMemoData (data) {
      this.$refs.memoTextTag.focus()
      this.$pasteHtmlAtCaret(data)
    },
    clearMemo () {
      this.meMemoData = null
      this.$refs.memoTextTag.innerText = ''
    },
    settingPop () {
      document.querySelector('#memoTextTag').addEventListener('paste', (e) => {
        e.preventDefault()
        var textData = (e.originalEvent || e).clipboardData.getData('Text')
        document.execCommand('insertHTML', false, textData)
      })
      // this.$refs.memoTextTag.focus()
      if (this.writeMemoTempData !== undefined && this.writeMemoTempData !== null && this.writeMemoTempData !== '' && this.writeMemoTempData !== {}) {
        this.setMemoData(this.writeMemoTempData)
      } else {
        if (this.mememo) this.setMememo()
      }
      document.querySelector('#memoTextTag').addEventListener('keydown', (event) => {
        var keycode = event.keyCode
        if (keycode === 8 || keycode === 46) {
          try {
            var s = window.getSelection()
            var r = s.getRangeAt(0)
            var el = r.startContainer.parentElement
            if (el.classList.contains('parentNameCard')) {
              if (r.startOffset === r.endOffset && r.endOffset === el.textContent.length) {
                event.preventDefault()
                el.remove()
              }
            }
          } catch (error) {
          // alert(error)
          }
        }
      })
      this.$refs.memoTextTag.focus()
    },
    textReSize (text) {
      var returnT = text
      // eslint-disable-next-line no-debugger
      debugger
      if (text.length >= 20) {
        returnT = text.substring(0, 64) + '..'
      } else {
        returnT = text.substring(0, 64)
      }
      return returnT
    },
    setMememo () {
      this.meMemoData = this.mememo
      console.log(this.meMemoData)
      var myCreHtml = null
      myCreHtml = '<span id="parentNameCard" style="padding:0 5px; border-radius: 10px;" class="parentNameCard CLightBgColor" @click="findmememoMemo(parentKey' + this.meMemoData.memo.memoKey + ')"  id="parentKey' + this.meMemoData.memo.memoKey + '">'
      myCreHtml += '@' + this.$changeText(this.meMemoData.memo.userDispMtext || this.meMemoData.memo.userNameMtext)
      myCreHtml += '</span> '
      this.$nextTick(() => {
        try {
          this.$refs.memoTextTag.focus()
          console.log(myCreHtml)
          var spanTag = document.querySelectorAll('#memoTextTag .parentNameCard')
          for (var i = 0; i < spanTag.length; i++) {
            spanTag[i].remove()
          }
          this.$pasteHtmlAtCaret(myCreHtml)
        } catch (error) {
        }
      })
    },
    cancel () {
      this.meMemoData = null
      this.$emit('mememoCancel')
    },
    saveMemo () {
      // var inputMemoArea = document.getElementById('memoTextTag')
      var inputMemoArea = this.$refs.memoTextTag
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
