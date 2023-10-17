<template>
    <div class="chanInfoBoxWrap">
      <div class="w100P " style="height: calc( 100% - 40px );">
        <div style="height:40px; border-bottom: 2px solid #6768a7;">
          <span class="popHeaderTitleSpan font20 h100P" style="line-height: 40px; color: #6768A7; font-weight: bold;">{{ pUpdateTodo? 'Edit':'Set'}}</span>
          <div class="chanMenubar cursorP" @click="openMenu" style="top:8px">
            <img src="../../../assets/images/todo/MKCloseBtn.svg" width="20" @click="pClosePop"/>
          </div>
        </div>
        <div style="padding: 5px 15px;">
          <div v-for="input, index in mTodoInputList" :key="index" class="w100P fontBold" :class="input.title==='내용'? 'mTop-10':'mBottom-20'" style=" padding: 5px; display: flex; align-items: center;" >
            <p class="" style="width:80px; font-size: 14px; " >{{ input.title }} </p>
            <select v-if="input.title === 'Member'" style="width: calc(100% - 80px); height: 30px;" v-model="mTodoManager">
              <option v-for="family, index in familyList" :key="index" :value="family.value">{{ $changeText(family.opt)}}</option>
            </select>
            <select v-else-if="input.title === 'Category'" style="width: calc(100% - 80px); height: 30px;" v-model="mTodoCate">
              <option v-for="opt, index in input.options" :key="index" :value="opt.value">{{opt.opt}}</option>
            </select>
            <div v-else-if="input.title === 'Contents'" style="width:  calc(100% - 80px); ">
              <textarea v-model="mTodoComment" style="width: 100%; border-radius: 5px; border:1px solid #aaa; resize: none;"></textarea>
            </div>
            <input v-else type="text" v-model="mTodoTitle" style="width: calc(100% - 80px); height: 30px;"/>
          </div>
        </div>
      </div>
      <div style="border-top:2px solid #6768a7; height:40px; display: flex; align-items: center; justify-content: center;">
        <div v-for="btn, index in mBtnList" :key="index" class="cursorP fontBold" style="margin: 0 5px; background-color: #6768a7; color:white; width: 50px; border-radius: 5px; font-size: 12px; height: 25px; line-height: 25px;" @click="btn.click">{{ btn.btnTitle }}</div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    pSelectTodo: {},
    pFamilyList: {},
    pSaveTodo: Function,
    pUpdateTodo: Function,
    pGetTodoListGroupCab: Function,
    pClosePop: Function,
    pGetTodoDetail: Function
  },
  data () {
    return {
      mContsList: [],
      familyList: [],
      mTodoInputList: [
        { title: 'Title', value: null, placeholder: '일감 명을 입력해주세요.' },
        { title: 'Category', value: 'A', options: [{ opt: 'Select', value: 'A' }, { opt: 'HouseWork', value: 'H' }, { opt: 'Work', value: 'T' }, { opt: 'Self-Improvement', value: 'S' }, { opt: 'etc', value: 'E' }] },
        { title: 'Member', value: null, options: [] },
        { title: 'Contents', value: null }
      ],
      mBtnList: [{ btnTitle: 'Add', click: this.saveTodo }, { btnTitle: 'Close', click: this.pClosePop }],
      mTodoManager: '',
      mTodoCate: 'A',
      mTodoComment: '',
      mTodoTitle: ''
    }
  },
  created () {
    if (this.pFamilyList) {
      this.familyList = this.pFamilyList
      this.mTodoManager = this.pFamilyList[0].value
    }
    if (this.pSelectTodo) {
      if (this.pSelectTodo !== 'new') {
        console.log(this.pSelectTodo)
        this.mTodoTitle = this.pSelectTodo.title
        this.mTodoCate = this.pSelectTodo.todoType
      }
    }
    if (this.pUpdateTodo) {
      this.mTodoComment = this.pSelectTodo.comment
      this.mBtnList = [{ btnTitle: 'Edit', click: this.updateTodo }, { btnTitle: 'Close', click: this.pClosePop }]
    }
  },
  methods: {
    saveTodo () {
      if (this.pSaveTodo) {
        if (this.mTodoTitle === '') {
          alert('Please write a title.')
        } else if (this.mTodoCate === 'A') {
          alert('Please select a category.')
        } else {
          const todoSet = {}
          todoSet.title = this.mTodoTitle
          todoSet.todoType = this.mTodoCate
          todoSet.comment = this.mTodoComment
          todoSet.todoUserKey = this.mTodoManager
          if (this.pSaveTodo) {
            this.pSaveTodo(todoSet)
          }
        }
      }
    },
    async updateTodo () {
      if (this.pUpdateTodo) {
        if (this.mTodoTitle === '') {
          alert('Please write a title.')
        } else if (this.mTodoCate === 'A') {
          alert('Please select a category.')
        } else {
          const todoSet = {}
          todoSet.title = this.mTodoTitle
          todoSet.todoType = this.mTodoCate
          todoSet.comment = this.mTodoComment
          todoSet.todoUserKey = this.mTodoManager
          todoSet.todoKey = this.pSelectTodo.todoKey
          todoSet.targetKind = this.pSelectTodo.targetKind
          if (this.pUpdateTodo) {
            await this.pUpdateTodo(todoSet)
          }
          if (this.pClosePop) {
            await this.pClosePop()
          }
          if (this.pGetTodoDetail) {
            await this.pGetTodoDetail(false)
          }
          if (this.pGetTodoListGroupCab) {
            await this.pGetTodoListGroupCab(false)
          }
        }
      }
    },
    topDate () {
      let todayDate = ''
      const date = new Date(this.pSelectDate)
      const year = date.getFullYear()
      let month = date.getMonth() + 1 + ''
      let day = date.getDate() + ''
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      todayDate = year + '년 ' + month + '월 ' + day + '일'
      return todayDate
    }
  }
}
</script>
<style scoped>
.chanInfoBoxWrap {
  width: 70% !important;
  height: 45% !important;
  top: 25% !important;
  left: 15% !important;
  position: absolute;
  z-index: 99999 !important;
  padding: 0px !important;
  border-radius: 10px;
  padding-bottom: 0;
  float: left;
  background-color: #fff;
}
.chanMenubar {
  position: absolute;
  right: 1rem;
}
.commonPopHeaderWrap{
  position: fixed;
  justify-content: center;
  align-items: center;
  left: 0;
  box-sizing: border-box;
  display: flex;
  padding: 0.7rem 0.5rem;
  width: 100%; height: 50px;
  list-style: none;
  text-align: center;
  z-index: 10;
  background: #FFF;
}
</style>
