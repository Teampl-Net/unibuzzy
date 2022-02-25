<template>
  <div style="width: 100%; height: 100%;">
    <gPageTitle class="pleft-2" titleText="채널메인" @clickEvnt = "previewChan" :btnYn ="true" btnTitle="채널 미리보기" v-on:click="openPreviewPop()"  />
    <div id="manageChanPage" class="pleft-2">
      <div class="chanInfoWrap">
        <div class="w-100P fl">
          <div class="chanImgWrap">
            <img class="" style="width: 7rem; margin-left: 1.5rem;" src="../resource/images/channer_logo.png" alt="">
            <div class="mtop-1">
              <gWhiteButton :btnName="'배경 변경'"  />
              <gWhiteButton :btnName="'프로필 변경'" style="margin-left: 0.3rem;" />
            </div>
          </div>
          <div class="chanDetailWrap">
            <div class="w-50P fl">
              <p class="chanName">더알림 대학교 대외협력처</p>
              <gWhiteButton :btnName="'변경'" style=" margin-left: 1rem;" />
              <div class="userInfoRow" style=" margin-top: 0.3rem;"><p>채널 개설일 2021.12.21</p></div>
              <div class="userInfoRow"><div class="userInfoTitle">이메일</div><div class="userInfoText">thealimuniv@pushmsg.net</div></div>
              <div class="userInfoRow"><div class="userInfoTitle">연락처</div><div class="userInfoText">02-429-xxxx</div></div>
              <div class="userInfoRow"><div class="userInfoTitle">주소</div><div class="userInfoText">서울특별시 중구 더알림로 1길</div></div>
            </div>
            <div class="chanLatestPushWrap">
              <p class="LatestTitle">최근알림</p>
              <p class="LatestBody" v-html="'기숙사 신청일은 각 학년별로 다릅니다.<br>1학년은 2월7~11일 ...'"></p>
              <span class= "LatestDate" >2022년 2월 3일 11시 03분 52초</span>
            </div>
          </div>
        </div>
      </div>
      <div class="chanInfoCntWrap"></div>
      <div class="w-100P" style="height: 8rem;">
        <div class="chanInfo2Wrap">
          <p class="chanInfoTitle2">총 구독자수</p>
          <p class="chanInfoText2">{{this.followCnt}}1291명</p>
        </div>
        <div class="chanInfo2Wrap">
          <p class="chanInfoTitle2">채널 방문자 수(Today)</p>
          <p class="chanInfoText2">{{this.visitCnt}}591명</p>
        </div>
        <div class="chanInfo2Wrap">
          <p class="chanInfoTitle2">누적 발송 알림 수</p>
          <p class="chanInfoText2">{{this.totalsendPushCnt}}12391명</p>
        </div>
      </div>
      <div class="mainBigTitleWrap">
        <span style="line-height: 40px">채널소개 작성</span>
        <gWhiteButton :btnName="'채널소개수정'" class="mainBigTitleBtn" />
      </div>
      <div class="chanComentBox">
        <div v-html="'안녕하세요? 100년 전통의 글로벌 명문 사학 진취와 혁신의 가치를 지향하는 인재육성교육 더알림 대학교에 오신 여러분을 환영합니다'" ></div>
        <span style= "" class="TextCnt">74/500자</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data () {
    return {
      preViewChanName: '채널미리보기'
    }
  },
  components: {
  },
  methods: {
    openPreviewPop () {
      this.$emit('openPop', 'previewPop')
    }
  }
}
</script>

<style scoped>

.mainBigTitleWrap{width: 100%; height: 3rem; float: left;}
.mainBigTitleWrap >span{color: #6768A7; font-size: 16px; font-weight: bold; float: left; margin-right: 1rem;}
.userInfoRow{width: 100%; height: 1rem; float: left; font-size: 15px; margin-top: 1rem;}
.userInfoTitle{width: 70px; float: left; color: #6768A7; font-weight: bold;}
.userInfoText{float: left; color: #4A4A4A;}
.chanInfo2Wrap{float: left; width: 10rem; height: 100%; margin-right: 10rem}
.chanInfoTitle2{text-align: center; color: #6768A7; font-size: 13px; margin-bottom: 1rem;}
.chanInfoText2{text-align: center; color: #4A4A4A; font-size: 15px; font-weight: bold;}
.chanComentBox{padding: 2rem; color: #4A4A4A; position: relative; font-size: 13px; text-align: left; box-sizing: border-box; width: calc(100% - 5px); height: 240px; border-radius: 10px; box-shadow: inset rgb(0 0 0 / 16%) 0px 0px 9px 0px; float: left; margin-top: 0.5rem;}

.chanImgWrap{width: 15%; min-width: 8rem; float: left; position: relative; }
.chanImgWrap .chanSettingIcon{position: absolute; top: 5.5rem; left: 6.2rem;}
.chanInfoWrap{width: 100%; float: left; margin-top: 1rem;}
.chanDetailWrap{width: 80%; float: left;  color: #6768A7; font-size: 13px;}
.chanDetailWrap .chanName{float: left; color: #4A4A4A; font-size: 25px; font-weight: bold;}

.chanLatestPushWrap{position: relative; width: 50%; float: left; height: 174px; background-color: #EFEFF6; border-radius: 10px;  padding: 1rem 1.7rem;}
.chanLatestPushWrap .LatestTitle{color: #6768A7; font-size: 15px; font-weight: bold; margin-bottom: 1rem;}
.chanLatestPushWrap .LatestBody{font-size: 13px; color: #4A4A4A;}
.chanLatestPushWrap .LatestDate{position: absolute; bottom: 1rem;; right: 2rem; color: #4A4A4A; font-size: 13px;}

.chanInfoCntWrap{width: 100%; height: 2px; background-color: #EFEFEF; float: left; margin: 1.5rem 0;}

.TextCnt{position: absolute; bottom: 1rem;; right: 2rem; color: #6768A7; font-size: 13px;}
</style>
