<i18n>
{
  "ko": {
    "SEAR_TITLE_CONTENTS": "알림 검색",
    "SEAR_MSG_ENTER_TITLE": "제목을 입력해주세요",
    "SEAR_MSG_ENTER_NAME": "작성자명을 입력해주세요",
    "SEAR_MSG_SELE_DATE": "날짜를 선택해주세요",
    "SEAR_MSG_SELE_LABEL": "라벨 선택",
    "SEAR_MSG_SELE_STATUS": "업무 상태를 선택해주세요",
    "SEAR_BTN_SEARCH": "검색하기",
    "SEAR_MSG_ENTER_CHANNAME": "채널명을 입력해주세요",
    "SEAR_TITLE_FILE": "파일 검색",
    "SEAR_MSG_ENTER_FILENAME": "파일명을 입력해주세요",
    "SEAR_TITLE_POST": "게시글 검색"
  },
  "en": {
    "SEAR_TITLE_CONTENTS": "Search Contents",
    "SEAR_MSG_ENTER_TITLE": "Please enter a title.",
    "SEAR_MSG_ENTER_NAME": "Please enter a creator’s name.",
    "SEAR_MSG_SELE_DATE": "Select Date",
    "SEAR_MSG_SELE_LABEL": "Select Label",
    "SEAR_MSG_SELE_STATUS": "Select Work Status",
    "SEAR_BTN_SEARCH": "Search",
    "SEAR_MSG_ENTER_CHANNAME": "Please enter a channel's name.",
    "SEAR_TITLE_FILE": "Search Files",
    "SEAR_MSG_ENTER_FILENAME": "Please enter a file's name.",
    "SEAR_TITLE_POST": "Search Posts"
  }
}
</i18n>
<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <div id="findContPop" class="pagePaddingWrap findPopupWrap" :style="'padding-top:' + (this.$STATUS_HEIGHT + 50 )+ 'px'" >
    <popHeader v-if="(contentsListTargetType === 'boardMain')" :headerTitle="$t('SEAR_TITLE_POST')" :pClosePop="pClosePop" @closeXPop="closeXPop" style="position: fixed; top: 0;box-shadow: 0px 7px 9px -9px #00000036;"/>
    <popHeader v-else-if="(contentsListTargetType === 'myActList')" headerTitle="나의 활동 검색" :pClosePop="pClosePop" @closeXPop="closeXPop" style="position: fixed; top: 0;box-shadow: 0px 7px 9px -9px #00000036;"/>
    <popHeader v-else-if="(contentsListTargetType === 'fileBox')" :headerTitle="$t('SEAR_TITLE_FILE')" :pClosePop="pClosePop" @closeXPop="closeXPop"  style="position: fixed; top: 0;box-shadow: 0px 7px 9px -9px #00000036;"/>
    <popHeader v-else :headerTitle="$t('SEAR_TITLE_CONTENTS')" @closeXPop="closeXPop" :pClosePop="pClosePop" style="position: fixed; top: 0;box-shadow: 0px 7px 9px -9px #00000036;"/>
    <div class="findPopBody  mtop-05">
        <div v-if="pTitleShowYn !== false" class="findPopMainSearchArea">
            <input v-if="contentsListTargetType === 'myActList'" class="searchInput font14 mtop-05" ref="channelsearchKeyword" @keyup.enter="requestSearchPushList" v-model="searchKey" placeholder="게시글 제목을 입력해주세요" />
            <input v-if="contentsListTargetType === 'fileBox'" class="searchInput font14 mtop-05" ref="channelsearchKeyword" @keyup.enter="requestSearchPushList" v-model="searchKey" :placeholder="$t('SEAR_MSG_ENTER_FILENAME')" />
            <input v-else class="searchInput font14 mtop-05" ref="channelsearchKeyword" @keyup.enter="requestSearchPushList" v-model="searchKey" :placeholder="$t('SEAR_MSG_ENTER_TITLE')" />
            <!-- <img class="searchIcon mtop-03 cursorP" @click="requestSearchPushList" src="../../../assets/images/common/iocn_search.png" alt="검색버튼"> -->
        </div>
        <div v-if="pOnlyMineYn !== true" class="findPopMainSearchArea">
            <input class="searchInput font14 mtop-05" ref="channelsearchKeyword" @keyup.enter="requestSearchPushList" v-model="creUserName" :placeholder="$t('SEAR_MSG_ENTER_NAME')" />
        </div>
        <input v-if="(contentsListTargetType !== 'chanDetail' && contentsListTargetType !== 'boardMain' && contentsListTargetType !== 'fileBox')" class="searchInput font14" type="text" name="" v-model="creTeam"  :placeholder="$t('SEAR_MSG_ENTER_CHANNAME')" id="">
        <!-- <input class="searchInput" type="text" name=""  v-model="fileName" placeholder="파일이름을 입력해주세요" id=""> -->
        <Datepicker
          class="mtop-05"
          style="font-size: 14px; float: left; border: 1px solid #ccc; border-radius: 5px;"
          inline
          :editable="false"
          v-model:value="creDate"
          type="date"
          range
          :placeholder="$t('SEAR_MSG_SELE_DATE')"
          titleFormat="YYYY-MM-DD"
        ></Datepicker>
        <div v-if="mStickerList && mStickerList.length > 0 && $appType === 'D'" style="width: 100%; margin-top: 10px; float: left; min-height: 30px;">
            <p class="fontBold font16 commonColor textLeft mtop-1 fl w-100P mbottom-05">{{ $t('SEAR_MSG_SELE_LABEL') }}</p>
            <template v-for="(value, index) in mStickerList" :key="index" >
                <gStickerLine v-if="value && contentsListTargetType !== 'fileBox'" @click="selectSticker(value)" :pSelectedYn="selectedSticker && value.stickerKey === selectedSticker.stickerKey" style="float: left; margin-right: 10px; min-width: 30px;" :pSticker="value" />
            </template>
        </div>
        <div v-if="tpGroupCode && tpGroupCode.length > 5" class="findPopMainSearchArea mtop-05">
            <select v-model="stateCode" class="searchInput selectInput font14 mtop-05" name="" id="statCodeKeyInput">
                <option hidden value="0">{{ $t('SEAR_MSG_SELE_STATUS') }}</option>
                <option v-for="(value, index) in this.stateCodeList" :key="index" :value="value.codeKey">{{this.$changeText(value.codeNameMtext)}}</option>
            </select>
            <!-- <input v-if="contentsListTargetType === 'myActList'" class="searchInput font14 mtop-05" ref="channelsearchKeyword" @keyup.enter="requestSearchPushList" v-model="searchKey" placeholder= -->
            <!-- <input v-else class="searchInput font14 mtop-05" ref="channelsearchKeyword" @keyup.enter="requestSearchPushList" v-model="searchKey" placeholder="제목을 입력해주세요" /> -->
            <!-- <img class="searchIcon mtop-03 cursorP" @click="requestSearchPushList" src="../../../assets/images/common/iocn_search.png" alt="검색버튼"> -->
        </div>

        <div class="fl findPopMainSearchArea mtop-05" style="min-height:50px;" v-if="teamKey && false">
          <div class="fl w100P " style="border-bottom: 2px solid #6768a7; padding-bottom: 5px; ">
            <div class="fl font16 fontBold textLeft " style="line-height:30px;" @click="receiveSearchClick">수신대상 검색 <p class="font14">▼</p></div>
            <select class="fr commonDarkGray mleft-1" v-model="selectOption" @change="changeReceiveSearch" v-if="receivSearchYn" style="border: 1px solid #ccc; min-height:30px; width:calc(100% - 130px); min-width:50px; max-width:200px" >
              <option v-for="(value, index) in receivList" :value="index" :key="index" class="fl w100P" style="display: flex; align-items: center; padding-bottom:0.5rem">
                {{ value.mFormTitle }}
              </option>
            </select>
          </div>
          <gLoadingS ref="searchLoading" class="fl height" style=""/>

          <div class="fl w100P pSide-15" v-if="receivSearchYn" :key="receiveListReloadKey" >
            <div class="fl mtop-05 w100P" style="display: flex; align-items: center;" v-for="(value, qIndex) in receivList[this.selectOption].InfoQueList" :key="qIndex" :style="value.InfoQueType === 'siList' ? 'align-items: flex-start' : ''">
              <p class="fl font14 commonDarkGray fontBold textLeft" style="flex:2">{{value.InfoQueTitle}}</p>

              <template v-if="value.InfoQueType === 'su'">
                <div class="fl h100P" style="flex:3">
                  <input class="fr" style="min-height:30px;  width:100%; max-width:300px; " type="text" :placeholder="value.InfoQueTitle">
                </div>
              </template>

              <template v-if="value.InfoQueType === 'si'">
                <div class="fr textLeft w100P" style="flex:3">
                  <select class="fr commonDarkGray" v-model="selectAnswer" style="border: 1px solid #ccc; width:100%; min-height:30px" >
                    <option v-for="(answer, aIndex) in value.answerList" :value="answer.answerName" :key="aIndex" class="fl w100P" style="display: flex; align-items: center; padding-bottom:0.5rem">
                      {{ answer.answerName }}
                    </option>
                  </select>
                </div>
              </template>

              <template v-if="value.InfoQueType === 'siList'" >
                <div class="fl textLeft w100P" style="flex:3">
                  <div class="fl w100P mbottom-05" v-for="(value, aIndex) in value.answerList" :key="aIndex">
                    <gCheckBtn class="fr" :title="value.answerName" :selectedYn="siListSelect === value.answerName" @click="siListSelect = value.answerName"/>
                  </div>
                  <!-- <gCheckBtn class="fl" v-for="(value, index) in answerList" :key="index" :title="value.answerName" :selectedYn="siListSelect === value.answerName" @click="siListSelect = value.answerName"/> -->
                </div>
              </template>
            </div>
          </div>

        </div>

        <div style="width: 100%; float: left; margin-top: 20px; displa: flex;">
          <gBtnLarge @click="requestSearchPushList" :btnTitle="$t('SEAR_BTN_SEARCH')" class="w-100P" />
        </div>
        <!-- <div style="width: 100%; min-height: 200px; float: left;">
            <div style="width: 100%; height: 20px; border-bottom: 1px solid #ccc;" v-for="(value, index) in this.stateCodeList" :key="index">{{this.$changeText(value.codeNameMtext)}}</div>
        </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentsListTargetType: {},
    tpGroupCode: {},
    teamKey: {},
    pTitleShowYn: {},
    pOnlyMineYn: {},
    pClosePop: Function
  },
  data () {
    return {
      pageHistoryName: '',
      searchKey: '',
      creTeam: '',
      credate: [],
      creDate: '',
      stateValue: { codeKey: null, codeNameMtext: '상태를 선택해주세요' },
      stateCodeList: [],
      stateCode: 0,
      creUserName: '',
      // searchLogList: [
      //   { searchKeyword: '삼천리', searchDate: '20210821' },
      //   { searchKeyword: '삼천리', searchDate: '20210821' },
      //   { searchKeyword: '삼천리', searchDate: '20210821' }
      // ],
      // autoSaveLog: '끄기',
      popId: null,
      dummyData: [{ mFormKey: 1, mFormTitle: '더알림 아파트 멤버', rNameAuthYn: true, creDate: '2022-08-04 15:00', InfoQueList: [{ InfoQueKey: 0, InfoQueTitle: '동', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 1, InfoQueTitle: '호수', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 2, InfoQueTitle: '거주유형', essentialYn: true, InfoQueType: 'si', answerList: [{ answerName: '임차인' }, { answerName: '임대인' }] }, { InfoQueKey: 3, InfoQueTitle: '거주유형', essentialYn: true, InfoQueType: 'siList', answerList: [{ answerName: '임차인' }, { answerName: '임대인' }] }] },
        { mFormKey: 2, mFormTitle: '더알림 임직원', rNameAuthYn: false, creDate: '2022-05-04 15:00', InfoQueList: [{ InfoQueKey: 0, InfoQueTitle: '직급', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 1, InfoQueTitle: '소속', InfoQueType: 'si', essentialYn: true, answerList: [{ answerName: '개발팀' }, { answerName: '디자인팀' }, { answerName: '지원팀' }] }, { InfoQueKey: 2, InfoQueTitle: '근무 층', essentialYn: true, InfoQueType: 'siList', answerList: [{ answerName: '1층' }, { answerName: '2층' }, { answerName: '3층' }] }, { InfoQueKey: 3, InfoQueTitle: '확인코드', essentialYn: true, InfoQueType: 'su' }] },
        { mFormKey: 3, mFormTitle: '멤버', rNameAuthYn: false, creDate: '2021-12-04 15:00', InfoQueList: [{ InfoQueKey: 0, InfoQueTitle: '이름', InfoQueType: 'su', essentialYn: true }, { InfoQueKey: 1, InfoQueTitle: '소속', InfoQueType: 'si', essentialYn: true, answerList: [{ answerName: '개발팀' }, { answerName: '디자인팀' }, { answerName: '지원팀' }] }] }],
      receivList: [],
      receivSearchYn: false,
      loadingYn: false,
      selectOption: 0,
      receiveListReloadKey: 0,
      infoMemList: [],
      answerList: [],
      selectAnswer: '',
      siListSelect: '',
      mStickerList: [],
      selectedSticker: null
    }
  },
  created () {
    this.getMyStickerList()
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'searchPop' + history.length
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
    if (this.tpGroupCode && this.tpGroupCode.length > 5) this.getCodeList()
  },
  mounted () {
    // document.getElementById('findContentListConfo').setAttribute('readonly', 'readonly')
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hStack']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  watch: {
    pageUpdate (value, old) {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      if (this.popId === hStack[hStack.length - 1]) {
        this.closeXPop()
      }
    },
    historyStack (value, old) {
    }
  },
  methods: {
    selectSticker (val) {
      console.log(val)
      console.log(this.selectedSticker)
      if (this.selectedSticker && val.stickerKey === this.selectedSticker.stickerKey) {
        this.selectedSticker = null
      } else {
        this.selectedSticker = val
      }
    },
    async getMyStickerList () {
      var param = {}
      param.creUserKey = this.GE_USER.userKey
      if (this.GE_USER.unknownYn) return
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getStickerList',
        param: param
      })
      this.mStickerList = result.data
      console.log(result)
    },
    // settingAnswerList () {
    //   var qList = this.receivList[this.selectOption].InfoQueList[].answerList
    //   for (let i = 0; i < qList.length; i++) {
    //     if (qList[i].InfoQueType === 'si' || qList[i].InfoQueType === 'siList') {
    //       this.answerList = qList[i].answerList
    //     }
    //   }
    // },
    changeReceiveSearch () {
      // this.settingAnswerList()
      this.receiveListReloadKey += 1
    },
    async receiveSearchClick () {
      if (this.receivSearchYn === true) {
        this.receivSearchYn = false
      } else {
        this.loadingYn = true
        this.$refs.searchLoading.show()
        await this.getMemberInfo()
        // this.settingAnswerList()
        this.loadingYn = false
        this.$refs.searchLoading.hide()
        this.receivSearchYn = true
        console.log(this.receivList)
      }
    },
    getMemberInfo () {
      if (!this.teamKey) return
      // var param = {}
      // param.teamKey = this.teamKey
      // await this.$commonAxiosFunction({
      //   url: '/sUniB/tp.getMemberInfo',
      //   param: param
      // }).then((result)=>{
      //   console.log(result)
      // this.memberTypeList = result
      // })

      this.receivList = this.dummyData
    },
    async getCodeList () {
      var resultList = null
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.groupCode = 'C_STAT'
      resultList = await this.$getCodeList(param)
      this.stateCodeList = resultList
      // this.contentsHeight = document.getElementById('chanIconBox').scrollHeight
      // var a = this.teamImgList
    },
    closeXPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.$emit('closePop')
      // this.$removeHistoryStack()
    },
    deleteChannelFindLogList (index) {
      var deleteLogKey = this.searchLogList[index].searchKey
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.searchKey = deleteLogKey
      this.searchLogList.splice(index, 1) // 서비스 생성 후 제거해야 함
      this.$axios.post('/deleteChannelFindLogList', { param }
      ).then(response => {
        // if (response.result === true) {
        this.searchLogList.splice(index, 1)
        // }
      }).catch((ex) => {
        console.warn('ERROR!!!!! : ', ex)
      })
    },
    requestSearchPushList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (this.searchKey !== '') {
        param.searchKey = this.searchKey
      }
      if (this.creTeam !== '') {
        param.creTeamNameMtext = this.creTeam
      }
      if (this.creUserName !== '') {
        param.creUserName = this.creUserName
      }
      if (this.selectedSticker) {
        param.selectedSticker = this.selectedSticker
      }
      if (this.creDate !== '') {
        if (this.creDate.length > 1) {
          param.fromCreDateStr = this.$dayjs(this.creDate[0]).format('YYYY-MM-DD')
          // eslint-disable-next-line no-unused-vars
          var setToDate = this.creDate[1]
          param.toCreDateStr = this.$dayjs(setToDate.setDate(setToDate.getDate() + 1)).format('YYYY-MM-DD')
        }
      }
      if (this.stateCode) {
        param.workStatCodeKey = this.stateCode
        var idx = this.stateCodeList.findIndex((item) => item.codeKey === this.stateCode)
        if (idx !== -1) {
          param.codeNameMtext = this.$changeText(this.stateCodeList[idx].codeNameMtext)
        }
      }
      this.$emit('searchList', param)
    },
    requestSearchPushList2 () {
      var param = new Map()
      if (this.searchKey !== '') {
        param.set('searchKey', this.searchKey)
      }
      if (this.creTeam !== '') {
        param.set('creTeam', this.creTeam)
      }
      if (this.creDate !== '') {
        if (this.creDate.length > 1) {
          param.set('fromCreDateStr', this.$dayjs(this.creDate[0]).format('YYYY-MM-DD'))
          var setToDate = this.creDate[1]
          param.set('toCreDateStr', this.$dayjs(setToDate.setDate(setToDate.getDate() + 1)).format('YYYY-MM-DD'))
        }
      }
      this.$emit('searchList', param)
    }
  }
}
</script>

<style scoped>
.mx-icon-clear {position: fixed; right: 8px; transform: translateY(50%); vertical-align: -8rem !important;}
.mx-input-wrapper {width: 100%; height: 40px;}
.findPopupWrap{position: fixed; width: 100%; left: 0;height: 100vh;top: 0;z-index: 999999; background: #FFFFFF;}
.searchIcon{width: 1.5rem; position: absolute; top:0.8rem; right: 8px;}
.searchInput{
  margin-bottom: 5px!important; height:40px; float: left; width: 100%;  padding: 0.4rem; padding-right: 3rem; box-sizing: border-box;
  /* border: none !important; */
   /* background: #e4e4e463; */
   /* border-radius: 12px; */
   border-radius: 5px;
  border: 1px solid #ccc;
}
.findPopMainSearchArea{position: relative; min-height: 40px; float: left; width: 100%; }
.findPopBody{min-height: 3.6rem; padding-top: 0; width: 100%; float: left; margin-bottom: 1rem;}
.selectInput {color: #6c757d!important; outline: none; cursor: pointer; padding-right: 20px!important; appearance: none;}
.selectInput option{color: #303030; font-size: 16px; min-height: 20px;}
/* .newestFindWrap{width: 100%; min-height: 200px; float: left; margin-top: 10px; padding-top: 20px
}

.newestfindContentsListWrap{width: 100%; padding: 10px; height: 35px; border-bottom : 1px solid #ccc;} */

@media screen and (max-width: 300px) {
  .pagePaddingWrap {
    padding-top: 50px !important;
  }
  input {font-size: 12px !important;}
}

</style>
