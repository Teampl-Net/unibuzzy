<template>
    <div v-if="setYn" class="DframeView" style="padding: 10px 10px;">
        <p v-if="mSearchDate " class="textLeft mleft-05 font18 commonColor fontBold">{{ $dayjs(mSearchDate).format('YYYY-MM-DD') }}</p>
        <div style="width: 100%; height: calc(100% - 50px); overflow: hidden auto;">
            <template v-for="(pGroup, pGroupIndex) in GE_DISP_LIST" :key="pGroupIndex">
                <template v-if="pGroup.list.content.length > 0 && (pGroupIndex === 3 || (pGroupIndex === 2 && mRefTodoCount !== 0) || (pGroupIndex === 0 && mMyTodoCount !== 0) || ((pGroupIndex === 1 && mCheckTodoCount !== 0)))">
                <div
                    :id="`todoGroup${pGroupIndex}`"
                    class="fontBold"
                    style="
                    text-align: left;
                    padding: 5px 15px;
                    padding-bottom: 0;
                    display: flex;
                    align-items: center;
                    "
                >
                    <img
                    src="../../../public/resource/menu/icon_board_color.svg"
                    width="20"
                    style="margin-right: 5px"
                    />
                    <p style="font-size: 18px; color: #060505 !important">
                    {{pGroup.listName}}<!--  ({{ pGroup.list.totalElements }}) -->
                    </p>
                </div>
                <div style="padding: 5px 10px;">
                    <div
                    class="backShadow"
                    style="
                        padding: 10px;
                        background: #fff;
                        border-radius: 10px;
                        border-left: 10px solid rgb(109 109 109);
                    "
                    :style="(pGroup.listName === this.$t('COMMON_TODO_MYTODO') ? 'border-left: 10px solid rgb(247 161 120);' : ';') + (pGroup.listName === this.$t('COMMON_TODO_CHECK')? 'border-left: 10px solid rgb(99 203 223);' : ';') + (pGroup.listName === this.$t('COMMON_TODO_PUBLIC')? 'border-left: 10px solid rgb(198, 106, 106);' : ';')"
                    >
                    <template v-for="(todo, todoIndex) in pGroup.list.content" :key="todo.contentsKey" >
                        <todoContentsBox :pTodoElement="todo" :pTodoIndex="todoIndex" :pOpenDetail="goDetail" :pGroupIndex="pGroupIndex" :pGroup="pGroup" />
                    </template>
                    </div>
                </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import todoContentsBox from '@/pages/routerPages/D_todoContentsBox.vue'
export default {
  data () {
    return {
      mJobkindId: '',
      mSearchDate: '',
      mUserKey: '',
      setYn: false,
      /* jobkindId === TODO */
      mTodoTargetGroup: {},
      mMyMemoList: { totalElements: 0, content: [] },
      mMyTodoList: { totalElements: 0, content: [] },
      mCheckTodoList: { totalElements: 0, content: [] },
      mCompTodoList: { totalElements: 0, content: [] },
      mRefTodoList: { totalElements: 0, content: [] }
    }
  },
  components: {
    todoContentsBox
  },
  methods: {
    viewPage () {
      if (this.mJobkindId === 'TODO') {
        this.getMyTodoList()
      }
    },
    goDetail (data) {
      if (window.parent) {
        window.parent.postMessage(JSON.stringify({ req: 'OPEN_CONT_DETAIL', content: data }), '*')
      }
    },
    replaceArr (arr) {
      // var this_ = this
      if (!arr && arr.length === 0) return []
      var uniqueArr = arr.reduce(function (data, current) {
        if (
          data.findIndex(
            (item) => Number(item.contentsKey) === Number(current.contentsKey)
          ) === -1
        ) {
          /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          data.push(current)
        }
        // data = data.sort(function (a, b) {
        //   return b.contentsKey - a.contentsKey
        // })
        return data
      }, [])
      return uniqueArr
    },
    async getMyTodoList (orderbyStr) {
      this.mSkeletonShowYn = true
      const param = {
        userKey: this.mUserKey,
        jobkindId: 'TODO',
        todoType: 'A',
        searchFromDateStr: this.mSearchDate,
        searchToDateStr: this.mSearchDate,
        nowDateStr: this.$dayjs(new Date()).format('YYYY-MM-DD'),
        orderbyStr: 'sk.nameMtext, c.contStatus, c.priority, c.workToDate DESC',
        pageSize: 100
      }
      if (orderbyStr) {
        param.orderbyStr = orderbyStr
      }
      const myContents = await this.$commonAxiosFunction(
        {
          url: '/sUniB/tp.getMyTodoList',
          param: param
        },
        false
      )
      this.mMyMemoList = { totalElements: 0, content: [] }
      this.mMyTodoList = { totalElements: 0, content: [] }
      this.mCheckTodoList = { totalElements: 0, content: [] }
      this.mCompTodoList = { totalElements: 0, content: [] }
      this.mRefTodoList = { totalElements: 0, content: [] }
      if (myContents.data) {
        this.mListEmptyYn = false
        this.mMyMemoList = myContents.data.memo
        try {
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', this.mMyMemoList.content)
        } catch (error) {
        }

        let conts = this.replaceArr(myContents.data.myTodo && myContents.data.myTodo.content ? myContents.data.myTodo.content : [])
        if (!myContents.data.myTodo) {
          myContents.data.myTodo = {}
        }
        this.mRefTodoList = { totalElements: 0, content: [] }
        if (conts && conts.length > 0) {
          const returnList = this.splitList(conts)
          if (returnList.my) {
            this.mMyTodoList = { content: returnList.my }
          }
          if (returnList.check) {
            this.mCheckTodoList = { content: returnList.check }
          }
          if (returnList.ref) {
            this.mRefTodoList = { content: returnList.ref }
          }
        }
        conts = this.replaceArr(myContents.data.compTodo && myContents.data.compTodo.content ? myContents.data.compTodo.content : [])
        if (!myContents.data.compTodo) {
          myContents.data.compTodo = {}
        }
        myContents.data.compTodo.content = conts
        this.mCompTodoList = myContents.data.compTodo
        if (!this.mCompTodoList.totalElements) this.mCompTodoList.totalElements = 0
      }
      const allList = [...this.mMyTodoList.content, ...this.mCheckTodoList.content, ...this.mRefTodoList.content, ...this.mCompTodoList.content]
      try {
        this.$store.dispatch(
          'D_CHANNEL/AC_ADD_CONTENTS',
          allList
        )
      } catch (error) {
        console.log(error)
      } finally {
        this.setYn = true
      }
      // }
    },
    splitList (todoList) {
      if (!todoList || todoList.length === 0) return []
      const returnMyTodoList = []
      const returnCheckTodoList = []
      const returnRefTodoList = []
      todoList.forEach(todo => {
        if (todo.contStatus !== '99' && todo.actorList) {
          let myTodoYn = false
          let checkTodoYn = false
          let refTodoYn = false
          for (let i = 0; i < todo.actorList.length; i++) {
            const actor = todo.actorList[i]

            if (actor.accessKind === 'U' && actor.accessKey === this.mUserKey) {
              if (actor.actType === 'RV') {
                myTodoYn = true
                break
              } else if (actor.actType === 'CK') {
                checkTodoYn = true
              } else if (actor.actType === 'RF') {
                refTodoYn = true
              }
            } else if (actor.accessKind === 'C') {
              let haveYn = false
              if (actor.mUserList) {
                actor.mUserList.forEach(user => {
                  if (user.userKey === this.mUserKey) {
                    haveYn = true
                  }
                })
                if (haveYn) {
                  if (actor.actType === 'RV') {
                    myTodoYn = true
                    break
                  } else if (actor.actType === 'CK') {
                    checkTodoYn = true
                  } else if (actor.actType === 'RF') {
                    refTodoYn = true
                  }
                }
              }
            }
          }

          if (myTodoYn) {
            todo.contTarget = 'myTodo'
            returnMyTodoList.push(todo)
          } else if (checkTodoYn) {
            todo.contTarget = 'check'
            returnCheckTodoList.push(todo)
          } else if (refTodoYn) {
            todo.contTarget = 'myRef'
            returnRefTodoList.push(todo)
          }
        }
      })
      console.log({ my: returnMyTodoList, check: returnCheckTodoList, ref: returnRefTodoList })
      return { my: returnMyTodoList, check: returnCheckTodoList, ref: returnRefTodoList }
    }
  },
  computed: {
    mMyTodoCount () {
      if (!this.mMyTodoList.content) return 0
      let count = 0
      this.mMyTodoList.content.forEach(element => {
        if (element.contStatus !== '99') {
          count++
        }
      })
      return count
    },
    mRefTodoCount () {
      if (!this.mRefTodoList.content) return 0
      let count = 0
      this.mRefTodoList.content.forEach(element => {
        if (element.contStatus !== '99') {
          count++
        }
      })
      return count
    },
    mCheckTodoCount () {
      if (!this.mCheckTodoList.content) return 0
      let count = 0
      this.mCheckTodoList.content.forEach(element => {
        if (element.contStatus !== '99') {
          count++
        }
      })
      return count
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_DISP_LIST () {
      return [{ listName: this.$t('COMMON_TODO_MYTODO'), list: this.mMyTodoList }, { listName: this.$t('COMMON_TODO_CHECK'), list: this.mCheckTodoList }, { listName: this.$t('COMMON_TODO_PUBLIC'), list: this.mRefTodoList }, { listName: this.$t('COMMON_TODO_COMPLETED'), list: this.mCompTodoList }]
    }
  },
  watch: {
    $route: {
      immediate: true,
      deep: true,
      handler (val) {
        if (!val) return
        this.mJobkindId = val.params.jobkindId
        this.mUserKey = Number(val.params.userKey)
        this.mSearchDate = val.params.date
        this.viewPage()
      }
    }
  }
}
</script>
<style >
.DframeView {
    width: 100%; height: 100%;
}
svg > path {
  fill: rgba(96, 97, 190);
}
.completedTodoColor{
  color:rgb(151, 151, 151) !important;
}
.delayedTodo {
  color: red !important;
}
.fontSize {
  font-size: 18px;
}
.todoTag {
  color: white;
  height: 19px;
  margin-bottom: 5px;
  line-height: 19px;
  padding: 0px 5px;
  border-radius: 5px;
  font-size: 12px;
  width: auto;
  display: inline-block;
  vertical-align: middle;
  white-space:nowrap;
}
.todoTagS {
  background-color: #a5a6e6;
}
.todoTagM {
  background-color: rgb(45, 203, 137);
}
.todoTagW {
  background-color: rgb(108, 161, 27);
}
.todoTagI {
  background-color: rgb(255, 158, 31);
}
.todoTagE {
  background-color: rgb(198, 106, 106);
}
.todoPriority {
  color: white;
  height: 18px;
  line-height: 18px;
  border-radius: 20px;
  font-size: 12px;
  width: auto;
  padding: 1px 9px;
}
.todoPriorityHigh {
  border:1px solid #FF0000;
  color:#FF0000;
}
.todoPriorityMiddle {
  border:1px solid #0066FF;
  color:#0066FF;
}
.todoPriorityLow {
  border:1px solid #FFA800;
  color:#FFA800;
}
.todoPriorityLowMore {
  background-color: rgb(250, 251, 254);
  color: #000 !important;
}
.todoTitleFontSize {
  font-size: 17px;
}
.mainTodoTab {
  padding: 0.5rem 0;
  list-style-type: none;
  text-align: center;
  height: 100%;
  white-space: nowrap;
  border-right: 1px solid rgba(94, 96, 189, 0.3);
  font-weight: bold;
  line-height:24px
}
.mainTodoTab:last-child {
  border-right: none;
}
.mainTodoTab:first-child {
  border-radius: 10px 0 0 10px;
}
.mainTodoTab:last-child {
  border-radius: 0 10px 10px 0;
}
.mainTodoTabSelected {
  background-color: #5f61bd !important;
  font-weight: bold !important;
  color: #fff !important;
}
.mainTodoTabSelected > span {
  color: #fff !important;
}

.arrangeBtn{
  width:25%;
  list-style-type: none;
}
.arrangeBtn:first-child{
  border-radius:10px 0 0 10px;
}
.arrangeBtn:last-child{
  border-radius:0 10px 10px 0;
}
.arrangeBtn.selected {
  font-weight:bold;
}
.totalInfo {
  font-size: 13px !important;
  white-space: nowrap;
}
.topWrap {
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  min-height: 40px;
  float: left;
  padding: 0 0.6rem;
  margin-top:10px;
}
.contents .mx-input-wrapper i {
  visibility: hidden !important;
  display: none !important;
}
.mx-table-date .today {
  color: #ff9f32 !important;
}
.mx-calendar-panel-date {
  width: 100% !important;
  border-bottom: 1px solid #ccc;
}
.mx-calendar-content .cell.active {
  background-color: #6768a7 !important;
}
.mx-calendar-content .hover-in-range {
  background-color: #cdceff56 !important;
}
.mx-datepicker input:hover {
  border: 1px solid #8183d6;
}
.mx-datepicker {
  font-size: 30px !important;
  width: 100% !important;
  max-width: 210px !important;
  min-width: 120px !important;
}

.mx-datepicker-popup {
  position: absolute;
  top: 300px;
  right: 2rem;
  z-index: 999999 !important;
}
.mx-datepicker-range {
  width: calc(100%) !important;
  float: left;
}

.mx-icon-calendar {
  top: 20px !important;
  color: #6768a7 !important;
  display: none !important;
}
.mx-icon-clear svg {
  display: none !important;
}
.mx-icon-calendar svg {
  width: 1.5em !important;
  height: 1.5em !important;
}

.mx-input {
  height: 40px !important;
  border-radius: 5px !important;
  padding: 1px 5px !important;
  box-shadow: none !important;
  float: left;
  box-sizing: border-box !important;
  border: none !important;
  background-color: #e7edff !important;
  text-align: Center;
  font-weight: bold;
  font-size: 30px;
  color: #6768a7 !important;
}
.todoBody {
  width: 100%;
  height: 100%;
  /* margin-top: 50px !important; */
}
.DatePicker {
  font-size: 18px;
  float: left;
  border-radius: 5px;
}
.dateArea {
  height: 50px;
  padding: 5px;
  margin: 0 10px;
}
.dateAreaBox {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.calBox {
  width: 40%;
  min-width: 263px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todoFilter {
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 5px;
  margin: 0 10px;
}
.addBtn {
  width: 50px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  border-radius: 20px;
}
.todoCateBox {
  border: 2px solid #acacac;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: white;
}
.contentsBody {
  height: calc(100% - 100px);
  overflow: hidden auto;
}
.cabiName {
  padding: 10px 15px;
}
.appUserPhotoBack {
  border-radius: 30px;
  background-color: rgb(223, 224, 226);
  min-width: 30px;
  min-height: 30px;
  margin-right: 5px;
}
.appUserPhoto {
  overflow: hidden;
  border-radius: 50%;
}
.actorImg {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-left: -10px;
  border: 2px solid #e7edff;
  box-shadow: 0 5px 6px 0 rgba(255, 255, 255, 0.6);
  background-color: #fff;
}

.moreActorImg {
  margin-left: -10px;
  font-size: 13px !important;
  font-weight: bold;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  /* box-shadow:0 5px 6px 0 rgba(60, 60, 60, 0.2); */
  background-color: #e7edff !important;
  color: #5f61bd !important;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.actorImgList {
  display: flex;
  justify-content: end;
  align-items: center;
  position: relative;
}
.actorNameListWrap{
  transition:all .5s;
  position:absolute;
  right:-10px;
  top:130%;
  z-index:13;
}
.actorNameListWrap.wrapOpen {
  display: block !important;
}
.actorNameListWrap:before {
  content: "";
  position: absolute;
  top: -10px;
  right: 10px;
  transform: translateX(-50%);
  border-top: 0px solid transparent;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 16px solid #e7edff;
}
.actorNameList {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap:0.2rem;
  background-color: #e7edff !important;
  box-shadow: 0 5px 8px 0 #3c3c3c1a;
  border-radius: 10px;
  padding: 5px 17px;
  color: #7e7e7e;
  width: auto;
  height: auto;
}

.profileImg {
  width: 25px;
  height: 25px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: inline-block;
  vertical-align: middle;
  border: 2px solid #e7edff;
}
.strikeLine {
  position: absolute;
  background-color: #b8b5b5;
  height: 2px;
  width: 0;
  top: 50%;
  transform: translateY(-50%);
}
.extraInfoWrap {
  display: flex;
  align-items: center;
}
.todoListBox {
  width: 100%;
  padding: 5px;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.todoList {
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  height: 50px;
  border-radius: 0.5rem;
  border: 2px solid #acacac;
  padding: 0px 5px;
}
.countTodo {
  font-size: 14px;
}
.todoImportantInfoTitle {
  line-height: 1;
}
.infoTitle {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: normal;
}
.todoImportantInfoMemo {
  font-size: 18px;
  font-weight: normal !important;
  margin-top: -4px;
}
.todoOtherInfos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.todoOtherInfosDueDate {
  display: flex;
  flex-direction: column;
  align-items: end;
  text-align: right;
}
.todoOtherInfosAsignee {
  width: 25%;
  display: flex;
  justify-content: end;
  align-items: center;
}

.mainTabWrap {
  padding: 0 !important;
}

.todoCabBox {
  background-color: white;
  border: 2px solid #acacac;
  padding: 5px;
  margin: 5px 10px 10px;
  border-radius: 20px;
}
.cabiName {
  padding: 10px 15px;
}
.todoFontSize {
  font-size: 15px;
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
  animation: fadeout 1s;
  -moz-animation: fadeout 1s; /* Firefox */
  -webkit-animation: fadeout 1s; /* Safari and Chrome */
  -o-animation: fadeout 1s; /* Opera */
  animation-fill-mode: forwards;
}
@keyframes fadeout {
  /* from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  } */
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@-webkit-keyframes fadeout {
  /* Safari and Chrome */
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media screen and (max-width: 650px) {
  .todoImportantInfoTitle {
    line-height: 1.2 !important;
    /* margin-top:0.2rem !important; */
    margin-bottom: 0.3rem !important;
  }
  .todoImportantInfoMemo {
    font-size: 14px;
  }
}
@media screen and (max-width: 500px) {
  .topContainer {
    height: 130px !important;
  }
  .mainTabWrap {
    height: 34px !important;
    padding: 0 !important;
  }
  .mainTodoTab {
    font-size: 15px !important;
    line-height: 17px;
  }
  .countTodo {
    font-size: 12px !important;
  }
  .fontSize {
    font-size: 14px !important;
  }
  .actorImg {
    width: 25px !important;
    height: 25px !important;
  }
  .moreActorImg {
    width: 25px !important;
    height: 25px !important;
    font-size: 11px !important;
  }
  .profileImg {
    width: 25px !important;
    height: 25px !important;
  }
  .commonSubTitleTextBold {
    font-size: 14px;
  }
  .todoFontSize {
    font-size: 13px;
  }
}
.titleLine {
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: black;
  font-size: 12px;
  margin: 8px 0px;
}
.titleLine::before,
.titleLine::after {
  content: "";
  flex-grow: 1;
  background: black;
  height: 1px;
  font-size: 0px;
  line-height: 0px;
  margin: 0px 16px;
}
.commonSubTitleTextBold {
  font-size: 20px;
  font-weight: bold;
}
.popBg {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #00000026;
  z-index: 12;
  top: 0;
  left: 0;
}
.reportCompoArea {
  width: 95%;
  position: absolute;
  bottom: 0;
  left: 2.5%;
  z-index: 100000;
  margin: 1rem 0rem;
}
.memoFuncArea {
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.mainHeaderBack {
  min-width: 25px;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  left: 1rem;
}
.picImgWrap {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  overflow: hidden;
  display: flex;
  background-color: #fff;
}
/* .picWrapReal {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
} */
.MKAppUserPhotoBack {
  border-radius: 30px;
  background-color: rgb(223, 224, 226);
  min-width: 25px;
  min-height: 25px;
  margin-right: 5px;
}
.MKAppUserPhoto {
  overflow: hidden;
  border-radius: 50%;
}

@media screen and (max-width: 360px) {
  /* .todoOtherInfos{
    flex-direction:column;
    align-items:start;
  }
  .todoOtherInfosDueDate{
    width:100% !important;
    text-align:left !important;
    align-items:start !important;
  }
  .todoOtherInfosAsignee{
    width:100% !important;
    text-align:right;
  } */
}
ul li {
  list-style: none;
}

</style>
