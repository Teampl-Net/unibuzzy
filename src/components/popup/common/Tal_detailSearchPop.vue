<template>
<div class="searchBalloon box" >
  <div class="searchRow fl"><input placeholder="제목 또는 내용을 입력해주세요" type="text" name=""  class="commonInput" id=""></div>
  <div class="searchRow fl"><input type="text" name=""  placeholder="채널명을 입력해주세요" class="commonInput" id=""></div>
  <div class="searchRow fl"><input type="text" name=""  placeholder="파일이름을 입력해주세요" class="commonInput" id=""></div>
  <div class="searchRow fl box">
    <section class="">
      <Datepicker
        ref="datePickerLib"
        inputmode="none"
        type="date"
        range
        placeholder="날짜를 선택해주세요"
        title-format="YYYY-MM-DD"
        editable = false
        v-model:value="value1"
      ></Datepicker>
    </section>
  </div>
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
      value1: []
    }
  },
  methods: {
    closePop () {
      this.$emit('closePop')
    }
  },
  created (){
    // this.$refs.datePickerLib.setAttribute('readonly', 'readonly')
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
