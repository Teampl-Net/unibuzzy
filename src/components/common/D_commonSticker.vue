<template>
  <div v-if="this.mSticker" class="font15 textLeft fontBold textOverdot" :style="'background:' + mSticker.picBgPath + '; color: color-mix(' + mSticker.picBgPath + ', black 20%)'  +  + ';' " style="width: 50px; position: relative; border-radius: 100%; height: 50px; text-align: center; justify-content: center; display: flex; align-items: center; ">{{this.$changeText(this.mSticker.nameMtext)}}
  </div>
</template>
<script>
export default {
  props: {
    pSticker: {}
  },
  created () {
    console.log(this.mSticker)
  },
  data () {
    return {
      mSticker: this.pSticker
    }
  }
}
</script>

<style scoped>

</style>
