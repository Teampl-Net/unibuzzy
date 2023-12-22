<template>
  <div style="width: 100%; float: left;">
    <listTitle :channelTabType="this.viewTab" listTitle= "채널" :moreLink="this.moreLink" class="fl w-100P" @openPop= "openPop" />
    <div style="width: calc(100% + 20px); height:1.5px; background: rgb(220, 221, 235); margin-left: -10px; float: left; margin-top:0px; margin-bottom: 10px;"></div>
    <gActiveBar  ref="activeBarChanListTop5" :tabList="this.activeTabList" class=" fl" @changeTab="changeTab" />
    <div class="chanTop5Wrap fl" >
        <div v-if="emptyYn && this.chanList.length === 0" class="w-100P">
        <!-- 다른 이미지로 대체하면 된다 -->
        <gEmpty :tabName="currentTabName" contentName="채널" style="margin-top:50px;" />
        <!-- <img src="/resource/common/placeholder_white.png" /> -->
        </div>
        <!-- <div class="w-100P top5ChannelRow" v-for="(value, index) in chanList"  :key="index" v-on:click="openPop(value)" :class="{top5MyChanColor : value.ownerYn}"> -->
        <div class="w-100P top5ChannelRow" :style="index === chanList.length - 1 ? 'border: none!important;' : ''"  v-for="(value, index) in chanList"  :key="index" v-on:click="openPop(value)" >
        <div class="top5ChanLogoImgWrap" :style="'background-image: url(' + ( value.logoDomainPath? value.logoDomainPath + value.logoPathMtext : value.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; position: relative; background-position: center;">
            <img src="../../../assets/images/channel/ownerChannel_crown.svg" v-if="value.ownerYn" style="width: 18px; height: 18px; position: absolute; top: -15px;"  alt="소유주 아이콘"/>
            <img src="../../../assets/images/common/icon_setting_gear.svg" v-else-if="value.managerKey > 0 && value.memberYn" style="width: 18px; height: 18px; position: absolute; top: -10px;" alt="매니저 아이콘">
        </div>
            <div style=" margin-left: 10px; width: calc(100% - 36px); display:flex;flex-direction: column;">
            <div class=" text-start mr-04 w-100P" style="height: 25px;" >
                <!-- <p class="font15 fl fontBold mNone commonBlack" style="width: calc(100% - 2rem - 30px); white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" v-html="resizeText(this.$makeMtextMap(value.nameMtext, 'KO'))"></p> -->
                <img src="../../../assets/images/channel/icon_official2.svg" v-if="value.officialYn" style="height:20px; padding: 3px;" class='fl' />
                <p class="font15 fl fontBold mNone textOverdot commonBlack" style=" white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" v-html="resizeText(this.$makeMtextMap(value.nameMtext, 'KO'))"></p>

                <div style="line-height: 0.05rem; float: right; margin-top: 5px; margin-left: 5px;">
                    <img style="width: 0.8rem; margin-right: 0.2rem;" src="../../../assets/images/main/main_subscriber.png"/>
                    <span class="commonColo font12" >{{value.followerCount}}</span>
                </div>
            </div>
            <div style="width: 100%; margin-top: 4px; position: relative; min-height: 0.9rem;">
                <span class="chanMsgWrap w-70P fl font12 commonBlack "  v-html="this.$makeMtextMap(value.memoMtext, 'KO')" >
                </span>
                <span class="commonBlack font12 fr" style="position: absolute; bottom: 0; right: 0;">{{this.$changeDateFormat(value.creDate)}}</span>
            </div>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import listTitle from '../../unit/Tal_main_title.vue'
export default {
  name: 'top5_channel',
  created () {
    this.chanList = this.top5ChanList
    this.checkOwnerYn()
    // // console.log(this.chanList)
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
      chanList: {},
      currentTabName: '구독중',
      emptyYn: true
    }
  },
  components: {
    listTitle
  },
  methods: {
    introTop5ChanPageTab () {
      if (this.viewTab === 'user') {
        this.currentTabName = '구독중'
        this.imgUrl = '/resource/common/placeholder_white.png'
      } else if (this.viewTab === 'mychannel') {
        this.currentTabName = '내 채널'
        this.imgUrl = '/resource/common/placeholder_white.png'
      }
    },
    checkOwnerYn () {
      if (this.chanList) {
        for (var i = 0; i < this.chanList.length; i++) {
          if (JSON.parse(localStorage.getItem('sessionUser')).userKey === this.chanList[i].creUserKey) {
            this.chanList[i].ownerYn = true
          }
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
      console.log('------------실행됨---------------------------------')
      var resultList = await this.$getTeamList(paramMap)
      this.chanList = resultList.data.content
    },
    async changeTab (data) {
      // this.chanList = [] ///######
      this.viewTab = data
      this.introTop5ChanPageTab()
      this.emptyYn = false
      // // console.log(data)
      await this.getContentsList()
      if (this.chanList.length === 0) this.emptyYn = true

      this.checkOwnerYn()
    },
    async reLoad () {
      await this.$refs.activeBarChanListTop5.switchtab(0)
      await this.$refs.activeBarChanListTop5.selectTab('user')
    }
  }

}
</script>

<style scoped>
.top5MyChanColor { background-color: #6768a712;}
.top5ChannelRow{display: flex; align-items: center; padding: 5px 10px; min-height: 60px;  border-bottom: 1px solid #E4E4E4; animation-name: fadein; animation-duration: 0.3s; position: relative;}
.chanTop5Wrap{width: 100%; padding-top: 0.5rem; padding-bottom: 0.5rem; min-height: 200px;}
.top5ChanLogoImgWrap {width: 45px; height:45px; border-radius: 45px; min-width: 45px; min-height:45px; display: flex; align-items: center; justify-content: center; border: 2px solid #ccc;}
.top5ChanLogoImgWrap img{width: 1.7rem; margin-right: 0.05rem;}
.chanMsgWrap{line-height: 0.9rem; text-align: left; opacity: 1; box-sizing: border-box}
/* .chanMsgWrap{line-height: 0.9rem; padding: 0.5rem; text-align: left; background-color: #6768A71A; border-radius: 6px; opacity: 1; min-height: 39px; box-sizing: border-box} */
</style>
