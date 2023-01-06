<template>
<div style="width: 100%; min-height: 320px; left:0; background: #FFF; border-radius: 25px 25px 0px 0px; display: flex; flex-direction: column;padding: 20px 20px; position: absolute; bottom: 0; z-index: 11;">
  <div style="position: relative; width: 100%; min-height: 40px; margin-bottom: 10px; float: left;">
      <p class="font20 fontBold textLeft">어디에 작성하실건가요?</p>
      <img src="../../../../assets/images/common/grayXIcon.svg" @click="closePop()" style="width: 20px; position: absolute; right: 8px;top: 5px;" alt="">
  </div>
  <div style="width: 100%; min-height: 100px;">
      <div style="width: 100%; min-height: 100px; display: flex;  float: left; justify-content: space-between;">
          <div @click="selectWriteType('ALIM')"  class="writeTypeBtnStyle" :style="this.mSelectedWriteType === 'ALIM' ? 'border: 3px solid #7678E2!important; ' : ''">
            <div v-if="mAlimClickYn === false" class="noneClickCSS fl wh-100P"></div>
              <img style="width: 36px;" src="../../../../assets/images/main/main_contentsBellIcon2.png" alt="">
              <img v-if="this.mSelectedWriteType === 'ALIM'" src="../../../../assets/images/common/selectCheckIcon.svg" style="position: absolute; left: -15px; top: -10px;" alt="">
              <p :class="{lightGray: this.mSelectedWriteType !== 'ALIM' }" class="font14 fontBold mtop-05 commonColor">{{mAlimClickYn === true ? '알림' : '권한이 없습니다.'}}</p>
          </div>
          <div @click="selectWriteType('BOAR')" class="writeTypeBtnStyle" :style="this.mSelectedWriteType === 'BOAR' ? 'border: 3px solid #7678E2!important; ' : ''">
              <img class="img-w30" src="../../../../assets/images/main/baordIcon.svg" alt="">
              <img v-if="this.mSelectedWriteType === 'BOAR'" src="../../../../assets/images/common/selectCheckIcon.svg" style="position: absolute; left: -15px; top: -10px;" alt="">
              <p :class="{lightGray: this.mSelectedWriteType !== 'BOAR'}" class="font14 fontBold mtop-03 commonColor">게시글</p>
          </div>
      </div>
  </div>
  <div style="width: 100%; margin-top: 20px; min-height: 30px;" v-if="!propTeamKey">
      <p class="font20 fontBold textLeft">채널을 선택해주세요</p>
      <div class="lightGray cursorP font16 fontBold okScrollBar" style="border: 3px solid #F4F4F4!important; width: 100%; height: 160px!important; border-radius: 8px; overflow: hidden scroll; padding :15px 20px;" name="" id="">
          <div style="width: 100%; height: 30px; padding: 0 5px; float: left;">
              <div v-for="(chan, index) in mSelectChanList" style="position: relative; float: left; width: 100%; min-height: 100%;" :key="index">
                  <p @click="this.mSelectedChan = chan.teamKey"  class="font16 textLeft h-100P " :class="this.mSelectedChan === chan.teamKey? 'commonLightColor' : 'commonGray'" >{{this.$changeText(chan.nameMtext)}}</p>
                  <img src="../../../../assets/images/common/listSelectCheck.svg" style="position: absolute; right: 10px; top: 5px; " v-if="this.mSelectedChan === chan.teamKey" alt="">
              </div>
          </div>
      </div>
  </div>
  <gBtnLarge v-if="mSelectChanList.length > 0" :style="this.mSelectedChan === 0? 'background: #F4F4F4!important; color: #AAAAAA!important;': ''" class="mtop-2 fontBold" @click="this.mSelectedChan === 0? '' : openWritePushPop()" btnTitle="작성하기" />
  <gBtnLarge  v-else style="background: #F4F4F4!important; color: #AAAAAA!important;" class="mtop-2 fontBold" btnTitle="컨텐츠를 작성할 수 있는 채널이 없어요" />
</div>
</template>

<script>
export default {
  props: {
    propTeamKey: {},
    propChanList: {}
  },
  data () {
    return {
      mSelectedWriteType: 'ALIM',
      mSelectedChan: 0,
      mSelectChanList: [],
      mAlimClickYn: true
    }
  },
  created () {
    if (this.propChanList && this.propChanList.length > 0) {
      this.mSelectChanList = this.propChanList
      this.mSelectedChan = this.mSelectChanList[0].teamKey
    } else {
      if (!this.propTeamKey) {
        this.getTeamList()
      } else {
        this.mSelectChanList.push(this.propTeamKey)
        this.mSelectedChan = this.propTeamKey
        this.checkPermi()
      }
    }
    this.$addHistoryStack('bottomWriteSheets')
  },
  mounted () {
    console.log(this.CHANNEL_DETAIL)
  },
  beforeUnmount () {
    console.log(' beforeUnmount ')
    this.$checkDeleteHistory('bottomWriteSheets')
  },
  methods: {
    checkPermi () {
      if (!this.propTeamKey === undefined) return
      if (!this.CHANNEL_DETAIL.D_CHAN_AUTH.mngAlimYn) {
        this.mSelectedWriteType = 'BOAR'
        this.mAlimClickYn = false
      } else {
        this.mAlimClickYn = true
      }
    },
    async getTeamList (loadingYn) {
      var paramMap = new Map()
      paramMap.set('userKey', this.GE_USER.userKey)
      paramMap.set('pageSize', 100)
      if (this.mSelectedWriteType === 'ALIM') {
        paramMap.set('canSendAlim', true)
      }
      var nonLoading = true
      if (loadingYn) {
        nonLoading = false
      }

      var resultList = await this.$getTeamList(paramMap, nonLoading)
      if (resultList.data.content) {
        this.mSelectChanList = resultList.data.content
        this.mSelectedChan = this.mSelectChanList[0].teamKey
      }
      console.log(resultList)
    },
    closePop () {
      this.$emit('closePop')
    },
    selectWriteType (jobkindId) {
      // 알림의 권한이 없으면 바꿀 수 없게
      if (this.mAlimClickYn === false) return
      this.mSelectedWriteType = jobkindId
      if (!this.propTeamKey) {
        this.mSelectedChan = 0
        this.mSelectChanList = []
        this.getTeamList(false)
      }
    },
    async openWritePushPop () {
      if (this.propTeamKey && this.mSelectedWriteType === 'ALIM' && !this.CHANNEL_DETAIL.D_CHAN_AUTH.ownerYn && !this.CHANNEL_DETAIL.D_CHAN_AUTH.memberNameMtext) {
        this.$showToastPop('해당 채널에 멤버가 아닙니다. 멤버로 신청 후 이용해주세요.')
        this.$checkDeleteHistory('bottomWriteSheets')
        this.$emit('openMember')
        return
      }
      var writeParam = {}
      writeParam.contentsJobkindId = this.mSelectedWriteType
      writeParam.targetKey = this.mSelectedChan
      writeParam.teamKey = this.mSelectedChan
      writeParam.currentTeamKey = this.mSelectedChan
      writeParam.targetType = 'writeContents'
      if (this.mSelectedWriteType === 'ALIM') {
        var index = this.mSelectChanList.findIndex((item) => item.teamKey === this.mSelectedChan)
        if (index !== -1) {
          writeParam.targetNameMtext = this.mSelectChanList[index].nameMtext
        }
      } else if (this.mSelectedWriteType === 'BOAR') {
        var teamList = await this.$getWriteBoardData(this.mSelectedChan)
        if (teamList === false) {
          this.$showToastPop('채널을 다시 선택 후 확인 버튼을 눌러주세요!')
          return
        }
        writeParam.selectBoardYn = true
        writeParam.initData = teamList
      }
      this.openPop(writeParam)
      // this.mSeleteWriteTypePopShowYn = false
    },
    openPop (openPopParam) {
      this.$checkDeleteHistory('bottomWriteSheets')
      this.$emit('openPop', openPopParam)
    }
  },
  computed: {
    CHANNEL_DETAIL () {
      if (this.propTeamKey) {
        var detail = this.$getDetail('TEAM', this.propTeamKey)
        if (detail && detail.length > 0) {
          if (!detail[0].D_CHAN_AUTH || detail[0].D_CHAN_AUTH === true || (detail[0].D_CHAN_AUTH.followYn && !detail[0].D_CHAN_AUTH.settingYn)) {
            return this.CHANNEL_DETAIL
          } else {
            return detail[0]
          }
        } else {
          if (this.CHANNEL_DETAIL) {
            return this.CHANNEL_DETAIL
          } else {
            return null
          }
        }
      }
      return null
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    }
  },
  watch: {
    pageUpdate () {
      var history = this.$store.getters['D_HISTORY/hStack']
      if (history[history.length - 1] === 'bottomWriteSheets') {
        this.closePop()
      }
    }
  }
}
</script>

<style>
.writeTypeBtnStyle {
    float:left; width: calc(50% - 10px); height: 95px; cursor:pointer; border-radius: 6px;position: relative; border: 3px solid #F4F4F4; display: flex; flex-direction: column; justify-content: center; align-items: center;
}
.noneClickCSS {
  border-radius: 6px;
  position: absolute;
  background: #00000030;
  /* background: #cccccc; */
}
</style>
