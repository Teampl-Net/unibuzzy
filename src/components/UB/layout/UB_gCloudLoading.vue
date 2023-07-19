<template>
  <div id="cloudLoading" class="cloud-container">
    <div :class="pEnterCloudsYn ? 'cloud-left-enter' : 'cloud-left-leave'" class="cloud cloud-left" style="background-image: url('/resource/common/trans_cloudLeft.png')!important; background-size: cover; background-repeat: no-repeat;"></div>
    <div :class="pEnterCloudsYn ? 'cloud-right-enter' : 'cloud-right-leave'" class="cloud cloud-right" style="background-image: url('/resource/common/trans_cloudRight.png')!important; background-size: cover; background-repeat: no-repeat;"></div>
  </div>
</template>
<script>
export default {
  props: {
    pEnterCloudsYn: Boolean
  },
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
  z-index: 99999999999999999999999;
  width: 100%;
  height: 100%;
}

.cloud {
  position: absolute;
  transform: translateY(-50%);
  width: 130%;
  height: 130%;
  background-size: cover;
  animation-fill-mode: both;
}

.cloud-left-enter {
  left: -500px;
  top: 0;
  animation: cloud-left-enter 2.5s cubic-bezier(0.8, 0, 0.2, 1) forwards;
}
.cloud-left-leave {
  left: 0px;
  top: 50%;
  animation: cloud-left-leave 2.5s cubic-bezier(0.8, 0, 0.2, 1) forwards;
}

.cloud-right-enter {
  right: -500px;
  top: 80%;
  animation: cloud-right-enter 2.5s cubic-bezier(0.8, 0, 0.2, 1) forwards;
}
.cloud-right-leave {
  right: 0px;
  top: 50%;
  animation: cloud-right-leave 2.5s cubic-bezier(0.8, 0, 0.2, 1) forwards;
}

@keyframes cloud-left-enter {
  0% {
    left: -500px;
    top: 0;
  }
  100% {
    left: 0px;
    top: 50%;
  }
}
@keyframes cloud-left-leave {
  0% {
    left: 0px;
    top: 50%;
  }
  100% {
    left: -500px;
    top: 0;
  }
}

@keyframes cloud-right-enter {
  0% {
    right: -500px;
    top: 80%;
  }
  100% {
    right: 0px;
    top: 50%;
  }
}
@keyframes cloud-right-leave {
  0% {
    right: 0px;
    top: 50%;
  }
  100% {
    right: -500px;
    top: 80%;
  }
}
</style>
