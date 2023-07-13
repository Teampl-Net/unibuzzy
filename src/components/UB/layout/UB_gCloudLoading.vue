<template>
  <transition name="cloud-transition">
    <div id="cloudLoading" v-if="showCloudsYn" class="cloud-container">
      <div class="cloud cloud-left" style="background-image: url('/resource/common/trans_cloudLeft.png')!important; background-size: cover; background-repeat: no-repeat;"></div>
      <div class="cloud cloud-right" style="background-image: url('/resource/common/trans_cloudRight.png')!important; background-size: cover; background-repeat: no-repeat;"></div>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      showCloudsYn: true
    }
  }
}
</script>
<style scoped>
.cloud-container {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  width: 100%;
  height: 100%;
}

.cloud {
  position: absolute;
  transform: translateY(-50%);
  width: 100%;
  height: 100%;
  background-size: cover;
  animation-fill-mode: both;
}

.cloud-left {
  top: 0;
  left: -200px;
  animation: cloud-left-enter 3s alternate infinite;
  animation-iteration-count: 2;
}

.cloud-right {
  top: 50%;
  right: -200px;
  animation: cloud-right-enter 3s alternate infinite;
  animation-iteration-count:2;
}

@keyframes cloud-left-enter {
  0% {
    left: -500px;
    top: 0;
  }
  100% {
    left: 0;
    top: 50%;
  }
}

@keyframes cloud-right-enter {
  0% {
    right: -500px;
    top: 80%;
  }
  100% {
    right: 0;
    top: 50%;
  }
}
</style>
