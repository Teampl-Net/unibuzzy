<template>
  <!-- <div id="chanWrap" class="commonListWrap"> -->
    <!-- <p style="position: absolute;">{{currentScroll}}</p> -->
    <!-- <div class="commonListContentBox pushMbox" v-for="(alim, index) in this.contentsList" :key="index"> -->
      <div v-if="saveMemoLoadingYn" id="loading" style="display: block; z-index:9999999"><div class="spinner"></div></div>
      <myObserver v-if="targetContentsKey" @triggerIntersected="loadUpMore" class="fl w-100P" style=""></myObserver>
      <div class="fl w-100P" ref="commonListCompo" style="margin-top: 10px;">
        <template v-for="(alim, index0) in this.commonListData" :change="changeData" :key="index0" >
          <div @click="clickInfo(alim)" v-if="alim.bodyFullStr" :id="'memoCard'+ alim.mccKey" :class="this.GE_USER.userKey === alim.creUserKey ? 'creatorListContentBox': ''" class="cursorP commonListContentBox pushMbox" >
            <!-- <div v-if="alim.readYn === 0" class="readYnArea"></div> -->
              <div class="commonPushListTopArea">
                <div  @click="alim.jobkindId === 'ALIM' ? goChanDetail(alim):goChanDetail(alim)" class="pushChanLogoImgWrap" :style="'background-image: url(' + (alim.domainPath ? alim.domainPath + alim.logoPathMtext : alim.logoPathMtext) + ');'" style="background-repeat: no-repeat; background-size: cover; background-position: center;">
                  <!-- <img v-if="alimListYn" class="fl cursorP pushDetailChanLogo" style="" @click="goChanDetail(alim)" :src="alim.logoPathMtext">
                  <img v-else class="fl cursorP pushDetailChanLogo" @click="goChanDetail(alim)" :src="alim.logoPathMtext"> -->
                </div>
                <div class="pushDetailHeaderTextArea ">
<!-- :class="{commonBlue: alim.readYn === 0}"  -->
                  <p @click="clickCard(alim)" style="width: calc(100% - 30px); word-wrap:break-word;" class="font16 fl fontBold commonBlack cursorDragText">
                    <pp v-if="alim.jobkindId === 'ALIM'" class="font14 mtop-03 fl contentTypeTextArea fontNomal" style="background:#6768A7; margin-top: 3px; color: #FFF;">{{'알림'}}</pp>
                    <pp v-else-if="alim.jobkindId === 'BOAR'" class="font14 fl mtop-03 contentTypeTextArea" style="background:#FFF; color: #6768A7; font-weight: bold; border: 1px solid #6768A7  ">{{'게시'}}</pp>
                    <!-- <img src="../../assets/images/board/readFalse.png" v-if="alim.readYn === 0" class="fl mright-05" style="width: 20px;" alt="">
                    <img src="../../assets/images/board/readTrue.svg" v-else class="fl mright-05" style="width: 20px;" alt=""> -->
                    {{resizeText(alim.title, alim.nameMtext)}}
                  </p>
                  <img class="fr mright-03" style="width:4.5px; margin-left: 8px;" @click="contentMenuClick({ type: alim.jobkindId === 'ALIM' ? 'alim' : 'board', ownerYn: this.GE_USER.userKey === alim.creUserKey, tempData: alim })" src="../../assets/images/common/icon_menu_round_vertical.svg"  alt="">
                  <!-- <img v-if="alim.readYn === 1" src="../../assets/images/push/readFalse.png" style="float: right; margin-left: 5px; width: 20px;" alt="">
                  <img v-else src="../../assets/images/push/readTrue.png" style="float: right; margin-left: 5px; width: 20px;" alt=""> -->
                  <div class="w-100P fl" style=" margin-bottom: 5px;">
                      <p style="width:100%; " class="font14 fl grayBlack">
                          <img src="../../assets/images/channel/icon_official2.svg" v-if="alim.officialYn" style="height: 21px; padding: 3px;" class="fl" alt="" />
                          {{this.changeText(alim.nameMtext)}}
                          <pp @click="userNameClick(alim.showCreNameYn === 1, alim.creUserKey, alim.creTeamKey, alim.blindYn === 1)">{{alim.blindYn === 1 ? '(익명)' : (alim.showCreNameYn === 1? '(' + this.$changeText(alim.creUserName) + ')': '')}}</pp>
                      </p>
                  </div>
                </div>
                <div class="fl w-100P">
                  <div @click="clickCard(alim)"  class="fr" style="display: flex; align-items: center;">
                      <p class="font14 fl lightGray">{{this.$changeDateFormat(alim.creDate)}}</p>
                  </div>
                  <div @click="clickCard(alim)"  style="width: 1px; height: 10px; background: #ccc; float: right; margin: 0 8px; margin-top: 4px;"> </div>
                    <!-- <div v-if="alim.jobkindId === 'ALIM' && alim.creUserKey === commonListCreUserKey && (this.$cancelTimer(alim.creDate) !== false)" class="w-100P fl" :id="'timerArea'+alim.mccKey"> -->
                  <div div v-if="cancelTimerShowCheck(alim)" class="fl" :id="'timerArea'+alim.mccKey" @click="cancelConfirm(alim)">
                    <p :id="'timerText'+alim.mccKey" class="font12 fl textRight w-100P" >{{setIntervalTimer(alim.creDate, alim.mccKey)}}</p>
                  </div>
                  <div @click="clickCard(alim)"  class="fr" style="padding: 0 5px;">
                    <img v-if="alim.rUserCount !== -1" src="../../assets/images/main/main_subscriber.png" style="width:13px;margin-right: 2px; margin-top: 2px;" class="fl" alt="">
                    <p class="fl font14 lightGray" >{{alim.rUserCount === -1 ? '전체' : alim.rUserCount }}</p>
                  </div>
                  <div @click="clickCard(alim)"  v-if="alim.attachMfilekey" style="width: 1px; height: 10px; background: #ccc; float: right; margin: 0 8px; margin-top: 4px;"> </div>
                  <div @click="clickCard(alim)"  v-if="alim.attachMfilekey" class="fr" style="padding: 0 5px;">
                      <img src="../../assets/images/formEditor/attachFIleIcon.svg" style="width:17px; margin-top: 2px;" class="fl" alt="">
                      <!-- <p class="fl font14 lightGray" >{{alim.attachFileList.length}}</p> -->
                  </div>
                </div>
              </div>
                <pre @click="clickCard(alim)" :id="'bodyFullStr'+alim.mccKey" class="font14 mbottom-05 bodyFullStr cursorDragText" :style="setCutYn(alim.bodyFullStr)? 'border-bottom: 1px solid #ccc;':''" v-html="setBodyLength(alim.bodyFullStr)"></pre>
                <p @click="alimBigView(alim)" :id="'bodyMore'+alim.mccKey" v-show="setCutYn(alim.bodyFullStr)" class="font16 cursorP textRight mbottom-1" style="">더보기></p>

              <div id="alimCheckArea">
                <div class="alimCheckContents">
                  <!-- <p @click="goDetail(alim)" v-show="alim.bodyFullStr && alim.bodyFullStr.length > 130" class="font16 cursorP textRight mbottom-05" style="">더보기></p> -->

                  <div @click="changeAct(userDo, alim.contentsKey, index0)" :doKey="userDo.doKey" class="fl userDoWrap" v-for="(userDo, index) in alim.D_CONT_USER_DO" :key="index">
                    <template v-if="userDo.doType === 'LI'">
                      <img class="fl img-w20" style="margin-top: 2px;"  v-if="userDo.doKey > 0" src="../../assets/images/common/likeIcon.svg" alt="">
                      <img class="fl img-w20" style="margin-top: 2px;" v-else src="../../assets/images/common/light_likeIcon.svg" alt="">
                    </template>
                    <template v-else-if="userDo.doType === 'ST'">
                      <img class="mright-05 fl img-w20" v-if="userDo.doKey > 0" src="../../assets/images/common/colorStarIcon.svg" alt="">
                      <img class="mright-05 fl img-w20" v-else src="../../assets/images/common/starIcon.svg" alt="">
                    </template>
                  </div>
                  <div style="margin-left: 10px; margin-top: 1px; float: left;" data-clipboard-action="copy" :id="'copyTextBody' + alim.mccKey" @click="copyText(alim.mccKey, alim.jobkindId, index0, alim.title, alim.nameMtext, alim.cabinetNameMtext)"
                      data-clipboard-text="" >
                    <img class="img-w20 fl" src="../../assets/images/common/icon_share_square.svg" alt="">
                  </div>
                  <p class="fr font14 mleft-03">좋아요 {{alim.likeCount}}개</p>
                  <div class="fr w-100P mtop-05" v-show="alim.canReplyYn === 1 || alim.canReplyYn === '1' || alim.jobkindId === 'BOAR'">
                    <p class="fl font14" :id="'memoCountArea'+alim.mccKey" style="line-height: 30px;" :style="alim.memoCount > 0? 'text-decoration-line: underline;':''" @click="alim.memoCount > 0? memoOpenClick({key : alim.mccKey, teamKey : alim.creTeamKey}):''">
                    <!-- <p class="fl font14" :id="'memoCountArea'+alim.mccKey" style="line-height: 30px;" :style="alim.memoCount > 0? 'text-decoration-line: underline;':''" @click="alim.memoCount > 0? memoOpenClick({key : alim.mccKey, teamKey : alim.creTeamKey}):''"> -->
                      <!-- <img style="width:20px;" @click="memoClick" src="../../assets/images/common/icon_comment.svg" alt=""> -->
                      댓글 {{alim.memoCount}}개
                    </p>
                    <gBtnSmall  btnTitle="댓글쓰기" class="fr mleft-05" style="color:#6768a7; font-weight:bold;" :btnThema="this.GE_USER.userKey === alim.creUserKey ? 'deepLightColor' : 'light' " @click="writeMemo(alim.mccKey, alim.creTeamKey)"/>
                  </div>

                </div>
              </div>
              <!-- <div class="alimListMemoBorder" v-if="findMemoOpend(alim.mccKey) !== -1 && commonListData.memoList.length > 0" :id="'borderLine'+alim.mccKey" ></div> -->
              <div class="alimListMemoBorder" v-if="alim.D_MEMO_LIST && alim.D_MEMO_LIST.length > 0 && findMemoOpend(alim.mccKey) !== -1" :id="'borderLine'+alim.mccKey" ></div>
              <!-- <div class="w-100P fl" v-if="findMemoOpend(alim.mccKey) !== -1 " style="border-radius:10px; margin-top:0.5rem; padding: 0.5rem 0.5rem;" > -->
              <div class="w-100P fl" style="border-radius:10px; margin-top:0.5rem; padding: 0.5rem 0.5rem;" v-if="alim.D_MEMO_LIST && alim.D_MEMO_LIST.length > 0 && findMemoOpend(alim.mccKey) !== -1">
                <!-- <gMemoList ref="commonPushListMemoRefs" v-if="currentMemoList.length > 0 " :replyYn="alim.canReplyYn === 1 || alim.canReplyYn === '1' ? true : false " @loadMore='loadMoreMemo' :id="'memoList'+alim.mccKey" :memoList="currentMemoList" @deleteMemo='deleteConfirm' @editTrue='getContentsMemoList(alim.mccKey)' @mememo='writeMememo' @scrollMove='scrollMove' @contentMenuClick="contentMenuClick" @memoUserNameClick="memoUserNameClick" @mememoMemo="writeMememo" @findMemoAni="findMemoAni" /> -->
                  <!-- <gMemoList :replyYn="alim.canReplyYn === 1 || alim.canReplyYn === '1' ? true : false " @loadMore='loadMoreMemo' :id="'memoList'+alim.mccKey" :memoList="[...alim.memoList]" @deleteMemo='deleteConfirm' @editTrue='getContentsMemoList(alim.mccKey)' @mememo='writeMememo' @scrollMove='scrollMove' @contentMenuClick="contentMenuClick" @memoUserNameClick="memoUserNameClick" @mememoMemo="writeMememo" @findMemoAni="findMemoAni" /> -->
                  <!-- @deleteMemo='deleteConfirm' @editTrue='getContentsMemoList(alim.mccKey)' @mememo='writeMememo' @scrollMove='scrollMove' @contentMenuClick="contentMenuClick" @memoUserNameClick="memoUserNameClick" @mememoMemo="writeMememo" @findMemoAni="findMemoAni" -->
                  <gMemoList v-if="alim.D_MEMO_LIST && alim.D_MEMO_LIST.length > 0 && findMemoOpend(alim.mccKey) !== -1" :replyYn="alim.canReplyYn === 1 || alim.canReplyYn === '1' ? true : false " :id="'memoList'+alim.mccKey" :memoList="[...alim.D_MEMO_LIST]" @mememo='writeMememo' @deleteMemo='deleteMemo' @scrollMove='scrollMove'  @memoUserNameClick="memoUserNameClick" @mememoMemo="writeMememo" />

                <!-- <div ref="commonPushListMemoMoreRefs" style=" height: 20px; float: left; text-align: left;min-height: 20px; width: 100%; font-weight: bold; display:none" class="font14 commonColor" @click="yesLoadMore">{{moreMemoText}}</div> -->
                <div v-if="alim.D_MEMO_LIST && alim.D_MEMO_LIST.length > 0 && this.$countingTotalMemo(alim.D_MEMO_LIST) < alim.memoCount " style=" height: 20px; float: left; text-align: left;min-height: 20px; width: 100%; font-weight: bold;" class="font14 commonColor" @click="yesLoadMore(alim.contentsKey)">{{moreMemoText}}</div>                <!-- <p v-else>작성된 댓글이 없습니다.</p> -->
              </div>
            <!-- <myObserver  v-if="index === (contentsList.length-6)" @triggerIntersected="loadMore" class="fl w-100P" style=""></myObserver> -->
            </div>
        </template>

      </div>
      <myObserver @triggerIntersected="loadMore" id="observer" class="fl w-100P" style=""></myObserver>
      <div class="w-100P fl mbottom-1 mtop-05" style="position: relative; width:100%; height: 40px;">
        <gLoadingS ref="sLoadingPush" class="fl"/>
      </div>
      <!-- <div v-if="memoShowYn" class="alimListMemoBoxBackground" @click="this.memoShowYn = false"></div> -->
      <!-- <transition name="showMemoPop">
        <gMemoPop ref="gMemoRef" transition="showMemoPop" v-if="memoShowYn" @saveMemoText="saveMemo" :mememo='mememoValue' @mememoCancel='mememoCancel' style="position: fixed; bottom:0;left:0; z-index:999999;"/>
      </transition> -->
      <gConfirmPop :confirmText='confirmText' :confirmType='confirmType' v-if="confirmPopShowYn" @ok="confirmOk" @no='confirmPopShowYn=false, this.reportYn = false'  />
      <gReport v-if="reportYn" @closePop="reportYn = false" :contentType="contentType" :contentOwner="contentOwner" @report="report" @editable="editable" @bloc="bloc" />
      <smallPop v-if="smallPopYn" :confirmText='confirmMsg' @no="smallPopYn = false"/>
</template>
<script>
// import { nextTick } from '@vue/runtime-core'
/* eslint-disable */
import { onMessage } from '../../assets/js/webviewInterface'
export default {
    data: function () {
    return { // 데이터 정의
      mainYn: false,
      chanWrap: null,
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
      showMoreMemoTextYn: false,
      moreMemoText: '댓글 더보기',
      saveMemoLoadingYn: false,
      currentMemoTotal:0
    }
  },
  components: {

  },
  created () {
  },
  watch: {
  },
  updated() {
    if (this.commonListData.length) {
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
    this.$nextTick(() => {
      if (this.targetContentsKey) {
        this.targetCKey = this.targetContentsKey
      }
    })
  },
  methods: {
    getTotalMemoCount (alim) {
      var count
      for (let i = 0; i < alim.D_MEMO_LIST.length; i++) {
        if (alim.D_MEMO_LIST[i].cmemoList && alim.D_MEMO_LIST[i].cmemoList.length > 0) {
          count += 1
        }
      }
      return alim.D_MEMO_LIST.length + count
    },
    async makeShareLink (key) {
      var result = null
      var thisthis = this
      var params = {
        dynamicLinkInfo: {
          dynamicLinkDomain: 'dalim.page.link',
          link: 'https://mo.d-alim.com?pushDetail=' + key +
                        '&apn=com.tal_project&amv=1.1.0&ibi=com.pushmsg.project&isi=1620854215&st=더알림&sd=더 편한 구독알림&si=http://pushmsg.net/img/homepage03_1_1.427f4b7c.png'
        },
        suffix: { option: 'SHORT' }
      }
      await this.$axios.post('firebase/v1/shortLinks?key=AIzaSyCW-L18zOf2g5yR-iAey1U9AAE0uxxcQaE', params, { withCredentials: true })
        .then(function (response) {
          result = response.data.shortLink
        })
      return result
    },
    clickCard (alim) {
        if (alim.jobkindId === 'ALIM') {
            this.goDetail(alim)
            /* if (alim.bigYn) {
                this.goDetail(alim)
            } */ /* else {
                this.alimBigView(alim)
            } */
        } else {
            this.goChanDetail(alim)
        }
    },
    clickInfo (data) {
      // console.log(data)
    },
    // <!-- <bookMemberDetail @openPop="openPop" @addDirectAddMemList="addDirectAddMemList" @closeXPop="closeXPop" @deleteManager='closeXPop' :propData="this.params" v-if="this.targetType=== 'bookMemberDetail'" /> -->
    memoUserNameClick (param) {
      var userKey = param.userKey
      var currentContentsKey = param.contentsKey
      var indexOf = this.commonListData.findIndex(i => i.contentsKey === currentContentsKey) // ** map 에서 index찾기 ** (#맵 #map #Map #멥 #indexOf #인덱스 #index #Index)
      if (indexOf !== -1) {
        // console.log('해당 컨텐츠는 ' + indexOf + '번째 인덱스에 위치해 있습니다.')
        // console.log(this.commonListData[indexOf])
        this.userNameClick(true, userKey, this.commonListData[indexOf].creTeamKey, false)
      }
    },
    userNameClick (userShowYn, userKey, teamKey, blindYn) {
      if(userShowYn === true && blindYn === false){
        var param = {}
        param.targetType = 'bookMemberDetail'
        param.readOnlyYn = true
        param.userKey = userKey
        param.teamKey = teamKey
        if (userKey === this.GE_USER.userKey) {
          param.selfYn = true
        } else {
          param.contentOpenYn = true
        }
        this.$emit('openPop',param)
      } else {
        this.$showToastPop('익명의 게시글로 유저 정보를 볼 수 없습니다.')
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
    contentMenuClick (params) {
      //  :contentType="contentList[0].jobkindId === 'ALIM' ? 'alim' : 'board'"
      this.contentOwner = params.ownerYn
      this.contentType = params.type
      if (params.tempData) {
        params.tempData.index = params.index
        params.tempData.cIndex = params.cIndex
        // // console.log(params.tempData.index)
      }
      this.tempData = params.tempData
      this.reportYn = true
    },
    async deleteAlim(allYn){
      // console.log(this.tempData)
      if (this.tempData.jobkindId === 'ALIM') {
        if (allYn) {

        }
        var inParam = {}
        inParam.mccKey = this.tempData.mccKey
        inParam.jobkindId = 'ALIM'
        // inParam.teamKey = this.tempData.creTeamKey
        // inParam.deleteYn = true

        var result = await this.$commonAxiosFunction({
          url: 'service/tp.deleteMCabContents',
          param: inParam
        })

      } else if (this.tempData.jobkindId === 'BOAR') {
        var inParam = {}
        // // console.log(this.alimDetail)
        inParam.mccKey = this.tempData.mccKey
        inParam.contentsKey = this.tempData.contentsKey
        inParam.jobkindId = 'BOAR'
        inParam.teamKey = this.tempData.creTeamKey
        inParam.deleteYn = true
        await this.$commonAxiosFunction({
          url: 'service/tp.deleteContents',
          param: inParam
        })
      }
      var index = this.commonListData.findIndex((item) => item.mccKey === inParam.mccKey)
      this.commonListData = this.commonListData.splice(index, 1)
    },
    async deleteAlimAll () {
        var contents
        // this.tempData.contentsKey
    },
    openPop(value){
      this.$emit('openPop', value)
    },
    editBoard(){
      // console.log();
      var param = {}
      param.targetKey = this.tempData.contentsKey
      param.targetType = 'writeBoard'
      param.creTeamKey = this.tempData.creTeamKey
      if (this.tempData.attachMfilekey) { param.attachMfilekey = this.tempData.attachMfilekey }
      param.bodyFullStr = this.tempData.bodyFullStr
      param.modiContentsKey = this.tempData.contentsKey
      param.titleStr = this.tempData.title
      // param.parentAttachTrueFileList = this.attachTrueFileList
      this.openPop(param)
    },
    moveOrCopyContent(type){
      // console.log('this.tempData');
      // console.log(this.tempData);
      this.tempData.type = type
      // param.parentAttachTrueFileList = this.attachTrueFileList
      this.$emit('moveOrCopyContent', this.tempData)
    },
    editable (type, allYn) {
      this.reportYn = false
      // tempData는 어떤 컨텐츠가 올지, 어떤 Function이 올지 몰라 해당 컨텐츠의 데이터를 일단 받아주는 변수입니다..!
      if (this.tempData) {
        if (this.tempData.contentsKey) {
          if (type === 'edit') {
            if (this.tempData.jobkindId === 'BOAR') {
              // this.deleteConfirm('board')
              this.editBoard()
            }
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
          }else if (type === 'alimBloc'){
            // alert('ss')
          } else if (type === 'move' || type === 'copy') {
            this.moveOrCopyContent(type)
          } else if (type === 'writeBoard') {
            this.makeNewContents(type)
          } else if (type === 'writeAlim') {
            this.makeNewContents(type)
          }
        } else if (this.tempData.memoKey) {
          if (type === 'edit') {
            // 댓글 수정
            this.$refs.commonPushListMemoRefs[0].editMemoClick(this.tempData, this.tempData.index, this.tempData.cIndex)
          } else if (type === 'delete') {
            // 댓글 삭제
            this.deleteConfirm('memo')
          }
        }
      }
    },
    makeNewContents (type) {
      this.tempData.writeType = type === 'writeBoard' ? 'BOAR' : type === 'writeAlim' ? 'ALIM' : undefined
      this.$emit('makeNewContents', this.tempData)

    },
    deleteConfirm (data) {
      if ((data !== undefined && data !== null && data !== '' ) && (data !=='alim' && data !== 'memo' && data !=='board') ) {
        // console.log(data)
        this.tempData = data
      }

      if (data === 'memo' || this.tempData.memoKey) {
        this.confirmText = '댓글을 삭제하시겠습니까?'
        if (this.tempData.parentMemoKey){
          this.confirmText = '대댓글을 삭제하시겠습니까?'
        }
        this.currentConfirmType = 'memoDEL'
      } else if (data === 'alim' || this.tempData.jobkindId === 'ALIM') {
        this.confirmText = '알림 삭제는 나에게서만 적용되며 알림을 받은 사용자는 삭제되지 않습니다.'
        this.currentConfirmType = 'alimDEL'
      } else if (data === 'board' || this.tempData.jobkindId === 'BOAR') {
        this.confirmText = '게시글을 삭제 하시겠습니까?'
        this.currentConfirmType = 'boardDEL'
      }
      // console.log(this.tempData);
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
      param.creUserKey = this.GE_USER.userKey
      this.saveActAxiosFunc(param)
    },
    /** 신고, 차단, 탈퇴를 할 수 있는 axios함수 // actType, targetKind, targetKey, creUserKey 보내기 */
    async saveActAxiosFunc (param) {
      // console.log(param)
      this.reportYn = false
      var result = await this.$commonAxiosFunction({
        url: 'service/tp.saveActLog',
        param: param
      })
      // console.log(result.data.result)
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
        // console.log(this.tempData);
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
        param.creUserKey = this.GE_USER.userKey
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
      } else if (this.currentConfirmType === 'alimCancel'){
        // this.$emit('showToastPop', '게시글을 삭제하였습니다.')
        this.alimCancle()
      }

      this.currentConfirmType = ''
      this.confirmPopShowYn = false
    },
    async contentsWich (key) {
      await this.$emit('targetContentScrollMove', targetContentWich)
      var channelItemBoxDom = document.getElementById('summaryWrap')
      if(channelItemBoxDom.scrollHeight <= 50) {
        var tempKey
        if (this.targetCKey) tempKey = this.targetCKey
        if (key !== undefined && key !== null && key !== '') { tempKey = key }
        if (document.getElementById('memoCard'+tempKey)) {
          var targetContentWich = document.getElementById('memoCard'+tempKey).offsetTop
          this.$emit('scrollMove', targetContentWich)
          this.memoOpenClick({key: this.targetCKey, teamKey: null})
          this.targetCKey = null
        }
      }
    },
    async scrollMove (wich) {
      await this.$nextTick(() => {
        var a = document.getElementById('memoCard'+this.currentContentsKey).offsetTop
        if (wich === -1){
          wich = document.getElementById(this.currentMemoList[this.currentMemoList.length - 1].memoKey).offsetTop
        }
        // console.log('Contents Wich : ' + a)
        // console.log('Wich : ' + wich)
        this.$emit('scrollMove', wich+a)
      })
    },
    // async deleteMemo (param) {
    //   var memo = {}
    //   memo.memoKey = param.memoKey
    //   var result = await this.$commonAxiosFunction({
    //     url: 'service/tp.deleteMemo',
    //     param: memo
    //   })
    //   if (result.data.result === true) {
    //     var cont = this.currentMemoObj
    //     // this.memoList = []
    //     // await this.getBoardMemoList(true)
    //     var response = await this.getContentsMemoList(this.currentContentsKey)

    //     index = cont.D_MEMO_LIST.findIndex((item) => item.memoKey === param.memoKey)
    //     cont.D_MEMO_LIST.splice(index, 1)
    //     this.currentMemoList = cont.D_MEMO_LIST
    //     this.settingOffsetIntTotalMemoCount(cont.D_MEMO_LIST)
    //     this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
    //     this.currentMemoObj = cont
    //     this.memoSetCount(response.totalElements)
    //   }
    // },
    deleteMemo (param) {
      this.$emit('deleteMemo', param)
    },
    setIntervalTimer(date, contentsKey){
      var time = this.$cancelTimer(date)
      // var innerHTML = '<p class="CErrorColor font12 fr mleft-05" style="text-decoration: underline;" id="contentsTime' + contentsKey +'"></p> <p class="font12 fr textRight" id="contentsTime' + contentsKey + '"></p>'
      if (time !== false){
        this.$nextTick(() => {
          // document.getElementById('timerText'+contentsKey).innerHTML = innerHTML
          setInterval(() => {
            time = this.$cancelTimer(date)
            if (time !== false){
            if (document.getElementById('timerText'+contentsKey)) document.getElementById('timerText'+contentsKey).innerHTML = time
            } else {
              clearInterval()
              if (document.getElementById('timerBtn'+contentsKey)) document.getElementById('timerBtn'+contentsKey).innerText = ''
              if (document.getElementById('timerText'+contentsKey)) document.getElementById('timerText'+contentsKey).innerText = ''
              if (document.getElementById('timerArea'+contentsKey)) document.getElementById('timerArea'+contentsKey).innerText = ''
            }
          }, 1000)
        })
      }
    },
    cancelTimerShowCheck (alim) {
      var result = false
      if (alim.jobkindId === 'ALIM' && alim.creUserKey === this.GE_USER.userKey){
        var time = this.$cancelTimer(alim.creDate)
        if (time !== false) {
          result = true
        }
      }
      return result
    },
    // findMemoAni (memoKey) {
    //   var findMemoCard = document.getElementById('rowMemoCard'+memoKey)
    //   if (findMemoCard) {
    //     setTimeout(() => {
    //         findMemoCard.style.boxShadow = '0 0 15px 4px #6768a75c'
    //         findMemoCard.style.transition = 'box-shadow 0.7s ease-in-out'
    //         setTimeout(() => {
    //           findMemoCard.style.boxShadow = 'none'
    //         }, 1000)
    //     }, 1000)
    //   }
    // },
    pointAni (memoKey) {
      // alert(memoKey)
      var firstMemoCard = document.querySelectorAll('#memoCard' + this.currentContentsKey + ' #' + memoKey)[0]
      if (firstMemoCard) {
        // setTimeout(() => {
            firstMemoCard.style.boxShadow = '0 0 15px 4px #6768a75c'
            firstMemoCard.style.transition = 'box-shadow 0.7s ease-in-out'
            setTimeout(() => {
              firstMemoCard.style.boxShadow = 'none'
            }, 1000)
        // }, 1000);
      } else {

      }
    },
    cancelConfirm (alim) {
      this.tempData = alim
      this.confirmText = '알림 발송을 취소 하시겠습니까?'
      this.currentConfirmType = 'alimCancel'
      this.confirmType = 'two'
      this.confirmPopShowYn = true
    },
    async alimCancle () {
      //현재 시간과 비교하며 3분이 지났으면 false가 오고있음 혹시 모르니 한번 더 체크하는 중
      var checkTime = this.$cancelTimer(this.tempData.creDate)
      // console.log(checkTime)
      if (checkTime !== false) {
        this.saveMemoLoadingYn = true
        try{
          var param = {}
          param = this.tempData
          // console.log(param)
          await this.$commonAxiosFunction({
            url: 'service/tp.deleteContents',
            param: param
          })
          this.$emit('refresh')
          this.$showToastPop('알림 발송을 취소하였습니다.')
        } finally {
          this.saveMemoLoadingYn = false
        }
      } else {
        this.$showToastPop('3분이 지나 취소가 불가능합니다. 알림을 회수하고 싶으시면 해당 알림 우측에 메뉴를 눌러 사유 입력 후 취소를 눌러주세요')
      }
    },
    // async saveMemo (text) {
    //   this.saveMemoLoadingYn = true
    //   // eslint-disable-next-line no-new-object
    //   var memo = new Object()
    //   memo.parentMemoKey = null
    //   if (this.mememoValue !== undefined && this.mememoValue !== null && this.mememoValue !== {}) {
    //     memo.parentMemoKey = this.mememoValue.parentMemoKey
    //   }

    //   memo.bodyFullStr = text
    //   /* memo.bodyFilekey  */
    //   memo.targetKind = 'C'
    //   memo.targetKey = this.currentContentsKey
    //   // memo.toUserKey = this.alimDetail[0].creUserKey 대댓글때 사용하는것임
    //   memo.creUserKey = this.GE_USER.userKey
    //   memo.creUserName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
    //   memo.userName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)

    //   try{
    //     var result = await this.$commonAxiosFunction({
    //       url: 'service/tp.saveMemo',
    //       param: { memo: memo }
    //     })

    //     if (result.data.result === true || result.data.result === 'true') {
    //       /* this.confirmText = '댓글 저장 성공'
    //       this.confirmPopShowYn = true */
    //       this.memoShowYn = false
    //       // await this.getContentsList()
    //       // await this.getBoardMemoList(true)
    //       this.currentMemoList = []
    //       var cont = this.currentMemoObj
    //       debugger
    //       var response = await this.getContentsMemoList(this.currentContentsKey, this.currentMemoList.length + 1, 0)
    //       debugger
    //       cont.D_MEMO_LIST = response.memoList

    //       this.settingOffsetIntTotalMemoCount(cont.D_MEMO_LIST)
    //       this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
    //       this.currentMemoObj = cont
    //       this.currentMemoList = cont.D_MEMO_LIST
    //       this.memoSetCount(response.totalElements)
    //       this.pointAni()
    //       /* this.scrollMove(-1) */
    //     }
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     this.saveMemoLoadingYn = false
    //   }
    // },
    // memoSetCount (size, key) {
    //   var contentsKey = this.currentContentsKey
    //   if (key !== undefined && key !== null && key !== '' ) contentsKey = key
    //   var indexOf = this.commonListData.findIndex(i => i.contentsKey === contentsKey); // ** map 에서 index찾기 ** (#맵 #map #Map #멥 #indexOf #인덱스 #index #Index)
    //   if (indexOf !== -1 ){
    //     this.commonListData[indexOf].memoCount = size
    //   }

    // },
    // mememoCancel(){
    //   this.mememoValue = null
    // },
    writeMemo (key, creTeamKey) {
      var findIndex = this.openMemoList.indexOf(key)
      if (findIndex === -1) this.memoOpenClick({key : key, teamKey : creTeamKey})
      // this.memoShowYn = true
      // this.mememoValue = null
      // this.currentContentsKey = key
      var param = {}
      param.mccKey = key
      param.teamKey = creTeamKey
      this.$emit('writeMemo', param)
    },
    findMemoOpend (key) {
      return this.openMemoList.indexOf(key)
    },
    setMemoList(el){
      // console.log('// console.log(el)')
      // console.log(el)
    },
    writeMememo (memo) {
      var data = {}
      data.parentMemoKey = memo.memoKey // 대댓글때 사용하는것임
      if (memo.parentMemoKey !== undefined && memo.parentMemoKey !== null && memo.parentMemoKey !== ''){
        data.parentMemoKey = memo.parentMemoKey
      }
      data.memo = memo
      // this.mememoValue = {}
      // this.mememoValue = data
      // this.memoShowYn = true
      this.$emit('writeMememo', data)
    },
    async memoOpenClick (param) {
      // console.log(param)
      var key = param.key
      var teamKey = param.teamKey
      // if (this.findMemoOpend(key) !== -1) this.openMemoList.splice(this.findMemoOpend(key), 1)
      this.openMemoList.push(key)

      // console.log(this.openMemoList)
      if (document.getElementById('alimMemo'+key)) {
            document.getElementById('alimMemo'+key).style.display = 'none'
        } else if (document.getElementById('borderLine'+key)) {
            document.getElementById('borderLine'+key).style.display = 'none'
        }

        if (document.getElementById('alimMemo'+key)) {
            document.getElementById('alimMemo'+key).style.display = 'block'
        } else if (document.getElementById('borderLine'+key)) {
            document.getElementById('borderLine'+key).style.display = 'block'
        }

      this.$emit('memoOpenClick', param)
      // this.currentMemoList = new Array()
      // this.pageSize = 5
      // this.offsetInt = 0
      // this.selectedConentsKey = param.key

      // this.currentContentsKey = param.key

      // var cont = null

      // var indexOf = this.commonListData.Index(i => i.contentsKey === this.selectedConentsKey)
      // if (indexOf !== -1) {
      //   teamKey = this.commonListData[indexOf].creTeamKey

      //   var contList = await this.$getContentsDetail(null, this.selectedConentsKey, teamKey)
      //   // console.log('!!!contList!!!')
      //   // console.log(contList)
      //   if (contList) {
      //       cont = contList[0]
      //   }
      //   // console.log('###cont###')
      //   // console.log(cont)
      //   debugger

      //   if (!cont.D_MEMO_LIST) {
      //     this.currentMemoObj = cont
      //     cont.D_MEMO_LIST = new Array()
      //     var response = await this.getContentsMemoList(key, null, null, teamKey)
      //     cont.D_MEMO_LIST = response.memoList
      //   }
      //   // if (cont && cont.D_MEMO_LIST && cont.D_MEMO_LIST.length > 0) {
      //   //     this.currentMemoObj = cont
      //   // } else {
      //       // if (cont.D_MEMO_LIST) {
      //       //   cont.D_MEMO_LIST = new Array()
      //       //   this.currentMemoObj = cont
      //       //   var response = await this.getContentsMemoList(key, null, null, teamKey)
      //       //   cont.D_MEMO_LIST = [
      //       //       ...cont.D_MEMO_LIST,
      //       //       ...response.memoList
      //       //   ]
      //       //   // console.log('###D_MEMO_LIST###')
      //       //   // console.log(cont.D_MEMO_LIST)
      //       // } else {

      //       // }
      //   // }
      //   // // console.log('!!!!!!!!!!!!')
      //   // // console.log(cont)
      //   // // console.log('!!!!!!!!!!!!')
      //   this.settingOffsetIntTotalMemoCount(cont.D_MEMO_LIST)
      //   this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])

        // // console.log(document.getElementById('alimMemo'+key))

        // this.currentMemoList = cont.D_MEMO_LIST

      //   // console.log('!!!!!!!!!!!!')
      //   // console.log(this.currentMemoList)
      //   // console.log('!!!!!!!!!!!!')
      //   this.currentContentsKey = key
      // }
      // if (this.offsetInt === cont.totalMemoCount) this.showMoreMemoTextYn = false
    },
    alimBigView (alim) {
        alim.bigYn = true
      // contentsKey, alim.attachMfilekey
        document.getElementById('bodyFullStr'+alim.mccKey).style.maxHeight = '100%'
        document.getElementById('bodyFullStr'+alim.mccKey).style.marginBottom = '2rem'
        document.getElementById('bodyMore'+alim.mccKey).style.display = 'none'
        var thisthis = this
        var imgList = document.querySelectorAll('#bodyFullStr'+alim.mccKey + ' img')
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
                // console.log(thisthis.clickEndYn)
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
                // console.log(thisthis.clickEndYn)
                thisthis.clickEndYn = true

                imgList[m].style.opacity = 1
            })
        }

    },
    replaceArr (arr) {
      var uniqueArr = arr.reduce(function (data, current) {
        if (data.findIndex(({ memoKey }) => memoKey === current.memoKey) === -1) {
          data.push(current)
        }
        return data
      }, [])
      return uniqueArr
    },
    // async getContentsMemoList (key, pageSize, offsetInt) {
    //   var memo = {}
    //   memo.targetKind = 'C'
    //   memo.targetKey = key

    //   var cont = this.currentMemoObj
    //   if (pageSize) memo.pageSize = pageSize
    //   else  memo.pageSize = this.pagesize
    //   if (offsetInt !== undefined && offsetInt !== null && offsetInt !== '') memo.offsetInt = offsetInt
    //   else  memo.offsetInt = this.offsetInt
    //   // if (allYn) {
    //   //   memo.pageSize = this.totalElements + 1
    //   //   memo.offsetInt = 0
    //   // }

    //   var result = await this.$commonAxiosFunction({
    //     url: 'service/tp.getMemoList',
    //     param: memo
    //   })

    //   if (result.data.memoList) {
    //     cont.totalMemoCount = result.data.totalElements
    //     var tempList = []
    //     // 수민_ 대댓글의 경우, 어짜피 전체 리로드를 한번 해줘야 반영되기 때문에 중복제거x
    //     if (cont.D_MEMO_LIST) {
    //       tempList = cont.D_MEMO_LIST
    //     }
    //     const newArr = [
    //       ...tempList,
    //       ...result.data.memoList
    //     ]
    //     var tempMemo = this.replaceArr(newArr)

    //     if (tempMemo && tempMemo.length > 0) {
    //       for (let i = 0; i < tempMemo.length; i++) {
    //         if (tempMemo.parentMemoKey) {
    //           for (let j = 0; j < tempMemo.length; j++) {
    //             if (tempMemo[j].memoKey === tempMemo[i].parentMemoKey) {
    //               tempMemo[i].meMemoUserDispMtext = this.$changeText(tempMemo[j].userDispMtext)
    //               tempMemo[i].meMemoBodyMinStr = tempMemo[j].bodyFullStr
    //             }
    //           }
    //         }
    //       }
    //     }
    //     cont.D_MEMO_LIST = tempMemo
    //     this.offsetInt = tempMemo.length
    //     this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS', [cont])
    //   }


      // // // console.log(result.data.content)
      // var list = new Array()
      // list = result.data
      // // console.log(list)

      // /* // console.log('this.$refs.gMemoRef')
      // // console.log(this.$refs.gMemoRef)
      // this.$refs.gMemoRef.memoLoadingHide() */
      // this.currentMemoObj = cont
      // this.currentMemoTotal = this.currentMemoObj.totalElements

      // return list
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

    // },
    async loadMoreMemo () {
        this.showMoreMemoTextYn = true
        // alert(true)
        // // console.log('#########################')
        // // console.log('offsetInt', this.offsetInt)
        // // console.log('this.currentMemoObj', this.currentMemoObj)
        if (this.currentMemoObj.totalElements <= this.offsetInt ){
          this.showMoreMemoTextYn = false
          return
        }
        // // console.log('axios totalElements : ' + this.currentMemoObj.totalElements)
        // // console.log('offsetInt : ' + this.offsetInt)
        // // console.log('CurrentMemoList Length : ' + this.currentMemoList.length)
        // if (this.currentMemoObj.totalElements === this.currentMemoList.length) {
        //   // console.log('댓글 끝')
        //   this.showMoreMemoTextYn = false
        // } else {
        //   this.showMoreMemoTextYn = true
        // }
        // // console.log('#########################')
        // if (this.currentMemoObj.totalElements === this.currentMemoList.length) {
        //   // console.log('댓글 끝')
        //   this.showMoreMemoTextYn = false
        // }else {
        // }
        this.showMoreMemoTextYn = true
    },
    /** 그냥 length로 하면 cmemo인 대댓글의 갯수까지 카운트가 안되서 넣은 함수입니다!  */
    settingOffsetIntTotalMemoCount (memoList) {
      // console.log('#################')
      // console.log(memoList)
      var totalMemoCount = 0
      if (memoList) {
        for (let i = 0; i < memoList.length; i++) {
            debugger
            if (memoList[i].cmemoList.length > 0) {
            for (let cmemoIndex = 0; cmemoIndex < memoList[i].cmemoList.length; cmemoIndex++) {
                totalMemoCount += 1
            }
            }
        }
        // console.log('this.offsetInt : ' + this.offsetInt)
        this.offsetInt = memoList.length + totalMemoCount
        // console.log('#################')
      }

    },
    async yesLoadMore (contentsKey) {
      // console.log('commonlist contentsKey : ' + contentsKey);
      this.$emit('yesLoadMore', contentsKey)
    },
    async copyText (contentsKey, jobkindId, index, titleMsg, teamName, cabName) {
        // var text = document.querySelector('#copyTextBody' + contentsKey).dataset.clipboardText
        var title = '[' + this.$changeText(teamName) + ']'
        if (cabName) {
            title += this.$changeText(cabName)
        }
        var message = titleMsg
        // if (!text) {
            if (jobkindId === 'BOAR') {
                var link = await this.$makeShareLink(contentsKey, 'boardDetail', message, title)
            } else {
                var link = await this.$makeShareLink(contentsKey, 'pushDetail', message, title)
            }
            if (link) {
              var shareItem = { title: '더알림 ' + title, text: link, url: link }
              if (this.$checkMobile() === 'IOS'){ shareItem = { title: '더알림 ' + title, text: '더알림 ' + title, url: link } }
              if (window.navigator.share) {
                  window.navigator.share(shareItem)
              } else {
                onMessage('REQ', 'nativeShare', shareItem)
              }
            }
            // this.contentsList[index].copyText = link
        // }
        /* setTimeout(() => {
            var clip = new ClipboardJS('#copyTextBody' + contentsKey)
            var _this = this
            clip.on('success', function (e) {
                _this.confirmText = '알림링크가 복사되었습니다!'
                _this.confirmPopShowYn = true
            })
        }, 300) */

    },
    loadingRefShow(){
      // // console.log('show');
      this.$refs.sLoadingPush.show()
    },
    loadingRefHide(){
      // // console.log('hide');
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
      // console.log(data)
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.jobkindId = data.jobkindId
      if (data.jobkindId === 'ALIM') {
        param.targetType = 'chanDetail'
        param.teamKey = data.creTeamKey
        param.targetKey = data.creTeamKey
        param.nameMtext = data.nameMtext
        param.chanName = data.nameMtext
        param.targetContentsKey = data.contentsKey
        // 세션에서 유저키 받아오기
        if (data.creUserKey === this.GE_USER.userKey) {
          param.ownerYn = true
        }
      } else {
        param.targetType = 'boardDetail'
        param.cabinetNameMtext = data.cabinetNameMtext
        param.teamKey = data.creTeamKey
        param.targetKey = data.contentsKey
        param.contentsKey = data.contentsKey
        param.cabinetKey = data.cabinetKey
        param.jobkindId = 'BOAR'
        param.value = data
      }
      this.$emit('goDetail', param)
    },
    goDetail (value) {
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetType = 'pushDetail'
      param.contentsKey = value.contentsKey
      param.teamKey = value.creTeamKey
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
      var temp = []
      if (!this.commonListData[idx].D_CONT_USER_DO) {
        this.commonListData[idx].D_CONT_USER_DO = [{ doType: 'ST', doKey: 0 }, { doType: 'LI', doKey: 0 }, { doType: 'RE', doKey: false }]
      }
      if (this.commonListData[idx].D_CONT_USER_DO) {
        temp = this.commonListData[idx].D_CONT_USER_DO
      }
      for (var i = 0; i < temp.length; i ++) {
        if (temp[i].doType === act.doType) {
            if (temp[i].doKey === 1) return
        }
      }
      // this.pushDetail = JSON.parse(this.detailVal).data
      if (Number(act.doKey) > 0) {
        saveYn = false
      }
      // eslint-disable-next-line no-new-object
      var param = new Object()
      param.targetKey = contentsKey
      if (param.targetKey === null) { return }
      param.doType = act.doType
      param.userName = this.$changeText(this.GE_USER.userDispMtext || this.GE_USER.userNameMtext)
      if (saveYn === false) {
        param.doKey = act.doKey
        result = this.$saveUserDo(param, 'delete')
        if (act.doType === 'LI') {
          this.commonListData[idx].likeCount -= 1
        }
        for (var i = 0; i < temp.length; i++) {
          if(temp[i].doType === act.doType) {
            temp[i].doKey = 0
          }
        }
        this.commonListData[idx].D_CONT_USER_DO = temp
        this.changeData += 1
      } else {
        param.actYn = true
        param.targetKind = 'C'
        var this_ = this
        this.$saveUserDo(param, 'save').then(result => {
          // debugger
            for (var d = temp.length - 1; d >= 0 ; d--) {
                if (temp[d].doType === act.doType) {
                    temp[d].doKey = result.doKey
                }
            }
            // temp.push({ doType: act.doType, doKey: result.doKey })
            this_.commonListData[idx].D_CONT_USER_DO = temp
            this_.changeData += 1
            this_.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', this.commonListData)
        })
        for (var d = temp.length - 1; d >= 0; d--) {
          if (temp[d].doType === act.doType) {
            temp[d].doKey = 1
          }
        }
        /* temp.push({ doType: act.doType, doKey: 1 }) */
        if (act.doType === 'LI') {
            this.commonListData[idx].likeCount += 1
        }
        this.$store.dispatch('D_CHANNEL/AC_REPLACE_CONTENTS_ONLY_USERDO', this.commonListData)
        // }
      }
      /* if (result === true) {
        await this.$emit('refresh')
      } */
    },
    async loadMore() {
      this.loadingRefShow()
      /* this.$emit('moreList', false) */
      this.$emit('moreList', true)
    },
    setBodyLength1 (str) {
      // eslint-disable-next-line no-undef
      str = Base64.decode(str)
      // str = atob(str)
      str.replace('contenteditable= true', '')
      if (str.length > 130) {
        str.substring(0, 130)
      }
      return str
    },
    setBodyLength (str) {
        str = Base64.decode(str)
        str.replace('contenteditable= true', '')
        return str
    },
    setCutYn (str) {
        var result = false

        str = Base64.decode(str)
        str.replace('contenteditable= true', '')
        var temp = document.createElement('div')
        temp.innerHTML = str
        var cList = temp.childNodes
        var height = 0
        for (var i = 0; i < cList.length; i ++) {
            if (cList[i].childNodes.length > 0) {
                var imgs = cList[i].querySelector('img')
                if (imgs){
                    height += imgs.height
                } else {
                    height += 21
                }
            }
        }
        if (height > 400) {
            result = true
        }
        return result
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
    chanAlimYn: Boolean,
    targetContentsKey: {}
  },
  computed: {
    GE_USER () {
      return this.$store.getters['D_USER/GE_USER']
    }
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
    margin: 0.7rem 0.5rem;
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
  width: calc(100% + 2rem); height: 2px; margin: 10px 0; margin-bottom: 0; margin-left: -1rem;
  background: #ccc;
}

.alimListMemoBoxBackground{
  width: 100% !important; height: 100% !important; background: #00000036 !important; position: fixed !important; top: 0 !important; left: 0 !important; z-index: 999999 !important;}

</style>
