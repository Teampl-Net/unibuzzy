<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div style="width: 100%; float: left;">
    <div style="width:100%; height:100%; position:fixed; top:0; left:0; background:#00000050; z-index:9999" @click="closePop()"></div>
    <div v-show="reportPopStep === 0" class="reportCompoArea" style="margin: 1rem 0rem;">
      <div class="fl " style="width: 100%; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
      <!--  <p class="fl font16 w-100P commonColor" style="min-height:50px; line-height:50px; " @click="emit('sendPush')" v-if="contentOwner && contentType !== 'ALIM'" >알림으로 공유</p> -->
        <p class="fl font16 w-100P commonColor" style="min-height:50px; line-height:50px; " @click="emit('move')" v-if="contentOwner && contentType === 'BOAR'" >{{contentText}} 이동</p>
        <p class="fl font16 w-100P commonColor rowText" @click="emit('copy')" v-if="contentOwner && contentType === 'BOAR' " >{{contentText}} 복사</p>
        <p class="fl font16 w-100P commonColor rowText" @click="emit('edit')" v-if="contentOwner && contentType === 'BOAR'">{{contentText}} 수정</p>
        <p class="fl font16 w-100P commonColor rowText" @click="emit('writeBoard')" v-if="contentOwner && contentType === 'ALIM' " :style="contentType === 'ALIM' ? 'border-top:none;' : '' " >{{contentText}}을 게시글로 작성</p>
        <p class="fl font16 w-100P commonColor rowText" @click="emit('writeAlim')" v-if="contentOwner && contentType === 'BOAR'" >{{contentText}}을 알림으로 작성</p>
        <p class="fl font16 w-100P commonColor rowText" @click="emit('delete')" v-if="contentOwner || contentType === 'ALIM'" >{{contentType === 'ALIM' ? '나에게서만 ': ''}}{{contentText}} 삭제</p>
        <p class="fl font16 w-100P commonColor rowText" @click="emit('textCopy')" >내용 클립보드 복사</p>
        <!-- <p class="fl font16 w-100P commonColor rowText" @click="emit('subScribe')" >이 {{contentText}}에 대한 푸쉬알림 {{contentsInfo.subsYn? '끄기' : '켜기'}}</p> -->
        <!-- <p class="fl font16 w-100P commonColor " style="min-height:50px; line-height:50px; border-top: 1px solid #eee;" @click="emit('alimBloc')" v-if="contentOwner && contentType === 'ALIM'" >{{contentText}} 삭제</p> -->
        <!-- <p class="fl font16 w-100P commonColor " style="min-height:50px; line-height:50px; border-top: 1px solid #eee;" :style="contentType === 'ALIM' ? 'border: none  !important;' : '' " @click="emit('delete', true)" v-if="contentOwner || contentType === 'ALIM'" >{{contentType === 'ALIM' ? '모든 수신자에게서 ': ''}}{{contentText}} 회수</p> -->
        <p class="fl font16 w-100P menuListBase rowText" :style="contentType === 'ALIM' ? 'border-top: 1px solid #eee;' : ''" @click="report(contentType)" v-if="!contentOwner" >해당 {{contentText}} 신고</p>
        <p class="fl font16 w-100P menuListBase" style="border-top: 1px solid #eee;" @click="report('CHANNEL')" v-if="this.contentType === 'ALIM' && !contentOwner">채널 신고</p>
        <p class="fl font16 w-100P menuListBase" style="border-top: 1px solid #eee;" @click="report('USER')" v-if="(this.contentType === 'MEMO' || this.contentType === 'BOAR') && !contentOwner">유저 신고</p>
        <!-- <p class="fl font16 w-100P menuListBase" style="border-top: 1px solid #eee;" @click="bloc('channel')" v-if="this.contentType === 'ALIM' && !contentOwner">채널 차단</p> -->
        <p class="fl font16 w-100P menuListBase" style="border-top: 1px solid #eee;" @click="bloc('USER')" v-if="(this.contentType === 'MEMO' || this.contentType === 'BOAR') && !contentOwner">유저 차단</p>

      </div>

      <div class="fl mtop-05" @click="closePop()" style="width: 100%; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center;">
        <p class="fl font16 w-100P commonColor " style="min-height:50px; line-height:50px; " >
          취소
        </p>
      </div>
    </div>

    <div class="reportCompoArea" style="margin: 0rem; " v-if="reportPopStep === 1">
      <div class="fl w-100P reportHeader" >
        <img class="cursorP mleft-05" style="width: 10px; position: absolute; left:0.1rem; top:1rem;" @click="revReport()" src="../../assets/images/common/icon_back.png"/>
        <img class="fr cursorP mright-05" style="width: 1rem; position: absolute; right:0.5rem; top:1rem" @click="closePop()" src="../../assets/images/common/popup_close.png"/>
        <p class="fl font16 fontBold textLeft w-100P mtop-1">신고하는 사유를 선택해주세요.</p>
        <p class="fl lightGray font12 textLeft w-100P mtop-05 mbottom-1">회원님의 신고는 익명으로 처리 됩니다. 응급한 상황에 있다고 생각된다면 응급서비스 기관에 연락하시길 바랍니다.</p>
        <div class="fl w-100P" style="height: 300px; overflow: hidden scroll;">
          <div v-for="(data, index) in reportList" :key="index" @click="reportClick(data)" class="fl w-100P textLeft font14 commonColor reportCard" :style="index === 0 ? 'border-top:1px solid #eeeeee;': ''" >
            <p class="fl font14 mleft-1">{{data.reportTitle}}</p> <p class="fr font16">></p>
          </div>
        </div>
      </div>
    </div>

    <div class="reportCompoArea" style="margin: 0rem; " v-if="reportPopStep === 2">
      <div class="fl w-100P reportHeader">
        <img class="cursorP mleft-05" style="width: 10px; position: absolute; left:0.1rem; top:1rem;" @click="revReport()" src="../../assets/images/common/icon_back.png"/>
        <img class="cursorP mright-05" style="width: 1rem; position: absolute; right:0.1rem; top:1rem" @click="closePop()" src="../../assets/images/common/popup_close.png"/>
        <p class="fl font16 fontBold textLeft w-100P mtop-1">신고하는 사유: {{reportDetailTitle}}</p>
        <p class="fl lightGray font12 textLeft w-100P mtop-05 mbottom-1">회원님의 신고는 익명으로 처리 됩니다. 응급한 상황에 있다고 생각된다면 응급서비스 기관에 연락하시길 바랍니다.</p>
        <gBtnSmall class="mtop-1 "  v-on:click="sendBtnClick" btnTitle="제출하기"  />
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
    }
  },
  beforeUnmount () {
    this.$checkDeleteHistory('gRePortPop')
  },
  watch: {
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
  width:95%; position: fixed; bottom:0; left:2.5%; z-index:9999;
}
.menuListBase {
  min-height:50px; line-height:50px; color:red;
}

.rowText {min-height:50px; line-height:50px; border-bottom: 1px solid #eee;}
</style>
