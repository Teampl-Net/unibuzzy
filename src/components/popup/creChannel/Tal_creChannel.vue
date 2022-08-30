<template>
  <!-- <div style="width: 100%; height: 100%; padding: 0 20px; > -->

<selecTypePopup  v-if="typePopYn" @no='typePopYn=false' @makeParam='setTypeData' />
<seleciconBgPopup v-if="iconBgPopupYn=='iconPop' || iconBgPopupYn=='bgPop'" :selectIcon="this.selectIcon" :selectBg="this.selectBg" @no='iconBgPopupYn=false' @makeParam='setIconOrBGData' :opentype="iconBgPopupYn" />
  <div :style="'background: url(' + selectBg.selectPath + ');'" style="background-repeat: no-repeat;background-size: cover;" class="createChanWrap"  >
    <div class="createChanContentsWrap">
      <form @submit.prevent="formSubmit" method="post" class="changeBgBtnWrap cursorP" >
        <label @click="iconBgPopupYn='bgPop'"  class='backgroundLabel commonColor' for="input-Backimgfile">
          <img src="../../../assets/images/channel/icon_camera.svg" class="cursorP" style="width:20px;" alt=""> 배경편집 </label>
      </form>

      <div v-if="chanDetail.modiYn === true && this.chanDetail.ownerYn" @click="chanDelete" class="backgroundLabel" style="background-color:white; border-radius:5px; position: absolute; right:1em; top:0.3rem; padding-left:0.25rem">
          <p class="font14" style="color:#aaa;"> <img src="../../../assets/images/formEditor/trashIcon_gray2.svg" style="width:18px;" alt=""> 채널 삭제 </p>
        </div>

      <div id='chboxtest' >

        <form @submit.prevent="formSubmit" method="post" class="changeLogoBtnWrap cursorP" >
            <!-- <label @click="iconBgPopupYn='iconPop'" for="input-Logoimgfile" class='channelLogoLabel' >로고편집</label> -->
            <label @click="iconBgPopupYn='iconPop'" for="input-Logoimgfile" class='channelLogoLabel cursorP' ><img src="../../../assets/images/channel/icon_camera.svg" style="width:20px;" alt=""> </label>
        </form>

        <div @click="iconBgPopupYn='iconPop'" class="channelLogoArea cursorP" :style="'background-image: url(' + selectIcon.selectPath + ')'" style="background-size: cover; background-position: center; background-repeat: no-repeat;">
          <!-- <img @click="iconBgPopupYn='iconPop'" :src="selectIcon.selectPath" style="width:100%"/> -->
        </div>
        <div class="w-100P fl" style="height: calc(100% - 80px); overflow: auto; margin-top: 1rem;">

          <div style="width:100%;" class="mtop-1 fl">
            <p class="textLeft font20 fl fontBold w-100P" style="line-height: 30px;">채널명</p>
            <input v-model="inputChannelName" type="text" placeholder="채널명을 20자 이내로 입력해주세요" class="creChanInput"  id="channelName" >
          </div>
          <!-- <input style="text-align:center ;font-size: 20px !important; color: #6768a7 !important; font-weight: bold; border: none !important; background: none !important; border-bottom: 1px solid #cccccc !important; border-radius: 0 !important;" v-model="inputChannelName" type="text" placeholder="채널이름" class="creChanInput"  id="channelName" >
          <img class="cursorP" src="../../../assets/images/push/noticebox_edit.png" style="" alt=""> -->

          <div style="width:100%;" class="mtop-1 fl ">
            <div class="fr w-100P" style="display: flex; justify-content: flex-end; display: none;"> <input type="checkbox" class="fr" id="chanMemoYn" v-model="chanMemoYn"> <label for="chanMemoYn" class="fr mleft-05">채널 소개글 {{pageType === '수정'? pageType : '작성'}}하기</label></div>
            <p v-show="chanMemoYn" class="textLeft font20 fl fontBold w-100P" style="line-height: 30px;">소개글</p>
            <!-- <textarea v-show="chanMemoYn" style="background: ghostwhite;" v-model="inputChannelMemo" class="channelMemo" placeholder="채널에 대한 설명을 40글자 이내로 입력해주세요."/> -->
            <textarea v-show="chanMemoYn" style="background: #fff; border: 1px solid #cccccc; padding: 10px;" v-model="inputChannelMemo" class="channelMemo" placeholder="채널에 대한 설명을 40글자 이내로 입력해주세요."/>
          </div>
          <div style="width:100%; height: 30px" class="mtop-1 fl" >
            <p class="textLeft font20 fl fontBold w-100P" style="line-height: 30px;">산업군</p>
            <!-- <div class="changeChanTypeBtnWrap" style="background: ghostwhite;" @click="channelTypeClick">
              <p class="textLeft font14 fl mleft-05 commonBlack" style="line-height:30px;" >{{selectTypeText}}</p>
            </div> -->
            <div class="fl mtop-05" style="width: 100%;">
              <!-- <div :class="{activeTypeBox: selectedType ===value.teamType}" @click="selectChanType(value)" v-for="(value,index) in businessTypeList" :key="index" :style="getChanBoxSize" style="display:;  width: var(--chanBoxSize);margin-right: 10px;height:2.5rem; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc;display: flex; align-items: center; justify-content: center; background: #eee; "> -->
                <div :class="{activeTypeBox: selectedType ===value.teamType}" @click="selectChanType(value)" v-for="(value,index) in businessTypeList" :key="index" :style="getChanBoxSize" class="fl cursorP" style="min-width:40px; width: var(--chanBoxSize); margin-right: 10px; height:2.5rem; margin-bottom: 10px; border-radius: 5px; background: rgb(245 245 245); display: flex; justify-content: center; align-items: center; ">
                  <img class="img-w14 fl mright-05" v-if="value.teamType === 'C' && selectedType !== 'C'" src="../../../assets/images/channel/icon_office.svg"/>
                  <img class="img-w14 fl mright-05" v-if="value.teamType === 'C' && selectedType === 'C'" src="../../../assets/images/channel/icon_office_white.svg" >
                  <img class="img-w18 fl mright-05" v-if="value.teamType === 'G' && selectedType !== 'G'" src="../../../assets/images/channel/icon_Government.svg"/>
                  <img class="img-w18 fl mright-05" v-if="value.teamType === 'G' && selectedType === 'G'" src="../../../assets/images/channel/icon_Government_white.svg"/>
                  <img class="img-w20 fl mright-05" v-if="value.teamType === 'S' && selectedType !== 'S'" src="../../../assets/images/channel/icon_school.svg"/>
                  <img class="img-w20 fl mright-05" v-if="value.teamType === 'S' && selectedType === 'S'" src="../../../assets/images/channel/icon_school_white.svg"/>
                  <img class="img-w20 fl" v-if="value.teamType === 'H' && selectedType !== 'H'" src="../../../assets/images/channel/icon_church.svg"/>
                  <img class="img-w20 fl" v-if="value.teamType === 'H' && selectedType === 'H'" src="../../../assets/images/channel/icon_church_white.svg"/>
                  <img class="img-w20 fl mright-05" v-if="value.teamType === 'D' && selectedType !== 'D'" src="../../../assets/images/channel/icon_society.jpg"/>
                  <img class="img-w20 fl mright-05" v-if="value.teamType === 'D' && selectedType === 'D'" src="../../../assets/images/channel/icon_society_white.jpg"/>
                  <img class="img-w20 fl mright-05" v-if="value.teamType === 'Q' && selectedType !== 'Q'" src="../../../assets/images/channel/icon_hospital.svg"/>
                  <img class="img-w20 fl mright-05" v-if="value.teamType === 'Q' && selectedType === 'Q'" src="../../../assets/images/channel/icon_hospital_white.svg"/>
                  <img class="img-w14 fl mright-05" v-if="value.teamType === 'V' && selectedType !== 'V'" src="../../../assets/images/channel/icon_pharmacy.svg"/>
                  <img class="img-w14 fl mright-05" v-if="value.teamType === 'V' && selectedType === 'V'" src="../../../assets/images/channel/icon_pharmacy_white.svg"/>
                  <img class="img-w20 fl mright-05" v-if="value.teamType === 'A' && selectedType !== 'A'" src="../../../assets/images/channel/icon_store.svg"/>
                  <img class="img-w20 fl mright-05" v-if="value.teamType === 'A' && selectedType === 'A'" src="../../../assets/images/channel/icon_store_white.svg"/>
                  <img class="img-w20 fl mright-05" v-if="value.teamType === 'F' && selectedType !== 'F'" src="../../../assets/images/channel/icon_familly.svg"/>
                  <img class="img-w20 fl mright-05" v-if="value.teamType === 'F' && selectedType === 'F'" src="../../../assets/images/channel/icon_familly_white.svg"/>
                  <p class="font15 commonBlack fl" style="word-break: keep-all;" >
                  {{value.teamNameMtext}}
                  </p>
              </div>
            </div>
          </div>

        </div>

        <!-- <div style="width:100%; height: 40px" class="mtop-1" >
          <p class="textLeft font14 fl" style="line-height: 30px;">키워드</p>
          <div class="keywordWrap ">
            <input class="categoryBox" style="border: 1px solid #ccc; flex:1" v-model="keyWord0" />
            <input class="categoryBox" style="border: 1px solid #ccc; flex:1" v-model="keyWord1" />
            <input class="categoryBox" style="border: 1px solid #ccc; flex:1" v-model="keyWord2" />
          </div>
        </div> -->

        <!-- <div v-if="chanDetail.modiYn === true" @click="chanDelete" style="background-color:#DC143C; width:4rem; border-radius:5px; padding:3px 5px;position: absolute; right:3em; bottom:80px;"> -->
         <div @click="checkValue" class="creChanBigBtn fl mtop-1;" style="margin: 0 auto; cursor: pointer; position: absolute; bottom: 20px;">채널 {{pageType}}</div>
      </div>
    </div>
  </div>
  <gConfirmPop :confirmText="'[' + inputChannelName + '] 채널을 ' + pageType + '하겠습니다'" @no='checkPopYn=false' v-if="checkPopYn" @ok='setParam' />
  <gConfirmPop :confirmText="'채널이' + pageType + '되었습니다.'" @no="this.$emit('successCreChan', true)" confirmType='timeout' v-if="okPopYn" />
  <!-- <checkPop v-if='checkPopYn'  @ok='setParam' createText='채널' /> -->

<gConfirmPop :confirmText='errorMsg' confirmType='timeout' v-if="errorPopYn" @no='errorPopYn=false,checkPopYn=false' />
</template>

<script>
/* eslint-disable */
import selecTypePopup from './Tal_selectChanTypePopup.vue'
import seleciconBgPopup from './Tal_selectChaniconBgPopup.vue'
export default {
  created() {
    this.$emit('openLoading')
    if (this.chanDetail !== undefined && this.chanDetail !== null && this.chanDetail !== {}) {
      if (this.chanDetail.modiYn === true) {
        this.pageType = '수정'
        this.chanMemoYn = true
        this.getTeamList()
      }
    }
    setTimeout(() => {
      this.$emit('closeLoading')
    }, 500)
  },
  mounted () {
    this.loadingClose()
  },
  props: {
    chanDetail: {}
  },
  data () {
    return {
      typePopYn: false,
      iconBgPopupYn: '',
      modiTeamData: {},
      pageType: '생성',
      inputChannelName: '',
      inputChannelMemo: '',
      selectTypeText: '클릭해서 산업군을 선택해주세요.',
      selectType: '',
      selectIcon: { selectedId: '1', selectPath: '/resource/channeliconbg/CHAR01.png' },
      selectBg: { selectedId: '11', selectPath: '/resource/channeliconbg/BG01.jpg' },
      keyWord0: '',
      keyWord1: '',
      keyWord2: '',
      checkPopYn: false,
      okPopYn: false,
      errorMsg: '',
      errorPopYn: false,
      // chanMemoYn: false,
      chanMemoYn: true,
      businessTypeList: [
        { teamNameMtext: '기업', teamType: 'C' },
        { teamNameMtext: '정부', teamType: 'G' },
        { teamNameMtext: '학교', teamType: 'S' },
        { teamNameMtext: '종교 단체', teamType: 'H' },
        { teamNameMtext: '동호회', teamType: 'D' },
        { teamNameMtext: '병원', teamType: 'Q' },
        { teamNameMtext: '약국', teamType: 'V' },
        { teamNameMtext: '매장', teamType: 'A' },
        { teamNameMtext: '가족', teamType: 'F' },
        { teamNameMtext: '기타', teamType: 'E' }
      ],
      selectedType: ''
    }
  },
  methods: {
    selectChanType (value) {
      this.selectedType = value.teamType
      this.selectType = value.teamType
      this.selectTypeText = value.teamNameMtext
    },
    chanDelete () {
      this.setParam(true)
    },
    async getTeamList () {
      var paramMap = new Map()
      paramMap.set('teamKey', this.chanDetail.targetKey)
      this.modiTeamData = await this.$getTeamList(paramMap)

      this.inputChannelName = this.$changeText(this.modiTeamData.data.content[0].nameMtext)
      this.inputChannelMemo = this.$changeText(this.modiTeamData.data.content[0].memoMtext)
      console.log(this.modiTeamData.data.content[0].bgPathMtext.length > 30)
      console.log(this.modiTeamData.data.content[0].logoPathMtext.length > 30)
      this.selectBg.selectedId = this.modiTeamData.data.content[0].picMfilekey
      this.selectBg.selectPath = this.modiTeamData.data.content[0].bgPathMtext
      this.selectBg.iconType = this.modiTeamData.data.content[0].bgPathMtext.length > 30 ? 'img' : 'icon'
      this.selectIcon.selectedId = this.modiTeamData.data.content[0].logoFilekey
      this.selectIcon.selectPath = this.modiTeamData.data.content[0].logoPathMtext
      this.selectIcon.iconType = this.modiTeamData.data.content[0].logoPathMtext.length > 30 ? 'img' : 'icon'
      var param = {}
      param.teamType = this.modiTeamData.data.content[0].teamType
      this.setTypeData(param)
    },
    channelTypeClick () {
      if (this.typePopYn === false) {
        this.typePopYn = true
      }
    },
    setTypeData (param) {
      this.selectType = param.teamType
      this.selectedType = param.teamType
      if (param.teamType === 'C') {
        this.selectTypeText = '기업'
      } else if (param.teamType === 'G') {
        this.selectTypeText = '정부'
      } else if (param.teamType === 'S') {
        this.selectTypeText = '학교'
      } else if (param.teamType === 'H') {
        this.selectTypeText = '종교'
      } else if (param.teamType === 'D') {
        this.selectTypeText = '동호회'
      } else if (param.teamType === 'Q') {
        this.selectTypeText = '병원'
      } else if (param.teamType === 'V') {
        this.selectTypeText = '약국'
      } else if (param.teamType === 'P') {
        this.selectTypeText = '식당'
      } else if (param.teamType === 'A') {
        this.selectTypeText = '매장'
      } else if (param.teamType === 'E') {
        this.selectTypeText = '기타'
      }
      this.typePopYn = false
    },
    setIconOrBGData (param) {
      if (this.iconBgPopupYn === 'iconPop') {
        this.selectIcon = param
      } else if (this.iconBgPopupYn === 'bgPop') {
        this.selectBg = param
      }
      this.iconBgPopupYn = false
    },
    checkValue () {
      if (this.inputChannelName.length > 20 || this.inputChannelName.length === 1) {
        this.errorMsg = '채널명은 2~20글자 이내로 입력해주세요'
        this.errorPopYn = true
        return
      } else if (this.inputChannelName === '' || this.inputChannelName === '채널이름') {
        this.errorMsg = '채널명을 입력해주세요'
        this.errorPopYn = true
        return
      }
      if (chanMemoYn === true) {
        if (this.inputChannelMemo.length > 40) {
          this.errorMsg = '채널의 소개는 40글자 이내로 입력해주세요'
          this.errorPopYn = true
          return
        } else if (this.inputChannelMemo === '') {
          this.errorMsg = '채널 소개를 입력해주세요'
          this.errorPopYn = true
          return
        }
      }
      if (this.selectTypeText === '클릭해서 산업군을 선택해주세요.') {
        this.errorMsg = '채널의 산업군을 선택해주세요'
        this.errorPopYn = true
        return
      }
      if (this.chanMemoYn === false && this.pageType === '생성') {
        this.inputChannelMemo = this.selectTypeText + '의 산업군을 가진 채널입니다!'
      }
      this.checkPopYn = true
    },
    async setParam (delYn) {
      // eslint-disable-next-line no-new-object
      var gParam = new Object()
      if (this.chanDetail !== {}) {
        gParam.teamKey = this.chanDetail.targetKey
      }
      gParam.nameMtext = 'KO$^$' + this.inputChannelName
      gParam.memoMtext = 'KO$^$' + this.inputChannelMemo
      gParam.teamType = this.selectType
      gParam.logoFilekey = this.selectIcon.selectedId
      gParam.picMfilekey = this.selectBg.selectedId
      gParam.teamKeyWord = this.keyWord0 + ',' + this.keyWord1 + ',' + this.keyWord2
      gParam.creUserName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext)
      var params = new Object()
      if(delYn === true && this.chanDetail.modiYn === true){
        params.deleteYn = true
        gParam.deleteYn = true || 1

      }

      var result = await this.$requestCreChan(gParam)
      if (result.result === true || result.result === 'true') {
        this.checkPopYn = false
        this.okPopYn = true
        // eslint-disable-next-line no-new-object

        params.targetType = 'chanDetail'
        params.nameMtext = 'KO$^$' + this.inputChannelName
        if (this.chanDetail.modiYn !== undefined && this.chanDetail.modiYn !== null && this.chanDetail.modiYn !== '' && this.chanDetail.modiYn === true) {
          params.targetKey = this.chanDetail.targetKey
          params.modiYn = true
          params.teamKey = this.chanDetail.targetKey
        }else{
          params.targetKey = result.teamKey
          params.teamKey = result.teamKey
          params.newChan = true
        }

        // if(delYn === true && this.chanDetail.modiYn === true) {
        //   params.deleteYn = delYn
        // }
        this.$emit('successCreChan', params)
      }
    },

    loadingClose () {

      // this.$emit('closeLoading')
    }

  },
  computed: {
    getChanBoxSize () {
      return {
        // '--chanBoxSize': window.innerWidth / 4 - 20 + 'px'
        '--chanBoxSize': window.innerWidth / 4 - 20 + 'px'
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
  /* padding-left: 5px; width: 80%; height: 30px; float: right; border: 1px solid #ccc; border-radius: 5px; */
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
  /* width: 100%;  */

  /* add Jeong */
  width: calc(100% - 30px);
}
.activeTypeBox{background: #6768a7 !important; color: #fff;}
.activeTypeBox p {color: #fff;}
.categoryBox{min-width: 40px; margin-right: 5px; height: 30px;float: left; border-radius: 5px;padding-left: 5px;}

.keywordWrap{width: 80%; height: 100%; float: right; border: none; display:flex; overflow: auto;}
.changeChanTypeBtnWrap{width: 80%; height: 100%; float: right; border: none;border: 1px solid #ccc; border-radius: 5px;}
.changeLogoBtnWrap{position: absolute; right: 50%; transform: translateX(180%); top: -50px; z-index: 9;}
.changeBgBtnWrap{position: absolute; left: 1rem; top: 0.3rem;}
/* .createChanWrap{width: 100%;display: flex; flex-direction: column; overflow: hidden scroll; height: 100%; top:50px;} */
.createChanWrap{width: 100%;display: flex; flex-direction: column; height: 100%; top:50px;}
.createChanContentsWrap{width: 100%; left:0; height: 100%;  position: relative ; min-height: 600px; margin: 60px 0; float: left; display: flex;  align-items: flex-end; float: left; margin-bottom: 0;}

/* #channelName::placeholder {
  color: rgb(103, 104, 167) !important;
} */
</style>
