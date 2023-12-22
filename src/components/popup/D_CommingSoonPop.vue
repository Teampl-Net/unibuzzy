<template>
  <div class="boardListWrap">
    <div class="font16 fontBold w100P boardListTitle">
      <div class="boardListTitleText">
        <!-- <img src="/resource/logo/gtLogo.png" alt="" /> -->
        <p class="textOverdot textLeft font25">
        {{ pClickedInfo ? pClickedInfo : '' }}
        </p>
      </div>
      <div class="cursorP closeBox" @click="pClosePop">
        <img src="@/assets/images/common/popup_close.png" alt="" />
      </div>
    </div>
    <div style="padding-top:50px;">
    <p class="fontBold">
    Coming Soon! 💘
    </p>
    </div>
    </div>
</template>

<script>
export default {
  props: {
    pClosePop: Function,
    pClickedInfo: String
  }
}
</script>

<style scoped>
.boardListWrap {
  padding: 10px 20px;
  background: rgb(255 255 255 / 65%);
  backdrop-filter: blur(9px);
  position: absolute;
  z-index: 9999;
  bottom: 10%;
  box-shadow: rgb(0 0 0 / 26%) 0px -6px 13px 4px;
  left: 5%;
  height: 80%;
  width: 90%;
  border-radius: 0.8rem 0.8rem 0.8rem 0.8rem;
}
.boardListTitle {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.boardListTitleText {
  display: flex;
  align-items: center;
  width: calc(100% - 25px);
}
.boardListTitleText > img {
  width: 45px;
  margin-right: 5px;
}
.boardListTitleText > p {
  width: calc(100% - 40px);
}
.closeBox,
.closeBox > img {
  width: 25px;
}
</style>
