<template>
  <div class="fl commonColorBorder" style="border-radius: 7px; padding:4px 5px;">
    <template v-if="propSearchYn === true">
      <p class="fl font14 lightGray">{{propSearchBox.searchType}}</p>
      <p class="fl font14 commonColor mleft-03">{{propSearchBox.dispName}}</p>
    </template>
    <template v-if="propSearchYn === false">
      <p class="fl font14 commonColor">{{propSearchBox.dispName}}</p>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    propSearchBox: {},
    propSearchYn: { type: Boolean, default: false }
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
