<template>
  <div v-if="GE_FILE_LIST" style="margin-bottom: 10px; width: 100%; height: 150px; background-color: #fff; box-shadow: rgb(103 104 167 / 40%) 0px 1px 3px; border-radius: 8px; padding: 12px 20px; display: flex; flex-direction: column; justify-content: space-between;">
      <div class="attachedFileTitle" style="width: 100%; height: 50px;">
        <p @click="download" class="fl cursorP textLeft textOverdot commonBlack fontBold font16" style="max-width: calc(100% - 110px);" >
          <img :src="$settingFileIcon(contentsEle.fileName)" style="float: left; margin-right: 5px; margin-top: 4px;" alt="">
          {{getFileName(contentsEle.fileName)}}
        </p>
        <p class="fl textLeft commonBlack fontBold font16" style="width: 30px;">.{{ getFileExt(contentsEle.fileName) }}</p>
        <p class="fr textLeft commonBlack font12 font Bold mtop-03">({{ $byteConvert(contentsEle.fileSizeKb) }})</p>
        <div style="clear: both; font-weight: normal; display: flex; align-items: center; justify-content: space-between;" class="font14 textLeft">
          <div class="textOverdot" style="width: 100%;">
            <img src="../../assets/images/footer/icon_people.svg" class="img-w12" alt="">
            &nbsp;{{ changeUserName(contentsEle.accessCreUserName) }}
            <p class="font12 fr mleft-1 mtop-01" style="max-width: 70px;">{{ this.$changeDateFormat(contentsEle.creDate) }}</p>
          </div>
        </div>
      </div>
      <smallContentsBox @click="goDetail" class="cursorP" :contentsEle="GE_FILE_LIST"></smallContentsBox>
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
  computed: {
    GE_FILE_LIST () {
      var newArr = []
      newArr = this.$getContentsDetail(null, this.contentsEle.contents.contentsKey, this.contentsEle.contents.creTeamKey)
      if (!newArr || newArr.length === 0) {
        return this.contentsEle.contents
      }
      return newArr[0]
    }
  },
  methods: {
    changeUserName (userName) {
      var idx = userName.lastIndexOf('$')
      var result = userName.substring(idx + 1)
      return result
    },
    getFileExt (fileName) {
      var fileExt = fileName.substring(
        fileName.lastIndexOf('.') + 1
      )
      return fileExt
    },
    goDetail () {
      var param = {}
      param.targetType = 'contentsDetail'
      param.targetKey = this.GE_FILE_LIST.contentsKey
      param.jobkindId = this.GE_FILE_LIST.jobkindId
      param.teamKey = this.GE_FILE_LIST.creTeamKey
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
    getFileName (fileFullName) {
      var idx = fileFullName.lastIndexOf('.') + 1
      var fileName = fileFullName.substring(0, idx - 1)
      return fileName
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
