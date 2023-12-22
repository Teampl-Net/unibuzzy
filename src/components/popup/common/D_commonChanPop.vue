<i18n>
  {
    "ko" : {
      "COMM_GREETING" :"님 안녕하세요!",
      "COMM_ACTIVE_MEMBER_TYPE" : "활동할 멤버 유형",
      "COMM_BTN_APPLY" :"신청",
      "COMM_BTN_NEXT" : "다음에 하기",
      "COMM_SELECT_MEMBERTYPE": "멤버 유형을 선택해주세요!",
      "COMM_NEED_MEMBER_APPLY" : "멤버 신청 필요",
      "COMM_OK" : "승인",
      "COMM_NO" : "거절",
    },
    "en" : {
      "COMM_GREETING" :"HI!",
      "COMM_ACTIVE_MEMBER_TYPE" : "Member type",
      "COMM_BTN_APPLY" :"Apply",
      "COMM_BTN_NEXT" : "Next time",
      "COMM_SELECT_MEMBERTYPE": "Select member type!",
      "COMM_NEED_MEMBER_APPLY" : "Need to apply to be a member",
      "COMM_OK" : "OK",
      "COMM_NO" : "NO",
    }
  }
</i18n>
<template>
    <div @click="noMemberClose" style="position: absolute; width: 100%; height: 100%; background: #00000050; z-index: 9"></div>
    <div v-if="reqPopShowYn" @click="closeReqMemPop" style="position: absolute; width: 100%; height: 100%; z-index: 10; background: #00000040;"></div>
    <repMemberPop  @openPop="openPop"  @saveMemberData="setSaveMemberData" v-if="reqPopShowYn" @closeXPop="closeReqMemPop" :propTeamDetail="this.CHANNEL_DETAIL" :propMemberData="selectMemberObj"/>
    <resultMemberPop :propReqData="resultReqData" v-if="resultPopShowYn"/>
    <div v-if="CHANNEL_DETAIL"  :style="popupStyle" style="width: calc(100% - 40px); position: absolute; z-index: 9;  background: #FFF; overflow: auto; left: 20px; box-shadow: 0 0 4px 4px #00000025; border-radius: 0.8rem; min-height: 500px;">
        <div style="width: 100%; height: 100px; float: left; display: flex; align-items: center; padding-bottom: 0;" class="commonChanPopPadding" >
        <!-- box-shadow: 0 4px 10px -4px #ccc -->
            <div :style="'background-image: url(' + CHANNEL_DETAIL.logoDomainPath + CHANNEL_DETAIL.logoPathMtext + '); background-position: center;  background-size: cover; background-repeat: no-repeat'" style="width: 60px; height: 60px; display: flex; justify-content: center; border-radius: 100%; border: 2px solid #5F61BD ; center; align-items: center;"></div>
            <div style="width: calc(100% - 60px);height: 100%; display: flex; flex-direction: column; justify-content: center;">
                <p class="textLeft font18 fontBold commonColor " style="margin-left: 15px; line-height: 20px; ">{{this.$changeText(CHANNEL_DETAIL.nameMtext)}}</p>
                <div style="width: 100%; float: left; height: 1px; border-bottom: 2px solid #5F61BD ; margin: 3px 0; "></div>
                <p class="textLeft font18 fontBold commonColor " style="margin-left: 15px; ">{{popTitle}}</p>
            </div>
        </div>
        <div style="width: 100%; height: calc(100% - 160px); float: left;padding-top: 0"  class="commonChanPopPadding" ><!-- box-shadow: inset 0 0 4px 4px #00000010;padding: 10px 20px; -->
            <div style=" box-shadow: inset 0 0 4px 4px #00000010;padding: 10px 20px; border-radius: 10px; float: left; width: 100%;" class="font14 textLeft fontBold commonBlack">
            {{ `\ ${this.$changeText(GE_USER.userDispMtext)} \ ${$t('COMM_GREETING')}` + propPopMessage }}
            </div>
            <div style="width: 100%; display: flex;   align-items: center; padding-top: 20px;">
                <div style="width: calc(100%); float: left;  display: flex; flex-direction: column;">
                    <div class="font16 fontBold commonColor" style="width: 100%; margin-bottom: 10px; align-items: center; justify-content: space-between; padding-right: 10px; display: flex;">
                        {{$t('COMM_ACTIVE_MEMBER_TYPE')}}
                        <gBtnSmall  @click="openReqPop" class="fr" btnTitle="신청"/>
                    </div>
                    <div style="width: 100%; min-height: 30px; padding-left: 10px;" v-for="(member, index) in mMemberTypeList" :key="index">
                        <input @click="selectMemberObj = member" :checked="index === 0? true:false" class="fl" type="radio" name="memberSelectRadio" style="margin-top: 8px; margin-right: 5px;" :id="'member'+member.memberTypeKey">
                        <label class="fl fontBold font16" style="line-height: 30px;" :for="'member'+member.memberTypeKey">{{this.$changeText(member.nameMtext)}}</label>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="memberPopYn" style="width: 100%; height: 60px; float: left; display: flex; justify-content: center;" class="commonChanPopPadding">
            <gBtnSmall @click="noMemberClose" :btnTitle="'다음에 하기'" btnThema="light" />
        </div>
        <div v-else style="width: 100%; height: 60px; float: left; display: flex; justify-content: center;" class="commonChanPopPadding">
            <gBtnSmall v-for="(value, index) in btnList" :style="index !== 0? 'margin-left: 0.5rem;': ''" :key="index"  :btnTitle="value.title" :btnThema="value.thema" @click="this.$emit(value.emitText)"/>
        </div>
    </div>
</template>

<script>
import repMemberPop from './D_reqMemberPop.vue'
import resultMemberPop from './D_resultReqMemberPop.vue'
export default {
  components: {
    repMemberPop,
    resultMemberPop
  },
  props: {
    propTeamKey: {},
    propCateItemKey: {},
    propPopMessage: {}
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
    this.$addHistoryStack('gChannelConfirmPop')
  },
  methods: {
    openPop (param) {
      console.log(param)
      this.$emit('openPop', param)
    },
    setSaveMemberData (data) {
      this.resultReqData.memberYn = true
      this.resultReqData.memberType = this.selectMemberObj
      this.resultReqData.memberTypeItem = data
      console.log(data)
      this.closeXPop()
    },
    getChanDetail (propTeamKey) {
      this.$addChanList(propTeamKey)
    },
    async getMemberTypeList () {
      var param = {}
      param.teamKey = this.propTeamKey
      // param.cateItemKey = this.propCateItemKey
      var memberTypeList = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMemberTypeList',
        param: param
      })
      console.log(memberTypeList)
      if (memberTypeList.data.result) {
        this.mMemberTypeList = memberTypeList.data.memberTypeList
        if (this.mMemberTypeList.length > 0) {
          this.selectMemberObj = this.mMemberTypeList[0]
        }
      }
    },
    async openReqPop () {
      // eslint-disable-next-line no-debugger
      debugger
      if (!this.selectMemberObj) {
        this.$showToastPop('멤버 유형을 선택해주세요!')
        return
      }
      var result = await this.getMemberTypeItemList()
      if (result === true) this.reqPopShowYn = true
    },
    async getMemberTypeItemList () {
      // eslint-disable-next-line no-debugger
      debugger
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.memberTypeKey = this.selectMemberObj.memberTypeKey
      var memberTypeItemList = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMemberTypeItemList',
        param: param
      })
      console.log('--------------------------')
      console.log(memberTypeItemList)
      if (memberTypeItemList.data.result) {
        var this_ = this
        if (memberTypeItemList.data.memberTypeItemList.length === 0) {
        // eslint-disable-next-line no-new-object
          var typeParam = new Object()
          if (this.CHANNEL_DETAIL && this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey) {
            typeParam.followerKey = this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey
          }
          typeParam.memberTypeKey = this.selectMemberObj.memberTypeKey
          // eslint-disable-next-line no-debugger
          debugger
          this.$commonAxiosFunction({
            url: '/sUniB/tp.saveFollower',
            param: { follower: typeParam }
          }).then(() => {
            // eslint-disable-next-line no-debugger
            debugger
            this_.resultReqData.memberYn = true
            this_.resultReqData.memberType = this_.selectMemberObj
            // this.resultReqData.memberTypeItem = data
            this_.closeXPop()
            return false
          })
        } else {
          this.selectMemberObj.initData = memberTypeItemList.data.memberTypeItemList
          return true
        }
        // this.memberTypeItemList = memberTypeItemList.data.memberTypeItemList
      } else {
        this.$showToastPop(this.$t('COMMON_MSG_FAILED'))
        return false
      }
    },
    closeReqMemPop (pCloseYn) {
      this.reqPopShowYn = false
      if (pCloseYn === true) {
        this.closeXPop(true)
      }
    },
    noMemberClose () {
      this.resultReqData.memberYn = false
      this.closeXPop()
    },
    closeXPop (refreshYn) {
      this.resultPopShowYn = true
      this.$removeHistoryStack()
      this.$showChanCommonPop(false)
      console.log(this.resultReqData)
      this.$emit('closeXPop', this.resultReqData)
    }
  },
  computed: {
    CHANNEL_DETAIL () {
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
    },
    pageUpdate () {
      return this.$store.getters['D_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['D_HISTORY/hStack']
    }
  },
  watch: {
    pageUpdate () {
      if (this.history[this.history.length - 1] === 'gChannelConfirmPop') {
        this.closeXPop()
      }
    }
  },
  data () {
    return {
      popSize: 'L',
      memberPopYn: true,
      popTitle: this.$t('COMM_NEED_MEMBER_APPLY'),
      btnList: [{ title: this.$t('COMM_OK'), thema: 'deep', emitText: 'ok' }, { title: this.$t('COMM_NO'), thema: 'light', emitText: 'no' }],
      popupStyle: 'height: 40%; max-height: 300px; margin-top: 50%;',
      selectMemberObj: null,
      reqPopShowYn: false,
      mMemberTypeList: [],
      resultReqData: {},
      resultPopShowYn: false
    }
  }
}
</script>

<style scoped>
.commonChanPopPadding {padding: 10px 20px;}
</style>
