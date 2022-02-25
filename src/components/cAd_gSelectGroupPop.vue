<template>
    <div class="modalBack" style="z-index: 1000;">
        <div class="commonPopCard" style="width: 350px; height: 400px; left: 50%;">
            <popHeader :headerTitleText="this.popHeaderTitle" @closePop="closePop"/>
            <div class="popBody" style="padding: 1rem 1rem; overflow-y: hidden;">
                <organization :chanInfo="this.chanInfo" />
            </div>
            <div class="popFooter">
            <gButton class="mright-05" v-if="this.type === 'copy' || this.type === 'move'" btnName="이동" @click="closePop" />
            <gButton class="mright-05" v-else btnName="추가" @click="closePop" />
            <gWhiteButton btnName="닫기" @click="closePop"/>
            </div>
        </div>
    </div>
</template>
<script>
import organization from './cAd_organization.vue'
export default {
  data () {
    return {
      chanInfo: { chanName: '더알림대학교', group: [{ groupName: '입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처', groupKey: '0' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '학생복지처', groupKey: '2' }, { groupName: '학생', groupKey: '3' }] },
      selectedList: []
    }
  },
  methods: {
    closePop () {
      if (this.type === 'copy' || this.type === 'move') { this.closeMovePop() } else { this.closeSubPop() }
    },
    closeSubPop () {
      this.$emit('closePop')
    },
    closeMovePop () {
      this.$emit('closeMovePop')
    }
  },
  mounted () {
  },
  components: {
    organization
  },
  props: {
    popHeaderTitle: {},
    type: {}
  }
}
</script>

<style scoped>
.selectedGroup{min-width: 80px; margin-right: 0.3rem; margin-bottom: 0.3rem; min-height: 22px; border-radius: 15px; border: 1px solid #BFBFDA; float: left; color: #000000; font-size: 11px; padding: 0.2rem 0.5rem; }
.selectedGroup img{float: right; margin-left: 0.5rem; margin-top: 0.25rem;}
.addGroupBtn{width: 30px; height: 18px; margin-top: 0.3rem; text-align: center; cursor: pointer; padding-top: 0.1rem; font-size: 10px; border: 1px solid #BFBFDA; position: absolute; right: 8px; background: #FFFFFF;}
.displayN{display: none!important}
</style>
