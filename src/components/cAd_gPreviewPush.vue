<template>
   <div style=" width: 100%; height: 100%; position: fixed; top: 0; z-index: 99;">
     <div style="width: 375px;height: 667px; padding:0 1.5rem; padding-top: 0.7rem; left: 20rem; color: #FFFFFF; border-radius: 10px;border: 1px solid #ccc;background-color:  #ccc;z-index: 99; ">
        <div style="width: 100%; height: 3rem; text-align: center">
            <img src="../resource/images/icon_x.png" style="cursor:pointer; position: absolute; top: 1rem; left: 2rem" v-on:click="closePop" alt="">
            미리보기
        </div>
    </div>
   </div>
</template>

<script>
export default {
  methods: {
    closePop () {
      this.$emit('closePop')
    }
  }
}
</script>

<style scoped>

</style>
