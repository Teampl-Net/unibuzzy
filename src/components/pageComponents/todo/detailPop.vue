<template>
    <div class="chanInfoBoxWrap" >
      <div class="popBg" v-if="mModiMemoPopShowYn" @click="closeUpdateMemoPop"></div>
      <modiMemoPop v-if="mModiMemoPopShowYn" :pClosePop="closeUpdateMemoPop" :pMemoEle="mModiMemoObj" :pSetUpdateMemo="setUpdateMemo"/>
      <div class="popBg" v-if="mUpdateTodoPopShowYn" @click="closeUpdateTodoPop"></div>
      <setPop v-if="mUpdateTodoPopShowYn" :pClosePop="closeUpdateTodoPop" :pSelectTodo="mModiMemoObj" :pUpdateTodo="pUpdateTodo" :pFamilyList="mFamilyList" :pGetTodoDetail="getTodoDetail"/>
      <div class="popBg" v-if="mConfirmShowYn" @click="closeComplelePop"></div>
      <gConfirmPop v-if="mConfirmShowYn" :confirmText='mConfirmText' class="" confirmType='two' @ok="completeTodo" @no='closeComplelePop'/>
      <div class="popBg" v-if="mDeleteConfirmShowYn" @click="closeDeletePop"></div>
      <gConfirmPop v-if="mDeleteConfirmShowYn" :confirmText='mConfirmText' class="" confirmType='two' @ok="deleteContents" @no='closeDeletePop'/>
      <gPopHeader :headerTitle="'Detail'" :pClosePop="pClosePop" />
      <div class="w100P fl" style=" display: flex; justify-content: space-between; align-items: center; padding: 0 5px; position: relative;  margin-top: 60px;">
        <div style="display: flex; align-items: center; justify-content: center;">
          <img v-if="mTodoDetail.status === '99'" src="../../../assets/images/todo/checkboxCheck.png" @click="completeTodo" width="30" height="30" class="cursorP" style="margin-right: 5px;"/>
          <img v-else src="../../../assets/images/todo/checkboxBlank.png" width="30" height="30" @click="completeTodo" class="cursorP" style="margin-right: 5px;"/>
          <!-- <p v-if="mTodoDetail.status === '00'" class="fl fontBold" style=" font-size: 12px; height:30px; width:60px; background-color: #6768a7; color: white; text-align: center; line-height: 30px; margin-right: 5px; border-radius: 20px;">Progress</p>
          <p v-else-if="mTodoDetail.status === '99'" class="fl fontBold" style="border:2px solid #6768a7; font-size: 12px; height:30px; width:70px; background-color: #6768a7; color: white; text-align: center; margin-right: 5px; border-radius: 20px; display:flex; align-items: center; justify-content: center;">Completed</p>
          <p v-else-if="mTodoDetail.status === '98'" class="fl" style="border:2px solid #acacac; font-size: 12px; height:30px; width:40px; background-color: #acacac; color: white; text-align: center; margin-right: 5px; border-radius: 20px; display:flex; align-items: center; justify-content: center;">종료</p> -->
          <!-- <p v-if="mTodoDetail.writeYn" class="fl" style=" font-size: 12px; height:30px; width:30px; background-color: #3d9aff; color: white; text-align: center; line-height: 30px; margin-right: 5px;">작성</p> -->
          <p v-if="mTodoDetail.status === '00'" class="fl fontBold commonSubTitleTextBold mLeft-05">{{ mTodoDetail.title }}</p>
          <p v-else-if="mTodoDetail.status === '99' || mTodoDetail.status === '98'" class="fl commonSubTitleTextBold mLeft-05" style="text-decoration: line-through;">{{ mTodoDetail.title }}</p>
        </div>
        <div style="display: flex; justify-content: center; align-items: center;">
          <!-- <div v-if="mTodoDetail.status === '00'" class="cursorP fontBold" @click="openComplelePop" style=" height:30px; line-height: 30px; padding: 0 10px; background-color:#6768a7; color: white; border-radius: 10px; margin-right: 10px; font-size: 12px;">Complete</div> -->
          <img v-if="mTodoDetail.status === '00'" class="cursorP " src="../../../assets/images/todo/todoMenu.png" width="5" height="20" @click="openSubMenu('todo',mTodoDetail)"/>
        </div>
      </div>
      <div class="w100P commonGrayText" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #6768a7;padding: 5px; font-size: 12px; height: 30px;">
        <div style="display: flex; align-items: center; height: 30px;">
          <p class="detailFont" >{{ changeTypeToText(mTodoDetail.todoType) }}({{ mTodoDetail.todoUserName? $changeText(mTodoDetail.todoUserName):'본인'}})</p>
        </div>
        <p class="detailFont" >Writer : {{ $changeText(mTodoDetail.creUserName) }} ({{ changeUSADate(mTodoDetail.creDate) }})</p>
      </div>
      <!-- <div style="height:calc(100% - 200px);  overflow: hidden auto; width: 100%;">
        <div class="w100P mTop-10" style=" padding: 5px 10px; display: flex; justify-content: start; min-height: 100px;"  v-html="mTodoDetail.comment"></div>
        <div v-if="mMemoList.length !== 0" class="childMemoWrap" style=" overflow: hidden auto;">
          <p class="fontBold" style=" margin-top: 5px; text-align: left;">Comment ({{ mMemoList.length }})</p>
          <div v-for="memo, index in mMemoList" :key="index" class="childMemoItem" style="border-bottom:1px solid #aaa;">
            <div class="childUserInfo">
              <div class="memoUserInfo">
                <div  id="memoImgWrap" class="parentMemoImgWrap" style="">
                    <div class="parentMemoImg" id="memoBodyImgWrap" >
                        <img :src="memo.userProfileImg" alt="">
                    </div>
                </div>
                <div style="display: flex; justify-content: center; flex-direction: column;">
                  <p class="fl commonBlack mright-05 textLeft font16 fontBold">{{$changeText(memo.userDispMtext)}}</p>
                  <p class="fl commonGray textLeft font12 fontNomal" style="display: flex; align-items: last baseline;">{{$changeDateMemoFormat(memo.creDate)}}</p>
                </div>
              </div>
              <div class="cursorP" v-if="memo.creUserKey === GE_USER.userKey" style="width:10px">
                <img src="../../../assets/images/todo/todoMenu.png" @click="openSubMenu('memo', memo)" alt="" width="4" height="15" style="right: 5px; top: 10px;">
              </div>
            </div>
            <div v-html="memo.bodyFullStr" style=" display: flex; justify-content: start; align-items: center; padding: 5px 0;"></div>
            <p class="commonGray textLeft font12 fr" @click="writeMeMemo(memo)">{{ $t('COMM_BTN_REPLY_COMM') }}</p>
            <p class="commonGray textLeft font12 mright-05 cursorP fr " @blur="testFunction" @click="openModiMemoPop(propMemoEle)">{{ $t('COMM_BTN_EDIT2') }}</p>
          </div>
        </div>
        <div style="height:3px; background-color: #bdbee2; box-shadow:0 10px 10px -10px;"></div>
        <div style=" height:60px; width: calc(100%); display: flex; justify-content: center; align-items: center; position: absolute; bottom: 0; left: 0;">
          <pre :placeholder="'Please add a comment.'" @focus="preFocus" @keydown="inputEnterKey" id="memoTextTag" ref="memoTextTag" class="fl editableContent memoCardTextid memoTextPadding memoTextTag" contenteditable=true  @input="inputTextCheck"/>
          <img @click="setSaveMemo()" src="@/assets/images/common/icon_send_on.svg" alt="" class="fl img-w25 mleft-05 cursorP">
        </div>
      </div> -->
      <div style="height:calc(100% - 200px);  overflow: hidden auto; width: 100%;">
        <div class="w100P mTop-10" style=" padding: 5px 10px; display: flex; justify-content: start; min-height: 100px;"  v-html="mTodoDetail.comment"></div>
        <div style="height:3px; background-color: #eaeaf3; box-shadow:0 10px 10px -10px;"></div>
        <p class="fontBold" style=" margin-top: 5px; text-align: left; padding:5px;">Comment ({{ mMemoList.memoList.length }})</p>
        <template v-for="(memo, mIndex) in mMemoList.memoList" :key="mIndex">
          <div style=" padding: 0 5px; margin-top: 5px;">
            <memoCompo @updateMemo="updateMemo"  @openImgPop="openImgPop" :propContDetail="pTodoDetail" :diplayCount="-1" @saveModiMemo="saveModiMemo" v-if="propDetailYn || mIndex < 3" :childShowYn="true" :propMemoEle="memo" :propMIndex="mIndex" :propMemoLength="mMemoList.length" @memoEmitFunc='memoEmitFunc'/>
          </div>
        </template>
      </div>
    </div>
    <gMemoPop style="position: absolute; bottom: 0;" :resetMemoYn="mMemoResetYn" ref="gMemoRef" transition="showMemoPop" :mememo='mMememoValue'  @saveMemoText="saveMemo"  @clearMemoObj='clearMemoObj' @writeMemoScrollMove='writeMemoScrollMove' />
    <div class="popBg" v-if="mOpenMenuShowYn" @click="closeSubMenu"></div>
    <div v-show="mOpenMenuShowYn" class="reportCompoArea">
      <div class="fl memoFuncArea">
        <p class="fl font16 w100P commonColor rowText" @click="openUpdatePop">Edit</p>
        <p class="fl font16 w100P menuListBase rowText" @click="openDeletePop" >Delete</p>
      </div>

      <div class="fl mtop-05 closeReportBtn" @click="closeSubMenu">
        <p class="fl font16 w100P commonColor">Cancel</p>
      </div>
    </div>
</template>
<script>
import memoCompo from '../push/D_contBoxMemo.vue'
import modiMemoPop from '../push/D_modiMemoPop.vue'
import setPop from './setPop.vue'

export default {
  props: {
    pSelectTodo: {},
    pClosePop: Function,
    pGetTodoListGroupCab: Function,
    pCompleteTodo: Function,
    pUpdateTodo: Function,
    pGetTodoFamilyList: [],
    pTodoDetail: {},
    pMemoList: []
  },
  components: {
    modiMemoPop,
    setPop,
    memoCompo
  },
  data () {
    return {
      mSideMenuOpenYn: false,
      mCompleteTodoPopShowYn: false,
      mEndTodoPopShowYn: false,
      mDelTodoPopShowYn: false,
      mTodoDetail: {},
      mOpenMenuShowYn: false,
      mConfirmText: '',
      mConfirmShowYn: false,
      mModiMemoPopShowYn: false,
      mModiMemoObj: {},
      mDeleteConfirmShowYn: false,
      mSelectSubMenu: '',
      mUpdateTodoPopShowYn: false,
      mFamilyList: [],
      mMemoList: [],
      propDetailYn: true,
      mMememoValue: {}
    }
  },
  created () {
    if (this.pTodoDetail) {
      this.mTodoDetail = this.pTodoDetail
    } else {
      this.getTodoDetail(true)
    }
    if (this.pMemoList) {
      this.mMemoList = this.pMemoList
    } else {
      this.getTodoDetail(true)
    }
    console.log(this.pSelectTodo)
    console.log(this.mMemoList)
  },
  methods: {
    async completeTodo () {
      if (this.pCompleteTodo) {
        const param = {}
        if (this.mTodoDetail.status === '00') {
          param.status = '99'
        } else {
          param.status = '00'
        }
        param.todoKey = this.mTodoDetail.todoKey
        await this.pCompleteTodo(param)
      }
      await this.closeComplelePop()
      await this.getTodoDetail()
      if (this.pGetTodoListGroupCab) {
        await this.pGetTodoListGroupCab(false)
      }
    },
    writeMeMemo (memoObj) {
      this.mMememoValue = {}
      this.mMememoValue = memoObj
      this.$refs.gMemoRef.setMememo(memoObj)
    },
    memoEmitFunc (emitData) {
      var type = emitData.targetType
      var data = emitData.value
      if (type === 'goUserProfile') {
        if (this.propDetailYn) {
          this.goUserProfile(data.creUserKey)
        } else {
          this.goContentsDetail(undefined, true)
        }
        //
      } else if (type === 'goContentsDetail') {
        // 댓글로 스크롤하기 위해 2번째 파라미터를 true로 보내줌 (1번째는 컨텐츠 더보기 유무)
        this.goContentsDetail(undefined, true)
      } else if (type === 'writeMeMemo') {
        this.writeMeMemo(data)
      }
    },
    openComplelePop () {
      this.mConfirmText = 'Are you sure you want to complete it?'
      this.mConfirmShowYn = true
    },
    closeComplelePop () {
      this.mConfirmShowYn = false
    },
    openDeletePop () {
      this.mConfirmText = 'Are you sure you want to delete it?'
      this.mDeleteConfirmShowYn = true
      this.mOpenMenuShowYn = false
    },
    closeDeletePop () {
      this.mDeleteConfirmShowYn = false
    },
    openSubMenu (menu, value) {
      this.mSelectSubMenu = menu
      this.mModiMemoObj = value
      this.mOpenMenuShowYn = true
    },
    closeSubMenu () {
      this.mOpenMenuShowYn = false
    },
    async getTodoDetail (loadingYn) {
      const param = {}
      param.todoKey = this.pSelectTodo.todoKey
      var result = await this.$commonAxiosFunction({ url: '/sUniB/mk.getTodoList', param: param }, loadingYn)
      if (result.data.result) {
        this.mTodoDetail = result.data.todo[0]
        this.mMemoList = this.mTodoDetail.memoList
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
    changeUSADate (value) {
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
      todayDate = date.toLocaleString('en-US', { month: 'short' }) + ' ' + day + ', ' + year
      return todayDate
    },
    async setUpdateMemo (value) {
      try {
        var result = await this.$commonAxiosFunction({
          url: 'https://mo.d-alim.com:9443/service/tp.saveMemo',
          param: { memo: value }
        }, true)
        if (result.data && result.data.result) {
          this.$refs.gMemoRef.clearMemo()
          this.mMememoValue = {}
          if (result.data.resultList && result.data.resultList.memoList.length > 0) {
            var saveMemoObj = {}
            this.$emit('scrollToMemoTop')
            saveMemoObj.creTeamKey = this.mTodoDetail.creTeamKey
            saveMemoObj.jobkindId = this.mTodoDetail.jobkindId
            await this.$store.commit('D_CHANNEL/MU_ADD_MEMO', saveMemoObj)
          }
        }
      } catch (e) {
        console.error('D_contentsDetail 오류')
        console.error(e)
      } finally {
        const element = document.getElementById('memoTextTag')
        element.innerText = ''
        this.getTodoDetail(false)
        this.closeUpdateMemoPop()
      }
    },
    async setSaveMemo () {
      this.$refs.memoTextTag.blur()
      var inputMemoArea = window.document.getElementById('memoTextTag')

      var regText = JSON.parse(JSON.stringify(inputMemoArea.innerText))

      if (regText.trim() !== '') {
        this.$showAxiosLoading(true)
        inputMemoArea.classList.remove('memoTextPadding')
        var html = inputMemoArea.innerHTML
        html = this.$findUrlChangeAtag(html)
        var param = {}
        param.saveMemoHtml = html
        console.log(param)
        this.saveMemo(param)
        inputMemoArea.classList.add('memoTextPadding')
      } else {
        this.$showToastPop('Please enter the comments.')
      }
    },
    async saveMemo (inSaveMemoObj) {
      if (inSaveMemoObj.saveMemoHtml === undefined) return
      this.mLoadingShowYn = true
      var memo = {}
      if (inSaveMemoObj.attachFileList) {
        memo.attachFileList = inSaveMemoObj.attachFileList
      }
      memo.parentMemoKey = null
      if (this.mMememoValue !== undefined && this.mMememoValue !== null && this.mMememoValue !== {}) {
        memo.parentMemoKey = this.mMememoValue.parentMemoKey
      }

      memo.bodyFullStr = inSaveMemoObj.saveMemoHtml
      /* memo.bodyFilekey  */
      memo.targetKind = 'T'
      memo.targetKey = this.mTodoDetail.todoKey
      // memo.toUserKey = this.mTodoDetail.creUserKey 대댓글때 사용하는것임
      memo.creUserKey = this.GE_USER.userKey
      memo.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      memo.userName = this.$changeText(this.GE_USER.userDispMtext)
      memo.allYn = true
      memo.ownUserKey = this.GE_USER.userkey
      memo.todoYn = true
      try {
        var result = await this.$commonAxiosFunction({
          url: 'https://mo.d-alim.com:9443/service/tp.saveMemo',
          param: { memo: memo }
        })
        // if (result.data.result === true || result.data.result === 'true') {
        if (result.data && result.data.result) {
          this.$refs.gMemoRef.clearMemo()
          this.mMememoValue = {}
          //   this.getMemoList(true)
          if (result.data.resultList && result.data.resultList.memoList.length > 0) {
            var saveMemoObj = {}
            var index
            this.$emit('scrollToMemoTop')
            if (memo.parentMemoKey) {
              // 댓글의 부모키값이 있으면 컨텐츠의 댓글 중 부모의 키값을 찾음
              index = await result.data.resultList.memoList.findIndex((item) => item.memoKey === memo.parentMemoKey)
              saveMemoObj = await result.data.resultList.memoList[index]
            } else {
              saveMemoObj = await result.data.resultList.memoList[0]
            }
            saveMemoObj.creTeamKey = this.mTodoDetail.creTeamKey
            saveMemoObj.jobkindId = this.mTodoDetail.jobkindId
            await this.$store.commit('D_CHANNEL/MU_ADD_MEMO', saveMemoObj)
          }
          this.getTodoDetail()
        }
      } catch (e) {
        console.error('D_contentsDetail 오류')
        console.error(e)
      } finally {
        this.memoShowYn = false
        this.mLoadingShowYn = false
      }
    },
    clearMemoObj () {
      this.mMememoValue = null
    },
    deleteContents () {
      if (this.mSelectSubMenu === 'todo') {
        this.deleteTodo()
      } else if (this.mSelectSubMenu === 'memo') {
        this.deleteMemo()
      }
    },
    async deleteMemo () {
      var memo = {}
      memo.memoKey = this.mModiMemoObj.memoKey
      var result = await this.$commonAxiosFunction({ url: 'https://mo.d-alim.com:9443/service/tp.deleteMemo', param: memo }, true)
      if (result.data.result) {
        this.closeDeletePop()
        this.getTodoDetail()
      }
    },
    async deleteTodo (loadingYn) {
      var param = {}
      param.todoKey = this.mModiMemoObj.todoKey
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var result = await this.$deleteTodo(param, nonLoading)
      if (result.result) {
        if (this.pGetTodoListGroupCab) {
          this.pGetTodoListGroupCab(true)
        }
        if (this.pClosePop) {
          this.pClosePop()
        }
      }
    },
    openUpdateTodoPop () {
      if (this.pSelectTodo.targetKey !== this.GE_USER.userKey) {
        const cabUserList = []
        console.log(this.mTodoObj)
        for (let i = 0; i < this.pGetTodoFamilyList.length; i++) {
          if (this.mModiMemoObj.targetKey === this.pGetTodoFamilyList[i].cabinetKey) {
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
        console.log(cabUserList)
        this.mFamilyList = cabUserList
      } else {
        this.mFamilyList = [{ opt: this.$changeText(this.GE_USER.userDispMtext), value: this.GE_USER.userKey }]
      }
      this.mUpdateTodoPopShowYn = true
    },
    closeUpdateTodoPop () {
      this.mUpdateTodoPopShowYn = false
    },
    openUpdateMemoPop () {
      this.mModiMemoPopShowYn = true
    },
    closeUpdateMemoPop () {
      this.mModiMemoPopShowYn = false
    },
    openUpdatePop () {
      if (this.mSelectSubMenu === 'todo') {
        this.openUpdateTodoPop()
      } else if (this.mSelectSubMenu === 'memo') {
        this.openUpdateMemoPop()
      }
      this.mOpenMenuShowYn = false
    },
    todosideMenu () {
      this.mSideMenuOpenYn = !this.mSideMenuOpenYn
    },
    changeTypeToText (value) {
      let returnData = ''
      if (value === 'H') {
        returnData = 'Memo'
      } else if (value === 'T') {
        returnData = 'Work'
      } else if (value === 'S') {
        returnData = 'Idea'
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
    },
    // settingPop () {
    //   document.querySelector('#memoTextTag').addEventListener('paste', (e) => {
    //     e.preventDefault()
    //     var textData = (e.originalEvent || e).clipboardData.getData('Text')
    //     document.execCommand('insertHTML', false, textData)
    //   })
    //   document.querySelector('#memoTextTag').addEventListener('keydown', (event) => {
    //     var keycode = event.keyCode
    //     if (keycode === 8 || keycode === 46) {
    //       try {
    //         var s = window.getSelection()
    //         var r = s.getRangeAt(0)
    //         var el = r.startContainer.parentElement
    //         if (el.classList.contains('parentNameCard')) {
    //           if (r.startOffset === r.endOffset && r.endOffset === el.textContent.length) {
    //             event.preventDefault()
    //             el.remove()
    //             this.cancel()
    //           }
    //         }
    //       } catch (error) {
    //       }
    //     }
    //   })
    // },
    inputEnterKey (event) {
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      if (event.keyCode === 13 && !isMobile && !this.nowLoadingYn) {
        if (!event.shiftKey && !event.ctrlKey) {
          event.preventDefault()
          this.saveMemo()
        } else if (event.ctrlKey) {
          const myCreHtml = this.$refs.memoTextTag.innerHTML + '<br>'
          this.$refs.memoTextTag.innerHTML = ''
          this.$refs.memoTextTag.focus()
          this.$pasteHtmlAtCaret(myCreHtml)
          this.$refs.memoTextTag.blur()
          this.$refs.memoTextTag.focus()
        }
      }
    },
    preFocus () {
      if (this.$checkMobile() === 'IOS') {
        this.$emit('writeMemoScrollMove')
        this.$nextTick(() => {
          this.$refs.memoPopCompo.style.position = 'fixed'
          this.$refs.memoPopCompo.style.bottom = 0
        })
      }
    }
  },
  // mounted () {
  //   this.settingPop()
  // },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>
<style scoped>
.chanInfoBoxWrap {
  position:absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  padding-top: 0;
  padding: 0px 20px;
  padding-bottom: 0;
  float: left;
  background-color: #fff;
}
.memoCardTextid:empty:before {
  content: attr(placeholder);
  color:#AFAFAF;
}
.memoTextTag {
  width: calc(100% - 81px);
  min-height: 2.5rem;
  text-align: left;
  float: left;
  resize: none;
  border-radius: 10px;
  border: 1px solid #a7a7a7;
}
.childUserInfo {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.childMemoItem {
  width: 100%;
  min-height: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  float: left;
  position: relative;
  padding: 5px 0px;
}
.memoUserProfile {
  width: 40px !important;
  height: 40px !important;
  margin-right: 5px !important;
  margin-top: 3px !important;
  margin-bottom: 5px !important;
}
.memoUserInfo {
  float: left;
  display: flex;
  flex-direction: row;
  margin-right: 10px;
  min-height: 20px;
  margin-top: 5px;
}
.childMemoWrap {
  width: 100%;
  float: left;
  min-height: 20px;
  padding: 5px;
}
.reportCompoArea {
  width:95%;
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
.popBg {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #00000026;
  z-index: 14;
  top: 0;
  left: 0;
}
.parentMemoImgWrap {
  float: left;
  max-width: 100%;
  background: rgb(238 238 238);
  float: left;
  border: 1px solid #aaa;
  padding-left: 10px;
  margin: 10px 0;
  overflow: scroll hidden;
  padding: 1px;
    /* border: 2.5px solid rgb(204, 204, 204);
    position: relative;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    float: left;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 5px;
    margin-top: 3px;
    margin-bottom: 5px; */
}
.parentMemoImg {
  float: left;
  height: 100%;
  display:flex;
  align-items: center;
  /* width: 100%;
    height: 100%;
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    background-color: #fff; */
}
</style>
