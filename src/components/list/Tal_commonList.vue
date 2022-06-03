
<template>
  <div id="chanWrap" class="commonListWrap">
    <!-- <p style="position: fixed;">{{currentScroll}}</p> -->
    <div class="commonListContentBox pushMbox" v-for="(alim, index) in this.contentsList" :key="index">
        <div @click="goDetail(alim)" class="pushDetailTopArea">
          <div class="chanLogoImgWrap">
            <img v-if="alimListYn" class="fl cursorP pushDetailChanLogo" :src="alim.logoPathMtext">
            <img v-else class="flcursorP pushDetailChanLogo" @click="goChanDetail(alim.creTeamKey, alim.nameMtext)" :src="alim.logoPathMtext">
          </div>
            <div class="pushDetailHeaderTextArea">
              <p class=" font15 fontBold commonBlack">{{resizeText(alim.title)}}</p>
            <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
              <p class="font12 fl lightGray">{{this.changeText(alim.nameMtext)}}</p>
              <p class="font12 fr lightGray">{{this.$dayjs(alim.creDate).format('YYYY-MM-DD')}}</p>
            </div>
        </div>
        <div @click="goDetail(alim)" class="font14 mbottom-05 bodyMinStr" v-html="setBodyLength(alim.bodyMinStr)"></div>
        <div id="alimCheckArea">
          <div class="alimCheckContents">
            <!-- <div class="pushDetailStickerWrap">
              <div class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in tempAlimList.stickerList " :key="index" >
                <img :src="value.stickerIcon" alt="">
              </div>
            </div> -->
            <div @click="changeAct(userDo, alim.contentsKey)"  class="fr userDoWrap" v-for="(userDo, index) in settingUserDo(alim.userDoList)" :key="index">
              <template v-if="userDo.doType === 'ST'">
                <img class="fl" style="width: 1.5rem" v-if="userDo.doKey > 0" src="../../assets/images/common/colorStarIcon.svg" alt="">
                <img class="fl" style="width: 1.5rem"  v-else src="../../assets/images/common/starIcon.svg" alt="">
              </template>
              <template v-else-if="userDo.doType === 'LI'">
                <img class="mright-05 fl" style="margin-top: 2px;width: 1.3rem" v-if="userDo.doKey > 0" src="../../assets/images/common/likeIcon.svg" alt="">
                <img class="mright-05 fl" style="margin-top: 3px;width: 1.3rem" v-else src="../../assets/images/common/light_likeIcon.svg" alt="">
              </template>
            </div>
          </div>
        </div>
        <!-- <div  class="font15"> {{this.alimDetail.creDate}}</div> -->
        <!-- <div> -->
          <!-- <gBtnSmall class="mr-04 gBtnSmall addClick_popupClick.test()_addClick" btnTitle="상세보기" /> -->
          <!-- <gBtnSmall  class="mr-04 gBtnSmall"  btnTitle="링크열기" /> -->
        <!-- </div> -->

      </div>
      <myObserver @triggerIntersected="loadMore" class="fl w-100P"></myObserver>

  </div>
</template>
<script>

export default {
  components: {

  },
  created () {
    this.contentsList = this.commonListData
  },
  watch: {
    commonListData () {
      this.contentsList = this.commonListData
    }
  },
  updated () {
    this.chanWrap.scrollTop = this.currentScroll
  },
  mounted () {
    this.chanWrap = document.getElementById('chanWrap')
    this.chanWrap.addEventListener('scroll', this.saveScroll)
    if (this.mainYnProp === true) { this.mainYn = true }
    var imgList = document.querySelectorAll('.bodyMinStr img')
    for (var i = 0; i < imgList.length; i++) {
      imgList[i].setAttribute('style', 'display: none')
    }
  },
  unmounted () {
    this.chanWrap.removeEventListener('scroll', this.saveScroll)
  },
  /* emits: ['goDetail'], */
  methods: {
    resizeText (text) {
      if (text.length > 20) {
        text = text.substr(0, 20)
      }
      return text
    },
    saveScroll () {
      this.currentScroll = this.chanWrap.scrollTop
      this.$emit('currentScroll', this.currentScroll)
    },
    goChanDetail (teamKey, nameMtext) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'chanDetail'
      param.teamKey = teamKey
      param.targetKey = teamKey
      param.nameMtext = nameMtext
      this.$emit('goDetail', param)
    },

    goDetail (value) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'pushDetail'
      param.contentsKey = value.contentsKey
      param.value = value

      this.$emit('goDetail', param)
    },
    settingDateFormat (date) {
      return this.$dayjs(date).format('YYYY-MM-DD')
    },
    cutStickerName (value) {
      var cutName = value.substr(0, 1)
      return cutName
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      return changeTxt
      // if (changeTxt !== undefined) { return changeTxt }
    },
    settingUserDo (userDo) {
      // var userDoList = { LI: { doKey: 0 }, ST: { doKey: 0 } }
      var userDoList = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }]
      this.readYn = false
      if (userDo !== undefined && userDo !== null && userDo !== '') {
        for (var i = 0; i < userDo.length; i++) {
          if (userDo[i].doType === 'LI') {
            userDoList[1].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'ST') {
            userDoList[0].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'RE') {
            this.readYn = true
          }
        }
      }
      return userDoList
    },
    async changeAct (act, contentsKey) {
      var result = null
      var saveYn = true
      // this.pushDetail = JSON.parse(this.detailVal).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = contentsKey
      if (param.targetKey === null) { return }
      param.doType = act.doType
      if (saveYn === false) {
        param.doKey = act.doKey
        result = await this.$saveUserDo(param, 'delete')
      } else {
        param.actYn = true
        param.targetKind = 'C'
        result = await this.$saveUserDo(param, 'save')
      }
      if (result === true) {
        await this.$emit('refresh')
      }
    },
    async loadMore () {
      this.$emit('moreList', 10)
      /* const newArr = [
        ...this.commonListData,
        ...resultList.content
      ]
      this.commonListData = newArr */
    },
    setBodyLength (str) {
      // eslint-disable-next-line no-undef
      str = Base64.decode(str)
      // str = atob(str)
      if (str.length > 130) {
        str.substring(0, 130)
        str = str + '...'
      }
      return str
    }
  },
  data: function () {
    return { // 데이터 정의
      mainYn: false,
      chanWrap: null,
      contentsList: {},
      currentScroll: 0
    }
  },
  props: {
    clickEvnt: {},
    alimListYn: Boolean,
    mainYnProp: Boolean,
    commonListData: {},
    tempAlimList: {
      readYn: false,
      stickerList: [
        { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#ffc1075e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '온라인 쇼핑몰', stickerKey: '1', stickerColor: '#0dcaf05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
        { stickerName: '공연 및 예술', stickerKey: '2', stickerColor: '#0d61f05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' }
      ]
    }
  },
  computed: {
  }
}
</script>
<style scoped>
.commonListTr, .commonListTr td, .commonListTr th {height: 4rem; }
.listHeader {text-align: center;}
.listBodyRow{width: calc(100% - 60px);}
.commonListWrap{overflow-y: scroll; width: 100%; overflow-x: hidden; height: calc(100% - 200px);}

.pushDetailWrap{height: fit-content;}
.pushDetailTopArea{height: 3.0rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 30px;height: 30px; margin-right: 1px;}
.pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.1rem;}

.alimCheckContents{width: 100%;float: right; height: 20px;}
.alimCheckContents > img {margin-top: 3px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}
.chanLogoImgWrap {width: 40px; float: left; display: flex; align-items: center; justify-content: center; height: 40px; border-radius: 40px; margin-right: 0.5rem; border: 2px solid #ccc;}
.pushMbox{margin-bottom: 20px;}
.userDoWrap img {width: 1rem;}

.commonListContentBox{
    position: relative;
    width: calc(100% - 1rem);
    margin: 0.5rem 0.5rem;
    float: left;
    border-radius: 0.8rem;
    background-color: #ffffff;
    color: #363c5f;
    padding: 0.8rem 1rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 7px 3px #b7b4b440;;
    }
</style>
