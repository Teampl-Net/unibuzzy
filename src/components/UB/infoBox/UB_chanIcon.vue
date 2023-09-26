<template>
    <div  v-if="chanElement" class="cursorP chanIconWrap" @click="pGoChannelMain(chanElement)">
        <div class="roundImg"
            :style="'background-image: url(' + $changeUrlBackslash(mImgPath) + ');' + `border: ${selectedYn? '2px solid #5F61BD;':'0.5px solid rgba(0, 0, 0, 0.1);'}` + `${pBestYn? 'box-shadow: 0px 0px 10px 5px #f7d83c;':''}`" >
            <div v-if="pBestYn" class="CWhiteBgColor chanIconImgBox">
                <img class="fl w100P" src="../../../assets/images/channel/ownerChannel_crown.svg" alt="">
            </div>
        </div>
        <p class="commonGray font14 w100P textOverdot pTop-05">{{$changeText(chanElement.nameMtext)}}</p>
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
  }
}
</script>
<style scoped>
.chanIconImgBox {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  top: 0;
  width: 18px;
  height: 18px;
  border-radius: 100%;
}
.chanIconWrap {
  width: 75px;
  height: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.roundImg{
  transition:all .3s;
  background-color: white;
  position: relative;
  width: 65px; height: 65px;
  float: left;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.roundImg:hover{
  box-shadow:inset 0 0 4px rgba(0,0,0,0.4);
}
.roundImg + p{
  transition:all .3s;
  font-weight:normal;
}
.roundImg:hover +p{
  font-weight:bold;
}

</style>
