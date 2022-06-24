<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <div class="findPopupWrap pagePaddingWrap" >
    <popHeader headerTitle="검색" @closeXPop="closeXPop" style="box-shadow: 0px 7px 9px -9px #00000036;"/>
    <div class="findPopBody  mtop-05">
        <div class="findPopMainSearchArea">
            <input class="searchInput" ref="channelsearchKeyword" v-model="searchKey" placeholder="제목 및 본문 내용을 입력해주세요" />
            <img class="searchIcon mtop-03" @click="requestSearchPushList" src="../../assets/images/common/iocn_search.png" alt="검색버튼">
        </div>
        <!-- <input class="searchInput" placeholder="제목 또는 내용을 입력해주세요" type="text" name=""  id=""> -->
        <input class="searchInput" type="text" name="" v-model="creTeam"  placeholder="보낸사람을 입력해주세요" id="">
        <!-- <input class="searchInput" type="text" name=""  v-model="fileName" placeholder="파일이름을 입력해주세요" id=""> -->
        <div class="box">
            <section class="">
            <Datepicker
                v-model:value="creDate"
                type="date"
                range
                placeholder="날짜를 선택해주세요"
                titleFormat="YYYY-MM-DD"
            ></Datepicker>
            </section>
        </div>
        <!-- <div class="newestFindWrap">
            <div style="width: 100%; height: 30px;">
                <p class="fl textLeft font18 fontBold">최근 검색</p>
                <div class="fr"><span class="font15">전체 삭제</span><span style="margin: 0 10px;">|</span><span class="font15">자동저장 {{this.autoSaveLog}}</span></div>
            </div>
            <div v-for="(value, index) in searchLogList" class="newestfindContentsListWrap" :key="index" >
                <p class="fl font16 commonBlack">{{value.searchKeyword}}</p>
                <span class="fr font16">{{settingDateFormat(Number(value.searchDate))}}<span @click="deleteChannelFindLogList(index)" class="mleft-1">x</span></span>
            </div>
        </div> -->
    </div>
  </div>
</template>

<script>
/* changeDateFormat(value.searchDate, 'list') */
export default {
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
    var history = this.$store.getters.hStack
    this.popId = 'searchPop' + history.length
    history.push(this.popId)
    this.$store.commit('updateStack', history)
  },
  computed: {
    historyStack () {
      return this.$store.getters.hRPage
    }
  },
  watch: {
    historyStack (value, old) {
      if (this.popId === value) {
        this.closeXPop()
      }
    }
  },
  methods: {
    closeXPop () {
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
          param.toCreDateStr = this.$dayjs(this.creDate[1]).format('YYYY-MM-DD')
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
          param.set('toCreDateStr', this.$dayjs(this.creDate[1]).format('YYYY-MM-DD'))
        }
      }
      this.$emit('searchList', param)
    }
  }
}
</script>

<style scoped>
.findPopupWrap{position: fixed;width: 100vw; left: 0;height: 100vh;top: 0;z-index: 999999; background: #FFFFFF;}
.searchIcon{width: 1.5rem; position: absolute; top:0.3rem; right: 8px;}
.searchInput{border: none; margin-bottom: 5px!important; font-size: 15px; height:40px; background: #e4e4e463; float: left; width: 100%; border-radius: 12px; padding: 0.4rem; padding-right: 3rem; box-sizing: border-box}
.findPopMainSearchArea{position: relative; margin-top: 0.5rem; height: 40px;}
.findPopBody{min-height: 3.6rem; padding-top: 0; margin-bottom: 1rem;}
/* .newestFindWrap{width: 100%; min-height: 200px; float: left; margin-top: 10px; padding-top: 20px
}
.newestfindContentsListWrap{width: 100%; padding: 10px; height: 35px; border-bottom : 1px solid #ccc;} */
</style>
