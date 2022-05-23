<template>
  <div style="width: 100vw; height: 100vh; position: fixed; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; z-index:1;" @click="goNo"></div>
  <div class="pushPopUpWrap" >
    <div class="pushPopContent pushMbox" v-for="(alim, index) in alimDetail" :key="index">
      <div class="pushDetailTopArea">
        <img @click="goChanDetail(alim)" class="fl mr-04 cursorP pushDetailChanLogo" src="../../assets/images/channel/tempChanImg.png">
        <div class="pushDetailHeaderTextArea">
          <p class=" font18 fontBold commonColor">{{alim.title}}</p>
          <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
          <p class="font12 fl lightGray">{{this.changeText(alim.nameMtext)}}</p>
          <p class="font12 fr lightGray">{{this.$dayjs(alim.creDate).format('YYYY-MM-DD')}}</p>
        </div>
      </div>
      <div class="font15 mbottom-1" v-html="alim.bodyMinStr" style="color: #60657F;max-height: 200px; overflow: auto;"></div>
      <div class="detailPopUpBtnArea">
        <gBtnSmall btnTitle="닫기" class="mright-05" @click="goNo"/>
        <gBtnSmall btnTitle="바로가기" class="mleft-05" @click="goOk"/>

      </div>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      loadYn: true,
      alimDetail: {}
      // testTargetKey:1000002,
    }
  },
  props: {
    detailVal: {}
  },
  methods: {
    goOk () {
      // alert(this.detailVal)
      this.$emit('ok', this.detailVal)
    },
    goNo () {
      this.$emit('no')
      // this.timeOut()
    },

    async getContentsList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // param.baseContentsKey = this.detailVal.targetKey

      param.contentsKey = this.detailVal
      // param.contentsKey = this.testTargetKey

      var resultList = await this.$getContentsList(param)
      this.alimDetail = resultList.content

      // this.$emit('closeLoading')
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      return changeTxt
      // if (changeTxt !== undefined) { return changeTxt }
    }

  },
  computed: {

  },
  created () {
    this.getContentsList()
  }
}
</script>

<style scoped>

.pushPopUpWrap{width: calc(100% - 20px);left: 10px; position: fixed;  z-index: 99; top: 30%; border-radius: 10px; background: #FFFFFF; border: 0.5px solid #CFCFCF; margin: 0 auto;}

.detailPopUpBtnArea{display: flex; margin: 0.5rem auto; height: 20px; justify-content:center;}

.pushDetailWrap{height: fit-content;}
.pushDetailTopArea{height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 50px;height: 50px;}
.pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.2rem;}

.pushPopContent{
  position: relative;
  width: 100%;
  margin: auto;
  border-radius: 0.8rem;
  background-color: #ffffff;
  color: #363c5f;
  padding: 1.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%  , 0 100%);

}

#alimCheckArea{min-height: 35px;}
.alimCheckContents{width: 100%;float: right; height: 30px;}
.alimCheckContents > img {margin-top: 3px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}

</style>
