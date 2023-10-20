<template>
  <!-- <selectBookList v-if="selectBookListShowYn" :chanInfo="CHANNEL_DETAIL" :propData="mPropData" :pClosePop="closeSelectPop" @closeXPop="selectBookListShowYn = false" :selectPopYn="true" @sendReceivers='setSelectedList' :pSelectedList="selectedList" /> -->
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
              <option v-for="family, index in input.options" :key="index" :value="family.value">{{ $changeText(family.opt)}}</option>
            </select>
            <select v-else-if="input.title === 'Team' && !editYn" style="width: calc(100% - 80px); height: 30px;" v-model="mTodoTeam" @change="changeFamily">
              <option v-for="family, index in input.options" :key="index" :value="family.value">{{ $changeText(family.opt)}}</option>
            </select>
            <div v-else-if="input.title === 'Team' && editYn" style="padding: 0 5px; font-size: 14px; color: #303030;">{{ mTodoTeam }}</div>
            <!-- <div v-if="input.title === 'Member'" class="fl w100P textLeft " @click="openPushReceiverSelect" style="width: calc(100% - 80px);  border:1px solid #ccc; border-radius:5px; min-height: 30px; background: white; padding-left: 5px; display: flex; justify-content: space-between; align-items: center;">
              <div v-if="this.receiverList.list && this.receiverList.list.length > 0" class="fl w100P">
                <div v-for="(value, index) in this.receiverList.list" :key="index" class="fl mright-1" style="display: flex;">
                  <img v-if="value.type === 'BOOK' && !value.memberYn" class="img-w15 fl" src="../../../assets/images/todo/channer_addressBook.svg" alt="">
                  <img v-if="value.type === 'BOOK' && value.memberYn" class="img-w15 fl" src="../../../assets/images/todo/memberIcon.svg" alt="">
                  <img v-if="value.type === 'USER'" class="img-w15 fl" src="../../../assets/images/todo/icon_people.svg" alt="">
                  <p class="fl font14 mleft-01 commonDarkGray">{{value.name}}</p>
                </div>
              </div>
              <p class='font12 fl' style="color:#aaa; " v-else >대상을 선택해주세요.</p>
              <img class="fr img-w17 mright-05"  src="../../../assets/images/todo/icon_formEditPlus.svg" @click="showSelectBookPop('select')"/>
            </div> -->
            <select v-else-if="input.title === 'Tag'" style="width: calc(100% - 80px); height: 30px;" v-model="mTodoCate">
              <option v-for="opt, index in input.options" :key="index" :value="opt.value">{{opt.opt}}</option>
            </select>
            <div v-else-if="input.title === 'Contents'" style="width:  calc(100% - 80px); ">
              <textarea v-model="mTodoComment" style="width: 100%; border-radius: 5px; border:1px solid #aaa; resize: none;"></textarea>
            </div>
            <div v-else-if="input.title === 'Date'" style="width:  calc(100% - 80px); ">
              <input type="date" v-model="mTodoDate" style="width:100%; height: 30px;"/>
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
// import selectBookList from '../../../components/pageComponents/channel/popup/editBoard/selectbooklist.vue'

export default {
  props: {
    pSelectTodo: {},
    pFamilyList: {},
    pSaveTodo: Function,
    pUpdateTodo: Function,
    pGetTodoListGroupCab: Function,
    pClosePop: Function,
    pGetTodoDetail: Function,
    pGetTodoFamilyList: [],
    pGetCabiList: []
  },
  components: {
    // selectBookList
  },
  data () {
    return {
      mContsList: [],
      familyList: [],
      mTodoInputList: [
        { title: 'Title', value: null, placeholder: '일감 명을 입력해주세요.' },
        { title: 'Date', value: null, placeholder: '일감 명을 입력해주세요.' },
        { title: 'Team', value: null, options: [] },
        { title: 'Member', value: null, options: [] },
        { title: 'Tag', value: 'A', options: [{ opt: 'Select', value: 'A' }, { opt: 'HouseWork', value: 'H' }, { opt: 'Work', value: 'T' }, { opt: 'Self-Improvement', value: 'S' }, { opt: 'etc', value: 'E' }] },
        { title: 'Contents', value: null }
      ],
      mBtnList: [{ btnTitle: 'Add', click: this.saveTodo }, { btnTitle: 'Close', click: this.pClosePop }],
      mTodoManager: '',
      mTodoCate: 'A',
      mTodoComment: '',
      mTodoTeam: '',
      mTodoTitle: '',
      receiverList: [],
      selectBookListShowYn: false,
      chanProps: {},
      mTodoDate: '',
      mPropData: [],
      myFamilyList: [],
      editYn: false
    }
  },
  created () {
    if (this.pFamilyList) {
      this.familyList = this.pFamilyList
      this.mTodoManager = this.pFamilyList[0].value
      this.mPropData.initData = this.pFamilyList
      this.mTodoInputList[3].options = this.pFamilyList
      this.mTodoManager = this.pFamilyList[0].value
    }
    if (this.pSelectTodo) {
      this.editYn = true
      this.mTodoTeam = this.pSelectTodo.cabinetNameMtext
      this.mTodoTitle = this.pSelectTodo.title
      this.mTodoDate = this.changeDate(this.pSelectTodo.todoDate)
      this.mTodoCate = this.pSelectTodo.todoType
      console.log(this.pSelectTodo.todoDate)
      console.log(this.mTodoDate)
    }
    if (this.pUpdateTodo) {
      this.mTodoComment = this.pSelectTodo.comment
      this.mBtnList = [{ btnTitle: 'Edit', click: this.updateTodo }, { btnTitle: 'Close', click: this.pClosePop }]
    }
    if (this.mTodoDate === '') {
      this.mTodoDate = this.todayDate()
    }
    if (this.pGetTodoFamilyList) {
      this.getMyCabinetList(this.pGetTodoFamilyList)
    }
    console.log(this.pGetTodoFamilyList)
    console.log(this.pFamilyList)
    console.log(this.pSelectTodo)
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
          todoSet.todoDate = this.mTodoDate
          if (this.mTodoTeam === 'U') {
            todoSet.targetKind = 'U'
            todoSet.targetKey = this.GE_USER.userKey
          } else {
            todoSet.targetKind = 'C'
            todoSet.targetKey = this.mTodoTeam
          }
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
          if (this.pClosePop) {
            await this.pClosePop()
          }
          if (this.pUpdateTodo) {
            await this.pUpdateTodo(todoSet)
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
    changeFamily () {
      // this.getSelectTodoDetail()
      console.log(this.mTodoTeam)
      if (this.mTodoTeam === 'U') {
        this.mFamilyList = [{ opt: this.$changeText(this.GE_USER.userDispMtext), value: this.GE_USER.userKey }]
      } else {
        const cabUserList = []
        for (let i = 0; i < this.pGetTodoFamilyList.length; i++) {
          if (this.pGetTodoFamilyList[i].cabinetKey === this.mTodoTeam) {
            console.log(this.pGetTodoFamilyList[i].mCabUserList)
            for (let j = 0; j < this.pGetTodoFamilyList[i].mCabUserList.length; j++) {
              console.log(this.pGetTodoFamilyList[i].mCabUserList)
              if (this.pGetTodoFamilyList[i].mCabUserList[j].ownerYn) {
                if (!this.pGetTodoFamilyList[i].mCabUserList[j].dispMtext) {
                  cabUserList.push({ opt: '만끽이', value: this.pGetTodoFamilyList[i].mCabUserList[j].userKey })
                } else {
                  cabUserList.push({ opt: this.$changeText(this.pGetTodoFamilyList[i].mCabUserList[j].userDispMtext), value: this.pGetTodoFamilyList[i].mCabUserList[j].userKey })
                }
              } else {
                cabUserList.push({ opt: this.$changeText(this.pGetTodoFamilyList[i].mCabUserList[j].userDispMtext), value: this.pGetTodoFamilyList[i].mCabUserList[j].userKey })
              }
            }
          }
        }
        this.mFamilyList = cabUserList
      }
      console.log(this.mFamilyList)
      this.mTodoInputList[3].options = this.mFamilyList
      this.mTodoManager = this.mFamilyList[0].value
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
    todayDate () {
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
    },
    changeDate (value) {
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
      todayDate = year + '-' + month + '-' + day
      return todayDate
    },
    async showSelectBookPop (type) {
      var param = {}
      param.targetType = 'selectBookList'
      // param.param = selectListParamMap
      var initData = this.pGetTodoFamilyList
      this.mPropData.initData = initData
      this.selectBookListShowYn = true
    },
    async getMyCabinetList (value) {
      if (value) {
        const mGetCabiList = value
        console.log(mGetCabiList)
        const familyList = [{ opt: '나(본인)', value: 'U' }]
        for (let i = 0; i < mGetCabiList.length; i++) {
          if (mGetCabiList[i].cabinetKey) {
            familyList.push({ opt: this.$changeText(mGetCabiList[i].cabinetNameMtext), value: mGetCabiList[i].cabinetKey })
          }
        }
        this.myFamilyList = familyList
        this.mFamilyList = [{ opt: this.$changeText(this.GE_USER.userDispMtext), value: this.GE_USER.userKey }]
        this.mTodoInputList[2].options = familyList
        this.mTodoTeam = familyList[0].value
        this.mTodoInputList[3].options = this.mFamilyList
        this.mTodoManager = this.mFamilyList[0].value
      }
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    }
  }
}
</script>
<style scoped>
.chanInfoBoxWrap {
  width: 70% !important;
  height: 400px !important;
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
