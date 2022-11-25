<template>
  <div class="leftTabBase fl " style='background: #eeeeee50;' >
    <div class="w-100P pSide-1" style="position: relative; min-height: 30px; padding: 0 20px; padding-right: 0;     padding-top: 1.5rem;">
      <p class="fl textLeft font18 fontBold">멤버 유형</p>
      <!-- <p class=' fr font16 commonBlack textRight' style="" @click='closePop' >{{tempBackImg}}</p> -->
      <div class="fr textLeft font12 commonBlack tempLeftTabBtn fontBold" style="margin-top: 3px; margin-right: 10px;" @click="closePop">{{tempBackImg}}</div>
    </div>

    <templine class="fl" style="border-bottom:1px solid #ccc; width:100%; height:1px;" />

    <div class="fl w-100P  " style="position: relative; padding: 0 20px; padding-right: 0;">
      <div v-for="(list, index) in mMemberTypeList" :key="index" class="fl w-100P" style="padding: 10px 0;">
        <cLeftTab :propData="list" @cardEmit='cardEmit' :compoIdx='index' />
      </div>
      <gBtnSmall :btnTitle="'추가'" @click="addInputPopYn = true" style="position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%);"/>

      <gInputPop v-if="addInputPopYn === true" class="" style="bottom: -180px;" title='멤버추가' type='one' @save='addMemberType' @goNo='addInputPopYn = false' />
    </div>
  </div>
</template>
<script>
import cLeftTab from './cardUnit/D_cTabCard.vue'
export default {
  components: {
    cLeftTab
  },
  props: {
    propMemberTypeList: {}
  },
  created () {
    console.log(this.propMemberTypeList)
    this.readyFunc()
    // 추후 back버튼을 위해 history관리가 들어와야함
  },
  data () {
    return {
      mMemberTypeList: [],
      tempBackImg: '<<',
      leftShowYn: false,
      addInputPopYn: false
    }
  },
  watch: {
    propMemberTypeList: {
      handler (value, old) {
        if (!value) return
        this.mMemberTypeList = value
        console.log(this.mMemberTypeList)
      }
    }
  },
  updated () {
    this.mMemberTypeList = this.propMemberTypeList
  },
  methods: {
    readyFunc () {
      this.mMemberTypeList = this.propMemberTypeList
      this.changeTab(this.mMemberTypeList[0], 0)
      console.log(this.mMemberTypeList)
    },
    addMemberType (data) {
      console.log(data)
      this.$emit('addMemberType', data)
    },
    cardEmit (param) {
      console.log(param)
      var type = param.targetType
      var data = param.data
      var idx = param.index
      console.log(data)
      if (type === 'click') {
        this.changeTab(data, idx)
      }
    },
    changeTab (data, idx) {
      if (idx === undefined || idx === null || idx === '') idx = 0
      for (let i = 0; i < this.mMemberTypeList.length; i++) {
        this.mMemberTypeList[i].selectedYn = false
        if (data.memberTypeKey === this.mMemberTypeList[i].memberTypeKey) {
          this.mMemberTypeList[i].selectedYn = true
        }
      }
      this.$emit('changeTab', data)
    },
    closePop () {
    // 추후 back버튼을 위해 history관리가 들어와야함
      this.$emit('closePop')
    }
  }
}
</script>
<style>
.leftTabBase{
  width:70% ;
  max-width: 500px;
  /* position: absolute; z-index: 999; */
  height: 100%;
  top: 50px;
  left: 0;
  background:#fff;
  border-right: 1px solid #ccc;
  /* animation: showUp ;
  animation-duration:2s;
  animation-iteration-count:3;
  animation-timing-function:ease-in; */
}
</style>
