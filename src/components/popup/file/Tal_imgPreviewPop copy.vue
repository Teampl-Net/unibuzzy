<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
  <div style="display: flex; align-items: center; justify-content: center;"  class="">
    <commonConfirmPop v-if="saveOkPopShowYn" @no="this.saveOkPopShowYn=false" confirmType="timeout" :confirmText="popText" />
    <div v-if="infoShown" style="width: 100%; padding: 10px 0; height: 65px; position: absolute; top: 0; left: 0; z-index: 99999999; background: #00000090; color: #FFF;">
      <p style="color: white;margin-bottom: 5px;" class="font16  fontBold">{{creUserName}}</p>
      <a style="color: #fff; float: left;" href="/resource/stickerIcon/sticker_robot.svg"></a>
      <img @click="backClick" src="../../../assets/images/common/icon_back_white.png" class="" style="position: absolute; left: 20px; top: 20px; width: 15px;" alt="">
      <img src="../../../assets/images/common/download.svg"  @click="download" class="" style="position: absolute; width: 35px; right: 20px; top: 15px;" alt="">
    </div>
    <Splide :options="{ rewind: false, drag: true, pauseOnHover: true, start: startIndex}" aria-label="Vue Splide Example">
        <SplideSlide v-for="(value, index) in imgList" :key="index">
            <!-- <p style="position: absolute; bottom: 0; color: rgb(255 255 255 / 38%);" class="font14">{{value.fileName}}</p> -->

                <img class="imgList" :id="'img' + value.fileKey"  @click="infoShown = !this.infoShown" :src="(value.domainPath? value.domainPath + value.pathMtext : value.pathMtext)" :fileKey="value.fileKey" :mmFilekey="value.mmFilekey" :mfileKey="value.mfilekey" alt="Sample 1">
        </SplideSlide>
    </Splide>
    <!-- <inner-image-zoom style="width: 100vw; height: 100vh; position: fixed; left: 0; top: 0;"
                :src="imgList[0].pathMtext"
                :zoomSrc="imgList[0].pathMtext" /> -->
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
/* import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css'
import InnerImageZoom from 'vue-inner-image-zoom' */
export default {
  components: {
    Splide,
    SplideSlide,
    commonConfirmPop
    /* InnerImageZoom */
    // VZoomerGallery: VueZoomer.Gallery,
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
      popText: '저장되었습니다!',
      popId: '',
      zoomed: false,
      imgs: []
    }
  },
  created () {
    this.getImgList() // 임시삭제
    /* var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'previewImgPop' + history.length
    console.log(history)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
    console.log(this.$store.getters['D_HISTORY/hStack']) */
    this.imgs = [
      'https://via.placeholder.com/450.png/',
      'https://via.placeholder.com/300.png/',
      'https://via.placeholder.com/150.png/',
      { src: 'https://via.placeholder.com/450.png/', title: 'this is title' }
    ]
    // this.imgs.push(this.imgList[0].pathMtext)
  },
  mounted () {
    document.getElementById('viewport').setAttribute('content', 'initial-scale=1.0, maximum-scale=1.0')
    // document.getElementById('viewport').setAttribute('content', 'initial-scale=1.0, maximum-scale=2.0')
  },
  unmounted () {
    document.getElementById('viewport').setAttribute('content', 'initial-scale=1.0, maximum-scale=1.0')
  },
  methods: {
    async getImgList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.mFilekey = this.mFileKey
      param.fileType = 'I'
      param.attachYn = false
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.getMMFileList',
        param: param
      })
      console.log(result)
      this.imgList = result.data.mmFileList
    },
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      if (this.popId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
        this.$emit('closePop')
      } else {

      }
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
          var result = await this.$downloadFile(fKey, selectImg.src)
          console.log(result)
        }
        this.saveOkPopShowYn = true
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: { // 임시삭제
    /* historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    } */
  },
  watch: { // 임시삭제
    /* pageUpdate (value, old) {
      this.backClick()
    } */
  }
}
</script>

<style scoped>
.splide__slide {background: #000;}
.splide__slide {display: flex; justify-content: center; align-items: center;}
.splide__slide img {width: 100%; height: 100%; object-fit: scale-down;}
</style>
