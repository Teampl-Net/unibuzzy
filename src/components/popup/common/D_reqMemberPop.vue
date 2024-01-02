<template>
  <div v-if="propMemberData" class="dReqMemberPopWrap">
    <div class="dReqMemberPopHeader">
        <p class="font20 fontBold commonColor textLeft">[{{this.$changeText(propMemberData.nameMtext)}}] 멤버신청</p>
    </div>
    <div class="dReqMemberPopBody">
        <div v-if="propMemberData.certiYn === true" class="dReqMemberCertiTrueArea">
            <p class="font16 w-100P grayBlack fontBold fl textLeft" style="line-height: 30px;" >{{propMemberData.certiYn === true? '실명 인증이 필요한 유형': '실명인증이 필요하지 않은 유형입니다.'}}</p>
            <p class="font14 fontBold commonColor fl textLeft w-100P" v-if="propMemberData.certiYn === true && GE_USER.certiDate">{{this.$changeText(GE_USER.userDispMtext)}}님은 실명인증완료된 회원입니다.</p>
            <p class="font16 fontBold fl textLeft" style="line-height: 30px;" v-else-if="propMemberData.certiYn === true">실명 인증이 필요합니다.</p>
            <gBtnSmall v-if="propMemberData.certiYn === true && !GE_USER.certiDate" @click="gCertiPopShowYn = true " btnTitle="인증하기"/>
        </div>
        <div v-if="propMemberData.certiYn === true" style="width: 100%; height: 1px; border-bottom: 1px solid #ccc; margin-top: 10px; float: left;" ></div>
        <div style="width: 100%; height: calc(100% - 35px); float: left; overflow: auto; margin-bottom: 20px;">
            <div style="width: 100%; min-height: 50px; float: left; padding: 10px; margin-bottom: 10px; display: flex; flex-direction: column;" :id="'question'+typeItem.itemKey" v-for="(typeItem, index) in memberTypeItemList" :key="index">
                <p class="font16 textLeft fl grayBlack fontBold" style="width: 100%;"> {{this.$changeText(typeItem.itemNameMtext)}}</p>
                <div style="width: calc(100%);" v-if="typeItem.itemType === 'F' || typeItem.itemType === 'L'">
                    <select v-model="typeItem.value" style="width: 100%; height: 30px;">
                        <option :value="undefined" hidden selected>선택하세요</option>
                        <option style="whith: 100%; height: 30px;" class="font16" :value="sub" v-for="(sub, subIndex) in convertSelectListStr(typeItem.optListStr)" :key="subIndex">{{sub}}</option>
                    </select>
                </div>
                <div style="width: calc(100%);" v-else-if="typeItem.itemType === 'T'">
                    <input :type="typeItem.numberYn?  'number': 'text'" v-model="typeItem.value" :max="typeItem.maxLen" :maxLength="typeItem.maxLen" :placeholder="this.$changeText(typeItem.itemNameMtext) + '를(을) 입력하세요'" style="width: 100%; height: 30px; padding: 0 10px;" class="font16 textLeft" name="" id="">
                </div>
            </div>
        </div>
        <gCertiPop :pPopText="'실명인증을 하면 멤버신청이 가능해요!'" @goSavePhonePop="goSavePhonePop" v-if="gCertiPopShowYn" @no='gCertiPopShowYn = false'  />
        <div class="dReqMemberPopFooter">
            <gBtnSmall btnTitle="신청" @click="sendReq" style="margin-right: 0.5rem;"/>
            <gBtnSmall btnThema="light" @click="closeXPop(false)" btnTitle="닫기"/>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propMemberData: {},
    propTeamDetail: {}
  },
  data: function () {
    return {
      memberTypeItemList: null,
      gCertiPopShowYn: false
    }
  },
  created () {
    // this.reqData = this.propMemberData
    if (this.propMemberData.initData) {
      this.memberTypeItemList = this.propMemberData.initData
      /* var this_ = this
      if (this.memberTypeItemList.length === 0) {
        // eslint-disable-next-line no-new-object
        var typeParam = new Object()
        if (this.CHANNEL_DETAIL && this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey) {
          typeParam.followerKey = this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey
        }
        typeParam.memberTypeKey = this.propMemberData.memberTypeKey
        this.$commonAxiosFunction({
<<<<<<< .mine
          url: '/sUniB/tp.saveFollower',
=======
          url: '/sUniB/tp.saveFollower',
>>>>>>> .r1564
          param: { follower: typeParam }
        }).then(() => {
          this_.closeXPop(true)
        })
      } */
    } else {
      this.getMemberTypeItemList()
    }
  },
  methods: {
    goSavePhonePop () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'changePhone'
      this.gCertiPopShowYn = false
      this.$emit('openPop', param)
    },
    convertSelectListStr (str) {
      var returnList = null
      returnList = str.split('$#$')
      returnList = returnList.splice(1)
      return returnList
    },
    async getMemberTypeItemList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.memberTypeKey = this.propMemberData.memberTypeKey
      var memberTypeItemList = await this.$commonAxiosFunction({
        url: '/sUniB/tp.getMemberTypeItemList',
        param: param
      })
      if (memberTypeItemList.data.result) {
        this.memberTypeItemList = memberTypeItemList.data.memberTypeItemList
        if (this.memberTypeItemList.length === 0) {
          // eslint-disable-next-line no-new-object
          var typeParam = new Object()
          if (this.CHANNEL_DETAIL && this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey) {
            typeParam.followerKey = this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey
          }
          typeParam.memberTypeKey = this.propMemberData.memberTypeKey
          await this.$commonAxiosFunction({
            url: '/sUniB/tp.saveFollower',
            param: { follower: typeParam }
          })
          this.closeXPop(true)
          return
        }
      }
      // eslint-disable-next-line no-debugger
      debugger
    },
    closeXPop (pCloseYn) {
      this.$emit('closeXPop', pCloseYn)
    },
    async sendReq () {
      if (this.propMemberData.certiYn === true && !this.GE_USER.certiDate) {
        this.gCertiPopShowYn = true
        // this.$showToastPop('먼저 실명인증을 해주세요.')
        return
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      var ansList = []
      var ansObj = {}
      for (var i = 0; i < this.memberTypeItemList.length; i++) {
        ansObj = {}
        if (this.memberTypeItemList[i].value === undefined || this.memberTypeItemList[i].value === null || this.memberTypeItemList[i].value === '') {
          this.$showToastPop(this.$changeText(this.memberTypeItemList[i].itemNameMtext) + '이(가) 입력되지 않았습니다!')
          return
        }
        ansObj.itemNameMtext = this.memberTypeItemList[i].itemNameMtext
        ansObj.itemVal = this.memberTypeItemList[i].value
        ansObj.memberTypeItemKey = this.memberTypeItemList[i].itemKey
        ansObj.memberTypeKey = this.memberTypeItemList[i].memberTypeKey
        ansObj.userKey = this.GE_USER.userKey
        ansObj.teamKey = this.propTeamDetail.teamKey
        if (this.CHANNEL_DETAIL && this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey) {
          ansObj.followerKey = this.CHANNEL_DETAIL.D_CHAN_AUTH.followerKey
        }
        ansList.push(ansObj)
      }
      param.memberInfoList = ansList
      var memberResult = await this.$commonAxiosFunction({
        url: '/sUniB/tp.saveFollowerMemberInfo',
        param: param
      })
      if (memberResult.data.result) {
        this.$emit('saveMemberData', memberResult.data.memberInfo)
      }
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    },
    CHANNEL_DETAIL () {
      // eslint-disable-next-line no-debugger
      debugger
      var detail = this.$getDetail('TEAM', this.propTeamDetail.teamKey)
      if (detail && detail.length > 0) {
        return detail[0]
      } else {
        if (this.CHANNEL_DETAIL) {
          return this.CHANNEL_DETAIL
        } else {
          return null
        }
      }
    }
  }
}
</script>

<style scoped>
.dReqMemberPopWrap {
    width: 90%; height: 60%; max-height: 800px; position: absolute; z-index: 10; top: 15%; left: 5%; background: #FFF; box-shadow: 0 0 4px 4px #00000025; border-radius: 0.8rem; min-height: 500px;
}
.dReqMemberPopHeader {
    width: 100%; position: relative; height: 50px; border-bottom: 1px solid #6768A7; float: left; padding: 10px 20px;
}
.dReqMemberPopBody {
    width: 100%; height: calc(100% - 110px); padding: 10px 20px; float: left;
}
.dReqMemberPopFooter {
    width: 100%; justify-content: center; display: flex; height: 60px; float: left;
}
.dReqMemberCertiTrueArea {
    width: 100%; min-height: 30px; float: left;
}
</style>
