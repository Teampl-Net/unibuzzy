<i18n>
{
  "ko": {
    "SEAR_TAB_ACT_CAHNNEL": "최근 수정일"
  },
  "en": {
    "SEAR_TAB_ACT_CAHNNEL": "Recent"
  }
}
</i18n>
<template>
  <div class="w100P pSide-1 boardCardWrap" :class="{BoardCardBox: $route.path === '/'}" @click="goBoardMain">
    <div class="boardColorBox" :style="`background-color: ${boardElement.picBgPath}`">
      <img :src="require(`@/assets/images/editChan/icon_board.svg`)" alt="board"/>
    </div>
    <div class="fl mleft-1">
      <div class="w100P fl font16 fontBold textLeft grayBlack ">
        <div class="w100P" style="display: flex; align-items: center;">
          <p style="max-width: calc(100% - 30px);">{{ $changeText(boardElement.cabinetNameMtext)  }}</p>
          <img :src="require(`@/assets/images/editChan/icon_board.svg`)" alt="board"/>
        </div>
        <p class="fr font13 lightGray fontNomal">{{ $t("SEAR_TAB_ACT_CAHNNEL") + " " +$changeDateFormat(boardElement.cabUpdDate) }}</p></div>
      <p class="w100P fl font14 textLeft grayBlack">{{ $changeText(boardElement.memoMtext) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    boardElement: {}
  },
  methods: {
    goBoardMain () {
      var openPopParam = {}
      openPopParam.targetKey = this.boardElement.teamKey
      openPopParam.targetType = 'chanDetail'
      this.$emit('openPop', openPopParam)
    }
  }
}
</script>

<style scoped>
.BoardCardBox {
  box-shadow:inset 0 0 5px rgba(0,0,0,0);
  transition:all .3s;
}
.BoardCardBox:hover {
  box-shadow:inset 0 0 12px rgba(97, 97, 97, 0.6), 0 0 7px rgba(255,255,255,0.5);
}
.chanLogoImgWrap {
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  position: relative;
  flex-shrink: 0
}
.boardCardWrap {
  background:rgba(255,255,255,0.5);
  margin-top:10px;
  border-radius:10px;
  min-height:80px;
  border-bottom:1px solid #cccccc70;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
}
.boardColorBox {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 2px solid #bbb;
  display:flex;
  justify-content:center;
  align-items:center;
}
.boardColorBox img {
  width: 20px;
}
.boardColorBox + div {
  width: calc(100% - 65px - 1rem);
}
.boardColorBox + div > div > div {
  display: flex;
  align-items: center;
}
.boardColorBox + div > div > div > p {
  max-width: calc(100% - 30px);
}
.boardColorBox + div > div > div > img {
  width:20px; margin-left: 10px;
}
</style>
