<template>
    <div class="modalBack" style="z-index: 1000;">
        <div class="commonPopCard" style="width: 550px; height: 600px; left: 50%;">
            <popHeader headerTitleText="최근알림 자세히 보기" @closePop="closeDetailPop"/>
            <div class="popBody" style="padding: 1rem 1rem; overflow-y: hidden;">
                <pushDetailTile :chanName="this.pushInfo.chanName" :creDate="this.pushInfo.creDate"/>
                <div style="width: 100%; height: calc(100% - 6rem); float: left; padding: 0 0.5rem;" v-html="this.pushInfo.contentsString">
                </div>
            </div>
            <div class="popFooter">
            <gButton class="mright-05" btnName="적용" @click="closeDetailPop" />
            <gWhiteButton btnName="닫기" @click="closeDetailPop"/>
            </div>
        </div>
    </div>
</template>
<script>
import pushDetailTile from './cAd_gDetailTitle.vue'
export default {
  data () {
    return {
      pushInfo: { chanName: '더알림대학교', creDate: '2021년 3월 1일', contentsString: '기숙사 신청일은 각 학년별로 다릅니다.<br><br> 1학년은 2월 7~11일<br>2학년은 2월 14~18일<br>3~4학년은 2월 21~25일<br>추가모집은 2월 28일 ~ 3월 1~4일입니다.' }
    }
  },
  methods: {
    closeDetailPop () {
      this.$emit('closeDetailPop')
    }
  },
  components: {
    pushDetailTile
  }
}
</script>

<style scoped>
</style>
