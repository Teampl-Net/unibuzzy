<template>
<div class="boardPopText">
  <div style="overflow: hidden scroll; width: 100%; float: left; height: 100%;">
    <p class="commonBlack textLeft font16">
      <b>'게시판'</b>은 다양한 성격의 커뮤니티가 될 수 있어요. <br><br>
      <b>+ 버튼</b>을 클릭해 게시판을 만들어보세요!<br>
      만들어진 게시판을 클릭, <br>원하는 이름으로 바꾼 후 여러 가지 기능들을 넣어보세요!<br><br>
      ex) <b>공유 대상</b>에 따라 <b>'작성' '열람' '댓글'</b>의 권한을 부여할 수 있습니다.
      ex) <b>댓글 기능</b>을 지원하고 싶지 않은 게시판일 경우, <b>'댓글 지원'을 off</b> 하세요<br><br>
      <b>선택된 대상</b>에게만 게시판이 공유됩니다. <br>
      관리자는 <b>'게시판 관리'</b>에서 모든 게시판을 확인하고 수정할 수 있습니다 :) <br><br>
      <!-- 예시) '익명'이고 작성자와 관리자만 게시글을 '열람'할 수 있는 문의게시판을 만들고 싶을 때<br> -->
    </p>
    <!-- <img src="../../../assets/images/main/message_logo.png" class="boardPopAlimImg" /> -->
  </div>
</div>
</template>
<script>

</script>
<style>
.boardPopText {z-index: 999; top: 0; position: absolute; background-color: white; overflow: hidden; margin: 10px; border-radius: 10px; padding: 15px; min-height: 400px; max-height: 70%;}
.boardPopAlimImg {width:100px;right: 20px;position: absolute;float:right;bottom: calc(30% - 100px);}
</style>
