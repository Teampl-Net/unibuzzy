+<template>
<div class="searchBalloon box" style="">
  <div class="searchRow fl"><p class="fl" style="">제목 + 내용</p><input placeholder="제목 또는 내용을 입력해주세요" type="text" name="" style="" class="commonInput" id=""></div>
  <div class="searchRow fl"><p class="fl" style="">보낸사람</p><input type="text" name="" style="" placeholder="보낸사람을 입력해주세요" class="commonInput" id=""></div>
  <div class="searchRow fl"><p class="fl" style="">파일이름</p><input type="text" name="" style="" placeholder="파일이름을 입력해주세요" class="commonInput" id=""></div>
  <div class="searchRow fl box"><p class="fl" style="">날짜</p>
    <section class="">
      <Datepicker
        v-model:value="value1"
        type="date"
        range
        placeholder="날짜를 선택해주세요"
        title-format="YYYY-MM-DD"
      ></Datepicker>
    </section>
  </div>
  <div class="searchRow fl"><p class="fl" style="">수신자</p><input type="text" name="" style="" class="commonInput" id=""></div>
  <div class="popFooter">
      <gButton btnName="검색" class="mright-05"/>
      <gWhiteButton @click="closePop" btnName="닫기" />
  </div>
</div>
</template>
<script>
export default {
  name: 'Range',
  data () {
    return {
      value1: [new Date(2019, 9, 8), new Date(2019, 9, 19)],
      value2: []
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
.searchBalloon {top: 70px; padding: 0 1.5rem; padding-top: 2rem; width: 400px;}
.searchRow{min-height: 2rem; margin-bottom: 0.5rem; width: 100%;}
.searchRow p{line-height: 30px; color: #3A3A3A; font-size: 12px; width: 80px; display: flex;}
.searchRow input{width: calc(100% - 80px); box-sizing: border-box;}
.mx-datepicker{float: left; width: calc(100% - 80px);}
</style>
