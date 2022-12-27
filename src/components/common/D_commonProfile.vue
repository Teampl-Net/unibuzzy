<template>
    <div v-if="GE_USER_INFO !== null" :style="(smallYn? 'padding: 0!important;' : 'padding: 2px; ' ) + (selfYn || this.GE_USER.userKey === this.GE_USER_INFO.userKey?'border:2.5px solid #5B1CFC;' : 'border:2.5px solid #CCC;') " style="position: relative; width: 60px; height: 60px; justify-content: center; align-items: center; padding: 1px; border-radius: 100%; float: left; display: flex; flex-grow: 0; flex-shrink: 0;">
        <div v-if="this.GE_USER_INFO && this.GE_USER_INFO.userProfileImg" class="picImgWrap" ref="mainImgAreaRef" :style="'background-image: url('+ (this.GE_USER_INFO.domainPath ? this.GE_USER_INFO.domainPath + this.$changeUrlBackslash(this.GE_USER_INFO.userProfileImg) : this.GE_USER_INFO.userProfileImg) +');'"  style="background-position: center; background-size: cover; background-repeat: no-repeat;">
            <img v-if="this.GE_USER_INFO.certiDate" style="position: absolute; width: 20px; " :style="smallYn? 'right: -10px;bottom: -3px;' : ' right: -5px;bottom: 0px;'" src="../../assets/images/common/userCertiIcon.svg" alt="">
        </div>
        <div v-else class="picImgWrap"  style="background-image: url('../../../public/resource/userCommonIcon/userImg01.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
            <img v-if="this.GE_USER_INFO.certiDate" style="position: absolute; width: 20px;  " :style="smallYn? 'right: -10px; bottom: -3px;' : ' right: -5px;bottom: 0px;'" src="../../assets/images/common/userCertiIcon.svg" alt="">
        </div>
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
    // alert(this.smallYn)
    // alert(this.GE_USER.usrKey === this.GE_USER_INFO.userKey)
  },
  computed: {
    GE_USER_INFO () {
      if (this.selfYn) {
        return this.$store.getters['D_USER/GE_USER']
      } else {
        if (this.userInfo) {
          return this.userInfo
        } else {
          return null
        }
      }
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  watch: {
    GE_USER_INFO: {
      immediate: true,
      handler (value, old) {
        console.log(value)
      },
      deep: true
    }
  }
}
</script>
<style>
.picImgWrap {width: 100%; height: 100%; border-radius: 100%; overflow: hidden; display: flex; background-color: #fff;
}
@media screen and (max-width: 300px) {
  .picImgWrap{
    /* width: 60px!important;
    height: 60px!important; */
  }
  .mainUserName {font-size: 15px!important;}
  .mainIcon {width: 0.7rem!important;}
  .mainRefreshBtn {width: 20px!important}
}
</style>
