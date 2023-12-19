<template>
        <div  style="width: 100%; height: 30px; padding-top: 15px; float: left; padding-right: 30px;" :formIdx="targetKey" ref="formLine" :id="'formLine'+targetKey" class="formCard formLine">
          <hr />
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
.formLine hr {
    margin: 0!important;
    border-top: 2px solid #000;
  }
</style>
