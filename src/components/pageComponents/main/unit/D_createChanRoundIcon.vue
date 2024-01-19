<i18n>
{
  "ko": {
    "CRE_NAME_CHAN": "채널 생성",
    "CRE_BTN_CREATE": "채널생성"
  },
  "en": {
    "CRE_NAME_CHAN": "Create a Channel",
    "CRE_BTN_CREATE": "Create"
  }
}
</i18n>
<template>
  <div style="width: 70px; height: 100%; float: left; display: flex; margin-right: 10px; flex-direction: column; justify-content: center; align-items: center;" @click="goCreateChannel">
    <div style="position: relative; width: 60px; height: 60px; float: left; border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center; background:#F4F7FF; display: flex; border-radius: 100%; justify-content: center; align-items: center;">
      <img src="../../../../assets/images/common/icon_plus.svg" class="img-w20">
    </div>
    <p class=" font14 w-100P textOverdot fontBold" style="color: rgb(74 102 158)">{{ $t('CRE_BTN_CREATE') }}</p>
  </div>
</template>
<script>
export default {
  methods: {
    goCreateChannel () {
      var openPopParam = {}
      openPopParam.targetType = 'createChannel'
      openPopParam.popHeaderText = this.$t('CRE_NAME_CHAN')
      this.$emit('openPop', openPopParam)
    }
  }
}
</script>
<style scoped>

</style>
