<template>
  <div class="pushBackground" @click="goNo"></div>
  <div class="pushPopUpWrap" >
    <div class="pushPopContent pushMbox zoomInOutPop">
      <div class="pushDetailTopArea">
        <div v-if="pushDetail.domainPath" class="fl pushDetailPopChanLogoImgWrap" :style="'background-image: url(' + (pushDetail.domainPath !== null ? pushDetail.domainPath + pushDetail.logoPathMtext : pushDetail.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center;"></div>
        <img v-else class="fl mr-04 cursorP pushDetailChanLogo" src="../../../assets/images/channel/tempChanImg.png">

        <div class="pushDetailHeaderTextArea">
          <p class=" font18 fontBold commonColor">{{pushDetail.title}}</p>
          <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
          <p class="font12 fl lightGray">{{this.changeText(pushDetail.nameMtext)}}</p>
          <p class="font12 fl lightGray" v-if="pushDetail.showCreNameYn">{{' (' + this.$changeText(pushDetail.creUserName) + ')'}}</p>
          <p class="font12 fr lightGray">{{this.$changeDateFormat(pushDetail.creDate)}}</p>

          <!-- <p class="font12 fr lightGray">{{this.$dayjs(JSON.parse(this.detailVal).sendTime).format('YYYY-MM-DD HH:mm')}}</p> -->
          <!-- <p class="font12 fr lightGray">{{this.$dayjs(pushDetail.data.sentTime).format('YYYY-MM-DD HH:mm')}}</p> -->
        </div>
      </div>

      <!-- <div class="font15 mbottom-1" v-html="body" style="color: #60657F;max-height: 200px; overflow: auto; "></div> -->
      <div class="font14 mbottom-05 bodyFullStr cursorDragText" v-html="setBodyLength(pushDetail.bodyFullStr)" style="max-height:300px; overflow:hidden"></div>
      <p @click="goOk" v-show="pushDetail.bodyFullStr && pushDetail.bodyFullStr.length > 130" class="font16 cursorP textRight mbottom-1" style="">더보기></p>

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
      targetKey: '',
      body: ''
      // testTargetKey:1000002,
    }
  },
  props: {
    detailVal: {}
  },
  computed: {
    historyStack () {
      return this.$store.getters.hStack
    },
    pageUpdate () {
      return this.$store.getters.hUpdate
    }
  },
  watch: {
    pageUpdate (value, old) {
      var hStack = this.$store.getters.hStack
      if (this.popId === hStack[hStack.length - 1]) {
        this.goNo()
      }
    },
    historyStack (value, old) {
    }
  },
  methods: {
    /* decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      // eslint-disable-next-line no-
      return changeText
    }, */
    goOk () {
      this.openPushDetailPop()
    },
    goNo () {
      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)
      this.$emit('closePushPop')
    },
    openPushDetailPop () {
      var history = this.$store.getters.hStack
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('setRemovePage', removePage)
      this.$store.commit('updateStack', history)

      var currentPage = this.$store.getters.hCPage

      if ((currentPage === 0 || currentPage === undefined)) {
        this.$emit('openDetailPop', { nameMtext: this.detailVal.creTeamName, targetKey: this.detailVal.creTeamKey, targetContentsKey: this.detailVal.targetKey, targetType: 'chanDetail', value: this.pushDetail })
      } else {
        this.$emit('openDetailPop', { nameMtext: this.detailVal.creTeamName, targetKey: this.detailVal.creTeamKey, targetContentsKey: this.detailVal.targetKey, targetType: 'chanDetail', value: this.pushDetail })
      }
      // this.$router.replace({ name: 'pushDetail', params: { pushKey: idx } })
    },
    setBodyLength (str) {
      // eslint-disable-next-line no-undef
      str = Base64.decode(str)
      // str = atob(str)
      str.replace('contenteditable= true', '')
      if (str.length > 130) {
        str.substring(0, 130)
      }
      return str
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      return changeTxt
      // if (changeTxt !== undefined) { return changeTxt }
    },
    async getContentsList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // param.baseContentsKey = this.detailVal.targetKey
      // param.contentsKey = 1001172
      param.contentsKey = 1003095
      /* param.contentsKey = this.detailVal.targetKey */
      param.contentsKey = this.detailVal.contentsKey
      var resultList = await this.$getContentsList(param)
      return resultList
    }

  },
  async created () {
    this.body = this.detailVal.body
    var resultList = await this.getContentsList()
    this.pushDetail = resultList.content[0]
    var history = this.$store.getters.hStack
    this.popId = 'pushDetailPop' + history.length
    history.push(this.popId)
    this.$store.commit('updateStack', history)
    // alert(JSON.stringify(this.detailVal))
    // alert(JSON.stringify(this.pushDetail))
  }
}
</script>

<style scoped>

.pushPopUpWrap{
  /* width: calc(100% - 20px); box-shadow: 0 0 9px 2px #b8b8b8; border-radius: 10px; background: #FFFFFF; border: 0.5px solid #CFCFCF; margin: 0 auto; */

}

.detailPopUpBtnArea{display: flex; margin: 0.5rem auto; height: 20px; justify-content:center;}

.pushDetailWrap{height: fit-content;}
.pushDetailTopArea{height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 50px;height: 50px;}
.pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.2rem;}

.pushPopContent{
  position: absolute;
  width: 90%;
  left: 5%;
  top: 30%;
  z-index: 999999999999999999;
  transform: translateY(-50%);
  /* margin: auto; */
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
.pushDetailStickerWrap{max-width: calc(100% - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}

.pushBackground{width: 100%; height: 100vh; position: absolute; top:0; left: 0; background: #00000026; display: flex; justify-content: center; align-items: center; z-index:99999999999999999;}

.pushDetailPopChanLogoImgWrap {width: 40px; float: left; display: flex; align-items: center; justify-content: center; height: 40px; border-radius: 40px; margin-right: 0.5rem; border: 2px solid #ccc; position: relative;;}
</style>
