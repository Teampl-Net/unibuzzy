<template>
    <div class="searchResultWrap" id="searchResultWrapLength" :style="!setSearchList || setSearchList.length === 0 ?'border-bottom:none':''">
        <div v-for="(value, index) in setSearchList" :key="index" class="searchResultBox textOverdot">
          <span>{{value.typeName}}: </span>
          {{value.keyword}}
            <img v-on:click="delSearchKey(value.type)" class="cursorP searchXIcon" src="@/assets/images/common/searchXIcon.svg"  alt="">
        </div>
    </div>
</template>
<script>
export default {
  props: {
    searchList: {}
  },
  data () {
    return {
      tempSearchList: {}
    }
  },
  methods: {
    delSearchKey (type) {
      this.$emit('changeSearchList', type)
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
.searchXIcon {
  margin-top: 0.3rem;
  margin-right: 0.3rem;
}
.searchResultWrap {
  min-height: 1rem;
  padding: 0.2rem 0;
  padding-top: 0.6rem;
  width: 100%;
  float: left;
}
.searchResultBox {
  margin-right: 0.8rem;
  min-width:60px;
  margin-bottom: 5px;
  max-width: 120px;
  border: 1px solid #d1d1d1;
  position: relative;
  border-radius: 10px;
  float: left;
  height: 26px;
  line-height: 26px;
  padding: 0 0.7rem;
  padding-right: 1.5rem;
  font-size: 12px;
  background: #FFF;
}
.searchResultBox img {
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
}
</style>
