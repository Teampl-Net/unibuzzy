<template>
  <gPopup :pPopInfo="mTodoDetailPop">
    <div class="MKAppPopupBody w100P h100P mBottom-20" style="flex-direction:column; gap:20px; padding: 0px 20px;">
      <div class="w100P fl" style="border-bottom:1px solid #acacac; display: flex; justify-content: space-between; align-items: center; padding: 0 5px 5px; position: relative">
        <div style="display: flex; align-items: center; justify-content: center;">
          <p v-if="mTodoDetail.status === '00'" class="fl" style=" font-size: 12px; height:30px; width:60px; background-color: #3d9aff; color: white; text-align: center; line-height: 30px; margin-right: 5px; border-radius: 20px;">Progress</p>
          <p v-else-if="mTodoDetail.status === '99'" class="fl" style="border:2px solid #003a8e; font-size: 12px; height:30px; width:60px; background-color: #003a8e; color: white; text-align: center; margin-right: 5px; border-radius: 20px; display:flex; align-items: center; justify-content: center;">Completed</p>
          <p v-else-if="mTodoDetail.status === '98'" class="fl" style="border:2px solid #acacac; font-size: 12px; height:30px; width:40px; background-color: #acacac; color: white; text-align: center; margin-right: 5px; border-radius: 20px; display:flex; align-items: center; justify-content: center;">종료</p>
          <!-- <p v-if="mTodoDetail.writeYn" class="fl" style=" font-size: 12px; height:30px; width:30px; background-color: #3d9aff; color: white; text-align: center; line-height: 30px; margin-right: 5px;">작성</p> -->
          <p v-if="mTodoDetail.status === '00'" class="fl fontBold commonSubTitleTextBold mLeft-05">{{ pSelectTodo.title }}</p>
          <p v-else-if="mTodoDetail.status === '99' || mTodoDetail.status === '98'" class="fl commonSubTitleText mLeft-05" style="text-decoration: line-through;">{{ mTodoDetail.title }}</p>
        </div>
        <img v-if="mTodoDetail.status === '00'" class="cursorP" src="../../../assets/images/todo/todoMenu.png" width="5" height="20" @click="todosideMenu"/>
        <div v-if="mSideMenuOpenYn" style="position: absolute; right: -5px; top:30px; background-color: white; width:50px; border: 1px solid black; padding: 10px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
          <p class="mBottom-10"  @click="openUpdateTodoPop">수정</p>
          <p @click="openDelTodo">삭제</p>
        </div>
      </div>
      <div class="w100P commonGrayText" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid black;padding: 5px; font-size: 12px;">
        <div style="display: flex; align-items: center;">
          <div class="MKAppChalRewardP  p-05 fontNavy" style="border-radius:30px; background-color:rgb(223, 224, 226); min-width: 30px; min-height: 30px; margin-right: 5px;">
            <div class="MKAppUserPhoto MKShadow h100P" style="overflow:hidden; border-radius:50%;">
              <img :src="mTodoDetail.status === '00'? mTodoDetail.todoUserPicUrl: mTodoDetail.completeUserPicUrl" style="width:20px; height:20px;"/>
            </div>
          </div>
          <p class="mRight-05 detailFont" :style="mTodoDetail.status === '00'? '': 'text-decoration: line-through;'">{{ $gChangeText(mTodoDetail.todoUserName) }}</p>
          <p class="detailFont" :style="mTodoDetail.status === '00'? '': 'text-decoration: line-through;'">{{ changeTypeToText(mTodoDetail.todoType) }}({{ mTodoDetail.cabinetNameMtext? mTodoDetail.cabinetNameMtext:'본인'}})</p>
        </div>
        <p class="detailFont">작성 : {{ $gChangeText(mTodoDetail.creUserName) }} ({{ top1Date(mTodoDetail.creDate) }})</p>
      </div>
      <div class="w100P mTop-10" style="padding: 5px 10px" v-html="mTodoDetail.comment"></div>
    </div>
  </gPopup>
  <!-- <MKAppCompleteChalPop v-if="mCompleteTodoPopShowYn" :pClosePop="closeCompleteConfirmPop" :pSelectTodo="mTodoDetail " :pGetTodoList="pGetTodoList"/> -->
  <!-- <MKAppEndChalPop v-if="mEndTodoPopShowYn" :pClosePop="closeEndConfirmPop" :pSelectTodo="mTodoDetail " :pGetTodoList="pGetTodoList" :pGetTodoDetail="getTodoDetail"/> -->
  <!-- <MKAppDelRecentConfirmPop v-if="mDelTodoPopShowYn" :pClosePop="closeDelTodo" :pCloseDelPop="pClosePop" :pSelectTodo="mTodoDetail" :pGetTodoList="pGetTodoList"/> -->
  <MKAppUpdateTodoPop v-if="mUpdateTodoPopShowYn" :pClosePop="closeUpdateTodoPop" :pSelectTodo="mTodoDetail" :pGetTodoList="pGetTodoList" :pGetTodoDetail="getTodoDetail"/>
</template>
<script>
// import MKAppCompleteChalPop from '@/views/app/popup/MKAppCompleteChalPop.vue'
// import MKAppEndChalPop from '@/views/app/popup/MKAppEndChalPop.vue'
// import MKAppDelRecentConfirmPop from '@/views/app/popup/MKAppDelRecentConfirmPop.vue'
import MKAppUpdateTodoPop from '../../../components/pageComponents/todo/MKAppUpdateTodoPop.vue'

export default {
  props: {
    pClosePop: Function,
    pGetTodoList: Function,
    pSelectTodo: {}
  },
  components: {
    // MKAppCompleteChalPop,
    // MKAppEndChalPop,
    // MKAppDelRecentConfirmPop,
    MKAppUpdateTodoPop
  },
  data () {
    return {
      mTodoDetailPop: { title: '일감 상세', closeFn: this.pClosePop, size: { w: 450, h: 'auto' }, btnList: [{ btnText: '완료하기', onClickFn: this.openCompleteConfirmPop, pointYn: true, deepYn: true, noBorder: true }], isFull: true, isConfirm: false },
      mSideMenuOpenYn: false,
      mCompleteTodoPopShowYn: false,
      mEndTodoPopShowYn: false,
      mDelTodoPopShowYn: false,
      mUpdateTodoPopShowYn: false,
      mTodoDetail: {}
    }
  },
  created () {
    this.getTodoDetail()
  },
  methods: {
    async getTodoDetail () {
      const param = {}
      param.userKey = this.GE_USER.userKey
      param.searchDate = this.getDate(1)
      param.todoKey = this.pSelectTodo.todoKey
      const result = await this.$gHTTPfunctions.getTodoList(param)
      if (result.data.result) {
        console.log(result)
        this.mTodoDetail = result.data.todo[0]
      }
    },
    getDate (value) { // -1:day-1, 0:day, 1:day+1
      let todayDate = ''
      const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1 + ''
      let day = date.getDate() + value + ''
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      todayDate = year + '-' + month + '-' + day
      return todayDate
    },
    todosideMenu () {
      this.mSideMenuOpenYn = !this.mSideMenuOpenYn
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
    top1Date (value) {
      let todayDate = ''
      const date = new Date(value)
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
    },
    openUpdateTodoPop () {
      this.mUpdateTodoPopShowYn = true
      this.mSideMenuOpenYn = false
    },
    closeUpdateTodoPop () {
      this.mUpdateTodoPopShowYn = false
    },
    openDelTodo () {
      this.mDelTodoPopShowYn = true
      this.mSideMenuOpenYn = false
    },
    closeDelTodo () {
      this.mDelTodoPopShowYn = false
    },
    openCompleteConfirmPop () {
      this.mCompleteTodoPopShowYn = true
    },
    closeCompleteConfirmPop () {
      this.mCompleteTodoPopShowYn = false
    },
    openEndConfirmPop () {
      this.mEndTodoPopShowYn = true
    },
    closeEndConfirmPop () {
      this.mEndTodoPopShowYn = false
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
<style>
@media screen and (max-width: 500px) {
  .detailFont {
    font-size: 10px;
  }
}
</style>
