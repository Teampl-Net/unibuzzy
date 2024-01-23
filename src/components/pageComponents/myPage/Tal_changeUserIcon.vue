<template>
    <div style="width: 100%; float: left;">
      <div style="width: 100%; height: 100vh; position: absolute; top:0; left: 0; background: #00000026; z-index: 9999;" @click="this.$emit('no')"></div>
      <div style="width: calc(100% - 30px);  position: absolute;top: 15%; left: 15px; z-index: 999999; background: #FFF; border-radius: 20px; padding: 10px; border: 0.51px solid #ccc; box-shadow: 9px 9px 9px -9px rgb(0 0 0 / 19%); height: 430px; float: left;">
          <p class="fl textLeft commonColor font18 fontBold mleft-05 mbottom-05">프로필 이미지 변경</p>
          <gActiveBar  ref="activeBar" :tabList="this.activeTabList" class="fl" @changeTab= "changeTab" style="width: 100%;" />
          <div v-if="viewTab === 'icon'" style="width: 100%;height: calc(100% - 120px); float: left; overflow: hidden auto;">
            <div @click="selectIcon(value.imageFilekey)" :class="selectedIconFileKey === value.imageFilekey ? 'selectedColor' : ''" style="float: left; overflow: hidden; background-color: #879dc945; border-radius: 100%; width: 100px; height: 100px; margin: 10px 5px; padding: 10px; padding-top: 20px; padding-bottom: 0; " v-for="(value, index) in teamImgList" :key="index">
              <img style="width: 100%;" :src="(value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)"  alt="">
            </div>
          </div>
          <div v-show="viewTab === 'img'" style="display: flex;flex-direction: column;align-items: center; width: 100%;height: calc(100% - 120px); padding-top: 10px; float: left; overflow: hidden auto;">
            <div @click="imgClickToInput"  style="width: 90%; height: 90%;; margin: 0 auto; cursor: pointer; border: 1px solid #ccc; overflow: auto; border-radius: 5px; margin-bottom: 10px; float: left; max-width: 246px; max-height: 248px; " class="cropperImgArea">
              <!-- <div @click="changeImgClick" style="width:80%; height:80%; min-height: 240px; cursor: pointer; border: 1px solid #ccc; overflow: auto; border-radius: 5px; margin-bottom: 10px; float: left;" ref="selectImgPopRef" class="cropperImgArea"> -->
              <img id="profileImg" :style="imgMode ==='W' ? 'height: 100%;': 'width: 100%; '" style="margin: 0 auto;" ref="image" :src="previewImgUrl" alt="" class="preview hidden">
            </div>

            <form  hidden @submit.prevent="formSubmit" style="overflow: hidden; cursor: pointer; min-height: 50px; max-width: 80%; float: left position: relative;height: var(--cardHeight); width: calc(100% ); " method="post">
                <input class="formImageFile" style="width: 100%; float: left;" type="file" title ="선택" accept="image/jpeg, image/png, image/jpg"  ref="selectFile" id="input-file" @change="handleImageUpload"/>
            </form>
            <div class="fl textLeft w-100P" style="display: flex; justify-content: space-around; border-top: 0.5px solid rgba(103, 104, 167, 0.54);">
              <p class="fl fontBold font14 mtop-05">터치해서 이미지를 변경할 수 있습니다.</p>
              <gBtnSmall v-if="cropperYn" class="fl mtop-05" style="word-break: break-word; white-space: nowrap;" btnTitle="다시 선택" @click="changeBtnClick"/>
            </div>
          </div>
          <div style="width: 100%; min-height: 40px; margin-top: 1rem; float: left;">
            <gBtnSmall @click="this.$emit('no')" btnTitle="닫기" btnThema="light"/>
            <gBtnSmall @click="updateUserIcon" btnTitle="선택" class="mright-05" />
          </div>
        </div>
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
      activeTabList: [{ display: '아이콘', name: 'icon' }, { display: '직접추가', name: 'img' }],
      cropper: {},
      refImg: {},
      cropperYn: false
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
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  mounted () {
    if (this.parentSelectedIconFileKey !== undefined && this.parentSelectedIconFileKey !== null && this.parentSelectedIconFileKey !== '') {
      if (this.parentSelectedIconFileKey > 100) {
        this.viewTab = 'img'
        this.$refs.activeBar.switchtab(1)
        this.$refs.activeBar.selectTab('img')
        // console.log(this.pSelectedIconPath)
        // console.log(this.parentSelectedIconFileKey)
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
              // // console.log(this.cropper)

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
        // console.log('this.uploadFileList')
        // console.log(this.uploadFileList)
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
            .post('https://mzoin.com/fileServer/tp.uploadFile', form,
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
                // // console.log('locallocallocallocallocal')
                // // console.log(local)
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
        this.$showToastPop('파일을 선택해 주세요.')
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
        // // console.log(this.selectedImgPath)
        // localStorage.setItem('sessionUser').userProfileImg = this.selectedImgPath
        if (this.selectedImgFilekey === '' || this.selectedImgFilekey === undefined) {
          await this.formSubmit()
        }
        user.picMfilekey = this.selectedImgFilekey
      } else {
        user.picMfilekey = this.selectedIconFileKey
      }
      param.user = user
      param.updateYn = true

      var result = await this.$changeDispName(param)
      // console.log(result)
      if (result.data) {
        this.$store.commit('D_USER/MU_USER', result.data.userInfo)
        localStorage.setItem('sessionUser', JSON.stringify(result.data))
        localStorage.setItem('sessionUser', JSON.stringify(result.data))
        this.$router.replace({ path: '/' })
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
.selectedColor {border: 2px solid rgb(74 102 158)}

.hidden{
  display:none
}
.cropperImgArea img{
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
