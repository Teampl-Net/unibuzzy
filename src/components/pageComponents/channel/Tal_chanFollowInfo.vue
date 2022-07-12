<template>
<!-- <div style="z-index:999; width: 100vw; height: 100vh; position: fixed; top:0; left:0;" @click="this.$emit('closePop')"/> -->
<div style="width:100vw; height:100vh; position:fixed; background: #00000050; top:0; left:0;  z-index:99" @click="closePop" ></div>
<div style="width: 100vw; height: 50%; position:fixed; top:25%; left:0;  z-index:999; display: flex; flex-direction: column; justify-content: center; align-items: center; ">
    <div v-if="type==='admin'" class="fadein greetingTextArea">
      <p class="commonBlack fontBold font16 textLeft ">[{{this.$changeText(chanInfo.nameMtext)}}] 채널를 만드셨네요! </p>
      <p class="commonBlack fontBold font16 textLeft">관리자가 발송하는 모든 알림은 '최신'탭에 볼 수 있어요!</p>
      <p class="commonBlack fontBold font16 textLeft">채널 정보에서 링크를 복사해 구독자를 늘려보세요!</p>
      <p class="commonBlack fontBold font16 textLeft">상단의 보이는 메뉴 눌러 주소록과 게시판을 만들어보세요!</p>
      <p class="commonBlack fontBold font16 textLeft">하단 + 버튼을 눌러 최초의 알림을 보내보세요!</p>
    </div>
    <div v-if="type==='follow'" class="fadein greetingTextArea" >
      <p class="commonBlack fontBold font16 textLeft ">[{{this.$changeText(chanInfo.nameMtext)}}]의 채널 관리자가 발송하는 알림은 '최신'탭에서 볼 수 있고</p>
      <p class="commonBlack fontBold font16 textLeft">알림의 하트와 별은 각각 좋아요, 중요한 탭에서 따로 볼 수 있습니다!</p>
      <p class="commonBlack fontBold font16 textLeft"><br>채널 정보에서 멤버를 신청하여 구성원이 되어보세요!</p>
      <p class="commonBlack fontBold font16 textLeft">상단의 보이는 메뉴 눌러 게시판을 읽어보세요!</p>
    </div>
      <img class="" style="width: 150px; margin-left: 18%;" src="../../../assets/images/common/winkAlimLogo.png" alt="">
      <!-- <gSvg class="boombox"
      viewBox="0 0 200 200 "
      width="200"
      height="200"
      iconColor="rgba(100,100,255,0.80)"
      icon-name="wink"
      ><iconWink  />
      </gSvg> -->
    <!-- </div> -->
    <!-- <gBtnSmall v-on:click="sendBtnClick" btnTitle="닫기" style="position: fixed; bottom: 1rem; left:50%;  transform: translateX(-50%); z-index:99"  /> -->

</div>
  <!-- <div class="chanGreetingArea "> -->
    <!-- <div style="width:25px; height:25px; border-radius:50%; position:absolute; right: -1%; top:-2% ">
      <img src="../../../assets/images/common/close_black.svg" style="width:20px;" alt="">
    </div> -->
    <!-- <div class="commonPopHeaderWrap headerShadow">
      <img src="../../../assets/images/common/icon_back.png" @click="closePop" class="fl commonPopBackBtn" >
      <p class="commonBlack fontBold font16">환영합니다!</p>
    </div> -->

</template>
<script>
export default {
  props: {
    chanInfo: {},
    type: {}
  },
  data () {
    return {
      step: 0

    }
  },
  methods: {
    startStep () {
      setTimeout(() => {
        this.step += 1
      }, 2000)
    },
    closePop () {
      this.$emit('closePop')
    }
  },
  created () {
    console.log(this.chanInfo)
    if (this.chanInfo.userTeamInfo.ownerYn) this.ownerYn = true
    this.startStep()
  }
}
</script>
<style>
.chanGreetingArea{
  width:80vw; max-width:700px; min-width:230px; height: 60vh; max-height:800px; background-color:white; position: absolute; top:50%; left:50%; transform: translate(-50%,-50%); z-index:9; border-radius:20px;  box-shadow: 0px 0px 6px 1px #ccc; overflow:hidden;padding: 0.5rem;
}
.greetingTextArea{
  max-width:90%; line-height:1.4rem; ;padding: 10px 20px; background-color:#ffffffdc; border-radius:20px; margin-bottom: 30px; float: left; min-width:350px;
}
</style>
