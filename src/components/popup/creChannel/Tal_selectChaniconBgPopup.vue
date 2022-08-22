<template>
  <!-- <div style="width: 100%; height: 100%; padding: 0 20px; > -->
  <div style="width: 100%; height: 100vh; position: absolute; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; z-index: 9999;" @click="this.$emit('no')"></div>
  <div class="confirmPopWrap" >
  <!-- <div style="width: 50%; height: 50%; padding: 0 20px; overflow: auto;" > -->
      <div class="creChanIntroTextWrap" style="width: 100%; min-height: 50px; text-align: left;">
          <p class="fontBold font18">{{msgTitle}}</p>
          <!-- <p style="font-size:14px">채널 종류를 선택해주세요</p> -->
          <!-- <p>채널 종류를 선택해주시면<br>필요한 서류를 알려드릴게요!</p> -->
      </div>
      <gActiveBar  ref="activeBar" :tabList="this.activeTabList" class="fl" @changeTab= "changeTab" style="width: 100%;" />
      <!-- <div style="width: 100%; height: calc(100% - 350px); margin-top: 20px; float: left;">  /* change Jeong */ -->
      <div id="creChanContentsArea" style="width: 100%; min-height: 300px; margin-top: 20px; float: left; display: flex; flex-direction: row; flex-wrap: wrap; justify-content: space-between ">
          <div style="width: 100%; height: 100%;"  v-show="viewTab === 'img'">
            <div  :style="'height: ' + this.contentsHeight + 'px; '" style="width: calc(100%); display: flex; flex-direction: column;align-items: center; margin-right: 10px; float: left;">
              <!-- <p class="font15 fontBold fl textLeft" style="line-height: 30px; margin-right: 10px; ">직접 선택</p> -->
              <div @click="this.$refs.selectFile.click()" :style="'width: ' + (this.popWidth * 0.5) + 'px; height: ' + (this.popWidth * 0.5) + 'px;' "  style="cursor: pointer; border: 1px solid #ccc; overflow: hidden; display: flex; justify-content: center; align-items: center; border-radius: 5px; margin-bottom: 10px; float: left; ">
                <img id="profileImg" :style="imgMode ==='W' ? 'height: 100%;': 'width: 100%; '" ref="profileImg" :src="previewImgUrl" alt="">
              </div>
              <form  @submit.prevent="formSubmit" style="overflow: hidden; cursor: pointer; min-height: 50px; float: left position: relative;height: var(--cardHeight); width: calc(100% - 100px); min-width: 180px; " method="post">
                  <input class="formImageFile" style="width: 100%; float: left;" type="file" title ="선택" accept="image/*"  ref="selectFile" id="input-file" @change="previewFile"/>
              </form>
            </div>
          </div>
          <div v-show="viewTab === 'icon'" id="chanIconBox"  style="width: 100%; float: left;">
            <div class="createChannelSelectBox" :class="{activeTypeBox: selectedId ===value.imageFilekey}" @click="selectChanInfo(value)" v-for="(value,index) in teamImgList" :key="index" :style="getChanBoxSize" style="">
              <!-- <img v-if="opentype =='iconPop'" src='/resource/channeliconbg/CHAR01.png' style="width: calc(var(--chanBoxSize) - 20px)"/> -->
              <img v-if="opentype =='iconPop'" :src="value.pathMtext"  style="width: calc(var(--chanBoxSize) - 20px)"/>
              <p class="font15"  v-if="opentype =='iconPop'" >{{this.$changeText(value.codeNameMtext)}}</p>

              <img v-if="opentype =='bgPop'" :src='value.pathMtext' style="width: 100%; height: 100%;" >
              <!-- <img v-if="opentype =='bgPop'" :src='value.pathMtext' style="width: calc(var(--chanBoxSize) + 10px);" > -->

            </div>
          </div>
      </div>

      <div @click="setParam" class="creChanBigBtn font18 fl mtop-2 mbottom-05">선택완료</div>

  </div>
</template>

<script>
// import a from ' resource/channeliconbg/CHAR01.png'\
export default {
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
  },
  created () {
    if (this.opentype === 'bgPop') {
      if (this.selectBg.iconType === 'icon' || this.selectBg.selectedId < 16) {
        console.log(this.selectBg)
        this.viewTab = 'icon'
        this.selectedId = this.selectBg.selectedId
        this.selectPath = this.selectBg.selectPath
      } else if (this.selectBg.iconType === 'img') {
        this.viewTab = 'img'
        this.previewImgUrl = this.selectBg.selectPath
        this.selectedImgPath = this.selectBg.selectPath
        this.selectedImgFilekey = this.selectBg.selectedId
      }
    } else {
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
    console.log(this.selectIcon)
    console.log(this.opentype)
    this.getCodeList()
    this.setDefaultData()
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
      activeTabList: [{ display: '아이콘', name: 'icon' }, { display: '직접추가', name: 'img' }]
    }
  },
  methods: {
    async changeTab (data) {
      this.viewTab = data
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
      console.log(this.selectedImgPath)
      console.log(this.selectedImgFilekey)
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
          await this.formSubmit()
        }
        // eslint-disable-next-line no-new-object
        param = new Object()
        param.selectedId = this.selectedImgFilekey
        param.selectPath = this.selectedImgPath
        param.iconType = this.viewTab
        this.$emit('makeParam', param)
      }
    },
    selectChanInfo (value) {
      this.selectedId = value.imageFilekey
      this.selectPath = value.pathMtext
    },
    async previewFile () {
      this.selectedImgPath = ''
      this.selectedImgFilekey = ''
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
              image.onload = function () {
                // Resize image
                var previewCanvas = document.createElement('canvas')
                var width = image.width
                var height = image.height
                if (width > height) { // 가로모드
                  thisthis.imgMode = 'W'
                  if (width > 600) {
                    height *= 600 / width
                    width = 600
                  }
                } else { // 세로모드
                  thisthis.imgMode = 'H'
                  if (height > 600) {
                    width *= 600 / height
                    height = 600
                  }
                }
                previewCanvas.width = width
                previewCanvas.height = height

                previewCanvas.getContext('2d').drawImage(image, 0, 0, width, height)
                thisthis.previewImgUrl = previewCanvas.toDataURL('image/png', 0.8)
                // eslint-disable-next-line no-debugger
                debugger
                thisthis.uploadFileList.push({ previewImgUrl: previewCanvas.toDataURL('image/png', 0.8), addYn: true, file: thisthis.selectFile })
                // editorImgResize1(canvas.toDataURL('image/png', 0.8))
                // settingSrc(tempImg, canvas.toDataURL('image/png', 0.8))
              }
              image.onerror = function () {

              }
              image.src = e.target.result
              this.previewImgUrl = e.target.result
            }
            reader.readAsDataURL(this.selectFile)
            // await this.$editorImgResize(this.selectFile)
          }
        }
      } else {
        this.selectFile = null
        this.previewImgUrl = null
      }
    },
    async formSubmit () {
      if (this.uploadFileList.length > 0) {
        console.log('this.uploadFileList')
        console.log(this.uploadFileList)
        var form = new FormData()
        var thisthis = this
        for (var i = 0; i < this.uploadFileList.length; i++) {
          form = new FormData()
          // Here we create unique key 'files[i]' in our response dictBase64.decode(data)
          // thisthis.uploadFileList[i].filePath = Base64.decode(thisthis.uploadFileList[i].filePath.replaceAll('data:image/png;base64,', ''))
          form.append('files[0]', (thisthis.uploadFileList[i]).file)
          await this.$axios
          // 파일서버 fileServer fileserver FileServer Fileserver
            .post('https://mo.d-alim.com:12443/tp.uploadFile', form,
              {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
            .then(res => {
              if (res.data.length > 0) {
                var path = res.data[0].pathMtext
                this.selectedImgPath = path
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
        alert('파일을 선택해 주세요.')
      }
      return true
    }
  },
  computed: {
    getChanBoxSize () {
      return {
        // '--chanBoxSize': window.innerWidth / 4 - 20 + 'px'
        '--chanBoxSize': window.innerWidth / 4 - 20 + 'px'
      }
    }
  },
  watch: {
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
</style>
