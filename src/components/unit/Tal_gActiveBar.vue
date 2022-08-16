<template>
<!-- :class="{ssss: tabList.length > 3}" -->
    <div ref="tabbar" style="border-bottom: 0.5px solid #6768A78A; height: 1.9rem; position: relative; width: 100%;" >
      <div class="fl tabTitleBox textLeft" :class="index === activetab ? 'active' : ''" v-for="(tab, index) in tabList"  @click="switchtab(index)" :key="index" ref="tab" style="white-space: nowrap;">
          <!-- <p :style="activebarWidth" class="tabItem font16 fontBold commonColor"  style="margin: 0 auto; white-space: nowrap;" v-html="tab.display" v-on:click="selectTab(tab.name, tab.display)"></p> -->
          <p :style="activebarWidth" :class="{mWidth : tabTrimLength(tab.display) > 3}" class="tabItem font16 fontBold commonColor"  style="margin: 0 auto; white-space: nowrap;" v-html="tab.display" v-on:click="selectTab(tab.name, tab.display)"></p>
      </div>
      <!-- <div class="activeBar"  ref="activeBar" :style="activebarWidth" style="position: absolute; background: #6768A7;  height: 3px; border-radius: 3px;"></div> -->
      <div class="activeBar"  ref="activeBar" :style="activebarWidth" :class="{mWidth : tabTrimLength(this.selectedTabName) > 3, }" style="position: absolute; background: #6768A7;  height: 3px; border-radius: 3px;"></div>
      <div v-if="searchYn">
        <div class="fr" style="position: absolute; height: 40px; right:0; bottom:0; display: flex; flex-direction: row; align-items: center;">
          <!-- <div class="activeSearchInput fl" @click="this.$emit('openFindPop')" ref="alimSearchKey" /> -->
          <img class="fl" style="width:20px; line-heigth:40px" @click="this.$emit('openFindPop')" src="../../assets/images/common/iocn_search.png" alt="검색버튼">
        </div>

        <div style="width: 100%;">
          <searchResult @changeSearchList="changeSearchList" :searchList="resultSearchKeyList" />
        </div>
      </div>
    </div>

</template>
<script>
import searchResult from '../../components/unit/Tal_searchResult.vue'
export default {
  components: {
    searchResult
  },
  props: {
    tabList: {},
    activetabProp: {},
    searchYn: { type: Boolean, default: false },
    modeType: { type: String, default: 'Basic' },
    resultSearchKeyList: {}
  },
  data () {
    return {
      transition: 'slide-next',
      activetab: 0,
      // tabwidth: 4.8,
      tabwidth: 3.3,
      touch: { sx: null, sy: null, st: null, ex: null, ey: null, et: null },
      selectedTabName: ''
    }
  },
  mounted () {
    // window.addEventListener('resize', () => {
    //   if (window.innerWidth < 360) {
    //     this.tabwidth = 3.5
    //     if (window.innerWidth < 290) {
    //       this.tabwidth = 3.0
    //     }
    //   }
    // })
    // this.$refs.activeBar.style.setProperty('--tabwidth', 5.5 + 'rem')
  },
  computed: {
    pointer () {
      if (window.PointerEvent) return true
      else return false
    },
    activebarWidth () {
      return {
        '--tabwidth': this.tabwidth + 'rem',
        '--transform': 'translateX(' + (this.activetab * this.tabwidth * 1) + 'rem' + ')'
      }
    }
  },
  methods: {
    tabTrimLength (displayName) {
      if (this.modeType === 'Basic') {
        var text = displayName.replaceAll(' ', '')
        return text.length
      }
    },
    changeSearchList (type) {
      this.$emit('changeSearchList', type)
    },
    switchtab (n) {
      this.$nextTick(() => {
        this.activetab = n
      })
    },
    selectTab (tab, displayName) {
      this.selectedTabName = displayName.replaceAll(' ', '')
      this.$emit('changeTab', tab)
    }
  },
  created () {
    // this.selectedTabName = this.tabList.display
    if (this.activetabProp) {
      for (var i = 0; i < this.tabList.length; i++) {
        if (this.tabList[i].name === this.activetabProp) {
          this.activetab = i
          break
        }
      }
    }
    if (this.modeType === 'write') {
      this.tabwidth = 4.8
    }
    // if (window.innerWidth < 360) {
    //   this.tabwidth = 4
    //   if (window.innerWidth < 290) {
    //     this.tabwidth = 3.5
    //   }
    // }
  }
}
</script>

<style >
/* background: #e9e9e9 */
 /* background: #e4e4e463; */
.activeSearchInput{border: none; background: #e9e9e9; height: 90%; float: left; width: 6%; border-radius: 12px; padding: 0.4rem; padding-right: 3rem; box-sizing: border-box}
.activeBar{
  min-width: var(--tabwidth);
  top: 1.8rem;
  transition: 0.5s ease;
  transform: var(--transform);
}
.tabTitleBox{
  /* min-width: 4rem; */
}
.tabs {
  display: inline-table;
  position: relative;
  height: 100px;
  overflow-x: scroll;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}
.tabs::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}
.tabItem {
  display: flex;
  align-items: center;
  justify-content: center;

  /* justify-content: flex-start; */
  cursor: pointer;
  text-transform: uppercase;
  width: var(--tabwidth);
}

.slider {
  position: absolute;
  bottom: 0px;
  height: 4px;
  width: var(--tabwidth);
  /* width: 130px; */
  background: black;
  transition: 0.5s ease;
}
.mWidth{
  width: 4.5rem !important;
}
.tabcontainer {
  height: 900px;
  position: relative;
  min-height: 100%;
  width: 100%;
  touch-action: pan-y;
}

.tabpane {
  /* position: absolute;
  width: 100%; */
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
