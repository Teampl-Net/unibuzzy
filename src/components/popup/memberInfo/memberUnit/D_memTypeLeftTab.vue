<i18n>
{
  "ko": {
    "MEM_DETAIL_TITLE_LIST": "목록",
    "MEM_DETAIL_TITLE_ADDMEM": "멤버추가"
  },
  "en": {
    "MEM_DETAIL_TITLE_LIST": "List",
    "MEM_DETAIL_TITLE_ADDMEM": "Add a Member"
  }
}
</i18n>
<template>
  <div class="leftTabBase fl " style='background: #eeeeee50;' >
    <div class="w-100P pSide-1" style="position: relative;border-bottom:1px solid #ccc; min-height: 30px; padding: 0 10px; height: 40px; padding-right: 0; padding-top: 0.5rem;">
      <div style="width: 2.5px; height: 15px; background-color: #879dc9; margin-top: 3px; margin-right: 4px;" class="fl" > </div>
      <p class="fl textLeft font16 commonColor fontBold">{{ $t('MEM_DETAIL_TITLE_LIST') }}</p>
      <gBtnSmall :btnTitle="$t('COMMON_BTN_ADD')" @click="addInputPopYn = true" style="position: absolute; top: 7px; padding: 0 5px; right: 5px; height: 25px; line-height: 25px;"/>
      <!-- <p class=' fr font16 commonBlack textRight' style="" @click='closePop' >{{tempBackImg}}</p> -->
      <!-- <div class="fr textLeft font12 commonBlack tempLeftTabBtn fontBold" style="margin-top: 3px; margin-right: 10px;" @click="closePop">{{tempBackImg}}</div> -->
    </div>

    <div class="fl w-100P  " style="padding: 0 10px; padding-right: 0;">
      <div v-for="(list, index) in mMemberTypeList" :key="index" class="fl w-100P" style="padding: 10px 0;">
        <cLeftTab :propData="list" @cardEmit='cardEmit' :compoIdx='index' />
      </div>
      <div v-if="addInputPopYn === true" @click='addInputPopYn = false' style="width: 100%; height: 100%; position: absolute;z-index: 8; background: #00000030; left: 0; top: 0"></div>
      <gInputPop v-if="addInputPopYn === true" class="" style="left: 60px; top: 25%; width: calc(100% - 120px); max-width: none; z-index: 9; height:" :title="$t('MEM_DETAIL_TITLE_ADDMEM')" type='one' @save='addMemberType' @goNo='addInputPopYn = false' />
    </div>
  </div>
</template>
<script>
import cLeftTab from './cardUnit/D_cTabCard.vue'
export default {
  components: {
    cLeftTab
  },
  props: {
    propMemberTypeList: {}
  },
  created () {
    console.log(this.propMemberTypeList)
    this.readyFunc()
    // 추후 back버튼을 위해 history관리가 들어와야함
  },
  data () {
    return {
      mMemberTypeList: [],
      tempBackImg: '<<',
      leftShowYn: false,
      addInputPopYn: false
    }
  },
  watch: {
    propMemberTypeList: {
      handler (value, old) {
        if (!value) return
        this.mMemberTypeList = value
        console.log(this.mMemberTypeList)
      }
    }
  },
  updated () {
    this.mMemberTypeList = this.propMemberTypeList
  },
  methods: {
    readyFunc () {
      this.mMemberTypeList = this.propMemberTypeList
      this.changeTab(this.mMemberTypeList[0], 0)
      console.log(this.mMemberTypeList)
    },
    addMemberType (data) {
      console.log(data)
      this.$emit('addMemberType', data)
      this.addInputPopYn = false
    },
    cardEmit (param) {
      console.log(param)
      var type = param.targetType
      var data = param.data
      var idx = param.index
      console.log(data)
      if (type === 'click') {
        this.changeTab(data, idx)
      }
    },
    changeTab (data, idx) {
      if (idx === undefined || idx === null || idx === '') idx = 0
      for (let i = 0; i < this.mMemberTypeList.length; i++) {
        this.mMemberTypeList[i].selectedYn = false
        if (data.memberTypeKey === this.mMemberTypeList[i].memberTypeKey) {
          this.mMemberTypeList[i].selectedYn = true
        }
      }
      this.$emit('changeTab', data)
    },
    closePop () {
    // 추후 back버튼을 위해 history관리가 들어와야함
      this.$emit('closePop')
    }
  }
}
</script>
<style>
.leftTabBase{
  width:130px ;
  max-width: 500px;
  /* position: absolute; z-index: 999; */
  height: 100%;
  top: 50px;
  left: 0;
  background:#fff;
  border-right: 1px solid #ccc;
  /* animation: showUp ;
  animation-duration:2s;
  animation-iteration-count:3;
  animation-timing-function:ease-in; */
}
</style>
