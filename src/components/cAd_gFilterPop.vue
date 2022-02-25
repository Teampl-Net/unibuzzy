<template>
    <div class="searchBalloon" style="">
        <div class="searchRow fl"><p class="fl" style="">제목 + 내용</p><input type="text" name="" style="" class="commonInput" id=""></div>
        <div class="searchRow fl"><p class="fl" style="">보낸사람</p><input type="text" name="" style="" class="commonInput" id=""></div>
        <div class="searchRow fl"><p class="fl" style="">파일이름</p><input type="text" name="" style="" class="commonInput" id=""></div>
        <div class="searchRow fl"><p class="fl" style="">날짜</p>
            <Datepicker v-model="state.date" style="" wrapper-class="fl" input-class="commonInputIm" iconColor="#6768A7" format="yyyy-MM-dd" :typeable="true" placeholder="날짜를 선택해주세요" name="uniquename"></Datepicker>
            <span class="fl"> ~ </span>
            <Datepicker v-model="state.date"  style="" wrapper-class="fl" input-class="commonInputIm"  iconColor="#6768A7" format="yyyy-MM-dd" :typeable="true" placeholder="날짜를 선택해주세요" name="uniquename"></Datepicker></div>

        <!--<div id="filterWrap" style="padding: 1rem 0; ">
        <img src="../resource/images/filter.svg" class="fl mright-05" style="margin-top: 0.1rem;" alt=""><p style="color: #3A3A3A; font-size: 12px; float: left;">필터</p>
        </div>-->
        <div class="searchRow fl"><p class="fl" style="">수신자</p><input type="text" name="" style="" class="commonInput" id=""></div>
        <div class="popFooter">
            <gButton btnName="검색" class="mright-05"/>
            <gWhiteButton btnName="닫기" />
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
  }
}
</script>

<style scoped>
.searchBalloon {top: 70px; right: 515px;  padding: 1rem 1.5rem; width: 400px;}
.searchRow{min-height: 2rem; margin-bottom: 0.5rem; width: 100%;}
.searchRow p{line-height: 30px; color: #3A3A3A; font-size: 12px; width: 80px; display: flex;}
.searchRow input{width: calc(100% - 80px); box-sizing: border-box;}
.vuejs3-datepicker__calendar-topbar{background-color: #6768A7!important;}
</style>
