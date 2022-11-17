<template>
    <div style="width: 70px; height: 100%; float: left; display: flex; margin-right: 10px; flex-direction: column; justify-content: center; align-items: center;">
        <div v-if="chanElement" style="position: relative; border: 0.5px solid rgba(0, 0, 0, 0.1); width: 60px; height: 60px; float: left; border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;"
            :style="'background-image: url(' + (chanElement.logoDomainPath !== undefind ? chanElement.logoDomainPath + chanElement.logoPathMtext : chanElement.logoPathMtext) + ');'" >
            <div class="CWhiteBgColor" style="position: absolute; right: 0; display: flex; justify-content: center; algin-items: center; padding: 2px; bottom: 0; width: 18px; height: 18px; border-radius: 100%;">
                <img src="../../../assets/images/channel/ownerChannel_crown.svg" style="width: 100%; flaot: left;" v-if="chanElement.ownerYn" alt="">
                <img src="../../../assets/images/common/icon_setting_gear.svg" style="width: 100%; flaot: left;" v-else alt="">
            </div>
        </div>
        <p class="commonGray font14 w-100P textOverdot"><img v-if="chanElement.officialYn" src="../../../assets/images/main/main_officialMark.svg" alt="">{{this.$changeText(chanElement.nameMtext)}}</p>
    </div>
</template>
<script>
export default {
  props: {
    chanElement: {}
  }
}
</script>
<style scoped>

</style>
