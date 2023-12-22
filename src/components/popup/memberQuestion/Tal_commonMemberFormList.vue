<template>
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <div v-for="(data, index) in list" :key="index" class="fl w-100P mtop-05" style="border-bottom:1px solid #ccc;padding-bottom:0.5rem">
    <div class="fl w-100P" style="line-height:20px">
      <img v-if="data.activeYn" src="../../../assets/images/channel/Live_icon.svg" class="fl" style="backgcolor:#ccc" alt="">
      <img v-else src="../../../assets/images/channel/nonLive_icon.svg" class="fl" style="backgcolor:#ccc" alt="">

      <p @click='goDetail(data)' style="width:calc(100% - 60px)" class="fl textLeft commonBlack font18 fontBold mleft-05 textOverdot">{{data.mFormTitle}}</p>

      <gToggle :toggleId='data.mFormKey' @changeToggle='toggle(data)' :isChecked="data.activeYn" class="fr" />
    </div>

    <p @click='goDetail(data)' class="fl lightGray textLeft font16 w-100P textOverdot">{{data.mFormMemo}}</p>

    <div class="cardBottomArea w-100P fl mtop-05" style="height:30px; line-height:30px;">
      <img @click="copyClick(data, index)" src="../../../assets/images/channel/Copy_icon.svg" class="fl" alt="">
      <img @click="deleteClick(data, index)" src="../../../assets/images/channel/Trash_icon.svg" class="fl mleft-2" alt="">
      <p @click='goDetail(data)' style="width:calc(100% - 80px); height:100%;" class="textRight fr commonBlack font14">{{this.$changeDateFormat(data.creDate)}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {}
  },
  data () {
    return {

    }
  },
  methods: {
    toggle (data) {
      this.$emit('toggle', data)
    },
    goDetail (data) {
      this.$emit('goDetail', data)
    },
    copyClick (data, index) {
      var param = {}
      param.data = data
      param.index = index
      this.$emit('copyClick', param)
    },
    deleteClick (data, index) {
      var param = {}
      param.data = data
      param.index = index
      this.$emit('deleteClick', param)
    }
  }
}
</script>
<style>
</style>
