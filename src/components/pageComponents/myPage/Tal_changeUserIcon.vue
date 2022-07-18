<template>
    <div style="width: 100vw; height: 100vh; position: fixed; top:0; left: 0; background: #00000026; z-index: 9999;" @click="this.$emit('no')"></div>
    <div style="width: calc(100% - 30px);  position: fixed;top: 15%; left: 15px; z-index: 999999; background: #FFF; border-radius: 20px; padding: 10px; border: 0.51px solid #ccc; box-shadow: 9px 9px 9px -9px rgb(0 0 0 / 19%); height: 430px; float: left;">
        <p class="fl textLeft commonColor font18 fontBold mleft-05 mbottom-05">프로필 이미지 변경</p>
        <div style="width: 100%;height: calc(100% - 80px); float: left; overflow: hidden auto;">
          <div @click="selectIcon(value.imageFilekey)" :class="selectedIconFileKey === value.imageFilekey ? 'selectedColor' : ''" style="float: left; overflow: hidden; background: #6768a745; border-radius: 100%; width: 100px; height: 100px; margin: 10px 5px; padding: 10px; padding-top: 20px; padding-bottom: 0; " v-for="(value, index) in teamImgList" :key="index">
            <img style="width: 100%;" :src="value.pathMtext"  alt="">
          </div>
        </div>
        <div style="width: 100%; min-height: 40px; margin-top: 1rem; float: left;">
          <gBtnSmall @click="this.$emit('no')" btnTitle="닫기" btnThema="light"/>
          <gBtnSmall @click="updateUserIcon" btnTitle="선택" class="mright-05" />
        </div>
      </div>
</template>
<script>
export default {
  data () {
    return {
      selectedIconFileKey: 0,
      teamImgList: []
    }
  },
  props: {
    parentSelectedIconFileKey: {}
  },
  created () {
    if (this.parentSelectedIconFileKey !== undefined && this.parentSelectedIconFileKey !== null && this.parentSelectedIconFileKey !== '') {
      this.selectedIconFileKey = this.parentSelectedIconFileKey
    }
    this.getCodeList()
  },
  methods: {
    selectIcon (fileKey) {
      this.selectedIconFileKey = fileKey
    },
    changeUserIcon () {
    },
    async getCodeList () {
      var resultList = null
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.groupCode = 'U_ICON'
      resultList = await this.$getCodeList(param)
      this.teamImgList = resultList

      // var a = this.teamImgList
    },
    async updateUserIcon () {
      // KO$^$수망고$#$EN$^$sumango
      var param = {}
      var user = {}
      // param.user = this.userInfo
      user.userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      user.picMfilekey = this.selectedIconFileKey
      param.user = user
      param.updateYn = true

      var result = await this.$changeDispName(param)
      console.log(result)

      if (result.data.message === 'OK') {
        // this.userInfo.userDispMtext =  this.$changeText(param.user.userDispMtext)
        this.$router.replace({ path: '/' })
        // this.userInfo.userDispMtext = await this.$changeText(param.user.userDispMtext)
      } else {

      }
    }
  }
}
</script>

<style scoped>
    .selectedColor {border: 2px solid #6768a7}
</style>
