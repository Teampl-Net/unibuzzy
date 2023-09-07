<template>
    <div class="fl w100P mTop0" :style="(modeType === 'write' || channelYn) ? 'background: transparent' : 'background: rgb(220, 221, 235);' ">
      <div class="tabWrap" ref="tabbar" :style="{color: this.modeType === 'write' ? 'background: transparent' : ''}" >
        <!-- <div class="fl tabTitleBox textLeft" :class="index === activetab ? 'active' : ''" v-for="(tab, index) in tabList"  @click="switchtab(index)" :key="index" ref="tab" style="white-space: nowrap;" :style="channelYn? 'flex: 1 1 0%':''">
          <p :style="!channelYn? activebarWidth:''" :class="{mWidth : tabTrimLength(tab.display) > 3, commonColor: index === activetab && channelYn, lightGray: index !== activetab && channelYn}" class="tabItem font16 fontBold commonColor"  style="margin: 0 auto; white-space: nowrap;" v-html="tab.display" v-on:click="selectTab(tab.name, tab.display)"></p>
        </div> -->
        <!-- @change="selectTab(filter.name, filter.display)" -->
        <select class="fl selectStyle" ref="tab" @change="handleTabChange"  >
            <option v-for="(filter, idx) in tabList" :key="idx" :value="JSON.stringify(filter)">{{ filter.display }}</option>
        </select>
        <select  v-if="subTabList" class="fl selectStyle mLeft10" ref="tab" @change="handleBoardTabChange"  >
            <option v-for="(filter, idx) in subTabList" :key="idx" :value="JSON.stringify(filter)">{{ filter.display }}</option>
        </select>
        <!-- <div class="activeBar fl"  ref="activeBar" :style="activebarWidth" :class="{mWidth : tabTrimLength(this.selectedTabName) > 3, }" style="position: absolute; background: #6768A7;  height: 3px; border-radius: 3px;"></div> -->

        <div class="fr searchWrap" v-if="searchYn && !channelYn">
          <div class="fr">
            <img class="fl cursorP img-w20 lineHeight40" @click="this.$emit('openFindPop')" src="../../../assets/images/common/iocn_search.png" alt="button for search">
          </div>
        </div>
      </div>
      <div class="searchArea" v-if="channelYn">
        <div class="fl w100P h100P" v-if="searchYn">
          <div class="fl mtop-03" v-if="propSearchList">
            <cSearchBox class="mright-03" :propChanSearchYn='true' :propSearchBox='value' v-for="(value, index) in propSearchList" :key="index" @searchBoxClick='searchBoxClick' />
          </div>
          <div class="fl searchIconBox">
            <img class="fl cursorP img-w20 lineHeight40" @click="this.$emit('openFindPop')" src="../../../assets/images/common/iocn_search.png" alt="button for search">
          </div>
        </div>
      </div>
      <div v-if="searchYn && resultSearchKeyList && resultSearchKeyList.length > 0" class="pagePaddingWrap searchResultArea">
        <searchResult @changeSearchList="changeSearchList" :searchList="resultSearchKeyList" />
      </div>
    </div>
</template>
<script>
import searchResult from '../../../components/unit/Tal_searchResult.vue'
import cSearchBox from '../../../components/unit/D_cSearchBox.vue'
export default {
  components: {
    cSearchBox,
    searchResult
  },
  props: {
    propSearchList: {},
    tabList: {},
    activetabProp: {},
    searchYn: { type: Boolean, default: false },
    resultSearchKeyList: {},
    testYn: { type: Boolean, default: false },
    channelYn: { type: Boolean, default: false },
    subTabList: Object
  },
  data () {
    return {
      transition: 'slide-next',
      activetab: 0,
      tabwidth: 3,
      touch: { sx: null, sy: null, st: null, ex: null, ey: null, et: null },
      selectedTabName: ''
    }
  },
  methods: {
    searchBoxClick (searchData) {
      this.$emit('searchBoxClick', searchData)
    },
    tabTrimLength (displayName) {
      if (this.modeType === 'Basic') {
        var text = displayName.replaceAll(' ', '')
        return text.length
      }
    },
    changeSearchList (type) {
      this.$emit('changeSearchList', type)
    },
    switchtab (n, tab) {
      if (tab) {
        if (tab.display !== undefined && tab.display !== null && tab.display !== '') {
          this.selectedTabName = tab.display.replaceAll(' ', '')
        }
        this.$emit('changeTab', tab.name)
      }

      this.activetab = Number(n)
      var this_ = this
      this.$nextTick(() => {
        this_.activetab = Number(n)
      })
    },
    handleTabChange (event) {
      const selected = JSON.parse(event.target.value)
      this.selectTab(selected.name, selected.display)
    },
    handleBoardTabChange (event) {
      const selected = JSON.parse(event.target.value)
      this.selectBoardTab(selected.name, selected.display)
    },
    selectTab (tab, displayName) {
      if (displayName !== undefined && displayName !== null && displayName !== '') {
        this.selectedTabName = displayName.replaceAll(' ', '')
      }
      this.$emit('changeTab', tab)
    },
    selectBoardTab (tab, displayName) {
      if (displayName !== undefined && displayName !== null && displayName !== '') {
        this.selectedTabName = displayName.replaceAll(' ', '')
      }
      this.$emit('changeBoardTab', tab)
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
    if (window.innerWidth > 400) {
      this.tabwidth = 4.8
    }

    if (window.innerWidth < 400) {
      this.tabwidth = 4
    } if (window.innerWidth < 290) {
      this.tabwidth = 3
    }
    // }
  },
  computed: {
    pointer () {
      if (window.PointerEvent) return true
      else return false
    },
    activebarWidth () {
      var tabWidth = 100 / this.tabList.length
      if (this.testYn === true || this.channelYn) {
        return {
          '--tabwidth': tabWidth + '%',
          '--transform': 'translateX(' + (this.activetab * 100) + '%' + ')'
        }
      } else {
        return {
          '--tabwidth': this.tabwidth + 'rem',
          '--transform': 'translateX(' + (this.activetab * this.tabwidth * 1) + 'rem' + ')'
        }
      }
    }
  }
}
</script>

<style scoped>
/* background: #e9e9e9 */
 /* background: #e4e4e463; */
.activeSearchInput {
  border: none;
  background: #e9e9e9;
  height: 90%;
  float: left;
  width: 6%;
  border-radius: 12px;
  padding: 0.4rem;
  padding-right: 3rem;
  box-sizing: border-box;
}
.activeBar {
  min-width: var(--tabwidth);
  top: 38px;
  transition: 0.5s ease;
  transform: var(--transform);
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
  cursor: pointer;
  text-transform: uppercase;
  width: var(--tabwidth);
}

.slider {
  position: absolute;
  bottom: 0px;
  height: 4px;
  width: var(--tabwidth);
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
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tabWrap {
  padding: 0 15px;
  display: flex;
  align-items: center;
  background: #FFF;
  height: 50px;
  float: left;
  width: 100%;
}
.selectStyle {
  width:160px !important;
  height:30px;
}
.searchWrap {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.searchWrap > div {
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.searchArea {
  width: 100%;
  height: 40px;
}
.searchArea > div {
  background-color: #fff;
}
.searchIconBox {
  right: 1.5rem;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.searchResultArea {
  padding-top: 0;
  width: 100%;
  float: left
}
</style>
