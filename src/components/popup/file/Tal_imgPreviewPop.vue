<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
  <div style="display: flex; align-items: center; color: #FFF; justify-content: center;"  class="">
    <commonConfirmPop v-if="saveOkPopShowYn" @no="this.saveOkPopShowYn=false" confirmType="timeout" :confirmText="popText" />
    <div v-if="infoShown" style="width: 100%; padding: 10px 0; height: 65px; position: fixed; top: 0; left: 0; z-index: 3; background: #00000090; color: #FFF;">
      <p style="color: white;margin-bottom: 5px;"  @click="changeIndex" class="font16  fontBold">{{$changeText(creUserName)}}</p>
      <a style="color: #fff; float: left;" href="/resource/stickerIcon/sticker_robot.svg"></a>
      <img @click="backClick" src="../../../assets/images/common/icon_back_white.png" class="" style="position: absolute; left: 20px; top: 20px; width: 15px;" alt="">
      <img src="../../../assets/images/common/download.svg"  @click="download" class="" style="position: absolute; width: 35px; right: 20px; top: 15px;" alt="">
    </div>
    <div v-if="imgList.length > 0" class="previewWrap">
       <!-- <div
        v-for="(src, index) in imgs"
        :key="index"
        class="pic"
        @click="() => showImg(index)"
        >
            <img :src="src">
        </div> -->
        <!-- {{indexRef}} -->
        <vue-easy-lightbox :zoomScale="0.6" :swipeTolerance="5" :visible="visible" :imgs="imgList" :index="goIndex" @hide="handleHide" :maskClosable="true">
        </vue-easy-lightbox>
    </div>
  </div>
</template>
<script>
import commonConfirmPop from '../confirmPop/Tal_commonConfirmPop.vue'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import { onMessage } from '../../../assets/js/webviewInterface'
/* import 'vue-inner-image-zoom/lib/vue-inner-image-zoom.css'
import InnerImageZoom from 'vue-inner-image-zoom' */
export default {
  components: {
    commonConfirmPop
    /* InnerImageZoom */
    // VZoomerGallery: VueZoomer.Gallery,
  },
  props: {
    contentsTitle: {},
    creUserName: {},
    creDate: {},
    startIndex: {},
    mFileKey: {},
    pImgList: {}
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
      imgs: [],
      visible: false,
      index: 0, // default: 0,
      indexRef: 0,
      goIndex: 0
    }
  },
  created () {
    console.log(this.startIndex)
    console.log(this.mFileKey)
    var this_ = this
    if (this.pImgList) {
      this.imgList = this.pImgList
      for (var i = 0; i < this_.imgList.length; i++) {
      // this.imgList[i].src = this.imgList[i].pathMtext
        this_.imgList[i].src = this_.imgList[i].domainPath + this_.imgList[i].pathMtext
        this_.imgList[i].title = this_.imgList[i].fileKey
      // var imgUrl = this.imgList[i].domainPath + this.imgList[i].pathMtext
      // this.imgs.push(imgUrl)
      }
    } else {
      this.getImgList().then(response => {
        console.log(response)
        this_.imgList = response
        for (var i = 0; i < this_.imgList.length; i++) {
          // this.imgList[i].src = this.imgList[i].pathMtext
          this_.imgList[i].src = this_.imgList[i].domainPath + this_.imgList[i].pathMtext
          this_.imgList[i].title = this_.imgList[i].fileKey
          // var imgUrl = this.imgList[i].domainPath + this.imgList[i].pathMtext
          // this.imgs.push(imgUrl)
        }
      })
    }

    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'previewImgPop' + history.length
    // console.log(history)
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
    // console.log(this.imgList)
    // this.imgs.push(this.imgList[0].pathMtext)
  },
  updated () {
    var clickImg = document.querySelector('.vel-img')
    if (!clickImg) return
    clickImg.addEventListener('click', (event) => {
    })
  },
  mounted () {
    var this_ = this
    this.$nextTick(() => {
      setTimeout(() => {
        this_.showImg()
      }, 1200)
    })
    var clickImg = document.querySelector('.vel-img')
    if (!clickImg) return
    clickImg.addEventListener('click', (event) => {
    })
    // document.getElementById('viewport').setAttribute('content', 'initial-scale=1.0, maximum-scale=1.0')
    // document.getElementById('viewport').setAttribute('content', 'initial-scale=1.0, maximum-scale=2.0')
  },
  beforeUnmount () {
    // document.getElementById('viewport').setAttribute('content', 'initial-scale=1.0, maximum-scale=1.0')
  },
  methods: {
    changeIndex () {
      var this_ = this
      if (this_.startIndex) {
        this_.goIndex = this_.startIndex
        console.log(this_.goIndex)
      }
    },
    showImg (index) {
      this.changeIndex()
      this.visible = true
    },
    handleHide () {
      this.visible = false
    },
    async getImgList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.mFilekey = this.mFileKey
      param.fileType = 'I'
      param.attachYn = false
      this.imgs = []
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMMFileList',
        param: param
      })
      // console.log(result)
      return result.data.mmFileList
      // // console.log(this.imgs)
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
        var selectImg = Number(document.querySelector('.vel-img-title').textContent)
        var selectImgPath = document.querySelector('.vel-img').src
        if (this.mobileYn) {
          onMessage('REQ', 'saveCameraRoll', selectImgPath)
        } else {
          var fKey = selectImg
          var result = await this.$downloadFile(fKey, selectImgPath)
          console.log(result)
        }
        this.saveOkPopShowYn = true
      } catch (error) {
        // console.log(error)
      }
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.popId === hStack[hStack.length - 1]) {
                this.closeSubPop()
            } */
    }
  }
}
</script>

<style scoped>
.splide__slide {background: #000;}
.splide__slide {display: flex; justify-content: center; align-items: center;}
.splide__slide img {width: 100%; height: 100%; object-fit: scale-down;}
.previewWrap {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;
  position: relative;
  z-index: 2;
}
</style>
