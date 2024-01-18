<template>
    <div v-if="popType !== 'addGroup'" class="backDark"></div>

    <div class="commonPopWrap">
      <addGroupPop v-if="popType === 'addGroup'" :pClosePop="pClosePop"/>
    </div>
</template>

<script>
import addGroupPop from '@/components/admPages/popUP/Adm_addGroupPop.vue'

export default {

  components: {
    addGroupPop
  },
  props: {
    pClosePop: Function,
    pPropParams: {}
  },
  created () {
    this.popType = this.pPropParams.popType
    console.log(this.pPropParams)
  },
  data () {
    return {
      popType: {}
    }
  }

}
</script>

<style scoped>
.commonPopWrap{
  box-shadow:0 0 5px rgba(0,0,0,0.2);
  z-index:3;
  /* background-color:#fff; */
  width:100%;
  height:100%;
  padding-top:20px;
}

.backDark{
  position:fixed;
  top:0;
  left:0;
  height:100%;
  width:100%;
  background-color:rgba(0,0,0,0.3);
  z-index:2;
}
</style>
