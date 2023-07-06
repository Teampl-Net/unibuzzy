<template>
  <input :disabled="pDisabledYn" class="UBCommonInputStyle" v-if="pInputType === 'N'" v-model="mInputObj.val" type="number" name="" id="">
  <input :disabled="pDisabledYn" :readonly="pReadonly" :placeholder="pPlaceHolder" class="UBCommonInputStyle" v-else-if="pInputType === 'I'" v-model="mInputObj.val" type="text" name="" id="">
  <input :disabled="pDisabledYn" class="UBCommonInputStyle" v-else-if="pInputType === 'P'" v-model="mInputObj.val" type="password" name="" id="">
  <select :disabled="pDisabledYn" class="UBCommonInputStyle" v-else-if="pInputType === 'S'" v-model="mInputObj.val" name="" id="">
    <option v-for="(opt, index) in pInputObj.selectValueList" :key="index" :value="opt.value">{{ opt.title }}</option>
  </select>
  <textarea @input="resize" ref="commonTextArea" :placeholder="pPlaceHolder" class="UBCommonInputStyle textarea" v-else-if="pInputType === 'T'" v-model="mInputObj.val" name="" id="" cols="30" rows="10"></textarea>
</template>
<script>
export default {
  props: {
    pInputObj: {},
    pInputType: {},
    pInputIndex: {},
    pPlaceHolder: {},
    pDisabledYn: Boolean,
    pReadonly: {}
  },
  mounted () {
    if (this.pInputType === 'T') {
      const textref = this.$refs.commonTextArea
      textref.style.height = '1px'
      textref.style.height = textref.scrollHeight + 'px'
    }
  },
  data () {
    return {
      mInputObj: {}
    }
  },
  methods: {
    resize () {
      if (this.pInputType === 'T') {
        const textref = this.$refs.commonTextArea
        textref.style.height = '1px'
        textref.style.height = textref.scrollHeight + 'px'
      }
    }
  },
  watch: {
    pInputObj: {
      immediate: true,
      handler (val) {
        if (!val) return
        this.mInputObj = val
      }
    }
  }
}
</script>

<style scoped>
select {
  border: none;
}

.UBCommonInputStyle {
  border: 1px solid #aaa;
  border-radius: 5px;
  min-width: 50px;
  width: 50px;
  height: 35px;
  box-sizing: border-box;
}

textarea {
  resize: none;
  min-height: 80px;
  overflow: hidden;
}</style>
