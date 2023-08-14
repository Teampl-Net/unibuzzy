<template>
  <div style="overflow-y:scroll; background-color:#fff; width: 100%; height: 100vh; float: left; position: absolute; z-index: 99999999; left: 0; top: 0;" @click.stop="preventDefault">
    <gPopHeader :headerTitle="`Create New...`" :pClosePop="pClosePop" />
    <div style="height:120%; overflow-y:scroll; background-color:#fff; display:flex; flex-direction:column;" class="createChanWrap" >
      <!-- <div class="createChanContentsWrap" :style="`margin-top: ${Number(this.$STATUS_HEIGHT) + 60}px;`"> -->
      <div class="createChanContentsWrap">
        <div style="border:1px solid #000; margin-bottom:10px;  width:100px; height:100px;"></div>
        <ul class="flexAllCenter" style="gap:30px; padding-left:0; background-color:#fff;">
          <li @click="selectTab(index)" v-for="(btn, index) in mTabs" :key="index" style="">
            <p :class="{selectedTab: mSelectedTab === index }" class="cursorP" style="padding:20px;">{{ btn.title }}</p>
          </li>
        </ul>
      </div>
      <!-- 게시판 생성일 때.-->
      <template v-if="mSelectedTab===0">

      </template>
      <!-- 채널 생성일 때. select한 건물에 대해서도 prop으로 보내주기-->
      <createChannel v-if="mSelectedTab===1" :chanDetail="{ modiYn: false }" @openPage="openPage" :pSelectedAreaInfo="mAreaInfo" :pBdAreaList="mBdAreaList"/>
    </div>
  </div>
</template>

<script>
import gPopHeader from '../layout/UB_gPopHeader.vue'
import createChannel from '@/components/UB/popup/UB_createChannel.vue'
export default {
  components: {
    gPopHeader,
    createChannel
  },
  props: {
    pClosePop: Function,
    chanDetail: {},
    pBdAreaList: Array,
    pSelectedAreaInfo: Object
  },
  data () {
    return {
      mTabs: [
        { title: 'Board' },
        { title: 'Channel' }
      ],
      mSelectedTab: 0
    }
  },
  methods: {
    selectTab (index) {
      this.mSelectedTab = Number(index)
      console.log('mSelectedTab', this.mSelectedTab)
    },
    preventDefault () {
      return false
    },
    closeXPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      if (this.pClosePop) this.pClosePop()
    }
  }

}

</script>

<style scoped>

.selectedTab{
  font-weight:bold;
}
.flexAllCenter{
  display:flex;
  justify-content:center;
  align-items:center;
}
.createChanWrap{
  width: 100%;
  display: flex;
  height: 100%;
  top:50px;
  }
.createChanContentsWrap{
  width: 100%;
  left:0;
  height: auto;
  /* position: relative ; */
  /* min-height: 600px; */
  margin: 80px 0;
  float: left;
  display: flex;
  align-items: center;
  justify-content:start;
  flex-direction:column;
  margin-bottom: 0;
}

</style>
