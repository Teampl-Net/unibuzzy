<template>
    <div v-if="mMemberTypeDetail" class="fl" :style="innerWidth" style="white-space:nowrap; display: inline; padding-top:0.5rem; position: relative; ">
      <div class="fl textLeft font12 commonDarkGray tempLeftTabBtn fontBold" style="margin-top: 3px;" v-if="propLeftYn === false"  @click="showLeftBar" >{{mTempLeftImg}}</div>
      <p class="fl font16 fontBold textLeft commonDarkGray mleft-05 ">멤버유형 상세</p>
      <!-- <img class="fr img-w17 mright-1 " src="../../../assets/images/board/icon_trash.svg" @click="this.$emit('deleteType', this.mMemberTypeDetail)" alt=""> -->
      <div class="fl" style="border-bottom:1px solid #ccc; width:100%; height:1px;" />
        <div style="float: left; width: 100%; height: calc(100% - 50px); padding: 10px 10px;">
            <div style="width: 100%; min-height: 30px; display: flex; align-items: center;padding-left: 5px; ">
                <div class="fl " style="border-radius:100%; display: flex; justify-content: center; align-items: center; width: 30px; height: 30px; background:#cccccc50">
                    <img class="img-w20" src="../../../assets/images/editChan/icon_user_Gray.svg" alt="">
                </div>
                <input type="text" style="width: calc(100% - 50px)" class="fl font18 fontBold textLeft commonDarkGray mleft-05"  v-model="mMemberTypeNameMtext">
            </div>

            <div class="fl mtop-1" :key="reloadKey" style="padding: 0 10px; width: 100%;" >
                <label class='fl font16 commonColor fontBold' :for="certiYn">실명인증</label>
                <gToggle class="fl mleft-1" style="scale: 1.2;" id="certiYn" :toggleId='this.$changeText(mMemberTypeDetail.nameMtext)' @changeToggle='mMemberTypeDetail.certiYn = !mMemberTypeDetail.certiYn' :isChecked="mMemberTypeDetail.certiYn" />
                <!-- <p class="fl w-100P font14 commonColor textLeft">(성명, 전화번호)</p> -->
                <!-- propMemberTypeDetail -->
                <mTypeQueList ref="mTypeQueList" :propMemberTypeObj="mMemberTypeDetail" @addQuestion="this.$emit('addQuestion')" @editQue="editQue" class="mtop-1" />
            </div>
            <div style="width: 100%; height: 50px; margin-top: 10px;float: left;">
                <gBtnSmall :btnTitle="'삭제'" @click="this.$emit('deleteType', this.mMemberTypeDetail)" btnThema="light" class="mleft-05" style=""/>
                <gBtnSmall :btnTitle="'저장'" @click="this.saveMemberType" btnThema="deep" class="mleft-05" style=""/>
            </div>
            <!-- <div class="w-100P" style="position: absolute; left:0; bottom:0; min-height:50px; display: flex; align-items: center; justify-content: center; border-top: 1px solid #ccc;">
                <gBtnSmall :btnTitle="'저장'" @click="save" class="mright-05" style=""/>
                <gBtnSmall :btnTitle="'닫기'" @click="closeXPop" class="mleft-05" style=""/>
            </div> -->
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
    propLeftYn: {},
    propMemberTypeDetail: {}
  },
  data () {
    return {
      mTempLeftImg: '>>',
      mMemberTypeList: [],
      mMemberTypeDetail: {},
      mMemberTypeNameMtext: ''
    }
  },
  created () {
    this.mMemberTypeDetail = this.propMemberTypeDetail
    if (!this.mMemberTypeDetail) return null
    this.mMemberTypeNameMtext = this.$changeText(this.mMemberTypeDetail.nameMtext)
  },
  updated () {
    console.log(this.propMemberTypeDetail)
    this.mMemberTypeDetail = this.propMemberTypeDetail
  },
  computed: {
  },
  methods: {
    showLeftBar () {
      this.$emit('showLeftBar')
      // eslint-disable-next-line vue/no-mutating-props
      // this.propLeftYn = true
      // this.leftanimaYn = true
    },
    refreshList () {
      this.$refs.mTypeQueList.getMemberTypeItemList()
    },
    editQue (memberTypeItemObj) {
      console.log(memberTypeItemObj)
      if (memberTypeItemObj.targetType === 'editQue') {
        this.$emit('editQue', memberTypeItemObj)
      }
    },
    async saveMemberType (data) {
      // eslint-disable-next-line no-new-object
      var saveParam = new Object()
      saveParam.memberTypeKey = this.mMemberTypeDetail.memberTypeKey
      saveParam.nameMtext = 'KO$^$' + this.mMemberTypeNameMtext
      await this.$commonAxiosFunction({
        url: 'service/tp.saveMemberType',
        param: { member: saveParam }
      })
      this.$emit('reloadPage')
      // this.getMemberTypeList()
      // this.reloadKey += 1
    }
  }
}
</script>

<style scoped>

</style>
