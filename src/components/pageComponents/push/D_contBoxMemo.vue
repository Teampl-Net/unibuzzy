<template>
    <div v-if="!childShowYn" style="width: 100%; min-height: 20px; display: flex; margin-bottom: 5px; ">
        <div style="width: 90px; margin-right: 10px; height: 100%;" @click="emit({ 'targetType': 'goUserProfile', 'value': propMemoEle })">
            <p class="commonBlack textLeft font14 fontBold">{{this.$changeText(propMemoEle.userNameMtext)}}</p>
        </div>
        <div style="width: calc(100% - 100px); min-height: 20px;" @click="emit({ 'targetType': 'goContentsDetail', 'value': propMemoEle })">
            <p class="commonBlack textLeft font14" v-html="this.$decodeHTML(propMemoEle.bodyFullStr)"></p>
        </div>
    </div>
    <div v-else-if="propMemoEle" style="width: 100%; float: left; height: 100%; margin-bottom: 20px; border-bottom: 1px solid #cccccc50;">
        <div style="width: 100%; min-height: 20px; display: flex; margin-bottom: 5px;float: left; position: relative;">
            <img src="../../../assets/images/push/contents_moreBtnIcon.svg" style="position: absolute; right: 5px; top: 0;" alt="">
            <div :style="this.GE_USER.userKey === propMemoEle.creUserKey? 'border: 2px solid #5B1CFC; ': 'border: 2px solid rgba(0, 0, 0, 0.1)!important;'" style="width: 40px; display: flex; justify-content: center; align-items: center; border-radius: 100%; margin-right: 10px; height: 40px;">
                <div :style="'background-image: url(' + propMemoEle.domainPath + propMemoEle.userProfileImg + ');'" style="height: 36px; width: 36px; border-radius: 100%;  background-repeat: no-repeat; background-position: center; background-size: cover;"></div>
            </div>
            <div style="width: calc(100% - 40px); min-height: 40px; display: flex; flex-direction: column;">
                <div style="width: 100%; margin-right: 10px; min-height: 20px; margin-top: 5px;">
                    <p class="commonBlack "><pp class="fl commonBlack mright-05 textLeft font14 fontBold">{{this.$changeText(propMemoEle.userNameMtext)}}</pp><pp class="fl commonGray font12"  style="font-weight:normal;">{{this.$changeDateFormat(propMemoEle.creDate)}}</pp></p>
                </div>
                <div style="min-height: 20px; width: 100%; min-height: 20px;">
                    <p class="commonBlack textLeft font14" v-html="this.$decodeHTML(propMemoEle.bodyFullStr)"></p>
                </div>
                <div style="min-height: 20px; margin-top: 10px;  width: 100%; padding-right: 10px; min-height: 20px;">
                    <p class="commonGray textLeft font12 fl" @click="writeMememo(propMemoEle)">답글달기</p>
                    <p @click="deleteConfirm(propMemoEle)" v-if="this.GE_USER.userKey === propMemoEle.creUserKey" class="commonGray textLeft font12 fr">삭제</p>
                    <!-- <p class="commonGray textLeft font12 fr mright-1" v-if="this.GE_USER.userKey === propMemoEle.creUserKey">수정</p> -->
                </div>
            </div>
        </div>
        <div style="width: 100%; float: left; padding-left: 40px; min-height: 20px;">
            <div v-for="(cmemo, cIndex) in propMemoEle.cmemoList" :key="cIndex" style="width: 100%; min-height: 20px; display: flex; margin-bottom: 5px;float: left; position: relative;">
                <img src="../../../assets/images/push/contents_moreBtnIcon.svg" style="position: absolute; right: 5px; top: 0;" alt="">
                <div :style="this.GE_USER.userKey === cmemo.creUserKey? 'border: 2px solid #5B1CFC; ': 'border: 2px solid rgba(0, 0, 0, 0.1)!important;'" style="width: 40px; display: flex; justify-content: center; align-items: center; border-radius: 100%; margin-right: 10px; height: 40px;">
                    <div :style="'background-image: url(' + cmemo.domainPath + cmemo.userProfileImg + ');'" style="height: 36px; width: 36px; border-radius: 100%;  background-repeat: no-repeat; background-position: center; background-size: cover;"></div>
                </div>
                <div style="width: calc(100% - 40px); min-height: 40px; display: flex; flex-direction: column;">
                    <div style="width: 100%; margin-right: 10px; min-height: 20px;">
                        <p class="commonBlack "><pp class="fl commonBlack mright-05 textLeft font14 fontBold">{{this.$changeText(cmemo.userNameMtext)}}</pp><pp class="fl commonGray font12"  style="font-weight:normal; line-height: 22px;">{{this.$changeDateFormat(cmemo.creDate)}}</pp></p>
                    </div>
                    <div style="min-height: 20px; width: 100%; min-height: 20px; margin-top: 5px;">
                        <p class="commonBlack textLeft font14" v-html="this.$decodeHTML(cmemo.bodyFullStr)"></p>
                    </div>
                    <div style="min-height: 20px; width: 100%; margin-top: 5px; padding-right: 10px; min-height: 20px;">
                        <p class="commonGray textLeft font12 fl"  @click="writeMememo(cmemo)">답글달기</p>
                        <p @click="deleteConfirm(cmemo)" v-if="this.GE_USER.userKey === cmemo.creUserKey" class="commonGray textLeft font12 fr">삭제</p>
                        <!-- <p class="commonGray textLeft font12 fr mright-1" v-if="this.GE_USER.userKey === cmemo.creUserKey">수정</p> -->
                    </div>
                </div>
            </div>
        </div>
        <gConfirmPop :confirmText='mConfirmText' :confirmType='mConfirmType' v-if="mConfirmPopShowYn" @ok="deleteMemo" @no='mConfirmPopShowYn=false'/>
    </div>
</template>

<script>
export default {
  props: {
    propMemoEle: {},
    diplayCount: {},
    childShowYn: {},
    propContDetail: {}
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  data () {
    return {
      mConfirmText: '',
      mConfirmType: 'one',
      mConfirmPopShowYn: false,
      mTempData: null,
      mCurrentMemoObj: {}
    }
  },
  created () {
    console.log(this.childShowYn)
  },
  methods: {
    emit (emitData) {
      this.$emit('memoEmitFunc', emitData)
    },
    deleteConfirm (data) {
      // eslint-disable-next-line no-debugger
      debugger
      if ((data !== undefined && data !== null && data !== '') && (data !== 'alim' && data !== 'memo' && data !== 'board')) {
        this.mTempData = data
      }

      if (data === 'memo' || this.mTempData.memoKey) {
        this.mConfirmText = '댓글을 삭제하시겠습니까?'
        if (this.mTempData.parentMemoKey) {
          this.mConfirmText = '대댓글을 삭제하시겠습니까?'
        }
      } else if (data === 'alim' || this.mTempData.jobkindId === 'ALIM') {
        this.mConfirmText = '알림 삭제는 나에게서만 적용되며 알림을 받은 사용자는 삭제되지 않습니다.'
      } else if (data === 'board' || this.mTempData.jobkindId === 'BOAR') {
        this.mConfirmText = '게시글을 삭제 하시겠습니까?'
      }
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
    },
    async deleteMemo () {
      var memo = {}
      memo.memoKey = this.mTempData.memoKey

      try {
        var result = await this.$commonAxiosFunction({
          url: 'service/tp.deleteMemo',
          param: memo
        })
        var index
        if (result.data.result === true) {
          // var cont = this.currentMemoObj
          var cont = this.propContDetail
          cont.D_MEMO_LIST.findIndex((item) => item.memoKey === this.mTempData.memoKey)
          var cmemoListIdx
          if (this.mTempData.parentMemoKey) {
            for (let i = 0; i < cont.D_MEMO_LIST.length; i++) {
              if (cont.D_MEMO_LIST[i].cmemoList.length > 0) {
                index = cont.D_MEMO_LIST[i].cmemoList.findIndex(i => i.memoKey === this.mTempData.memoKey)
                if (index !== -1) {
                  cmemoListIdx = i
                  break
                }
              }
            }
            if (cmemoListIdx !== -1) cont.D_MEMO_LIST.cmemoList.splice(index, 1)
          } else {
            // cont.D_MEMO_LIST.splice(index, 1)
            cont.D_MEMO_LIST.splice(index, 1)
          }
          cont.memoCount -= 1
          console.log(cont)
          this.$store.dispatch('D_CHANNEL/AC_DEL_MEMO_REPLACE_CONTENT', [cont])
          // this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
        }
        this.$showToastPop('댓글을 삭제하였습니다.')
        this.mConfirmPopShowYn = false
      } catch (error) {
        this.$showToastPop('정상적으로 완료하지 못했습니다.')
        this.mConfirmPopShowYn = false
        console.log(error)
      }
    },
    writeMememo (memo) {
      /* if (this.mCurrentMemoObj.memoKey !== memo.memoKey) {
        // this.$emit('clearMemo')
        this.clearMemo()
      } */
      this.mCurrentMemoObj = memo
      if ((this.propContDetail.jobkindId === 'ALIM' && this.propContDetail.canReplyYn === 1) || (this.propContDetail.jobkindId === 'BOAR' && this.CAB_DETAIL.shareAuth.R === true)) {
        var data = {}
        data.parentMemoKey = this.mCurrentMemoObj.memoKey // 대댓글때 사용하는것임
        if (this.mCurrentMemoObj.parentMemoKey !== undefined && this.mCurrentMemoObj.parentMemoKey !== null && this.mCurrentMemoObj.parentMemoKey !== '') {
          data.parentMemoKey = this.mCurrentMemoObj.parentMemoKey
        }
        data.memo = this.mCurrentMemoObj
        // eslint-disable-next-line no-debugger
        // debugger
        this.$emit('resetMemo', this.mCurrentMemoObj)
        this.$emit('openMemoPop', this.mCurrentMemoObj)
        // this.memoShowYn = true
      } else {
        this.confirmText = '댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요.'
        this.confirmPopShowYn = true
      }
    }
  }
}
</script>

<style scoped>

</style>
