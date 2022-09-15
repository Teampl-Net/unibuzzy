<template>
<!-- <div style="z-index:999; width: 100%; height: 100vh; position: absolute; top:0; left:0;" @click="this.$emit('closePop')"/> -->
<div style="width:100%; height:100vh; position:absolute; z-index: 9999; background: rgba(0, 0, 0, 0.5); top:0; left:0; " @click="closePop" ></div>
<gConfirmPop :confirmText='errorMsg' confirmType='timeout' style="z-index:9999999;" v-if="errorPopYn" @no='errorPopYn = false'  />
<div class="zoomInOutPop" style="width: 100%; height: 50%; position:absolute; top:25%; left:0;  z-index:99999; display: flex; flex-direction: column; justify-content: center; align-items: center; ">
    <div v-if="type==='admin'" class="fadein greetingTextArea">
      <p class="commonBlack fontBold font16 textLeft ">[{{this.$changeText(chanInfo.nameMtext)}}] 채널를 만드셨네요! </p>
      <p class="commonBlack fontBold font16 textLeft">관리자가 발송하는 모든 알림은 '최신'탭에 볼 수 있어요!</p>
      <p class="commonBlack fontBold font16 textLeft">채널 정보에서 링크를 복사해 구독자를 늘려보세요!</p>
      <p class="commonBlack fontBold font16 textLeft">상단의 보이는 메뉴 눌러 주소록과 게시판을 만들어보세요!</p>
      <p class="commonBlack fontBold font16 textLeft">하단 + 버튼을 눌러 최초의 알림을 보내보세요!</p>
    </div>
    <div v-if="type==='follow'" class="fadein w-90P greetingTextArea" >
      <!-- <p class="commonBlack fontBold font18 textLeft ">환영합니다[{{this.$changeText(chanInfo.nameMtext)}}]채널의 구독자가 되었습니다! <br></p>
      <p class="commonBlack fontBold font16 textLeft"> <br>* 채널 이용하기<br>- 채널이 발송하는 다양한 알림을 받아볼 수 있어요 <br><span class="commonBlack fontBold font16 textLeft" style="margin-left: 15px;">알림에 하트, 별표를 눌러 관심있는 알림을 저장해보세요!</span></p>
      <p class="commonBlack fontBold font16 textLeft">- 채널의 공지사항을 손쉽게 확인해요!<br>- 채널의 다른 구성원들과 다양한 주제를 편하게 소통해보세요!</p>
      <p class="commonBlack fontBold font16 textLeft"><br>*Tip<br>멤버를 신청하여 채널의 구성원이 되어보고, 친구에게 채널을 공유하여 함께 즐겨보세요!</p> -->
      <p class="commonBlack fontBold font22 textLeft">환영합니다!<br><br></p>
      <p class="commonBlack font16 textLeft"><b>'{{this.$changeText(chanInfo.nameMtext)}}'</b> 채널을 구독하였습니다.<br><br></p>
      <p class="commonBlack font16 fontBold textLeft fl mbottom-1" data-clipboard-action="copy" id="copyTextBody" style="height: 30px; border-bottom: 1px solid black; line-height: 30px;" @click="copyText" :data-clipboard-text="'https://thealim.page.link/?link=https://mo.d-alim.com?chanDetail=' + this.chanInfo.teamKey
        + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더편한구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'">채널 링크를 공유</p>
      <p class="commonBlack font16 textLeft fl mbottom-1" style="height: 30px; line-height: 30px;">해 친구들을 초대하세요!</p>
      <div style="width: 100%; min-height: 50px; margin-top: 10px; float: left; display: flex;justify-content: space-evenly;">
        <gBtnSmall @click="applyMember" class="greetingApplyMemberBtn" btnTitle="내정보 공개하기" />
        <gBtnSmall @click="closePop" class="greetingApplyMemberBtn" btnTitle="구독하기" />
        <!-- <gBtnSmall data-clipboard-action="copy" id="copyTextBody" @click="copyText" class="greetingCopyLinkBtn" :data-clipboard-text="'https://thealim.page.link/?link=https://mo.d-alim.com?chanDetail=' + this.chanInfo.teamKey
        + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더편한구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'" btnTitle="채널링크 복사하기" /> -->
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
      step: 0,
      errorMsg: '',
      errorPopYn: false
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
</style>
