<template>
  <div style="width: 100%; float: left;">
    <listTitle :propViewTab="this.mViewTab" propListTitle= "채널" :propMoreLink="mMoreLink" class="fl w-100P" @openPop="openPop" />
    <div style="width: calc(100% + 20px); height:1.5px; background: rgb(220, 221, 235); margin-left: -10px; float: left; margin-top:0px;"></div>
    <gActiveBar  ref="activeBarChanListTop5" :tabList="mActiveTabList" class=" fl" @changeTab="changeTab" />
    <div class="chanTop5Wrap fl" >
      <div class="w-100P top5ChannelRow" :style="GE_DISP_CHAN_LIST && index === GE_DISP_CHAN_LIST.length - 1 ? 'border: none!important;' : ''"  v-for="(value, index) in GE_DISP_CHAN_LIST"  :key="index" v-on:click="openPop(value)" >
        <div class="top5ChanLogoImgWrap" :style="'background-image: url(' + ( value.logoDomainPath? value.logoDomainPath + value.logoPathMtext : value.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; position: relative; background-position: center;">
          <img src="../../../assets/images/channel/ownerChannel_crown.svg" v-if="value.ownerYn" style="width: 18px; height: 18px; position: absolute; top: -15px;"  alt="소유주 아이콘"/>
          <img src="../../../assets/images/common/icon_setting_gear.svg" v-else-if="value.managerKey > 0 && value.memberYn" style="width: 18px; height: 18px; position: absolute; top: -10px;" alt="매니저 아이콘">
        </div>
        <div style=" margin-left: 10px; width: calc(100% - 36px); display:flex;flex-direction: column;">
          <div class=" text-start mr-04 w-100P" style="height: 25px;" >
            <img src="../../../assets/images/channel/icon_official2.svg" v-if="value.officialYn" style="height:20px; padding: 3px;" class='fl' />
            <p class="font15 fl fontBold mNone textOverdot commonBlack" style=" white-space: nowrap; text-overflow: ellipsis;overflow: hidden;" v-html="this.$makeMtextMap(value.nameMtext, 'KO')"></p>

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
  props: {
    propChanList: {}
  },
  data () {
    return {
      mMainChanList: [],
      mMoreLink: 'subs',
      mActiveTabList: [{ display: this.$t('COMMON_TAB_FOLLOWING'), name: 'user' }, { display: this.$t('COMMON_TAB_ALL'), name: 'all' }, { display: this.$t('COMMON_TAB_MANAGING'), name: 'mychannel' }],
      mViewTab: 'user',
      mAxiosQueueList: []
    }
  },
  components: {
    listTitle
  },
  methods: {
    async getContentsList (loadingYn) {
      var idx = this.mAxiosQueueList.findIndex((item) => item === 'getContentsList')
      if (idx !== -1) return
      this.mAxiosQueueList.push('getContentsList')
      var paramMap = new Map()
      if (this.mViewTab === 'user') {
        paramMap.set('userKey', this.GE_USER.userKey)
      } else if (this.mViewTab === 'mychannel') {
        paramMap.set('userKey', this.GE_USER.userKey)
        paramMap.set('managerYn', true)
      }
      paramMap.set('pageSize', 5)
      paramMap.set('offsetInt', 0)
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }

      var resultList = await this.$getTeamList(paramMap, nonLoading)
      idx = this.mAxiosQueueList.findIndex((item) => item === 'getContentsList')
      this.mAxiosQueueList.splice(idx, 1)
      this.mMainChanList = resultList.data.content
      var newArr = []
      for (var i = 0; i < this.mMainChanList.length; i++) {
        if (!this.$getDetail('TEAM', this.mMainChanList[i].teamKey) || this.$getDetail('TEAM', this.mMainChanList[i].teamKey).length === 0) {
          newArr.push(this.mMainChanList[i])
        }
      }
      if (newArr.length > 0) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', newArr)
      }
    },
    openPop (value) {
      var params = value
      params.targetType = value.targetType
      params.targetKey = value.teamKey
      if (value.teamKey) {
        params.targetType = 'chanDetail'
        params.nameMtext = value.nameMtext
        /* params.popHeaderText = value.nameMtext */
        params.chanName = value.nameMtext
        if (this.mViewTab === 'user') {
          value.followYn = true
        }
      } else if (value.targetType === 'chanList') {
        params.popHeaderText = this.$t('COMMON_NAME_CHANNEL')
      }
      params.value = value
      params.channelTabType = this.mViewTab
      this.$emit('openPop', params)
    },
    async changeTab (data) {
      this.mViewTab = data
      await this.getContentsList(true)
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    GE_MAIN_CHAN_LIST () {
      return this.$store.getters['D_CHANNEL/GE_MAIN_CHAN_LIST']
    },
    GE_DISP_CHAN_LIST () {
      var idx1
      if (this.mMainChanList && this.mMainChanList.length > 0) {
        var teampChanList = []
        for (var i = 0; i < this.mMainChanList.length; i++) {
          idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mMainChanList[i].creTeamKey)
          if (idx1 !== -1) {
            teampChanList.push(this.GE_MAIN_CHAN_LIST[idx1])
          } else {
            teampChanList.push(this.mMainChanList[i])
          }
        }
        return teampChanList
      } else {
        return null
      }
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['D_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  watch: {
    GE_LOCALE: {
      immediate: true,
      handler (value) {
        this.mActiveTabList = [{ display: this.$t('COMMON_TAB_FOLLOWING'), name: 'user' }, { display: this.$t('COMMON_TAB_ALL'), name: 'all' }, { display: this.$t('COMMON_TAB_MANAGING'), name: 'mychannel' }]
      },
      deep: true
    },
    propChanList: {
      immediate: true,
      handler (value, old) {
        if (value) {
          this.mMainChanList = JSON.parse(JSON.stringify(value))
        }
      }
    },
    GE_MAIN_CHAN_LIST: {
      handler (value, old) {
        var idx = this.mMainChanList.findIndex((item) => item.teamKey === this.GE_RECENT_CHANGE_TEAM)
        if (idx !== -1) {
          this.getContentsList(false)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.top5MyChanColor { #879dc912;}
.top5ChannelRow{display: flex; align-items: center; padding: 5px 10px; min-height: 60px;  border-bottom: 1px solid #E4E4E4; animation-name: fadein; animation-duration: 0.3s; position: relative;}
.chanTop5Wrap{width: 100%; padding-top: 0.5rem; padding-bottom: 0.5rem; min-height: 200px;}
.top5ChanLogoImgWrap {width: 45px; height:45px; border-radius: 45px; min-width: 45px; min-height:45px; display: flex; align-items: center; justify-content: center; border: 2px solid #ccc;}
.top5ChanLogoImgWrap img{width: 1.7rem; margin-right: 0.05rem;}
.chanMsgWrap{line-height: 0.9rem; text-align: left; opacity: 1; box-sizing: border-box}
</style>
