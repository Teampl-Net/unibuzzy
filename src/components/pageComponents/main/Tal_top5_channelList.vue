<template>
  <listTitle :channelTabType="this.viewTab" listTitle= "채널" :moreLink="this.moreLink" @openPop= "openPop" />
  <gActiveBar  ref="activeBarChanListTop5" :tabList="this.activeTabList" class=" mtop-1" @changeTab="changeTab" />
  <div class="chanTop5Wrap" >
    <div v-if="this.chanList.length === 0" class="w-100P">
      <!-- 다른 이미지로 대체하면 된다 -->
      <img src="/resource/common/placeholder_white.png" />
    </div>
    <div class="w-100P top5ChannelRow" v-for="(value, index) in chanList"  :key="index" v-on:click="openPop(value)" :class="{top5MyChanColor : value.ownerYn}">
      <div class="chanLogoImgWrap"><img alt="채널 프로필이미지" class="" :src="value.logoPathMtext"><img src="../../../assets/images/channel/ownerChannel_crown.svg" v-if="value.ownerYn" style="width: 18px; height: 18px; position: absolute; top: 0;" /></div>
        <div style=" margin-left: 10px; width: calc(100% - 36px); display:flex;flex-direction: column;">
          <div class=" text-start mr-04 w-100P" >
            <p class="font15 fl fontBold mNone commonBlack" style="width: calc(100% - 2rem); white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" v-html="resizeText(this.$makeMtextMap(value.nameMtext, 'KO'))"></p>
            <div style="line-height: 0.05rem; float: right; margin-top: 5px; margin-left: 5px;">
                <img style="width: 0.8rem; margin-right: 0.2rem;" src="../../../assets/images/main/main_subscriber.png"/>
                <span class="commonColo font12" >{{value.followerCount}}</span>
            </div>
          </div>
          <div style="width: 100%; margin-top: 4px; position: relative;">
            <span class="chanMsgWrap w-70P fl font12 commonBlack "  v-html="this.$makeMtextMap(value.memoMtext, 'KO')" >
            </span>
            <span class="commonBlack font12 fr" style="position: absolute; bottom: 0; right: 0;">{{this.$changeDateFormat(value.creDate)}}</span>
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
    this.checkOwnerYn()
  },
  props: {
    top5ChanList: {}
  },
  data () {
    return {
      ownerYn: false,
      moreLink: 'subs',
      // activeTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }],
      activeTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }, { display: '내 채널', name: 'mychannel' }],
      viewTab: 'user',
      chanList: {}
    }
  },
  components: {
    listTitle
  },
  methods: {
    introTop5ChanPageTab () {
      if (this.viewTab === 'user') {
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'mychannel') {
        this.imgUrl = '/resource/common/placeholder_white.png'
      }
    },
    checkOwnerYn () {
      for (var i = 0; i < this.chanList.length; i++) {
        if (JSON.parse(localStorage.getItem('sessionUser')).userKey === this.chanList[i].creUserKey) {
          this.chanList[i].ownerYn = true
        }
      }
    },
    resizeText (text) {
      // if (text.length > 15) {
      //   text = text.substr(0, 15)
      //   text += '...'
      // }
      return text
    },
    openPop (value) {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      if (value.targetType !== undefined && value.targetType !== null && value.targetType !== '') {
        params.targetType = value.targetType
        params.channelTabType = this.viewTab
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
      } else if (this.viewTab === 'mychannel') {
        paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
        paramMap.set('managerYn', true)
      }
      paramMap.set('pageSize', 5)
      paramMap.set('offsetInt', 0)
      var resultList = await this.$getTeamList(paramMap)
      this.chanList = resultList.data.content
    },
    async changeTab (data) {
      // this.chanList = [] ///######
      this.viewTab = data
      // console.log(data)
      await this.getContentsList()
      this.checkOwnerYn()
    },
    async reLoad () {
      this.$refs.activeBarChanListTop5.switchtab(0)
      this.$refs.activeBarChanListTop5.selectTab('user')
    }
  }

}
</script>

<style scoped>
.top5MyChanColor { background-color: #6768a712;}
.top5ChannelRow{display: flex; align-items: center; padding: 5px 10px; min-height: 60px;  border-bottom: 1px solid #E4E4E4; animation-name: fadein; animation-duration: 0.3s; position: relative;}
.chanTop5Wrap{width: 100%; padding-top: 0.5rem; padding-bottom: 0.5rem; min-height: 200px;}
.chanLogoImgWrap {width: 45px; height:45px; border-radius: 45px; min-width: 45px; min-height:45px; display: flex; align-items: center; justify-content: center; border: 2px solid #ccc;}
.chanLogoImgWrap img{width: 1.7rem; margin-right: 0.05rem;}
.chanMsgWrap{line-height: 0.9rem; text-align: left; opacity: 1; box-sizing: border-box}
/* .chanMsgWrap{line-height: 0.9rem; padding: 0.5rem; text-align: left; background-color: #6768A71A; border-radius: 6px; opacity: 1; min-height: 39px; box-sizing: border-box} */
</style>
