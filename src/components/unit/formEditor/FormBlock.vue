 <template>
        <div style="width: 100%; min-height: 35px; float: left;" :formIdx="targetKey" ref="formBlock" :id="'formBlock'+targetKey" class="formCard formBlock"></div>
</template>

<script>
export default {
  props: {
    targetKey: {}
  }
}
</script>

<style scoped>

</style>
