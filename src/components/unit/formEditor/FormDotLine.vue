<template>
        <div  style="width: 100%; height: 30px; float: left; padding-top: 15px;  padding-right: 30px;" :formIdx="targetKey" ref="formDot" :id="'formDot'+targetKey" class="formCard formDot">
          <hr style="" />
        </div>
</template>

<script>
export default {
  props: {
    targetKey: {}
  }
}
</script>

<style scoped>
  .formDot hr {
    margin-top: 5px;
    width: calc(100%); height: 1px; padding-bottom: 2px;
    float: left;
    background-image: linear-gradient(to right, #ccc 33%, rgba(255,255,255,0) 0%);
    background-position: bottom;
    background-size: 17px 2px;
    background-repeat: repeat-x;
  }
</style>
