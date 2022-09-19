<template>
        <div v-if="pSrc" :style="settingCardHeight" style="overflow: hidden; cursor: pointer; min-height: 60px;height: var(--cardHeight);position: relative;height: var(--cardHeight)" method="post">
            <div ref="imageBox" class="fl mright-05 formCard" style="position: relative; width: calc(100% - 30px); height: var(--cardHeight)">
              <div class="fl mright-05" style="width:100%;">
                  <img  class="editorImg addFalse" :filekey="pFilekey" style="width:100%;" :src="pSrc" />
                  <!-- <span @click="deleteFile(index)" style="position: absolute; top: 0; right: 7px; cursor: pointer;">x</span> -->
              </div>
          </div>
            <!-- <button  class="whiteBtn mright-1" type="submit" :disabled="isUploading">업로드</button> -->
        <!-- <div>
            <hr />
            selectFileList : {{ selectFileList }}
        </div> -->
        </div>
        <div v-else-if="multiFileSrc" :style="settingCardHeight" style="overflow: hidden; cursor: pointer; min-height: 60px;height: var(--cardHeight);position: relative;height: var(--cardHeight)" method="post">
            <div ref="imageBox" class="fl mright-05 formCard" style="position: relative; width: calc(100% - 30px); height: var(--cardHeight)">
              <div class="fl mright-05" style="width:100%;">
                  <img  class="editorImg addTrue" style="width:100%;" :src="multiFileSrc" />
                  <!-- <span @click="deleteFile(index)" style="position: absolute; top: 0; right: 7px; cursor: pointer;">x</span> -->
              </div>
          </div>
        </div>
        <form v-else :style="settingCardHeight" @submit.prevent="formSubmit" style="overflow: hidden; cursor: pointer; min-height: 50px;height: var(--cardHeight);position: relative;height: var(--cardHeight)" method="post">
            <div v-if="selectFileList.length === 0" style="cursor: pointer; background: #FFF; width: calc(100%); height: 100%;display: flex; font-size: 14px;color: rgb(103, 104, 167);justify-content: center;align-items: center;">
                <img  class="fl" src="../../../assets/images/formEditor/gallery_gray.svg" style="width: 20px;"  alt="">
            </div>
            <input class="formImageFile" multiple type="file" title ="선택" accept="image/*"  ref="selectFile" id="input-file" @change="previewFile"/>
            <div ref="imageBox" class="fl mright-05 formCard" style="position: relative; width: calc(100% - 30px)">
                <div  class="fl mright-05" :style="settingImgSize" style="width:100%;">
                    <img  class="editorImg" style="width:100%;" :class="{addTrue :  firstFile.addYn}" :src="firstFile.previewImgUrl" />
                    <!-- <span @click="deleteFile(index)" style="position: absolute; top: 0; right: 7px; cursor: pointer;">x</span> -->
                </div>
            </div>
            <!-- <button  class="whiteBtn mright-1" type="submit" :disabled="isUploading">업로드</button> -->
        <!-- <div>
            <hr />
            selectFileList : {{ selectFileList }}
        </div> -->
        </form>
</template>
<script>
/* eslint-disable no-debugger */
export default {
  name: 'FormValidation',
  components: {},
  mounted () {
    // eslint-disable-next-line no-unused-vars
    var test = this.$refs.imageBox

    this.cardHeight = this.$refs.imageBox.scrollHeight
    // this.$refs.selectFile.click()
  },
  created () {
    if (this.selectFileListProp !== undefined && this.selectFileListProp !== null && this.selectFileListProp !== {} && this.selectFileListProp.length > 0) {
      this.selectFileList = this.selectFileListProp
    }
  },
  props: {
    selectFileListProp: {},
    targetKey: {},
    pSrc: {},
    pFilekey: {},

    multiFileSrc: {}
  },
  data () {
    return {
      selectFile: null, // 파일 객체
      previewImgUrl: null, // 미리보기 이미지 URL
      selectFileList: [],
      isUploading: false, // 파일 업로드 체크
      response: null, // 파일 업로드후 응답값
      imageWidth: 100,
      cardHeight: 0,
      fileCnt: 0,
      firstFile: {}
    }
  },
  computed: {
    settingImgSize () {
      var layoutCnt = this.selectFileList.length
      return {
        '--imgWidth': 'calc(' + this.imageWidth / layoutCnt + '% - ' + (layoutCnt * 0.5 - 0.5) + 'rem)'
      }
    },
    settingCardHeight () {
      if (this.pSrc) {
        return {
          '--cardHeight': this.$refs.i + 'px'
        }
      } else if (this.multiFileSrc) {
        return {
          '--cardHeight': this.$refs.i + 'px'
        }
      } else {
        return {
          '--cardHeight': this.cardHeight + 'px'
        }
      }
    }
  },
  methods: {
    async previewFile () {
      this.selectFile = null
      this.previewImgUrl = null
      // 선택된 파일이 있는가?
      if (this.$refs.selectFile.files.length > 0) {
        // 0 번째 파일을 가져 온다.
        for (var k = 0; k < this.$refs.selectFile.files.length; k++) {
          this.selectFile = this.$refs.selectFile.files[k]
          // 마지막 . 위치를 찾고 + 1 하여 확장자 명을 가져온다.
          // eslint-disable-next-line no-unused-vars
          var tt = this.selectFile

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
            var thisthis = this
            reader.onload = e => {
              var image = new Image()
              image.onload = async function () {
                // Resize image
                var result = await thisthis.$saveFileSize(image, thisthis.selectFile)

                if (thisthis.$refs.selectFile.files.length === 1) {
                  this.previewImgUrl = result.path
                }

                thisthis.selectFileList.push({ previewImgUrl: result.path, addYn: true, file: result.file })
                thisthis.$emit('success', { targetKey: thisthis.targetKey, selectFileList: [{ previewImgUrl: result.path, originalFile: thisthis.selectFile, addYn: true, file: result.file }], originalType: 'image' })
                if (thisthis.$refs.selectFile.files.length === 1) {
                  thisthis.firstFile = { previewImgUrl: result.path, addYn: true, file: result.file }
                } else {
                  // if (thisthis.$refs.selectFile.files.length > 1) {
                  if (thisthis.fileCnt > 0) {
                    thisthis.$emit('setMultiFile', { file: result.file, previewImgUrl: result.path })
                  } else {
                    thisthis.firstFile = { previewImgUrl: result.path, addYn: true, file: result.file }
                  }
                  // }
                }
                // this.$emit('updateImgForm', this.previewImgUrl)
                setTimeout(() => {
                  thisthis.cardHeight = thisthis.$refs.imageBox.scrollHeight
                }, 10)
                thisthis.fileCnt += 1
                // editorImgResize1(canvas.toDataURL('image/png', 0.8))
                // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
              }
              image.onerror = function () {

              }
              image.src = e.target.result
              // this.previewImgUrl = e.target.result
            }
            reader.readAsDataURL(this.selectFile)
            // await this.$editorImgResize(this.selectFile)
          }
        }
      } else {
        // 파일을 선택하지 않았을때
        this.$emit('noneFile')
        this.selectFile = null
        this.previewImgUrl = null
      }
      /* if (thisthis.$refs.selectFile.files.length > 1) {
        thisthis.$emit('setMultiFile', thisthis.selectFileList)
      } */
      console.log(this.selectFileList)
    },
    deleteFile (idx) {
      this.selectFileList.splice(idx, 1)
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
        }
      } else {
        alert('파일을 선택해 주세요.')
      }
      return true
    }
  }
}
</script>

<style scoped>
.formImageFile {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    cursor: pointer;
    position: absolute;
    width: 100%;
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
.imageBorder{box-shadow: rgb(191 191 218) 0px 0px 2px 0px;}
</style>
