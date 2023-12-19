<template>
  <!-- <p class="fl w-100P font12 commonBlack">{{mNotiEle.largeIcon}}</p> -->
  <div @click="this.$emit('clickNoti', mNotiEle)" v-if="mNotiEle.title" class="notiEle" style="">
      <div style="width: 45px; height: 45px; margin-right: 10px; border-radius: 100%; overflow: hidden;" >
          <img :src="mNotiEle.domainPath + mNotiEle.userProfileImg" style="width: 100%; float: left;  height: 100%;" alt="">
      </div>
      <!-- {{mNotiEle.largeIcon}} -->
      <div style="width: calc(100% - 55px);">
        <!-- <p class="fr font12 fontBold lightGray mbottom-05 textLeft">{{$dayjs(parseCreDate).format('YYYY-MM-DD hh:mm')}}</p> -->
          <p class="fr font12 fontBold lightGray mbottom-05 textLeft">{{$changeDateFormat(mNotiEle.creDate)}}</p>
          <p class="font14 commonBlack fontBold textLeft">{{mNotiEle.title}}</p>
          <p v-if="GE_LOCALE === 'ko'" class="font14 commonBlack textLeft">{{mNotiEle.message}}</p>
          <p v-if="GE_LOCALE === 'en'" class="font14 commonBlack textLeft">{{mNotiEle.message}}</p>
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
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  created () {
    console.log('mNotiEle', this.mNotiEle)
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

.notiEle {
  width: 100%;
  min-height: 100px;
  height: auto;
  float: left;
  margin-bottom: 5px;
  border-bottom: 1px solid #bbb;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0.8rem;
  padding: 10px 10px;
  display: flex;
  padding-bottom: 5px;
}
.chanImgBox {
  width: 45px;
  height: 45px;
  background: #FFFFFF;
  margin-right: 10px;
  border-radius: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
}
.contentsWrap {
  width: calc(100% - 55px);
  height: 100%;
}
</style>
