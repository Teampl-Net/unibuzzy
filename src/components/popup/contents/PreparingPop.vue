<template>
    <div class="commonPopWrap areaInfoWrap">
        <div class="bdBox">
      <img v-if="pBdClickedYn" src="@/assets/images/main/icon_bd.png" class="h100P" />
      <img v-else src="@/assets/images/main/icon_area.png" class="h100P" />
    </div>
    <div class="font16 fontBold w100P infoPopHeaderBox">
      <div class="headerBox">
        <img src="/resource/logo/gtLogo.png" alt=""> <!--여기-->
        <p class="textOverdot textLeft font25" v-if="pAreaInfo.bdAreaNameMtext === 'Class'"> {{  'Community' }} Area</p>
        <p class="textOverdot textLeft font25" v-else-if="pAreaInfo.bdAreaNameMtext==='Campus'"> {{  'My Day' }} Area</p>
        <p class="textOverdot textLeft font25" v-else-if="pAreaInfo.bdAreaNameMtext==='Living'"> {{  'Friends' }} Area</p>
        <p class="textOverdot textLeft font25" v-else-if="pAreaInfo.bdAreaNameMtext==='Plaza'"> {{  'Invitation' }} Area</p>
        <p class="textOverdot textLeft font25" v-else> {{  pAreaInfo.bdAreaNameMtext }} Area</p>
      </div>
      <div class="cursorP closeIconBox" @click="pClosePop">
        <img src="@/assets/images/common/popup_close.png" alt="">
      </div>
    </div>
    <div class="w100P font25 fontBold" style="padding:20% 0 0 0;">
        This is
        {{ pAreaInfo.bdAreaNameMtext === 'Class' ? 'Community' : pAreaInfo.bdAreaNameMtext === 'Campus' ? 'My Day' : pAreaInfo.bdAreaNameMtext === 'Living' ? 'Friends' : pAreaInfo.bdAreaNameMtext === 'Plaza' ? 'Invitation' : '' }} Area.
        <br>
        It's not ready yet.
    </div>
    </div>
  </template>
<script>
export default {
  props: {
    pClosePop: Function,
    pAreaInfo: {}
  },
  created () {
    console.log('pAreaInfo', this.pAreaInfo)
  },
  methods: {
  }
}
</script>
  <style scoped>
  .commonPopWrap {
    position: absolute;
    width: 80%;
    height: 80%;
    z-index: 99999;
    bottom: 10%;
    left: 10%;
    background: rgba(256, 256, 256, 0.65);
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 9px );
    -webkit-backdrop-filter: blur( 9px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  }
  .areaInfoWrap {
    padding: 10px 20px;
    min-width: 300px;
    position: absolute;
  }
  .bdBox {
  position: absolute;
  top: -45px;
  right: 10px;
  width: 40px;
  height: 45px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px 10px 0 0;
  padding: 5px;
}
.infoPopHeaderBox {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.headerBox {
  display: flex;
  align-items: center;
  width: calc(100% - 25px);
}
.headerBox img {
  width: 45px;
  margin-right: 5px;
}
.headerBox p {
  width: calc(100% - 40px);
}
  </style>
