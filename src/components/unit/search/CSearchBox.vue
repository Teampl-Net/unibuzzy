<template>
  <div class="fl commonColorBorder cSearchBox" @click="searchFunc()">
    <template v-if="propChanSearchYn === true">
      <p class="fl font14 lightGray">{{propSearchBox.searchType}}</p>
      <p class="fl font14 commonColor mleft-03">{{propSearchBox.dispName}}</p>
    </template>
    <template v-if="propChanSearchYn === false">
      <p class="fl font14 commonColor">{{propSearchBox.dispName}}</p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    propSearchBox: {},
    propChanSearchYn: { type: Boolean, default: false }
  },
  methods: {
    searchFunc () {
      this.$emit('searchBoxClick', this.propSearchBox)
    }
  }
}
</script>

<style scoped>
.cSearchBox {
  border-radius: 7px;
  padding:3px 7px;
}
</style>
