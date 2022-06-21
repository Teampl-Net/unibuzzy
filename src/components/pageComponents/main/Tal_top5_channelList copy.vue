<template>
  <listTitle listTitle= "채널" :moreLink="this.moreLink" @openPop= "openPop"/>
  <gActiveBar :tabList="this.activeTabList" class="mbottom-05 mtop-1" @changeTab= "changeTab" />
  <div class="chanTop5Wrap" >
      <div class="w-100P top5ChannelRow" v-for="(value, index) in chanList"  :key="index" v-on:click="openPop(value)" >
          <div class="chanLogoImgWrap"><img alt="채널 프로필이미지" class="" :src="value.logoPathMtext"></div>
          <div style="display:flex; width: cacl(100% - 36px); flex-direction: column;">
            <div class=" text-start mr-04" >
              <p class="font15 fl fontBold mNone" v-html="this.$makeMtextMap(value.nameMtext, 'KO')"></p>
              <div style="line-height: 0.05rem; float: left; margin-top: 4px; margin-left: 5px;">
                  <img style="width: 0.8rem; margin-right: 0.2rem;" src="../../../assets/images/main/main_subscriber.png"/>
                  <span class="commonColo font12" >{{value.followerCount}}</span>
              </div>
            </div>
            <div class="chanMsgWrap fl w-100P font12 commonBlack "  v-html="this.$makeMtextMap(value.memoMtext, 'KO')"  >
          </div>
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
      viewTab: 'user',
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
      if (params.targetType === 'chanDetail' && this.viewTab === 'user') {
        value.followYn = true
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
      if (this.viewTab === 'user') {
        var userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
        paramMap.set('userKey', userKey)
      }
      paramMap.set('pageSize', 5)
      paramMap.set('offsetInt', 0)
      var resultList = await this.$getTeamList(paramMap)
      this.chanList = resultList.content

      console.log(this.chanList)
    },
    changeTab (data) {
      this.viewTab = data
      // await this.getContentsList()
    }
  }

}
</script>

<style scoped>
.top5ChannelRow{display: flex; align-items: center; margin-bottom: 0.6rem; height: 45px;}
.chanTop5Wrap{width: 100%; padding-top: 0.2rem; padding-bottom: 0.5rem;}
.chanLogoImgWrap {width: 2.2rem; display: flex; align-items: center; justify-content: center; height: 2.2rem; border-radius: 2.2rem; margin-right: 0.5rem; border: 2px solid #ccc;}
.chanLogoImgWrap img{width: 1.7rem; margin-right: 0.05rem;}
.chanMsgWrap{line-height: 0.9rem; text-align: left; opacity: 1; box-sizing: border-box}
/* .chanMsgWrap{line-height: 0.9rem; padding: 0.5rem; text-align: left; background-color: #6768A71A; border-radius: 6px; opacity: 1; min-height: 39px; box-sizing: border-box} */
</style>
