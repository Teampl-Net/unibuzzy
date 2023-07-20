<template>
  <gConfirmPop confirmText="Are you sure you want to sign out?" @ok="goLogout"  @no="closePop" />
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
