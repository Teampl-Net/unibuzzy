<template >
  <div class="introBackground">
      <div class="introWhiteCard" style="min-height: 300px;">
            <div class="text-start px-4 permissionHeaderWrap">
                <img src="../../assets/images/intro/tal_permission_header_logo.png" class="fl mtop-03" style="height: 70%;">
                <div class="ms-2 fl permissionHeaderTextWrap">
                    <p class="fl headerFont h-100P">더 알림</p>
                    <div class="fl ms-1 h-100P headerLogoDiv" >
                        <p class="headerFont">가장 편리한</p>
                        <p class="headerFont">구독-알림</p>
                    </div>
                </div>
            </div>
            <div class="text-start py-3 px-4 permissionTitleText">
                <p class="font20 deepColor" >하이브릭 앱 이용에 필요한 <br>접근 권한의 허용이 필요합니다.</p>
                <div class="my-3 permissionLine"></div>
                <p class="font15">접근 권한은 더 나은 서비스를 제공하기 위해 사용됩니다. 원할한 이용을 위해서는 알림 / 기기 및 앱 기록 필수 권한입니다.</p>
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
  },
  methods: {
  }
}
</script>

<style scoped>
    p{color: rgb(74 102 158); font-weight: bold;}
  .test{ display:flex; justify-content: center; align-items: center; height:100vh; }
  /* .permissionHeaderTextWrap {border-bottom: 2px solid rgb(74 102 158);} */
  .permissionHeaderWrap{width: 100%; padding-top: 0.7rem; border-bottom: 2px solid rgb(74 102 158); min-height: 50px; height: 20%;  box-sizing: border-box}
  .permissionHeaderTextWrap {height: 100%;}
  .permissionHeaderTextWrap p{font-size: 12px; color: rgb(74 102 158); line-height: 13px; font-weight: bold;}
  .permissionHeaderTextWrap> p{line-height: 52px; font-size: 24px}
  .permissionTitleText {height: 80%; width: 100%;  box-sizing: border-box}
  .headerFont {font-size: 19px;}
  .headerLogoDiv{line-height: 10px; display: flex; flex-direction: column; justify-content : center;}
  .permissionLine{width: 100%; border: 0.5px solid #00000029;}
</style>
