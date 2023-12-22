<template>
  <div
    :style="{ height, width: computedWidth }"
    class="circleSkeletonBox"
  >
  </div>
</template>

<script>
export default {
  name: 'circleSkeletonBox',
  props: {
    maxWidth: {
      default: 80,
      type: Number
    },
    minWidth: {
      default: 60,
      type: Number
    },
    height: {
      default: '65px',
      type: String
    },
    width: {
      default: '65px',
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
.circleSkeletonBox {
  margin-right: 10px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  overflow: hidden;
  min-width: 65px;
  border-radius: 100%;
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
