<template>
  <div class="bgPop"></div>
  <div class="popupWrap">
    <div class="confirmPopHeader w100P">
      <p class=" fontBold font20">{{ pConfirmPopHeader ? pConfirmPopHeader : '추가하기'}}</p>
    </div>
    <div class="confirmPopBody w100P">
      <p>{{ pConfirmPopText ? pConfirmPopText : '새로 생성하시겠습니까?' }}</p>
    </div>
    <div class="confirmPopBtns w100P">
      <button @click="confirmOK" class="admBtn okBtn fontBold">확인</button>
      <button @click="pClosePop" class="admBtn closeBtn fontBold">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pClosePop: Function,
    pConfirmPopText: String,
    pConfirmPopHeader: String
  },
  data () {
    return {

    }
  },
  methods: {
    confirmOK () {
      this.$emit('confirmOk')
    }
  }
}
</script>

<style scoped>

.bgPop{
  background-color:rgba(0,0,0,0.2);
  top:0;
  left:0;
  width:100%;
  height:100%;
  position:absolute;
}
.popupWrap{
  width:80%;
  height:auto;
  padding:20px;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  background-color:#fff;
  border-radius:20px;
}
.confirmPopHeader{
  text-align:left;
  padding-bottom:10px;
  border-bottom:1px solid #ececec;
}
.confirmPopHeader p{
  color:#5F61BD !important;
}
.confirmPopBody{
  padding:30px 0;
}

.confirmPopBody p{
  font-size:15px;
}
.confirmPopBtns{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
}
.okBtn{
  background-color:#5F61BD !important;
  color:#fff;
}

</style>
