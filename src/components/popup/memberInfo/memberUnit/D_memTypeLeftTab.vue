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
  <div class="leftTabBase fl">
    <div class="w100P pSide-1 leftTabTitleArea">
      <div class="fl leftTabDivideLine" > </div>
      <p class="fl textLeft font16 commonColor fontBold">{{ $t('MEM_DETAIL_TITLE_LIST') }}</p>
      <gBtnSmall class="leftTabAddBtn" :btnTitle="$t('COMMON_BTN_ADD')" @click="addInputPopYn = true"/>
      <!-- <p class=' fr font16 commonBlack textRight' style="" @click='closePop' >{{tempBackImg}}</p> -->
      <!-- <div class="fr textLeft font12 commonBlack tempLeftTabBtn fontBold" style="margin-top: 3px; margin-right: 10px;" @click="closePop">{{tempBackImg}}</div> -->
    </div>
    <div class="fl w100P leftTabListWrap">
      <div v-for="(list, index) in mMemberTypeList" :key="index" class="fl w100P">
        <cLeftTab :propData="list" @cardEmit='cardEmit' :compoIdx='index' />
      </div>
      <div v-if="addInputPopYn === true" @click='addInputPopYn = false' class="addInputBg"></div>
      <gInputPop v-if="addInputPopYn === true" class="inputPop" :title="$t('MEM_DETAIL_TITLE_ADDMEM')" type='one' @save='addMemberType' @goNo='addInputPopYn = false' />
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
    },
    addMemberType (data) {
      this.$emit('addMemberType', data)
      this.addInputPopYn = false
    },
    cardEmit (param) {
      var type = param.targetType
      var data = param.data
      var idx = param.index
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
<style scoped>
.leftTabBase {
  width:130px ;
  max-width: 500px;
  /* position: absolute; z-index: 999; */
  height: 100%;
  top: 50px;
  left: 0;
  background:#fff;
  border-right: 1px solid #ccc;
  background: #eeeeee50;
  /* animation: showUp ;
  animation-duration:2s;
  animation-iteration-count:3;
  animation-timing-function:ease-in; */
}
.leftTabTitleArea {
  position: relative;
  border-bottom: 1px solid #ccc;
  min-height: 30px;
  padding: 0 10px;
  height: 40px;
  padding-right: 0;
  padding-top: 0.5rem;
}
.leftTabDivideLine {
  width: 2.5px;
  height: 15px;
  background: #5F61BD;
  margin-top: 3px;
  margin-right: 4px;
}
.leftTabAddBtn {
  position: absolute;
  top: 7px;
  padding: 0 5px;
  right: 5px;
  height: 25px;
  line-height: 25px;
}
.leftTabListWrap {
  padding: 0 10px;
  padding-right: 0;
}
.leftTabListWrap > div:first-child {
  padding: 10px 0;
}
.addInputBg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 8;
  background: #00000030;
  left: 0;
  top: 0;
}
.inputPop {
  left: 60px;
  top: 25%;
  width: calc(100% - 120px);
  max-width: none;
  z-index: 9;
}
</style>
