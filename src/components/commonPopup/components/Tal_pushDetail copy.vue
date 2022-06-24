
<template>
<div class="pushDetailWrap" style="height: fit-content;">
  <manageStickerPop :stickerList="tempAlimList.stickerList" v-if="this.manageStickerPopShowYn" @closePop="this.manageStickerPopShowYn = false"/>
  <!-- <div>{{pushKey}}</div> -->
  <div class="pagePaddingWrap root" style="height: fit-content;">
    <div class="content pushMbox">
      <div style="height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF">
        <img @click="goChanDetail" class="fl mr-04 cursorP" style="width: 50px;height: 50px; " src="../../../assets/images/channel/tempChanImg.png">
          <div style="width: calc(100% - 70px); cursor: pointer; float: left;margin-top: 0.2rem;">
            <p  @click="goChanDetail" class=" font18 fontBold commonColor">더알림대학교</p>
          <!-- <p class="font18 fontBold commonColor">{{this.$makeMtextMap(alimDetail.userDispMtext).get('KO').chanName}}</p> -->
            <p class="font12 lightGray">{{this.$changeDateFormat(this.alimDetail.creDate)}}</p>
          </div>
      </div>
      <div id="alimCheckArea" style="min-height: 35px; <!-- margin: 15px 0px;  -->; margin-bottom: 1rem;">
        <div style="width: 100%;float: right; height: 30px;">
          <img class="fl" style="margin-top: 3px;" @click="this.manageStickerPopShowYn = true" src="../../../assets/images/push/attatchStickerIcon.svg" alt="">
          <div style="max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;">
            <div  v-longclick="() => changeStickerEditMode()" class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in tempAlimList.stickerList " :key="index" style=" margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;">
              <!-- <span class="font15">{{value.stickerName}}</span> -->
              <img :src="value.stickerIcon" style="width: 20px; margin-right: 5px; float: left; " alt="">
            </div>
          </div>
          <img class="fr" style="margin-top: 3px;" v-if="tempAlimList.importantYn" src="../../../assets/images/common/colorStarIcon.svg" alt="">
          <img class="fr" style="margin-top: 3px;" v-else src="../../../assets/images/common/starIcon.svg" alt="">
          <img class="mright-05 fr" style="margin-top: 7px;" v-if="tempAlimList.likeYn" src="../../../assets/images/common/likeIcon.svg" alt="">
          <img class="mright-05 fr" style="margin-top: 3px;" v-else src="../../../assets/images/common/starIcon.svg" alt="">
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
      alimDetail: {},
      manageStickerPopShowYn: false,
      tempAlimList: {
        importantYn: false,
        likeYn: true,
        stickerList: [
          { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#ffc1075e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
          { stickerName: '온라인 쇼핑몰', stickerKey: '1', stickerColor: '#0dcaf05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
          { stickerName: '공연 및 예술', stickerKey: '2', stickerColor: '#0d61f05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' }
        ]
      }

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
        bodyFullStr: '오류입니다.'
      }
    } */
  },
  async mounted () {
    await this.getContentsList()
  },
  methods: {
    async getContentsList () {
      var paramMap = new Map()
      paramMap.set('contentsKey', this.detailVal.targetKey)
      // eslint-disable-next-line no-new-object
      var resultList = await this.$getContentsList(paramMap)
      this.alimDetail = resultList
    },
    goChanDetail (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetType = 'chanDetail'
      // params.targetKey = value.chanKey
      // params.chanName = value.chanName
      params.value = value
      this.$emit('openPop', params)

      // this.$router.replace({ name: 'subsDetail', params: { chanKey: idx } })
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
</style>
