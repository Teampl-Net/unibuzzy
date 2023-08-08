<template>
    <div  v-if="chanElement" class="cursorP" style="width: 75px; height: 100%;float: left; display: flex; margin-right: 10px; flex-direction: column; justify-content: center; align-items: center;" @click="pGoChannelMain(chanElement)">
        <div style="background-color: white; position: relative; width: 65px; height: 65px; float: left; border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;"
            :style="'background-image: url(' + mImgPath + ');' + `border: ${selectedYn? '2px solid #5F61BD;':'0.5px solid rgba(0, 0, 0, 0.1);'}` + `${pBestYn? 'box-shadow: 0px 0px 10px 5px #f7d83c;':''}`" >
            <div v-if="pBestYn" class="CWhiteBgColor" style="position: absolute; right: 0; display: flex; justify-content: center; algin-items: center; padding: 2px; top: 0; width: 18px; height: 18px; border-radius: 100%;">
                <img src="../../../assets/images/channel/ownerChannel_crown.svg" style="width: 100%; float: left;" alt="">
            </div>
        </div>
        <p class="commonGray font14 w100P textOverdot" style="padding-top:5px;">{{this.$changeText(chanElement.nameMtext)}}</p>
    </div>
</template>
<script>
export default {
  created () {
    if (this.chanElement.logoPathMtext) {
      if (this.chanElement.logoDomainPath) {
        this.mImgPath = this.chanElement.logoDomainPath + this.chanElement.logoPathMtext
      } else {
        this.mImgPath = this.chanElement.logoPathMtext
      }
    } else {
      if (this.chanElement.domainPath) {
        this.mImgPath = this.chanElement.domainPath + this.chanElement.pathMtext
      } else {
        this.mImgPath = this.chanElement.pathMtext
      }
    }
  },
  data () {
    return {
      mImgPath: ''
    }
  },
  props: {
    chanElement: {},
    selectedYn: Boolean,
    pBestYn: Boolean,
    pGoChannelMain: Function
  },
  methods: {
    goChannelMain () {
      var openPopParam = {}
      openPopParam = this.chanElement
      openPopParam.value = this.chanElement
      openPopParam.targetKey = this.chanElement.teamKey
      openPopParam.targetType = 'chanDetail'
      this.$emit('openPop', openPopParam)
    }
  }
}
</script>
<style scoped>

</style>
