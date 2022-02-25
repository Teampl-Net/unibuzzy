<template>
    <div class="searchResultWrap">
        <div v-for="(value, index) in tempSearchList" :key="index" class="searchResultBox ">
          <span v-if="value.searchType === 'filter'">필터: </span>
          {{value.searchKeyWord}}
            <img v-on:click="delSearchKey(index)" class="cursorP" src="../resource/images/searchXIcon.svg"  style="" alt="">
        </div>
    </div>
</template>
<script>
export default {
  props: {
    searchList: {}
  },
  mounted () {
    this.tempSearchList = this.searchList
  },
  data () {
    return {
      tempSearchList: {}
    }
  },
  methods: {
    delSearchKey (delKey) {
      this.tempSearchList.splice(delKey, 1)
      this.$emit('changeSearchList', this.tempSearchList)
    }
  }
}
</script>

<style scoped>
.searchResultWrap{min-height: 2rem;padding-top: 0.5rem; width: 100%;float: left;margin-bottom: 0.2rem;}
.searchResultBox{margin-right: 0.5rem; min-width:60px; border: 1px solid #BFBFDA;background-color: #BFBFDA; position: relative; border-radius: 15px; float: left; height: 22px; padding: 0 0.7rem; padding-right: 1.2rem; font-size: 12px; }
.searchResultBox img{position: absolute; right: 0.3rem; top: 0.3rem;}
</style>
