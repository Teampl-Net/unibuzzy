<i18n>
{
  "ko": {
    "FILE_TITLE_RELA_CON": "관련 콘텐츠"
  },
  "en": {
    "FILE_TITLE_RELA_CON": "Related Content"
  }
}
</i18n>
<template>
  <div v-if="GE_FILE_LIST" :style="this.contentsEle.ownUserKey === this.contentsEle.accessCreUserKey? 'background-color: #f8f8ff;':'background-color: #fff;'" style="background-color: #fff; margin-bottom: 10px; width: 100%; box-shadow: rgb(103 104 167 / 40%) 0px 1px 3px; border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between;">
      <div class="attachedFileTitle" style="width: 100%; padding: 12px 20px;">
        <p @click="download" class="fl cursorP textLeft textOverdot commonBlack fontBold font16" style="max-width: calc(100% - 110px); line-height: 24px;" >
          <img :src="this.$settingFileIcon(contentsEle.fileName)" style="width: 16px; float: left; margin-right: 5px;" alt="">
          {{ getFileName(contentsEle.fileName) }}
        </p>
        <p class="fl textLeft commonBlack fontBold font16" style="width: 30px;">.{{ getFileExt(contentsEle.fileName) }}</p>
        <p class="fr textLeft commonBlack font12 font Bold mtop-03">{{ this.$byteConvert(contentsEle.fileSizeKb) }}</p>
        <div style="clear: both; font-weight: normal; display: flex; align-items: center; justify-content: space-between;" class="font14 textLeft">
          <div class="textOverdot" style="width: 100%;">
            <img src="../../assets/images/footer/icon_people.svg" class="img-w12" alt="">
            &nbsp;{{ this.$changeText(contentsEle.accessCreUserName) }}
            <p class="font12 fr mleft-1 mtop-01" style="max-width: 70px;">{{ this.$changeDateFormat(contentsEle.creDate) }}</p>
          </div>
        </div>
        <div class="curosrP" @click="selectAttachedFile" style="float: right; width: 20px; height: 20px;">
          <img style="width: 20px; height: 19px;" :src="this.myFilekey !== null? require('../../assets/images/common/colorStarIcon.svg'):require('../../assets/images/common/starIcon.svg')" alt="">
        </div>
      </div>
      <img v-if="contentsEle.fileType === 'I'" @click="openImgPop" style="width: 100%; height: auto; margin-bottom: 20px;" :src="this.contentsEle.domainPath ? this.contentsEle.domainPath + this.contentsEle.pathMtext : this.contentsEle.pathMtext" alt="">
      <div class="textLeft font12 fontBold ml-04">{{ $t('FILE_TITLE_RELA_CON') }}</div>
      <smallContentsBox style="padding: 12px 20px;" @click="goDetail" :accessKind="contentsEle.accessKind" class="cursorP" :contentsEle="GE_FILE_LIST"></smallContentsBox>
      <!-- <p class="font14 textRight" style="width: 100%;">다운 {{ contentsEle.dnCount }}</p> -->
    </div>
</template>

<script>
import smallContentsBox from '../popup/common/D_commonSmallContentsBox.vue'
export default {
  name: 'App',
  components: {
    smallContentsBox
  },
  props: {
    contentsEle: {}
  },
  created () {
    this.myFilekey = this.contentsEle.myFilekey
  },
  data () {
    return {
      myFilekey: null
    }
  },
  computed: {
    GE_FILE_LIST () {
      var newArr = []
      newArr = this.$getContentsDetail(null, this.contentsEle.contents.contentsKey, this.contentsEle.contents.creTeamKey)
      if (!newArr || newArr.length === 0) {
        return this.contentsEle.contents
      }
      return newArr[0]
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  methods: {
    async selectAttachedFile () {
      // eslint-disable-next-line no-new-object
      var file = new Object()
      if (this.myFilekey === null) {
        file.fileKey = this.contentsEle.fileKey
        file.accessKind = this.contentsEle.accessKind
        file.accessKey = this.contentsEle.accessKey
        file.accessCreUserKey = this.contentsEle.accessCreUserKey
        file.ownUserKey = this.GE_USER.userKey
        file.addYn = true
      } else {
        file.myFilekey = this.myFilekey
        file.addYn = false
      }
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveMyFile',
        param: { file: file }
      })
      this.myFilekey = result.data.myFileKey
    },
    openImgPop () {
      var returnImgList = []
      var imgObject = {}
      var img = new Image()
      // img.src = this.propImgList[i].domainPath + this.propImgList[i].pathMtext
      img.src = this.contentsEle.domainPath + this.contentsEle.pathMtext
      imgObject.src = img.src
      imgObject.fileKey = Number(this.contentsEle.fileKey)
      imgObject.width = img.width
      imgObject.height = img.height
      returnImgList.push(imgObject)
      this.$emit('openImgPop', [returnImgList, 0])
    },
    getFileName (fileFullName) {
      var fileName = fileFullName.substring(
        0, fileFullName.lastIndexOf('.')
      )
      return fileName
    },
    getFileExt (fileName) {
      var fileExt = fileName.substring(
        fileName.lastIndexOf('.') + 1
      )
      return fileExt
    },
    goDetail () {
      console.log('여기 보세요~~')
      console.log(this.GE_FILE_LIST)
      var param = {}
      param.targetType = 'contentsDetail'
      param.targetKey = this.GE_FILE_LIST.contentsKey
      param.jobkindId = this.GE_FILE_LIST.jobkindId
      param.teamKey = this.GE_FILE_LIST.creTeamKey
      param.cabinetKey = this.GE_FILE_LIST.cabinetKey
      param.popHeaderText = this.GE_FILE_LIST.nameMtext
      if (param.jobkindId === 'BOAR') {
        param.cabinetKey = this.GE_FILE_LIST.cabinetKey
        param.cabinetNameMtext = this.$changeText(this.GE_FILE_LIST.cabinetNameMtext)
        if (this.GE_FILE_LIST.cabinetNameMtext) param.popHeaderText = this.GE_FILE_LIST.cabinetNameMtext
      } else {
        param.nameMtext = this.$changeText(param.nameMtext)
        param.teamName = this.$changeText(param.nameMtext)
        if (this.GE_FILE_LIST.nameMtext) param.popHeaderText = this.GE_FILE_LIST.nameMtext
      }
      this.$emit('openPop', param)
    },
    async download () {
      try {
        var filePath = this.contentsEle.domainPath ? this.contentsEle.domainPath + this.contentsEle.pathMtext : this.contentsEle.pathMtext
        var result = await this.$downloadFile(this.contentsEle.fileKey, filePath)
        console.log(result)
        this.$showToastPop('파일이 저장되었습니다!')
        // this.saveOkPopShowYn = true
      } catch (error) {
        // console.log(error)
      }
    }
  }
}
</script>
