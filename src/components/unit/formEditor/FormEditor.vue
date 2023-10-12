<i18n>
{
  "ko": {
    "FORM_MSG_UPDATE": "업데이트를 기다려주세요!"
  },
  "en": {
    "FORM_MSG_UPDATE": "Please wait for the update!"
  }
}
</i18n>
<template>
    <div v-if="false" ref="toolBoxRef" style="position: absolute !important; bottom: 0; left: 0; border: 1px solid #ccc; ;width: calc(100%); height: 40px;box-shadow: rgb(130 130 153 / 39%) 0px 6px 9px -5px; padding: 5px 10px;z-index: 999999; background: #FFFFFF;">
      <div class="fl h100P " style="width: 25%;">
        <p style=" color: #6768A7; float: left; line-height: 35px; margin-right: 5px; font-size: 18px; width: 100%; " @mousedown="toolBoxShowYn? clickSelectBox():''">{{ $t('FORM_TITLE_FONT') }} {{tools.ftSize}}</p>
        <div v-if="fontSelectBoxShowYn && toolBoxShowYn" style="width: 25%; position: absolute; background: #fff; min-height: 80px; left: 2px; top: -90px; border: 1px solid #ccc; border-bottom: none;">
          <div @mousedown="changeFontSize(20)" style="font-size: 20px; height: 30px;  color: #6768A7;" value="20">{{ $t('FORM_BTN_BIG') }}</div>
          <div @mousedown="changeFontSize(16)" style="font-size: 16px; height: 30px; color: #6768A7;" value="16">{{ $t('FORM_BTN_MID') }}</div>
          <div @mousedown="changeFontSize(12)" style="font-size: 12px; height: 30px; color: #6768A7;" value="12">{{ $t('FORM_BTN_SMALL') }}</div>
        </div>
      </div>
      <div   class="fl" style="display: flex; width: 45%;height: 100%; align-ite ms: center; justify-content: space-around; align-items: center;">
        <div @click="toolBoxShowYn? changeTextStyle('bold'):''" :class="tools.boldYn === true ? 'selectedStyle': ''" class="fl" style=" width: 25px; text-align: center;cursor: pointer;"><img class="w100P" src="../../../assets/images/formEditor/boldIcon.svg" alt=""></div>
        <div @click="toolBoxShowYn? changeTextStyle('italic'):''" :class="tools.italicYn === true ? 'selectedStyle': ''" class="fl" style="width: 25px; text-align: center; cursor: pointer;"><img class="w100P" src="../../../assets/images/formEditor/italicIcon.svg" alt=""></div>
        <div @click="toolBoxShowYn? changeTextStyle('underLine'):''" :class="tools.underLineYn === true ? 'selectedStyle': ''" class="fl" style="width: 25px; text-align: center; cursor: pointer;"><img class="w100P" src="../../../assets/images/formEditor/underlineIcon.svg" alt=""></div>
        <img @click="delFormCard()" src="../../../assets/images/formEditor/trashIcon.svg" class="fl" style="width: 24px; margin-left: 5px; cursor: pointer;" alt="">
      </div>
    </div>
      <div ref="eContentsWrap" id="eContentsWrap" class="fl" style="width: 100%; min-height: 250px; border: 1px solid #6768a745; border-radius: 5px; background: #ffffff; position: relative;     margin-bottom: 10rem;">
          <div class="fl" style="width: 100%; height: 100%; height: 100%;">
              <draggable id="dragCompp"  ref="editableArea" class="ghostClass" :v-model="formCardList" ghost-class="ghost" :dragging="dragging" @end="changePosTeamMenu" delay="200" handle=".movePoint">
                  <transition-group>
                      <div v-for="(value, index) in formCardList" :index="index" :class="value.type === 'text' ? 'formCardBackground': 'formLineCard'" :style="selectRow === value.targetKey? 'border: 1px solid #ccc;':''" style="position: relative; " :key="value.targetKey" :id="'formCard'+value.targetKey" class="fl formDiv commonFormCard" @click="clickForm(value, value.targetKey)">
                        <formText id="formEditText" @setMultiFile="setMultiFile" v-if="value.type === 'text'" style="" :ref="'textForm'+value.targetKey" @blurCard="blurCard"  @updateCard="updateTextCard" :inputHtml="value.innerHtml" :targetKey="value.targetKey" @success="successImgPreview"  @click="clickTextArea(index)"  contenteditable  />
                        <formImage @setMultiFile="setMultiFile" :multiFileSrc="value.multiFileSrc" v-else-if="value.type === 'image'" :ref="'imgForm'+value.targetKey" :selectFileListProp="value.selectFileList" :class="value.addYn? addTrue : '' " :targetKey="value.targetKey" @success="successImgPreview" :pSrc="value.pSrc" :pFilekey="value.pFilekey" @click="clickImg(index)"  :src="value.src" contenteditable :pasteImgYn='pasteImgYn' @pasteEnd='pasteEnd' :propSelectRow='selectRow' />
                        <formVideo v-else-if="false" />
                        <formLine v-else-if="value.type === 'line'" style="" ref="lineForm" :targetKey="value.targetKey"/>
                        <formDot v-else-if="value.type === 'dot'"  style="" ref="dotForm" :targetKey="value.targetKey"/>
                        <formBlock v-else-if="value.type === 'block'" style="" ref="blockForm" :targetKey="value.targetKey"/>
                        <div class="movePoint" style="position: absolute; width: 30px; height: 100%; display: flex; right: 0px; top: 0; align-items: center; justify-content: center; flex-shrink: 0; flex-grow: 0;background: rgba(255, 255, 255, 0.75); "><img src="../../../assets/images/formEditor/icon_formEdit_movePointer.svg" class="img-w15" style="flex-shrink: 0; flex-grow: 0" alt=""></div>
                      </div>
                  </transition-group>
              </draggable>
              <div class="mtop-1 fl w100P" style="width: 100%; min-height: 100px; display: flex;justify-content: flex-start; flex-direction: column;align-items: center; ">
                <img @click="plusBtnShowYn = true" v-if="!plusBtnShowYn" class="plusCardBtn fl" style="rotate: 45deg;" src="../../../assets/images/formEditor/icon_formEditPlus.svg" />
                <img @click="plusBtnShowYn = false" v-if="plusBtnShowYn" class="plusCardBtn fl" src="../../../assets/images/formEditor/icon_formEditPlus.svg" />
                <div v-else-if="plusBtnShowYn === false" class="plusCardBtn CWhitePurpleBgColor CLightPurpleBorderColor" style="width: 80%; display: flex;  float: left; align-items: center; justify-content: center; margin: 0 auto; min-height: 40px; padding: 6px 10px !important; background: #ccc; border-radius: 8px; margin-top: 0.5rem">
                    <div @click="addFormCard('text')"  class="CLightPurpleBorderColor" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; margin-right: 5px; display: flex; justify-content: center; align-items: center; border-right: #6768A7;"><img class="fl" src="../../../assets/images/formEditor/addText.svg" alt=""></div>
                    <div @click="addFormCard('image')"  class="CLightPurpleBorderColor" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; margin-right: 5px; display: flex; justify-content: center; align-items: center;"><img  class="fl" src="../../../assets/images/formEditor/gallery.svg" style="width: 20px;" alt=""></div>
                    <div @click="showBlockTypeYn = !showBlockTypeYn"  class="CLightPurpleBorderColor" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; margin-right: 5px; display: flex; justify-content: center; align-items: center; border-right: #6768A7;"><img class="fl" src="../../../assets/images/formEditor/borderIcon.svg" alt=""></div>
                    <div @click="addFormCard('video')"  class="CLightPurpleBorderColor" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; display: flex; justify-content: center; align-items: center;"><img  class="fl" src="../../../assets/images/formEditor/videoIcon.svg" style="width: 20px;" alt=""></div>
                </div>
                <div v-if="plusBtnShowYn === false && showBlockTypeYn === true" class="speech-bubble CLightPurpleBorderColor CWhitePurpleBgColor" style="width: 50%; background: rgba(186, 187, 215, 0.5); float: left;  height: 40px; padding: 6px 8px; display: flex; align-items: center; min-height: 40px; justify-content: center;  min-height: 40px; transform: translateX(30px); max-width:300px; min-width:150px; margin: 15px auto 1rem">
                  <div @click="addFormCard('line')"  class="CLightPurpleBorderColor" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; margin-right: 5px; display: flex; justify-content: center; align-items: center; border-right: #6768A7; "><img class="fl" style="width: 40px;" src="../../../assets/images/formEditor/dotIcon.svg" alt=""></div>
                  <div @click="addFormCard('dot')"  class="CLightPurpleBorderColor" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; margin-right: 5px;  display: flex; justify-content: center; align-items: center;"><img  class="fl" src="../../../assets/images/formEditor/strightLineIcon.svg" style="width: 40px;" alt=""></div>
                  <div @click="addFormCard('block')"  class="CLightPurpleBorderColor" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; display: flex; justify-content: center; align-items: center;"> <p class="commonBlack font12">space</p> </div>
                </div>
              </div>
          </div>
          <gConfirmPop  :confirmText='confirmText' confirmType='timeout' v-if="confirmPopShowYn" @no='confirmPopShowYn=false'  />
      </div>

</template>

<script>
// eslint-disable vue/no-unused-components
import { VueDraggableNext } from 'vue-draggable-next'
import formText from './FormText.vue'
import formImage from './FormImage.vue'
import formVideo from './FormVideo.vue'
import formBlock from './FormBlock.vue'
import formDot from './FormDotLine.vue'
import formLine from './FormLine.vue'
export default {
  mounted () {
    this.addFormCard('text')
    this.postToolBoxOption()
  },
  data () {
    return {
      lastFocus: null,
      fontSelectBoxShowYn: false,
      plusBtnShowYn: true,
      formCardList: [],
      dragging: false,
      toolBoxShowYn: false,
      tools: { boldYn: false, italicYn: false, underLineYn: false, ftSize: 16 },
      selectedCardKey: '',
      selectFile: '',
      selectFromScrollH: 50,
      selectFromOffsetTop: 0,
      previewImgUrl: '',
      selectFileList: [],
      selectRow: 0,
      progressBarList: [],
      uploadFileKeyList: [],
      uploadFileList: [],
      showBlockTypeYn: false,
      confirmText: '',
      confirmPopShowYn: false,
      formCount: 0,
      pasteImgYn: false
    }
  },
  components: {
    formText,
    formImage,
    formBlock,
    formDot,
    formLine,
    draggable: VueDraggableNext,
    formVideo
  },
  watch: {
    tools: {
      handler (value, old) {
        this.postToolBoxOption()
      },
      deep: true
    }
  },
  methods: {
    postToolBoxOption () {
      this.$emit('postToolBox', this.tools)
    },
    setFormCard (data) {
      this.formCardList = data
    },
    async changePosTeamMenu (event) {
      var oldIndex = event.oldIndex
      var newIndex = event.newIndex

      var tempList = this.formCardList
      if (oldIndex < newIndex) {
        // 선택한 값이 아래로 이동 (인덱스가 큰 쪽으로)
        tempList.splice(newIndex + 1, 0, tempList[oldIndex])
        tempList.splice(oldIndex, 1)
      } else if (oldIndex > newIndex) {
        // 선택한 값이 위로 이동 (인덱스가 작은 쪽으로)
        tempList.splice(newIndex, 0, tempList[oldIndex])
        tempList.splice(oldIndex + 1, 1)
      }
      this.formCardList = []
      this.formCardList = tempList
    },
    clickSelectBox () {
      if (this.fontSelectBoxShowYn) {
        this.fontSelectBoxShowYn = false
      } else {
        this.fontSelectBoxShowYn = true
      }
      const selection = document.getSelection && document.getSelection()
      var range1 = selection.getRangeAt(selection.rangeCount - 1)
      this.lastFocus = range1
      var thisWindow = this

      setTimeout(() => {
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(thisWindow.lastFocus)
        document.getSelection().addRange(thisWindow.lastFocus)
      }, 100)
    },
    changeFontSize (fontSize) {
      this.tools.ftSize = fontSize
      this.changeTextStyle('font')
    },
    setMultiFile (file) {
      this.addFormCard('image', file.previewImgUrl, true)
    },
    setParamInnerHtml () {
      var formCard = null
      formCard = document.querySelectorAll('#eContentsWrap .formDiv .formCard')
      var tempList = []
      for (var i = 0; i < formCard.length; i++) {
        var temp = {}
        temp.outerHtml = formCard[i].outerHTML
        temp.innerHtml = formCard[i].innerHTML
        temp.type = formCard[i].originalType
        tempList.push(temp)
      }
      this.$emit('setParamInnerHtml', tempList)
    },
    pasteEnd () {
      this.pasteImgYn = false
    },
    addFormCard (type, src, multiAddYn, pasteImgYn) {
      if (pasteImgYn !== undefined) this.pasteImgYn = pasteImgYn
      this.plusBtnShowYn = true
      this.showBlockTypeYn = false
      var formElement = {}
      formElement.type = type
      formElement.targetKey = this.formCount
      formElement.originalType = type
      this.selectedCardKey = formElement.targetKey
      this.toolBoxShowYn = true
      if (type === 'image') {
        this.toolBoxShowYn = false
        if (multiAddYn) {
          formElement.multiFileSrc = src
        } else formElement.src = src
      } else if (type === 'video') {
        this.toolBoxShowYn = false
        formElement.src = src
        this.confirmText = this.$t('FORM_MSG_UPDATE')
        this.confirmPopShowYn = true
        return false
      } else if (type === 'text') {
        if (src) {
          formElement.innerHtml = src
        }
      }

      this.formCardList.push(formElement)
      this.selectRow = formElement.targetKey
      this.resizeFormArea()
      this.formCount += 1
    },
    async successImgPreview (target) {
      target.selectFileList.targetKey = target.targetKey
      var index = this.progressBarList.findIndex(item => item.target === target.targetKey)
      if (index === -1) {
        this.progressBarList.push({ name: target.selectFileList.file.name, targetKey: target.targetKey, percentage: 0 })
      } else {
        this.progressBarList.splice(index, 1, { name: target.selectFileList.file.name, targetKey: target.targetKey, percentage: 0 })
      }

      this.toolBoxShowYn = false
      var tempList = this.uploadFileList
      var tempKeyList = this.uploadFileKeyList
      if (tempList.length > 0) {
        this.uploadFileList = []
        this.uploadFileKeyList = []

        this.uploadFileList = [
          ...tempList,
          target.selectFileList
        ]
        this.uploadFileKeyList = [
          ...tempKeyList,
          this.formCount
        ]
      } else {
        this.uploadFileList.push(target.selectFileList)
        this.uploadFileKeyList.push(this.formCount)
      }
      this.$emit('changeUploadList', target.selectFileList)
      if (this.formCardList[this.formCount] && this.formCardList[this.formCount].selectFileList) {
        this.formCardList[this.formCount].selectFileList = target.selectFileList
        this.formCardList[this.formCount].addYn = true
      } else {
        setTimeout(() => {
          if (this.formCardList[this.formCount] && this.formCardList[this.formCount].selectFileList) {
            this.formCardList[this.formCount].selectFileList = target.selectFileList
            this.formCardList[this.formCount].addYn = true
          }
        }, 200)
      }
    },
    resizeFormArea () {
      this.$refs.eContentsWrap.style.height = this.$refs.editableArea.scrollHeight
    },
    delFormCard () {
      var targetKey = this.selectRow
      for (var i = 0; i < this.formCardList.length; i++) {
        if (targetKey === this.formCardList[i].targetKey) {
          if (this.formCardList[i] !== 'text') {
            for (var f; f < this.uploadFileKeyList.length; f++) {
              if (this.uploadFileKeyList[f] === this.formCardList[i].targetKey) {
                this.uploadFileKeyList.splice(f, 1)
                this.uploadFileList.splice(f, 1)
                this.progressBarList.splice(f, 1)
                this.$emit('changeUploadList', this.uploadFileList)
              }
            }
          }
          this.formCardList.splice(i, 1)
        }
      }
    },
    clickImg (idx) {
      this.tools.boldYn = false
      this.tools.underLineYn = false
      this.tools.italicYn = false
      this.toolBoxShowYn = false
    },
    clickForm (value, idx) {
      this.selectedCardKey = idx
      this.selectRow = idx
      if (value.type === 'text') {
        this.$nextTick(() => {
          this.$refs['textForm' + idx][0].focusInput()
        })
      }
    },
    clickTextArea (idx) {
      this.tools.boldYn = false
      this.tools.underLineYn = false
      this.tools.italicYn = false
      this.toolBoxShowYn = true
      const selection = document.getSelection && document.getSelection()
      this.lastFocus = selection.getRangeAt(selection.rangeCount - 1)
      const range = selection.getRangeAt(0)
      // eslint-disable-next-line no-unused-vars
      const startOffset = range.startOffset // 텍스트 선택 시작 위치
      // eslint-disable-next-line no-unused-vars
      const end = range.endOffset
      var formList = document.getElementsByClassName('formDiv')
      this.selectFromOffsetTop = formList[idx].offsetTop
      this.selectFromScrollH = formList[idx].scrollHeight
      if (selection.baseNode.parentElement.style.fontSize === '16px') { this.tools.ftSize = '16' } else if (selection.baseNode.parentElement.style.fontSize === '12px') { this.tools.ftSize = '12' } else if (selection.baseNode.parentElement.style.fontSize === '20px') { this.tools.ftSize = '20' } else { this.tools.ftSize = '16' }
      if (selection.baseNode.parentElement.style.fontWeight === 'bold') { this.tools.boldYn = true }
      if (selection.baseNode.parentElement.style.textDecoration === 'underline') { this.tools.underLineYn = true }
      if (selection.baseNode.parentElement.style.fontStyle === 'italic') { this.tools.italicYn = true }
    },
    changeTextStyle (type) {
      const selection = document.getSelection && document.getSelection()
      const range1 = selection.getRangeAt(selection.rangeCount - 1)
      var spanWrap = document.createElement('span')
      spanWrap.appendChild(range1.extractContents())
      if (type === 'bold') {
        spanWrap.innerHTML = spanWrap.innerHTML.replaceAll('font-weight: bold;', '')
        spanWrap.innerHTML = spanWrap.innerHTML.replaceAll('font-weight: normal;', '')
        if (this.tools.boldYn === true) {
          spanWrap.setAttribute('style', 'font-weight: normal;')
          this.tools.boldYn = false
        } else {
          spanWrap.setAttribute('style', 'font-weight: bold;')
          this.tools.boldYn = true
        }
      } else if (type === 'italic') {
        spanWrap.innerHTML = spanWrap.innerHTML.replaceAll('font-style: italic;', '')
        spanWrap.innerHTML = spanWrap.innerHTML.replaceAll('font-style: normal;', '')
        if (this.tools.italicYn === true) {
          spanWrap.setAttribute('style', 'font-style: normal;')
          this.tools.italicYn = false
        } else {
          spanWrap.setAttribute('style', 'font-style: italic;')
          this.tools.italicYn = true
        }
      } else if (type === 'underLine') {
        spanWrap.innerHTML = spanWrap.innerHTML.replace('text-decoration: underline;', '')
        spanWrap.innerHTML = spanWrap.innerHTML.replace('text-decoration: none;', '')
        if (this.tools.underLineYn === true) {
          spanWrap.setAttribute('style', 'text-decoration: none;')
          this.tools.underLineYn = false
        } else {
          spanWrap.setAttribute('style', 'text-decoration: underline;')
          this.tools.underLineYn = true
        }
      } else if (type === 'font') {
        spanWrap.innerHTML = spanWrap.innerHTML.replaceAll('font-size: 16px !important;', '')
        spanWrap.innerHTML = spanWrap.innerHTML.replaceAll('font-size: 12px !important;', '')
        spanWrap.innerHTML = spanWrap.innerHTML.replaceAll('font-size: 20px !important;', '')

        spanWrap.setAttribute('style', 'font-size: ' + this.tools.ftSize + 'px !important;')

        this.fontSelectBoxShowYn = false
      }

      range1.insertNode(spanWrap)
      window.getSelection().addRange(range1)
      var nextFormText = document.getElementById('formTextArea' + this.selectedCardKey)
      if (nextFormText) nextFormText.focus()
    },
    updateTextCard (data) {
      for (var i = 0; i < this.formCardList.length; i++) {
        if (this.selectedCardKey === this.formCardList[i].targetKey) {
          this.formCardList[i].inputHtml = data.value
          this.formCardList[i].innerHtml = data.value
          break
        }
      }
    }
  }
}
</script>

<style scoped>
.plusCardBtn {
  text-align: center;
  text-align: center;
  width: 30px;
  cursor: pointer;
  height: 30px;
  color: white;
  font-size: 30px;
}
.CardTypeBox {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid #bfbfda4a;
  width: 50%;
  height: 40px;
  font-size: 14px;
  color: #BFBFDA;
  padding: 10px 10px;
  line-height: 25px ;
}
.CardTypeBox:last-child {
  border-right: none;
}
.CardTypeBox:hover {
  background: #d7d7e63f;
}
.selectedStyle {
  background: #d7d7e63f;
}
[contenteditable] {
  outline: none;
}
input:focus{
  outline: none;
}
.formCardBackground {
  display: flex;
  align-items: center;
}
.formDiv :hover {
  cursor: text;
}
.formDiv {
  width: 100%;
  min-height: 70px; background: #fff;
  cursor: pointer;
  text-align: left;
  box-shadow: 0px 0px 3px 0px #ccc;
}
.formEditorWhitePaperEffect {
  content: '';
  position: absolute;
  display: block;
  width: 50px;
  height: 50px;
  background-color: #e1e1f2;
  top: 0;
  right: 0;
}
.formLineCard {
  min-height: 35px!important;
}

.speech-bubble {
  margin-top: 10px;
  position: relative;
  background: rgba(186, 187, 215, 0.5);
  border-radius: .4em;
}
.speech-bubble:after {
  content: '';
  position: absolute;
  top: 0;
  right: 33%;
  width: 0;
  height: 0;
  border: 15px solid transparent;
  border-bottom-color: rgba(186, 187, 215, 0.5);
  border-top: 0;
  margin-left: -9px;
  margin-top: -15px;
}
</style>
