<template>
    <div class="commonPopHeaderWrap">
        <!-- <img src="../../../assets/images/common/icon_back_white.png" v-on:click="goBack" class="fl" style=" width: 0.8rem;" > -->
        <img src="../../assets/images/common/icon_back.png" v-on:click="closeXPop" class="fl commonPopBackBtn" >
        <div v-for="(value, index) in subTitlebtnList"  :key="index" class="fr ml-04">
          <img :src="value.icon" />
        </div>

        <span class="popHeaderTitleSpan">{{headerTitle}}</span>
        <gBtnSmall v-if="this.headerTitle === '알림 작성'" :btnThema="'light'" v-on:click="sendBtnClick" btnTitle="발송하기" style="position: absolute; right: 1rem" />
        <div v-if="chanAlimListTeamKey !== undefined && chanAlimListTeamKey !== null && chanAlimListTeamKey !== '' " class="chanMenubar" @click="this.$emit('openMenu')">
          <img src="../../assets/images/common/icon_menu.png" style="width:1.8rem;"/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'talHeader',
  props: {
    headerTitle: {},
    chanAlimListTeamKey: {},
    subTitlebtnList: {},
    thisPopN: {}
  },
  methods: {
    closeXPop () {
      this.$emit('closeXPop', this.thisPopN)
    },
    sendBtnClick () {
      if (this.headerTitle === '알림 작성') {
        this.$emit('sendOk')
      }
    },
  },
  data () {
    return {
    }
  }
}

</script>

<style>
/* 오타오타오타 */
.commonPopHeaerWrap > img {position: absolute; left: 1rem;}
.commonPopHeaerWrap{ position: fixed; justify-content: center; top: 0; left: 0; box-sizing: border-box; display: flex; padding: 0.7rem 0.5rem; width: 100%; height: 50px; list-style: none; text-align: center; z-index: 999; background: #FFF; box-shadow: 0px 7px 9px -9px #00000036;}

.popHeaderTitleSpan{position: absolute; color: #6768A7; font-size: 20px;}
.commonPopBackBtn{width: 0.8rem;}

.chanMenubar{
  position: absolute;
  right: 1rem;
}

.chanDetailPopHeader .popHeaderTitleSpan {color: white;}

</style>
