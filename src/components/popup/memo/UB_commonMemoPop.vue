<i18n>
  {
    "ko": {
      "EMPT_MSG_WRITE_COMM": "댓글을 작성해주세요.",
      "EMPT_MSG_WRITE_COMM2": "댓글을 작성해주세요.",
      "EMPT_BTN_PIC": "사진",
    },
    "en": {
      "EMPT_MSG_WRITE_COMM": "Please add a comment.",
      "EMPT_MSG_WRITE_COMM2": "Please fill in a comment.",
      "EMPT_BTN_PIC": "Picture"
    }
  }
</i18n>
<template>
  <unknownLoginPop v-if="mUnknownLoginPopYn" />
  <div class="fl w100P memoPopWrap" ref='memoPopCompo' :class="mIsDraggedYn? 'dragged':''" @drop="onDrop">
    <div v-if="meMemoData" class="fl meMemoBox">
        <p class="fl commonBlack font14" >{{$changeText(meMemoData.memo.userDispMtext || meMemoData.memo.userNameMtext)}}</p>
        <div class="fl mleft-05 mright-05 font14 commonBlack textOverdot w100P textLeft" v-html="meMemoData.memo.bodyFullStr"></div>
      <div class="cancelBtn" @click="cancel">
        <img src="../../../assets/images/common/searchXIcon.svg" alt="">
      </div>
    </div>
    <div v-if="attachTrueFileList.length > 0" class="fl mbottom-05 mtop-05 attachFileWrap" @drop="onDrop">
      <div class="fl mtop-05 attachFileBox">
        <div @wheel="horizontalScroll" id="attachFileArea" :class="mobileYn? '':'thinScrollBar'" class="attachFileArea">
          <div class="CMiddleBorderColor attachFileItem" v-for="(value, index) in  attachTrueFileList" :key="index">
              <div class="w100P fileNameArea">
                <p class="CMiddleColor font12 textOverdot">{{splitName(value.file.name)}}</p>
                <p class="CMiddleColor font12">{{splitExt(value.file.name)}}</p>
              </div>
              <img src="../../../assets/images/common/popup_close.png" @click="deleteFileList(value, index)" class="img-w10" alt="">
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="formSubmit" class="fileSubmitForm" hidden method="post">
      <input hidden class="formImageFile" multiple type="file" title ="선택" accept="image/*, image/heic"  ref="selectFile" id="input-file" @change="handleImageUpload(event)"/>
    </form>
    <div class="memoSelectedImg" v-if="mSelectedImgList && mSelectedImgList.length > 0">
        <div ref="imageBox" @wheel="horizontalScroll" id="memoSelectedImgBox" :class="mobileYn? '':'thinScrollBar'" class="fl mright-05 formCard memoSelectedImgBox">
            <div class="fl mright-05 memoSelectedImgWrap" :style="allImgWidth">
                <div class="attachImgItem" v-for="(value, index) in mSelectedImgList" :key="index">
                    <img class="editorImg" :style="{height: setImgSize(index), height: value.scrollHeight + 'px'}" :id="'addImg' + index" :class="{addTrue :  value.addYn}" :src="value.previewImgUrl" />
                    <div class="cursorP" @click="deleteSelectImgList(index)">
                        <img class="w100P fl" src="../../../assets/images/common/popup_close.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <img v-if="meMemoData !== null" src="../../../assets/images/common/icon-turn-right.svg" class="fl mright-02 turnRightIcon" alt="">
      <div class="memoInputWrap"  @dragenter="onDragenter" @dragover="onDragover" @dragleave="onDragleave">
        <div @click="toggleAttachMenu" class="attachMenuToggle">+</div>
        <pre :placeholder="$t('EMPT_MSG_WRITE_COMM')" @focus="preFocus" @keydown="inputEnterKey" id="memoTextTag" ref="memoTextTag" class="fl editableContent memoCardTextid memoTextPadding memoTextTag" :class="{width65: meMemoData !== null, CDeepBorderColor: mWatchInputData.trim() !== ''}"  contenteditable=true  @input="inputTextCheck"/>
        <img v-if="mWatchInputData.trim() !== ''" @click="saveMemo()" src="../../../assets/images/common/icon_send_on.svg" alt="" class="fl img-w25 mleft-05">
        <img v-else @click="$showToastPop($t('EMPT_MSG_WRITE_COMM2'))" src="../../../assets/images/common/icon_send_off.svg" alt="" class="fl img-w25 mleft-05">
        <div v-show="attachMenuShowYn" class="attachMenuWrap">
          <div class="font16 commonColor addImgBtn" @click.stop="addImgFile">
            <img src="../../../assets/images/common/fileType_img.svg" alt="">
            {{ $t('EMPT_BTN_PIC') }}
          </div>
          <attachFileList class="width33" @click.stop="attachMenuShowYn = false" targetType="memo" ref="attCompo" :pOneLineYn="true" @delAttachFile="delAttachFile" @setSelectedAttachFileList="setSelectedAttachFileList"/>
          <div @click.stop="toggleAttachMenu" class="font16 commonColor addImgBtn noBorder">
            <img src="../../../assets/images/common/searchXIcon.svg" alt="">
            {{ $t('COMM_BTN_CLOSE') }}
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import attachFileList from '../../../components/unit/formEditor/UB_attachFile.vue'
import unknownLoginPop from '../../pageComponents/channel/UB_unknownLoginPop.vue'
export default {
  components: {
    attachFileList,
    unknownLoginPop
  },
  data () {
    return {
      mUnknownLoginPopYn: false,
      meMemoData: null,
      mWatchInputData: '',
      mUploadFileList: [],
      mSelectedImgList: [],
      selectFile: null,
      attachMenuShowYn: false,
      mobileYn: this.$getMobileYn(),
      mIsDraggedYn: false
    }
  },
  mounted () {
    this.settingPop()
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    },
    attachTrueFileList () {
      var resultList = this.mUploadFileList.filter(item => {
        console.log(item.attachYn)
        return item.attachYn
      })
      return resultList
    },
    attachFileWidth () {
      var minW = null
      if (this.attachTrueFileList.length > 0) {
        minW = 200 * this.attachTrueFileList.length + 20 + 'px'
      } else {
        minW = '100%'
      }
      return {
        width: minW
      }
    },
    allImgWidth () {
      var imgList = this.mSelectedImgList
      var imgWidth = 0
      for (var i = 0; i < imgList.length; i++) {
        if (imgList[i].scrollWidth) { imgWidth += (Number(imgList[i].scrollWidth + 20)) }
      }
      return {
        '--width': imgWidth + 'px'
      }
    }
  },
  methods: {
    splitName (name) {
      const lastIndex = name.lastIndexOf('.')
      return name.substr(0, lastIndex)
    },
    splitExt (name) {
      const lastIndex = name.lastIndexOf('.')
      return name.substr(lastIndex)
    },
    onDragenter () {
      // class 넣기
      this.mIsDraggedYn = true
    },
    onDragleave () {
      // class 삭제
      this.mIsDraggedYn = false
    },
    onDragover (event) {
      // 드롭을 허용하도록 prevetDefault() 호출
      event.preventDefault()
    },
    onDrop (event) {
      event.preventDefault()
      this.mIsDraggedYn = false
      const files = event.dataTransfer.files
      const fileRef = this.$refs.attCompo
      if (fileRef) {
        fileRef.onDrop(files)
      }
    },
    inputEnterKey (event) {
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (event.keyCode === 13 && !isMobile && !this.nowLoadingYn) {
        if (!event.shiftKey && !event.ctrlKey) {
          event.preventDefault()
          this.saveMemo()
        } else if (event.ctrlKey) {
          const myCreHtml = this.$refs.memoTextTag.innerHTML + '<br>'
          this.$refs.memoTextTag.innerHTML = ''
          this.$refs.memoTextTag.focus()
          this.$pasteHtmlAtCaret(myCreHtml)
          this.$refs.memoTextTag.blur()
          this.$refs.memoTextTag.focus()
        }
      }
    },
    addImgFile () {
      this.$refs.selectFile.click()
      this.toggleAttachMenu()
    },
    toggleAttachMenu () {
      this.attachMenuShowYn = !this.attachMenuShowYn
    },
    setImgSize (i) {
      this.$nextTick(() => {
        var imgs = document.getElementById('addImg' + i)
        if (!imgs) return
        this.mSelectedImgList[i].scrollHeight = imgs.scrollHeight
        this.mSelectedImgList[i].scrollWidth = imgs.scrollWidth
        if (imgs) {
          console.log({
            width: imgs.scrollWidth + 'px',
            height: imgs.scrollHeight + 'px'
          })
          return 'height: ' + imgs.scrollHeight + 'px'
        }
      })
    },
    deleteSelectImgList (index) {
      this.mSelectedImgList.splice(index, 1)
    },
    async handleImageUpload (event) {
      this.selectFile = null
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1500,
        useWebWorker: true
      }

      if (this.$refs.selectFile.files && this.$refs.selectFile.files.length > 0) {
        // 0 번째 파일을 가져 온다.
        for (var k = 0; k < this.$refs.selectFile.files.length; k++) {
          this.selectFile = this.$refs.selectFile.files[k]
          let fileExt = this.selectFile.name.substring(
            this.selectFile.name.lastIndexOf('.') + 1
          )
          // 소문자로 변환
          fileExt = fileExt.toLowerCase()
          if (
            ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
          ) {
            console.log(this.selectFile)
            console.log('originalFile instanceof Blob', this.selectFile instanceof Blob) // true
            console.log(`originalFile size ${this.selectFile.size / 1024 / 1024} MB`)

            try {
              const compressedFile = await this.$imageCompression(this.selectFile, options)
              console.log(compressedFile)
              console.log('compressedFile instanceof Blob', compressedFile instanceof Blob) // true
              var src = null
              if (compressedFile instanceof Blob) {
                src = await this.$imageCompression.getDataUrlFromFile(compressedFile)
                const decodImg = atob(src.split(',')[1])
                const array = []
                for (let i = 0; i < decodImg.length; i++) {
                  array.push(decodImg.charCodeAt(i))
                }
                const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
                var newFile = new File([Bfile], compressedFile.name)
              } else {
                src = await this.$imageCompression.getDataUrlFromFile(compressedFile)
              }

              console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB

              this.mSelectedImgList.push({ previewImgUrl: src, addYn: true, file: newFile, attachYn: false })
              console.log(this.mSelectedImgList)
            } catch (error) {
              console.log(error)
            }
          }
        }
      } else {
        // 파일을 선택하지 않았을때
        this.selectFile = null
      }
    },
    async formSubmit () {
      if (this.mUploadFileList.length > 0) {
        // Form 필드 생성
        var form = new FormData()
        for (var i = 0; i < this.mUploadFileList.length; i++) {
          form = new FormData()
          form.append('files[0]', (this.mUploadFileList[i]).file)
          await this.$axios
          // 파일서버 fileServer fileserver FileServer Fileserver
            .post('https://unibuzzy.com/file/tp.uploadFile', form,
              {
                headers: {
                  'Content-Type': 'multipart/form-data; charset: UTF-8;'
                }
              })
            .then(res => {
              if (res.data.length > 0) {
                if (this.mUploadFileList[i].attachYn === true) {
                  this.mUploadFileList[i].attachYn = true
                } else {
                }
                var path = res.data[0].domainPath + res.data[0].pathMtext
                this.mUploadFileList[i].successSave = true
                this.mUploadFileList[i].filePath = path
                this.mUploadFileList[i].fileSizeKb = res.data[0].fileSizeKb
                this.mUploadFileList[i].fileKey = res.data[0].fileKey
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      } else {
        this.$showToastPop('Please select a file.')
      }
      return true
    },
    setSelectedAttachFileList (sFile) {
      if (sFile.addYn === true) {
        this.mUploadFileList.push(sFile)
      }
      console.log(this.mUploadFileList)
    },
    delAttachFile (dFile) {
      if (dFile.addYn) {
        for (var d = 0; d < this.mUploadFileList.length; d++) {
          if (this.mUploadFileList[d].attachYn === true && this.mUploadFileList[d].attachKey === dFile.attachKey) {
            this.mUploadFileList.splice(d, 1)
          }
        }
      } else {
        this.delAddFalseFileList.push(dFile)
      }
    },
    inputTextCheck (e) {
      this.mWatchInputData = e.target.innerText
    },
    preFocus () {
      if (this.$checkMobile() === 'IOS') {
        this.$emit('writeMemoScrollMove')
        this.$nextTick(() => {
          this.$refs.memoPopCompo.style.position = 'fixed'
          this.$refs.memoPopCompo.style.bottom = 0
        })
      }
    },
    clearMemo () {
      this.meMemoData = null
      this.mUploadFileList = []
      this.mSelectedImgList = []
      this.$refs.memoTextTag.innerText = ''
      this.$refs.attCompo.clearFileList()
    },
    settingPop () {
      document.querySelector('#memoTextTag').addEventListener('paste', (e) => {
        e.preventDefault()
        var textData = (e.originalEvent || e).clipboardData.getData('Text')
        document.execCommand('insertHTML', false, textData)
      })
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
                this.cancel()
              }
            }
          } catch (error) {
          }
        }
      })
    },
    cancel () {
      this.meMemoData = null
      this.$emit('clearMemoObj')
    },
    async saveMemo () {
      if (this.GE_USER.unknownYn) {
        this.mUnknownLoginPopYn = true
        return
      }
      this.$refs.memoTextTag.blur()
      var inputMemoArea = window.document.getElementById('memoTextTag')

      var regText = JSON.parse(JSON.stringify(inputMemoArea.innerText))

      if (regText.trim() !== '') {
        if (this.mSelectedImgList.length > 0) {
          this.mUploadFileList = [
            ...this.mUploadFileList,
            ...this.mSelectedImgList
          ]
        }
        if (this.mUploadFileList.length > 0) {
          await this.formSubmit()
        }
        this.$showAxiosLoading(true)
        inputMemoArea.classList.remove('memoTextPadding')
        var html = inputMemoArea.innerHTML
        html = this.$findUrlChangeAtag(html)
        var param = {}
        param.saveMemoHtml = html
        if (this.mUploadFileList) {
          var attachFileList = []
          var fileObj = {}
          for (var i = 0; i < this.mUploadFileList.length; i++) {
            var file = this.mUploadFileList[i]
            fileObj = {}
            fileObj.fileKey = file.fileKey
            fileObj.fileSizeKb = file.fileSizeKb
            fileObj.filePath = file.filePath
            fileObj.attachYn = file.attachYn
            fileObj.addYn = file.addYn
            attachFileList.push(fileObj)
          }
          param.attachFileList = attachFileList
        }
        this.$emit('saveMemoText', param)
        inputMemoArea.classList.add('memoTextPadding')
      } else {
        this.$showToastPop('Please enter the comments.')
      }
    },
    deleteFileList (value, index) {
      console.log(this.sFileList)
      this.$refs.attCompo.deleteFileList(value, index)
      this.delAttachFile(value)
    },
    horizontalScroll (e) {
      if (e.deltaY === 0) return
      e.preventDefault()
      var channelWrap = document.querySelector(`#${e.currentTarget.id}`)
      channelWrap.scrollTo({
        left: channelWrap.scrollLeft + e.deltaY / 10
      })
    },
    setMememo (mememo) {
      var myCreHtml = null
      myCreHtml = '<span id="parentNameCard" style="padding:0 5px; border-radius: 10px;" class="parentNameCard CLightBgColor" @click="findmememoMemo(parentKey' + mememo.memo.memoKey + ')"  id="parentKey' + mememo.memo.memoKey + '">'
      myCreHtml += '@' + this.$changeText(mememo.memo.userDispMtext)
      myCreHtml += '</span> '
      this.$nextTick(() => {
        try {
          this.$refs.memoTextTag.innerHTML = ''
          this.$refs.memoTextTag.focus()
          this.$pasteHtmlAtCaret(myCreHtml)
          this.$refs.memoTextTag.blur()
          this.$refs.memoTextTag.focus()
        } catch (error) {
          console.log(error)
        }
      })
    }
  }
}
</script>

<style scoped>
.width65 {
  width: calc(100% - 65px) !important;
}
span.label.highlight {
  background: #E1ECF4;
  border: 1px dotted #39739d;
}

.memoCardTextid:empty:before {
  content: attr(placeholder);
  color:#AFAFAF;
}
.memoPopWrap {
  position: fixed;
  bottom: 0;
  min-height: 50px;
  background: #fff;
  padding: 0.5rem 20px;
  padding-top: 10px;
  box-shadow: 0px -2px 3px 0px #eee;
}
.meMemoBox {
  width: calc(100% - 20px);
  min-height: 30px;
  margin: 0 10px 10px 10px;
  border-radius: 5px;
  background-color: #dddddd90;
  padding: 0.5rem 1rem;
  position: relative;
}
.cancelBtn {
  width:20px;
  position: absolute;
  top:0.2rem;
  right:0.5rem;
}
.cancelBtn > img {
  width: 50%;
}
.attachFileWrap {
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 30px;
}
.attachFileBox {
  width: 100%;
  overflow: hidden;
  margin-top: 2px;
}
.attachFileArea {
  width: 100%;
  float: left;
  overflow: auto;
  display: flex;
}
.attachFileItem {
  padding: 3px 10px;
  float: left;
  margin-right: 5px;
  height: 30px;
  max-width: 200px;
  padding-right: 25px;
  box-shadow: 1px 3px 3px 0px #e9e7e7;
  border-radius: 8px;
  position: relative;
}
.attachFileItem > img {
  position: absolute;
  right: 5px;
  top: 7px;
}
.fileSubmitForm {
  overflow: hidden;
  width: 100%;
  cursor: pointer;
  height: 300px;
  position: relative;
}
.memoSelectedImg {
  overflow: hidden;
  border: 1px solid rgb(167, 167, 167);
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
  cursor: pointer;
  max-height: 300px;
  position: relative;
}
.memoSelectedImgBox {
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;
}
.memoSelectedImgWrap {
  height: 100%;
  width: var(--width);
}
.attachImgItem {
  float: left;
  height: 100%;
  position: relative;
}
.attachImgItem > img {
  min-height: 80px;
  max-height: 300px;
}
.attachImgItem > div {
  position: absolute;
  height: 25px;
  border-radius: 100%;
  background: #FFF;
  padding: 5px;
  right: 5px;
  top: 5px;
  box-shadow: 0 0 4px 4px #00000030;
  width: 25px;
}
.turnRightIcon {
  width:20px;
  line-height: 80px;
  margin-top: 1rem;
}
.memoInputWrap {
  width: 100%;
  display: flex;
  align-items: center;
  float: left;
  flex-wrap: wrap;
}
.attachMenuToggle {
  position: relative;
  width: 40px;
  height: 40px;
  margin-right: 8px;
  border-radius: 5px;
  background: #dcddeb;
  float: left;
  font-size: 30px;
  color: #FFF;
  font-weight: bold;
  line-height: 40px;
}
.memoTextTag {
  width: calc(100% - 81px);
  min-height: 2.5rem;
  text-align: left;
  float: left;
  resize: none;
  border-radius: 10px;
  border: 1px solid #a7a7a7;
}
.attachMenuWrap {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}
.addImgBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
  margin-top: 2px;
  width: 33%;
  border-right: 1px solid #eee;
}
.addImgBtn > img {
  margin-right: 8px;
  width: 12px;
}
.noBorder {
  border: 0;
}
.width33 {
  width: 33% !important;
}
.dragged {
  border: 2px dashed rgb(33, 63, 143) !important;
}
.fileNameArea {
  display: flex;
  align-items: center;
}
.fileNameArea > p:first-child {
  max-width: calc(100% - 30px);
}
.fileNameArea > p:last-child {
  width: 30px;
}
</style>
