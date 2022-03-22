<template>
    <div class="searchBoxWrap">
        <img src="../../assets/images/common/iocn_search.png" style="" alt="" class="cursorP" v-on:click="requestSearch">
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
    }
  }
}
</script>
<style scoped>
.searchBoxWrap{height: 32px; border-radius: 10px; border: 1px solid #BFBFDA;position: relative;}
img{float: let; position: absolute; top: 0.3rem; right: 0.5rem; width: 1.3rem;}
input{width: calc(100% - 2.5rem); margin-top: 0.2rem; border: none; float: left; background-color: transparent;}
</style>
