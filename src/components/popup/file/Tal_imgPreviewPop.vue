<template>
  <div style="display: flex; align-items: center; justify-content: center;" class="">
    <commonConfirmPop v-if="saveOkPopShowYn" @no="this.saveOkPopShowYn=false" confirmType="timeout" :confirmText="popText" />
    <div v-if="infoShown" style="width: 100%; padding: 10px 0; height: 65px; position: absolute; top: 0; left: 0; z-index: 99999999; background: #00000090; color: #FFF;">
      <p style="color: white;margin-bottom: 5px;" class="font16  fontBold">{{creUserName}}</p>
      <a style="color: #fff; float: left;" href="/resource/stickerIcon/sticker_robot.svg"></a>
      <img @click="this.$emit('closePop')" src="../../../assets/images/common/icon_back_white.png" class="" style="position: absolute; left: 20px; top: 20px; width: 15px;" alt="">
      <img src="../../../assets/images/common/download.svg"  @click="download" class="" style="position: absolute; width: 35px; right: 20px; top: 15px;" alt="">
    </div>
    <Splide :options="{ rewind: false, start: startIndex || 0 }" aria-label="Vue Splide Example">
        <SplideSlide v-for="(value, index) in imgList" :key="index">
            <!-- <p style="position: absolute; bottom: 0; color: rgb(255 255 255 / 38%);" class="font14">{{value.fileName}}</p> -->
            <img class="imgList" @click="infoShown = !this.infoShown" :src="value.pathMtext" :fileKey="value.fileKey" :mmFilekey="value.mmFilekey" :mfileKey="value.mfilekey" alt="Sample 1">
        </SplideSlide>
    </Splide>
  <!-- <div v-if="infoShown" style="width: 100%; padding: 10px 0; height: 65px; position: absolute; bottom: 0; left: 0; z-index: 99999999; background: #00000090; color: #FFF;">
    <img @click="this.$emit('closePop')" src="../../../assets/images/common/download.svg" class="" style="position: absolute; width: 30px; right: 20px; bottom: 25px;" alt="">
  </div> -->
  </div>
</template>
<script>
import commonConfirmPop from '../confirmPop/Tal_commonConfirmPop.vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { onMessage } from '../../../assets/js/webviewInterface'
export default {
  components: {
    Splide,
    SplideSlide,
    commonConfirmPop
  },
  props: {
    contentsTitle: {},
    creUserName: {},
    creDate: {},
    startIndex: {},
    mFileKey: {}
    /* mobileYn: this.$getMobileYn() */
  },
  data () {
    return {
      infoShown: true,
      imgList: [],
      mobileYn: this.$getMobileYn(),
      saveOkPopShowYn: false,
      popText: '저장되었습니다!'
    }
  },
  created () {
    this.getImgList()
  },
  methods: {
    async getImgList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.mFilekey = this.mFileKey
      // eslint-disable-next-line no-debugger
      debugger
      param.fileType = 'I'
      param.attachYn = false
      var result = await this.$commonAxiosFunction({
        url: 'https://mo.d-alim.com:10443/tp.getMMFileList',
        param: param
      })
      console.log(result)
      this.imgList = result.data.mmFileList
    },
    extractDownloadFilename (response) {
      const disposition = response.headers['content-disposition']
      const fileName = decodeURI(
        disposition
          .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
          .replace(/['"]/g, '')
      )
      return fileName
    },
    async download () {
      try {
        // var pom = document.createElement('a')
        var selectImg = document.querySelectorAll('.is-active > .imgList')[0]
        if (this.mobileYn) {
          onMessage('REQ', 'saveCameraRoll', selectImg.src)
        } else {
          var fKey = selectImg.attributes.fileKey.value
          var result = await this.$downloadFile(fKey)
          console.log(result)
        }
        this.saveOkPopShowYn = true
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.splide__slide {background: #000;}
.splide__slide {display: flex; justify-content: center; align-items: center;}
.splide__slide img {width: 100%; height: 100%; object-fit: scale-down;}
</style>
