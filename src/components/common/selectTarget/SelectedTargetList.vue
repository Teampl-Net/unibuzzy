<i18n>
{
  "ko": {
    "EDIT_BOOK_TITLE_PEOPLE": "인원",
    "EDIT_BOOK_BTN_ADD": "+ 추가하기",
    "EDIT_BOOK_NAME_ME": "나",
    "EDIT_BOOK_MSG_SELECTED": "이미 선택되었습니다.",
    "EDIT_BOOK_MSG_ONEPEOPLE": "담당자는 한 명만 부여 가능합니다!"
  },
  "en": {
    "EDIT_BOOK_TITLE_PEOPLE": "Members",
    "EDIT_BOOK_BTN_ADD": "+ Add",
    "EDIT_BOOK_NAME_ME": "Me",
    "EDIT_BOOK_MSG_SELECTED": "User already selected",
    "EDIT_BOOK_MSG_ONEPEOPLE": "Only one person in charge can be assigned!"
  }
}
</i18n>
<template>
  <div class="w100P fl">
    <div class="CWhiteGrayBgColor addReceiverBtnWrap">
      <p class="textLeft fontBold font13 fl commonDarkGray">{{ pSelectedTargetList && pSelectedTargetList.length > 0? `total ${pSelectedTargetList.length}`:'' }}</p>
      <gBtnSmall class="fr CDeepBgColor borderRadi10" :btnTitle="$t('EDIT_BOOK_BTN_ADD')" @click="saveTarget" v-if="btnVisible !== false" />
    </div>
    <div class="selecteItemdArea" :class="!isMobile? 'thinScrollBar':''" id="selectedItemWrap" @wheel="horizontalScroll">
      <div v-for="target in pSelectedTargetList" :key="target.accessKey" class="fl mright-1 selectedBookListWrap">
        <div class="w100P fl">
          <div class="middleBgColor fl imgCircle" style="background-size: cover; background-repeat: no-repeat; background-position: center center;" :style="`background-image: url('${target.iconPath}')`"></div>
          <p class="fl font15 commonBlack textOverdot w100P">{{$changeText(target.accessName)}}</p>
          <span class="fr whiteColor CDeepBgColor selectedItemDeleteBtn" @click="addTarget(target)">x</span>
        </div>
      </div>
    </div>
    <gConfirmPop  :confirmText="$t('EDIT_BOOK_MSG_SELECTED')" confirmType='timeout' v-if="showErrorPopYn" @no="showErrorPopYn = false" />
  </div>
</template>

<script>
export default {
  props: {
    pSelectedTargetList: Array
  },
  data () {
    return {
      isMobile: /Mobi/i.test(window.navigator.userAgent)
    }
  },
  methods: {
    addTarget (target) {
      this.$emit('addTarget', target)
    },
    saveTarget () {
      this.$emit('saveTarget')
    }
  }
}
</script>

<style scoped>
.receiverTeamText {
  height :40px;
  cursor: pointer;
  line-height: 40px;
}
.receiverTeamSubscImg {
  width: 12px;
}
.fontBold {
  font-weight: bold;
}
.trans90 {
  transform: rotate(270deg)
}
.selecteItemdArea {
  display: flex;
  width: 100%;
  padding: 15px;
  overflow: auto;
  white-space: nowrap;
  flex-direction: row;
  background: #fff;
}
.editmLeft {
    margin-left: 30px;
}
.selPopFl {
  float: left;
  margin-left: 1rem;
}

.mobileMleft {
  margin-left: 0.5rem;
}
.imgCircle {
  overflow: hidden;
}
.memberPicImgWrap {
  width: 100%;
  height: 100%;
}
.addReceiverBtnWrap {
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
}
.borderRadi10 {
  border-radius: 10px !important;
}
.selectedBookListWrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 60px
}
.selectedItemDeleteBtn {
  border-radius: 100%;
  width: 20px;
  height: 20px;
  line-height: 18px;
  position: absolute;
  right: -10px;
  top: -10px;
}
.selectedMemImgWrap {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.noImg {
  background-image: url('/resource/userCommonIcon/userImg01.svg');
}
.selectedMemDeleteBtn {
  border-radius: 100%;
  width: 20px;
  height: 20px;
  line-height: 18px;
  position: absolute;
  right: -5px;
  top: -5px;
  text-align: center;
}
@media screen and (max-width: 410px) {
  .selfAddArea{
      width: calc(100% - 15px);
      margin: 0.5rem 0rem !important;
  }
  .mobileMleft{
      margin-left: 0.5rem;
      white-space:nowrap
  }
}
</style>
