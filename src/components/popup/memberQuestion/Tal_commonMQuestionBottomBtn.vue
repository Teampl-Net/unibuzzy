<template>
<div class="mQuestionBottomWrap fl" >
  <div style="flex:1; width:100%;" v-for="(data, index) in btnList" :key="index" :style="index !== 0 ? 'border-left:1px solid #ccc;' : '' " @click="btnsEvent(data.btnEvent)" >

    <p class="font16 w-100P" style="">{{data.btnTitle}}</p>
  </div>
</div>
</template>

<script>

export default {
  props: {
    propData: {}
  },
  data () {
    return {
      btnList: [{ btnTitle: '질문추가', btnEvent: 'addQuestion' }, { btnTitle: '저장하기', btnEvent: 'saveQuestion' }]
    }
  },
  methods: {
    btnsEvent (btnEvent) {
      this.$emit(btnEvent)
      // switch (btnEvent) {
      //   case 'addQuestion':

      //     break;
      //   case 'saveQuestion':

      //     break;
      // }
    }
  }
}
</script>

<style >
.mQuestionBottomWrap{
  width: 100%;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 10px 10px 0 0;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px -4px 14px 0 #ccc;
  font-weight: bold;
}

</style>
