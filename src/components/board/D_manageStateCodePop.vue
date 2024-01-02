<template>
  <!-- wh-100P 삭제함-->
  <div class="fl" :ref="'stateCodePop' + this.contentsKey" style=" padding: 0 10px; border-radius: 8px; background: #bfbfda;  color: #fff; text-align: left;">
    <div @click="closeSelectPop" style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; background: #00000025; z-index: 10"></div>
    <div style="display: flex; padding: 10px 0; flex-direction: column; width: 80%; min-height: 300px; height: 80%; position: fixed; box-shadow: rgb(0 0 0 / 12%) 4px 4px 12px 1px; top: 10%; left: 10%; border-radius:0.8rem; background: #FFF; z-index: 11">
      <div style="width: 100%; position: relative; float: left; padding: 0 20px; box-shadow: 0 4px 4px -4px #ccc; height: 35px; " class="font18 commonColor fontBold">
        업무설정
        <img @click="closeSelectPop" class="cursorP" style="position: absolute; right: 20px; top: 10px;" src="../../assets/images/common/smallPopXIcon.svg" alt="">
      </div>

      <div style="width: 100%; float: left; padding: 0 20px; margin-top: 10px; overflow: hidden scroll;" class="thinScrollBar" >
        <p class="font15 textLeft fl fontBold w-100P mtop-05">발견일</p>
        <div class="commonListContentBox cursorP font14" style="float: left; color: #6c757d; border-radius: 5px !important; padding: 10px 6px!important;   background: ghostwhite !important; width: calc(100%); height: 40px;margin-right: 10px;">{{settingDate(alimDetail.creDate)}}</div>
        <p class="font15  textLeft fl fontBold w-100P mtop-05">담당자</p>
        <div class="commonListContentBox cursorP font14" @click="openSelectMemberPop" style="float: left; color: #6c757d; border-radius: 5px !important; padding: 10px 6px!important;   background: ghostwhite !important; width: calc(100%); height: 40px;margin-right: 10px;">{{selectedList.memberList.length> 0 ? this.$changeText(selectedList.memberList[0].userDispMtext) : '선택된 담당자가 없습니다.'}}</div>
        <p class="font15 textLeft fl fontBold w-100P mtop-05">목표일</p>
        <Datepicker
          style="font-size: 14px; float: left; width: calc(100%);"
          inline
          :editable="false"
          v-model:value="workDate.toDate"
          type="date"
          :placeholder="dateHolder"
          titleFormat="YYYY-MM-DD"
        ></Datepicker>
        <p class="font15 textLeft fl fontBold w-100P mtop-1">상태설정</p>
        <div style="width: 100%; float: left;">
          <div @click="selectCode(value)" class="cursorP" :class="value.codeKey === selectedCodeObj.codeKey? 'selectedCode' : ''" v-for="(value, index) in this.codeList" :key="index" style="width: calc(50% - 10px); text-align: center; float: left; position: relative; margin: 7px 5px; border-radius: 8px; border min-height: 30px; padding: 5px 0;" :style="statBackColor(value.codeKey, true)" >
            <p :style="statBackColor(value.codeKey)" class="commonBlack mleft-05 font16 fontBold">{{this.$changeText(value.codeNameMtext)}}</p>
            <img :src="value.domainPath + value.pathMtext" style="width: 15px;position: absolute; left: 8px; top: 10px;" alt="">
          </div>
        </div>
        <p class="font15 textLeft fl fontBold w-100P mtop-05">댓글 추가</p>
        <!-- <p class="font14 commonBlack textLeft">빈칸으로 작성시{{'"상태를 "' + this.$changeText(this.selectedCodeObj.codeNameMtext) + '"(으)로 변경합니다." 댓글이 추가됩니다.'}}</p> -->
        <div @click="changeInputText"  ref="memoBodyStr" class="commonBlack font15 textLeft" v-if="selectedCodeObj.codeKey !== 0" style="width: 100%; height: 100px; border-radius: 8px; margin-top: 5px;  cursor: text;     border: 1px solid #EEEEEE; float: left; padding: 5px, 10px, 10px, 10px; overflow: hidden scroll; "  :contenteditable="true"></div>
        <div ref="memoBodyStr" v-else style="width: 100%; height: 100px; border-radius: 8px; margin-top: 5px; border: 1px solid #ccc; float: left; padding: 10px 15px; overflow: hidden scroll;" class="commonBlack font15 textLeft activeInput" >
            상태값 설정 후 댓글을 작성해주세요
        </div>
        <!-- <span class="font15 commonBlack" v-show="selectedCodeObj.codeKey === 0">상태를 선택하고 댓글을 입력해주세요</span> -->
        <!-- <div @click="selectCode(value)" :style="Number(index) === Number(this.codeList.length - 1)? 'border-bottom: none !important;':'border-bottom: 1px solid #ccc;'" :class="value.codeKey === selectedCodeObj.codeKey? 'selectedCode' : ''" v-for="(value, index) in this.codeList" :key="index" style="width: 100%; position: relative; border min-height: 30px; padding: 5px 0;">
            <p class="commonBlack mleft-05 font16 fontBold">{{this.$changeText(value.codeNameMtext)}}</p>
            <img v-if="value.codeKey === selectedCodeObj.codeKey" src="../../assets/images/common/Tal_checkImage.svg" style="width: 20px;position: absolute; right: 10px; top: 10px;" alt="">
        </div> -->
      </div>
      <!-- <div style="width: 100%; height: 40px; display: flex; justify-content: center; padding: 5px 20px; margin-top: 15px;">
        <gBtnSmall @click="(currentCodeKey === this.selectedCodeObj.codeKey || (this.workDate.toDate) === '') === true ? '': changeContentsStat()" :style="(currentCodeKey === this.selectedCodeObj.codeKey || (this.workDate.toDate) === '') === true ? 'background: #F5F5F9!important; color: #A7A7A7!important; ': ''" style="width: 155px; height: 33px; padding: 0px 5px 0px 7px; "  btnTitle="적용하기" class="font16 mright-05"/>
      </div> -->
      <div style="width: 100%; height: 40px; display: flex; justify-content: center; padding: 5px 20px; margin-top: 15px;">
        <gBtnSmall @click="(currentCodeKey === this.selectedCodeObj.codeKey && workDate.workToDate === null && selectedList.memberList.lenth === 0)? '': changeContentsStat()" :style="(currentCodeKey === this.selectedCodeObj.codeKey && workDate.workToDate === null && selectedList.memberList.lenth === 0) ? 'background: #F5F5F9!important; color: #A7A7A7!important; ': ''" style="width: 155px; height: 33px; padding: 0px 5px 0px 7px; "  btnTitle="적용하기" class="font16 mright-05"/>
      </div>
      <!-- <div style="width: 100%; height: 40px; padding: 5px 20px; margin-top: 15px;">
        <gBtnSmall @click="closeSelectPop" btnThema="light" btnTitle="취소"/>
        <gBtnSmall @click="changeContentsStat" btnTitle="적용" class="mright-05"/>
      </div> -->
    </div>
    <div v-if="selectBookListShowYn"  style="width: 100%; height: 100%; position: fixed;top: 0; left: 0; z-index: 12;">
      <receiverAccessList :oneMemberCanAddYn="true" :propData="{currentTeamKey: this.alimDetail.creTeamKey}" :chanAlimListTeamKey="this.alimDetail.creTeamKey" :itemType="shareActorItemType" @closeXPop='selectBookListShowYn=false' :parentList='parentList' :selectList='selectedList'  @sendReceivers='setSelectedList'/>
    </div>
  </div>
</template>
<script>
import receiverAccessList from '../popup/receiver/D_selectReceiverAccessList.vue'
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
      dateHolder: '선택하세요',
      parentList: { memberList: [], bookList: [] },
      selectBookListShowYn: false,
      colorList: [
        '#FFCDD2',
        '#F8BBD0',
        '#E1BEE7',
        '#D1C4E9',
        '#C5CAE9',
        '#BBDEFB',
        '#B3E5FC',
        '#B2EBF2',
        '#FFCCBC',
        '#FFE0B2',
        '#FFECB3',
        '#FFF9C4',
        '#F0F4C3',
        '#DCEDC8',
        '#C8E6C9',
        '#B2DFDB'
      ]
    }
  },
  updated () {
    /* this.changeDefaltText() */
    /* if (this.$refs.memoBodyStr && this.currentCodeKey && this.selectedCodeObj.codeKey !== 0) {
      this.$refs.memoBodyStr.innerHTML = '"상태를 "' + this.$changeText(this.selectedCodeObj.codeNameMtext) + '"(으)로 변경합니다."'
    } */
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
          } else if (accessKind === 'C' || accessKind === 'M') {
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
            // this.parentList.bookList.push(this.alimDetail.shareList[i])
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
    currentWorker: {},
    currentCodeKey: {},
    contentsKey: {},
    teamKey: {},
    alimDetail: {} // 원만해서는 쓰지말기
  },
  methods: {
    setSelectedList (datas) {
      // 권한 선택시 실행
      this.selectedShareList = []
      var data = datas
      this.selectBookListShowYn = false
      if (data.memberList) {
        var settingMemList = []
        // memberCount = data.memberList.length
        for (let i = 0; i < data.memberList.length; i++) {
          var tempList = {}
          tempList.userDispMtext = this.$changeText(data.memberList[i].userDispMtext)
          tempList.userNameMtext = this.$changeText(data.memberList[i].userNameMtext)
          tempList.accessKey = data.memberList[i].accessKey
          // eslint-disable-next-line no-debugger
          debugger
          tempList.accessKind = 'U'
          tempList.cabinetKey = this.alimDetail.cabinetKey
          settingMemList.push(tempList)
        }
        this.selectedList.memberList = settingMemList
        this.chanSelectedListYn = true
      }
    },
    changeInputText () {
      /* this.$refs.memoBodyStr.addEventListener('change', () => {
      }) */
      this.defaltMemoYn = false
    },
    /* changeDefaltText () {
      if (this.selectedCodeObj.codeKey !== 0 && this.$refs.memoBodyStr && this.defaltMemoYn) {
        this.$refs.memoBodyStr.innerHTML = '상태를 "' + this.$changeText(this.selectedCodeObj.codeNameMtext) + '"(으)로 변경합니다.'
      }
    }, */
    openSelectPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      this.selectPopId = 'selectStateCodePop' + this.contentsKey
      // this.selectPopId = this.$setParentsId(this.pPopId, this.selectPopId)
      history.push(this.selectPopId)
      this.$store.commit('D_HISTORY/updateStack', history)
      // this.selectPopShowYn = true
    },
    closeSelectPop () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var removePage = hStack[hStack.length - 1]
      this.workDate = { toDate: '', fromDate: '' }
      if (this.selectPopId === hStack[hStack.length - 1]) {
        hStack = hStack.filter((element, index) => index < hStack.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', hStack)
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
      /* this.changeDefaltText() */
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
          // eslint-disable-next-line no-debugger
          debugger
          var toDate = this.settingDate(this.workDate.toDate)
          param.workToDateStr = toDate
          param.memoHeaderStr += '목표일 ' + this.settingDate(this.workDate.toDate)
          // param.memoHeaderStr = '<p class="commonMemoWorkStatHeaderColor" style="font-weight: bold; text-align: left; font-size: 14px; width: 100%;">접수일 ' + this. + '<br></p>'
          setOkYn = true
        }
        if (this.selectedList.memberList.length > 0 && this.selectedList.memberList[0] && this.chanSelectedListYn) {
          param.workUserKey = this.selectedList.memberList[0].accessKey
          param.workUserName = this.selectedList.memberList[0].userDispMtext
          param.memoHeaderStr += '담당자 ' + this.$changeText(this.selectedList.memberList[0].userDispMtext)
          setOkYn = true
        }
        param.memoHeaderStr += '(으)로 변경<br></p>'
        /* if (this.workDate.fromDate !== '') {
          var fromDate = this.settingDate(this.workDate.fromDate)
          param.workFromDateStr = fromDate
          setOkYn = true
        } */
        if (setOkYn) {
          param.memoBodyStr = this.$refs.memoBodyStr.innerHTML
          if (!param.memoBodyStr || param.memoBodyStr === '') {
            param.nonMemoYn = true
            param.memoBodyStr = ''
          }
          param.contentsKey = this.contentsKey
          param.creTeamKey = this.teamKey
          // eslint-disable-next-line no-debugger
          debugger
          var result = await this.$commonAxiosFunction({
            url: '/sUniB/tp.updateWorkStat',
            param: param
          })
          // eslint-disable-next-line no-debugger
          debugger
          if (result.data.result === true) {
            var newParam = {}
            newParam.contentsKey = result.data.contents.contentsKey
            newParam.jobkindId = 'BOAR'
            await this.$getContentsList(newParam).then(newReslute => {
              this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', newReslute.content)
            })
            this.$showToastPop('업무 상태가 변경되었습니다.')

            this.closeSelectPop()
          }

          // eslint-disable-next-line no-new-object
          /* var params = new Object()
          params.contentsKey = result.contents.contentsKey
          params.jobkindId = result.contents.jobkindId
          var resultList = await this.$getContentsList(param)
          var detailData = resultList.content[0]
          this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [detailData]) */
        }
      } catch (error) {
        console.error(error)
        // this.$showToastPop('일시적인 오류로 발송하지 못했습니다. 잠시 후 다시 시도해주세요.')
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
    openPushReceiverSelect () {
      var param = {}
      param.targetType = 'selectBookList'
      param.targetKey = this.params.targetKey
      param.teamKey = this.params.targetKey
      param.teamNameMtext = this.params.teamNameMtext

      var selectedList = this.receiverList
      param.pSelectedList = selectedList

      this.$emit('openPop', param)
      // this.receiverPopYn = true
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
    DISP_CODE_VALUE () {
      if (!this.codeList) return null
      if (!this.currentCodeKey) {
        return this.nullObj
      }
      var idx = this.codeList.findIndex((item) => item.codeKey === this.currentCodeKey)
      if (idx === -1) return null
      return this.codeList[idx]
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  watch: {
    DISP_CODE_VALUE: {
      immediate: true,
      handler (value, old) {
        if (value) {
          this.selectedCodeObj = value
        }
      },
      deep: true
    },
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
.selectedCode {border: 2px solid #5F61BD!important; margin: 5px 5px!important;}
.activeInput {background: #cccccc1c;}
</style>
