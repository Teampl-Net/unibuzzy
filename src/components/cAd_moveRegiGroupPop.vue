<template>
    <div class="modalBack">
        <div class="commonPopCard" style="width: 400px;height: 500px;">
          <popHeader :headerTitleText="this.popHeaderT" @closePop="closePop"/>
          <div class="popBody" style="padding: 1.5rem 2rem; overflow-y: hidden;">
            <organization :chanInfo="this.chanInfo" />
          </div>
          <div class="popFooter">
            <gButton class="mright-05" @click="closePop" btnName="저장" />
            <gWhiteButton @click="closePop" btnName="닫기" />
          </div>
        </div>
    </div>
</template>
<script>
import organization from '../components/cAd_organization.vue'
export default {
  data () {
    return {
      popHeaderT: '그룹이동',
      chanInfo: { chanName: '더알림대학교', group: [{ groupName: '입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처입학처', groupKey: '0' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '시설관리처', groupKey: '1' }, { groupName: '학생복지처', groupKey: '2' }, { groupName: '학생', groupKey: '3' }] }
    }
  },
  methods: {
    closeSubPop () {
      this.subPopShowYn = false
      this.selectedList = []
    },
    closePop () {
      this.$emit('closePop')
    }
  },
  props: {
    regiType: {}
  },
  mounted () {
    if (this.regiType === 'P') { this.popHeaderT = '수신대상 등록하기' } else if (this.regiType === 'G') { this.popHeaderT = '수신대상 엑셀업로드' }
  },
  components: {
    organization
  }
}
</script>
<style scoped>

.inputLabel{width: 100px; color: #3A3A3A; font-size: 15px; line-height: 30px;}
.popBody .inputRow{width: 100%; min-height: 2rem; margin-bottom: 0.5rem; position: relative;}
.inputRow input{width: calc(100% - 130px); box-sizing: border-box;}
.orgaIcon{position: absolute; right: 2.3rem; top: 0.3rem;}
.selectedGroup{min-width: 80px; margin-right: 0.3rem; margin-bottom: 0.3rem; min-height: 22px; border-radius: 15px; border: 1px solid #BFBFDA; float: left; color: #000000; font-size: 11px; padding: 0.2rem 0.5rem; }
.selectedGroup img{float: right; margin-left: 0.5rem; margin-top: 0.25rem;}
.smallSize{width: 466px !important; height: 300px;}

.bigSize{width: 750px !important; height: 750px;}
#step3 th{color: #3A3A3A; font-size: 15px; background:#F5F6FA; height: 1.5rem;}
#step3 td{text-align: center; min-height: 2.5rem; height: 2.5rem; color: #3A3A3A; font-size: 15px;}
#step3 .bodyText{color: #3A3A3A; font-size: 15px; margin-top: 1rem; margin-bottom: 0.8rem; line-height: 30px; float: left; margin-right: 3rem;}
</style>
