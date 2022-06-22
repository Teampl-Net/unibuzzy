<template>
  <div style="width: 100vw; height: 100vh; position: fixed; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; z-index:9999999999999;" @click="goNo"></div>
  <div class="pushPopUpWrap" >
    <div class="pushPopContent pushMbox">
      <div class="pushDetailTopArea">
        <img class="fl mr-04 cursorP pushDetailChanLogo" src="../../assets/images/channel/tempChanImg.png">
        <div class="pushDetailHeaderTextArea">
          <p class=" font18 fontBold commonColor">{{pushDetail.title}}sss</p>
          <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
          <p class="font12 fl lightGray">{{this.changeText(pushDetail.nameMtext)}}aaa</p>
          <p class="font12 fl lightGray" v-if="pushDetail.showCreNameYn">{{' (' + this.changeText(pushDetail.creUserName) + ')'}}</p>
          <p class="font12 fr lightGray">{{this.$dayjs(pushDetail.creDate).format('YYYY-MM-DD HH:mm')}}</p>

          <!-- <p class="font12 fr lightGray">{{this.$dayjs(JSON.parse(this.detailVal).sendTime).format('YYYY-MM-DD HH:mm')}}</p> -->
          <!-- <p class="font12 fr lightGray">{{this.$dayjs(pushDetail.data.sentTime).format('YYYY-MM-DD HH:mm')}}</p> -->
        </div>
      </div>
      <div class="font15 mbottom-1" v-html="pushDetail.body" style="color: #60657F;max-height: 200px; overflow: auto;"></div>
      <div class="detailPopUpBtnArea">
        <gBtnSmall btnTitle="바로가기" class="mright-05" style="height: 30px;" @click="goOk"/>
        <gBtnSmall btnTitle="닫기" class="mleft-05" style="height: 30px;" @click="goNo"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loadYn: true,
      pushDetail: {},
      targetKey: ''
      // testTargetKey:1000002,
    }
  },
  props: {
    detailVal: {}
  },
  methods: {
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      return Base64.decode(data)
    },
    goOk () {
      this.openPushDetailPop()
    },
    goNo () {
      this.$emit('closePushPop')
      // this.timeOut()
    },
    openPushDetailPop () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'pushListAndDetail'
      params.notiBridgeYn = true
      params.targetKey = this.targetKey
      this.$emit('openDetailPop', params)
      // this.$router.replace({ name: 'pushDetail', params: { pushKey: idx } })
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
      // this.pushDetail = this.detailVal.data
    if (localStorage.getItem('systemName') === 'iOS') {
      this.pushDetail = JSON.parse(this.detailVal).data

      this.targetKey = this.pushDetail.targetKey
      alert(this.pushDetail)

    } else {
      this.pushDetail = JSON.parse(this.detailVal).data
      this.targetKey = this.pushDetail.targetKey
    }
  }
}
</script>

<style scoped>

.pushPopUpWrap{width: calc(100% - 20px);left: 10px; position: fixed; box-shadow: 0 0 9px 2px #b8b8b8; z-index: 99999999999999999; top: 30%; border-radius: 10px; background: #FFFFFF; border: 0.5px solid #CFCFCF; margin: 0 auto;}

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
.pushPopUpWrap {
  animation: fadein 0.3s;
  -moz-animation: fadein 0.3s; /* Firefox */
  -webkit-animation: fadein 0.3s; /* Safari and Chrome */
  -o-animation: fadein 0.3s; /* Opera */
}
</style>
