<template>
    <div class="manageStateCompo" :ref="'stateCodeFor' + this.contentsKey" v-if="DISP_CODE_VALUE">
        <div class="font14">{{$changeText(DISP_CODE_VALUE.codeNameMtext)}}</div>
        {{currentWorker}}
    </div>
</template>
<script>
export default {
  data () {
    return {
      nullObj: { codeKey: 0, codeNameMtext: '상태없음' },
      selectedCodeObj: { codeKey: null, codeNameMtext: null }
    }
  },
  props: {
    codeList: {},
    currentWorker: {},
    currentCodeKey: {},
    contentsKey: {}
  },
  computed: {
    DISP_CODE_VALUE () {
      if (!this.codeList) return null
      if (!this.currentCodeKey) {
        return this.nullObj
      }
      var idx = this.codeList.findIndex((item) => item.codeKey === this.currentCodeKey)
      if (idx === -1) return null
      return this.codeList[idx]
    }
  },
  watch: {
    DISP_CODE_VALUE: {
      immediate: true,
      handler (value, old) {
        if (value) {
          this.selectedCodeObj = value
        }
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.selectedCode {
  border: 2px solid #5F61BD !important;
  margin: 5px 5px !important;
}
.activeInput {
  background: #cccccc1c;
}
.manageStateCompo {
  padding: 0 10px;
  border-radius: 8px;
  background: #bfbfda;
  color: #fff;
  text-align: left;
}
</style>
