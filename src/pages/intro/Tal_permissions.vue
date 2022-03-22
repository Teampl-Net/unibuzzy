<template >
  <div style="background-color: #6768A7; width: 100%; height: 100%; padding-top: 10%">
      <div class="" style="background-color: #fff; min-height: 300px; border-radius: 10px; width: 90%; height: 40%; box-sizing: border-box; margin: 10% auto; ">
            <div class="text-start px-4"  style="width: 100%; padding-top: 0.7rem; border-bottom: 2px solid #6768A7; min-height: 50px; height: 20%;  box-sizing: border-box ">
                <img src="../../assets/images/intro/tal_permission_header_logo.png" class="fl" style="width: 1.5rem">
                <div class="ms-2 fl permissionHeaderTextWrap">
                    <p class="fl headerFont">더 알림</p>
                    <div class="fl mt-1 ms-1" style="line-height: 10px">
                        <p class="headerFont">가장 편리한</p>
                        <p class="headerFont">구독-알림</p>
                    </div>
                </div>
            </div>
            <div class="text-start py-3 px-4" style="height: 80%; width: 100%;  box-sizing: border-box">
                <p class="font20 deepColor" style="">더알림 앱 이용에 필요한 <br>접근 권한의 허용이 필요합니다.</p>
                <div class="my-3" style="width: 100%; border: 0.5px solid #00000029;"></div>
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
    p{color: #6768A7; font-weight: bold;}
  .test{ display:flex; justify-content: center; align-items: center; height:100vh; }
  /* .permissionHeaderTextWrap {border-bottom: 2px solid #6768A7;} */
  .permissionHeaderTextWrap p{font-size: 7px; color: #6768A7; font-weight: bold;}
  .permissionHeaderTextWrap> p{font-size: 19px; }
</style>
