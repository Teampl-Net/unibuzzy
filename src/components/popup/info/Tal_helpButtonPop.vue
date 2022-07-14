<template>
<div style="width: 100vw; height: 100vh; position: fixed; top: 50px; bottom: 0; background-color: #000000cc; z-index: 999999;" @click="closeHelpPop">
  <helpMemberPop v-if="this.helpButtonType === 'member'" />
  <helpBookPop v-if="this.helpButtonType === 'book'" />
  <helpBoardPop v-if="this.helpButtonType === 'board'" />
</div>
</template>
<script>
import helpMemberPop from './Tal_helpMemberPop.vue'
import helpBookPop from './Tal_helpBookPop.vue'
import helpBoardPop from './Tal_helpBoardPop.vue'
export default {
  components: {
    helpMemberPop,
    helpBookPop,
    helpBoardPop
  },
  props: {
    helpButtonType: {}
  },
  data () {
    return {
      buttonType: ''
    }
  },
  created () {
    // alert(true)
    this.buttonType = this.helpButtonType
    // alert(JSON.stringify(this.buttonType))
  },
  updated () {
    this.closeHelpPop()
  },
  methods: {
    closeHelpPop () {
      // this.buttonType = ''
      this.$emit('closePop')
    }
  }
}
</script>
<style>

</style>
