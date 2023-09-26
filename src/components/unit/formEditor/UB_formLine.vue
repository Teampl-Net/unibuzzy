<template>
        <div  style="width: 100%; height: 30px; padding-top: 15px; float: left; padding-right: 30px;" :formIdx="targetKey" ref="formLine" :id="'formLine'+targetKey" class="formCard formLine">
          <hr />
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
.formLine hr {
    margin: 0!important;
    border-top: 2px solid #000;
  }
</style>
