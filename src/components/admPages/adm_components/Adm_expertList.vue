<template>
  <div>hi</div>
</template>

<script>
export default ({
  props: {
    orgKey: Number,
    pMyOrgList: {}
  },
  created () {
    console.log('orgKey', this.orgKey)
    console.log('pMyOrgList', this.pMyOrgList)
  },
  data () {
    return {}
  },
  methods: {

  }
})
</script>

<style scoped>

</style>
