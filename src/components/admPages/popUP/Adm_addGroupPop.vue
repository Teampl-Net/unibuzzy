<template>
  <div id="layout" class="w100P alignCenter" style="flex-direction:column; gap:1rem;">

      <div class="profileImg cursorP">
        <p class="font13">photo here</p>
      </div>

      <div class="w100P infoFillArea">
        <div class="w100P alignCenter" style="justify-content:space-between;">
          <div class="infoName" style="width:70%;">
            <p>조직명</p>
            <input type="text" class="inputs nameInput" v-model="infoGroupName" :placeholder=mNamePlaceHolder />
          </div>
          <div class="infoType" style="width:25%;">
            <p>조직타입</p>
            <select :value="mTypeOption[0].name" @change="changeTypeOption">
              <option v-for="(type, index) in mTypeOption" :key="index">{{type.name}}</option>
            </select>
          </div>
        </div>
        <div class="w100P infoDesc">
          <p>조직설명</p>
          <textarea class="inputs descInput" v-model="infoGroupDesc" :placeholder=mDescPlaceHolder ></textarea>
        </div>
      </div>

      <div v-if="infoGroupType === '학교'">ㅋㅋ</div>
        <div class="w100P"> <!-- 나중에 없어짐. 닫기 버튼은 위로 갈 것임 -->
          <button type="button" @click="pClosePop">닫기</button>
        </div>
      </div>
</template>

<script>
export default {
  props: {
    pClosePop: Function
  },
  created () {

  },
  data () {
    return {
      infoGroupName: '',
      infoGroupDesc: '',
      infoGroupType: {},
      mNamePlaceHolder: '조직명을 입력하세요.',
      mDescPlaceHolder: '조직 설명을 입력하세요.',
      mTypeOption: [
        { idx: 1, name: '아파트' },
        { idx: 2, name: '회사' },
        { idx: 3, name: '학교' }
      ]
    }
  },
  methods: {
    changeTypeOption (value) {
      this.infoGroupType = value.target._value
      console.log('this.infoGroupType', this.infoGroupType)
    }
  }

}
</script>

<style scoped>

#layout{
  width:100%;
  height:100%;
  padding:60px 20px 0;
}
.profileImg{
  width:100px;
  height:100px;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:#fff;
  box-shadow:0 0 3px 1px rgba(0,0,0,0.1);
}
.infoFillArea{
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;
  gap:1rem;
  margin-top:30px;
}
.infoFillArea p {
  text-align:left;
  font-size:14px;
  width:80px;
}
.infoName, .infoDesc, .infoType{
  display:flex;
  align-items:center;
}
.inputs, select {
  width:calc(100% - 80px);
  padding:10px 20px !important;
  border-radius:10px !important;
  border:none !important;
  box-shadow:0 0 3px 1px rgba(0,0,0,0.1);
}
.inputs:focus{
  outline:none !important;
}
</style>
