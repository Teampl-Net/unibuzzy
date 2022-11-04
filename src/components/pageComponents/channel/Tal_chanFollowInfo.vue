<template>
<!-- <div style="z-index:999; width: 100%; height: 100vh; position: absolute; top:0; left:0;" @click="this.$emit('closePop')"/> -->
<div style="width:100%; height:100vh; position:absolute; z-index: 9999; background: rgba(0, 0, 0, 0.5); top:0; left:0; " @click="closePop" ></div>
<gConfirmPop :confirmText='errorMsg' confirmType='timeout' style="z-index:9999999;" v-if="errorPopYn" @no='errorPopYn = false'  />
<div class="zoomInOutPop" style="width: 100%; height: 50%; position:absolute; top:25%; left:0;  z-index:99999; display: flex; flex-direction: column; justify-content: center; align-items: center; ">
    <div v-if="type === 'admin'" class="fadein greetingTextArea">
      <p class="commonBlack fontBold font16 textLeft ">[{{this.$changeText(chanInfo.nameMtext)}}] 채널를 만드셨네요! </p>
      <p class="commonBlack fontBold font16 textLeft">관리자가 발송하는 모든 알림은 '최신'탭에 볼 수 있어요!</p>
      <p class="commonBlack fontBold font16 textLeft">채널 정보에서 링크를 복사해 구독자를 늘려보세요!</p>
      <p class="commonBlack fontBold font16 textLeft">상단의 보이는 메뉴 눌러 주소록과 게시판을 만들어보세요!</p>
      <p class="commonBlack fontBold font16 textLeft">하단 + 버튼을 눌러 최초의 알림을 보내보세요!</p>
    </div>
    <div v-if="type==='follow'" class="fadein w-90P greetingTextArea" >
      <div class="wellcomeHeader fl w-100P" >
        <logo class="wellcomeChanLogoRound fl" :style="'background-image: url(' + (chanInfo.logoDomainPath ? chanInfo.logoDomainPath + chanInfo.logoPathMtext : chanInfo.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center;" > <!-- 채널 로고 부분 --></logo>
        <div class="fl mleft-1" style="width:calc(100% - 100px);"> <!-- 로고 영역 만큼 빼주거나 위에 div에서플렉스먹여야 함 현재는 둘다. -->
          <p class="commonBlack fontBold font20 textLeft fl w-100P" style="line-height: normal; height:22px">환영합니다!<br><br></p>
          <p class="commonBlack font14 textLeft fl mtop-05"> <b>'{{this.$changeText(chanInfo.nameMtext)}}'</b> 채널의 구독자가 되었습니다!<br> 더 많은 활동을 위해 멤버 신청을 해주세요!</p>
        </div>
      </div>

      <div style="width: 100%; min-height: 50px; margin-top: 10px; float: left; margin-top: 20px;display: flex;justify-content: space-evenly;">
        <gBtnSmall @click="applyMember" class="greetingApplyMemberBtn" btnTitle="멤버 신청하기" />
      </div>
      <div style="width: 100%; min-height: 50px; margin-top: 0px; float: left; display: flex;justify-content: space-evenly;">
        <gBtnSmall @click="closePop" btnThema="light" style="border:1px solid #ccc;" class="greetingApplyMemberBtn" btnTitle="나중에 하기" />
      </div>
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
    <!-- <gBtnSmall v-on:click="sendBtnClick" btnTitle="닫기" style="position: absolute; bottom: 1rem; left:50%;  transform: translateX(-50%); z-index:99"  /> -->

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
      errorMsg: '',
      errorPopYn: false
    }
  },
  methods: {
    startStep () {
      console.log(' ###################### ')
      console.log(this.chanInfo)
    },
    closePop () {
      this.$emit('closePop')
    },
    applyMember () {
      this.$emit('applyMember', true)
    },
    async copyText () {
      // eslint-disable-next-line no-undef
      var clip = new ClipboardJS('#copyTextBody')
      var _this = this
      clip.on('success', function (e) {
        _this.errorMsg = '채널 링크가 복사되었습니다!'
        _this.errorPopYn = true
      })
    }
  },
  created () {
    if (this.chanInfo.userTeamInfo !== undefined && this.chanInfo.userTeamInfo !== null && this.chanInfo.userTeamInfo.ownerYn) this.ownerYn = true
    this.startStep()
  }
}
</script>
<style>
.greetingApplyMemberBtn {font-weight: bold !important; float: left !important; height: 40px !important; line-height: 40px !important; width: 100% !important; margin-right: 5px;}
.greetingCopyTextIcon{background: #6768a7; width: 30px; height: 30px; float: left; border-radius: 5px; padding: 0 0 0 1px; margin-right: 10px; margin-left: 10px;}
.chanGreetingArea{
  width:80vw; max-width:700px; min-width:230px; height: 60vh; max-height:800px; background-color:white; position: absolute; top:50%; left:50%; transform: translate(-50%,-50%); z-index:9; border-radius:20px;  box-shadow: 0px 0px 6px 1px #ccc; overflow:hidden;padding: 0.5rem;
}
.greetingTextArea{
  max-width:90%; line-height:1.4rem; ;padding: 20px; background-color:#ffffffe7; border-radius:20px; margin-bottom: 30px; float: left;
}
.wellcomeChanLogoRound{
  width: 80px; height: 80px;
  display: flex; align-items: center; justify-content: center; position: relative;
  border-radius: 110px;
  border-radius: 100%;
  border: 4px solid #ccc; flex-shrink: 0; flex-grow: 0;
}
.wellcomeHeader{
  border-bottom:1px solid #ccc; display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 0.5rem;
}
</style>
