<template>
  <!-- <div id="chanWrap" class="commonListWrap"> -->
    <!-- <p style="position: absolute;">{{currentScroll}}</p> -->
    <!-- <div class="commonListContentBox pushMbox" v-for="(alim, index) in this.contentsList" :key="index"> -->
      <myObserver v-if="targetContentsKey" @triggerIntersected="loadUpMore" class="fl w-100P" style=""></myObserver>
      <div class="fl w-100P" ref="commonListCompo">
        <template v-for="(alim, index0) in contentsList" :change="changeData" :key="index0" >
          <div @click="clickInfo(alim)" v-if="alim.bodyFullStr" :id="'memoCard'+ alim.contentsKey" :class="this.commonListCreUserKey === alim.creUserKey ? 'creatorListContentBox': ''" class="cursorP commonListContentBox pushMbox" >
            <!-- <div v-if="alim.readYn === 0" class="readYnArea"></div> -->
              <div class="commonPushListTopArea">
                <div  @click="alim.jobkindId === 'ALIM' ? alimBigView(alim):goChanDetail(alim)" class="pushChanLogoImgWrap" :style="'background-image: url(' + (alim.domainPath ? alim.domainPath + alim.logoPathMtext : alim.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center;">
                  <!-- <img v-if="alimListYn" class="fl cursorP pushDetailChanLogo" style="" @click="goChanDetail(alim)" :src="alim.logoPathMtext">
                  <img v-else class="fl cursorP pushDetailChanLogo" @click="goChanDetail(alim)" :src="alim.logoPathMtext"> -->
                </div>
                <div @click="goDetail(alim)" class="pushDetailHeaderTextArea ">
<!-- :class="{commonBlue: alim.readYn === 0}"  -->
                  <p style="width: 100%; word-wrap:break-word; " class="font16 fl fontBold commonBlack cursorDragText">
                    <img class="fr mright-03" style="width:4.5px;" @click="contentMenuClick({ type: alim.jobkindId === 'ALIM' ? 'alim' : 'board', ownerYn: this.commonListCreUserKey === alim.creUserKey, tempData: alim })" src="../../assets/images/common/icon_menu_round_vertical.svg"  alt="">
                    <!-- <img src="../../assets/images/board/readFalse.png" v-if="alim.readYn === 0" class="fl mright-05" style="width: 20px;" alt="">
                    <img src="../../assets/images/board/readTrue.svg" v-else class="fl mright-05" style="width: 20px;" alt=""> -->
                    {{resizeText(alim.title, alim.nameMtext)}}
                  </p>
                  <!-- <img v-if="alim.readYn === 1" src="../../assets/images/push/readFalse.png" style="float: right; margin-left: 5px; width: 20px;" alt="">
                  <img v-else src="../../assets/images/push/readTrue.png" style="float: right; margin-left: 5px; width: 20px;" alt=""> -->
                  <div class="w-100P fl">
                    <p style="width:65%; " class="font14 fl grayBlack">
                      <img src="../../assets/images/channel/icon_official2.svg" v-if="alim.officialYn" style="height: 21px; padding: 3px;" class="fl" alt="" />
                      {{this.changeText(alim.nameMtext)}}
                      <pp @click="userNameClick(alim.showCreNameYn === 1, alim.creUserKey, alim.creTeamKey)">{{alim.blindYn === 1 ? '(익명)' : (alim.showCreNameYn === 1? '(' + this.$changeText(alim.creUserName) + ')': '')}}</pp>
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
<!-- @click="goDetail(alim)" -->
                <div @click="alim.jobkindId === 'ALIM' ? alimBigView(alim):goChanDetail(alim)" :id="'bodyFullStr'+alim.contentsKey" class="font14 mbottom-05 bodyFullStr cursorDragText" v-html="setBodyLength(alim.bodyFullStr)"></div>
                <p @click="alim.jobkindId === 'ALIM' ? alimBigView(alim):goChanDetail(alim)" :id="'bodyMore'+alim.contentsKey" v-show="alim.bodyFullStr && alim.bodyFullStr.length > 130" class="font16 cursorP textRight mbottom-1" style="">더보기></p>

              <div id="alimCheckArea">
                <div class="alimCheckContents">
                  <!-- <p @click="goDetail(alim)" v-show="alim.bodyFullStr && alim.bodyFullStr.length > 130" class="font16 cursorP textRight mbottom-05" style="">더보기></p> -->

                  <div @click="changeAct(userDo, alim.contentsKey, index0)" :doKey="userDo.doKey" class="fl userDoWrap" v-for="(userDo, index) in settingUserDo(alim.userDoList)" :key="index">
                    <template v-if="userDo.doType === 'LI'">
                      <img class="fl img-w20" style="margin-top: 2px;"  v-if="userDo.doKey > 0" src="../../assets/images/common/likeIcon.svg" alt="">
                      <img class="fl img-w20" style="margin-top: 2px;" v-else src="../../assets/images/common/light_likeIcon.svg" alt="">
                    </template>
                    <template v-else-if="userDo.doType === 'ST'">
                      <img class="mright-05 fl img-w20" v-if="userDo.doKey > 0" src="../../assets/images/common/colorStarIcon.svg" alt="">
                      <img class="mright-05 fl img-w20" v-else src="../../assets/images/common/starIcon.svg" alt="">
                    </template>
                  </div>
                  <div data-clipboard-action="copy" id="copyTextBody" @click="copyText"
                      :data-clipboard-text="'https://thealim.page.link/?link=https://mo.d-alim.com:9443?pushDetail=' + alim.contentsKey + '?' + alim.creTeamKey
                        + '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더편한구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'"
                        class="copyTextIcon mleft-05 fl" style="width:20px;" >
                    <img class="img-w20 fl" src="../../assets/images/common/icon_share_square.svg" alt="">
                  </div>
                  <p class="fr font14 mleft-03">좋아요 {{alim.likeCount}}개</p>
                  <div class="fr w-100P mtop-05" v-show="alim.canReplyYn === 1 || alim.canReplyYn === '1'">
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
                <gMemoList ref="commonPushListMemoRefs" v-if="currentMemoList.length > 0 " :replyYn="alim.canReplyYn === 1 || alim.canReplyYn === '1' ? true : false " @loadMore='loadMoreMemo' :id="'memoList'+alim.contentsKey" :memoList="currentMemoList" @deleteMemo='deleteConfirm' @editTrue='getContentsMemoList(alim.contentsKey)' @mememo='writeMememo' @scrollMove='scrollMove' @contentMenuClick="contentMenuClick"  />
                <div v-if="currentMemoList.length > 0 && showMoreMemoTextYn" style=" height: 20px;     float: left; text-align: left;min-height: 20px; width: 100%; font-weight: bold;" class="font14 commonColor" @click="yesLoadMore">댓글 더 보기</div>
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
      <gConfirmPop :confirmText='confirmText' :confirmType='confirmType' v-if="confirmPopShowYn" @ok="confirmOk" @no='confirmPopShowYn=false, this.reportYn = false'  />
      <gReport v-if="reportYn" @closePop="reportYn = false" :contentType="contentType" :contentOwner="contentOwner" @report="report" @editable="editable" @bloc="bloc" />
      <smallPop v-if="smallPopYn" :confirmText='confirmMsg' @no="smallPopYn = false"/>
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
      pagesize: 5,
      offsetInt: 0,
      currentMemoList: [],
      mememoValue: undefined,
      currentContentsKey: null,
      targetCKey: null,
      changeData: 1,
      reportYn: false,
      contentType: '',
      contentOwner: false,
      tempData: {},
      confirmType: 'timeout',
      currentConfirmType: '',
      smallPopYn: false,
      confirmMsg: '',
      selectImgIndex: 0,
      clickEndYn: false,
      selectImgObject: {},
      clickImgList: [],
      selectFileKey: null,
      clickImg: null,
      systemName: localStorage.getItem('systemName'),
      selectedConentsKey: null,
      currentMemoObj: {},
      showMoreMemoTextYn: false

    }
  },
  components: {

  },
  created () {
    /* document.addEventListener('touchstart', () => {
      this.clickEndYn = true
    }) */
    this.contentsList = this.commonListData
    if (this.targetContentsKey) {
      this.targetCKey = this.targetContentsKey
      this.memoOpenClick(this.targetCKey)
    }
    document.addEventListener('message', e => this.recvNoti(e))
    window.addEventListener('message', e => this.recvNoti(e))
    // if (this.contentsList.length) {
    //   if (this.targetContentsKey) {
    //     this.contentsWich()
    //   }
    // }
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
    this.settingAtag()
  },
  mounted() {
    var pushListWrap = document.getElementById('pushListWrap')
    if (pushListWrap) {
        pushListWrap.addEventListener('scroll', () => {
            this.clickEndYn = true
        })
    }
    this.settingAtag()
  },
  methods: {
    clickInfo (data) {
      console.log(data)
    },
    // <!-- <bookMemberDetail @openPop="openPop" @addDirectAddMemList="addDirectAddMemList" @closeXPop="closeXPop" @deleteManager='closeXPop' :propData="this.params" v-if="this.targetType=== 'bookMemberDetail'" /> -->
    userNameClick (userShowYn, userKey, teamKey) {
      if(userShowYn === true){
        var param = {}
        param.targetType = 'bookMemberDetail'
        param.readOnlyYn = true
        param.userKey = userKey
        param.teamKey = teamKey
        if (userKey === this.commonListCreUserKey) {
          param.selfYn = true
        } else {
          param.contentOpenYn = true
        }


        this.$emit('openPop',param)
      }
    },
    settingAtag () {
      if (this.systemName !== 'Android' && this.systemName !== 'android') {
        return
      }
      var contentsATagList = document.querySelectorAll('#pushListWrap a')
      if (contentsATagList && contentsATagList.length > 0) {
        for (var i = 0; i < contentsATagList.length; i++) {
          contentsATagList[i].target = '_blank'
        }
      }
    },
    contentMenuClick(params){
      //  :contentType="contentList[0].jobkindId === 'ALIM' ? 'alim' : 'board'"
      this.contentOwner = params.ownerYn
      this.contentType = params.type
      if (params.tempData) {
        params.tempData.index = params.index
        // console.log(params.tempData.index)
      }
      this.tempData = params.tempData
      this.reportYn = true
    },
    async deleteAlim(allYn){
      console.log(this.tempData)
      if (this.tempData.jobkindId === 'ALIM') {
        if (allYn) {

        }
        var inParam = {}
        inParam.mccKey = this.tempData.mccKey
        inParam.jobkindId = 'ALIM'
        // inParam.teamKey = this.tempData.creTeamKey
        // inParam.deleteYn = true

        var result = await this.$commonAxiosFunction({
          url: '/tp.deleteMCabContents',
          param: inParam
        })
        console.log(result.data)
        this.$emit('refresh')
      } else if (this.tempData.jobkindId === 'BOAR') {
        var inParam = {}
        // console.log(this.alimDetail)
        inParam.contentsKey = this.tempData.contentsKey
        inParam.jobkindId = 'BOAR'
        inParam.teamKey = this.tempData.creTeamKey
        inParam.deleteYn = true
        await this.$commonAxiosFunction({
          url: '/tp.saveContents',
          param: inParam
        })
        this.$emit('refresh')
      }
    },
    async deleteAlimAll () {
        var contents
        // this.tempData.contentsKey
    },
    editable (type, allYn) {
      this.reportYn = false
      // tempData는 어떤 컨텐츠가 올지, 어떤 Function이 올지 몰라 해당 컨텐츠의 데이터를 일단 받아주는 변수입니다..!
      if (this.tempData) {
        if (this.tempData.contentsKey) {
          if (type === 'edit') {
            //
          } else if (type === 'delete') {
            if (allYn) {
                this.deleteAlimAll()
            } else {
              if (this.tempData.jobkindId === 'ALIM') {
                this.deleteConfirm('alim')
              } else if (this.tempData.jobkindId === 'BOAR') {
                this.deleteConfirm('board')
              }

            }
          }
        } else if (this.tempData.memoKey) {
          if (type === 'edit') {
            // 댓글 수정
            this.$refs.commonPushListMemoRefs[0].editMemoClick(this.tempData, this.tempData.index)
          } else if (type === 'delete') {
            // 댓글 삭제
            this.deleteConfirm('memo')
          }
        }
      }
    },
    deleteConfirm (data) {
      console.log('datadatadatadatadatadatadatadatadatadatadatadatadatadatadata')
      console.log(data)
      if ((data !== undefined && data !== null && data !== '' ) && (data !=='alim' && data !== 'memo' && data !=='board') ) {
        console.log(data)
        this.tempData = data
      }

      if (data === 'memo' || this.tempData.memoKey) {
        this.confirmText = '댓글을 삭제하시겠습니까?'
        this.currentConfirmType = 'memoDEL'
      } else if (data === 'alim' || this.tempData.jobkindId === 'ALIM') {
        this.confirmText = '알림 삭제는 나에게서만 적용되며 알림을 받은 사용자는 삭제되지 않습니다.'
        this.currentConfirmType = 'alimDEL'
      } else if (data === 'board' || this.tempData.jobkindId === 'BOAR') {
        this.confirmText = '게시글을 삭제 하시겠습니까?'
        this.currentConfirmType = 'boardDEL'
      }
      console.log(this.tempData);
      this.confirmType = 'two'
      this.confirmPopShowYn = true
    },
    report (type) {
      var targetKind
      var targetKey
      if (type === 'alim') {
        targetKind = 'C'
        targetKey = this.tempData.contentsKey
        this.confirmText = '해당 알림이 신고되었습니다.'
      } else if (type === 'board') {
        targetKind = 'C'
        targetKey = this.tempData.contentsKey
        this.confirmText = '해당 게시글이 신고되었습니다.'
      } else if (type === 'memo') {
        targetKind = 'C'
        targetKey = this.tempData.memoKey
        this.confirmText = '해당 댓글이 신고되었습니다.'
      } else if (type === 'channel') {
        targetKind = 'T'
        targetKey = this.tempData.creTeamKey
        this.confirmText = '해당 채널이 신고되었습니다.'
      } else if (type === 'user') {
        targetKind = 'U'
        targetKey =  this.tempData.creUserKey
        this.confirmText = '해당 유저가 신고되었습니다.'
      }

      var param = {}
      param.actType = 'REPO'
      param.targetKind = targetKind
      param.targetKey = parseInt(targetKey)
      param.creUserKey = this.commonListCreUserKey
      this.saveActAxiosFunc(param)
    },
    /** 신고, 차단, 탈퇴를 할 수 있는 axios함수 // actType, targetKind, targetKey, creUserKey 보내기 */
    async saveActAxiosFunc (param) {
      console.log(param)
      this.reportYn = false
      var result = await this.$commonAxiosFunction({
        url: '/tp.saveActLog',
        param: param
      })
      console.log(result.data.result)
      if (result.data.result === true) {
        this.confirmMsg = this.confirmText
        this.smallPopYn = true
        this.$emit('showToastPop', this.confirmText)
        // this.confirmPopShowYn = true
      }
    },
    bloc (type) {
      var typeText = type === 'user' ? '유저를' : '게시글을'
      this.confirmText = '해당 ' + typeText +' 차단하시겠습니까?'
      this.confirmType = 'two'
      this.confirmPopShowYn = true
      this.currentConfirmType = 'BLOC'
    },
    confirmOk () {
      this.confirmType = 'timeout'
      if (this.currentConfirmType === 'BLOC'){
        this.currentConfirmType = ''
        console.log(this.tempData);
        var param = {}
        param.actType = 'BLOC'
        if (this.tempData.memoKey) {
          param.targetKind = 'U'
          param.targetKey = this.tempData.creUserKey
        } else if (this.tempData.contentsKey) {
          param.targetKind = 'C'
          param.targetKey = this.tempData.contentsKey
        } else {
          this.confirmText = '알수 없는 오류입니다.'
        }
        param.creUserKey = this.commonListCreUserKey
        this.confirmText = '해당 유저를 차단했습니다.'
        this.saveActAxiosFunc(param)
      } else if (this.currentConfirmType === 'memoDEL') {
        this.deleteMemo({ memoKey: this.tempData.memoKey })
        this.$emit('showToastPop', '댓글을 삭제하였습니다.')
      } else if (this.currentConfirmType === 'alimDEL') {
        this.$emit('showToastPop', '알림을 나에게서 삭제하였습니다.')
        this.deleteAlim()
      } else if (this.currentConfirmType === 'boardDEL') {
        this.$emit('showToastPop', '게시글을 삭제하였습니다.')
        this.deleteAlim()
      }

      this.currentConfirmType = ''
      this.confirmPopShowYn = false
    },
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
        if (wich === -1){
          wich = document.getElementById(this.currentMemoList[this.currentMemoList.length - 1].memoKey).offsetTop
        }
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
        var response = await this.getContentsMemoList(this.currentContentsKey)
        this.currentMemoList = response.content
        this.currentMemoObj = response
        this.offsetInt = this.currentMemoList.length
        this.memoSetCount(response.totalElements)
      }
    },
    pointAni () {
      var firstMemoCard = document.querySelectorAll('#memoCard' + this.currentContentsKey + ' .memoCard')[0]
      if (firstMemoCard) {
        firstMemoCard.style.boxShadow = '0 0 15px 4px #6768a75c'
        firstMemoCard.style.transition = 'box-shadow 0.7s ease-in-out'
        setTimeout(() => {
          firstMemoCard.style.boxShadow = 'none'
        }, 1000)
      } else {

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
        var response = await this.getContentsMemoList(this.currentContentsKey, this.currentMemoList.length + 1, 0)
        this.currentMemoList = response.content
        this.currentMemoObj = response
        this.offsetInt = this.currentMemoList.length
        console.log(response)
        this.memoSetCount(response.totalElements)
        this.pointAni()
        /* this.scrollMove(-1) */
      }
    },
    memoSetCount (size) {
      var indexOf = this.contentsList.findIndex(i => i.contentsKey === this.currentContentsKey); // ** map 에서 index찾기 ** (#맵 #map #Map #멥 #indexOf #인덱스 #index #Index)
      if (indexOf !== -1 ){
        this.contentsList[indexOf].memoCount = size
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
    },
    async memoOpenClick (key) {
        this.pageSize = 5
        this.offsetInt = 0
        this.selectedConentsKey = key
        var findIndex = this.openMemoList.indexOf(key)
        this.currentMemoList = []
        // var div = document.getElementById('memoList'+key)
        // console.log('div')
        if (findIndex === -1) {
            // this.openMemoList.push(key)
            console.log('갑니다!!!!111')
            var list = new Array
            list.push(key)
            this.openMemoList = list
            var response = await this.getContentsMemoList(key)
            console.log('$$$$$$$$$$$$')
            console.log(response.content.length)
            this.currentMemoList = response.content
            this.offsetInt = this.currentMemoList.length
            this.currentMemoObj = response

            // document.getElementById('memoOpen'+key).innerText = '댓글접기'
            if (this.currentContentsKey !== null ){
            document.getElementById('alimMemo'+this.currentContentsKey).style.display = 'none'
            document.getElementById('borderLine'+this.currentContentsKey).style.display = 'none'
            }
            document.getElementById('alimMemo'+key).style.display = 'block'
            document.getElementById('borderLine'+key).style.display = 'block'

        // this.memoSetCount(response.totalElements)


      } else {
        // document.getElementById('memoOpen'+key).innerText = '댓글펼치기'
        this.openMemoList.splice(findIndex, 1)
        document.getElementById('alimMemo'+key).style.display = 'none'
        document.getElementById('borderLine'+key).style.display = 'none'
      }

      this.currentContentsKey = key
    },
    alimBigView (alim) {
      // contentsKey, alim.attachMfilekey
      document.getElementById('bodyFullStr'+alim.contentsKey).style.maxHeight = '100%'
      document.getElementById('bodyFullStr'+alim.contentsKey).style.marginBottom = '2rem'
      document.getElementById('bodyMore'+alim.contentsKey).style.display = 'none'
      var thisthis = this
      var imgList = document.querySelectorAll('#bodyFullStr'+alim.contentsKey + ' img')
      for (let m = 0; m < imgList.length; m++) {
        imgList[m].addEventListener('touchstart', () => {
          imgList[m].style.opacity = 0.8
          thisthis.clickTime = Date.now()
          thisthis.clickEndYn = false
          setTimeout(() => {
            if (thisthis.clickEndYn === false) {

              thisthis.selectImgObject.path = imgList[m].src
              thisthis.selectImgObject.fileKey = Number(imgList[m].attributes.filekey.value)
              var param = new Object()
              param.mfileKey = alim.attachMfilekey
              param.creUserName = alim.creUserName
              param.title = alim.title
              param.creDate = alim.creDate
              param.imgIndex = m
              this.$emit('imgLongClick', {selectImgIndex: m, selectObj: thisthis.selectImgObject, previewParam: param})
              thisthis.selectImgIndex = m
              imgList[m].style.opacity = 1
            }
          }, 300)
        })
        imgList[m].addEventListener('touchend', () => {
          thisthis.clickEndYn = true
          imgList[m].style.opacity = 1
        })

        imgList[m].addEventListener('mousedown', () => {
          thisthis.clickTime = Date.now()
          imgList[m].style.opacity = 0.8
          thisthis.clickEndYn = false
          setTimeout(() => {
            console.log(thisthis.clickEndYn)
            if (thisthis.clickEndYn === false) {
              thisthis.selectImgObject.path = imgList[m].src
              thisthis.selectImgObject.fileKey = Number(imgList[m].attributes.filekey.value)
              var param = new Object()
              param.mfileKey = alim.attachMfilekey
              param.creUserName = alim.creUserName
              param.title = alim.title
              param.creDate = alim.creDate
              param.imgIndex = m
              this.$emit('imgLongClick', {selectImgIndex: m, selectObj: thisthis.selectImgObject, previewParam: param})
              thisthis.selectImgIndex = m
            imgList[m].style.opacity = 1
            }
          }, 1000)
        })
        imgList[m].addEventListener('mouseup', () => {
            console.log(thisthis.clickEndYn)
            thisthis.clickEndYn = true

            imgList[m].style.opacity = 1
        })

        /* imgList[m].addEventListener('click', () => {
          var param = new Object
          param.mfileKey = alim.attachMfilekey
          param.creUserName = alim.creUserName
          param.title = alim.title
          param.creDate = alim.creDate
          param.imgIndex = m
          this.$emit('clickImg', param)
        }) */
      }

    },
    /* openImgDetailAlert () {
      var history = this.$store.getters.hStack
      this.alertPopId = 'imgDetailAlertPop' + history.length
      history.push(this.alertPopId)
      this.$store.commit('updateStack', history)
      console.log(this.$store.getters.hStack)
      this.imgDetailAlertShowYn = true
      this.clickEndYn = false
    }, */
    async getContentsMemoList (key, pageSize, offsetInt) {
      var memo = {}
      memo.targetKind = 'C'
      memo.targetKey = key
      if (pageSize) memo.pageSize = pageSize
      else  memo.pageSize = this.pagesize
      if (offsetInt !== undefined && offsetInt !== null && offsetInt !== '') memo.offsetInt = offsetInt
      else  memo.offsetInt = this.offsetInt
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
      list = result.data
      console.log(list)

      /* console.log('this.$refs.gMemoRef')
      console.log(this.$refs.gMemoRef)
      this.$refs.gMemoRef.memoLoadingHide() */
      this.currentMemoObj = result.data
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


    async loadMoreMemo () {
        this.showMoreMemoTextYn = false
        if (this.currentMemoObj.totalElements < (this.offsetInt + this.currentMemoObj.pageable.pageSize)) {return}
        this.showMoreMemoTextYn = true
    },
    async yesLoadMore () {
        this.pageSize = 5
        /* debugger */
        var response = await this.getContentsMemoList(this.currentContentsKey)
        debugger
        var newArr = []
        newArr = [
            ...this.currentMemoList,
            ...response.content
        ]
        this.currentMemoList = newArr
        this.currentMemoObj = response
        this.offsetInt = this.currentMemoList.length
        this.memoSetCount(response.totalElements)
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
      console.log(data)
      // eslint-disable-next-line no-new-object
      var param = new Object()
      if (data.jobkindId === 'ALIM') {
        param.targetType = 'chanDetail'
        param.teamKey = data.creTeamKey
        param.targetKey = data.creTeamKey
        param.nameMtext = data.nameMtext
        param.chanName = data.nameMtext
        param.targetContentsKey = data.contentsKey
        // 세션에서 유저키 받아오기
        if (data.creUserKey === this.creUserKey) {
          param.ownerYn = true
        }
      } else {
        param.targetType = 'boardDetail'
        param.cabinetNameMtext = data.cabinetNameMtext
        param.targetKey = data.contentsKey
        param.value = data
      }
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
    async changeAct (act, contentsKey, idx) {
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
        if (act.doType === 'LI') {
          this.contentsList[idx].likeCount -= 1
        }
        console.log(this.contentsList[idx])
        console.log(this.contentsList)
        var temp = this.contentsList[idx].userDoList
        for (var i = 0; i < temp.length; i++) {
          if(temp[i].doType === act.doType) {
            temp.splice(i, 1)
          }
        }
        this.contentsList[idx].userDoList = temp
        this.changeData += 1
      } else {
        param.actYn = true
        param.targetKind = 'C'
        result = await this.$saveUserDo(param, 'save')
        if (result.result === true) {
          if (act.doType === 'LI') {
            this.contentsList[idx].likeCount += 1
          }
          console.log(result)
          var temp = this.contentsList[idx].userDoList
          if (!temp) {
            temp = []
          }
          temp.push({ doType: act.doType, doKey: result.doKey })
          this.contentsList[idx].userDoList = temp
          this.changeData += 1
        }
      }
      /* if (result === true) {
        await this.$emit('refresh')
      } */
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
    async loadUpMore() {
      if (this.targetContentsKey){
        console.log('@@@topLoadMore@@@');
        // this.$emit('moreList', false)
        this.$emit('topLoadMore', false)
      }
    },
    async loadMore() {
      this.loadingRefShow()
      /* this.$emit('moreList', false) */
      this.$emit('moreList', true)
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
    },
    async recvNoti (e) {
      var message
      try {
        if (this.$isJsonString(e.data) === true) {
          message = JSON.parse(e.data)
        } else {
          message = e.data
        }
        if (message.type === 'pushmsg') {
            if (localStorage.getItem('systemName') !== undefined && localStorage.getItem('systemName') !== 'undefined' && localStorage.getItem('systemName') !== null) {
                this.systemName = localStorage.getItem('systemName')
            }
            if (JSON.parse(message.pushMessage).noti.data.item !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== undefined && JSON.parse(message.pushMessage).noti.data.item.data !== null && JSON.parse(message.pushMessage).noti.data.item.data !== '') {
                this.notiDetail = JSON.parse(message.pushMessage).noti.data.item.data
            } else {
                this.notiDetail = JSON.parse(message.pushMessage).noti.data
            }
            if (JSON.parse(this.notiDetail.userDo).targetKind === 'CONT' || JSON.parse(this.notiDetail.userDo).targetKind === 'MEMO') {
                if (Number(JSON.parse(this.notiDetail.userDo).userKey) === Number(JSON.parse(localStorage.getItem('sessionUser')).userKey)) {
                return
                }
                if (this.selectedConentsKey === Number(JSON.parse(this.notiDetail.userDo).targetKey)) {
                    var pageS = this.currentMemoList.length + 1
                    if (pageS === 0 ) {
                        pageS = 5
                    }
                    var response = await this.getContentsMemoList(this.currentContentsKey, pageS, 0)

                    this.currentMemoObj = response
                    this.currentMemoList = response.content
                    this.offsetInt = this.currentMemoList.length
                    this.pointAni()
                    this.memoSetCount(response.totalElements)
                }
            }
        }
      } catch (err) {
        console.error('메세지를 파싱할수 없음 ' + err)
      }
    }
    /* changeMode () {
      this.clickImgList = document.querySelectorAll('.bodyFullStr img')

      for (let m = 0; m < this.clickImgList.length; m++) {
        this.clickImgList[m].addEventListener('click', () => {
          this.selectFileKey = this.clickImgList[m].fileKey
          this.previewPopShowYn = true
        })
      }
    } */
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
    word-break: break-all;
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
/* .userDoWrap img {width: 1rem;} */
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
    /* background-color: #6768a712 !important; */
    background-color: #f5f5ff !important;
    box-shadow: 0 0 7px 3px #6768a740 !important;
    }
.alimListMemoBorder{
  width: 100%; height: 1.5px; padding-bottom: 10px; border-bottom: 1.5px dashed #ccc; float: left;
  display: none;
}

.alimListMemoBoxBackground{
  width: 100% !important; height: 100% !important; background: #00000036 !important; position: fixed !important; top: 0 !important; left: 0 !important; z-index: 999999 !important;}

</style>
