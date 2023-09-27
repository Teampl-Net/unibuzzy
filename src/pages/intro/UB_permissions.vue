<i18n>
{
  "ko": {
    "APP_NAME": "더알림",
    "APP_DESC1": "가장 편리한",
    "APP_DESC2": "구독-알림",
    "APP_PERMI1": "더알림 앱 이용에 필요한",
    "APP_PERMI2": "접근 권한의 허용이 필요합니다.",
    "PERMI_INTRO": "접근 권한은 더 나은 서비스를 제공하기 위해 사용됩니다. 원할한 이용을 위해서는 알림 / 기기 및 앱 기록 필수 권한입니다.",
  },
  "en": {
    "APP_NAME": "uniBuzzy",
    "APP_DESC1": "Everything for Campus Life",
    "APP_DESC2": "subscribe-notification",
    "APP_PERMI1": "You need to give permissions",
    "APP_PERMI2": "to use uniBuzzy app.",
    "PERMI_INTRO": "Access is used to provide better service. Notification/device and app recording is required for use.",
  }
}
</i18n>
<template >
  <div class="introBackground">
      <div class="introWhiteCard" style="min-height: 300px;">
            <div class="text-start px-4 permissionHeaderWrap">
                <img src="../../assets/images/intro/login/uniB_logo.png" class="fl mtop-03">
                <div class="ms-2 fl permissionHeaderTextWrap">
                    <p class="fl headerFont h100P">{{ $t('APP_NAME') }}</p>
                    <div class="fl ms-1 h100P headerLogoDiv" >
                        <p class="headerFont">{{ $t('APP_DESC1') }}</p>
                        <p class="headerFont">{{ $t('APP_DESC2') }}</p>
                    </div>
                </div>
            </div>
            <div class="text-start py-3 px-4 permissionTitleText">
                <p class="font20 deepColor" >{{ $t('APP_PERMI1') }}<br>{{ $t('APP_PERMI2') }}</p>
                <div class="my-3 permissionLine"></div>
                <p class="font15">{{ $t('PERMI_INTRO') }}</p>
            </div>
      </div>
  </div>

</template>

<script>
import { onMessage } from '../../assets/js/webviewInterface'

export default {
  name: 'tal_permission',
  mounted () {
    setTimeout(() => {
      onMessage('REQ', 'requestUserPermission')
    }, 800)
  }
}
</script>

<style scoped>
p {
  color: #062BB5;
  font-weight: bold;
}
.test {
  display:flex;
  justify-content: center;
  align-items: center;
  height:100vh;
}
.permissionHeaderWrap {
  width: 100%;
  padding-top: 0.7rem;
  border-bottom: 2px solid #062BB5;
  min-height: 50px;
  height: 20%;
  box-sizing: border-box;
}
.permissionHeaderWrap > img {
  height: 70%;
}
.permissionHeaderTextWrap {
  width: calc(90% - 48px);
  height: 100%;
}
.permissionHeaderTextWrap p {
  font-size: 10px;
  color: #062BB5;
  line-height: 13px; font-weight: bold;
}
.permissionHeaderTextWrap> p {
  line-height: 52px;
  font-size: 20px;
}
.permissionTitleText {
  height: 80%;
  width: 100%;
  box-sizing: border-box;
}
.headerFont {
  font-size: 19px;
}
.headerLogoDiv {
  line-height: 10px;
  display: flex;
  flex-direction: column;
  justify-content : center;
}
.permissionLine {
  width: 100%;
  border: 0.5px solid #00000029;
}

@media (max-width: 420px) {
  .permissionHeaderWrap {
    height: 22%;
  }
  .permissionHeaderTextWrap {
    padding-top: 10px;
    height: auto;
    display: flex;
    flex-direction: column;
  }
  .permissionHeaderTextWrap > p {
    line-height: 1rem;
  }
  .headerLogoDiv {
    flex-grow: 1;
  }
}
</style>
