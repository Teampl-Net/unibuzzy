<template>
  <gPopup :pPopInfo="mChalCardPopup">
  <div class="w100P h100P p-20" style="gap:10px;">
    <div v-for="input, index in mTodoInputList" :key="index" class="w100P fl fontBold" :class="input.title==='내용'? 'mTop-10':'mBottom-20'" style="height:30px; padding: 5px; display: flex; align-items: center;">
      <p class="fl" style="width:80px">{{ input.title }} </p>
      <gInput class="fl MKCommonInput" :pInputInfo="input" style=""/>
    </div>
  </div>
</gPopup>
</template>
<script>
export default {
  props: {
    pClosePop: Function
  },
  components: {
  },
  data () {
    return {
      mSetTodoPopShowYn: false,
      mChalCardPopup: { title: '직접추가', closeFn: this.pClosePop, size: { w: 400, h: 'auto' }, btnList: [{ btnText: '추가', onClickFn: this.pClosePop }, { btnText: '닫기', onClickFn: this.pClosePop }], isFull: false, isConfirm: false },
      mTodoInputList: [
        { title: '일감 명', type: this.$gMKConst.VALUE_TAG_TYPE_INPUT_TEXT, value: null, placeholder: '일감 명을 입력해주세요.' },
        { title: '유형', type: this.$gMKConst.VALUE_TAG_TYPE_SELECT, value: null, options: [{ opt: 'a', value: 'a' }] },
        { title: '담당자', type: this.$gMKConst.VALUE_TAG_TYPE_SELECT, value: null, options: [{ opt: 'a', value: 'a' }] },
        { title: '내용', type: this.$gMKConst.VALUE_TAG_TYPE_TEXTAREA, value: null }
      ]
    }
  },
  methods: {
    openSetTodoPop () {
      this.mSetTodoPopShowYn = true
    },
    closeSetTodoPop () {
      this.mSetTodoPopShowYn = false
    }
  }
}
</script>
<style scoped>

</style>
