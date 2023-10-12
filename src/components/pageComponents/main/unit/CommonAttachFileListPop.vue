<template>
  <!-- <div class="attachFilePopBg" @click="closePop()"/> -->
  <div class="attachFilePopWrap">
    <div class="attachFilePopArea">
      <p class="textLeft font16 fontBold mbottom-1">{{ $t('COMM_TITLE_FILE_DOWNL') }}</p>
      <img @click="closePop()" src="../../../../assets/images/common/grayXIcon.svg" class="cursorP closeBtnImg" alt="">
      <div class="fl w100P thinScrollBar attachFileListWrap">
        <p class="fl font14 fontBold w100P textLeft" v-if="mAttachFileList.D_ATTACH_FILE_LIST && mAttachFileList.D_ATTACH_FILE_LIST.length > 0">{{ $t('COMM_NAME_CONT_FILE') }}</p>
        <templete v-for="(value, index) in mAttachFileList.D_ATTACH_FILE_LIST" :key="index">
          <div class="attachFileItem">
            <img :src="$settingFileIcon(value.fileName)" alt="">
            <a  :fileKey="value.fileKey" @click="$downloadFile(value.fileKey, value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)"  :filePath="value.domainPath? value.domainPath + value.pathMtext : value.pathMtext" class="font12 fl commonDarkGray textOverdot cursorP"  >
            {{value.fileName}}
            </a>
            <img @click="selectAttachedFile(value.myFilekey, value, index, 'F')" :src="value.myFilekey? require('../../../../assets/images/common/colorStarIcon.svg'):require('../../../../assets/images/common/starIcon.svg')" alt="">
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
      mAttachFileList: {}
    }
  },
  props: {
    propFileData: {},
    propTargetType: {}
  },
  created () {
    if (this.propFileData) this.mAttachFileList = JSON.parse(JSON.stringify(this.propFileData))
    this.$addHistoryStack('gAttachFileList')
  },
  beforeUnmount () {
    this.$checkDeleteHistory('gAttachFileList')
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
        file.accessKey = this.mAttachFileList.contentsKey
        file.accessCreUserKey = this.mAttachFileList.creUserKey
        file.ownUserKey = this.GE_USER.userKey
        file.addYn = true
      } else {
        file.myFilekey = myFilekey
        file.addYn = false
      }
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveMyFile',
        param: { file: file }
      })
      if (fileType === 'F') {
        this.mAttachFileList.D_ATTACH_FILE_LIST[index].myFilekey = result.data.myFileKey
      } else if (fileType === 'I') {
        this.mAttachFileList.D_BODY_IMG_FILE_LIST[index].myFilekey = result.data.myFileKey
      }
      this.$emit('updateMemo', this.mAttachFileList.D_ATTACH_FILE_LIST)
    }
  },
  watch: {
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'gAttachFileList') {
        this.closePop()
      }
    }
  },
  computed: {
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['UB_HISTORY/hStack']
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    }
  }
}
</script>

<style scoped>
.attachFilePopBg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #00000010;
  z-index: 20;
  top: 0;
  left: 0
}
.attachFilePopWrap {
  width: 80%;
  word-break: break-all;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 6px 6px 6px 6px;
  left: 10%;
  top: 50%;
  transform:translateY(-50%);
  background: #fff;
  z-index: 100000;
  position: fixed;
}
.attachFilePopArea {
  margin: 15px;
  float: left;
  width: calc(100% - 30px);
  position: relative;
}
.closeBtnImg {
  position: absolute;
  right: 5px;
  top: 0px;
}
.attachFileListWrap {
  padding-left:0.5rem;
  min-height: 150px;
  max-height: 250px;
  height: 35%;
  overflow: hidden auto;
}
.attachFileItem {
  display: flex;
  align-items: center;
  width: 100%;
  word-break: break-all;
  min-height: 30px;
  padding-left:0.3rem;
}
.attachFileItem > a {
  width: calc(100% - 45px);
  text-align: left;
}
.attachFileItem > img:first-child {
  float: left;
  margin-right: 5px;
  margin-top: 1px;
}
.attachFileItem > img:last-child {
  cursor: pointer;
  width: 20px;
  height: 19px;
  margin-left: 5px;
}
</style>
