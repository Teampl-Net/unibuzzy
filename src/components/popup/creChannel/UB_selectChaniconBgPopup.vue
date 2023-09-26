<i18n>
  {
    "ko": {
      "USER_MSG_TOUCH_IMG": "터치해서 이미지를 변경할 수 있습니다.",
      "USER_PROFILE_ICON": "아이콘",
      "USER_PROFILE_MY_IMG": "직접추가",
      "INFO_SELECT_FIN": "선택완료",
      "ICON_MSG_SELECT_PLS": "채널을 대표할 아이콘을 선택해주세요.",
      "ICON_MSG_SELECT_PLS2": "대표 아이콘을 선택해주세요!",
      "IMG_MSG_SELECT_PLS": "채널의 배경 사진을 선택해주세요.",
      "IMG_MSG_SELECT_PLS2": "배경 사진을 선택해주세요!",
      "IMG_MSG_SELECT_FIN": "이미지 선택"
    },
    "en": {
      "USER_MSG_TOUCH_IMG": "Touch to change the image.",
      "USER_PROFILE_ICON": "Icon",
      "USER_PROFILE_MY_IMG": "Upload",
      "INFO_SELECT_FIN": "Select",
      "ICON_MSG_SELECT_PLS": "Please select an icon to represent the channel.",
      "ICON_MSG_SELECT_PLS2": "Please select a representative icon!",
      "IMG_MSG_SELECT_PLS": "Please select a channel background image.",
      "IMG_MSG_SELECT_PLS2": "Please select a background image!",
      "IMG_MSG_SELECT_FIN": "Select an icon"
    }
  }
</i18n>
<template>
  <div class="fl w100P" @click.stop="preventDefault">
    <div class="selectImgPopBg" @click="closePop()"></div>
    <div :class="{popupTop: pSelectedBuilding}" class="confirmPopWrap changeBgPopWrap" :style="'padding-bottom:' + ($STATUS_HEIGHT + 60)+ 'px'" >
        <div class="creChanIntroTextWrap">
            <p class="fontBold font18">{{msgTitle}}</p>
            <img src="../../../assets/images/common/popup_close.png" @click="pClosePop"/>
        </div>
        <gActiveBar ref="activeBar" :tabList="activeTabList" class="fl activeBar" @changeTab= "changeTab" />
        <div id="creChanContentsArea" class="chanImgContentsWrap">
            <div style="width: 100%; height: 100%;"  v-show="viewTab === 'img'">
              <div :style="'height: ' + contentsHeight + 'px;'" class="imgContArea">
                <div  @click="imgClickToInput" ref="selectImgPopRef" class="cropperImgArea imgCont">
                  <img v-if="changeImgYn = true" :style="imgMode ==='W' ? 'height: 100%;': 'width: 100%; '"  id="profileImg" ref="image" :src="previewImgUrl" alt="" class="preview hidden">
                </div>
                <form hidden @submit.prevent="formSubmit" class="imgForm" method="post">
                    <input class="formImageFile w100P fl" type="file" :title ="$t('COMMON_BTN_SELECTED')" accept="image/jpeg, image/png, image/jpg" ref="selectFileChangeIconNBG" id="input-file" @change="handleImageUpload"/>
                </form>
                <div class="fl textLeft w100P selectAgainBtnWrap">
                  <p v-if="!cropperYn" class="fl fontBold font14 mtop-05">{{ $t('USER_MSG_TOUCH_IMG') }}</p>
                  <gBtnSmall v-if="cropperYn" class="fl mtop-05 selectAgainBtn" :btnTitle="$t('COMM_BTN_SELEC_AGAIN')" @click="changeBtnClick"/>
                </div>
              </div>
            </div>
            <div v-show="viewTab === 'icon'" id="chanIconBox" class="chanIconContentsWrap">
              <div class="createChannelSelectBox" :class="{activeTypeBox: selectedId ===value.imageFilekey}" @click="selectChanInfo(value)" v-for="(value,index) in teamImgList" :key="index" :style="getChanBoxSize" style="">
                <img v-if="opentype =='iconPop'" class="iconPopImg" :src="(value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)" />

                <img class="w100P h100P" v-if="opentype =='bgPop'" :src='(value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)' />
                <img class="w100P h100P" v-if="opentype =='building'" :src='(value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)' />

              </div>
            </div>
        </div>

        <div @click="setParam" class="creChanBigBtn font18 fl mtop-2 mbottom-05">{{ $t('IMG_MSG_SELECT_FIN') }}</div>

    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  props: {
    opentype: {},
    selectIcon: {},
    selectBg: {},
    pClosePop: Function,
    pSelectedBuilding: Object
  },
  mounted () {
    if (document.getElementById('chanIconBox').scrollHeight > 0) {
      this.popWidth = document.getElementById('creChanContentsArea').scrollWidth
      this.contentsHeight = document.getElementById('chanIconBox').scrollHeight
    } else {
      setTimeout(() => {
        this.popWidth = document.getElementById('creChanContentsArea').scrollWidth
        this.contentsHeight = document.getElementById('chanIconBox').scrollHeight
      }, 500)
    }
    if (this.viewTab === 'icon') {
      this.$refs.activeBar.switchtab(0)
      this.$refs.activeBar.selectTab('icon')
    } else {
      this.$refs.activeBar.switchtab(1)
      this.$refs.activeBar.selectTab('img')
    }
    this.$addHistoryStack('channelImgChangePop')
  },
  created () {
    this.readyFunction()
    if (this.previewImgUrl) {
      this.$nextTick(() => {
        var w = document.getElementById('profileImg').clientWidth
        var h = document.getElementById('profileImg').clientHeight
        if (w > h) { // 가로모드
          this.imgMode = 'W'
        } else {
          this.imgMode = 'H'
        }
      })
    }
  },
  data () {
    return {
      selectedId: '',
      teamImgList: [],
      uploadFileList: [],
      selectPath: '',
      selectFile: null,
      msgTitle: '',
      msgError: '',
      imgMode: 'W',
      previewImgUrl: '',
      contentsHeight: 180,
      popWidth: 0,
      viewTab: 'icon',
      selectedImgPath: '',
      selectedImgFilekey: '',
      activeTabList: [
        { display: this.$t('USER_PROFILE_ICON'), name: 'icon' },
        { display: this.$t('USER_PROFILE_MY_IMG'), name: 'img' }
      ],
      cropper: {},
      refImg: {},
      cropperYn: false,
      changeImgYn: true
    }
  },
  methods: {
    readyFunction () {
      this.getOpenType()
      this.getCodeList()
      this.setDefaultData()
      this.dataSetting()
    },
    getOpenType () {
      if (this.opentype === 'building') {
        return this.activeTabList.splice(1)
      } else {
        return this.activeTabList
      }
    },
    imgClickToInput () {
      if (this.cropperYn === false) this.$refs.selectFileChangeIconNBG.click()
    },
    changeBtnClick () {
      this.$refs.selectFileChangeIconNBG.click()
    },
    dataSetting () {
      if (this.opentype === 'bgPop') {
        if (this.selectBg.iconType === 'icon' || this.selectBg.selectedId < 16) {
          this.viewTab = 'icon'
          this.selectedId = this.selectBg.selectedId
          this.selectPath = this.selectBg.selectPath
        } else if (this.selectBg.iconType === 'img') {
          this.viewTab = 'img'
          this.previewImgUrl = this.selectBg.selectPath
          this.selectedImgPath = this.selectBg.selectPath
          this.selectedImgFilekey = this.selectBg.selectedId
        }
      } else if (this.opentype === 'iconPop') {
        if (this.selectIcon.iconType === 'icon' || this.selectIcon.selectedId < 16) {
          this.viewTab = 'icon'
          this.selectedId = this.selectIcon.selectedId
          this.selectPath = this.selectIcon.selectPath
        } else if (this.selectIcon.iconType === 'img') {
          this.viewTab = 'img'
          this.previewImgUrl = this.selectIcon.selectPath
          this.selectedImgPath = this.selectIcon.selectPath
          this.selectedImgFilekey = this.selectIcon.selectedId
        }
      } else if (this.opentype === 'building') {
        if (this.selectIcon) {
          if (this.selectIcon.iconType === 'icon' || this.selectIcon.selectedId < 16) {
            this.viewTab = 'icon'
            this.selectedId = this.selectIcon.selectedId
            this.selectPath = this.selectIcon.selectPath
          } else if (this.selectIcon.iconType === 'img') {
            this.viewTab = 'img'
            this.previewImgUrl = this.selectIcon.selectPath
            this.selectedImgPath = this.selectIcon.selectPath
            this.selectedImgFilekey = this.selectIcon.selectedId
          }
        }
      }
    },
    async changeTab (data) {
      this.viewTab = data
      if (this.opentype === 'bgPop') {
        if (data === 'img') {
          this.previewImgUrl = this.selectBg.selectPath
          this.selectedImgPath = this.selectBg.selectPath
          this.selectedImgFilekey = this.selectBg.selectedId
        }
      } else {
        if (data === 'img') {
          this.previewImgUrl = this.selectIcon.selectPath
          this.selectedImgPath = this.selectIcon.selectPath
          this.selectedImgFilekey = this.selectIcon.selectedId
        }
      }
    },
    async getCodeList () {
      var resultList = null
      var param = {}
      if (this.opentype === 'bgPop') {
        param.groupCode = 'T_BG__'
      } else if (this.opentype === 'iconPop') {
        param.groupCode = 'T_LOGO'
      } else if (this.opentype === 'building') {
        param.groupCode = 'T_BD__'
      }
      resultList = await this.$getCodeList(param)
      this.teamImgList = resultList
    },
    setDefaultData () {
      if (this.opentype === 'iconPop') {
        this.msgTitle = this.$t('ICON_MSG_SELECT_PLS')
        this.msgError = this.$t('ICON_MSG_SELECT_PLS2')
      } else if (this.opentype === 'bgPop') {
        this.msgTitle = this.$t('IMG_MSG_SELECT_PLS')
        this.msgError = this.$t('IMG_MSG_SELECT_PLS2')
      } else if (this.opentype === 'building') {
        this.msgTitle = this.$t('IMG_MSG_SELECT_PLS')
        this.msgError = this.$t('IMG_MSG_SELECT_PLS2')
      }
    },
    async setParam () {
      if (this.viewTab === 'icon') {
        var param = {}
        if (this.selectedId !== '') {
          param.selectedId = this.selectedId
          param.selectPath = this.selectPath
          param.iconType = this.viewTab
          this.$emit('makeParam', param)
        }
      } else if (this.viewTab === 'img') {
        if (this.selectedImgPath !== undefined && this.selectedImgPath !== null && this.selectedImgPath !== '') {
          if (this.selectedImgFilekey !== undefined && this.selectedImgFilekey !== null && this.selectedImgFilekey !== '') {
          }
        } else {
          await this.formSubmit()
        }
        param = {}
        param.selectedId = this.selectedImgFilekey
        param.selectPath = this.selectedImgPath
        param.iconType = this.viewTab
        this.$removeHistoryStack()
        this.$emit('makeParam', param)
      }
    },
    selectChanInfo (value) {
      this.selectedId = value.imageFilekey
      if (value.domainPath) {
        this.selectPath = value.domainPath + value.pathMtext
      } else {
        this.selectPath = value.pathMtext
      }
    },
    async handleImageUpload (event) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1500,
        useWebWorker: true
      }

      if (this.$refs.selectFileChangeIconNBG.files.length > 0) {
        // 0 번째 파일을 가져 온다.
        this.selectedImgPath = ''
        this.selectedImgFilekey = ''
        this.selectFile = null
        this.previewImgUrl = null
        this.cropperYn = true

        this.selectFile = this.$refs.selectFileChangeIconNBG.files[0]

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
            const compressedFile = await this.$imageCompression(this.selectFile, options)
            console.log('sssssssssaaa', compressedFile)
            compressedFile.name = compressedFile.name.replaceAll(' ', '')

            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob) // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
            var src = null
            if (compressedFile instanceof Blob) {
              src = await this.$imageCompression.getDataUrlFromFile(compressedFile)
              const decodImg = atob(src.split(',')[1])
              const array = []
              for (let i = 0; i < decodImg.length; i++) {
                array.push(decodImg.charCodeAt(i))
              }
              const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
              var newFileName = compressedFile.name
              newFileName = newFileName.replaceAll(' ', '')
              var newFile = new File([Bfile], newFileName)
            } else {
              src = await this.$imageCompression.getDataUrlFromFile(compressedFile)
            }
            console.log(` @@ compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
            console.log(newFile)

            this.previewImgUrl = src
            this.uploadFileList.push({ previewImgUrl: src, addYn: true, file: newFile })
            this.refImg = this.$refs.image

            this.cropper = new Cropper(this.refImg, {
              viewMode: '1',
              dragMode: 'move',
              preview: '.cropperPreviewImg',
              aspectRatio: (this.opentype === 'bgPop' ? 2 / 3 : 1 / 1),
              cropBoxResizable: true,
              wheelZoomRatio: 0.1,
              movable: false
            })
            if (this.opentype === 'bgPop') {
              this.cropper.replace(this.previewImgUrl)
              const intervalHandler = setInterval(() => {
                const imgBox = document.querySelector('.cropper-face')
                if (imgBox) {
                  const div = document.createElement('div')
                  div.style.height = '80%'
                  div.style.marginTop = '30%'
                  div.style.background = 'rgba(50, 50, 80, 0.7)'
                  div.style.pointerEvents = 'none'
                  imgBox.style.opacity = '1'
                  imgBox.style.background = 'rgba(255, 255, 255, 0.1)'
                  imgBox.appendChild(div)
                  clearInterval(intervalHandler)
                }
              }, 100)
            }
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
    async crop () {
      var cropImg = this.cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096, imageSmoothingEnabled: false })
      var dataURL = cropImg.toDataURL('image/jpeg', 0.8)
      const decodImg = atob(dataURL.split(',')[1])
      const array = []
      for (let i = 0; i < decodImg.length; i++) {
        array.push(decodImg.charCodeAt(i))
      }
      const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
      var newSelectFileName = this.selectFile.name
      newSelectFileName = newSelectFileName.replaceAll(' ', '')
      newSelectFileName = newSelectFileName.replaceAll('-', '')
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
        for (var i = 0; i < this.uploadFileList.length; i++) {
          form = new FormData()
          if (this.cropperYn === true) this.uploadFileList[i].file = await this.crop()
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
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      } else {
        this.$showToastPop(this.$t('COMM_MSG_SELECT_FILE'))
      }
      return true
    },
    closePop () {
      this.$removeHistoryStack()
      this.pClosePop()
    },
    preventDefault () {
      return false
    }
  },
  computed: {
    getChanBoxSize () {
      return {
        '--chanBoxSize': window.innerWidth / 4 - 20 + 'px'
      }
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate () {
      var history = this.$store.getters['UB_HISTORY/hStack']
      if (history[history.length - 1] === 'channelImgChangePop') {
        this.closePop()
      }
    }
  }
}
</script>
<style scoped>

.confirmPopWrap {
  width: 90%;
  position: absolute;
  z-index: 9999;
  border-radius: 10px;
  background: #FFFFFF;
  padding: 1rem 2rem;
  overflow: auto;
  left: 5%;
  max-height:700px ;
  box-shadow: 2px 3px 6px 3px #ccc;
  transform: translateY(-50%);
}
.creChanIntroTextWrap {
  padding: 10px 0;
  float: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 50px;
  text-align: left;
}
.creChanIntroTextWrap > img {
  width: 20px;
}
.creChanBigBtn {
  height: 50px; line-height: 50px; background: #6768a7; color: #fff; border-radius: 8px;
  width: 100%;
  margin-top: 10px;
}
.activeTypeBox {
  color: black;
  opacity: 0.4;
}
.activeTypeBox p {
  color: black;
}
.createChannelSelectBox {
  float: left;
  max-width: 300px;
  max-height: 300px;
  width: var(--chanBoxSize);
  height: var(--chanBoxSize);
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.hidden {
  display:none
}
.cropperImgArea img {
  display: block;
  max-width: 100%
}

.popupTop {
  top: 44% !important;
}
.selectImgPopBg {
  width: 100%;
  height: 120vh;
  position: fixed;
  top: 0vh;
  left: 0;
  background: #00000026;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.changeBgPopWrap {
  top: 21%;
  overflow: hidden;
  height: 70vh;
}
.activeBar {
  width: 100% !important;
}
.chanImgContentsWrap {
  overflow: auto;
  width: 100%;
  height: calc(100% - 150px);
  margin-top: 20px;
  float: left;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between
}
.imgContArea {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  float: left;
}
.imgCont {
  width:80%;
  height:80%;
  min-height: 240px;
  cursor: pointer;
  border: 1px solid #ccc;
  overflow: auto;
  border-radius: 5px;
  margin-bottom: 10px;
  float: left;
  max-width: 250px;
  max-height: 250px;
}
.imgForm {
  overflow: hidden;
  cursor: pointer;
  min-height: 50px;
  float: left;
  position: relative;
  height: var(--cardHeight);
  width: calc(100% - 100px);
  min-width: 180px;
}
.selectAgainBtnWrap {
  display: flex;
  justify-content: space-around;
  border-top: 0.5px solid rgba(103, 104, 167, 0.54);
}
.selectAgainBtn {
  word-break: break-word !important;
  white-space: nowrap !important;
}
.chanIconContentsWrap {
  width: 100%;
  float: left;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.iconPopImg {
  width: calc(100% - 20px);
}
</style>
