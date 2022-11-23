<template>
    <div v-if="mMemberTypeDetail" class="fl wh-100P" :style="innerWidth" style="white-space:nowrap; display: inline; padding-top:1.5rem; min-width: var(--minwidth); position: relative; ">
      <div class="fl textLeft font12 commonDarkGray tempLeftTabBtn fontBold" style="margin-top: 3px;" @click="leftShowYn = true, leftanimaYn = true" v-show="leftShowYn === false">{{tempLeftImg}}</div>
      <p class="fl font18 fontBold textLeft commonDarkGray mleft-05 ">{{mMemberTypeDetail.mFormTitle}}</p>

      <templine class="fl" style="border-bottom:1px solid #ccc; width:100%; height:1px;" />

      <div class="fl mtop-1" :key="reloadKey" style="padding: 0 10px">
        <label class='fl font16 commonColor fontBold' :for="certiYn">실명인증</label>
        <gToggle class="fl mleft-1" style="scale: 1.2;" id="certiYn" :toggleId='this.$changeText(mMemberTypeDetail.nameMtext)' @changeToggle='mMemberTypeDetail.certiYn = !mMemberTypeDetail.certiYn' :isChecked="mMemberTypeDetail.certiYn" />
        <p class="fl w-100P font14 commonColor textLeft">(성명, 전화번호)</p>
        <!-- propMemberTypeDetail -->
        <mTypeQueList :propMemberTypeObj="mMemberTypeDetail" @addQuestion="this.$emit('addQuestion')" @editQue="editQue" class="mtop-1" />
      </div>

      <div class="w-100P" style="position: absolute; left:0; bottom:0; min-height:50px; display: flex; align-items: center; justify-content: center; border-top: 1px solid #ccc;">
        <gBtnSmall :btnTitle="'저장'" @click="save" class="mright-05" style=""/>
        <gBtnSmall :btnTitle="'닫기'" @click="closeXPop" class="mleft-05" style=""/>
      </div>
    </div>
</template>
<script>
import mTypeQueList from './memberUnit/D_mTypeQueList.vue'
export default {
  components: {
    mTypeQueList
  },
  props: {
    propMemberTypeDetail: {}
  },
  data () {
    return {
      mMemberTypeList: [],
      mMemberTypeDetail: {}
    }
  },
  created () {
    this.mMemberTypeDetail = this.propMemberTypeDetail
  },
  updated () {
    console.log(this.propMemberTypeDetail)
    this.mMemberTypeDetail = this.propMemberTypeDetail
  },
  methods: {
    editQue (memberTypeItemObj) {
      this.$emit('editQue', memberTypeItemObj)
    }
  }
}
</script>

<style scoped>

</style>
