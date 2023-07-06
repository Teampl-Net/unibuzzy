<template>
    <div class="mainHeaderWrap" :style="mRouterHeaderText === '검색' ? 'background: white;':''">
        <img src="../../assets/images/common/thealim_header_logo.png" class="fl mainHeaderLogo" >
        <p class="font25 headerFont commonColor fl" v-html="mDispTitle? mDispTitle : $t('COMMON_NAME_APP')"></p>
        <div class="menuBtn fr">
            <img class="mainMenuIcon" v-on:click="showMenu()" src="../../assets/images/common/icon_menu.png"/>
        </div>
        <select class="fr h-100P mright-05 cursorP" @change="changeLang" v-model="mAppLocale" name="langSelectBox" id="selectLang">
            <option value="ko" class="h-100P">한국어</option>
            <option value="en" class="h-100P">English</option>
        </select>
        <!-- <div class=" policyHeader fl ms-2 text-start " style="margin-top: 5px; line-height: 20px">
            <p class="font25 headerFont commonColor fl">더알림</p>
        </div> -->
    </div>
</template>
<script>
export default {
  name: 'talHeader',
  data () {
    return {
      mAppLocale: 'en',
      mDispTitle: this.$t('COMMON_NAME_APP')
    }
  },
  methods: {
    changeLang () {
      this.$i18n.locale = this.mAppLocale
    },
    showMenu () {
      this.$emit('showMenu')
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  watch: {
    mRouterHeaderText: {
      immediate: true,
      handler (val) {
        if (!val) return
        if (val === '더알림') {
          this.mDispTitle = this.$t('COMMON_NAME_APP')
        } else if (val === '채널') {
          this.mDispTitle = this.$t('COMMON_NAME_CHANNEL')
        } else if (val === '마이페이지') {
          this.mDispTitle = this.$t('COMMON_NAME_MY_PAGE')
        } else if (val === '검색') {
          this.mDispTitle = this.$t('COMMON_NAME_SEARCH')
        }
      }
    },
    GE_LOCALE: {
      immediate: true,
      handler (val) {
        if (this.mRouterHeaderText === '더알림') {
          this.mDispTitle = this.$t('COMMON_NAME_APP')
        } else if (this.mRouterHeaderText === '채널') {
          this.mDispTitle = this.$t('COMMON_NAME_CHANNEL')
        } else if (this.mRouterHeaderText === '마이페이지') {
          this.mDispTitle = this.$t('COMMON_NAME_MY_PAGE')
        } else if (this.mRouterHeaderText === '검색') {
          this.mDispTitle = this.$t('COMMON_NAME_SEARCH')
        }
      }
    }
  },
  /* watch: {
    $i18n: {
      immediate: true,
      handler (val) {
        if (val) {
          this.mAppLocale = val
        }
      }
    }
  }, */
  props: {
    mRouterHeaderText: {}
  }
}

</script>

<style>
.mainHeaderWrap{box-sizing: border-box; display: list-item; background: #E7EDFF!important; padding: 0.5rem 0.7rem; padding-right: 1rem; text-align: left; width: calc(100% + 1px); }
.menuBtn{float: right;}
.mainMenuIcon{width: 1.8rem; margin-top: 5px; -webkit-user-drag: none;}
.mainHeaderLogo{width: 1.7rem; margin: 0 0.4rem; -webkit-user-drag: none;}
</style>
