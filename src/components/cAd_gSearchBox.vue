<template>
    <div class="searchBoxWrap">
        <img src="../resource/images/iocn_search.png" style="" alt="" class="cursorP" v-on:click="requestSearch">
        <input type="text" v-model="searchKeyWord" name="" style="" id="" v-on:keyup.enter="requestSearch">
    </div>
</template>
<script>
export default {
  data () {
    return {
      searchKeyWord: ''
    }
  },
  methods: {
    requestSearch () {
      // eslint-disable-next-line no-new-object
      var searchKey = new Object()
      searchKey.searchType = 'search'
      searchKey.searchKeyWord = this.searchKeyWord
      this.$emit('searchKey', searchKey)
      this.searchKeyWord = ''
    }
  }
}
</script>
<style scoped>
.searchBoxWrap{height: 32px; border-radius: 15px; border: 1px solid #BFBFDA;position: relative;}
img{float: let; position: absolute; top: 0.3rem; left: 0.5rem; width: 1.3rem;}
input{width: calc(100% - 2.5rem); margin-top: 0.2rem; border: none; float: right; background-color: transparent;}
</style>
