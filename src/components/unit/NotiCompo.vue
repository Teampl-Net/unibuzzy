<template>
  <div v-if="mNotiEle.title" class="notiEle">
      <div class="chanImgBox">
          <img v-if="mImgPath" :src="mImgPath" class="w100P fl h100P" alt="">
      </div>
      <div class="contentsWrap">
          <p class="font14 commonBlack fontBold textLeft w100P fl">{{mNotiEle.title}}</p>
          <p class="font14 commonBlack textLeft w100P fl" v-html="mDispMessage"></p>
          <p class="fr font12 fontBold lightGray mbottom-05 textRight w100P fr">{{$changeDateFormat(mNotiEle.creDate)}}</p>
      </div>
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
  }
}
</script>

<style scoped>
.notiEle {
  width: 100%;
  min-height: 130px;
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
