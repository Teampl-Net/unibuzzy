<template>
    <div v-if="!childShowYn" style="width: 100%; min-height: 20px; display: flex; margin-bottom: 5px; ">
        <div style="width: 90px; margin-right: 10px; height: 100%;" @click="emit({ 'targetType': 'goUserProfile', 'value': propMemoEle })">
            <p class="commonBlack textLeft font14 fontBold">{{this.$changeText(propMemoEle.userDispMtext)}}</p>
        </div>
        <div style="width: calc(100% - 100px); min-height: 20px;" @click="emit({ 'targetType': 'goContentsDetail', 'value': propMemoEle })">
            <!-- <p class="commonBlack textLeft font14" v-html="$cutText($decodeHTML(propMemoEle.bodyFullStr), 80)"></p> -->
            <pre class="commonBlack textLeft font14" v-html="$decodeHTML(propMemoEle.bodyFullStr)"></pre>
        </div>
    </div>
    <div v-else-if="propMemoEle" style="width: 100%; float: left; height: 100%; margin-bottom: 20px; border-bottom: 1px solid #cccccc50;">
        <div style="width: 100%; min-height: 20px; display: flex; margin-bottom: 5px;float: left; position: relative;">
            <img src="../../../assets/images/push/contents_moreBtnIcon.svg" style="position: absolute; right: 5px; top: 0;" alt="" @click="contMenuClick(propMemoEle)">
            <div :style="this.GE_USER.userKey === propMemoEle.creUserKey? 'border: 2px solid #5B1CFC; ': 'border: 2px solid rgba(0, 0, 0, 0.1)!important;'" style="width: 40px; display: flex; justify-content: center; align-items: center; border-radius: 100%; margin-right: 10px; height: 40px;">
                <div :style="'background-image: url(' + propMemoEle.domainPath + propMemoEle.userProfileImg + ');'" style="height: 36px; width: 36px; border-radius: 100%;  background-repeat: no-repeat; background-position: center; background-size: cover;"></div>
            </div>
            <div style="width: calc(100% - 40px); min-height: 40px; display: flex; flex-direction: column;">
                <div style="width: 100%; margin-right: 10px; min-height: 20px; margin-top: 5px;">
                    <p class="commonBlack "><pp class="fl commonBlack mright-05 textLeft font14 fontBold" @click="emit({ targetType: 'goUserProfile', value: propMemoEle })">{{this.$changeText(propMemoEle.userDispMtext)}}</pp><pp class="fl commonGray font12"  style="font-weight:normal;">{{this.$changeDateMemoFormat(propMemoEle.creDate)}}</pp></p>
                </div>
                <div style="min-height: 20px; width: 100%; min-height: 20px;">
                    <pre class="commonBlack textLeft font14" v-html="this.$decodeHTML(propMemoEle.bodyFullStr)" :id="'memoFullStr'+propMemoEle.memoKey"></pre>
                </div>
                <div style="min-height: 20px; margin-top: 10px;  width: 100%; padding-right: 10px; min-height: 20px;">
                    <p class="commonGray textLeft font12 fl" @click="writeMeMemo(propMemoEle)">답글달기</p>
                    <p @click="deleteConfirm(propMemoEle)" v-if="this.GE_USER.userKey === propMemoEle.creUserKey" class="commonGray textLeft font12 fr">삭제</p>
                    <!-- <p class="commonGray textLeft font12 fr mright-1" v-if="this.GE_USER.userKey === propMemoEle.creUserKey">수정</p> -->
                </div>
            </div>
        </div>
        <div style="width: 100%; float: left; padding-left: 40px; min-height: 20px;">
            <div v-for="(cmemo, cIndex) in propMemoEle.cmemoList" :key="cIndex" style="width: 100%; min-height: 20px; display: flex; margin-bottom: 5px;float: left; position: relative;">
                <img src="../../../assets/images/push/contents_moreBtnIcon.svg" style="position: absolute; right: 5px; top: 0;" alt="" @click="contMenuClick(cmemo)">
                <div :style="this.GE_USER.userKey === cmemo.creUserKey? 'border: 2px solid #5B1CFC; ': 'border: 2px solid rgba(0, 0, 0, 0.1)!important;'" style="width: 40px; display: flex; justify-content: center; align-items: center; border-radius: 100%; margin-right: 10px; height: 40px;">
                    <div :style="'background-image: url(' + cmemo.domainPath + cmemo.userProfileImg + ');'" style="height: 36px; width: 36px; border-radius: 100%;  background-repeat: no-repeat; background-position: center; background-size: cover;"></div>
                </div>
                <div style="width: calc(100% - 40px); min-height: 40px; display: flex; flex-direction: column;">
                    <div style="width: 100%; margin-right: 10px; min-height: 20px;">
                        <p class="commonBlack "><pp class="fl commonBlack mright-05 textLeft font14 fontBold"  @click="emit({ targetType: 'goUserProfile', value: cmemo })">{{this.$changeText(cmemo.userDispMtext)}}</pp><pp class="fl commonGray font12"  style="font-weight:normal; line-height: 22px;">{{this.$changeDateMemoFormat(cmemo.creDate)}}</pp></p>
                    </div>
                    <div style="min-height: 20px; width: 100%; min-height: 20px; margin-top: 5px;">
                        <pre class="commonBlack textLeft font14" v-html="this.$decodeHTML(cmemo.bodyFullStr)" :id="'memoFullStr'+cmemo.memoKey" ></pre>
                    </div>
                    <div style="min-height: 20px; width: 100%; margin-top: 5px; padding-right: 10px; min-height: 20px;">
                        <p class="commonGray textLeft font12 fl"  @click="writeMeMemo(cmemo)">답글달기</p>
                        <p @click="deleteConfirm(cmemo)" v-if="this.GE_USER.userKey === cmemo.creUserKey" class="commonGray textLeft font12 fr">삭제</p>
                        <!-- <p class="commonGray textLeft font12 fr mright-1" v-if="this.GE_USER.userKey === cmemo.creUserKey">수정</p> -->
                    </div>
                </div>
            </div>
        </div>
        <gConfirmPop :confirmText='mConfirmText' :confirmType='mConfirmType' v-if="mConfirmPopShowYn" @ok="confirmOk()" @no='mConfirmPopShowYn=false'/>
    </div>
<gReport v-if="mContMenuShowYn" @closePop="mContMenuShowYn = false"  @report="report" @editable="editable" @bloc="bloc" :contentsInfo="propMemoEle" contentType="MEMO" :contentOwner="this.GE_USER.userKey === propMemoEle.creUserKey"/>
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
      mCurrentConfirmType: '',
      mTempData: null,
      mCurrentMemoObj: {},
      mContMenuShowYn: false
    }
  },
  created () {
    // console.log(this.childShowYn)
  },
  methods: {
    contMenuClick (memoContents) {
      this.mTempData = memoContents
      this.mContMenuShowYn = true
    },
    editable (type, allYn) {
      this.mContMenuShowYn = false
      // tempData는 어떤 컨텐츠가 올지, 어떤 Function이 올지 몰라 해당 컨텐츠의 데이터를 일단 받아주는 변수입니다..!
      if (type === 'edit') {
        // 댓글 수정

        // this.$refs.commonPushListMemoRefs[0].editMemoClick(this.tempData, this.tempData.index, this.tempData.cIndex)
      } else if (type === 'delete') {
        // 댓글 삭제
        // this.deleteConfirm('memo')
        this.deleteMemo()
      } else if (type === 'textCopy') {
        this.textCopy()
      }
    },
    confirmOk () {
      var toastText = ''
      this.mConfirmType = 'timeout'
      if (this.mCurrentConfirmType === 'BLOC') {
        var param = {}
        param.claimType = 'BLOC'
        param.targetKind = 'U'
        param.targetKey = this.mTempData.creUserKey
        // if (this.CONT_DETAIL.contentsKey) {
        //   param.targetKind = 'C'
        //   param.targetKey = this.CONT_DETAIL.contentsKey
        // } else return false
        param.creUserKey = this.GE_USER.userKey
        toastText = '해당 유저를 차단했습니다.'
        console.log(param)
        console.log(toastText)
        this.saveActAxiosFunc(param, toastText)
      } else if (this.mCurrentConfirmType === 'memoDEL') {
        this.deleteMemo()
      }

      this.mCurrentConfirmType = ''
      this.mConfirmPopShowYn = false
    },
    bloc (type) {
      var typeText = type === 'USER' ? '유저를' : '게시글을'
      this.mConfirmText = '해당 ' + typeText + ' 차단하시겠습니까?'
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
      this.mCurrentConfirmType = 'BLOC'
    },
    report (type) {
      var targetKind
      var targetKey
      var toastText

      if (type === 'MEMO') {
        targetKind = 'C'
        targetKey = this.propMemoEle.memoKey
        toastText = '해당 댓글이 신고되었습니다.'
      } else if (type === 'CHANNEL') {
        targetKind = 'T'
        targetKey = this.CONT_DETAIL.creTeamKey
        toastText = '해당 채널이 신고되었습니다.'
      } else if (type === 'USER') {
        targetKind = 'U'
        targetKey = this.propMemoEle.creUserKey
        toastText = '해당 유저가 신고되었습니다.'
      }
      var param = {}
      param.claimType = 'REPO'
      param.targetKind = targetKind
      param.targetKey = parseInt(targetKey)
      param.creUserKey = this.GE_USER.userKey
      console.log(type)
      console.log(param)
      console.log(toastText)
      this.saveActAxiosFunc(param, toastText)
    },
    /** 신고, 차단, 탈퇴를 할 수 있는 axios함수 // actType, targetKind, targetKey, creUserKey 보내기 */
    async saveActAxiosFunc (param, toastText) {
      try {
        var result = await this.$commonAxiosFunction({
          url: 'service/tp.saveClaimLog',
          param: param
        })
        console.log(result)
        if (result) {
          this.$showToastPop(toastText)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.mContMenuShowYn = false
      }
    },
    emit (emitData) {
      this.$emit('memoEmitFunc', emitData)
    },
    deleteConfirm (data) {
      // eslint-disable-next-line no-debugger
      debugger
      if ((data !== undefined && data !== null && data !== '') && (data !== 'alim' && data !== 'memo' && data !== 'board')) {
        this.mTempData = data
      }

      if (this.mTempData.parentMemoKey) {
        this.mConfirmText = '대댓글을 삭제하시겠습니까?'
      } else if (this.mTempData.memoKey) {
        this.mConfirmText = '댓글을 삭제하시겠습니까?'
      }
      this.mCurrentConfirmType = 'memoDEL'
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
    },
    textCopy () {
      const textarea = document.createElement('textarea')
      document.body.appendChild(textarea)
      var content = document.getElementById('memoFullStr' + this.mTempData.memoKey).innerText
      try {
        textarea.value = content
        textarea.select()
        // 복사 후 textarea 지우기
        document.execCommand('copy')
        document.body.removeChild(textarea)
        this.$showToastPop('복사되었습니다.')
      } catch (error) {
        this.$showToastPop('복사하지 못했습니다.')
      }
    },
    async deleteMemo () {
      var memo = {}
      memo.memoKey = this.mTempData.memoKey

      try {
        var result = await this.$commonAxiosFunction({
          url: 'service/tp.deleteMemo',
          param: memo
        })
        console.log('===================')
        console.log(result)

        if (result.data.result === true) {
          // var cont = this.currentMemoObj
          var cont = this.propContDetail
          var index, cmemoListIdx
          console.log(cont)
          if (this.mTempData.parentMemoKey) {
            // 댓글의 부모키값이 있으면 컨텐츠의 댓글 중 부모의 키값을 찾음
            index = cont.D_MEMO_LIST.findIndex((item) => item.memoKey === this.mTempData.parentMemoKey)

            // 컨텐츠의 댓글 중 부모키값의 인덱스에 자식 댓글리스트 중 삭제한 대댓글의 키를 찾음
            cmemoListIdx = cont.D_MEMO_LIST[index].cmemoList.findIndex(i => i.memoKey === this.mTempData.memoKey)

            // 찾은 대댓글의 키를 리스트에서 삭제함
            cont.D_MEMO_LIST[index].cmemoList.splice(cmemoListIdx, 1)
          } else {
            index = cont.D_MEMO_LIST.findIndex((item) => item.memoKey === this.mTempData.memoKey)
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
    writeMeMemo (memo) {
      /* if (this.mCurrentMemoObj.memoKey !== memo.memoKey) {
        // this.$emit('clearMemo')
        this.clearMemo()
      } */
      // var memoObj = JSON.parse(JSON.stringify(memo))
      this.mCurrentMemoObj = JSON.parse(JSON.stringify(memo))
      if ((this.propContDetail.jobkindId === 'ALIM' && this.propContDetail.canReplyYn === 1) || (this.propContDetail.jobkindId === 'BOAR' && this.propContDetail.shareAuth.R === true)) {
        var data = {}
        data.parentMemoKey = this.mCurrentMemoObj.memoKey // 대댓글때 사용하는것임
        if (this.mCurrentMemoObj.parentMemoKey !== undefined && this.mCurrentMemoObj.parentMemoKey !== null && this.mCurrentMemoObj.parentMemoKey !== '') {
          data.parentMemoKey = this.mCurrentMemoObj.parentMemoKey
        }
        data.memo = this.mCurrentMemoObj
        console.log(data)

        this.emit({ targetType: 'writeMeMemo', value: data })
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
