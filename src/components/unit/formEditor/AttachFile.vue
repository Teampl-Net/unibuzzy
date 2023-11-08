<i18n>
{
  "ko": {
    "FORM_BTN_ATTACH": "첨부",
    "FORM_MSG_MAX": "파일은 최대 10MB까지 첨부할 수 있습니다.",
    "FORM_BTN_SELECT": "파일 선택",
    "FORM_MSG_SELECT_FILE": "파일을 선택해 주세요."
  },
  "en": {
    "FORM_BTN_ATTACH": "Attach",
    "FORM_MSG_MAX": "Files can be attached up to 10MB.",
    "FORM_BTN_SELECT": "Select Files",
    "FORM_MSG_SELECT_FILE": "Please select a file."
  }
}
</i18n>
<template>
  <div class="w100P fl">
    <gConfirmPop
      @no="errorShowYn = false"
      :confirmText="$t('FORM_MSG_MAX')"
      confirmType="timeout"
      v-if="errorShowYn"
    />
    <div
      @click="$refs.selectFileAttach.click()"
      class="font16 commonColor attachBtnMemo"
      v-if="targetType === 'memo'"
    >
      <img src="../../../assets/images/common/fileIcon.svg" alt="" />
      {{ $t('FORM_BTN_ATTACH') }}
    </div>
    <div
      v-else
      @click="$refs.selectFileAttach.click()"
      class="font14 whiteColor attachFileBg fl attachBtn"
    >
      +{{ $t('FORM_BTN_ATTACH') }}
    </div>
    <form
      v-if="targetType === 'memo'"
      @submit.prevent="formSubmit"
      class="font16 commonColor formWrapMemo"
      method="post"
    >
      <input
        class="attachFile"
        hidden
        type="file"
        :title="$t('FORM_BTN_SELECT')"
        ref="selectFileAttach"
        multiple
        accept="*"
        id="selectFileAttach"
        @change="handleImageUpload"
      />
    </form>
    <form
      v-else
      @submit.prevent="formSubmit"
      hidden
      class="font14 whiteColor attachFileBg fl formWrap"
      method="post"
    >
      <input
        class="attachFile w100P"
        hidden
        type="file"
        :title="$t('FORM_BTN_SELECT')"
        ref="selectFileAttach"
        multiple
        accept="*"
        id="selectFileAttach"
        @change="handleImageUpload"
      />
    </form>
    <div
      v-if="targetType !== 'memo' && sFileList.length > 0"
      :class="pOneLineYn ? '' : 'mtop-05'"
      class="fl w100P scrollOn"
      :style="pOneLineYn ? 'width: calc(100% - 55px); margin-top: 2px;' : ''"
    >
      <div :style="attachFileWidth" class="attachFileBox">
        <div
          class="CMiddleBorderColor attachFileItem"
          v-for="(value, index) in sFileList"
          :key="index"
        >
          <div class="w100P fileNameArea">
            <p class="CMiddleColor font12 textOverdot">
              {{ splitName(value.file.name) }}
            </p>
            <p class="CMiddleColor font12">{{ splitExt(value.file.name) }}</p>
          </div>
          <img
            src="../../../assets/images/common/popup_close.png"
            @click="deleteFileList(value, index)"
            class="img-w10"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectFile: '',
      preImgUrl: null,
      sFileList: [],
      gAttachKey: 0,
      uploadCnt: 0,
      errorShowYn: false,
      mIsDraggedYn: false
    }
  },
  props: {
    attachTrueAddFalseList: {},
    pOneLineYn: {},
    targetType: {}
  },
  watch: {
    attachTrueAddFalseList: {
      immediate: true,
      handler (val) {
        if (val && val.length > 0) {
          if (val !== this.sFileList) {
            this.sFileList = val
            for (var i = 0; i < this.sFileList.length; i++) {
              // console.log(this.sFileList)
              // this.sFileList[i].addYn = false
              this.sFileList[i].attachYn = true
              this.sFileList[i].file = { name: this.sFileList[i].fileName, size: this.sFileList[i].fileSizeKb }
            }
          }
        }
      },
      deep: true
    }
  },
  created() {
    if (this.attachTrueAddFalseList && this.attachTrueAddFalseList.length > 0) {
      this.sFileList = this.attachTrueAddFalseList
      for (var i = 0; i < this.sFileList.length; i++) {
        // this.sFileList[i].addYn = false
        this.sFileList[i].attachYn = true
        this.sFileList[i].file = {
          name: this.sFileList[i].fileName,
          size: this.sFileList[i].fileSizeKb
        }
      }
    }
  },
  computed: {
    attachFileWidth() {
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
    splitName(name) {
      const lastIndex = name.lastIndexOf('.')
      return name.substr(0, lastIndex)
    },
    splitExt(name) {
      const lastIndex = name.lastIndexOf('.')
      return name.substr(lastIndex)
    },
    async onDrop(file) {
      const files = file

      this.selectFile = null
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1500,
        useWebWorker: true
      }
      if (files.length > 0) {
        this.uploadCnt = 0
        // 0 번째 파일을 가져 온다.
        for (var k = 0; k < files.length; k++) {
          this.selectFile = null
          this.gAttachKey += 1
          this.selectFile = files[k]
          const index = this.sFileList.findIndex((item) => {
            return item.name === this.selectFile.name
          })
          if (index !== -1) {
            return
          }
          let fileExt = this.selectFile.name.substring(
            this.selectFile.name.lastIndexOf('.') + 1
          )
          // 소문자로 변환
          fileExt = fileExt.toLowerCase()
          if (
            [
              'jpeg',
              'jpg',
              'png',
              'gif',
              'bmp',
              'webp',
              'svg',
              'tiff',
              'tif',
              'eps',
              'heic',
              'bpg'
            ].includes(fileExt)
          ) {
            console.log(
              'originalFile instanceof Blob',
              this.selectFile instanceof Blob
            ) // true
            console.log(
              `originalFile size ${this.selectFile.size / 1024 / 1024} MB`
            )

            try {
              // this.selectFile = files[this.uploadCnt]
              // eslint-disable-next-line no-undef
              var compressedFile = await this.$imageCompression(
                this.selectFile,
                options
              )
              console.log(compressedFile)
              console.log(
                'compressedFile instanceof Blob',
                compressedFile instanceof Blob
              ) // true
              var src = null
              if (compressedFile instanceof Blob) {
                src = await this.$imageCompression.getDataUrlFromFile(
                  compressedFile
                )
                const decodImg = atob(src.split(',')[1])
                const array = []
                for (let i = 0; i < decodImg.length; i++) {
                  array.push(decodImg.charCodeAt(i))
                }
                const Bfile = new Blob([new Uint8Array(array)], {
                  type: 'image/png'
                })
                var newFile = new File([Bfile], compressedFile.name)
              } else {
                src = await this.$imageCompression.getDataUrlFromFile(
                  compressedFile
                )
              }

              console.log(
                `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
              ) // smaller than maxSizeMB

              this.preImgUr = src
              this.selectFile = compressedFile
              this.sFileList.push({
                preImgUrl: src,
                attachKey: this.gAttachKey,
                addYn: true,
                file: newFile
              })
              this.$emit('setSelectedAttachFileList', {
                attachYn: true,
                preImgUrl: src,
                attachKey: this.gAttachKey,
                addYn: true,
                file: newFile
              })
              this.uploadCnt += 1
            } catch (error) {
              console.log(error)
            }
          } else {
            if (this.selectFile.size > 10000000) {
              this.errorShowYn = true
              return true
            }
            if (!this.sFileList) {
              this.sFileList = []
            }
            this.sFileList.push({
              fileYn: true,
              attachKey: this.gAttachKey,
              addYn: true,
              attachYn: true,
              file: this.selectFile
            })
            this.$emit('setSelectedAttachFileList', {
              attachYn: true,
              fileYn: true,
              attachKey: this.gAttachKey,
              addYn: true,
              file: this.selectFile
            })
          }
        }
      } else {
        // 파일을 선택하지 않았을때
        this.$emit('noneFile')
        this.selectFile = null
        this.previewImgUrl = null
      }
    },
    async handleImageUpload() {
      this.selectFile = null
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1500,
        useWebWorker: true
      }
      var test = document.getElementById('selectFileAttach')
      console.log(test)
      if (
        this.$refs.selectFileAttach &&
        this.$refs.selectFileAttach.files.length > 0
      ) {
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
            [
              'jpeg',
              'jpg',
              'png',
              'gif',
              'bmp',
              'webp',
              'svg',
              'tiff',
              'tif',
              'eps',
              'heic',
              'bpg'
            ].includes(fileExt)
          ) {
            console.log(
              'originalFile instanceof Blob',
              this.selectFile instanceof Blob
            ) // true
            console.log(
              `originalFile size ${this.selectFile.size / 1024 / 1024} MB`
            )

            try {
              this.selectFile =
                this.$refs.selectFileAttach.files[this.uploadCnt]
              // eslint-disable-next-line no-undef
              var compressedFile = await this.$imageCompression(
                this.selectFile,
                options
              )
              console.log(compressedFile)
              console.log(
                'compressedFile instanceof Blob',
                compressedFile instanceof Blob
              ) // true
              var src = null
              if (compressedFile instanceof Blob) {
                src = await this.$imageCompression.getDataUrlFromFile(
                  compressedFile
                )
                const decodImg = atob(src.split(',')[1])
                const array = []
                for (let i = 0; i < decodImg.length; i++) {
                  array.push(decodImg.charCodeAt(i))
                }
                const Bfile = new Blob([new Uint8Array(array)], {
                  type: 'image/png'
                })
                var newFile = new File([Bfile], compressedFile.name)
              } else {
                src = await this.$imageCompression.getDataUrlFromFile(
                  compressedFile
                )
              }

              console.log(
                `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
              ) // smaller than maxSizeMB
              // console.log(`compressedFile preview url: ${src}`) // smaller than maxSizeMB

              this.preImgUr = src
              this.selectFile = compressedFile
              this.sFileList.push({
                preImgUrl: src,
                attachKey: this.gAttachKey,
                addYn: true,
                file: newFile
              })
              this.$emit('setSelectedAttachFileList', {
                attachYn: true,
                preImgUrl: src,
                attachKey: this.gAttachKey,
                addYn: true,
                file: newFile
              })
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
            if (!this.sFileList) {
              this.sFileList = []
            }
            this.sFileList.push({
              fileYn: true,
              attachKey: this.gAttachKey,
              addYn: true,
              attachYn: true,
              file: this.selectFile
            })
            this.$emit('setSelectedAttachFileList', {
              attachYn: true,
              fileYn: true,
              attachKey: this.gAttachKey,
              addYn: true,
              file: this.selectFile
            })
          }
        }
      } else {
        // 파일을 선택하지 않았을때
        this.$emit('noneFile')
        this.selectFile = null
        this.previewImgUrl = null
      }
    },
    async formSubmit() {
      if (this.sFileList.length > 0) {
        // Form 필드 생성
        var form = new FormData()

        for (var i = 0; i < this.sFileList.length; i++) {
          form.append('files[' + i + ']', this.sFileList[i].file)

          this.$axios
            .post('/uploadFile', form, {
              headers: {
                'Content-Type': 'multipart/form-data; charset: UTF-8;'
              }
            })
            .then((res) => {
              this.response = res
            })
            .catch((error) => {
              this.response = error
            })
        }
      } else {
        alert(this.$t('FORM_MSG_SELECT_FILE'))
      }
      return true
    },
    clearFileList() {
      this.sFileList = []
      this.selectFile = ''
      this.preImgUrl = null
    },
    deleteFileList(value, index) {
      this.sFileList.splice(index, 1)
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
.attachBtnMemo {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  margin-top: 2px;
  position: relative;
}
.attachBtnMemo > img {
  margin-right: 8px;
  width: 12px;
}
.attachBtn {
  font-weight: 500;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  padding: 2px 7px;
  background-color: #fff;
  margin-top: 2px;
  border-radius: 8px;
  position: relative;
}
.formWrapMemo {
  position: relative;
  overflow: hidden;
  display: none;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
  margin-top: 2px;
  width: 150px;
}
.formWrapMemo > input {
  width: 100%;
  height: 25px;
}
.formWrap {
  font-weight: 500;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  padding: 2px 7px;
  background-color: #fff;
  margin-top: 2px;
  border-radius: 8px;
  position: relative;
}
.attachFileBox {
  min-width: 100%;
  float: left;
  overflow: auto;
  white-space: nowrap;
}
.attachFileItem {
  padding: 3px 10px;
  float: left;
  margin-left: 5px;
  height: 25px;
  max-width: 150px;
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
