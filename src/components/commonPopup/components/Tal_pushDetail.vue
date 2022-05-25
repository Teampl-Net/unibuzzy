<template>
  <div v-if="loadYn" class="pushDetailWrap">
    <manageStickerPop :stickerList="userDoStickerList" v-if="this.manageStickerPopShowYn" @closePop="this.manageStickerPopShowYn = false"/>
    <!-- <div>{{pushKey}}</div> -->
    <div class="pagePaddingWrap root mtop-1 overflowYScroll">

      <div class="content pushMbox" v-for="(alim, index) in alimDetail" :key="index">
        <div class="pushDetailTopArea">
          <img @click="goChanDetail(alim)" class="fl mr-04 cursorP pushDetailChanLogo" src="../../../assets/images/channel/tempChanImg.png">
            <div class="pushDetailHeaderTextArea">
              <p class=" font18 fontBold commonColor">{{alim.title}}</p>
            <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
              <p class="font12 fl lightGray">{{this.changeText(alim.nameMtext)}}</p>
              <p class="font12 fr lightGray">{{this.$dayjs(alim.creDate).format('YYYY-MM-DD')}}</p>
            </div>
        </div>
        <div  class="font15 mbottom-2" v-html="alim.bodyMinStr"></div>

        <div id="alimCheckArea">
          <div class="alimCheckContents">
            <img class="fl" src="../../../assets/images/push/attatchStickerIcon.svg" alt=""  @click="this.manageStickerPopShowYn = true">
            <div class="pushDetailStickerWrap">
              <div  v-longclick="() => changeStickerEditMode()" class="stickerDiv" :style="'background-color:' + value.picBgPath" v-for="(value, index) in this.userDoStickerList " :key="index" >
                <!-- <span class="font15">{{value.stickerName}}</span> -->
                <img :src="value.picPath" alt="">
              </div>
            </div>

            <div @click="changeAct(userDo, alim.contentsKey)"  class="fr" v-for="(userDo, index) in this.userDoList" :key="index">
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

import manageStickerPop from '../../popup/Tal_manageStickerPop.vue'
export default {
  data () {
    return {
      loadYn: true,
      alimDetail: {},
      manageStickerPopShowYn: false,
      tempAlimList: {
        readYn: false,
        stickerList: [
          { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#ffc1075e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
          { stickerName: '온라인 쇼핑몰', stickerKey: '1', stickerColor: '#0dcaf05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
          { stickerName: '공연 및 예술', stickerKey: '2', stickerColor: '#0d61f05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' }
        ]
      },
      userDoList: [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }],
      userDoStickerList: []

    }
  },
  props: {
    detailVal: {}
  },
  components: {
    manageStickerPop
  },
  async created () {
    await this.getContentsList()
    /* if (this.alimDetail) {} else {
      this.alimDetail = {
        teamName: '',
        creDate: '0',
        bodyMinStr: '오류입니다.'
      }
    } */
  },
  methods: {
    async getContentsList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      // param.baseContentsKey = this.detailVal.targetKey
      param.contentsKey = this.detailVal.targetKey
      var resultList = await this.$getContentsList(param)
      this.alimDetail = resultList.content
      var userDoList = resultList.content[0].userDoList
      await this.settingUserDo(userDoList)
      // console.log(this.alimDetail)
      this.$emit('closeLoading')
    },
    settingUserDo (userDo) {
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
        await this.getContentsList()
        this.loadYn = false
        this.loadYn = true
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
.pushDetailTopArea{height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 50px;height: 50px;}
.pushDetailHeaderTextArea{width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.2rem;}

#alimCheckArea{min-height: 35px;}
.alimCheckContents{width: 100%;float: right; height: 30px;}
.alimCheckContents > img {margin-top: 3px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}

.pushMbox{margin-bottom: 20px;}
</style>
