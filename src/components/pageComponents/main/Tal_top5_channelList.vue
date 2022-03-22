<template>
  <listTitle listTitle= "채널" :moreLink="this.moreLink" @openPop= "openPop"/>
  <gActiveBar :tabList="this.activeTabList" class="mbottom-05 mtop-1" @changeTab= "changeTab" />
  <div class="chanTop5Wrap" style="">
      <div class="w-100P top5ChannelRow" v-for="(value, index) in chanList"  :key="index" v-on:click="openPop(value)" >
          <div class="chanLogoImgWrap"><img alt="채널 프로필이미지" class="" src="../../../assets/images/main/main_channer1.png"></div>
          <div class=" w-20P text-start mr-04" >
            <p class="font15 fontBold mNone" v-html="value.chanName"></p>
            <div style="line-height: 0.05rem;">
                <img style="width: 0.8rem" src="../../../assets/images/main/main_subscriber.png"/>
                <span class="commonColor font12" >{{settingNumType(value.followerCnt)}}</span>
            </div>
          </div>
          <div class="chanMsgWrap fl w-70P font12 commonBlack "  v-html="value.chanMessage"  style="">
        </div>
      </div>
  </div>
</template>

<script>
import listTitle from '../../unit/Tal_main_title.vue'
export default {
  name: 'top5_channel',
  mounted () {
  },
  props: {
    chanList: {}
  },
  data () {
    return {
      moreLink: 'subs',
      activeTabList: [{ display: '구독수', name: 'newest' }, { display: '일 방문자수', name: 'notRead' }],
      viewTab: 'newest'
    }
  },
  components: {
    listTitle
  },
  methods: {
    openPop (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      if (value.targetType !== undefined && value.targetType !== null && value.targetType !== '') {
        params.targetType = value.targetType
      } else {
        params.targetType = 'chanDetail'
      }
      if (value.pushKey !== undefined && value.pushKey !== null && value.pushKey !== '') { params.targetKey = value.pushKey }
      if (value.chanName !== undefined && value.chanName !== null && value.chanName !== '') { params.chanName = value.chanName }
      this.$emit('openPop', params)
    },
    settingNumType (num) {
      return this.numberToKorean(num)
    }
  }

}
</script>

<style scoped>
.top5ChannelRow{display: flex; align-items: center; margin-bottom: 0.6rem}
.chanTop5Wrap{width: 100%; padding-top: 0.2rem; padding-bottom: 0.5rem;}
.chanLogoImgWrap img{width: 2rem; margin-right: 0.4rem}
.chanMsgWrap{line-height: 0.9rem; padding: 0.5rem; text-align: left; background-color: #6768A71A; border-radius: 6px; opacity: 1; min-height: 39px; box-sizing: border-box}
</style>
