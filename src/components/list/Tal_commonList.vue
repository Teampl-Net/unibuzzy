<template>
  <!-- <div id="chanWrap" class="commonListWrap"> -->
    <!-- <p style="position: fixed;">{{currentScroll}}</p> -->
    <!-- <div class="commonListContentBox pushMbox" v-for="(alim, index) in this.contentsList" :key="index"> -->
      <div style="width: 100%; height: 100%;" id="ttttt">
        <div v-if="this.contentsList.length === 0" style="width: 100%; height: 100%;">
          <!-- pushList.vue 에서 introPushPageTab() 참고 -->
          <img :src="this.imgUrl" style="float: left;" />
        </div>

        <template v-else v-for="(alim, index) in this.contentsList" :key="index" >
          <div v-if="alim.bodyFullStr" :class="this.commonListCreUserKey === alim.creUserKey ? 'creatorListContentBox': ''" class="commonListContentBox pushMbox" >
            <!-- <div v-if="alim.readYn === 0" class="readYnArea"></div> -->
              <div class="commonPushListTopArea">
                <div class="pushChanLogoImgWrap">
                  <img v-if="alimListYn" class="fl cursorP pushDetailChanLogo" style="" @click="goChanDetail(alim)" :src="alim.logoPathMtext">
                  <img v-else class="fl cursorP pushDetailChanLogo" @click="goChanDetail(alim)" :src="alim.logoPathMtext">
                </div>
                <div @click="goDetail(alim)" class="pushDetailHeaderTextArea ">
                  <img src="../../assets/images/board/readFalse.png" v-if="alim.readYn === 0" class="fl" style="width: 20px;" alt="">
                  <img src="../../assets/images/board/readTrue.svg" v-else class="fl" style="width: 20px;" alt="">
                  <p style="width:calc(100% - 30px ); " :class="{commonBlue: alim.readYn === 0}" class="mleft-05 font16 fl fontBold commonBlack textOverdot">{{resizeText(alim.title, alim.nameMtext)}}</p>
                  <!-- <img v-if="alim.readYn === 1" src="../../assets/images/push/readFalse.png" style="float: right; margin-left: 5px; width: 20px;" alt="">
                  <img v-else src="../../assets/images/push/readTrue.png" style="float: right; margin-left: 5px; width: 20px;" alt=""> -->
                  <div class=" w-100P fl">
                    <img src="../../assets/images/channel/icon_official2.svg" v-if="alim.officialYn" style="height: 21px; padding: 3px;" class="fl" alt="" />
                    <p style="width:75%;"  :style="alim.officialYn ? 'width:calc(75% - 30px)': '' " class="font14 fl grayBlack textOverdot">{{this.changeText(alim.nameMtext)}}{{alim.showCreNameYn === 1? '(' + this.$changeText(alim.creUserName) + ')': ''}}</p>
                    <p class="font14 fr lightGray">{{this.$changeDateFormat(alim.creDate)}}</p>
                  </div>
                </div>
              </div>
              <div @click="goDetail(alim)" class="font14 mbottom-05 bodyFullStr" v-html="setBodyLength(alim.bodyFullStr)"></div>
              <div id="alimCheckArea">
                <div class="alimCheckContents">
                  <!-- <p @click="goDetail(alim)" v-show="alim.bodyFullStr && alim.bodyFullStr.length > 130" class="font16 cursorP textRight mbottom-05" style="">더보기></p> -->
                  <p @click="alimBigView" v-show="alim.bodyFullStr && alim.bodyFullStr.length > 130" class="font16 cursorP textRight mbottom-05" style="">더보기></p>

                  <div @click="changeAct(userDo, alim.contentsKey)"  class="fl userDoWrap" v-for="(userDo, index) in settingUserDo(alim.userDoList)" :key="index">
                    <template v-if="userDo.doType === 'LI'">
                      <img class="fl" style="margin-top: 2px;width: 1.15rem" v-if="userDo.doKey > 0" src="../../assets/images/common/likeIcon.svg" alt="">
                      <img class="fl" style="margin-top: 3px;width: 1.15rem" v-else src="../../assets/images/common/light_likeIcon.svg" alt="">
                      <p class="fl font16 mleft-03">{{alim.likeCount}}</p>
                    </template>
                    <template v-else-if="userDo.doType === 'ST'">
                      <img class="mright-05 fl" style="width: 1.4rem" v-if="userDo.doKey > 0" src="../../assets/images/common/colorStarIcon.svg" alt="">
                      <img class="mright-05 fl" style="width: 1.4rem"  v-else src="../../assets/images/common/starIcon.svg" alt="">
                    </template>
                  </div>
                  <p class="fr font16 mleft-03">{{alim.memoCount}}</p>
                  <img style="width:20px;" class="fr" src="../../assets/images/common/icon_comment.svg" alt="">

                  <div data-clipboard-action="copy" id="copyTextBody" @click="copyText"
                      :data-clipboard-text="'https://thealim.page.link/?link=http://mo.d-alim.com:18080?pushDetail=' + alim.contentsKey
                        + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더편한구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'"
                        class="copyTextIcon mleft-05 fl" style="width:20px;" >
                    <img style="width:20px;" class=" fl" src="../../assets/images/common/icon_share_square.svg" alt="">
                  </div>

                </div>
              </div>
            <!-- <myObserver  v-if="index === (contentsList.length-6)" @triggerIntersected="loadMore" class="fl w-100P" style=""></myObserver> -->
            </div>
        </template>
        <myObserver @triggerIntersected="loadMore" class="fl w-100P" style=""></myObserver>
        <div class="w-100P fl mbottom-1 mtop-05" style="position: relative; width:100%; height: 40px;">
          <gLoadingS ref="sLoadingPush" class="fl"/>
        </div>
      </div>
      <gConfirmPop  :draggable="true" :confirmText='confirmText' confirmType='timeout' v-if="confirmPopShowYn" @no='confirmPopShowYn=false'  />
</template>
<script>
/* eslint-disable */
export default {
    data: function () {
    return { // 데이터 정의
      commonListCreUserKey: JSON.parse(localStorage.getItem('sessionUser')).userKey,
      mainYn: false,
      chanWrap: null,
      contentsList: [],
      currentScroll: 0,
      alimBigViewYn: false,
      confirmText: '',
      confirmPopShowYn: false
    }
  },
  components: {

  },
  created () {
    this.contentsList = this.commonListData
    console.log(this.contentsList)
  },
  watch: {
    commonListData() {
      this.contentsList = this.commonListData
      this.loadingRefHide()
      console.log(this.contentsList)
    },

  },
  mounted () {
  },
  methods: {
    alimBigView () {

    },
    async copyText () {
      // eslint-disable-next-line no-undef
      var clip = new ClipboardJS('#copyTextBody')
      var _this = this
      clip.on('success', function (e) {
        _this.confirmText = '알림링크가 복사되었습니다!'
        _this.confirmPopShowYn = true
      })
    },
    loadingRefShow(){
      // console.log('show');
      this.$refs.sLoadingPush.show()
    },
    loadingRefHide(){
      // console.log('hide');
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
      param.readYn = data.readYn
      // 세션에서 유저키 받아오기
      var userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      if (data.creUserKey === userKey) {
        param.ownerYn =  true
      }
      // console.log(param);
      this.$emit('goDetail', param)
    },
    goDetail (value) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'pushDetail'
      param.contentsKey = value.contentsKey
      if (value.officialYn) {
        param.officialYn = value.officialYn
      }
      param.value = value
      value.readYn = 1
      param.readYn = value.readYn
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
      param.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
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
    async loadMore() {
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
      stickerList: [ ]
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
.commonPushListTopArea{height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 30px; margin-right: 1px;}
.pushDetailChanLogo img {width: 100%;}
.pushDetailHeaderTextArea{width: calc(100% - 50px); cursor: pointer; float: left;margin-top: 0.1rem;}

.alimCheckContents{width: 100%;float: right; min-height: 20px;}
.alimCheckContents > img {margin-top: 3px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}
.pushChanLogoImgWrap {width: 40px; float: left; display: flex; align-items: center; justify-content: center; height: 40px; border-radius: 40px; margin-right: 0.5rem; border: 2px solid #ccc; position: relative;;}
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
