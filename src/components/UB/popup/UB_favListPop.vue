<i18n>
{
  "ko": {
    "FAV_TITLE_CHANN": "즐겨찾기 채널"
  },
  "en": {
    "FAV_TITLE_CHANN": "Favorite Channels"
  }
}
</i18n>
<template>
    <div class="transWhite favListPopWrap">
      <div class="font25 fontBold w100P favListPopHeader">
        <div class="favListPopTitle">
          <img src="@/assets/images/common/likeIcon.svg" alt="">
          <p class="textOverdot textLeft">{{ $t('FAV_TITLE_CHANN')  }}</p>
        </div>
        <div class="cursorP closeBtnBox" @click="closeXPop">
          <img class="w100P" src="../../../assets/images/common/popup_close.png" alt="">
        </div>
      </div>
      <div class="w100P favListPopContentsWrap">
        <div v-if="!mFTeamList || (mFTeamList && mFTeamList.length === 0)" class="w100P h100P emptyBox">
          <gEmpty tabName="즐겨찾기" contentName="채널" class="mt-header" />
        </div>
        <template v-else>
          <div class="mbottom-1" v-for="town in mSortList" :key="town.townTeamKey">
            <div class="textLeft fontBold townTitle">{{ $changeText(town.townNameMtext) }}</div>
            <channelCard v-for="(chanEle, index) in town.favList" :key="index" class="moveBox chanRow mTop10" :chanElement="chanEle" @openPop="goChannelMain" @scrollMove="scrollMove" />
          </div>
        </template>
      </div>
    </div>
</template>
<script>
export default {
  created () {
    if (!this.pFTeamList || this.pFTeamList.length < 1) {
      this.loginCheck()
    } else {
      this.mFTeamList = this.pFTeamList
      this.sortList()
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    },
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['UB_HISTORY/hStack']
    }
  },
  watch: {
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'favListPop') {
        this.closeXPop()
      }
    }
  },
  mounted () {
    this.$addHistoryStack('favListPop')
  },
  components: {
  },
  props: {
    pClosePop: Function,
    pFTeamList: Array
  },
  data () {
    return {
      mFTeamList: [],
      mSortList: []
    }
  },
  methods: {
    sortList () {
      const tempList = []
      for (let i = 0; i < this.mFTeamList.length; i++) {
        const index = tempList.findIndex(item => item.townTeamKey === this.mFTeamList[i].townTeamKey)
        if (index === -1) {
          const tempObj = { townTeamKey: this.mFTeamList[i].townTeamKey, townNameMtext: this.mFTeamList[i].townNameMtext, favList: [this.mFTeamList[i]] }
          tempList.push(tempObj)
        } else {
          tempList[index].favList.push(this.mFTeamList[i])
        }
      }
      this.mSortList = tempList
    },
    async loginCheck () {
      var paramMap = new Map()
      if (this.GE_USER.userKey) {
        paramMap.set('userKey', this.GE_USER.userKey)
      } else {
        // paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
        if ((localStorage.getItem('sessionUser'))) paramMap.set('userKey', JSON.parse(localStorage.getItem('sessionUser')).userKey)
      }
      if (this.GE_USER.soAccessToken && this.GE_USER.soAccessToken !== '') { paramMap.set('soAccessToken', this.GE_USER.soAccessToken) }
      if (this.GE_USER.fcmKey !== undefined && this.GE_USER.fcmKey !== null && this.GE_USER.fcmKey !== '') { paramMap.set('fcmKey', this.GE_USER.fcmKey) }
      paramMap.set('userEmail', this.GE_USER.userEmail)
      paramMap.set('soEmail', this.GE_USER.soEmail)
      // paramMap.set('myTeamKey', this.GE_USER.myTeamKey)
      // paramMap.set('myTeamKey', 836)
      var isMobile = /Mobi/i.test(window.navigator.userAgent)
      paramMap.set('mobileYn', isMobile)
      var response = await this.$axios.post('/sUniB/tp.UB_firstLoginCheck', Object.fromEntries(paramMap))
      if (response && (response.status === 200 || response.status === '200')) {
        this.mFTeamList = response.data.fTeamList
        this.sortList()
      }
    },
    goChannelMain (param) {
      const pageParam = {}
      if (param.teamKey) {
        pageParam.targetKey = param.teamKey
      } else {
        pageParam.targetKey = param.targetKey
      }
      pageParam.areaInfo = this.pAreaInfo
      pageParam.targetType = 'chanDetail'
      pageParam.nameMtext = param.nameMtext
      this.$emit('openPage', pageParam)
    },
    closeXPop (reloadYn) {
      var history = this.$store.getters['UB_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('UB_HISTORY/setRemovePage', removePage)
      this.$store.commit('UB_HISTORY/updateStack', history)
      this.$checkDeleteHistory('favListPop')
      this.$emit('closeXPop')
    }
  }
}
</script>
<style scoped>
.favListPopWrap {
  border-radius: 10px;
  width: 80%;
  height: 80%;
  position: absolute;
  top: 10%;
  left:10%;
  z-index: 10000;
  padding: 10px 20px;
  padding-bottom: 0;
  float: left;
}
.favListPopHeader {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.favListPopTitle {
  display: flex;
  align-items: center;
  width: calc(100% - 25px);
}
.favListPopTitle > img {
  width: 20px;
  margin-right: 5px;
}
.favListPopTitle > p {
  width: calc(100% - 40px);
}
.closeBtnBox {
  width: 25px;
}
.favListPopContentsWrap {
  padding-bottom: 30px;
  overflow: auto;
  height: calc(100% - 50px);
}
.emptyBox {
  display: flex;
  align-items: center;
  justify-content: center;
}
.townTitle {
  width: 100%;
  padding: 5px 10px;
  border-radius: 10px;
  background: rgba(186, 187, 215, 0.5);
}
</style>
