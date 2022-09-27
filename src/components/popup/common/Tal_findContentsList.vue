<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <div class="pagePaddingWrap findPopupWrap" style="padding-top: 60px;">
    <popHeader v-if="(contentsListTargetType === 'boardMain')" headerTitle="게시글 검색" @closeXPop="closeXPop" style="box-shadow: 0px 7px 9px -9px #00000036;"/>
    <popHeader v-else-if="(contentsListTargetType === 'myActList')" headerTitle="나의 활동 검색" @closeXPop="closeXPop" style="box-shadow: 0px 7px 9px -9px #00000036;"/>
    <popHeader v-else headerTitle="알림 검색" @closeXPop="closeXPop" style="box-shadow: 0px 7px 9px -9px #00000036;"/>
    <div class="findPopBody  mtop-05">
        <div class="findPopMainSearchArea">
            <input v-if="contentsListTargetType === 'myActList'" class="searchInput font14 mtop-05" ref="channelsearchKeyword" @keyup.enter="requestSearchPushList" v-model="searchKey" placeholder="게시글 제목을 입력해주세요" />
            <input v-else class="searchInput font14 mtop-05" ref="channelsearchKeyword" @keyup.enter="requestSearchPushList" v-model="searchKey" placeholder="제목을 입력해주세요" />
            <img class="searchIcon mtop-03 cursorP" @click="requestSearchPushList" src="../../../assets/images/common/iocn_search.png" alt="검색버튼">
        </div>
        <input v-if="(contentsListTargetType !== 'chanDetail' && contentsListTargetType !== 'boardMain')" class="searchInput font14" type="text" name="" v-model="creTeam"  placeholder="채널명을 입력해주세요" id="">
        <!-- <input class="searchInput" type="text" name=""  v-model="fileName" placeholder="파일이름을 입력해주세요" id=""> -->
        <Datepicker
          style="font-size: 14px;"
          inline
          :editable="false"
          v-model:value="creDate"
          type="date"
          range
          placeholder="날짜를 선택해주세요"
          titleFormat="YYYY-MM-DD"
        ></Datepicker>
    </div>
  </div>
</template>

<script>
/* changeDateFormat(value.searchDate, 'list') */
export default {
  props: {
    contentsListTargetType: {}
  },
  name: 'test',
  data () {
    return {
      pageHistoryName: '',
      credate: [],
      searchKey: '',
      creTeam: '',
      creDate: '',
      // searchLogList: [
      //   { searchKeyword: '삼천리', searchDate: '20210821' },
      //   { searchKeyword: '삼천리', searchDate: '20210821' },
      //   { searchKeyword: '삼천리', searchDate: '20210821' }
      // ],
      // autoSaveLog: '끄기',
      popId: null
    }
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'searchPop' + history.length
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
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
      if (this.creDate !== '') {
        if (this.creDate.length > 1) {
          param.fromCreDateStr = this.$dayjs(this.creDate[0]).format('YYYY-MM-DD')
          // eslint-disable-next-line no-unused-vars
          var setToDate = this.creDate[1]
          param.toCreDateStr = this.$dayjs(setToDate.setDate(setToDate.getDate() + 1)).format('YYYY-MM-DD')
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
.searchInput{border: none !important; margin-bottom: 5px!important; height:40px; background: #e4e4e463; float: left; width: 100%; border-radius: 12px; padding: 0.4rem; padding-right: 3rem; box-sizing: border-box}
.findPopMainSearchArea{position: relative; margin-top: 0.5rem; height: 40px;}
.findPopBody{min-height: 3.6rem; padding-top: 0; margin-bottom: 1rem;}
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
