<template>
  <gConfirmPop :confirmText="'로그아웃 하시겠습니까?'" @ok="goLogout"  @no="closePop" />
</template>
<script>
export default {
  data () {
    return {
      okBtn: '확인',
      cancelBtn: '취소'
    }
  },
  methods: {
    goLogout () {
      this.$emit('goLogout')
    },
    closePop () {
      this.$emit('closePop')
    }
  }
}
</script>
<style scoped>

</style>
