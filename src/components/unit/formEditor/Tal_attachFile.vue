<template>
    <gConfirmPop @no="this.errorShowYn = false" confirmText='파일은 최대 10MB까지 첨부할 수 있습니다.' confirmType='timeout' v-if="errorShowYn" />
    <form  @submit.prevent="formSubmit" class="font14 commonBlack fl mleft-1" style="overflow: hidden;cursor: pointer; text-align: center; padding: 4px 8px; background-color: #fff; height: 27px; margin-top: 2px;border-radius: 8px; position: relative; border:1px solid black;" method="post">
         파일 선택
        <input class="attachFile"  type="file" title ="파일 선택"  ref="selectFile" multiple accept="*" style="width: 100%;" id="input-file" @change="previewFile"/>
    </form>
    <div v-if="this.sFileList.length > 0" style="width: 100%; min-height: 50px; margin-top: 10px; float: left; overflow: auto hidden;">
        <div :style="attachFileWidth" style="min-width: 100%;float: left; height: 50px; overflow: hiden;">
          <div class="CLightBgColor" style="padding: 3px 10px; float: left; margin-left: 5px; height: 30px; max-width: 200px; padding-right: 25px; box-shadow: 1px 3px 3px 0px #e9e7e7;  border: 1px solid #ccc; border-radius: 5px; position: relative;" v-for="(value, index) in this.sFileList" :key="index">
              <p class="commonBlack font15 textOverdot" style="">{{value.file.name}} ({{this.$byteConvert(value.file.size)}})</p>
              <img src="../../../assets/images/common/popup_close.png" @click="deleteFileList(value, index)" class="img-w13" style="position: absolute; right: 5px;top: 7px;" alt="">
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
    attachTrueAddFalseList: {}
  },
  created () {
    if (this.attachTrueAddFalseList && this.attachTrueAddFalseList.length > 0) {
      this.sFileList = this.attachTrueAddFalseList
      for (var i = 0; i < this.sFileList.length; i++) {
        console.log(this.sFileList)
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
    async previewFile () {
      this.preImgUrl = null
      // 선택된 파일이 있는가?
      if (this.$refs.selectFile.files.length > 0) {
        // 0 번째 파일을 가져 온다.

        for (var k = 0; k < this.$refs.selectFile.files.length; k++) {
          var file
          this.selectFile = null
          this.gAttachKey += 1
          console.log(this.$refs.selectFile.files[k])
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
            var reader = new FileReader()
            var thisthis = this
            reader.onload = async e => {
              var image = new Image()
              image.onload = await function () {
                // Resize image
                thisthis.selectFile = thisthis.$refs.selectFile.files[thisthis.uploadCnt]
                var canvas = document.createElement('canvas')
                var width = image.width
                var height = image.height
                var fileSize = thisthis.selectFile.size
                var size = 900
                if (fileSize > 6000000) {
                  size = 700
                } else if (fileSize > 3000000) {
                  size = 800
                }
                if (width > height) { // 가로모드
                  if (width > size) {
                    height *= size / width
                    width = size
                  }
                } else { // 세로모드
                  if (height > size) {
                    width *= size / height
                    height = size
                  }
                }
                canvas.width = width
                canvas.height = height

                canvas.getContext('2d').drawImage(image, 0, 0, width, height)
                const imgBase64 = canvas.toDataURL('image/png', 0.8)
                thisthis.preImgUr = imgBase64
                const decodImg = atob(imgBase64.split(',')[1])
                const array = []
                for (let i = 0; i < decodImg.length; i++) {
                  array.push(decodImg.charCodeAt(i))
                }
                const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
                file = new File([Bfile], thisthis.selectFile.name)
                thisthis.selectFile = file
                thisthis.sFileList.push({ preImgUrl: canvas.toDataURL('image/png', 0.8), attachKey: thisthis.gAttachKey, addYn: true, file: file })
                thisthis.$emit('setSelectedAttachFileList', [{ attachYn: true, preImgUrl: canvas.toDataURL('image/png', 0.8), attachKey: thisthis.gAttachKey, addYn: true, file: file }])
                thisthis.uploadCnt += 1
                // editorImgResize1(canvas.toDataURL('image/png', 0.8))
                // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
              }
              image.onerror = function () {

              }
              image.src = e.target.result
              this.preImgUrl = e.target.result
            }
            reader.readAsDataURL(this.selectFile)
            // await this.$editorImgResize(this.selectFile)
          } else {
            if (this.selectFile.size > 10000000) {
              this.errorShowYn = true
              return true
            }
            console.log('#####')
            if (!this.sFileList) {
              this.sFileList = []
            }
            console.log(this.sFileList)
            this.sFileList.push({ fileYn: true, attachKey: this.gAttachKey, addYn: true, attachYn: true, file: this.selectFile })
            this.$emit('setSelectedAttachFileList', [{ attachYn: true, fileYn: true, attachKey: this.gAttachKey, addYn: true, file: this.selectFile }])
          }
        }
      } else {
        this.selectFile = null
        this.preImgUrl = null
      }
      console.log(this.sFileList)
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
                'Content-Type': 'multipart/form-data'
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
    deleteFileList (value, index) {
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
    min-height: 60px;
    border-radius: 0px !important;
    border: none !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    padding: 0 !important;
    background: none !important;
}
</style>
