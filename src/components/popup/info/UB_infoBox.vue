<template>
  <div v-if="pChan" class="flexCenter font12 fontBold" style="width: 300px; height: 500px; top: calc(50% - 250px); left: calc(50% - 150px); z-index: 99999; position: absolute; flex-direction: column;">
    <img :src="frameLink" style="width: 100%; position: absolute; left: 0; " />
    <div class="w100P fl"
      style="width: 80%; position: absolute; display: flex; align-items: flex-end; top: 85px; padding-left: 5px;">
      <div class="fl" style="border-radius: 100%; border: 1px solid #aaa; width: 30px; height: 30px; margin-right: 10px; background-image: url('/resource/logo/gtLogo.png'); background-position: center; background-size: contain; background-color: white;">
      </div>
      <p class="font18 fontBold">{{ pChan.nameMtext }}</p>
    </div>
    <img v-if="pChan.imgLink" :src="pChan.imgLink" style="position: absolute; top: 145px;" height="100" />
    <div class="textLeft" style="background: #ddd; border-radius: 5px; width: 80%; height: 80px; top: 280px; padding: 10px; position: absolute; display: flex; justify-content: space-around; align-items: center; flex-direction: column;">
      <div v-if="pChan.description" class="w100P">{{ pChan.description }}</div>
      <div class="w100P fl">
        <div v-if="pChan.followerList" class="fl" style="width: 50%;">Followers: {{ pChan.followerList.length }}</div>
        <div v-if="pChan.managerList" class="fl" style="width: 50%;">Managers: {{ pChan.managerList.length }}</div>
      </div>
      <div @click="goToLink(pChan.linkUrl)" v-if="pChan.linkUrl" style="text-decoration: underline;" class="w100P fl">{{ pChan.linkUrl }}</div>
    </div>
    <div v-if="!pChan.linkUrl" @click="goChannelMain" style="width: 80%; height: 30px; line-height: 30px; background: darkslategray; color: white; position: absolute; top:370px;">Let's go!</div>
    <!-- <div v-else-if="pType === 'AR'" style="width: 80%; height: 30px; line-height: 30px; background: darkslategray; color: white; position: absolute; top:370px;">Let me take a look!</div> -->
  </div>
</template>
<script>
export default {
  props: {
    pChan: {}
  },
  data () {
    return {
      frameLink: ''
    }
  },
  methods: {
    goToLink (link) {
      window.open(link)
    },
    goChannelMain () {
      const pageParam = {}
      pageParam.targetKey = this.pChan.teamKey
      pageParam.targetType = 'chanDetail'
      pageParam.nameMtext = this.pChan.nameMtext
      this.$emit('openPage', pageParam)
    }
    // moveToDetail () {
    //   if (this.pMoveToDetail) {
    //     this.pMoveToDetail(this.pChan)
    //   }
    // }
  },
  created () {
    this.frameLink = '/resource/bd/bdFrame.png'
  }
}
</script>
<style scoped></style>
