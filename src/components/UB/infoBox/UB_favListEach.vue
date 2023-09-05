<template>
    <div class="UBContentBg">
    <div class="UBContentWrap">
      <img class="UBContentImg" :src="pFavListEach.imgChannBg" />
      <div class="UBContentBox">
        <div class="UBContentTitleBox">
          <div class="UBUsingNumber commonBigText"><span class="UBUsingNumberLine">0</span>{{ pIndex +1 }}</div>
        </div>
        <div class="UBContentTitle commonHeaderText">{{ pFavListEach.favChannName }}</div>
        <div class="UBBody commonTitleTextNoBold">{{ pFavListEach.favChannFollower }}</div>
      </div>
    </div>
  </div>
</template>
<script>

export default ({
  props: {
    pFavListEach: {}
  }
})
</script>
<style scoped>
.UBBody {
  width: 100%; height: 40px; float: left; color: white; word-break: keep-all;
}
.UBContentTitle{
  width: 100%; height: 40px; float: left; margin-top: 20px; color: white;
}
.UBUsingNumberLine {
  border-bottom: 3px solid white;
}
.UBUsingNumber {
  color: #FFD951; float: left;
}
.UBContentTitleBox {
  width: 100%; height: 60px; float: left;
}
.UBContentBox {
  width: 100%; height: 200px;  position: absolute; bottom: 0; float: left; padding: 0 35px 0 30px;
}
.UBContentWrap {
  width: 100%; height: 100%; position: relative;
}
.UBContentImg {
  width: 100%; height: 100%;
}
.UBContentBg {
  width: 400px; height: 400px
}
@media screen and (max-width: 400px) {
  .UBContentBg {
    width: 335px !important;
    height: 335px !important;
  }
  .commonHeaderText {
    font-size: 20px !important;
  }
  .commonTitleTextTextNoBold {
    font-size: 16px !important;
  }
}
</style>
