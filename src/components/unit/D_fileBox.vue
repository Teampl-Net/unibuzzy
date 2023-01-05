<template>
  <div v-if="GE_FILE_LIST" style="margin-bottom: 10px; width: 100%; height: 150px; background-color: #fff; box-shadow: rgb(103 104 167 / 40%) 0px 1px 3px; border-radius: 8px; padding: 12px 20px; display: flex; flex-direction: column; justify-content: space-between;">
      <div class="attachedFileTitle" style="width: 100%; height: 50px;">
        <p class="fl textLeft textOverdot commonBlack fontBold font16" style="max-width: calc(100% - 110px);" >
          <img :src="$settingFileIcon(contentsEle.fileName)" style="float: left; margin-right: 5px; margin-top: 4px;" alt="">
          {{getFileName(contentsEle.fileName)}}
        </p>
        <p class="fl textLeft commonBlack fontBold font16" style="width: 30px;">.{{ getFileExt(contentsEle.fileName) }}</p>
        <p class="fr textLeft commonBlack font16">({{ $byteConvert(contentsEle.fileSizeKb) }})</p>
        <div style="clear: both; font-weight: normal; display: flex; align-items: center; justify-content: space-between;" class="font14 textLeft">
          <div class="textOverdot" style="width: 100%;">
            <img src="../../assets/images/footer/icon_people.svg" class="img-w12" alt="">
            &nbsp;{{ GE_FILE_LIST.creUserName }}
          </div>
        </div>
      </div>
      <smallContentsBox :contentsEle="GE_FILE_LIST"></smallContentsBox>
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
    getFileExt (fileName) {
      var fileExt = fileName.substring(
        fileName.lastIndexOf('.') + 1
      )
      return fileExt
    },
    getFileName (fileFullName) {
      var idx = fileFullName.lastIndexOf('.') + 1
      var fileName = fileFullName.substring(0, idx - 1)
      return fileName
    }
  }
}
</script>
