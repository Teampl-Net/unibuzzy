<template>
  <!-- <div id="chanWrap" class="commonListWrap"> -->
    <!-- <p style="position: absolute;">{{currentScroll}}</p> -->
    <!-- <div class="commonListContentBox pushMbox" v-for="(alim, index) in this.contentsList" :key="index"> -->
      <myObserver v-if="targetContentsKey" @triggerIntersected="loadUpMore" class="fl w-100P" style=""></myObserver>
      <div class="fl w-100P" ref="commonListCompo">
        <template v-for="(alim, index) in this.contentsList" :key="index" >
          <div v-if="alim.bodyFullStr" @click="cardInfo(alim)" :id="'memoCard'+ alim.contentsKey" :class="this.commonListCreUserKey === alim.creUserKey ? 'creatorListContentBox': ''" class="cursorP commonListContentBox pushMbox" >
            <!-- <div v-if="alim.readYn === 0" class="readYnArea"></div> -->
              <div class="commonPushListTopArea">
                <div class="pushChanLogoImgWrap">
                  <img v-if="alimListYn" class="fl cursorP pushDetailChanLogo" style="" @click="goChanDetail(alim)" :src="alim.logoPathMtext">
                  <img v-else class="fl cursorP pushDetailChanLogo" @click="goChanDetail(alim)" :src="alim.logoPathMtext">
                </div>
                <div @click="goDetail(alim)" class="pushDetailHeaderTextArea ">
<!-- :class="{commonBlue: alim.readYn === 0}"  -->
                  <p style="width: 100%; " class="font16 fl fontBold commonBlack">
                    <!-- <img src="../../assets/images/board/readFalse.png" v-if="alim.readYn === 0" class="fl mright-05" style="width: 20px;" alt="">
                    <img src="../../assets/images/board/readTrue.svg" v-else class="fl mright-05" style="width: 20px;" alt=""> -->
                    {{resizeText(alim.title, alim.nameMtext)}}
                  </p>
                  <!-- <img v-if="alim.readYn === 1" src="../../assets/images/push/readFalse.png" style="float: right; margin-left: 5px; width: 20px;" alt="">
                  <img v-else src="../../assets/images/push/readTrue.png" style="float: right; margin-left: 5px; width: 20px;" alt=""> -->
                  <div class="w-100P fl">
                    <p style="width:65%; " class="font14 fl grayBlack">
                      <img src="../../assets/images/channel/icon_official2.svg" v-if="alim.officialYn" style="height: 21px; padding: 3px;" class="fl" alt="" />
                      {{this.changeText(alim.nameMtext)}}{{alim.showCreNameYn === 1? '(' + this.$changeText(alim.creUserName) + ')': ''}}
                    </p>
                    <div class="fr" style="display: flex; align-items: center;">
                      <p class="font14 fr lightGray">{{this.$changeDateFormat(alim.creDate)}}</p>
                      <img v-if="alim.rUserCount !== -1" src="../../assets/images/main/main_subscriber.png" style="width:13px;" class="fr mleft-05" alt="">
                      <p class="fr font14 lightGray" :class="{'mleft-05':alim.rUserCount === -1}" >{{alim.rUserCount === -1 ? '전체' : alim.rUserCount }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 밑 1줄이 본문 텍스트  -->

                <div @click="goDetail(alim)" :id="'bodyFullStr'+alim.contentsKey" class="font14 mbottom-05 bodyFullStr" v-html="setBodyLength(alim.bodyFullStr)"></div>
                <p @click="alimBigView(alim.contentsKey)" :id="'bodyMore'+alim.contentsKey" v-show="alim.bodyFullStr && alim.bodyFullStr.length > 130" class="font16 cursorP textRight mbottom-1" style="">더보기></p>

              <div id="alimCheckArea">
                <div class="alimCheckContents">
                  <!-- <p @click="goDetail(alim)" v-show="alim.bodyFullStr && alim.bodyFullStr.length > 130" class="font16 cursorP textRight mbottom-05" style="">더보기></p> -->

                  <div @click="changeAct(userDo, alim.contentsKey)"  class="fl userDoWrap" v-for="(userDo, index) in settingUserDo(alim.userDoList)" :key="index">
                    <template v-if="userDo.doType === 'LI'">
                      <img class="fl" style="margin-top: 2px;width: 1.15rem" v-if="userDo.doKey > 0" src="../../assets/images/common/likeIcon.svg" alt="">
                      <img class="fl" style="margin-top: 2px;width: 1.15rem" v-else src="../../assets/images/common/light_likeIcon.svg" alt="">
                    </template>
                    <template v-else-if="userDo.doType === 'ST'">
                      <img class="mright-05 fl" style="width: 1.25rem;" v-if="userDo.doKey > 0" src="../../assets/images/common/colorStarIcon.svg" alt="">
                      <img class="mright-05 fl" style="width: 1.25rem"  v-else src="../../assets/images/common/starIcon.svg" alt="">
                    </template>
                  </div>
                  <div data-clipboard-action="copy" id="copyTextBody" @click="copyText"
                      :data-clipboard-text="'https://thealim.page.link/?link=https://mo.d-alim.com:9443?pushDetail=' + alim.contentsKey
                        + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더편한구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'"
                        class="copyTextIcon mleft-05 fl" style="width:20px;" >
                    <img style="width:20px;" class=" fl" src="../../assets/images/common/icon_share_square.svg" alt="">
                  </div>
                  <p class="fr font14 mleft-03">좋아요 {{alim.likeCount}}개</p>
                  <div class="fr w-100P mtop-05">
                    <p class="fl font14" style="line-height: 30px;" :style="alim.memoCount > 0? 'text-decoration-line: underline;':''" @click="alim.memoCount > 0? memoOpenClick(alim.contentsKey):''">
                      <!-- <img style="width:20px;" @click="memoClick" src="../../assets/images/common/icon_comment.svg" alt=""> -->
                      댓글 {{alim.memoCount}}개
                    </p>
                    <gBtnSmall  btnTitle="댓글쓰기" class="fr mleft-05" style="color:#6768a7; font-weight:bold;" :btnThema="commonListCreUserKey === alim.creUserKey ? 'deepLightColor' : 'light' " @click="writeMemo(alim.contentsKey)"/>
                  </div>

                </div>
              </div>
              <div class="alimListMemoBorder" :id="'borderLine'+alim.contentsKey" ></div>
              <div class="w-100P">
                <!-- <p class="commonColor fr font14 mright-1 mtop-1" :id="'memoOpen'+alim.contentsKey" @click="memoOpenClick(alim.contentsKey)">댓글 펼치기</p> -->
                <p class="commonColor fl font16 mleft-05 mtop-1 fontBold" style="display:none" :id="'alimMemo'+alim.contentsKey" >댓글</p>
              </div>
              <div class="w-100P fl" v-if="findMemoOpend(alim.contentsKey) !== -1 " style="border-radius:10px; background:ghostwhite; margin-top:0.5rem; padding: 0.5rem 0.5rem;" >
                <!-- <gMemoList :replyYn='true' @loadMore='MemoloadMore' :ref="setMemoList" :memoList="alimMemoList" @deleteMemo='deleteMemo' @editTrue='getBoardMemoList' @mememo='writeMememo' @scrollMove='scrollMove' /> -->
                <gMemoList v-if="currentMemoList.length > 0 " :replyYn='true' @loadMore='MemoloadMore' :id="'memoList'+alim.contentsKey" :memoList="currentMemoList" @deleteMemo='deleteMemo' @editTrue='getContentsMemoList(alim.contentsKey)' @mememo='writeMememo' @scrollMove='scrollMove' />
                <!-- <p v-else>작성된 댓글이 없습니다.</p> -->
              </div>
            <!-- <myObserver  v-if="index === (contentsList.length-6)" @triggerIntersected="loadMore" class="fl w-100P" style=""></myObserver> -->
            </div>
        </template>
      </div>
      <myObserver @triggerIntersected="loadMore" class="fl w-100P" style=""></myObserver>
      <div class="w-100P fl mbottom-1 mtop-05" style="position: relative; width:100%; height: 40px;">
        <gLoadingS ref="sLoadingPush" class="fl"/>
      </div>
      <div v-if="memoShowYn" class="alimListMemoBoxBackground" @click="this.memoShowYn = false"></div>
      <transition name="showMemoPop">
        <gMemoPop ref="gMemoRef" transition="showMemoPop" :style="getWindowSize"  v-if="memoShowYn" @saveMemoText="saveMemo" :mememo='mememoValue' @mememoCancel='mememoCancel' style="position: fixed; bottom:0;left:0; z-index:999999;"/>
      </transition>
      <gConfirmPop  :draggable="true" :confirmText='confirmText' confirmType='timeout' v-if="confirmPopShowYn" @no='confirmPopShowYn=false'  />
</template>
<script>
/* eslint-disable */
export default {
    data: function () {
    return { // 데이터 정의
      commonListCreUserKey: JSON.parse(localStorage.getItem('sessionUser')).userKey,
      mainYn: false,
      chanWrap: null,
      contentsList: [],
      currentScroll: 0,
      alimBigViewYn: false,
      confirmText: '',
      confirmPopShowYn: false,
      memoListShowYn: false,
      memoShowYn: false,
      openMemoList : [],
      pagesize: 10,
      offsetInt: 0,
      currentMemoList: [],
      mememoValue: undefined,
      currentContentsKey: null,
      targetCKey: null
    }
  },
  components: {

  },
  created () {
    this.contentsList = this.commonListData
    if (this.targetContentsKey) {
      this.targetCKey = this.targetContentsKey
    }
    if (this.contentsList.length) {
      if (this.targetContentsKey) {
        this.contentsWich()
      }
    }
  },
  watch: {
    commonListData() {
      this.contentsList = this.commonListData
      this.loadingRefHide()
    },
  },
  updated() {
    if (this.contentsList.length) {
      if (this.targetCKey) {
        this.contentsWich()
      }
    }
  },
  methods: {
    // cardInfo (alim) {
    //   var a = document.getElementById('memoCard'+alim.contentsKey).offsetTop
    //   this.$emit('scrollMove', a)
    // },
    async contentsWich (key) {
      await this.$emit('targetContentScrollMove', targetContentWich)
      var channelItemBoxDom = document.getElementById('summaryWrap')
      if(channelItemBoxDom.scrollHeight === 50) {
        var tempKey
        if (this.targetCKey) tempKey = this.targetCKey
        if (key !== undefined && key !== null && key !== '') { tempKey = key }
        console.log(this.contentsList)
        if (document.getElementById('memoCard'+tempKey)) {
          var targetContentWich = document.getElementById('memoCard'+tempKey).offsetTop
          this.$emit('scrollMove', targetContentWich)
          this.targetCKey = null
        }
      } else {
        /* setTimeout(() => {
          var tempKey
          if (this.targetCKey) tempKey = this.targetCKey
          if (key !== undefined && key !== null && key !== '') { tempKey = key }
          console.log(this.contentsList)
          var targetContentWich = document.getElementById('memoCard'+tempKey).offsetTop

          this.targetCKey = null
          return targetContentWich
        }, 1000) */
      }
    },
    async scrollMove (wich) {
      await this.$nextTick(() => {
        var a = document.getElementById('memoCard'+this.currentContentsKey).offsetTop
        this.$emit('scrollMove', wich+a)
      })
    },
    async deleteMemo (param) {
      var memo = {}
      memo.memoKey = param.memoKey
      var result = await this.$commonAxiosFunction({
        url: '/tp.deleteMemo',
        param: memo
      })
      if (result.data.result === true) {
        // this.memoList = []
        // await this.getBoardMemoList(true)
        this.currentMemoList = await this.getContentsMemoList(this.currentContentsKey)
      }
    },

    async saveMemo (text) {
      // eslint-disable-next-line no-new-object
      var memo = new Object()
      memo.parentMemoKey = null
      if (this.mememoValue !== undefined && this.mememoValue !== null && this.mememoValue !== {}) {
        memo.parentMemoKey = this.mememoValue.parentMemoKey
      }

      memo.bodyFullStr = text
      /* memo.bodyFilekey  */
      memo.targetKind = 'C'
      memo.targetKey = this.currentContentsKey
      // memo.toUserKey = this.alimDetail[0].creUserKey 대댓글때 사용하는것임
      memo.creUserKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      memo.creUserName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
      memo.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)

      var result = await this.$commonAxiosFunction({
        url: '/tp.saveMemo',
        param: { memo: memo }
      })
      if (result.data.result === true || result.data.result === 'true') {
        /* this.confirmText = '댓글 저장 성공'
        this.confirmPopShowYn = true */
        this.memoShowYn = false
        // await this.getContentsList()
        // await this.getBoardMemoList(true)
        // this.currentMemoList = []
        this.currentMemoList = await this.getContentsMemoList(this.currentContentsKey)
        this.scrollMove(-1)
      }
    },
    mememoCancel(){
      this.mememoValue = null
    },
    writeMemo (key) {
      var findIndex = this.openMemoList.indexOf(key)
      if (findIndex === -1) this.memoOpenClick(key)
      this.memoShowYn = true
      this.mememoValue = null
      this.currentContentsKey = key

    },
    findMemoOpend (key) {
      return this.openMemoList.indexOf(key)
    },
    setMemoList(el){
      console.log('console.log(el)')
      console.log(el)
    },
    writeMememo (memo) {
      // if (this.shareAuth.R === true) {
        var data = {}
        data.parentMemoKey = memo.memoKey // 대댓글때 사용하는것임
        data.memo = memo
        // eslint-disable-next-line no-new-object
        this.mememoValue = new Object()
        this.mememoValue = data
        this.memoShowYn = true
      // } else {
      //   this.confirmText = '댓글 쓰기 권한이 없습니다. \n 관리자에게 문의하세요.'
      //   this.confirmPopShowYn = true
      // }
    },
    async memoOpenClick (key) {

      var findIndex = this.openMemoList.indexOf(key)
      this.currentMemoList = []
      // var div = document.getElementById('memoList'+key)
      // console.log('div')
      // console.log(div)
      console.log(key)
      console.log(this.currentContentsKey)
      console.log(findIndex)
      if (findIndex === -1) {
        // this.openMemoList.push(key)
        var list = new Array
        list.push(key)
        this.openMemoList = list
        // document.getElementById('memoOpen'+key).innerText = '댓글접기'
        if (this.currentContentsKey !== null ){
          document.getElementById('alimMemo'+this.currentContentsKey).style.display = 'none'
          document.getElementById('borderLine'+this.currentContentsKey).style.display = 'none'
        }
        document.getElementById('alimMemo'+key).style.display = 'block'
        document.getElementById('borderLine'+key).style.display = 'block'

        this.currentMemoList = await this.getContentsMemoList(key)

      } else {
        // document.getElementById('memoOpen'+key).innerText = '댓글펼치기'
        this.openMemoList.splice(findIndex, 1)
        document.getElementById('alimMemo'+key).style.display = 'none'
        document.getElementById('borderLine'+key).style.display = 'none'
      }

      this.currentContentsKey = key
    },
    alimBigView (key) {
      document.getElementById('bodyFullStr'+key).style.maxHeight = '100%'
      document.getElementById('bodyFullStr'+key).style.marginBottom = '2rem'
      document.getElementById('bodyMore'+key).style.display = 'none'

    },
    async getContentsMemoList (key) {
      var memo = {}
      memo.targetKind = 'C'
      memo.targetKey = key
      memo.pageSize = this.pagesize
      memo.offsetInt = this.offsetInt
      // if (allYn) {
      //   memo.pageSize = this.totalElements + 1
      //   memo.offsetInt = 0
      // }

      var result = await this.$commonAxiosFunction({
        url: '/tp.getMemoList',
        param: memo
      })
      // console.log(result.data.content)
      var list = new Array()
      list = result.data.content
      /* console.log('this.$refs.gMemoRef')
      console.log(this.$refs.gMemoRef)
      this.$refs.gMemoRef.memoLoadingHide() */
      return list
        // if (allYn) {
        //   this.alimMemoList = result.data.content
        //   this.endListYn = true
        // } else {
        //   const newArr = [
        //     ...this.alimMemoList,
        //     ...result.data.content
        //   ]
        //   this.alimMemoList = newArr
        // }

    },
    async copyText () {
      // eslint-disable-next-line no-undef
      var clip = new ClipboardJS('#copyTextBody')
      var _this = this
      clip.on('success', function (e) {
        _this.confirmText = '알림링크가 복사되었습니다!'
        _this.confirmPopShowYn = true
      })
    },
    loadingRefShow(){
      // console.log('show');
      this.$refs.sLoadingPush.show()
    },
    loadingRefHide(){
      // console.log('hide');
      this.$refs.sLoadingPush.hide()
    },
    resizeText (text, name) {
      if (text) {
        // if (text.length > 15) {
        //   text = text.substr(0, 15)
        //   text += '...'
        // }
      } else {
        text = '[' + this.$changeText(name) + '] 제목없는 알림'
      }
      return text
    },
    saveScroll () {
      this.currentScroll = this.chanWrap.scrollTop
      this.$emit('currentScroll', this.currentScroll)
    },
    goChanDetail (data) {
      // eslint-disable-next-line no-new-object
      // console.log(data)
      var param = new Object()
      param.targetType = 'chanDetail'
      param.teamKey = data.creTeamKey
      param.targetKey = data.creTeamKey
      param.nameMtext = data.nameMtext
      param.chanName = data.nameMtext
      param.readYn = data.readYn
      // 세션에서 유저키 받아오기
      var userKey = JSON.parse(localStorage.getItem('sessionUser')).userKey
      if (data.creUserKey === userKey) {
        param.ownerYn =  true
      }
      // console.log(param);
      this.$emit('goDetail', param)
    },
    goDetail (value) {
      // eslint-disable-next-line no-new-object
      return
      var param = new Object()
      param.targetType = 'pushDetail'
      param.contentsKey = value.contentsKey
      if (value.officialYn) {
        param.officialYn = value.officialYn
      }
      param.value = value
      value.readYn = 1
      param.readYn = value.readYn
      this.$emit('goDetail', param)
    },

    cutStickerName (value) {
      var cutName = value.substr(0, 1)
      return cutName
    },
    changeText (text) {
      var changeTxt = ''
      // changeTxt = new Promise(this.$makeMtextMap(text, 'KO'))
      changeTxt = this.$makeMtextMap(text, 'KO')
      return changeTxt
      // if (changeTxt !== undefined) { return changeTxt }
    },
    settingUserDo (userDo) {
      // var userDoList = { LI: { doKey: 0 }, ST: { doKey: 0 } }
      var userDoList = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }]
      this.readYn = false
      if (userDo !== undefined && userDo !== null && userDo !== '') {
        for (var i = 0; i < userDo.length; i++) {
          if (userDo[i].doType === 'LI') {
            userDoList[1].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'ST') {
            userDoList[0].doKey = userDo[i].doKey
          }
          if (userDo[i].doType === 'RE') {
            this.readYn = true
          }
        }
      }
      return userDoList
    },
    async changeAct (act, contentsKey) {
      var result = null
      var saveYn = true
      // this.pushDetail = JSON.parse(this.detailVal).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = contentsKey
      if (param.targetKey === null) { return }
      param.doType = act.doType
      param.userName = this.$changeText(JSON.parse(localStorage.getItem('sessionUser')).userDispMtext || JSON.parse(localStorage.getItem('sessionUser')).userNameMtext)
      if (saveYn === false) {
        param.doKey = act.doKey
        result = await this.$saveUserDo(param, 'delete')
      } else {
        param.actYn = true
        param.targetKind = 'C'
        result = await this.$saveUserDo(param, 'save')
      }
      if (result === true) {
        await this.$emit('refresh')
      }
    },
    async loadUpMore() {
      if (this.targetCKey){
        console.log('@@@topLoadMore@@@');
        // this.$emit('moreList', false)
        this.$emit('topLoadMore', true)
      }
    },
    async loadMore() {
      this.loadingRefShow()
      this.$emit('moreList', false)
      /* const newArr = [
        ...this.commonListData,
        ...resultList.content
      ]
      this.commonListData = newArr */
    },
    setBodyLength (str) {
      // eslint-disable-next-line no-undef
      str = Base64.decode(str)
      // str = atob(str)
      str.replace('contenteditable= true', '')
      if (str.length > 130) {
        str.substring(0, 130)
      }
      return str
    }
  },
  props: {
    imgUrl: {},
    clickEvnt: {},
    alimListYn: Boolean,
    mainYnProp: Boolean,
    commonListData: {},
    tempAlimList: {
      readYn: false,
      stickerList: [ ]
    },
    targetContentsKey: {}
  },
  computed: {
  }
}
</script>
<style scoped>
.bodyFullStr {
  max-height: 400px;
  overflow: hidden;

}
.commonListTr, .commonListTr td, .commonListTr th {height: 4rem; }
.listHeader {text-align: center;}
.listBodyRow{width: calc(100% - 60px);}
.commonListWrap{overflow-y: scroll; width: 100%; overflow-x: hidden; height: 100%;}

.pushDetailWrap{height: fit-content;}
.commonPushListTopArea{min-height: 3.5rem; margin-bottom: 1rem; border-bottom: 0.5px solid #CFCFCF}
.pushDetailChanLogo{width: 30px; margin-right: 1px;}
.pushDetailChanLogo img {width: 100%;}
.pushDetailHeaderTextArea{width: calc(100% - 50px); cursor: pointer; float: left;margin-top: 0.1rem;}

.alimCheckContents{width: 100%;float: right; min-height: 20px;}
.alimCheckContents > img {margin-top: 3px;}

.pushDetailStickerWrap .stickerDiv{margin-bottom: 5px; width: 30px; height: 30px; margin-right: 5px; border-radius: 15px; float: left; padding: 5px 5px;}
.pushDetailStickerWrap{max-width: calc(100% - 145px);  margin-left: 0.5rem; min-height: 50px; float: left;}
.stickerDiv img{width: 20px; margin-right: 5px; float: left;}
.pushChanLogoImgWrap {width: 40px; float: left; display: flex; align-items: center; justify-content: center; height: 40px; border-radius: 40px; margin-right: 0.5rem; border: 2px solid #ccc; position: relative;;}
.pushMbox{margin-bottom: 20px;}
.userDoWrap img {width: 1rem;}
.commonListContentBox{
    position: relative;
    width: calc(100% - 1rem);
    margin: 0.5rem 0.5rem;
    float: left;
    border-radius: 0.8rem;
    background-color: #ffffff;
    color: #363c5f;
    padding: 0.8rem 1rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 7px 3px #b7b4b440;

    animation-name: fadein;
    animation-duration: 0.3s;
    /* animation-timing-function: linear; */
    /* animation-delay: 0.5s; */

    }
.creatorListContentBox{
    background-color: #6768a712 !important;
    box-shadow: 0 0 7px 3px #6768a740 !important;
    }
.alimListMemoBorder{
  width: 100%; height: 1.5px; padding-bottom: 10px; border-bottom: 1.5px dashed #ccc; float: left;
  display: none;
}

.alimListMemoBoxBackground{
  width: 100% !important; height: 100% !important; background: #00000036 !important; position: fixed !important; top: 0 !important; left: 0 !important; z-index: 999999 !important;}

</style>
