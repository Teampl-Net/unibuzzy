<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div style="width:100%; height:100%; position:fixed; top:0; left:0; background:#00000050; z-index:9999" @click="this.$emit('closePop')"></div>
  <div id="cancelPushPop" style="width: 80%;left: 10%;position: absolute;height: 55%;min-height: 300px;top: 20%;z-index: 99999;background: rgb(255, 255, 255);border-radius: 10px;">
    <div class="reasonPopHeader" >
      <!-- <img src="../../../assets/images/common/thealim_header_logo.png" class="fl" > -->
      <p class="font18 fontBold commonColor fl" style="line-height: 2.2rem;" >알림 취소</p>
      <!-- <p class="font15 headerFont commonColor fl" style="line-height: 2.6rem; margin-left: 0.3rem" >가장 편리한 구독-알림</p> -->
    </div>
    <div style="width: 100%; height: calc(100% - 40px); float: left; padding: 20px 20px;">
        <div style="width: 100%; min-height: 40px;">
            <p class="font16 fontBold textLeft fl" style="height: 40px; width: 50px;line-height: 4px;">사유</p>
            <select style="min-height: 30px; float: left; margin-left: 5px; width: calc(100% - 55px); margin-top: 5px;" name="" id="">
                <option value="">알림 전달내용이 누락됨</option>
                <option value="">알림 수신대상을 잘못 선택함</option>
                <!-- <option value="">알림을 숨기고 싶음: 그냥 </option> -->
                <option value="">단순변심</option>
                <option value="">기타</option>
            </select>
        </div>
        <div style="width: 100%; min-height: 40px; height: calc(100% - 85px);">
            <p class="font16 fontBold textLeft fl" style="height: 35px; line-height: 40px; ">상세사유</p>
            <div style="width: 100%; min-height: 200px; border: 1px solid #ccc; float: left; margin-top: 0px;border-radius: 5px;">
                <textarea style=" padding: 5px 10px;width: 100%; height: 100%; min-height: 200px; float: left; border: none;" />
            </div>
        </div>
        <gBtnSmall style="margin-top: 3px; margin-top: 10px;" btnTitle="취소하기" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
  },
  data () {
    return {

    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
.reasonPopHeader{height: 45px; width: 100%; float: left; border-bottom: 1px solid #6768A7; padding: 5px 15px;}
.reasonPopHeader img {
    width: 28px;
    margin-right: 10px;
}
.imgAlertWrap {
  width:95%; position: fixed; bottom:0; left:2.5%; z-index:9999;
}
.imgAlertMenuListBase {
  min-height:50px; line-height:50px; color:red;
}
.alertRow {border-top: 1px solid #eee;}
.alertRow :first {border-top: none;}
.alertRow :first-child {border-top: none;}
</style>
