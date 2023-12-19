<template>
    <div style="background-color: #FFFFFF; width: 100%; height: 100%;  padding: 20px 10px; ">
        <div style="width: 100%; min-height: 60px; margin-bottom: 10px; border-bottom: 1px solid #ccc;">
          <img style="width: calc(100% - 100px); height: 40px;" class="fl mright-05 mtop-05 " :src="'./resource/stickerIcon/sticker'+selectedSticker+'.svg'" alt="">
          <gBtnSmall @click="selectSticker" style="float: left; height: 23px; margin-bottom: 5px; line-height: 23px;margin-left: 10px" btnTitle="선택"/>
          <gBtnSmall @click="closePop" style="float: left; height: 23px; color: #A9AACD; border: 1px solid #A9AACD; line-height: 23px; background: #FFFFFF; margin-left: 10px" btnTitle="닫기"/>
        </div>
        <div style="width: 100%; height:195px; overflow-y: auto; overflow-x: hidden; box-sizing: border-box;">
          <div v-for="(value, index) in 40" @click="pickSticker(index)" class="" :key="index" style="width: 25%; display: flex; justify-content: center; align-items: center; height: 3rem; float: left;">
            <img style="width: 2rem; height: 2rem;" class="fl mright-05 mtop-05 " :src="'./resource/stickerIcon/sticker'+index+'.svg'" alt="">
          </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      selectedSticker: 0
    }
  },
  methods: {
    pickSticker (Num) {
      this.selectedSticker = Num
    },
    selectSticker () {
      this.$emit('closePop', this.selectedSticker)
    },
    closePop () {
      this.$emit('closePop', '0')
    }
  },
  props: {
    stickerPick: {}
  },
  created () {
    this.selectedSticker = this.stickerPick
  },
  components: {
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
