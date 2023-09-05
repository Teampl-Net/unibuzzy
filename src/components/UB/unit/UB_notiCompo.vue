<template>
  <!-- <p class="fl w100P font12 commonBlack">{{mNotiEle.largeIcon}}</p> -->
  <div v-if="mNotiEle.title" style="width: 100%; min-height: 130px; height: auto; float: left;  margin-bottom: 5px; border-bottom: 1px solid #bbb; background: #FFFFFF; border-radius: 0.8rem; padding: 10px 10px; display: flex; padding-bottom: 5px;">
      <div style="width: 45px; height: 45px; background: #FFFFFF; margin-right: 10px; border-radius: 100%; overflow: hidden; border: 1px solid #ccc;" >
          <img v-if="mImgPath" :src="mImgPath" style="width: 100%; float: left;  height: 100%;" alt="">
      </div>
      <!-- {{mNotiEle.largeIcon}} -->
      <div style="width: calc(100% - 55px); height: calc(100%)">
        <!-- <p class="fr font12 fontBold lightGray mbottom-05 textLeft">{{$dayjs(parseCreDate).format('YYYY-MM-DD hh:mm')}}</p> -->
          <p class="font14 commonBlack fontBold textLeft w100P fl">{{mNotiEle.title}}</p>
          <p class="font14 commonBlack textLeft w100P fl" v-html="mDispMessage"></p>
          <p class="fr font12 fontBold lightGray mbottom-05 textRight w100P fr">{{$changeDateFormat(mNotiEle.creDate)}}</p>
      </div>
  </div>
  <!-- <div class="fl w100P" style="overflow:auto">
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
      parseCreDate: {},
      mImgPath: '',
      mDispMessage: ''
    }
  },
  methods: {
    // 패턴을 치환하는 함수 정의
    replacePattern (text, replacementObj) {
      return text.replace(/\${(.*?)}/g, (match, key) => replacementObj[key] || match)
    }

  },
  created () {
    if (this.mNotiEle.domainPath && this.mNotiEle.userProfileImg) {
      this.mImgPath = this.mNotiEle.domainPath + this.mNotiEle.userProfileImg
    } else if (!this.mNotiEle.domainPath && this.mNotiEle.userProfileImg) {
      this.mImgPath = this.mNotiEle.userProfileImg
    }

    if (this.mNotiEle.logItemListStr && this.mNotiEle.dispText) {
      const changeVal = {}
      const valList = this.mNotiEle.logItemListStr.split('$#$')
      for (var i = 0; i < valList.length; i++) {
        const val = valList[i].split('$^$')
        changeVal[val[0]] = val[1]
      }
      this.mDispMessage = this.replacePattern(this.mNotiEle.dispText, changeVal)
    }
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
