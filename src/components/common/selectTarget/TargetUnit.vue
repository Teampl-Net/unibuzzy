<i18n>
  {
    "ko": {
      "EMPT_MSG_NONE_ADDR": "비어있는 주소록",
      "EMPT_MSG_NONE_MEMB": "비어있는 멤버",
      "NONE_MSG_REGIST_EMAIL": "등록된 이메일이 없습니다.",
      "NONE_MSG_REGIST_NUM": "등록된 번호가 없습니다.",
    },
    "en": {
      "EMPT_MSG_NONE_ADDR": "Empty team",
      "EMPT_MSG_NONE_MEMB": "Empty member list",
      "NONE_MSG_REGIST_EMAIL": "No registered email found.",
      "NONE_MSG_REGIST_NUM": "No registered phone number found."
    }
  }
</i18n>
<template>
  <div class="receiverItemWrap" :class="{ CWhiteGrayBgColor: (pOption === 'SELECT' && pSelectedYn === true) }" >
    <div @click="selectTarget(false)" class="rowBaseCss">
      <img v-if="searchYn === true" class="img-w15" src="@/assets/images/common/icon_searchGray.svg" alt="">
      <div class="imgCircle">
        <img :src="pTargetData.iconPath" class="img-w25"/>
      </div>
      <div class="fl flexAlignCenter" :style="pSelectedYn === 'EDIT' ? 'width: calc(100% - 150px);' : 'width: calc(100% - 100px);'">
        <div class="textLeft fl textOverdot w100P">
          <p class="fl font16 commonDarkGray fontBold textOverdot w100P">{{$changeText(pTargetData.accessName)}}</p>
          <template v-if="pTargetData.cList">
            <div class="w100P textOverdot" style="height: 20px;">
              <span v-for="target, index in pTargetData.cList" :key="target.accessKey" class="font14 commonDarkGray">{{target.accessName}}{{ pTargetData.cList.length - 1 === index? '':', ' }} </span>
            </div>
          </template>
        </div>
        </div>
      <div v-if="pOption === 'EDIT'" class="fr cursorP flexAlignCenter">
        <img v-if="propData.jobkindId === 'BOOK'" src="@/assets/images/board/icon_edit.svg" class="img-w20 fl editImg">
        <img src="@/assets/images/board/icon_trash.svg" class="img-w20 fl deleteImg">
      </div>
      <div v-if="pOption === 'SELECT'" class="fr cursorP flexAlignCenter">
        <div @click.stop="selectTarget(true)" class="fl mright-03 selectImgWrap" :class="{ 'CDeepBgColor' : pSelectedYn === true}">
          <img class="fl img-w13" src="@/assets/images/common/icon_check_white.svg" alt="선택 아이콘">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    pTargetData: Array,
    pSelectedYn: Boolean,
    pOption: String
  },
  methods: {
    selectTarget (selectYn) {
      // 자식 list가 없거나, 체크박스를 클릭한 경우에는 addTarget이 되도록 selectYn을 파라미터로 받습니다
      if (!selectYn && this.pTargetData.cList && this.pTargetData.cList.length > 0) {
        this.$emit('openSelectTargetPop', this.pTargetData.cList)
      } else {
        this.$emit('addTarget', this.pTargetData)
      }
    }
  }
}
</script>

<style scoped>
.cursorP {
  cursor: pointer;
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.w100P {
  width: 100%;
}
.textOverdot{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.fontBold {
  font-weight: bold;
}

.textLeft {
  text-align: left;
}
.commonDarkGray {
  color: #6D6D6D;
}
.selectedSpan {
  width: 20px;
  height: 20px;
  left: 330px;
  top: 25px;
  background: #5F61BD;
  border: 1.5px solid #5F61BD;
  border-radius: 50%;
}
.rowBaseCss {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  gap: 10px;
  width: 100%;
  min-height: 70px;
  left: 0px;
  width: 100%;
  float: left;
}
.receiverItemWrap {
  border-bottom: 1px solid #BDBDBD50;
  width: 100%;
  float: left;
}
.cabinetNameWrap {
  display: flex;
  align-items: center;
  width: calc(100% - 100px);
}
.memberPicImgWrap {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
}
.imgPholder {
  background-image: url('/resource/userCommonIcon/userImg01.svg');
}
.divideLine {
  margin: 0 0.3rem;
}
.editImg {
  margin: 0 10px;
}
.deleteImg {
  width: 20px;
  margin: 0 10px;
}
.selectImgWrap {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 1px solid #5F61BD;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgCircle {
  overflow: hidden;
  float: left;
}
.img-w25 {
  width: 25px;
}
.img-w20 {
  width: 20px;
}
.img-w15 {
  width: 15px;
}
.img-w13 {
  width: 13px;
}
.flexAlignCenter {
  display: flex;
  align-items: center;
}
.font16 {
  font-size: 16px;
}
.font14 {
  font-size: 14px;
}
.mright-03 {
  margin-right: 0.3rem;
}
@media screen and (max-width: 300px) {
  .img-w25 {
    width: 23px !important;
  }
  .img-w20 {
    width: 18px !important;
  }
  .img-w15 {
    width: 13px !important;
  }
  .img-w13 {
    width: 11px !important;
  }
  .font16 {
    font-size: 14px !important;
  }
  .font14 {
    font-size: 12px !important;
  }
}
</style>
