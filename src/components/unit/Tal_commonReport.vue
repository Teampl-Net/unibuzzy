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

</template>

<script>
export default {
  props: {
    contentType: { type: String, default: 'alim' },
    contentOwner: { type: Boolean, default: false }
  },
  data () {
    return {
      contentText: ''
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
    emit (type) {
      this.$emit('editable', type)
    },
    report (type) {
      if (type === 'content') {
        type = this.contentType
      }
      this.$emit('report', type)
    }
  }
}
</script>

<style>

</style>
