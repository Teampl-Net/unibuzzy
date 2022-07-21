<template>
    <div style="" class="">
      <div v-if="infoShown" style="width: 100%; padding: 10px 0; height: 65px; position: absolute; top: 0; left: 0; z-index: 99999999; background: #00000090; color: #FFF;">
        <p style="color: white;margin-bottom: 5px;" class="font16  fontBold">{{creUserName}}</p>
        <p style="color: #FFFFFF80;" class="font14">{{contentsTitle + ' (' + creDate + ')'}}</p>
        <img @click="this.$emit('closePop')" src="../../../assets/images/common/icon_back_white.png" class="" style="position: fixed; left: 20px; top: 20px; width: 15px;" alt="">
        <img @click="this.$emit('closePop')" src="../../../assets/images/common/download.svg" class="" style="position: fixed; width: 35px; right: 20px; top: 15px;" alt="">
      </div>
      <Splide :options="{ rewind: false, start: startIndex || 0 }" aria-label="Vue Splide Example">
          <SplideSlide v-for="(value, index) in imgList" :key="index">
              <img @click="infoShown = !this.infoShown" :src="value.src" alt="Sample 1">
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
  }
}
</script>

<style scoped>
.splide__slide {background: #000;}
.splide__slide {display: flex; justify-content: center; align-items: center;}
.splide__slide img {width: 100%; height: 100%; object-fit: scale-down;}
</style>
