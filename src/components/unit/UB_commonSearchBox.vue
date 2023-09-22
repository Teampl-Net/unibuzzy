<template>
    <div class="pushListSearchArea">
      <div class="searchImgBox">
        <img class="searchIcon mtop-03 cursorP" @click="this.$emit('openFindPop')" src="../../assets/images/common/iocn_search.png" alt="검색버튼">
        <div class="searchInput font15" :class="{darkerBgColor : this.targetType === 'myActList'}" @click="this.$emit('openFindPop')" ref="alimSearchKey" />
      </div>
      <div class="searchResultWrap">
        <searchResult @changeSearchList="changeSearchList" :searchList="resultSearchKeyList" />
      </div>
    </div>
</template>
<script>
import searchResult from '../../components/unit/UB_searchResult.vue'
export default {
  data () {
    return {
      searchKeyWord: ''
    }
  },
  components: {
    searchResult
  },
  methods: {
    requestSearch () {
      // eslint-disable-next-line no-new-object
    },
    changeSearchList (type) {
      this.$emit('changeSearchList', type)
    }
  },
  props: {
    resultSearchKeyList: {},
    targetType: {},
    searchType: {}
  },
  computed: {
  }
}
</script>
<style scoped>
.searchImgBox {
  position: relative;
  margin-top: 1rem;
  height: 40px;
}
.darkerBgColor {
  background: #e9e9e9 !important;
}
.pushListSearchArea {
  position: relative;
  margin-bottom: 1.5rem;
  min-height: 2.5rem;
  width: 100%;
  float: left;
}
.searchIcon {
  width: 1.5rem;
  float: right;
}
.searchInput {
  border: 2px solid #E4E4E4;
  float: left;
  width: calc(100% - 2rem);
  float: left;
  border-radius: 12px;
  padding: 0.4rem;
  padding-right: 3rem;
  box-sizing: border-box;
}

.searchIcon {
  width: 1.5rem;
  position: absolute;
  top: 0.3rem;
  right: 0.9rem
}
.searchInput {
  border: none;
  background: #e4e4e463;
  height: 100%;
  float: left;
  width: 100%;
  border-radius: 12px;
  padding: 0.4rem;
  padding-right: 3rem;
  box-sizing: border-box
}
.searchResultWrap {
  width: 100%;
  min-height: 30px;
}
</style>
