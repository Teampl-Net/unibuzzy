<template>
    <div  :style="'padding-top:' + (this.$STATUS_HEIGHT + 60)+ 'px'" style="height: 100%; overflow: hidden scroll;">
        <gBtnLarge @click="goLoginPage" btnTitle="로그인하기"/>
    </div>
</template>
<script>
export default {
  methods: {
    goLoginPage () {
      this.$router.replace({ name: 'policies' })
    }
  }
}
</script>
<style scoped>

</style>
