<template>
    <div style="float: left">
        <div style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: #00000026; z-index: 99999;"></div>
        <div style="width: 80%; min-height: 500px; max-height: 700px; border-radius: 0.8rem; height: 60%; position: fixed; background: #FFF; z-index: 999999; top: 18%; left: 10%;">
            <div style="width: 100%; padding: 8px 20px; height: 40px; float: left;" class="headerShadow">
                <p class="font18 fontBold textLeft">제시글 지정</p>
            </div>
            <div style="width: 100%; padding: 10px 20px; height: calc(100% - 80px); float: left">
                <!-- <gActiveBar ref="activeBar" :tabList="this.activeTabList" class="fl" @changeTab= "changeTab"  style=" width:calc(100%); padding-top: 0!important"/> -->
                <!-- <select style="width: 100%; height: 30px;margin-bottom: 10px;float: left;">
                    <option hidden value="">선택안함</option>
                    <option value=""></option>
                    <option value="">선택안함</option>
                    <option value="">선택안함</option>
                </select> -->
                <div style="width: 100%; height: calc(100% - 40px); float: left;">
                    <div style="width: 100%; height: 35px; float: left; position: relative;">
                        <p class="font16 fontBold commonColor textLeft" style="margin-top: 7px;">작성하기</p>
                        <gBtnSmall @click="openSampleListPop" btnTitle="템플릿 불러오기" style="position: absolute; right: 5px; top: 0px; "/>
                    </div>
                    <div style="width: 100%; height: calc(100% - 50px); padding: 5px 10px; float: left; border: 1px solid #ccc;">
                        <div ref="guideInputArea" id="guideInputArea" class="font15" style="width: 100%; overflow: hidden scroll; height: 100%; text-align: left;" :contenteditable="true"></div>
                    </div>
                </div>
            </div>
            <div style="width: 100%; padding: 0 20px; height: 40px; float: left;">
                <gBtnSmall @click="closeXPop" btnThema="light" btnTitle="취소" />
                <gBtnSmall btnTitle="선택" class="mright-05" />
            </div>
        </div>
        <selectSamplePop @okSelectSample="okSelectSample" @closeXPop="closeSamplePop" v-if="samplePopShowYn"/>
    </div>
</template>
<script>
import selectSamplePop from './D_selectSampleContentsPop.vue'
export default {
  data () {
    return {
      samplePopShowYn: false
    }
  },
  components: {
    selectSamplePop
  },
  created () {
    this.getGuidList()
  },
  methods: {
    okSelectSample (selectedObj) {
      var guideInput = this.$refs.guideInputArea
      guideInput.innerHTML = selectedObj.bodyFullStr
      this.closeSamplePop()
    },
    openSampleListPop () {
      this.samplePopShowYn = true
    },
    closeSamplePop () {
      this.samplePopShowYn = false
    },
    closeXPop () {
      this.$emit('closeXPop')
    },
    async getGuidList (teamKey, userKey, showProfileYn, managerYn) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'GUIDE_'
      // paramMap.set('followerType', 'M')
      // eslint-disable-next-line no-unused-vars
      var result = await this.$commonAxiosFunction({
        url: 'https://mo.d-alim.com/service/tp.getSampleList',
        sample: param
      })
      // eslint-disable-next-line no-debugger
      debugger
    }
  }
}
</script>

<style scoped>

</style>
