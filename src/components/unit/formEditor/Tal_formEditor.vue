<template>
    <!-- <div style="width: 100%; height: 100%; position: fixed; left: 0; top: 0; z-index: 2;">
        <div style="width: 500px; height: 100px; background: #FFFFFF;  border-radius: 10px; position: absolute; top: 16%; left: 40%; box-shadow: rgb(191 191 218) 0px 0px 2px 0px;">
        </div>
    </div> -->
    <div style="position: fixed; left: 0; bottom: 0; display: flex; align-items: center; border: 1px solid #ccc; ;width: calc(100%); height: 50px;box-shadow: rgb(130 130 153 / 39%) 0px 6px 9px -5px;padding: 5px 5px;z-index: 999; background: #FFFFFF;">
        <div v-if="toolBoxShowYn">
          <span style=" color: #6768A7; float: left; margin-right: 5px; font-size: 18px;">폰트 |</span>
          <div v-if="fontSelectBoxShowYn" style="width: 110px; position: absolute; background: #fff; min-height: 80px; left: 45px; top: -90px; border: 1px solid #ccc; border-bottom: none;">
            <div @mousedown="changeFontSize(20)" style="font-size: 20px; height: 30px;  color: #6768A7;" value="20">큰사이즈</div>
            <div @mousedown="changeFontSize(16)" style="font-size: 16px; height: 30px; color: #6768A7;" value="16">중간사이즈</div>
            <div @mousedown="changeFontSize(12)" style="font-size: 12px; height: 30px; color: #6768A7;" value="12">작은사이즈</div>
          </div>
          <div  @mousedown="clickSelectBox" style="width: 110px; float: left; height: 100%; ">{{this.tools.ftSize}}</div>
          <!-- <select @mousedown="clickSelectBox" name="" @change="changeTextStyle('ftSize')" class="fl" v-model="this.tools.ftSize" :class="'fontSize'+this.tools.ftSize" id="" style="width: 100px;  margin-right: 5px; background: #FFF; height: 30px; border: none; color: #6768A7">
              <option style="font-size: 20px; color: #6768A7;" value="20">큰사이즈</option>
              <option style="font-size: 16px; color: #6768A7;" value="16">중간사이즈</option>
              <option style="font-size: 12px; color: #6768A7;" value="12">작은사이즈</option>
          </select> -->
          <div @click="changeTextStyle('bold')" :class="this.tools.boldYn === true ? 'selectedStyle': ''" class="fl" style="width: 25px;text-align: center;cursor: pointer;"><img class="w-60P" src="../../../assets/images/formEditor/boldFormatIcon.svg" alt=""></div>
          <div @click="changeTextStyle('italic')" :class="this.tools.italicYn === true ? 'selectedStyle': ''" class="fl" style="width: 30px; padding-top: 2px; text-align: center; cursor: pointer;"><img class="w-100P" src="../../../assets/images/formEditor/italic.svg" alt=""></div>
          <div @click="changeTextStyle('underLine')" :class="this.tools.underLineYn === true ? 'selectedStyle': ''" class="fl" style="width: 28px;text-align: center; padding-top: 2px; cursor: pointer;"><img class="w-90P" src="../../../assets/images/formEditor/underlineIcon.svg" alt=""></div>
          <img src="../../../assets/images/formEditor/addPerson.svg" @click="convertName" style="width: 23px; margin-left: 5px; margin-right: 10px; margin-top: 5px;" class="fr" alt="">
        </div>
        <img @click="delFormCard()" src="../../../assets/images/formEditor/trashIcon.svg" style="position: absolute; top: 8px; right: 10px; width: 30px; cursor: pointer; z-index: 999" alt="">
    </div>
    <gBtnSmall @click="setParamInnerHtml" style="position: fixed; right: 15px; top: 10px; z-index: 999;" btnTitle="적용" />
    <div ref="eContentsWrap" id="eContentsWrap" style="width: 100%; margin-top: 50px; height: calc(100% - 60px); padding: 0 10px; overflow: scroll; overflow-x: hidden; background: #f1f1f1; position: relative;">
        <!-- <gActiveBar :activetabProp="this.editorType" ref="activeBar" :tabList="this.activeTabList" class="mbottom-05 mtop-1" @changeTab= "changeTab" /> -->
        <div style="">
            <draggable  ref="editableArea" class="ghostClass" :v-model="formCradList" ghost-class="ghost" style="padding-top: 10px; 0" :dragging="dragging">
                <transition-group>
                        <!-- <img v-if="this.selectedCardKey === value.targetKey" @click="delFormCard(value.targetKey)" src="../../assets/images/formEditor/xIcon.svg" style="position: absolute; top: 0; right: 0; cursor: pointer; z-index: 999" alt="">
                        --><!-- position: fixed; top: var(--selectFromScrollH); left: 10px; -->
                        <div v-for="(value, index) in formCardList" style="position: relative;margin-bottom: 2px;background-position: center;background-image: url('/resource/common/textBackground.png');background-size: 200px;background-repeat: NO-REPEAT;background-color: #FFF;" :key="value.targetKey" :id="'formCard'+value.targetKey" class="formDiv">
                            <formText v-if="value.type === 'text'" ref="textForm" @blurCard="blurCard"  @updateCard="updateTextCard" :inputHtml="value.innerHtml" :targetKey="index" @click="clickTextArea(index)"  contenteditable= true  />
                            <formImage :selectFileListProp="value.selectFileList" :targetKey="index" @success="successImgPreview" v-else-if="value.type === 'image'" :pSrc="value.pSrc"   @click="clickImg(index)"  :src="value.src" contenteditable= true />
                            <div style="position: absolute; width: 30px; right: 0; top: calc(50% - 18px); "><img src="../../../assets/images/formEditor/scroll.svg" style="width: 30px; " alt=""></div>
                        </div>
                        <!-- <formImage v-else-if="value.type === 'image'" @click="selectCard(value.targetKey)" @noneFile="noneFileImage"/>
                        <formLink v-else-if="value.type === 'link'" @click="selectCard(value.targetKey)"/> -->
                    <!-- </div> -->
                </transition-group>
            </draggable>
            <div style="width: 100%; min-height: 50px; margin-bottom: 100px;">
              <div @click="this.plusBtnShowYn =false" v-if="plusBtnShowYn" class="plusCardBtn fl" style="width: 100%; display: flex; background: #FFF; align-items: center; justify-content: center; margin: 0 auto;height: 30px; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px;">+</div>
                <div v-else class="plusCardBtn fl" style="width: 100%; display: flex; align-items: center; justify-content: center; margin: 0 auto;height: 30px; ">
                    <div @click="addFormCard('text')"  class="" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 30px; margin-right: 5px; display: flex; justify-content: center; align-items: center; border-right: #6768A7;"><img class="fl" src="../../../assets/images/formEditor/addText.svg" alt=""></div>
                    <div @click="addFormCard('image')"  class="" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 30px; display: flex; justify-content: center; align-items: center;"><img  class="fl" src="../../../assets/images/formEditor/gallery.svg" style="width: 20px;" alt=""></div>
                </div>
            </div>
        </div>
        <!-- <p>{{formCardList}}</p> -->
        <!-- <div style="width: 50px; height: 100px; background: #FFFFFF; margin-top: 50px; margin-left: 10px; float: left; box-shadow: rgb(191 191 218) 0px 0px 2px 0px;">
                        </div> -->
    </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next'
import formText from './Tal_formText.vue'
import formImage from './Tal_formImage.vue'
// import formLink from './cAd_formLink.vue'
export default {
  created () {
    // this.$refs.activeBar.switchtab(1)
    this.formCardList = [{ type: 'text', targetKey: 0 }]
    if (this.propFormData !== undefined && this.propFormData !== null && this.propFormData !== [] && this.propFormData !== '' && this.propFormData.length > 0) {
      console.log('zzzzzzzzzzzzzzzz' + this.propFormData)
      this.formCardList = this.propFormData
    }
  },
  mounted () {
  },
  props: {
    propFormData: {},
    editorType: {}
  },
  data () {
    return {
      lastFocus: null,
      editableAreaHeight: 500,
      fontSelectBoxShowYn: false,
      enabled: true,
      myArray: [{ type: 'text', targetKey: 0, model0: '' }],
      plusBtnShowYn: true,
      formCardList: [{ type: 'text', targetKey: 0 }],
      dragging: false,
      toolBoxShowYn: false,
      tools: { boldYn: false, italicYn: false, underLineYn: false, ftSize: 16 },
      selectedCardKey: '',
      selectFile: '',
      selectFromScrollH: 50,
      selectFromOffsetTop: 0,
      previewImgUrl: '',
      selectFileList: [],
      selectRow: 0
    }
  },
  components: {
    formText,
    formImage,
    // formLink,
    draggable: VueDraggableNext
  },
  computed: {
    /* toolBoxTop () {
      return {
        '--selectFromScrollH': this.selectFromScrollH + this.selectFromOffsetTop + 50 + 'px'
      }
    } */
  },
  methods: {
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
    setParamInnerHtml () {
      var formCard = document.querySelectorAll('.formDiv .formCard')

      for (var i = 0; i < formCard.length; i++) {
        this.formCardList[i].outerHtml = formCard[i].outerHTML
        this.formCardList[i].innerHtml = formCard[i].innerHTML
        if (formCard[i].originalType !== undefined && formCard[i].originalType !== null && formCard[i].originalType !== '' && formCard[i].originalType === 'image') {
          this.formCardList[i].type = 'image'
        } else {
          this.formCardList[i].type = 'text'
        }
      }
      this.$emit('setParamInnerHtml', this.formCardList)
      /*
      } else if (this.viewTab === 'text') {
        var innerText = document.getElementById('innerText').innerHTML
        this.$emit('setParamInnerText', innerText)
      } */
      // this.$saveContents(param)
    },
    addFormCard (type, src) {
      this.plusBtnShowYn = true
      this.plusBtnShowYn = true
      // eslint-disable-next-line no-new-object
      var formElement = new Object()
      formElement.type = type
      formElement.targetKey = this.formCardList.length
      this.selectedCardKey = formElement.targetKey
      this.toolBoxShowYn = true
      if (type === 'image') {
        this.toolBoxShowYn = false
        // eslint-disable-next-line no-new-object
        formElement.src = src
      }
      this.formCardList.push(formElement)
      this.resizeFormArea()
      /* if (formElement.targetKey === 0) {
        this.selectFromScrollH = 100
      } else {
        var formList = document.getElementsByClassName('formDiv')
        this.selectFromScrollH = formList[Number(formElement.targetKey) - 1].offsetTop + formList[Number(formElement.targetKey) - 1].scrollHeight
      } */
    },
    async successImgPreview (target) {
      // await this.addFormCard('text')
      this.toolBoxShowYn = false
      this.formCardList[target.targetKey].selectFileList = target.selectFileList
    },
    /* addFormCard2 (type, src) {
      const selection = document.getSelection()
      var formIndex = selection.extentNode.parentElement.attributes.formidx.value
      this.plusBtnShowYn = true
      // eslint-disable-next-line no-new-object
      var formElement = new Object()
      formElement.type = type
      formElement.targetKey = this.formCardList.length
      this.toolBoxShowYn = true
      if (type === 'image') {
        // eslint-disable-next-line no-new-object
        formElement.src = src
      }
      this.formCardList.push(formElement)
      this.resizeFormArea()
      if (formElement.targetKey === 0) {
        this.selectFromScrollH = 100
      }
      var formList = document.getElementsByClassName('formDiv')

      this.selectFromScrollH = formList[Number(formElement.targetKey) - 1].offsetTop + formList[Number(formElement.targetKey) - 1].scrollHeight
    }, */
    resizeFormArea () {
      this.$refs.eContentsWrap.style.height = this.$refs.editableArea.scrollHeight
    },
    delFormCard () {
      var targetKey = this.selectRow
      for (var i = 0; i < this.formCardList.length; i++) {
        if (targetKey === this.formCardList[i].targetKey) {
          this.formCardList.splice(i, 1)
        }
      }
    },
    clickImg (idx) {
      this.tools.boldYn = false
      this.selectRow = idx
      this.tools.underLineYn = false
      this.tools.italicYn = false
      this.toolBoxShowYn = false
    },
    clickTextArea (idx) {
      this.selectedCardKey = idx
      this.selectRow = idx
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
      // window.getSelection().removeAllRanges()
      var spanWrap = document.createElement('span')
      /* if (this.lastFocus === range1) {
      } */
      spanWrap.appendChild(range1.extractContents())
      // spanWrap.setAttribute('style', 'float: left;')
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
        spanWrap.innerHTML = spanWrap.innerHTML.replace('text-decoration: normal;', '')
        if (this.tools.underLineYn === true) {
          spanWrap.setAttribute('style', 'text-decoration: none;')
          this.tools.underLineYn = false
        } else {
          spanWrap.setAttribute('style', 'text-decoration: underline;')
          this.tools.underLineYn = true
        }
      } else if (type === 'font') {
        spanWrap.innerHTML = spanWrap.outerHTML.replaceAll('font-size: 16px;', '')
        spanWrap.innerHTML = spanWrap.outerHTML.replaceAll('font-size: 12px;', '')
        spanWrap.innerHTML = spanWrap.outerHTML.replaceAll('font-size: 20px;', '')

        spanWrap.setAttribute('style', 'font-size: ' + this.tools.ftSize + 'px')

        this.fontSelectBoxShowYn = false
      }
      // this.$refs.textForm.inputResize()
      /* } */

      range1.insertNode(spanWrap)
      window.getSelection().addRange(range1)
      document.getElementById('formTextArea' + this.selectedCardKey).focus()
    },

    async convertName () {
      const selection = document.getSelection && document.getSelection()
      const range1 = selection.getRangeAt(selection.rangeCount - 1)
      // window.getSelection().removeAllRanges()

      var spanWrap = document.createElement('span')
      range1.extractContents()
      var innerHtml = ''
      innerHtml += '<img src="/resource/common/userName.png" style="width: 100px;">'

      spanWrap.innerHTML = innerHtml
      await range1.insertNode(spanWrap)
      window.getSelection().addRange(range1)
      window.getSelection().removeAllRanges()
      // this.$refs.textForm.focus()
    },

    updateTextCard (data) {
      /* if (data.type === 'goBlur') {
        this.selectedCardKey = ''
      } else { */
      for (var i = 0; i < this.formCardList.length; i++) {
        if (this.selectedCardKey === this.formCardList[i].targetKey) {
          this.formCardList[i].inputHtml = data.value
          break
        }
      }
      /* } */
    },
    allBlur () {
      this.selectedCardKey = ''
    },
    async formSubmit () {
      if (this.selectFileList.length > 0) {
        // Form 필드 생성
        var form = new FormData()

        // if (!this.selectFileList.length) return

        for (var i = 0; i < this.selectFileList.length; i++) {
          // var selFile = this.selectFileList[i].file
          // Here we create unique key 'files[i]' in our response dict
          form.append('files[' + i + ']', this.selectFileList[i].file)
        }
        this.isUploading = true

        this.$axios
          .post('/uploadFile', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            this.response = res
            this.isUploading = false
          })
          .catch(error => {
            this.response = error
            this.isUploading = false
          })
      } else {
        alert('파일을 선택해 주세요.')
      }
      return true
    },
    openSelectFilePop () {
      this.$refs.selectFile.click()
    },
    previewFile () {
      this.selectFile = null
      this.previewImgUrl = null
      // 선택된 파일이 있는가?
      if (this.$refs.selectFile.files.length > 0) {
        // 0 번째 파일을 가져 온다.

        for (var k = 0; k < this.$refs.selectFile.files.length; k++) {
          this.selectFile = this.$refs.selectFile.files[k]
          // 마지막 . 위치를 찾고 + 1 하여 확장자 명을 가져온다.
          let fileExt = this.selectFile.name.substring(
            this.selectFile.name.lastIndexOf('.') + 1
          )
          // 소문자로 변환
          fileExt = fileExt.toLowerCase()
          if (
            ['jpeg', 'jpg', 'png', 'gif', 'bmp'].includes(fileExt)
          ) {
          // FileReader 를 활용하여 파일을 읽는다
            var reader = new FileReader()
            reader.onload = e => {
              var sel = window.getSelection()
              // eslint-disable-next-line no-unused-vars
              var range = sel.getRangeAt(0)
              this.addFormCard('image', e.target.result)
              // this.previewImgUrl = e.target.result
              /* this.addFormCard('image', e.target.result)
              var sel = window.getSelection()
              var range = sel.getRangeAt(0)

              var insertNode = document.createElement('img') // img 객체 생성
              insertNode.setAttribute("src",e.target.result) // 생성한 img 에 src 경로 추가
              range.insertNode(insertNode)
 */

              // this.selectFileList.push({ previewImgUrl: this.previewImgUrl, file: this.selectFile })
              // this.$emit('updateImgForm', this.previewImgUrl)
              setTimeout(() => {
                // this.cardHeight = this.$refs.imageBox.scrollHeight
              }, 10)
            }
            reader.readAsDataURL(this.selectFile)
          }
        }
      } else {
        // 파일을 선택하지 않았을때
        this.$emit('noneFile')
        this.selectFile = null
        this.previewImgUrl = null
      }
      console.log(this.selectFileList)
    }
  }
}
</script>

<style scoped>
.plusCardBtn{text-align: center;text-align: center; width: 30px; cursor: pointer; height: 30px;
}
.plusCardBtn:hover{box-shadow: rgb(191 191 218) 0px 0px 4px 0px;}
.CardTypeBox{display: flex; justify-content: center; align-items: center; cursor: pointer; border-right: 1px solid #bfbfda4a; width: 50%; height: 40px; font-size: 14px; color: #BFBFDA; padding: 10px 10px; line-height: 25px ;}
.CardTypeBox:last-child{border-right: none;}
.CardTypeBox:hover{background: #d7d7e63f;}
.selectedStyle {background: #d7d7e63f;}
/* .selectedCardBorder { box-shadow: rgb(191 191 218) 0px 0px 2px 0px; border: 2px solid #474785; } */
[contenteditable=true] {
  outline: none;
}
input:focus{
  outline: none;
}
.formDiv :hover{ cursor: text;}
.formDiv{ width: 100%; border: 1px solid #6768a745; min-height: 46px; background: #fff;  cursor: pointer;text-align: left;}
</style>
