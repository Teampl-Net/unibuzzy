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
  <div
    v-if="GE_FILE_LIST"
    class="fileBoxArea"
    :style="
      contentsEle.ownUserKey === contentsEle.accessCreUserKey
        ? 'background-color: #f8f8ff;'
        : 'background-color: #fff;'
    "
  >
    <div class="attachedFileTitle">
      <p
        @click="download"
        class="fl cursorP textLeft textOverdot commonBlack fontBold font16 fileBoxNameWrap"
      >
        <img :src="$settingFileIcon(contentsEle.fileName)" alt="" />
        {{ getFileName(contentsEle.fileName) }}
      </p>
      <p class="fl textLeft commonBlack fontBold font16 fileBoxExtend">
        .{{ getFileExt(contentsEle.fileName) }}
      </p>
      <p class="fr textLeft commonBlack font12 font Bold mtop-03 textOverdot">
        {{ $byteConvert(contentsEle.fileSizeKb) }}
      </p>
      <div class="font14 textLeft fileBoxInfoWrap">
        <div class="textOverdot w100P">
          <img
            src="@/assets/images/footer/icon_people.svg"
            class="img-w12"
            alt=""
          />
          &nbsp;{{ $changeText(contentsEle.accessCreUserName) }}
          <p class="font12 fr mleft-1 mtop-01 fileBoxCreDate">
            {{ $changeDateFormat(contentsEle.creDate) }}
          </p>
        </div>
      </div>
      <div class="curosrP fileBoxFavBtn" @click="selectAttachedFile">
        <img
          :src="
            myFilekey !== null
              ? require('@/assets/images/common/colorStarIcon.svg')
              : require('@/assets/images/common/starIcon.svg')
          "
          alt=""
        />
      </div>
    </div>
    <img
      v-if="contentsEle.fileType === 'I'"
      class="fileBoxImg"
      @click="openImgPop"
      :src="
        contentsEle.domainPath
          ? contentsEle.domainPath + contentsEle.pathMtext
          : contentsEle.pathMtext
      "
      alt=""
    />
    <div class="textLeft font12 fontBold ml-04">
      {{ $t('FILE_TITLE_RELA_CON') }}
    </div>
    <smallContentsBox
      @click="goDetail"
      :accessKind="contentsEle.accessKind"
      class="cursorP paddingStyle"
      :contentsEle="GE_FILE_LIST"
    ></smallContentsBox>
  </div>
</template>

<script>
import smallContentsBox from '../../unit/contents/CommonSmallContentsBox.vue'
export default {
  components: {
    smallContentsBox
  },
  props: {
    contentsEle: {}
  },
  created() {
    this.myFilekey = this.contentsEle.myFilekey
  },
  data() {
    return {
      myFilekey: null
    }
  },
  computed: {
    GE_FILE_LIST() {
      var newArr = []
      newArr = this.$getContentsDetail(
        null,
        this.contentsEle.contents.contentsKey,
        this.contentsEle.contents.creTeamKey
      )
      if (!newArr || newArr.length === 0) {
        return this.contentsEle.contents
      }
      return newArr[0]
    },
    GE_USER() {
      return this.$store.getters['UB_USER/GE_USER']
    }
  },
  methods: {
    async selectAttachedFile() {
      var file = {}
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
    openImgPop() {
      var returnImgList = []
      var imgObject = {}
      var img = new Image()
      img.src = this.contentsEle.domainPath + this.contentsEle.pathMtext
      imgObject.src = img.src
      imgObject.fileKey = Number(this.contentsEle.fileKey)
      imgObject.width = img.width
      imgObject.height = img.height
      returnImgList.push(imgObject)
      this.$emit('openImgPop', [returnImgList, 0])
    },
    getFileName(fileFullName) {
      var fileName = fileFullName.substring(0, fileFullName.lastIndexOf('.'))
      return fileName
    },
    getFileExt(fileName) {
      var fileExt = fileName.substring(fileName.lastIndexOf('.') + 1)
      return fileExt
    },
    goDetail() {
      var param = {}
      param.targetType = 'contentsDetail'
      param.targetKey = this.GE_FILE_LIST.contentsKey
      param.jobkindId = this.GE_FILE_LIST.jobkindId
      param.teamKey = this.GE_FILE_LIST.creTeamKey
      param.cabinetKey = this.GE_FILE_LIST.cabinetKey
      param.popHeaderText = this.GE_FILE_LIST.nameMtext
      if (param.jobkindId === 'BOAR') {
        param.cabinetKey = this.GE_FILE_LIST.cabinetKey
        param.cabinetNameMtext = this.$changeText(
          this.GE_FILE_LIST.cabinetNameMtext
        )
        if (this.GE_FILE_LIST.cabinetNameMtext) {
          param.popHeaderText = this.GE_FILE_LIST.cabinetNameMtext
        }
      } else {
        param.nameMtext = this.$changeText(param.nameMtext)
        param.teamName = this.$changeText(param.nameMtext)
        if (this.GE_FILE_LIST.nameMtext) {
          param.popHeaderText = this.GE_FILE_LIST.nameMtext
        }
      }
      this.$emit('openPop', param)
    },
    async download() {
      try {
        var filePath = this.contentsEle.domainPath
          ? this.contentsEle.domainPath + this.contentsEle.pathMtext
          : this.contentsEle.pathMtext
        var result = await this.$downloadFile(
          this.contentsEle.fileKey,
          filePath
        )
        console.log(result)
        this.$showToastPop('File saved!')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.fileBoxArea {
  background-color: #fff;
  margin-bottom: 10px;
  width: 100%;
  box-shadow: rgb(103 104 167 / 40%) 0px 1px 3px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.attachedFileTitle {
  width: 100%;
  padding: 12px 20px;
}
.fileBoxNameWrap {
  max-width: calc(100% - 110px);
  line-height: 24px;
}
.fileBoxNameWrap > img {
  width: 16px;
  float: left;
  margin-right: 5px;
}
.fileBoxExtend {
  width: 30px;
}
.fileBoxInfoWrap {
  clear: both;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fileBoxCreDate {
  max-width: 70px;
}
.fileBoxFavBtn {
  float: right;
  width: 20px;
  height: 20px;
}
.fileBoxFavBtn > img {
  width: 20px;
  height: 19px;
}
.fileBoxImg {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
}
.paddingStyle {
  padding: 12px 20px;
}
</style>
