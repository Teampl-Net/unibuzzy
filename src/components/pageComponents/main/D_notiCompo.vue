<template>
    <div @click="this.$emit('clickNoti', mNotiEle)" v-if="mNotiEle.title" style="width: 100%; min-height: 50px; float: left; padding: 10px 0;  margin-bottom: 5px; border-bottom: 1px solid #ccc;  display: flex;">
        <div style="width: 45px; height: 45px; margin-right: 10px; border-radius: 100%; overflow: hidden;" >
            <img v-if="mNotiEle.largeIcon" :src="mNotiEle.largeIcon" style="width: 100%; float: left;  height: 100%;" alt="">
        </div>
        <div style="width: calc(100% - 55px);">
            <p class="font14 commonBlack fontBold textLeft">{{mNotiEle.title}}</p>
            <p class="font14 commonBlack textLeft">{{mNotiEle.body}}</p>
        </div>
        <p class="font12 fontBold lightGray mbottom-05 textLeft">{{$changeDateMemoFormat(parseUserDo.creDate)}}</p>
    </div>
    <div class="fl w-100P" style="overflow:auto">
      {{parseCreDate}}
    </div>

</template>

<script>
export default {
  props: {
    mNotiEle: {}
  },
  data () {
    return {
      parseUserDo: {},
      parseCreDate: {}
    }
  },
  created () {
    if (this.mNotiEle.userDo) {
      this.parseUserDo = JSON.parse(this.mNotiEle.userDo)
      this.parseCreDate = JSON.parse(JSON.stringify(this.parseUserDo.creDate))
      // var date = new Date(this.parseCreDate)
      // alert(date)
    }
  }
}
</script>

<style scoped>

</style>
