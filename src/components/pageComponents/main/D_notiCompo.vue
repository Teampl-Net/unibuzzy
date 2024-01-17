<template>
  <div style="display:flex; algin-items:start;">
  <!-- <p class="fl w-100P font12 commonBlack">{{mNotiEle.largeIcon}}</p> -->
  <div @click="clickNoti" v-if="mNotiEle.title" class="notiEle" style="">
      <div style="width: 45px; height: 45px; margin-right: 10px; border-radius: 100%; overflow: hidden;" class="backShadow" >
          <img :src="mNotiEle.domainPath ? mNotiEle.domainPath + mNotiEle.userProfileImg : require(`@/assets/images/todo/defaultImg.png`)" style="width: 100%; float: left;  height: 100%;" alt="">
      </div>
      <!-- {{mNotiEle.largeIcon}} -->
      <div style="width: calc(100% - 55px);">
        <!-- <p class="fr font12 fontBold lightGray mbottom-05 textLeft">{{$dayjs(parseCreDate).format('YYYY-MM-DD hh:mm')}}</p> -->
          <p class="fr font12 fontBold lightGray mbottom-05 textLeft">{{$changeDateFormat(mNotiEle.creDate)}}</p>
          <p class="font14 commonBlack fontBold textLeft">{{mNotiEle.title}}</p>
          <p class="w100P font14 commonBlack textLeft" style="word-break:break-all;">{{decodeContents(mNotiEle.message)}}</p>
          <p>{{ index }}</p>
      </div>
  </div>
  <div class="mleft-03" @click="notiClear(mNotiEle.mLogKey)"><p class="font12" style="padding-top:0.3rem;">✖️</p></div>
  <!-- <div class="fl w-100P" style="overflow:auto">
    {{this.mNotiEle.creDate}}
    {{parseCreDate}}
  </div> -->
  </div>
</template>

<script>
export default {
  props: {
    mNotiEle: {},
    pClosePop: Function,
    notiClear: Function
  },
  data () {
    return {
      parseUserDo: {},
      parseCreDate: {},
      mSelectedNotiIndex: 0
    }
  },
  computed: {
    GE_LOCALE () {
      return this.$i18n.locale
    }
  },
  methods: {
    clickNoti () {
      this.$emit('clickNoti', this.mNotiEle)
      this.pClosePop()
    },
    checkNoti (index) {
      console.log('index', index)
      this.mSelectedNotiIndex = index
      this.$emit('checkedNoti', this.mSelectedNotiIndex)
    },
    decodeContents (data, completeYn) {
      // eslint-disable-next-line no-undef
      var changeText = Base64.decode(data)
      if (completeYn) {
        changeText = changeText.replaceAll('formCard', 'formCard completeWork')
      }
      return changeText
    }
  },
  created () {
    // console.log('mNotiEle', this.mNotiEle)
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
  padding-bottom: 20px;
  align-items:center;
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
  width: calc(100% - 75px);
  height: 100%;
}
</style>
