<i18n>
{
  "ko": {
    "REPO_TITLE_REPORT": "신고하는 사유를 선택해주세요.",
    "REPO_MSG_DESC": "회원님의 신고는 익명으로 처리 됩니다. 응급한 상황에 있다고 생각된다면 응급서비스 기관에 연락하시길 바랍니다.",
    "REPO_TITLE_REASON": "신고하는 사유:",
    "REPO_MSG_SPAM": "스팸",
    "REPO_MSG_NUDE": "나체 이미지 또는 성적 행위",
    "REPO_MSG_NOLIKE": "마음에 들지 않습니다.",
    "REPO_MSG_FALSE": "사기 또는 거짓",
    "REPO_MSG_HATE": "혐오 발언 또는 상징",
    "REPO_MSG_BULLY": "따돌림 또는 괴롭힘",
    "REPO_MSG_VIOLENCE": "폭력",
    "REPO_MSG_OTHER": "기타 문제",
    "REPO_BTN_SUBMIT": "제출하기"
  },
  "en": {
    "REPO_TITLE_REPORT": "Please select the reason for reporting.",
    "REPO_MSG_DESC": "Your report will be anonymous. If you think you are in an emergency situation, please contact the emergency service.",
    "REPO_TITLE_REASON": "Reason for reporting:",
    "REPO_MSG_SPAM": "Spam",
    "REPO_MSG_NUDE": "A nude image or sexual behavior",
    "REPO_MSG_NOLIKE": "I don't like it.",
    "REPO_MSG_FALSE": "Fraud or False",
    "REPO_MSG_HATE": "A hate speech or symbol",
    "REPO_MSG_BULLY": "Bullying or harassment",
    "REPO_MSG_VIOLENCE": "Violence",
    "REPO_MSG_OTHER": "Other issues",
    "REPO_BTN_SUBMIT": "Submit"
  }
}
</i18n>
<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div style="width: 100%; float: left;">
    <div style="width:100%; height:100%; position:fixed; top:0; left:0; background:#00000050; z-index:9999" @click="closePop()"></div>
    <div v-show="reportPopStep === 0" class="reportCompoArea" style="margin: 1rem 0rem;">
      <div class="fl " style="width: 100%; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
      <!--  <p class="fl font16 w100P commonColor" style="min-height:50px; line-height:50px; " @click="emit('sendPush')" v-if="contentOwner && contentType !== 'ALIM'" >알림으로 공유</p> -->
        <p class="fl font16 w100P commonColor rowText" style="min-height:50px; line-height:50px; " @click="emit('move')" v-if="contentOwner && contentType === 'BOAR'" >{{ $t('COMMON_BTN_MOVE_POST') }}</p>
        <p class="fl font16 w100P commonColor rowText" @click="emit('copy')" v-if="contentOwner && contentType === 'BOAR' " >{{ $t('COMMON_BTN_COPY_POST') }}</p>
        <p class="fl font16 w100P commonColor rowText" @click="emit('edit')" v-if="contentOwner && contentType === 'BOAR'">{{ $t('COMM_BTN_EDIT_POST') }}</p>
        <p class="fl font16 w100P commonColor rowText" @click="emit('writeBoard')" v-if="contentType === 'ALIM' " :style="contentType === 'ALIM' ? 'border-top:none;' : '' " >{{ $t('COMMON_BTN_CONVERT_NOTI_TO_POST') }}</p>
        <p class="fl font16 w100P commonColor rowText" @click="emit('writeAlim')" v-if="!GE_USER.unknownYn && contentType === 'BOAR'" >{{ $t('COMMON_BTN_CONVERT_POST_TO_NOTI') }}</p>
        <p class="fl font16 w100P commonColor rowText" @click="emit('delete')" v-if="contentOwner || contentType === 'ALIM'" >{{contentType === 'ALIM' ? $t('COMMON_BTN_DELTE_ALIM_FOR_ME'): $t('COMMON_BTN_DELETE_POST')}}</p>
        <p class="fl font16 w100P commonColor rowText" @click="emit('textCopy')" >{{ $t('COMMON_BTN_COPY_CLIPBOARD') }}</p>
        <!-- <p class="fl font16 w100P commonColor rowText" @click="emit('subScribe')" >이 {{contentText}}에 대한 푸쉬알림 {{contentsInfo.subsYn? '끄기' : '켜기'}}</p> -->
        <!-- <p class="fl font16 w100P commonColor " style="min-height:50px; line-height:50px; border-top: 1px solid #eee;" @click="emit('alimBloc')" v-if="contentOwner && contentType === 'ALIM'" >{{contentText}} 삭제</p> -->
        <!-- <p class="fl font16 w100P commonColor " style="min-height:50px; line-height:50px; border-top: 1px solid #eee;" :style="contentType === 'ALIM' ? 'border: none  !important;' : '' " @click="emit('delete', true)" v-if="contentOwner || contentType === 'ALIM'" >{{contentType === 'ALIM' ? '모든 수신자에게서 ': ''}}{{contentText}} 회수</p> -->
        <p class="fl font16 w100P menuListBase rowText" :style="contentType === 'ALIM' ? 'border-top: 1px solid #eee;' : ''" @click="report(contentType)" v-if="!GE_USER.unknownYn && !contentOwner" >{{ contentText === '게시글'? $t('COMMON_BTN_REPORT_POST'):$t('COMMON_BTN_REPORT_NOTI') }}</p>
        <p class="fl font16 w100P menuListBase" style="border-top: 1px solid #eee;" @click="report('CHANNEL')" v-if="this.contentType === 'ALIM' && !contentOwner">{{ $t('COMMON_BTN_REPORT_CHAN') }}</p>
        <p class="fl font16 w100P menuListBase" style="border-top: 1px solid #eee;" @click="report('USER')" v-if="!GE_USER.unknownYn && (this.contentType === 'MEMO' || this.contentType === 'BOAR') && !contentOwner">{{ $t('COMMON_BTN_REPORT_USER') }}</p>
        <!-- <p class="fl font16 w100P menuListBase" style="border-top: 1px solid #eee;" @click="bloc('channel')" v-if="this.contentType === 'ALIM' && !contentOwner">채널 차단</p> -->
        <p class="fl font16 w100P menuListBase" style="border-top: 1px solid #eee;" @click="bloc('USER')" v-if="!GE_USER.unknownYn && (this.contentType === 'MEMO' || this.contentType === 'BOAR') && !contentOwner">{{ $t('COMMON_BTN_BLOCK_USER') }}</p>

      </div>

      <div class="fl mtop-05" @click="closePop()" style="width: 100%; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center;">
        <p class="fl font16 w100P commonColor " style="min-height:50px; line-height:50px; " >
          {{ $t('COMM_BTN_CLOSE') }}
        </p>
      </div>
    </div>

    <div class="reportCompoArea" style="margin: 0rem; " v-if="reportPopStep === 1">
      <div class="fl w100P reportHeader" >
        <img class="cursorP mleft-05" style="width: 10px; position: absolute; left:0.1rem; top:1rem;" @click="revReport()" src="../../assets/images/common/icon_back.png"/>
        <img class="fr cursorP mright-05" style="width: 1rem; position: absolute; right:0.5rem; top:1rem" @click="closePop()" src="../../assets/images/common/popup_close.png"/>
        <p class="fl font16 fontBold textLeft w100P mtop-1">{{ $t('REPO_TITLE_REPORT') }}</p>
        <p class="fl lightGray font12 textLeft w100P mtop-05 mbottom-1">{{ $t('REPO_MSG_DESC') }}</p>
        <div class="fl w100P" style="height: 390px; overflow: hidden scroll; display:flex; flex-direction:column;">
          <div v-for="(data, index) in reportList" :key="index" @click="reportClick(data)" class="fl w100P textLeft font14 commonColor reportCard" :style="index === 0 ? 'border-top:1px solid #eeeeee;': ''" >
            <p class="fl font14 mleft-1">{{data.reportTitle}}</p> <p class="fr font16">></p>
          </div>
        </div>
      </div>
    </div>

    <div class="reportCompoArea" style="margin: 0rem; " v-if="reportPopStep === 2">
      <div class="fl w100P reportHeader">
        <img class="cursorP mleft-05" style="width: 10px; position: absolute; left:0.1rem; top:1rem;" @click="revReport()" src="../../assets/images/common/icon_back.png"/>
        <img class="cursorP mright-05" style="width: 1rem; position: absolute; right:0.1rem; top:1rem" @click="closePop()" src="../../assets/images/common/popup_close.png"/>
        <p class="fl font16 fontBold textLeft w100P mtop-1">{{ $t('REPO_TITLE_REASON') }} {{reportDetailTitle}}</p>
        <p class="fl lightGray font12 textLeft w100P mtop-05 mbottom-1">{{ $t('REPO_MSG_DESC') }}</p>
        <gBtnSmall class="mtop-1 "  v-on:click="sendBtnClick" :btnTitle="$t('REPO_BTN_SUBMIT')"  />
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    contentType: { type: String, default: 'ALIM' },
    contentOwner: { type: Boolean, default: false },
    contentsInfo: {}
  },
  data () {
    return {
      contentText: '',
      reportList: [{ type: '', reportTitle: '스팸' }, { type: 'si', reportTitle: '나체 이미지 또는 성적 행위' }, { type: 'mu', reportTitle: '마음에 들지 않습니다.' }, { type: 'at', reportTitle: '사기 또는 거짓' }, { type: 'at', reportTitle: '혐오 발언 또는 상징' }, { type: 'at', reportTitle: '따돌림 또는 괴롭힘' }, { type: 'at', reportTitle: '폭력' }, { type: 'at', reportTitle: '기타 문제' }],
      reportPopStep: 0,
      reportType: '',
      reportDetailType: '',
      reportDetailTitle: ''
    }
  },
  mounted () {
    console.log(this.contentsInfo)
    if (this.contentType === 'ALIM') {
      this.contentText = '알림'
    } else if (this.contentType === 'BOAR') {
      this.contentText = '게시글'
    } else if (this.contentType === 'MEMO') {
      this.contentText = '댓글'
    }
    this.$addHistoryStack('gRePortPop')
  },
  methods: {
    sendBtnClick () {
      this.emitFunc({ type: 'report', option: this.reportType })
    },
    emit (type) {
      this.emitFunc({ type: 'editable', option: type })
    },
    bloc (type) {
      this.emitFunc({ type: 'bloc', option: type })
    },
    report (type) {
      if (type === 'content') {
        type = this.contentType
      }
      this.reportType = type
      this.reportPopStep += 1
    },
    revReport () {
      this.reportPopStep -= 1
    },
    reportClick (data) {
      this.reportDetailTitle = data.reportTitle
      this.reportDetailType = data.type
      this.reportPopStep += 1
    },
    emitFunc (emitObj) {
      this.$emit(emitObj.type, emitObj.option)
    },
    closePop () {
      this.$emit('closePop')
    }
  },
  computed: {
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
      // return this.$store.getters['D_USER/GE_USER']
    },
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  beforeUnmount () {
    this.$checkDeleteHistory('gRePortPop')
  },
  watch: {
    GE_LOCALE: {
      immediate: true,
      handler (value) {
        this.reportList = [{ type: '', reportTitle: this.$t('REPO_MSG_SPAM') }, { type: 'si', reportTitle: this.$t('REPO_MSG_NUDE') }, { type: 'mu', reportTitle: this.$t('REPO_MSG_NOLIKE') }, { type: 'at', reportTitle: this.$t('REPO_MSG_FALSE') }, { type: 'at', reportTitle: this.$t('REPO_MSG_HATE') }, { type: 'at', reportTitle: this.$t('REPO_MSG_BULLY') }, { type: 'at', reportTitle: this.$t('REPO_MSG_VIOLENCE') }, { type: 'at', reportTitle: this.$t('REPO_MSG_OTHER') }]
      },
      deep: true
    },
    pageUpdate () {
      var history = this.$store.getters['D_HISTORY/hStack']
      if (history[history.length - 1] === 'gRePortPop') {
        this.closePop()
      }
    }
  }
}
</script>

<style>
.reportCard {
  padding:10px 0; border-bottom:1px solid #eeeeee; display: flex; align-items: center; justify-content: space-between;
}
.reportHeader {
  padding:2rem 10px; background:#ffffff; border-radius:10px 10px 0 0; min-height:100px; display: flex; justify-content: center; align-items: center; flex-direction: column;
}
.reportCompoArea {
  width:95%; position: fixed; bottom:60px; left:2.5%; z-index:9999;
}
.menuListBase {
  min-height:50px; line-height:50px; color:red;
}

.rowText {min-height:50px; line-height:50px; border-bottom: 1px solid #eee;}
</style>
