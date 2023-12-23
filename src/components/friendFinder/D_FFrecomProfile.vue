<!-- recommended profile 추천 프로필 -->
<template>
  <div v-if="pRecom" class="w100P h100P fl" style="padding: 10px; background: #fff;">
    <div class="h100P fl" style="width: 60px; ">
      <div class="fl imgCircle"></div>
    </div>
    <div class="h100P fl" style="width: calc(100% - 60px); display: flex; align-items: center; flex-direction: column;">
      <div class="w100P fl" style="height: 30px; line-height: 30px;">
        <div class="fl font18" style="margin-right: 10px;">{{ pRecom.name }}</div>
        <div class="fl font16">{{ pRecom.year }} | {{ pRecom.major }} | {{ pRecom.class }}</div>
      </div>
      <div class="w100P fl" style="height: 20px;">
        <img class="fl" src="" /><p class="fl font16">{{ pRecom.purpose }}</p>
      </div>
      <div class="w100P fl font16" style="height: 20px; margin-bottom: 10px;">
        <img class="fl" src="" /><p class="fl font16">{{ pRecom.location }}</p>
      </div>
      <div class="fl w100P" style="height: 50px; line-height: 50px; border: 1px solid black;">Send Request</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pRecom: {}
  },

  data () {
    return {

    }
  },
  created () {
    console.log('pRecom', this.pRecom)
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
