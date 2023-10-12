<template>
    <div class="commonProfileWrap" :style="(smallYn? 'padding: 0!important;' : 'padding: 2px; ' ) + (selfYn || GE_USER.userKey === GE_USER_INFO.userKey?'border:2.5px solid #5B1CFC;' : 'border:2.5px solid #CCC;')">
        <div v-if="GE_USER_INFO && GE_USER_INFO.userProfileImg" class="picImgWrap picWrapReal" ref="mainImgAreaRef" :style="'background-image: url('+ (GE_USER_INFO.domainPath ? GE_USER_INFO.domainPath + $changeUrlBackslash(GE_USER_INFO.userProfileImg) : GE_USER_INFO.userProfileImg) +');'">
            <img v-if="GE_USER_INFO.certiDate" :style="smallYn? 'right: -10px;bottom: -3px;' : ' right: -5px;bottom: 0px;'" src="../../assets/images/common/userCertiIcon.svg" alt="">
        </div>
        <div v-else class="picImgWrap picNoWrap"></div>
    </div>
</template>
<script>
export default {
  props: {
    userInfo: {},
    selfYn: {},
    smallYn: {}
  },
  mounted () {
  },
  computed: {
    GE_USER_INFO () {
      if (this.selfYn) {
        return this.$store.getters['UB_USER/GE_USER']
      } else {
        if (this.userInfo) {
          return this.userInfo
        } else {
          return null
        }
      }
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    }
  },
  watch: {
    GE_USER_INFO: {
      immediate: true,
      handler (value, old) {
      },
      deep: true
    }
  }
}
</script>
<style>
.picImgWrap {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  background-color: #fff;
}
.commonProfileWrap {
  position: relative;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  padding: 1px;
  border-radius: 100%;
  float: left;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
}
.picWrapReal {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
.picImgWrapReal > img {
  position: absolute;
  width: 20px;
}
.picNoWrap {
  background-image: url('https://mo.d-alim.com/resource/userCommonIcon/userImg01.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat
}
@media screen and (max-width: 300px) {
  .mainUserName {font-size: 15px!important;}
  .mainIcon {width: 0.7rem!important;}
  .mainRefreshBtn {width: 20px!important}
}
</style>
