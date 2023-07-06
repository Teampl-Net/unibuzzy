<template>
  <div @click="closePop()" style="width: 100vw; height: 100vh; position: fixed; background: #00000010; z-index: 20; top: 0; left: 0 " />
  <div class="" style="width: 80%; word-break: break-all; box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2); border-radius: 6px 6px 6px 6px; left: 10%; top: 20%; background: #fff; z-index: 21; position: fixed;">
    <div style=" margin: 15px; float: left; width: calc(100% - 30px); position: relative; " >
      <p class="textLeft font16 fontBold mbottom-1">파일 다운로드</p>
      <img @click="closePop()" src="../../../../assets/images/common/grayXIcon.svg" class="cursorP" style="position: absolute; right: 5px; top: 0px;" alt="">

      <div class="fl w100P thinScrollBar" style="padding-left:0.5rem; min-height: 150px; max-height: 250px; height: 35%; overflow: hidden auto;">
        <p class="fl font14 fontBold w100P textLeft" v-if="mAttatchFileList.D_ATTATCH_FILE_LIST && mAttatchFileList.D_ATTATCH_FILE_LIST.length > 0">첨부파일</p>
        <templete v-for="(value, index) in mAttatchFileList.D_ATTATCH_FILE_LIST" :key="index">
          <div style="display: flex; align-items: center; width: 100%; word-break: break-all; min-height: 30px; padding-left:0.3rem" >
            <img :src="$settingFileIcon(value.fileName)" style="float: left; margin-right: 5px; margin-top: 1px;" alt="">
            <a style="width: calc(100% - 45px); text-align: left;" :fileKey="value.fileKey" @click="$downloadFile(value.fileKey, value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)"  :filePath="value.domainPath? value.domainPath + value.pathMtext : value.pathMtext" class="font12 fl commonDarkGray textOverdot cursorP"  >
            {{value.fileName}}
            </a>
            <img @click="selectAttachedFile(value.myFilekey, value, index, 'F')" style="cursor: pointer; width: 20px; height: 19px; margin-left: 5px;" :src="value.myFilekey? require('../../../../assets/images/common/colorStarIcon.svg'):require('../../../../assets/images/common/starIcon.svg')" alt="">
          </div>
        </templete>
        <p class="fl font14 fontBold w100P textLeft mtop-05" v-if="mAttatchFileList.D_BODY_IMG_FILE_LIST && mAttatchFileList.D_BODY_IMG_FILE_LIST.length > 0">본문 이미지</p>
        <templete v-for="(value, index) in mAttatchFileList.D_BODY_IMG_FILE_LIST" :key="index">
          <div style="display: flex; align-items: center; width: 100%; word-break: break-all;min-height: 30px; padding-left:0.3rem" >
            <img :src="$settingFileIcon(value.fileName)" style="float: left; margin-right: 5px; margin-top: 1px;" alt="">
            <a style="width: calc(100% - 45px); text-align: left;" :fileKey="value.fileKey" @click="$downloadFile(value.fileKey, value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)"  :filePath="value.domainPath? value.domainPath + value.pathMtext : value.pathMtext" class="font12 fl commonDarkGray cursorP textOverdot"  >
            {{value.fileName}}
            </a>
            <img @click="selectAttachedFile(value.myFilekey, value, index, 'I')" style="width: 20px; margin-left: 5px;" :src="value.myFilekey? require('../../../../assets/images/common/colorStarIcon.svg'):require('../../../../assets/images/common/starIcon.svg')" alt="">
          </div>
        </templete>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mAttatchFileList: {}
    }
  },
  props: {
    propFileData: {},
    propTargetType: {}
  },
  created () {
    if (this.propFileData) this.mAttatchFileList = JSON.parse(JSON.stringify(this.propFileData))
    this.$addHistoryStack('gAttatchFileList')
  },
  beforeUnmount () {
    this.$checkDeleteHistory('gAttatchFileList')
  },
  methods: {
    closePop () {
      this.$emit('closePop')
    },
    async selectAttachedFile (myFilekey, value, index, fileType) {
      // eslint-disable-next-line no-new-object
      var file = new Object()
      if (myFilekey === null) {
        file.fileKey = value.fileKey
        file.accessKind = this.propTargetType
        file.accessKey = this.mAttatchFileList.contentsKey
        file.accessCreUserKey = this.mAttatchFileList.creUserKey
        file.ownUserKey = this.GE_USER.userKey
        file.addYn = true
      } else {
        file.myFilekey = myFilekey
        file.addYn = false
      }
      var result = await this.$commonAxiosFunction({
        url: '/service/tp.saveMyFile',
        param: { file: file }
      })
      if (fileType === 'F') {
        this.mAttatchFileList.D_ATTATCH_FILE_LIST[index].myFilekey = result.data.myFileKey
      } else if (fileType === 'I') {
        this.mAttatchFileList.D_BODY_IMG_FILE_LIST[index].myFilekey = result.data.myFileKey
      }
      this.$emit('updateMemo', this.mAttatchFileList.D_ATTATCH_FILE_LIST)
    }
  },
  watch: {
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'gAttatchFileList') {
        this.closePop()
      }
    }
  },
  computed: {
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>

<style>

</style>
