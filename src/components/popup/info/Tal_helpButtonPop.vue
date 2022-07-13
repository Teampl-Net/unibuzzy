<template>
  <!-- <div style="width: 100vh; height: 100vh; background-color: #000000cc;"> -->
    <helpMemberPop v-if="this.helpButtonType === 'a'" />
    <helpBookPop v-if="this.helpButtonType === 'baook'" />
    <helpBoardPop v-if="this.helpButtonType === 'boaard'" />
    <img src="" />
  <!-- </div> -->
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
  }
}
</script>
<style>

</style>
