<template>
  <div class="bgPop"></div>
  <div class="popupWrap">
    <div class="addExpertPopHeader w100P">
      <p class=" fontBold font20">{{ '전문가 추가하기' }}</p>
    </div>
    <div class="addExpertPopBody w100P">
      <div class="expertName">
        <p>이름</p>
        <input type="text" v-model="expertName" placeholder="이름을 입력해주세요."/>
      </div>
      <div class="expertNumber">
        <p>연락처</p>
        <input type="text" v-model="expertNumber" placeholder="'연락처를 입력해주세요.'"/>
      </div>
    </div>
    <div class="addExpertPopBtns w100P">
      <button @click="addExpertOK" class="admBtn okBtn fontBold">확인</button>
      <button @click="pClosePop" class="admBtn closeBtn fontBold">닫기</button>
    </div>
  </div>
</template>

<script>
export default ({
  props: {
    pClosePop: Function
  },
  created () {

  },
  data () {
    return {
      expertName: '',
      expertNumber: 0
    }
  },
  methods: {
    addExpertOK () {
      this.$emit('addExpertOK')
    }

  }
})
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
.addExpertPopHeader{
  text-align:left;
  padding-bottom:10px;
  border-bottom:1px solid #ececec;
}
.addExpertPopHeader p{
  color:#5F61BD !important;
}
.addExpertPopBody{
  padding:30px 0;
  display:flex;
  align-items:center;
  flex-direction:column;
  gap:1rem;
}

.addExpertPopBody p{
  font-size:15px;
  width:60px;
}
.expertName, .expertNumber {
  width:100%;
  display:flex;
  align-items:center;
  justify-content:space-between;
}
.addExpertPopBody input{
  width:calc(100% - 70px);
  padding:10px 20px !important;
  border-radius:10px !important;
  border:none !important;
  box-shadow:0 0 3px 1px rgba(0,0,0,0.1);
}

.inputs:focus{
  outline:none !important;
}
.addExpertPopBtns{
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
