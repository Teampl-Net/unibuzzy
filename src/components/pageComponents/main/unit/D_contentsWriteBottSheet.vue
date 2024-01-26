<i18n>
{
  "ko": {
    "BOTTOM_MSG_WHERE": "무엇을 작성하실건가요?",
    "BOTTOM_MSG_NOPERM": "권한이 없습니다.",
    "BOTTOM_MSG_CHAN": "채널을 선택해주세요",
    "BOMMOM_MSG_LETTER" : "어디로 보내실건가요?",
    "BOTTOM_BTN_WRITE": "작성하기",
    "BOTTOM_MSG_NOCHAN": "컨텐츠를 작성할 수 있는 채널이 없어요",
    "BOTTOM_MSG_NOFOLLOW": "해당 채널의 멤버가 아닙니다. 멤버로 신청 후 이용해주세요.",
    "BOTTOM_MSG_CHECK": "채널을 다시 선택 후 확인 버튼을 눌러주세요!"
  },
  "en": {
    "BOTTOM_MSG_WHERE": "What are you going to write?",
    "BOTTOM_MSG_NOPERM": "You do not have permission.",
    "BOTTOM_MSG_CHAN": "Please select a channel",
    "BOMMOM_MSG_LETTER" : "Where are you going to write contents?",
    "BOTTOM_BTN_WRITE": "Write",
    "BOTTOM_MSG_NOCHAN": "There's no channel to create content.",
    "BOTTOM_MSG_NOFOLLOW": "You are not a follower of that channel. Please apply for followers.",
    "BOTTOM_MSG_CHECK": "Please select the channel again and press the OK button!"
  }
}
</i18n>
<template>
    <div v-if="mWritePopShowYn" @click="closeAddTodoPop" style="width: 100%; height: 100%; position: absolute; z-index: 12; left: 0; top: 0; background: #00000030;"></div>
    <CommonAddContentsForm
    style="z-index: 13"
    v-if="mWritePopShowYn"
    @openPop="openPop"
    :pClosePop="closeAddTodoPop"
    :pPostContentsFn="saveContents"
    :pGetReceiverList="returnTargetData"
    :pGetTagListFn="returnTag"
    :pOptions="mOption"
    :popUpType="mSelectedWriteType"
    :pUserInfo="GE_USER"
    :pSelectChanList="mSelectChanList"
  />
<div style="width: 100%; min-height: 320px; left:0; background: #FFF; border-radius: 25px 25px 0px 0px; display: flex; flex-direction: column;padding: 20px 20px; position: absolute; bottom: 0; z-index: 11;">
  <div style="position: relative; width: 100%; min-height: 40px; margin-bottom: 10px; float: left;">
      <p class="font20 fontBold textLeft">{{ $t('BOTTOM_MSG_WHERE') }}</p>
      <img src="../../../../assets/images/common/grayXIcon.svg" @click="closePop()" style="width: 20px; position: absolute; right: 8px;top: 5px;" alt="">
  </div>
  <div style="width: 100%; min-height: 100px;">
      <div style="width: 100%; min-height: 100px; display: flex;  float: left; justify-content: space-between;">
          <div @click="selectWriteType('ALIM')"  class="writeTypeBtnStyle" :class="{widthChange : propTeamKey}" :style="this.mSelectedWriteType === 'ALIM' ? 'border: 3px solid rgb(74 102 158)!important; ' : ''">
            <div v-if="mAlimClickYn === false" class="noneClickCSS fl wh-100P"></div>
              <img style="width: 36px;" src="../../../../assets/images/main/main_contentsBellIcon2.png" alt="">
              <img v-if="this.mSelectedWriteType === 'ALIM'" src="../../../../assets/images/common/selectCheckIcon.svg" style="position: absolute; left: -15px; top: -10px;" alt="">
              <p :class="{lightGray: this.mSelectedWriteType !== 'ALIM' }" class="font14 fontBold mtop-05 commonColor">{{mAlimClickYn === true ? $t('COMMON_TAB_NOTI') : $t('BOTTOM_MSG_NOPERM')}}</p>
          </div>
          <div @click="selectWriteType('BOAR')" class="writeTypeBtnStyle" :class="{widthChange : propTeamKey}" :style="this.mSelectedWriteType === 'BOAR' ? 'border: 3px solid rgb(74 102 158)!important; ' : ''">
              <img class="img-w30" src="../../../../assets/images/main/boardIcon.svg" alt="">
              <img v-if="this.mSelectedWriteType === 'BOAR'" src="../../../../assets/images/common/selectCheckIcon.svg" style="position: absolute; left: -15px; top: -10px;" alt="">
              <p :class="{lightGray: this.mSelectedWriteType !== 'BOAR'}" class="font14 fontBold mtop-03 commonColor">{{ $t('COMMON_TAB_POST') }}</p>
          </div>
          <div @click="selectWriteType('TODO')" class="writeTypeBtnStyle" :style="this.mSelectedWriteType === 'TODO' ? 'border: 3px solid rgb(74 102 158)!important; ' : ''" v-if="!propTeamKey">
              <img style="width: 29px;" src="../../../../assets/images/main/addTodo.png" alt="">
              <img v-if="this.mSelectedWriteType === 'TODO'" src="../../../../assets/images/common/selectCheckIcon.svg" style="position: absolute; left: -15px; top: -10px;" alt="">
              <p :class="{lightGray: this.mSelectedWriteType !== 'TODO' }" class="font14 fontBold mtop-05 commonColor">{{$t('COMMON_NAME_TODOLIST')}}</p>
          </div>
      </div>
  </div>
  <div style="width: 100%; margin-top: 20px; min-height: 30px;" v-if="!propTeamKey && this.mSelectedWriteType === 'BOAR'">
      <p class="font20 fontBold textLeft">{{ $t('BOMMOM_MSG_LETTER') }}</p>
      <div class="lightGray cursorP font16 fontBold okScrollBar" style="border: 3px solid #F4F4F4!important; width: 100%; height: 160px!important; border-radius: 8px; overflow: hidden scroll; padding :15px 20px;" name="" id="">
          <div style="width: 100%; height: 30px; padding: 0 5px; float: left;">
              <div v-for="(chan, index) in mSelectChanList" style="position: relative; float: left; width: 100%; min-height: 100%;" :key="index">
                  <p @click="this.mSelectedChan = chan.teamKey"  class="font16 textLeft h-100P " :class="this.mSelectedChan === chan.teamKey? 'commonLightColor' : 'commonGray'" >{{this.$changeText(chan.nameMtext)}}</p>
                  <img src="../../../../assets/images/common/listSelectCheck.svg" style="position: absolute; right: 10px; top: 5px; " v-if="this.mSelectedChan === chan.teamKey" alt="">
              </div>
          </div>
      </div>
  </div>
  <gBtnLarge v-if="mSelectChanList.length > 0" :style="this.mSelectedChan === 0? 'background: #F4F4F4!important; color: #AAAAAA!important;': ''" class="mtop-2 fontBold" @click="this.mSelectedWriteType === 'BOAR' && this.mSelectedChan === 0? '' : openWritePushPop()" :btnTitle="$t('COMM_BTN_WRITE')" />
  <gBtnLarge  v-else style="background: #F4F4F4!important; color: #AAAAAA!important;" class="mtop-2 fontBold" :btnTitle="$t('BOTTOM_MSG_NOCHAN')" />
</div>
</template>

<script>
import CommonAddContentsForm from '@/components/write/CommonAddContentsForm.vue'

export default {
  props: {
    propTeamKey: {},
    propChanList: {}
  },
  components: {
    CommonAddContentsForm
  },
  data () {
    return {
      mSelectedWriteType: 'ALIM',
      mSelectedChan: 0,
      mSelectChanList: [],
      mAlimClickYn: true,
      mWritePopShowYn: false,
      mOption: {
        model: 'mankik',
        purpose: 'Add ToDo',
        fileServerURL: '/fileServer/tp.uploadFile'
      },
      mTargetDataList: [],
      mGetTodoFamilyList: []
    }
  },
  created () {
    if (this.propChanList && this.propChanList.length > 0) {
      this.mSelectChanList = this.propChanList
      this.mSelectedChan = this.mSelectChanList[0].teamKey
    } else {
      if (!this.propTeamKey) {
        this.getTeamList()
      } else {
        this.mSelectChanList.push(this.propTeamKey)
        this.mSelectedChan = this.propTeamKey
        this.checkPermi()
      }
    }
    this.$addHistoryStack('bottomWriteSheets')
    if (this.GE_USER.unknownYn) {
      this.$router.push('/')
    }
  },
  mounted () {
    console.log(this.CHANNEL_DETAIL)
  },
  beforeUnmount () {
    console.log(' beforeUnmount ')
    this.$checkDeleteHistory('bottomWriteSheets')
  },
  methods: {
    checkPermi () {
      if (!this.propTeamKey === undefined) return
      if (!this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn) {
        this.mSelectedWriteType = 'BOAR'
        this.mAlimClickYn = false
      } else {
        this.mAlimClickYn = true
      }
    },
    async getTeamList (loadingYn) {
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      paramMap.set('pageSize', 100)
      if (this.mSelectedWriteType === 'ALIM') {
        return
        // paramMap.set('canSendAlim', true)
      }
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }

      var resultList = await this.$getTeamList(paramMap, nonLoading)
      if (resultList.data.content) {
        this.mSelectChanList = resultList.data.content
        this.mSelectedChan = this.mSelectChanList[0].teamKey
      }
      console.log(resultList)
    },
    closePop () {
      console.log('emitemitemit')
      this.$emit('closePop')
    },
    selectWriteType (jobkindId) {
      // 알림의 권한이 없으면 바꿀 수 없게
      if (this.mAlimClickYn === false) return
      this.mSelectedWriteType = jobkindId
      if (!this.propTeamKey && jobkindId === 'BOAR') {
        this.mSelectedChan = 0
        this.mSelectChanList = []
        this.getTeamList(false)
      }
    },
    closeAddTodoPop () {
      this.mWritePopShowYn = false
    },
    async openWritePushPop () {
      if (this.mSelectedWriteType === 'TODO' || this.mSelectedWriteType === 'ALIM') {
        this.openAddTodoPop()
        if (this.mSelectedWriteType === 'ALIM') {
          this.mOption.purpose = 'Send Letter'
        }
      } else if (this.mSelectedWriteType !== 'TODO') {
        if (this.mSelectedWriteType === 'BOAR') {
          this.mOption.purpose = 'Send Board'
        }
        if (this.propTeamKey && this.mSelectedWriteType === 'ALIM' && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext) {
          this.$showToastPop(this.$t('BOTTOM_MSG_NOFOLLOW'))
          this.$checkDeleteHistory('bottomWriteSheets')
          this.$emit('openMember')
          return
        }
        var writeParam = {}
        writeParam.contentsJobkindId = this.mSelectedWriteType
        writeParam.targetKey = this.mSelectedChan
        writeParam.teamKey = this.mSelectedChan
        writeParam.currentTeamKey = this.mSelectedChan
        writeParam.targetType = 'writeContents'
        if (this.mSelectedWriteType === 'ALIM') {
          var index = this.mSelectChanList.findIndex((item) => item.teamKey === this.mSelectedChan)
          if (index !== -1) {
            writeParam.targetNameMtext = this.mSelectChanList[index].nameMtext
            writeParam.targetIconPath = this.mSelectChanList[index].logoDomainPath
              ? this.$changeUrlBackslash(
                this.mSelectChanList[index].logoDomainPath + this.mSelectChanList[index].logoPathMtext
              )
              : this.mSelectChanList[index].logoPathMtext
          }
        } else if (this.mSelectedWriteType === 'BOAR') {
          var teamList = await this.$getWriteBoardData(this.mSelectedChan)
          if (teamList === false) {
            this.$showToastPop(this.$t('BOTTOM_MSG_CHECK'))
            return
          }
          writeParam.selectBoardYn = true
          writeParam.initData = teamList
        }
        writeParam.pSelectChanList = this.mSelectChanList
        this.openPop(writeParam)
      }
    },
    openPop (openPopParam) {
      this.$checkDeleteHistory('bottomWriteSheets')
      this.$emit('openPop', openPopParam)
    },
    getSearchResult (value) {
      console.log('searchValue = value', value)
    },
    openSearchArea (type) {
      this.searchAreaYn = !this.searchAreaYn
      this.mWhichType = type
      console.log('this.mWhichType', this.mWhichType)
    },
    closeSearchArea () {
      this.searchAreaYn = false
    },
    setTitleThreeLine () {
      var titleElements = document.querySelectorAll('.realTitle')

      titleElements.forEach((titleElement) => {
        var lineHeight = titleElement.getBoundingClientRect()
        var lineHeightNum = parseInt(lineHeight.height)
        var maxHeight = 60

        if (lineHeightNum > maxHeight) {
          titleElement.classList.add('infoTitle')
        } else {
        }

        setTimeout(() => {
          if (titleElement.offsetHeight > 0) {
            var lineHeight = titleElement.getBoundingClientRect()
            var lineHeightNum = parseInt(lineHeight.height)

            var maxHeight = 60

            if (lineHeightNum > maxHeight) {
              titleElement.classList.add('infoTitle')
            }
            if (lineHeightNum < maxHeight) {
              titleElement.classList.remove('infoTitle')
            }
          } else {
            setTimeout(this.setTitleThreeLine, 100)
          }
        }, 100)
      })
    },
    goToday () {
      this.mSelectDate = new Date()
    },
    compareSameDate (from, to) {
      if (from === to) {
        return from
      } else {
        return `${from} ~ ${to}`
      }
    },
    async goUserProfile (targetUserKey) {
      if (this.GE_USER.unknownYn) {
        this.$showToastPop(`${this.$t('COMM_MSG_NOPERM')}`)
        return
      }
      var openPopParam = {}
      openPopParam.targetType = 'bookMemberDetail'
      openPopParam.userKey = targetUserKey

      // 댓글의 유저를 클릭 시 댓글의 유저키를 넣어준다.
      if (targetUserKey) openPopParam.userKey = targetUserKey
      openPopParam.popHeaderText = this.$t('COMMON_TITLE_PROFILE')
      openPopParam.readOnlyYn = true
      this.$emit('openPop', openPopParam)
    },
    clickFileDownload () {
      return false // 추후 수정
    },
    openActorList (actorIndex, whichTodoIndex) {
      this.mOpenActorListIndex = actorIndex
      this.mGetWhichTodoIndex = whichTodoIndex
      this.mOpenActorListYn = !this.mOpenActorListYn
    },
    closeActorList () {
      this.mOpenActorListYn = false
    },
    getMonthDate (date) {
      var format = 'MM/DD'
      return this.$dayjs(date).add(9, 'hour').format(format)
    },
    getHowLate (toDate, endDate = new Date()) {
      const howLate = new Date(endDate).getTime()
      const toDateNew = new Date(toDate).getTime()
      const timeDifference = howLate - toDateNew
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      return daysDifference
    },
    goDetail (value) {
      var param = {}
      param.targetType = 'contentsDetail'
      param.targetKey = value.contentsKey
      param.popHeaderText = this.$t('COMMON_NAME_TODOLIST')
      param.teamKey = 0
      param.creTeamKey = 0
      param.jobkindId = value.jobkindId
      // param.creTeamKey = value.creTeamKey
      param.value = value
      value.readYn = 1
      param.readYn = value.readYn
      this.$emit('goDetail', param)
    },
    closeXPop (popId) {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$checkDeleteHistory(popId)
    },
    closeWritePop () {
      this.closeXPop('writeContents')
      this.mWritePopShowYn = false
    },
    async saveContents (params) {
      params.creUserKey = this.GE_USER.userKey
      params.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      params.jobkindId = this.mSelectedWriteType
      if (params.actorList) {
        const tempList = [...params.actorList]
        const actorList = []
        tempList.forEach((val) => {
          if (val.accessKind === 'F') {
            if (val.cList) {
              val.cList.forEach(val2 => {
                actorList.push({
                  accessKey: val2.accessKey,
                  accessKind: val2.accessKind,
                  actType: val.actType
                })
              })
            }
          } else {
            actorList.push({
              accessKey: val.accessKey,
              accessKind: val.accessKind,
              actType: val.actType
            })
          }
        })
        params.actorList = actorList
      }
      const res = await this.$saveContents(params)
      console.log(res)
      if (res.result) {
        if (params.jobkindId === 'TODO') this.$showToastPop(this.$t('COMM_MSG_ADD_TODO'))
        if (params.jobkindId === 'ALIM') this.$showToastPop(this.$t('COMM_MSG_SUCC_LETTER'))
        params = {}
        params.contentsKey = res.contents.contentsKey
        params.jobkindId = res.contents.jobkindId
        var resultList = await this.$getContentsList(params)
        var detailData = resultList.content[0]
        this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData])
        if (res.sticker) {
          await this.$store.dispatch('D_CHANNEL/AC_STICKER_LIST', res.sticker)
        }
        this.closePop()
      } else {
        if (params.jobkindId === 'TODO') this.$showToastPop(this.$t('COMM_MSG_ADD_TODO_FAIL'))
        if (params.jobkindId === 'ALIM') this.$showToastPop(this.$t('COMM_MSG_FAIL_LETTER'))
      }

      this.$checkDeleteHistory('bottomWriteSheets')
      this.closeWritePop('WriteContents', this.closeWritePop)
    },
    returnTag () {
      return this.GE_STICKER_LIST
    },
    MoveDate (value) {
      this.setCountDate += value
      const setDate = this.mSelectDate.setDate(
        this.mSelectDate.getDate() + value
      )
      const returnDate = new Date(setDate)
      this.mSelectDate = returnDate
    },
    // target data를 공통 작성 화면에서 원하는 형태로 컨버팅 하는 함수
    convertTargetData (target, followYn, recentYn) {
      console.log(target)
      if (target && target.length > 0) {
        const tempList = []
        target.forEach((value) => {
          const tempObj = {}
          if (recentYn) {
            value.accessKind = value.targetKind
            delete value.targetKind
            value.accessKey = value.targetKey
            if (value.accessKind === 'C') {
              value.cabinetKey = value.targetKey
            } else {
              value.accessName = value.userDispMtext
              value.iconFullYn = true
              value.iconPath = value.userDomainPath
                ? this.$changeUrlBackslash(
                  value.userDomainPath + value.userProfileImg
                )
                : value.userProfileImg
            }
            delete value.targetKey
          }
          if ((!value.cabinetKey && value.userKey) || (value.accessKind && value.accessKind === 'U')) {
            if (followYn) {
              tempList.push({
                accessKind: 'U',
                accessKey: value.targetKey,
                accessName: value.targetDispMtext,
                iconFullYn: true,
                iconPath: value.targetDomainPath
                  ? this.$changeUrlBackslash(
                    value.targetDomainPath + value.targetProfileImg
                  )
                  : value.targetProfileImg
              })
            } else {
              tempList.push(value)
            }
          } else if (value.teamKey && value.nameMtext) {
            tempList.push({
              accessKind: 'T',
              accessKey: value.teamKey,
              accessName: value.nameMtext,
              iconFullYn: true,
              iconPath: value.logoDomainPath
                ? this.$changeUrlBackslash(
                  value.logoDomainPath + value.logoPathMtext
                )
                : value.logoPathMtext
            })
          } else {
            tempObj.accessKind = 'C'
            tempObj.accessKey = value.cabinetKey
            tempObj.iconPath = require('@/assets/images/editChan/icon_addressBook.svg')
            // targetList에 나타나는 아이콘을 원 안에 가득 채울지, 아닐지 결정하는 변수
            tempObj.iconFullYn = false
            tempObj.accessName = value.cabinetNameMtext
            if (value.mCabUserList && value.mCabUserList.length > 0) {
              const childTempList = []
              value.mCabUserList.forEach((value2) => {
                const childTempObj = {}
                childTempObj.accessKind = 'U'
                childTempObj.accessKey = value2.userKey
                childTempObj.iconFullYn = true
                childTempObj.iconPath = value2.domainPath
                  ? this.$changeUrlBackslash(
                    value2.domainPath + value2.userProfileImg
                  )
                  : value2.userProfileImg
                childTempObj.accessName = this.$changeText(value2.userDispMtext)
                childTempList.push(childTempObj)
              })
              tempObj.cList = childTempList
            } else {
              tempObj.cList = []
            }
            tempList.push(tempObj)
          }
        })
        return tempList
      }
    },
    returnTargetData (target) {
      if (target) {
        return this.convertTargetData(target)
      } else {
        console.log('returnData : this.mTargetDataList', this.mTargetDataList)
        return this.mTargetDataList
        // setTimeout(() => {
        //   console.log('target no after 3 seconds:', this.mTargetDataList)
        //   return this.mTargetDataList
        // }, 1000)
      }
    },
    convertActorList (cont) {
      if (!cont.actorList || cont.actorList.length === 0) return []
      if (cont.actorList.length > 3) {
        cont.mNewActorList = cont.actorList.slice(0, 3)
      }
    },
    todosideMenu (todo, value, groupIndex, todoIndex) {
      this.mSelectTodo = todo
    },
    getToday (value) {
      var date = value
      var year = date.getFullYear()
      var month = ('0' + (1 + date.getMonth())).slice(-2)
      var day = ('0' + date.getDate()).slice(-2)

      return year + '-' + month + '-' + day
    },
    getDate (value) {
      // -1:day-1, 0:day, 1:day+1
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
    openUpdatePop () {
      if (this.mTodoObj.targetKey !== this.GE_USER.userKey) {
        const cabUserList = []
        for (let i = 0; i < this.mGetTodoFamilyList.length; i++) {
          if (
            this.mTodoObj.targetKey === this.mGetTodoFamilyList[i].cabinetKey
          ) {
            for (
              let j = 0;
              j < this.mGetTodoFamilyList[i].mCabUserList.length;
              j++
            ) {
              if (this.mGetTodoFamilyList[i].mCabUserList[j].ownerYn) {
                if (!this.mGetTodoFamilyList[i].mCabUserList[j].dispMtext) {
                  cabUserList.push({
                    opt: '만끽이',
                    value: this.mGetTodoFamilyList[i].mCabUserList[j].userKey
                  })
                } else {
                  cabUserList.push({
                    opt: this.$changeText(
                      this.mGetTodoFamilyList[i].mCabUserList[j].userDispMtext
                    ),
                    value: this.mGetTodoFamilyList[i].mCabUserList[j].userKey
                  })
                }
              } else {
                cabUserList.push({
                  opt: this.$changeText(
                    this.mGetTodoFamilyList[i].mCabUserList[j].userDispMtext
                  ),
                  value: this.mGetTodoFamilyList[i].mCabUserList[j].userKey
                })
              }
            }
          }
        }
        this.mFamilyList = cabUserList
      } else {
        this.mFamilyList = [
          {
            opt: this.$changeText(this.GE_USER.userDispMtext),
            value: this.GE_USER.userKey
          }
        ]
      }
      this.mSetPopShowYn = true
      this.mOpenMenuShowYn = false
    },
    calPercent (total, com) {
      let returnData = ''
      if (com === 0) {
        returnData = 0
      } else {
        returnData = Math.floor((total / com) * 100) + ''
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
      this.mOpenMenuShowYn = true
    },
    closeSubMenu () {
      this.mOpenMenuShowYn = false
    },
    closeTodoDetail () {
      this.mTodoDetailShowYn = false
    },
    async openAddTodoPop () {
      if (this.mGetTodoFamilyList.length === 0) {
        var paramMap = {}
        paramMap.userKey = this.GE_USER.userKey
        paramMap.sysCabinetCode = 'USER'
        var result = await this.$getTodoListGroupCab(paramMap, true)
        if (result.result) {
          let tempList = this.convertTargetData(result.userTeam)
          this.mTargetDataList.push(
            {
              tabIndex: 0,
              tabType: 'TEAM',
              tabName: '채널',
              targetList: tempList
            }
          )
          tempList = this.convertTargetData(result.user)
          const fList = this.convertTargetData(result.follow, true)
          let fDispText = ''
          if (fList && fList.length > 0) {
            fList.forEach((element, index) => {
              fDispText += this.$changeText(element.accessName)
              if (index !== fList.length - 1) fDispText += ', '
            })
          }
          tempList.unshift(
            {
              accessKey: 1,
              accessKind: 'F',
              iconPath: require('@/assets/images/common/DFollowerIcon.svg'),
              accessName: 'KO$^$팔로잉$#$EN$^$following',
              accessDispComment: fDispText,
              cList: fList
            }
          )
          this.mTargetDataList.unshift(
            {
              tabIndex: 1,
              tabType: 'USER',
              tabName: '내주소록',
              targetList: tempList
            }
          )
          if (result.recent && result.recent.length > 0) {
            tempList = this.convertTargetData(result.recent, null, true)
            this.mTargetDataList.unshift(
              {
                tabIndex: 2,
                tabType: 'RECE',
                tabName: '최근선택',
                targetList: tempList
              }
            )
          }
          this.mWritePopShowYn = true
        }
      } else {
        this.mWritePopShowYn = true
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
    changeTodoList (baseList, targetList) {
      // var this_ = this
      if (!targetList && targetList.length === 0) return []
      var uniqueArr = targetList.reduce(function (data, current) {
        if (
          data.findIndex(
            (item) => Number(item.contentsKey) === Number(current.contentsKey)
          ) === -1
        ) {
          /* if (data.findIndex(({ mccKey }) => mccKey === current.mccKey) === -1 && ((this_.viewMainTab === 'P' && current.jobkindId === 'ALIM') || (this_.viewMainTab === 'B' && current.jobkindId === 'BOAR'))) { */
          if (baseList.findIndex(
            (i) => Number(i.contentsKey) === Number(current.contentsKey)
          ) === -1
          ) {
            data.push(current)
          } else {
            current.dupYn = true
            data.push(current)
          }
        }
        // data = data.sort(function (a, b) {
        //   return b.contentsKey - a.contentsKey
        // })
        return data
      }, [])
      return uniqueArr
    },
    goMain () {
      this.$router.push('/')
    },
    getVuexList (data) {
      let idx1, idx2
      const returnAlimList = []
      let chanDetail = null
      let dataList = null
      const contList = data.content
      if (!contList) return data
      var i = 0
      for (i = 0; i < contList.length; i++) {
        if (contList[i].jobkindId === 'TODO') contList[i].creTeamKey = 0
        idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === contList[i].creTeamKey)
        chanDetail = this.GE_MAIN_CHAN_LIST[idx1]
        dataList = chanDetail.ELEMENTS.todoList
        idx2 = dataList.findIndex((item) => item.contentsKey === contList[i].contentsKey)
        if (idx2 !== -1) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          contList[i] = dataList[idx2]
          returnAlimList.push(dataList[idx2])
        } else {
          returnAlimList.push(contList[i])
        }
      }
      data.content = this.replaceArr(returnAlimList)
      return data
    },
    replaceMemoArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (
          data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1
        ) {
          data.push(current)
        }
        data = data.sort(function (a, b) {
          // num으로 오름차순 정렬
          return b.memoKey - a.memoKey
          // [{num:1, name:'one'},{num:2, name:'two'},{num:3, name:'three'}]
        })
        return data
      }, [])
      return uniqueArr
    }
  },
  computed: {
    GE_STICKER_LIST () {
      return this.$store.getters['D_CHANNEL/GE_STICKER_LIST']
    },
    CHANNEL_DETAIL () {
      if (this.propTeamKey) {
        var detail = this.$getDetail('TEAM', this.propTeamKey)
        if (detail && detail.length > 0) {
          if (!detail[0].D_CHAN_AUTH || detail[0].D_CHAN_AUTH === true || (detail[0].D_CHAN_AUTH.followYn && !detail[0].D_CHAN_AUTH.settingYn)) {
            return this.CHANNEL_DETAIL
          } else {
            return detail[0]
          }
        } else {
          if (this.CHANNEL_DETAIL) {
            return this.CHANNEL_DETAIL
          } else {
            return null
          }
        }
      }
      return null
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate () {
      var history = this.$store.getters['D_HISTORY/hStack']
      if (history[history.length - 1] === 'bottomWriteSheets') {
        this.closePop()
      }
    }
  }
}
</script>

<style>
.writeTypeBtnStyle {
    float:left; width: calc(33% - 10px); height: 95px; cursor:pointer; border-radius: 6px;position: relative; border: 3px solid #F4F4F4; display: flex; flex-direction: column; justify-content: center; align-items: center;
}
.widthChange{
  width: calc(50% - 10px) !important;
}
.noneClickCSS {
  border-radius: 6px;
  position: absolute;
  background: #00000030;
  /* background: #cccccc; */
}
</style>
