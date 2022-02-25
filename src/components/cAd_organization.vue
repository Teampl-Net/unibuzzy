<template>
    <gSearchBox style="height: 30px;"/>
    <div style="width: 100%; height: calc(100% - 30px);margin-top: 0.5rem;">
        <div style="width: 100%; min-height: 2rem;; float: left; margin-bottom: 1rem;" v-if="selectedList.length > 0">
          <div class="selectedGroup" v-for="(value, index) in selectedList " :key="index">{{value.groupName}}
            <img v-on:click="delSearchKey(index)" class="cursorP" src="../resource/images/searchXIcon.svg"  style="" alt="">
          </div>
        </div>
        <div style="width: 100%; overflow-y: auto;min-height: 500px;">
          <div v-for="(value, index) in chanInfo.group" class="" :key="index" :ref="'group'+index" style="  width: 100%; display: flex; align-items: flex-start; min-height: 1.8rem; margin-bottom: 0.2rem; position: relative;">
            <img src="../resource/images/groupFolderIcon.svg" class="mright-05" style="width: 1rem; margin-top: 0.4rem;" alt="">
            <p style="font-size: 13px; max-width: 200px; margin-top: 0.3rem;">{{value.groupName}}</p>
            <div class="addGroupBtn"  @click="addSelextList(index)">추가</div>
          </div>
        </div>
        <div style="width: 100%; height: 0.5px; background:#BFBFDA; margin-top: 1rem; ">
          <p class="mtop-1" style="color: #000000; font-size: 13px; padding-top: 1rem;">전체 {{selectedList.length}}개</p>
        </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectedList: []
    }
  },
  props: {
    chanInfo: {}
  },
  methods: {
    addSelextList (index) {
      this.selectedList.push(this.chanInfo.group[index])
    },
    delSearchKey (index) {
      this.selectedList.splice(index, 1)
    }
  }
}
</script>
<style scoped>
.selectedGroup{min-width: 80px; margin-right: 0.3rem; margin-bottom: 0.3rem; min-height: 22px; border-radius: 15px; border: 1px solid #EFEFF6; background-color: #EFEFF6; float: left; color: #000000; font-size: 11px; padding: 0.2rem 0.5rem; }
.selectedGroup img{float: right; margin-left: 0.5rem; margin-top: 0.25rem;}
.addGroupBtn{width: 30px; height: 18px; margin-top: 0.3rem; text-align: center; cursor: pointer; padding-top: 0.1rem; font-size: 10px; border: 1px solid #BFBFDA; position: absolute; right: 8px; background: #FFFFFF;}
.displayN{display: none!important}
</style>
