<template>
  <div class="chanInfoBoxWrap">
    <div class="modiMemoPopBg" v-if="mSetPopShowYn" @click="closeSetPop"></div>
    <setPop
      v-if="mSetPopShowYn"
      :pClosePop="closeSetPop"
      :pSelectTodo="mSelectTodo"
      :pSaveTodo="saveTodo"
      :pFamilyList="mFamilyList"
      :pGetTodoFamilyList="pGetTodoFamilyList"
      :pGetCabiList="mGetCabiList"
      style="z-index: 999"
    />
    <div
      class="popBgWrite"
      v-if="mTheAlimWritePopShowYn"
      @click="closeTheAlimWrite"
    ></div>
    <todoWriteContents
      v-if="mTheAlimWritePopShowYn"
      :pClosePop="closeTheAlimWrite"
      :contentType="'TODO'"
      @closeXPop="closeTheAlimWrite"
    />
    <!-- <writeContents class="writeContentsPop" v-if="boardWriteYn"  ref="chanAlimListWritePushRefs" @successWrite="successWriteBoard" @successSave="getContentsList" :contentType="currentPushListMainTab === 'P' ? 'ALIM' : 'BOAR'" @closeXPop='closeWriteBoardPop' :propData="boardWriteData" :params="boardWriteData"  @openPop='openItem' :changeMainTab='changeMainTab' @toAlimFromBoard='toAlimFromBoard' :propParams="boardWriteData" /> -->
    <gPopHeader :headerTitle="'Add'" :pClosePop="pClosePop" />
    <!-- <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 15px 0; width:100%; margin-top: 50px; ">
        <p class="fontBold commonSubTitleTextBold">{{ topDate() }}</p>
        <div style="display: flex; align-items: center; justify-content: center;">
          <p class="fontBold " style="font-size: 14px; margin-right: 5px;">Team</p>
          <select style="max-width: 90px" v-model="mSelectFamily" @change="changeFamily">
            <option v-for="family, index in myFamilyList" :key="index" :value="family.value">{{ $changeText(family.opt)}}</option>
          </select>
        </div>
      </div> -->
    <div
      class=""
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 5px 5px;
        margin: 0px 10px;
        margin-top: 50px;
      "
    >
      <p class="fontBold">Recent Todo</p>
      <div style="display: flex; justify-content: center; align-items: center">
        <div
          class="cursorP fontBold CDeepBgColor"
          style="
            color: white;
            width: 60px;
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            border-radius: 20px;
            margin-right: 5px;
          "
          @click="openTheAlimWrite()"
        >
          Uni_New
        </div>
        <div
          class="cursorP fontBold CDeepBgColor"
          style="
            color: white;
            width: 60px;
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            border-radius: 20px;
          "
          @click="openSetPop('new')"
        >
          New
        </div>
      </div>
    </div>
    <div
      v-if="mRecentList.length === 0"
      class="fontBold"
      style="
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100% - 300px);
      "
    >
      There are no recent todo.
    </div>
    <div
      v-else
      class="w100P fl scroll"
      style="
        padding: 0 10px 10px;
        overflow: hidden auto;
        height: calc(100% - 120px);
      "
    >
      <div
        v-for="(todo, index) in mRecentList"
        :key="index"
        class="cursorP"
        style="
          border: 1px solid #acacac;
          background-color: white;
          border-radius: 0.5rem;
          height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
          margin-top: 5px;
        "
        @click="openSetPop(todo)"
      >
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <p class="fontBold fl commonTitleText" style="margin-right: 5px">
            {{ todo.title }}
          </p>
          <p class="fl" style="font-size: 12px">
            ({{ $changeText(todo.todoUserName) }})
          </p>
        </div>
        <div class="MKAppUsingAppToggle" style="text-align: right">
          <div class="mRight-05" style="display: flex; flex-direction: column">
            <div class="" style="text-align: right">
              <!-- <p v-if="todo.completeDate" class=" fr" style="font-size: 10px; text-align: right;">({{ $gChangeText(todo.completeUserName) }})</p> -->
              <p class="fr" style="font-size: 10px; text-align: right">
                {{ changeTypeToText(todo.todoType) }}
              </p>
            </div>
            <p v-if="todo.completeDate" style="font-size: 10px">
              {{ top1Date(todo.completeDate) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import setPop from './setPop.vue'
import todoWriteContents from './todoWriteContents.vue'

export default {
  props: {
    pSelectDate: {},
    pGetTodoFamilyList: [],
    pGetTodoListGroupCab: Function,
    pClosePop: Function
  },
  components: {
    setPop,
    todoWriteContents
  },
  data() {
    return {
      mContsList: [],
      mSetPopShowYn: false,
      myFamilyList: [],
      mFamilyList: [],
      mSelectFamily: 'U',
      mRecentTodoList: [],
      mRecentList: [],
      mTheAlimWritePopShowYn: false
    }
  },
  created() {
    this.getMyCabinetList(this.pGetTodoFamilyList)
    this.getSelectTodoDetail(true)
  },
  methods: {
    openTheAlimWrite() {
      this.mTheAlimWritePopShowYn = true
    },
    closeTheAlimWrite() {
      this.mTheAlimWritePopShowYn = false
    },
    async getSelectTodoDetail(loadingYn) {
      var paramMap = {}
      if (this.mSelectFamily === 'U') {
        paramMap.userKey = this.GE_USER.userKey
      } else {
        paramMap.targetKey = this.mSelectFamily
      }
      paramMap.searchDate = this.getDate(1)
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var resultList = await this.$getSelectTodoDetail(paramMap, nonLoading)
      if (resultList.result) {
        this.mRecentTodoList = resultList.todo.recent
        const mRecentUList = []
        for (let i = 0; i < this.mRecentTodoList.length; i++) {
          mRecentUList.push(this.mRecentTodoList[i])
        }
        console.log(mRecentUList)
        this.mRecentList = mRecentUList
      }
    },
    async getMyCabinetList(value) {
      if (value) {
        const mGetCabiList = value
        console.log(mGetCabiList)
        const familyList = [{ opt: '나(본인)', value: 'U' }]
        for (let i = 0; i < mGetCabiList.length; i++) {
          if (mGetCabiList[i].cabinetKey) {
            familyList.push({
              opt: this.$changeText(mGetCabiList[i].cabinetNameMtext),
              value: mGetCabiList[i].cabinetKey
            })
          }
        }
        this.myFamilyList = familyList
        this.mFamilyList = [
          {
            opt: this.$changeText(this.GE_USER.userDispMtext),
            value: this.GE_USER.userKey
          }
        ]
        this.mSelectFamily = 'U'
      }
    },
    async saveTodo(value, loadingYn) {
      const param = { todo: {} }
      param.todo.title = value.title
      param.todo.comment = value.comment
      param.todo.todoType = value.todoType
      param.todo.targetKind = value.targetKind
      param.todo.targetKey = value.targetKey
      param.todo.status = '00'
      param.todo.todoDateStr = value.todoDate
      param.todo.todoUserKey = value.todoUserKey
      param.todo.creUserKey = this.GE_USER.userKey
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var result = await this.$saveTodo(param, nonLoading)
      console.log(result)
      if (result.resultMsg === 'OK') {
        console.log(result)
        console.log(this.pClosePop)
        console.log(this.pGetTodoList)
        if (this.pClosePop) {
          this.pClosePop()
        }
        if (this.pGetTodoListGroupCab) {
          this.pGetTodoListGroupCab()
        }
      }
    },
    changeFamily() {
      this.getSelectTodoDetail()
      if (this.mSelectFamily === 'U') {
        this.mFamilyList = [
          {
            opt: this.$changeText(this.GE_USER.userDispMtext),
            value: this.GE_USER.userKey
          }
        ]
        const mRecentUList = []
        for (let i = 0; i < this.mRecentTodoList.length; i++) {
          if (this.mRecentTodoList[i].targetKind === 'U') {
            mRecentUList.push(this.mRecentTodoList[i])
          }
        }
        this.mRecentList = mRecentUList
      } else {
        const cabUserList = []
        console.log(this.myFamilyList)
        for (let i = 0; i < this.pGetTodoFamilyList.length; i++) {
          if (this.pGetTodoFamilyList[i].cabinetKey === this.mSelectFamily) {
            console.log(this.pGetTodoFamilyList[i].mCabUserList)
            for (
              let j = 0;
              j < this.pGetTodoFamilyList[i].mCabUserList.length;
              j++
            ) {
              console.log(this.pGetTodoFamilyList[i].mCabUserList)
              if (this.pGetTodoFamilyList[i].mCabUserList[j].ownerYn) {
                if (!this.pGetTodoFamilyList[i].mCabUserList[j].dispMtext) {
                  cabUserList.push({
                    opt: '만끽이',
                    value: this.pGetTodoFamilyList[i].mCabUserList[j].userKey
                  })
                } else {
                  cabUserList.push({
                    opt: this.$changeText(
                      this.pGetTodoFamilyList[i].mCabUserList[j].userDispMtext
                    ),
                    value: this.pGetTodoFamilyList[i].mCabUserList[j].userKey
                  })
                }
              } else {
                cabUserList.push({
                  opt: this.$changeText(
                    this.pGetTodoFamilyList[i].mCabUserList[j].userDispMtext
                  ),
                  value: this.pGetTodoFamilyList[i].mCabUserList[j].userKey
                })
              }
            }
          }
        }
        this.mFamilyList = cabUserList
        const mRecentCList = []
        console.log(this.mRecentTodoList)
        for (let i = 0; i < this.mRecentTodoList.length; i++) {
          if (
            this.mRecentTodoList[i].targetKind === 'C' &&
            this.mSelectFamily === this.mRecentTodoList[i].targetKey
          ) {
            mRecentCList.push(this.mRecentTodoList[i])
          }
        }
        this.mRecentList = mRecentCList
      }
    },
    getDate(value) {
      // -1:day-1, 0:day, 1:day+1
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
    top1Date(value) {
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
      todayDate =
        date.toLocaleString('en-US', { month: 'short' }) +
        ' ' +
        day +
        ', ' +
        year
      return todayDate
    },
    topDate() {
      let todayDate = ''
      const date = new Date(this.pSelectDate)
      const year = date.getFullYear()
      let month = date.getMonth() + 1 + ''
      let day = date.getDate() + ''
      console.log(date.toLocaleString('en-US', { month: 'short' }))
      if (month.length === 1) {
        month = '0' + month
      }
      if (day.length === 1) {
        day = '0' + day
      }
      todayDate =
        date.toLocaleString('en-US', { month: 'short' }) +
        ' ' +
        day +
        ', ' +
        year
      return todayDate
    },
    changeTypeToText(value) {
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
    openSetPop(value) {
      this.mSelectTodo = value
      this.mSetPopShowYn = true
    },
    closeSetPop() {
      this.mSetPopShowYn = false
    }
  },
  computed: {
    GE_USER() {
      return this.$store.getters['UB_USER/GE_USER']
    }
  }
}
</script>
<style scoped>
.chanInfoBoxWrap {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99999;
  padding: 0px 20px;
  padding-bottom: 0;
  float: left;
  background-color: #fff;
}
.commonSubTitleTextBold {
  font-size: 15px;
}
.modiMemoPopBg {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #00000026;
  z-index: 12;
  top: 0;
  left: 0;
}
.popBgWrite {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100000;
  background: #00000050;
}
</style>
