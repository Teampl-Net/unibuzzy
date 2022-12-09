<template>
  <!-- <p class="fl w-100P font12 commonBlack">{{mNotiEle.largeIcon}}</p> -->
  <div @click="this.$emit('clickNoti', mNotiEle)" v-if="mNotiEle.title" style="width: 100%; min-height: 50px; float: left; padding: 10px 0;  margin-bottom: 5px; border-bottom: 1px solid #ccc;  display: flex;">
      <div style="width: 45px; height: 45px; margin-right: 10px; border-radius: 100%; overflow: hidden;" >
          <img v-if="mNotiEle.largeIcon" :src="mNotiEle.largeIcon" style="width: 100%; float: left;  height: 100%;" alt="">
      </div>
      <!-- {{mNotiEle.largeIcon}} -->
      <div style="width: calc(100% - 55px);">
        <!-- <p class="fr font12 fontBold lightGray mbottom-05 textLeft">{{$dayjs(parseCreDate).format('YYYY-MM-DD hh:mm')}}</p> -->
          <p class="fr font12 fontBold lightGray mbottom-05 textLeft">{{$changeDateFormat(mNotiEle.D_CRE_DATE)}}</p>
          <p class="font14 commonBlack fontBold textLeft">{{mNotiEle.title}}</p>
          <p class="font14 commonBlack textLeft">{{mNotiEle.body}}</p>
      </div>
  </div>
  <!-- <div class="fl w-100P" style="overflow:auto">
    {{this.mNotiEle.creDate}}
    {{parseCreDate}}
  </div> -->
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
    // if (this.mNotiEle.userDo) {
    //   var notiDate = JSON.parse(this.mNotiEle.creDate)
    //   var date = new Date()
    //   date.setFullYear(parseInt(notiDate.year))
    //   date.setMonth(parseInt(notiDate.monthValue) - 1)
    //   date.setDate(parseInt(notiDate.dayOfMonth))
    //   date.setHours(parseInt(notiDate.hour))
    //   date.setMinutes(parseInt(notiDate.minute))
    //   date.setSeconds(parseInt(notiDate.second))
    //   this.parseCreDate = date
    // }
  }
}
</script>

<style scoped>

</style>
