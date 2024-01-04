<template>
    <div class="mainHeaderWrap" :style="mRouterHeaderText === '검색' ? 'background: white;':''">
        <img src="../../assets/images/common/thealim_header_logo.png" class="fl mainHeaderLogo" >
        <p class="font25 headerFont commonColor fl" v-html="mDispTitle? mDispTitle : $t('COMMON_NAME_APP')"></p>
        <div class="menuBtn fr" style="display:flex; align-items:center; justify-content:end; gap:20px;">
            <!-- <div @click="setPortal" class="cursorP" style="margin-top:5px; height:100%; width:25px;">
              <img :class="{grayscale : !mImagePortal}" :src="require(`@/assets/images/common/fileType_img.svg`)" class="w100P"/>
            </div> -->
            <img class="mainMenuIcon" v-on:click="showMenu()" src="../../assets/images/common/icon_menu.png"/>
        </div>
        <!-- <select class="fr h-100P mright-05 cursorP" @change="changeLang" v-model="mAppLocale" name="langSelectBox" id="selectLang">
            <option value="ko" class="h-100P">한국어</option>
            <option value="en" class="h-100P">English</option>
        </select> -->
        <!-- <div class=" policyHeader fl ms-2 text-start " style="margin-top: 5px; line-height: 20px">
            <p class="font25 headerFont commonColor fl">하이브릭</p>
        </div> -->
    </div>
</template>
<script>
export default {
  name: 'talHeader',
  data () {
    return {
      // mAppLocale: 'ko',
      mDispTitle: this.$t('COMMON_NAME_APP'),
      mImagePortal: false
    }
  },
  methods: {
    // changeLang () {
    //   this.$i18n.locale = this.mAppLocale
    // },
    showMenu () {
      this.$emit('showMenu')
    },
    setPortal () {
      this.mImagePortal = !this.mImagePortal
      const currentScreen = localStorage.getItem('currentScreen') || 'Smain'
      const newScreen = currentScreen === 'Smain' ? 'Imain' : 'Smain'
      localStorage.setItem('currentScreen', newScreen)
      console.log('currentScreen + newScreen', currentScreen, newScreen)
      this.$emit('screenToggled', newScreen)
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
        if (val === '하이브릭' || val === 'The Alim') {
          this.mDispTitle = this.$t('COMMON_NAME_APP')
        } else if (val === '채널' || val === 'Channel') {
          this.mDispTitle = this.$t('COMMON_NAME_CHANNEL')
        } else if (val === '마이페이지' || val === 'My Page') {
          this.mDispTitle = this.$t('COMMON_NAME_MY_PAGE')
        } else if (val === '검색' || val === 'Search') {
          this.mDispTitle = this.$t('COMMON_NAME_SEARCH')
        } else if (val === '오늘의 일' || val === 'To Do') {
          this.mDispTitle = this.$t('COMMON_NAME_TODOLIST')
        }
      }
    },
    GE_LOCALE: {
      immediate: true,
      handler (val) {
        if (this.mRouterHeaderText === '하이브릭' || this.mRouterHeaderText === 'The Alim') {
          this.mDispTitle = this.$t('COMMON_NAME_APP')
        } else if (this.mRouterHeaderText === '채널' || this.mRouterHeaderText === 'Channel') {
          this.mDispTitle = this.$t('COMMON_NAME_CHANNEL')
        } else if (this.mRouterHeaderText === '마이페이지' || this.mRouterHeaderText === 'My Page') {
          this.mDispTitle = this.$t('COMMON_NAME_MY_PAGE')
        } else if (this.mRouterHeaderText === '검색' || this.mRouterHeaderText === 'Search') {
          this.mDispTitle = this.$t('COMMON_NAME_SEARCH')
        } else if (this.mRouterHeaderText === '오늘의 일' || this.mRouterHeaderText === 'To Do') {
          this.mDispTitle = this.$t('COMMON_NAME_TODOLIST')
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
.grayscale{
  filter: grayscale(1)
}
.mainHeaderWrap{box-sizing: border-box; display: list-item; background: #E7EDFF!important; padding: 0.5rem 0.7rem; padding-right: 1rem; text-align: left; width: calc(100% + 1px); }
.menuBtn{float: right;}
.mainMenuIcon{width: 1.8rem; margin-top: 5px; -webkit-user-drag: none;}
.mainHeaderLogo{width: 1.7rem; margin: 0 0.4rem; -webkit-user-drag: none;}
</style>
