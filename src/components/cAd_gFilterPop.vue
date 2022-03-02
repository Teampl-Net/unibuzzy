<template>
    <div class="searchBalloon" style="">
      <div class="filterRow"><input type="radio" name="" id="allRadio"><label for="allRadio">전체</label></div>
      <div class="filterRow"><input type="radio" name="" id="allRadio"><label for="allRadio">좋아요한 알림</label></div>
      <div class="filterRow"><input type="radio" name="" id="allRadio"><label for="allRadio">내가 작성한 알림</label></div>
        <div class="popFooter mtop-1">
            <gButton btnName="적용" class="mright-05"/>
            <gWhiteButton @click="closePop" btnName="닫기" />
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      state: {
        date: new Date()
      }
    }
  },
  methods: {
    closePop () {
      this.$emit('closePop')
    }
  }
}
</script>

<style scoped>
.searchBalloon {top: 70px; right: 50px;  padding: 0.5rem 1rem; width: 250px; min-height: 200px;}
.searchBalloon:after{left: 120px}
.searchBalloon:before{left: 120px}
label{color: #3A3A3A; font-size: 12px;}
.filterRow{min-height: 2rem; padding: 0.5rem 0; border-bottom: 1px solid #ECECEC;}
</style>
