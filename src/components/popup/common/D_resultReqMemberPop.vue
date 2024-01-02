<template>
  <div v-if="propReqData" id="resultReqMemberPop" style="width: 90%; min-height: 300px; max-height: 800px; position: absolute; z-index: 110; top: 18%; left: 5%; background: #FFF; box-shadow: 0 0 4px 4px #00000025; border-radius: 0.8rem; ">
    <div style="width: 100%; position: relative; height: 50px; border-bottom: 1px solid #6768A7; float: left; padding: 10px 20px;">
        <p class="font20 fontBold commonColor textLeft">멤버신청 결과</p>
    </div>
    <div  style="width: 100%; height: 200px; overflow: hidden auto; padding: 10px 20px; float: left;">
        <p class="textLeft font16 commonColor fontBold" v-html="mReqResultMsg"></p>
        <!-- <p class="font16 textLeft fontBold commonColor mtop-05">*신청정보<br></p> -->
        <p class="font15 fontBold textLeft mleft-1 commonBlack">[{{this.$changeText(this.propReqData.memberType.nameMtext)}}] 멤버 ({{memberItemText}})로 신청되었습니다!</p>
        <!-- <p v-if="this.propReqData.memberYn" class="font16 fontBold mtop-1 commonColor textLeft ">승인까지 시간이 소요될 수 있습니다<br>감사합니다!</p> -->
    </div>
    <div style="width: 100%; display: flex; justify-content: center; height: 60px; float: left;">
        <gBtnSmall btnTitle="확인"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    propReqData: {}
  },
  data: function () {
    return {
      mReqResultMsg: null,
      mReqMemberDataMsg: '',
      memberItemText: ''
    }
  },
  created () {
    console.log(this.propReqData)
    if (this.propReqData) {
      if (this.propReqData.memberYn) {
        this.mReqResultMsg = this.$changeText(this.GE_USER.userDispMtext) + '님, '
        this.mReqResultMsg += '성공적으로 멤버 신청이 되었습니다!<br>'
        if (this.propReqData.memberType.initData && this.propReqData.memberType.initData.length) {
          /* this.mReqResultMsg += '<br><p class="textLeft commonColor font16 fontBold">부가정보</p>' */
          for (var i = 0; i < this.propReqData.memberType.initData.length; i++) {
            this.memberItemText += (i !== 0 ? '/' : '')
            this.memberItemText += this.$changeText(this.propReqData.memberType.initData[i].itemNameMtext) + ': ' + this.propReqData.memberType.initData[i].value
          }
        }
      } else {
        this.mReqResultMsg = '다음에 하기를 선택하셨네요!<br>그러나 언제든지 멤버신청을 통해 멤버로 등업할 수 있습니다!'
      }
    }
  },
  methods: {
    convertSelectListStr (str) {
      var returnList = null
      returnList = str.split('$#$')
      return returnList
    },
    async getMemberTypeItemList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.memberTypeKey = this.propMemberData.memberTypeKey
      var memberTypeItemList = await this.$commonAxiosFunction({
        url: 'https://mo.d-alim.com:9443/service/tp.getMemberTypeItemList',
        param: param
      })
      console.log(memberTypeItemList)
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
            url: 'https://mo.d-alim.com:9443/service/tp.saveFollower',
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
      // eslint-disable-next-line no-new-object
      var param = new Object()
      var ansList = []
      var ansObj = {}
      console.log(this.memberTypeItemList)
      for (var i = 0; i < this.memberTypeItemList.length; i++) {
        ansObj = {}
        if (this.memberTypeItemList[i].value === undefined || this.memberTypeItemList[i].value === null || this.memberTypeItemList[i].value === '') {
          this.$showToastPop(this.$changeText(this.memberTypeItemList[i].itemNameMtext) + '이(가) 입력되지 않았습니다!')
          return
        }
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
      console.log(param.memberInfoList)
      var memberResult = await this.$commonAxiosFunction({
        url: 'https://mo.d-alim.com:9443/service/tp.saveFollowerMemberInfo',
        param: param
      })
      console.log(memberResult)
      if (memberResult.data.result) {
        this.closeXPop(true)
      }
      console.log(memberResult)
      // eslint-disable-next-line no-debugger
      debugger
      // this.closeXPop()
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
    }
  }
}
</script>

<style scoped>

</style>
