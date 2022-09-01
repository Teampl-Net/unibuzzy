<template>
<div style="width:100%; height:100%; position: absolute; z-index:9999; top:0; left: 0; background:#00000020; overflow:auto;" @click="this.$emit('no')"></div>
<div style="width:500px; height:400px; position: absolute; z-index:9999; top:0; left: 0; background:white; overflow:auto;">
  <div class="fl cropperImgArea" style="width:300px; height:300px;">
    <img ref="image" :src="src" class="hidden" alt="image-edit">
  </div>
  <div class="fl">
    <p class="fl commonColor font16 ">PreView</p>
    <div class="">
        <div class="cropperPreviewImg overflow-hidden w-full h-32 text-center bg-gray-200"></div>
    </div>
  </div>
</div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'Home',
  created () {
    this.src = this.imgUrl
  },
  mounted () {
    this.image = this.$refs.image
    this.cropper = new Cropper(this.image, {
      viewMode: '1',
      dragMode: 'move',
      preview: '.cropperPreviewImg',
      aspectRatio: '1/1',
      cropBoxResizable: false,
      wheelZoomRatio: 0.1
    })
  },
  computed: {
  },
  props: {
    imgUrl: {},
    bgYn: { type: Boolean, default: false }
  },
  data () {
    return {
      src: '',
      image: {},
      cropper: {}
    }
  },
  methods: {
  }
}
</script>

<style>
.hidden{
  display:none
}
.cropperImgArea img{
  display: block;
  /* This rule is very important, please don't ignore this */
  max-width: 100%
}
</style>
