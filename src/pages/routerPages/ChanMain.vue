<i18n>
{
  "ko": {
    "CHAN_MSG_UNFOLLOW": "구독 취소하였습니다."
  },
  "en": {
    "CHAN_MSG_UNFOLLOW": "You have canceled your subscription."
  }
}
</i18n>
<template>
  <div
    v-if="CHANNEL_DETAIL && mChanInfo"
    class="scrollOn"
    id="chanMainRef"
    ref="chanMainRef"
    :style="`background-image: url(${
      CHANNEL_DETAIL.bgDomainPath +
      $changeUrlBackslash(CHANNEL_DETAIL.bgPathMtext)
    });height: calc(100% + ${Number($STATUS_HEIGHT)}px);  padding-top: ${Number(
      $STATUS_HEIGHT
    )}px;`"
  >
    <div
      v-if="!mChanCardShowYn"
      class="font20 fl fontBold chanInfoCard"
      :style="`top: ${Number($STATUS_HEIGHT)}px; height:${50}px `"
    >
      <p
        :style="
          CHANNEL_DETAIL.blackYn === 1 ? 'color:white;' : 'color: #6768a7;'
        "
      >
        {{ $changeText(CHANNEL_DETAIL.nameMtext) }}
      </p>
      <img
        class="fl"
        src="@/assets/images/channel/icon_official.svg"
        v-if="CHANNEL_DETAIL.officialYn"
        alt=""
      />
    </div>
    <div
      ref="chanCardTopArea"
      :class="['fade-out-element', { hidden: !mChanCardShowYn }]"
      class="fl chanCardTop"
      :style="`margin-top: ${50}px`"
    >
      <div
        class="chanIcon"
        :style="
          'background-image: url(' +
          (CHANNEL_DETAIL.logoDomainPath
            ? CHANNEL_DETAIL.logoDomainPath +
              $changeUrlBackslash(CHANNEL_DETAIL.logoPathMtext)
            : CHANNEL_DETAIL.logoPathMtext) +
          ');'
        "
      ></div>
      <div class="chanFollowArea">
        <div class="blankBox"></div>
        <div class="font20 fontBold chanNameBox">
          <p
            :style="
              CHANNEL_DETAIL.blackYn === 1 ? 'color:white;' : 'color: #6768a7;'
            "
          >
            {{ $changeText(CHANNEL_DETAIL.nameMtext) }}
          </p>
          <img
            class="fl"
            src="@/assets/images/channel/icon_official.svg"
            v-if="CHANNEL_DETAIL.officialYn"
            alt=""
          />
        </div>
        <!--follow-->
        <p
          @click="changeFollowYn"
          v-if="
            !ChanFollowYn &&
            CHANNEL_DETAIL.D_CHAN_AUTH &&
            !CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn
          "
          class="cursorP fl fontBold font14 followBtn"
        >
          + Follow
        </p>
        <!--following-->
        <p
          @click="changeFollowYn"
          class="fl fontBold font14 cursorP unfollowBtn"
          ref="followerCancelArea"
          id="followerCancelArea"
          v-if="
            ChanFollowYn &&
            CHANNEL_DETAIL.D_CHAN_AUTH &&
            !CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn
          "
        >
          Following
        </p>
      </div>
      <div class="chanDescriptionArea">
        <div class="chanFuncBox">
          <div class="cursorP favChanBox" @click="ImgClick">
            <img
              @class="cursorP"
              :src="
                CHANNEL_DETAIL.D_CHAN_AUTH.favDoKey
                  ? require('@/assets/images/channel/icon_star_fill.svg')
                  : require('@/assets/images/channel/icon_star.svg')
              "
              alt=""
            />
          </div>
          <div
            class="cursorP shareChanBox"
            data-clipboard-action="copy"
            id="copyTextBody"
            @click="copyText"
            :data-clipboard-text="CHANNEL_DETAIL.copyTextStr"
          >
            <img src="@/assets/images/contents/icon_share.png" />
          </div>
        </div>
        <div class="chanDescriptionBox">
          <div>
            <p class="fontBold fl w100P font14 textLeft">
              {{ $changeText(CHANNEL_DETAIL.memoMtext) }}
            </p>
            <div class="w100P fl countInfoBox">
              <div @click="openFollowerPop" class="font14 followerCount">
                Follower
                <span class="fontBold">{{ CHANNEL_DETAIL.followerCount }}</span>
              </div>
              <div class="font14 contentsCount">
                Total Contents
                <span class="fontBold contentsCount">{{
                  CHANNEL_DETAIL.totalContentsCount
                }}</span>
              </div>
            </div>
            <div class="w100P fl font14 textLeft">
              My Status
              <span class="fontBold contentsCount">{{
                $getFollowerType(CHANNEL_DETAIL.D_CHAN_AUTH)
                  ? $getFollowerType(CHANNEL_DETAIL.D_CHAN_AUTH)
                  : '-'
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="chanPushListArea"
      :style="`$`"
      class="fl"
      style="
        width: 100%;
        min-height: calc(100% - 210px);
        border-top: 2px solid #eeeeee;
        background: rgb(220, 221, 235);
      "
    >
      <pushList
        @updateContentsCount="updateContentsCount"
        :pCabinetKeyListStr="mCabKeyListStr"
        :pUnknownYn="mUnknownYn"
        @openImgPop="openImgPop"
        @goScroll="scrollOn"
        :pBoardList="mChanInfo.boardList"
        :propParams="mChanInfo.initData"
        :initData="mChanInfo.initData ? mChanInfo.initData.contentsList : null"
        @cMemoEditYn="changeMemoEditYn"
        :chanAlimYn="true"
        :pChannelDetail="CHANNEL_DETAIL"
        :chanAlimTargetType="mChanInfo.targetType"
        ref="ChanAlimListPushListCompo"
        :alimListYn="true"
        @openPage="openPage"
        :chanDetailKey="CHANNEL_DETAIL.teamKey"
        @numberOfElements="numberOfElements"
        @openLoading="$emit('openLoading')"
        @closeLoading="$emit('closeLoading')"
        @openPop="openWriteContentsPop"
        @openUserProfile="openItem"
        @changeMainTab="changeMainTab"
        isOpen="chanAlim"
        @memoEdit="memoEdit"
      />
    </div>
    <gConfirmPop
      :confirmText="mErrorPopBodyStr"
      :confirmType="mErrorPopBtnType"
      @no="mErrorPopShowYn = false"
      v-if="mErrorPopShowYn"
      @ok="confirmOk"
    />
    <writeContents
      v-if="writeContentsYn === true"
      ref="chanAlimListWritePushRefs"
      :contentType="mPushListMainTab === 'P' ? 'ALIM' : 'BOAR'"
      @closeXPop="closeWritePushPop"
      :params="mWriteAlimData"
      @openPop="openItem"
      :changeMainTab="changeMainTab"
      @toAlimFromBoard="toAlimFromBoard"
      :propData="mWriteBoardData"
    />
    <div v-if="writeContentsYn === true" class="popBg"></div>
    <div
      class="popBg"
      v-if="mFollowerListPopShowYn"
      @click="closeFollowerList"
    ></div>
    <followerList
      v-if="mFollowerListPopShowYn"
      :pManagerList="mManagerList"
      :pClosePop="closeFollowerList"
      :pOpenProfilePop="openProfilePop"
    />
    <div
      class="popBg"
      v-if="mUserDetailPopShowYn"
      @click="closeFollowerList"
    ></div>
    <userDetailPop
      v-if="mUserDetailPopShowYn"
      :propData="mPopParam"
      :pClosePop="closeUserDetailPop"
    />
    <img
      v-if="CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !GE_USER.unknownYn"
      id="writeBtn"
      src="@/assets/images/button/Icon_WriteBoardBtn.png"
      @click="openWritePushPop"
      alt="button for write contents"
      class="img-78 img-w66 writeContentsBtn"
    />
  </div>
</template>

<script>
/* eslint-disable vue/no-async-in-computed-properties */
import pushList from './PushList'
import writeContents from '@/components/popup/contents/WriteContents.vue'
import { onMessage } from '@/assets/js/webviewInterface'
import followerList from '@/components/pageComponents/channel/popup/FollowerListPop.vue'
import userDetailPop from '@/components/popup/UserDetailPop.vue'
export default {
  data() {
    return {
      scrollPosition: null,
      preDataYn: false,
      ChanFollowYn: false,
      mChanCardShowYn: true,
      mLastScroll: null,
      mCabKeyListStr: null,
      isImgChanged: false,
      mUnknownYn: false,
      mErrorPopShowYn: false,
      mErrorPopBodyStr: '',
      mErrorPopBtnType: 'two',
      myContentsCount: null,
      mSaveFollowerParam: null,
      mWriteAlimData: {},
      writeContentsYn: false,
      writeAlimPopId: '',
      mSaveFollowerType: '',
      mPushListMainTab: 'A',
      axiosQueue: [],
      mWriteBoardData: {},
      mWriteBoardPopId: '',
      mWriteBtnShowYn: true,
      mMakeDeepLinkIng: false,
      mChanPopMessage: '',
      commonChanPopShowYn: false,
      writeBottSheetYn: false,
      mwWidth: 0,
      mwHeight: 0,
      mDirectTeamKey: null,
      mChanInfo: {},
      mFollowerListPopShowYn: false,
      mManagerList: [],
      mUserDetailPopShowYn: false,
      mPopParam: {},
      selectMemberObj: null,
      mMemberTypeList: [],
      pushListWrap: null,
      mBookListPopShowYn: false,
      mProfilePopShowYn: true,
      mTeamDetail: []
    }
  },
  props: {
    propParams: {}
  },
  components: {
    pushList,
    writeContents,
    followerList,
    userDetailPop
  },
  mounted() {
    const intervalHandler = setInterval(() => {
      const chanMainRef = this.$refs.chanMainRef
      if (chanMainRef) {
        if (this.scrollPosition && Number(this.scrollPosition) > 0) {
          const chanCardTopRef = this.$refs.chanPushListArea
          const chanCardTopArea = this.$refs.chanCardTopArea
          chanMainRef.scrollTo({ top: 210 + 55 + Number(this.$STATUS_HEIGHT) })
          this.mChanCardShowYn = false
          const triggerPosition = chanCardTopRef.getBoundingClientRect().top
          const opacity = Math.max(
            0,
            1 - chanCardTopRef.clientHeight / triggerPosition
          )
          if (chanCardTopArea) {
            chanCardTopArea.style.opacity = opacity.toFixed(2)
          }
        }

        chanMainRef.addEventListener('scroll', this.handleScroll)
        clearInterval(intervalHandler)
      }
    }, 100)
  },
  methods: {
    updateContentsCount(type) {
      if (type === 'minus') {
        this.CHANNEL_DETAIL.totalContentsCount--
      } else if (type === 'plus') {
        this.CHANNEL_DETAIL.totalContentsCount++
      }
    },
    async closeWritePushPop(reloadYn) {
      this.writeContentsYn = false
    },
    async openWritePushPop() {
      if (
        this.propTeamKey &&
        this.mSelectedWriteType === 'ALIM' &&
        !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn &&
        !this.CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext
      ) {
        this.$showToastPop(this.$t('COMM_MSG_MEMB_NEED'))
        this.$checkDeleteHistory('bottomWriteSheets')
        this.$emit('openMember')
        return
      }
      var writeParam = {}
      writeParam.contentsJobkindId = 'BOAR'
      writeParam.targetKey = this.CHANNEL_DETAIL.teamKey
      writeParam.teamKey = this.CHANNEL_DETAIL.teamKey
      writeParam.currentTeamKey = this.CHANNEL_DETAIL.teamKey
      writeParam.targetType = 'writeContents'

      var teamList = await this.$getWriteBoardData(this.CHANNEL_DETAIL.teamKey)
      if (teamList === false) {
        this.$showToastPop(this.$t('BOTTOM_MSG_CHECK'))
        return
      }
      writeParam.selectBoardYn = true
      writeParam.initData = teamList
      this.$emit('openPop', writeParam)
    },
    handleScroll() {
      const chanCardTopRef = this.$refs.chanPushListArea
      const chanMainRef = this.$refs.chanMainRef
      const chanCardTopArea = this.$refs.chanCardTopArea
      if (!chanMainRef) return

      if (chanCardTopRef) {
        const scrollTop = chanMainRef.scrollTop
        if (scrollTop > this.mLastScroll) {
          // down
          if (
            chanCardTopRef.getBoundingClientRect().top <
            55 + Number(this.$STATUS_HEIGHT)
          ) {
            this.mChanCardShowYn = false
            const triggerPosition = chanCardTopRef.getBoundingClientRect().top
            const opacity = Math.max(
              0,
              1 - chanCardTopRef.clientHeight / triggerPosition
            )
            if (chanCardTopArea) {
              chanCardTopArea.style.opacity = opacity.toFixed(2)
            }
          }
        } else {
          // up
          if (
            chanCardTopRef.getBoundingClientRect().top >=
            49 + Number(this.$STATUS_HEIGHT)
          ) {
            this.mChanCardShowYn = true
            const opacity = Math.max(0, 1)
            if (chanCardTopArea) {
              chanCardTopArea.style.opacity = opacity.toFixed(2)
            }
          }
        }
        this.mLastScroll = scrollTop
      }
    },
    async confirmOk() {
      this.mErrorPopShowYn = false
      if (this.mSaveFollowerType === 'follow') {
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.admYn === true) {
          this.mErrorPopBodyStr =
            '관리자는 구독취소가 불가능합니다<br>소유자에게 문의해주세요'
          this.mErrorPopShowYn = true
          this.mErrorPopBtnType = 'two'
        } else {
          var fStatus = this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn
          this.mSaveFollowerParam = {}
          this.mSaveFollowerParam.teamKey = this.CHANNEL_DETAIL.teamKey
          this.mSaveFollowerParam.teamName = this.$changeText(
            this.CHANNEL_DETAIL.nameMtext
          )
          this.mSaveFollowerParam.userKey =
            this.$store.getters['UB_USER/GE_USER'].userKey
          this.mSaveFollowerParam.userName = this.$changeText(
            this.GE_USER.userDispMtext
          )
          var result = false
          if (fStatus) {
            this.ChanFollowYn = false
            if (
              this.axiosQueue.findIndex((item) => item === 'changeFollower') !==
              -1
            ) {
              return
            }
            this.axiosQueue.push('changeFollower')
            result = await this.$changeFollower(
              { follower: this.mSaveFollowerParam, doType: 'CR' },
              'del'
            )
            var queueIndex = this.axiosQueue.findIndex(
              (item) => item === 'changeFollower'
            )
            this.axiosQueue.splice(queueIndex, 1)
            this.CHANNEL_DETAIL.D_CHAN_AUTH = null
            this.CHANNEL_DETAIL.followerKey = null
            this.CHANNEL_DETAIL.userTeamInfo = null
            this.CHANNEL_DETAIL.followerCount -= 1
            this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', [
              this.CHANNEL_DETAIL
            ])

            this.$emit('showToastPop', this.$t('CHAN_MSG_UNFOLLOW'))
            if (this.$refs.ChanAlimListPushListCompo) {
              this.$refs.ChanAlimListPushListCompo.refreshAll()
            }
            if (result.result || result) {
              this.$emit('pageReload')
            } else {
              this.ChanFollowYn = true
              this.mErrorPopBodyStr = this.$t('COMMON_MSG_FAILED')
              this.mErrorPopBtnType = 'timeover'
              this.mErrorPopShowYn = true
            }
          } else {
            await this.okMember()
          }
        }
      }
    },
    changeMainTab(tab) {
      this.mPushListMainTab = tab
    },
    numberOfElements(num) {
      this.myContentsCount = num
    },
    memoEdit(editYn) {
      var btn = document.getElementById('writeBtn')
      if (editYn === true) {
        btn.style.display = 'none'
      } else {
        btn.style.display = 'block'
      }
    },
    async copyText() {
      if (
        this.mChanInfo.initData.team.copyTextStr === undefined &&
        this.CHANNEL_DETAIL.copyTextStr === undefined &&
        !this.mMakeDeepLinkIng
      ) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.mMakeDeepLinkIng = true
        var title =
          '[uniBuzzy]' + this.$changeText(this.CHANNEL_DETAIL.nameMtext)
        var message = this.$changeText(this.CHANNEL_DETAIL.memoMtext)
        var this_ = this
        this.$makeShareLink(
          this.CHANNEL_DETAIL.teamKey,
          'chanDetail',
          message,
          title
        ).then((res) => {
          this.CHANNEL_DETAIL.copyTextStr = res
          this_.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', [
            this.CHANNEL_DETAIL
          ])
          this_.mMakeDeepLinkIng = false
        })
      }
      var shareItem = {
        title: '[더알림] ' + this.$changeText(this.CHANNEL_DETAIL.nameMtext),
        text: this.CHANNEL_DETAIL.copyTextStr,
        url: this.CHANNEL_DETAIL.copyTextStr
      }
      if (this.$checkMobile() === 'IOS') {
        shareItem = {
          title: '[더알림] ' + this.$changeText(this.CHANNEL_DETAIL.nameMtext),
          text: '[더알림] ' + this.$changeText(this.CHANNEL_DETAIL.nameMtext),
          url: this.CHANNEL_DETAIL.copyTextStr
        }
      }
      if (navigator.share) {
        navigator.share(shareItem)
      } else {
        onMessage('REQ', 'nativeShare', shareItem)
      }
    },
    openChannelMsgPop() {
      this.writeBottSheetYn = false
      this.commonChanPopShowYn = true
    },
    changeMemoEditYn(memoEditYn) {
      this.mWriteBtnShowYn = memoEditYn
    },
    async changeRecvAlimYn() {
      if (
        this.axiosQueue.findIndex((item) => item === 'changeRecvAlimYn') !== -1
      ) {
        return
      }
      var param = {}
      param.followerKey = this.CHANNEL_DETAIL.userTeamInfo.followerKey
      var toastText = ''
      if (this.CHANNEL_DETAIL.D_CHAN_AUTH.notiYn === 1) {
        this.CHANNEL_DETAIL.D_CHAN_AUTH.notiYn = false
        param.notiYn = this.CHANNEL_DETAIL.D_CHAN_AUTH.notiYn
        toastText = '채널 알림이 비활성화 되었습니다'
      } else {
        this.CHANNEL_DETAIL.D_CHAN_AUTH.notiYn = true
        param.notiYn = this.CHANNEL_DETAIL.D_CHAN_AUTH.notiYn
        toastText = '채널 알림이 활성화 되었습니다'
      }
      this.axiosQueue.push('changeRecvAlimYn')
      this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])

      await this.$changeRecvAlimYn({ follower: param })
      await this.$addChanList(this.CHANNEL_DETAIL.teamKey).then(() => {
        var queueIndex = this.axiosQueue.findIndex(
          (item) => item === 'changeRecvAlimYn'
        )
        this.axiosQueue.splice(queueIndex, 1)
      })
      this.CHANNEL_DETAIL.copyTextStr = this.mChanInfo.initData.team.copyTextStr
      this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
      setTimeout(() => {
        this.$showToastPop(toastText)
      }, 500)
    },
    async ImgClick() {
      if (!this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn) {
        this.mErrorPopBodyStr = 'Follow this channel to enjoy more features.'
        this.mErrorPopBtnType = 'one'
        this.mErrorPopShowYn = true
        return
      }
      try {
        if (!this.CHANNEL_DETAIL.D_CHAN_AUTH.favDoKey) {
          const param = {
            targetKind: 'T',
            doType: 'LI',
            userKey: this.GE_USER.userKey,
            actYn: true,
            targetKey: this.CHANNEL_DETAIL.teamKey,
            userName: this.$changeText(this.GE_USER.userDispMtext)
          }
          const response = await this.$commonAxiosFunction({
            url: '/sUniB/tp.saveUserDo',
            param: param
          })
          this.CHANNEL_DETAIL.D_CHAN_AUTH.favDoKey = response.data.doKey
          this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', [
            this.CHANNEL_DETAIL
          ])
        } else {
          const param = {
            doKey: this.CHANNEL_DETAIL.D_CHAN_AUTH.favDoKey,
            targetKind: 'T',
            doType: 'LI',
            userKey: this.GE_USER.userKey,
            actYn: true,
            targetKey: this.CHANNEL_DETAIL.teamKey,
            userName: this.$changeText(this.GE_USER.userDispMtext)
          }
          await this.$commonAxiosFunction({
            url: '/sUniB/tp.deleteUserDo',
            param: param
          })
          this.CHANNEL_DETAIL.D_CHAN_AUTH.favDoKey = null
          this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', [
            this.CHANNEL_DETAIL
          ])
        }
      } catch (error) {
        console.error(error)
      }

      this.isImgChanged = !this.isImgChanged
    },
    openProfilePop(userInfo) {
      var openPopParam = {}
      openPopParam.targetKey = userInfo.teamKey
      openPopParam.teamKey = userInfo.teamKey
      openPopParam.targetType = 'bookMemberDetail'
      openPopParam.userKey = userInfo.userKey

      openPopParam.popHeaderText = this.$t('COMMON_TITLE_PROFILE')
      openPopParam.readOnlyYn = true
      this.mPopParam = openPopParam
      this.mFollowerListPopShowYn = false
      this.mUserDetailPopShowYn = true
    },
    openMemberTypePop() {
      this.mBookListPopShowYn = true
    },
    closeFollowerList() {
      this.mFollowerListPopShowYn = false
    },
    async openFollowerPop() {
      await this.getFollowerList()
      this.mFollowerListPopShowYn = true
    },
    closeUserDetailPop() {
      this.mUserDetailPopShowYn = false
    },
    async getFollowerList() {
      var result = {}
      var paramMap = new Map()
      paramMap.set('teamKey', this.CHANNEL_DETAIL.teamKey)
      paramMap.set('pageSize', 100)

      result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getFollowerList',
        param: Object.fromEntries(paramMap)
      })
      this.mManagerList = result.data.content
    },
    closeProfilePop() {
      this.mProfilePopShowYn = false
    },
    openWriteContentsPop(openPopParam) {
      this.writeBottSheetYn = false
      this.$emit('openPop', openPopParam)
    },
    openPage(value) {
      const obj = value
      obj.channelYn = true
      this.$emit('openPage', obj)
    },
    openImgPop(param) {
      this.$emit('openImgPop', param)
    },
    openCertiPop(param) {
      this.$emit('openPop', param)
    },
    goProfile() {
      var param = {}
      param.targetType = 'bookMemberDetail'
      param.readOnlyYn = true
      param.selfYn = true
      param.popHeaderText = '내 정보'
      this.$emit('openPop', param)
    },
    setSelectedList(data) {
      this.$refs.chanAlimListWritePushRefs.setSelectedList(data)
    },
    async okMember() {
      if (this.mMemberTypeList && this.selectMemberObj) {
        this.ChanFollowYn = true
        var typeParam = {}
        if (
          this.CHANNEL_DETAIL &&
          this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey
        ) {
          typeParam.followerKey = this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey
        }
        if (this.selectMemberObj.memberTypeItemKey) {
          typeParam.memberTypeItemKey = this.selectMemberObj.memberTypeItemKey
        }
        typeParam.memberTypeKey = this.selectMemberObj.memberTypeKey
        typeParam.userKey = this.GE_USER.userKey
        typeParam.teamKey = this.CHANNEL_DETAIL.teamKey
        await this.$commonAxiosFunction({
          url: '/sUniB/tp.saveFollower',
          param: { follower: typeParam, appType: 'UB', doType: 'CR' }
        })
        this.CHANNEL_DETAIL.memberTypeKey = this.selectMemberObj.memberTypeKey
        this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn = true
        this.CHANNEL_DETAIL.teamKey = this.selectMemberObj.teamKey
        this.CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext = 'member'
        this.ChanFollowYn = true
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
        if (this.$refs.ChanAlimListPushListCompo) {
          this.$refs.ChanAlimListPushListCompo.refreshAll()
        }
        await this.$addChanList(this.mChanInfo.teamKey)
      }
      this.$emit('closeLoading')
    },
    openPushDetailPop(param) {
      if (
        param.targetType === 'contentsDetail' ||
        param.targetType === 'createChannel'
      ) {
        param.openActivity = 'chanAlimList'
      }
      if (param.targetType === 'createChannel') {
        param.popHeaderText = '채널 수정'
      } else if (param.targetType === 'chanDetail') {
        if (param.targetKey === this.CHANNEL_DETAIL.teamKey) {
          return
        }
      }
      this.$emit('openPop', param)
    },
    backClick() {
      var hStack = this.$store.getters['UB_HISTORY/hStack']
      var history = this.$store.getters['UB_HISTORY/hStack']
      var removePage = history[history.length - 1]
      if (this.writeAlimPopId === hStack[hStack.length - 1]) {
        history = history.filter((element, index) => index < history.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', history)
        this.closeWritePushPop()
      } else if (this.mWriteBoardPopId === hStack[hStack.length - 1]) {
        history = history.filter((element, index) => index < history.length - 1)
        this.$store.commit('UB_HISTORY/setRemovePage', removePage)
        this.$store.commit('UB_HISTORY/updateStack', history)
        this.closeWritePushPop()
      }
    },
    async changeFollowYn() {
      this.mSaveFollowerType = 'follow'
      if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn === true) {
        this.mErrorPopBodyStr = 'Do you want to unfollow this channel?'
        this.mErrorPopBtnType = 'two'
        this.mErrorPopShowYn = true
      } else {
        this.ChanFollowYn = true
        this.confirmOk()
      }
    },
    setWindowSize() {
      this.mwWidth = window.innerWidth
      var nowHeight = window.innerHeight

      if (this.mwHeight < nowHeight) this.mwHeight = nowHeight
    },
    scrollOn() {
      const pushList = document.getElementById('pushListWrap')
      if (pushList) {
        if (this.mChanCardShowYn) {
        } else {
          if (pushList.scrollTop <= 0) {
            const chanCardTopRef = this.$refs.chanPushListArea
            const chanMainRef = this.$refs.chanMainRef
            const chanCardTopArea = this.$refs.chanCardTopArea
            if (!chanMainRef) return

            if (chanCardTopRef) {
              const scrollTop = chanMainRef.scrollTop
              // up

              this.mChanCardShowYn = true
              const opacity = Math.max(0, 1)
              if (chanCardTopArea) {
                chanCardTopArea.style.opacity = opacity.toFixed(2)
              }
              this.mLastScroll = scrollTop
            }
          }
        }
      }
    },
    openItem(param) {
      this.$emit('openPop', param)
    },
    async getChanMain() {
      const chanMainParam = {}
      chanMainParam.targetType = 'chanDetail'
      const encodedKey = Number(this.$route.params.encodedTeamKey)
      const teamKey = encodedKey
      chanMainParam.teamKey = teamKey
      chanMainParam.targetKey = teamKey
      const param = {}
      param.teamKey = teamKey
      param.fUserKey = this.GE_USER.userKey
      param.userKey = this.GE_USER.userKey
      try {
        const result = await this.$getViewData(
          { url: '/sUniB/tp.getChanMainBoard', param: param },
          false
        )
        if (!result || !result.data || result.data.result !== 'OK') {
          this.$showToastPop('Channel not found!')
          return
        }
        const teamDetail = result.data.team.content[0]
        if (
          teamDetail.userTeamInfo === undefined ||
          teamDetail.userTeamInfo === null ||
          teamDetail.userTeamInfo === ''
        ) {
          if (
            result.data.memberTypeList &&
            result.data.memberTypeList.length !== 0 &&
            result.data.memberTypeList[0].muserList
          ) {
            const index = result.data.memberTypeList[0].muserList.findIndex(
              (item) => item.userKey === this.GE_USER.userKey
            )
            if (index !== -1) {
              teamDetail.userTeamInfo =
                result.data.memberTypeList[0].muserList[index]
            }
          }
        }
        chanMainParam.nameMtext = teamDetail.nameMtext
        chanMainParam.chanName = teamDetail.nameMtext
        var initData = {}
        if (
          result.data.contentsListPage &&
          result.data.contentsListPage.content &&
          result.data.contentsListPage.content.length > 0
        ) {
          this.$store.dispatch(
            'UB_CHANNEL/AC_ADD_CONTENTS',
            result.data.contentsListPage.content
          )
        }
        initData = result.data
        initData.team = teamDetail
        initData.contentsList = result.data.contentsListPage
        if (!initData.cabinetKeyListStr) {
          initData.cabinetKeyListStr = result.data.cabinetKeyListStr
        }
        this.mCabKeyListStr = initData.cabinetKeyListStr
      } catch (error) {
        this.$showToastPop('Sorry! Please contact the administrator.')
        console.error(error)
      }
      chanMainParam.initData = initData
      this.mChanInfo = chanMainParam
      if (this.mChanInfo.initData.teamMenuList) {
        this.mChanInfo.boardList = this.mChanInfo.initData.teamMenuList
      } else {
        await this.getTeamMenuList(encodedKey)
      }
      if (initData.shortLink) {
        const initLink = JSON.parse(initData.shortLink.shortLink)
        this.mChanInfo.copyTextStr = initLink.shortLink
        initData.team.copyTextStr = initLink.shortLink
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', [initData.team])
        this.mMakeDeepLinkIng = false
      }
      this.$emit('clearInfo', {
        detail: this.mChanInfo,
        targetType: 'chanDetail'
      })
      if (
        this.mChanInfo.initData &&
        this.mChanInfo.initData.team &&
        this.mChanInfo.initData.team.content &&
        this.mChanInfo.initData.team.length > 0 &&
        this.mChanInfo.initData.team.content['0']
      ) {
        this.mTeamDetail = this.mChanInfo.initData.team.content['0']
      }
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      this.getMyChan(teamKey, paramMap)
    },
    async getMyChan(teamKey, paramMap) {
      if (
        this.mChanInfo.initData.cTeamList &&
        this.mChanInfo.initData.cTeamList.length > 0
      ) {
        var result1 = await this.$getTeamList(paramMap, false)
        var followList = result1.data.content
        for (let i = 0; i < followList.length; i++) {
          if (followList.teamKey !== teamKey) {
            followList[i].changeYn = true
          }
        }
        this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', followList)
      }
    },
    async getMemberTypeList() {
      var param = {}
      param.teamKey = Number(this.$route.params.encodedTeamKey)
      var memberTypeList = await this.$commonAxiosFunction(
        {
          url: '/sUniB/tp.getMemberTypeList',
          param: param
        },
        true
      )
      if (memberTypeList.data && memberTypeList.data.result) {
        this.mMemberTypeList = memberTypeList.data.memberTypeList
        if (this.mMemberTypeList.length > 0) {
          this.selectMemberObj = this.mMemberTypeList[0]
        }
      }
    },
    async getTeamMenuList(teamKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', teamKey)
      paramMap.set('currentTeamKey', teamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', this.GE_USER.userKey)

      var result = await this.$getTeamMenuList(paramMap, true)
      this.mChanInfo.boardList = result
    }
  },
  created() {
    this.$emit('enterCloudLoading', false)
    setTimeout(() => {
      this.$emit('showCloudLoading', false)
    }, 800)
    const preDataYn = localStorage.getItem('preDataYn')
    if (preDataYn && preDataYn === 'true') {
    } else {
      if (
        this.propParams &&
        this.propParams.targetType === 'chanDetail' &&
        this.propParams.initData
      ) {
        this.mChanInfo = this.propParams
        const initData = this.propParams.initData
        if (initData.cabinetKeyListStr) {
          this.mCabKeyListStr = initData.cabinetKeyListStr
        }
        if (initData.memberTypeList) {
          this.mMemberTypeList = initData.memberTypeList
          if (this.mMemberTypeList.length > 0) {
            this.selectMemberObj = this.mMemberTypeList[0]
          }
        }
        if (initData.teamMenuList) {
          this.mChanInfo.boardList = initData.teamMenuList
        }
        if (
          this.mChanInfo.initData.team.D_CHAN_AUTH &&
          this.mChanInfo.initData.team.D_CHAN_AUTH.followYn
        ) {
          this.$emit('followYn')
        }
        if (this.CHANNEL_DETAIL) {
          if (initData.shortLink) {
            const initLink = JSON.parse(initData.shortLink.shortLink)
            this.CHANNEL_DETAIL.copyTextStr = initLink.shortLink
            this.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', [
              this.CHANNEL_DETAIL
            ])
            this.mMakeDeepLinkIng = false
            this.ChanFollowYn = this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn
          } else {
            if (
              this.mChanInfo.initData.team.copyTextStr === undefined &&
              this.CHANNEL_DETAIL.copyTextStr === undefined &&
              !this.mMakeDeepLinkIng
            ) {
              this.mMakeDeepLinkIng = true
              const title =
                '[uniBuzzy]' + this.$changeText(this.CHANNEL_DETAIL.nameMtext)
              const message = this.$changeText(this.CHANNEL_DETAIL.memoMtext)
              const this_ = this
              // 각 타운의 부모채널인지 아닌지 확인
              const parent =
                this.CHANNEL_DETAIL.teamKey === this.GE_USER.myTeamKey ? 1 : 0
              const ketSet = {
                teamKey: this.CHANNEL_DETAIL.teamKey,
                parentYn: parent
              }
              this.$makeShareLink(ketSet, 'chanDetail', message, title).then(
                (res) => {
                  this.CHANNEL_DETAIL.copyTextStr = res
                  this_.$store.dispatch('UB_CHANNEL/AC_ADD_CHANNEL', [
                    this.CHANNEL_DETAIL
                  ])
                  this_.mMakeDeepLinkIng = false
                }
              )
              this.ChanFollowYn = this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn
            }
          }
        }
        if (!this.selectMemberObj) {
          this.getMemberTypeList()
        }
      } else {
        this.getChanMain()
        if (!this.selectMemberObj) {
          this.getMemberTypeList()
        }
      }
    }
  },
  computed: {
    CHANNEL_DETAIL() {
      if (!this.mChanInfo && !this.mDirectTeamKey) return {}
      let teamKey
      if (this.mChanInfo) {
        teamKey = this.mChanInfo.targetKey || this.mChanInfo.teamKey
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
    },
    GE_RECENT_CHANGE_TEAM() {
      return this.$store.getters['UB_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    settingBackground() {
      var imgPath =
        'url(' +
        (this.CHANNEL_DETAIL.bgDomainPath
          ? this.CHANNEL_DETAIL.bgDomainPath + this.CHANNEL_DETAIL.bgPathMtext
          : this.CHANNEL_DETAIL.bgPathMtext) +
        ')'
      return {
        '--wWidth':
          this.$getMobileYn() === true ? this.mwWidth + 'px ' : '100% ',
        '--wHeight':
          this.$getMobileYn() === true ? this.mwHeight + 'px ' : '100% ',
        '--backImg': imgPath,
        '--paddingTop': this.$STATUS_HEIGHT + 'px',
        'padding-top': Number(this.$STATUS_HEIGHT) + 'px'
      }
    },
    REQ_MEM_OBJ() {
      if (
        this.CHANNEL_DETAIL &&
        this.CHANNEL_DETAIL.userTeamInfo &&
        this.CHANNEL_DETAIL.userTeamInfo.reqMemberStatus
      ) {
        return {
          reqMemberStatus: this.CHANNEL_DETAIL.userTeamInfo.reqMemberStatus,
          reqMemberStr: this.CHANNEL_DETAIL.userTeamInfo.reqMemberStr
        }
      } else {
        return { reqMemberStatus: '00', reqMemberStr: null }
      }
    },
    GE_CHANNEL_NOTI_QUEUE() {
      return this.$store.getters['UB_CHANNEL/GE_CHANNEL_NOTI_QUEUE']
    },
    historyStack() {
      return this.$store.getters['UB_HISTORY/hRPage']
    },
    pageUpdate() {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    GE_USER() {
      return this.$store.getters['UB_USER/GE_USER']
    },
    GE_PRE_DATA() {
      return this.$store.getters['UB_PRE_DATA/GE_PRE_DATA']
    }
  },
  watch: {
    GE_PRE_DATA: {
      immediate: true,
      handler(val) {
        if (!val) return
        if (
          val.scrollPosition &&
          val.scrollPosition.position !== undefined &&
          val.scrollPosition.position !== null &&
          val.scrollPosition.targetKind &&
          val.scrollPosition.targetKey &&
          val.listData &&
          val.listData.length > 0
        ) {
          if (
            val.scrollPosition.targetKind === 'chanMain' &&
            val.scrollPosition.targetKey ===
              Number(this.$route.params.encodedTeamKey)
          ) {
            console.log('보자보자')
            console.log(val)
            this.allContentsList = val.listData
            this.mChanInfo = val.detailData
            this.mChanInfo.initData = {}
            this.mChanInfo.initData.contentsList = { content: val.listData }
            this.scrollPosition = val.scrollPosition.position
            this.mChanInfo.targetKey = Number(this.$route.params.encodedTeamKey)

            if (!this.CHANNEL_DETAIL) {
              this.$addChanList(this.mChanInfo.teamKey)
            }

            this.$emit('clearInfo', {
              detail: this.mChanInfo,
              targetType: 'chanDetail'
            })
          }
        }
      }
    },
    mChanCardShowYn(val, old) {
      const pushList = document.getElementById('pushListWrap')
      const chanMainRef = this.$refs.chanMainRef
      if (pushList) {
        if (val && !old) {
          pushList.className = 'scrollHidden'
          chanMainRef.className = 'scrollOn'
        } else if (!val && old) {
          pushList.className = 'scrollOn'
          chanMainRef.className = 'scrollHidden'
          if (this.scrollPosition && Number(this.scrollPosition) > 0) {
            pushList.scrollTo({ top: this.scrollPosition })
            this.scrollPosition = null
          }
        }
      }
    },
    CHANNEL_DETAIL: {
      immediate: true,
      handler(value, old) {
        if (value && value.D_CHAN_AUTH && value.D_CHAN_AUTH.followYn) {
          this.$emit('followYn')
          this.ChanFollowYn = true
        } else if (value && value.D_CHAN_AUTH && !value.D_CHAN_AUTH.followYn) {
          this.mUnknownYn = true
        }
        var blackYn = false
        if (
          value &&
          value.blackYn !== undefined &&
          value.blackYn !== null &&
          value.blackYn !== ''
        ) {
          if (value.blackYn === 1) {
            blackYn = true
          }
        }
        this.$emit('bgcolor', blackYn)
      },
      deep: true
    },
    GE_RECENT_CHANGE_TEAM(value, old) {
      // if (value === this.CHANNEL_DETAIL.teamKey) {
      // console.log('team [' + value + ']의 관련 정보가 변경되었음')
      // }
    },
    GE_MAIN_CHAN_LIST(value, old) {},
    pageUpdate(value, old) {
      this.backClick()
    },
    historyStack(value, old) {}
  }
}
</script>

<style scoped>
#chanMainRef {
  width: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
}
.chanInfoCard {
  width: 100%;
  color: #ffffff;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}
.chanInfoCard > img {
  width: 30px;
}
.chanCardTop {
  z-index: 1;
  width: 100%;
  transition: opacity 0.2s;
  position: relative;
  height: 160px;
  display: flex;
  flex-direction: column;
}
.hidden {
  opacity: 0 !important;
}
.chanIcon {
  width: 70px;
  height: 70px;
  position: absolute;
  left: 10px;
  border-radius: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #ffffff;
}
.chanFollowArea {
  width: 100%;
  height: 35px;
  display: flex;
}
.blankBox {
  width: 90px;
  height: 100%;
}
.chanNameBox {
  width: calc(100% - 170px);
  height: 100%;
  display: flex;
  align-items: flex-end;
}
.chanNameBox > img {
  width: 30px;
}
.followBtn {
  margin-left: -10px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  padding: 0px 10px;
  background-color: #062bb5;
  color: #fff;
}
.unfollowBtn {
  margin-left: -10px;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  padding: 0px 10px;
  background-color: #ccc;
  color: #062bb5;
}
.chanDescriptionArea {
  width: 100%;
  height: calc(100% - 35px);
  display: flex;
  background: #ffffff;
}
.chanFuncBox {
  width: 120px;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding: 10px 20px;
}
.favChanBox {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  background: #f1f1f1;
  border-radius: 30px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.favChanBox > img {
  width: 20px;
  height: 20px;
}
.shareChanBox {
  width: 40px;
  height: 40px;
  background: #f1f1f1;
  border-radius: 30px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shareChanBox > img {
  width: 20px;
  height: 20px;
}
.chanDescriptionBox {
  width: calc(100% - 120px);
  padding: 10px;
  height: 100%;
}
.chanDescriptionBox > div {
  width: 100%;
  height: 100%;
  border: 2px solid #ccc;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 10px 20px;
}
.chanDescriptionBox > div > p {
  word-break: break-all;
  min-height: 40px;
}
.countInfoBox {
  display: flex;
  align-items: space-between;
}
.followerCount {
  float: left;
  margin-right: 20px;
}
.followerCount > span {
  color: black;
  text-decoration: underline;
}
.contentsCount {
  color: black;
}
.popBg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  background: #00000030;
}
.writeContentsBtn {
  position: absolute;
  bottom: 70px;
  right: 10%;
  z-index: 9;
  cursor: pointer;
}
/* .showDown-enter {animation: showDown-dialog-fade-in 0.2s ease;}
.showDown-leave {animation: showDown-dialog-fade-out 0.2s ease forwards;}
.showDown-enter-active {animation: showDown-dialog-fade-in 0.2s ease;}
.showDown-leave-active {animation: showDown-dialog-fade-out 0.2s ease forwards;}
@keyframes showDown-dialog-fade-in {
    0% {transform: translateY(0);}
    100% {transform: translateY(100%);}
}
@keyframes showDown-dialog-fade-out {
    0% {transform: translateY(100%);}
    100% { transform: translateY(0);}
}
 */
</style>
