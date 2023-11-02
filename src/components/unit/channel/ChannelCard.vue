<i18n>
  {
    "ko": {
      "SEAR_TAB_ACT_CAHNNEL": "최근활동"
    },
    "en": {
      "SEAR_TAB_ACT_CAHNNEL": "Recent"
    }
  }
  </i18n>
<template>
  <div
    class="w100P pSide-1 chanCardWrap"
    :class="{ channelCardBox: $route.path === '/' }"
  >
    <div @click="goChannelMain(chanElement)" class="w100P channelCardArea">
      <div v-if="pSelectedYn === true" class="font11 selectedChannel">Now</div>
      <div
        v-if="chanElement"
        class="chanIconWrap"
        :class="
          chanElement.ownerYn || chanElement.creUserKey === GE_USER.userKey
            ? 'myChan'
            : 'normalChan'
        "
        :style="
          'background-image: url(' +
          (chanElement.logoDomainPath !== undefind
            ? chanElement.logoDomainPath +
              $changeUrlBackslash(chanElement.logoPathMtext)
            : chanElement.logoPathMtext) +
          ');'
        "
      >
        <div
          v-if="
            chanElement.ownerYn ||
            chanElement.creUserKey === GE_USER.userKey ||
            chanElement.managerKey
          "
          class="CWhiteBgColor mngChanEffect"
        >
          <img
            src="@/assets/images/channel/ownerChannel_crown.svg"
            v-if="
              chanElement.ownerYn || chanElement.creUserKey === GE_USER.userKey
            "
            alt=""
          />
          <img
            src="@/assets/images/common/icon_setting_gear.svg"
            v-else
            alt=""
          />
        </div>
      </div>
      <div class="fl mleft-1 chanNameWrap">
        <div class="w100P fl font16 fontBold textLeft grayBlack">
          <img
            class="fl img-w14 mtop-02 mright-02"
            v-if="chanElement.officialYn"
            src="@/assets/images/main/main_officialMark.svg"
            alt=""
          />
          <!-- {{$route.path === "/" ? $changeText(chanElement.nameMtext) + " Channel " : `${$changeText(chanElement.bdAreaNameMtext)} > ${$changeText(chanElement.nameMtext )}`}} -->
          <div v-if="$route.path === '/'" class="w100P flexAlignCenter">
            <p class="chanName textOverdot">
              {{ $changeText(chanElement.nameMtext) }}
            </p>
            <img
              class="chanIcon"
              src="@/assets/images/footer/icon_channel_fillin.svg"
              alt=""
            />
          </div>
          <div v-else class="dispInlineBlock">
            {{ $changeText(chanElement.nameMtext) }}
          </div>
          <p class="fr font13 lightGray fontNomal">
            {{
              $t('SEAR_TAB_ACT_CAHNNEL') +
              ' ' +
              $changeDateFormat(
                chanElement.updDate !== undefind
                  ? chanElement.updDate
                  : chanElement.teamUpdDate
              )
            }}
          </p>
        </div>
        <p
          v-if="$route.path === '/'"
          class="w100P fl font14 textLeft grayBlack"
        >
          {{
            $changeText(chanElement.memoMtext)
              ? $changeText(chanElement.memoMtext)
              : 'channel description'
          }}
        </p>
        <p
          v-if="$route.path === '/search'"
          class="w100P fl font14 textLeft grayBlack"
        >
          {{
            $changeText(chanElement.memoMtext)
              ? $changeText(chanElement.memoMtext)
              : ''
          }}
        </p>
        <div class="w100P fl font14 textLeft lightGray">
          <p class="fl font14">
            {{ $changeText(chanElement.bdAreaNameMtext) }}
          </p>
          <img
            src="@/assets/images/editChan/icon_user_Gray.svg"
            class="img-w15 mright-01 fl mleft-03 mtop-01"
            alt=""
          />
          <p class="fl font14 followCount">
            {{
              chanElement.followerCount !== undefind
                ? chanElement.followerCount
                : chanElement.fCount
            }}
          </p>
          <div
            v-if="
              $route.path === '/chanList' &&
              chanElement.creUserKey !== GE_USER.userKey
            "
            class="fr"
          >
            <p
              v-if="
                (chanElement &&
                  chanElement.followerKey &&
                  chanElement.followerKey !== null) ||
                (chanElement &&
                  chanElement.D_CHAN_AUTH &&
                  chanElement.D_CHAN_AUTH.followerKey)
              "
              @click.stop="preventDefault"
              class="fontBold unfollowBtn"
            >
              Following
            </p>
            <p
              v-else
              @click.stop="saveFollower"
              class="fontBold cursorP followBtn"
            >
              + Follow
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="
        $route.path === '/' &&
        chanElement.popCList &&
        chanElement.popCList.length > 0
      "
      class="w100P fl popularPostWrap"
    >
      <p class="font15 fontBold textLeft">Popular Post</p>
      <div class="popularContentsBox">
        <p
          @click="goChannelMain(chanElement)"
          class="font12 fl commonColor fontBold textLeft"
        >
          {{
            `${$changeText(chanElement.popCList[0].cabinetNameMtext)} Board > ${
              chanElement.popCList[0].showCreNameYn
                ? $changeText(chanElement.popCList[0].creUserName)
                : 'Anonymous'
            }`
          }}
        </p>
        <p
          @click="goChannelMain(chanElement)"
          class="font12 fr lightGray textLeft"
        >
          {{ `${$changeDateFormat(chanElement.popCList[0].creDate)}` }}
        </p>
        <div ref="contentsBoxRef" class="fl popularContentsItem">
          <p class="font14 textLeft fontBold">
            {{ chanElement.popCList[0].title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chanElement: {},
    pSelectedYn: Boolean
  },
  created() {
    if (this.$route.path === '/chanList') {
      this.$nextTick(() => {
        this.showFollowYn()
      })
    }
  },
  updated() {
    this.addImgEvnt()
  },
  mounted() {
    const this_ = this
    this.$nextTick(async () => {
      this_.addImgEvnt()
    })
  },
  data() {
    return {
      mDirectTeamKey: null,
      selectMemberObj: {},
      mFollowYn: false
    }
  },
  methods: {
    async addImgEvnt() {
      var contBody = this.$refs.contentsBoxRef
      if (!contBody) return
      this.mClickImgList = contBody.querySelectorAll('img')
      for (let m = 0; m < this.mClickImgList.length; m++) {
        var this_ = this
        this_.mClickImgList[m].addEventListener('click', () => {
          if (!this_.mContentMoreShowYn) {
            this_.$emit('openImgPop', [this_.mClickImgList, m])
          }
        })
      }
    },
    preventDefault() {
      return false
    },
    showFollowYn() {
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
    goChannelMain(chanElement) {
      var openPopParam = {}
      openPopParam.targetKey = chanElement.teamKey
      if (!openPopParam.targetKey) {
        openPopParam.targetKey = chanElement.targetKey
      }
      openPopParam.targetType = 'chanDetail'
      openPopParam.areaInfo = this.pAreaInfo
      this.$emit('openPop', openPopParam)
    },
    async saveFollower() {
      this.mFollowYn = true
      // eslint-disable-next-line no-new-object
      var typeParam = new Object()
      if (this.chanElement && this.chanElement.followerKey) {
        typeParam.followerKey = this.chanElement.followerKey
      }
      if (this.selectMemberObj.memberTypeItemKey) {
        typeParam.memberTypeItemKey = this.selectMemberObj.memberTypeItemKey
      }
      typeParam.memberTypeKey = this.selectMemberObj.memberTypeKey
      typeParam.userKey = this.GE_USER.userKey
      typeParam.teamKey = this.chanElement.teamKey
      await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveFollower',
        param: { follower: typeParam, appType: 'UB', doType: 'CR' }
      })
      this.CHANNEL_DETAIL.memberTypeKey = this.selectMemberObj.memberTypeKey
      this.CHANNEL_DETAIL.userKey = this.GE_USER.userKey
      this.CHANNEL_DETAIL.teamKey = this.chanElement.teamKey
      this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
      await this.$addChanList(this.chanElement.teamKey)
    }
  },
  computed: {
    GE_USER() {
      return this.$store.getters['UB_USER/GE_USER']
    },
    CHANNEL_DETAIL() {
      if (!this.chanElement && !this.mDirectTeamKey) return {}
      let teamKey
      if (this.chanElement) {
        teamKey = this.chanElement.targetKey || this.chanElement.teamKey
      } else if (this.mDirectTeamKey) {
        teamKey = this.mDirectTeamKey.teamKey
      }
      var detail = this.$getDetail('TEAM', teamKey)
      if (detail.length < 1) {
        return
      }
      if (detail && detail.length > 0) {
        if (detail[0].blackYn) this.$emit('bgcolor', detail[0].blackYn)

        if (
          detail[0] &&
          detail[0].blackYn !== undefined &&
          detail[0].blackYn !== null &&
          detail[0].blackYn !== ''
        ) {
          this.$emit('bgcolor', detail[0].blackYn)
        } else {
          this.$emit('bgcolor', false)
        }

        if (
          !detail[0].D_CHAN_AUTH ||
          detail[0].D_CHAN_AUTH === true ||
          (detail[0].D_CHAN_AUTH.followYn && !detail[0].D_CHAN_AUTH.settingYn)
        ) {
          return this.CHANNEL_DETAIL
        } else {
          return detail[0]
        }
      } else {
        if (this.CHANNEL_DETAIL) {
          if (
            this.CHANNEL_DETAIL &&
            this.CHANNEL_DETAIL.blackYn !== undefined &&
            this.CHANNEL_DETAIL.blackYn !== null &&
            this.CHANNEL_DETAIL.blackYn !== ''
          ) {
            this.$emit('bgcolor', this.CHANNEL_DETAIL.blackYn)
          } else {
            this.$emit('bgcolor', false)
          }
          return this.CHANNEL_DETAIL
        } else {
          return null
        }
      }
    }
  }
}
</script>

<style scoped>
.channelCardBox {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  transition: all 0.3s;
}
.channelCardBox:hover {
  box-shadow: inset 0 0 12px rgba(97, 97, 97, 0.6),
    0 0 7px rgba(255, 255, 255, 0.5);
}
.chanLogoImgWrap {
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  position: relative;
  flex-shrink: 0;
}
.normalChan {
  border: 0.5px solid rgba(0, 0, 0, 0.1);
}
.myChan {
  border: 0.5px solid #6768a7;
}
.chanCardWrap {
  min-height: 80px;
  border-bottom: 1px solid #cccccc70;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}
.selectedChannel {
  background-color: #fff;
  position: absolute;
  top: -10px;
  left: 10px;
  border: 2px solid #7978bd;
  border-radius: 10px;
  padding: 0 5px;
}
.chanIconWrap {
  background-color: white;
  position: relative;
  width: 60px;
  height: 60px;
  float: left;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.mngChanEffect {
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  bottom: 0;
  width: 20px;
  height: 20px;
  border-radius: 100%;
}
.mngChanEffect > img {
  float: left;
  width: 90%;
}
.chanNameWrap {
  width: calc(100% - 65px - 1rem);
}
.chanName {
  max-width: calc(100% - 30px);
}
.chanIcon {
  margin-left: 10px;
  width: 20px;
}
.dispInlineBlock {
  display: inline-block;
}
.followCount {
  margin-top: 1px;
}
.unfollowBtn {
  cursor: auto;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: #ccc;
  color: #062bb5;
}
.followBtn {
  border-radius: 5px;
  padding: 5px 10px;
  background-color: #062bb5;
  color: #fff;
}
.popularPostWrap {
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.popularContentsBox {
  width: 100%;
  min-height: 40px;
  border-radius: 5px;
  padding: 5px;
  background: #ffffff98;
}
.popularContentsItem {
  width: 100%;
  min-height: 40px;
  margin-left: 3px;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 5px;
  border-left: 2px solid #ccc;
}
.popularContentsItem > p {
  width: 99%;
  overflow: hidden;
}
.popularContentsItem > pre {
  width: calc(100% - 10px) !important;
  word-break: break-all !important;
}
.channelCardArea {
  position: relative;
  min-height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
