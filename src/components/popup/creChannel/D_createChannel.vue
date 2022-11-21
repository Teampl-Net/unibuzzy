<template>
<div style="width: 100%; height: 100%; float: left;">
  <selecTypePopup  v-if="mSelectTeamTypePopYn" @no='mSelectTeamTypePopYn=false' @makeParam='setTypeData' />
  <seleciconBgPopup v-if="mIconBgSelectPopYn=='iconPop' || mIconBgSelectPopYn=='bgPop'" :selectIcon="this.mSelectedIcon" :selectBg="this.mSelectedBg" @no='mIconBgSelectPopYn=false' @makeParam='setIconOrBGData' :opentype="mIconBgSelectPopYn" />
    <div :style="'background: url(' + mSelectedBg.selectPath + ');'" style="background-repeat: no-repeat;background-size: cover;" class="createChanWrap"  >
      <div class="createChanContentsWrap">
        <form @submit.prevent="formSubmit" method="post" class="changeBgBtnWrap cursorP" >
          <label @click="mIconBgSelectPopYn='bgPop'"  class='backgroundLabel commonColor' for="input-Backimgfile">
            <img src="../../../assets/images/channel/icon_camera.svg" class="cursorP" style="width:20px;" alt=""> 배경편집 </label>
        </form>

        <div v-if="chanDetail.modiYn === true && this.chanDetail.ownerYn" @click="chanDelete" class="backgroundLabel" style="background-color:white; border-radius:5px; position: absolute; right:1em; top:0.3rem; padding-left:0.25rem">
          <p class="font14" style="color:#aaa;"> <img src="../../../assets/images/formEditor/trashIcon_gray2.svg" style="width:18px;" alt=""> 채널삭제 </p>
        </div>

        <div id='chboxtest' >
          <form @submit.prevent="formSubmit" method="post" class="changeLogoBtnWrap cursorP" >
            <label @click="mIconBgSelectPopYn='iconPop'" for="input-Logoimgfile" class='channelLogoLabel cursorP' ><img src="../../../assets/images/channel/icon_camera.svg" style="width:20px;" alt=""> </label>
          </form>

          <div @click="mIconBgSelectPopYn='iconPop'" class="channelLogoArea cursorP" :style="'background-image: url(' + mSelectedIcon.selectPath + ')'" style="background-size: cover; background-position: center; background-repeat: no-repeat;">
          </div>
          <div class="w-100P fl" style="height: calc(100% - 80px); overflow: auto; margin-top: 1rem;">

          <div style="width:100%;" class="mtop-1 fl">
            <p class="textLeft font20 fl fontBold w-100P" style="line-height: 30px;">채널명</p>
            <input v-model="mInputChannelName" type="text" placeholder="채널명을 20자 이내로 입력해주세요" class="creChanInput"  id="channelName" >
          </div>

          <div style="width:100%;" class="mtop-1 fl ">
            <p class="textLeft font20 fl fontBold w-100P" style="line-height: 30px;">소개글</p>
            <textarea style="background: #fff; border: 1px solid #cccccc; padding: 10px;" v-model="mInputChannelMemo" class="channelMemo" placeholder="채널에 대한 설명을 40글자 이내로 입력해주세요."/>
          </div>

          <div style="width:100%;" class="mtop-1 fl ">
            <p class="textLeft font20 fl fontBold w-100P" style="line-height: 30px;">채널 상단 글자색</p>

            <div class="fl w-100P mbottom-05 mtop-05" style="text-align: center; display: flex; justify-content: space-around; align-items: center; ">
              <label class="fl font14 mright-05" style="display: flex;" for="commonColor"><input v-model="mBtnColor" class="fl mright-05" type="radio" name="btnColorRadio" :value="false" id="commonColor"> 기본</label>
              <label class="fl font14 mleft-05" style="display: flex;" for="whiteColor"><input v-model="mBtnColor" class="fl mright-05" type="radio" name="btnColorRadio" :value="true" id="whiteColor"> 흰색</label>
              <p class="fr backgroundLabel fontBold commonColor" @click="mTopColorPreviewYn = !mTopColorPreviewYn" style="border: 1px solid #ccc;"><img src="../../../assets/images/board/icon_eyes.svg" class="img-w18 mright-05" alt="미리보기 아이콘">미리보기</p>
            </div>
            <div v-if="mTopColorPreviewYn === true" class="fl w-100P" :style="'background: url(' + mSelectedBg.selectPath + ');'" style=" height: 50px; display: flex; flex-direction: row; justify-content: space-between; align-items: center; overflow: hidden; background-repeat: no-repeat;background-size: cover;">
              <img v-if="mBtnColor === false" src="../../../assets/images/common/icon_back.png" class="img-w15 fl mleft-05" alt=""> <img v-else-if="mBtnColor === true" src="../../../assets/images/common/icon_back_white.png" class="img-w15 fl mleft-05" alt="">
              <p :style="mBtnColor === false ? 'color: #6768a7;' : 'color:white;' " class="fl font20 fontBold">{{mInputChannelName}}</p>
              <img v-if="mBtnColor === false"  src="../../../assets/images/common/icon_menu.png" class="img-w25 fr mright-05" alt=""> <img v-else-if="mBtnColor === true" src="../../../assets/images/common/icon_menu_white.png" class="img-w25 fr mright-05" alt="">
            </div>
          </div>

          <div style="width:100%; height: 30px" class="mtop-1 fl" >
            <p class="textLeft font20 fl fontBold w-100P" style="line-height: 30px;">산업군</p>
            <div class="fl mtop-05" style="width: 100%;">
              <div :class="{activeTypeBox: mSelectedTeamType ===value.teamType}" @click="selectChanType(value)" v-for="(value,index) in mBusinessTypeList" :key="index" :style="getChanBoxSize" class="fl cursorP" style="min-width:40px; width: var(--chanBoxSize); margin-right: 10px; height:2.5rem; margin-bottom: 10px; border-radius: 5px; background: rgb(245 245 245); display: flex; padding: 0 10px; justify-content: space-around; align-items: center; ">
                <img class="img-w14 fl mright-05" v-if="value.teamType === 'C' && mSelectedTeamType !== 'C'" src="../../../assets/images/channel/icon_office.svg"/>
                <img class="img-w14 fl mright-05" v-if="value.teamType === 'C' && mSelectedTeamType === 'C'" src="../../../assets/images/channel/icon_office_white.svg" >
                <img class="img-w18 fl mright-05" v-if="value.teamType === 'G' && mSelectedTeamType !== 'G'" src="../../../assets/images/channel/icon_Government.svg"/>
                <img class="img-w18 fl mright-05" v-if="value.teamType === 'G' && mSelectedTeamType === 'G'" src="../../../assets/images/channel/icon_Government_white.svg"/>
                <img class="img-w20 fl mright-05" v-if="value.teamType === 'S' && mSelectedTeamType !== 'S'" src="../../../assets/images/channel/icon_school.svg"/>
                <img class="img-w20 fl mright-05" v-if="value.teamType === 'S' && mSelectedTeamType === 'S'" src="../../../assets/images/channel/icon_school_white.svg"/>
                <img class="img-w20 fl" v-if="value.teamType === 'H' && mSelectedTeamType !== 'H'" src="../../../assets/images/channel/icon_church.svg"/>
                <img class="img-w20 fl" v-if="value.teamType === 'H' && mSelectedTeamType === 'H'" src="../../../assets/images/channel/icon_church_white.svg"/>
                <img class="img-w20 fl mright-05" v-if="value.teamType === 'D' && mSelectedTeamType !== 'D'" src="../../../assets/images/channel/icon_society.jpg"/>
                <img class="img-w20 fl mright-05" v-if="value.teamType === 'D' && mSelectedTeamType === 'D'" src="../../../assets/images/channel/icon_society_white.jpg"/>
                <img class="img-w20 fl mright-05" v-if="value.teamType === 'Q' && mSelectedTeamType !== 'Q'" src="../../../assets/images/channel/icon_hospital.svg"/>
                <img class="img-w20 fl mright-05" v-if="value.teamType === 'Q' && mSelectedTeamType === 'Q'" src="../../../assets/images/channel/icon_hospital_white.svg"/>
                <img class="img-w14 fl mright-05" v-if="value.teamType === 'V' && mSelectedTeamType !== 'V'" src="../../../assets/images/channel/icon_pharmacy.svg"/>
                <img class="img-w14 fl mright-05" v-if="value.teamType === 'V' && mSelectedTeamType === 'V'" src="../../../assets/images/channel/icon_pharmacy_white.svg"/>
                <img class="img-w20 fl mright-05" v-if="value.teamType === 'A' && mSelectedTeamType !== 'A'" src="../../../assets/images/channel/icon_store.svg"/>
                <img class="img-w20 fl mright-05" v-if="value.teamType === 'A' && mSelectedTeamType === 'A'" src="../../../assets/images/channel/icon_store_white.svg"/>
                <img class="img-w20 fl mright-05" v-if="value.teamType === 'F' && mSelectedTeamType !== 'F'" src="../../../assets/images/channel/icon_familly.svg"/>
                <img class="img-w20 fl mright-05" v-if="value.teamType === 'F' && mSelectedTeamType === 'F'" src="../../../assets/images/channel/icon_familly_white.svg"/>
                <img class="img-w20 fl mright-05" v-if="value.teamType === 'T' && mSelectedTeamType !== 'T'" src="../../../assets/images/channel/icon_team.svg"/>
                <img class="img-w20 fl mright-05" v-if="value.teamType === 'T' && mSelectedTeamType === 'T'" src="../../../assets/images/channel/icon_team_white.svg"/>
                <p class="font15 commonBlack fl" style="word-break: keep-all;" >
                {{value.teamNameMtext}}
                </p>
              </div>
            </div>
          </div>

          </div>

          <div @click="checkValue" class="creChanBigBtn fl mtop-1;" style="margin: 0 auto; cursor: pointer; position: absolute; bottom: 20px;">채널 {{mPageType}}</div>
        </div>
      </div>
    </div>
    <gConfirmPop :confirmText="mCreCheckPopText === null ? ('[' + mInputChannelName + '] 채널을 ' + mPageType + '하겠습니다') : mCreCheckPopText" @no='mCreCheckPopYn=false, mDeleteYn=false, mCreCheckPopText=null' v-if="mCreCheckPopYn" @ok='setParam' />
    <gConfirmPop :confirmText="'채널이' + mPageType + '되었습니다.'" @no="this.$emit('successCreChan', true)" confirmType='timeout' v-if="mCreatedSuccessPopYn" />
    <gConfirmPop :confirmText='mErrorPopMsg' confirmType='timeout' v-if="mErrorPopYn" @no='mErrorPopYn=false,mCreCheckPopYn=false' />
</div>
</template>

<script>
import selecTypePopup from './Tal_selectChanTypePopup.vue'
import seleciconBgPopup from './Tal_selectChaniconBgPopup.vue'
export default {
  created () {
    this.$emit('openLoading')
    if (this.chanDetail !== undefined && this.chanDetail !== null && this.chanDetail !== {}) {
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
  mounted () {
  },
  props: {
    chanDetail: {}
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
        { teamNameMtext: '기업', teamType: 'C' },
        { teamNameMtext: '정부', teamType: 'G' },
        { teamNameMtext: '학교', teamType: 'S' },
        { teamNameMtext: '종교 단체', teamType: 'H' },
        { teamNameMtext: '동호회', teamType: 'D' },
        { teamNameMtext: '병원', teamType: 'Q' },
        { teamNameMtext: '약국', teamType: 'V' },
        { teamNameMtext: '매장', teamType: 'A' },
        { teamNameMtext: '가족', teamType: 'F' },
        { teamNameMtext: '팀', teamType: 'T' },
        { teamNameMtext: '기타', teamType: 'E' }],
      mSelectedTeamType: '',

      mDeleteYn: false,
      mBtnColor: false,
      mTopColorPreviewYn: false
    }
  },
  methods: {
    async getCateItemList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.cateGroupKey = 2
      var cateItemList = await this.$commonAxiosFunction({
        url: 'service/tp.getCateItemList',
        param: param
      })
      console.log(cateItemList)
      // eslint-disable-next-line no-debugger
      debugger
    },
    selectChanType (value) {
      this.mSelectedTeamType = value.teamType
      this.mSelectType = value.teamType
      this.mSelectTypeText = value.teamNameMtext
    },
    chanDelete () {
      this.mDeleteYn = true
      this.mCreCheckPopText = '채널을 삭제하시겠습니까?'
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
      param.teamType = this.CHANNEL_DETAIL.teamType
      this.setTypeData(param)
    },
    channelTypeClick () {
      if (this.mSelectTeamTypePopYn === false) {
        this.mSelectTeamTypePopYn = true
      }
    },
    setTypeData (param) {
      this.mSelectType = param.teamType
      this.mSelectedTeamType = param.teamType
      this.mSelectTypeText = this.$teamTypeString(param.teamType)
      this.mSelectTeamTypePopYn = false
    },
    setIconOrBGData (param) {
      if (this.mIconBgSelectPopYn === 'iconPop') {
        this.mSelectedIcon = param
      } else if (this.mIconBgSelectPopYn === 'bgPop') {
        this.mSelectedBg = param
      }
      this.mIconBgSelectPopYn = false
    },
    checkValue () {
      if (this.mInputChannelName.length > 20 || this.mInputChannelName.length === 1) {
        this.mErrorPopMsg = '채널명은 2~20글자 이내로 입력해주세요'
        this.mErrorPopYn = true
        return
      } else if (this.mInputChannelName === '' || this.mInputChannelName === '채널이름') {
        this.mErrorPopMsg = '채널명을 입력해주세요'
        this.mErrorPopYn = true
        return
      }
      if (this.mInputChannelMemo.length > 40) {
        this.mErrorPopMsg = '채널의 소개는 40글자 이내로 입력해주세요'
        this.mErrorPopYn = true
        return
      } else if (this.mInputChannelMemo === '') {
        this.mErrorPopMsg = '채널 소개를 입력해주세요'
        this.mErrorPopYn = true
        return
      }
      if (this.mSelectTypeText === '클릭해서 산업군을 선택해주세요.') {
        this.mErrorPopMsg = '채널의 산업군을 선택해주세요'
        this.mErrorPopYn = true
        return
      }
      if (this.mPageType === '생성') {
        this.mInputChannelMemo = this.mSelectTypeText + '의 산업군을 가진 채널입니다.'
      }
      this.mCreCheckPopYn = true
    },
    async setParam () {
      var gParam = {}
      if (this.chanDetail !== {}) {
        gParam.teamKey = this.chanDetail.targetKey
        if (this.CHANNEL_DETAIL) {
          gParam.reqKey = this.CHANNEL_DETAIL.reqKey
        }
      }

      gParam.nameMtext = 'KO$^$' + this.mInputChannelName
      gParam.memoMtext = 'KO$^$' + this.mInputChannelMemo
      if (this.mInputChannelMemo === undefined || this.mInputChannelMemo === null || this.mInputChannelMemo.replace(' ', '') === '') {
        var teamType = this.$teamTypeString(this.mSelectType)
        gParam.memoMtext = 'KO$^$' + teamType + '의 산업군을 가진 채널입니다.'
      }

      gParam.teamType = this.mSelectType
      gParam.logoFilekey = this.mSelectedIcon.selectedId
      gParam.picMfilekey = this.mSelectedBg.selectedId
      gParam.teamKeyWord = this.keyWord0 + ',' + this.keyWord1 + ',' + this.keyWord2
      gParam.creUserName = this.$changeText(this.GE_USER.userDispMtext)
      gParam.blackYn = this.mBtnColor

      var params = {}
      if (this.mDeleteYn === true) {
        params.deleteYn = true
        gParam.deleteYn = true || 1
        this.mPageType = '삭제'
      }

      var result = await this.$requestCreChan(gParam)
      console.log(result)
      if (result.result === true || result.result === 'true') {
        this.mCreCheckPopYn = false
        this.mCreatedSuccessPopYn = true
        params.targetType = 'chanDetail'
        params.popHeaderText = 'KO$^$' + this.mInputChannelName
        if (this.chanDetail.modiYn !== undefined && this.chanDetail.modiYn !== null && this.chanDetail.modiYn !== '' && this.chanDetail.modiYn === true) {
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
        if (this.chanDetail.targetKey === undefined || this.chanDetail.targetKey === null || this.chanDetail.targetKey === '') {
          teamKey = result.teamKey
        } else {
          teamKey = this.chanDetail.targetKey
        }

        if (this.mDeleteYn !== true) await this.$addChanList(teamKey)

        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        console.log(params)

        // if(delYn === true && this.chanDetail.modiYn === true) {
        //   params.deleteYn = delYn
        // }
        // this.$emit('closeXPop', true)
        this.mCreatedSuccessPopYn = false
        this.$emit('successCreChan', params)
      }
    },
    changeTeamInfo (data) {
      var temp = this.CHANNEL_DETAIL
      temp.nameMtext = data.nameMtext
      temp.memoMtext = data.memoMtext
      temp.teamType = data.teamType
      temp.logoFilekey = data.logoFilekey
      temp.picMfilekey = data.picMfilekey
      temp.teamKeyWord = data.teamKeyWord
      temp.creUserName = data.creUserName
      temp.deleteYn = data.deleteYn
      this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', [temp])
    },
    async newChannelInPool (newCreTeamKey) {
      var paramMap = new Map()
      paramMap.set('teamKey', newCreTeamKey)
      paramMap.set('fUserKey', this.GE_USER.userKey)
      var resultList = await this.$getTeamList(paramMap)
      console.log(' == resultList == ')
      console.log(resultList)
      var response = resultList.data.content[0]
      response.detailPageYn = true
      await this.$store.dispatch('D_CHANNEL/AC_ADD_CHANNEL', response)
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    getChanBoxSize () {
      return {
        '--chanBoxSize': window.innerWidth / 4 - 20 + 'px'
      }
    },
    CHANNEL_DETAIL () {
      // console.log(this.chanDetail)
      if (this.chanDetail) {
        return this.$getDetail('TEAM', this.chanDetail.targetKey)[0]
      } else {
        return null
      }
    }
  },
  components: {
    selecTypePopup, seleciconBgPopup
  }

}
</script>
<style scoped>
.backgroundLabel{
/* color: white; padding: 0.25rem 0.5rem;background-color: black; opacity: 0.5; font-size:14px;white-space: nowrap; */
  padding: 0.25rem 0.5rem;background-color: white; font-size:14px;white-space: nowrap;
  border-radius: 5px;
}

.channelLogoArea{
border:1px solid #ccc; width: 120px; overflow: hidden; height: 120px; border-radius: 120px; margin: 0 auto; margin-top: -130px; background: #ffffff66; position: relative;display:flex; flex-direction: column; justify-content: center; align-items: center;
}
.channelLogoLabel{
  width: 35px;
  height: 35px;
  background-color: white;
  display: flex;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
}
/* #chboxtest p{
  color: black;
} */
#chboxtest{
  font-size:14px; width: 100%; position:relative; min-height: 400px; background: #FFF; top:0; padding-bottom:50px; padding: 0 1rem; height: calc(100% - 15rem);
}

#channelName{
  padding-left: 10px !important; height: 30px; border: 1px solid #ccc; border-radius: 5px; cursor: text;
  width: 100%;
  background: white !important;
  float: left;
}
.channelMemo{
  width: 100%; min-height: 100px; float: left; border-radius: 5px;  border: none; border: 1px solid #ccc;resize:none; padding-left: 5px;
  outline: none;
}

.creChanIntroTextWrap{padding: 10px 0; float: left; border-bottom: 1px solid #ccc;}
.creChanIntroTextWrap p{font-size: 18px; }

.creChanBigBtn{
  height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;
  width: calc(100% - 30px);
}
.activeTypeBox{background: #6768a7 !important; color: #fff;}
.activeTypeBox p {color: #fff;}
.categoryBox{min-width: 40px; margin-right: 5px; height: 30px;float: left; border-radius: 5px;padding-left: 5px;}

.keywordWrap{width: 80%; height: 100%; float: right; border: none; display:flex; overflow: auto;}
.changeChanTypeBtnWrap{width: 80%; height: 100%; float: right; border: none;border: 1px solid #ccc; border-radius: 5px;}
.changeLogoBtnWrap{position: absolute; right: 50%; transform: translateX(180%); top: -50px; z-index: 9;}
.changeBgBtnWrap{position: absolute; left: 1rem; top: 0.3rem;}
.createChanWrap{width: 100%;display: flex; flex-direction: column; height: 100%; top:50px;}
.createChanContentsWrap{width: 100%; left:0; height: 100%;  position: relative ; min-height: 600px; margin: 60px 0; float: left; display: flex;  align-items: flex-end; float: left; margin-bottom: 0;}

</style>
