<template>
    <div style="width: 100%; min-height: 100px; padding: 10px; padding-right: 0; border-bottom: 0.8px solid #ccc; float: left;" v-for="(memo, index) in memoList" :key="index">
      <div class="commentTop" style="min-height: 20px; float: left; width: 100%; margin-bottom: 5px;">
        <p style="float: left;  font-size: 16px; color: black; ">최유민</p>
        <!-- <div style="float: right; font-size: 16px; font-weight: bold;">X</div> -->
        <p style="float: right; font-size: 14px; margin-right: 10px; color: darkgray; ">2021-06-01</p>
      </div>
      <div class="commentMiddle" style="display: flex; min-height: 50px; float: left; width: 100%; ">
        <!-- <img src="" style="height: 30px; width: 30px; " /> -->
        <div style="height: 30px; width: 30px; float: left; border-radius: 100%; background-color: #aaa; margin-right: 15px;" ></div>
        <p style="width: calc(100% - 40px);float: left; font-size: 16px; height: 100%;" class="commonBlack">{{memo.bodyFullStr}} </p>
      </div>
      <div class="commentBottom" style="height: 25px; line-height: 25px; font-size: 14px; width: 100%; float: left;">
        <div style="float: right; width: 40px; height: 100%; text-align: center;">삭제</div>
        <div style="float: right; width: 40px; height: 100%; text-align: center; border-right: 1px solid #aaa;">답글</div>
        <div style="float: right; width: 40px; height: 100%; text-align: center; border-right: 1px solid #aaa;">수정</div>
      </div>
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
