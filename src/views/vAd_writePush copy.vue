<template>
    <div class="w-100P" style="height: 100%">
        <gPageTitle class="pleft-2" titleText="알림작성" @clickEvnt = "popBtnClick" :btnYn ="false" pageType="writePush"/>
        <div style="padding: 2rem 0; height: calc(100% - 2rem);">
            <div class="writeTopArea mbottom-1 pleft-2">
                <div class="inputLabel">수신대상</div>
                <input type="text" class="writeInput" name="" id="recvMemberInput">
            </div>
            <div class=" writeTopArea mbottom-2 pleft-2">
                <div class="inputLabel">제목</div>
                <div class="titleInputWrap">
                    <input type="text" class="writeInput fn w-100PIm" name="" id="pushTitleInput">
                    <input type="checkbox" class="fn mtop-1" name="noTitleCheckBox" id="noTitleCheckBox">
                    <label style="" for="noTitleCheckBox">제목없이 발송
                        <span class="pointText"> | 체크하시면 알림 내용의 가장 첫 내용이 제목으로 표시됩니다.</span>
                    </label>
                </div>
            </div>
            <div class="writeArea">
                <div class="inputLabel pleft-2">내용작성</div>
                <div style="display: flex; width: 100%; height: 100%; border: 1px solid #BFBFDA; border-left: none;">
                  <div class="editorOption">
                    <div style="margin-top: 1rem;" v-on:click="changeOption(0)"> <img src="../resource/images/latestPush.svg" alt=""><p style="">최근알림</p></div>
                    <div style="" v-on:click="changeOption(1)"> <img src="../resource/images/paperIcon.svg" alt=""><p style="">편지지</p></div>
                    <div style="" v-on:click="changeOption(2)"> <img src="../resource/images/uploadIcon.svg" alt=""><p style="">업로드</p></div>
                  </div>
                  <div style="width: 350px; padding: 1rem 0.5rem;">
                    <div style="width: 100%;">
                      <div style="float: left; background:#6768A7; width: 55px; height: 42px; border-radius: 5px; margin-right: 0.5rem; margin-bottom: 0.5rem;"></div>
                      <div style="float: left; background:#BFBFDA; width: 55px; height: 42px; border-radius: 5px; margin-right: 0.5rem; margin-bottom: 0.5rem;"></div>
                      <div style="float: left; background:#EFEFF6; width: 55px; height: 42px; border-radius: 5px; margin-right: 0.5rem; margin-bottom: 0.5rem;"></div>
                      <div style="float: left; background:#EFEFF6; width: 55px; height: 42px; border-radius: 5px; margin-bottom: 0.5rem;"></div>
                    </div>
                  </div>
                  <textarea name="" style="width: 100%; min-height: 20rem;" id="" cols="30" rows="10"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    openPreviewPop () {
      this.$emit('openPreviewPop')
    },
    sendPushMsg () {
      // eslint-disable-next-line no-new-object
      var sendData = new Object()
      sendData.api = '/test'
      // eslint-disable-next-line no-new-object
      var param = new Object()
      sendData.param = param
      // this.$axiosServer(sendData)
      // alert('알림 보내기')
    },
    popBtnClick (evnt) {
      if (evnt === 'openPreviewPop') this.openPreviewPop()
      else if (evnt === 'sendPushMsg') this.sendPushMsg()
    },
    changeOption (tab) {
      this.selectedTab = tab
    }
  },
  data () {
    return {
      previewChanYn: true,
      selectedTab: 0
    }
  }
}
</script>
<style scoped>
.writeTopArea{width: 100%; min-height: 3rem; }
.writeArea{width: 100%; height: calc(100% - 110px);}
.inputLabel{width: 100px; float: left; color:#3A3A3A; font-size: 14px;font-weight: bold; line-height: 30px;}
.writeInput{width: calc(100% - 150px); float: left; border: 1px solid #BFBFDA;border-radius: 5px; height: 30px; padding: 0 0.5rem; font-size: 14px;}
textarea{border: none; border-left: 1px solid #BFBFDA;}
.titleInputWrap{width: calc(100% - 150px); min-height: 2rem; float: left;}
.titleInputWrap label{font-size: 14px; line-height: 14px;}
.pointText{color: #6768A7; font-size: 14px;}
.fn{float: none;}
.w-100PIm{width: 100%!important;}

.editorOption{display: flex; flex-direction: column; border-right: 1px solid #BFBFDA; width: 100px;}
.editorOption > div {height: 50px; text-align: center; padding: 0.5rem; cursor: pointer;}
.editorOption p{color: #6768A7; color: #BFBFDA; font-size: 11px;}
</style>
