<template>
    <div style="display: flex; align-items: center; justify-content: center;" class="">
      <div v-if="infoShown" style="width: 100%; padding: 10px 0; height: 65px; position: absolute; top: 0; left: 0; z-index: 99999999; background: #00000090; color: #FFF;">
        <p style="color: white;margin-bottom: 5px;" class="font16  fontBold">{{creUserName}}</p>
        <a style="color: #fff; float: left;" href="/resource/stickerIcon/sticker_robot.svg"></a>
        <p style="color: #FFFFFF80;" class="font14">{{contentsTitle + ' (' + creDate + ')'}}</p>
        <img @click="this.$emit('closePop')" src="../../../assets/images/common/icon_back_white.png" class="" style="position: fixed; left: 20px; top: 20px; width: 15px;" alt="">
        <img src="../../../assets/images/common/download.svg" @click="download" class="" style="position: fixed; width: 35px; right: 20px; top: 15px;" alt="">
      </div>
      <Splide :options="{ rewind: false, start: startIndex || 0 }" aria-label="Vue Splide Example">
          <SplideSlide v-for="(value, index) in imgList" :key="index">
              <img class="imgList" @click="infoShown = !this.infoShown" :src="value.src" alt="Sample 1">
          </SplideSlide>
      </Splide>
    <!-- <div v-if="infoShown" style="width: 100%; padding: 10px 0; height: 65px; position: absolute; bottom: 0; left: 0; z-index: 99999999; background: #00000090; color: #FFF;">
      <img @click="this.$emit('closePop')" src="../../../assets/images/common/download.svg" class="" style="position: fixed; width: 30px; right: 20px; bottom: 25px;" alt="">
    </div> -->
  </div>
</template>
<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
/* import { onMessage } from '../../../assets/js/webviewInterface' */
export default {
  components: {
    Splide,
    SplideSlide
  },
  props: {
    imgList: {},
    contentsTitle: {},
    creUserName: {},
    creDate: {},
    startIndex: {}
  },
  data () {
    return {
      infoShown: true
    }
  },
  methods: {
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
        // onMessage('REQ', 'saveCameraRoll')
        // var pom = document.createElement('a')
        var selectImg = document.querySelectorAll('.is-active > img')[0]
        var src = selectImg.src
        src = src.replace('http://', '')
        var srcList = src.split('/')
        var srcStr = ''
        for (var i = 1; i < srcList.length; i++) {
          srcStr += '/' + srcList[i]
        }
        var response = await this.$commonAxiosFunction({
          url: '/tp.downloadFile',
          param: { url: srcStr, fileName: 'thealim20220801.jpg' }
        })
        console.log(response)
        const blob = new Blob([response.data])
        // 특정 타입을 정의해야 경우에는 옵션을 사용해 MIME 유형을 정의 할 수 있습니다.
        // const blob = new Blob([this.content], {type: 'text/plain'})

        // blob을 사용해 객체 URL을 생성합니다.
        const fileObjectUrl = window.URL.createObjectURL(blob)

        // blob 객체 URL을 설정할 링크를 만듭니다.
        const link = document.createElement('a')
        link.href = fileObjectUrl
        link.style.display = 'none'

        // 다운로드 파일 이름을 지정 할 수 있습니다.
        // 일반적으로 서버에서 전달해준 파일 이름은 응답 Header의 Content-Disposition에 설정됩니다.
        link.download = this.extractDownloadFilename(response)

        // 다운로드 파일 이름을 추출하는 함수

        // 다운로드 파일의 이름은 직접 지정 할 수 있습니다.
        // link.download = "sample-file.xlsx";

        // 링크를 body에 추가하고 강제로 click 이벤트를 발생시켜 파일 다운로드를 실행시킵니다.
        document.body.appendChild(link)
        link.click()
        link.remove()

        // 다운로드가 끝난 리소스(객체 URL)를 해제합니다.
        window.URL.revokeObjectURL(fileObjectUrl)
        /* pom.setAttribute('href', selectImg.src)
        pom.setAttribute('download', 'thealim20220801')
        // eslint-disable-next-line no-debugger
        debugger
        if (document.createEvent) {
          var event = document.createEvent('MouseEvents')
          event.initEvent('click', true, true)
          pom.dispatchEvent(event)
        } else {
          pom.click()
        } */
        /*  const element = document.createElement('a')
        element.setAttribute('href', '/resource/stickerIcon/sticker_robot.svg')
        element.click() */
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
