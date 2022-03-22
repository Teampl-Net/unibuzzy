
<template>
<div class="pushDetailWrap" style="height: fit-content;">
  <manageStickerPop :stickerList="alimDetail.stickerList" v-if="this.manageStickerPopShowYn" @closePop="this.manageStickerPopShowYn = false"/>
  <!-- <div>{{pushKey}}</div> -->
  <div class="pagePaddingWrap root" style="height: fit-content;">
    <div class="content pushMbox">
      <div style="height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF">
        <img class="fl mr-04" style="width: 50px;height: 50px; " src="http://placehold.it/50">
        <div style="width: calc(100% - 70px); float: left;margin-top: 0.2rem;">
          <p class="font18 fontBold commonColor">{{alimDetail.chanName}}</p>
          <p class="font12 lightGray">{{alimDetail.pushDate}}</p>
        </div>
      </div>
      <div id="alimCheckArea" style="min-height: 35px; <!-- margin: 15px 0px;  -->; margin-bottom: 1rem;">
        <div style="width: 100%;float: right; height: 30px;">
          <img class="fl" style="margin-top: 3px;" @click="this.manageStickerPopShowYn = true" src="../../../assets/images/push/attatchStickerIcon.svg" alt="">
          <div style="max-width: calc(100vw - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;">
            <div  v-longclick="() => changeStickerEditMode()" class="stickerDiv" :style="'background-color:' + value.stickerColor" v-for="(value, index) in alimDetail.stickerList " :key="index" style=" margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;">
              <!-- <span class="font15">{{value.stickerName}}</span> -->
              <img :src="value.stickerIcon" style="width: 20px; margin-right: 5px; float: left; " alt="">
            </div>
          </div>
          <img class="fr" style="margin-top: 3px;" v-if="alimDetail.importantYn" src="../../../assets/images/common/colorStarIcon.svg" alt="">
          <img class="fr" style="margin-top: 3px;" v-else src="../../../assets/images/common/starIcon.svg" alt="">
          <img class="mright-05 fr" style="margin-top: 3px;" v-if="alimDetail.likeYn" src="../../../assets/images/common/colorStarIcon.svg" alt="">
          <img class="mright-05 fr" style="margin-top: 3px;" v-else src="../../../assets/images/common/starIcon.svg" alt="">
        </div>
      </div>
      <div style="" class="font15" v-html="alimDetail.pushMsg">
      </div>
      <div>
        <!-- <gBtnSmall class="mr-04 gBtnSmall addClick_popupClick.test()_addClick" btnTitle="상세보기" /> -->
        <gBtnSmall  @click="this.manageStickerPopShowYn = true" class="mr-04 gBtnSmall"  btnTitle="링크열기" />
      </div>
      <div>
      </div>
    </div>
  </div>
</div>

</template>
<script>

import manageStickerPop from '../../popup/Tal_manageStickerPop.vue'
export default {
  data () {
    return {
      alimDetail: {
        pushMsg: '아이디어스에서 구매하신 작품이 발송되었습니다.<br><br>많이 기다리셨죠? <br>[고급 터치형] 달무드등 보름달 크리스탈 수정구 작품의 배송이 시작되었습니다. ^-^',
        chanName: '아이디어스',
        pushDate: '2022년 1월 17일(월) 오후 8:25',
        importantYn: false,
        likeYn: true,
        stickerList: [
          { stickerName: '공연 및 예술', stickerKey: '0', stickerColor: '#ffc1075e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
          { stickerName: '온라인 쇼핑몰', stickerKey: '1', stickerColor: '#0dcaf05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' },
          { stickerName: '공연 및 예술', stickerKey: '2', stickerColor: '#0d61f05e', stickerIcon: '/resource/stickerIcon/sticker_robot.svg' }
        ]
      },
      manageStickerPopShowYn: false

    }
  },
  components: {
    manageStickerPop
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
