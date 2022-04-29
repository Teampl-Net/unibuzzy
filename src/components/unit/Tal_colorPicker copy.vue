<template>
    <div style="background-color: #FFFFFF; width: 100%; height: 100%;  padding: 20px 10px; ">
        <div :style="changeColor" style="background-color: var(--selectedColor); width: calc(100% - 100px); margin-left: 20px; float: left; height: 50px; margin-bottom: 10px;"></div>
        <gBtnSmall @click="selectColor" style="float: left; height: 23px; margin-bottom: 5px; line-height: 20px;margin-left: 10px" btnTitle="선택"/>
        <gBtnSmall @click="closePop" style="float: left; height: 23px; color: #A9AACD; border: 1px solid #A9AACD; line-height: 20px; background: #FFFFFF; margin-left: 10px" btnTitle="닫기"/>
        <div style="width: 100%; height:195px; overflow-y: auto; overflow-x: hidden;">
            <Swatches style="height: 560px; box-shadow: none; width: 100%; overflow: hidden" v-model="this.selectedColors"/>
        </div>
    </div>
</template>
<script>
import { Swatches } from '@ckpack/vue-color'
export default {
  data () {
    return {
      selectedColors: {
        hex: '#AED581'
      }
    }
  },
  props: {
    colorPick: {}
  },
  created () {
    this.selectedColors = this.colorPick
  },
  components: {
    Swatches
  },
  computed: {
    changeColor () {
      return {
        '--selectedColor': this.selectedColors.hex
      }
    }
  },
  methods: {
    selectColor () {
      this.$emit('closePop', this.selectedColors)
    },
    closePop () {
      this.$emit('closePop', '0')
    }
  }
}
</script>

<style scoped>

</style>
