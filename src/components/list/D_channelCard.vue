<i18n>
  {
    "ko": {
      "SEAR_TAB_ACT_CAHNNEL": "최근활동"
    },
    "en": {
      "SEAR_TAB_ACT_CAHNNEL": "Recent"
    }
  }
  </i18n>
  <template>
      <div class="w100P pSide-1" style="min-height:80px; border-bottom:1px solid #cccccc70; display: flex; flex-direction: row; align-items: center; padding-top: 15px; padding-bottom: 15px;" @click="goChannelMain(chanElement)">
          <div v-if="chanElement" style="background-color: white; position: relative; border: 0.5px solid rgba(0, 0, 0, 0.1); width: 60px; height: 60px; float: left; border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;"
          :style="'background-image: url(' + (chanElement.logoDomainPath !== undefind ? chanElement.logoDomainPath + chanElement.logoPathMtext : chanElement.logoPathMtext) + ');'" >
              <div v-if="chanElement.ownerYn || chanElement.managerKey" class="CWhiteBgColor" style="position: absolute; right: 0; display: flex; justify-content: center; algin-items: center; padding: 2px; bottom: 0; width: 20px; height: 20px; border-radius: 100%;">
                  <img src="../../assets/images/channel/ownerChannel_crown.svg" style="width: 90%; float: left;" v-if="chanElement.ownerYn" alt="">
                  <img src="../../assets/images/common/icon_setting_gear.svg" style="width: 90%; float: left;" v-else alt="">
              </div>
          </div>
          <div class="fl mleft-1" style="width: calc(100% - 65px - 1rem);">
              <div class="w100P fl font16 fontBold textLeft grayBlack "><img class="fl img-w14 mtop-02 mright-02" v-if="chanElement.officialYn" src="../../assets/images/main/main_officialMark.svg" alt="">{{$changeText(chanElement.nameMtext)}}
                  <p class="fr font13 lightGray" style="font-weight: normal;">{{$t("SEAR_TAB_ACT_CAHNNEL") + " " + $changeDateFormat(chanElement.updDate !== undefind? chanElement.updDate:chanElement.teamUpdDate)}}</p>
              </div>

              <p class="w100P fl font14 textLeft grayBlack">{{$changeText(chanElement.memoMtext)}}</p>
              <div class="w100P fl font14 textLeft lightGray">
                  <p class="fl font14">{{$changeText(chanElement.cateItemMtext)}}</p>
                  <img src="../../assets/images/editChan/icon_user_Gray.svg" class="img-w15 mright-01 fl mleft-03 mtop-01" alt="">
                  <p class="fl font14 " style="margin-top: 1px;">{{chanElement.followerCount !== undefind? chanElement.followerCount:chanElement.fCount}}</p>
              </div>
          </div>
      </div>
  </template>

<script>
export default {
  props: {
    chanElement: {}
  },
  created () {
  },
  methods: {
    goChannelMain (chanElement) {
      console.log('12341234chanElement')
      console.log(chanElement)
      var openPopParam = {}
      openPopParam.targetKey = chanElement.teamKey
      if (!openPopParam.targetKey) {
        openPopParam.targetKey = chanElement.targetKey
      }
      openPopParam.targetType = 'chanDetail'
      this.$emit('openPop', openPopParam)
    }
  }
}
</script>

  <style>
  .chanLogoImgWrap {width: 40px; height:40px; padding: 5px; border-radius: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid #ccc; position: relative; flex-shrink: 0}
  </style>
