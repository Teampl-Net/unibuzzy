<template>
    <div v-if="testYn === true" class="fl w100P tActiveBarWrap">
      <div ref="tabbar" class="w100P fl tActiveBarArea">
        <div class="fl tabTitleBox textLeft tActiveBarItem" v-for="(tab, index) in tabList" @click="switchtab(index, tab)" :key="index === activetab" ref="tab">
          <p :style="activebarWidth" class="tabItem font16 fontBold" :class="{commonColor: index === activetab, lightGray: index !== activetab}" v-html="tab.display" v-on:click="selectTab(tab.name, tab.display)"></p>
        </div>
        <div class="activeBar fl tActiveBarBottom"  ref="activeBar" :style="activebarWidth"></div>
      </div>
      <div class="fl w100P tActiveBarSearchBox" v-if="searchYn">
        <div class="fl mtop-03" v-if="propSearchList">
          <cSearchBox class="mright-03" :propChanSearchYn='true' :propSearchBox='value' v-for="(value, index) in propSearchList" :key="index" @searchBoxClick='searchBoxClick' />
        </div>
        <div class="fr tActiveBarSearchIcon">
          <img class="fl cursorP img-w20" @click="$emit('openFindPop')" src="../../assets/images/common/iocn_search.png" alt="검색버튼">
        </div>
      </div>
      <div v-if="searchYn && resultSearchKeyList && resultSearchKeyList.length > 0" class="searchItemWrap">
          <searchResult @changeSearchList="changeSearchList" :searchList="resultSearchKeyList" />
      </div>
    </div>

    <div class="activeBarWrap" v-else :style="(modeType === 'write' || channelYn) ? 'background: transparent' : 'background: rgb(220, 221, 235);' ">
      <div ref="tabbar" class="activeBarArea" :class="!channelYn? 'pagePaddingWrap':''" :style="{color: modeType === 'write' ? 'background: transparent' : '', display: channelYn? 'flex':''}" >
        <div class="fl tabTitleBox textLeft tActiveBarItem" :class="index === activetab ? 'active' : ''" v-for="(tab, index) in tabList"  @click="switchtab(index)" :key="index" ref="tab" :style="channelYn? 'flex: 1 1 0%':''">
          <p :style="!channelYn? activebarWidth:''" :class="{mWidth : tabTrimLength(tab.display) > 3, commonColor: index === activetab && channelYn, lightGray: index !== activetab && channelYn}" class="tabItem font16 fontBold commonColor" v-html="tab.display" v-on:click="selectTab(tab.name, tab.display)"></p>
        </div>
        <div class="activeBar fl tActiveBarBottom noLeft"  ref="activeBar" :style="activebarWidth" :class="{mWidth : tabTrimLength(selectedTabName) > 3 }"></div>
        <div class="barSearchBox" v-if="searchYn && !channelYn">
          <div class="fr activeBarSearchIcon">
            <img class="fl cursorP img-w20 lineHeight40" @click="$emit('openFindPop')" src="../../assets/images/common/iocn_search.png" alt="검색버튼">
          </div>
        </div>
      </div>
      <div class="w100P" v-if="channelYn">
        <div class="fl w100P channelSearchBox" v-if="searchYn">
          <div class="fl mtop-03" v-if="propSearchList">
            <cSearchBox class="mright-03" :propChanSearchYn='true' :propSearchBox='value' v-for="(value, index) in propSearchList" :key="index" @searchBoxClick='searchBoxClick' />
          </div>
          <div class="fr channelSearchIcon">
            <img class="fl cursorP img-w20 lineHeight40" @click="$emit('openFindPop')" src="../../assets/images/common/iocn_search.png" alt="검색버튼">
          </div>
        </div>
      </div>
      <div v-if="searchYn && resultSearchKeyList && resultSearchKeyList.length > 0" class="pagePaddingWrap barSearchResultWrap">
        <searchResult @changeSearchList="changeSearchList" :searchList="resultSearchKeyList" />
      </div>
    </div>
</template>
<script>
import searchResult from '../../components/unit/UB_searchResult.vue'
import cSearchBox from './UB_cSearchBox.vue'
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
    channelYn: { type: Boolean, default: false }
  },
  data () {
    return {
      activetab: 0,
      tabwidth: 3,
      selectedTabName: '',
      mSelectedTab: 0
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
      this.mSelectedTab = n
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
    selectTab (tab, displayName) {
      if (displayName !== undefined && displayName !== null && displayName !== '') {
        this.selectedTabName = displayName.replaceAll(' ', '')
      }
      this.$emit('changeTab', tab)
    }
  },
  created () {
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

<style >
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

  /* justify-content: flex-start; */
  cursor: pointer;
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

.secondTab {
  width:8.8rem;
}

.tabpane {
  /* position: absolute;
  width: 100%; */
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tActiveBarWrap {
  margin-top: 0;
  background: #FFF;
}
.tActiveBarArea {
  padding-top: 10px;
  background: #FFF;
  border-bottom: 3px solid #ccc;
  height: 41px;
  position: relative;
  display: flex;
}
.tActiveBarItem {
  white-space: nowrap;
  flex: 1;
}
.tActiveBarItem > p {
  margin: 0 auto;
  white-space: nowrap;
}
.tActiveBarBottom {
  position: absolute;
  background: #6768A7;
  height: 3px;
  border-radius: 3px;
  left: 0;
}
.tActiveBarSearchBox {
  min-height: 6px;
}
.tActiveBarSearchIcon {
  height: 40px;
  right: 1.5rem;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tActiveBarSearchIcon > img {
  line-height: 40px;
}
.searchItemWrap {
  padding-top: 0;
  box-shadow: 0 4px 4px -4px #ccc;
  width: 100%;
  float: left;
  background: #fff;
}
.activeBarWrap {
  float: left;
  width: 100%;
  margin-top: 0;
}
.activeBarArea {
  padding-top: 10px;
  background: #FFF;
  border-bottom: 0.5px solid #6768A78A;
  height: 40px;
  float: left;
  position: relative;
  width: 100%;
}
.noLeft {
  left: unset !important;
}
.barSearchBox {
  float: left;
  width: 100%;
  min-height: 6px;
}
.activeBarSearchIcon {
  position: absolute;
  height: 40px;
  right: 1.5rem;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.lineHeight40 {
  line-height: 40px;
}
.channelSearchBox {
  min-height: 6px;
  background-color: #fff;
}
.channelSearchIcon {
  height: 40px;
  right: 1.5rem;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.barSearchResultWrap {
  padding-top: 0;
  width: 100%;
  float: left;
}
</style>
