<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <div class="" style="position: fixed;width: 100vw; left: 0;height: 100vh;top: 0;z-index: 999999; background: #FFFFFF; ">
    <popHeader headerTitle="검색" @closeXPop="closeXPop" style="box-shadow: 0px 7px 9px -9px #00000036;"/>
    <div class= "pageHeader" style="min-height: 3.6rem; padding: 20px; margin-bottom: 1rem; margin-top: 50px;">
        <div style="position: relative; margin-top: 1rem; width: 100%; float: left;">
            <input class="searchInput" ref="channelsearchKeyword" v-model="message" placeholder="본문 및 내용을 입력해주세요" />
            <img class="searchIcon" src="../../assets/images/common/iocn_search.png" alt="검색버튼">
        </div>
        <input class="searchInput" placeholder="제목 또는 내용을 입력해주세요" type="text" name="" style="" id="">
        <input class="searchInput" type="text" name="" style="" placeholder="보낸사람을 입력해주세요" id="">
        <input class="searchInput" type="text" name="" style="" placeholder="파일이름을 입력해주세요" id="">
        <div class="box">
            <section class="">
            <Datepicker
                v-model:value="value1"
                type="date"
                range
                placeholder="날짜를 선택해주세요"
                titleFormat="YYYY-MM-DD"
            ></Datepicker>
            </section>
        </div>
        <div style="width: 100%; min-height: 200px; float: left; margin-top: 10px; padding-top: 10px">
            <div style="width: 100%; height: 30px;">
                <p class="fl textLeft font18 fontBold">최근 검색</p>
                <div class="fr"><span class="font15">전체 삭제</span><span style="margin: 0 10px;">|</span><span class="font15">자동저장 {{this.autoSaveLog}}</span></div>
            </div>
            <div v-for="(value, index) in searchLogList" :key="index" style="width: 100%; padding: 10px; height: 35px; border-bottom : 1px solid #ccc;">
                <p class="fl font16 commonBlack">{{value.searchKeyword}}</p>
                <span class="fr font16">{{settingDateFormat(Number(value.searchDate))}}<span @click="deleteChannelFindLogList(index)" class="mleft-1">x</span></span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
/* changeDateFormat(value.searchDate, 'list') */
export default {
  name: 'test',
  data () {
    return {
      value1: [],
      value2: [],
      searchLogList: [
        { searchKeyword: '삼천리', searchDate: '20210821' },

        { searchKeyword: '삼천리', searchDate: '20210821' },

        { searchKeyword: '삼천리', searchDate: '20210821' }
      ],
      autoSaveLog: '끄기'
    }
  },
  computed: {
  },
  methods: {
    closeXPop () {
      this.$emit('closePop')
    },
    settingDateFormat (date) {
      return this.changeDateFormat(date, 'list')
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
        // alert(ex)
        console.warn('ERROR!!!!! : ', ex)
      })
    }
  }
}
</script>

<style scoped>
.searchIcon{width: 1.5rem; float: right;}
.searchInput{border: 2px solid #E4E4E4; float: left; width: calc(100% - 2rem); float: left; border-radius: 12px; padding: 0.4rem; padding-right: 3rem; box-sizing: border-box}

</style>
