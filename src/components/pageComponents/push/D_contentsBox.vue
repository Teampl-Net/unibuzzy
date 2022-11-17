<template>
    <div v-if="this.contentsEle" style="width: 100%; background: #FFF; min-height: 20px; float: left; box-shadow: 0px 1px 3px rgba(103, 104, 167, 0.4); margin-bottom: 10px;">
        <div class="contentsCardHeaderArea" style="width: 100%; min-height: 20px; float: left; padding: 16px 20px;">
            <div @click="goChannelMain()" :style="this.GE_USER.userKey === contentsEle.creUserKey? 'border: 2px solid #5B1CFC !important; ': 'border: 2px solid rgba(0, 0, 0, 0.1)!important;'" class="contentsCardLogoArea" >
                <div :style="'background-image: url(' + (contentsEle.domainPath ? contentsEle.domainPath + contentsEle.logoPathMtext : contentsEle.logoPathMtext) + ');'" style="width: calc(100% - 2px); height:  calc(100% - 2px); border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;">
                </div>
            </div>
            <div style="width: calc(100% - 55px); margin-left: 10px; height: 100%; float: left; display: flex; flex-direction: column;" >
                <div style="width: 100%; paosition: relative; height: 50%; min-height: 26px;  position: relative;">
                    <template v-if="(contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(contentsEle.shareItem).V === false && contentsEle.creUserKey !== this.GE_USER.userKey) && contentsEle.titleBlindYn">
                        <p class=" textLeft textOverdot commonBlack fontBold font16" style="width: calc(100% - 35px);">
                            열람 권한이 없습니다.
                        </p>
                    </template>
                    <template v-else>
                        <p @click="goContentsDetail()" class=" textLeft textOverdot commonBlack fontBold font16" style="width: calc(100% - 35px);">
                            <img v-if="contentsEle.jobkindId === 'BOAR'" src="../../../assets/images/push/contTitle_alim.svg" style="width: 20px; margin-top: 2px; float: left; margin-right: 5px;" alt="">
                            <img v-else-if="contentsEle.jobkindId === 'ALIM'" src="../../../assets/images/push/contTitle_board.svg" style="width: 20px; margin-top: 2px;  float: left; margin-right: 5px;" alt="">
                            {{contentsEle.title}}
                        </p>
                        <img src="../../../assets/images/push/contents_moreBtnIcon.svg" style="position: absolute; right: 0; top: 0;" alt="" @click="contentMenuClick">
                    </template>
                </div>
                <div style="width: 100%; paosition: relative; height: 50%; min-height: 40px;">
                    <p @click="goUserProfile()" class="CLDeepGrayColor font14 fl textLeft fontBold">{{this.$changeText(contentsEle.nameMtext)}}<pp style="font-weight: normal;">{{ '|' + this.$changeText(contentsEle.creUserName)}}</pp></p>
                    <p class="fr CLDeepGrayColor font12">{{this.$changeDateFormat(contentsEle.creDate)}}</p>
                </div>
            </div>
        </div>
        <div @click="goContentsDetail()" class="contentsCardBodyArea" style="width: 100%;  float: left; min-height: 20px;">
            <div v-if="(contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(contentsEle.shareItem).V === false && contentsEle.creUserKey !== this.GE_USER.userKey) && !contentsEle.titleBlindYn" @cick="zzz" class="font14 cursorP mbottom-05 bodyFullStr" style="min-height: 30px;" v-html="$notPerText()"></div>
            <div v-else-if="(contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(contentsEle.shareItem).V === false && contentsEle.creUserKey !== this.GE_USER.userKey) && contentsEle.titleBlindYn" @cick="zzz" class="" ></div>
            <div v-else class="h-400max overHidden fl w-100P"  style="word-break: break-all;" :id="'contentsBodyBoxArea'+contentsEle.contentsKey">
              <pre :class="contentsEle.jobkindId === 'BOAR' && contentsEle.workStatYn && contentsEle.workStatCodeKey === 46? 'completeWork': ''" @click="clickCard(alim)" :id="'bodyFullStr'+contentsEle.contentsKey" class="font14 mbottom-05 mainConts cursorDragText h-100P w-100P fl" style="word-break: break-all; overflow: hidden auto;" v-html="$setBodyLength(contentsEle.bodyFullStr, contentsEle.jobkindId === 'BOAR' && contentsEle.workStatYn && contentsEle.workStatCodeKey === 46)"></pre>
            </div>
            <p @click="alimBigView()" :id="'bodyMore'+contentsEle.contentsKey" class="font16 cursorP textRight fr mright-1 lightGray" style="display:none">더보기 > </p>
        </div>
        <template v-if="((contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(contentsEle.shareItem).V === true) || contentsEle.jobkindId === 'ALIM' || contentsEle.creUserKey === this.GE_USER.userKey)">
            <div class="contentsCardUserDoArea" style="width: 100%; min-height: 40px; float: left; justify-content: space-between;  display: flex; margin-top: 15px; padding: 0 20px;">
                <div style="float: left; width: 50%; height: 100%;">
                    <div @click="changeAct(this.contentsEle.D_CONT_USER_DO[1], this.contentsEle.contentKey)" style="width: 30px; height: 35px; display: flex; float: left; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                        <img v-if="!this.contentsEle.D_CONT_USER_DO[1].doKey || this.contentsEle.D_CONT_USER_DO[1].doKey === 0" src="../../../assets/images/push/likeIcon.png" alt="">
                        <img v-else src="../../../assets/images/push/likeIcon_color.png" alt="">
                        <p class="font12 fl w-100P userDoColor">{{contentsEle.likeCount}}</p>
                    </div>
                    <div  @click="changeAct(this.contentsEle.D_CONT_USER_DO[0], this.contentsEle.contentKey)" style="width: 30px; height: 35px; display: flex; float: left; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                        <img v-if="!this.contentsEle.D_CONT_USER_DO[0].doKey || this.contentsEle.D_CONT_USER_DO[0].doKey === 0" src="../../../assets/images/push/starIcon.png" alt="">
                        <img v-else src="../../../assets/images/push/starIcon_color.png" alt="">
                        <p class="font12 fl w-100P userDoColor">{{contentsEle.starCount}}</p>
                    </div>
                    <div style="width: 30px; height: 35px; display: flex; float: left; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                        <img  src="../../../assets/images/push/memoIcon.png" alt="">
                        <p class="font12 fl w-100P userDoColor">{{contentsEle.memoCount}}</p>
                    </div>
                </div>
                <div style="float: right; width: 50%; height: 100%; float: left;">
                    <div style="width: 30px; height: 35px; display: flex; float: right; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                        <img src="../../../assets/images/push/shareIcon.png" class="img-w20 fl" alt="공유 아이콘"
                            data-clipboard-action="copy" id="boardDetailCopyBody" @click="contentsSharePop()"
                                :data-clipboard-text="contentsEle.copyTextStr">
                    </div>
                    <div style="width: 30px; height: 35px; display: flex; float: right; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                        <img v-if="this.contentsEle.attachMfilekey && this.contentsEle.attachMfilekey > 0" src="../../../assets/images/push/attachFileIcon.png" alt="">
                        <img v-else src="../../../assets/images/push/attachFileIcon.png" alt="">
                    </div>
                    <div @click="subScribeContents" style="width: 30px; height: 35px; display: flex; float: right; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                        <img v-if="this.contentsEle.subsYn === 1 || this.contentsEle.subsYn === true" src="../../../assets/images/push/noti_on.png" alt="">
                        <img v-else src="../../../assets/images/push/noti_off.png" alt="">
                    </div>
                </div>
            </div>
            <div v-if="this.contentsEle.D_MEMO_LIST && this.contentsEle.D_MEMO_LIST.length > 0" style="height: 2px; background: #F1F1F1; width: calc(100% - 40px); margin: 10px 20px; float: left;"></div>
            <div class="contentsCardMemoArea" style="width: 100%; float: left; padding: 10px 20px; min-height: 20px;">
                <template v-for="(memo, mIndex) in this.contentsEle.D_MEMO_LIST" :key="mIndex">
                    <memoCompo :diplayCount="-1" :childShowYn="propDetailYn" :propMemoEle="memo" @memoEmitFunc='memoEmitFunc' />
                </template>
            </div>
        </template>
    </div>
<gReport v-if="mContMenuShowYn" @closePop="mContMenuShowYn = false"  @report="report" @editable="editable" @bloc="bloc" :contentsInfo="contentsEle" :contentType="contentsEle.jobkindId" :contentOwner="this.GE_USER.userKey === contentsEle.creUserKey"/>
<gConfirmPop :confirmText='mConfirmText' :confirmType='mConfirmType' v-if="mConfirmPopShowYn" @ok="confirmOk" @no='mConfirmPopShowYn=false'/>
</template>
<script>
import memoCompo from './D_contBoxMemo.vue'
import { onMessage } from '../../../assets/js/webviewInterface'
export default {
  components: {
    memoCompo
  },
  props: {
    contentsEle: {},
    propDetailYn: {}
  },
  data () {
    return {
      mContMenuShowYn: false,
      mConfirmText: '',
      mConfirmType: 'one',
      mConfirmPopShowYn: false,
      mCurrentConfirmType: '',
      mContentsSharLink: null
    }
  },
  mounted () {
    this.setContentsMoreText()
  },
  created () {
    if (!this.contentsEle.copyTextStr) {
      this.copyText()
    }
  },
  methods: {
    memoEmitFunc (emitData) {
      var type = emitData.targetType
      var data = emitData.value
      if (type === 'goUserProfile') {
        this.goUserProfile(data.creUserKey)
      } else if (type === 'goContentsDetail') {
        this.goContentsDetail()
      }
    },
    confirmOk () {
      var toastText = ''
      this.mConfirmType = 'timeout'
      if (this.mCurrentConfirmType === 'BLOC') {
        var param = {}
        param.claimType = 'BLOC'
        if (this.contentsEle.contentsKey) {
          param.targetKind = 'C'
          param.targetKey = this.contentsEle.contentsKey
        } else return false
        param.creUserKey = this.GE_USER.userKey
        toastText = '해당 유저를 차단했습니다.'
        this.saveActAxiosFunc(param, toastText)
      // } else if (this.currentConfirmType === 'memoDEL') {
      //   this.deleteMemo({ memoKey: this.tempData.memoKey })
      //   this.$emit('showToastPop', '댓글을 삭제하였습니다.')
      // } else if (this.mCurrentConfirmType === 'alimDEL') {
      //   this.$emit('showToastPop', '알림을 나에게서 삭제하였습니다.')
      //   this.deleteAlim()
      // } else if (this.mCurrentConfirmType === 'boardDEL') {
      //   this.$emit('showToastPop', '게시글을 삭제하였습니다.')
      //   this.deleteAlim()
      // } else if (this.mCurrentConfirmType === 'alimCancel') {
      //   this.alimCancle()
      }

      this.mCurrentConfirmType = ''
      this.mConfirmPopShowYn = false
    },
    bloc (type) {
      var typeText = type === 'user' ? '유저를' : '게시글을'
      this.mConfirmText = '해당 ' + typeText + ' 차단하시겠습니까?'
      this.mConfirmType = 'two'
      this.mConfirmPopShowYn = true
      this.mCurrentConfirmType = 'BLOC'
    },
    report (type) {
      var targetKind
      var targetKey
      var toastText
      if (type === 'ALIM') {
        targetKind = 'C'
        targetKey = this.contentsEle.contentsKey
        toastText = '해당 알림이 신고되었습니다.'
      } else if (type === 'BOAR') {
        targetKind = 'C'
        targetKey = this.contentsEle.contentsKey
        toastText = '해당 게시글이 신고되었습니다.'
      } else if (type === 'MEMO') {
        targetKind = 'C'
        targetKey = this.contentsEle.memoKey
        toastText = '해당 댓글이 신고되었습니다.'
      } else if (type === 'CHANNEL') {
        targetKind = 'T'
        targetKey = this.contentsEle.creTeamKey
        toastText = '해당 채널이 신고되었습니다.'
      } else if (type === 'USER') {
        targetKind = 'U'
        targetKey = this.contentsEle.creUserKey
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
          url: 'service/tp.saveActLog',
          param: param
        })
        if (result.data.result === true) {
          this.$showToastPop(toastText)
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.mContMenuShowYn = false
      }
    },
    contentMenuClick () {
      this.mContMenuShowYn = true
    },
    /** 컨텐츠의 크기를 비교해서 더보기> 버튼 보여주는 함수 */
    async setContentsMoreText () {
      // 컨텐츠가 게시글이면서 권한이 없으면 리턴
      // if (!window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey)) return
      if (this.contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(this.contentsEle.shareItem).V === false && this.contentsEle.creUserKey !== this.GE_USER.userKey) return
      try {
        // 이미지를 불러오는 이유는 마운트 시점에 이미지의 크기를 못받오기에 추가함
        if (this.propDetailYn === true) { this.alimBigView(); return }
        var contents = await window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey).offsetHeight
        var imgList = await window.document.querySelectorAll('#bodyFullStr' + this.contentsEle.contentsKey + ' img')
        var bodyMoreText = await window.document.getElementById('bodyMore' + this.contentsEle.contentsKey)
        if (contents > 400 || imgList.length > 0) {
          bodyMoreText.style.display = 'block'
        }
      } catch (e) {
        console.log(e)
      }
    },
    alimBigView () {
      var contentsBodyBoxArea = window.document.getElementById('contentsBodyBoxArea' + this.contentsEle.contentsKey)
      var bodyMoreArea = window.document.getElementById('bodyMore' + this.contentsEle.contentsKey)
      contentsBodyBoxArea.style.maxHeight = '100%'
      bodyMoreArea.style.display = 'none'
    },
    contentsSharePop () {
      var shareItem = { title: '더알림', text: this.contentsEle.title, url: this.contentsEle.copyTextStr }
      console.log(this.contentsEle)
      if (navigator.share) {
        navigator.share(shareItem)
      } else {
        onMessage('REQ', 'nativeShare', shareItem)
      }
      /*  if (window.navigator.share) {
        window.navigator.share({ title: '더알림', text: this.contentsEle.title, url: this.contentsEle.copyTextStr })
      } else {
        this.$showToastPop('지원하지 않는 브라우저입니다.')
      } */
    },
    goChannelMain () {
      console.log(this.contentsEle)
      var openPopParam = {}
      openPopParam.targetKey = this.contentsEle.creTeamKey
      openPopParam.targetType = 'chanDetail'
      // targetContentsKey키를 주면 스크롤 이벤트가 작동
      // openPopParam.targetContentsKey = this.contentsEle.contentsKey
      this.$emit('openPop', openPopParam)
    },
    goUserProfile (memoUserKey) {
      console.log(this.contentsEle)
      var openPopParam = {}
      openPopParam.targetKey = this.contentsEle.creTeamKey
      openPopParam.teamKey = this.contentsEle.creTeamKey
      openPopParam.targetType = 'bookMemberDetail'
      openPopParam.userKey = this.contentsEle.creUserKey

      // 댓글의 유저를 클릭 시 댓글의 유저키를 넣어준다.
      if (memoUserKey) openPopParam.userKey = memoUserKey
      openPopParam.popHeaderText = '프로필'
      openPopParam.readOnlyYn = true

      this.$emit('openPop', openPopParam)
    },
    goContentsDetail () {
      console.log(this.contentsEle)
      var openPopParam = {}
      openPopParam.targetType = 'contentsDetail'
      openPopParam.targetKey = this.contentsEle.contentsKey
      openPopParam.teamKey = this.contentsEle.creTeamKey
      openPopParam.jobkindId = this.contentsEle.jobkindId

      if (this.contentsEle.jobkindId === 'ALIM') {
        openPopParam.popHeaderText = this.contentsEle.nameMtext
      } else if (this.contentsEle.jobkindId === 'BOAR') {
        openPopParam.popHeaderText = this.contentsEle.cabinetNameMtext
      }
      if (this.contentsEle.officialYn) {
        openPopParam.officialYn = this.contentsEle.officialYn
      }
      openPopParam.value = this.contentsEle

      this.$emit('openPop', openPopParam)
    },
    async changeAct (act, key) {
      // eslint-disable-next-line no-unused-vars
      var result = null
      var saveYn = true
      var changeUserDoList = []
      var tempDetail = this.contentsEle
      if (!tempDetail.D_CONT_USER_DO) {
        tempDetail.D_CONT_USER_DO = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }, { doType: 'RE', doKey: false }]
      }
      changeUserDoList = tempDetail.D_CONT_USER_DO
      for (var i = 0; i < changeUserDoList.length; i++) {
        if (changeUserDoList[i].doType === act.doType) {
          if (changeUserDoList[i].doKey === 1) return
        }
      }
      // this.pushDetail = JSON.parse(this.propParams).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = this.contentsEle.contentsKey
      if (param.targetKey === null) { return }
      param.doType = act.doType
      param.userName = this.$changeText(this.GE_USER.userDispMtext)
      if (saveYn === false) {
        param.doKey = act.doKey
        result = await this.$saveUserDo(param, 'delete')
        if (act.doType === 'LI') {
          tempDetail.likeCount -= 1
        }
        for (i = 0; i < changeUserDoList.length; i++) {
          if (changeUserDoList[i].doType === act.doType) {
            changeUserDoList[i].doKey = 0
          }
        }
        tempDetail.D_CONT_USER_DO = changeUserDoList
      } else {
        param.actYn = true
        param.targetKind = 'C'
        var this_ = this
        this.$saveUserDo(param, 'save').then(result => {
          // eslint-disable-next-line no-debugger
          debugger
          for (var d = changeUserDoList.length - 1; d >= 0; d--) {
            if (changeUserDoList[d].doType === act.doType) {
              changeUserDoList[d].doKey = result.doKey
            }
          }
          // temp.push({ doType: act.doType, doKey: result.doKey })
          tempDetail.D_CONT_USER_DO = changeUserDoList
          tempDetail.likeCount = result.likeCount
          tempDetail.starCount = result.starCount
          this_.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', [tempDetail])
        })
        for (var d = changeUserDoList.length - 1; d >= 0; d--) {
          if (changeUserDoList[d].doType === act.doType) {
            changeUserDoList[d].doKey = 1
          }
        }
        if (act.doType === 'LI') {
          tempDetail.likeCount += 1
        }
        if (act.doType === 'ST') {
          tempDetail.starCount += 1
        }
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', [tempDetail])
        // }
      }
    },
    copyText (contentsKey, jobkindId, index, titleMsg, teamName, cabName) {
      // var text = document.querySelector('#copyTextBody' + contentsKey).dataset.clipboardText
      var title = '[' + this.$changeText(teamName) + ']'
      if (cabName) {
        title += this.$changeText(cabName)
      }
      var message = titleMsg
      var link = null
      // if (!text) {
      if (jobkindId === 'BOAR') {
        link = this.$makeShareLink(contentsKey, 'contentsDetail', message, title)
      } else {
        link = this.$makeShareLink(contentsKey, 'contentsDetail', message, title)
      }
      var contentsDetail = this.contentsEle
      contentsDetail.copyTextStr = link
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [contentsDetail])
      // this.contentsList[index].copyText = link
      // }
      /* setTimeout(() => {
            var clip = new ClipboardJS('#copyTextBody' + contentsKey)
            var _this = this
            clip.on('success', function (e) {
                _this.confirmText = '알림링크가 복사되었습니다!'
                _this.confirmPopShowYn = true
            })
        }, 300) */
    },
    async subScribeContents () {
      // eslint-disable-next-line no-unused-vars
      var result = null
      var subsYn = this.contentsEle.subsYn
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = this.contentsEle.contentsKey
      param.targetKind = 'C'
      if (param.targetKey === null) { return }
      if (subsYn !== null && subsYn !== undefined) {
        param.subsYn = !subsYn
      } else {
        param.subsYn = true
      }
      param.userKey = this.GE_USER.userKey
      // var req = 'save'
      var reqText = ' 되었습니다.'
      if (!param.subsYn) {
        // req = 'delete'
        reqText = ' 해제되었습니다.'
      }
      // eslint-disable-next-line no-redeclare
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveSubscribe',
        param: { subscribe: param }
      })
      this.$showToastPop('해당 컨텐츠의 알림설정이 ' + reqText)
      var contentsDetail = this.contentsEle
      contentsDetail.subsYn = param.subsYn
      this.$store.dispatch('D_CHANNEL/AC_ADD_CONTENTS', [contentsDetail])
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>

<style scoped>
.contentsCard{background: #FFFFFF; border-bottom: 2px solid #E1E1E1; display: flex; flex-direction: column;}

.contentsCardLogoArea{
    width: 45px; height: 45px; overflow: hidden; float: left; border-radius: 100%; border: 2px solid #5B1CFC; display: flex; justify-content: center; align-items: center;
}
.h-400max{
  max-height: 400px;
}
.overHidden{
  overflow: hidden;
}
</style>
