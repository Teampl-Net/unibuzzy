<template>
    <div style="float: left; width: 200px; height: 100%; padding: 1rem 1rem;">
        <!--<img src="../resource/images/icon_folder.png" style="margin-right: 0.5rem; float: left;" alt=""> -->
        <p style="color:#3A3A3A; cursor:pointer; font-size: 15px; font-weight: bold; margin-bottom: 1.5rem; color: rgb(103, 104, 167);">{{this.title}}</p>
        <div class="listRow" v-for="(value, index) in recvGroupList" :key="index" style="">
            <!-- <img src="../resource/images/icon_folder.png" style="" alt=""> -->
            <img src="../resource/images/groupFolderIcon.svg" class="fl" style="width: 1rem; margin-top: 0.35rem;" alt=""><span style="cursor:pointer;">{{value.groupName}}</span>
        </div>
        <p style="color:#3A3A3A; font-size: 15px; font-weight: bold; margin-top: 2rem; margin-bottom: 0.5rem; color: rgb(103, 104, 167); cursor:pointer;">임시저장함</p>
        <p style="color:#3A3A3A; font-size: 15px; font-weight: bold; margin-bottom: 1.5rem; color: rgb(103, 104, 167); cursor:pointer;">휴지통</p>
    </div>
</template>
<script>
export default {
  data () {
    return {
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
    title: {}
  }
}
</script>

<style scoped>
.listRow{width: 100%; height: 2.2rem;}
.listRow img{margin-right: 0.2rem; float: left;}
.listRow span{float: left; font-size: 14px; color: #3A3A3A; line-height: 25px; cursor: pointer;}
</style>
