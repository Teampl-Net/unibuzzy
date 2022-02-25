<template>
    <div style="height: 90px;z-index: 2; background-color: #FFFFFF; width: 100%; position: fixed; left: 0; top:0; box-sizing: border-box; padding: 1.5rem  0 ; box-shadow: 0px 7px 9px -7px #c8c8c8a3;">
        <div style="width: 1390px; margin: 0 auto;">
            <div style="width: 14%; float: left; box-sizing: border-box; padding-top: 0.2rem; ">
                <router-link to="/"><img style="width: 7rem;" src="../resource/images/main_logo.png" alt=""></router-link>
            </div>
            <div style="width: 56%; float: left; box-sizing: border-box; padding-top: 0.5rem;">
                <router-link to="/"><span class="menuText">채널메인</span></router-link>
                <router-link to="/sendPushList"><span class="menuText">보낸알림</span></router-link>
                <router-link to="/manageRecvList"><span class="menuText">수신자관리</span></router-link>
                <router-link to="/writePush"><span class="menuText">알림작성</span></router-link>
                <router-link to="/manageChannel"><span class="menuText">채널관리</span></router-link>
                <!-- <router-link to="/statistics"><span class="menuText">통계</span></router-link> -->
            </div>
            <div style="width: 30%; float: left;">
                <div style="min-width: 290px; height: 66px; float: left;">
                    <p style="color: #3A3A3A; text-align: right; font-size: 14px; font-weight: bold;">안녕하세요.</p>
                    <p style="color: #6768A7; text-align: right; font-size: 20px; font-weight: bold;">더알림대학교의 김민석님!</p>
                </div>
                <div class="roundBtn" style="margin-top: 1rem; margin-left: 1rem;">로그아웃</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.menuText{color: #6768A7; font-size: 20px; font-weight: bold; margin-right: 2rem; float: left;}
.roundBtn{height: 30px; background-color: #6768A7; border-radius: 38px; color: #FFFFFF; padding: 0.2rem 1rem; float: left; box-sizing: border-box; font-size: 16px; font-weight: bold;}
</style>
