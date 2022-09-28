
<template>
    <!-- <div style="width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 2;">
        <div style="width: 500px; height: 100px; background: #FFFFFF;  border-radius: 10px; position: absolute; top: 16%; left: 40%; box-shadow: rgb(191 191 218) 0px 0px 2px 0px;">
        </div>
    </div> -->
    <!-- v-if="toolBoxShowYn" -->
    <div style="width: 100%; float: left; ">
      <div style="position: fixed; bottom: 0; left: 0; border: 1px solid #ccc; ;width: calc(100%); height: 50px;box-shadow: rgb(130 130 153 / 39%) 0px 6px 9px -5px;padding: 5px 10px;z-index: 999; background: #FFFFFF;">
          <div class="fl h-100P " style="width: 25%;">
            <p style=" color: #6768A7; float: left; line-height: 35px; margin-right: 5px; font-size: 18px; width: 100%; " @mousedown="toolBoxShowYn? clickSelectBox():''">폰트 {{this.tools.ftSize}}</p>
            <div v-if="fontSelectBoxShowYn && toolBoxShowYn" style="width: 25%; position: absolute; background: #fff; min-height: 80px; left: 2px; top: -90px; border: 1px solid #ccc; border-bottom: none;">
              <div @mousedown="changeFontSize(20)" style="font-size: 20px; height: 30px;  color: #6768A7;" value="20">큰사이즈</div>
              <div @mousedown="changeFontSize(16)" style="font-size: 16px; height: 30px; color: #6768A7;" value="16">중간사이즈</div>
              <div @mousedown="changeFontSize(12)" style="font-size: 12px; height: 30px; color: #6768A7;" value="12">작은사이즈</div>
            </div>
            <!-- <div  @mousedown="clickSelectBox" style="width: 110px; float: left; height: 100%; ">{{this.tools.ftSize}}</div> -->
            <!-- <select @mousedown="clickSelectBox" name="" @change="changeTextStyle('ftSize')" class="fl" v-model="this.tools.ftSize" :class="'fontSize'+this.tools.ftSize" id="" style="width: 100px;  margin-right: 5px; background: #FFF; height: 30px; border: none; color: #6768A7">
                <option style="font-size: 20px; color: #6768A7;" value="20">큰사이즈</option>
                <option style="font-size: 16px; color: #6768A7;" value="16">중간사이즈</option>
                <option style="font-size: 12px; color: #6768A7;" value="12">작은사이즈</option>
            </select> -->
          </div>
          <div   class="fl" style="display: flex; width: 45%;height: 100%; align-items: center; justify-content: space-around;">
            <div @click="toolBoxShowYn? changeTextStyle('bold'):''" :class="this.tools.boldYn === true ? 'selectedStyle': ''" class="fl" style=" width: 25px; text-align: center;cursor: pointer;"><img class="w-100P" src="../../../assets/images/formEditor/boldIcon.svg" alt=""></div>
            <div @click="toolBoxShowYn? changeTextStyle('italic'):''" :class="this.tools.italicYn === true ? 'selectedStyle': ''" class="fl" style="width: 25px; text-align: center; cursor: pointer;"><img class="w-100P" src="../../../assets/images/formEditor/italicIcon.svg" alt=""></div>
            <div @click="toolBoxShowYn? changeTextStyle('underLine'):''" :class="this.tools.underLineYn === true ? 'selectedStyle': ''" class="fl" style="width: 25px; text-align: center; cursor: pointer;"><img class="w-100P" src="../../../assets/images/formEditor/underlineIcon.svg" alt=""></div>
            <img @click="delFormCard()" src="../../../assets/images/formEditor/trashIcon.svg" class="fl" style="width: 24px; margin-left: 5px; cursor: pointer;" alt="">
            <!-- <img src="../../../assets/images/formEditor/addPerson.svg" @click="convertName" style="width: 23px; margin-left: 5px; margin-right: 10px; margin-top: 5px;" class="fl" alt=""> -->
          </div>
          <!-- <div class="fl" style="height: 100%; width: 30%; padding: 5px 10px 5px 5px;">
            <gBtnSmall @click="setParamInnerHtml" style="" class="fr" btnTitle="적용" />
          </div> -->
          <!-- <img @click="delFormCard()" src="../../../assets/images/formEditor/trashIcon.svg" style="position: absolute; top: 8px; right: 10px; width: 30px; cursor: pointer; z-index: 999" alt=""> -->

      </div>
      <!-- <gBtnSmall @click="setParamInnerHtml" style="position: absolute; right: 15px; top: 10px; z-index: 999;" btnTitle="적용" /> -->
      <div ref="eContentsWrap" id="eContentsWrap" style="width: 100%; height: calc(100%); min-height: 300px; border: 1px solid #6768a745; border-radius: 5px; overflow-x: hidden; background: #ffffff; position: relative; ">

          <!-- <gActiveBar :activetabProp="this.editorType" ref="activeBar" :tabList="this.activeTabList" class="mbottom-05 mtop-1" @changeTab= "changeTab" /> -->
          <div style="width: 100%; height: 100%; padding:0 10px 10px 10px; box-shadow: 0px 3px 9px 0px #ccc; min-height: 300px;border-radius: 0.5rem 0.5rem 0 0; overflow: hidden; ">
              <draggable id="dragCompp"  ref="editableArea" class="ghostClass" :v-model="formCardList" ghost-class="ghost" style="padding-top: 10px; 0" :dragging="dragging" @end="changePosTeamMenu" delay="200" handle=".movePoint">
                  <transition-group>
                          <!-- <img v-if="this.selectedCardKey === value.targetKey" @click="delFormCard(value.targetKey)" src="../../assets/images/formEditor/xIcon.svg" style="position: absolute; top: 0; right: 0; cursor: pointer; z-index: 999" alt="">
                          --><!-- position: absolute; top: var(--selectFromScrollH); left: 10px; -->
                          <!-- A9AACD -->
                          <div v-for="(value, index) in formCardList" :index="index" :class="value.type === 'text' ? 'formCardBackground': 'formLineCard'" :style="this.selectRow === value.targetKey? 'border: 2px solid #6768a7;':''" style="position: relative;margin-bottom: 2px;" :key="value.targetKey" :id="'formCard'+value.targetKey" class="formDiv mtop-05 commonFormCard" @click="clickForm(value, value.targetKey)">
                              <formText id="formEditText" @setMultiFile="setMultiFile" @inputScroll="inputScroll" v-if="value.type === 'text'" style="" :ref="'textForm'+value.targetKey" @blurCard="blurCard"  @updateCard="updateTextCard" :inputHtml="value.innerHtml" :targetKey="value.targetKey" @success="successImgPreview"  @click="clickTextArea(index)"  contenteditable  />
                              <formImage @setMultiFile="setMultiFile" :multiFileSrc="value.multiFileSrc" v-else-if="value.type === 'image'" :selectFileListProp="value.selectFileList" :class="value.addYn? addTrue : '' " :targetKey="value.targetKey" @success="successImgPreview" :pSrc="value.pSrc" :pFilekey="value.pFilekey" @click="clickImg(index)"  :src="value.src" contenteditable />
                              <formVideo v-else-if="false" />
                              <formLine v-else-if="value.type === 'line'" style="" ref="lineForm" :targetKey="value.targetKey"/>
                              <formDot v-else-if="value.type === 'dot'"  style="" ref="dotForm" :targetKey="value.targetKey"/>
                              <formBlock v-else-if="value.type === 'block'" style="" ref="blockForm" :targetKey="value.targetKey"/>
                              <div @click="moveClick(value, value.type)" class="movePoint" style="position: absolute; width: 30px; height: 100%; display: flex; right: 0px; top: 0; align-items: center; justify-content: center; flex-shrink: 0; flex-grow: 0 "><img src="../../../assets/images/formEditor/icon_formEdit_movePointer.svg" style="width: 10px !important; height:6.83px !important; flex-shrink: 0; flex-grow: 0" alt=""></div>
                              <!-- <div class="" style="position: absolute; width: 30px; right: 0; top: calc(50% - 18px); "><img src="../../../assets/images/formEditor/scroll.svg" style="width: 30px; " alt=""></div> -->
                          </div>
                          <!-- <formImage v-else-if="value.type === 'image'" @click="selectCard(value.targetKey)" @noneFile="noneFileImage"/>
                          <formLink v-else-if="value.type === 'link'" @click="selectCard(value.targetKey)"/> -->
                      <!-- </div> -->
                  </transition-group>
              </draggable>
              <div class="mtop-1" style="width: 100%; min-height: 50px; margin-bottom: 100px; ">
                <div @click="this.plusBtnShowYn = false" v-if="plusBtnShowYn" class="plusCardBtn fl" style="  float: left; width: 100%; display: flex; background: #6768a7; align-items: center; justify-content: center; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; ">+</div>
                <div v-else-if="this.plusBtnShowYn === false" class="plusCardBtn fl" style="width: 100%; display: flex;  float: left; align-items: center; justify-content: center; margin: 0 auto; min-height: 40px; ">
                    <div @click="addFormCard('text')"  class="" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; margin-right: 5px; display: flex; justify-content: center; align-items: center; border-right: #6768A7;"><img class="fl" src="../../../assets/images/formEditor/addText.svg" alt=""></div>
                    <div @click="addFormCard('image')"  class="" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; display: flex; justify-content: center; align-items: center;"><img  class="fl" src="../../../assets/images/formEditor/gallery.svg" style="width: 20px;" alt=""></div>
                    <div @click="this.showBlockTypeYn = !this.showBlockTypeYn"  class="" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; margin-right: 5px; display: flex; justify-content: center; align-items: center; border-right: #6768A7;"><img class="fl" src="../../../assets/images/formEditor/borderIcon.svg" alt=""></div>
                    <div @click="addFormCard('video')"  class="" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; display: flex; justify-content: center; align-items: center;"><img  class="fl" src="../../../assets/images/formEditor/videoIcon.svg" style="width: 20px;" alt=""></div>
                </div>
                <div v-if="this.showBlockTypeYn === true" class="speech-bubble" style="width: 100%; background: rgba(186, 187, 215, 0.5); float: left;  height: 60px; padding: 10px 10px;display: flex; align-items: center; min-height: 40px; justify-content: center; margin: 0 auto; margin-top: 25px; min-height: 40px; ">
                  <div @click="addFormCard('line')"  class="" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; margin-right: 5px; display: flex; justify-content: center; align-items: center; border-right: #6768A7; "><img class="fl" style="width: 40px;" src="../../../assets/images/formEditor/dotIcon.svg" alt=""></div>
                  <div @click="addFormCard('dot')"  class="" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; margin-right: 5px;  display: flex; justify-content: center; align-items: center;"><img  class="fl" src="../../../assets/images/formEditor/strightLineIcon.svg" style="width: 40px;" alt=""></div>
                  <div @click="addFormCard('block')"  class="" style="width: calc(100% - 2.5px); background: #FFF; border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; display: flex; justify-content: center; align-items: center;"><img  class="fl" src="../../../assets/images/formEditor/emptyBoxIcon.svg" style="width: 20px;" alt=""></div>
                </div>
              </div>
          </div>
          <gConfirmPop  :confirmText='confirmText' confirmType='timeout' v-if="confirmPopShowYn" @no='confirmPopShowYn=false'  />
          <!-- <div class="formEditorWhitePaperEffect" style="position: absolute; top:0; right:0; "></div> -->
          <!-- <p>{{formCardList}}</p> -->
          <!-- <div style="width: 50px; height: 100px; background: #FFFFFF; margin-top: 50px; margin-left: 10px; float: left; box-shadow: rgb(191 191 218) 0px 0px 2px 0px;">
                          </div> -->
      </div>
    </div>

</template>

<script>
// eslint-disable vue/no-unused-components
import { VueDraggableNext } from 'vue-draggable-next'
import formText from './Tal_formText.vue'
import formImage from './Tal_formImage.vue'
import formVideo from './Tal_formVideo.vue'
import formBlock from './Tal_formBlock.vue'
import formDot from './Tal_formDotLine.vue'
import formLine from './Tal_formLine.vue'
// import formLink from './cAd_formLink.vue'
export default {
  created () {
  },
  updated () {
  },
  mounted () {
    this.addFormCard('text')
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
      // formCardList: [{ type: 'text', targetKey: 0, originalType: 'text' }],
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
      formCount: 0
    }
  },
  components: {
    formText,
    formImage,
    // eslint-disable-next-line vue/no-unused-components
    formBlock,
    // eslint-disable-next-line vue/no-unused-components
    formDot,
    // eslint-disable-next-line vue/no-unused-components
    formLine,
    // formLink,
    draggable: VueDraggableNext,
    formVideo
  },
  computed: {
    /* toolBoxTop () {
      return {
        '--selectFromScrollH': this.selectFromScrollH + this.selectFromOffsetTop + 50 + 'px'
      }
    } */
  },
  methods: {
    moveClick (value, type) {
    },
    setFormCard (data) {
      this.formCardList = data
    },
    inputScroll (param) {
      this.$emit('inputScroll', param)
    },
    async changePosTeamMenu (event) {
      // console.log(event)
      var oldIndex = event.oldIndex
      var newIndex = event.newIndex
      // // console.log(oldIndex)
      // // console.log(newIndex)

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

      // var selectList = tempList[oldIndex]

      // var baseData = tempList.splice(newIndex, 1, selectList)
      // if (oldIndex > newIndex) {
      //   // 선택한 값이 우측으로 이동
      //   --newIndex
      // }
      // tempList.splice(newIndex, 1, ...baseData)

      // this.formEditReloadYn = await false
      // this.formCardList = await []
      // this.formCardList = await tempList
      // this.formEditReloadYn = await true

      // var teamMenuList = []
      // var menu = {}
      // var cardList = document.getElementsByClassName('commonFormCard')
      // var index = null
      // for (var s = cardList.length - 1; s >= 0; s--) {
      //   index = Number(cardList[s].getAttribute('index'))
      //   for (var i = 0; i < this.formCardList.length; i++) {
      //     if (index === i) {
      //       menu = {}
      //       menu = this.formCardList[i]
      //       // console.log(menu)
      //       teamMenuList.push(menu)
      //     }
      //   }
      // }
      // // console.log(teamMenuList)
      // this.formCardList = []
      // this.formCardList = teamMenuList
      // console.log(this.formCardList)
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
      // console.log(true)
      var formCard = null
      formCard = document.querySelectorAll('#eContentsWrap .formDiv .formCard')
      var tempList = []
      // var formCardpadding = document.querySelectorAll('#eContentsWrap .formDiv')
      for (var i = 0; i < formCard.length; i++) {
        // this.formCardList[i].outerHtml = formCard[i].outerHTML
        // this.formCardList[i].innerHtml = formCard[i].innerHTML
        // this.formCardList[i].type = formCard[i].originalType
        // console.log(formCard[i])
        var temp = {}
        temp.outerHtml = formCard[i].outerHTML
        temp.innerHtml = formCard[i].innerHTML
        temp.type = formCard[i].originalType
        tempList.push(temp)

        /*  if (formCard[i].originalType !== undefined && formCard[i].originalType !== null && formCard[i].originalType !== '' && formCard[i].originalType === 'image') {
          this.formCardList[i].type = 'image'
        } else {
          this.formCardList[i].type = 'text'
        } */
      }
      // // eslint-disable-next-line no-debugger
      // debugger
      // this.$emit('setParamInnerHtml', this.formCardList)
      this.$emit('setParamInnerHtml', tempList)
      /*
      } else if (this.viewTab === 'text') {
        var innerText = document.getElementById('innerText').innerHTML
        this.$emit('setParamInnerText', innerText)
      } */
      // this.$saveContents(param)
    },
    addFormCard (type, src, multiAddYn) {
      this.plusBtnShowYn = true
      this.showBlockTypeYn = false
      // eslint-disable-next-line no-new-object
      var formElement = new Object()
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
        // eslint-disable-next-line no-new-object
      } else if (type === 'video') {
        this.toolBoxShowYn = false
        formElement.src = src
        this.confirmText = '업데이트를 기다려주세요!'
        this.confirmPopShowYn = true
        return false
      }

      this.formCardList.push(formElement)
      this.selectRow = formElement.targetKey
      this.resizeFormArea()
      this.formCount += 1
      /* if (formElement.targetKey === 0) {
        this.selectFromScrollH = 100
      } else {
        var formList = document.getElementsByClassName('formDiv')
        this.selectFromScrollH = formList[Number(formElement.targetKey) - 1].offsetTop + formList[Number(formElement.targetKey) - 1].scrollHeight
      } */
    },
    async successImgPreview (target) {
      // await this.addFormCard('text')
      this.progressBarList.push({ name: target.selectFileList[0].file.name, target: target.targetKey, percentage: 0 })

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
      // console.log(this.uploadFileList)
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
      // console.log(value)
      this.selectedCardKey = idx
      this.selectRow = idx
      if (value.type === 'text') {
        this.$nextTick(() => {
          this.$refs['textForm' + idx][0].focusInput()
        })
      } /* else if (value.type === 'image') {
        var form = document.querySelector('#formCard' + idx)
        form.classList.add('ghost')
      } */
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
          this.formCardList[i].innerHtml = data.value
          break
        }
      }
      /* } */
    },
    allBlur () {
      this.selectedCardKey = ''
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
    }
  }
}
</script>

<style scoped>
.plusCardBtn{text-align: center;text-align: center; width: 30px; cursor: pointer; height: 30px;
color: white; font-size: 30px;
}
.plusCardBtn:hover{box-shadow: rgb(191 191 218) 0px 0px 4px 0px;}
.CardTypeBox{display: flex; justify-content: center; align-items: center; cursor: pointer; border-right: 1px solid #bfbfda4a; width: 50%; height: 40px; font-size: 14px; color: #BFBFDA; padding: 10px 10px; line-height: 25px ;}
.CardTypeBox:last-child{border-right: none;}
.CardTypeBox:hover{background: #d7d7e63f;}
.selectedStyle {background: #d7d7e63f;}
/* .selectedCardBorder { box-shadow: rgb(191 191 218) 0px 0px 2px 0px; border: 2px solid #474785; } */
[contenteditable] {
  outline: none;
}
input:focus{
  outline: none;
}
.formCardBackground{
  background-position: center!important;
  background-image: url('/resource/common/textBackground.png')!important;
  background-size: 200px!important;
  background-repeat: NO-REPEAT!important;
  background-color: #FFF!important;
}
.formDiv :hover{ cursor: text;}
.formDiv{ width: 100%; border: 1px dashed #ccc; min-height: 60px; background: #fff;  cursor: pointer;text-align: left; box-shadow: 0px 0px 3px 0px #ccc;}
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
  margin-top: 20px;
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
 border: 18px solid transparent;
 border-bottom-color: rgba(186, 187, 215, 0.5);
 border-top: 0;
 margin-left: -9px;
 margin-top: -18px;
}
</style>
