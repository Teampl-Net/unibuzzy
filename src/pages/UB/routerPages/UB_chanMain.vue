<template>
    <div v-if="CHANNEL_DETAIL && mChanInfo" class="scrollOn" ref="chanMainRef" style="width: 100%;" :style="`background-position: top; background-size: cover; background-repeat: no-repeat;  background-image: url(${CHANNEL_DETAIL.bgDomainPath + CHANNEL_DETAIL.bgPathMtext});height: calc(100% + ${Number($STATUS_HEIGHT)}px);  padding-top: ${Number($STATUS_HEIGHT)}px;`">
        <div v-if="!mChanCardShowYn" style="width: 100%; color: #FFFFFF; display: flex; position: absolute; align-items: center; justify-content: center; background-size: cover; background-position: top;background-repeat: no-repeat;" class="font20 fl fontBold" :style="`top: ${Number($STATUS_HEIGHT)}px; height:${ 50}px `" >
            <p :style="CHANNEL_DETAIL.blackYn === 1 ? 'color:white;' : 'color: #6768a7;'">{{$changeText(CHANNEL_DETAIL.nameMtext)}}</p>
            <img
                class="fl"
                src="../../../assets/images/channel/icon_official.svg"
                v-if="CHANNEL_DETAIL.officialYn"
                style="width: 30px"
                alt=""
            />
        </div>
        <div ref="chanCardTopArea"  :class="['fade-out-element', { 'hidden': !mChanCardShowYn }]" class="fl" style=" z-index: 1; width: 100%; transition: opacity 0.2s;   position: relative; height: 160px; display: flex; flex-direction: column; " :style="`margin-top: ${50}px`" >
            <div style="width: 70px; height: 70px; position: absolute; left: 10px; border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center; background-color: #FFFFFF;" class="" :style="'background-image: url(' + (CHANNEL_DETAIL.logoDomainPath ? this.CHANNEL_DETAIL.logoDomainPath + this.CHANNEL_DETAIL.logoPathMtext : this.CHANNEL_DETAIL.logoPathMtext) + ');'"></div>
            <div style="width: 100%; height: 35px; display: flex; ">
                <div style="width: 90px; height: 100%;"></div>
                <div style="width: calc(100% - 170px); height: 100%; display:flex; align-items: flex-end; " class="font20 fontBold">
                    <p :style="CHANNEL_DETAIL.blackYn === 1 ? 'color:white;' : 'color: #6768a7;'">{{$changeText(CHANNEL_DETAIL.nameMtext)}}</p>
                    <img
                        class="fl"
                        src="../../../assets/images/channel/icon_official.svg"
                        v-if="CHANNEL_DETAIL.officialYn"
                        style="width: 30px"
                        alt=""
                    />
                </div>
                <!--follow-->
                <p style="margin-left:-10px; height:30px; line-height:30px;  border-radius:5px; padding:0px 10px; background-color:#062BB5; color:#fff;" @click="changeFollowYn" v-if="!ChanFollowYn && (CHANNEL_DETAIL.D_CHAN_AUTH && !CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn)" class="cursorP fl fontBold font14">+ Follow</p>
                <!-- <p style="margin-left:-10px; height:30px; line-height:30px;  border-radius:5px; padding:0px 10px; background-color:#062BB5; color:#fff;" @click="changeFollowYn" v-if="!CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !GE_USER.unknownYn || !ffff" class="cursorP fl fontBold font14">+ Follow</p> -->
                <!--following-->
                <p style="margin-left:-10px; height:30px; line-height:30px; border-radius:5px; padding:0px 10px; background-color:#ccc; color:#062BB5;" @click="changeFollowYn" class="fl fontBold font14 cursorP" ref="followerCancelArea" id="followerCancelArea" v-if="ChanFollowYn && (CHANNEL_DETAIL.D_CHAN_AUTH && !CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn)">Following</p>
                <!-- <p style="margin-left:-10px; height:30px; line-height:30px; border-radius:5px; padding:0px 10px; background-color:#ccc; color:#062BB5;" @click="changeFollowYn" class="fl fontBold font14 cursorP" ref="followerCancelArea" id="followerCancelArea" v-if="CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn || ffff">Following</p> -->

            </div>
            <div style="width: 100%; height: calc(100% - 35px); display: flex; background: #FFFFFF;">
                <div style="width: 120px; height: 100%; display: flex; align-items: flex-end; padding: 10px 20px; ">
                    <div
                        class="cursorP"
                        style="
                            width: 40px;
                            height: 40px;
                            margin-right: 10px;
                            background: #f1f1f1;
                            border-radius: 30px;
                            float: left;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        "
                        @click="ImgClick"
                        >
                        <img
                            @class="cursorP"
                            width="20"
                            height="20"
                            :src="
                            CHANNEL_DETAIL.D_CHAN_AUTH.favDoKey
                                ? require('@/assets/images/channel/icon_star_fill.svg')
                                : require('@/assets/images/channel/icon_star.svg')
                            "
                            alt=""
                        />
                    </div>
                    <div
                        class="cursorP"
                        style="
                            width: 40px;
                            height: 40px;
                            background: #f1f1f1;
                            border-radius: 30px;
                            float: left;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        "
                        data-clipboard-action="copy"
                        id="copyTextBody"
                        @click="copyText"
                        :data-clipboard-text="CHANNEL_DETAIL.copyTextStr"
                        >
                        <img
                            src="../../../assets/images/contents/icon_share.png"
                            width="20"
                            height="20"
                        />
                    </div>
                </div>
                <div style="width: calc(100% - 120px); padding: 10px; height: 100%;">
                    <div style="width: 100%; height: 100%; border: 2px solid #ccc; display: flex; flex-direction: column; border-radius: 5px; padding: 10px 20px;"  >
                        <p class="fontBold fl w100P font14 textLeft" style="word-break: break-all; min-height: 40px;">{{ $changeText(CHANNEL_DETAIL.memoMtext) }}</p>
                        <div
                            class="w100P fl"
                            style="display: flex; align-items: space-between"
                            >
                            <div
                                @click="openFollowerPop"
                                class="font14"
                                style="float: left; margin-right: 20px"
                            >
                                Follower
                                <span
                                style="color: black; text-decoration: underline"
                                class="fontBold"
                                >{{ CHANNEL_DETAIL.followerCount }}</span
                                >
                            </div>
                            <div class="font14">
                                Total Contents
                                <span class="fontBold" style="color: black">{{
                                CHANNEL_DETAIL.totalContentsCount
                                }}</span>
                            </div>
                            <!-- <div v-if="mChanInfo.managerList" class="fontBold font14" style="float: left;">Manager: <span style="color:black; font-weight: 1000;">{{ mChanInfo.managerList.length }}</span></div> -->
                        </div>
                        <div class="w100P fl font14 textLeft">
                        My Status
                        <span class="fontBold" style="color: black">{{
                            this.$getFollowerType(CHANNEL_DETAIL.D_CHAN_AUTH)
                            ? this.$getFollowerType(CHANNEL_DETAIL.D_CHAN_AUTH)
                            : "-"
                        }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ref="chanPushListArea" :style="`$`" class="fl"  style="width: 100%; min-height: calc(100% - 210px); border-top: 2px solid #eeeeee; background: rgb(220, 221, 235);">
            <pushList
                :pCabinetKeyListStr="mCabKeyListStr"
                :pUnknownYn="mUnknownYn"
                @openImgPop="openImgPop"
                @goScroll="scrollOn"
                :pBoardList="mChanInfo.boardList"
                :propParams="this.mChanInfo.initData"
                :initData="this.mChanInfo.initData.contentsList"
                @cMemoEditYn="changeMemoEditYn"
                :targetContents="{
                targetContentsKey: mChanInfo.targetContentsKey,
                jobkindId: mChanInfo.jobkindId,
                }"
                :chanAlimYn="true"
                :pChannelDetail="this.CHANNEL_DETAIL"
                :chanAlimTargetType="this.mChanInfo.targetType"
                ref="ChanAlimListPushListCompo"
                :alimListYn="true"
                @openPage="openPage"
                :chanDetailKey="this.CHANNEL_DETAIL.teamKey"
                @numberOfElements="numberOfElements"
                @targetContentScrollMove="targetContentScrollMove"
                @openLoading="this.$emit('openLoading')"
                @closeLoading="this.$emit('closeLoading')"
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
        <div
            v-if="writeBottSheetYn"
            @click="writeBottSheetYn = false"
            style="
                width: 100%;
                height: 100%;
                position: absolute;
                z-index: 10;
                left: 0;
                top: 0;
                background: #00000030;
            "
            >
        </div>
        <transition name="showUp">
            <writeBottSheet
                v-if="writeBottSheetYn === true"
                @openPop="openWriteContentsPop"
                @closePop="writeBottSheetYn = false"
                :propTeamKey="CHANNEL_DETAIL.teamKey"
                @openMember="openChannelMsgPop()"
            />
        </transition>
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
        <div
            v-if="writeContentsYn === true"
            style="
                position: absolute;
                top: 0;
                left: 0;
                z-index: 10;
                background: #00000050;
                width: 100vw;
                min-height: 100vh;
            "
            class=""
            >
        </div>
        <div
            style="
                background-color: #00000050;
                width: 100%;
                height: 100vh;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 100;
            "
            v-if="mFollowerListPopShowYn"
            @click="closeFollowerList"
            >
        </div>
        <followerList
            v-if="mFollowerListPopShowYn"
            :pManagerList="mManagerList"
            :pClosePop="closeFollowerList"
            :pOpenProfilePop="openProfilePop"
        />
        <div
            style="
                background-color: #00000050;
                width: 100%;
                height: 100vh;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 100;
            "
            v-if="mUserDetailPopShowYn"
            @click="closeFollowerList"
            >
        </div>
        <userDetailPop
            v-if="mUserDetailPopShowYn"
            :propData="mPopParam"
            :pClosePop="closeUserDetailPop"
        />
        <img
        v-if="CHANNEL_DETAIL.D_CHAN_AUTH.followYn && !GE_USER.unknownYn"
        id="writeBtn"
        src="../../../assets/images/button/Icon_WriteAlimBtn.png"
        @click="openWritePushPop"
        alt="알림 작성 버튼"
        style="
            position: absolute;
            bottom: 70px;
            right: 10%;
            z-index: 9;
            cursor: pointer;
        "
        class="img-78 img-w66"
        />
    </div>
</template>

<script>
/* eslint-disable vue/no-async-in-computed-properties */
import pushList from './UB_pushList'
import writeContents from '../../../components/popup/D_writeContents.vue'
import { onMessage } from '../../../assets/js/webviewInterface'
// import recMemberPop from '../../../components/popup/member/D_recMemberPop.vue'
// import boardWrite from '../../board/Tal_boardWrite.vue'
import writeBottSheet from '../../../components/pageComponents/main/unit/D_contentsWriteBottSheet.vue'
import followerList from '../../../components/UB/popup/UB_followerList.vue'
import userDetailPop from '../../../components/UB/popup/UB_userDetailPop.vue'
// import unknownLoginPop from '@/components/pageComponents/channel/D_unknownLoginPop.vue'
// import { AES, enc } from 'crypto-js'
export default {
  data () {
    return {
      ChanFollowYn: false,
      mChanCardShowYn: true,
      mLastScroll: null,
      mCabKeyListStr: null,
      imgSource: '/resource/common/memIconPublic.svg',
      isImgChanged: false,
      mUnknownLoginPopYn: false,
      mUnknownYn: false,
      smallPopYn: false,
      alimListToDetail: false,
      mChanMainScrollWrap: null,
      mChanMainScrollDirection: null,
      mChanMainScrollPosition: null,
      mErrorPopShowYn: false,
      mErrorPopBodyStr: '',
      mErrorPopBtnType: 'two',
      mChanInfoPopShowYn: false,
      myContentsCount: null,
      mSaveFollowerParam: null,
      mWriteAlimData: {},
      writeContentsYn: false,
      writeAlimPopId: '',
      mChanNameLongYn: false,
      mSaveFollowerType: '',
      mPushListMainTab: 'A',
      axiosQueue: [],
      mWriteBoardData: {},
      mWriteBoardPopId: '',
      mReceptMemPopShowYn: false,
      mWriteBtnShowYn: true,
      mMakeDeepLinkIng: false,
      mChanPopMessage: '',
      commonChanPopShowYn: false,
      writeBottSheetYn: false,
      mwWidth: 0,
      mwHeight: 0,
      prevVisualViewport: 0,
      mDirectTeamKey: null,
      mChanInfo: {},
      mFollowerListPopShowYn: false,
      mManagerList: [],
      mUserDetailPopShowYn: false,
      mPopParam: {},
      selectMemberObj: null,
      mMemberTypeList: [],
      mBoardContentsList: [],
      pushListWrap: null,
      mAxiosQueue: [],
      mBookListPopShowYn: false,
      mProfilePopShowYn: true,
      mTeamDetail: []
    }
  },
  props: {
    pCabKeyListStr: {},
    propParams: {},
    pClearInfo: Function,
    pAreaInfo: {},
    pGoChannelMain: Function
  },
  components: {
    pushList,
    writeBottSheet,
    writeContents,
    followerList,
    userDetailPop
  },
  mounted () {
    const intervalHandler = setInterval(() => {
      const chanMainRef = this.$refs.chanMainRef
      if (chanMainRef) {
        chanMainRef.addEventListener('scroll', this.handleScroll)
        clearInterval(intervalHandler)
      }
    }, 100)
  },
  methods: {
    async closeWritePushPop (reloadYn) {
      this.writeContentsYn = false
    },
    async openWritePushPop () {
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
      // this.mSeleteWriteTypePopShowYn = false
    },
    handleScroll () {
      const chanCardTopRef = this.$refs.chanPushListArea
      const chanMainRef = this.$refs.chanMainRef
      const chanCardTopArea = this.$refs.chanCardTopArea
      if (!chanMainRef) return

      if (chanCardTopRef) {
        const scrollTop = chanMainRef.scrollTop
        if (scrollTop > this.mLastScroll) {
          // down

          if (chanCardTopRef.getBoundingClientRect().top < (55 + Number(this.$STATUS_HEIGHT))) {
            this.mChanCardShowYn = false
            const triggerPosition = chanCardTopRef.getBoundingClientRect().top
            const opacity = Math.max(0, 1 - (chanCardTopRef.clientHeight / triggerPosition))
            if (chanCardTopArea) {
              chanCardTopArea.style.opacity = opacity.toFixed(2)
            }
            // chanCardTopRef.style.marginTop = Number(this.$STATUS_HEIGHT) + 'px'
          }
        } else {
          // up
          // const triggerPosition = chanCardTopRef.getBoundingClientRect().top

          if (chanCardTopRef.getBoundingClientRect().top >= (49 + Number(this.$STATUS_HEIGHT))) {
            this.mChanCardShowYn = true
            // chanCardTopRef.style.marginTop = ''
            const opacity = Math.max(0, 1)
            if (chanCardTopArea) {
              chanCardTopArea.style.opacity = opacity.toFixed(2)
            }
          }
        }
        this.mLastScroll = scrollTop
        console.log('mLastScroll', this.mLastScroll)
        console.log('chanCardTopRef', chanCardTopRef.getBoundingClientRect().top)
      }
    },
    async confirmOk () {
      this.mErrorPopShowYn = false
      if (this.mSaveFollowerType === 'follow') {
        console.log('====here===')
        if (this.CHANNEL_DETAIL.D_CHAN_AUTH.admYn === true) {
          this.mErrorPopBodyStr =
            '관리자는 구독취소가 불가능합니다<br>소유자에게 문의해주세요'
          this.mErrorPopShowYn = true
          this.mErrorPopBtnType = 'two'
        } else {
          console.log('====here===')
          var fStatus = this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn
          // eslint-disable-next-line no-new-object
          this.mSaveFollowerParam = new Object()
          this.mSaveFollowerParam.teamKey = this.CHANNEL_DETAIL.teamKey
          this.mSaveFollowerParam.teamName = this.$changeText(
            this.CHANNEL_DETAIL.nameMtext
          )
          this.mSaveFollowerParam.userKey =
            this.$store.getters['D_USER/GE_USER'].userKey
          this.mSaveFollowerParam.userName = this.$changeText(
            this.GE_USER.userDispMtext
          )
          var result = false
          if (fStatus) {
            this.ChanFollowYn = false
            if (
              this.axiosQueue.findIndex((item) => item === 'changeFollower') !==
              -1
            ) { return }
            this.axiosQueue.push('changeFollower')
            result = await this.$changeFollower(
              { follower: this.mSaveFollowerParam, doType: 'CR' },
              'del'
            )
            var queueIndex = this.axiosQueue.findIndex(
              (item) => item === 'changeFollower'
            )
            // this.axiosQueue = this.axiosQueue.splice(queueIndex, 1)
            this.axiosQueue.splice(queueIndex, 1)
            this.CHANNEL_DETAIL.D_CHAN_AUTH = null
            this.CHANNEL_DETAIL.followerKey = null
            this.CHANNEL_DETAIL.userTeamInfo = null
            this.CHANNEL_DETAIL.followerCount -= 1
            this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [
              this.CHANNEL_DETAIL
            ])

            this.$emit('showToastPop', '구독 취소가 완료되었습니다.')
            if (this.$refs.ChanAlimListPushListCompo) {
              this.$refs.ChanAlimListPushListCompo.initGetContentsList()
            }
            this.getChanMain()
            if (result.result || result) {
              this.$emit('pageReload')
            } else {
              this.ChanFollowYn = true
              this.mErrorPopBodyStr = '실패했습니다. 관리자에게 문의해주세요'
              this.mErrorPopBtnType = 'timeover'
              this.mErrorPopShowYn = true
            }
          } else {
            console.log('====here===')
            await this.okMember()
            // this.mChanPopMessage = '[' + this.$changeText(this.CHANNEL_DETAIL.nameMtext) + '] 채널의 구독자가 되었습니다.<br>멤버가 되면<br>우리채널에 알림을 보낼 수 있어요!<br>멤버들끼리 자유롭게 소통할 수 있어요!'
            // this.openChannelMsgPop()
          }
        }
      }
    },
    changeMainTab (tab) {
      this.mPushListMainTab = tab
    },
    numberOfElements (num) {
      this.myContentsCount = num
    },
    memoEdit (editYn) {
      var btn = document.getElementById('writeBtn')
      if (editYn === true) {
        btn.style.display = 'none'
      } else {
        btn.style.display = 'block'
      }
    },
    async copyText () {
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
          this_.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [
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
    openChannelMsgPop () {
      this.writeBottSheetYn = false
      this.commonChanPopShowYn = true
    },
    changeMemoEditYn (memoEditYn) {
      this.mWriteBtnShowYn = memoEditYn
    },
    async changeRecvAlimYn () {
      if (
        this.axiosQueue.findIndex((item) => item === 'changeRecvAlimYn') !== -1
      ) { return }
      // eslint-disable-next-line no-new-object
      var param = new Object()
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
      this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])

      await this.$changeRecvAlimYn({ follower: param })
      await this.$addChanList(this.CHANNEL_DETAIL.teamKey).then(() => {
        var queueIndex = this.axiosQueue.findIndex(
          (item) => item === 'changeRecvAlimYn'
        )
        this.axiosQueue.splice(queueIndex, 1)
      })
      this.CHANNEL_DETAIL.copyTextStr =
        this.mChanInfo.initData.team.copyTextStr
      this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
      setTimeout(() => {
        this.$showToastPop(toastText)
      }, 500)
    },
    async ImgClick () {
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
          this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [
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
          this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [
            this.CHANNEL_DETAIL
          ])
        }
      } catch (error) {
        console.error(error)
      }

      this.isImgChanged = !this.isImgChanged
    },
    openProfilePop (userInfo) {
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
    openMemberTypePop () {
      this.mBookListPopShowYn = true
    },
    closeFollowerList () {
      this.mFollowerListPopShowYn = false
    },
    async openFollowerPop () {
      await this.getFollowerList()
      this.mFollowerListPopShowYn = true
    },
    closeUserDetailPop () {
      this.mUserDetailPopShowYn = false
    },
    async getFollowerList () {
      var result = {}
      var paramMap = new Map()
      // paramMap.set('showProfileYn', true)
      paramMap.set('teamKey', this.CHANNEL_DETAIL.teamKey)
      paramMap.set('pageSize', 100)

      result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getFollowerList',
        param: Object.fromEntries(paramMap)
      })
      this.mManagerList = result.data.content
    },
    closeProfilePop () {
      this.mProfilePopShowYn = false
    },
    openWriteContentsPop (openPopParam) {
      this.writeBottSheetYn = false
      this.$emit('openPop', openPopParam)
    },
    openPage (value) {
      const obj = value
      obj.channelYn = true
      this.$emit('openPage', obj)
    },
    openImgPop (param) {
      this.$emit('openImgPop', param)
    },
    openCertiPop (param) {
      console.log(param)
      this.$emit('openPop', param)
    },
    goProfile () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'bookMemberDetail'
      param.readOnlyYn = true
      param.selfYn = true
      param.popHeaderText = '내 정보'
      this.$emit('openPop', param)
    },
    setSelectedList (data) {
      this.$refs.chanAlimListWritePushRefs.setSelectedList(data)
    },
    async okMember () {
      console.log('====here222===')
      console.log('잉?', this.mMemberTypeList, this.selectMemberObj)
      if (this.mMemberTypeList && this.selectMemberObj) {
        console.log('====here222===')
        this.ChanFollowYn = true
        // eslint-disable-next-line no-new-object
        var typeParam = new Object()
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
        console.log('typeParam', typeParam)
        // } else {
        //   this.selectMemberObj.initData = memberTypeItemList.data.memberTypeItemList
        //   return true
        // }
        // this.memberTypeItemList = memberTypeItemList.data.memberTypeItemList
        this.CHANNEL_DETAIL.memberTypeKey = this.selectMemberObj.memberTypeKey
        this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn = true
        this.CHANNEL_DETAIL.teamKey = this.selectMemberObj.teamKey
        this.CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext = 'member'
        this.ChanFollowYn = true
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
        this.getChanMain()
        if (this.$refs.ChanAlimListPushListCompo) {
          this.$refs.ChanAlimListPushListCompo.initGetContentsList()
        }
        await this.$addChanList(this.mChanInfo.teamKey)
      }
      this.$emit('closeLoading')
    },
    openPushDetailPop (param) {
      // eslint-disable-next-line no-debugger
      debugger
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
    backClick () {
      var hStack = this.$store.getters['D_HISTORY/hStack']
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      if (this.writeAlimPopId === hStack[hStack.length - 1]) {
        history = history.filter(
          (element, index) => index < history.length - 1
        )
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', history)
        this.closeWritePushPop()
      } else if (this.mWriteBoardPopId === hStack[hStack.length - 1]) {
        history = history.filter(
          (element, index) => index < history.length - 1
        )
        this.$store.commit('D_HISTORY/setRemovePage', removePage)
        this.$store.commit('D_HISTORY/updateStack', history)
        this.closeWritePushPop()
      }
    },
    openPop () {
      this.alimListToDetail = true
      // thiopenPop.mChanInfoPopShowYn = true
    },
    closeDetailPop () {
      var history = this.$store.getters['D_HISTORY/hStack']
      var removePage = history[history.length - 1]
      history = history.filter((element, index) => index < history.length - 1)
      this.$store.commit('D_HISTORY/setRemovePage', removePage)
      this.$store.commit('D_HISTORY/updateStack', history)
      this.mChanInfoPopShowYn = false
    },
    async changeFollowYn () {
      this.mSaveFollowerType = 'follow'
      if (this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn === true) {
        this.mErrorPopBodyStr = 'Do you want to unfollow this channel?'
        this.mErrorPopBtnType = 'two'
        this.mErrorPopShowYn = true
      } else {
        // this.mErrorPopBodyStr = 'You followed' + 'Channel name'
        // this.mErrorPopBtnType = 'one'
        // this.mErrorPopShowYn = true
        this.ChanFollowYn = true
        this.confirmOk()
        // this.$router.go(0)
      }
    },
    editChan () {
      var param = {}
      param.targetType = 'createChannel'
      param.popHeaderText = '채널 수정'
      param.targetKey = this.CHANNEL_DETAIL.teamKey
      param.modiYn = true
      param.ownerYn = this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn
      this.$emit('openPop', param)
    },
    reloadPage () {
      this.readyFunction()
    },
    setWindowSize () {
      this.mwWidth = window.innerWidth
      var nowHeight = window.innerHeight

      if (this.mwHeight < nowHeight) this.mwHeight = nowHeight
    },
    scrollOn () {
      const pushList = document.getElementById('pushListWrap')
      if (pushList) {
        if (this.mChanCardShowYn) {
          // pushList.className = 'scrollHidden'
        } else {
          if (pushList.scrollTop <= 0) {
            const chanCardTopRef = this.$refs.chanPushListArea
            const chanMainRef = this.$refs.chanMainRef
            const chanCardTopArea = this.$refs.chanCardTopArea
            if (!chanMainRef) return

            if (chanCardTopRef) {
              const scrollTop = chanMainRef.scrollTop
              // up
              // const triggerPosition = chanCardTopRef.getBoundingClientRect().top

              this.mChanCardShowYn = true
              // chanCardTopRef.style.marginTop = ''
              const opacity = Math.max(0, 1)
              if (chanCardTopArea) {
                chanCardTopArea.style.opacity = opacity.toFixed(2)
              }
              this.mLastScroll = scrollTop
            }
          }
        }
      }
      /*       console.log('scrollOn')
      const chanCardTopRef = this.$refs.chanPushListArea
      if (chanCardTopRef) {
        console.log(chanCardTopRef.scrollTop)
      } */
      // pushList 스크롤시 발생하는듯
    },
    targetContentScrollMove (wich, jobkindId) {
      // 22
      console.log(wich)
    },
    handleResize (event) {
      if (this.$checkMobile() === 'IOS') {
      } else {
        this.setWindowSize()
      }
    },
    openItem (param) {
      this.$emit('openPop', param)
    },
    async getChanMain () {
      // eslint-disable-next-line no-debugger
      debugger
      const chanMainParam = {}
      chanMainParam.targetType = 'chanDetail'
      const encodedKey = Number(this.$route.params.encodedTeamKey)
      // const encryptedKey = decodeURIComponent(encodedKey)
      // const teamKey = AES.decrypt(encryptedKey, 'encryptionSecret').toString(enc.Utf8)
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
        // eslint-disable-next-line no-debugger
        debugger
        if (!result || !result.data || result.data.result !== 'OK') {
          // this.$showToastPop('채널을 찾을 수 없습니다!')
          this.$showToastPop('Channel not found!')
          return
        }
        const teamDetail = result.data.team.content[0]
        console.log('teamDetail')
        console.log(teamDetail)
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
        // this.mCabKeyListStr = result.data.cabinetKeyListStr
        await this.$addChanVuex([teamDetail])
        if (result.data.cTeamList) {
          await this.$addChanVuex(result.data.cTeamList)
        }
        chanMainParam.nameMtext = teamDetail.nameMtext
        chanMainParam.chanName = teamDetail.nameMtext
        var initData = {}
        initData.team = teamDetail
        if (
          result.data.contentsListPage &&
          result.data.contentsListPage.content &&
          result.data.contentsListPage.content.length > 0
        ) {
          this.$store.dispatch(
            'D_CHANNEL/AC_ADD_CONTENTS',
            result.data.contentsListPage.content
          )
        }
        console.log('asf')
        initData = result.data
        if (!initData.cabinetKeyListStr) {
          initData.contentsList = result.data.contentsListPage
          initData.cabinetKeyListStr = result.data.cabinetKeyListStr
        }
        this.mCabKeyListStr = initData.cabinetKeyListStr
      } catch (error) {
        // this.$showToastPop('죄송합니다! 관리자에게 문의해주세요!')
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
      console.log(initData)
      if (initData.shortLink) {
        const initLink = JSON.parse(initData.shortLink.shortLink)
        this.CHANNEL_DETAIL.copyTextStr = initLink.shortLink
        this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [this.CHANNEL_DETAIL])
        this.mMakeDeepLinkIng = false
      }
      this.$emit('clearInfo', { detail: this.mChanInfo, targetType: 'chanDetail' })
      this.ChanFollowYn = this.CHANNEL_DETAIL.D_CHAN_AUTH.followYn
      console.log('this.mChanInfothis.mChanInfothis.mChanInfo', this.mChanInfo)
      this.mTeamDetail = this.mChanInfo.initData.team.content['0']
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      var result1 = await this.$getTeamList(paramMap, false)
      var followList = result1.data.content
      this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', followList)
    },
    async getTownCabinetList () {
      var param = {}
      param.parentTeamKey = Number(this.$route.params.encodedTeamKey)
      var result = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getTownCabinetList',
        param: param
      })
      if (result && result.data && result.data.result) {
        this.mCabKeyListStr = result.data.cabinetKeyListStr
      }
    },
    async getMyContentsList (pageSize, offsetInput, loadingYn, searchParam) {
      if (
        this.mAxiosQueue.length > 0 &&
        this.mAxiosQueue.findIndex((item) => item === 'getPushContentsList') !==
          -1
      ) { return }
      this.mAxiosQueue.push('getPushContentsList')
      var param = {}
      if (searchParam) {
        param = searchParam
      }
      if (this.viewTab === 'P') {
        param.orderbyStr = 'a.popPoint DESC, a.creDate DESC'
      } else if (this.viewTab === 'N') {
        param.orderbyStr = 'a.creDate DESC'
      }
      param.myUserKey = this.GE_USER.userKey
      param.cabinetKeyListStr = this.mCabKeyListStr
      if (
        offsetInput !== undefined &&
        offsetInput !== null &&
        offsetInput !== ''
      ) {
        param.offsetInt = offsetInput
      } else {
        param.offsetInt = this.mOffsetInt
      }

      if (pageSize !== undefined && pageSize !== null && pageSize !== '') {
        param.pageSize = pageSize
      } else {
        param.pageSize = this.mPageSize
      }

      if (this.mFindKeyList) {
        if (
          this.mFindKeyList.searchKey !== undefined &&
          this.mFindKeyList.searchKey !== null &&
          this.mFindKeyList.searchKey !== ''
        ) {
          param.title = this.mFindKeyList.searchKey
        }
        if (
          this.mFindKeyList.creTeamNameMtext !== undefined &&
          this.mFindKeyList.creTeamNameMtext !== null &&
          this.mFindKeyList.creTeamNameMtext !== ''
        ) {
          param.creTeamNameMtext = this.mFindKeyList.creTeamNameMtext
        }
        if (
          this.mFindKeyList.toCreDateStr !== undefined &&
          this.mFindKeyList.toCreDateStr !== null &&
          this.mFindKeyList.toCreDateStr !== ''
        ) {
          param.toCreDateStr = this.mFindKeyList.toCreDateStr
        }
        if (
          this.mFindKeyList.fromCreDateStr !== undefined &&
          this.mFindKeyList.fromCreDateStr !== null &&
          this.mFindKeyList.fromCreDateStr !== ''
        ) {
          param.fromCreDateStr = this.mFindKeyList.fromCreDateStr
        }
        if (
          this.mFindKeyList.workStatCodeKey !== undefined &&
          this.mFindKeyList.workStatCodeKey !== null &&
          this.mFindKeyList.workStatCodeKey !== ''
        ) {
          param.workStatCodeKey = this.mFindKeyList.workStatCodeKey
        }
        if (
          this.mFindKeyList.creUserName !== undefined &&
          this.mFindKeyList.creUserName !== null &&
          this.mFindKeyList.creUserName !== ''
        ) {
          param.creUserName = this.mFindKeyList.creUserName
        }
        if (this.mFindKeyList.selectedSticker) {
          param.findActStickerYn = true
          param.findActYn = true
          param.stickerKey = this.mFindKeyList.selectedSticker.stickerKey
        }
      }
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }
      var result = await this.$getContentsList(param, nonLoading)
      var queueIndex = this.mAxiosQueue.findIndex(
        (item) => item === 'getPushContentsList'
      )
      this.mAxiosQueue.splice(queueIndex, 1)
      var resultList = result
      return resultList
    },
    async getMemberTypeList () {
      var param = {}
      param.teamKey = Number(this.$route.params.encodedTeamKey)
      // param.cateItemKey = this.propCateItemKey
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
    async getTeamMenuList (teamKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', teamKey)
      paramMap.set('currentTeamKey', teamKey)
      paramMap.set('sysCabinetCode', 'BOAR')
      paramMap.set('userKey', this.GE_USER.userKey)

      var result = await this.$getTeamMenuList(paramMap, true)
      this.mChanInfo.boardList = result
    }
  },
  created () {
    this.$emit('enterCloudLoading', false)
    setTimeout(() => {
      this.$emit('showCloudLoading', false)
    }, 800)
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
          this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [
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
            const parent = this.CHANNEL_DETAIL.teamKey === this.GE_USER.myTeamKey ? 1 : 0
            const ketSet = {
              teamKey: this.CHANNEL_DETAIL.teamKey,
              parentYn: parent
            }
            this.$makeShareLink(ketSet, 'chanDetail', message, title).then(res => {
              this.CHANNEL_DETAIL.copyTextStr = res
              this_.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [
                this.CHANNEL_DETAIL
              ])
              this_.mMakeDeepLinkIng = false
            })
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
    console.log('222chanDetail', this.mChanInfo)
  },
  computed: {
    CHANNEL_DETAIL () {
      if (!this.mChanInfo && !this.mDirectTeamKey) return {}
      let teamKey
      if (this.mChanInfo) {
        teamKey = this.mChanInfo.targetKey || this.mChanInfo.teamKey
      } else if (this.mDirectTeamKey) {
        teamKey = this.mDirectTeamKey.teamKey
      }
      var detail = this.$getDetail('TEAM', teamKey)
      console.log(detail)
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
    GE_RECENT_CHANGE_TEAM () {
      return this.$store.getters['D_CHANNEL/GE_RECENT_CHANGE_TEAM']
    },
    settingBackground () {
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
        // '--wWidth': this.$getMobileYn() === true ? window.innerWidth + 'px ' : '100% ',
        // '--wHeight': this.$getMobileYn() === true ? window.innerHeight + 'px ' : '100% ',
        '--backImg': imgPath,
        '--paddingTop': this.$STATUS_HEIGHT + 'px',
        'padding-top': Number(this.$STATUS_HEIGHT) + 'px'
      }
    },
    // getWindowHeight () {
    //   return {

    //   }
    // },
    REQ_MEM_OBJ () {
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
    GE_CHANNEL_NOTI_QUEUE () {
      return this.$store.getters['D_CHANNEL/GE_CHANNEL_NOTI_QUEUE']
    },
    historyStack () {
      return this.$store.getters['D_HISTORY/hRPage']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  watch: {
    mChanCardShowYn (val, old) {
      const pushList = document.getElementById('pushListWrap')
      // const chanCardTopRef = this.$refs.chanPushListArea
      const chanMainRef = this.$refs.chanMainRef
      console.log('val: ' + val + ' old: ' + old)
      if (pushList) {
        if (val && !old) {
          pushList.className = 'scrollHidden'
          chanMainRef.className = 'scrollOn'
          // chanCardTopRef.style.height = 'calc(100% - 210px)'
        } else if (!val && old) {
          pushList.className = 'scrollOn'
          chanMainRef.className = 'scrollHidden'
          // chanCardTopRef.style.height = 'calc(100% - 200px - ' + this.$STATUS_HEIGHT + 'px'
        }
      }
      // eslint-disable-next-line no-debugger
      debugger
    },
    CHANNEL_DETAIL: {
      immediate: true,
      handler (value, old) {
        if (value && value.D_CHAN_AUTH && value.D_CHAN_AUTH.followYn) {
          this.$emit('followYn')
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
    GE_RECENT_CHANGE_TEAM (value, old) {
      // if (value === this.CHANNEL_DETAIL.teamKey) {
      // console.log('team [' + value + ']의 관련 정보가 변경되었음')
      // }
    },
    GE_MAIN_CHAN_LIST (value, old) {},
    pageUpdate (value, old) {
      this.backClick()
      /* if (this.pPopId === hStack[hStack.length - 1]) {
            this.closeSubPop()
        } */
    },
    historyStack (value, old) {}
  }
}
</script>

<style scoped>
.hidden {
  opacity: 0 !important;
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
