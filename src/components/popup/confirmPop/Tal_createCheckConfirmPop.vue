<template>
  <gConfirmPop :confirmText="createText+'을 정말로 생성 하시겠습니까?'" @no='checkPopYn=false' v-if="checkPopYn" @ok='ok' />
  <gConfirmPop :confirmText="createText+'이 생성되었습니다.'" confirmType='timeout' v-if="okPopYn" />
</template>
<script>
export default {
  data () {
    return {
      checkPopYn:true,
      okPopYn:false,
    }
  },
  props: {
    // checkProp:{}
    createText:{}
  },
  methods: {
    ok(){
      this.okPopYn = true
      this.$emit('ok')
    }
  },
  computed: {
  },
}
</script>
<style scoped>

</style>
