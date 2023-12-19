<template>
  <div id="test"
    :style="{ height, width: computedWidth }"
    class="skeletonBox"
  >
    <div class="skeletonProfileCard"></div>
    <div style="width: calc(100% - 80px); margin-left: 10px; height: 40px; float: left; display: flex; flex-direction: column;">
        <div style="width: calc(100% - 80px); height: 20px; float: left; background: rgba(231, 231, 231, 0.6); margin-bottom: 5px;"></div>
        <div style="width: 170px; height: 15px; float: left; background: rgba(231, 231, 231, 0.6);"></div>
    </div>
    <div style="width: 100%; height: 50px; float: left; background: rgba(231, 231, 231, 0.6); margin-top: 5px;"></div>
  </div>
</template>

<script>
export default {
  name: 'skeletonBox',
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
      default: '130px',
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
.skeletonProfileCard {
    width: 45px;
    height: 45px;
    overflow: hidden;
    float: left;
    border-radius: 100%;
    background: #e7e7e799;
    display: flex;
    justify-content: center;
    align-items: center;
}
.skeletonBox {
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  padding: 20px;
  margin-bottom: 10px;
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
      rgba(rgba(204, 204, 204, 0.718), 0) 0,
      rgba(rgba(204, 204, 204, 0.718), 0.2) 20%,
      rgba(rgba(204, 204, 204, 0.718), 0.5) 60%,
      rgba(rgba(204, 204, 204, 0.718), 0)
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
