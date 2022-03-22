<template>
    <div class="" ref="tabbar" style="border-bottom: 0.5px solid #6768A78A; height: 1.9rem; position: relative; width: 100%;">
        <div class="fl tabTitleBox textLeft" :class="index === activetab ? 'active' : ''" v-for="(tab, index) in tabList"  @click="switchtab(index)" :key="index" ref="tab">
            <p class="tabItem font15 fontBold commonColor" style="margin: 0 0.4rem;" v-html="tab.display" v-on:click="selectTab(tab.name)"></p>
        </div>
        <div class="activeBar"  ref="activeBar" :style="activebarWidth"   style="position: absolute; background: #6768A7;  height: 3px; border-radius: 3px;"></div>
      </div>
</template>
// 'transform:translateX(' + (activetab * activebarWidth * 1.08) + 'rem)'
<script>
export default {
  props: {
    tabList: {}
  },
  data () {
    return {
      transition: 'slide-next',
      activetab: 0,
      tabwidth: 5.5,
      touch: { sx: null, sy: null, st: null, ex: null, ey: null, et: null }
    }
  },
  mounted () {
    alert(true)
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
        '--transform': 'translateX(' + (this.activetab * this.tabwidth * 1.08) + 'rem' + ')'
      }
    }
  },
  methods: {
    switchtab (n) {
      this.$nextTick(() => {
        this.activetab = n
      })
    },
    selectTab (tab) {
      this.$emit('changeTab', tab)
    }
  }
}
</script>

<style >
.activeBar{
  min-width: var(--tabwidth);
  top: 1.8rem;
  transition: 0.5s ease;
  transform: var(--transform);
}
.tabTitleBox{
  min-width: 4rem;
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
  width: 5rem;
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
