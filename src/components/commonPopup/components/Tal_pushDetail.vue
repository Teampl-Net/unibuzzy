<template>
  <div class="pushDetailWrap">
    <!-- <manageStickerPop :targetKey="this.alimDetail.contentsKey" :stickerList="userDoStickerList" v-if="this.manageStickerPopShowYn" @closePop="this.manageStickerPopShowYn = false"/> -->
    <div class="pagePaddingWrap root mtop-1 overflowYScroll">

      <div class="content pushMbox" v-for="(alim, index) in alimDetail" :key="index">
        <div class="pushDetailTopArea">
          <div v-if="alim.logoPathMtext" @click="goChanDetail(alim)" class="chanLogoImgWrap fl" style="width:40px; height:40px; margin-right: 0.5rem"><img alt="채널 프로필이미지" style="width:80%" :src="alim.logoPathMtext"></div>
          <!-- <div class="chanLogoImgWrap" style="width: 40px; float: left; display: flex; align-items: center; justify-content: center; height: 40px; border-radius: 40px; margin-right: 0.5rem; border: 2px solid #ccc;"> -->
            <!-- <img v-if="alim.logoPathMtext" class="fl cursorP pushDetailChanLogo" @click="goChanDetail(alim.creTeamKey, alim.nameMtext)" :src="alim.logoPathMtext"> -->

          <img v-else @click="goChanDetail(alim)" class="fl mr-04 cursorP pushDetailChanLogo" src="../../../assets/images/channel/tempChanImg.png">

          <!-- </div> -->
          <div class="pushDetailHeaderTextArea">
        <label for="dateAll" class="font12 fr lightGray" @click="dateClick">시간 자세히</label><input type="checkbox" style="width:12px;height:12px; margin-top:2px; " id="dateAll" class="fr mright-02" v-model="dateCheck">
         <p class=" font18 fontBold commonColor" style="margin-bottom: 0.1rem; word-break: break-all;">{{resizeText(alim.title)}}</p>
          <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
            <p class="font12 fl lightGray" >{{this.changeText(alim.nameMtext)}}</p>
            <p class="font12 fl lightGray" v-if="alim.showCreNameYn">{{' (' + this.changeText(alim.creUserName) + ')'}}</p>

            <p class="font12 fr mleft-05 lightGray">{{dateText}}</p>

            <p class="fr" v-if="alim.rUserCount === 1">한명에게</p>
            <p class="fr" v-else-if="alim.rUserCount > 1">여러명에게</p>
            <p v-else class="fr">전체에게</p>
            <!-- <p class="font12 fr mright-05 lightGray">{{this.$changeDateFormat(alim.creDate,dateClickYn)}}</p> -->

          </div>
        </div>
        <div id="bodyArea" class="font15 mbottom-2" style="word-break: break-all;" v-html="decodeContents(alim.bodyFullStr)"></div>

        <div id="alimCheckArea">
          <div class="alimCheckContents">
            <!-- <img class="fl" src="../../../assets/images/push/attatchStickerIcon.svg" alt=""  @click="this.manageStickerPopShowYn = true">
            <div class="pushDetailStickerWrap">
              <div  v-longclick="() => changeStickerEditMode()" class="stickerDiv" :style="'background-color:' + value.picBgPath" v-for="(value, index) in this.userDoStickerList " :key="index" >
                <span class="font15">{{value.stickerName}}</span>
                <img :src="value.picPath" alt="">
              </div>
            </div> -->
            <gBtnSmall v-if="alim.canReplyYn && !this.creatorYn " btnTitle="답장하기" @click="alimReply"/>
            <!-- <gBtnSmall v-if="setParentContents(alim)" btnTitle="이전알림 보기" @click="ㅅㄷㄴㅅ"/> -->
            <div @click="changeAct(userDo, alim.contentsKey)" class="fl mright-05" v-for="(userDo, index) in this.userDoList" :key="index">

              <template v-if="userDo.doType === 'ST'">
                <img class="fl" v-if="userDo.doKey > 0" src="../../../assets/images/common/colorStarIcon.svg" alt="">
                <img class="fl" v-else src="../../../assets/images/common/starIcon.svg" alt="">
              </template>
              <template v-else-if="userDo.doType === 'LI'">
                <img class="mright-05 fl" style="margin-top: 4px;" v-if="userDo.doKey > 0" src="../../../assets/images/common/likeIcon.svg" alt="">
                <img class="mright-05 fl" style="margin-top: 5px;" v-else src="../../../assets/images/common/light_likeIcon.svg" alt="">
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
    </div>
  </div>
</template>
<script>
/* eslint-disable */
/* import manageStickerPop from '../../popup/Tal_manageStickerPop.vue' */
export default {
  data () {
    return {
      creatorYn: false,
      alimDetail: {},
      /* manageStickerPopShowYn: false, */
      userDoList: [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }],
      userDoStickerList: [],
      parentContentsKey: null,
      // dateClickYn:false
      dateCheck: true,
      dateText: '11'

    }
  },
  watch: {
    dateCheck () {
      this.datechange()
    }
  },

  props: {
    detailVal: {}
  },
  components: {
    /* manageStickerPop */
  },
  async created () {
    console.log(this.alimDetail)
    this.$emit('openLoading')
    await this.getContentsList()
    this.checkCreator()

    /* if (this.alimDetail) {} else {
      this.alimDetail = {
        teamName: '',
        creDate: '0',
        bodyFullStr: '오류입니다.'
      }
    } */
    console.log(this.alimDetail)
    this.datechange()
  },
  mounted () {
    this.changeMode()
    /*
    var test = this.$store.state.historyStack
    test.push(0)
    this.$store.commit('updateStack', test)
    */
  },
  unmounted () {
    /* if (this.$historyStack) {
      for (var i = 0; i < this.$historyStack.length; i++) {
        if (this.$historyStack[i] === 'detail') {
          this.$historyStack.splice(i, 1)
        }
      }
    } */
  },
  computed: {
    historyStack () {
      return this.$store.state.historyStack
    }
  },
  methods: {
    //  dateCheck () {
    //       if(dateCheck){
    //         this.dateText = this.$changeDateFormat(this.alimDetail[0].creDate, true)
    //       }else{
    //         alert(false)
    //         this.dateText = this.$changeDateFormat(this.alimDetail[0].creDate, false)
    //       }
    //     }
    datechange () {
      this.dateText = this.$changeDateFormat(this.alimDetail[0].creDate, this.dateCheck)
    },
    setParentContents (data) {
      if (data.parentContentsKey) {
        return true
      } else {
        return false
      }
    },
    resizeText (text) {
      if (!text) {
        text = '[' + this.$changeText(this.alimDetail[0].nameMtext) + '] 제목없는 알림'
      }
      return text
    },
    checkCreator () {
      var userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      // var userKey = 1
      if (userKey === this.alimDetail[0].creUserKey) {
        this.creatorYn = true
      }
    },
    changeMode () {
      var formList = document.querySelectorAll('#bodyArea .formCard')
      // eslint-disable-next-line no-debugger
      // debugger
      for (var i = 0; i < formList.length; i++) {
        formList[i].contentEditable = false
      }
    },
    alimReply () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetKey = this.detailVal.value.creTeamKey
      params.creUserName = this.alimDetail[0].creUserName
      params.creUserKey = this.alimDetail[0].creUserKey
      // params.targetContentsKey = this.alimDetail[0].contentsKey
      params.replyPopYn = true
      params.targetType = 'writePush'
      params.targetNameMtext = this.detailVal.value.nameMtext
      params.contentsKey = this.detailVal.contentsKey
      this.$emit('openPop', params)
    },
    decodeContents (data) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      // eslint-disable-next-line no-debugger
      return changeText
    },
    async getContentsList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // param.baseContentsKey = this.detailVal.targetKey
      if (this.detailVal) {
        param.contentsKey = this.detailVal.targetKey || this.detailVal.targetKey
      }
      if (!param.contentsKey) {
        if (this.detailVal.value) {
          param.contentsKey = this.detailVal.value.contentsKey || this.detailVal.value.targetKey
        }
      }
      param.jobkindId = 'ALIM'
      var resultList = await this.$getContentsList(param)
      this.alimDetail = resultList.content
      // eslint-disable-next-line no-debugger
      if (resultList.content[0].userDoList) {
        var userDoList = resultList.content[0].userDoList
        await this.settingUserDo(userDoList)
        
      }
      // console.log(this.alimDetail)
      this.$emit('closeLoading')
    },
    settingUserDo (userDo) {
      this.userDoList = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }]
      // var userDoList = { LI: { doKey: 0 }, ST: { doKey: 0 } }
      this.readYn = false
      if (userDo !== undefined && userDo !== null && userDo !== '') {
        // eslint-disable-next-line no-array-constructor
        this.userDoStickerList = new Array()
        for (var i = 0; i < userDo.length; i++) {
          if (userDo[i].doType === 'LI') {
            this.userDoList[1].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'ST') {
            this.userDoList[0].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'RE') {
            this.readYn = true
          }
          if (userDo[i].doType === 'SK') {
            this.userDoStickerList.push(userDo[i].sticker)
          }
        }
      }
    },
    async changeAct (act, inputContentsKey) {
      var result = null
      var saveYn = true
      // this.pushDetail = JSON.parse(this.detailVal).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = inputContentsKey
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
        var resultList = await this.$getContentsList({ contentsKey: inputContentsKey })
        console.log(resultList)
        var userDoList = resultList.content[0].userDoList
        await this.settingUserDo(userDoList)

        // this.$emit('reloadParent')
      }
    },
    goChanDetail (alim) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      // eslint-disable-next-line no-new-object
      var value = new Object()
      params.targetType = 'chanDetail'
      params.targetKey = alim.creTeamKey
      value.nameMtext = alim.nameMtext
      params.value = value
      // params.chanName = value.chanName
      // params.value = value
      this.$emit('openPop', params)

      // this.$router.replace({ name: 'subsDetail', params: { chanKey: idx } })
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      return changeTxt
      // if (changeTxt !== undefined) { return changeTxt }
    }
  }
}
</script>
<style scoped>
.pagePaddingWrap {
    padding: 60px 1.5rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 0;
}
.pushDetailWrap{height: fit-content;}
.pushDetailTopArea{ margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 50px;height: 50px;}
.pushDetailHeaderTextArea{width: calc(100% - 50px); cursor: pointer; float: left;margin-top: 0.2rem; margin-bottom: 0.2rem;}

#alimCheckArea{min-height: 35px;}
.alimCheckContents{width: 100%;float: left; height: 30px;}
.alimCheckContents > img {margin-top: 3px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}

.pushMbox{margin-bottom: 20px;}

  .content {
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

  .content ::after {
      content: '';
      position: absolute;
      display: block;
      width: 30px;
      height: 30px;
      background-color: #e1e1f2;
      bottom: 0;
      right: 0;
  }
  #dateAll{
    /* accent-color:#6768A7; */
    accent-color:#ccc;
  }

</style>
