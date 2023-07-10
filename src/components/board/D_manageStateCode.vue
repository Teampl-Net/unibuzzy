<template>
    <div :ref="'stateCodeFor' + this.contentsKey" v-if="DISP_CODE_VALUE" style=" padding: 0 10px; border-radius: 8px; background: #bfbfda;  color: #fff; text-align: left;">
        <div class="font14">{{$changeText(DISP_CODE_VALUE.codeNameMtext)}}</div>
        {{currentWorker}}
    </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      selectedList: { memberList: [], bookList: [] },
      selectPopShowYn: false,
      selectPopId: null,
      workDate: { toDate: '', fromDate: '' },
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
  created () {
    if (this.alimDetail) {
      if (this.alimDetail.workToDate) {
        this.dateHolder = this.settingDate(this.alimDetail.workToDate)
      }
      if (this.alimDetail.shareList) {
        for (var i = 0; i < this.alimDetail.shareList.length; i++) {
          var accessKind = this.alimDetail.shareList[i].accessKind
          if (accessKind === 'U') {
            this.parentList.memberList.push(this.alimDetail.shareList[i])
          } else {
            if (this.alimDetail.shareList[i].muserList && this.alimDetail.shareList[i].muserList.length > 0) {
              for (var s = 0; s < this.alimDetail.shareList[i].muserList.length; s++) {
                var shareUser = this.alimDetail.shareList[i].muserList[s]
                var settingObj = {}
                settingObj.accessKind = 'U'
                settingObj.accessKind = shareUser.userKey
                settingObj.userDispMtext = shareUser.userDispMtext
                settingObj.shareseq = undefined
                this.parentList.memberList.push(settingObj)
              }
            }
            // this.parentList.bookList.push(this.alimDetail.shareList[i])
          }
        }
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
      console.log('-------------------------------------')
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
          tempList.accessKind = 'U'
          tempList.cabinetKey = this.alimDetail.cabinetKey
          settingMemList.push(tempList)
        }
        this.selectedList.memberList = settingMemList
      }
    },
    changeInputText () {
      /* this.$refs.memoBodyStr.addEventListener('change', () => {
        alert(true)
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
      this.selectPopShowYn = true
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
        this.selectPopShowYn = false
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
        if (this.currentCodeKey === this.selectedCodeObj.codeKey) {
        } else {
          param.workStatCodeKey = this.selectedCodeObj.codeKey
          param.workStatCreUserKey = this.GE_USER.userKey
          param.workStatCreUserName = this.GE_USER.userDispMtext
          setOkYn = true
          param.memoHeaderStr = '<p class="commonMemoWorkStatHeaderColor" style="font-weight: bold; text-align: left; font-size: 14px; width: 100%;">'
          if (param.workStatCodeKey) {
            param.memoHeaderStr += '[' + this.$changeText(this.selectedCodeObj.codeNameMtext) + ']'
          } else if (param.workToDate) {
            param.memoHeaderStr += '[' + this.$changeText(this.selectedCodeObj.codeNameMtext) + ']'
          }
        }
        if (this.workDate.toDate !== '') {
          var toDate = this.settingDate(this.workDate.toDate)
          if (toDate !== 'Invalid Date') {
            param.workToDateStr = toDate
            param.memoHeaderStr += '목표일 ' + this.settingDate(this.workDate.toDate)
            // param.memoHeaderStr = '<p class="commonMemoWorkStatHeaderColor" style="font-weight: bold; text-align: left; font-size: 14px; width: 100%;">접수일 ' + this. + '<br></p>'
            setOkYn = true
          }
        }
        if (this.selectedList.memberList.length > 0 && this.selectedList.memberList[0]) {
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
          var result = await this.$commonAxiosFunction({
            url: '/service/tp.updateWorkStat',
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
          // alert(value)
        }
      },
      deep: true
    },
    pageUpdate (value, old) {
      this.closeSelectPop()
    },
    historyStack (value, old) {
    }
  }
}
</script>
<style scoped>
.selectedCode {border: 2px solid #5F61BD!important; margin: 5px 5px!important;}
.activeInput {background: #cccccc1c;}
</style>
