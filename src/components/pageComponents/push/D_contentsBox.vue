<template>
    <div v-if="this.contentsEle" style="width: 100%; background: #FFF; min-height: 20px; float: left; box-shadow: 0px 1px 3px rgba(103, 104, 167, 0.4); margin-bottom: 10px;">
        <div class="contentsCardHeaderArea" style="width: 100%; min-height: 20px; float: left; padding: 16px 20px;">
            <div @click="goChannelMain()" class="contentsCardLogoArea" >
                <div :style="'background-image: url(' + (contentsEle.domainPath ? contentsEle.domainPath + contentsEle.logoPathMtext : contentsEle.logoPathMtext) + ');'" style="width: 100%; height: 100%; border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;">
                </div>
            </div>
            <div style="width: calc(100% - 55px); margin-left: 10px; height: 100%; float: left; display: flex; flex-direction: column;" >
                <div style="width: 100%; paosition: relative; height: 50%; min-height: 26px;  position: relative;">
                    <p @click="goContentsDetail()" class=" textLeft textOverdot commonBlack fontBold font16" style="width: calc(100% - 35px);">
                        <img src="../../../assets/images/push/contTitle_alim.svg" style="width: 20px; float: left; margin-right: 5px;" alt="">
                        {{contentsEle.title}}
                    </p>
                    <img src="../../../assets/images/push/contents_moreBtnIcon.svg" style="position: absolute; right: 0; top: 0;" alt="" @@click="emit('contentMenuClick', { type: contentsEle.jobkindId === 'ALIM' ? 'alim' : 'board', ownerYn: this.GE_USER.userKey === contentsEle.creUserKey, tempData: contentsEle })">
                </div>
                <div style="width: 100%; paosition: relative; height: 50%; min-height: 40px;">
                    <p @click="goUserProfile()" class="CLDeepGrayColor font14 fl textLeft fontBold">{{this.$changeText(contentsEle.nameMtext)}}<pp style="font-weight: normal;">{{ '|' + this.$changeText(contentsEle.creUserName)}}</pp></p>
                    <p class="fr CLDeepGrayColor font12">{{this.$changeDateFormat(contentsEle.creDate)}}</p>
                </div>
            </div>
        </div>
        <div class="contentsCardBodyArea" style="width: 100%;  float: left; min-height: 20px;">
            <div v-if="(contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(contentsEle.shareItem).V === false && contentsEle.creUserKey !== this.GE_USER.userKey) && !contentsEle.titleBlindYn" @cick="zzz" class="font14 cursorP mbottom-05 bodyFullStr" v-html="$notPerText()"></div>
            <div v-else-if="(contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(contentsEle.shareItem).V === false && contentsEle.creUserKey !== this.GE_USER.userKey) && contentsEle.titleBlindYn" @cick="zzz" class="" ></div>
            <div v-else class="h-400max overHidden fl w-100P"  style="word-break: break-all;" :id="'contentsBodyBoxArea'+contentsEle.contentsKey">
              <pre :class="contentsEle.jobkindId === 'BOAR' && contentsEle.workStatYn && contentsEle.workStatCodeKey === 46? 'completeWork': ''" @click="clickCard(alim)" :id="'bodyFullStr'+contentsEle.contentsKey" class="font14 mbottom-05 mainConts cursorDragText h-100P w-100P fl" style="word-break: break-all; overflow: hidden auto;" v-html="$setBodyLength(contentsEle.bodyFullStr, contentsEle.jobkindId === 'BOAR' && contentsEle.workStatYn && contentsEle.workStatCodeKey === 46)"></pre>
            </div>
            <p @click="alimBigView()" :id="'bodyMore'+contentsEle.contentsKey" class="font16 cursorP textRight fr mright-1 lightGray" style="display:none">더보기 > </p>
        </div>
        <div class="contentsCardUserDoArea" style="width: 100%; min-height: 40px; float: left; justify-content: space-between;  display: flex; margin-top: 15px; padding: 0 20px;">
            <div style="float: left; width: 50%; height: 100%;">
                <div style="width: 30px; height: 35px; display: flex; float: left; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                    <img v-if="!this.contentsEle.D_CONT_USER_DO[1].doKey || this.contentsEle.D_CONT_USER_DO[1].doKey === 0" src="../../../assets/images/push/likeIcon.png" alt="">
                    <img v-else src="../../../assets/images/push/likeIcon_color.png" alt="">
                    <p class="font12 fl w-100P userDoColor">{{contentsEle.likeCount}}</p>
                </div>
                <div style="width: 30px; height: 35px; display: flex; float: left; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                    <img v-if="!this.contentsEle.D_CONT_USER_DO[0].doKey || this.contentsEle.D_CONT_USER_DO[0].doKey === 0" src="../../../assets/images/push/starIcon.png" alt="">
                    <img v-else src="../../../assets/images/push/starIcon_color.png" alt="">
                    <p class="font12 fl w-100P userDoColor">{{contentsEle.likeCount}}</p>
                </div>
                <div style="width: 30px; height: 35px; display: flex; float: left; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                    <img  src="../../../assets/images/push/memoIcon.png" alt="">
                    <p class="font12 fl w-100P userDoColor">{{contentsEle.memoCount}}</p>
                </div>
            </div>
            <div style="float: right; width: 50%; height: 100%; float: left;">
                <div style="width: 30px; height: 35px; display: flex; float: right; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                    <img src="../../../assets/images/push/shareIcon.png" class="img-w20 fl" alt="공유 아이콘"
                        data-clipboard-action="copy" id="boardDetailCopyBody" @click="contentsSharePop()"
                            :data-clipboard-text="contentsEle.copyTextStr">
                </div>
                <div style="width: 30px; height: 35px; display: flex; float: right; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                    <img v-if="this.contentsEle.attachMfilekey && this.contentsEle.attachMfilekey > 0" src="../../../assets/images/push/attachFileIcon.png" alt="">
                    <img v-else src="../../../assets/images/push/attachFileIcon.png" alt="">
                </div>
                <div style="width: 30px; height: 35px; display: flex; float: right; margin-right: 10px;flex-direction: column; justify-content: center; align-items: center;">
                    <img v-if="this.contentsEle.subsYn === 1" src="../../../assets/images/push/noti_on.png" alt="">
                    <img v-else src="../../../assets/images/push/noti_off.png" alt="">
                </div>
            </div>
        </div>
        <div style="height: 2px; background: #F1F1F1; width: calc(100% - 40px); margin: 10px 20px; float: left;"></div>
        <div class="contentsCardMemoArea" style="width: 100%; float: left; padding: 10px 20px; min-height: 20px;">
            <template v-for="(memo, mIndex) in this.contentsEle.D_MEMO_LIST" :key="mIndex">
                <memoCompo :diplayCount="-1" :childShowYn="propDetailYn" :propMemoEle="memo" />
            </template>
        </div>
    </div>
</template>
<script>
import memoCompo from './D_contBoxMemo.vue'
export default {
  components: {
    memoCompo
  },
  props: {
    contentsEle: {},
    propDetailYn: {}
  },
  data () {
    return {
    }
  },
  mounted () {
    this.setContentsMoreText()
  },
  methods: {
    emit (key, value) {
      this.$emit(key, value)
    },
    /** 컨텐츠의 크기를 비교해서 더보기> 버튼 보여주는 함수 */
    setContentsMoreText () {
      // 이미지를 불러오는 이유는 마운트 시점에 이미지의 크기를 못받오기에 추가함
      var imgList = document.querySelectorAll('#bodyFullStr' + this.contentsEle.contentsKey + ' img')
      var contents = window.document.getElementById('bodyFullStr' + this.contentsEle.contentsKey).offsetHeight
      var bodyMoreText = window.document.getElementById('bodyMore' + this.contentsEle.contentsKey)
      console.log(contents)
      if (contents > 400 || imgList.length > 0) {
        bodyMoreText.style.display = 'block'
      }
    },
    alimBigView () {
      var contentsBodyBoxArea = window.document.getElementById('contentsBodyBoxArea' + this.contentsEle.contentsKey)
      var bodyMoreArea = window.document.getElementById('bodyMore' + this.contentsEle.contentsKey)
      contentsBodyBoxArea.style.maxHeight = '100%'
      bodyMoreArea.style.display = 'none'
    },
    contentsSharePop () {
      console.log(this.contentsEle)
      if (window.navigator.share) {
        window.navigator.share({ title: '더알림', text: this.contentsEle.title, url: this.contentsEle.copyTextStr })
      } else {
        this.$showToastPop('지원하지 않는 브라우저입니다.')
      }
    },
    goChannelMain () {
      console.log(this.contentsEle)
      var openPopParam = {}
      openPopParam.targetKey = this.contentsEle.creTeamKey
      openPopParam.targetType = 'chanDetail'
      // targetContentsKey키를 주면 스크롤 이벤트가 작동
      // openPopParam.targetContentsKey = this.contentsEle.contentsKey
      this.$emit('openPop', openPopParam)
    },
    goUserProfile () {
      console.log(this.contentsEle)
      var openPopParam = {}
      openPopParam.targetKey = this.contentsEle.creTeamKey
      openPopParam.teamKey = this.contentsEle.creTeamKey
      openPopParam.targetType = 'bookMemberDetail'
      openPopParam.userKey = this.contentsEle.creUserKey
      openPopParam.popHeaderText = '프로필'
      openPopParam.readOnlyYn = true

      this.$emit('openPop', openPopParam)
    },
    goContentsDetail () {
      console.log(this.contentsEle)
      var openPopParam = {}
      openPopParam.targetType = 'contentsDetail'
      openPopParam.targetKey = this.contentsEle.contentsKey
      openPopParam.teamKey = this.contentsEle.creTeamKey
      openPopParam.jobkindId = this.contentsEle.jobkindId

      if (this.contentsEle.jobkindId === 'ALIM') {
        openPopParam.popHeaderText = this.contentsEle.nameMtext
      } else if (this.contentsEle.jobkindId === 'BOAR') {
        openPopParam.popHeaderText = this.contentsEle.cabinetNameMtext
      }
      if (this.contentsEle.officialYn) {
        openPopParam.officialYn = this.contentsEle.officialYn
      }
      openPopParam.value = this.contentsEle

      this.$emit('openPop', openPopParam)
    }
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
  }
}
</script>

<style scoped>
.contentsCard{background: #FFFFFF; border-bottom: 2px solid #E1E1E1; display: flex; flex-direction: column;}

.contentsCardLogoArea{
    width: 45px; height: 45px; overflow: hidden; float: left; border-radius: 100%; border: 2px solid #5B1CFC; padding: 1.5px; display: flex; justify-content: center; algin-items: center;
}
.h-400max{
  max-height: 400px;
}
.overHidden{
  overflow: hidden;
}
</style>
