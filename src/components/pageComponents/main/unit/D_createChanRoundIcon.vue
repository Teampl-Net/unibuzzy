<template>
  <div style="width: 70px; height: 100%; float: left; display: flex; margin-right: 10px; flex-direction: column; justify-content: center; align-items: center;" @click="goCreateChannel">
    <div style="position: relative; width: 60px; height: 60px; float: left; border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center; background:#F4F7FF; display: flex; border-radius: 100%; justify-content: center; align-items: center;">
      <img src="../../../../assets/images/common/icon_plus.svg" class="img-w20">
    </div>
    <p class=" font14 w-100P textOverdot fontBold" style="color: #5F61BD">채널 생성</p>
  </div>
</template>
<script>
export default {
  methods: {
    goCreateChannel () {
      var openPopParam = {}
      openPopParam.targetType = 'createChannel'
      openPopParam.popHeaderText = '채널 생성'
      this.$emit('openPop', openPopParam)
    }
  }
}
</script>
<style scoped>

</style>
