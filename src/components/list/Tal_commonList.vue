<template>
  <!-- <div id="chanWrap" class="commonListWrap"> -->
    <!-- <p style="position: fixed;">{{currentScroll}}</p> -->
    <!-- <div class="commonListContentBox pushMbox" v-for="(alim, index) in this.contentsList" :key="index"> -->

      <div v-if="this.contentsList.length === 0" style="width: 100%; height: 100%;">
        <!-- pushList.vue 에서 introPushPageTab() 참고 -->
        <img :src="this.imgUrl" style="float: left;" />
      </div>

      <template v-else v-for="(alim, index) in this.contentsList" :key="index" >
        <div v-if="alim.bodyFullStr" :class="this.commonListCreUserKey === alim.creUserKey ? 'creatorListContentBox': ''" class="commonListContentBox pushMbox">
          <!-- <div v-if="alim.readYn === 0" style="background-color: #6768A7; border-radius: 100%; height: 12px; width: 12px; float: left; position: absolute; top: 0; left: 0; margin: -6px; box-shadow: 0 0 5px #6768A7;  "></div> -->
            <div @click="goDetail(alim)" class="pushDetailTopArea">
              <div class="chanLogoImgWrap">
                <img v-if="alimListYn" class="fl cursorP pushDetailChanLogo" @click="goChanDetail(alim)" :src="alim.logoPathMtext">
                <img v-else class="fl cursorP pushDetailChanLogo" @click="goChanDetail(alim)" :src="alim.logoPathMtext">
              </div>
              <div class="pushDetailHeaderTextArea"> <!-- 여기에 goDetail를 넣으면 알림리스트에서 로고 클릭시 반응 X / But 이벤트가 2번 발생은 하지 않음 -->
                <p style="width:100%; white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" class=" font16 fontBold commonBlack">{{resizeText(alim.title, alim.nameMtext)}}</p>
              <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
                <p class="font14 fl grayBlack">{{this.changeText(alim.nameMtext)}}{{alim.showCreNameYn === 1? '(' + this.$changeText(alim.creUserName) + ')': ''}}</p>
                <p class="font14 fr lightGray">{{this.$changeDateFormat(alim.creDate)}}</p>
              </div>
            </div>
            <div @click="goDetail(alim)" class="font14 mbottom-05 bodyFullStr" v-html="setBodyLength(alim.bodyFullStr)"></div>
            <div id="alimCheckArea">
              <div class="alimCheckContents">
                <!-- <div class="pushDetailStickerWrap">
                  <div class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in tempAlimList.stickerList " :key="index" >
                    <img :src="value.stickerIcon" alt="">
                  </div>
                </div> -->
                <p v-show="alim.bodyFullStr && alim.bodyFullStr.length > 130" class="font16 textRight mbottom-05" style="">더보기></p>
                <div @click="changeAct(userDo, alim.contentsKey)"  class="fl userDoWrap" v-for="(userDo, index) in settingUserDo(alim.userDoList)" :key="index">
                  <template v-if="userDo.doType === 'LI'">
                    <img class="fl" style="margin-top: 2px;width: 1.15rem" v-if="userDo.doKey > 0" src="../../assets/images/common/likeIcon.svg" alt="">
                    <img class="fl" style="margin-top: 3px;width: 1.15rem" v-else src="../../assets/images/common/light_likeIcon.svg" alt="">
                  </template>
                  <template v-else-if="userDo.doType === 'ST'">
                    <img class="mright-05 fl" style="width: 1.4rem" v-if="userDo.doKey > 0" src="../../assets/images/common/colorStarIcon.svg" alt="">
                    <img class="mright-05 fl" style="width: 1.4rem"  v-else src="../../assets/images/common/starIcon.svg" alt="">
                  </template>
                </div>
              </div>
            </div>
          <!-- <myObserver  v-if="index === (contentsList.length-6)" @triggerIntersected="loadMore" class="fl w-100P" style=""></myObserver> -->
          </div>
      </template>
      <myObserver  @triggerIntersected="loadMore" class="fl w-100P" style=""></myObserver>
      <div class="w-100P fl mtop-1" style="position: relative; width:100%; height:30px;">
            <gLoadingS ref="sLoadingPush" class="fl"/>
      </div>
      <!-- <myObserver @triggerIntersected="loadMore" class="fl w-100P" style=""></myObserver> -->
  <!-- </div> -->
</template>
<script>
/* eslint-disable */
export default {
    data: function () {
    return { // 데이터 정의
      commonListCreUserKey: JSON.parse(localStorage.getItem('sessionUser')).userKey,
      mainYn: false,
      chanWrap: null,
      contentsList: {},
      currentScroll: 0,
    }
  },
  components: {

  },
  created () {
    this.contentsList = this.commonListData
  },
  watch: {
    commonListData () {
      this.contentsList = this.commonListData
      this.loadingRefHide()
    },

  },
  mounted () {

  },
  // updated () {
  //   this.chanWrap.scrollTop = this.currentScroll
  // },
  // mounted () {
  //   this.chanWrap = document.getElementById('chanWrap')
  //   this.chanWrap.addEventListener('scroll', this.saveScroll)
  //   if (this.mainYnProp === true) { this.mainYn = true }
  //   var imgList = document.querySelectorAll('.bodyFullStr img')
  //   for (var i = 0; i < imgList.length; i++) {
  //     imgList[i].setAttribute('style', 'display: none')
  //   }
  // },
  // unmounted () {
  //   this.chanWrap.removeEventListener('scroll', this.saveScroll)
  // },
  /* emits: ['goDetail'], */
  methods: {
    loadingRefShow(){
      console.log('show');
      this.$refs.sLoadingPush.show()
    },
    loadingRefHide(){
      console.log('hide');
      this.$refs.sLoadingPush.hide()
    },
    resizeText (text, name) {
      if (text) {
        // if (text.length > 15) {
        //   text = text.substr(0, 15)
        //   text += '...'
        // }
      } else {
        text = '[' + this.$changeText(name) + '] 제목없는 알림'
      }
      return text
    },
    saveScroll () {
      this.currentScroll = this.chanWrap.scrollTop
      this.$emit('currentScroll', this.currentScroll)
    },
    goChanDetail (data) {
      // eslint-disable-next-line no-new-object
      // console.log(data)

      var param = new Object()
      param.targetType = 'chanDetail'
      param.teamKey = data.creTeamKey
      param.targetKey = data.creTeamKey
      param.nameMtext = data.nameMtext
      param.chanName = data.nameMtext

      // 세션에서 유저키 받아오기

      var userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      if (data.creUserKey === userKey) {
        param.ownerYn =  true
      }
      // console.log(param);
      this.$emit('goDetail', param)
    },
    // creatorBox (value) {
    //   // eslint-disable-next-line no-new-object
    //   var param = new Object()
    //   param.targetType = 'pushDetail'
    //   param.contentsKey = value.contentsKey
    //   param.value = value

    //   var userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
    //   // var userKey = 1
    //   if (userKey === value.creUserKey) {
    //     this.creatorYn = true
    //   } else {
    //     this.creatorYn = false
    //   }
    // },
    goDetail (value) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'pushDetail'
      param.contentsKey = value.contentsKey
      param.value = value
      this.$emit('goDetail', param)
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
      this.loadingRefShow()
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
      str.replace('contenteditable= true', '')
      if (str.length > 130) {
        str.substring(0, 130)
      }
      return str
    }
  },
  props: {
    imgUrl: {},
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
.bodyFullStr {
  max-height: 400px;
  overflow: hidden;
}
.commonListTr, .commonListTr td, .commonListTr th {height: 4rem; }
.listHeader {text-align: center;}
.listBodyRow{width: calc(100% - 60px);}
.commonListWrap{overflow-y: scroll; width: 100%; overflow-x: hidden; height: 100%;}

.pushDetailWrap{height: fit-content;}
.pushDetailTopArea{height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 30px; margin-right: 1px;}
.pushDetailHeaderTextArea{width: calc(100% - 50px); cursor: pointer; float: left;margin-top: 0.1rem;}

.alimCheckContents{width: 100%;float: right; min-height: 20px;}
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
    box-shadow: 0 0 7px 3px #b7b4b440;

    animation-name: fadein;
    animation-duration: 0.3s;
    /* animation-timing-function: linear; */
    /* animation-delay: 0.5s; */

    }
.creatorListContentBox{
    background-color: #6768a712 !important;
    box-shadow: 0 0 7px 3px #6768a740 !important;
    }

</style>
