<template>
  <div class="modalShadow">
    <div id="" ref="" class="modalCard">
        <div style="border-bottom: 1px solid #ccc; min-height: 40px; font-size: 20px; font-weight:bold; text-align: left">{{this.params.titleText}}</div>
        <div style="min-height: 150px; font-size: 15px;text-align: left;margin-top: 1rem;">{{this.params.bodyText}}</div>
        <div v-on:click="closeXPushPop" style="width: 100px; height: 30px; border:1px solid #ccc; border-radius: 5px;">닫기</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    params: {}
  },
  mounted () {
  },
  components: {
  },
  methods: {
    closeXPushPop () {
      this.$emit('closeXPushPop')
    }
  }
}
</script>

<style scoped>
.modalShadow{width: 100vw;height: 100vh;position: fixed;top: 0px;left: 0px; background-color: #0003; display: flex; align-items: center; justify-content: center;}
.modalCard{width: 80%; height: 300px; background-color: #FFFFFF; padding: 1rem 1.5rem; border-radius: 15px;}
</style>
