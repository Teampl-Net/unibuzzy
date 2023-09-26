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
  <div id="findContPop" class="pagePaddingWrap findPopupWrap" :style="'padding-top:' + ($STATUS_HEIGHT + 50 )+ 'px'" >
    <gPopHeader class="popHeaderShadow" v-if="(contentsListTargetType === 'boardMain')" :headerTitle="$t('SEAR_TITLE_POST')" @closeXPop="closeXPop"/>
    <gPopHeader class="popHeaderShadow" v-else-if="(contentsListTargetType === 'fileBox')" :headerTitle="$t('SEAR_TITLE_FILE')" @closeXPop="closeXPop"/>
    <gPopHeader class="popHeaderShadow" v-else :headerTitle="$t('SEAR_TITLE_CONTENTS')" @closeXPop="closeXPop"/>
    <div class="findPopBody  mtop-05">
        <div v-if="pTitleShowYn !== false" class="findPopMainSearchArea">
            <input v-if="contentsListTargetType === 'myActList'" class="searchInput font14 mtop-05" ref="channelsearchKeyword" @keyup.enter="requestSearchPushList" v-model="searchKey" placeholder="게시글 제목을 입력해주세요" />
            <input v-if="contentsListTargetType === 'fileBox'" class="searchInput font14 mtop-05" ref="channelsearchKeyword" @keyup.enter="requestSearchPushList" v-model="searchKey" :placeholder="$t('SEAR_MSG_ENTER_FILENAME')" />
            <input v-else class="searchInput font14 mtop-05" ref="channelsearchKeyword" @keyup.enter="requestSearchPushList" v-model="searchKey" :placeholder="$t('SEAR_MSG_ENTER_TITLE')" />
        </div>
        <div v-if="pOnlyMineYn !== true" class="findPopMainSearchArea">
            <input class="searchInput font14 mtop-05" ref="channelsearchKeyword" @keyup.enter="requestSearchPushList" v-model="creUserName" :placeholder="$t('SEAR_MSG_ENTER_NAME')" />
        </div>
        <input v-if="(contentsListTargetType !== 'chanDetail' && contentsListTargetType !== 'boardMain' && contentsListTargetType !== 'fileBox')" class="searchInput font14" type="text" name="" v-model="creTeam"  :placeholder="$t('SEAR_MSG_ENTER_CHANNAME')" id="">
        <Datepicker
          class="mtop-05 datePicker"
          inline
          :editable="false"
          v-model:value="creDate"
          type="date"
          range
          :placeholder="$t('SEAR_MSG_SELE_DATE')"
          titleFormat="YYYY-MM-DD"
        ></Datepicker>
        <div v-if="tpGroupCode && tpGroupCode.length > 5" class="findPopMainSearchArea mtop-05">
            <select v-model="stateCode" class="searchInput selectInput font14 mtop-05" name="" id="statCodeKeyInput">
                <option hidden value="0">{{ $t('SEAR_MSG_SELE_STATUS') }}</option>
                <option v-for="(value, index) in stateCodeList" :key="index" :value="value.codeKey">{{$changeText(value.codeNameMtext)}}</option>
            </select>
        </div>

        <div class="searchBtnWrap">
          <gBtnLarge @click="requestSearchPushList" :btnTitle="$t('SEAR_BTN_SEARCH')" class="w100P" />
        </div>
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
      searchKey: '',
      creTeam: '',
      creDate: '',
      stateCodeList: [],
      stateCode: 0,
      creUserName: '',
      popId: null
    }
  },
  created () {
    var history = this.$store.getters['UB_HISTORY/hStack']
    this.popId = 'searchPop' + history.length
    history.push(this.popId)
    this.$store.commit('UB_HISTORY/updateStack', history)
    if (this.tpGroupCode && this.tpGroupCode.length > 5) this.getCodeList()
  },
  computed: {
    historyStack () {
      return this.$store.getters['UB_HISTORY/hStack']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      if (this.popId === hStack[hStack.length - 1]) {
        this.closeXPop()
      }
    },
    historyStack (value, old) {
    }
  },
  methods: {
    async getCodeList () {
      var resultList = null
      var param = {}
      param.groupCode = 'C_STAT'
      resultList = await this.$getCodeList(param)
      this.stateCodeList = resultList
    },
    closeXPop () {
      var history = this.$store.getters['UB_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('UB_HISTORY/setRemovePage', removePage)
      this.$store.commit('UB_HISTORY/updateStack', history)
      this.$emit('closePop')
      if (this.pClosePop) {
        this.pClosePop()
      }
    },
    requestSearchPushList () {
      var param = {}
      if (this.searchKey !== '') {
        param.searchKey = this.searchKey
      }
      if (this.creTeam !== '') {
        param.creTeamNameMtext = this.creTeam
      }
      if (this.creUserName !== '') {
        param.creUserName = this.creUserName
      }
      if (this.creDate !== '') {
        if (this.creDate.length > 1) {
          param.fromCreDateStr = this.$dayjs(this.creDate[0]).format('YYYY-MM-DD')
          const setToDate = this.creDate[1]
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
    }
  }
}
</script>

<style scoped>
.mx-icon-clear {
  position: fixed;
  right: 8px;
  transform: translateY(50%);
  vertical-align: -8rem !important;
}
.mx-input-wrapper {
  width: 100%;
  height: 40px;
}
.findPopupWrap {
  position: fixed;
  width: 100%;
  left: 0;
  height: 100vh;
  top: 0;
  z-index: 999999;
  background: #FFFFFF;
}
.searchIcon {
  width: 1.5rem;
  position: absolute;
  top:0.8rem;
  right: 8px;
}
.searchInput {
  margin-bottom: 5px!important;
  height:40px;
  float: left;
  width: 100%;
  padding: 0.4rem;
  padding-right: 3rem;
  box-sizing: border-box;
  /* border: none !important; */
   /* background: #e4e4e463; */
   /* border-radius: 12px; */
  border-radius: 5px;
  border: 1px solid #ccc;
}
.findPopMainSearchArea {
  position: relative;
  min-height: 40px;
  float: left;
  width: 100%;
}
.findPopBody {
  min-height: 3.6rem;
  padding-top: 0;
  width: 100%;
  float: left;
  margin-bottom: 1rem;
}
.selectInput {
  color: #6c757d!important;
  outline: none;
  cursor: pointer;
  padding-right: 20px!important;
  appearance: none;
}
.selectInput option {
  color: #303030;
  font-size: 16px;
  min-height: 20px;
}
.popHeaderShadow {
  position: fixed;
  top: 0;
  box-shadow: 0px 7px 9px -9px #00000036;
}
.datePicker {
  font-size: 14px !important;
  float: left !important;
  border: 1px solid #ccc !important;
  border-radius: 5px !important;
}
.stickerArea {
  width: 100%;
  margin-top: 10px;
  float: left;
  min-height: 30px;
}
.stickerItem {
  float: left !important;
  margin-right: 10px !important;
  min-width: 30px !important;
}
.recvUserArea {
  min-height: 50px;
}
.recvUserTitle {
  border-bottom: 2px solid #6768a7;
  padding-bottom: 5px;
}
.recvSelectInput {
  border: 1px solid #ccc;
  min-height: 30px;
  width: calc(100% - 130px);
  min-width: 50px;
  max-width: 200px
}
.recvSelectInput > option {
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
}
.flex2 {
  flex: 2;
}
.flex3 {
  flex: 3;
}
.suInput {
  min-height: 30px;
  width: 100%;
  max-width: 300px;
}
.siSelect {
  border: 1px solid #ccc;
  width:100%;
  min-height: 30px;
}
.siSelect > input {
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
}
.searchBtnWrap {
  width: 100%;
  float: left;
  margin-top: 20px;
  display: flex;
}
@media screen and (max-width: 300px) {
  .pagePaddingWrap {
    padding-top: 50px !important;
  }
  input {font-size: 12px !important;}
}
</style>
