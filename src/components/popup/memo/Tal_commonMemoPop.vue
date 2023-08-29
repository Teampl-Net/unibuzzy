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
  <div class="fl w100P" ref='memoPopCompo' style="position: absolute; bottom: 0; min-height: 50px; background: #fff; padding: 0.5rem 20px; padding-top: 10px; box-shadow: 0px -2px 3px 0px #eee;">
    <div v-if="meMemoData"  class="fl" style="width: calc(100% - 20px);min-height: 30px; margin: 0 10px 10px 10px; border-radius: 5px; background-color: #dddddd90; padding: 0.5rem 1rem; position: relative;" >
        <p class="fl commonBlack font14" >{{this.$changeText(meMemoData.memo.userDispMtext || meMemoData.memo.userNameMtext)}}</p>
        <div class="fl mleft-05 mright-05 font14 commonBlack textOverdot w100P" style="text-align: left;" v-html="meMemoData.memo.bodyFullStr"></div>
      <div style="width:20px;  position: absolute; top:0.2rem; right:0.5rem" @click="cancel">
        <img src="../../../assets/images/common/searchXIcon.svg" style="width:50%;" alt="">
      </div>

    </div>
    <div v-if="this.attachTrueFileList.length > 0" style="width: calc(100%); display: flex; align-items: center; min-height: 30px; " class="fl mbottom-05 mtop-05">
      <div v-if="this.attachTrueFileList.length > 0" class="fl mtop-05" style="width: 100%; overflow: auto; width: calc(100% - 55px); margin-top: 2px;">
        <div :style="attachFileWidth" style="min-width: 100%; float: left; overflow: auto; white-space: nowrap;">
          <div class="CMiddleBorderColor" style="padding: 3px 10px; float: left; margin-right: 5px; height: 30px; max-width: 200px; padding-right: 25px; box-shadow: 1px 3px 3px 0px #e9e7e7; border-radius: 8px; position: relative; " v-for="(value, index) in  attachTrueFileList" :key="index">
              <p class="CMiddleColor font15 textOverdot" style="">{{value.file.name}} ({{this.$byteConvert(value.file.size)}})</p>
              <img src="../../../assets/images/common/popup_close.png" @click="deleteFileList(value, index)" class="img-w10" style="position: absolute; right: 5px;top: 7px;" alt="">
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="formSubmit" hidden style="overflow: hidden; width: 100%; cursor: pointer; height: 300px; position: relative; " method="post">
            <!-- <div v-if="mSelectedImgList.length === 0" style="cursor: pointer; background: #FFF; width: calc(100%); min-height: 70px; height: 100%;display: flex; font-size: 14px;color: rgb(103, 104, 167);justify-content: center;align-items: center;">
                <img  class="fl" src="../../../assets/images/formEditor/gallery_gray.svg" style="width: 20px;"  alt="">
            </div> -->
            <!-- <input hidden class="formImageFile" multiple type="file" title ="선택" accept="image/jpeg, image/png, image/jpg, image/heic"  ref="selectFile" id="input-file" @change="handleImageUpload(event)"/> -->
            <input hidden class="formImageFile" multiple type="file" title ="선택" accept="image/*, image/heic"  ref="selectFile" id="input-file" @change="handleImageUpload(event)"/>
            <!-- <button  class="whiteBtn mright-1" type="submit" :disabled="isUploading">업로드</button> -->
    </form>
    <div v-if="mSelectedImgList && mSelectedImgList.length > 0" style="overflow: hidden; border: 1px solid rgb(167, 167, 167); border-radius: 10px; padding: 8px; margin-bottom: 10px;  width: 100%; cursor: pointer; max-height: 300px; position: relative; " >
        <div v-if="mSelectedImgList && mSelectedImgList.length > 0"  ref="imageBox" class="fl mright-05 formCard" style="position: relative;overflow: scroll hidden; width: 100%; height: calc(100%)">
            <div class="fl mright-05" :style="allImgWidth" style="height:100%; width: var(--width)" >
                <div style="float: left; height: 100%; position: relative;" v-for="(value, index) in mSelectedImgList" :key="index">
                    <img class="editorImg" :style="{height: setImgSize(index), height: value.scrollHeight + 'px'}" style="min-height: 80px; max-height: 300px;" :id="'addImg' + index" :class="{addTrue :  value.addYn}" :src="value.previewImgUrl" />
                    <div class="cursorP" @click="deleteSelectImgList(index)" style="position: absolute; height: 25px; border-radius: 100%; background: #FFF; padding: 5px; right: 5px; top: 5px; box-shadow: 0 0 4px 4px #00000030; width: 25px;" >
                        <img style="width: 100%; float: left;" src="../../../assets/images/common/popup_close.png" alt="">
                    </div>
                </div>
                <!-- <span @click="deleteFile(index)" style="position: absolute; top: 0; right: 7px; cursor: pointer;">x</span> -->
            </div>
        </div><!-- mSelectedImgList : {{ mSelectedImgList }} -->
    </div>
    <img v-if="meMemoData !== null" src="../../../assets/images/common/icon-turn-right.svg" style="width:20px; line-height: 80px; margin-top: 1rem" class="fl mright-02" alt="">

    <!-- <div class="fl CDeepBorderColor" style="min-height:2.5rem; width: 100%; border-radius: 10px; position: relative;"> -->
      <div style="width: 100%; display: flex; align-items: center; float: left; flex-wrap: wrap;">
        <div @click="toggleAttachMenu" style="position: relative; width: 40px; height: 40px; margin-right: 8px; border-radius: 5px; background: #dcddeb; float: left; font-size: 30px;color: #FFF; font-weight: bold">+</div>
        <pre :placeholder="$t('EMPT_MSG_WRITE_COMM')" @focus="test" @keydown="inputEnterKey" id="memoTextTag" ref="memoTextTag" class="fl editableContent memoCardTextid memoTextPadding " :class="{width65: meMemoData !== null, CDeepBorderColor: mWatchInputData.trim() !== ''}" style="width:calc(100% - 81px); min-height:2.5rem; text-align:left; float: left; resize: none; border-radius: 10px; border: 1px solid #a7a7a7"  contenteditable=true  @input="inputTextCheck"/>
        <!-- <div style="width: 30px; height: 100%;"> -->
        <img v-if="mWatchInputData.trim() !== ''" @click="saveMemo()" src="../../../assets/images/common/icon_send_on.svg" alt="" class="fl img-w25 mleft-05">
        <img v-else @click="$showToastPop(this.$t('EMPT_MSG_WRITE_COMM2'))" src="../../../assets/images/common/icon_send_off.svg" alt="" class="fl img-w25 mleft-05">
        <div v-show="attachMenuShowYn" style="width: 100%; height: 50px; display: flex; align-items: center;">
          <div class="font16 commonColor" @click.stop="addImgFile" style="display: flex; align-items: center; justify-content: center; font-weight: 500; cursor: pointer; margin-top: 2px; width: 33%; border-right: 1px solid #eee;">
            <img src="../../../assets/images/common/fileType_img.svg" alt="" style="margin-right: 8px; width: 12px;">
            {{ $t('EMPT_BTN_PIC') }}
          </div>
          <attachFileList @click.stop="attachMenuShowYn = false" targetType="memo" ref="attCompo" style="width: calc(33%);" :pOneLineYn="true" @delAttachFile="delAttachFile" @setSelectedAttachFileList="setSelectedAttachFileList"/>
          <div @click.stop="toggleAttachMenu" class="font16 commonColor" style="display: flex; align-items: center; justify-content: center; font-weight: 500; cursor: pointer; margin-top: 2px; width: 33%;">
            <img src="../../../assets/images/common/searchXIcon.svg" alt="" style="margin-right: 8px; width: 12px;">
            {{ $t('COMM_BTN_CLOSE') }}
          </div>
        </div>
      </div>
      <!-- </div> -->
    <!-- </div> -->
    <!-- <div style="width: 100%; height: 100%; position: flex; top: 0; left: 0; background: #00000026; z-index: 98;"></div>
    <transition name="showUp">
        <div style="width: 100%; height: 100px; position: fixed; bottom: 0; background: #FFF; z-index: 99; border-radius: 10px 10px 0 0; box-shadow: 0 0 4px 4px #00000030; left: 0;">
            <div></div>
        </div>
    </transition> -->
  </div>
</template>

<script>
import attachFileList from '../../../components/unit/formEditor/Tal_attachFile.vue'
import unknownLoginPop from '../../pageComponents/channel/D_unknownLoginPop.vue'
export default {
  props: {
    mememo: {},
    resetMemoYn: {},
    writeMemoTempData: {}
  },
  components: {
    attachFileList,
    unknownLoginPop
  },
  data () {
    return {
      mUnknownLoginPopYn: false,
      memoText: '',
      meMemoData: null,
      okResetYn: false,
      mWatchInputData: '',
      mUploadFileList: [],
      mSelectedImgList: [],
      selectFile: null,
      attachMenuShowYn: false,
      firstEnterYn: false
    }
  },
  updated () {
    // this.settingPop()
  },
  mounted () {
    this.settingPop()
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
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
        console.log(imgWidth)
        if (imgList[i].scrollWidth) { imgWidth += (Number(imgList[i].scrollWidth + 20)) }
      }
      return {
        '--width': imgWidth + 'px'
      }
    }
  },
  methods: {
    inputEnterKey (event) {
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (event.keyCode === 13 && !isMobile && !this.nowLoadingYn) {
        if (!event.shiftKey && !event.ctrlKey) {
          event.preventDefault()
          this.saveMemo()
        } else if (event.ctrlKey) {
          var myCreHtml = null
          // eslint-disable-next-line no-useless-escape
          myCreHtml = this.$refs.memoTextTag.innerHTML + '<br>'
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
        // var filesYn = this.$refs.selectFile.files.length > 1
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
            // eslint-disable-next-line no-undef
              var compressedFile = await this.$imageCompression(this.selectFile, options)
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

              // var image = new Image()
              // image.src = src

              // image.onload = function () {
              //   // Resize image
              //   console.log(image.width + ' // ' + image.height)
              // }

              console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
              // console.log(`compressedFile preview url: ${src}`) // smaller than maxSizeMB
              /* var imageBox = document.createElement('img')
              var divBox = document.createElement('div')
              imageBox.src = src
              divBox.style.width = '100%'
              divBox.style.height = '100%'
              divBox.id = 'sizeDiv'
              divBox.append(imageBox)
              this.$refs.memoPopCompo.append(divBox)
              var sizeDiv = document.getElementById('sizeDiv')
              // divBox.style.display = 'none'
              var imgHeight = divBox.scrollHeight
              this.$refs.memoPopCompo.remove(sizeDiv) */
              this.mSelectedImgList.push({ previewImgUrl: src, addYn: true, file: newFile, attachYn: false })
              console.log(this.mSelectedImgList)
              // this.mUploadFileList.push({ mSelectedImgList: { previewImgUrl: src, originalFile: this.selectFile, addYn: true, file: newFile }, originalType: 'image' })
              /* await uploadToServer(compressedFile) */ // write your own logic
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
      // eslint-disable-next-line no-debugger
      debugger
      if (this.mUploadFileList.length > 0) {
        // Form 필드 생성
        // if (!this.mSelectedImgList.length) return
        var form = new FormData()
        for (var i = 0; i < this.mUploadFileList.length; i++) {
          // var selFile = this.mSelectedImgList[i].file
          form = new FormData()
          form.append('files[0]', (this.mUploadFileList[i]).file)
          await this.$axios
          // 파일서버 fileServer fileserver FileServer Fileserver
            .post('https://unibuzzy.com/file/tp.uploadFile', form,
              /* {
                onUploadProgress: (progressEvent) => {
                  var percentage = (progressEvent.loaded * 100) / progressEvent.total
                  thisthis.uploadFileList[i].percentage = Math.round(percentage)
                }
              }, */
              {
                headers: {
                  'Content-Type': 'multipart/form-data; charset: UTF-8;'
                }
              })
            .then(res => {
              console.log(res)
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
              // this.response = error
              // this.isUploading = false
            })
        }
      } else {
        alert('파일을 선택해 주세요.')
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
      // eslint-disable-next-line no-debugger
      debugger
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
    test () {
      if (this.$checkMobile() === 'IOS') {
        this.$emit('writeMemoScrollMove')
        this.$nextTick(() => {
          this.$refs.memoPopCompo.style.position = 'fixed'
          this.$refs.memoPopCompo.style.bottom = 0
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
      // // this.$refs.memoTextTag.focus()
      // if (this.writeMemoTempData !== undefined && this.writeMemoTempData !== null && this.writeMemoTempData !== '' && this.writeMemoTempData !== {}) {
      //   this.setMemoData(this.writeMemoTempData)
      // } else {
      //   if (this.mememo) this.setMememo()
      // }
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
                // this.$emit('clearMemoObj')
              }
            }
          } catch (error) {
          }
        }
      })
      // this.$refs.memoTextTag.focus()
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
    setMememo (mememo) {
      console.log(mememo)
      var myCreHtml = null
      myCreHtml = '<span id="parentNameCard" style="padding:0 5px; border-radius: 10px;" class="parentNameCard CLightBgColor" @click="findmememoMemo(parentKey' + mememo.memo.memoKey + ')"  id="parentKey' + mememo.memo.memoKey + '">'
      myCreHtml += '@' + this.$changeText(mememo.memo.userDispMtext)
      myCreHtml += '</span> '
      this.$nextTick(() => {
        try {
          // var spanTag = document.querySelectorAll('#memoTextTag .parentNameCard')
          this.$refs.memoTextTag.innerHTML = ''
          // 20221230 수민삭제
          /* for (var i = 0; i < spanTag.length; i++) {
            this.$refs.memoTextTag.innerText.leftTrim()
            spanTag[i].remove()
          } */
          // this.$refs.memoTextTag.append(myCreHtml)
          this.$refs.memoTextTag.focus()
          this.$pasteHtmlAtCaret(myCreHtml)
          this.$refs.memoTextTag.blur()
          this.$refs.memoTextTag.focus()
        } catch (error) {
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
        // html = this.$deleteEmoji(html)
        this.$emit('saveMemoText', param)
        inputMemoArea.classList.add('memoTextPadding')
      } else {
        this.$showToastPop('댓글의 내용을 입력해주세요.')
      }
    },
    deleteFileList (value, index) {
      console.log(this.sFileList)
      this.$refs.attCompo.deleteFileList(value, index)
      this.delAttachFile(value)
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

.memoCardTextid:empty:before{
  content: attr(placeholder);
  color:#AFAFAF;
}
</style>
