<template>
  <div
    :style="{ height, width: computedWidth }"
    class="chanSkeletonBox"
  >
    <div class="chanSkeletonPfofileCard"></div>
    <div style="width: calc(100% - 70px); margin-left: 10px; height: 50px; float: left; display: flex; flex-direction: column;">
        <div style="width: calc(100% - 80px); height: 23px; float: left; background: rgba(231, 231, 231, 0.6); margin-bottom: 5px;"></div>
        <div style="width: 170px; height: 15px; float: left; background: rgba(231, 231, 231, 0.6);"></div>
        <div style="width: 100px; height: 15px; float: left; background: rgba(231, 231, 231, 0.6); margin-top: 5px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chanSkeletonBox',
  props: {
    maxWidth: {
      default: 100,
      type: Number
    },
    minWidth: {
      default: 80,
      type: Number
    },
    height: {
      default: '100px',
      type: String
    },
    width: {
      default: '100%',
      type: String
    }
  },
  computed: {
    computedWidth () {
      return this.width || `${Math.floor((0.9 * (this.maxWidth - this.minWidth)) + this.minWidth)}%`
    }
  }
}
</script>

<style lang="scss">
.chanSkeletonPfofileCard {
    background: #e7e7e799;
    position: relative;
    // border: 0.5px solid rgba(0, 0, 0, 0.1);
    width: 60px;
    height: 60px;
    float: left;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}
.chanSkeletonBox {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  padding: 20px;
  background-color: #ffffff;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(rgba(204, 204, 204, 0.5), 0) 0,
      rgba(rgba(204, 204, 204, 0.5), 0.2) 20%,
      rgba(rgba(204, 204, 204, 0.5), 0.5) 60%,
      rgba(rgba(204, 204, 204, 0.5), 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
