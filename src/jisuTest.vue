<template>
  <SimpleGallery galleryID="my-test-gallery" :propFirstIndex="0" :propImgList="images" />
</template>

<script>
import SimpleGallery from './components/popup/common/D_commonGalleryPop.vue'

export default {
  name: 'App',
  components: {
    SimpleGallery
  },
  data () {
    return {
      images: [
        {
          src: 'https://source.unsplash.com/Volo9FYUAzU/1620x1080',
          width: 1620,
          height: 1080
        },
        {
          src: 'https://source.unsplash.com/RJzHlbKf6eY/1950x1300',
          width: 1950,
          height: 1300
        },
        {
          src: 'https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg',
          width: 1669,
          height: 2500
        }
      ]
    }
  }
}
</script>
