<i18n>
  {
    "ko": {
      "BOX_TITLE_TITLE": "제목",
      "BOX_TITLE_CRE_USER": "작성자",
      "BOX_TITLE_CRE_DATE": "날짜",
      "BOX_TITLE_CRE_CHAN": "채널명"
    },
    "en": {
      "BOX_TITLE_TITLE": "Title",
      "BOX_TITLE_CRE_USER": "Writer",
      "BOX_TITLE_CRE_DATE": "Date",
      "BOX_TITLE_CRE_CHAN": "Channel"
    }
  }
  </i18n>
<template>
  <div class="fl cursorP commonColorBorder" style="border-radius: 7px; min-width: 80px; padding:3px 7px;  padding-right: 25px; position: relative;">
    <p class="fl font12 lightGray"><small class="fl font12 commonColor fontBold mleft-03">{{ returnLocaleText(propSearchBox.searchType) }}</small><small class="fl font12 fontBold lightGray mleft-03">{{propSearchBox.dispName}}</small></p>
    <img class="cursorP" @click="this.$emit('delSearchBox')" src="../../assets/images/common/popup_close.png" style="width: 10px; position: absolute; right: 5px;  top: 8px;" alt="">
  </div>
</template>

<script>
export default {
  props: {
    propSearchBox: {}
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  data () {
    return {
    }
  },
  methods: {
    returnLocaleText (text) {
      if (this.GE_LOCALE === 'ko') {
        return text
      } else {
        switch (text) {
          case '제목':
            return this.$t('BOX_TITLE_TITLE')
          case '작성자':
            return this.$t('BOX_TITLE_CRE_USER')
          case '날짜':
            return this.$t('BOX_TITLE_CRE_DATE')
          case '채널명':
            return this.$t('BOX_TITLE_CRE_CHAN')
        }
      }
    }
  }
}
</script>

<style>

</style>
