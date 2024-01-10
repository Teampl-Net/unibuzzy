<template>
  <div class="commonPopWrap" @click="pClosePop">X</div>
</template>

<script>
export default {
  props: {
    pClosePop: Function
  }

}
</script>

<style scoped>
.commonPopWrap{
  width:90%;
  height:50%;
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  box-shadow:0 0 5px rgba(0,0,0,0.2);
  z-index:3;
  background-color:#fff;
}

</style>
