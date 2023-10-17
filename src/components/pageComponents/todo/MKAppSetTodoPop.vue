<template>
  <gPopup :pPopInfo="mChalCardPopup">
  <div class="w100P h100P p-10 mBottom-10">
    <div style="padding: 5px 15px;">
      <div v-for="input, index in mTodoInputList" :key="index" class="w100P fl fontBold" :class="input.title==='내용'? 'mTop-10':'mBottom-20'" style="height:30px; padding: 5px; display: flex; align-items: center;" >
          <p class="" style="width:60px; font-size: 14px;" >{{ input.title }} </p>
          <div style="width:calc(100% - 60px)">
            <gInput class=" MKCommonInput" :pInputInfo="input" />
          </div>
      </div>
    </div>
  </div>
  </gPopup>
</template>
<script>

export default {
  props: {
    pClosePop: Function,
    pSaveTodo: Function,
    pSelectTodo: {},
    pFamilyList: []
  },
  created () {
    if (this.pFamilyList) {
      this.mTodoInputList[2].options = this.pFamilyList
      this.mTodoInputList[2].value = this.pFamilyList[0].value
      console.log(this.pFamilyList)
    }
    if (this.pSelectTodo) {
      console.log(this.pSelectTodo)
      this.mTodoInputList[0].value = this.pSelectTodo.title
      if (this.pSelectTodo.todoType) {
        this.mTodoInputList[1].value = this.pSelectTodo.todoType
      }
      if (this.pSelectTodo.todoUserKey) {
        this.mTodoInputList[2].value = this.pSelectTodo.todoUserKey
      }
      this.mTodoInputList[3].value = this.pSelectTodo.comment
    }
  },
  data () {
    return {
      mAddCabConfirm: false,
      mSetTodoPopShowYn: false,
      mChalCardPopup: { title: '설정', closeFn: this.pClosePop, size: { w: 350, h: 'auto' }, btnList: [{ btnText: '추가', onClickFn: this.saveTodo, pointYn: true, deepYn: true }, { btnText: '닫기', onClickFn: this.pClosePop }], isFull: false, isConfirm: false },
      mTodoInputList: [
        { title: '일감 명', type: this.$gMKConst.VALUE_TAG_TYPE_INPUT_TEXT, value: null, placeholder: '일감 명을 입력해주세요.' },
        { title: '유형', type: this.$gMKConst.VALUE_TAG_TYPE_SELECT, value: 'A', options: [{ opt: '선택', value: 'A' }, { opt: 'HouseWork', value: 'H' }, { opt: 'Work', value: 'T' }, { opt: 'Self-Improvement', value: 'S' }, { opt: 'etc', value: 'E' }] },
        { title: '담당자', type: this.$gMKConst.VALUE_TAG_TYPE_SELECT, value: null, options: [] },
        { title: '내용', type: this.$gMKConst.VALUE_TAG_TYPE_TEXTAREA, value: null }
      ]
    }
  },
  methods: {
    saveTodo () {
      const todo = {}
      todo.title = this.mTodoInputList[0].value
      todo.todoType = this.mTodoInputList[1].value
      todo.todoUserKey = this.mTodoInputList[2].value
      todo.comment = this.mTodoInputList[3].value
      if (this.pSaveTodo) {
        this.pSaveTodo(todo)
      }
    },
    openSetTodoPop () {
      this.mSetTodoPopShowYn = true
    },
    closeSetTodoPop () {
      this.mSetTodoPopShowYn = false
    }
  },
  watch: {
    pFamilyList: {
      immediate: true,
      handler (value) {
        if (!value) return
        this.mTodoInputList[2].options = this.pFamilyList
        this.mTodoInputList[2].value = this.pFamilyList[0].value
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.MZPopLayoutWrap {
  border-radius: 1.5rem;
  z-index: 99;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background-color: #f1f1f5; */
  background-color: #fff;

  border: 1px solid #ccc;
  box-shadow: 9px 9px 9px -9px #00000052;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
