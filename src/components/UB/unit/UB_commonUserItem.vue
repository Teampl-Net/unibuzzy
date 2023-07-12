<template>
  <div class="w100P" style="background: #fff; display: flex; align-items: center; padding-bottom: 10px;">
    <div style="width: 50px; height: 50px; position: relative;">
      <img :style="pUserData.mngMemberYn? 'border: 3px solid #8183d6':'border: 3px solid #999'" style="border-radius: 50%; width: 100%" :src="pUserData.domainPath && pUserData.domainPath !== ''? pUserData.domainPath + pUserData.userProfileImg:pUserData.userProfileImg" alt="">
      <div class="CWhiteBgColor" v-if="pUserData.ownerYn" style="position: absolute; right: 0; display: flex; justify-content: center; algin-items: center; padding: 2px; bottom: 0; width: 20px; height: 20px; border-radius: 100%;">
          <img src="@/assets/images/channel/ownerChannel_crown.svg" style="width: 90%; float: left;" alt="">
      </div>
    </div>
    <div class="textOverdot textLeft" style="width: calc(100% - 60px);">
      <p class="fontBold" style="margin-left: 10px;">{{ pUserData.userNameMtext }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pUserData: Object
  }
}
</script>

<style scoped>
</style>
