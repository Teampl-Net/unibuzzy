<template>
  <div style="width: 100vw; height: 100vh; position: fixed; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; z-index: 9999;" @click="this.$emit('no')"></div>
    <div class="firstFollowerPop" >
    <!-- <div style="width: 50%; height: 50%; padding: 0 20px; overflow: auto;" > -->
    <div class="creChanIntroTextWrap" style="width: 100%; min-height: 50px; text-align: left;">
        <p class="fontBold font20">우리 채널 둘러보기</p>
        <!-- <p style="font-size:14px">채널 종류를 선택해주세요</p> -->
        <!-- <p>채널 종류를 선택해주시면<br>필요한 서류를 알려드릴게요!</p> -->
    </div>
    <div style="width: 100%; margin-top: 20px; float: left; padding: 10px;">
      <div @click="goChanMain" class="fl" style="width: 100%; background-color: #6768A7; color: white; padding: 10px; border-radius: 10px; margin-bottom: 50px;">채널 메인 바로 가기</div>
      <div @click="applyMember" class="fl" style="width: 100%; background-color: #6768A7; color: white; padding: 10px; border-radius: 10px; ">멤버 신청하기</div>
    </div>
  </div>

</template>
<script>
/* eslint-disable */
export default {
  methods: {
    goChanMain() {
      this.$emit('applyMember', false)
    },
    applyMember() {
      this.$emit('applyMember', true)
    }
  }
}
</script>
<style>
.firstFollowerPop{width: 90%; position: fixed; z-index: 9999; top: 50%; border-radius: 10px; background: #FFFFFF; transform: translate(0,-50%);
  padding: 1rem 2rem;
  overflow: auto;
  left: 5%;
  /* height: 70%; */
  max-height:700px ;
  box-shadow: 2px 3px 6px 3px #ccc;
}
.creChanIntroTextWrap{padding: 10px 0; float: left; border-bottom: 1px solid #ccc;}

</style>