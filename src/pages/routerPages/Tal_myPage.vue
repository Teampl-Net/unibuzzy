<template>
  <div class="w-100P h-100P">
    <div class="myProfileWrap" @click="goSetMyPage">
      <div class="myProfileLeft">
        <!-- <div class="myPagePicImgWrap">
          <img v-if="this.userInfo.userProfileImg" :src="this.userInfo.userProfileImg"/>
          <img v-else src="../../assets/images/main/main_profile.png"/>
        </div> -->
        <div v-if="userInfo.userProfileImg !== undefined && userInfo.userProfileImg !== null && userInfo.userProfileImg !== ''" class="myPagePicImgWrap" :style="'background-position: center; background-image: url(' + userInfo.userProfileImg + ')'"  style="background-size: cover; background-repeat: no-repeat;">
        </div>
        <div v-else class="myPagePicImgWrap" style="background-image: url('../../assets/images/main/main_profile.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
        </div>
      </div>
      <div class="myProfileRight">
        <div class="myProfileRightContents">
          <div class="font18 fontBold fl textLeft w-100P h-100P" >{{this.$changeText(this.userInfo.userDispMtext)}}</div>
        </div>
        <div class="myProfileRightContents">
          <!-- <img class="myProfileRightIcon" src="../../assets/images/main/main_email.png" /> -->
          <!-- <span class="myProfileRightName commonColor font14">이메일</span> -->
          <span class="font14 myProfileRightInfo commonBlack textOverdot">{{userInfo.userEmail}}</span>
        </div>
      </div>
      <div class="h-100P fl font20 grayBlack" style="width: 20px; line-height: 50px;">></div>
    </div>
    <!-- <div class="font16 profileSetting" @click="goSetMyPage">프로필 설정 ></div> -->
    <div class="commonBlack " style="width: 100%; flaot: left; height: 100%;">
      <myActList ref="commonActList" :viewTab="this.myPageTabType" @openPop="openPop" style="border-radius: 0.8rem;" />
      <logList v-if="this.myPageTabType === 'ml'" />
    </div>
    <gConfirmPop :confirmText='errorBoxText' class="" confirmType='timeout' @no='errorBoxYn = false' v-if="errorBoxYn"/>
  </div>
</template>
<script>
import myActList from '../../components/pageComponents/myPage/Tal_myActList.vue'
import logList from '../../pages/routerPages/Tal_logList.vue'
// import userItem from '../../components/unit/Tal_userItem.vue'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  components: {
    // userItem,
    myActList,
    logList
  },
  created () {
    this.$emit('changePageHeader', '마이페이지')
    this.$emit('closeLoading')
    this.getUserInform()
  },
  methods: {
    goMyChanList () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'chanList'
      param.channelTabType = 'mychannel'
      this.$emit('openPop', param)
    },
    goSetMyPage () {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'setMypage'
      this.$emit('openPop', param)
    },
    openPop (value) {
      this.$emit('openPop', value)
    },
    async getUserInform () {
      this.userInfo = await this.$getUserInform()

      if (this.userInfo !== undefined && this.userInfo !== null) {
        if (this.userInfo.userEmail); else this.userInfo.userEmail = '등록된 이메일이 없습니다.'
        if (this.userInfo.phoneLast) {
          this.userInfo.phoneLast = '010-****-' + this.userInfo.phoneLast
        } else {
          this.userInfo.phoneLast = '등록된 번호 없음'
        }
        if (this.userInfo.userDispMtext); else {
          if (this.userInfo.userNameMtext) { this.userInfo.userDispMtext = this.userInfo.userNameMtext } else { this.userInfo.userDispMtext = '등록된 이름이 없습니다.' }
        }
      }
      this.$emit('closeLoading')
      return this.userInfo
    }
  }
}
</script>
<style>
.myProfileWrap {width: 100%; height: 70px;float: left; cursor: pointer; margin-top: 0.5rem; background-color: #fff; border-radius: 0.8rem; padding: 10px; margin-bottom: 1.5rem;}
.myProfileLeft {width: 70px; height: 100%; float: left;}
.myPagePicImgWrap {width: 50px; height: 50px; position: relative; border-radius: 80px; border:2.5px solid #6768a7; background: #6768a745;padding: 5px; padding-top: 10px; padding-bottom: 0;overflow: hidden; display: flex; margin-right: 1rem}
.myPagePicImgWrap img {width: 100%; position: absolute; top: 0; left: 0;}

.myProfileRight {width: calc(100% - 100px); height: 100%; float: left;}
.myProfileRightContents {width: 100%; height: 30px; line-height: 30px; float: left; text-align: left;}
.myProfileRightIcon {width: 15px;height: 15px;margin-right: 5px;float: left;margin-top: 2.5px;}
.myProfileRightName {margin-right: 5px;width: 40px;height: 20px;line-height: 20px;float: left; font-weight: bold;}
.myProfileRightInfo {width: calc(100% - 25px); height: 20px; cursor: pointer; line-height: 20px; float: left;}
.profileSetting {font-weight: bold; box-shadow: 0 0 7px 3px #b7b4b440; border-radius: 15px; background-color: #6768A7; color: #fff; float: left}

.commonBigBtn{cursor: pointer; width: 90px;height: 30px;line-height: 30px;margin-top: 5px;float: right;background-color: #6768A7;border-radius: 0.8rem;color: #fff;}
</style>
