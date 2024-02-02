<template>
  <div class="bgPop"></div>
  <div class="popupWrap">
    <div class="confirmPopHeader w100P">
      <p class=" fontBold font20">{{ pOkPopHeader ? pOkPopHeader : '생성하기' }}</p>
    </div>
    <div class="confirmPopBody w100P">
      <p>{{ pOkPopText ? pOkPopText :'저장되었습니다.' }}</p>
    </div>
    <div class="confirmPopBtns w100P">
      <button @click="pClosePop" class="admBtn closeBtn fontBold">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pClosePop: Function,
    pOkPopText: String,
    pOkPopHeader: String,
    pMovePage: Boolean
  },
  data () {
    return {

    }
  },
  methods: {
    closePop () {
      console.log('confirm OK pop close ???')
      if (this.pMovePage === true) {
        this.$emit('closeOkPop', true)
      } else {
        this.pClosePop()
      }
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
