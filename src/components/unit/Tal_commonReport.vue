<template>
  <div style="width:100%; height:100%; position:fixed; top:0; left:0; background:#00000050; z-index:99" @click="this.$emit('closePop')"></div>
  <div style="width:95%; position: fixed; bottom:0; left:2.5%; z-index:99; margin: 1rem 0rem;">
    <div class="fl " style="width: 100%; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
      <p class="fl font16 w-100P " style="min-height:50px; line-height:50px; color:red;" @click="report('content')" >해당 {{contentText}} 신고</p>
      <p class="fl font16 w-100P" style="min-height:50px; line-height:50px; color:red; border-top: 1px solid #eee;" @click="report('channel')" v-if="this.contentType === 'alim'">채널 신고</p>
      <p class="fl font16 w-100P" style="min-height:50px; line-height:50px; color:red; border-top: 1px solid #eee;" @click="report('user')" v-if="this.contentType === 'board'">유저 신고</p>
      <p class="fl font16 w-100P" style="min-height:50px; line-height:50px; color:red; border-top: 1px solid #eee;" @click="report('user')" v-if="this.contentType === 'memo'">유저 신고</p>
    </div>

    <div class="fl mtop-05" @click="this.$emit('closePop')" style="width: 100%; background:#ffffff; border-radius:10px; min-height:50px; display: flex; justify-content: center; align-items: center;">
      취소
    </div>

  </div>

</template>

<script>
export default {
  props: {
    contentType: { type: String, default: 'alim' }
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
      this.contentText = '게시판'
    } else if (this.contentType === 'memo') {
      this.contentText = '댓글'
    }
  },
  methods: {
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
