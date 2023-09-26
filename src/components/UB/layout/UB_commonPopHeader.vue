<template>
  <div class="commonPopHeaderWrap " style="" :class="{ 'newHeaderLine' : !chanAlimListTeamKey && targetType !== 'createChannel' && targetType !== 'contentsDetail' && targetType !== 'boardMain' , 'headerShadow' : chanAlimListTeamKey}" :style="targetType === 'chanInfo' ? 'background:transparent !important;' : ';' + 'padding-top:' + ($STATUS_HEIGHT + 20)+ 'px;' + 'padding-bottom: 1.7rem'">
    <div v-on:click="closeXPop" class="fl cursorP closeIconBox">
      <img v-if="bgblack === true " src="../../../assets/images/common/icon_back_white.png" v-on:click="closeXPop" class=" commonPopBackBtn" style="" >
      <img v-else-if="pNoAuthYn === true " src="../../../assets/images/footer/icon_home_fillin.svg"  v-on:click="goMain">
      <img v-else src="../../../assets/images/common/icon_back.png" class="fl commonPopBackBtn mleft-05" >
    </div>
    <div v-for="(value, index) in subTitlebtnList"  :key="index" class="fr ml-04">
      <img :src="value.icon" />
    </div>
    <span class="popHeaderTitleSpan font20 h100P" :class="{colorBlack : (headerTitle === '게시판 작성')|| targetType === 'contentsDetail'}" :style="bgblack === true ? 'color:white;':'' + 'top:' + ($STATUS_HEIGHT + 35) + 'px;'">
      {{$changeText(headerTitle)}}
    </span>
    <div v-if="targetType === 'chanDetail' && chanAlimListTeamKey" class="chanMenubar cursorP" @click="openMenu">
      <img v-if="bgblack === true " src="../../../assets/images/common/icon_menu_white.png"/>
      <img v-else src="../../../assets/images/common/icon_menu.png"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'talHeader',
  props: {
    headerTitle: {},
    chanAlimListTeamKey: {},
    bgblack: { type: Boolean, default: false },
    targetType: {},
    pClosePop: { type: Function, required: true }
  },
  created () {

  },
  methods: {
    goProfile () {
      var param = {}
      param.targetType = 'bookMemberDetail'
      param.readOnlyYn = true
      param.selfYn = true
      param.popHeaderText = '내 정보'
      this.$emit('openPop', param)
    },
    goMain () {
      this.$router.replace({ path: '/' })
    },
    openMenu () {
      this.$emit('openMenu')
    },
    closeXPop () {
      this.$emit('closeXPop')
      if (this.pClosePop) {
        this.pClosePop()
      }
    },
    sendBtnClick () {
      this.$emit('sendOk')
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    }
  }
}

</script>

<style scoped>
.commonPopHeaderWrapImg {
  position: absolute;
  left: 1rem;
}
.commonPopHeaderWrap{
  position: fixed;
  justify-content: center;
  align-items: center;
  left: 0;
  box-sizing: border-box;
  display: flex;
  padding: 0.7rem 0.5rem;
  width: 100%; height: 50px;
  list-style: none;
  text-align: center;
  z-index: 10;
  background: #FFF;
}
.popHeaderTitleSpan {
  position: absolute;
  top:50%;
  transform: translateY(-50%);
  color: #6768A7;
  font-weight: bold;
  width:70%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.commonPopBackBtn {
  width: 0.8rem;
}

.chanMenubar {
  position: absolute;
  right: 1rem;
}
.chanMenubar img {
  width:1.8rem;
}
.closeIconBox {
  margin-top:5px;
  min-width: 70px;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left: 1rem;
}
.headerTitleWrap {
  height: 25px;
  line-height: 25px;
  max-width:30%;
  text-align: right;
  right: 1rem;
  position: absolute;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.chanDetailPopHeader .popHeaderTitleSpan {
  color: white;
}
.colorBlack {
  color: black !important;
}
</style>
