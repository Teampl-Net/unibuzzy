<template>
  <listTitle listTitle= "채널" :moreLink="this.moreLink" @openPop= "openPop"/>
  <gActiveBar :tabList="this.activeTabList" class="mbottom-05 mtop-1" @changeTab= "changeTab" />
  <div class="chanTop5Wrap" >
      <div class="w-100P top5ChannelRow" v-for="(value, index) in chanList"  :key="index" v-on:click="openPop(value)" >
          <div class="chanLogoImgWrap"><img alt="채널 프로필이미지" class="" src="../../../assets/images/channel/tempChanImg.png"></div>
          <div class=" w-20P text-start mr-04" >
            <p class="font15 fontBold mNone" v-html="this.$makeMtextMap(value.nameMtext, 'KO')"></p>
            <div style="line-height: 0.05rem;">
                <img style="width: 0.8rem; margin-right: 0.2rem;" src="../../../assets/images/main/main_subscriber.png"/>
                <span class="commonColo font12" >{{2000}}</span>
            </div>
          </div>
          <div class="chanMsgWrap fl w-70P font12 commonBlack "  v-html="this.$makeMtextMap(value.memoMtext, 'KO')"  >
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
  created () {
    this.chanList = this.top5ChanList
  },
  props: {
    top5ChanList: {}
  },
  data () {
    return {
      moreLink: 'subs',
      activeTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }],
      viewTab: 'newest',
      chanList: {}
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
      params.value = value
      if (value.teamKey !== undefined && value.teamKey !== null && value.teamKey !== '') { params.targetKey = value.teamKey }
      if (value.nameMtext !== undefined && value.nameMtext !== null && value.nameMtext !== '') { params.chanName = this.$makeMtextMap(value.nameMtext, 'KO') }
      this.$emit('openPop', params)
    },
    settingNumType (num) {
      return this.numberToKorean(num)
    },
    async getContentsList (type) {
      var paramMap = new Map()
      if (type === 'user') {
        var userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
        paramMap.set('userKey', userKey)
      }
      var resultList = await this.$getTeamList(paramMap)
      this.chanList = resultList
    },
    async changeTab (data) {
      await this.getContentsList(data)
      // alert(true + data)
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
