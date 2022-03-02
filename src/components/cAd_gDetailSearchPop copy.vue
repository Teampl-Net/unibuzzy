<template>
    <div class="searchBalloon box" style="">
        <div class="searchRow fl"><p class="fl" style="">제목 + 내용</p><input type="text" name="" style="" class="commonInput" id=""></div>
        <div class="searchRow fl"><p class="fl" style="">보낸사람</p><input type="text" name="" style="" class="commonInput" id=""></div>
        <div class="searchRow fl"><p class="fl" style="">파일이름</p><input type="text" name="" style="" class="commonInput" id=""></div>
        <div class="searchRow fl"><p class="fl" style="">날짜</p>
        <section>
      <div class="box">
    <section>
      <p>date range</p>
      <Datepicker
        v-model:value="value1"
        type="date"
        range
        placeholder="Select date range"
      ></Datepicker>
    </section>
    <section>
      <p>datetime range</p>
      <Datepicker
        v-model:value="value2"
        type="datetime"
        range
        placeholder="Select datetime range"
      ></Datepicker>
    </section>
  </div>
    </section>
        </div>

        <!--<div id="filterWrap" style="padding: 1rem 0; ">
        <img src="../resource/images/filter.svg" class="fl mright-05" style="margin-top: 0.1rem;" alt=""><p style="color: #3A3A3A; font-size: 12px; float: left;">필터</p>
        </div>-->
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
      state: {
        value: [new Date(), new Date()]
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
.searchBalloon {top: 70px; right: 515px;  padding: 1rem 1.5rem; width: 400px;}
.searchRow{min-height: 2rem; margin-bottom: 0.5rem; width: 100%;}
.searchRow p{line-height: 30px; color: #3A3A3A; font-size: 12px; width: 80px; display: flex;}
.searchRow input{width: calc(100% - 80px); box-sizing: border-box;}

</style>
