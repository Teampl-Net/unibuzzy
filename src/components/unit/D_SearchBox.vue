<template>
  <div class="fl cursorP commonColorBorder" style="border-radius: 7px; min-width: 80px; padding:3px 7px;  padding-right: 25px; position: relative;">
    <p class="fl font12 lightGray"><small class="fl font12 commonColor fontBold mleft-03">{{propSearchBox.searchType}}</small><small class="fl font12 fontBold lightGray mleft-03">{{propSearchBox.dispName}}</small></p>
    <img class="cursorP" @click="this.$emit('delSearchBox')" src="../../assets/images/common/popup_close.png" style="width: 10px; position: absolute; right: 5px;  top: 8px;" alt="">
  </div>
</template>

<script>
export default {
  props: {
    propSearchBox: {}
  },
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>

</style>
