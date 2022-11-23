<template>
<!-- <subHeader class="headerShadow" :headerTitle="this.headerTitle" :subTitlebtnList= "this.subTitlebtnList" @subHeaderEvent="subHeaderEvent"></subHeader> -->
  <div class="findPopupWrap pagePaddingWrap" style="padding-top: 60px;">
    <popHeader headerTitle="채널 검색" @closeXPop="closeXPop" style="box-shadow: 0px 7px 9px -9px #00000036;"/>
    <div class="findPopBody  mtop-05">
      <div style="position: relative; margin: 1rem 0; min-height: 50px;">
        <img @click="findChannel" class="searchIcon cursorP img-w20" src="../../../assets/images/common/iocn_search.png" alt="검색버튼">
        <input class="searchInput font14" id="chanSearchInput" ref="channelSearchKey" @keyup.enter="findChannel" v-model="nameMtext" placeholder="채널 검색하기" />
      </div>

      <template v-if="mFindKeyWord === ''">
        <p class="fl w-100P font16 fontBold CLDeepGrayColor textLeft">최근 검색어</p>
        <template v-if="mKeyWordList.length > 0">
          <div v-for="(data, index) in mKeyWordList" :key="index" class="fl w-100P" style=" padding: 10px 0; border-bottom:1px solid #CCCCCC90; ">
            <p class="fl font14 grayBlack" style="">{{data}}</p>
            <img src="../../../assets/images/common/grayXIcon.svg" @click="$emit('closePop')" class="fr img-w10 mtop-03" alt="">
          </div>
          <p class="fl w-100P font12 lightGray textRight mtop-05" @click="keyWordClear()">전체삭제</p>
        </template>
        <div v-else>
          <p class="fl w-100P font16 lightGray textCenter mtop-1">최근 검색한 결과가 없어요</p>
        </div>
      </template>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newestSearchKeyWordList: {},
      newestSearchYn: false,
      nameMtext: '',
      popId: null,

      mKeyWordList: [],
      mFindKeyWord: ''
    }
  },
  props: {
    tab: {}
  },
  computed: {
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate (value, old) {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      if (this.popId === hStack[hStack.length - 1]) {
        var history = this.$store.getters['D_HISTORY/hStack']
        var removePage = history[history.length - 1]
        history = history.filter((element, index) => index < history.length - 1)
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', history)
        this.closeXPop()
      }
    },
    historyStack (value, old) {
    }
  },
  created () {
    var history = this.$store.getters['D_HISTORY/hStack']
    this.popId = 'searchChanPop' + history.length
    history.push(this.popId)
    this.$store.commit('D_HISTORY/updateStack', history)
  },
  mounted () {
    document.getElementById('chanSearchInput').focus()
    var localKeyWordOBJ = JSON.parse(localStorage.getItem('searchKeyWordList'))
    if (localKeyWordOBJ === undefined || localKeyWordOBJ === null || localKeyWordOBJ === '') {
      localStorage.setItem('searchKeyWordList', JSON.stringify([]))
      localKeyWordOBJ = JSON.parse(localStorage.getItem('searchKeyWordList'))
    }
    console.log(localKeyWordOBJ)
    this.mKeyWordList = localKeyWordOBJ
    console.log(this.mKeyWordList)
  },
  methods: {
    keyWordClear () {
      localStorage.setItem('searchKeyWordList', JSON.stringify([]))
      this.mKeyWordList = []
    },
    closeXPop () {
      this.$emit('closePop')
    },
    findChannel () {
      this.mKeyWordList.push(this.nameMtext)
      localStorage.setItem('searchKeyWordList', JSON.stringify(this.mKeyWordList))
      this.mFindKeyWord = this.nameMtext
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
.findPopupWrap{position: fixed;width: 100%; left: 0;height: 100vh;top: 0;z-index: 999999; background: #FFFFFF;}
.findPopMainSearchArea{position: relative; margin-top: 0.5rem; height: 40px;}
.searchIcon{ position: absolute; top:0.6rem; left: 8px;}
.searchInput{
  background: #e4e4e463;
  width: 100%;
  height: 40px;
  margin-bottom: 5px!important;
  border-radius: 12px;
  padding: 0.4rem;
  padding-left: 2rem !important;
  box-sizing: border-box;
  float: left;
  border: 1px solid #cccccc;
}
.newestSearchWrap{border-radius: 10px; background-color: #F5F5F9; height: 150px; width: 100%; padding: 0.4rem 1rem; box-sizing: border-box;}

@media screen and (max-width: 300px) {
  .pagePaddingWrap {
    padding-top: 50px !important;
  }
}

</style>
