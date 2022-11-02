<template>
  <div style="width: 90%; height: 60%; max-height: 800px; position: absolute; z-index: 100; top: 15%; left: 5%; background: #FFF; box-shadow: 0 0 4px 4px #00000025; border-radius: 0.8rem;">
    <div style="width: 100%; position: relative; height: 50px; border-bottom: 1px solid #6768A7; float: left; padding: 10px 20px;">
        <p class="font20 fontBold textLeft">[{{memberData.memberNameMtext}}] 멤버신청</p>
    </div>
    <div style="width: 100%; height: calc(100% - 110px); padding: 10px 20px; float: left;">
        <div style="width: 100%; height: 60px; float: left;">
            <p class="font14 w-100P grayBlack fontBold fl textLeft" style="line-height: 30px;" >{{memberData.certiUserYn? '실명 인증이 필요한 유형입니다.': '실명인증이 필요하지 않은 유형입니다.'}}</p>
            <p class="font16 fontBold fl textLeft w-100P" v-if="GE_USER.certiYn">실명인증회원</p>
            <p class="font16 fontBold fl textLeft" style="line-height: 30px;" v-else>실명 인증이 필요합니다.</p>
            <gBtnSmall v-if="!GE_USER.certiYn" btnTitle="인증하기"/>
        </div>
        <div style="width: 100%; height: 1px; border-bottom: 1px solid #ccc; margin-top: 10px; float: left;" ></div>
        <div style="width: 100%; height: calc(100% - 60px); float: left; ">
            <p class="font16 fontBold textLeft mbottom-05 mtop-05">신청서 작성</p>
            <div style="width: 100%; min-height: 50px; float: left; padding: 10px; margin-bottom: 10px; display: flex;" :id="'question'+ans.qKey" v-for="(ans, index) in memberData.qList" :key="index">
                <p class="font16 textLeft fl grayBlack fontBold" style="width: 80px;">{{ans.qTitle}}</p>
                <div style="width: calc(100% - 80px);" v-if="ans.ansType === 'S'">
                    <select v-model="ans.value" style="width: 100%; height: 30px;" >
                        <option hidden selected>선택하세요</option>
                        <option style="whith: 100%; height: 30px;" class="font16" :value="sub.selectKey" v-for="(sub, subIndex) in ans.selectList" :key="subIndex">{{sub.selectTitle}}</option>
                    </select>
                </div>
                <div style="width: calc(100% - 80px);" v-else-if="ans.ansType === 'W'">
                    <input :type="ans.wirteOnlyNum?  'number': 'text'" v-model="ans.value" :max="ans.writeMaxLength" :maxLength="ans.writeMaxLength" :placeholder="ans.qTitle + '를(을) 입력하세요'" style="width: 100%; height: 30px; padding: 0 10px;" class="font16 textLeft" name="" id="">
                </div>
            </div>
        </div>
        <div style="width: 100%; justify-content: center; display: flex; height: 60px; float: left;">
            <gBtnSmall btnTitle="신청" @click="sendReq" style="margin-right: 0.5rem;"/>
            <gBtnSmall btnThema="light" @click="closeXPop(false)" btnTitle="닫기"/>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    memberData: {}
  },
  data: function () {
    return {
      reqData: null
    }
  },
  created () {
    this.reqData = this.memberData
  },
  methods: {
    closeXPop (pCloseYn) {
      this.$emit('closeXPop', pCloseYn)
    },
    sendReq () {
      for (var i = 0; i < this.reqData.qList.length; i++) {
        if (this.reqData.qList[i].value === undefined || this.reqData.qList[i].value === null || this.reqData.qList[i].value === '') {
          alert(this.reqData.qList[i].qTitle + '이(가) 입력되지 않았습니다!')
          return
        }
      }
      this.closeXPop()
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

</style>
