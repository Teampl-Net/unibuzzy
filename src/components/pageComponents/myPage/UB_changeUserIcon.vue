<i18n>
  {
    "ko": {
      "USER_CHANGE_PROFILE_IMG": "프로필 이미지 변경",
      "USER_PROFILE_ICON": "아이콘",
      "USER_PROFILE_MY_IMG": "직접추가",
      "USER_MSG_TOUCH_IMG": "터치해서 이미지를 변경할 수 있습니다.",
      "USER_MSG_NO_IMG": "파일을 선택해주세요."
    },
    "en": {
      "USER_CHANGE_PROFILE_IMG": "Update profile image",
      "USER_PROFILE_ICON": "Icon",
      "USER_PROFILE_MY_IMG": "Upload",
      "USER_MSG_TOUCH_IMG": "Touch to change the image.",
      "USER_MSG_NO_IMG": "Please select a file."
    }
  }
</i18n>
<template>
    <div class="w100P fl">
      <div class="changePopBg" @click="this.$emit('no')"></div>
      <div class="changePopBox">
          <p class="fl textLeft commonColor font18 fontBold mleft-05 mbottom-05">{{ $t('USER_CHANGE_PROFILE_IMG') }}</p>
          <gActiveBar  ref="activeBar" :tabList="this.activeTabList" class="fl w-100P" @changeTab= "changeTab" />
          <div v-if="viewTab === 'icon'" class="chanIconWrap">
            <div class="iconItem" @click="selectIcon(value.imageFilekey)" :class="selectedIconFileKey === value.imageFilekey ? 'selectedColor' : ''" v-for="(value, index) in teamImgList" :key="index">
              <img class="w100P" :src="value.domainPath? value.domainPath + value.pathMtext : value.pathMtext"  alt="">
            </div>
          </div>
          <div v-show="viewTab === 'img'" class="chanImgWrap">
            <div @click="imgClickToInput" class="cropperImgArea selectedImgBox">
              <!-- <div @click="changeImgClick" style="width:80%; height:80%; min-height: 240px; cursor: pointer; border: 1px solid #ccc; overflow: auto; border-radius: 5px; margin-bottom: 10px; float: left;" ref="selectImgPopRef" class="cropperImgArea"> -->
              <img id="profileImg" :style="imgMode ==='W' ? 'height: 100%;': 'width: 100%; '" ref="image" :src="previewImgUrl" alt="" class="preview hidden">
            </div>

            <form hidden @submit.prevent="formSubmit" class="imgForm" method="post">
                <input class="formImageFile w100P fl" type="file" title ="선택" accept="image/jpeg, image/png, image/jpg"  ref="selectFile" id="input-file" @change="handleImageUpload"/>
            </form>
            <div class="fl textLeft w100P changeBtnArea">
              <p class="fl fontBold font14 mtop-05">{{ $t('USER_MSG_TOUCH_IMG') }}</p>
              <gBtnSmall v-if="cropperYn" class="fl mtop-05 changeBtn" :btnTitle="$t('COMM_BTN_SELEC_AGAIN')" @click="changeBtnClick"/>
            </div>
          </div>
          <div class="closeBtnArea">
            <gBtnSmall @click="this.$emit('noChange')" :btnTitle="$t('COMM_BTN_CANCEL')" btnThema="light"/>
            <gBtnSmall @click="updateUserIcon" :btnTitle="$t('COMMON_BTN_OKAY')" class="mright-05" />
          </div>
        </div>
        <gConfirmPop :confirmText="$t('USER_MSG_NO_IMG')" class="" confirmType='one' @no='confirmPopShowYn = false' v-if="confirmPopShowYn"/>
    </div>
</template>
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  data () {
    return {
      selectedIconFileKey: 0,
      teamImgList: [],
      viewTab: 'icon',
      previewImgUrl: '',
      selectFile: '',
      uploadFileList: [],
      selectedImgPath: '',
      selectedImgFilekey: '',
      activeTabList: [
        { display: this.$t('USER_PROFILE_ICON'), name: 'icon' },
        { display: this.$t('USER_PROFILE_MY_IMG'), name: 'img' }
      ],
      cropper: {},
      refImg: {},
      cropperYn: false,
      confirmPopShowYn: false
    }
  },
  props: {
    parentSelectedIconFileKey: {},
    pSelectedIconPath: {}
  },
  created () {
    if (this.parentSelectedIconFileKey !== undefined && this.parentSelectedIconFileKey !== null && this.parentSelectedIconFileKey !== '') {
      this.selectedIconFileKey = this.parentSelectedIconFileKey
    }
    this.getCodeList()
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    }
  },
  mounted () {
    if (this.parentSelectedIconFileKey !== undefined && this.parentSelectedIconFileKey !== null && this.parentSelectedIconFileKey !== '') {
      if (this.parentSelectedIconFileKey > 100) {
        this.viewTab = 'img'
        this.$refs.activeBar.switchtab(1)
        this.$refs.activeBar.selectTab('img')
        this.previewImgUrl = this.pSelectedIconPath
        this.selectedImgPath = this.pSelectedIconPath
        this.selectedImgFilekey = this.parentSelectedIconFileKey
      }
    }
  },
  methods: {
    imgClickToInput () {
      if (this.cropperYn === false) this.$refs.selectFile.click()
    },
    changeBtnClick () {
      this.$refs.selectFile.click()
    },
    async handleImageUpload (event) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1500,
        useWebWorker: true
      }

      if (this.$refs.selectFile.files.length > 0) {
        // 0 번째 파일을 가져 온다.
        this.selectedImgPath = ''
        this.selectedImgFilekey = ''
        this.selectFile = null
        this.previewImgUrl = null
        this.cropperYn = true

        this.selectFile = this.$refs.selectFile.files[0]
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
            console.log(`compressedFile preview url: ${src}`) // smaller than maxSizeMB
            this.previewImgUrl = src
            this.uploadFileList.push({ previewImgUrl: src, addYn: true, file: newFile })

            // editorImgResize1(canvas.toDataURL('image/png', 0.8))
            // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
            this.refImg = this.$refs.image
            // // console.log(this.cropper)

            this.cropper = new Cropper(this.refImg, {
              viewMode: '1',
              dragMode: 'move',
              preview: '.cropperPreviewImg',
              aspectRatio: 1 / 1,
              cropBoxResizable: true,
              wheelZoomRatio: 0.1,
              movable: false
            })
            this.cropper.replace(this.previewImgUrl)
          } catch (error) {
            console.log(error)
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
      // 선택된 파일이 있는가?
      if (this.$refs.selectFile.files.length > 0) {
        // 0 번째 파일을 가져 온다.
        this.selectedImgPath = ''
        this.selectedImgFilekey = ''
        this.selectFile = null
        this.previewImgUrl = null
        this.cropperYn = true
        // for (var k = 0; k < this.$refs.selectFile.files.length; k++) {
        this.selectFile = this.$refs.selectFile.files[0]
        // 마지막 . 위치를 찾고 + 1 하여 확장자 명을 가져온다.
        // eslint-disable-next-line no-unused-vars
        var tt = this.selectFile

        let fileExt = this.selectFile.name.substring(
          this.selectFile.name.lastIndexOf('.') + 1
        )
        // 소문자로 변환
        fileExt = fileExt.toLowerCase()
        if (
          ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'webp', 'svg', 'tiff', 'tif', 'eps', 'heic', 'bpg'].includes(fileExt)
        ) {
        // FileReader 를 활용하여 파일을 읽는다
          var reader = new FileReader()
          var thisthis = this
          reader.onload = e => {
            var image = new Image()
            image.onload = async function () {
              var result = await thisthis.$saveFileSize(image, thisthis.selectFile)
              thisthis.previewImgUrl = result.path
              thisthis.uploadFileList.push({ previewImgUrl: result.path, addYn: true, file: result.file })

              // editorImgResize1(canvas.toDataURL('image/png', 0.8))
              // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
              thisthis.refImg = thisthis.$refs.image

              thisthis.cropper = new Cropper(thisthis.refImg, {
                viewMode: '1',
                dragMode: 'move',
                preview: '.cropperPreviewImg',
                aspectRatio: 1 / 1,
                cropBoxResizable: true,
                wheelZoomRatio: 0.1,
                movable: false
              })
              thisthis.cropper.replace(thisthis.previewImgUrl)
            }
            image.onerror = function () {

            }
            image.src = e.target.result
            // this.previewImgUrl = e.target.result
          }
          reader.readAsDataURL(this.selectFile)
          // await this.$editorImgResize(this.selectFile)
        }
        // }
      } else {
        return null
        // this.selectFile = null
        // this.previewImgUrl = null
      }
    },
    selectIcon (fileKey) {
      this.selectedIconFileKey = fileKey
    },
    changeTab (tab) {
      this.viewTab = tab
    },
    changeUserIcon () {
    },
    async getCodeList () {
      var resultList = null
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.groupCode = 'U_ICON'
      resultList = await this.$getCodeList(param)
      this.teamImgList = resultList

      // var a = this.teamImgList
    },
    async crop () {
      var cropImg = this.cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096, imageSmoothingEnabled: false, imageSmoothingQuality: 'high' })
      var dataURL = cropImg.toDataURL('image/jpeg', 0.8)
      // const imgBase64 = previewCanvas.toDataURL('image/png', 0.8)
      const decodImg = atob(dataURL.split(',')[1])
      const array = []
      for (let i = 0; i < decodImg.length; i++) {
        array.push(decodImg.charCodeAt(i))
      }
      const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
      var newSelectFileName = this.selectFile.name
      // newSelectFileName = newSelectFileName.replaceAll(' ', '')
      const files = new File([Bfile], this.convertFilename(newSelectFileName))

      return files
    },
    convertFilename (orgnStr) {
      const reg = /[^\w\sㄱ-힣]|[\\_]/g
      return reg.test(orgnStr)
    },
    async formSubmit () {
      if (this.uploadFileList.length > 0) {
        var form = new FormData()
        // var thisthis = this
        for (var i = 0; i < this.uploadFileList.length; i++) {
          form = new FormData()
          if (this.cropperYn === true) this.uploadFileList[i].file = await this.crop()
          // Here we create unique key 'files[i]' in our response dictBase64.decode(data)
          // thisthis.uploadFileList[i].filePath = Base64.decode(thisthis.uploadFileList[i].filePath.replaceAll('data:image/png;base64,', ''))
          form.append('files[0]', (this.uploadFileList[i]).file)
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
                var path = res.data[0].domainPath + res.data[0].pathMtext
                this.selectedImgPath = path
                this.selectedImgFilekey = res.data[0].fileKey
                var tempLocalStorage = this.GE_USER
                tempLocalStorage.userProfileImg = res.data[0].pathMtext
                tempLocalStorage.picMfilekey = this.selectedImgFilekey
                localStorage.setItem('sessionUser', JSON.stringify(tempLocalStorage))
                // localStorage.getItem('sessionUser').userProfileImg = this.selectedImgPath
                // localStorage.getItem('sessionUser').picMfilekey = this.selectedImgFilekey
                // local.userProfileImg = this.selectedImgPath
                // local.picMfilekey = this.selectedImgFilekey
                // localStorage.setItem('sessionUser', JSON.parse(local))
              }
            })
            .catch(error => {
              console.log(error)
            })
          /* } */
          // var selFile = this.selectFileList[i].file
        }
      } else {
        this.confirmPopShowYn = true
        return false
      }
      return true
    },
    async updateUserIcon () {
      // KO$^$수망고$#$EN$^$sumango
      var param = {}
      var user = {}
      // param.user = this.userInfo
      user.userKey = this.GE_USER.userKey
      if (this.viewTab === 'img') {
        // localStorage.setItem('sessionUser').userProfileImg = this.selectedImgPath
        if (this.selectedImgFilekey === '' || this.selectedImgFilekey === undefined) {
          const res = await this.formSubmit()
          if (!res) return
        }
        user.picMfilekey = this.selectedImgFilekey
      } else {
        user.picMfilekey = this.selectedIconFileKey
      }
      param.user = user
      param.updateYn = true

      var result = await this.$changeDispName(param)
      if (result.data) {
        this.$store.commit('UB_USER/MU_USER', result.data.userInfo)
        localStorage.setItem('sessionUser', JSON.stringify(result.data))
        localStorage.setItem('sessionUser', JSON.stringify(result.data))
        // this.$router.replace({ path: '/' })
        this.$emit('closeXPop')
        // this.userInfo.userDispMtext =  this.$changeText(param.user.userDispMtext)
        // this.userInfo.userDispMtext = await this.$changeText(param.user.userDispMtext)
      } else {

      }
    }
  }
}
</script>

<style scoped>
.changePopBg {
  width: 100%;
  height: 100vh;
  position: absolute;
  top:0;
  left: 0;
  background: #00000026;
  z-index: 9999;
}
.selectedColor {
  border: 2px solid #6768a7;
}

.hidden {
  display:none
}
.cropperImgArea img {
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
.changePopBox {
  width: calc(100% - 30px);
  position: absolute;
  top: 15%;
  left: 15px;
  z-index: 999999;
  background: #FFF;
  border-radius: 20px;
  padding: 10px;
  border: 0.51px solid #ccc;
  box-shadow: 9px 9px 9px -9px rgb(0 0 0 / 19%);
  height: 430px;
  float: left;
}
.w-100P {
  width: 100% !important;
}
.chanIconWrap {
  width: 100%;
  height: calc(100% - 120px);
  float: left;
  overflow: hidden auto;
}
.iconItem {
  float: left;
  overflow: hidden;
  background: #6768a745;
  border-radius: 100%;
  width: 100px;
  height: 100px;
  margin: 10px 5px;
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 0;
}
.chanImgWrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 120px);
  padding-top: 10px;
  float: left;
  overflow: hidden auto;
}
.selectedImgBox {
  width: 90%;
  height: 90%;
  margin: 0 auto;
  cursor: pointer;
  border: 1px solid #ccc;
  overflow: auto;
  border-radius: 5px;
  margin-bottom: 10px;
  float: left;
  max-width: 246px;
  max-height: 248px;
}
.selectedImgBox > img {
  margin: 0 auto;
}
.imgForm {
  overflow: hidden;
  cursor: pointer;
  min-height: 50px;
  max-width: 80%;
  float: left;
  position: relative;
  height: var(--cardHeight);
  width: calc(100% );
}
.changeBtnArea {
  display: flex;
  justify-content: space-around;
  border-top: 0.5px solid rgba(103, 104, 167, 0.54);
}
.changeBtn {
  word-break: break-word !important;
  white-space: nowrap !important;
}
.closeBtnArea {
  width: 100%;
  min-height: 40px;
  margin-top: 1rem;
  float: left;
}
</style>
