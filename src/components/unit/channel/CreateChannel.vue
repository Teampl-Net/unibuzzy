<i18n>
{
  "ko": {
    "CRE_BTN_EDITBG": "배경편집",
    "CRE_BTN_DELETE_CHAN": "채널삭제",
    "CRE_MSG_CHANNAME": "채널명을 20자 이내로 입력해주세요",
    "CRE_TITLE_DESC": "소개글",
    "CRE_MSG_DESC": "채널에 대한 설명을 40글자 이내로 입력해주세요.",
    "CRE_TITLE_HEADER": "채널 상단 글자색",
    "CRE_BTN_HEAD_DEFAULT": "기본",
    "CRE_BTN_HEAD_WHITE": "흰색",
    "CRE_BTN_PREVIEW": "미리보기",
    "CRE_BTN_CREATE": "채널 생성",
    "EDIT_NAME_CHAN": "채널 수정",
    "CRE_MSG_NONAME": "채널명을 입력해주세요.",
    "CRE_MSG_NODESC": "채널 소개를 입력해주세요.",
    "CRE_MSG_NOCATE": "채널의 산업군을 선택해주세요.",
    "CRE_MSG_DELETE": "채널을 삭제하시겠습니까?"
  },
  "en": {
    "CRE_BTN_EDITBG": "Edit Background",
    "CRE_BTN_DELETE_CHAN": "Delete the Channel",
    "CRE_MSG_CHANNAME": "Please enter up to 20 characters in the channel name",
    "CRE_TITLE_DESC": "Channel Description",
    "CRE_MSG_DESC": "Please enter up to 40 characters in the channel description",
    "CRE_TITLE_HEADER": "Color of the Channel Header",
    "CRE_BTN_HEAD_DEFAULT": "Default",
    "CRE_BTN_HEAD_WHITE": "White",
    "CRE_BTN_PREVIEW": "Preview",
    "CRE_BTN_CREATE": "Create",
    "EDIT_NAME_CHAN": "Edit",
    "CRE_MSG_NONAME": "Please enter the channel name.",
    "CRE_MSG_NODESC": "Please enter the channel description.",
    "CRE_MSG_NOCATE": "Please select the channel category.",
    "CRE_MSG_DELETE": "Are you sure you want to delete the channel?"
  }
}
</i18n>
<template>
  <div class="createChanCompo" @click.stop="preventDefault">
    <selectIconBgPopup v-if="mIconBgSelectPopYn=='iconPop' || mIconBgSelectPopYn=='bgPop'" :pClosePop="closeBgPop" :selectIcon="mSelectedIcon" :selectBg="mSelectedBg" @no='mIconBgSelectPopYn=false' @makeParam='setIconOrBGData' :opentype="mIconBgSelectPopYn" />
      <div :style="`background: url('${$changeUrlBackslash(mSelectedBg.selectPath)}'`" class="createChanWrap"  >
        <div class="createChanContentsWrap" :style="`margin-top: ${Number($STATUS_HEIGHT) + 150}px;`">
          <form @submit.prevent="formSubmit" method="post" class="changeBgBtnWrap cursorP">
            <label @click="mIconBgSelectPopYn='bgPop'"  class='backgroundLabel commonColor' for="input-Backimgfile">
              <img :src="require(`@/assets/images/channel/icon_camera.svg`)" class="cursorP cameraIcon" alt="">
              Edit Background
            </label>
          </form>
          <div v-if="(pChannelModi || chanDetail.modiYn === true) && chanDetail.D_CHAN_AUTH.ownerYn" @click="chanDelete" class="backgroundLabel deleteBtn">
            <p class="font14">
              <img class="cameraIcon" src="@/assets/images/formEditor/trashIcon_gray2.svg" alt="">
              {{ $t('CRE_BTN_DELETE_CHAN') }}
            </p>
          </div>

          <div id='chboxtest' >
            <form @submit.prevent="formSubmit" method="post" class="changeLogoBtnWrap cursorP" >
              <label @click="mIconBgSelectPopYn='iconPop'" for="input-Logoimgfile" class='channelLogoLabel cursorP' >
                <img class="cameraIcon" src="@/assets/images/channel/icon_camera.svg" alt="">
              </label>
            </form>
            <div @click="mIconBgSelectPopYn='iconPop'" class="channelLogoArea cursorP">
                <img class="w100P" :src="mSelectedIcon.selectPath" />
            </div>
            <div class="w100P fl editChanArea">
              <div v-if="!pChannelModi || chanDetail.modiYn === false" class="w100P typeBox">
                <p class="textLeft font20 fontBold w100P">{{ pBdAreaList && pBdAreaList.length > 0 && pBdAreaList[0].bdList? $changeText(pBdAreaList[0].bdList[0].nameMtext):'Campus' }} > {{ pSelectedAreaInfo? pSelectedAreaInfo.bdAreaNameMtext:'Area' }}</p>
              </div>
              <div class="mtop-1 fl w100P">
                <p class="textLeft font20 fl fontBold w100P height30">{{ $t('COMMON_TITLE_CHANNAME') }}</p>
                <input v-model="mInputChannelName" type="text" :placeholder="$t('CRE_MSG_CHANNAME')" class="creChanInput"  id="channelName" >
              </div>

              <div class="mtop-1 fl w100P">
                <p class="textLeft font20 fl fontBold w100P height30">{{ $t('CRE_TITLE_DESC') }}</p>
                <textarea v-model="mInputChannelMemo" class="channelMemo" :placeholder="$t('CRE_MSG_DESC')"/>
              </div>
              <div class="mtop-1 fl w100P">
                <p class="textLeft font20 fl fontBold w100P height30">{{ $t('CRE_TITLE_HEADER') }}</p>

                <div class="fl w100P mbottom-05 mtop-05 selectColor">
                  <label class="fl font14 mright-05 dispFlex" for="commonColor">
                    <input v-model="mBtnColor" class="fl mright-05" type="radio" name="btnColorRadio" :value="false" id="commonColor">
                    {{ $t('CRE_BTN_HEAD_DEFAULT') }}
                  </label>
                  <label class="fl font14 mleft-05 dispFlex" for="whiteColor">
                    <input v-model="mBtnColor" class="fl mright-05" type="radio" name="btnColorRadio" :value="true" id="whiteColor">
                    {{ $t('CRE_BTN_HEAD_WHITE') }}
                  </label>
                  <p class="fr backgroundLabel fontBold commonColor lightBorder" @click="mTopColorPreviewYn = !mTopColorPreviewYn">
                    <img src="@/assets/images/board/icon_eyes.svg" class="img-w18 mright-05" alt="미리보기 아이콘">
                    {{ $t('CRE_BTN_PREVIEW') }}
                  </p>
                </div>
                <div v-if="mTopColorPreviewYn === true" class="fl w100P previewWrap" :style="`background: url('${$changeUrlBackslash(mSelectedBg.selectPath)}');`">
                  <img v-if="mBtnColor === false" src="@/assets/images/common/icon_back.png" class="img-w15 fl mleft-05" alt="">
                  <img v-else-if="mBtnColor === true" src="@/assets/images/common/icon_back_white.png" class="img-w15 fl mleft-05" alt="">
                  <p :style="mBtnColor === false ? 'color: #6768a7;' : 'color:white;' " class="fl font20 fontBold">{{mInputChannelName}}</p>
                  <img v-if="mBtnColor === false"  src="@/assets/images/common/icon_menu.png" class="img-w25 fr mright-05" alt="">
                  <img v-else-if="mBtnColor === true" src="@/assets/images/common/icon_menu_white.png" class="img-w25 fr mright-05" alt="">
                </div>
              </div>
            </div>
            <div @click="checkValue" class="creChanBigBtn fl mtop-1">{{mPageType === '생성'? $t('CRE_BTN_CREATE'):$t('EDIT_NAME_CHAN')}}</div>
          </div>
        </div>
      </div>
      <gConfirmPop :confirmText="mCreCheckPopText === null ? returnConfirmText('B') : mCreCheckPopText" @no='mCreCheckPopYn=false, mDeleteYn=false, mCreCheckPopText=null' v-if="mCreCheckPopYn" :pDelete="mDelete" @ok='setParam' />
      <gConfirmPop :confirmText="returnConfirmText('A')" @no="$emit('successCreChan', mParams)" confirmType="one" v-if="mCreatedSuccessPopYn"/>
      <gConfirmPop :confirmText='mErrorPopMsg' confirmType='timeout' v-if="mErrorPopYn === true" @no='mErrorPopYn=false,mCreCheckPopYn=false' />
  </div>
</template>

<script>
import selectIconBgPopup from '@/components/popup/SelectChaniconBgPopup.vue'
export default {
  created () {
    if (this.pSelectedAreaInfo) {
      switch (this.pSelectedAreaInfo.bdAreaNameMtext) {
        case 'Club & Startup':
          this.mSelectedTeamTypeKey = '12'
          break
        case 'Major':
          this.mSelectedTeamTypeKey = '13'
          break
        case 'Class':
          this.mSelectedTeamTypeKey = '14'
          break
        case 'Facilities & Amenities':
          this.mSelectedTeamTypeKey = '15'
          break
        case 'Nearby':
          this.mSelectedTeamTypeKey = '16'
          break
        default:
          this.mSelectedTeamTypeKey = '3'
          break
      }
    }
    this.$emit('openLoading')
    if (this.CHANNEL_DETAIL !== undefined && this.CHANNEL_DETAIL !== null && this.CHANNEL_DETAIL !== {}) {
      if (this.chanDetail.modiYn === true) {
        this.mPageType = '수정'
        this.mTopColorPreviewYn = true
        this.getTeamList()
      }
    }
    this.getCateItemList()
    setTimeout(() => {
      this.$emit('closeLoading')
    }, 500)
  },
  props: {
    pBdKey: {},
    chanDetail: {},
    pClosePop: Function,
    pBdAreaList: Array,
    pSelectedAreaInfo: Object,
    pSelectedBuilding: Object,
    pChannelModi: Boolean
  },
  data () {
    return {
      mSelectTeamTypePopYn: false,
      mIconBgSelectPopYn: '',
      mPageType: '생성',
      mInputChannelName: '',
      mInputChannelMemo: '',
      mSelectTypeText: '클릭해서 산업군을 선택해주세요.',
      mSelectType: '',
      mSelectedIcon: { selectedId: '1', selectPath: '/resource/channeliconbg/CHAR01.png' },
      mSelectedBg: { selectedId: '11', selectPath: '/resource/channeliconbg/BG01.jpg' },

      mCreCheckPopYn: false,
      mCreCheckPopText: null,
      mCreatedSuccessPopYn: false,

      mErrorPopMsg: '',
      mErrorPopYn: false,
      mBusinessTypeList: [
        { teamNameMtext: this.$t('COMM_CATE_BUSINESS'), teamType: 'C' },
        { teamNameMtext: 'KO$^$정부$#$EN$^$Government', teamType: 'G' },
        { teamNameMtext: 'KO$^$학교$#$EN$^$School', teamType: 'S' },
        { teamNameMtext: 'KO$^$종교$#$EN$^$Religious', teamType: 'H' },
        { teamNameMtext: 'KO$^$동호회$#$EN$^$Club', teamType: 'D' },
        { teamNameMtext: 'KO$^$병원$#$EN$^$Hospital', teamType: 'Q' },
        { teamNameMtext: 'KO$^$약국$#$EN$^$Pharmace', teamType: 'V' },
        { teamNameMtext: 'KO$^$매장$#$EN$^$Mall', teamType: 'A' },
        { teamNameMtext: 'KO$^$가족$#$EN$^$Family', teamType: 'F' },
        { teamNameMtext: 'KO$^$팀$#$EN$^$Team', teamType: 'T' },
        { teamNameMtext: 'EN$^$Club & Startup', teamType: 'C' },
        { teamNameMtext: 'EN$^$Class', teamType: 'B' },
        { teamNameMtext: 'EN$^$Major', teamType: 'M' },
        { teamNameMtext: 'EN$^$Living', teamType: 'L' },
        { teamNameMtext: 'EN$^$Facilities & Amenities', teamType: 'F' },
        { teamNameMtext: 'EN$^$Nearby', teamType: 'N' }
      ],
      mSelectedTeamTypeKey: '',
      mSelectedTeamType: '',

      mDeleteYn: false,
      mBtnColor: false,
      mTopColorPreviewYn: false,
      mBusinessItemList: [],
      mParams: {},
      mDelete: false
    }
  },
  methods: {
    preventDefault () {
      return false
    },
    closeBgPop () {
      this.mIconBgSelectPopYn = false
    },
    returnConfirmText (type) {
      if (this.GE_LOCALE === 'ko') {
        if (type === 'B') {
          if (this.mPageType === '생성') {
            return '[' + this.mInputChannelName + '] 채널을 생성하겠습니다.'
          } else if (this.mPageType === '삭제') {
            return '[' + this.mInputChannelName + '] 채널을 삭제하겠습니다.'
          } else if (this.mPageType === '수정') {
            return '[' + this.mInputChannelName + '] 채널을  수정하겠습니다.'
          }
        } else {
          if (this.mPageType === '생성') {
            return '[' + this.mInputChannelName + '] 채널이 생성되었습니다.'
          } else if (this.mPageType === '삭제') {
            return '[' + this.mInputChannelName + '] 채널이 삭제되었습니다.'
          } else if (this.mPageType === '수정') {
            return '[' + this.mInputChannelName + '] 채널이 수정되었습니다.'
          }
        }
      } else {
        if (type === 'B') {
          if (this.mPageType === '생성') {
            return `Create [${this.mInputChannelName}] channel.`
          } else if (this.mPageType === '삭제') {
            return `Delete [${this.mInputChannelName}] channel.`
          } else if (this.mPageType === '수정') {
            return `Edit [${this.mInputChannelName}] channel.`
          }
        } else {
          if (this.mPageType === '생성') {
            return `[${this.mInputChannelName}] channel created successfully!`
          } else if (this.mPageType === '삭제') {
            return `Delete [${this.mInputChannelName}] channel has been deleted.`
          } else if (this.mPageType === '수정') {
            return `Edit [${this.mInputChannelName}] channel has been updated.`
          }
        }
      }
    },
    async getCateItemList () {
      var param = {}
      param.cateGroupKey = 2
      var cateItemList = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getCateItemList',
        param: param
      })
      this.mBusinessItemList = cateItemList.data.cateItemList
    },
    chanDelete () {
      this.mDeleteYn = true
      this.mDelete = true
      this.mCreCheckPopText = this.$t('CRE_MSG_DELETE')
      this.mCreCheckPopYn = true
    },
    async getTeamList () {
      this.mInputChannelName = this.$changeText(this.CHANNEL_DETAIL.nameMtext)
      this.mInputChannelMemo = this.$changeText(this.CHANNEL_DETAIL.memoMtext)
      this.mSelectedBg.selectedId = this.CHANNEL_DETAIL.picMfilekey
      if (this.CHANNEL_DETAIL.bgDomainPath) {
        this.mSelectedBg.selectPath = this.CHANNEL_DETAIL.bgDomainPath + this.CHANNEL_DETAIL.bgPathMtext
      } else {
        this.mSelectedBg.selectPath = this.CHANNEL_DETAIL.bgPathMtext
      }
      this.mSelectedBg.iconType = this.CHANNEL_DETAIL.bgPathMtext.length > 30 ? 'img' : 'icon'
      this.mSelectedIcon.selectedId = this.CHANNEL_DETAIL.logoFilekey
      this.mSelectedIcon.selectPath = this.CHANNEL_DETAIL.logoDomainPath + this.CHANNEL_DETAIL.logoPathMtext
      this.mSelectedIcon.iconType = this.CHANNEL_DETAIL.logoPathMtext.length > 30 ? 'img' : 'icon'
      if (this.CHANNEL_DETAIL.blackYn === 1) {
        this.mBtnColor = true
      } else {
        this.mBtnColor = false
      }
      var param = {}
      param.cateKey = this.CHANNEL_DETAIL.cateKey
      param.teamType = this.CHANNEL_DETAIL.teamType
      this.setTypeData(param)
    },
    setTypeData (param) {
      this.mSelectedTeamTypeKey = param.cateKey
      this.mSelectTypeText = this.$teamTypeString(param.cateKey)
      this.mSelectTeamTypePopYn = false
    },
    setIconOrBGData (param) {
      if (this.mIconBgSelectPopYn === 'iconPop') {
        this.mSelectedIcon = param
      } else if (this.mIconBgSelectPopYn === 'bgPop') {
        this.mSelectedBg = param
      } else if (this.mIconBgSelectPopYn === 'bdPop') {
        this.mSelectedBd = param
      }
      console.log('ㅇ기염')
      console.log(this.mSelectedIcon)
      this.mIconBgSelectPopYn = false
    },
    checkValue () {
      if (this.mInputChannelName.length > 20 || this.mInputChannelName.length === 1) {
        this.mErrorPopMsg = this.$t('CRE_MSG_CHANNAME')
        this.mErrorPopYn = true
        return
      } else if (this.mInputChannelName === '' || this.mInputChannelName === '채널이름') {
        this.mErrorPopMsg = this.$t('CRE_MSG_NONAME')
        this.mErrorPopYn = true
        return
      }
      if (this.mInputChannelMemo.length > 40) {
        this.mErrorPopMsg = this.$t('CRE_MSG_DESC')
        this.mErrorPopYn = true
        return
      } else if (this.mInputChannelMemo === '') {
        this.mErrorPopMsg = this.$t('CRE_MSG_NODESC')
        this.mErrorPopYn = true
        return
      }
      if (this.mSelectedTeamTypeKey === undefined || this.mSelectedTeamTypeKey === null || this.mSelectedTeamTypeKey === '') {
        this.mErrorPopMsg = this.$t('CRE_MSG_NOCATE')
        this.mErrorPopYn = true
        return
      }
      this.mCreCheckPopYn = true
    },
    async setParam () {
      var gParam = {}
      try {
        if (this.chanDetail.modiYn !== false) {
          gParam.bdKey = this.pBdKey
          gParam.teamKey = this.chanDetail.targetKey
          gParam.bdIconPath = this.pSelectedBuilding.selectPath
          if (this.CHANNEL_DETAIL) {
            gParam.reqKey = this.chanDetail.reqKey
            gParam.targetKey = this.CHANNEL_DETAIL.targetKey
          } else {
            gParam.targetKey = this.chanDetail.targetKey
          }
        }

        gParam.nameMtext = 'EN$^$' + this.mInputChannelName
        gParam.memoMtext = this.mInputChannelMemo
        gParam.bdIconPath = this.pSelectedBuilding.selectPath
        if (this.pSelectedBuilding) {
          gParam.bdIconPath = this.pSelectedBuilding.selectPath
        }
        var teamType = this.$teamTypeString(this.mSelectedTeamTypeKey)
        if (this.mInputChannelMemo === undefined || this.mInputChannelMemo === null || this.mInputChannelMemo.replace(' ', '') === '') {
          gParam.memoMtext = gParam.nameMtext
        }

        gParam.cateItemKey = this.mSelectedTeamTypeKey

        // 임시
        if (this.mDeleteYn === false) {
          console.log('뭐지?')
          console.log(this.mBusinessTypeList)
          console.log(teamType)
          var idx = this.mBusinessTypeList.findIndex((item) => this.$changeText(item.teamNameMtext) === teamType)
          if (idx !== -1) {
            this.mSelectedTeamType = this.$changeText(this.mBusinessTypeList[idx].teamType)
          } else return
          gParam.teamType = this.mSelectedTeamType
        }
        gParam.creUserKey = this.GE_USER.userKey
        gParam.logoFilekey = this.mSelectedIcon.selectedId
        gParam.picMfilekey = this.mSelectedBg.selectedId
        gParam.creUserName = this.$changeText(this.GE_USER.userDispMtext)
        gParam.blackYn = this.mBtnColor

        var params = {}
        if (this.mDeleteYn === true) {
          params.deleteYn = true
          gParam.deleteYn = true || 1
          this.mPageType = '삭제'
          if (gParam.teamKey) {
            var res = await this.$commonAxiosFunction({
              url: '/sUniB/tp.deleteTeam',
              param: { teamKey: gParam.teamKey }
            })
            if (res.data && res.data.result) {
              this.$emit('successCreChan', params)
            }
          }
          return
        }
        if (this.pSelectedAreaInfo) {
          gParam.parentTeamKey = this.pSelectedAreaInfo.teamKey
          gParam.bdAreaKey = this.pSelectedAreaInfo.bdAreaKey
          gParam.bdIconPath = this.pSelectedBuilding.selectPath
        }

        var response = await this.$commonAxiosFunction({
          url: '/sUniB/tp.UB_createTeamAndBuilding',
          param: { teamRequest: gParam }
        })

        var result = response.data
        if (result.result === true || result.result === 'true') {
          this.mCreCheckPopYn = false
          params.targetType = 'chanDetail'
          params.popHeaderText = 'EN$^$' + this.mInputChannelName
          if (this.chanDetail && this.chanDetail.modiYn !== undefined && this.chanDetail.modiYn !== null && this.chanDetail.modiYn !== '' && this.chanDetail.modiYn === true) {
            this.changeTeamInfo(gParam)
            params.targetKey = this.chanDetail.targetKey
            params.modiYn = true
            params.teamKey = this.chanDetail.targetKey
          } else {
            params.targetKey = result.teamKey
            params.teamKey = result.teamKey
            params.newChan = true
            this.newChannelInPool(result.teamKey)
          }
          var teamKey = null
          if (!this.chanDetail || this.chanDetail.targetKey === undefined || this.chanDetail.targetKey === null || this.chanDetail.targetKey === '') {
            teamKey = result.teamKey
          } else {
            teamKey = this.chanDetail.targetKey
          }

          if (this.mDeleteYn !== true) await this.$addChanList(teamKey)
          if (this.mDeleteYn === true) {
            await this.$store.dispatch('UB_CHANNEL/AC_REMOVE_CHANNEL', gParam)
          }

          this.mParams = params
          if (this.pSelectedAreaInfo) {
            this.mParams.areaInfo = this.pSelectedAreaInfo
          }
          this.mCreatedSuccessPopYn = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    async changeTeamInfo (data) {
      await this.$addChanList(this.CHANNEL_DETAIL.teamKey)
      var temp = this.CHANNEL_DETAIL
      temp.nameMtext = data.nameMtext
      temp.memoMtext = data.memoMtext
      temp.teamType = data.teamType
      temp.teamKey = this.CHANNEL_DETAIL.teamKey
      temp.logoFilekey = data.logoFilekey
      temp.picMfilekey = data.picMfilekey
      temp.teamKeyWord = data.teamKeyWord
      temp.creUserName = data.creUserName
      temp.deleteYn = data.deleteYn
      this.$store.dispatch('UB_CHANNEL/AC_ADD_UPDATE_CHAN_LIST', temp)
      this.pClosePop()
    },
    async newChannelInPool (newCreTeamKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', newCreTeamKey)
      paramMap.set('fUserKey', this.GE_USER.userKey)
      var resultList = await this.$getTeamList(paramMap)
      var response = resultList.data.content[0]
      response.detailPageYn = true
      await this.$store.dispatch('UB_CHANNEL/AC_CREATE_CHANNEL', response)
    }
  },
  watch: {
    mIconBgSelectPopYn: {
      handler (val) {
        if (val === 'iconPop' || val === 'bgPop') {
          this.$emit('changeBgPopShowYn', true)
        } else {
          this.$emit('changeBgPopShowYn', false)
        }
      }
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    },
    GE_USER () {
      return this.$store.getters['UB_USER/GE_USER']
    },
    getChanBoxSize () {
      return {
        '--chanBoxSize': window.innerWidth / 4 - 20 + 'px'
      }
    },
    CHANNEL_DETAIL () {
      if (this.chanDetail) {
        return this.$getDetail('TEAM', this.chanDetail.targetKey)[0]
      } else {
        return null
      }
    }
  },
  components: {
    selectIconBgPopup
  }

}
</script>
<style scoped>
.backgroundLabel {
/* color: white; padding: 0.25rem 0.5rem;background-color: black; opacity: 0.5; font-size:14px;white-space: nowrap; */
  padding: 0.25rem 0.5rem;
  background-color: white;
  font-size:14px;
  white-space: nowrap;
  border-radius: 5px;
}

.channelLogoArea {
  border:1px solid #ccc;
  width: 120px;
  overflow: hidden;
  height: 120px;
  border-radius: 120px;
  margin: 0 auto;
  margin-top: -130px;
  background: #ffffff66;
  position: relative;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.channelLogoLabel {
  width: 35px;
  height: 35px;
  background-color: white;
  display: flex;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
}
#chboxtest {
  font-size:14px;
  width: 100%;
  position: relative;
  min-height: 500px;
  background: #FFF;
  top: 0;
  padding-bottom: 50px;
  padding: 0 1rem;
  height: calc(100% - 15rem);
}
#channelName {
  padding-left: 10px !important;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: text;
  width: 100%;
  background: white !important;
  float: left;
}
.channelMemo {
  width: 100%;
  min-height: 100px;
  float: left;
  border-radius: 5px;
  border: none;
  border: 1px solid #ccc;
  resize:none;
  padding-left: 5px;
  outline: none;
  background: #fff;
  border: 1px solid #cccccc;
  padding: 10px;
}
.creChanIntroTextWrap {
  padding: 10px 0;
  float: left;
  border-bottom: 1px solid #ccc;
}
.creChanIntroTextWrap p {
  font-size: 18px;
}
.creChanBigBtn {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  background: #6768a7;
  color: #fff;
  border-radius: 8px;
  width: calc(100% - 30px);
  margin: 0 auto;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
}
.activeTypeBox {
  background: #6768a7 !important;
  color: #fff;
}
.activeTypeBox p {
  color: #fff;
}
.categoryBox {
  min-width: 40px;
  margin-right: 5px;
  height: 30px;
  float: left;
  border-radius: 5px;
  padding-left: 5px;
}
.keywordWrap {
  width: 80%;
  height: 100%;
  float: right;
  border: none;
  display: flex;
  overflow: auto;
}
.changeChanTypeBtnWrap {
  width: 80%;
  height: 100%;
  float: right;
  border: none;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.changeLogoBtnWrap {
  position: absolute;
  right: 50%;
  transform: translateX(180%);
  top: -50px;
  z-index: 9;
}
.changeLogoBtnWrap > p {
  width:20px;
}
.changeBgBtnWrap {
  position: absolute;
  left: 1rem;
  top: 0.3rem;
  margin-top: -145px;
}
.createChanWrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  top: 50px;
}
.createChanContentsWrap {
  width: 100%;
  left:0;
  height: 100%;
  position: relative;
  min-height: 450px;
  margin: 60px 0;
  float: left;
  display: flex;
  align-items: flex-end;
  float: left;
  margin-bottom: 0;
}
.createChanCompo {
  width: 100%;
  float: left;
  position: absolute;
  z-index: 9999;
  left: 0;
  top: 50px;
}
.createChanWrap {
  background-repeat: no-repeat;
  background-size: cover;
}
.cameraIcon {
  width: 20px;
}
.deleteBtn {
  background-color: white;
  border-radius: 5px;
  position: absolute;
  right: 1em;
  padding-left: 0.25rem;
  margin-top: -140px;
}
.deleteBtn > p {
  color: #aaa;
}
.editChanArea {
  height: calc(100% - 80px);
  overflow-y: scroll auto;
  margin-top: 1rem;
}
.typeBox {
  border-bottom: 2px solid #aaa;
  padding: 10px 0;
}
.height30 {
  line-height: 30px;
}
.selectColor {
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.dispFlex {
  display: flex;
}
.lightBorder {
  border: 1px solid #ccc;
}
.previewWrap {
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
}
@media screen and (max-width: 499px) {
  .changeBgBtnWrap {
    margin-top: -180px;
  }
  .deleteBtn {
    margin-top: -175px;
  }
}
</style>
