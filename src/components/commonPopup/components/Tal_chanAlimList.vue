<template>
<div class="chanDetailWrap" style="height: 100vh; overflow-y: scroll;">
  <div ref="viewBox" :key="wrapKey" v-if="this.detailShowYn === false" >
  <!-- <div>{{pushKey}}</div> -->
    <div style="height: calc(35vh); width: 100%; float: left; position: relative;">
      <div ref="chanImg"  class="mt-header chanWhiteBox">
        <span class="font16">구독자 100명| 알림발송 100건 {{scrollPosition}}</span>
        <span class="font22 fontBold">{{changeText(chanItem.nameMtext)}}</span>
        <img src="../../../assets/images/channel/chanImg.png" style="width: 110px; height: 110px; border-radius: 110px; margin-bottom: 5px;" alt="채널사진">
        <span class="font13 mbottom-05 fl">#라이프스타일</span> <span class="font14 fontBold mbottom-05 " @click="openPop" style="position: absolute; right: 20px; bottom: 0;">채널정보 ></span>
      </div>
    </div>
    <div class="channelItemBox "  style="padding: 0px 1.5rem; height: 1200px;">
      <pushList @openPop="openPushDetailPop" :chanDetailKey="this.chanDetail.targetKey" />
    </div>
  </div>
  <div v-if="detailShowYn" >
    <popHeader v-if="detailHeaderShowYn" :headerTitle="changeText(chanItem.nameMtext)" @click="this.detailShowYn = false" :thisPopN="this.thisPopN" class="commonPopHeader"/>
    <chanDetailComp  @changeFollowYn="changeFollowYn" :chanDetail="this.chanItem" style="background-color: #fff;"></chanDetailComp>
  </div>
</div>
</template>

<script>
import chanDetailComp from './Tal_chanDetail.vue'
import pushList from '../../../pages/routerPages/Tal_pushList.vue'
export default {
  data () {
    return {
      box: null,
      scrollPosition: null,
      wrapKey: 0,
      followYn: false,
      detailHeaderShowYn: false,
      detailShowYn: true,
      chanItem: {}

    }
  },
  props: {
    chanDetail: {}
  },
  components: {
    pushList,
    chanDetailComp
  },
  async created () {
    // alert(JSON.stringify(this.chanDetail))
    // document.body.addEventListener('scroll', this.updateScroll)
    // alert(this.scrollPosition)
    await this.getChanDetail()
  },
  mounted () {
    this.box = this.$refs.viewBox // 이 dom scroll 이벤트를 모니터링합니다
    // this.box.addEventListener('scroll', this.updateScroll)
  },
  unmounted () {
    // this.box.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    async getChanDetail () {
      this.detailShowYn = true
      var paramMap = new Map()
      // eslint-disable-next-line no-unused-vars
      var tt = this.chanDetail
      if (this.chanDetail.targetKey !== undefined && this.chanDetail.targetKey !== null && this.chanDetail.targetKey !== '') {
        paramMap.set('teamKey', this.chanDetail.targetKey)
      } else if (this.chanDetail.teamKey !== undefined && this.chanDetail.teamKey !== null && this.chanDetail.teamKey !== '') {
        paramMap.set('teamKey', this.chanDetail.teamKey)
      }
      var resultList = await this.$getTeamList(paramMap)

      this.chanItem = resultList.content[0]
      // eslint-disable-next-line no-debugger
      debugger
      if (this.chanItem.userTeamInfo) {
        this.followYn = true
        this.detailShowYn = false
      }
      this.$emit('closeLoading')
    },
    openPushDetailPop (param) {
      this.$emit('openPop', param)
    },
    async changeFollowYn (fYn) {
      this.$emit('openLoading')
      this.detailShowYn = false
      this.detailHeaderShowYn = false
      await this.getChanDetail()
      this.$emit('closeLoading')
      // this.detailShowYn = false
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      if (changeTxt) { return changeTxt }
      // if (changeTxt !== undefined) { return changeTxt }
    },
    openPop () {
      this.detailShowYn = true
      this.detailHeaderShowYn = true
    },
    updateScroll () {
      this.scrollPosition = this.box.scrollTop
    }
  }
}
</script>

<style scoped>
.gBtnSmall{
  float: left!important; margin-top: 0.7rem
}
.gBtnSmall{
  float: left!important; margin-top: 0.7rem
}

.chanDetailWrap{
  background-image: url('../../../assets/images/push/push_bg.png');
  height: 100vh;
  background-size: cover;
}

.chanDetailWrap tr, .chanDetailWrap td{
  padding-top: 1rem;
  min-height: 3rem;
  text-align: left;
}
.chanWhiteBox{position: absolute; bottom: 0; display: flex; flex-direction: column;align-items: center;width: 100%;}
.channelItemBox{background-color: #fff; width: 100%; height: 65vh; float: left; box-sizing: border-box;}
.chanDetailWrap table{width: 85vw; max-width: 400px; }
.chanDetailWrap table img{width: 1.3rem}
.iconTd{display: flex; align-items: flex-start; padding-top: 1.2rem!important;}
/* .plusMarginBtn{margin-top: 0.6rem; line-height: 1.5;} */
</style>
