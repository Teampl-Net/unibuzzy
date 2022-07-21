<template>
<div style="width: 100vw; height: 100vh; overflow: hidden scroll; position: fixed; top: 0; bottom: 0; background-color: #000000cc; z-index: 99;" @click="closeHelpPop"></div>
<helpMemberPop v-if="this.helpButtonType === 'member'" />
<helpBookPop v-if="this.helpButtonType === 'book'" />
<helpBoardPop v-if="this.helpButtonType === 'board'" />
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
    this.buttonType = this.helpButtonType
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
