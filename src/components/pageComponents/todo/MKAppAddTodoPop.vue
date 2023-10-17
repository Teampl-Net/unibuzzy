<template>
  <div class="w100P h100P MZPopLayoutWrap" style="background-color: #efefef;">
    <MKAppSetTodoPop v-if="setOnOff" :pClosePop="closeSetOnOff" :pSelectTodo="mSelectTodo" :pSaveTodo="saveTodo" :pFamilyList="mFamilyList"/>
    <MKAppAddNewTodoPop v-if="mAddNewTodoPopShowYn" :pClosePop="closeAddNewTodoPop"/>
    <!-- <MKAppDelRecentConfirmPop v-if="mdelRecentTodoPopShowYn" :pClosePop="closeDelRecentTodo" :pSelectRecent="mSelectRecent"/> -->
    <gPageHeader pHeaderText="할 일 추가" :pClosePop="pClosePop"/>
    <div class="MKpageBody MKCommonBodyContent" style="padding:0; position:relative; overflow:hidden !important;">
      <div class="w100P" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 15px 0;">
        <p class="fontBold commonSubTitleTextBold">{{ topDate() }}</p>
        <div style="display: flex; align-items: center; justify-content: center;">
          <p class="fontBold mRight-05" style="font-size: 14px;">대상(집)</p>
          <div style="min-width: 90px">
          <gInput class=" MKCommonInput" :pInputInfo="mSelectHouseInput" style="width:120px; height: 30px;"/>
          </div>
        </div>
      </div>
      <div class="w100P fl" style=" padding: 10px 10px;">
        <p class="w100P fontBold" style="padding:5px; border-bottom:1px solid black;">기본 HouseWork</p>
        <div class="w100P fl" style="padding: 0 10px 0;">
          <div v-for="todo,index in mTodoList" :key="index" class=" cursorP  fontBold fl" style="border:1px solid #acacac; font-size: 14px; margin:5px 5px; width:30%; height:50px; display: flex; justify-content: center; align-items: center; background-color: white; border-radius: 0.5rem;" @click="openSetOnOff(todo)">
            {{ todo.title }}
          </div>
        </div>
      </div>
      <div class="" style="border-bottom: 1px solid black; display: flex; justify-content: space-between; align-items: center; padding: 10px 5px 5px; margin:0px 10px">
        <p class="fontBold">최근 한 일</p>
        <div class=" fontBold" style=" color: white; background-color: #3d9aff; width: 60px; height:30px; font-size: 12px; line-height: 30px; text-align: center; border-radius: 20px;" @click="openSetOnOff('new')">직접추가</div>
      </div>
      <div class="w100P cursorP fl scroll" style="padding: 10px; overflow: hidden auto; height:calc(100% - 320px)">
        <div v-for="todo,index in mRecentList" :key="index" style="border: 1px solid #acacac; background-color: white; border-radius:0.5rem; height:60px; display: flex; justify-content: space-between; align-items: center; padding: 5px 10px; margin-top: 5px;" @click="openSetOnOff(todo)">
          <div style="display: flex; justify-content: center; align-items: center;">
            <p class="fontBold fl commonTitleText mRight-05" >{{ todo.title }}</p>
            <p class="fl" style="font-size: 12px;">({{ $gChangeText(todo.todoUserName) }})</p>
          </div>
          <div class="MKAppUsingAppToggle" style="text-align: right;" >
            <div class=" mRight-05" style="display: flex;  flex-direction: column;">
              <div class="" style="text-align: right;">
                <!-- <p v-if="todo.completeDate" class=" fr" style="font-size: 10px; text-align: right;">({{ $gChangeText(todo.completeUserName) }})</p> -->
                <p class="fr" style="font-size: 10px; text-align: right;">{{ changeTypeToText(todo.todoType) }}</p>
              </div>
              <p v-if="todo.completeDate" style="font-size: 10px;">{{ top1Date(todo.completeDate) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="setOnOff" class="" style="border:1px solid black;  background-color: white; height: 260px; border-radius: 0.6rem 0.6rem 0.6rem 0.6rem ; position: absolute; bottom: 30%;">
      <div class="mBottom-10" style="display: flex; justify-content: space-between; align-items: center; height: 40px; border-bottom:1px solid black; padding: 5px;  border-radius: 50px 0.5rem 0 0; margin: 0 10px;">
        <p class="fontBold">설정</p>
        <img class="cursorP" src="@/assets/images/common/MKCloseIcon.svg" alt="닫기" width="20" height="20" @click="closeSetOnOff"/>
      </div>
      <div style="padding: 5px 15px;">
        <div v-for="input, index in mTodoInputList" :key="index" class="w100P fl fontBold" :class="input.title==='내용'? 'mTop-10':'mBottom-20'" style="height:30px; padding: 5px; display: flex; align-items: center;" :style="input.type === $gMKConst.VALUE_TAG_TYPE_SELECT? 'width:50%':'width:100%'">
          <p class="" style="width:60px; font-size: 14px;" :style="input.type === $gMKConst.VALUE_TAG_TYPE_SELECT? 'margin-right:10px':''">{{ input.title }} </p>
          <div style="width:calc(100% - 60px)">
            <gInput class=" MKCommonInput" :pInputInfo="input" />
          </div>
        </div>
      </div>
    </div>  -->
    <!-- <footer>
      <gBtn v-for="(btn, index) in mBtnList" :key="index" :pBtnInfo="btn" :style="index > 0 ? 'margin-left: 10px;' : ''" style="min-width: 80px; background-color: white;"/>
    </footer>  -->
  </div>
</template>
<script>
import MKAppSetTodoPop from '../../../components/pageComponents/todo/MKAppSetTodoPop.vue'
import MKAppAddNewTodoPop from '../../../components/pageComponents/todo/MKAppAddNewTodoPop.vue'
// import MKAppDelRecentConfirmPop from '../../../components/pageComponents/todo/MKAppDelRecentConfirmPop.vue'

export default {
  props: {
    pClosePop: Function,
    pSelectDate: {},
    pSetCountDate: {},
    pGetTodoList: Function
  },
  components: {
    MKAppSetTodoPop,
    MKAppAddNewTodoPop
    // MKAppDelRecentConfirmPop
  },
  created () {
    this.mTodoInputList[2].options = [{ opt: this.$gChangeText(this.GE_USER.userDispMtext), value: this.GE_USER.userKey }]
    this.mTodoInputList[2].value = this.GE_USER.userKey
    this.getCabinetListByUser()
    this.getSelectTodoDetail()
  },
  data () {
    return {
      mAddCabConfirm: false,
      mSetTodoPopShowYn: false,
      mAddNewTodoPopShowYn: false,
      mdelRecentTodoPopShowYn: false,
      setOnOff: false,
      mSelectRecent: {},
      mSelectTodo: {},
      mChalCardPopup: { title: '할 일 추가', closeFn: this.pClosePop, size: { w: 400, h: 'auto' }, btnList: [{ btnText: '닫기', onClickFn: this.pClosePop }], isFull: false, isConfirm: false },
      mTodoList: [{ title: '청소하기', todoType: 'H' }, { title: '분리수거', todoType: 'H' }, { title: '빨래하기', todoType: 'H' }, { title: '장보기', todoType: 'H' }, { title: '식사당번', todoType: 'H' }, { title: '설거지하기', todoType: 'H' }, { title: '화장실청소', todoType: 'H' }, { title: '쓰레기버리기', todoType: 'H' }],
      mRecentList: [],
      mRecentTodoList: [],
      mCompleteHomeTodoList: [],
      mBtnList: [{ btnText: '추가', onClickFn: this.saveTodo, deepYn: true, pointYn: true }, { btnText: '닫기', onClickFn: this.pClosePop }],
      mSelectHouseInput: { title: '담당자', type: this.$gMKConst.VALUE_TAG_TYPE_SELECT, value: 'U', options: [{ opt: '나(본인)', value: 'U' }] },
      mTodoInputList: [
        { title: '일감 명', type: this.$gMKConst.VALUE_TAG_TYPE_INPUT_TEXT, value: null, placeholder: '일감 명을 입력해주세요.' },
        { title: '유형', type: this.$gMKConst.VALUE_TAG_TYPE_SELECT, value: 'A', options: [{ opt: '선택', value: 'A' }, { opt: 'HouseWork', value: 'H' }, { opt: 'Work', value: 'T' }, { opt: 'Self-Improvement', value: 'S' }, { opt: 'etc', value: 'E' }] },
        { title: '담당자', type: this.$gMKConst.VALUE_TAG_TYPE_SELECT, value: null, options: [] },
        { title: '내용', type: this.$gMKConst.VALUE_TAG_TYPE_TEXTAREA, value: null }
      ],
      mSelectDate: '',
      mCabiList: {},
      mFamilyList: []
    }
  },
  methods: {
    async getCabinetListByUser () {
      const param = { userKey: this.GE_USER.userKey, sysCabinetCode: 'USER' }
      const result = await this.$gHTTPfunctions.getCabinetListByUser(param)
      if (result.data.result) {
        console.log(result)
        this.mCabiList = result.data.cabinet
        const mGetCabiList = result.data.cabinet
        console.log(mGetCabiList)
        const familyList = [{ opt: '나(본인)', value: 'U' }]
        for (let i = 0; i < mGetCabiList.length; i++) {
          if (mGetCabiList[i].houseKey) {
            familyList.push({ opt: mGetCabiList[i].cabinetNameMtext, value: mGetCabiList[i].cabinetKey })
          }
        }
        this.mSelectHouseInput.options = familyList
        this.mSelectHouseInput.value = familyList[0].value
      }
    },
    async getSelectTodoDetail () {
      const param = {}
      param.userKey = this.GE_USER.userKey
      param.searchDate = this.getDate(1)
      const result = await this.$gHTTPfunctions.getSelectTodoDetail(param)
      if (result.data.result) {
        console.log(result)
        this.mCompleteHomeTodoList = result.data.todo.houseWork
        this.mRecentTodoList = result.data.todo.recent
        const mRecentUList = []
        for (let i = 0; i < this.mCompleteHomeTodoList.length; i++) {
          for (let j = 0; j < this.mTodoList.length; j++) {
            if (this.mCompleteHomeTodoList[i].title === this.mTodoList[j].title) {
              this.mTodoList[j] = this.mCompleteHomeTodoList[i]
            }
          }
        }
        console.log(this.mTodoList)
        for (let i = 0; i < this.mRecentTodoList.length; i++) {
          if (this.mRecentTodoList[i].targetKind === 'U') {
            mRecentUList.push(this.mRecentTodoList[i])
          }
        }
        console.log(mRecentUList)
        this.mRecentList = mRecentUList
      }
    },
    async saveTodo (value) {
      const param = { todo: {} }
      param.todo.title = value.title
      param.todo.comment = value.comment
      param.todo.todoType = value.todoType
      if (this.mSelectHouseInput.value === 'U') {
        param.todo.targetKind = 'U'
        param.todo.targetKey = this.GE_USER.userKey
      } else {
        param.todo.targetKind = 'C'
        param.todo.targetKey = this.mSelectHouseInput.value
      }
      param.todo.status = '00'
      param.todo.todoDate = this.getDate(1)
      param.todo.todoUserKey = value.todoUserKey
      param.todo.creUserKey = this.GE_USER.userKey
      const result = await this.$gHTTPfunctions.saveTodo(param)
      if (result.data.resultMsg === 'OK') {
        console.log(result)
        console.log(this.pClosePop)
        console.log(this.pGetTodoList)
        if (this.pClosePop) {
          this.pClosePop()
        }
        if (this.pGetTodoList) {
          this.pGetTodoList()
        }
      }
    },
    openSetOnOff (value) {
      this.mSelectTodo = value
      this.mTodoInputList[0].value = value.title
      if (value !== 'new') {
        this.mTodoInputList[1].value = value.todoType
        this.mTodoInputList[2].value = value.targetKey
      }
      this.mTodoInputList[3].value = value.comment
      console.log(value)
      this.setOnOff = true
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
    getDate (value) { // -1:day-1, 0:day, 1:day+1
      let todayDate = ''
      const date = new Date(this.pSelectDate)
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
    closeSetOnOff () {
      this.setOnOff = false
    },
    openDelRecentTodo (index) {
      this.mSelectRecent = this.mRecentList[index]
      this.mdelRecentTodoPopShowYn = true
    },
    closeDelRecentTodo () {
      this.mdelRecentTodoPopShowYn = false
    },
    openAddNewTodoPop () {
      this.mAddNewTodoPopShowYn = true
    },
    closeAddNewTodoPop () {
      this.mAddNewTodoPopShowYn = false
    },
    openSetTodoPop () {
      this.mSetTodoPopShowYn = true
    },
    closeSetTodoPop () {
      this.mSetTodoPopShowYn = false
    }
  },
  computed: {
    GE_USER () {
      const userInfo = this.$gGetSetFunctions.getUserInfo()
      return userInfo
    }
  },
  watch: {
    mSelectHouseInput: {
      immediate: true,
      handler (val) {
        if (!val) return
        this.setOnOff = false
        if (val.value === 'U') {
          this.mTodoInputList[2].options = [{ opt: this.$gChangeText(this.GE_USER.userDispMtext), value: this.GE_USER.userKey }]
          this.mTodoInputList[2].value = this.GE_USER.userKey
          this.mFamilyList = [{ opt: this.$gChangeText(this.GE_USER.userDispMtext), value: this.GE_USER.userKey }]
          const mRecentUList = []
          for (let i = 0; i < this.mRecentTodoList.length; i++) {
            if (this.mRecentTodoList[i].targetKind === 'U') {
              mRecentUList.push(this.mRecentTodoList[i])
            }
          }
          this.mRecentList = mRecentUList
        } else {
          const cabUserList = []
          for (let i = 0; i < this.mCabiList.length; i++) {
            if (this.mCabiList[i].cabinetKey === val.value) {
              console.log(this.mCabiList[i].mCabUserList)
              for (let j = 0; j < this.mCabiList[i].mCabUserList.length; j++) {
                if (this.mCabiList[i].mCabUserList[j].ownerYn) {
                  if (!this.mCabiList[i].mCabUserList[j].dispMtext) {
                    cabUserList.push({ opt: '만끽이', value: this.mCabiList[i].mCabUserList[j].userKey })
                  } else {
                    cabUserList.push({ opt: this.$gChangeText(this.mCabiList[i].mCabUserList[j].dispMtext), value: this.mCabiList[i].mCabUserList[j].userKey })
                  }
                } else {
                  cabUserList.push({ opt: this.$gChangeText(this.mCabiList[i].mCabUserList[j].dispMtext), value: this.mCabiList[i].mCabUserList[j].userKey })
                }
              }
            }
          }
          this.mFamilyList = cabUserList
          console.log(cabUserList)
          this.mTodoInputList[2].options = cabUserList
          const mRecentCList = []
          for (let i = 0; i < this.mRecentTodoList.length; i++) {
            if (this.mRecentTodoList[i].targetKind === 'C' && val.value === this.mRecentTodoList[i].targetKey) {
              mRecentCList.push(this.mRecentTodoList[i])
            }
          }
          this.mRecentList = mRecentCList
        }
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
  .appUsingButton{
  right:0px !important;
  background-color: rgba(240,242,249)  !important;
}
.appUsingButton.appBtn::after{
  left:67px !important;
  background-color:#003a8e ;
}
.eachApp{
  width:100px;
  height:40px;
  position:relative;
  border-radius:10px;
}
.appBtn{
  border-radius:20px;
  position:absolute;
  top:0;
  width:100px;
  height:40px;
  background-color:#003a8e;
  transition:all .3s;
}
.appBtn::after{
  content:'';
  display:block;
  width:25px;
  height:25px;
  border-radius:50%;
  position:absolute;
  top:7px;
  left:7px;
  background-color:rgba(240,242,249) ;
  transition:left .3s;
}
  footer {
  /* border-top: 1px solid #000; */
  height: 50px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}
.scroll::-webkit-scrollbar {
  display: none;
}
.scroll {
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
}

</style>
