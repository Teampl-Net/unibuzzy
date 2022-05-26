
<template>
  <div style="overflow-y: scroll; overflow-x: hidden; height: calc(100% - 200px);">
    <div @click="goDetail(alim)" class="commonListContentBox pushMbox" v-for="(alim, index) in commonListData" :key="index">
        <div class="pushDetailTopArea">
          <img class="fl mr-04 cursorP pushDetailChanLogo" src="../../assets/images/channel/tempChanImg.png">
            <div class="pushDetailHeaderTextArea">
              <p class=" font15 fontBold commonBlack">{{alim.title}}</p>
            <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
              <p class="font12 fl lightGray">{{this.changeText(alim.nameMtext)}}</p>
              <p class="font12 fr lightGray">{{this.$dayjs(alim.creDate).format('YYYY-MM-DD')}}</p>
            </div>
        </div>
        <div  class="font14 mbottom-05" v-html="alim.bodyMinStr"></div>
        <div id="alimCheckArea">
          <div class="alimCheckContents">
            <!-- <div class="pushDetailStickerWrap">
              <div class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in tempAlimList.stickerList " :key="index" >
                <img :src="value.stickerIcon" alt="">
              </div>
            </div> -->
            <div @click="changeAct(userDo, alim.contentsKey)"  class="fr userDoWrap" v-for="(userDo, index) in settingUserDo(alim.userDoList)" :key="index">
              <template v-if="userDo.doType === 'ST'">
                <img class="fl" v-if="userDo.doKey > 0" src="../../assets/images/common/colorStarIcon.svg" alt="">
                <img class="fl" v-else src="../../assets/images/common/starIcon.svg" alt="">
              </template>
              <template v-else-if="userDo.doType === 'LI'">
                <img class="mright-05 fl" style="margin-top: 2px;" v-if="userDo.doKey > 0" src="../../assets/images/common/likeIcon.svg" alt="">
                <img class="mright-05 fl" style="margin-top: 3px;" v-else src="../../assets/images/common/light_likeIcon.svg" alt="">
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

      <myObserver @triggerIntersected="this.$emit('listMore')"  style="float: left;"/>



  </div>
</template>
<script>

export default {
  components: {

  },
  created () {
    // this.getContentsList()
  },
  mounted () {
    if (this.mainYnProp === true) { this.mainYn = true }
  },
  emits: ['goDetail'],
  methods: {

    goDetail (value) {
      this.$emit('goDetail', value)
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
    }
  },
  data: function () {
    return { // 데이터 정의
      mainYn: false
    }
  },
  props: {
    clickEvnt: {},
    mainYnProp: Boolean,
    commonListData: [],
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

.pushDetailWrap{height: fit-content;}
.pushDetailTopArea{height: 3.0rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 40px;height: 40px;}
.pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.1rem;}

.alimCheckContents{width: 100%;float: right; height: 20px;}
.alimCheckContents > img {margin-top: 3px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}

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
