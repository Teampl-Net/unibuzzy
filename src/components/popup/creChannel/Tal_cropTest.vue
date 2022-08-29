<template>
<div style="width:300px; height:200px; position: absolute; z-index:99999999999; top:0; left: 0; background:white; overflow:auto;">
  <div class="w-full p-4 text-center bg-green-200 rounded-t-md">
    <div class="flex justify-between pb-2">
        <h3 class="text-lg font-medium text-gray-900">
            CropperJS!
        </h3>
        <!-- "X" image : heroicons -->
        <svg class="img-w20 h-4 w-4 text-gray-700 cursor-pointer sm:mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </div>
    <div class="flex">
        <div class="w-3/4 mr-4">
            <img ref="image" :src="src" class="hidden" alt="image-edit">
        </div>
        <div class="w-1/4">
            <div class="pb-2">Preview</div>
            <div class="flex items-center justify-center h-32 bg-yellow-100">
                <div class="preview overflow-hidden w-full h-32 text-center bg-gray-200"></div>
            </div>
        </div>
    </div>
  </div>
  <div class="bg-teal-100 p-4 text-right rounded-b-md">
    <button type="button" class="w-32 p-2 m-2 border rounded-md shadow-sm bg-red-600">
      Save
    </button>
    <button type="button" class="w-32 p-2 m-2 border rounded-md shadow-sm bg-white" @click="this.$emit('no')">
      Cancel
    </button>
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
      preview: '.preview'
    })
  },
  computed: {
  },
  props: {
    imgUrl: {}
  },
  data () {
    return {
      src: '/images/girl.jpg',
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
</style>
