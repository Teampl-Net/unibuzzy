<template>
  <!-- <div style="width: 100%; height: 100%; padding: 0 20px; > -->
  <div style="width: 100%; float: left;">
    <div style="width: 100%; height: 100vh; position: absolute; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; z-index: 9999;" @click="closePop()"></div>
    <div class="confirmPopWrap" :style="'padding-bottom:' + (this.$STATUS_HEIGHT + 60)+ 'px'" >
    <!-- <div style="width: 50%; height: 50%; padding: 0 20px; overflow: auto;" > -->
        <div class="creChanIntroTextWrap" style="width: 100%; min-height: 50px; text-align: left;">
            <p class="fontBold font18">{{msgTitle}}</p>
        </div>
        <gActiveBar  ref="activeBar" :tabList="this.activeTabList" class="fl" @changeTab= "changeTab" style="width: 100%;" />
        <div id="creChanContentsArea" style="width: 100%; min-height: 300px; margin-top: 20px; float: left; display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between ">
            <div style="width: 100%; height: 100%;"  v-show="viewTab === 'img'">
              <div  :style="'height: ' + this.contentsHeight + 'px; '" style="width: calc(100%); display: flex; flex-direction: column;align-items: center; margin-right: 10px; float: left;">
                <div @click="imgClickToInput" style="width:80%; height:80%; min-height: 240px; cursor: pointer; border: 1px solid #ccc; overflow: auto; border-radius: 5px; margin-bottom: 10px; float: left; max-width: 250px; max-height: 250px;" ref="selectImgPopRef" class="cropperImgArea">
                  <img v-if="changeImgYn = true" id="profileImg" :style="imgMode ==='W' ? 'height: 100%;': 'width: 100%; '" ref="image" :src="previewImgUrl" alt="" class="preview hidden">
                </div>
                <form hidden @submit.prevent="formSubmit" style="overflow: hidden; cursor: pointer; min-height: 50px; float: left; position: relative;height: var(--cardHeight); width: calc(100% - 100px); min-width: 180px; " method="post">
                    <input class="formImageFile" style="width: 100%; float: left;" type="file" title ="선택" accept="image/jpeg, image/png, image/jpg" ref="selectFileChangeIconNBG" id="input-file" @change="handleImageUpload"/>
                </form>
                <div class="fl textLeft w-100P">
                  <p class="fl fontBold font14 mleft-4">터치해서 이미지를 변경할 수 있습니다.</p>
                  <gBtnSmall v-if="cropperYn" class="fl mright-4" btnTitle="다시 선택" @click="changeBtnClick"/>
                </div>
              </div>
            </div>
            <div v-show="viewTab === 'icon'" id="chanIconBox"  style="width: 100%; float: left;">
              <div class="createChannelSelectBox" :class="{activeTypeBox: selectedId ===value.imageFilekey}" @click="selectChanInfo(value)" v-for="(value,index) in teamImgList" :key="index" :style="getChanBoxSize" style="">
                <img v-if="opentype =='iconPop'" :src="(value.domainPath? value.domainPath + value.pathMtext : value.pathMtext) "  style="width: calc(var(--chanBoxSize) - 20px)"/>
                <p class="font15"  v-if="opentype =='iconPop'" >{{this.$changeText(value.codeNameMtext)}}</p>

                <img v-if="opentype =='bgPop'" :src='(value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)' style="width: 100%; height: 100%;" >

              </div>
            </div>
        </div>

        <div @click="setParam" class="creChanBigBtn font18 fl mtop-2 mbottom-05">선택완료</div>

    </div>
  </div>
  <!-- <crop v-if="cropYn" @no="cropYn=false" :imgUrl="previewImgUrl" :selectFile="selectFile" :bgYn="opentype === 'bgPop' ? true : false" @cropImage="cropImage" /> -->
</template>

<script>
// import a from ' resource/channeliconbg/CHAR01.png'\
// import crop from './Tal_cropTest.vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  components: {
    // crop
  },
  props: {
    opentype: {},
    selectIcon: {},
    selectBg: {}
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
    // console.log(this.selectIcon)
    // // console.log(this.opentype)
    this.getCodeList()
    this.setDefaultData()
    this.dataSetting()
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
      selectedBack: '',
      teamImgList: [],
      selectPath: '',
      selectFile: null,
      uploadFileList: [],
      msgTitle: '',
      msgError: '',
      imgMode: 'W',
      previewImgUrl: '',
      contentsHeight: 180,
      popWidth: 0,
      viewTab: 'icon',
      selectedImgPath: '',
      selectedImgFilekey: '',
      activeTabList: [{ display: '아이콘', name: 'icon' }, { display: '직접추가', name: 'img' }],
      cropper: {},
      refImg: {},
      cropYn: false,
      cropperYn: false,
      changeImgYn: true
    }
  },
  methods: {
    imgClickToInput () {
      if (this.cropperYn === false) this.$refs.selectFileChangeIconNBG.click()
    },
    changeBtnClick () {
      // this.cropper.destroy()
      // this.selectFile = []
      // this.uploadFileList = []
      // this.changeImgYn = false
      // this.changeImgYn = true
      this.$refs.selectFileChangeIconNBG.click()
      // this.previewFile()
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
        // .stringify(this.selectIcon))
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
    },
    async changeTab (data) {
      this.viewTab = data
      if (this.opentype === 'bgPop') {
        if (data === 'img') {
          this.previewImgUrl = this.selectBg.selectPath
          this.selectedImgPath = this.selectBg.selectPath
          this.selectedImgFilekey = this.selectBg.selectedId
        // } else if (data === 'icon'){
        }
      } else {
        if (data === 'img') {
          this.previewImgUrl = this.selectIcon.selectPath
          this.selectedImgPath = this.selectIcon.selectPath
          this.selectedImgFilekey = this.selectIcon.selectedId
        }
      }
      // this.dataSetting()
    },
    async getCodeList () {
      var resultList = null
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (this.opentype === 'bgPop') {
        param.groupCode = 'T_BG__'
      } else if (this.opentype === 'iconPop') {
        param.groupCode = 'T_LOGO'
      }
      resultList = await this.$getCodeList(param)
      this.teamImgList = resultList
      // this.contentsHeight = document.getElementById('chanIconBox').scrollHeight
      // var a = this.teamImgList
    },
    setDefaultData () {
      if (this.opentype === 'iconPop') {
        this.msgTitle = '채널을 대표할 아이콘을 선택해주세요.'
        this.msgError = '대표 아이콘을 선택해주세요!'
      } else if (this.opentype === 'bgPop') {
        this.msgTitle = '채널의 배경 사진을 선택해주세요.'
        this.msgError = '배경 사진을 선택해주세요!'
      }
    },
    async setParam () {
      // console.log(this.selectedImgPath)
      // console.log(this.selectedImgFilekey)
      if (this.viewTab === 'icon') {
        // eslint-disable-next-line no-new-object
        var param = new Object()
        if (this.selectedId !== '') {
          param.selectedId = this.selectedId
          param.selectPath = this.selectPath
          param.iconType = this.viewTab
          this.$emit('makeParam', param)
        } else {
        }
      } else if (this.viewTab === 'img') {
        if (this.selectedImgPath !== undefined && this.selectedImgPath !== null && this.selectedImgPath !== '') {
          if (this.selectedImgFilekey !== undefined && this.selectedImgFilekey !== null && this.selectedImgFilekey !== '') {
          }
        } else {
          // this.cropYn = true
          // // console.log(this.previewImgUrl)
          // return
          await this.formSubmit()
        }
        // eslint-disable-next-line no-new-object
        param = new Object()
        param.selectedId = this.selectedImgFilekey
        param.selectPath = this.selectedImgPath
        param.iconType = this.viewTab
        // console.log(param)
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
        // var selectFileName = this.selectFile.name
        // this.selectFile.name = this.selectFile.name.replaceAll(' ', '')
        // console.log(selectFileName)
        // console.log(' ----- selectFileName -------')
        // selectFileName = selectFileName.replaceAll(' ', '')
        // console.log(selectFileName)
        // this.selectFile.name = selectFileName
        // console.log(this.selectFile.name)

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
            console.log('sssssssssaaa', compressedFile)
            compressedFile.name = compressedFile.name.replaceAll(' ', '')
            console.log('_______________________')
            console.log(compressedFile.name)

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
              console.log('_______________________')
              console.log(newFileName)
              var newFile = new File([Bfile], newFileName)
            } else {
              src = await this.$imageCompression.getDataUrlFromFile(compressedFile)
              console.log(src)
            }
            console.log(` @@ compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
            console.log(newFile)
            // console.log(`compressedFile preview url: ${src}`) // smaller than maxSizeMB

            this.previewImgUrl = src
            this.uploadFileList.push({ previewImgUrl: src, addYn: true, file: newFile })
            console.log('this.uploadFileList', this.uploadFileList)
            // editorImgResize1(canvas.toDataURL('image/png', 0.8))
            // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
            this.refImg = this.$refs.image

            console.log(this.refImg)

            this.cropper = new Cropper(this.refImg, {
              viewMode: '1',
              dragMode: 'move',
              preview: '.cropperPreviewImg',
              aspectRatio: (this.opentype === 'bgPop' ? 2 / 3 : 1 / 1),
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
      if (this.$refs.selectFileChangeIconNBG.files.length > 0) {
        this.selectedImgPath = ''
        this.selectedImgFilekey = ''
        this.selectFile = null
        this.previewImgUrl = null
        this.cropperYn = true
        // 0 번째 파일을 가져 온다.
        // for (var k = 0; k < this.$refs.selectFileChangeIconNBG.files.length; k++) {
        // this.selectFile = this.$refs.selectFileChangeIconNBG.files[k]
        this.selectFile = this.$refs.selectFileChangeIconNBG.files[0]
        // 마지막 . 위치를 찾고 + 1 하여 확장자 명을 가져온다.
        // eslint-disable-next-line no-unused-vars
        var tt = this.selectFile
        // console.log('#######################')
        // console.log(this.selectFile.name)
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
                aspectRatio: (thisthis.opentype === 'bgPop' ? 2 / 3 : 1 / 1),
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
          // this.cropYn = true
        }
        // }
      } else {
        return null
        // this.selectFile = null
        // this.previewImgUrl = null
      }
    },
    async cropImage (img) {
      if (this.uploadFileList.length > 0) {
        // console.log(img)
        for (var i = 0; i < this.uploadFileList.length; i++) {
          this.uploadFileList[i].file = img
        }
        await this.formSubmit()

        var param = {}
        param.selectedId = this.selectedImgFilekey
        param.selectPath = this.selectedImgPath
        param.iconType = this.viewTab
        // console.log(param)
        this.$emit('makeParam', param)
      }
    },
    async crop () {
      var cropImg = this.cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096, imageSmoothingEnabled: false, imageSmoothingQuality: 'high' })
      var dataURL = cropImg.toDataURL('image/png', 0.8)
      // const imgBase64 = previewCanvas.toDataURL('image/png', 0.8)
      const decodImg = atob(dataURL.split(',')[1])
      const array = []
      for (let i = 0; i < decodImg.length; i++) {
        array.push(decodImg.charCodeAt(i))
      }
      const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
      var newSelectFileName = this.selectFile.name
      newSelectFileName = newSelectFileName.replaceAll(' ', '')
      newSelectFileName = newSelectFileName.replaceAll('-', '')
      // console.log(encodeURIComponent(newSelectFileName))
      console.log(this.convertFilename(newSelectFileName))
      const files = new File([Bfile], this.convertFilename(newSelectFileName))
      console.log('============= crop img ================')
      console.log(files)

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
            .post('https://m.passtory.net:7443/fileServer/tp.uploadFile', form,
              {
                headers: {
                  'Content-Type': 'multipart/form-data; charset: UTF-8;'
                }
              })
            .then(res => {
              // console.log('res')
              // console.log(res)
              if (res.data.length > 0) {
                var path = res.data[0].domainPath + res.data[0].pathMtext
                this.selectedImgPath = path
                // // eslint-disable-next-line no-debugger
                // debugger
                this.selectedImgFilekey = res.data[0].fileKey
              }
            })
            .catch(error => {
              console.log(error)
            })
          /* } */
          // var selFile = this.selectFileList[i].file
        }
      } else {
        this.$showToastPop('파일을 선택해주세요.')
      }
      return true
    },
    closePop () {
      this.$removeHistoryStack()
      this.$emit('no')
    }
  },
  computed: {
    getChanBoxSize () {
      return {
        // '--chanBoxSize': window.innerWidth / 4 - 20 + 'px'
        '--chanBoxSize': window.innerWidth / 4 - 20 + 'px'
      }
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate () {
      var history = this.$store.getters['D_HISTORY/hStack']
      if (history[history.length - 1] === 'channelImgChangePop') {
        this.closePop()
      }
    }
  }
}
</script>
<style scoped>

.confirmPopWrap{width: 90%; position: absolute; z-index: 9999; top: 50%; border-radius: 10px; background: #FFFFFF;
  padding: 1rem 2rem;
  overflow: auto;
  left: 5%;
  /* height: 70%; */
  max-height:700px ;
  box-shadow: 2px 3px 6px 3px #ccc;
  transform: translateY(-50%);
}
.creChanIntroTextWrap{padding: 10px 0; float: left;}

.creChanBigBtn{
  height: 50px; line-height: 50px; background: #6768a7; color: #fff; border-radius: 8px;
  width: 100%;

  margin-top: 10px;
  /* bottom: 10px;
  left: 5%; */
}
/* .activeTypeBox{background: #6768a7; color: #fff; opacity: 0.5;}*/
.activeTypeBox{ color: black; opacity: 0.4;}
.activeTypeBox p {color: black;}

.createChannelSelectBox{
  float: left;
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
.hidden{
  display:none
}
.cropperImgArea img{
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%
}

</style>
