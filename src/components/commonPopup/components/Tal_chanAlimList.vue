<template>
<div  id="alimWrap" ref="testBox" style="overflow: scroll; height: 100vh;" class="chanDetailWrap">
  <div :key="wrapKey" v-if="this.detailShowYn === false" >
  <!-- <div>{{pushKey}}</div> -->
    <div id="summaryWrap" class="summaryWrap" >
      <div id="chanInfoSummary" ref="chanImg"  class="mt-header chanWhiteBox">
        <span id="chanCnt" class="font16">구독자 101명| 알림발송 100건</span>
        <span class="font22 fontBold">{{changeText(chanItem.nameMtext)}}</span>
        <img id="chanImg" src="../../../assets/images/channel/chanImg.png" style="width: 110px; height: 110px; border-radius: 110px; margin-bottom: 5px;" alt="채널사진">
        <span class="font13 mbottom-05 fl">#라이프스타일</span> <span class="font14 fontBold mbottom-05 " @click="openPop" style="float: right; right: 20px; bottom: 0;">채널정보 ></span>
      </div>
      <div id="chanInfoSummary2" ref="chanImg2" style="">
        <span class="font20 fontBold">{{changeText(chanItem.nameMtext)}}</span>
        <span class="font13 mbottom-05 fl">#라이프스타일</span>
      </div>
      <!-- <div style="width: 100%; height: 320px;float: left;">
        <div id="summaryWrap2" class="summaryWrap2">
          <div id="chanInfoSummary2" ref="chanImg"  class="mt-header ">
            <span class="font22 fontBold">{{changeText(chanItem.nameMtext)}}</span>
            <span class="font13 mbottom-05 fl">#라이프스타일</span>
          </div>
        </div>
      </div> -->

    </div>

    <div class="channelItemBox " id="channelItemBox"  style="padding: 0px 1.5rem; margin-top: 320px;">
      <pushList @openPop="openPushDetailPop" :chanDetailKey="this.chanDetail.targetKey" />
    </div>
  </div>
  <div class="btnPlus" @click="btnWritePush" >+</div>
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
      scrollDirection: null,
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
  updated () {
    // eslint-disable-next-line no-unused-vars
    // var test = this.$refs.testBox
    this.box = document.getElementById('alimWrap') // 이 dom scroll 이벤트를 모니터링합니다
    // this.box = this.$refs.testBox
    this.box.addEventListener('scroll', this.updateScroll)
    this.box.addEventListener('mousewheel', e => {
      this.scrollDirection = e.deltaY > 0 ? 'down' : 'up'
    })
  },
  methods: {
    btnWritePush () {
      // eslint-disable-next-line no-new-object
      var params = new Object()
      params.targetKey = this.chanItem.teamKey
      params.targetType = 'writePush'
      // alert(params.targetType)
      this.$emit('openPop', params)
    },
    async getChanDetail () {
      this.detailShowYn = false
      var paramMap = new Map()
      // eslint-disable-next-line no-unused-vars
      var tt = this.chanDetail
      if (this.chanDetail.targetKey !== undefined && this.chanDetail.targetKey !== null && this.chanDetail.targetKey !== '') {
        paramMap.set('teamKey', this.chanDetail.targetKey)
      } else if (this.chanDetail.teamKey !== undefined && this.chanDetail.teamKey !== null && this.chanDetail.teamKey !== '') {
        paramMap.set('teamKey', this.chanDetail.teamKey)
      }
      var resultList = await this.$getTeamList(paramMap)
      // alert(JSON.stringify(resultList))
      this.chanItem = resultList.content[0]
      if (this.chanItem.userTeamInfo) {
        this.followYn = true
        this.detailShowYn = false
      }
      // eslint-disable-next-line no-debugger
      debugger
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
      // alert(this.scrollPosition)
      // var topArea = document.getElementById('chanInfoSummary')
      var blockBox = document.getElementById('summaryWrap')
      // alert(window.innerHeight)
      if (this.scrollDirection === 'down' && this.scrollPosition >= 250) {
        // alert(true)
        // alert(topArea.classList)
        blockBox.style.height = 50 + 'px'
        // blockBox.scrollHeight = 100
        document.getElementById('chanInfoSummary').classList.add('displayNIm')
        document.getElementById('chanInfoSummary2').classList.add('displayBIm')
        // alert(true)
      } else if (this.scrollDirection === 'up' && this.scrollPosition < 300) {
        document.getElementById('chanInfoSummary').classList.remove('displayNIm')
        blockBox.style.height = '-webkit-fill-available'
        document.getElementById('chanInfoSummary2').classList.remove('displayBIm')
      }
      // alert(tt)
    }
  },
  computed: {
    setBlockBoxHeight () {
      return {
        '--height': 300 - this.scrollPosition + 'px'
      }
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
.chanWhiteBox{ display: flex; flex-direction: column;align-items: center;width: 100%;}
.channelItemBox{background-color: #fff; position: relative; width: 100%; height: calc(100vh - 50px); float: left; box-sizing: border-box;}
.chanDetailWrap table{width: 85vw; max-width: 400px; }
.chanDetailWrap table img{width: 1.3rem}
.iconTd{display: flex; align-items: flex-start; padding-top: 1.2rem!important;}

.summaryWrap{height: calc(35vh); width: 100%; float: left; position: fixed;}
.summaryWrap2 {height: 50px;  width: 100%; float: left;}

.displayNIm{display: none!important;}
.displayBIm{display: flex!important;}
#chanInfoSummary2{width: 100%; padding-top: 0; height: 100%; display: none; flex-direction: column; float: left}
.blockBox{width: 100%; height: 320px;float: left; height: var(--height); min-height: 50px;}
/* .plusMarginBtn{margin-top: 0.6rem; line-height: 1.5;} */

.btnPlus{
  width:4rem; height:4rem; line-height:4rem;
  color:#6768a7; border:0.2rem solid #6768a7; background-color:white ;

  font-size:40px; border-radius:50%; position:absolute; bottom: 5%; right: 10% }
</style>
