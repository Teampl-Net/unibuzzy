<template>
    <div class="py-3 px-4" style="display: flex; box-sizing: border-box; justify-content: flex-start; text-align: left; width: 100%; height: 60px;">
        <router-link class="footerRouter col-3" to="/"> <div class="commonColor fontBold text-center" style= '' ><img style="width: 1.2rem" src="../../assets/images/common/icon_home.png"/><p>홈</p></div></router-link>
        <router-link class="footerRouter col-3" to="/pushList"><div class="commonColor fontBold text-center"><img style="width: 1.2rem" src="../../assets/images/common/icon_notice.png"/> <p>알림</p></div></router-link>
        <router-link class="footerRouter col-3" to="/chanList"><div class="commonColor fontBold text-center"><img style="width: 1.2rem" src="../../assets/images/common/icon_subscribe.png"/><p>채널</p></div></router-link>
        <router-link class="footerRouter col-3" to="/setMypage"><div class="commonColor fontBold text-center"><img style="width: 1.2rem" src="../../assets/images/common/icon_setting.png"/> <p>설정</p></div></router-link>
    </div>
</template>
<script>

export default {
  name: 'TalFooter'
}

</script>

<style>
.footerRouter {text-decoration-line: none;}
p{font-size: 12px; margin-bottom: 0; color: #6768A7;}
</style>
