<template>
  <div class="commonPopHeaderWrap headerShadow">
    <!-- <img src="../../../assets/images/common/icon_back_white.png" v-on:click="goBack" class="fl" style=" width: 0.8rem;" > -->
    <img v-if="bgblack === true " src="../../assets/images/common/icon_back_white.png" v-on:click="closeXPop" class="fl commonPopBackBtn" >
    <img v-else src="../../assets/images/common/icon_back.png" v-on:click="closeXPop" class="fl commonPopBackBtn" >
    <div v-for="(value, index) in subTitlebtnList"  :key="index" class="fr ml-04">
      <img :src="value.icon" />
    </div>
    <span class="popHeaderTitleSpan" :class="{colorBlack : (this.headerTitle === '게시판 작성')|| this.targetType === 'boardDetail' }">{{headerTitle}}</span>
    <div class="commonColor font16 headerTitleWrap" style="">
          <!--v-if="this.headerTitle === '주소록 관리'|| this.headerTitle === '매니저 관리' || this.headerTitle ==='게시판 편집' || this.headerTitle ==='게시판 수정'"> -->
      {{chanName}}
      </div>

    <gBtnSmall v-if="this.headerTitle === '알림 작성'" :btnThema="'light'" v-on:click="sendBtnClick" btnTitle="발송하기" style="position: absolute; right: 1rem" />
    <gBtnSmall v-else-if="this.headerTitle === '게시글 작성'" :btnThema="'light'" v-on:click="sendBtnClick" btnTitle="작성하기" style="position: absolute; right: 1rem" />
    <div v-if="chanAlimListTeamKey !== undefined && chanAlimListTeamKey !== null && chanAlimListTeamKey !== '' " class="chanMenubar" @click="openMenu">
      <img v-if="bgblack === true " src="../../assets/images/common/icon_menu_white.png" style="width:1.8rem;"/>
      <img v-else src="../../assets/images/common/icon_menu.png" style="width:1.8rem;"/>
    </div>
    <!-- <gBtnSmall v-if="managerBtn===true"  v-on:click="sendBtnClick" btnTitle="관리" style="position: absolute; right: 1rem" /> -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'talHeader',
  props: {
    chanName: {},
    headerTitle: {},
    chanAlimListTeamKey: {},
    subTitlebtnList: {},
    thisPopN: {},
    bgblack: {},
    managerBtn: {},
    memberDetailOpen: {},
    targetType: {}
  },
  methods: {
    openMenu(){
      // var param = {}
      // param.targetType = 'chanMenu'
      this.$emit('openMenu')
    },
    closeXPop () {
      if (this.memberDetailOpen === true && this.headerTitle === '주소록 관리') {
        this.$emit('memberDetailClose')
      // } else if (this.targetType === 'pushDetail') {
        // this.$emit('reloadParent')
        // this.$emit('closeXPop')
      } else {
        this.$emit('closeXPop', this.thisPopN)
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
    }
  },
  created () {
    console.log(this.targetType);
    if(this.targetType === ''){

    }

  },
  watch: {
    bgblack () {

    }
  }
}

</script>

<style>
.commonPopHeaderWrap > img {position: absolute; left: 1rem;}
.commonPopHeaderWrap{ position: fixed; justify-content: center; align-items: center; top: 0; left: 0; box-sizing: border-box; display: flex; padding: 0.7rem 0.5rem; width: 100%; height: 50px; list-style: none; text-align: center; z-index: 999; background: #FFF; }

.popHeaderTitleSpan{position: absolute; color: #6768A7; font-weight: bold; font-size: 20px;}
.commonPopBackBtn{width: 0.8rem;}

.chanMenubar{
  position: absolute;
  right: 1rem;
}
.headerTitleWrap{height: 25px; line-height: 25px; max-width:30% ; text-align: right; right: 1rem; position: absolute; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;}
.chanDetailPopHeader .popHeaderTitleSpan {color: white; font-size: 20px;}
.colorBlack{
  color: black !important;
}
</style>
