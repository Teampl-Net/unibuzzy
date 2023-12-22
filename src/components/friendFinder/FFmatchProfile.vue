<template>
  <div v-if="pRequest" class="w100P h100P fl" style="padding: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #fff;">
    <div class="w100P fl" style="height: 50px; width: 50px; margin-bottom: 10px; border-radius: 100%; border: 1px solid black;"></div>
    <div class="w100P fl font18" style="height: 20px; line-height: 20px; ">{{ pRequest.name }}</div>
    <div class="w100P fl font14" style="height: 20px; line-height: 20px;">{{ pRequest.pronoun }}</div>
    <div class="w100P fl font16" style="height: 30px; line-height: 30px;">{{ pRequest.year }} | {{ pRequest.major }} | {{ pRequest.class }}</div>
    <div class="w100P fl font16" style="height: calc(100% - 130px); padding: 5px 10px;">
      <div class="w100P h100P" style="border: 1px solid black; display: flex; justify-content: center; align-items: center;">Accept Request</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pRequest: {}
  },

  data () {
    return {

    }
  },
  created () {
    console.log('pRequest', this.pRequest)
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
