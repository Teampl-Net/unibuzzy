<template>
  <MKAppTodoAddPop v-if="mAddTodoPopShowYn" :pClosePop="closeAddTodoPop" :pSelectDate="mSelectDate" :pSetCountDate="setCountDate" :pGetTodoList="getTodoListGroupCab"/>
  <MKAppTodoDetail v-if="mTodoDetailShowYn" :pClosePop="closeTodoDetail" :pSelectTodo="mSelectTodo" :pGetTodoList="getTodoListGroupCab"/>
  <MKAppUpdateTodoPop v-if="mUpdateTodoPopShowYn" :pClosePop="closeUpdateTodoPop" :pSelectTodo="mSelectTodo" :pGetTodoList="getTodoListGroupCab"/>
  <div class="w100P h100P">
  <gPageHeader pHeaderText="오늘의 일" style="box-shadow: 0px 5px 10px -10px #111;"/>
    <div class="MKpageBody MKCommonBodyContent MKtodoBody">
      <div class="MKdateArea">
        <div class="w100P commonTitleText MKdateAreaBox">
          <div class="MKCalBox">
            <img src="../../assets/images/todo/MKCommonArrowBack.svg" width="30" height="30" @click="MoveDate(-1)"/>
            <Datepicker class="mtop-05 fl MkDatePicker" v-model:value="mSelectDate" :editable="false" type="date" titleFormat="YYYY-MM-DD">{{ mSelectDate }}</Datepicker>
            <img src="../../assets/images/todo/MKCommonArrowBack.svg" style="transform: rotateZ(180deg)" width="30" height="30" @click="MoveDate(1)"/>
          </div>
        </div>
      </div>
      <div class="MKtodoFilter">
        <div>
          <div class="fl w70">
            <gInput class="MKCommonInput" :pInputInfo="mCreUserSelectInput"/>
          </div>
          <div class="fl w70">
            <gInput class="fl MKCommonInput" :pInputInfo="mTypeSelectInput"/>
          </div>
          <div class="fl w70">
            <gInput class="fl MKCommonInput" :pInputInfo="myTodoInput"/>
          </div>
        </div>
        <div class="fr fontBold cursorP MKaddBtn" @click="openAddTodoPop">추가</div>
      </div>
      <div v-if="mMyTodoCount === 0 && mTargetTodoCount === 0 && mCompleteTodoCount === 0" class="fontBold commonTitleText MkNoTodoBox">
        오늘의 일감이 없습니다.
      </div>
      <template v-else>
        <div class="scroll MkTodoBox">
          <div v-if="mMyTodoYn" class="mBottom-10 fontBold MkTodoCateBox" >
            <p class="p-05">나의 일 <span class="commonSmallText">({{ mMyTodoCount }}건)</span></p>
          </div>
          <template v-for="group, groupIndex in mGetTodoGroupList" :key="groupIndex" >
            <div v-if="group.myTodoList.length !== 0" class="mTop-10 MkTodoCabBox">
              <p class="commonSubTitleTextBold MkCabiName" >{{ group.cabinetNameMtext }} <span class="commonSmallText">({{ group.myTodoList.length }}건)</span></p>
              <div :class="todo.strikeOnOff? 'fade-out-box':''" v-for="todo, todoIndex in group.myTodoList" :key="todoIndex" style="padding: 5px 10px; " >
                <div class="w100P cursorP MkTodoList">
                  <div class="w100P MkTodoListBox">
                    <div style="display: flex; align-items: center;" >
                      <img v-if="todo.strikeOnOff" src="../../assets/images/todo/checkboxCheck.png" width="20" height="20"/>
                      <img v-else src="../../assets/images/todo/checkboxBlank.png" width="20" height="20" @click="setCompleteTodo('myTodoList', groupIndex, todoIndex)"/>
                      <p v-if="todo.status === '00'" class="fl fontBold commonSubTitleTextBold mLeft-05" style="position: relative" @click="openTodoDetail(todo)">
                        <span class="strikeLine" :style="todo.strikeOnOff? 'transition: all .5s; width:100%;  ':'width:0;'"></span>
                          {{ todo.title }}
                      </p>
                      <p v-else-if="todo.status === '99' || todo.status === '98'" class="fl commonSubTitleText mLeft-05" style="text-decoration: line-through;">{{ todo.title }}</p>
                    </div>
                    <div style="display: flex; align-items: center; position: relative">
                      <div class="MKAppUserPhotoBack flexCenter p-05 fontNavy fl">
                        <div class="MKAppUserPhoto MKShadow h100P">
                          <img v-if="todo.todoDomainPath" :src="todo.todoDomainPath + todo.todoPathMtext" style="width:20px; height:20px;"/>
                        </div>
                      </div>
                      <span style="position: absolute; background-color: black; height: 1px; width:0; top:15px; right:13px; transition: all .5s;" :style="todo.strikeOnOff? 'width:calc(100% - 45px);':'width:0;'"></span>
                      <p class="fl mRight-05 todoFontSize" :style="todo.status === '99' || todo.status === '98'? 'text-decoration: line-through;':''" style="">{{ $gChangeText(todo.todoUserName) }}</p>
                      <p v-if="todo.targetKey === GE_USER.userKey" class="fl mRight-05 todoFontSize" :style="todo.status === '99' || todo.status === '98'? 'text-decoration: line-through;':''" style="">{{ changeTypeToText(todo.todoType)}}(본인)</p>
                      <p v-else class="fl mRight-05 todoFontSize" :style="todo.status === '99' || todo.status === '98'? 'text-decoration: line-through;':''" style="">{{ changeTypeToText(todo.todoType)}}({{ todo.cabinetNamMtext? todo.cabinetNamMtext: '나' }})</p>
                      <img v-if="todo.status === '00'" class="cursorP" src="../../assets/images/todo/todoMenu.png" width="3" height="16" @click="todosideMenu(todo, 'myTodoList', groupIndex, todoIndex)"/>
                      <div v-if="todo.sideMenuOpenYn" style="position: absolute; right: -5px; top:30px; background-color: white; width:50px; border: 1px solid black; padding: 10px; display: flex; justify-content: center; align-items: center; flex-direction: column; z-index: 10;">
                        <p class="mBottom-10" @click="openUpdateTodoPop(todo)">수정</p>
                        <p @click="openDelTodo(todo)">삭제</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        <div v-if="mTargetTodoYn" class="mBottom-10 fontBold MkTodoCateBox" >
          <p style="padding:5px">내가 부여한 일 <span style="font-size: 15px;">({{ mTargetTodoCount }}건)</span></p>
        </div>
          <template v-for="group, groupIndex in mGetTodoGroupList" :key="groupIndex" >
          <div v-if="group.targetTodoList.length !== 0" class="mTop-10" style="background-color: white; border:2px solid #acacac; padding: 5px; border-radius: 20px;  margin:5px 10px 10px; ">
            <p class="commonSubTitleTextBold MkCabiName">{{ group.cabinetNameMtext }} <span class="commonSmallText">({{ group.targetTodoList.length }}건)</span></p>
            <div :class="todo.strikeOnOff? 'fade-out-box':''" v-for="todo, todoIndex in group.targetTodoList" :key="todoIndex" style="padding: 5px 10px;" >
              <div class="w100P cursorP" style="background-color: white; display:flex;align-items: center; height:50px; border-radius:0.5rem; border:2px solid #acacac; padding: 0px 5px;">
              <div class="w100P" style="padding: 5px; height: 50%; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center;" >
                <img v-if="todo.strikeOnOff" src="../../assets/images/todo/checkboxCheck.png" width="20" height="20"/>
                <img v-else src="../../assets/images/todo/checkboxBlank.png" width="20" height="20" @click="setCompleteTodo('targetTodoList', groupIndex, todoIndex)"/>
                <p v-if="todo.status === '00'" class="fl fontBold commonSubTitleTextBold mLeft-05" style="position: relative" @click="openTodoDetail(todo)">
                  <span class="strikeLine" :style="todo.strikeOnOff? 'width:100%;':'width:0;'"></span>
                    {{ todo.title }}
                </p>
                <p v-else-if="todo.status === '99' || todo.status === '98'" class="fl commonSubTitleText mLeft-05" style="text-decoration: line-through;">{{ todo.title }}</p>
              </div>
              <div style="display: flex; align-items: center; position: relative">
                <div class="MKAppUserPhotoBack flexCenter p-05 fontNavy fl">
                  <div class="MKAppUserPhoto MKShadow h100P">
                    <img v-if="todo.todoDomainPath" :src="todo.todoDomainPath + todo.todoPathMtext" style="width:20px; height:20px;"/>
                  </div>
                </div>
                <span style="position: absolute; background-color: black; height: 1px; width:0; top:15px; right:13px; " :style="todo.strikeOnOff? 'width:calc(100% - 45px); transition: all .5s;':'width:0;'"></span>
                <p class="fl mRight-05 todoFontSize" :style="todo.status === '99' || todo.status === '98'? 'text-decoration: line-through;':''">{{ $gChangeText(todo.todoUserName) }}</p>
                <p v-if="todo.targetKey === GE_USER.userKey" class="fl mRight-05 todoFontSize" :style="todo.status === '99' || todo.status === '98'? 'text-decoration: line-through;':''">{{ changeTypeToText(todo.todoType)}}(본인)</p>
                <p v-else class="fl mRight-05 todoFontSize" :style="todo.status === '99' || todo.status === '98'? 'text-decoration: line-through;':''">{{ changeTypeToText(todo.todoType)}}({{ todo.cabinetNamMtext? todo.cabinetNamMtext: '나' }})</p>
                <img v-if="todo.status === '00'" class="cursorP" src="../../assets/images/todo/todoMenu.png" width="5" height="20" @click="todosideMenu(todo, 'targetTodoList', groupIndex, todoIndex)"/>
                <div v-if="todo.sideMenuOpenYn" style="position: absolute; right: -5px; top:30px; background-color: white; width:50px; border: 1px solid black; padding: 10px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
                  <p class="mBottom-10" @click="openUpdateTodoPop(todo)">수정</p>
                  <p @click="openDelTodo(todo)">삭제</p>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </template>
        <div v-if="mCompleteTodoYn" class="mBottom-10 fontBold MkTodoCateBox" >
          <p style="padding:5px">완료 <span style="font-size: 15px;">({{ mCompleteTodoCount }}건)</span></p>
        </div>
        <template v-for="group, groupIndex in mGetTodoGroupList" :key="groupIndex" >
          <div v-if="group.completeTodoList.length !== 0" class="mTop-10" style="background-color: white; border:2px solid #acacac; padding: 5px; border-radius: 20px;  margin:5px 10px 10px; ">
            <p class="commonSubTitleTextBold MkCabiName">{{ group.cabinetNameMtext }} <span class="commonSmallText">({{ group.completeTodoList.length }}건)</span></p>
            <div :class="todo.strikeOnOff? 'fade-out-box':''" v-for="todo, todoIndex in group.completeTodoList" :key="todoIndex" style="padding: 5px 10px;" >
              <div class="w100P cursorP" style="background-color: white; display:flex;align-items: center; height:50px; border-radius:0.5rem; border:2px solid #acacac; padding: 0px 5px;">
              <div class="w100P" style="padding: 5px; height: 50%; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center;" >
                <img v-if="todo.strikeOnOff" src="../../assets/images/todo/checkboxBlank.png" width="20" height="20"/>
                <img v-else src="../../assets/images/todo/checkboxCheck.png" width="20" height="20" @click="setCompleteTodo('completeTodoList', groupIndex, todoIndex)"/>
                <p class="fl fontBold commonSubTitleTextBold mLeft-05" style="position: relative" @click="openTodoDetail(todo)">
                  <span class="strikeLine" :style="!todo.strikeOnOff? 'width:100%; ':' transition: all .5s; width:0;'"></span>
                    {{ todo.title }}
                </p>
              </div>
              <div style="display: flex; align-items: center; position: relative">
                <div class="MKAppUserPhotoBack flexCenter p-05 fontNavy fl">
                  <div class="MKAppUserPhoto MKShadow h100P">
                    <img v-if="todo.completeDomainPath" :src="todo.completeDomainPath + todo.completePathMtext" style="width:20px; height:20px;"/>
                  </div>
                </div>
                <span style="position: absolute; background-color: black; height: 1px; width:0; top:15px; right:13px;" :style="!todo.strikeOnOff? 'width:calc(100% - 45px);':' transition: all .5s; width:0;'"></span>
                <p class="fl mRight-05 todoFontSize" :style="todo.status === '99' || todo.status === '98'? 'text-decoration: line-through;':''">{{ $gChangeText(todo.completeUserName) }}</p>
                <p v-if="todo.targetKey === GE_USER.userKey" class="fl mRight-05 todoFontSize" :style="todo.status === '99' || todo.status === '98'? 'text-decoration: line-through;':''">{{ changeTypeToText(todo.todoType)}}(본인)</p>
                <p v-else class="fl mRight-05 todoFontSize" :style="todo.status === '99' || todo.status === '98'? 'text-decoration: line-through;':''">{{ changeTypeToText(todo.todoType)}}({{ todo.cabinetNamMtext? todo.cabinetNamMtext: '나' }})</p>
              </div>
            </div>
          </div>
            </div>
          </div>
        </template>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import MKAppTodoAddPop from '../../components/pageComponents/todo/MKAppAddTodoPop.vue'
// import MKAppCompleteChalPop from '@/views/app/popup/MKAppCompleteChalPop.vue'
import MKAppTodoDetail from '../../components/pageComponents/todo/MKAppTodoDetail.vue'
// import MKAppDelRecentConfirmPop from '@/views/app/popup/MKAppDelRecentConfirmPop.vue'
import MKAppUpdateTodoPop from '../../components/pageComponents/todo/MKAppUpdateTodoPop.vue'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

export default {
  components: {
    MKAppTodoAddPop,
    // MKAppCompleteChalPop,
    MKAppTodoDetail,
    // MKAppDelRecentConfirmPop,
    MKAppUpdateTodoPop,
    Datepicker
  },
  data () {
    return {
      mTodayTodoList: [],
      mAddTodoPopShowYn: false,
      mCompleteTodoPopShowYn: false,
      mSelectTodo: {},
      mTodoDetailShowYn: false,
      mSelectDate: '',
      mTodoTotalCount: {},
      mCreUserSelectInput: { title: '유형', type: this.$gMKConst.VALUE_TAG_TYPE_SELECT, value: 'A', 2: [{ opt: '작성자', value: 'A' }, { opt: '본인', value: 'me' }, { opt: '가족', value: 'others' }] },
      mTypeSelectInput: { title: '유형', type: this.$gMKConst.VALUE_TAG_TYPE_SELECT, value: 'A', options: [{ opt: '유형', value: 'A' }, { opt: 'HouseWork', value: 'H' }, { opt: 'Work', value: 'T' }, { opt: 'Self-Improvement', value: 'S' }, { opt: 'etc', value: 'E' }] },
      myTodoInput: { title: '유형', type: this.$gMKConst.VALUE_TAG_TYPE_SELECT, value: 'A', options: [{ opt: '모든일', value: 'A' }, { opt: '본인', value: 'me' }, { opt: '가족', value: 'others' }] },
      mCreUserSelectInputVal: 'A',
      mTypeSelectInputVal: 'A',
      myTodoInputVal: 'A',
      mMyTodoYn: false,
      mTargetTodoYn: false,
      mTodosideMenu: false,
      mCompleteTodoYn: false,
      setCountDate: 0,
      mDelTodoPopShowYn: false,
      mUpdateTodoPopShowYn: false,
      mCompleteTodo: false,
      mGetTodoGroupList: [],
      mMyTodoCount: 0,
      mTargetTodoCount: 0,
      mCompleteTodoCount: 0
    }
  },
  created () {
    this.mSelectDate = new Date()
    // this.getTodoList()
    this.getTodoListGroupCab()
  },
  methods: {
    setCompleteTodo (value, groupIndex, todoIndex) {
      this.mGetTodoGroupList[groupIndex][value][todoIndex].strikeOnOff = true
      setTimeout(() => {
        if (this.mGetTodoGroupList[groupIndex][value][todoIndex].status === '00') {
          this.mGetTodoGroupList[groupIndex][value][todoIndex].status = '99'
          this.mGetTodoGroupList[groupIndex][value][todoIndex].strikeOnOff = false
          if (this.GE_USER.domainPath) {
            this.mGetTodoGroupList[groupIndex][value][todoIndex].completeUserPicUrl = this.GE_USER.domainPath + this.GE_USER.pathMtext
          } else {
            // this.mGetTodoGroupList[groupIndex][value][todoIndex].completeUserPicUrl = require('@/assets/images/common/userImg01.png')
          }
          this.mGetTodoGroupList[groupIndex][value][todoIndex].completeUserName = this.GE_USER.userNameMtext
          this.completeTodo(this.mGetTodoGroupList[groupIndex][value][todoIndex])
          this.mGetTodoGroupList[groupIndex].completeTodoList.unshift(this.mGetTodoGroupList[groupIndex][value][todoIndex])
          this.mGetTodoGroupList[groupIndex][value].splice(todoIndex, 1)
          this.mMyTodoCount -= 1
          if (this.mMyTodoCount === 0) {
            this.mMyTodoYn = false
          }
          this.mCompleteTodoCount += 1
          if (this.mCompleteTodoCount !== 0) {
            this.mCompleteTodoYn = true
          }
        } else if (this.mGetTodoGroupList[groupIndex][value][todoIndex].status === '99') {
          this.mGetTodoGroupList[groupIndex][value][todoIndex].status = '00'
          this.mGetTodoGroupList[groupIndex][value][todoIndex].strikeOnOff = false
          this.completeTodo(this.mGetTodoGroupList[groupIndex][value][todoIndex])
          this.mGetTodoGroupList[groupIndex].myTodoList.unshift(this.mGetTodoGroupList[groupIndex][value][todoIndex])
          this.mGetTodoGroupList[groupIndex][value].splice(todoIndex, 1)
          this.mMyTodoCount += 1
          if (this.mMyTodoCount !== 0) {
            this.mMyTodoYn = true
          }
          this.mCompleteTodoCount -= 1
          if (this.mCompleteTodoCount === 0) {
            this.mCompleteTodoYn = false
          }
        }
      }, 3000)
    },
    async completeTodo (value) {
      const param = { todo: {} }
      param.todo.todoKey = value.todoKey
      param.todo.status = value.status
      if (value.status === '99') {
        param.todo.completeDate = this.getDate(0)
        param.todo.completeUserKey = this.GE_USER.userKey
      } else {
        param.todo.completeDate = null
        param.todo.completeUserKey = 0
      }
      const result = await this.$gHTTPfunctions.saveTodo(param)
      if (result.data.resultMsg === 'OK') {
        console.log(result)
      }
    },
    async getTodoListGroupCab () {
      const param = {}
      param.userKey = this.GE_USER.userKey
      if (this.mCreUserSelectInput.value === 'me') {
        param.creUserKey = this.GE_USER.userKey
      } else if (this.mCreUserSelectInput.value === 'others') {
        param.creUserKey = 0
      }
      if (this.mTypeSelectInput.value !== 'A') {
        param.todoType = this.mTypeSelectInput.value
      }
      if (this.myTodoInput.value === 'me') {
        param.todoUserKey = this.GE_USER.userKey
      } else if (this.myTodoInput.value === 'others') {
        param.todoUserKey = 0
      }
      param.searchDate = this.getDate(1)
      param.sysCabinetCode = 'USER'
      const result = await this.$gHTTPfunctions.getTodoListGroupCab(param)
      if (result.data.result) {
        console.log(result)
        this.mGetTodoGroupList = result.data.todo
        const getTodoGroupList = []
        this.mMyTodoYn = false
        this.mTargetTodoYn = false
        this.mCompleteTodoYn = false
        this.mMyTodoCount = 0
        this.mTargetTodoCount = 0
        this.mCompleteTodoCount = 0
        for (let i = 0; i < this.mGetTodoGroupList.length; i++) {
          const cabinetList = {}
          const myTodoList = []
          const targetTodoList = []
          const completeTodoList = []
          if (this.mGetTodoGroupList[i].mCabTodoList.length !== 0) {
            cabinetList.cabinetNameMtext = this.mGetTodoGroupList[i].cabinetNameMtext
            for (let j = 0; j < this.mGetTodoGroupList[i].mCabTodoList.length; j++) {
              if (this.mGetTodoGroupList[i].mCabTodoList[j].status === '00' && this.mGetTodoGroupList[i].mCabTodoList[j].todoUserKey === this.GE_USER.userKey) {
                this.mGetTodoGroupList[i].mCabTodoList[j].strikeOnOff = false
                this.mGetTodoGroupList[i].mCabTodoList[j].sideMenuOpenYn = false
                myTodoList.push(this.mGetTodoGroupList[i].mCabTodoList[j])
                this.mMyTodoCount += 1
                this.mMyTodoYn = true
              }
              if (this.mGetTodoGroupList[i].mCabTodoList[j].status === '00' && this.mGetTodoGroupList[i].mCabTodoList[j].todoUserKey !== this.GE_USER.userKey && this.mGetTodoGroupList[i].mCabTodoList[j].creUserKey === this.GE_USER.userKey && this.mGetTodoGroupList[i].mCabTodoList[j].targetKind !== 'U') {
                this.mGetTodoGroupList[i].mCabTodoList[j].strikeOnOff = false
                this.mGetTodoGroupList[i].mCabTodoList[j].sideMenuOpenYn = false
                targetTodoList.push(this.mGetTodoGroupList[i].mCabTodoList[j])
                this.mTargetTodoCount += 1
                this.mTargetTodoYn = true
              }
              if (this.mGetTodoGroupList[i].mCabTodoList[j].status === '99') {
                this.mGetTodoGroupList[i].mCabTodoList[j].strikeOnOff = false
                this.mGetTodoGroupList[i].mCabTodoList[j].sideMenuOpenYn = false
                completeTodoList.push(this.mGetTodoGroupList[i].mCabTodoList[j])
                this.mCompleteTodoCount += 1
                this.mCompleteTodoYn = true
              }
            }
            cabinetList.myTodoList = myTodoList
            cabinetList.targetTodoList = targetTodoList
            cabinetList.completeTodoList = completeTodoList
            getTodoGroupList.unshift(cabinetList)
          }
        }
        this.mGetTodoGroupList = getTodoGroupList
        console.log(this.mGetTodoGroupList)
        console.log(this.mTargetTodoCount)
      }
    },
    getDate (value) { // -1:day-1, 0:day, 1:day+1
      let todayDate = ''
      // const date = new Date()
      const year = this.mSelectDate.getFullYear()
      let month = this.mSelectDate.getMonth() + 1 + ''
      let day = this.mSelectDate.getDate() + value + ''
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      todayDate = year + '-' + month + '-' + day
      return todayDate
    },
    MoveDate (value) {
      this.setCountDate += value
      const setDate = this.mSelectDate.setDate(this.mSelectDate.getDate() + value)
      const returnDate = new Date(setDate)
      this.mSelectDate = returnDate
    },
    calPercent (total, com) {
      let returnData = ''
      if (com === 0) {
        returnData = 0
      } else {
        returnData = Math.floor(total / com * 100) + ''
      }
      return returnData + '%'
    },
    changeTypeToText (value) {
      let returnData = ''
      if (value === 'H') {
        returnData = 'HouseWork'
      } else if (value === 'T') {
        returnData = 'Work'
      } else if (value === 'S') {
        returnData = 'Self-Improvement'
      } else if (value === 'E') {
        returnData = 'etc'
      }
      return returnData
    },
    todosideMenu (todo, value, groupIndex, todoIndex) {
      this.mSelectTodo = todo
      console.log(this.mGetTodoGroupList[groupIndex])
      console.log(this.mGetTodoGroupList[groupIndex][value])
      console.log(this.mGetTodoGroupList[groupIndex][value][todoIndex])
      this.mGetTodoGroupList[groupIndex][value][todoIndex].sideMenuOpenYn = !this.mGetTodoGroupList[groupIndex][value][todoIndex].sideMenuOpenYn
    },
    changeDate (value) {
      console.log(value)
      let todayDate = ''
      const date = new Date(value)
      console.log(date)
      const year = date.getFullYear()
      let month = date.getMonth() + 1 + ''
      let day = date.getDate() + ''
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      todayDate = year + '년' + month + '월' + day + '일'
      return todayDate
    },
    calPercent (total, com) {
      let returnData = ''
      if (com === 0) {
        returnData = 0
      } else {
        returnData = Math.floor(total / com * 100) + ''
      }
      return returnData + '%'
    },
    openUpdateTodoPop (value) {
      this.mSelectTodo = value
      this.mUpdateTodoPopShowYn = true
    },
    closeUpdateTodoPop () {
      this.mUpdateTodoPopShowYn = false
    },
    openDelTodo (value) {
      this.mSelectTodo = value
      this.mDelTodoPopShowYn = true
    },
    closeDelTodo () {
      this.mDelTodoPopShowYn = false
    },
    openTodoDetail (value) {
      this.mSelectTodo = value
      this.mTodoDetailShowYn = true
    },
    closeTodoDetail () {
      this.mTodoDetailShowYn = false
    },
    openCompleteTodoPop (value) {
      this.mSelectTodo = value
      this.mCompleteTodoPopShowYn = true
    },
    closeCompleteTodoPop () {
      this.mCompleteTodoPopShowYn = false
    },
    openAddTodoPop () {
      this.mAddTodoPopShowYn = true
    },
    closeAddTodoPop () {
      this.mAddTodoPopShowYn = false
    }
  },
  computed: {
    GE_USER () {
      const userInfo = this.$gGetSetFunctions.getUserInfo()
      return userInfo
    }
  },
  watch: {
    mSelectDate: {
      immediate: true,
      handler (val) {
        if (!val) return
        this.getTodoListGroupCab()
      },
      deep: true
    },
    mCreUserSelectInput: {
      immediate: true,
      handler (val) {
        if (!val) return
        if (val.value !== this.mCreUserSelectInputVal) {
          this.mCreUserSelectInputVal = val.value
          this.getTodoListGroupCab()
        }
      },
      deep: true
    },
    mTypeSelectInput: {
      immediate: true,
      handler (val) {
        if (!val) return
        if (val.value !== this.mTypeSelectInputVal) {
          this.mTypeSelectInputVal = val.value
          this.getTodoListGroupCab()
        }
      },
      deep: true
    },
    myTodoInput: {
      immediate: true,
      handler (val) {
        if (!val) return
        if (val.value !== this.myTodoInputVal) {
          this.myTodoInputVal = val.value
          this.getTodoListGroupCab()
        }
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.MKAppUserPhotoBack {
  border-radius:30px;
  background-color:rgb(223, 224, 226);
  min-width: 30px;
  min-height: 30px;
  margin-right: 5px;
}
.MKAppUserPhoto {
  overflow:hidden;
  border-radius:50%;
}
.strikeLine {
  position: absolute;
  background-color: black;
  height: 2px;
  width:0;
  top:7px;
}
.MkTodoListBox {
  padding: 5px;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.MkTodoList {
  background-color: white;
  display:flex;
  align-items: center;
  height:50px;
  border-radius:0.5rem;
  border:2px solid #acacac;
  padding: 0px 5px;
}
.MkTodoCabBox {
  background-color: white;
  border:2px solid #acacac;
  padding: 5px;
  margin:5px 10px 10px;
  border-radius: 20px;
}
.MkTodoCateBox {
  border:2px solid #acacac;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: white;
}
.MkCabiName {
  padding: 10px 15px;
}
.MkTodoBox {
  padding: 10px 15px;
  overflow: hidden auto;
  height:calc(100% - 150px)
}
.MkNoTodoBox {
  display: flex;
  justify-content: center;
  align-items: center;
  height:calc(100% - 300px);
}
.MKtodoFilter {
  border-bottom:1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  margin: 0 10px
}
.MKaddBtn {
  color: white;
  background-color: #3d9aff;
  width: 30px;
  height:30px;
  font-size: 10px;
  line-height: 30px;
  text-align: center;
  border-radius: 20px;
}
.MkDatePicker {
  font-size: 18px;
  float: left;
  border-radius: 5px;
}
.MKCalBox {
  width:70%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.MKdateAreaBox {
  height:50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.MKdateArea {
  height:60px;
  padding: 5px;
  margin: 0 10px
}
.MKtodoBody {
  padding:0;
  position:relative;
  overflow:hidden !important;
}
.todoFontSize {
  font-size: 12px;
}
.w70 {
  width: 70px;
}
.scroll::-webkit-scrollbar {
  display: none;
}
.scroll {
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
}
.fade-out-box {
  animation: fadeout 3s;
  -moz-animation: fadeout 3s; /* Firefox */
  -webkit-animation: fadeout 3s; /* Safari and Chrome */
  -o-animation: fadeout 3s; /* Opera */
  animation-fill-mode: forwards;
}
@keyframes fadeout {
  from {
      opacity: 1;
  }
  to {
      opacity: 0;
  }
}
@-webkit-keyframes fadeout { /* Safari and Chrome */
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
@media screen and (max-width: 500px) {
  .commonSubTitleTextBold {
    font-size: 14px;
  }
  .todoFontSize {
    font-size: 10px;
  }
}
</style>
