<template>
    <div style="width: 100%; min-height: 30px; padding: 3px 5px; border-bottom: 0.8px solid #ccc;" v-for="(memo, index) in memoList" :key="index">
      <p style="width: clac(100% - 100px);float: left; font-size: 14px;" class="commonBlack">{{memo.bodyFullStr}}</p>
    </div>
</template>

<script>
export default {
  props: {
    memoList: {}
  },
  created () {
    // alert(JSON.stringify(this.memoList))
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
