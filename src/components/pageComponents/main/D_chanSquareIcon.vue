<template>
    <div style="width: 150px;cursor: pointer; height: 100%; float: left; display: flex; flex-direction: column; justify-content: center; align-items: center;" @click="goChannelMain">
        <div v-if="chanElement" style="position: relative; padding: 5px 8px; border: 0.5px solid rgba(0, 0, 0, 0.1); width: 140px; height: 107px; float: left; border-radius: 10px; background-repeat: no-repeat; background-size: cover; background-position: center;"
            :style="'background-image: url(' + (chanElement.bgDomainPath !== undefind ? chanElement.bgDomainPath + chanElement.bgPathMtext : chanElement.bgPathMtext) + ');'" >
            <div style="width: 32px; height: 32px; float: left; border: 2px solid #FFF; border-radius: 100%; position: absolute; top: 5px; left: 8px; z-index: 1; background-repeat: no-repeat; background-size: cover; background-position: center;" :style="'background-image: url(' + (chanElement.logoDomainPath !== undefind ? chanElement.logoDomainPath + chanElement.logoPathMtext : chanElement.logoPathMtext) + ');'"></div>
            <!-- <div class="CWhiteBgColor" style="position: absolute; right: 0; display: flex; justify-content: center; algin-items: center; padding: 2px; bottom: 0; width: 18px; height: 18px; border-radius: 100%;">
                <img src="../../../assets/images/channel/ownerChannel_crown.svg" style="width: 100%; float: left;" v-if="chanElement.ownerYn" alt="">
                <img src="../../../assets/images/common/icon_setting_gear.svg" style="width: 100%; float: left;" v-else alt="">
            </div> -->
            <!-- 따로 컴포넌트는 없고 그냥 태그 명칭만 이렇게 해두었습니다. -->
            <redDot v-if="false" style="width: 10px; height: 10px; border-radius: 100%; border: 1px solid #FFFFFF; background: #ED4956; position: absolute; right: 8px; top: 5px; z-index:1"></redDot>
            <div style="width: calc(100%); height: 100%; border-radius: 5px; background: #00000040; padding: 5px; position: absolute; left: 0px; bottom: 0px; background: linear-gradient(0deg, #00000099, transparent) !important;">
            <!-- <div :style="chanElement.blackYn === 1? 'background: #00000040;' : 'background: #FFFFFF90;' " style="width: calc(100% - 10px); border-radius: 5px; height: 50px; padding: 5px; position: absolute; left: 5px; bottom: 5px;">
                 -->
            </div>
            <div class="font14 w-100P fontBold textOverdot textLeft" style="color: #fff; position: absolute; z-index: 1; bottom: 2px; line-height: 18px;">
                <!-- <p :style="chanElement.blackYn === 1? 'color: #fff!important;' : '' " class="commonGray font14 w-100P textOverdot textLeft" style=""> -->
                <img v-if="chanElement.officialYn" src="../../../assets/images/main/main_officialMark_white.svg" class="img-w9 mright-01" alt="">{{this.$changeText(chanElement.nameMtext)}}
                <br><p class="font12 w-100P textOverdot" style="color: #fff;">{{this.$changeText(chanElement.memoMtext)}}</p>
            </div>
        </div>

    </div>
</template>
<script>
export default {
  props: {
    chanElement: {}
  },
  methods: {
    goChannelMain () {
      var openPopParam = {}
      openPopParam = this.chanElement
      openPopParam.value = this.chanElement
      openPopParam.targetKey = this.chanElement.teamKey
      openPopParam.targetType = 'chanDetail'
      this.$emit('openPop', openPopParam)
    }
  }
}
</script>
<style scoped>

</style>
