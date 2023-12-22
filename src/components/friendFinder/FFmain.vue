<template>
  <div class="w100P h100P fl" style="overflow: hidden; z-index: 99;" :style="'margin-top:' + (this.$STATUS_HEIGHT + 50)+ 'px; padding-bottom: 80px;'">
    <div class="w100P fl font20 fontBold" style="height: 100px; line-height: 100px;">Find a uniBuddy Today!</div>
    <div class="w100P fl" style="height: 250px;">
      <div class="w100P fl textLeft font18" style="height: 30px; padding-left: 20px;">Your match requests</div>
      <div class="fl w100P" style="height: calc(100% - 30px); background: #6FE0EF; padding: 10px; overflow: auto hidden; display: flex; flex-wrap: nowrap;">
        <matchProfile v-for="(request, i) in mMatchRequestList" :pRequest="request" :key="i" class="fl h100P" style="margin-right: 20px; width: 180px; flex: 0 0 auto; border-radius: 10px;" />
      </div>
    </div>
    <div class="w100P fl" style="height: calc(100% - 350px);">
      <div class="w100P fl textLeft font18" style="height: 30px; padding-left: 20px;">Other matches for you</div>
      <div class="w100P fl textLeft font18" style="height: 30px; padding-left: 20px;">Filter By:</div>
      <div class="w100P fl" style="height: calc(100% - 60px); background: #6FE0EF;"></div>
    </div>
  </div>
</template>

<script>
import matchProfile from './FFmatchProfile.vue'
export default {
  data () {
    return {
      mMatchRequestList: [
        { name: 'Selena Do', pronoun: '(she/her)', year: '2nd', major: 'CM', class: "CO 23'" },
        { name: 'Jeremy Parson', pronoun: '(he/him)', year: '3rd', major: 'BME', class: "CO 25'" },
        { name: 'Emma Watson', pronoun: '(they/them)', year: '1st', major: 'CS', class: "CO 24'" },
        { name: 'Emma Watson', pronoun: '(they/them)', year: '1st', major: 'CS', class: "CO 24'" },
        { name: 'Emma Watson', pronoun: '(they/them)', year: '1st', major: 'CS', class: "CO 24'" }
      ]
    }
  },

  mounted () {

  },

  methods: {

  },
  components: {
    matchProfile
  }
}
</script>

<style lang="scss" scoped>

</style>
