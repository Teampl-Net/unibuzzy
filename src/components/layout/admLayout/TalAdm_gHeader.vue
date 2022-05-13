<template>
    <div class="headerWrap">
        <div style="width: 1390px; margin: 0 auto;">
            <div style="width: 14%; float: left; box-sizing: border-box; padding-top: 0.2rem; ">
                <router-link to="/"><img style="width: 7rem;" src="../../../assets/images/main/main_logo.png" alt=""></router-link>
            </div>
            <div style="width: 56%; float: left; box-sizing: border-box; padding-top: 0.5rem;">
                <router-link to="/admChanMain"><span class="menuText">채널메인</span></router-link>
                <router-link to="/admSendPushList"><span class="menuText">보낸알림</span></router-link>
                <router-link to="/admManageRecvList"><span class="menuText">수신자관리</span></router-link>
                <router-link to="/admWritePush"><span class="menuText">알림작성</span></router-link>
                <router-link to="/admManageChannel"><span class="menuText">채널관리</span></router-link>
                <!-- <router-link to="/statistics"><span class="menuText">통계</span></router-link> -->
            </div>
            <div style="width: 30%; float: left;">
                <div style="min-width: 290px; height: 66px; float: left;">
                    <p class="textRight font14 fontBold" style="color: #3A3A3A;">안녕하세요.</p>
                    <p class="textRight font20 fontBold" style="color: #6768A7;">{{this.managerTeam}}의 {{this.userName}}님!</p>
                </div>
                <div class="roundBtn mtop-1 mleft-1" style="">로그아웃</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      userName: '',
      managerTeam: ''
    }
  },
  created () {
    this.getSessionUserInfo()
  },
  methods: {
    getSessionUserInfo () {
      var userInfo = JSON.parse(localStorage.getItem('sessionUser'))
      this.userName = this.$changeText(userInfo.userDispMtext)
      var teamInfo = JSON.parse(localStorage.getItem('sessionTeam'))
      this.managerTeam = this.$changeText(teamInfo.nameMtext)
    }
  }
}
</script>
<style scoped>
.headerWrap{height: 90px;z-index: 2; background-color: #FFFFFF; width: 100%; position: fixed; left: 0; top:0; box-sizing: border-box; padding: 1.5rem  0 ; box-shadow: 0px 7px 9px -7px #c8c8c8a3;}
.menuText{color: #6768A7; font-size: 20px; font-weight: bold; margin-right: 2rem; float: left;}
.roundBtn{height: 30px; background-color: #6768A7; border-radius: 38px; color: #FFFFFF; padding: 0.2rem 1rem; float: left; box-sizing: border-box; font-size: 16px; font-weight: bold;}
</style>
