<template>
  <div style="width: 100%; height: 100%;background-color: #fff;overflow: hidden scroll;">
    <!-- 오늘/어제/이번주/이전 -->
    <div class="logWrap">
      <p class="logDate">오늘</p>
      <!-- 채널 로고/ 알림 내용/ 시간 -->
      <div class="logContent">
        <div class="logChanLogo"><img alt="logChanLogoImg" src="../../assets/images/common/logo.png" style="width: 40px; height: 40px; float: left;" /></div>
        <span class="logText">000님이 00채널에 멤버 신청을 하였습니다. <small>1시간</small></span>
      </div>
      <!-- 마지막 -->
      <div class="logContent" style="border-bottom: none; margin-bottom: 10px;">
        <div class="logChanLogo"><img alt="logChanLogoImg" src="../../assets/images/common/logo.png" style="width: 40px; height: 40px; float: left;" /></div>
        <span class="logText">000님이 00채널에 멤버 신청을 하였습니다. <small>1시간</small></span>
      </div>
    </div>
    <div class="logWrap">
      <p class="logDate">어제</p>
      <!-- 채널 로고/ 알림 내용/ 시간 -->
      <div class="logContent">
        <div class="logChanLogo"><img alt="logChanLogoImg" src="../../assets/images/common/logo.png" style="width: 40px; height: 40px; float: left;" /></div>
        <span class="logText">000님이 00채널에 멤버 신청을 하였습니다. <small>1시간</small></span>
      </div>
      <!-- 마지막 -->
      <div class="logContent" style="border-bottom: none; margin-bottom: 10px;">
        <div class="logChanLogo"><img alt="logChanLogoImg" src="../../assets/images/common/logo.png" style="width: 40px; height: 40px; float: left;" /></div>
        <span class="logText">000님이 00채널에 멤버 신청을 하였습니다. <small>1시간</small></span>
      </div>
    </div>
    <div class="logWrap" style="border-bottom: none !important;">
      <p class="logDate">이번주</p>
      <!-- 채널 로고/ 알림 내용/ 시간 -->
      <div class="logContent">
        <div class="logChanLogo"><img alt="logChanLogoImg" src="../../assets/images/common/logo.png" style="width: 40px; height: 40px; float: left;" /></div>
        <span class="logText">000님이 00채널에 멤버 신청을 하였습니다. <small>1시간</small></span>
      </div>
      <div class="logContent">
        <div class="logChanLogo"><img alt="logChanLogoImg" src="../../assets/images/common/logo.png" style="width: 40px; height: 40px; float: left;" /></div>
        <span class="logText">000님이 00채널에 멤버 신청을 하였습니다. <small>1시간</small></span>
      </div>
      <div class="logContent">
        <div class="logChanLogo"><img alt="logChanLogoImg" src="../../assets/images/common/logo.png" style="width: 40px; height: 40px; float: left;" /></div>
        <span class="logText">000님이 00채널에 멤버 신청을 하였습니다. <small>1시간</small></span>
      </div>
      <div class="logContent">
        <div class="logChanLogo"><img alt="logChanLogoImg" src="../../assets/images/common/logo.png" style="width: 40px; height: 40px; float: left;" /></div>
        <span class="logText">000님이 00채널에 멤버 신청을 하였습니다. <small>1시간</small></span>
      </div>
      <!-- 마지막 -->
      <div class="logContent" style="border-bottom: none; margin-bottom: 10px;">
        <div class="logChanLogo"><img alt="logChanLogoImg" src="../../assets/images/common/logo.png" style="width: 40px; height: 40px; float: left;" /></div>
        <span class="logText">000님이 00채널에 멤버 신청을 하였습니다. <small>1시간</small></span>
      </div>
    </div>
    <div class="mbottom-1 font16 fr" style="margin-top: -10px; border-radius: 10px; background-color: #ccc; width: 60px; height: 30px; line-height: 30px;">이전 ></div>
  </div>
</template>
<script>
/* eslint-disable */
</script>
<style>
small {font-size: 14px; color: #aaa; margin-left: 5px;}
.logWrap {width: 100%; min-height: 110px; border-bottom: 1px solid #ccc; float: left;}
.logDate {width: 100%; height: 30px; text-align: left; color: black; font-weight: bold; padding-top: 10px; margin-bottom: 25px; float: left; font-size: 18px;}
.logContent {width: calc(100% - 20px); min-height: 50px; margin-left: 10px; float: left; margin-bottom: 15px; border-bottom: 0.5px solid #ccc;}
.logChanLogo {background-color: #ccc; border-radius: 100%; float: left; margin-right: 10px;}
.logText {width: calc(100%  - 60px); height: 100%; word-break: break-all; font-size: 16px; float: left; text-align: left; padding-bottom: 10px;}
</style>