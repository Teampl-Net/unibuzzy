<template>
<div :class="[selectedYn === true ? 'CDeepColor CWhiteBgColor btnBaseCss fl' : 'commonGray commonPurpleBG btnBaseCss fl' ]">{{title}}</div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    title: {},
    selectedYn: Boolean
  }
}
</script>

<style>
  .btnBaseCss{
    padding: 0px;
    align-items: center;
    border-radius: 8px;
    border: 1px solid #ccc;

    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;

    width: 8%;
    height: 4%;

/* 하이브릭5 */

    background: #F1F1FF;
/* 하이브릭1 */

    border: 1.5px solid rgb(74 102 158);
    border-radius: 8px;

/* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
</style>
