<i18n>
  {
    "ko": {
      "ICON_FIND_CHANN": "채널찾기",
    },
    "en": {
      "ICON_FIND_CHANN": "Search cannel",
    }
  }
  </i18n>
<template>
    <div class="mright-05" style="width: 100px; height: 100%; float: left; display: flex; flex-direction: column; justify-content: center; align-items: center;" @click="goSearchChannel">
        <div style="position: relative; padding: 5px 8px; width: 90px; height: 107px; float: left; border-radius: 10px; background: #F4F7FF; background-repeat: no-repeat; background-size: cover; background-position: center; display: flex; justify-content: flex-end; flex-direction: column; align-items: center;">
            <img src="../../../../assets/images/main/icon_search.png" class='img-w20' alt="">
            <p class="font14 fontBold textOverdot textLeft mtop-05 mbottom-1" style="">
                {{ $t('ICON_FIND_CHANN') }}
            </p>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    goSearchChannel () {
      var openPopParam = {}
      openPopParam.targetType = 'searchPop'
      openPopParam.popHeaderText = this.$t('ICON_FIND_CHANN')
      this.$emit('openPop', openPopParam)
    }
  }
}
</script>
<style scoped>

</style>
