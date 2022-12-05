<template>
    <div v-if="mMemberTypeDetail" class="fl" :style="innerWidth" style="white-space:nowrap; border-bottom:1px solid #ccc; display: inline; height: 100%; padding-top:0.5rem; position: relative; ">
      <div style="width: 100%; height: 32px; border-bottom: 1px solid #ccc; float: left; position: relative;">
          <p class="fl font16 fontBold textLeft commonColor mleft-05 ">멤버유형 상세</p>
          <div style="position: absolute; right: 10px; top: -1px;">
            <gBtnSmall :btnTitle="'삭제'" @click="this.$emit('deleteType', this.mMemberTypeDetail)" btnThema="light" class="mleft-05" style=" height: 25px; padding: 0 5px; line-height: 25px;"/>
            <gBtnSmall :btnTitle="'저장'" @click="this.saveListForChild" btnThema="deep" class="mleft-05" style=" height: 25px; line-height: 25px; padding: 0 5px;"/>
            <!-- <gBtnSmall :btnTitle="'복사'" @click="this.copyMemberType" btnThema="deep" class="mleft-05" style=""/> -->
          </div>
      </div>
      <!-- <img class="fr img-w17 mright-1 " src="../../../assets/images/board/icon_trash.svg" @click="this.$emit('deleteType', this.mMemberTypeDetail)" alt=""> -->
        <div style="float: left; width: 100%; height: calc(100% - 50px); padding: 10px 10px;">
            <div style="width: 100%; float: left; min-height: 30px; display: flex; align-items: center;padding-left: 5px; margin-bottom: 5px; ">
                <div class="fl " style="border-radius:100%; padding: 4px; display: flex; justify-content: center; align-items: center; width: 25px; height: 25px; background:#cccccc50">
                    <img class="w-100P" src="../../../assets/images/editChan/icon_user_Gray.svg" alt="">
                </div>
                <input type="text" style="width: calc(100% - 170px)" class="fl font18 fontBold textLeft commonDarkGray mleft-05"  v-model="mMemberTypeNameMtext">
                <div style="float: left; width: 120px; padding-left: 5px; padding-top: 5px; display: flex; align-items: center;">
                    <label class='fl font15 commonColor fontBold' :for="certiYn">실명인증</label>
                    <gToggle class="fl mleft-1" style="scale: 1.2; margin-top:5px;" id="certiYn" :toggleId='this.$changeText(mMemberTypeDetail.nameMtext)' @changeToggle='mMemberTypeDetail.certiYn = !mMemberTypeDetail.certiYn' :isChecked="mMemberTypeDetail.certiYn" />
                </div>
            </div>
            <div style="width: 100%; height: 1px; background: #ccc; float: left; margin: 5px 0;margin-bottom: 15px; "></div>
            <div class="fl mtop-05" :key="reloadKey" style="padding: 0 5px; width: 100%;" >
                <!-- <p class="fl w-100P font14 commonColor textLeft">(성명, 전화번호)</p> -->
                <!-- propMemberTypeDetail -->
                <mTypeQueList @sendListToParents="saveMemberType" ref="mTypeQueList" :propMemberTypeObj="mMemberTypeDetail" @addQuestion="this.$emit('addQuestion')" @editQue="editQue" class="mtop-1" />
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
    saveListForChild () {
      this.$refs.mTypeQueList.sendListToParents()
    },
    async saveMemberType (itemList) {
      // eslint-disable-next-line no-new-object
      var saveParam = new Object()
      saveParam.memberTypeKey = this.mMemberTypeDetail.memberTypeKey
      saveParam.nameMtext = 'KO$^$' + this.mMemberTypeNameMtext
      console.log(saveParam)
      var dragItemList = document.getElementsByClassName('memTypeItemListRow')
      // eslint-disable-next-line no-debugger
      debugger
      console.log(dragItemList)
      var saveList = []
      for (var i = 0; i < dragItemList.length; i++) {
        saveList.push(itemList[Number(dragItemList[i].attributes.listindex.value)])
      }
      saveParam.memberTypeItemList = saveList
      console.log(saveParam)
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
