<template>
    <div v-if="this.contentsEle" style="width: 100%; background: #FFF; min-height: 20px; float: left; box-shadow: 0px 1px 3px rgba(103, 104, 167, 0.4); margin-bottom: 10px;">
        <div class="contentsCardHeaderArea" style="width: 100%; min-height: 20px; float: left; padding: 16px 20px;">
            <div style="width: 45px; height: 45px; overflow: hidden; float: left; border-radius: 100%; border: 2px solid #5B1CFC; padding: 1.5px; display: flex; justify-content: center; algin-items: center;">
                <div :style="'background-image: url(' + (contentsEle.domainPath ? contentsEle.domainPath + contentsEle.logoPathMtext : contentsEle.logoPathMtext) + ');'" style="width: 100%; height: 100%; border-radius: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;">
                </div>
            </div>
            <div style="width: calc(100% - 55px); margin-left: 10px; height: 100%; float: left; display: flex; flex-direction: column;" >
                <div style="width: 100%; paosition: relative; height: 50%; min-height: 26px;  position: relative;">
                    <p class=" textLeft textOverdot commonBlack fontBold font16" style="width: calc(100% - 35px);">
                        <img src="../../../assets/images/push/contTitle_alim.svg" style="width: 20px; float: left; margin-right: 5px;" alt="">
                        {{contentsEle.title}}
                    </p>
                    <img src="../../../assets/images/push/contents_moreBtnIcon.svg" style="position: absolute; right: 0; top: 0;" alt="">
                </div>
                <div style="width: 100%; paosition: relative; height: 50%; min-height: 40px;">
                    <p class="CLDeepGrayColor font14 fl textLeft fontBold">{{this.$changeText(contentsEle.nameMtext)}}<pp style="font-weight: normal;">{{ '|' + this.$changeText(contentsEle.creUserName)}}</pp></p>
                    <p class="fr CLDeepGrayColor font12">{{this.$changeDateFormat(contentsEle.creDate)}}</p>
                </div>
            </div>
        </div>
        <div class="contentsCardBodyArea" style="width: 100%;  float: left; min-height: 20px;">
            <div v-if="(contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(contentsEle.shareItem).V === false && contentsEle.creUserKey !== this.GE_USER.userKey) && !contentsEle.titleBlindYn" @cick="zzz" class="font14 cursorP mbottom-05 bodyFullStr" v-html="notPerText()"></div>
            <div v-else-if="(contentsEle.jobkindId === 'BOAR' && this.$checkUserAuth(contentsEle.shareItem).V === false && contentsEle.creUserKey !== this.GE_USER.userKey) && contentsEle.titleBlindYn" @cick="zzz" class="" ></div>
            <div v-else class="h-400max overHidden fl w-100P"  style="word-break: break-all;" :id="'contentsListBodyArea'+contentsEle.contentsKey">
                <pre :class="contentsEle.jobkindId === 'BOAR' && contentsEle.workStatYn && contentsEle.workStatCodeKey === 46? 'completeWork': ''" @click="clickCard(alim)" :id="'bodyFullStr'+contentsEle.contentsKey" class="font14 mbottom-05 mainConts cursorDragText h-100P w-100P fl" style="word-break: break-all;" v-html="setBodyLength(contentsEle.bodyFullStr, contentsEle.jobkindId === 'BOAR' && contentsEle.workStatYn && contentsEle.workStatCodeKey === 46)"></pre>
            </div>
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
                    <img src="../../../assets/images/push/shareIcon.png" alt="">
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
                <memoCompo :diplayCount="-1" :childShowYn="true" :propMemoEle="memo" />
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
    contentsEle: {}
  },
  methods: {
    notPerText () {
      var html = '<div class="w-100P fl textCenter commonColor font14">'
      html += '열람 권한이 없습니다.'
      html += '</div>'
      return html
    },
    setBodyLength (str, completeYn) {
      if (!str) return
      // eslint-disable-next-line no-undef
      str = Base64.decode(str)
      str.replace('contenteditable= true', '')
      str = str.replaceAll('<pre', '<div')
      str = str.replaceAll('</pre', '</div')
      if (completeYn) {
        console.log(str)
        str = str.replaceAll('formCard formText ', 'formCard formText completeWork ')
      }
      return str
    }
  }
}
</script>

<style scoped>
.contentsCard{background: #FFFFFF; border-bottom: 2px solid #E1E1E1; display: flex; flex-direction: column;}

</style>
