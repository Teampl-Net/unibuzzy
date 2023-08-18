  <i18n>
{
  "ko": {
    "CHAN_LIST_NAME_TYPE": "유형",
    "CHAN_LIST_NAME_SORT": "정렬",
    "CHAN_BOTTOM_TITLE_CATE": "산업군을 선택해주세요.",
    "CHAN_BOTTOM_BTN_SELECT": "선택완료",
    "CHAN_BOTTOM_TAB_POPULAR": "인기",
    "CHAN_BOTTOM_TAB_RECENT": "최근활동순",
    "CHAN_BOTTOM_TITLE_SORT": "어떻게 정렬할까요?",
    "CHAN_BOTTOM_TITLE_TYPE": "유형을 선택해주세요.",
    "CHAN_BOTTOM_TAB_MANAGER": "관리자",
    "CHAN_BOTTOM_TAB_FOUNDER": "개설자"
  },
  "en": {
    "CHAN_LIST_NAME_TYPE": "Type",
    "CHAN_LIST_NAME_SORT": "Sort",
    "CHAN_BOTTOM_TITLE_CATE": "Please select a category.",
    "CHAN_BOTTOM_BTN_SELECT": "Select",
    "CHAN_BOTTOM_TAB_POPULAR": "Popular",
    "CHAN_BOTTOM_TAB_RECENT": "Recent",
    "CHAN_BOTTOM_TITLE_SORT": "How should we sort it?",
    "CHAN_BOTTOM_TITLE_TYPE": "Please select a type.",
    "CHAN_BOTTOM_TAB_MANAGER": "Manager",
    "CHAN_BOTTOM_TAB_FOUNDER": "Founder"
  }
}
</i18n>
<template>
    <div style="width: 100%; min-height: 250px; left:0; background: #FFF; border-radius: 25px 25px 0px 0px; display: flex; flex-direction: column;padding: 20px 20px; position: absolute; bottom: 0; z-index: 11;">
      <div style="position: relative; width: 100%; min-height: 40px; margin-bottom: 10px; float: left;">
        <p class="font20 fontBold textLeft">{{mBottSheetTitle}}</p>
        <img src="../../../../assets/images/common/grayXIcon.svg" @click="$emit('closePop')" style="width: 20px; position: absolute; right: 8px;top: 5px;" alt="">
      </div>

      <template v-if="propSelectSearchObj.searchType === $t('CHAN_LIST_NAME_SORT') || propSelectSearchObj.searchType === $t('CHAN_LIST_NAME_TYPE')">
        <div class="lightGray cursorP font16 fontBold mtop-05" style="width: 100%; height: 30px; padding: 0 5px; float: left;">
          <div v-for="(orderBy, index) in mOrderByList" @click="orderByClick(orderBy.dispName)" style="position: relative; float: left; width: 100%; min-height: 100%; padding: 10px 0;" :key="index" >
            <p class="font16 textLeft h100P " :class="this.mSelectedData === orderBy.dispName? 'commonLightColor' : 'commonGray'" >{{this.$changeText(orderBy.dispName)}}</p>
            <img src="../../../../assets/images/common/listSelectCheck.svg" style="position: absolute; right: 10px; top: 5px; " v-if="this.mSelectedData === orderBy.dispName" alt="">
          </div>
        </div>
      </template>

      <template v-if="propSelectSearchObj.searchType === $t('COMMON_NAME_CATEGORY') && mBusinessItemList.length > 0">
        <div class="fl w100P" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
          <div v-for="(business, index) in mBusinessItemList" :key="index" @click="businessClick($changeText(business.itemNameMtext))" :class="{'businessSelected' :this.mSelectedData === $changeText(business.itemNameMtext)}"  style="width:47%; border: 1px solid #ccc; padding: 10px 20px; border-radius: 8px; margin: 5px 0; position: relative; min-width:92px;">
            <img v-if="this.mSelectedData === $changeText(business.itemNameMtext)" src="../../../../assets/images/common/selectCheckIcon.svg" style="position: absolute; left: -15px; top: -10px;" alt="">
            <p class="fl font16 w100P textCenter fontBold" :class="this.mSelectedData === $changeText(business.itemNameMtext) ? 'commonLightColor' : 'commonGray'" >
              <img class="img-w20 mright-05" src="../../../../assets/images/bottom/icon_briefcase.svg" alt="" v-if="business.cateKey === 1">
              <img class="img-w20 mright-05" src="../../../../assets/images/bottom/icon_government.svg" alt="" v-if="business.cateKey === 2">
              <img class="img-w20 mright-05" src="../../../../assets/images/bottom/icon_pencil.svg" alt="" v-if="business.cateKey === 3">
              <img class="img-w20 mright-05" src="../../../../assets/images/bottom/icon_religion.svg" alt="" v-if="business.cateKey === 4">
              <img class="img-w20 mright-05" src="../../../../assets/images/bottom/icon_footBall.svg" alt="" v-if="business.cateKey === 5">
              <img class="img-w20 mright-05" src="../../../../assets/images/bottom/icon_inject.svg" alt="" v-if="business.cateKey === 6">
              <img class="img-w20 mright-05" src="../../../../assets/images/bottom/icon_tablet.svg" alt="" v-if="business.cateKey === 7">
              <img class="img-w20 mright-05" src="../../../../assets/images/bottom/icon_shopingbag.svg" alt="" v-if="business.cateKey === 8">
              <img class="img-w20 mright-05" src="../../../../assets/images/bottom/icon_haert.svg" alt="" v-if="business.cateKey === 9">
              <img class="img-w20 mright-05" src="../../../../assets/images/bottom/icon_team.svg" alt="" v-if="business.cateKey === 10">
              <!-- <img src="../../../../assets/images/bottom/icon_government.svg" alt="" v-if="business.cateKey === 11"> -->
              {{$changeText(business.itemNameMtext)}}
            </p>
          </div>
          <gBtnLarge v-if="mSelectedData !== ''" class="mtop-2 fontBold" @click="changeBusiness()" :btnTitle="$t('CHAN_BOTTOM_BTN_SELECT')" />
          <gBtnLarge  v-else style="background: #F4F4F4!important; color: #AAAAAA!important;" class="mtop-2 fontBold" :btnTitle="$t('CHAN_BOTTOM_TITLE_CATE')" />
        </div>
      </template>

    </div>
</template>

<script>
export default {
  props: {
    propSelectSearchObj: {},
    propBusinessItemList: {}
  },
  data () {
    return {
      mBottSheetTitle: '',

      mOrderByList: [{ dispName: this.$t('COMMON_TAB_ALL') }, { dispName: this.$t('CHAN_BOTTOM_TAB_POPULAR') }, { dispName: this.$t('CHAN_BOTTOM_TAB_RECENT') }],
      mSelectedData: '',

      mBusinessItemList: []
    }
  },
  created () {
    this.readyFunc()
  },
  methods: {
    emit (pramData) {
      this.$emit('bottSheetEmit', pramData)
    },
    orderByClick (dispName) {
      this.mSelectedData = dispName
      var pramData = {}
      pramData.targetType = 'changeOrderBy'
      if (this.propSelectSearchObj.searchType === this.$t('CHAN_LIST_NAME_TYPE')) {
        pramData.targetType = 'changeAdmin'
      }
      pramData.dispName = dispName
      this.emit(pramData)
    },
    businessClick (dispName) {
      this.mSelectedData = dispName
    },
    changeBusiness () {
      var pramData = {}
      pramData.targetType = 'changeBusiness'
      pramData.dispName = this.mSelectedData
      var find = this.mBusinessItemList.findIndex(item => this.$changeText(item.itemNameMtext) === this.mSelectedData)
      pramData.cateKey = find
      this.emit(pramData)
    },
    async readyFunc () {
      if (this.propSelectSearchObj.searchType === this.$t('CHAN_LIST_NAME_SORT')) {
        this.mBottSheetTitle = this.$t('CHAN_BOTTOM_TITLE_SORT')
        this.mSelectedData = this.propSelectSearchObj.dispName
        //
      } else if (this.propSelectSearchObj.searchType === this.$t('COMMON_NAME_CATEGORY')) {
        this.mBottSheetTitle = this.$t('CHAN_BOTTOM_TITLE_CATE')
        await this.getCateItemList()
        this.mSelectedData = this.propSelectSearchObj.dispName
        //
      } else if (this.propSelectSearchObj.searchType === this.$t('COMMON_NAME_TYPE')) {
        this.mBottSheetTitle = this.$t('CHAN_BOTTOM_TITLE_TYPE')
        this.mOrderByList = [{ dispName: this.$t('COMMON_TAB_ALL') }, { dispName: this.$t('CHAN_BOTTOM_TAB_FOUNDER') }, { dispName: this.$t('CHAN_BOTTOM_TAB_MANAGER') }]
        this.mSelectedData = this.propSelectSearchObj.dispName
      }
    },
    async getCateItemList () {
      if (!this.propBusinessItemList) {
        var cateItemList = await this.$commonAxiosFunction({
          url: 'https://www.unibuzzy.com/sUniB/tp.getCateItemList',
          param: { cateGroupKey: 2 }
        })
        this.mBusinessItemList = cateItemList.data.cateItemList
      } else {
        this.mBusinessItemList = JSON.parse(JSON.stringify(this.propBusinessItemList))
      }
      this.mBusinessItemList.unshift({ cateKey: 0, itemNameMtext: `KO$^$${this.$t('COMMON_TAB_ALL')}` })
    }
  }
}
</script>

<style>
.businessSelected{
  border: 3px solid #7678E2!important;
  color: #7678E2!important
}
</style>
