<i18n>
{
  "ko": {
  },
  "en": {
  }
}
</i18n>
<template>
    <div style="width: 100%; float: left;">
      <gConfirmPop @no="this.errorShowYn = false" confirmText='파일은 최대 10MB까지 첨부할 수 있습니다.' confirmType='timeout' v-if="errorShowYn" />
      <div @click="this.$refs.selectFileAttach.click()" class="font16 commonColor" style="display: flex; align-items: center; justify-content: center; font-weight:500; overflow: hidden; cursor: pointer; text-align: center; margin-top: 2px; position: relative; " v-if="this.targetType === 'memo'">
          <img src="../../../assets/images/common/fileIcon.svg" alt="" style="margin-right: 8px; width: 12px;">
          첨부
      </div>
      <div v-else @click="this.$refs.selectFileAttach.click()" class="font14 whiteColor attachFileBg fl" style="font-weight:500; overflow: hidden; cursor: pointer; text-align: center; padding: 2px 7px; background-color: #fff; margin-top: 2px;border-radius: 8px; position: relative; ">
        +첨부
      </div>
      <form v-if="this.targetType === 'memo'" @submit.prevent="formSubmit" class="font16 commonColor" style="position: relative; overflow: hidden; display: none; align-items: center; justify-content: center; font-weight: 500; cursor: pointer; margin-top: 2px; width: 150px;" method="post">
          <input class="attachFile" hidden type="file" title ="파일 선택"  ref="selectFileAttach" multiple accept="*" style="width: 100%; height: 25px;" id="selectFileAttach" @change="handleImageUpload"/>
      </form>
      <form v-else @submit.prevent="formSubmit" hidden class="font14 whiteColor attachFileBg fl " style="font-weight:500; overflow: hidden; cursor: pointer; text-align: center; padding: 2px 7px; background-color: #fff; margin-top: 2px;border-radius: 8px; position: relative; " method="post">
          <input class="attachFile" hidden  type="file" title ="파일 선택"  ref="selectFileAttach" multiple accept="*" style="width: 100%;" id="selectFileAttach" @change="handleImageUpload"/>
      </form>
      <div v-if="this.targetType !== 'memo' && this.sFileList.length > 0" :class="pOneLineYn? '' : 'mtop-05'" class="fl" style="width: 100%; overflow: auto;" :style="pOneLineYn? 'width: calc(100% - 55px); margin-top: 2px;': ''">
          <div :style="attachFileWidth" style="min-width: 100%; float: left; overflow: auto; white-space: nowrap;">
            <div class="CMiddleBorderColor" style="padding: 3px 10px; float: left; margin-left: 5px; height: 30px; max-width: 200px; padding-right: 25px; box-shadow: 1px 3px 3px 0px #e9e7e7; border-radius: 8px; position: relative; " v-for="(value, index) in this.sFileList" :key="index">
                <p class="CMiddleColor font15 textOverdot" style="">{{value.file.name}} ({{this.$byteConvert(value.file.size)}})</p>
                <img src="../../../assets/images/common/popup_close.png" @click="deleteFileList(value, index)" class="img-w10" style="position: absolute; right: 5px;top: 7px;" alt="">
            </div>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      selectFile: '',
      preImgUrl: null,
      sFileList: [],
      gAttachKey: 0,
      uploadCnt: 0,
      errorShowYn: false
    }
  },
  props: {
    attachTrueAddFalseList: {},
    pOneLineYn: {},
    targetType: {}
  },
  created () {
    // eslint-disable-next-line no-debugger
    debugger
    if (this.attachTrueAddFalseList && this.attachTrueAddFalseList.length > 0) {
      this.sFileList = this.attachTrueAddFalseList
      for (var i = 0; i < this.sFileList.length; i++) {
        // console.log(this.sFileList)
        this.sFileList[i].addYn = false
        this.sFileList[i].attachYn = true
        this.sFileList[i].file = { name: this.sFileList[i].fileName, size: this.sFileList[i].fileSizeKb }
      }
    }
  },
  computed: {
    attachFileWidth () {
      var minW = null
      if (this.sFileList.length > 0) {
        minW = 200 * this.sFileList.length + 20 + 'px'
      } else {
        minW = '100%'
      }
      return {
        width: minW
      }
    }
  },
  methods: {
    async handleImageUpload () {
      // eslint-disable-next-line no-debugger
      debugger
      this.selectFile = null
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1500,
        useWebWorker: true
      }
      var test = document.getElementById('selectFileAttach')
      console.log(test)
      if (this.$refs.selectFileAttach.files.length > 0) {
        this.uploadCnt = 0
        // 0 번째 파일을 가져 온다.
        for (var k = 0; k < this.$refs.selectFileAttach.files.length; k++) {
          this.selectFile = null
          this.gAttachKey += 1
          this.selectFile = this.$refs.selectFileAttach.files[k]
          let fileExt = this.selectFile.name.substring(
            this.selectFile.name.lastIndexOf('.') + 1
          )
          // 소문자로 변환
          fileExt = fileExt.toLowerCase()
          if (
            ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
          ) {
            console.log('originalFile instanceof Blob', this.selectFile instanceof Blob) // true
            console.log(`originalFile size ${this.selectFile.size / 1024 / 1024} MB`)

            try {
              this.selectFile = this.$refs.selectFileAttach.files[this.uploadCnt]
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

              console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
              // console.log(`compressedFile preview url: ${src}`) // smaller than maxSizeMB

              this.preImgUr = src
              this.selectFile = compressedFile
              this.sFileList.push({ preImgUrl: src, attachKey: this.gAttachKey, addYn: true, file: newFile })
              this.$emit('setSelectedAttachFileList', { attachYn: true, preImgUrl: src, attachKey: this.gAttachKey, addYn: true, file: newFile })
              this.uploadCnt += 1
            /* await uploadToServer(compressedFile) */ // write your own logic
            } catch (error) {
              console.log(error)
            }
          } else {
            if (this.selectFile.size > 10000000) {
              this.errorShowYn = true
              return true
            }
            // console.log('#####')
            if (!this.sFileList) {
              this.sFileList = []
            }
            // console.log(this.sFileList)
            this.sFileList.push({ fileYn: true, attachKey: this.gAttachKey, addYn: true, attachYn: true, file: this.selectFile })
            this.$emit('setSelectedAttachFileList', { attachYn: true, fileYn: true, attachKey: this.gAttachKey, addYn: true, file: this.selectFile })
          }
        }
      } else {
        // 파일을 선택하지 않았을때
        this.$emit('noneFile')
        this.selectFile = null
        this.previewImgUrl = null
      }
    },
    async previewFile () {
      this.preImgUrl = null
      // 선택된 파일이 있는가?
      if (this.$refs.selectFileAttach.files.length > 0) {
        // 0 번째 파일을 가져 온다.

        for (var k = 0; k < this.$refs.selectFileAttach.files.length; k++) {
          this.selectFile = null
          this.gAttachKey += 1
          // console.log(this.$refs.selectFileAttach.files[k])
          this.selectFile = this.$refs.selectFileAttach.files[k]

          // 마지막 . 위치를 찾고 + 1 하여 확장자 명을 가져온다.

          let fileExt = this.selectFile.name.substring(
            this.selectFile.name.lastIndexOf('.') + 1
          )
          // 소문자로 변환
          fileExt = fileExt.toLowerCase()
          if (
            ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
          ) {
            var reader = new FileReader()
            var thisthis = this
            reader.onload = async e => {
              var image = new Image()
              image.onload = async function () {
                // Resize image
                thisthis.selectFile = thisthis.$refs.selectFileAttach.files[thisthis.uploadCnt]
                var result = await thisthis.$saveFileSize(image, thisthis.selectFile)
                thisthis.preImgUr = result.path
                thisthis.selectFile = result.file
                thisthis.sFileList.push({ preImgUrl: result.path, attachKey: thisthis.gAttachKey, addYn: true, file: result.file })
                thisthis.$emit('setSelectedAttachFileList', [{ attachYn: true, preImgUrl: result.path, attachKey: thisthis.gAttachKey, addYn: true, file: result.file }])
                thisthis.uploadCnt += 1
                // editorImgResize1(canvas.toDataURL('image/png', 0.8))
                // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
              }
              image.onerror = function () {

              }
              image.src = e.target.result
              // this.preImgUrl = e.target.result
            }
            reader.readAsDataURL(this.selectFile)
            // await this.$editorImgResize(this.selectFile)
          } else {
            if (this.selectFile.size > 10000000) {
              this.errorShowYn = true
              return true
            }
            // console.log('#####')
            if (!this.sFileList) {
              this.sFileList = []
            }
            // console.log(this.sFileList)
            this.sFileList.push({ fileYn: true, attachKey: this.gAttachKey, addYn: true, attachYn: true, file: this.selectFile })
            this.$emit('setSelectedAttachFileList', [{ attachYn: true, fileYn: true, attachKey: this.gAttachKey, addYn: true, file: this.selectFile }])
          }
        }
      } else {
        this.selectFile = null
        this.preImgUrl = null
      }
      // console.log(this.sFileList)
    },
    async formSubmit () {
      if (this.sFileList.length > 0) {
        // Form 필드 생성
        var form = new FormData()

        // if (!this.sFileList.length) return

        for (var i = 0; i < this.sFileList.length; i++) {
          // var selFile = this.sFileList[i].file
          // Here we create unique key 'files[i]' in our response dict
          form.append('files[' + i + ']', this.sFileList[i].file)

          this.$axios
            .post('/uploadFile', form, {
              headers: {
                'Content-Type': 'multipart/form-data; charset: UTF-8;'
              }
            })
            .then(res => {
              this.response = res
            })
            .catch(error => {
              this.response = error
            })
        }
      } else {
        alert('파일을 선택해 주세요.')
      }
      return true
    },
    clearFileList () {
      this.sFileList = []
      this.selectFile = ''
      this.preImgUrl = null
    },
    deleteFileList (value, index) {
      this.sFileList.splice(index, 1)
      console.log(this.sFileList)
      this.$emit('delAttachFile', value)
    }
  }
}
</script>

<style scoped>
.attachFile {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100%;
    top: -10px;
    left: 0;
    font-size: 0 !important;
    /* min-height: 60px; */
    border-radius: 0px !important;
    border: none !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    padding: 0 !important;
    background: none !important;
}
</style>
