<i18n>
{
  "ko": {
    "MEM_DETAIL_TITLE_LIST": "목록",
    "MEM_DETAIL_TITLE_DETAIL": "멤버유형 상세",
  },
  "en": {
    "MEM_DETAIL_TITLE_LIST": "List",
    "MEM_DETAIL_TITLE_DETAIL": "Member Type Details",
  }
}
</i18n>
<template>
    <div v-if="mMemberTypeDetail" class="fl memberTypeDetailWrap" :style="innerWidth">
      <div class="memberTypeTitle">
          <p class="fl font16 fontBold textLeft commonColor mleft-05 ">{{ $t('MEM_DETAIL_TITLE_DETAIL') }}</p>
          <div class="memberTypeBtnWrap">
            <gBtnSmall :btnTitle="$t('COMMON_BTN_DELETE')" @click="deleteMemberType(mMemberTypeDetail)" btnThema="light" class="mleft-05 memberTypeBtn"/>
            <gBtnSmall :btnTitle="$t('COMMON_BTN_SAVE')" @click="this.saveListForChild" btnThema="deep" class="mleft-05"/>
            <!-- <gBtnSmall :btnTitle="'복사'" @click="this.copyMemberType" btnThema="deep" class="mleft-05" style=""/> -->
          </div>
      </div>
      <!-- <img class="fr img-w17 mright-1 " src="../../../assets/images/board/icon_trash.svg" @click="this.$emit('deleteType', this.mMemberTypeDetail)" alt=""> -->
        <div class="memberTypeListWrap">
            <div class="memberTypeOptionWrap">
                <div class="fl userIconWrap">
                    <img class="w100P" src="../../../assets/images/editChan/icon_user_Gray.svg" alt="">
                </div>
                <input type="text" class="fl font18 fontBold textLeft commonDarkGray mleft-05 memberTypeNameInput"  v-model="mMemberTypeNameMtext">
                <div class="toggleWrap">
                    <label class='fl font15 commonColor fontBold' :for="certiYn">실명인증</label>
                    <gToggle class="fl mleft-1 toggleBtn" id="certiYn" :toggleId='this.$changeText(mMemberTypeDetail.nameMtext)' @changeToggle='mMemberTypeDetail.certiYn = !mMemberTypeDetail.certiYn' :isChecked="mMemberTypeDetail.certiYn" />
                </div>
            </div>
            <div class="memberTypeDetailDivide"></div>
            <div class="fl mtop-05 queListWrap" :key="reloadKey">
                <!-- <p class="fl w100P font14 commonColor textLeft">(성명, 전화번호)</p> -->
                <!-- propMemberTypeDetail -->
                <mTypeQueList @sendListToParents="saveMemberType" ref="mTypeQueList" :propMemberTypeObj="mMemberTypeDetail" @addQuestion="this.$emit('addQuestion')" @editQue="editQue" class="mtop-1" />
            </div>
            <!-- <div class="w100P" style="position: absolute; left:0; bottom:0; min-height:50px; display: flex; align-items: center; justify-content: center; border-top: 1px solid #ccc;">
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
    deleteMemberType (memberTypeDetail) {
      this.$emit('deleteType', memberTypeDetail)
    },
    showLeftBar () {
      this.$emit('showLeftBar')
      // eslint-disable-next-line vue/no-mutating-props
      // this.propLeftYn = true
      // this.leftanimaYn = true
    },
    refreshList () {
      console.log('여기지롱')
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
      saveParam.nameMtext = 'EN$^$' + this.mMemberTypeNameMtext
      saveParam.certiYn = this.mMemberTypeDetail.certiYn
      console.log(saveParam)
      var dragItemList = document.getElementsByClassName('memTypeItemListRow')
      console.log(dragItemList)
      var saveList = []
      for (var i = 0; i < dragItemList.length; i++) {
        if (!itemList[Number(dragItemList[i].attributes.listindex.value)].deleteYn) saveList.push(itemList[Number(dragItemList[i].attributes.listindex.value)])
      }
      for (var s = 0; s < itemList.length; s++) {
        if (itemList[s].deleteYn) {
          saveList.push(itemList[s])
        }
      }
      saveParam.memberTypeItemList = saveList
      console.log(saveParam)
      await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveMemberType',
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
.memberTypeDetailWrap {
  white-space: nowrap;
  border-bottom: 1px solid #ccc;
  display: inline;
  height: 100%;
  padding-top: 0.5rem;
  position: relative;
}
.memberTypeTitle {
  width: 100%;
  height: 32px;
  border-bottom: 1px solid #ccc;
  float: left;
  position: relative;
}
.memberTypeBtnWrap {
  position: absolute;
  right: 10px;
  top: -1px;
}
.memberTypeBtn {
  height: 25px !important;
  padding: 0 5px !important;
  line-height: 25px !important;
}
.memberTypeListWrap {
  float: left;
  width: 100%;
  height: calc(100% - 50px);
  padding: 10px 10px;
}
.memberTypeOptionWrap {
  width: 100%;
  float: left;
  min-height: 30px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  margin-bottom: 5px;
}
.userIconWrap {
  border-radius:100%;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background:#cccccc50;
}
.memberTypeNameInput {
  width: calc(100% - 170px);
}
.toggleWrap {
  float: left;
  width: 120px;
  padding-left: 5px;
  padding-top: 5px;
  display: flex;
  align-items: center;
}
.toggleBtn {
  scale: 1.2 !important;
  margin-top: 5px !important;
}
.memberTypeDetailDivide {
  width: 100%;
  height: 1px;
  background: #ccc;
  float: left;
  margin: 5px 0;
  margin-bottom: 15px;
}
.queListWrap {
  padding: 0 5px;
  width: 100%;
}
</style>
