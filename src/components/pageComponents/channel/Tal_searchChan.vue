<template>
    <div>
        <div style="position: relative; margin: 1rem 0">
            <img @click="findChannel" class="searchIcon" src="../../../assets/images/common/iocn_search.png" alt="검색버튼">
            <input style="border: none !important;" class="searchInput font15" ref="channelSearchKey" v-model="nameMtext" placeholder="채널 검색하기" />
        </div>
        <div class="newestSearchWrap">
            <div lass="w-100P" style="height: 2rem">
                <span class="font18 fontBold commonColor fl">최근ss 검색</span>
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
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      newestSearchKeyWordList: {},
      newestSearchYn: false,
      nameMtext: ''
    }
  },
  methods: {
    findChannel () {
      var paramMap = new Map()
      paramMap.set('requestSearchList', this.nameMtext)
      this.$emit('requestSearchList', paramMap)
    }
  }
}
</script>
<style scoped>
.searchIcon{width: 1.5rem; position: absolute; top:0.5rem; right: 8px;}
.searchInput{border: none !important; padding: 1px; background: #e4e4e463; width: 100%; border-radius: 12px; padding: 0.4rem; padding-right: 3rem; box-sizing: border-box}
.newestSearchWrap{border-radius: 10px; background-color: #F5F5F9; height: 150px; width: 100%; padding: 0.4rem 1rem; box-sizing: border-box;}
</style>
