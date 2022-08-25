<!-- eslint-disable no-irregular-whitespace -->
<template>
  <div style="width:100%; height:100%; position:fixed; top:0; left:0; background:#00000050; z-index:9999" @click="this.$emit('closePop')"></div>
  <div v-show="reportPopStep === 0" class="reportCompoArea" style="margin: 1rem 0rem;">
    <div class="fl " style="width: 100%; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
      <p class="fl font16 w-100P commonColor" style="min-height:50px; line-height:50px; " @click="emit('edit')" v-if="contentOwner && contentType !== 'alim'" >{{contentText}} 수정</p>
      <p class="fl font16 w-100P commonColor " style="min-height:50px; line-height:50px; border-top: 1px solid #eee;" :style="contentType === 'alim' ? 'border: none  !important;' : '' " @click="emit('delete')" v-if="contentOwner || contentType === 'alim'" >{{contentType === 'alim' ? '나에게서만 ': ''}}{{contentText}} 삭제</p>
      <p class="fl font16 w-100P menuListBase" :style="contentType === 'alim' ? 'border-top: 1px solid #eee;' : ''" @click="report('content')" v-if="!contentOwner" >해당 {{contentText}} 신고</p>
      <p class="fl font16 w-100P menuListBase" style="border-top: 1px solid #eee;" @click="report('channel')" v-if="this.contentType === 'alim' && !contentOwner">채널 신고</p>
      <p class="fl font16 w-100P menuListBase" style="border-top: 1px solid #eee;" @click="report('user')" v-if="this.contentType === 'board' && !contentOwner">유저 신고</p>
      <p class="fl font16 w-100P menuListBase" style="border-top: 1px solid #eee;" @click="report('user')" v-if="this.contentType === 'memo' && !contentOwner">유저 신고</p>
      <!-- <p class="fl font16 w-100P menuListBase" style="border-top: 1px solid #eee;" @click="bloc('channel')" v-if="this.contentType === 'alim' && !contentOwner">채널 차단</p> -->
      <p class="fl font16 w-100P menuListBase" style="border-top: 1px solid #eee;" @click="bloc('user')" v-if="(this.contentType === 'memo' || this.contentType === 'board') && !contentOwner">유저 차단</p>

    </div>

    <div class="fl mtop-05" @click="this.$emit('closePop')" style="width: 100%; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center;">
      <p class="fl font16 w-100P commonColor " style="min-height:50px; line-height:50px; " >
        취소
      </p>
    </div>
  </div>

  <div class="reportCompoArea" style="margin: 0rem; " v-if="reportPopStep === 1">
    <div class="fl w-100P reportHeader" >
      <img class="cursorP mleft-05" style="width: 10px; position: absolute; left:0.1rem; top:1rem;" @click="revReport()" src="../../assets/images/common/icon_back.png"/>
      <img class="fr cursorP mright-05" style="width: 1rem; position: absolute; right:0.5rem; top:1rem" @click="this.$emit('closePop')" src="../../assets/images/common/popup_close.png"/>
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
      <img class="cursorP mright-05" style="width: 1rem; position: absolute; right:0.1rem; top:1rem" @click="this.$emit('closePop')" src="../../assets/images/common/popup_close.png"/>
      <p class="fl font16 fontBold textLeft w-100P mtop-1">신고하는 사유: {{reportDetailTitle}}</p>
      <p class="fl lightGray font12 textLeft w-100P mtop-05 mbottom-1">회원님의 신고는 익명으로 처리 됩니다. 응급한 상황에 있다고 생각된다면 응급서비스 기관에 연락하시길 바랍니다.</p>
      <gBtnSmall class="mtop-1 "  v-on:click="sendBtnClick" btnTitle="제출하기"  />
    </div>
  </div>

</template>

<script>
/* eslint-disable */
export default {
  props: {
    contentType: { type: String, default: 'alim' },
    contentOwner: { type: Boolean, default: false }
  },
  data () {
    return {
      contentText: '',
      reportList: [{ type: '', reportTitle: '스팸' }, { type: 'si', reportTitle: '나체 이미지 또는 성적 행위' }, { type: 'mu', reportTitle: '마음에 들지 않습니다.' }, { type: 'at', reportTitle: '사기 또는 거짓' }
      , { type: 'at', reportTitle: '혐오 발언 또는 상징' }, { type: 'at', reportTitle: '따돌림 또는 괴롭힘' }, { type: 'at', reportTitle: '폭력' }, { type: 'at', reportTitle: '기타 문제' }],
      reportPopStep: 0,
      reportType: '',
      reportDetailType: '',
      reportDetailTitle: ''
    }
  },
  mounted () {
    if (this.contentType === 'alim') {
      this.contentText = '알림'
    } else if (this.contentType === 'board') {
      this.contentText = '게시글'
    } else if (this.contentType === 'memo') {
      this.contentText = '댓글'
    }
  },
  methods: {
    revReport(){
      this.reportPopStep -= 1
    },
    sendBtnClick () {
      this.$emit('report', this.reportType)
    },
    emit (type) {
      this.$emit('editable', type)
    },
    bloc (type) {
      this.$emit('bloc', type)
    },
    report (type) {
      if (type === 'content') {
        type = this.contentType
      }
      this.reportType = type
      this.reportPopStep += 1
    },
    reportClick (data) {
      this.reportDetailTitle = data.reportTitle
      this.reportDetailType = data.type
      this.reportPopStep += 1

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

</style>
