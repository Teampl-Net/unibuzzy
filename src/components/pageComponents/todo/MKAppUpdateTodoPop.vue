<template>
  <gPopup :pPopInfo="mConfirmPopup">
  <div class="MKAppPopupBody w100P h100P flexAllCenter mTop-20 mBottom-20" style="flex-direction: column;">
    <div style="padding: 5px 15px;">
      <div v-for="input, index in mTodoInputList" :key="index" class="w100P fl fontBold" :class="input.title==='내용'? 'mTop-10':'mBottom-20'" style="height:30px; padding: 5px; display: flex; align-items: center;">
        <p class="" style="width:60px; font-size: 14px;" >{{ input.title }} </p>
        <div style="width:calc(100% - 60px)">
          <gInput :pInputInfo="input" style=""/>
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
    pSelectTodo: {},
    pGetTodoList: Function,
    pGetTodoDetail: Function
  },
  created () {
    if (this.pSelectTodo) {
      this.mTodoInputList[0].value = this.pSelectTodo.title
      this.mTodoInputList[1].value = this.pSelectTodo.todoType
      this.mTodoInputList[2].options = this.mGetCabinetUserList
      this.mTodoInputList[2].value = this.pSelectTodo.todoUserKey
      this.mTodoInputList[3].value = this.pSelectTodo.comment
    }
    this.getCabinetList()
    console.log(this.pSelectTodo)
  },
  data () {
    return {
      mConfirmPopup: { title: '수정', closeFn: this.pClosePop, size: { w: 320, h: 'auto' }, btnList: [{ btnText: '수정', onClickFn: this.saveTodo, pointYn: true, deepYn: true }, { btnText: '닫기', onClickFn: this.pClosePop }], isFull: false, isConfirm: false },
      mTodoInputList: [
        { title: '일감 명', type: this.$gMKConst.VALUE_TAG_TYPE_INPUT_TEXT, value: null, placeholder: '일감 명을 입력해주세요.' },
        { title: '유형', type: this.$gMKConst.VALUE_TAG_TYPE_SELECT, value: 'A', options: [{ opt: '선택', value: 'A' }, { opt: 'HouseWork', value: 'H' }, { opt: 'Work', value: 'T' }, { opt: 'Self-Improvement', value: 'S' }, { opt: 'etc', value: 'E' }] },
        { title: '담당자', type: this.$gMKConst.VALUE_TAG_TYPE_SELECT, value: null, options: [] },
        { title: '내용', type: this.$gMKConst.VALUE_TAG_TYPE_TEXTAREA, value: null }
      ],
      mGetCabinetUserList: {}
    }
  },
  methods: {
    async saveTodo () {
      const param = { todo: {} }
      param.todo.todoKey = this.pSelectTodo.todoKey
      param.todo.title = this.mTodoInputList[0].value
      param.todo.comment = this.mTodoInputList[3].value
      param.todo.todoType = this.mTodoInputList[1].value
      param.todo.todoUserKey = this.mTodoInputList[2].value
      const result = await this.$gHTTPfunctions.saveTodo(param)
      if (result.data.resultMsg === 'OK') {
        if (this.pClosePop) {
          this.pClosePop()
        }
        if (this.pGetTodoList) {
          this.pGetTodoList()
        }
        if (this.pGetTodoDetail) {
          this.pGetTodoDetail()
        }
      }
    },
    async getCabinetList () {
      const param = {}
      param.cabinetKey = this.pSelectTodo.targetKey
      const result = await this.$gHTTPfunctions.getCabinetList(param)
      if (result.data) {
        const mGetCabinetUserList = []
        if (result.data.cabinet.content.length !== 0) {
          const cabinetUserList = result.data.cabinet.content[0].mCabUserList
          console.log(cabinetUserList)
          for (let i = 0; i < cabinetUserList.length; i++) {
            if (cabinetUserList[i].userKey === this.GE_USER.userKey) {
              mGetCabinetUserList.push({ opt: this.$gChangeText(this.GE_USER.userDispMtext), value: this.GE_USER.userKey })
            } else {
              if (!cabinetUserList[i].dispMtext) {
                mGetCabinetUserList.push({ opt: '만끽이', value: cabinetUserList[i].userKey })
              } else {
                mGetCabinetUserList.push({ opt: this.$gChangeText(cabinetUserList[i].dispMtext), value: cabinetUserList[i].userKey })
              }
            }
          }
        } else {
          mGetCabinetUserList.push({ opt: this.$gChangeText(this.GE_USER.userNameMtext), value: this.GE_USER.userKey })
        }
        this.mGetCabinetUserList = mGetCabinetUserList
        this.mTodoInputList[2].options = this.mGetCabinetUserList
        this.mTodoInputList[2].value = this.pSelectTodo.todoUserKey
        console.log(this.mTodoInputList[2])
      }
    },
    getDate () { // -1:day-1, 0:day, 1:day+1
      let todayDate = ''
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1 + ''
      let day = date.getDate() + ''
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      todayDate = year + '-' + month + '-' + day
      return todayDate
    }
  },
  computed: {
    GE_USER () {
      const userInfo = this.$gGetSetFunctions.getUserInfo()
      return userInfo
    }
  }
}
</script>
<style scoped>
.MKCommonSelect {
  height:50px !important;
}
</style>
