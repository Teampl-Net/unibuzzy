 <template>
        <div style="width: 100%; min-height: 35px; float: left;" :formIdx="targetKey" ref="formBlock" :id="'formBlock'+targetKey" class="formCard formBlock"></div>
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

</style>
