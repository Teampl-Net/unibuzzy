<template>
  <div style="width: 100%; float: left;">
    <listTitle :channelTabType="this.viewTab" listTitle= "채널" :moreLink="this.moreLink" class="fl w-100P" @openPop= "openPop" />
    <div style="width: calc(100% + 20px); height:1.5px; background: rgb(220, 221, 235); margin-left: -10px; float: left; margin-top:0px; margin-bottom: 10px;"></div>
    <gActiveBar  ref="activeBarChanListTop5" :tabList="this.activeTabList" class=" fl" @changeTab="changeTab" />
    <div class="chanTop5Wrap fl" >
        <div v-if="emptyYn && GE_DISP_CHAN_LIST && this.GE_DISP_CHAN_LIST.length === 0" class="w-100P">
        <!-- 다른 이미지로 대체하면 된다 -->
            <gEmty :tabName="currentTabName" contentName="채널" style="margin-top:50px;" />
        <!-- <img src="/resource/common/placeholder_white.png" /> -->
        </div>
        <!-- <div class="w-100P top5ChannelRow" v-for="(value, index) in chanList"  :key="index" v-on:click="openPop(value)" :class="{top5MyChanColor : value.ownerYn}"> -->
        <div class="w-100P top5ChannelRow" :style="GE_DISP_CHAN_LIST && index === GE_DISP_CHAN_LIST.length - 1 ? 'border: none!important;' : ''"  v-for="(value, index) in GE_DISP_CHAN_LIST"  :key="index" v-on:click="openPop(value)" >
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
/* eslint-disable vue/no-mutating-props */
import listTitle from '../../unit/Tal_main_title.vue'
export default {
  name: 'top5_channel',
  created () {
    if (this.chanList) {
      this.mainChanList = this.chanList
    }
  },
  props: {
    chanList: {},
    allChanList: {},
    myChanList: {}
  },
  data () {
    return {
      mainChanList: [],
      ownerYn: false,
      moreLink: 'subs',
      // activeTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }],
      activeTabList: [{ display: '구독중', name: 'user' }, { display: '전체', name: 'all' }, { display: '내 채널', name: 'mychannel' }],
      viewTab: 'user',
      currentTabName: '구독중',
      emptyYn: true,
      axiosQueueList: []
    }
  },
  components: {
    listTitle
  },
  mounted () {
    // document.addEventListener('message', e => this.recvNoti(e))
    // window.addEventListener('message', e => this.recvNoti(e))
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
      if (this.mainChanList && this.mainChanList.length > 0) {
        var chanList = []
        for (var i = 0; i < this.mainChanList.length; i++) {
          idx1 = this.GE_MAIN_CHAN_LIST.findIndex((item) => item.teamKey === this.mainChanList[i].creTeamKey)
          if (idx1 !== -1) {
            chanList.push(this.GE_MAIN_CHAN_LIST[idx1])
          } else {
            chanList.push(this.mainChanList[i])
          }
        // this.mainBoardList[i] = chanDetail.ELEMENTS.boardList
        }
        return chanList
      } else {
        return null
      }
    },
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['D_CHANNEL/GE_RECENT_CHANGE_TEAM']
    }
  },
  watch: {
    chanList (value, old) {
      if (value) {
        // alert(true)
        this.mainChanList = value
      }
    },
    GE_MAIN_CHAN_LIST: {
      handler (value, old) {
        var idx = this.mainChanList.findIndex((item) => item.teamKey === this.GE_RECENT_CHANGE_TEAM)
        if (idx !== -1) {
          this.getContentsList()
        }
      },
      deep: true
    }
  },
  unmounted () {
    document.removeEventListener('message', e => this.recvNoti(e))
    window.removeEventListener('message', e => this.recvNoti(e))
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
    resizeText (text) {
      // if (text.length > 15) {
      //   text = text.substr(0, 15)
      //   text += '...'
      // }
      return text
    },
    async getContentsList () {
      var idx = this.axiosQueueList.findIndex((item) => item === 'getContentsList')
      if (idx !== -1) return
      this.axiosQueueList.push('getContentsList')
      var paramMap = new Map()
      if (this.viewTab === 'user') {
        paramMap.set('userKey', this.GE_USER.userKey)
      } else if (this.viewTab === 'mychannel') {
        paramMap.set('userKey', this.GE_USER.userKey)
        paramMap.set('managerYn', true)
      }
      paramMap.set('pageSize', 5)
      paramMap.set('offsetInt', 0)
      var resultList = await this.$getTeamList(paramMap)
      idx = this.axiosQueueList.findIndex((item) => item === 'getContentsList')
      this.axiosQueueList.splice(idx, 1)
      this.mainChanList = resultList.data.content
      var newArr = []
      for (var i = 0; i < this.mainChanList.length; i++) {
        if (!this.$getDetail('TEAM', this.mainChanList[i].teamKey) || this.$getDetail('TEAM', this.mainChanList[i].teamKey).length === 0) {
          newArr.push(this.mainChanList[i])
        }
      }
      if (newArr.length > 0) {
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', newArr)
      }
    },
    async recvNoti (e) {
      /* var message
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'pushmsg') {
          if (JSON.parse(message.pushMessage).noti.data.item !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== null && JSON.parse(message.pushMessage).noti.data.item.data !== '') {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data.item.data
          } else {
            this.notiDetail = JSON.parse(message.pushMessage).noti.data
          }
          var currentPage = this.$store.getters['D_HISTORY/hCPage']
          if ((currentPage === 0 || currentPage === undefined)) {
            if (JSON.parse(this.notiDetail.userDo).targetKind === 'TEAM') {
              this.getContentsList()
            }
          }
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      } */
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
    async changeTab (data) {
      // this.chanList = [] ///######
      this.viewTab = data
      await this.getContentsList()
      // if (this.chanList.length === 0) this.emptyYn = true
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
