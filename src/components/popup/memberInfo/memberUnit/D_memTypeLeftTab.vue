<template>
  <div class="leftTabBase fl pSide-1" style='background: #eeeeee50;' >
    <div class="w-100P mtop-05" style="position: relative;">
      <!-- <p class=' fr font16 commonBlack textRight' style="" @click='closePop' >{{tempBackImg}}</p> -->
      <div class="fr textLeft font12 commonBlack tempLeftTabBtn fontBold" style="margin-top: 3px;" @click="closePop">{{tempBackImg}}</div>
    </div>

    <div class="fl w-100P  " style="position: relative; ">
      <div v-for="(list, index) in leftTabTitle" :key="index" class="fl w-100P" style="padding: 10px 0;">
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
    memberTypeList: {}
  },
  created () {
    this.readyFunc()
    // 추후 back버튼을 위해 history관리가 들어와야함
  },
  data () {
    return {
      tempBackImg: '<<',
      leftShowYn: false,
      leftTabTitle: {},
      addInputPopYn: false
    }
  },
  methods: {
    readyFunc () {
      this.leftTabTitle = JSON.parse(JSON.stringify(this.memberTypeList))
      this.changeTab(this.leftTabTitle[0], 0)
      console.log(this.leftTabTitle)
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
      // this.leftTabTitle.findIndex(item => data.)
      if (idx === undefined || idx === null || idx === '') idx = 0
      for (let i = 0; i < this.leftTabTitle.length; i++) {
        this.leftTabTitle[i].selectedYn = false
        if (data.mFormKey === this.leftTabTitle[i].mFormKey) {
          this.leftTabTitle[i].selectedYn = true
        }
      }
      this.$emit('changeTab', idx)
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
