<template>

    <div class="alimSettingPageWrap">
        <popHeader :headerTitle="this.headerTitle" @closeXPop="closeXPop" class="alimSettingPage"/>
        <div class="alimSetting-01">
          <p class="font16" style="border-bottom:1px solid #888;">새로운 알림</p>
          <table style="width:100%">
            <!-- <colgroup><col><col></colgroup> -->
            <!-- <tr style="border-bottom:1px solid #888;"><th colspan="2">새로운 알림 </th></tr> -->
            <tr>
              <td class="fl">
                <p class="font14"> 알림 </p>
              </td>
              <td class="fr" >
                  <gtoggle toggleId='toggle1' :isChecked="true" class="toggle-line"/>
              </td>
            </tr>

            <tr>
              <td class="fl">
                <p class="font14"> 소리 </p>
              </td>
              <td class="fr" >
                <gtoggle toggleId='toggle2' :isChecked="false" @changeValue="toggleChange" class="toggle-line"/>
              </td>
            </tr>

            <tr @click="test">
              <td class="fl">
                <p class="font14"> 알림음 선택 </p>
              </td>
              <td class="fr" >
                <p style="color:#ccc; " class="font14">띵동</p>
              </td>
            </tr>

            <tr>
              <td class="fl">
                <p class="font14"> 진동 </p>
              </td>
              <td class="fr" >
                <gtoggle toggleId='toggle3' :isChecked="false" class="toggle-line"/>
              </td>
            </tr>

            <tr>
              <td class="fl">
                <p class="font14"> 진동패턴 선택 </p>
              </td>
              <td class="fr" >
                <p style="color:#ccc; " class="font14">~~~</p>
              </td>
            </tr>

            <tr>
              <td class="fl" colspan="2">
                <p class="font14"> 알림표시 </p>
              </td>
            </tr>

            <tr rowspan="2" style="border-bottom:0px;">
              <td class="fl" rowspan="2" style=" text-align:left;">
                <p class="font14"> 내 채널 알림 </p>
                <p class="font12" style="color:#aaa; line-height:auto; margin-top:-1rem; margin-right:10px; line-height:1rem; ">내 채널에 구독자 추가, 게시글 추가 등 발생하는 이벤트에 대한 알림을 받습니다.</p>
              </td>

              <td class="fr" >
                <gtoggle toggleId='toggle4' :isChecked="false" class="toggle-line"/>
              </td>

            </tr>
          </table>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
// eslint-disable-next-line
import gtoggle from '../myPage/Tal_commonToggle.vue'
export default {
  data () {
    return {
      headerTitle: '알림설정'
    }
  },
  props: {

  },
  components: { gtoggle },
  methods: {
    closeXPop (pThisPopN) { // 내 팝업 닫기
      this.$emit('closePolicyPop')
    },
    toggleChange () {

    }

  }
}
</script>

<style scoped>

p{color: #2c3e50;}
.alimSettingPageWrap{position: absolute;width: 100%;height: 100vh;top: 0;z-index: 999999; background: #FFFFFF; left: 0;}
.alimSettingPage{box-shadow: 0px 7px 9px -9px #00000036;}
.alimSetting-01{margin-top: 70px; text-align: left; overflow-y: auto; height: calc(100% - 60px); padding: 0.5rem 1rem;}
.policy-02{margin-top: 70px; text-align: left; overflow-y: auto; height: calc(100% - 60px); padding: 0.5rem 1rem;}
/* .policy-01{margin-top: 70px; text-align: left; padding: 0.5rem 1rem; overflow-y: auto; height: calc(100% - 60px)}
.policy-02{margin-top: 70px; text-align: left; padding: 0.5rem 1rem; overflow-y: auto; height: calc(100% - 60px) } */
.dNone{display: none;}
.subTitle{font-weight: bold;}

table tr{
  display: flex;
  justify-content: space-between;
  padding:0 20px;
  height: 4em;
  line-height: 4rem;
  border-bottom:1px solid #ccc;

  border-collapse : collapse;
}
th, td {
  text-align: center;
  border-bottom: none !important;
}

.toggle-line{
  margin-top: 0.3rem;
}

</style>
