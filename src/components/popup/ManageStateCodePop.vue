<i18n>
{
  "ko": {
    "TASK_MANAGEMENT": "업무설정",
    "FOUND_DATE": "발견일",
    "MANAGER": "담당자",
    "DUE_DATE": "목표일",
    "ADD_COMMENT": "댓글 추가",
    "STATUS_CHECK_POP": "상태값 설정 후 댓글을 작성해주세요",
    "NO_SELECTED_MANAGER": "선택된 담당자가 없습니다.",
    "APPLY": "적용하기",
    "STATUS_TITLE_STATUS": "상태설정"
  },
  "en": {
    "TASK_MANAGEMENT": "Task Management",
    "FOUND_DATE": "Found Date",
    "MANAGER": "Manager",
    "DUE_DATE": "Target Date",
    "ADD_COMMENT": "Add Comment",
    "STATUS_CHECK_POP": "Add comment after setting its status.",
    "NO_SELECTED_MANAGER": "No selected manger yet.",
    "APPLY": "Apply",
    "STATUS_TITLE_STATUS": "Status Settings"
  }
}
</i18n>
<template>
  <div class="fl manageCodePopWrap" :ref="'stateCodePop' + contentsKey">
    <div class="manageCodePopBox">
      <div class="font18 commonColor fontBold manageCodePopHeader">
        {{ $t('TASK_MANAGEMENT') }}
        <img @click="closeSelectPop" class="cursorP" src="@/assets/images/common/smallPopXIcon.svg" alt="">
      </div>

      <div class="thinScrollBar manageCodePopBody" >
        <p class="font15 textLeft fl fontBold w100P mtop-05 optionTitle">{{ $t('FOUND_DATE') }}</p>
        <div class="commonListContentBox cursorP font14 optionContBox">{{settingDate(alimDetail.creDate)}}</div>
        <p class="font15  textLeft fl fontBold w100P mtop-05 optionTitle">{{ $t('MANAGER') }}</p>
        <div class="commonListContentBox cursorP font14 optionContBox" @click="openSelectMemberPop">{{selectedList.memberList.length> 0 ? $changeText(selectedList.memberList[0].userDispMtext) : $t('NO_SELECTED_MANAGER') }}</div>
        <p class="font15 textLeft fl fontBold w100P mtop-05 optionTitle">{{ $t('DUE_DATE') }}</p>
        <Datepicker
          class="datePicker"
          inline
          :editable="false"
          v-model:value="workDate.toDate"
          type="date"
          :placeholder="dateHolder"
          titleFormat="YYYY-MM-DD"
        ></Datepicker>
        <p class="font15 textLeft fl fontBold w100P mtop-1 optionTitle">{{ $t('STATUS_TITLE_STATUS') }}</p>
        <div class="w100P fl">
          <div @click="selectCode(value)" class="cursorP stateCodeItem" :class="value.codeKey === selectedCodeObj.codeKey? 'selectedCode' : ''" v-for="(value, index) in codeList" :key="index" :style="statBackColor(value.codeKey, true)" >
            <p :style="statBackColor(value.codeKey)" class="commonBlack mleft-05 font14 fontBold">{{$changeText(value.codeNameMtext)}}</p>
            <img :src="value.domainPath + value.pathMtext" alt="">
          </div>
        </div>
        <p class="font15 textLeft fl fontBold w100P mtop-05">{{ $t('ADD_COMMENT') }}</p>
        <div @click="changeInputText" ref="memoBodyStr" class="commonBlack font15 textLeft stateInputArea" v-if="selectedCodeObj.codeKey !== 0" :contenteditable="true"></div>
        <div ref="memoBodyStr" v-else class="commonBlack font15 textLeft activeInput" >
            {{ $t('STATUS_CHECK_POP') }}
        </div>
      </div>
      <div class="applyBtnWrap">
        <gBtnSmall @click="(currentCodeKey === selectedCodeObj.codeKey && workDate.workToDate === null && selectedList.memberList.lenth === 0)? '': changeContentsStat()" :style="(currentCodeKey === selectedCodeObj.codeKey && workDate.workToDate === null && selectedList.memberList.lenth === 0) ? 'background: #F5F5F9!important; color: #A7A7A7!important; ': ''" :btnTitle="$t('APPLY')" class="font16 mright-05 applyBtn"/>
      </div>
      <receiverAccessList v-if="selectBookListShowYn" :oneMemberCanAddYn="true" :propData="{currentTeamKey: alimDetail.creTeamKey}" :chanAlimListTeamKey="alimDetail.creTeamKey" :itemType="shareActorItemType" @closeXPop="selectBookListShowYn=false" :parentList="parentList" :selectList="selectedList"  @sendReceivers="setSelectedList"/>
    </div>
  </div>
</template>
<script>
import receiverAccessList from './receiver/SelectReceiverAccessList.vue'
export default {
  components: {
    receiverAccessList
  },
  data () {
    return {
      chanSelectedListYn: false,
      selectedList: { memberList: [], bookList: [] },
      selectPopShowYn: false,
      selectPopId: null,
      workDate: { toDate: null, fromDate: null },
      nullObj: { codeKey: 0, codeNameMtext: '상태없음' },
      selectedCodeObj: { codeKey: null, codeNameMtext: null },
      defaltMemoYn: true,
      dateHolder: 'Set a target date',
      parentList: { memberList: [], bookList: [] },
      selectBookListShowYn: false
    }
  },
  async created () {
    this.openSelectPop()
    if (this.alimDetail) {
      var this_ = this
      var paramMap = new Map()
      if (this.alimDetail.workToDate) {
        this.dateHolder = this.settingDate(this.alimDetail.workToDate)
      }
      if (this.alimDetail.shareList) {
        for (var i = 0; i < this.alimDetail.shareList.length; i++) {
          var accessKind = this.alimDetail.shareList[i].accessKind
          if (accessKind === 'U') {
            this.parentList.memberList.push(this.alimDetail.shareList[i])
          } else if (accessKind === 'C' || accessKind === 'M' || accessKind === 'F') {
            if (this.alimDetail.shareList[i].muserList && this.alimDetail.shareList[i].muserList.length > 0) {
              for (var s = 0; s < this.alimDetail.shareList[i].muserList.length; s++) {
                var shareUser = this.alimDetail.shareList[i].muserList[s]
                var settingObj = {}
                settingObj.accessKind = 'U'
                settingObj.accessKey = shareUser.userKey
                settingObj.userDispMtext = shareUser.userDispMtext
                settingObj.phoneEnc = shareUser.phoneEnc
                settingObj.userEmail = shareUser.userEmail
                settingObj.userProfileImg = shareUser.userProfileImg
                settingObj.domainPath = shareUser.domainPath
                settingObj.shareseq = undefined
                this.parentList.memberList.push(settingObj)
              }
            } else {
              paramMap = new Map()
              paramMap.set('teamKey', this.teamKey)
              paramMap.set('currentTeamKey', this.teamKey)
              this_ = this
              this.$getFollowerList(paramMap).then((res) => {
                console.log(res)
                for (var s = 0; s < res.length; s++) {
                  var shareUser = res[s]
                  var settingObj = {}
                  settingObj.accessKind = 'U'
                  settingObj.accessKey = shareUser.userKey
                  settingObj.userDispMtext = shareUser.userDispMtext
                  settingObj.phoneEnc = shareUser.phoneEnc
                  settingObj.userEmail = shareUser.userEmail
                  settingObj.userProfileImg = shareUser.userProfileImg
                  settingObj.domainPath = shareUser.domainPath
                  settingObj.shareseq = undefined
                  this_.parentList.memberList.push(settingObj)
                }
              })
            }
          } else if (accessKind === 'T') {
            paramMap = new Map()
            paramMap.set('teamKey', this.teamKey)
            paramMap.set('currentTeamKey', this.teamKey)
            this_ = this
            await this.$getFollowerList(paramMap).then((res) => {
              for (var s = 0; s < res.length; s++) {
                var shareUser = res[s]
                var settingObj = {}
                settingObj.accessKind = 'U'
                settingObj.accessKey = shareUser.userKey
                settingObj.userDispMtext = shareUser.userDispMtext
                settingObj.phoneEnc = shareUser.phoneEnc
                settingObj.userEmail = shareUser.userEmail
                settingObj.userProfileImg = shareUser.userProfileImg
                settingObj.domainPath = shareUser.domainPath
                settingObj.shareseq = undefined
                this_.parentList.memberList.push(settingObj)
              }
            })
          }
        }
      }
      if (this.alimDetail.workUserKey) {
        var idx = this.parentList.memberList.findIndex((item) => {
          return item.accessKey === this.alimDetail.workUserKey
        })
        if (idx !== -1) this.selectedList.memberList.push(this.parentList.memberList[idx])
      }
    }
  },
  props: {
    codeList: {},
    contentsKey: {},
    teamKey: {},
    alimDetail: {}
  },
  methods: {
    setSelectedList (datas) {
      // 권한 선택시 실행
      this.selectedShareList = []
      var data = datas
      this.selectBookListShowYn = false
      if (data.memberList) {
        var settingMemList = []
        for (let i = 0; i < data.memberList.length; i++) {
          var tempList = {}
          tempList.userDispMtext = this.$changeText(data.memberList[i].userDispMtext)
          tempList.userNameMtext = this.$changeText(data.memberList[i].userNameMtext)
          tempList.accessKey = data.memberList[i].accessKey
          tempList.accessKind = 'U'
          tempList.cabinetKey = this.alimDetail.cabinetKey
          settingMemList.push(tempList)
        }
        this.selectedList.memberList = settingMemList
        this.chanSelectedListYn = true
      }
    },
    changeInputText () {
      this.defaltMemoYn = false
    },
    openSelectPop () {
      var history = this.$store.getters['UB_HISTORY/hStack']
      this.selectPopId = 'selectStateCodePop' + this.contentsKey
      history.push(this.selectPopId)
      this.$store.commit('UB_HISTORY/updateStack', history)
    },
    closeSelectPop () {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      this.workDate = { toDate: '', fromDate: '' }
      if (this.selectPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', hStack)
        var idx = this.codeList.findIndex((item) => item.codeKey === this.currentCodeKey)
        this.$emit('closeXPop')
        if (idx !== -1) {
          this.selectedCodeObj = this.codeList[idx]
        } else {
          this.selectedCodeObj = this.nullObj
        }
      }
    },
    selectCode (value) {
      this.selectedCodeObj = value
    },
    async changeContentsStat () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      try {
        var setOkYn = false
        param.workStatCreUserKey = this.GE_USER.userKey
        param.workStatCreUserName = this.GE_USER.userDispMtext
        param.memoHeaderStr = '<p class="commonMemoWorkStatHeaderColor" style="font-weight: bold; text-align: left; font-size: 14px; width: 100%;">'
        if (this.selectedCodeObj.codeKey && this.currentCodeKey !== this.selectedCodeObj.codeKey) {
          param.workStatCodeKey = this.selectedCodeObj.codeKey
          param.memoHeaderStr += '[' + this.$changeText(this.selectedCodeObj.codeNameMtext) + ']'
          setOkYn = true
        }
        if (this.workDate.toDate !== undefined && this.workDate.toDate !== null && this.workDate.toDate !== '') {
          var toDate = this.settingDate(this.workDate.toDate)
          param.workToDateStr = toDate
          param.memoHeaderStr += 'Due Date ' + this.settingDate(this.workDate.toDate)
          setOkYn = true
        }
        if (this.selectedList.memberList.length > 0 && this.selectedList.memberList[0] && this.chanSelectedListYn) {
          param.workUserKey = this.selectedList.memberList[0].accessKey
          param.workUserName = this.selectedList.memberList[0].userDispMtext
          param.memoHeaderStr += 'Manager ' + this.$changeText(this.selectedList.memberList[0].userDispMtext)
          setOkYn = true
        }
        param.memoHeaderStr += 'Changed<br></p>'
        if (setOkYn) {
          param.memoBodyStr = this.$refs.memoBodyStr.innerHTML
          if (!param.memoBodyStr || param.memoBodyStr === '') {
            param.nonMemoYn = true
            param.memoBodyStr = ''
          }
          param.contentsKey = this.contentsKey
          param.creTeamKey = this.teamKey
          var result = await this.$commonAxiosFunction({
            url: '/sUniB/tp.updateWorkStat',
            param: param
          })
          if (result.data.result === true) {
            var newParam = {}
            newParam.contentsKey = result.data.contents.contentsKey
            newParam.jobkindId = 'BOAR'
            await this.$getContentsList(newParam).then(newReslute => {
              this.$store.dispatch('UB_CHANNEL/AC_ADD_CONTENTS', newReslute.content)
            })
            this.$showToastPop('Status has changed.')

            this.closeSelectPop()
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.$emit('closeXPop', true)
        this.sendLoadingYn = false
      }
    },
    openSelectMemberPop () {
      this.selectBookListShowYn = true
    },
    settingDate (date) {
      if (date !== '') {
        return this.$dayjs(date).format('YYYY-MM-DD')
      }
    },
    statBackColor (value, boxYn) {
      if (!value) {
        return
      }
      var styleStr = 'background-color: '
      var codeNum = value
      if (codeNum === 40 || codeNum === 41) {
        styleStr += '#D0FBE8 ; color: #2DB77D;'
      } else if (codeNum === 42 || codeNum === 43 || codeNum === 44) {
        styleStr += '#FBF6D0 ; color: #B7902D;'
        if (boxYn && codeNum === 44) {
          styleStr += '    margin-right: 100px!important;'
        }
      } else if (codeNum === 45 || codeNum === 46) {
        styleStr += '#DFF7FF ; color: #2D75B7;'
      } else if (codeNum === 47 || codeNum === 48) {
        styleStr += '#FFE1DF; color: #B72D2D;'
      }
      return styleStr
    }
  },
  computed: {
    historyStack () {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    }
  },
  watch: {
    pageUpdate (value, old) {
      this.closeSelectPop()
    },
    historyStack: {
      handler (value, old) {
        if (!value) return
        this.closeSelectPop()
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.manageCodePopWrap {
  padding: 0 10px;
  border-radius: 8px;
  background: #bfbfda;
  color: #fff;
  text-align: left;
}
.selectedCode {
  border: 2px solid #5F61BD!important;
  margin: 5px 5px!important;
}
.activeInput {
  background: #cccccc1c;
}
.manageCodePopBg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #00000025;
  z-index: 10;
}
.manageCodePopBox {
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  width: 80%;
  min-height: 300px;
  height: 80%;
  position: fixed;
  box-shadow: rgb(0 0 0 / 12%) 4px 4px 12px 1px;
  top: 10%;
  left: 10%;
  border-radius:0.8rem;
  background: #FFF;
  z-index: 100000;
}
.manageCodePopHeader {
  width: 100%;
  position: relative;
  float: left;
  padding: 0 20px;
  box-shadow: 0 4px 4px -4px #ccc;
  height: 35px;
}
.manageCodePopHeader > img {
  position: absolute;
  right: 20px;
  top: 10px;
}
.manageCodePopBody {
  width: 100%;
  float: left;
  padding: 0 20px;
  margin-top: 10px;
  overflow: hidden scroll;
}
.optionTitle {
  color: #6c757d;
}
.optionContBox {
  float: left;
  color: #6c757d;
  border-radius: 5px !important;
  padding: 10px 6px!important;
  background: ghostwhite !important;
  width: 100%;
  height: 40px;
  margin-right: 10px;
}
.datePicker {
  font-size: 14px !important;
  float: left !important;
  width: 100% !important;
}
.stateCodeItem {
  width: calc(50% - 10px);
  text-align: center;
  float: left;
  position: relative;
  margin: 7px 5px;
  border-radius: 8px;
  min-height: 30px;
  padding: 5px 0;
}
.stateCodeItem > img {
  width: 15px;
  position: absolute;
  left: 8px;
  top: 10px;
}
.stateInputArea {
  width: 100%;
  height: 100px;
  border-radius: 8px;
  margin-top: 5px;
  cursor: text;
  border: 1px solid #EEEEEE;
  float: left;
  padding: 5px 10px 10px 10px;
  overflow: hidden scroll;
}
.activeInput {
  width: 100%;
  height: 100px;
  border-radius: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  float: left;
  padding: 10px 15px;
  overflow: hidden scroll;
}
.applyBtnWrap {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  padding: 5px 20px;
  margin-top: 15px;
}
.applyBtn {
  width: 155px;
  height: 33px;
  padding: 0px 5px 0px 7px;
}
.selectBookListPopBg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
}
</style>
