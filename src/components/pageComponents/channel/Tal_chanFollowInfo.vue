<template>
<!-- <div style="z-index:999; width: 100vw; height: 100vh; position: fixed; top:0; left:0;" @click="this.$emit('closePop')"/> -->
<div style="width:100vw; height:100vh; position:fixed; top:0; left:0;  z-index:99" @click="closePop" >

  <!-- <div class="chanGreetingArea "> -->
    <!-- <div style="width:25px; height:25px; border-radius:50%; position:absolute; right: -1%; top:-2% ">
      <img src="../../../assets/images/common/close_black.svg" style="width:20px;" alt="">
    </div> -->
    <!-- <div class="commonPopHeaderWrap headerShadow">
      <img src="../../../assets/images/common/icon_back.png" @click="closePop" class="fl commonPopBackBtn" >
      <p class="commonBlack fontBold font18">환영합니다!</p>
    </div> -->
    <div v-if="type==='admin'" class="fadein greetingTextArea">
      <p class="commonBlack fontBold textLeft ">[{{this.$changeText(chanInfo.nameMtext)}}] 채널를 만드셨네요! </p>
      <p class="commonBlack fontBold textLeft">관리자가 발송하는 모든 알림은 '최신'탭에 볼 수 있어요!</p>
      <p class="commonBlack fontBold textLeft">채널 정보에서 링크를 복사해 구독자를 늘려보세요!</p>
      <p class="commonBlack fontBold textLeft">상단의 보이는 메뉴 눌러 주소록과 게시판을 만들어보세요!</p>
      <p class="commonBlack fontBold textLeft">하단 + 버튼을 눌러 최초의 알림을 보내보세요!</p>
    </div>
    <div v-if="type==='follow'" class="fadein greetingTextArea" >
      <p class="commonBlack fontBold textLeft ">[{{this.$changeText(chanInfo.nameMtext)}}]의 채널 관리자가 발송하는 알림은 '최신'탭에서 볼 수 있고</p>
      <p class="commonBlack fontBold textLeft">알림의 하트와 별은 각각 좋아요, 중요한 탭에서 따로 볼 수 있습니다!</p>
      <p class="commonBlack fontBold textLeft">채널 정보에서 멤버를 신청하여 구성원이 되어보세요!</p>
      <p class="commonBlack fontBold textLeft">상단의 보이는 메뉴 눌러 게시판을 읽어보세요!</p>
    </div>
    <div  style="position: absolute; top:50%;  left:50%; transform:scale(2.0); z-index:10; opacity: 1 ">
      <img class="winkani" style="" src="../../../assets/images/common/winkAlimLogo.png" alt="">
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

</div>

</template>
<script>
/* eslint-disable */
export default {
    props:{
        chanInfo:{},
        type:{},

    },
    data (){
        return{
            step:0,

        }
    },
    created (){
        this.startStep()
    },
    methods:{
        startStep(){
            setTimeout(()=>{
                this.step += 1
            },2000)
        },
        closePop(){
          this.$emit('closePop')
        }
    }

}
</script>
<style>
.winkani{
  width: 88px;
  height: 100px;
  /* -webkit-animation: dance-and-bounce 2s infinite;
  -moz-animation: dance-and-bounce 2s infinite;
  animation: dance-and-bounce 2s infinite;
  -moz-animation-delay: 2s;
  -webkit-animation-delay: 2s;
  animation-delay: 2s; */
}
.chanGreetingArea{
  width:80vw; max-width:700px; min-width:230px; height: 60vh; max-height:800px; background-color:white; position: absolute; top:50%; left:50%; transform: translate(-50%,-50%); z-index:9; border-radius:20px;  box-shadow: 0px 0px 6px 1px #ccc; overflow:hidden;padding: 0.5rem;
}
.greetingTextArea{
  max-width:90%; line-height:1.4rem; ;padding: 10px 20px; background-color:#ffffff99; border-radius:20px; position: absolute; left:5%; top:18%; z-index:11
}
</style>
