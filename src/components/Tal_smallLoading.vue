<template>
    <!-- <div class="layerPopup"> -->
        <div v-if="showYn" ref="sSpinner" class="spinner"></div>
    <!-- </div> -->
</template>
<script>
export default {
  created () {
    var this_ = this
    setTimeout(() => {
      this_.showYn = false
      console.log('end')
    }, 3000)
  },
  data () {
    return {
      showYn: false
    }
  },
  methods: {
    show () {
      this.showYn = true
      // this.$refs.sSpinner.style.display = 'block'
    },
    hide () {
      this.showYn = false
      // this.$refs.sSpinner.style.display = 'none'
    }
  }
}
</script>

<style>
/* .layerPopup{
  width:100%;
  height:1rem;
  position: relative;
  display:block;
  float: left;
} */
.spinner {
    position: absolute;
    /* top: 50%; */
    /* top:100%; */
    /* transform: translate(-50%); */
    bottom: 0;
    left: calc( 50% - 20px); /* 크기 만큼 빼줘야 가운데 정렬  */
    border: 5px solid #f3f3f3; /* Light grey */
    border-top: 5px solid #6768A7;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spinner 1s linear infinite;
}
@keyframes spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
