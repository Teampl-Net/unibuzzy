<template>
    <div class="popHeader">
        {{headerTitleText}}
        <img class="fr cursorP" @click="this.$emit('closePop')" style="" src="../resource/images/popup_close.png" alt="">
    </div>
</template>

<script>
export default {
  methods: {
  },
  props: {
    headerTitleText: {}
  }
}
</script>
