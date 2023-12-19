<template>
<div style="width:100%; height:100%; position: absolute; z-index:9999; top:0; left: 0; background:#00000020; overflow:auto;" @click="this.$emit('no')"></div>
<div class="cropPopArea">
  이미지 크롭
  <div class="fl cropperImgArea" style="width:300px; ">
    <img ref="image" :src="src" class="hidden" alt="image-edit">
  </div>
  <div class="fl w-100P" style="display: flex; justify-content: center; align-items: center; ">
    <gBtnSmall btnTitle="적용" @click="crop"/>
    <gBtnSmall btnTitle="취소" @click="cancel" btnThema='light'/>
    <!-- <p class="fl commonColor font16 w-100P">PreView</p>
    <div class="fl w-100P">
        <div class="cropperPreviewImg fl" style="width:100px; height:100px; overflow: hidden; ">
        </div>
    </div> -->
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
    //refImg
    this.image = this.$refs.image
    this.cropper = new Cropper(this.image, {
      viewMode: '1',
      dragMode: 'move',
      preview: '.cropperPreviewImg',
      aspectRatio: (this.bgYn === false ? 1 / 1 : 2 / 3),
      cropBoxResizable: true,
      wheelZoomRatio: 0.1,
      movable: false
    })
    // console.log(this.selectFile)
  },
  computed: {
  },
  props: {
    imgUrl: {},
    bgYn: { type: Boolean, default: false },
    selectFile: {}
  },
  data () {
    return {
      src: '',
      image: {},
      cropper: {}
    }
  },
  methods: {
    cancel () {
      this.$emit('no')
    },
    async crop () {
      var a = this.cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096, imageSmoothingEnabled: false, imageSmoothingQuality: 'high' })
      var dataURL = a.toDataURL('image/png', 0.8)
      // const imgBase64 = previewCanvas.toDataURL('image/png', 0.8)
      const decodImg = atob(dataURL.split(',')[1])
      const array = []
      for (let i = 0; i < decodImg.length; i++) {
        array.push(decodImg.charCodeAt(i))
      }
      const Bfile = new Blob([new Uint8Array(array)], { type: 'image/png' })
      const files = new File([Bfile], this.selectFile.name)

      this.$emit('cropImage', files)

      // this.cropper.getCroppedCanvas().toBlob((blob) => {
      //   const formData = new FormData()
      //   formData.append('croppedImage', blob)
      //   // console.log(formData)
      // })
      // this.$emit('cropImage', cropImg)
      // this.cropper.getCroppedCanvas({
      //   width: 160,
      //   height: 90,
      //   minWidth: 256,
      //   minHeight: 256,
      //   maxWidth: 4096,
      //   maxHeight: 4096,
      //   fillColor: '#fff',
      //   imageSmoothingEnabled: false,
      //   imageSmoothingQuality: 'high'
      // })
      // await this.cropper.getCroppedCanvas().toBlob((blob) => {
      //   const formData = new FormData()

      //   // Pass the image file name as the third parameter if necessary.
      //   formData.append('croppedImage', blob/*, 'example.png' */)
      //   // console.log('sssssssssssssssssssssssssssssss')
      //   // console.log(formData)
      //   this.$emit('cropImage', formData)
      //   // this.$parent.formSubmit()
      // // const formData = new FormData();
      // })
    }
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
.cropPopArea{
  width: 90%;
  position: absolute;
  z-index: 9999;
  top: 50%;
  border-radius: 10px;
  background: #FFFFFF;
  padding: 1rem 2rem;
  overflow: auto;
  left: 5%;
  /* height: 70%; */
  max-height:700px ;
  box-shadow: 2px 3px 6px 3px #ccc;
  transform: translateY(-50%);

  display: flex; flex-direction: column; align-items: center;

}
</style>
