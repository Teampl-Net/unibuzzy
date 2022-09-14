<template>
    <div style="width: calc(100% ; border-radius: 15px 15px 0 0; left: 0px; min-height: 80px; padding: 15px 10px; box-shadow: 0 0 9px 4px #00000036; position: absolute; z-index: 999; bottom: 0; background: #fff;">
      <div v-if="meMemoData !== null"  class="fl" style="width: calc(100% - 20px);min-height: 30px; margin: 0 10px 10px 10px; border-radius: 5px; background-color: #dddddd90; padding: 0.5rem 1rem; position: relative;" >
        <!-- <div class="w-100P fl"> -->
          <p class="fl commonBlack font14" >{{this.$changeText(meMemoData.memo.userDispMtext || meMemoData.memo.userNameMtext)}}</p>
          <!-- <p class="fl mleft-05 mright-05" style="text-align: left;" >{{meMemoData.memo.bodyMinStr}}</p> -->
          <div class="fl mleft-05 mright-05 font14 commonBlack" style="text-align: left;" v-html="meMemoData.memo.bodyFullStr"></div>
        <!-- </div> -->
        <div style="width:20px;  position: absolute; top:0.2rem; right:0.5rem" @click="cancel">
          <img src="../../../assets/images/common/searchXIcon.svg" style="width:50%;" alt="">
        </div>
      </div>

      <img v-if="meMemoData !== null" src="../../../assets/images/common/icon-turn-right.svg" style="width:20px; line-height: 80px; margin-top: 1rem" class="fl mright-02" alt="">
      <!-- <textarea id="memoTextTag" class="fl" :class="{width65: meMemoData !== null}" style="width: calc(100% - 45px); height: 100%; float: left; border: 1px solid #ccc; resize: none;" v-model="memoText" name="" cols="30" ></textarea> -->
      <div id="memoTextTag" ref="memoTextTag" class="fl editableContent" :class="{width65: meMemoData !== null}" style="width: calc(100% - 45px); min-height:3rem; text-align:left; float: left; border: 1px solid #ccc; resize: none;"  contenteditable=true ></div>
      <img @click="saveMemo" src="../../../assets/images/formEditor/addComment.svg" style="width: 40px; float: right; margin-top: 5px;" alt="" class="fl">
    </div>

</template>

<script>
// eslint-disable-next-line
export default {
  props: {
    mememo: {}
  },
  created () {
    if (this.mememo) this.setMememo()
  },
  data () {
    return {
      memoText: '',
      meMemoData: null
    }
  },
  mounted () {
    this.$refs.memoTextTag.focus()
  },
  methods: {
    setMememo () {
      this.meMemoData = this.mememo
    },
    cancel () {
      this.meMemoData = null
      this.$emit('mememoCancel')
    },
    saveMemo () {
      // document.getElementById('memoTextTag').contentEditable = false
      var html = document.getElementById('memoTextTag').innerHTML
      this.$emit('saveMemoText', html)
    }
  }
}
</script>

<style scoped>
.width65{
width: calc(100% - 65px) !important;

}
</style>
