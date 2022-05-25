<template>
  <!-- <div style="width: 100%; height: 100%; padding: 0 20px; > -->

<img :src="selectBg" style="height:100%; position: absolute; top:50px; left:0;"/>
<selecTypePopup  v-if="typePopYn" @no='typePopYn=false' @makeParam='setTypeData' />
<seleciconBgPopup v-if="iconBgPopupYn=='iconPop' || iconBgPopupYn=='bgPop'"  @no='iconBgPopupYn=false' @makeParam='setIconOrBGData' :opentype="iconBgPopupYn" />
  <div style="width: 100%; height: 100%; position:absolute; top:50px;"  >
<!-- <div style="width: 100%; height: calc(100% - 110px);  overflow: auto; position:absolute; top:50px;"  > -->
    <!-- <input type="file" id="input-Logoimgfile" style="display:none" />
    <input type="file" id="input-Backimgfile" style="display:none" /> -->
    <div style="width: 100%; left:0; min-height: 300px; ">

      <form @submit.prevent="formSubmit" method="post" style="position: absolute; right: 1.5rem; top: 12.5rem;" >
          <label @click="iconBgPopupYn='bgPop'"  class='backgroundLabel' for="input-Backimgfile">배경편집</label>
      </form>

      <!-- <div id='chboxtest' style="font-size:14px; position: absolute; width: 100%; min-height: 100px; background: #FFF; top: 10rem ; box-shadow: rgb(189 189 189) 0px -1px 12px -4px; padding: 0 2rem; height: calc(100% - 50px);"> -->
      <div id='chboxtest' >
        <div class="channelLogoArea" style="">
          <img :src="selectIcon" style="width:90%"/>
          <form @submit.prevent="formSubmit" method="post" style="position: absolute; left:40%; bottom:0; transform: translate(-30%)" >
              <label @click="iconBgPopupYn='iconPop'" for="input-Logoimgfile" class='channelLogoLabel' >로고편집</label>
          </form>
        </div>

        <!-- <div style="display: flex; align-items: center; justify-content: space-around;"> -->
        <div style="width:100%; height: 30px" class="mtop-1">
          <p class="textLeft font14 fl" style="line-height: 30px;">채널명</p>
          <input v-model="inputChannelName" type="text" placeholder="채널명을 20자 이내로 입력해주세요" class="creChanInput"  id="channelName" >
        </div>
        <div style="width:100%; min-height: 100px " class="mtop-1 ">
          <p class="textLeft font14 fl" style="line-height: 30px;">설명</p>
          <!-- <input type="text" placeholder="간단한 소개글을 입력해주세요." name="" value="" class="creChanInput"  id="channelName" style="width: 80%; height: 50px; float: right; padding-right: 10px; border: none;border-bottom: 1px solid #ccc;"> -->
          <textarea v-model="inputChannelMemo" class="channelMemo" placeholder="채널에 대한 설명을 40글자 이내로 입력해주세요."/>
        </div>
        <div style="width:100%; height: 30px" class="mtop-1" >
          <p class="textLeft font14 fl" style="line-height: 30px;">산업군</p>
          <div style="width: 80%; height: 100%; float: right; border: none;border: 1px solid #ccc; border-radius: 5px;" @click="channelTypeClick">
            <p class="textLeft font14 fl mleft-05" style="line-height:30px;" >{{selectTypeText}}</p>
          </div>
        </div>
        <div style="width:100%; height: 40px" class="mtop-1">
          <p class="textLeft font14 fl" style="line-height: 30px;">키워드</p>
          <div style="width: 80%; height: 100%; float: right; border: none; display:flex; overflow: auto; ">
            <!-- <input v-for="(input, index) in 3" :key="index" class="categoryBox" style="border: 1px solid #ccc; flex:1" @change="setKeyword(index,text)" /> -->
            <input class="categoryBox" style="border: 1px solid #ccc; flex:1" v-model="keyWord0" />
            <input class="categoryBox" style="border: 1px solid #ccc; flex:1" v-model="keyWord1" />
            <input class="categoryBox" style="border: 1px solid #ccc; flex:1" v-model="keyWord2" />
          </div>
        </div>

      </div>
    </div>

  </div>
  <gConfirmPop confirmText='정말로 생성 하시겠습니까?' @no='checkPopYn=false' v-if="checkPopYn" @ok='checkValue' />
  <gConfirmPop confirmText='채널이 생성되었습니다.' @no="this.$emit('successCreChan', true)" confirmType='timeout' v-if="okPopYn" />
  <!-- <checkPop v-if='checkPopYn'  @ok='setParam' createText='채널' /> -->
<div @click="checkPopYn= true" class="creChanBigBtn fl mtop-1;">채널 만들기</div>

<gConfirmPop :confirmText='errorMsg' confirmType='timeout' v-if="errorPopYn" @no='errorPopYn=false,checkPopYn=false' />
</template>

<script>
import selecTypePopup from './Tal_selectChanTypePopup.vue'
import seleciconBgPopup from './Tal_selectChaniconBgPopup.vue'
export default {

  mounted () {
    this.loadingClose()
  },
  data () {
    return {
      typePopYn: false,
      iconBgPopupYn: '',
      inputChannelName: '',
      inputChannelMemo: '',
      selectTypeText: '클릭해서 산업군을 선택해주세요.',
      selectType: '',
      selectIcon: '/resource/channeliconbg/CHAR01.png',
      selectBg: '/resource/channeliconbg/BG01.jpg',
      keyWord0: '',
      keyWord1: '',
      keyWord2: '',
      checkPopYn: false,
      okPopYn: false,

      errorMsg: '',
      errorPopYn: false
    }
  },
  methods: {
    channelTypeClick () {
      if (this.typePopYn === false) {
        this.typePopYn = true
      }
    },
    setTypeData (param) {
      this.selectType = param.teamType
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
        this.selectIcon = param.selectedId
        console.log(this.selectIcon)
      } else if (this.iconBgPopupYn === 'bgPop') {
        this.selectBg = param.selectedId
        console.log(this.selectBg)
      }
      this.iconBgPopupYn = false
    },

    checkValue () {
      var result = false
      if (this.selectedType !== '' && this.inputChannelName !== '' && this.inputChannelMemo !== '') {
        if (this.inputChannelName.length > 20) {
          this.errorMsg = '채널명은 20글자 이내로 입력해주세요.'
          this.errorPopYn = true
          result = false
        } else if (this.inputChannelMemo.length > 40) {
          this.errorMsg = '채널의 소개는 40글자 이내로 입력해주세요.'
          this.errorPopYn = true
          result = false
        } else {
          result = true
          this.setParam()
        }
      } else {
        this.errorMsg = '입력값을 모두 입력해주세요.'
        this.errorPopYn = true
      }
      return result
    },
    async setParam () {
      // eslint-disable-next-line no-new-object
      var gParam = new Object()
      gParam.nameMtext = 'KO$^$' + this.inputChannelName
      gParam.memoMtext = 'KO$^$' + this.inputChannelMemo
      gParam.teamType = this.selectType
      gParam.picPath = this.selectIcon
      gParam.picBgPath = this.selectBg
      gParam.teamKeyWord = this.keyWord0 + ',' + this.keyWord1 + ',' + this.keyWord2

      var result = await this.$requestCreChan(gParam)
      if (result === true || result === 'true') {
        this.checkPopYn = false
        this.okPopYn = true
      }
      this.checkPopYn = false
      this.okPopYn = true
    },

    loadingClose () {

      // this.$emit('closeLoading')
    }

  },
  computed: {
  },

  components: {
    selecTypePopup, seleciconBgPopup
  }

}
</script>
<style scoped>
.backgroundLabel{
color: white; padding: 0.25rem 0.5rem;background-color: black; opacity: 0.5; font-size:14px;white-space: nowrap;
}

.channelLogoArea{
border:1px solid #ccc; width: 120px; height: 120px; border-radius: 120px; margin: 0 auto; margin-top: -80px; background: #ffffff66; position: relative;display:flex; flex-direction: column; justify-content: center; align-items: center;
}
.channelLogoLabel{
  color: white; padding: 0.25rem 0.5rem;background-color:black; opacity: 0.5; font-size:14px;white-space: nowrap;
}
#chboxtest p{
  color: black;
}
#chboxtest{
  font-size:14px; position: absolute; width: 100%; min-height: 100px; background: #FFF; top:0; margin-top:15rem; padding-bottom:50px; padding: 0 2rem; height: calc(100% - 15rem); opacity:0.9
}

#channelName{
  padding-left: 5px; width: 80%; height: 30px; float: right; border: 1px solid #ccc; border-radius: 5px;
}
.channelMemo{
  width: 80%; min-height: 100px; float: right; border-radius: 5px;  border: none;border: 1px solid #ccc;resize:none; padding-left: 5px;
}

.creChanIntroTextWrap{padding: 10px 0; float: left; border-bottom: 1px solid #ccc;}
.creChanIntroTextWrap p{font-size: 18px; }

.creChanBigBtn{
  height: 50px; line-height: 50px; font-size: 18px; background: #6768a7; color: #fff; border-radius: 8px;
  /* width: 100%;  */

  /* add Jeong */
  width: 90%;
  position: fixed;
  bottom: 10px;
  left: 5%;
}
.activeTypeBox{background: #6768a7; color: #fff;}
.activeTypeBox p {color: #fff;}
.categoryBox{min-width: 50px; margin-right: 5px; height: 30px;float: left; border-radius: 5px;padding-left: 5px;}
</style>
