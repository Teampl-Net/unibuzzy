<template>
  <seleciconBgPopup v-if="mSelectBuildingPop" :pSelectedBuilding="mSelectedBuilding" :selectBd="this.mSelectedBuilding" @no='mSelectBuildingPop=false' @makeParam='setIconOrBGData' :opentype="mSelectBuilding" :pClosePop="closeSelectBuildingPop"/>
  <div style="overflow-y:scroll; background-color:#fff; width: 100%; height: 100vh; float: left; position: absolute; z-index: 9998; left: 0; top: 0;" @click.stop="preventDefault">
    <gPopHeader :headerTitle="`Create New...`" :pClosePop="pClosePop" />
    <div style="height:120%; overflow-y:scroll; background-color:#fff; display:flex; flex-direction:column;" class="createChanWrap" >
      <div class="createChanContentsWrap">
      <!-- 빌딩 선택-->
        <div @click="openSelectBuildingPop" class="channelBuildingArea cursorP" :style="'background-image: url(' + mSelectedBuilding.selectPath + ')'" style="background-size: cover; background-position: center; background-repeat: no-repeat;">
        </div>

        <ul class="flexAllCenter" style="gap:30px; padding-left:0; background-color:#fff;">
          <li @click="selectTab(index)" v-for="(btn, index) in mTabs" :key="index" style="">
            <p :class="{selectedTab: mSelectedTab === index }" class="cursorP" style="padding:20px;">{{ btn.title }}</p>
          </li>
        </ul>
      </div>
      <!-- 게시판 생성일 때.-->
      <template v-if="mSelectedTab===0">
        <div>
        </div>
      </template>
      <!-- 채널 생성일 때. select한 건물에 대해서도 prop으로 보내주기-->
      <createChannel v-if="mSelectedTab===1" :chanDetail="chanDetail" @openPage="openPage" :pSelectedBuilding="mSelectedBuilding" :pSelectedAreaInfo="pSelectedAreaInfo" :pBdAreaList="pBdAreaList"/>
    </div>
  </div>
</template>

<script>
import gPopHeader from '../layout/UB_gPopHeader.vue'
import createChannel from '@/components/UB/popup/UB_createChannel.vue'
import seleciconBgPopup from '@/components/popup/creChannel/Tal_selectChaniconBgPopup.vue'

export default {
  components: {
    gPopHeader,
    createChannel,
    seleciconBgPopup
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
      mSelectedBuilding: { selectedId: '11', selectPath: '/resource/bd/new_bd1.png' },
      mSelectedTab: 0,
      mSelectBuildingPop: false,
      mSelectBuilding: 'building'
    }
  },
  methods: {
    selectTab (index) {
      this.mSelectedTab = Number(index)
      console.log('mSelectedTab', this.mSelectedTab)
    },
    openSelectBuildingPop () {
      this.mSelectBuildingPop = true
      this.mSelectBuilding = 'building'
    },
    closeSelectBuildingPop () {
      this.mSelectBuildingPop = false
    },
    preventDefault () {
      return false
    },
    setIconOrBGData (param) {
      if (this.mSelectBuilding === 'building') {
        this.mSelectedBuilding = param
      }
      this.mSelectBuildingPop = false
    }
  },
  created () {
    this.mSelectedTab = -1
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
.channelBuildingArea{
  /* border:1px solid #ccc; */
  width: 100px;
  overflow: hidden;
  height: 150px;
  margin: 0 auto;
  margin-bottom:10px;
  background: #ffffff66;
  position: relative;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
