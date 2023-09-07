<template>
  <div class="w100P userWrap">
    <div class="userImgWrap">
      <img :style="pUserData.mngMemberYn? 'border: 3px solid #8183d6':'border: 3px solid #999'" :src="pUserData.domainPath && pUserData.domainPath !== ''? pUserData.domainPath + pUserData.userProfileImg:pUserData.userProfileImg" alt="">
      <div class="CWhiteBgColor crownImg" v-if="pUserData.ownerYn">
          <img src="@/assets/images/channel/ownerChannel_crown.svg" alt="">
      </div>
    </div>
    <div class="textOverdot textLeft userNameWrap" style="height: 25px;">
      <p class="fontBold mLeft10">{{ $changeText(pUserData.userNameMtext) }}</p>
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
.userWrap {
  background: #fff;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}
.userImgWrap {
  width: 50px;
  height: 50px;
  position: relative;
}
.userImgWrap > img {
  border-radius: 50%;
  width: 100%;
}
.crownImg {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  bottom: 0;
  width: 20px;
  height: 20px;
  border-radius: 100%;
}
.crownImg > img {
  width: 90%;
  float: left;
}
.userNameWrap {
  width: calc(100% - 60px);
}
</style>
