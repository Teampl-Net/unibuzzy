<template>
    <div style="width: 150px; height: 100%; float: left; display: flex; flex-direction: column; justify-content: center; align-items: center;" @click="goChannelMain">
        <div v-if="chanElement" style="position: relative; padding: 5px 8px; border: 0.5px solid rgba(0, 0, 0, 0.1); width: 140px; height: 107px; float: left; border-radius: 10px; background-repeat: no-repeat; background-size: cover; background-position: center;"
            :style="'background-image: url(' + (chanElement.bgDomainPath !== undefind ? chanElement.bgDomainPath + chanElement.bgPathMtext : chanElement.bgPathMtext) + ');'" >
            <div style="width: 32px; height: 32px; float: left; border: 2px solid #FFF; border-radius: 100%; position: absolute; top: 5px; left: 8px; z-index: 1; background-repeat: no-repeat; background-size: cover; background-position: center;" :style="'background-image: url(' + (chanElement.logoDomainPath !== undefind ? chanElement.logoDomainPath + chanElement.logoPathMtext : chanElement.logoPathMtext) + ');'"></div>

            <div style="width: 10px; height: 10px; border-radius: 100%; border: 1px solid #FFFFFF; background: #ED4956; position: absolute; right: 8px; top: 5px; z-index:1"></div>
            <div style="width: calc(100%); height: 100%; border-radius: 5px; background: #00000040; padding: 5px; position: absolute; left: 0px; bottom: 0px; background: linear-gradient(0deg, #00000099, transparent) !important;"></div>
            <p class="font14 w-100P fontBold textOverdot textLeft" style="color: #fff; position: absolute; z-index: 1; bottom: 2px; line-height: 20px;">
                채널 찾기
            </p>
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
      console.log(this.chanElement)
      var openPopParam = {}
      openPopParam.targetKey = this.chanElement.teamKey
      openPopParam.targetType = 'chanDetail'
      this.$emit('openPop', openPopParam)
    }
  }
}
</script>
<style scoped>

</style>
