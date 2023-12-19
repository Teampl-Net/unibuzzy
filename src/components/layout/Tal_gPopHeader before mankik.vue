<template>
  <div class="commonPopHeaderWrap " :class="{ 'newHeaderLine' : !chanAlimListTeamKey && targetType !== 'createChannel' && targetType !== 'contentsDetail' && targetType !== 'boardMain' , 'headerShadow' : chanAlimListTeamKey}" :style="targetType === 'chanInfo' ? 'background:transparent !important;' : ';' + 'padding-top:' + (this.$STATUS_HEIGHT + 20)+ 'px;' + 'padding-bottom: 1.7rem'">
    <!-- <img src="../../../assets/images/common/icon_back_white.png" v-on:click="goBack" class="fl" style=" width: 0.8rem;" > -->
    <div v-on:click="closeXPop" class="fl cursorP " style="width: 70px; height: 100%; position: absolute; display: flex; justify-content: flex-start; align-items: center; left: 1rem;">
      <img v-if="bgblack === true " src="../../assets/images/common/icon_back_white.png" v-on:click="closeXPop" class=" commonPopBackBtn" >
      <img v-else-if="pNoAuthYn === true " src="../../assets/images/footer/icon_home_fillin.svg"  v-on:click="goMain">
      <img v-else src="../../assets/images/common/icon_back.png" class="fl commonPopBackBtn mleft-05" >
    </div>
    <div v-for="(value, index) in subTitlebtnList"  :key="index" class="fr ml-04">
      <img :src="value.icon" />
    </div>

    <span class="popHeaderTitleSpan font20" :class="{colorBlack : (this.headerTitle === '게시판 작성')|| this.targetType === 'contentsDetail'}" :style="bgblack === true ? 'color:white;':'' ">
      {{this.$changeText(headerTitle)}}
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
    <div v-if="targetType === 'chanDetail' && (chanAlimListTeamKey !== undefined && chanAlimListTeamKey !== null && chanAlimListTeamKey !== '')" class="chanMenubar cursorP" @click="openMenu">
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
    chanName: {},
    headerTitle: {},
    chanAlimListTeamKey: {},
    subTitlebtnList: {},
    thisPopN: {},
    bgblack: { type: Boolean, default: false },
    managerBtn: {},
    targetType: {},
    helpYn: {},
    followYn: {},
    pNoAuthYn: {},

    propBookDetailPopYn: {}
  },
  methods: {
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
    goMain () {
      this.$router.replace({ path: '/' })
    },
    openMenu () {
      // var param = {}
      // param.targetType = 'chanMenu'
      this.$emit('openMenu')
    },
    closeXPop () {
      if (this.propBookDetailPopYn === true) {
        this.$emit('closeBookDetail')
      } else {
        this.$emit('closeXPop')
      }
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
  }
}

</script>

<style>
.commonPopHeaderWrapImg {position: absolute; left: 1rem;}
.commonPopHeaderWrap{ position: fixed; justify-content: center; align-items: center;  left: 0;
  box-sizing: border-box; display: flex;
  padding: 0.7rem 0.5rem;
  width: 100%; height: 50px; list-style: none; text-align: center; z-index: 10; background: #FFF; }

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
