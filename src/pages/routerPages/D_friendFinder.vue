<template>
  <div class="w100P h100P fl" style="overflow: hidden; z-index: 99;" :style="'margin-top:' + (this.$STATUS_HEIGHT + 50)+ 'px; padding-bottom: 80px;'">
  <creFriendFinder style="width: 90%; height: 90%; position: absolute; left: 5%; top: 5%;" v-if="mCreFriendFinderShowYn" :pClosePop="closeCreFriendFinder" />
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
      <div class="w100P fl" style="height: calc(100% - 60px); background: #6FE0EF; overflow: hidden auto; display: flex; flex-direction: column; flex-wrap: nowrap; padding: 10px;">
        <recomProfile v-for="(recom, i) in mMatchRecommendList" :pRecom="recom" :key="i" class="fl w100P" style="margin-bottom: 20px; height: 180px; flex: 0 0 auto; border-radius: 10px;" />
      </div>
    </div>
    <img @click="openCreFriendFinder" src="../../assets/images/button/Icon_CreChanBtn.png" style="position: absolute; cursor: pointer; right: 10%;" :style="'bottom:' + (this.$STATUS_HEIGHT + 60)+ 'px'" class="img-78 img-w66">
  </div>
</template>

<script>
import matchProfile from '../../components/friendFinder/D_FFmatchProfile.vue'
import recomProfile from '../../components/friendFinder/D_FFrecomProfile.vue'
import creFriendFinder from '../../components/friendFinder/D_FFcreateNew.vue'
export default {
  data () {
    return {
      mCreFriendFinderShowYn: false,
      mMatchRequestList: [
        { name: 'Selena Do', pronoun: '(she/her)', year: '2nd', major: 'CM', class: "CO 23'" },
        { name: 'Jeremy Parson', pronoun: '(he/him)', year: '3rd', major: 'BME', class: "CO 25'" },
        { name: 'Emma Watson', pronoun: '(they/them)', year: '1st', major: 'CS', class: "CO 24'" },
        { name: 'Emma Watson', pronoun: '(they/them)', year: '1st', major: 'CS', class: "CO 24'" },
        { name: 'Emma Watson', pronoun: '(they/them)', year: '1st', major: 'CS', class: "CO 24'" }
      ],
      mMatchRecommendList: [
        { name: 'Selena Do', pronoun: '(she/her)', year: '2nd', major: 'CM', class: "CO 23'", purpose: 'Study Buddy', location: 'Price Gilbert' },
        { name: 'Jeremy Parson', pronoun: '(he/him)', year: '3rd', major: 'BME', class: "CO 25'", purpose: 'Study Buddy', location: 'Crosland' },
        { name: 'Emma Watson', pronoun: '(they/them)', year: '1st', major: 'CS', class: "CO 24'", purpose: 'Gym Buddy', location: 'CRC' },
        { name: 'Emma Watson', pronoun: '(they/them)', year: '1st', major: 'CS', class: "CO 24'", purpose: 'Study Buddy', location: 'Culc' },
        { name: 'Emma Watson', pronoun: '(they/them)', year: '1st', major: 'CS', class: "CO 24'", purpose: 'Lunch Buddy', location: 'West Village' }
      ]
    }
  },

  mounted () {

  },
  methods: {
    openCreFriendFinder () {
      this.mCreFriendFinderShowYn = true
    },
    closeCreFriendFinder () {
      this.mCreFriendFinderShowYn = false
    }
  },
  components: {
    matchProfile,
    recomProfile,
    creFriendFinder
  }
}
</script>

<style lang="scss" scoped>

</style>
