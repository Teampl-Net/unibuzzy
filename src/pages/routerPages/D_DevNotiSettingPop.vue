<template>
    <div>
        <div style="width:100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 100; background: #00000025;"></div>
    <div style="width: 80%; height: 550px; border-radius: 0.8rem; overflow: hidden scroll; padding: 10px 20px; box-shadow: 0 0 4px 4px #ccc; z-index: 101; position: absolute; top: 10%; left: 10%; background: #FFF;">
        <div style="width: 100%; height: 40px; float: left; position: relative;" class="headerShadow">
            <img src="../../assets/images/common/popup_close.png" style="position: absolute; right: 0px; top: 8px; width: 20px;" @click="closeXPop()" alt="">
            <p class="font20 fontBold textLeft">개발자모드</p></div>
        <div style="width: 100%; float: left; height: calc(100% - 40px); padding: 20px 10px;">
            <!-- <gActiveBar  :tabList="this.activeTabList" class=" fl" @changeTab="changeTab" /> -->
            <!-- <p class="font18 fontBold textLeft fl mright-1 mbottom-05">이벤트 종류</p>
            <div style="display: flex; justify-content: flex-start; min-height: 30px; width: 100%;  align-items: center; margin-bottom: 10px;">
                <gBtnSmall @click="mParamObj.clickYn = false" :btnThema="mParamObj.clickYn? 'light': ''" btnTitle="알림 수신" style="margin-right: 10px;"/>
                <gBtnSmall @click="mParamObj.clickYn = true" :btnThema="!mParamObj.clickYn? 'light': ''" btnTitle="상단바알림 클릭"/>
            </div> -->
            <!-- <p class="font18 fontBold textLeft fl mright-1 mbottom-05">알림 종류 선택</p>
            <div style="display: flex; justify-content: flex-start; min-height: 30px; width: 100%;  align-items: center; margin-bottom: 10px;">
                <gBtnSmall @click="mParamObj.notiType = 'ALIM', getContentsList()" :btnThema="mParamObj.notiType != 'ALIM'? 'light': ''" btnTitle="알림 작성" style="margin-right: 10px;"/>
                <gBtnSmall @click="mParamObj.notiType = 'MEMO'" :btnThema="mParamObj.notiType != 'MEMO'? 'light': ''" btnTitle="댓글작성" style="margin-right: 10px;"/>
                <gBtnSmall btnTitle="대댓글 작성" style="margin-right: 10px;"/>
                <gBtnSmall btnTitle="채널수정" style="margin-right: 10px;"/>
                <gBtnSmall @click="mParamObj.notiType = 'BOAR', getContentsList()" :btnThema="mParamObj.notiType != 'BOAR'? 'light': ''" btnTitle="게시글 작성" style="margin-right: 10px;"/>
            </div> -->
            <p class="font18 fontBold textLeft mright-1 mbottom-05">컨텐츠 선택</p>
            <select v-model="mParamObj.targetObj" style="width: 100%; float: left; height: 30px;" name="" id="">
                <option v-for="(value, index) in targetList" :key="index" :value="value">{{value.jobkindId === 'ALIM'? '[알림] ': '[게시] '}}{{value.title}}</option>
                <!-- <option value="1">1초뒤</option>
                <option value="2">2초뒤</option>
                <option value="3">3초뒤</option>
                <option value="4">4초뒤</option>
                <option value="5">5초뒤</option> -->
            </select>
                <!--
            <p class="font16 textLeft grayBlack mright-1">(미선택시 가장최근알림 자동선택)</p>
            <div style="display: flex; justify-content: flex-start; min-height: 30px; width: 100%;  align-items: center; margin-bottom: 10px;">

                <gBtnSmall btnTitle="수신" style="margin-right: 10px;"/>
                <gBtnSmall btnTitle="클릭"/>
            </div>-->
            <p class="font18 fontBold textLeft mright-1 mtop-05 mbottom-05">발생시각</p>
            <div style="display: flex; justify-content: flex-start; min-height: 30px; width: 100%;  align-items: center; margin-bottom: 10px;">
                <select v-model="mParamObj.time" style="width: 100%; height: 30px;" name="" id="">
                    <option value="0">즉시 실행</option>
                    <option value="1">1초뒤</option>
                    <option value="2">2초뒤</option>
                    <option value="3">3초뒤</option>
                    <option value="4">4초뒤</option>
                    <option value="5">5초뒤</option>
                </select>
            </div>
            <gBtnLarge style="float: left;" @click="sendDevPush" btnTitle="이벤트 발생"/>
            <p class="font18 fontBold textLeft mright-1 fl w100P mbottom-05 mtop-2">webview url 변경</p>
            <input ref="urlInput" v-model="changeUrl" type="text" name="" style="width: 100%; float: left; height: 30px;" id="">
            <gBtnLarge style="float: left; margin-top: 10px;" @click="changeWebviewUrl" btnTitle="url 변경"/>
            <p class="font18 fontBold textLeft mright-1 fl  mbottom-05 mtop-3">백버튼 활성화</p>
            <div class="toggleInputWrap fr mbottom-05 mtop-3">
                <input type="checkbox" v-model="backBtnShowYn" id="backBtnToggle" hidden>
                <label for="backBtnToggle" @click="changeBackBtnShowYn" class="toggleSwitch">
                <span class="toggleButton"></span>
                </label>
            </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      mParamObj: {
        clickYn: false,
        notiType: 'ALIM',
        targetObj: 0,
        backBtnShowYn: JSON.parse(localStorage.getItem('backBtnShowYn')),
        /* activeTabList: [{ display: '전체', name: 'A' }, { display: '알림', name: 'P' }, { display: '게시글', name: 'B' }], */
        time: 0
      },
      changeUrl: 'http://192.168.0.',
      targetList: []
    }
  },
  created () {
    this.getContentsList()

    console.log(localStorage.getItem('backBtnShowYn'))
  },
  methods: {
    closeXPop () {
      this.$emit('closeXPop')
    },
    changeBackBtnShowYn () {
      console.log(this.backBtnShowYn)
      if (!this.backBtnShowYn) this.backBtnShowYn = false
      /* this.backBtnShowYn = !this.backBtnShowYn */
      localStorage.setItem('backBtnShowYn', this.backBtnShowYn + '')
    },
    async getContentsList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      var resultData = null
      param.offsetInt = 0
      param.pageSize = 5
      /* if (this.mParamObj.notiType === 'ALIM') {
        param.jobkindId = 'ALIM'
        param.ownUserKey = this.GE_USER.userKey
      } else if (this.mParamObj.notiType === 'BOAR') {
        // param.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
        param.boardYn = true
        param.jobkindId = 'BOAR'
        param.ownUserKey = this.GE_USER.userKey
      } else if (this.viewTab === 'A') {
        param.allYn = true
      } */
      param.allYn = true
      // param.allYn = true
      resultData = await this.$getContentsList(param)
      this.targetList = resultData.content
      this.mParamObj.targetObj = this.targetList[0]
      return resultData
    },
    sendDevPush () {
      this.closeXPop()
      var this_ = this
      // eslint-disable-next-line no-new-object
      var pushParam = new Object()

      pushParam.bodyFullStr = this.mParamObj.targetObj.bodyFullStr
      pushParam.bodyHtmlYn = this.mParamObj.targetObj.bodyHtmlYn
      pushParam.bodyMinStr = this.mParamObj.targetObj.bodyMinStr
      if (this.mParamObj.targetObj.jobkindId === 'BOAR') {
        pushParam.cabinetKey = this.mParamObj.targetObj.cabinetKey
        pushParam.cabinetNameMtext = this.mParamObj.targetObj.cabinetNameMtext
      }
      pushParam.contentsKey = this.mParamObj.targetObj.contentsKey
      pushParam.creDate = this.mParamObj.targetObj.creDate
      pushParam.creTeamKey = this.mParamObj.targetObj.creTeamKey
      pushParam.deleteYn = this.mParamObj.targetObj.deleteYn
      pushParam.devNotiYn = true
      pushParam.domainPath = this.mParamObj.targetObj.domainPath
      pushParam.logoPathMtext = this.mParamObj.targetObj.logoPathMtext
      pushParam.mccKey = this.mParamObj.targetObj.mccKey
      pushParam.nameMtext = this.mParamObj.targetObj.nameMtext
      pushParam.jobkindId = this.mParamObj.targetObj.jobkindId
      pushParam.title = this.mParamObj.targetObj.title
      pushParam.showCreNameYn = true
      pushParam.userKeyList = [this.GE_USER.userKey]
      pushParam.allRecvYn = false
      setTimeout(() => {
        this_.$commonAxiosFunction({
          url: 'https://www.unibuzzy.com/sUniB/tp.sendDevPush',
          param: pushParam
        }, true)
      }, this.mParamObj.time * 1000)
    },
    changeWebviewUrl () {
      // this.$refs.urlInput.blur()
      location.href = this.changeUrl + '/#/'
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>

<style scoped>
.toggleSwitch {
  width: 60px;
  height: 30px;
  display: block;
  float: right;
  position: relative;
  border-radius: 2rem;
  background-color: #fff;
  box-shadow: 0 0 1rem 3px rgba(0 0 0 / 15%);
  cursor: pointer;
}
 /* 토글 버튼 */
.toggleSwitch .toggleButton {
  /* 버튼은 토글보다 작아야함  */
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  left: .2rem;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #6768A7;
}
#backBtnToggle:checked ~ .toggleSwitch {
  background: #6768A7;
}

#backBtnToggle:checked ~ .toggleSwitch .toggleButton {
  /* 100% -> 끝위치, 2.8rem -> 버튼 크기 */
  left: calc(100% - 25px);
  background: #fff;
}

.toggleSwitch, .toggleButton {
  transition: all 0.2s ease-in;
}
.toggleLine{width: 100%; float: left;}
</style>
