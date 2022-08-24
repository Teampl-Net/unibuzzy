<template>
  <div style="width:100%; height:100%; position:fixed; top:0; left:0; background:#00000050; z-index:9999" @click="this.$emit('closePop')"></div>
  <div style="width:95%; position: fixed; bottom:0; left:2.5%; z-index:9999; margin: 1rem 0rem;">
    <div class="fl " style="width: 100%; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
      <p class="fl font16 w-100P commonColor" style="min-height:50px; line-height:50px; " @click="emit('edit')" v-if="contentOwner && contentType !== 'alim'" >{{contentText}} 수정</p>
      <p class="fl font16 w-100P commonColor " style="min-height:50px; line-height:50px; border-top: 1px solid #eee;" :style="contentType === 'alim' && !contentOwner  ? 'border: none; border-bottom: 1px solid #eee;' : '' " @click="emit('delete')" v-if="contentOwner || contentType === 'alim'" >
        {{contentType === 'alim' ? '나에게서만 ': ''}}{{contentText}} 삭제</p>
      <p class="fl font16 w-100P " style="min-height:50px; line-height:50px; color:red;" @click="report('content')" v-if="!contentOwner" >해당 {{contentText}} 신고</p>
      <p class="fl font16 w-100P" style="min-height:50px; line-height:50px; color:red; border-top: 1px solid #eee;" @click="report('channel')" v-if="this.contentType === 'alim' && !contentOwner">채널 신고</p>
      <p class="fl font16 w-100P" style="min-height:50px; line-height:50px; color:red; border-top: 1px solid #eee;" @click="report('user')" v-if="this.contentType === 'board' && !contentOwner">유저 신고</p>
      <p class="fl font16 w-100P" style="min-height:50px; line-height:50px; color:red; border-top: 1px solid #eee;" @click="report('user')" v-if="this.contentType === 'memo' && !contentOwner">유저 신고</p>
    </div>

    <div class="fl mtop-05" @click="this.$emit('closePop')" style="width: 100%; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center;">
      취소
    </div>
  </div>

  <div style="width:95%; position: fixed; top:5rem; left:2.5%; z-index:9999; margin: 1rem 0rem;" v-if="reportYn">
    <div class="fl " style="width: 100%; padding:2rem 0; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
      <p class="font16">신고하는 사유를 선택해주세요.</p>
      <select name="selectReportType" id="selectReportType" class="mtop-05" >
        <option value="A">나체 이미지</option>
        <option value="B">폭력물</option>
        <option value="C">자살 또는 자해</option>
        <option value="D">스팸</option>
        <option value="E">거짓정보</option>
        <option value="F"> 테러리즘</option>
        <option value="G"> 혐오발언 </option>
        <option value="H"> 기타 </option>
      </select>
      <!-- <select class="fr commonBlack" v-model="data.questionType" style="border: 1px solid #ccc; padding:0 5px" > <option v-for="(option, index) in options" :key="index" class="commonBlack" v-bind:value="option.value"> {{ option.text }} </option> </select> -->
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
      options: [{ value: 'su', text: '주관식' }, { value: 'si', text: '단일선택' }, { value: 'mu', text: '복수선택' }, { value: 'at', text: '첨부파일' }],
      reportYn: false,
      repotType: ''
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
    sendBtnClick () {
      this.$emit('report', this.repotType)
    },
    emit (type) {
      this.$emit('editable', type)
    },
    report (type) {
      this.reportYn = true
      if (type === 'content') {
        type = this.contentType
      }
      this.repotType = type
    }
  }
}
</script>

<style>

</style>
