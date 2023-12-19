<i18n>
{
  "ko": {
    "SEAR_TAB_ACT_CAHNNEL": "최근활동"
  },
  "en": {
    "SEAR_TAB_ACT_CAHNNEL": "Recent Activity"
  }
}
</i18n>
<template>
    <div class="fl w-100P" style="padding:15px 1.5rem; min-height:80px; border-bottom:1px solid #cccccc70; display: flex; flex-direction: row; align-items: center;" @click="goChannelMain(CHANNEL_DETAIL)">
        <div v-if="CHANNEL_DETAIL" style="position: relative; border: 0.5px solid rgba(0, 0, 0, 0.1); width:50px; height:50px; min-width: 50px; min-height: 50px; float: left; border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;"
        :style="'background-image: url(' + (CHANNEL_DETAIL.logoDomainPath !== undefind ? CHANNEL_DETAIL.logoDomainPath + CHANNEL_DETAIL.logoPathMtext : CHANNEL_DETAIL.logoPathMtext) + ');'" >
            <div v-if="CHANNEL_DETAIL.ownerYn || CHANNEL_DETAIL.managerKey" class="CWhiteBgColor" style="position: absolute; right: 0; display: flex; justify-content: center; algin-items: center; padding: 2px; bottom: 0; width: 20px; height: 20px; border-radius: 100%;">
                <img src="../../assets/images/channel/ownerChannel_crown.svg" style="width: 90%; float: left;" v-if="CHANNEL_DETAIL.ownerYn" alt="">
                <img src="../../assets/images/common/icon_setting_gear.svg" style="width: 90%; float: left;" v-else alt="">
            </div>
        </div>
        <div class="fl mleft-1" style="width: calc(100% - 65px - 1rem);">
            <div class="w-100P fl font16 fontBold textLeft grayBlack "><img class="fl img-w14 mtop-02 mright-02" v-if="CHANNEL_DETAIL.officialYn" src="../../assets/images/main/main_officialMark.svg" alt="">{{$changeText(CHANNEL_DETAIL.nameMtext)}}
            </div>
            <p v-if="$route.path !== '/chanList' && $route.path !== '/comList'" class="fr font13 lightGray" style="white-space:nowrap; font-weight: normal;">{{$t("SEAR_TAB_ACT_CAHNNEL") + ' ' + $changeDateFormat(CHANNEL_DETAIL.updDate)}}</p>

            <p class="w-100P fl font14 textLeft grayBlack">{{$changeText(CHANNEL_DETAIL.memoMtext)}}</p>
            <div class="w-100P fl font14 textLeft lightGray">
              <p class="fl font14">{{$changeText(CHANNEL_DETAIL.cateItemMtext)}}</p>
              <img src="../../assets/images/editChan/icon_user_Gray.svg" class="img-w15 mright-01 fl mleft-03 mtop-01" alt="">
              <p class="fl font14 " style="margin-top: 1px;">{{CHANNEL_DETAIL.followerCount}}</p>
            </div>
          </div>
          <div v-if="$route.path === '/chanList' || $route.path === '/comList'" class="h100P">
          <p class="fr font13 lightGray" style="white-space:nowrap; font-weight: normal; text-align:right;">{{$t("SEAR_TAB_ACT_CAHNNEL")}}<br>{{$changeDateFormat(CHANNEL_DETAIL.updDate)}}</p>
          <div class="fr">
            <p
              v-if="
                (CHANNEL_DETAIL &&
                CHANNEL_DETAIL.followerKey) ||
                (CHANNEL_DETAIL &&
                CHANNEL_DETAIL.D_CHAN_AUTH &&
                CHANNEL_DETAIL.D_CHAN_AUTH.followerKey)
              "
              @click.stop="preventDefault"
              class="fontBold unfollowBtn font13"
            >
              Following
            </p>
            <p v-else @click.stop="confirmOk" class="fontBold cursorP followBtn">
              + Follow
            </p>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  props: {
    chanElement: {}
  },
  created () {
    console.log('chanElement', this.chanElement)
    console.log('CHANNEL_DETAIL', this.CHANNEL_DETAIL)
  },
  data () {
    return {
      mFollowYn: false,
      mSaveFollowerType: ''
    }
  },
  methods: {
    goChannelMain (chanElement) {
      var openPopParam = {}
      openPopParam.targetKey = this.chanElement.teamKey
      openPopParam.targetType = 'chanDetail'
      this.$emit('openPop', openPopParam)
    },
    showFollowYn () {
      if (this.chanElement) {
        if (
          this.chanElement.followerKey &&
          this.chanElement.followerKey !== null
        ) {
          this.mFollowYn = true
        } else if (this.chanElement.D_CHAN_AUTH) {
          if (this.chanElement.D_CHAN_AUTH.followerKey > 0) {
            this.mFollowYn = true
          } else {
            this.mFollowYn = false
          }
        } else {
          this.mFollowYn = false
        }
      }
    },
    async confirmOk () {
      var fStatus = this.chanElement.D_CHAN_AUTH.followYn
      console.log('fStatus', fStatus)
      // eslint-disable-next-line no-new-object
      this.mSaveFollowerParam = new Object()
      this.mSaveFollowerParam.targetKind = 'T'
      this.mSaveFollowerParam.targetKey = this.chanElement.teamKey
      this.mSaveFollowerParam.teamName = this.$changeText(this.chanElement.nameMtext)
      this.mSaveFollowerParam.userKey = this.$store.getters['D_USER/GE_USER'].userKey
      this.mSaveFollowerParam.userName = this.$changeText(this.GE_USER.userDispMtext)
      console.log('mSaveFollowerParam', this.mSaveFollowerParam)
      // console.log(this.mSaveFollowerParam)
      var result = false
      if (fStatus) {
        // fStatus가 있으면(followYn===true) -> follow 취소.
        if (this.axiosQueue.findIndex((item) => item === 'changeFollower') !== -1) return
        this.axiosQueue.push('changeFollower')
        result = await this.$changeFollower({ follower: this.mSaveFollowerParam, doType: 'CR' }, 'del')
        var queueIndex = this.axiosQueue.findIndex((item) => item === 'changeFollower')
        // this.axiosQueue = this.axiosQueue.splice(queueIndex, 1)
        this.axiosQueue.splice(queueIndex, 1)
        this.CHANNEL_DETAIL.D_CHAN_AUTH = null
        this.CHANNEL_DETAIL.followerKey = null
        this.CHANNEL_DETAIL.userTeamInfo = null
        this.CHANNEL_DETAIL.followerCount -= 1
        // console.log(this.CHANNEL_DETAIL)
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
        // this.$actionVuex('TEAM', this.CHANNEL_DETAIL, this.CHANNEL_DETAIL.teamKey, false, true)
        // console.log(result)

        this.$emit('showToastPop', this.$t('CHAN_MSG_UNFOLLOW'))

        if (result.result || result) {
          this.$emit('pageReload')
        }
      } else { // fStatus가 없으면 -> follow
        result = await this.$changeFollower({ follower: this.mSaveFollowerParam, doType: 'CR' }, 'save')
        if (result) {
          this.CHANNEL_DETAIL.followerKey = result.followerKey
          this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
        }
      }
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    CHANNEL_DETAIL () {
      if (!this.chanElement) return {}
      let teamKey
      if (this.chanElement) {
        teamKey = this.chanElement.targetKey || this.chanElement.teamKey
      }
      if (!teamKey) {
        return this.chanElement
      }
      var detail = this.$getDetail('TEAM', teamKey)
      if (detail && detail.length > 0) {
        return detail[0]
      } else {
        return this.chanElement
      }
    }
  }
}
</script>

<style>
.chanLogoImgWrap {width: 40px; height:40px; padding: 5px; border-radius: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid #ccc; position: relative; flex-shrink: 0}
.unfollowBtn {
  cursor: auto;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: #ccc;
  color: #062bb5;
  font-size:13px;
  margin-top:0.3rem;
}
.followBtn {
  border-radius: 5px;
  padding: 5px 10px;
  background-color: #062bb5;
  color: #fff;
  font-size:13px;
  margin-top:0.3rem;
}
</style>
