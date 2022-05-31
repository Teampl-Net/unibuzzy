<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <div class="findPopupWrap pagePaddingWrap" >
    <popHeader headerTitle="검색" @closeXPop="closeXPop" style="box-shadow: 0px 7px 9px -9px #00000036;"/>
    <div class="findPopBody  mtop-05">
      <div style="position: relative; margin: 1rem 0; min-height: 50px;">
          <img @click="findChannel" class="searchIcon" src="../../assets/images/common/iocn_search.png" alt="검색버튼">
          <input class="searchInput" id="chanSearchInput" ref="channelSearchKey" v-model="nameMtext" placeholder="채널 검색하기" />
      </div>

      <!-- change By Jeong -->
      <!-- <div class="newestSearchWrap">
        <div lass="w-100P" style="height: 2rem">
            <span class="font18 fontBold commonColor fl">최근 검색</span>
            <span class="font15 commonColor fr">| 자동저장 켜기</span>
            <span class="font15 commonColor fr" style="color: #6768A782">전체삭제</span>
        </div>
        <div  class="w-100P">
            <div v-if="newestSearchYn">
            </div>
            <div v-else class="font15 commonColor ">
                최근 검색 저장 기능이 꺼져 있습니다.
            </div>
        </div>
      </div> -->

    </div>
  </div>
</template>

<script>
// import searchChannel from '../../components/pageComponents/channel/Tal_searchChan.vue'
/* changeDateFormat(value.searchDate, 'list') */
export default {
  name: 'test',
  data () {
    return {
      newestSearchKeyWordList: {},
      newestSearchYn: false,
      nameMtext: ''
    }
  },
  props: {
    tab: {}
  },
  computed: {
  },
  mounted () {
    document.getElementById('chanSearchInput').focus()
  },
  methods: {
    closeXPop () {
      this.$emit('closePop')
    },
    findChannel () {
      var paramMap = new Map()
      if (this.nameMtext !== undefined && this.nameMtext !== null && this.nameMtext !== '') {
        paramMap.set('nameMtext', this.nameMtext)
      }
      this.$emit('searchList', paramMap)
    }
  }
}
</script>

<style scoped>
.findPopupWrap{position: fixed;width: 100vw; left: 0;height: 100vh;top: 0;z-index: 999999; background: #FFFFFF;}
.searchIcon{width: 1.5rem; position: absolute; top:0.3rem; right: 8px;}
.searchInput{border: none; margin-bottom: 5px!important; font-size: 15px; height:40px; background: #e4e4e463; float: left; width: 100%; border-radius: 12px; padding: 0.4rem; padding-right: 3rem; box-sizing: border-box}
.findPopMainSearchArea{position: relative; margin-top: 0.5rem; height: 40px;}

.searchIcon{width: 1.5rem; position: absolute; top:0.6rem; right: 0.9rem}
.searchInput{border: none; background: #e4e4e463; width: 100%; border-radius: 12px; padding: 0.4rem; padding-right: 3rem; box-sizing: border-box}
.newestSearchWrap{border-radius: 10px; background-color: #F5F5F9; height: 150px; width: 100%; padding: 0.4rem 1rem; box-sizing: border-box;}

</style>
