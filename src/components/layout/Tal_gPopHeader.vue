<template>
  <div class="commonPopHeaderWrap headerShadow" :style="targetType === 'chanInfo' ? 'background:transparent !important' : ''">
    <!-- <img src="../../../assets/images/common/icon_back_white.png" v-on:click="goBack" class="fl" style=" width: 0.8rem;" > -->
    <div v-on:click="closeXPop" class="fl cursorP " style="width: 70px; height: 100%; position: absolute; display: flex; justify-content: flex-start; align-items: center; left: 1rem;">
      <img v-if="bgblack === true " src="../../assets/images/common/icon_back_white.png" v-on:click="closeXPop" class=" commonPopBackBtn" >
      <img v-else src="../../assets/images/common/icon_back.png" class="fl commonPopBackBtn mleft-05" >
    </div>
    <div v-for="(value, index) in subTitlebtnList"  :key="index" class="fr ml-04">
      <img :src="value.icon" />
    </div>

    <span class="popHeaderTitleSpan font20" :class="{colorBlack : (this.headerTitle === '게시판 작성')|| this.targetType === 'boardDetail'}" :style="bgblack === true ? 'color:white;':'' ">
      {{headerTitle}}
    </span>
    <!-- 멤버 도우미 버튼 -->
    <!-- helpYn으로 변경해야 함 -->
    <!-- <img src="../../assets/images/common/icon_help_circle.svg" v-if="helpYn || this.headerTitle === '주소록 관리' || this.headerTitle === '게시판 관리' " style="width: 22px; height: 22px; position: absolute; right: 1rem;" @click="clickHelp" /> -->
    <!-- <img src="../../assets/images/common/icon_help_circle.svg" v-if="this.headerTitle === '멤버/매니저 관리' || this.headerTitle === '주소록 관리' || this.headerTitle === '게시판 관리'" style="width: 22px; height: 22px; position: absolute; right: 1rem;" @click="clickHelp" /> -->
    <helpButtonPop style="overflow: hidden scroll;" v-if="clickHelpYn" :helpButtonType="this.helpButtonType" @closePop="clickHelpYn=false" />
    <!-- <div class="commonColor font16 headerTitleWrap" style=""> -->
          <!--v-if="this.headerTitle === '주소록 관리'|| this.headerTitle === '매니저 관리' || this.headerTitle ==='게시판 편집' || this.headerTitle ==='게시판 수정'"> -->
      <!-- {{chanName}} -->
    <!-- </div> -->

    <!-- <gBtnSmall v-if="this.headerTitle === '알림 작성'" :btnThema="'light'" v-on:click="sendBtnClick" btnTitle="발송하기" style="position: absolute; right: 1rem" /> -->
    <!-- <gBtnSmall v-else-if="this.headerTitle === '게시글 작성'" :btnThema="'light'" v-on:click="sendBtnClick" btnTitle="작성하기" style="position: absolute; right: 1rem" /> -->
    <div v-if="(chanAlimListTeamKey !== undefined && chanAlimListTeamKey !== null && chanAlimListTeamKey !== '') && followYn === true" class="chanMenubar cursorP" @click="openMenu">
      <img v-if="bgblack === true " src="../../assets/images/common/icon_menu_white.png" style="width:1.8rem;"/>
      <img v-else src="../../assets/images/common/icon_menu.png" style="width:1.8rem;"/>
    </div>
    <!-- <gBtnSmall v-if="managerBtn===true"  v-on:click="sendBtnClick" btnTitle="관리" style="position: absolute; right: 1rem" /> -->
  </div>
</template>

<script>
import helpButtonPop from '../popup/info/Tal_helpButtonPop.vue'
export default {
  name: 'talHeader',
  props: {
    checkOfficialChanYn: {},
    chanName: {},
    headerTitle: {},
    chanAlimListTeamKey: {},
    subTitlebtnList: {},
    thisPopN: {},
    bgblack: {},
    managerBtn: {},
    memberDetailOpen: {},
    targetType: {},
    helpYn: {},
    followYn: {}
  },
  methods: {
    checkOfficialChan () {

    },
    clickHelp () {
      if (this.headerTitle === '멤버/매니저 관리') {
        this.helpButtonType = 'member'
        this.clickHelpYn = true
      } else if (this.headerTitle === '주소록 관리') {
        this.helpButtonType = 'book'
        this.clickHelpYn = true
      } else if (this.headerTitle === '게시판 관리') {
        this.helpButtonType = 'board'
        this.clickHelpYn = true
      }
      this.$emit('clickHelp')
    },
    openMenu () {
      // var param = {}
      // param.targetType = 'chanMenu'
      this.$emit('openMenu')
    },
    closeXPop () {
      // alert('me')
      /* alert(this.memberDetailOpen)
      if (this.memberDetailOpen === true && this.headerTitle === '주소록 관리') {
        this.$emit('memberDetailClose')
      // } else if (this.targetType === 'pushDetail') {
        // this.$emit('reloadParent')
        // this.$emit('closeXPop')
      } else { */
      this.$emit('closeXPop')
      /* } */
    },
    sendBtnClick () {
      // if (this.headerTitle === '알림 작성') {
      this.$emit('sendOk')
      // }
    }
  },
  data () {
    return {
      helpButtonType: '',
      clickHelpYn: false
    }
  },
  components: {
    helpButtonPop
  },
  created () {
    // console.log(this.chanName)
    // console.log(this.chanAlimListTeamKey)
  },
  watch: {
    bgblack () {

    }
  }
}

</script>

<style>
.commonPopHeaderWrapImg {position: absolute; left: 1rem;}
.commonPopHeaderWrap{ position: absolute; justify-content: center; align-items: center; top: 0; left: 0; box-sizing: border-box; display: flex; padding: 0.7rem 0.5rem; width: 100%; height: 50px; list-style: none; text-align: center; z-index: 999; background: #FFF; }

.popHeaderTitleSpan{position: absolute; color: #6768A7; font-weight: bold; width:70%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;}
.commonPopBackBtn{width: 0.8rem;}

.chanMenubar{
  position: absolute;
  right: 1rem;
}
.headerTitleWrap{height: 25px; line-height: 25px; max-width:30% ; text-align: right; right: 1rem; position: absolute; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;}
.chanDetailPopHeader .popHeaderTitleSpan {color: white; }
.colorBlack{
  color: black !important;
}
</style>
