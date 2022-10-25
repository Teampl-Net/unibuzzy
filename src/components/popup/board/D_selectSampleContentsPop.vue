<template>
    <div style="float: left">
        <div @click="closeXPop" style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; background: #00000040; z-index: 9999999;"></div>
        <div style="width: 80%; min-height: 500px; max-height: 700px; border-radius: 0.8rem; height: 40%; position: fixed; background: #FFF; z-index: 99999999; top: 25%; left: 10%;">
            <div style="width: 100%; padding: 8px 20px; height: 40px; float: left;" class="headerShadow">
                <p class="font18 fontBold textLeft">제시글 템플릿 선택</p>
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
                        <p class="font16 fontBold commonColor textLeft" style="margin-top: 7px;">템플릿</p>
                        <!-- <gBtnSmall @click="openPreviewArea" btnTitle="미리보기" style="position: absolute; right: 5px; top: 0px; "/> -->
                    </div>
                    <div style="width: 100%; height: 100px; float: left;">
                        <div v-for="(value, index) in sampleList" @click="selectSample(value)" :key="index" style="float: left; width: 90px; height: 100px; display: flex; flex-direction: column; align-items: center;" >
                            <div :class="value.sampleKey === this.selectedSampleObj.sampleKey? 'selectedSample': ''" style="width: 80px; height: 80px; box-shadow: rgb(140 140 140 / 26%) 0px 0px 3px 1px; float: left; border-radius: 5px;">
                                <p class="font14 commonBlack" :style="value.sampleKey === this.selectedSampleObj.sampleKey? 'font-weight: bold;' : ''">{{this.$changeText(value.titleMtext)}}</p>
                            </div>
                        </div>
                    </div>
                    <div style="width: 100%; height: calc(100% - 170px); float: left ">
                        <p class="font16 fontBold commonColor textLeft" style="margin-top: 7px;">미리보기</p>
                        <div class="font14" v-html="this.selectedSampleObj.bodyFullStr" style="width: 100%; overflow: hidden scroll; text-align: left; height: 100%; float: left; border-radius: 0.8rem; box-shadow: rgb(140 140 140 / 10%) 0px 0px 10px 4px inset; padding: 10px 20px; ">
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 100%; padding: 0 20px; height: 40px; float: left;">
                <gBtnSmall @click="closeXPop" btnThema="light" btnTitle="취소" />
                <gBtnSmall @click="okSelectSample" btnTitle="선택" class="mright-05" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      sampleList: [],
      selectedSampleObj: { sampleKey: 0, bodyMinStr: '템플릿을 선택해주세요', bodyFullStr: '템플릿을 선택해주세요' },
      activeTabList: [{ display: '오류용', name: 'E' }, { display: '문의용', name: 'Q' }],
      previewShowYn: false
    }
  },
  created () {
    this.getGuidList()
  },
  methods: {
    okSelectSample () {
      this.$emit('okSelectSample', this.selectedSampleObj)
    },
    openPreviewArea () {
      this.previewShowYn = true
    },
    selectSample (obj) {
      this.selectedSampleObj = obj
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
        url: 'service//tp.getSampleList',
        param: { sample: param }
      })
      // eslint-disable-next-line no-debugger
      debugger
      console.log(result)
      if (result.data.result === true) {
        this.sampleList = result.data.sampleList
      }
    }
  }
}
</script>

<style scoped>
.selectedSample {background: ghostwhite}
</style>
