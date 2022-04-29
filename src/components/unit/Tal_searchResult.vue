<template>
    <div class="searchResultWrap">
        <div v-for="(value, index) in setSearchList" :key="index" class="searchResultBox ">
          <span>{{value.type}}: </span>
          {{changeSearchBox(value.type, value.keyword)}}
            <img v-on:click="delSearchKey(index)" class="cursorP" style="margin-top: 0.3rem; margin-right: 0.3rem;" src="../../assets/images/common/searchXIcon.svg"  alt="">
        </div>
    </div>
</template>
<script>
export default {
  props: {
    searchList: {}
  },
  created () {
  },
  data () {
    return {
      tempSearchList: {}
    }
  },
  methods: {
    delSearchKey (index) {
      // this.tempSearchList.splice(delKey, 1)
      this.$emit('changeSearchList', index)
    },
    castingSearchKey (searchMap) {
      // alert(searchMap)
    },
    changeSearchBox (type, keword) {
      if (7 - type.length) {
        var chaneTxtLength = 7 - type.length
        var resultKeyword = keword.substring(0, chaneTxtLength)
      }
      return resultKeyword
    }
  },
  computed: {
    setSearchList () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.tempSearchList = this.searchList
      return this.tempSearchList
    }
  }
}
</script>

<style scoped>
.searchResultWrap{min-height: 1rem;padding: 0.2rem 0; padding-top: 0.5rem; width: 100%;float: left;margin-bottom: 0.2rem; border-bottom: 1px solid #d1d1d1;}
.searchResultBox{margin-right: 0.8rem; min-width:60px;margin-bottom: 5px; max-width: 120px;    border: 1px solid #d1d1d1;/*  border: 2px solid none;background-color: #bfbfda6b; */ position: relative; border-radius: 10px; float: left; height: 26px; line-height: 26px; padding: 0 0.7rem; padding-right: 1.5rem; font-size: 12px; }
.searchResultBox img{position: absolute; right: 0.3rem; top: 0.3rem;}
</style>
