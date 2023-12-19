<template>
    <div style="float: left; width: 200px; height: 100%; padding: 1rem 1rem;">
        <img src="../../../assets/images/common/channerList_close.png" style="position:absolute; top: 0.7rem; right: 0" v-on:click="closeLeftMenu" alt="">
        <!--<img src="../assets/images/icon_folder.png" style="margin-right: 0.5rem; float: left;" alt=""> -->
        <!--<p style="color:#3A3A3A; cursor:pointer; font-size: 15px; font-weight: bold; margin-bottom: 1.5rem; color: rgb(103, 104, 167);">{{this.title}}</p> -->
        <p class=" textLeft mbottom-1" style="color: #3A3A3A; font-size: 16px; font-weight: bold;">수신자 목록</p>
        <div class="listRow" style="color: #6768A7;">
            <!-- <img src="../assets/images/icon_folder.png" style="" alt=""> -->
            <!-- <img src="../../assets/images/allGroupIcon.svg" class="groupIcon" style="width: 0.9rem; margin-right: 0.3rem" alt=""> -->
            <span class="allSelected" @click="selectMenuTab('all')" :class="this.selectedTab === 'all' ? 'selectedMenu': ''">전체</span>
            <div v-if="pageType === 'recvUserList'" class="w-100P">
              <div v-if="this.listMode === 'show'" class="fr">
                <gWhiteButton @click="changeListMode('edit')" btnName="관리" class="mleft-1 mright-03 customBtn" style=""/>
              </div>
              <div v-else-if="this.listMode === 'edit'" class="fr"><gWhiteButton btnName="추가" class="mleft-1 mright-03 customBtn" style=""/><gWhiteButton class="customBtn" btnName="삭제" /></div>
            </div>
        </div>
        <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
        <div class="listRow"  v-if="this.listMode === 'show'" v-for="(value, index) in recvGroupList" :key="index"  @click="selectMenuTab(value.groupKey)">
          <div style="border-bottom: 1px solid #6768A7; float: left; width: 8px; margin-top: 0.8rem; margin-right: 0.4rem;"></div>
            <!--<img src="../assets/images/groupFolderIcon.svg" class="fl groupIcon" alt=""> -->
            <span :class="this.selectedTab === value.groupKey ? 'selectedMenu': ''" style="cursor:pointer;">{{value.groupName}}</span>
        </div>
        <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
        <div class="listRow" v-if="this.listMode === 'edit'" v-for="(value, index) in recvGroupList" :key="index" style="">
            <input  type="checkbox" name="" v-model="editSelectedList" :value="value.groupKey" class="fl mtop-03 mright-05" id="">
            <!--<img src="../assets/images/groupFolderIcon.svg" class="fl groupIcon" alt=""> -->
            <span style="cursor:pointer;" @click="checkRow(value.groupKey)">{{value.groupName}}</span>
        </div>
        <div v-if="pageType === 'sendPushList'" style="width: 100%;">
          <p style="color:#3A3A3A; text-align: left; font-size: 15px; font-weight: bold; margin-top: 2rem; margin-bottom: 0.5rem; color: rgb(103, 104, 167); cursor:pointer;">임시저장함</p>
          <p style="color:#3A3A3A; text-align: left; font-size: 15px; font-weight: bold; margin-bottom: 1.5rem; color: rgb(103, 104, 167); cursor:pointer;">휴지통</p>
        </div>
        <div v-if="pageType === 'recvUserList' && this.listMode === 'edit'" style="" class="w-100P">
          <gButton btnName="적용" class="mright-05" style="    min-height: 25px;" @click="changeListMode('show')"/>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    closeLeftMenu () {
      this.$emit('closeLeftMenu')
    },
    changeListMode (mode) {
      this.listMode = mode
    },
    selectMenuTab (key) {
      this.selectedTab = key
      this.closeLeftMenu()
    },
    checkRow (key) {
      var dupYn = false
      for (var i = 0; i < this.editSelectedList.length; i++) {
        if (this.editSelectedList[i] === key) {
          this.editSelectedList.splice(i, 1)
          dupYn = true
        }
      }
      if (dupYn === false) {
        this.editSelectedList.push(key)
      }
    }
  },
  data () {
    return {
      listMode: 'show',
      selectedTab: 'all',
      editSelectedList: [],
      recvGroupList: [
        { groupName: '입학처', groupKey: '0' },
        { groupName: '2학년', groupKey: '1' },
        { groupName: '시설관리처', groupKey: '2' },
        { groupName: '학생복지처', groupKey: '3' },
        { groupName: '1학년', groupKey: '4' }
      ]
    }
  },
  props: {
    title: {},
    pageType: {}
  }
}
</script>

<style scoped>
.listRow{width: 100%; height: 2.2rem;}
.listRow img{margin-right: 0.2rem; float: left;}
.listRow span{float: left; font-size: 14px; color: #3A3A3A; line-height: 25px; cursor: pointer;}
.allSelected{cursor:pointer;}
.customBtn{height: 25px!important; min-height: 25px!important; line-height: 15px!important;}
.selectedMenu{color:#6768A7!important; font-weight: bold;}
.groupIcon{width: 1rem; margin-top: 0.35rem;}
</style>
