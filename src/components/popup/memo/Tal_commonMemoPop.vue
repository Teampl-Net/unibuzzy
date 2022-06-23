<template>
    <div style="width: calc(100% ; border-radius: 15px 15px 0 0; left: 0px; height: 80px; padding: 15px 10px; box-shadow: 0 0 9px 4px #00000036; position: fixed; z-index: 9999; bottom: 0; background: #fff;">
      <textarea style="width: calc(100% - 45px); height: 100%; float: left; border: 1px solid #ccc; resize: none;" v-model="memoText" name="" id="" cols="30" rows="10"></textarea>
      <img @click="saveMemo" src="../../../assets/images/formEditor/addComment.svg" style="width: 40px; float: right; margin-top: 5px;" alt="">
    </div>
</template>

<script>
export default {
  data () {
    return {
      memoText: ''
    }
  },
  methods: {
    saveMemo () {
      this.$emit('saveMemoText', this.memoText)
    }
  }
}
</script>

<style scoped>

</style>
