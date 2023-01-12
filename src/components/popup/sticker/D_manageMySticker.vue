<template>
    <div style="width: calc(100% - 80px); height: 400px; background: #FFF; border-radius: 0.8rem; box-shadow: 0 0 4px 4px #00000026; position: absolute; z-index: 99; top: 10%; left: 40px;">
        <div class="newHeaderLine" style="height: 50px; padding: 0 20px; display: flex; align-items: center; width: 100%; position: relative; float: left;">
            <p class="textLeft font20 fontBold commonColor">내 분류 설정</p>
            <img @click="backClick" src="../../../assets/images/common/popup_close.png" style="width: 20px; position: absolute; right: 20px; top: 15px;" alt="">
        </div>
        <div style="width: 100%; height: calc(100% - 100px); float: left; padding: 10px 20px;">
          <p style="" class="mbottom-05 textLeft font16 fontBold">내 분류</p>
          <template  v-for="(item, index) in mMyStickerList" :key="index" >
            <gStickerLine class="fl mright-05" v-if="item.stickerKey" :pSticker="item" />
          </template>
        </div>
        <div style="width: 100%; height: 50px; float: left; display: flex; justify-content: center; align-items: center;">
            <gBtnSmall @click="backClick" btnTitle="닫기" btnThema="light"/>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    pMyStickerList: {}
  },
  data () {
    return {
      mMyStickerList: this.pMyStickerList
    }
  },
  created () {
    console.log(this.mMyStickerList)
  },
  watch: {
    pMyStickerList: {
      handler (value, old) {
        console.log(value)
        if (!value) return
        this.mMyStickerList = value
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
