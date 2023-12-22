<template>
        <div  style="width: 100%; height: 30px; float: left; padding-top: 15px;  padding-right: 30px;" :formIdx="targetKey" ref="formDot" :id="'formDot'+targetKey" class="formCard formDot">
          <hr style="" />
        </div>
        <!-- <div class="" style="width: 30px; background: #BFBFDA; float: right border-radius: 3px; box-shadow: rgb(191 191 218) 0px 0px 2px 0px; height: 100%; margin-right: 5px; display: flex; justify-content: center; align-items: center;"><img class="fl" src="../../../assets/images/formEditor/scroll.svg" alt=""></div> -->
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    targetKey: {}
  }
}
</script>

<style scoped>
  .formDot hr {
    /* margin: 0!important;
    border-top: 2px dashed #000; */
    margin-top: 5px;
    width: calc(100%); height: 1px; padding-bottom: 2px;
    float: left;
    background-image: linear-gradient(to right, #ccc 33%, rgba(255,255,255,0) 0%);
    background-position: bottom;
    background-size: 17px 2px;
    background-repeat: repeat-x;
  }
</style>
