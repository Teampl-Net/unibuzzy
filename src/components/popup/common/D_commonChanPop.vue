<template>
    <div @click="closeXPop" style="position: absolute; width: 100%; height: 100%; background: #00000025;"></div>
    <div v-if="reqPopShowYn" @click="closeReqMemPop" style="position: absolute; width: 100%; height: 100%; background: #00000040;"></div>
    <repMemberPop v-if="reqPopShowYn" @closeXPop="closeReqMemPop" :propTeamDetail="this.CHANNEL_DETAIL" :propMemberData="selectMemberObj"/>
    <div v-if="CHANNEL_DETAIL" style="width: 100%; height: 100%; display: flex; justify-content: center; position: absolute; z-index: 99; overflow: auto;">
        <div :style="popupStyle" style="width: 80%; background: #FFF; box-shadow: 0 0 4px 4px #00000025; border-radius: 0.8rem; min-height: 500px;">
            <div style="width: 100%; height: 100px; float: left; display: flex; align-items: center; padding-bottom: 0;" class="commonChanPopPadding" >
                <!-- box-shadow: 0 4px 10px -4px #ccc -->
                <div :style="'background-image: url(' + CHANNEL_DETAIL.logoDomainPath + CHANNEL_DETAIL.logoPathMtext + '); background-position: center;  background-size: cover; background-repeat: no-repeat'" style="width: 60px; height: 60px; display: flex; justify-content: center; border-radius: 100%; border: 2px solid #ccc; center; align-items: center;"></div>
                <div style="width: calc(100% - 60px);height: 100%; display: flex; flex-direction: column; justify-content: center;">
                    <p class="textLeft font18 fontBold" style="margin-left: 15px; line-height: 20px; ">{{this.$changeText(CHANNEL_DETAIL.nameMtext)}}</p>
                    <div style="width: 100%; float: left; height: 1px; border-bottom: 2px solid #ccc; margin: 3px 0; "></div>
                    <p class="textLeft font18 fontBold" style="margin-left: 15px; ">{{popTitle}}</p>
                </div>
            </div>
            <div style="width: 100%; height: calc(100% - 160px); float: left;padding-top: 0"  class="commonChanPopPadding" ><!-- box-shadow: inset 0 0 4px 4px #00000010;padding: 10px 20px; -->
                <div v-html="'\'' + this.$changeText(GE_USER.userDispMtext) + '\' 님 안녕하세요!<br>' + propPopMessage" style=" box-shadow: inset 0 0 4px 4px #00000010;padding: 10px 20px; border-radius: 10px; float: left; width: 100%;" class="font16 textLeft fontBold commonBlack">
                </div>
                <div style="width: 100%; display: flex;     align-items: center; padding-top: 20px;">
                    <div class="font16 fontBold commonColor" style="width: 80px;padding: 0 5px; align-items: center; justify-content: flex-start; display: flex;">
                        활동할 <br> 멤버유형
                    </div>
                    <div style="width: calc(100% - 135px); float: left; display: flex; flex-direction: column;">
                        <div style="width: 100%; min-height: 30px;" v-for="(member, index) in mMemberTypeList" :key="index">
                            <input @click="selectMemberObj = member" class="fl" type="radio" name="memberSelectRadio" style="margin-top: 8px; margin-right: 5px;" :id="'member'+member.memberTypeKey">
                            <label class="fl fontBold font16" style="line-height: 30px;" :for="'member'+member.memberTypeKey">{{this.$changeText(member.nameMtext)}}</label>
                        </div>
                    </div>
                    <div @click="openReqPop" style="height: 30px; padding: 0px 10px; line-height: 30px; border-radius: 5px; background: #5F61BD; color: #fff; text-align: center;">
                        신청
                    </div>
                </div>
            </div>

            <div v-if="memberPopYn" style="width: 100%; height: 60px; float: left; display: flex; justify-content: center;" class="commonChanPopPadding">
                <gBtnSmall @click="closeXPop" :btnTitle="'다음에 하기'" btnThema="light" />
            </div>
            <div v-else style="width: 100%; height: 60px; float: left; display: flex; justify-content: center;" class="commonChanPopPadding">
                <gBtnSmall v-for="(value, index) in btnList" :style="index !== 0? 'margin-left: 0.5rem;': ''" :key="index"  :btnTitle="value.title" :btnThema="value.thema" @click="this.$emit(value.emitText)"/>
            </div>
        </div>
    </div>
</template>

<script>
import repMemberPop from './D_reqMemberPop.vue'
export default {
  components: {
    repMemberPop
  },
  props: {
    propTeamKey: {},
    // popTitle: {}
    // btnList: {}
    propPopMessage: {}
    // popSize: {}
  },
  created () {
    console.log(this.propPopMessage)
    if (this.memberPopYn) {
      this.popSize = 'L'
    }
    if (this.popSize === 'L') {
      this.popupStyle = 'height: 50%; max-height: 400px; margin-top: 30%;'
    }
    if (this.propTeamKey) {
      this.getChanDetail(this.propTeamKey)
      this.getMemberTypeList()
    }
  },
  methods: {
    getChanDetail (propTeamKey) {
      this.$addChanList(propTeamKey)
    },
    async getMemberTypeList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.sampleYn = true
      var memberTypeList = await this.$commonAxiosFunction({
        url: 'service/tp.getMemberTypeList',
        param: param
      })
      console.log(memberTypeList)
      if (memberTypeList.data.result) {
        this.mMemberTypeList = memberTypeList.data.memberTypeList
      }
      // eslint-disable-next-line no-debugger
      debugger
    },
    openReqPop () {
      if (!this.selectMemberObj) {
        alert('멤버 유형을 선택해주세요!')
        return
      }
      this.reqPopShowYn = true
    },
    closeReqMemPop (pCloseYn) {
      this.reqPopShowYn = false
      if (pCloseYn) {
        this.closeXPop(true)
      }
    },
    closeXPop (refreshYn) {
      this.$showChanCommonPop(false)
      this.$emit('closeXPop', refreshYn)
    }
  },
  computed: {
    CHANNEL_DETAIL () {
      // eslint-disable-next-line no-debugger
      debugger
      var detail = this.$getDetail('TEAM', this.propTeamKey)
      if (detail && detail.length > 0) {
        console.log('CHANNEL_DETAIL')
        console.log(detail[0])
        return detail[0]
      } else {
        if (this.CHANNEL_DETAIL) {
          console.log('CHANNEL_DETAIL')
          console.log(this.CHANNEL_DETAIL)
          return this.CHANNEL_DETAIL
        } else {
          console.log('CHANNEL_DETAIL')
          console.log('null')
          return null
        }
      }
    },
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  },
  data () {
    return {
      // propTeamKey: 556,
      popSize: 'L',
      memberPopYn: true,
      popTitle: '멤버신청 필요',
      // propPopMessage: '회원님은 현재 멤버신청이 되어있지 않아 구독자로 활동하고있습니다!',
      btnList: [{ title: '승인', thema: 'deep', emitText: 'ok' }, { title: '거절', thema: 'light', emitText: 'no' }],
      popupStyle: 'height: 40%; max-height: 300px; margin-top: 50%;',
      selectMemberObj: null,
      reqPopShowYn: false,
      mMemberTypeList: []
    }
  }
}
</script>

<style scoped>
.commonChanPopPadding {padding: 10px 20px;}
</style>
