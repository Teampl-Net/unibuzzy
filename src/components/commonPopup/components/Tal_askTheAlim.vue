<template>
<div class="pagePaddingWrap" style="display: flex; flex-direction: column; text-align: left; height: 100vh;">
  <div style="width: 100%; height: 80%; margin-bottom: 3rem;">
    <select class="askBoxWrap">
      <option class="askCommonFont">문의 유형</option>
    </select>
    <input type="text" class="askBoxWrap askCommonFont mtop-1" v-model="askTitle" placeholder="제목"/>
    <textarea class="askBoxWrap askCommonFont mtop-1 ptop-1" v-model="askBody" style="padding-top: 0.5rem;" name="" id="" cols="30" rows="10" placeholder="내용을 입력해 주세요."></textarea>
    <div style="background-color: #A9AACD; width: 80px; height: 80px; margin-top: 0.5rem; padding: 0.7rem 0; border-radius: 5px; position: relative; text-align: center;">
      <img style="width: 2.5rem;" src="../../../assets/images/common/icon_attach.png" alt="">
      <p style="color: #FFFFFF; font-size: 15px; margin-top: 0.5rem">첨부하기</p>
    </div>
  </div>
  <gBtnLarge v-on:click="closeXPop()" :btnTitle="this.completeBtnTitle" style=""/>
</div>
</template>

<script>
export default {
  data () {
    return {
      completeBtnTitle: '완료',
      askTitle: '',
      askBody: ''
    }
  },
  mounted () {
  },
  props: {
  },
  methods: {
    closeXPop () {
      // eslint-disable-next-line no-new-object
      var message = new Object()
      message.title = this.askTitle
      message.body = this.askBody
      // alert(channel.masterTel)
      // eslint-disable-next-line no-new-object
      // eslint-disable-next-line no-debugger
      debugger
      this.$axios.post('/send', { message }
      // this.$axios.post('/onapt/onapt/onapt.getBoardInfo', { param: this.param }
      ).then(response => {
        // alert(response)
        console.warn(response)
        this.$emit('closeXPop')
      }).catch((ex) => {
        // alert(ex)
        console.warn('ERROR!!!!! : ', ex)
      })
    }
  }
}
</script>
<style scoped>
.askCommonFont{color: #303030; font-size: 15px;}
.askBoxWrap{width: 100%; min-height: 50px; border-radius: 5px; border: 1px solid #CFCFCF; padding: 0 0.5rem}
</style>
