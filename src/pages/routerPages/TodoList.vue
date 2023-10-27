<template>
  <addPop v-if="mAddTodoPopShowYn" :pClosePop="closeAddTodoPop" :pSelectDate="mSelectDate" :pGetTodoFamilyList="mGetTodoFamilyList" :pGetTodoListGroupCab="getTodoListGroupCab"/>
  <detailPop v-if="mTodoDetailShowYn" :pClosePop="closeTodoDetail" :pSelectTodo="mSelectTodo" :pGetTodoList="getTodoListGroupCab" :pCompleteTodo="completeTodo" :pGetTodoListGroupCab="getTodoListGroupCab" :pGetTodoFamilyList="mGetTodoFamilyList" :pUpdateTodo="updateTodo" :pTodoDetail="mTodoDetail" :pMemoList="mMemoList"/>
  <unibDetailPop v-if="mUniBTodoDetailPopShowYn" />
  <div class="popBg" v-if="mDeleteConfirmShowYn" @click="closeDeletePop"></div>
  <gConfirmPop v-if="mDeleteConfirmShowYn" :confirmText='mConfirmText' class="" confirmType='two' @ok="deleteTodo" @no='closeDeletePop'/>
  <div class="popBg" v-if="mSetPopShowYn" @click="closeUpdatePop"></div>
  <setPop v-if="mSetPopShowYn" :pClosePop="closeUpdatePop" :pSelectTodo="mTodoObj" :pUpdateTodo="updateTodo" :pFamilyList="mFamilyList" :pGetTodoListGroupCab=getTodoListGroupCab style="z-index: 999;"/>
  <CommonAddContentsForm v-if="mWritePopShowYn" :pPostContentsFn="saveContents" :pGetReceiverList="returnTargetData" :pGetTagListFn="returnTag" :pOptions="mOption" />
  <template v-if="mShowSkeletonYn" style="height:100px">
    <SkeletonBox v-for="(value) in [0,1,2]" :key="value" style="height:100px"/>
  </template>
  <div class="todoBody">
    <div style="height:50px; border-bottom: 2px solid #6768a7; display: flex; justify-content: center; align-items: center; margin: 0 5px;">
      <div @click="goMain" class="fl cursorP mainHeaderBack">
        <img src="@/assets/images/common/icon_back.png" class="fl commonPopBackBtn mleft-05" width="12" height="20">
      </div>
      <div class="commonTitleText dateAreaBox " >
        <div class="calBox" >
          <img class="cursorP" src="../../assets/images/todo/rightArrow.png" style="transform: rotateZ(180deg)" width="20" height="20" @click="MoveDate(-1)"/>
          <Datepicker class="cursorP fl DatePicker" v-model:value="mSelectDate" :editable="false" type="date" :format="'MMM DD, YYYY'"></Datepicker>
          <img class="cursorP" src="../../assets/images/todo/rightArrow.png"  width="20" height="20" @click="MoveDate(1)"/>
        </div>
      </div>
      <div class="todoFilter " style="position: absolute; top: 5px; right: 0;">
        <div class="fr fontBold cursorP addBtn CDeepBgColor" @click="openAddTodoPop">Add</div>
      </div>
      <!-- <span class="popHeaderTitleSpan font20 h100P" style="color: #6768A7; font-weight: bold; display: flex; justify-content: center; align-items: center;">Today's Todo</span> -->
    </div>
    <div style="width: 100%; height:100%;">
    <!-- <div class="dateArea" style="position: relative; ">
      <div class="commonTitleText dateAreaBox " >
        <div class="calBox" >
          <img class="cursorP" src="../../assets/images/todo/commonArrowBack.svg" width="30" height="40" @click="MoveDate(-1)"/>
          <Datepicker class="cursorP fl DatePicker" v-model:value="mSelectDate" :editable="false" type="date" :format="'MMM DD, YYYY'"></Datepicker>
          <img class="cursorP" src="../../assets/images/todo/commonArrowBack.svg" style="transform: rotateZ(180deg)" width="30" height="30" @click="MoveDate(1)"/>
        </div>
      </div>
      <div class="todoFilter " style="position: absolute; top: 10px; right: 0;">
        <div class="fr fontBold cursorP addBtn CDeepBgColor" @click="openAddTodoPop">Add</div>
      </div>
    </div> -->
    <div class="" style="display:flex; justify-content: space-between; align-items:center; border:2px solid #acacac; height:40px; margin: 10px; border-radius: 10px; background-color: #ededed;">
      <div class="fontBold" style="display:flex; justify-content: center; align-items: center; width:50%">
        <p  style="margin-right:10px">My</p>
        <p> {{ calPercent(mCompleteMyTodoCount,(mMyTodoCount + mCompleteMyTodoCount)) }} <span style="font-size: 12px;">({{mCompleteMyTodoCount}}/{{(mMyTodoCount + mCompleteMyTodoCount)}})</span></p>
      </div>
      <div class="fontBold" style="display:flex; justify-content: center; align-items: center; width:50%">
        <p style="margin-right:10px">Asked</p>
        <p>{{ calPercent(mCompleteTargetTodoCount,(mTargetTodoCount + mCompleteTargetTodoCount)) }} <span style="font-size: 12px;">({{mCompleteTargetTodoCount}}/{{(mTargetTodoCount + mCompleteTargetTodoCount)}})</span></p>
      </div>
    </div>
    <div v-if="mMyTodoCount === 0 && mTargetTodoCount === 0 && mCompleteTodoCount === 0" class="fontBold" style="font-size: 20px; display: flex; justify-content: center; align-items: center; height:calc(100% - 300px)">There are no today's todo. </div>
    <div v-else style=" height:calc(100% - 160px); overflow: hidden auto;">
      <div v-if="mMyTodoYn" class="fontBold " style="text-align: left; padding: 5px 15px; display: flex; align-items: center">
        <img src="../../../public/resource/menu/icon_board_color.svg" width="20" style="margin-right: 5px;"/>
        <p style="font-size: 18px;">My Todo ({{ mMyTodoCount }})</p>
      </div>
      <template v-for="group, groupIndex in mGetTodoGroupList" :key="groupIndex" >
        <div v-if="group.myTodoList.length !== 0" style="padding: 5px 15px;">
          <div style="padding:10px; border:2px solid #acacac; border-radius: 10px;">
            <div :class="todo.strikeOnOff? 'fade-out-box':''" v-for="todo, todoIndex in group.myTodoList" :key="todoIndex" class="w100P cursorP" style="background-color: white; display:flex;align-items: center; flex-direction: column; padding: 10px 10px;" :style="(group.myTodoList.length- 1) === todoIndex? '':'border-bottom:1px solid #acacac;'">
              <div style="width:100%; display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; justify-content: center; align-items: center;;">
                  <div class="MKAppUserPhotoBack flexCenter p-05 fontNavy fl">
                    <div class="MKAppUserPhoto MKShadow h100P">
                      <img :src="todo.userDomainPath + todo.userProfileImg" style="width:20px; height:20px;"/>
                    </div>
                  </div>
                  <p v-if="todo.targetKey === GE_USER.userKey" class="fl todoFontSize" style="margin-right: 5px;" @click="openTodoDetail(todo)">{{ $changeText(todo.cabinetNameMtext)}} (본인)</p>
                  <p v-else class="fl todoFontSize" style="margin-right: 5px;" @click="openTodoDetail(todo)">{{ $changeText(todo.cabinetNameMtext) }} ({{ todo.creUserName? $changeText(todo.creUserName): '나' }})</p>
                </div>
                <!-- <img v-if="todo.status === '00'" class="cursorP" src="../../assets/images/todo/todoMenu.png" width="4" height="15" @click="openSubMenu(todo)"/> -->
              </div>
              <div @click="openTodoDetail(todo)" style="display: flex; align-items: center; justify-content: space-between; width:100%; margin-top: 5px;" >
                <div style="display: flex; align-items: center;">
                  <img v-if="todo.strikeOnOff" src="../../assets/images/todo/checkboxCheck.png" width="20" height="20" @click.stop="setCompleteTodo(todo, 'myTodoList', groupIndex, todoIndex)"/>
                  <img v-else src="../../assets/images/todo/checkboxBlank.png" width="20" height="20" @click.stop="setCompleteTodo(todo, 'myTodoList', groupIndex, todoIndex)"/>
                    <p v-if="todo.status === '00'" class="fl fontBold commonSubTitleTextBold mLeft-05" style="position: relative; margin-left: 5px;" >
                      <span class="strikeLine" :style="todo.strikeOnOff? 'transition: all .5s; width:100%;':'width:0;'"></span>
                      {{ todo.title }}
                    </p>
                </div>
                <div>
                  <div v-for="tag, index in todo.tagList" :key="index" class="CDeepBgColor" style="color:white; height:20px; line-height:20px; padding: 0px 5px; border-radius: 10px; font-size: 10px; width:40px">{{ tag.tagText }}</div>
                </div>
              </div>
              <div @click="openUniBTodoDetail" class="CDeepBgColor" style="color:white; height:20px; line-height:20px; padding: 0px 5px; border-radius: 10px; font-size: 10px; width:40px">{{ changeTypeToText(todo.todoType) }}</div>
            </div>
          </div>
        </div>
      </template>
      <div v-if="mTargetTodoYn" class="fontBold " style="text-align: left; padding: 5px 15px; display: flex; align-items: center">
        <img src="../../../public/resource/menu/icon_board_color.svg" width="20" style="margin-right: 5px;"/>
        <p style="font-size: 18px;">Asked Todo ({{ mTargetTodoCount }})</p>
      </div>
      <template v-for="group, groupIndex in mGetTodoGroupList" :key="groupIndex" >
        <div v-if="group.targetTodoList.length !== 0" style="padding: 5px 15px;">
          <div style="padding:10px; border:2px solid #acacac; border-radius: 10px;">
          <div :class="todo.strikeOnOff? 'fade-out-box':''" v-for="todo, todoIndex in group.targetTodoList" :key="todoIndex" class="w100P cursorP" style="background-color: white; display:flex;align-items: center; flex-direction: column; padding: 10px 10px;" :style="(group.targetTodoList.length - 1)=== todoIndex? '':'border-bottom:1px solid #acacac;'">
            <div style="width:100%; display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; justify-content: center; align-items: center;;">
                  <div class="MKAppUserPhotoBack flexCenter p-05 fontNavy fl">
                    <div class="MKAppUserPhoto MKShadow h100P">
                      <img :src="todo.userDomainPath + todo.userProfileImg" style="width:20px; height:20px;"/>
                    </div>
                  </div>
                  <p v-if="todo.targetKey === GE_USER.userKey" class="fl todoFontSize" style="margin-right: 5px;" @click="openTodoDetail(todo)">{{ $changeText(todo.cabinetNameMtext)}} (본인)</p>
                  <p v-else class="fl todoFontSize" style="margin-right: 5px;" @click="openTodoDetail(todo)">{{ $changeText(todo.cabinetNameMtext) }} ({{ todo.creUserName? $changeText(todo.creUserName): '나' }})</p>
                </div>
                <!-- <img v-if="todo.status === '00'" class="cursorP" src="../../assets/images/todo/todoMenu.png" width="4" height="15" @click="openSubMenu(todo)"/> -->
              </div>
              <div @click="openTodoDetail(todo)" style="display: flex; align-items: center; justify-content: space-between; width:100%; margin-top: 5px;" >
                <div @click.stop="setCompleteTodo(todo, 'targetTodoList', groupIndex, todoIndex)" style="display: flex; align-items: center;">
                  <img v-if="todo.strikeOnOff" src="../../assets/images/todo/checkboxCheck.png" width="20" height="20" @click.stop="setCompleteTodo(todo, 'targetTodoList', groupIndex, todoIndex)"/>
                  <img v-else src="../../assets/images/todo/checkboxBlank.png" width="20" height="20" @click.stop="setCompleteTodo(todo, 'targetTodoList', groupIndex, todoIndex)"/>
                    <p v-if="todo.status === '00'" class="fl fontBold commonSubTitleTextBold mLeft-05" style="position: relative; margin-left: 5px;" >
                      <span class="strikeLine" :style="todo.strikeOnOff? 'transition: all .5s; width:100%;':'width:0;'"></span>
                      {{ todo.title }}
                    </p>
                </div>
                <div style="display:flex; justify-content: center; align-items: center;">
                  <!-- <div class="CDeepBgColor" style="color:white; height:20px; line-height:20px; padding: 0px 5px; border-radius: 10px; font-size: 10px; width:40px; margin-right:5px">uniB_detail</div> -->
                  <div>
                    <div v-for="tag, index in todo.tagList" :key="index" class="CDeepBgColor" style="color:white; height:20px; line-height:20px; padding: 0px 5px; border-radius: 10px; font-size: 10px; width:40px">{{ tag.tagText }}</div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        </div>
      </template>
      <div v-if="mCompleteTodoYn" class="fontBold " style="text-align: left; padding: 5px 15px; display: flex; align-items: center">
        <img src="../../../public/resource/menu/icon_board_color.svg" width="20" style="margin-right: 5px;"/>
        <p style="font-size: 18px;">Completed Todo ({{ mCompleteTodoCount }})</p>
      </div>
      <template v-for="group, groupIndex in mGetTodoGroupList" :key="groupIndex" >
        <div v-if="group.completeTodoList.length !== 0" style="padding: 5px 15px;">
          <div style="padding:10px; border:2px solid #acacac; border-radius: 10px;">
          <div :class="todo.strikeOnOff? 'fade-out-box':''" v-for="todo, todoIndex in group.completeTodoList" :key="todoIndex" class="w100P cursorP" style="background-color: white; display:flex;align-items: center; flex-direction: column; padding: 10px 10px;" :style="(group.completeTodoList.length - 1)  === todoIndex? '':'border-bottom:1px solid #acacac;'">
            <div style="width:100%; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; justify-content: center; align-items: center;;">
                <div class="MKAppUserPhotoBack flexCenter p-05 fontNavy fl">
                  <div class="MKAppUserPhoto MKShadow h100P">
                    <img :src="todo.userDomainPath + todo.userProfileImg" style="width:20px; height:20px;"/>
                  </div>
                </div>
                <p v-if="todo.targetKey === GE_USER.userKey" class="fl todoFontSize" style="margin-right: 5px;" @click="openTodoDetail(todo)">{{ $changeText(todo.cabinetNameMtext)}} (본인)</p>
                <p v-else class="fl todoFontSize" style="margin-right: 5px;" @click="openTodoDetail(todo)">{{ $changeText(todo.cabinetNameMtext) }} ({{ todo.creUserName? $changeText(todo.creUserName): '나' }})</p>
              </div>
              <!-- <img v-if="todo.status === '00'" class="cursorP" src="../../assets/images/todo/todoMenu.png" width="4" height="15" @click="openSubMenu(todo)"/> -->
            </div>
            <div @click="openTodoDetail(todo)" style="display: flex; align-items: center; justify-content: space-between; width:100%; margin-top: 5px;" >
              <div style="display: flex; align-items: center;">
                <img v-if="todo.strikeOnOff" src="../../assets/images/todo/checkboxBlank.png" width="20" height="20" @click.stop="setCompleteTodo(todo, 'completeTodoList', groupIndex, todoIndex)"/>
                <img v-else src="../../assets/images/todo/checkboxCheck.png" width="20" height="20" @click.stop="setCompleteTodo(todo, 'completeTodoList', groupIndex, todoIndex)"/>
                  <p class="fl fontBold commonSubTitleTextBold mLeft-05" style="position: relative; margin-left: 5px;" >
                    <span class="strikeLine" :style="todo.strikeOnOff? 'transition: all .5s; width:0;':'width:100%;'"></span>
                    {{ todo.title }}
                  </p>
              </div>
              <!-- <div class="CDeepBgColor" style="color:white; height:20px; line-height:20px; padding: 0px 5px; border-radius: 10px; font-size: 10px; width:40px">{{ changeTypeToText(todo.todoType) }}</div> -->
              <div>
                <div v-for="tag, index in todo.tagList" :key="index" class="CDeepBgColor" style="color:white; height:20px; line-height:20px; padding: 0px 5px; border-radius: 10px; font-size: 10px; width:40px">{{ tag.tagText }}</div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </template>
    </div>
  </div>
</div>
  <div class="popBg" v-if="mWritePopShowYn" @click="closeWritePop"></div>
  <CommonAddContentsForm style="z-index: 13;" v-if="mWritePopShowYn" :pClosePop="closeWritePop" :pPostContentsFn="saveContents" :pGetReceiverList="returnTargetData" :pGetTagListFn="returnTag" :pOptions="mOption" />
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
import addPop from '../../components/pageComponents/todo/addPop.vue'
import unibDetailPop from '../../components/pageComponents/todo/unibDetailPop.vue'
import detailPop from '../../components/pageComponents/todo/detailPop.vue'
import setPop from '../../components/pageComponents/todo/setPop.vue'
import Datepicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'
import { commonMethods } from '../../assets/js/common'
import SkeletonBox from '@/components/unit/contents/ContentsSkeleton'
import CommonAddContentsForm from '../../components/common/CommonAddContentsForm.vue'

export default {
  components: {
    Datepicker,
    addPop,
    detailPop,
    setPop,
    unibDetailPop,
    SkeletonBox,
    CommonAddContentsForm
  },
  data () {
    return {
      mSelectDate: '',
      mMyTodoYn: false,
      mTargetTodoYn: false,
      mTodosideMenu: false,
      mCompleteTodoYn: false,
      mGetTodoGroupList: [],
      mMyTodoCount: 0,
      mTargetTodoCount: 0,
      mCompleteTodoCount: 0,
      mCompleteMyTodoCount: 0,
      mCompleteTargetTodoCount: 0,
      mAddTodoPopShowYn: false,
      mGetTodoFamilyList: [],
      mTodoDetailShowYn: false,
      mTodoObj: {},
      mOpenMenuShowYn: false,
      mSetPopShowYn: false,
      mFamilyList: [],
      mTodoDetail: {},
      mMemoList: [],
      mUniBTodoDetailPopShowYn: false,
      mTargetDataList: [],
      mOption: {
        model: 'mankik',
        purpose: 'To Do'
      },
      mTagList: [{ categoryNameMtext: 'Select', categoryKey: 'A' }, { categoryNameMtext: 'HouseWork', categoryKey: 'H' }, { categoryNameMtext: 'Work', categoryKey: 'T' }, { categoryNameMtext: 'Self-Improvement', categoryKey: 'S' }, { categoryNameMtext: 'etc', categoryKey: 'E' }],
      mWritePopShowYn: false
    }
  },
  created () {
    this.$emit('enterCloudLoading', false)
    setTimeout(() => {
      // this.getTodoListGroupCab()
      this.$emit('showCloudLoading', false)
    }, 1000)
    this.mSelectDate = new Date()
  },
  methods: {
    closeXPop(popId) {
      var history = this.$store.getters['UB_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('UB_HISTORY/setRemovePage', removePage)
      this.$store.commit('UB_HISTORY/updateStack', history)
      this.$checkDeleteHistory(popId)
    },
    closeWritePop () {
      this.closeXPop('writeContents')
      this.mWritePopShowYn = false
    },
    async saveContents (params) {
      params.creUserKey = this.GE_USER.userKey
      params.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      params.jobkindId = 'TODO'

      if (params.actorList) {
        const tempList = [...params.actorList]
        const actorList = []
        tempList.forEach(val => {
          const tempObj = {
            accessKey: val.accessKey,
            accessKind: val.accessKind
          }
          actorList.push(tempObj)
        })
        params.actorList = actorList
      }
      await this.$saveContents(params)
      this.closeWritePop('WriteContents', this.closeWritePop)
    },
    returnTag () {
      return this.mTagList
    },
    openUniBTodoDetail () {
      // var param = {}
      // param.targetType = 'contentsDetail'
      // param.targetKey = 1011783
      // this.$emit('openPop', param)
      this.$router.push('/todo/1011783/934/13624')
    },
    closeUniBTodoDetail () {
      this.mUniBTodoDetailPopShowYn = false
    },
    setCompleteTodo (value, menu, groupIndex, todoIndex) {
      this.completeTodo(value)
      // this.mGetTodoGroupList[groupIndex][value][todoIndex].strikeOnOff = true
      // setTimeout(() => {
      if (this.mGetTodoGroupList[groupIndex][menu][todoIndex].status === '00') {
        this.mGetTodoGroupList[groupIndex][menu][todoIndex].status = '99'
        this.mGetTodoGroupList[groupIndex][menu][todoIndex].strikeOnOff = false
        this.mGetTodoGroupList[groupIndex][menu][todoIndex].completeUserName = this.GE_USER.userNameMtext
        // this.completeTodo(this.mGetTodoGroupList[groupIndex][menu][todoIndex])
        this.mGetTodoGroupList[groupIndex].completeTodoList.unshift(this.mGetTodoGroupList[groupIndex][menu][todoIndex])
        this.mGetTodoGroupList[groupIndex][menu].splice(todoIndex, 1)
        console.log(this.mGetTodoGroupList[groupIndex])
        if (menu === 'myTodoList') {
          this.mMyTodoCount -= 1
          this.mCompleteMyTodoCount += 1
        }
        if (menu === 'targetTodoList') {
          this.mTargetTodoCount -= 1
          this.mCompleteTargetTodoCount += 1
        }
        if (this.mMyTodoCount === 0) {
          this.mMyTodoYn = false
        }
        if (this.mTargetTodoCount === 0) {
          this.mTargetTodoYn = false
        }
        this.mCompleteTodoCount += 1
        if (this.mCompleteTodoCount !== 0) {
          this.mCompleteTodoYn = true
        }
      } else if (this.mGetTodoGroupList[groupIndex][menu][todoIndex].status === '99') {
        console.log(this.mGetTodoGroupList[groupIndex][menu][todoIndex])
        this.mGetTodoGroupList[groupIndex][menu][todoIndex].status = '00'
        this.mGetTodoGroupList[groupIndex][menu][todoIndex].strikeOnOff = false
        // this.completeTodo(this.mGetTodoGroupList[groupIndex][menu][todoIndex])
        for (let j = 0; j < this.mGetTodoGroupList[groupIndex][menu][todoIndex].actorList.length; j++) {
          if (this.mGetTodoGroupList[groupIndex][menu][todoIndex].actorList[0].mUserList) {
            for (let k = 0; k < this.mGetTodoGroupList[groupIndex][menu][todoIndex].actorList[j].mUserList.length; k++) {
              if (this.mGetTodoGroupList[groupIndex][menu][todoIndex].actorList[j].mUserList[k].userKey === this.GE_USER.userKey) {
                this.mGetTodoGroupList[groupIndex].myTodoList.unshift(this.mGetTodoGroupList[groupIndex][menu][todoIndex])
                this.mGetTodoGroupList[groupIndex][menu].splice(todoIndex, 1)
                this.mMyTodoCount += 1
                this.mCompleteMyTodoCount -= 1
                break
              } else if (this.mGetTodoGroupList[groupIndex][menu][todoIndex].actorList[j].mUserList[k].userKey !== this.GE_USER.userKey) {
                this.mGetTodoGroupList[groupIndex].targetTodoList.unshift(this.mGetTodoGroupList[groupIndex][menu][todoIndex])
                this.mGetTodoGroupList[groupIndex][menu].splice(todoIndex, 1)
                this.mTargetTodoCount += 1
                this.mCompleteTargetTodoCount -= 1
              }
            }
          } else {
            if (this.mGetTodoGroupList[groupIndex][menu][todoIndex].actorList[j].userKey === this.GE_USER.userKey) {
              this.mGetTodoGroupList[groupIndex].myTodoList.unshift(this.mGetTodoGroupList[groupIndex][menu][todoIndex])
              this.mGetTodoGroupList[groupIndex][menu].splice(todoIndex, 1)
              this.mMyTodoCount += 1
              this.mCompleteMyTodoCount -= 1
              break
            } else if (this.mGetTodoGroupList[groupIndex][menu][todoIndex].actorList[j].userKey !== this.GE_USER.userKey) {
              this.mGetTodoGroupList[groupIndex][menu].splice(todoIndex, 1)
              this.mTargetTodoCount += 1
              this.mCompleteTargetTodoCount -= 1
            }
          }
        }
        // if (this.mGetTodoGroupList[groupIndex][menu][todoIndex].todoUserKey === this.GE_USER.userKey) {
        //   this.mGetTodoGroupList[groupIndex].myTodoList.unshift(this.mGetTodoGroupList[groupIndex][menu][todoIndex])
        //   this.mGetTodoGroupList[groupIndex][menu].splice(todoIndex, 1)
        //   this.mMyTodoCount += 1
        //   this.mCompleteMyTodoCount -= 1
        // } else {
        //   this.mGetTodoGroupList[groupIndex].targetTodoList.unshift(this.mGetTodoGroupList[groupIndex][menu][todoIndex])
        //   this.mGetTodoGroupList[groupIndex][menu].splice(todoIndex, 1)
        //   this.mTargetTodoCount += 1
        //   this.mCompleteTargetTodoCount -= 1
        // }
        if (this.mMyTodoCount !== 0) {
          this.mMyTodoYn = true
        }
        if (this.mTargetTodoCount !== 0) {
          this.mTargetTodoYn = true
        }
        this.mCompleteTodoCount -= 1
        if (this.mCompleteTodoCount === 0) {
          this.mCompleteTodoYn = false
        }
      }
      // }, 3000)
    },
    MoveDate (value) {
      this.setCountDate += value
      const setDate = this.mSelectDate.setDate(this.mSelectDate.getDate() + value)
      const returnDate = new Date(setDate)
      this.mSelectDate = returnDate
    },
    async completeTodo (value, loadingYn) {
      var param = {}
      param.mccKey = value.mccKey
      param.jobkindId = 'TODO'
      if (value.status === '00') {
        param.status = '99'
      } else {
        param.status = '00'
      }
      param.completeUserKey = this.GE_USER.userKey
      var result = await this.$commonAxiosFunction({ url: '/sUniB/tp.saveMCabContents', param: { mCabContents: param } })
      console.log(result)
    },
    async getTodoList (loadingYn) {
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var resultList = await this.$getTeamList(paramMap, nonLoading)
      console.log(resultList)
    },
    // target data를 공통 작성 화면에서 원하는 형태로 컨버팅 하는 함수
    convertTargetData (target) {
      if (target && target.length > 0) {
        const tempList = []
        target.forEach(value => {
          const tempObj = {}
          tempObj.accessKind = 'C'
          tempObj.accessKey = value.cabinetKey
          tempObj.iconPath = require('@/assets/images/editChan/icon_addressBook.svg')
          tempObj.accessName = value.cabinetNameMtext
          if (value.mCabUserList && value.mCabUserList.length > 0) {
            const childTempList = []
            value.mCabUserList.forEach(value2 => {
              const childTempObj = {}
              childTempObj.accessKind = 'U'
              childTempObj.accessKey = value2.userKey
              childTempObj.iconPath = value2.domainPath ? this.$changeUrlBackslash(value2.domainPath + value2.userProfileImg) : value2.userProfileImg
              childTempObj.accessName = this.$changeText(value2.userDispMtext)
              childTempList.push(childTempObj)
            })
            tempObj.cList = childTempList
          } else {
            tempObj.cList = []
          }
          tempList.push(tempObj)
        })
        this.mTargetDataList = [
          {
            targetList: tempList
          }
        ]
      }
    },
    returnTargetData () {
      return this.mTargetDataList
    },
    async getTodoListGroupCab (loadingYn) {
      // var paramMap = {}
      // paramMap.userKey = this.GE_USER.userKey
      // paramMap.searchDate = this.getDate(1)
      // paramMap.sysCabinetCode = 'USER'
      // var nonLoading = true
      // if (loadingYn) {
      //   nonLoading = false
      // }
      // var result = await this.$getTodoListGroupCab(paramMap, nonLoading)
      // if (result.result) {
      // this.convertTargetData(result.todo)
      const param = {
        ownUserKey: this.GE_USER.userKey,
        userKey: this.GE_USER.userKey,
        jobkindId: 'TODO'
      }
      const myContents = await this.$getContentsList(param)
      this.mGetTodoGroupList = myContents.content
      const getTodoGroupList = []
      this.mMyTodoYn = false
      this.mTargetTodoYn = false
      this.mCompleteTodoYn = false
      this.mMyTodoCount = 0
      this.mTargetTodoCount = 0
      this.mCompleteTodoCount = 0
      this.mCompleteMyTodoCount = 0
      this.mCompleteTargetTodoCount = 0
      const myTodoList = []
      const targetTodoList = []
      const completeTodoList = []
      const cabinetList = {}
      for (let i = 0; i < this.mGetTodoGroupList.length; i++) {
        this.mGetTodoGroupList[i].strikeOnOff = false
        this.mGetTodoGroupList[i].sideMenuOpenYn = false
        if (this.mGetTodoGroupList[i].status === '00' && this.mGetTodoGroupList[i].creUserKey !== this.GE_USER.userKey) {
          for (let j = 0; j < this.mGetTodoGroupList[i].actorList.length; j++) {
            if (this.mGetTodoGroupList[i].actorList[j].accesskey === this.GE_USER.userKey) {
              myTodoList.push(this.mGetTodoGroupList[i])
              this.mMyTodoCount += 1
              this.mMyTodoYn = true
            }
          }
        } else if (this.mGetTodoGroupList[i].status === '00' && this.mGetTodoGroupList[i].creUserKey === this.GE_USER.userKey) {
          console.log(this.mGetTodoGroupList[i])
          for (let j = 0; j < this.mGetTodoGroupList[i].actorList.length; j++) {
            if (this.mGetTodoGroupList[i].actorList[0].mUserList) {
              for (let k = 0; k < this.mGetTodoGroupList[i].actorList[j].mUserList.length; k++) {
                if (this.mGetTodoGroupList[i].actorList[j].mUserList[k].userKey === this.GE_USER.userKey) {
                  myTodoList.push(this.mGetTodoGroupList[i])
                  this.mMyTodoCount += 1
                  this.mMyTodoYn = true
                  break
                } else if (this.mGetTodoGroupList[i].actorList[j].mUserList[k].userKey !== this.GE_USER.userKey) {
                  targetTodoList.push(this.mGetTodoGroupList[i])
                  this.mTargetTodoCount += 1
                  this.mTargetTodoYn = true
                }
              }
            } else {
              if (this.mGetTodoGroupList[i].actorList[j].userKey === this.GE_USER.userKey) {
                myTodoList.push(this.mGetTodoGroupList[i])
                this.mMyTodoCount += 1
                this.mMyTodoYn = true
                break
              } else if (this.mGetTodoGroupList[i].actorList[j].userKey !== this.GE_USER.userKey) {
                targetTodoList.push(this.mGetTodoGroupList[i])
                this.mTargetTodoCount += 1
                this.mTargetTodoYn = true
              }
            }
          }
        }
        if (this.mGetTodoGroupList[i].status === '99') {
          if (this.mGetTodoGroupList[i].creUserKey === this.GE_USER.userKey) {
            completeTodoList.push(this.mGetTodoGroupList[i])
            this.mCompleteTodoCount += 1
          }
          this.mGetTodoGroupList[i].strikeOnOff = false
          this.mGetTodoGroupList[i].sideMenuOpenYn = false
          if (this.mGetTodoGroupList[i].todoUserKey === this.GE_USER.userKey) {
            this.mCompleteMyTodoCount += 1
          } else if (this.mGetTodoGroupList[i].todoUserKey !== this.GE_USER.userKey && this.mGetTodoGroupList[i].creUserKey === this.GE_USER.userKey && this.mGetTodoGroupList[i].targetKind !== 'U') {
            this.mCompleteTargetTodoCount += 1
          }
          this.mCompleteTodoYn = true
        }
      }
      cabinetList.myTodoList = myTodoList
      cabinetList.targetTodoList = targetTodoList
      cabinetList.completeTodoList = completeTodoList
      getTodoGroupList.unshift(cabinetList)
      this.mGetTodoGroupList = getTodoGroupList
      console.log('??')
      console.log(this.mGetTodoGroupList)
      // }
    },
    todosideMenu (todo, value, groupIndex, todoIndex) {
      this.mSelectTodo = todo
      this.mGetTodoGroupList[groupIndex][value][todoIndex].sideMenuOpenYn = !this.mGetTodoGroupList[groupIndex][value][todoIndex].sideMenuOpenYn
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
    async deleteTodo (loadingYn) {
      commonMethods.showAxiosLoading(true)
      var param = {}
      param.todoKey = this.mTodoObj.todoKey
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var result = await this.$deleteTodo(param, nonLoading)
      console.log(result)
      if (result.result) {
        this.getTodoListGroupCab()
        this.closeDeletePop()
      }
      commonMethods.showAxiosLoading(false)
    },
    async updateTodo (value, loadingYn) {
      this.mShowSkeletonYn = true
      const param = { todo: {} }
      param.todo.title = value.title
      param.todo.comment = value.comment
      param.todo.todoType = value.todoType
      param.todo.todoKey = value.todoKey
      if (value.targetKind === 'U') {
        param.todo.targetKind = 'U'
        param.todo.targetKey = this.GE_USER.userKey
      } else {
        param.todo.targetKind = 'C'
        param.todo.targetKey = this.mSelectFamily
      }
      param.todo.todoDate = this.getDate(1)
      param.todo.todoUserKey = value.todoUserKey
      param.todo.creUserKey = this.GE_USER.userKey
      var nonLoading = true
      var result = await this.$saveTodo(param, nonLoading)
      console.log(result)
      if (result.resultMsg === 'OK') {
        if (this.getTodoListGroupCab) {
          await this.getTodoListGroupCab(false)
        }
        await this.closeUpdatePop()
        this.mShowSkeletonYn = false
      }
    },
    openUpdatePop () {
      if (this.mTodoObj.targetKey !== this.GE_USER.userKey) {
        const cabUserList = []
        for (let i = 0; i < this.mGetTodoFamilyList.length; i++) {
          if (this.mTodoObj.targetKey === this.mGetTodoFamilyList[i].cabinetKey) {
            for (let j = 0; j < this.mGetTodoFamilyList[i].mCabUserList.length; j++) {
              console.log(this.mGetTodoFamilyList[i].mCabUserList)
              if (this.mGetTodoFamilyList[i].mCabUserList[j].ownerYn) {
                if (!this.mGetTodoFamilyList[i].mCabUserList[j].dispMtext) {
                  cabUserList.push({ opt: '만끽이', value: this.mGetTodoFamilyList[i].mCabUserList[j].userKey })
                } else {
                  cabUserList.push({ opt: this.$changeText(this.mGetTodoFamilyList[i].mCabUserList[j].userDispMtext), value: this.mGetTodoFamilyList[i].mCabUserList[j].userKey })
                }
              } else {
                cabUserList.push({ opt: this.$changeText(this.mGetTodoFamilyList[i].mCabUserList[j].userDispMtext), value: this.mGetTodoFamilyList[i].mCabUserList[j].userKey })
              }
            }
          }
        }
        console.log(cabUserList)
        this.mFamilyList = cabUserList
      } else {
        this.mFamilyList = [{ opt: this.$changeText(this.GE_USER.userDispMtext), value: this.GE_USER.userKey }]
      }
      this.mSetPopShowYn = true
      this.mOpenMenuShowYn = false
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
    closeUpdatePop () {
      this.mSetPopShowYn = false
    },
    openDeletePop () {
      this.mConfirmText = 'Are you sure you want to delete it?'
      this.mDeleteConfirmShowYn = true
      this.mOpenMenuShowYn = false
    },
    closeDeletePop () {
      this.mDeleteConfirmShowYn = false
    },
    openSubMenu (value) {
      this.mTodoObj = value
      console.log(value)
      this.mOpenMenuShowYn = true
    },
    closeSubMenu () {
      this.mOpenMenuShowYn = false
    },
    async openTodoDetail (value) {
      const param = {}
      param.todoKey = value.todoKey
      var result = await this.$commonAxiosFunction({ url: '/sUniB/mk.getTodoList', param: param }, false)
      console.log(result)
      if (result.data.result) {
        console.log(result)
        this.mTodoDetail = result.data.todo[0]
        this.mMemoList = this.mTodoDetail.memoList
      }
      this.mSelectTodo = value
      this.mTodoDetailShowYn = true
    },
    closeTodoDetail () {
      this.mTodoDetailShowYn = false
    },
    async openAddTodoPop () {
      if (this.mGetTodoFamilyList.length === 0) {
        var paramMap = {}
        paramMap.userKey = this.GE_USER.userKey
        paramMap.searchDate = this.getDate(1)
        paramMap.sysCabinetCode = 'USER'
        var result = await this.$getTodoListGroupCab(paramMap, true)
        if (result.result) {
          this.convertTargetData(result.todo)
          this.mGetTodoFamilyList = result.todo
          this.mWritePopShowYn = true
        }
      } else {
        this.mWritePopShowYn = true
      }
    },
    closeAddTodoPop () {
      this.mAddTodoPopShowYn = false
    },
    goMain () {
      this.$router.push('/')
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
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
    }
  }
}
</script>
<style>
.todoBody {
  width:100%;
  height:100%;
}
.DatePicker {
  font-size: 18px;
  float: left;
  border-radius: 5px;
}
.dateArea {
  height:50px;
  padding: 5px;
  margin: 0 10px
}
.dateAreaBox {
  width:100%;
  height:50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.calBox {
  width:70%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.todoFilter {
  display: flex;
  align-items: center;
  justify-content: right ;;
  padding: 5px;
  margin: 0 10px
}
.addBtn {
  color: white;
  background-color: #3d9aff;
  width: 50px;
  height:30px;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  border-radius: 20px;
}
.todoCateBox {
  border:2px solid #acacac;
  padding: 10px 15px;
  border-radius: 20px;
  background-color: white;
}
.cabiName {
  padding: 10px 15px;
}
.appUserPhotoBack {
  border-radius:30px;
  background-color:rgb(223, 224, 226);
  min-width: 30px;
  min-height: 30px;
  margin-right: 5px;
}
.appUserPhoto {
  overflow:hidden;
  border-radius:50%;
}
.strikeLine {
  position: absolute;
  background-color: black;
  height: 2px;
  width:0;
  top:15px;
}
.todoListBox {
  width:100%;
  padding: 5px;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.todoList {
  width:100%;
  background-color: white;
  display:flex;
  align-items: center;
  height:50px;
  border-radius:0.5rem;
  border:2px solid #acacac;
  padding: 0px 5px;
}
.todoCabBox {
  background-color: white;
  border:2px solid #acacac;
  padding: 5px;
  margin:5px 10px 10px;
  border-radius: 20px;
}
.cabiName {
  padding: 10px 15px;
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
  background:black;
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
</style>
